# Lenana Labs

Next.js 16 / React 19 / Tailwind CSS 4 website. The design combines editorial typography with softer surfaces, restrained color, and responsive layouts.

## Development

Run `npm install`, then `npm run dev`. On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

## Content

Edit `src/content/site.ts` to change products, capabilities, navigation, and the contact email. Products are placeholders retained at the owner's request. Replace their records and workflow concepts with real product information and imagery when ready.

The temporary email is `ngigemwaniki2004@gmail.com`. The project brief stays in browser memory. No message is submitted to a server: visitors review and send it in their email app. Product enquiry links carry the selected product into this brief. The copy icon copies the email address; selectable text appears only if clipboard access fails.

The existing Nairobi photograph is retained in `public/images/hero-bg.jpg`. Confirm its source and usage rights before publication. Unverified statistics, testimonials, and stock team identities are no longer rendered.

## Production

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the actual origin before building. This supplies correct absolute social image URLs. Local development falls back to `http://localhost:3000`.

Run separately:

```sh
npm run lint
npm run build
npm run start -- --port 3100
```

The branded favicon, SVG icon, and generated Open Graph image are in `src/app`.

## Browser checks

`node scripts/browser-smoke.mjs` runs against the production server on port 3100. Set `TEST_URL` for a different origin. It uses the installed Taste skill's Chrome driver and requires Node 22+ and Chrome or Edge.

Checks cover 360, 390, 768, 1024, and 1440px; overflow; anchor destinations; loaded images; browser exceptions; keyboard menu activation; Escape/focus return; menu closing; email encoding; product enquiry context; draft preservation; copy feedback; clipboard failure recovery; resize behavior; and reduced motion. Screenshots and results are written to `.taste-skill/qa`.

For design measurements:

```sh
node .agents/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3100 --out .taste-skill/after
```

Style warnings about modest borders, static reading, labeled workflow concepts, and the absence of extra photography are intentional tradeoffs. No unapproved stock identities or automatic animation is added to satisfy quotas.

Legacy section/card components are retained but not imported by the current homepage. Verify their content before reuse.
