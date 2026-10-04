// api/chat.js
// Vercel serverless function compatible file.
// Deploy this file on Vercel (place at /api/chat.js in your repo) and set
// the environment variable OPENAI_API_KEY in your Vercel project settings.

export default async function handler(req, res) {
  // Allow preflight for CORS
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'No message provided' });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Server not configured' });

    // Call OpenAI Chat Completions
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a friendly assistant for christoflightX-1. Answer concisely and helpfully.' },
          { role: 'user', content: message }
        ],
        temperature: 0.8,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('OpenAI error:', response.status, text);
      return res.status(502).json({ error: 'AI provider error' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
