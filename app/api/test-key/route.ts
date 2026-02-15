import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  
  return NextResponse.json({
    hasKey: !!apiKey,
    keyPrefix: apiKey ? apiKey.substring(0, 10) + "..." : "Not found",
    message: apiKey 
      ? "✅ API key is configured" 
      : "❌ API key not found. Make sure .env.local exists and restart the server."
  })
}
