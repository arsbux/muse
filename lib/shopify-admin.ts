/**
 * Shopify Admin API Client
 * 
 * Uses the Admin API to create draft orders.
 * Draft orders allow customers to complete checkout on Shopify's hosted checkout page.
 */

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-01'

interface OrderItem {
  title: string
  quantity: number
  price: string
  sku?: string
  variant_id?: number
  properties?: Array<{ name: string; value: string }>
}

/**
 * Creates a Shopify Draft Order and returns the invoice URL.
 * Customer will be redirected to this URL to complete checkout.
 */
export async function createDraftOrder(
  customer: { email: string },
  items: OrderItem[],
  tags: string[] = ['ai-art', 'custom-print']
): Promise<{ id: number; invoiceUrl: string }> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ACCESS_TOKEN) {
    throw new Error('Shopify credentials not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_ACCESS_TOKEN in .env.local')
  }

  // Clean domain (remove https:// and trailing slash)
  const cleanDomain = SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const url = `https://${cleanDomain}/admin/api/${SHOPIFY_API_VERSION}/draft_orders.json`

  const draftOrderData = {
    draft_order: {
      email: customer.email,
      tags: tags.join(', '),
      line_items: items.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        variant_id: item.variant_id,
        properties: item.properties,
        requires_shipping: true
      })),
      use_customer_default_address: false
    }
  }

  console.log('🛍️  Creating Shopify draft order...')
  console.log('   Domain:', cleanDomain)
  console.log('   Items:', items.length)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(draftOrderData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Shopify API error:', response.status, errorText)
      
      if (response.status === 401) {
        throw new Error('Shopify authentication failed. Check your SHOPIFY_ACCESS_TOKEN has Admin API access with write_draft_orders permission.')
      }
      
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const invoiceUrl = data.draft_order.invoice_url
    const orderId = data.draft_order.id

    console.log('✅ Draft order created successfully')
    console.log('   Order ID:', orderId)
    console.log('   Invoice URL:', invoiceUrl)

    return {
      id: orderId,
      invoiceUrl
    }
  } catch (error) {
    console.error('❌ Failed to create draft order:', error)
    throw error
  }
}

/**
 * Check if Shopify Admin API is configured
 */
export function isShopifyConfigured(): boolean {
  return !!(SHOPIFY_STORE_DOMAIN && SHOPIFY_ACCESS_TOKEN)
}
