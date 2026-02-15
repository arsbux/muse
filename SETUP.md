# Muse - Setup Guide for Real Image Generation

This guide will help you set up real AI image generation using Google's Gemini API (Nano Banana).

## Quick Start

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and add your API key:

```env
GOOGLE_AI_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## How It Works

### Image Generation Flow

1. **User Input** → User enters a prompt in the Generation Studio
2. **Prompt Enhancement** → The prompt is enhanced with style profile data
3. **Gemini API Call** → Enhanced prompt is sent to Gemini's image generation model
4. **Image Response** → Gemini returns base64-encoded images
5. **Display** → Images are displayed as data URLs in the UI

### Models Available

- **Standard Quality**: `gemini-2.5-flash-image` (Nano Banana)
  - Fast generation
  - 1024px resolution
  - Lower cost
  - Best for: Quick iterations, high-volume generation

- **Premium Quality**: `gemini-3-pro-image-preview` (Nano Banana Pro)
  - Advanced reasoning ("Thinking" mode)
  - Up to 4K resolution (configured for 2K in this app)
  - Better text rendering
  - Google Search grounding
  - Best for: Professional assets, complex prompts

### Aspect Ratios Supported

- Portrait (3:4): 864x1184
- Square (1:1): 1024x1024
- Landscape (4:3): 1184x864
- Wide (16:9): 1344x768

## Testing the Integration

### 1. Without API Key (Mock Mode)

If you don't add an API key, the app will automatically fall back to mock mode using the gallery images. You'll see a warning in the console:

```
⚠️  GOOGLE_AI_API_KEY not found - using mock images
```

### 2. With API Key (Real Generation)

Once you add your API key:

1. Go to `/discover` and complete the style quiz
2. Navigate to `/create` (Generation Studio)
3. Enter a prompt like: "A serene mountain landscape at sunset with vibrant colors"
4. Click "Generate Art"
5. Wait 5-10 seconds for real AI-generated images

## Troubleshooting

### Images Not Generating

**Problem**: API key not working
**Solution**: 
- Verify your API key is correct in `.env.local`
- Restart the dev server after adding the key
- Check the console for error messages

**Problem**: Rate limit errors
**Solution**:
- Gemini has rate limits (15 requests per minute for free tier)
- Wait a minute and try again
- Consider upgrading your API quota

### Mock Images Still Showing

**Problem**: Still seeing gallery images after adding API key
**Solution**:
- Restart the development server (`npm run dev`)
- Clear your browser cache
- Check that `.env.local` is in the project root (not in a subdirectory)

### API Errors

**Problem**: 400 Bad Request
**Solution**:
- Check that your prompt isn't too long (max ~2000 characters)
- Verify the aspect ratio is valid

**Problem**: 429 Too Many Requests
**Solution**:
- You've hit the rate limit
- Wait 60 seconds before trying again

## Cost Considerations

### Gemini API Pricing (as of Feb 2026)

- **gemini-2.5-flash-image**: ~$0.0025 per image
- **gemini-3-pro-image-preview**: ~$0.01-0.02 per image (varies by resolution)

### Free Tier

- Google provides a generous free tier
- Check current limits at [Google AI Pricing](https://ai.google.dev/pricing)

### Optimization Tips

1. Use Standard quality for testing and iterations
2. Use Premium quality only for final production images
3. Implement caching for repeated prompts
4. Consider batch generation for multiple images

## Advanced Configuration

### Customizing Image Generation

Edit `app/api/generate/route.ts` to customize:

```typescript
// Change default resolution for premium
imageConfig: {
  aspectRatio: aspectRatio,
  imageSize: "4K"  // Options: "1K", "2K", "4K"
}

// Add Google Search grounding (premium only)
tools: [{ googleSearch: {} }]
```

### Adding More Models

You can add support for other Gemini models by modifying the model selection logic:

```typescript
const modelName = quality === "premium" 
  ? "gemini-3-pro-image-preview" 
  : quality === "ultra"
  ? "gemini-3-ultra-image-preview"  // If available
  : "gemini-2.5-flash-image"
```

## Next Steps

### Production Deployment

1. **Environment Variables**: Add `GOOGLE_AI_API_KEY` to your hosting platform
2. **Rate Limiting**: Implement rate limiting on your API routes
3. **Caching**: Cache generated images to reduce API calls
4. **Error Handling**: Add user-friendly error messages
5. **Analytics**: Track generation success rates

### Optional Integrations

The app is also ready for:
- **Shopify Storefront API**: For real checkout
- **Printful API**: For print-on-demand fulfillment
- **Anthropic Claude**: For better prompt enhancement

See the main README.md for details on these integrations.

## Support

- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Pricing](https://ai.google.dev/pricing)

## License

Private - All rights reserved
