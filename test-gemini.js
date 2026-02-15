// Quick test script to verify Gemini API integration
// Run with: node test-gemini.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGeminiAPI() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    console.error("❌ GOOGLE_AI_API_KEY not found in environment variables");
    console.log("\nTo fix this:");
    console.log("1. Create a .env.local file in the project root");
    console.log("2. Add: GOOGLE_AI_API_KEY=your_api_key_here");
    console.log("3. Get your API key from: https://aistudio.google.com/app/apikey");
    process.exit(1);
  }

  console.log("✅ API key found");
  console.log("🔄 Testing Gemini API connection...\n");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

    console.log("📝 Generating test image with prompt: 'A serene mountain landscape at sunset'");
    
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: "A serene mountain landscape at sunset with vibrant orange and purple colors"
        }]
      }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    const response = result.response;
    const candidates = response.candidates;

    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
          console.log("\n✅ SUCCESS! Image generated successfully");
          console.log(`   MIME Type: ${part.inlineData.mimeType}`);
          console.log(`   Data size: ${part.inlineData.data.length} characters (base64)`);
          console.log("\n🎉 Your Gemini API integration is working!");
          console.log("\nNext steps:");
          console.log("1. Run: npm run dev");
          console.log("2. Visit: http://localhost:3000");
          console.log("3. Complete the style quiz at /discover");
          console.log("4. Generate real AI art at /create");
          return;
        }
      }
    }

    console.log("⚠️  No image found in response");
    console.log("Response:", JSON.stringify(response, null, 2));
    
  } catch (error) {
    console.error("\n❌ Error testing Gemini API:");
    console.error(error.message);
    
    if (error.message.includes("API_KEY_INVALID")) {
      console.log("\n💡 Your API key appears to be invalid");
      console.log("   Get a new one from: https://aistudio.google.com/app/apikey");
    } else if (error.message.includes("429")) {
      console.log("\n💡 Rate limit exceeded");
      console.log("   Wait a minute and try again");
    } else if (error.message.includes("quota")) {
      console.log("\n💡 Quota exceeded");
      console.log("   Check your usage at: https://aistudio.google.com/");
    }
  }
}

// Load environment variables from .env.local if it exists
try {
  const fs = require('fs');
  const path = require('path');
  const envPath = path.join(__dirname, '.env.local');
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    });
  }
} catch (error) {
  // Ignore errors loading .env.local
}

testGeminiAPI();
