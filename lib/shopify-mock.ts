/**
 * SHOPIFY STOREFRONT API — MOCK IMPLEMENTATION
 *
 * Production setup:
 *   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxx
 *   SHOPIFY_API_VERSION=2026-01
 *
 * Production endpoint:
 *   https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json
 *
 * Headers:
 *   Content-Type: application/json
 *   X-Shopify-Storefront-Access-Token: ${SHOPIFY_STOREFRONT_ACCESS_TOKEN}
 */

function simulateDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface CartLine {
  merchandiseId: string
  quantity: number
}

/**
 * PRODUCTION: mutation cartCreate($input: CartInput!) { cartCreate(input: $input) { cart { id checkoutUrl } } }
 */
export async function createCart(lines: CartLine[]): Promise<{ cartId: string; checkoutUrl: string }> {
  console.log("[Shopify Mock] Creating cart with lines:", lines)
  await simulateDelay(300)
  const cartId = `gid://shopify/Cart/mock-${Date.now()}`
  return {
    cartId,
    checkoutUrl: "/checkout-placeholder",
  }
}

/**
 * PRODUCTION: mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { id } } }
 */
export async function addToCart(cartId: string, lines: CartLine[]): Promise<{ success: boolean }> {
  console.log(`[Shopify Mock] Adding ${lines.length} lines to cart ${cartId}`)
  await simulateDelay(200)
  return { success: true }
}

/**
 * PRODUCTION: query cart($id: ID!) { cart(id: $id) { lines(first: 100) { edges { node { id quantity merchandise { ... on ProductVariant { id title priceV2 { amount } image { url } } } } } } } }
 */
export async function getCart(cartId: string): Promise<{ items: CartLine[] }> {
  console.log(`[Shopify Mock] Getting cart ${cartId}`)
  await simulateDelay(200)
  return { items: [] }
}

/**
 * PRODUCTION: mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } } }
 */
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<{ success: boolean }> {
  console.log(`[Shopify Mock] Removing ${lineIds.length} lines from cart ${cartId}`)
  await simulateDelay(200)
  return { success: true }
}

/**
 * PRODUCTION: query cart($id: ID!) { cart(id: $id) { checkoutUrl } }
 */
export async function getCheckoutUrl(cartId: string): Promise<string> {
  console.log(`[Shopify Mock] Getting checkout URL for cart ${cartId}`)
  await simulateDelay(100)
  return "/checkout-placeholder"
}
