# Shopify Integration Setup Guide

This guide will help you set up Shopify to receive orders from your AI Art Generator app.

## Overview

When customers checkout, they will be redirected to Shopify's hosted checkout page where they can:
- Enter shipping and billing information
- Choose payment method (credit card, Apple Pay, Shop Pay, etc.)
- Complete the purchase

Orders will appear in your Shopify admin dashboard automatically.

## Step 1: Create a Shopify Store

If you don't have one already:

1. Go to [Shopify](https://www.shopify.com/)
2. Sign up for a free trial or paid plan
3. Complete the store setup

## Step 2: Create a Custom App

1. Go to your Shopify admin
2. Navigate to **Settings** > **Apps and sales channels**
3. Click **Develop apps**
4. Click **Allow custom app development** (if prompted)
5. Click **Create an app**
6. Name it "AI Art Generator" or similar
7. Click **Create app**

## Step 3: Configure API Permissions

1. Click **Configure Storefront API scopes**
2. Enable these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_customers`
   - `unauthenticated_read_customers`
3. Click **Save**

## Step 4: Get Your API Credentials

1. Click **API credentials** tab
2. Under **Storefront API access token**, click **Install app**
3. Copy the **Storefront API access token** (starts with `shpat_...`)
4. Note your **Store domain** (e.g., `your-store.myshopify.com`)

## Step 5: Configure Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
```

**Important**: Replace with your actual values!

## Step 6: Create Products in Shopify

You need to create products for each print configuration. Here's the recommended structure:

### Option A: Single Product with Variants (Recommended)

Create one product called "Custom AI Art Print" with variants for each combination:

1. Go to **Products** > **Add product**
2. Title: "Custom AI Art Print"
3. Description: "Museum-quality AI-generated art print"
4. Add variants for:
   - Size (8x10, 12x16, 16x20, 18x24, 24x36, 30x40)
   - Medium (Paper, Canvas, Acrylic, Metal)
   - Frame (None, Black, White, Natural Wood, Walnut, Gallery Float)
   - Mat (None, White, Off-White)

### Option B: Separate Products (Simpler)

Create separate products for common configurations:

1. "AI Art Print - 16x20 Paper"
2. "AI Art Print - 16x20 Canvas"
3. "AI Art Print - 24x36 Paper"
4. etc.

### Getting Variant IDs

After creating products:

1. Go to **Products** in Shopify admin
2. Click on a product
3. Scroll to variants
4. Click on a variant
5. Look at the URL: `...products/123456/variants/789012`
6. The variant ID is `789012`
7. The full GID is: `gid://shopify/ProductVariant/789012`

## Step 7: Update Product Mapping

Create a file `lib/product-mapping.ts`:

```typescript
// Map your app's product configurations to Shopify variant IDs
export const PRODUCT_VARIANTS: Record<string, string> = {
  // Format: "size-medium-frame" -> Shopify variant GID
  "16x20-paper-none": "gid://shopify/ProductVariant/YOUR_VARIANT_ID_1",
  "16x20-canvas-none": "gid://shopify/ProductVariant/YOUR_VARIANT_ID_2",
  "24x36-paper-black": "gid://shopify/ProductVariant/YOUR_VARIANT_ID_3",
  // Add all your combinations here
}

export function getShopifyVariantId(size: string, medium: string, frame: string): string {
  const key = `${size}-${medium}-${frame}`
  const variantId = PRODUCT_VARIANTS[key]
  
  if (!variantId) {
    throw new Error(`No Shopify variant found for ${key}. Please add it to product-mapping.ts`)
  }
  
  return variantId
}
```

## Step 8: Update the Configurator

The configurator already passes a `variantId` to the cart. You need to make it use real Shopify variant IDs:

```typescript
// In components/configure/product-configurator.tsx
import { getShopifyVariantId } from "@/lib/product-mapping"

// In handleAddToCart:
addItem({
  variantId: getShopifyVariantId(size, medium, frame), // Use real Shopify variant ID
  imageId: image.id,
  // ... rest of the item
})
```

## Step 9: Test the Integration

1. **Restart your dev server**: `npm run dev`
2. **Generate an image**: Go to `/create`
3. **Configure a print**: Click on an image
4. **Add to cart**: Configure and add to cart
5. **Checkout**: Go to cart and click "Proceed to Checkout"
6. **You should be redirected to Shopify checkout**
7. **Complete a test order** (use Shopify's test credit card: `1` for card number, any future date, any CVV)
8. **Check Shopify admin**: Order should appear in **Orders**

## Step 10: Handle Custom Images

Since each order has a unique AI-generated image, you need to pass the image URL to Shopify:

The checkout API already does this via `attributes`:

```typescript
attributes: [
  { key: "Image URL", value: item.imageUrl },
  { key: "Title", value: item.title },
  // ... other attributes
]
```

These will appear in the order details in Shopify admin under "Custom attributes".

## Troubleshooting

### "Shopify credentials not configured"

- Check that `.env.local` exists in project root
- Verify all three environment variables are set
- Restart the dev server after adding variables

### "Cart creation failed"

- Verify your Storefront API token is correct
- Check that API permissions are enabled
- Make sure variant IDs are correct (must be full GIDs like `gid://shopify/ProductVariant/123456`)

### "No Shopify variant found"

- You need to create products in Shopify first
- Get the variant IDs from Shopify admin
- Add them to `lib/product-mapping.ts`

### Orders not appearing in Shopify

- Check that you completed the checkout (not just created the cart)
- Look in **Orders** section of Shopify admin
- Check **Abandoned checkouts** if customer didn't complete payment

## Production Checklist

Before going live:

- [ ] Create all product variants in Shopify
- [ ] Map all variant IDs in `lib/product-mapping.ts`
- [ ] Test checkout with real payment methods
- [ ] Set up shipping rates in Shopify
- [ ] Configure tax settings in Shopify
- [ ] Set up email notifications in Shopify
- [ ] Add your domain to Shopify (for custom checkout URL)
- [ ] Test order fulfillment workflow
- [ ] Set up Printful integration (if using print-on-demand)

## Handling Fulfillment

### Option 1: Manual Fulfillment

1. Order comes in via Shopify
2. Download the image URL from order attributes
3. Send to your print provider
4. Mark order as fulfilled in Shopify

### Option 2: Printful Integration

1. Connect Printful to your Shopify store
2. Set up product templates in Printful
3. Use Printful's API to submit print files
4. Printful automatically fulfills and ships

### Option 3: Automated Workflow

1. Set up a webhook in Shopify for new orders
2. Create an API endpoint to receive webhooks
3. Automatically send image to print provider
4. Update order status via Shopify API

## Cost Considerations

- **Shopify**: Starting at $29/month (Basic plan)
- **Transaction fees**: 2.9% + 30¢ per transaction (with Shopify Payments)
- **Storefront API**: Free (included with all plans)

## Support Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Shopify GraphQL Explorer](https://shopify.dev/docs/apps/tools/graphiql-admin-api)
- [Shopify Help Center](https://help.shopify.com/)

---

**Need help?** Check the Shopify documentation or reach out to Shopify support.
