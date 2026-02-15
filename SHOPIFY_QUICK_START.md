# Shopify Integration - Quick Start

Get your AI Art Generator connected to Shopify in 10 minutes.

## What You'll Get

✅ Real Shopify checkout  
✅ Orders in your Shopify dashboard  
✅ Customer payment processing  
✅ Order management and fulfillment  

## Step 1: Get Shopify Credentials (5 minutes)

1. **Go to your Shopify admin** (or create a store at shopify.com)

2. **Navigate to**: Settings → Apps and sales channels → Develop apps

3. **Create an app**:
   - Click "Create an app"
   - Name it "AI Art Generator"
   - Click "Create app"

4. **Configure permissions**:
   - Click "Configure Storefront API scopes"
   - Enable these scopes:
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`
     - `unauthenticated_read_product_listings`
   - Click "Save"

5. **Install and get token**:
   - Click "API credentials" tab
   - Click "Install app"
   - Copy the **Storefront API access token** (starts with `shpat_`)
   - Note your **store domain** (e.g., `your-store.myshopify.com`)

## Step 2: Configure Your App (1 minute)

Add to `.env.local`:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
```

**Restart your dev server**: Stop (Ctrl+C) and run `npm run dev`

## Step 3: Create a Product in Shopify (3 minutes)

1. **Go to**: Products → Add product

2. **Fill in**:
   - Title: "Custom AI Art Print"
   - Description: "Museum-quality AI-generated art print"
   - Price: $50 (or your base price)

3. **Add variants** (optional but recommended):
   - Click "Add variant"
   - Add options for Size, Medium, Frame
   - Or just create one default variant

4. **Save the product**

5. **Get the variant ID**:
   - Click on the product you just created
   - Click on a variant (or the default variant)
   - Look at the URL: `.../products/123456/variants/789012`
   - The variant ID is `789012`

## Step 4: Update Product Mapping (1 minute)

Edit `lib/product-mapping.ts`:

```typescript
export const PRODUCT_VARIANTS: Record<string, string> = {
  // Replace with your actual variant ID from Step 3
  "16x20-paper-none": "gid://shopify/ProductVariant/789012",
  
  // Add more as you create more products
  "24x36-canvas-black": "gid://shopify/ProductVariant/YOUR_ID",
}
```

**Note**: The format is `gid://shopify/ProductVariant/YOUR_VARIANT_ID`

## Step 5: Test It! (2 minutes)

1. **Generate an image**: Go to http://localhost:3000/create

2. **Configure a print**: Click on an image, choose options

3. **Add to cart**: Click "Add to Cart"

4. **Checkout**: Go to cart, click "Proceed to Checkout"

5. **You should be redirected to Shopify's checkout page!**

6. **Test the order**:
   - Use test card: `1` (just the number 1)
   - Any future expiry date
   - Any CVV
   - Complete the order

7. **Check Shopify admin**: Go to Orders → You should see your test order!

## Troubleshooting

### "Shopify credentials not configured"

- Make sure `.env.local` has all three variables
- Restart the dev server
- Check for typos in the environment variable names

### "Cart creation failed"

- Verify your Storefront API token is correct
- Check that you enabled the API scopes
- Make sure the token starts with `shpat_`

### "No Shopify variant found"

- You need to create at least one product in Shopify
- Get the variant ID from the product page
- Add it to `lib/product-mapping.ts` with the correct format

### Still seeing "checkout-placeholder"

- Check browser console for errors
- Verify environment variables are set
- Make sure you restarted the dev server

## What Happens Next?

When a customer checks out:

1. They're redirected to Shopify's secure checkout
2. They enter shipping/billing info
3. They pay with credit card, Apple Pay, etc.
4. Order appears in your Shopify admin
5. You can fulfill the order (print and ship)

## Custom Images

The AI-generated image URL is automatically attached to each order as a custom attribute. You can see it in Shopify admin under order details.

## Production Checklist

Before going live:

- [ ] Create all product variants you want to offer
- [ ] Map all variant IDs in `lib/product-mapping.ts`
- [ ] Test checkout with real payment
- [ ] Set up shipping rates in Shopify
- [ ] Configure tax settings
- [ ] Set up order fulfillment workflow

## Need More Help?

See the full guide: [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)

---

**That's it!** Your AI Art Generator is now connected to Shopify. 🎉
