# 🚀 Quick Start - Get Real AI Image Generation Working in 5 Minutes

## Step 1: Get Your API Key (2 minutes)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the key (starts with `AIza...`)

## Step 2: Configure Your Project (1 minute)

1. Create `.env.local` file in the project root:

```bash
# On Mac/Linux
cp .env.local.example .env.local

# On Windows
copy .env.local.example .env.local
```

2. Open `.env.local` and paste your API key:

```env
GOOGLE_AI_API_KEY=AIzaSy...your_actual_key_here
```

## Step 3: Install & Run (2 minutes)

```bash
# Install dependencies
npm install

# Test the API connection (optional but recommended)
node test-gemini.js

# Start the development server
npm run dev
```

## Step 4: Generate Your First AI Art! 🎨

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Discover Your Style" or go to `/discover`
3. Complete the 5-step style quiz
4. Click "Start Creating" or go to `/create`
5. Enter a prompt like:
   - "A serene mountain lake at sunrise with soft mist"
   - "Abstract geometric patterns in warm sunset colors"
   - "A cozy reading nook with plants and natural light"
6. Click "Generate Art"
7. Wait 5-10 seconds for your AI-generated images!

## What You Get

- ✅ **4 unique images** per generation
- ✅ **Two quality modes**: Standard (fast) and Premium (high-res)
- ✅ **Multiple aspect ratios**: Portrait, Square, Landscape, Wide
- ✅ **Style-aware generation**: Uses your quiz results to personalize images
- ✅ **Automatic fallback**: Works with mock images if API key is missing

## Troubleshooting

### "Still seeing gallery images"
- Restart the dev server: Stop (Ctrl+C) and run `npm run dev` again
- Check `.env.local` is in the project root (not in a subfolder)
- Verify your API key is correct

### "API key invalid"
- Make sure you copied the entire key (starts with `AIza`)
- Get a fresh key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### "Rate limit exceeded"
- Free tier: 15 requests per minute
- Wait 60 seconds and try again
- Each generation = 4 API calls (one per image)

## Cost

- **Free tier**: Generous limits for testing
- **Standard quality**: ~$0.0025 per image
- **Premium quality**: ~$0.01-0.02 per image

Generating 100 images in standard quality ≈ $0.25

## Next Steps

- 📖 Read [SETUP.md](./SETUP.md) for detailed configuration
- 🎨 Experiment with different prompts and styles
- 🛍️ Configure products at `/configure/[imageId]`
- 🛒 Test the shopping cart at `/cart`

## Need Help?

- [Gemini API Docs](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google AI Studio](https://aistudio.google.com/)
- Check the console for error messages

---

**That's it!** You now have a fully functional AI art generation platform powered by Google's Gemini. 🎉
