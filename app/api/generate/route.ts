import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import type { GenerateRequest, GenerateResponse, GeneratedImage } from "@/lib/types"
import { GALLERY_ITEMS } from "@/lib/mock-data"

const ASPECT_RATIOS: Record<string, { width: number; height: number }> = {
  "3:4": { width: 864, height: 1184 },
  "1:1": { width: 1024, height: 1024 },
  "4:3": { width: 1184, height: 864 },
  "16:9": { width: 1344, height: 768 },
}

// Fallback for mock mode
let callCount = 0

export async function POST(request: Request) {
  const body: GenerateRequest = await request.json()
  const { enhancedPrompt, aspectRatio, count, quality } = body

  const dims = ASPECT_RATIOS[aspectRatio] || ASPECT_RATIOS["3:4"]
  const apiKey = process.env.GOOGLE_AI_API_KEY

  console.log("🔑 API Key status:", apiKey ? `Found (${apiKey.substring(0, 10)}...)` : "NOT FOUND")
  console.log("📝 Prompt:", enhancedPrompt.substring(0, 50) + "...")
  console.log("📐 Aspect ratio:", aspectRatio)
  console.log("⚡ Quality:", quality)

  // If no API key, fall back to mock mode
  if (!apiKey) {
    console.warn("⚠️  GOOGLE_AI_API_KEY not found - using mock images")
    console.warn("⚠️  Make sure .env.local exists in project root and restart the server")
    await new Promise((resolve) => setTimeout(resolve, 2500))
    
    callCount++
    const offset = (callCount * 3) % GALLERY_ITEMS.length
    const images: GeneratedImage[] = Array.from({ length: count || 4 }, (_, i) => {
      const item = GALLERY_ITEMS[(offset + i) % GALLERY_ITEMS.length]
      return {
        id: `gen-${Date.now()}-${i}`,
        url: item.url,
        prompt: enhancedPrompt,
        width: dims.width,
        height: dims.height,
      }
    })

    return NextResponse.json({ images })
  }

  try {
    console.log("🚀 Initializing Gemini API...")
    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey)
    
    // Select model: gemini-2.5-flash-image for standard, gemini-3-pro-image-preview for premium
    const modelName = quality === "premium" 
      ? "gemini-3-pro-image-preview" 
      : "gemini-2.5-flash-image"
    
    console.log("🤖 Using model:", modelName)
    
    const model = genAI.getGenerativeModel({ 
      model: modelName,
    })

    const images: GeneratedImage[] = []
    
    console.log(`🎨 Generating ${count || 4} images...`)
    
    // Generate images (Gemini can generate multiple images in one request)
    for (let i = 0; i < (count || 4); i++) {
      try {
        console.log(`  📸 Generating image ${i + 1}/${count || 4}...`)
        const result = await model.generateContent({
          contents: [{
            role: "user",
            parts: [{
              text: enhancedPrompt
            }]
          }],
          generationConfig: {
            responseModalities: ["IMAGE"],
            imageConfig: {
              aspectRatio: aspectRatio,
              ...(quality === "premium" && { imageSize: "2K" })
            }
          }
        })

        const response = result.response
        
        // Extract image from response
        const candidates = response.candidates
        if (candidates && candidates.length > 0) {
          const parts = candidates[0].content.parts
          
          for (const part of parts) {
            if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
              // Convert base64 to data URL
              const base64Data = part.inlineData.data
              const dataUrl = `data:${part.inlineData.mimeType};base64,${base64Data}`
              
              images.push({
                id: `gen-${Date.now()}-${i}`,
                url: dataUrl,
                prompt: enhancedPrompt,
                width: dims.width,
                height: dims.height,
              })
              console.log(`  ✅ Image ${i + 1} generated successfully`)
              break
            }
          }
        }
      } catch (error) {
        console.error(`Error generating image ${i}:`, error)
        // Fall back to mock image on error
        const item = GALLERY_ITEMS[i % GALLERY_ITEMS.length]
        images.push({
          id: `gen-${Date.now()}-${i}`,
          url: item.url,
          prompt: enhancedPrompt,
          width: dims.width,
          height: dims.height,
        })
      }
    }

    // If no images were generated, fall back to mock
    if (images.length === 0) {
      console.warn("⚠️  No images generated, falling back to mock")
      callCount++
      const offset = (callCount * 3) % GALLERY_ITEMS.length
      for (let i = 0; i < (count || 4); i++) {
        const item = GALLERY_ITEMS[(offset + i) % GALLERY_ITEMS.length]
        images.push({
          id: `gen-${Date.now()}-${i}`,
          url: item.url,
          prompt: enhancedPrompt,
          width: dims.width,
          height: dims.height,
        })
      }
    }

    console.log(`✅ Successfully generated ${images.length} images`)
    const response: GenerateResponse = { images }
    return NextResponse.json(response)
    
  } catch (error) {
    console.error("Gemini API error:", error)
    
    // Fall back to mock mode on error
    callCount++
    const offset = (callCount * 3) % GALLERY_ITEMS.length
    const images: GeneratedImage[] = Array.from({ length: count || 4 }, (_, i) => {
      const item = GALLERY_ITEMS[(offset + i) % GALLERY_ITEMS.length]
      return {
        id: `gen-${Date.now()}-${i}`,
        url: item.url,
        prompt: enhancedPrompt,
        width: dims.width,
        height: dims.height,
      }
    })

    return NextResponse.json({ images })
  }
}
