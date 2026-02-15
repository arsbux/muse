# Shopify Admin API Setup (CORRECT METHOD)

## Why Admin API Instead of Storefront API?

The **Admin API** is better for your use case because:
- ✅ Creates draft orders that appear in Shopify admin
- ✅ Customers complete checkout on Shopify's hosted page
- ✅ You don't need to create products beforehand
- ✅ Easier to set up and test
- ✅ This is what your visionpop project uses successfully

## Quick Setup (5 Minutes)

### Step 1: Configure Admin API Permissions

1. Go to **Shopify Admin** → Settings → Apps and sales channels → Develop apps

2. Click on your app (or create a new one)

3. Click **"Configuration"** tab

4. Scroll to **"Admin API integration"** section

5. Click **"Configure"**

6. Enable these scopes:
   - ✅ `write_draft_orders` (REQUIRED - to create draft orders)
   - ✅ `read_draft_orders` (optional - to read draft orders)
   - ✅ `write_products` (optional - if you want to manage products)

7. Click **"Save"**

### Step 2: Install/Reinstall the App

**IMPORTANT**: You MUST reinstall after changing scopes!

1. Go to **"API credentials"** tab

2. Click **"Install app"** (or "Reinstall app" if already installed)

3. Copy the **Admin API access token** (starts with `shpat_`)

### Step 3: Update Environment Variables

Edit `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=visionpop-3.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_your_admin_api_token_here
SHOPIFY_API_VERSION=2024-01
```

**Important**:
- Use `SHOPIFY_ACCESS_TOKEN` (not `NEXT_PUBLIC_...`)
- No `https://` in domain
- No trailing slash on domain
- Token from **Admin API** section (not Storefront API)

### Step 4: Restart and Test

1. **Stop dev server**: Ctrl+C

2. **Restart**: `npm run dev`

3. **Test API**: Visit http://localhost:3000/api/test-shopify

You should see:
```json
{
  "configured": true,
  "connected": true,
  "message": "✅ Shopify Admin API connection successful!",
  "shop": {
    "name": "Your Store Name"
  }
}
```

### Step 5: Test Checkout

1. Generate an image at `/create`
2. Configure and add to cart
3. Go to `/cart`
4. Click "Proceed to Checkout"
5. You'll be redirected to Shopify's invoice page
6. Complete the checkout
7. Order appears in Shopify admin → Orders

## How It Works

1. **Customer adds items to cart** → Stored locally in browser
2. **Customer clicks "Proceed to Checkout"** → API creates draft order in Shopify
3. **Redirected to Shopify invoice URL** → Shopify's hosted checkout page
4. **Customer enters shipping/payment** → Shopify handles everything
5. **Order completed** → Appears in your Shopify admin dashboard

## Troubleshooting

### "401 Unauthorized"

**Cause**: Token doesn't have Admin API permissions

**Fix**:
1. Go to app → Configuration → Admin API
2. Enable `write_draft_orders` scope
3. **Reinstall the app** (this is crucial!)
4. Copy the NEW token
5. Update `.env.local`
6. Restart dev server

### "Missing Shopify configuration"

**Cause**: Environment variables not set or not loading

**Fix**:
1. Check `.env.local` exists in project root
2. Verify variable names are EXACT (no typos)
3. No `NEXT_PUBLIC_` prefix needed for Admin API
4. Restart dev server

### "Store domain incorrect"

**Cause**: Domain format is wrong

**Correct**: `visionpop-3.myshopify.com`
**Wrong**: `https://visionpop-3.myshopify.com/`

### Test endpoint shows 404

**Cause**: Store domain is incorrect

**Fix**: Double-check your store domain in Shopify admin

## Differences from Storefront API

| Feature | Admin API (✅ Using This) | Storefront API |
|---------|-------------------------|----------------|
| Creates | Draft Orders | Carts |
| Checkout | Shopify hosted page | Shopify hosted page |
| Products | Not required | Must create products first |
| Permissions | Admin API scopes | Storefront API scopes |
| Token prefix | `shpat_` | `shpat_` |
| Environment var | `SHOPIFY_ACCESS_TOKEN` | `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` |

## What Appears in Shopify Admin

After a successful checkout, you'll see:

1. **Orders** → New order with:
   - Customer email
   - Line items (your AI art prints)
   - Custom properties (image URL, size, frame, etc.)
   - Payment status
   - Shipping address

2. **Custom Properties** on each line item:
   - Image URL (the AI-generated image)
   - Size, Medium, Frame, Mat selections

3. **Tags**: `ai-art`, `custom-print`

## Next Steps

1. ✅ Test the integration
2. Set up fulfillment workflow (how you'll print and ship)
3. Configure shipping rates in Shopify
4. Set up tax settings
5. Test with real payment

## Production Checklist

- [ ] Admin API token configured
- [ ] `write_draft_orders` permission enabled
- [ ] Test checkout completed successfully
- [ ] Order appears in Shopify admin
- [ ] Custom properties (image URL) visible on order
- [ ] Shipping rates configured
- [ ] Tax settings configured
- [ ] Fulfillment workflow planned

---

**This is the correct method!** Your visionpop project uses this same approach successfully.
