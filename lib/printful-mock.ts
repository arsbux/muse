/**
 * PRINTFUL API v2 — MOCK IMPLEMENTATION
 *
 * Production setup:
 *   PRINTFUL_API_KEY=xxxxx
 *
 * Base URL: https://api.printful.com/
 * Auth: Bearer token (Authorization: Bearer {PRINTFUL_API_KEY})
 */

function simulateDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface PrintfulRecipient {
  name: string
  address1: string
  city: string
  state_code: string
  country_code: string
  zip: string
}

interface PrintfulOrderItem {
  variant_id: number
  quantity: number
  files: Array<{ type: "default"; id: number }>
  retail_price: string
}

/**
 * Upload a print file to Printful.
 *
 * PRODUCTION: POST https://api.printful.com/files
 * Body: { type: "default", url: imageUrl, filename: "muse-{orderId}.png", options: { dpi: 300 } }
 * Response: { code: 200, result: { id: 12345, type: "default", ... } }
 */
export async function uploadPrintFile(imageUrl: string): Promise<{ fileId: number }> {
  console.log(`[Printful Mock] Would upload file: ${imageUrl}`)
  await simulateDelay(1000)
  return { fileId: Math.floor(Math.random() * 100000) }
}

/**
 * Create a fulfillment order.
 *
 * PRODUCTION: POST https://api.printful.com/orders
 * Body: { recipient: {...}, items: [{variant_id, quantity, files: [{type, id}], retail_price}] }
 * Response: { code: 200, result: { id: 67890, status: "pending", ... } }
 */
export async function createOrder(
  recipient: PrintfulRecipient,
  items: PrintfulOrderItem[]
): Promise<{ orderId: number; status: string }> {
  console.log(`[Printful Mock] Would create order for ${recipient.name}`, items)
  await simulateDelay(1500)
  return {
    orderId: Math.floor(Math.random() * 100000),
    status: "pending",
  }
}

/**
 * Get order status.
 *
 * PRODUCTION: GET https://api.printful.com/orders/{orderId}
 * Response: { code: 200, result: { id, status, shipping: { tracking_number, ... } } }
 */
export async function getOrderStatus(orderId: number): Promise<{ status: string; trackingNumber: string | null }> {
  console.log(`[Printful Mock] Getting order status for ${orderId}`)
  await simulateDelay(500)
  return {
    status: "pending",
    trackingNumber: null,
  }
}
