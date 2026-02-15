import { NextResponse } from "next/server"

export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_ACCESS_TOKEN
  const version = process.env.SHOPIFY_API_VERSION

  console.log("🔍 Shopify Configuration Check:")
  console.log("Domain:", domain || "NOT SET")
  console.log("Token:", token ? `${token.substring(0, 10)}...` : "NOT SET")
  console.log("Version:", version || "NOT SET")

  if (!domain || !token) {
    return NextResponse.json({
      configured: false,
      message: "❌ Shopify credentials not configured",
      details: {
        domain: !!domain,
        token: !!token,
        version: !!version
      },
      instructions: "Set SHOPIFY_STORE_DOMAIN and SHOPIFY_ACCESS_TOKEN in .env.local"
    })
  }

  // Test the Admin API connection
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const endpoint = `https://${cleanDomain}/admin/api/${version || '2024-01'}/shop.json`
  
  try {
    console.log("🔗 Testing Admin API connection to:", endpoint)
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json'
      }
    })

    console.log("📡 Response status:", response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Error response:", errorText)
      
      return NextResponse.json({
        configured: true,
        connected: false,
        status: response.status,
        message: `❌ Shopify Admin API returned ${response.status}`,
        error: errorText,
        troubleshooting: {
          "401": "Invalid access token or missing Admin API permissions. Go to your app → Configuration → Admin API → Enable 'write_draft_orders' scope → Reinstall app",
          "403": "Access token doesn't have required permissions. Enable Admin API scopes in Shopify admin",
          "404": "Store domain incorrect. Check SHOPIFY_STORE_DOMAIN (should be: your-store.myshopify.com)"
        }
      })
    }

    const data = await response.json()
    console.log("📦 Shop data received:", data.shop?.name)

    return NextResponse.json({
      configured: true,
      connected: true,
      message: "✅ Shopify Admin API connection successful!",
      shop: {
        name: data.shop?.name,
        domain: data.shop?.domain,
        email: data.shop?.email
      },
      endpoint,
      nextSteps: [
        "Your Shopify integration is working!",
        "Make sure your app has 'write_draft_orders' permission",
        "Test checkout by adding items to cart and clicking 'Proceed to Checkout'"
      ]
    })

  } catch (error) {
    console.error("❌ Connection error:", error)
    return NextResponse.json({
      configured: true,
      connected: false,
      message: "❌ Failed to connect to Shopify",
      error: error instanceof Error ? error.message : "Unknown error"
    })
  }
}
