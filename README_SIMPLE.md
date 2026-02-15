# AI Art Generator

A streamlined AI-powered art generation app using Google's Gemini API.

## Features

- 🎨 Generate AI art from text prompts
- ⚡ Two quality modes (Standard & Premium)
- 📐 Multiple aspect ratios (Portrait, Square, Landscape, Wide)
- 🛒 Shopping cart for generated images
- 💳 Checkout flow

## Quick Setup

### 1. Get API Key

Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 2. Configure

Create `.env.local` in the project root:

```env
GOOGLE_AI_API_KEY=your_api_key_here
```

### 3. Install & Run

```bash
npm install
npm run dev
```

### 4. Test API Key

Visit http://localhost:3000/api/test-key to verify your API key is configured.

You should see:
```json
{
  "hasKey": true,
  "keyPrefix": "AIzaSyABC1...",
  "message": "✅ API key is configured"
}
```

### 5. Generate Art

1. Go to http://localhost:3000 (redirects to /create)
2. Enter a prompt or click a starting concept
3. Choose aspect ratio and quality
4. Click "Generate Art"
5. Wait 5-10 seconds for your images

## Troubleshooting

### Still Seeing Mock Images?

1. **Check API key is set**: Visit `/api/test-key`
2. **Restart the server**: Stop (Ctrl+C) and run `npm run dev` again
3. **Check .env.local location**: Must be in project root (same level as package.json)
4. **Check console logs**: Look for "🔑 API Key status" in terminal

### Common Issues

**"API Key status: NOT FOUND"**
- Make sure `.env.local` exists
- Check the file contains `GOOGLE_AI_API_KEY=...`
- No quotes around the API key
- Restart the server after creating/editing `.env.local`

**"Rate limit exceeded"**
- Free tier: 15 requests per minute
- Each generation = 4 requests
- Wait 60 seconds and try again

**Images take too long**
- Standard quality: 3-5 seconds per image
- Premium quality: 5-10 seconds per image
- Check your internet connection

## Project Structure

```
app/
  api/
    generate/route.ts       # Main image generation API
    enhance-prompt/route.ts # Prompt enhancement
    test-key/route.ts       # API key test endpoint
  create/page.tsx           # Generation studio page
  cart/page.tsx             # Shopping cart
  
components/
  create/
    generation-studio.tsx   # Main studio component
    prompt-panel.tsx        # Prompt input & controls
    results-panel.tsx       # Generated images display
  cart/
    cart-view.tsx           # Cart items & checkout
```

## API Costs

- **Standard**: ~$0.0025 per image
- **Premium**: ~$0.01-0.02 per image
- **Free tier**: Generous limits for testing

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Google Gemini API
- Framer Motion

## License

Private - All rights reserved
