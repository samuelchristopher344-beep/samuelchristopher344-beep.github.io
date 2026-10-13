# Build Instructions

This project uses esbuild to bundle JavaScript with Vercel Web Analytics.

## Development

The source JavaScript file is in `src/site.js` and the bundled output is `js/site.js`.

## Commands

- `npm run build` - Build the JavaScript bundle (minified)
- `npm run dev` - Watch for changes and rebuild automatically

## Making Changes

1. Edit `src/site.js` (not `js/site.js`)
2. Run `npm run build` to generate the bundled output
3. The bundled `js/site.js` should be committed to the repository

## Vercel Web Analytics

Vercel Web Analytics is automatically injected via the `inject()` function from `@vercel/analytics` in the source file. The analytics will:
- Track page views automatically
- Work in production when deployed to Vercel
- Show debug information in development mode

To enable analytics in your Vercel dashboard:
1. Navigate to your project settings
2. Go to the Analytics section
3. Click "Enable Web Analytics"
