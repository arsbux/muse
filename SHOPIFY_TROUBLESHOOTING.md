# Shopify 401 Unauthorized - Troubleshooting Guide

## Quick Fix Steps

### Step 1: Test Your Configuration

Visit: **http://localhost:3000/api/test-shopify**

This will show you exactly what's wrong.

### Step 2: Common Issues

#### Issue 1: Token Not Installed

**Problem**: You created the app but didn't install it.

**Solution**:
1. Go to Shopify admin → Settings → Apps and sales channels → Develop apps
2. Click on your "AI Art Generator" app
3. Click **"Install app"** button
4. Copy the NEW token that appears
5. Update `.env.local` with the new token
6. Restart dev server

#### Issue 2: Wrong API Scopes

**Problem**: Token doesn't have Storefront API permissions.

**Solution**:
1. Go to your app in Shopify admin
2. Click **"Configuration"** tab
3. Scroll to **"Storefront API integration"**
4. Click **"Configure"**
5. Enable these scopes:
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_checkouts`  
   - ✅ `unauthenticated_read_product_listings`
6. Click **"Save"**
7. **Reinstall the app** (this is important!)
8. Copy the NEW token
9. Update `.env.local`
10. Restart dev server

#### Issue 3: Using Admin API Token Instead of Storefront API Token

**Problem**: You copied the Admin API token instead of Storefront API token.

**Solution**:
1. Go to your app → **"API credentials"** tab
2. Look for **"Storefront API access token"** section (NOT Admin API)
3. The token should start with `shpat_`
4. Copy this token
5. Update `.env.local`
6. Restart dev server

#### Issue 4: Store Domain Incorrect

**Problem**: Store domain has extra characters or is wrong format.

**Correct format**: `your-store.myshopify.com`

**Wrong formats**:
- ❌ `https://your-store.myshopify.com` (no https://)
- ❌ `your-store.myshopify.com/` (no trailing slash)
- ❌ `your-store` (missing .myshopify.com)

**Solution**:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=visionpop-3.myshopify.com
```

#### Issue 5: Environment Variables Not Loading

**Problem**: `.env.local` changes not picked up.

**Solution**:
1. Stop the dev server (Ctrl+C)
2. Check `.env.local` is in project root (same folder as `package.json`)
3. Verify no typos in variable names (must be EXACT)
4. Restart: `npm run dev`

### Step 3: Verify Your .env.local

Your `.env.local` should look EXACTLY like this:

```env
# Google Gemini API Configuration
GOOGLE_AI_API_KEY=your_google_api_key_here

# Shopify Storefront API Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_your_token_here
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
```

**Important**:
- No quotes around values
- No spaces around `=`
- Token starts with `shpat_`
- Domain ends with `.myshopify.com`

## Detailed Debugging

### Check 1: Verify Token Format

Your token should:
- Start with `shpat_`
- Be about 32 characters long
- Come from **Storefront API** section (not Admin API)

### Check 2: Verify App Installation

1. Go to Shopify admin
2. Settings → Apps and sales channels
3. Look for your app in the list
4. Status should be "Installed"
5. If not, click on it and click "Install app"

### Check 3: Test API Connection

Run this in your browser:

```
http://localhost:3000/api/test-shopify
```

You should see:
```json
{
  "configured": true,
  "connected": true,
  "message": "✅ Shopify connection successful!",
  "shop": {
    "name": "Your Store Name"
  }
}
```

If you see 401 error, the token is wrong.

### Check 4: Verify API Scopes

The app needs these Storefront API scopes:

**Required**:
- `unauthenticated_write_checkouts` - Create carts
- `unauthenticated_read_checkouts` - Read cart data
- `unauthenticated_read_product_listings` - Read products

**How to check**:
1. Go to your app → Configuration
2. Scroll to "Storefront API integration"
3. Verify all three scopes are checked
4. If you changed them, you MUST reinstall the app

## Still Not Working?

### Option 1: Create a New App

Sometimes it's easier to start fresh:

1. Go to Shopify admin → Settings → Apps and sales channels → Develop apps
2. Click "Create an app"
3. Name: "AI Art Generator v2"
4. Click "Create app"
5. Go to "Configuration" tab
6. Click "Configure" under Storefront API
7. Enable the three scopes listed above
8. Click "Save"
9. Go to "API credentials" tab
10. Click "Install app"
11. Copy the Storefront API access token
12. Update `.env.local`
13. Restart dev server

### Option 2: Use Development Store

If you're using a development store:

1. Make sure it's not password protected
2. Or add your IP to the allowlist
3. Development stores sometimes have restrictions

### Option 3: Check Shopify Status

Visit: https://www.shopifystatus.com/

Make sure Shopify APIs are operational.

## Success Checklist

- [ ] App created in Shopify admin
- [ ] Storefront API scopes enabled
- [ ] App installed (not just created)
- [ ] Storefront API token copied (starts with `shpat_`)
- [ ] `.env.local` has all three variables
- [ ] No typos in environment variable names
- [ ] Dev server restarted after changes
- [ ] Test endpoint shows "connected: true"

## Get Help

If still stuck:

1. Check the test endpoint: `/api/test-shopify`
2. Look at terminal logs for detailed error messages
3. Verify token in Shopify admin matches `.env.local` exactly
4. Try creating a new app from scratch

---

**Most common fix**: Reinstall the app after enabling API scopes, then copy the NEW token.
