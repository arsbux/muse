# Troubleshooting Guide

## Common Issues and Solutions

### 1. Images Not Generating (Still Seeing Gallery Images)

#### Symptom
After adding API key, you still see the same gallery images instead of AI-generated ones.

#### Solutions

**A. Restart the Development Server**
```bash
# Stop the server (Ctrl+C or Cmd+C)
# Then restart:
npm run dev
```

**B. Verify API Key Location**
- Check that `.env.local` is in the project ROOT directory
- NOT in `/app`, `/components`, or any subdirectory
- File should be at the same level as `package.json`

**C. Check API Key Format**
```env
# ✅ CORRECT
GOOGLE_AI_API_KEY=AIzaSyABC123...

# ❌ WRONG - No quotes
GOOGLE_AI_API_KEY="AIzaSyABC123..."

# ❌ WRONG - No spaces
GOOGLE_AI_API_KEY = AIzaSyABC123...
```

**D. Verify in Console**
Open browser DevTools (F12) and check the Console tab:
- ✅ Should NOT see: "GOOGLE_AI_API_KEY not found"
- ✅ Should see API calls to Gemini

### 2. API Key Invalid Error

#### Symptom
```
Error: API_KEY_INVALID
```

#### Solutions

**A. Get a Fresh API Key**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Delete old key (if exists)
3. Create new API key
4. Copy the ENTIRE key (starts with `AIza`)
5. Paste into `.env.local`

**B. Check for Hidden Characters**
- Copy key directly from Google AI Studio
- Don't copy from email or other sources
- Avoid extra spaces or line breaks

**C. Verify API Key is Active**
- Run test script: `node test-gemini.js`
- Should show success message

### 3. Rate Limit Exceeded (429 Error)

#### Symptom
```
Error: 429 Too Many Requests
```

#### Understanding Rate Limits
- **Free Tier**: 15 requests per minute
- **Each Generation**: 4 requests (one per image)
- **Max Generations**: ~3 per minute

#### Solutions

**A. Wait and Retry**
- Wait 60 seconds
- Try generating again

**B. Reduce Generation Frequency**
- Don't click "Generate" multiple times rapidly
- Wait for current generation to complete

**C. Use Standard Quality**
- Standard quality is faster
- Reduces API load

