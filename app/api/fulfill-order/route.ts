import { NextResponse } from "next/server"
import { uploadPrintFile, createOrder } from "@/lib/printful-mock"

// PRODUCTION: This endpoint is triggered by a Shopify orders/create webhook.
// 1. Shopify sends order data + image reference ID from cart attributes
// 2. Upload print-ready image to Printful File API
// 3. Create Printful fulfillment order
// 4. Printful prints, ships, and provides tracking
// 5. Update Shopify order with tracking information

export async function POST(request: Request) {
  const body = await request.json()
  const { imageUrl, recipient, variantId, retailPrice } = body

  try {
    // Step 1: Upload print file
    const { fileId } = await uploadPrintFile(imageUrl)

    // Step 2: Create fulfillment order
    const order = await createOrder(recipient, [
      {
        variant_id: variantId,
        quantity: 1,
        files: [{ type: "default" as const, id: fileId }],
        retail_price: retailPrice,
      },
    ])

    return NextResponse.json({
      success: true,
      printfulOrderId: order.orderId,
      status: order.status,
    })
  } catch (error) {
    console.error("Fulfillment failed:", error)
    return NextResponse.json({ success: false, error: "Fulfillment failed" }, { status: 500 })
  }
}
