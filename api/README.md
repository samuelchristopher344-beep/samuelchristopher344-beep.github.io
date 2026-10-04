# Backend for christoflightX-1 AI assistant

This repo contains a simple serverless function you can deploy to Vercel (or Netlify) to power the AI assistant on your GitHub Pages site without exposing the OpenAI API key in client-side code.

## Files
- `api/chat.js` - Vercel-compatible serverless function. Accepts POST requests with JSON body `{ "message": "..." }` and returns `{ "reply": "..." }`.

## Deploy to Vercel (recommended)
1. Create a new GitHub repo or use this repo and push the `api/` folder to it.
2. Sign in to Vercel and import the repo.
3. In your Vercel project settings > Environment Variables, add:
   - `OPENAI_API_KEY` = your OpenAI API key (do NOT commit this to GitHub)
   - Optional: `ALLOWED_ORIGIN` = `https://<your-username>.github.io` to restrict CORS.
4. Deploy the project. The function will be available at `https://<your-vercel-project>.vercel.app/api/chat`.

## Netlify
You can adapt `api/chat.js` to a Netlify function (`netlify/functions/chat.js`) with minor changes (use `exports.handler`). The logic is the same.

## Frontend (GitHub Pages)
In your `index.html` update the assistant config to point to the deployed function URL, for example:

```js
window.AI_ASSISTANT_CONFIG = {
  enabled: true,
  assistantUrl: 'https://<your-vercel-project>.vercel.app/api/chat',
  useFallbackWhenDown: true
};
```

Then the frontend will call your backend endpoint; the backend calls OpenAI using the secret stored in environment variables.

## Testing
From the command line (replace URL):

```bash
curl -X POST https://<your-vercel-project>.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

## Security recommendations
- Rotate the API key if it was previously exposed.
- Do not commit any secrets or `.env` files to the repository.
- Set `ALLOWED_ORIGIN` to restrict which origins can call the function.
- Consider adding rate limiting and CAPTCHA to prevent abuse.

## Notes
- The function uses the Chat Completions endpoint and `gpt-4o-mini` as the model. Adjust model and parameters as needed.
