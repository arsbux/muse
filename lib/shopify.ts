/**
 * Shopify Storefront API Client
 * 
 * This uses the Storefront API to create carts and checkout sessions.
 * Orders will appear in your Shopify admin dashboard.
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const SHOPIFY_API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01'

interface ShopifyResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

async function shopifyFetch<T>({ query, variables }: { query: string; variables?: Record<string, any> }): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Shopify credentials not configured. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local')
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`

  console.log('🔗 Shopify API Request:')
  console.log('  Endpoint:', endpoint)
  console.log('  Token:', SHOPIFY_STOREFRONT_ACCESS_TOKEN.substring(0, 10) + '...')

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    })

    console.log('📡 Response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Shopify API error response:', errorText)
      
      if (response.status === 401) {
        throw new Error(`Shopify API authentication failed (401). Please check:
1. Your NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is correct
2. The token has Storefront API permissions enabled
3. You've installed the custom app in Shopify admin`)
      }
      
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
    }

    const json: ShopifyResponse<T> = await response.json()

    if (json.errors) {
      console.error('❌ Shopify GraphQL errors:', json.errors)
      throw new Error(`Shopify GraphQL error: ${json.errors.map(e => e.message).join(', ')}`)
    }

    if (!json.data) {
      throw new Error('No data returned from Shopify')
    }

    return json.data
  } catch (error) {
    console.error('Shopify API error:', error)
    throw error
  }
}

export interface CartLine {
  merchandiseId: string
  quantity: number
  attributes?: Array<{ key: string; value: string }>
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  lines: {
    edges: Array<{
      node: {
        id: string
        quantity: number
        merchandise: {
          id: string
          title: string
          priceV2: {
            amount: string
            currencyCode: string
          }
        }
      }
    }>
  }
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
}

/**
 * Create a new cart with line items
 */
export async function createCart(lines: CartLine[]): Promise<{ cartId: string; checkoutUrl: string }> {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    input: {
      lines: lines.map(line => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
        attributes: line.attributes || []
      }))
    }
  }

  const data = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>({ query: mutation, variables })

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${data.cartCreate.userErrors.map(e => e.message).join(', ')}`)
  }

  return {
    cartId: data.cartCreate.cart.id,
    checkoutUrl: data.cartCreate.cart.checkoutUrl
  }
}

/**
 * Add lines to an existing cart
 */
export async function addToCart(cartId: string, lines: CartLine[]): Promise<{ success: boolean }> {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    cartId,
    lines: lines.map(line => ({
      merchandiseId: line.merchandiseId,
      quantity: line.quantity,
      attributes: line.attributes || []
    }))
  }

  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: { id: string }
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>({ query: mutation, variables })

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(`Add to cart failed: ${data.cartLinesAdd.userErrors.map(e => e.message).join(', ')}`)
  }

  return { success: true }
}

/**
 * Get cart details
 */
export async function getCart(cartId: string): Promise<ShopifyCart> {
  const query = `
    query cart($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `

  const data = await shopifyFetch<{ cart: ShopifyCart }>({ 
    query, 
    variables: { id: cartId } 
  })

  return data.cart
}

/**
 * Remove lines from cart
 */
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<{ success: boolean }> {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: { id: string }
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>({ query: mutation, variables: { cartId, lineIds } })

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(`Remove from cart failed: ${data.cartLinesRemove.userErrors.map(e => e.message).join(', ')}`)
  }

  return { success: true }
}

/**
 * Get checkout URL for a cart
 */
export async function getCheckoutUrl(cartId: string): Promise<string> {
  const query = `
    query cart($id: ID!) {
      cart(id: $id) {
        checkoutUrl
      }
    }
  `

  const data = await shopifyFetch<{ cart: { checkoutUrl: string } }>({ 
    query, 
    variables: { id: cartId } 
  })

  return data.cart.checkoutUrl
}

/**
 * Check if Shopify is configured
 */
export function isShopifyConfigured(): boolean {
  return !!(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN)
}