**D. Upgrade API Quota** (if needed)
- Visit [Google AI Studio](https://aistudio.google.com/)
- Check billing settings
- Upgrade to paid tier for higher limits

### 4. Generation Takes Too Long

#### Symptom
Waiting more than 30 seconds for images.

#### Solutions

**A. Check Network Connection**
- Ensure stable internet connection
- Try refreshing the page

**B. Use Standard Quality**
- Premium quality takes longer (5-10s per image)
- Standard quality is faster (3-5s per image)

**C. Check API Status**
- Visit [Google Cloud Status](https://status.cloud.google.com/)
- Check for Gemini API outages

**D. Reduce Image Count** (if you modified the code)
- Default is 4 images per generation
- Fewer images = faster generation

### 5. Images Look Wrong or Corrupted

#### Symptom
Images display as broken or show strange artifacts.

#### Solutions

**A. Check Browser Console**
- Look for errors in DevTools (F12)
- Check Network tab for failed requests

**B. Clear Browser Cache**
```bash
# Chrome/Edge: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
# Safari: Cmd+Option+E
```

**C. Try Different Browser**
- Test in Chrome, Firefox, or Safari
- Some browsers handle data URLs differently

**D. Check Image Size**
- Very large images may cause issues
- Premium 4K images are large files

### 6. Quota Exceeded Error

#### Symptom
```
Error: Quota exceeded
```

#### Solutions

**A. Check Usage**
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Check your usage dashboard
3. See remaining quota

**B. Wait for Quota Reset**
- Daily quotas reset at midnight UTC
- Monthly quotas reset on the 1st

**C. Upgrade Plan**
- Free tier has limits
- Paid tier has higher quotas
- Check [pricing](https://ai.google.dev/pricing)

### 7. TypeScript Errors

#### Symptom
Red squiggly lines in VS Code or build errors.

#### Solutions

**A. Install Dependencies**
```bash
npm install
```

**B. Restart TypeScript Server**
- VS Code: Cmd/Ctrl + Shift + P
- Type: "TypeScript: Restart TS Server"

**C. Check Node Version**
```bash
node --version
# Should be 18.x or higher
```

### 8. Build Errors

#### Symptom
```
npm run build
# Errors during build
```

#### Solutions

**A. Clean Install**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

**B. Check Environment Variables**
- Build-time variables must be in `.env.local`
- Or set in hosting platform

**C. Check TypeScript Errors**
```bash
npm run lint
```

### 9. Mock Images Still Showing in Production

#### Symptom
Deployed app shows gallery images instead of AI-generated ones.

#### Solutions

**A. Set Environment Variable in Hosting Platform**

**Vercel:**
1. Go to Project Settings
2. Environment Variables
3. Add `GOOGLE_AI_API_KEY`
4. Redeploy

**Netlify:**
1. Site Settings
2. Environment Variables
3. Add `GOOGLE_AI_API_KEY`
4. Redeploy

**Other Platforms:**
- Check platform documentation
- Add environment variable
- Redeploy application

**B. Verify Variable is Set**
- Check deployment logs
- Should NOT see "API key not found" warning

### 10. Test Script Fails

#### Symptom
```bash
node test-gemini.js
# Shows errors
```

#### Solutions

**A. Check Node Version**
```bash
node --version
# Should be 18.x or higher
```

**B. Install Dependencies**
```bash
npm install
```

**C. Check .env.local**
- File exists in project root
- Contains valid API key
- No syntax errors

**D. Run with Explicit Env**
```bash
GOOGLE_AI_API_KEY=your_key_here node test-gemini.js
```

## Getting Help

### Check Logs

**Browser Console:**
- Open DevTools (F12)
- Check Console tab
- Look for error messages

**Server Logs:**
- Check terminal where `npm run dev` is running
- Look for API errors
- Check for warnings

### Test API Directly

Run the test script:
```bash
node test-gemini.js
```

This will show exactly what's wrong.

### Verify Setup

1. ✅ `.env.local` exists in project root
2. ✅ Contains `GOOGLE_AI_API_KEY=...`
3. ✅ API key is valid (test with script)
4. ✅ Dependencies installed (`npm install`)
5. ✅ Server restarted after adding key
6. ✅ No TypeScript errors

### Still Stuck?

1. **Check Documentation:**
   - [QUICK_START.md](./QUICK_START.md)
   - [SETUP.md](./SETUP.md)
   - [Gemini API Docs](https://ai.google.dev/gemini-api/docs/image-generation)

2. **Check API Status:**
   - [Google Cloud Status](https://status.cloud.google.com/)

3. **Review Error Messages:**
   - Browser console
   - Server terminal
   - Test script output

4. **Try Fresh Start:**
   ```bash
   # Clean everything
   rm -rf node_modules .next
   rm package-lock.json
   
   # Reinstall
   npm install
   
   # Restart
   npm run dev
   ```

## Prevention Tips

### Best Practices

1. **Always restart server** after changing `.env.local`
2. **Test API key** with `node test-gemini.js` before using app
3. **Monitor rate limits** - don't spam generate button
4. **Use standard quality** for testing
5. **Check console** for warnings/errors
6. **Keep dependencies updated** with `npm update`

### Development Workflow

```bash
# 1. Make changes to .env.local
# 2. Stop server (Ctrl+C)
# 3. Test API
node test-gemini.js
# 4. Restart server
npm run dev
# 5. Test in browser
```

---

**Still having issues?** Check the [Gemini API Documentation](https://ai.google.dev/gemini-api/docs/image-generation) or create an issue in the project repository.
