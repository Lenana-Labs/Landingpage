# LenanaLabs

An early-stage Kenya-based engineering studio website, implemented in the existing Next.js 16.4.3 / React 19.3 / Tailwind CSS 4 application. The cream, burnt orange, pine green, typography, and procedural survey plate come from `../final.html`.

## Run

Use Node 22+ and npm. Run these commands from `lenanalabs/`, not its parent directory. Lucide React supplies interface icons; no graphics, animation, or additional test framework was added.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm run start -- --port 3100
npm run test:browser
```

On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`. Browser tests use the repository's existing Taste skill Chrome DevTools driver; Chrome or Edge must be installed. Set `TEST_URL` to change the default `http://localhost:3100`.

## Component responsibilities

- `src/app/page.tsx`: server-rendered page composition; one component per required section.
- `src/app/not-found.tsx`: branded 404 with shared contour geometry and links back to the studio.
- `src/components/sections/`: Hero, About, Capabilities, Approach, Lab, Contact, header and footer.
- `src/components/layout/MobileNavigation.tsx`: native modal dialog, keyboard containment, Escape, focus restoration, desktop resize cleanup, body scroll lock. The rest of the header stays on the server.
- `src/components/visuals/`: shared brand mark, decorative capability glyphs, interactive terrain.
- `src/lib/terrain.ts`: deterministic contour paths, bounded sampling and illustrative elevation; no DOM or React dependencies.
- `src/components/ui/BriefField.tsx`: reusable field labels, limits and error associations.
- `src/components/forms/ContactForm.tsx`: form state and mailto draft handoff. `src/lib/contact.ts` holds independently testable validation and encoding.
- `src/components/ui/EmailContact.tsx`: direct email, clipboard feedback and selectable fallback on clipboard failure.
- `src/components/ui/Reveal.tsx`: optional, restrained section entrances; content is visible without JavaScript.

## Content

`src/config/site.ts` is the source for the contact email, location, time zone, business hours and social links. Reference values are provisional: confirm them before launch. No social accounts have been invented.

Edit `src/data/capabilities.ts` for the three capabilities. Add only verified, publishable work to `src/data/projects.ts`; the Lab automatically switches from its compact empty state to entries. Only HTTP(S) project URLs become links, with safe new-tab attributes. Test fixtures are never included in public data.

Unused legacy components, their compatibility content file, placeholder product records, boilerplate public assets, unused photographs, the old favicon, duplicate HTML prototypes and superseded root design plans were removed after an import-graph audit. The primary reference `../final.html` and project instructions are retained.

## Terrain behavior

The survey plate represents synthetic terrain, not geographic measurements. Initial values render on the server. Pointer and touch positions are transformed through the SVG matrix, so scaling and letterboxing are handled correctly after resize. Arrow keys move the sample; Home or Escape resets it. Touch samples persist after lifting a finger. Pointer exit/cancellation resets the sample and cancels pending work.

Continuous events are coalesced through one animation frame. Identical points do not trigger a state update. Pending work is cancelled on component unmount. Sampling also works with reduced motion and without requestAnimationFrame. No graphics library is required.

## Contact delivery

No email delivery provider or server credentials were configured in the repository. This implementation therefore uses the requested **mailto fallback**, not a submission endpoint. The form validates name, email and the problem description, then opens a draft for the visitor to review and send. It never claims delivery or clears the draft as if delivery had occurred. The direct email link works without JavaScript. If no email app is installed, visitors can copy the address.

No messages are stored or transmitted to a server, so server validation, submission loading, provider errors, spam filtering and endpoint rate limiting are not applicable to this fallback. Before adding server delivery, configure an authorized provider and implement server validation, shared rate limiting, anti-spam measures, and provider-confirmed success together. Do not put credentials in `NEXT_PUBLIC_*` variables.

## Metadata and deployment

Local development needs no domain or environment configuration. Leave `NEXT_PUBLIC_SITE_URL` unset for now. The sitemap remains empty and Next.js uses localhost for generated social-image URLs; its metadata warning is expected locally. When a production domain is available, set that variable to the verified origin before rebuilding. The title, description, Open Graph image, SVG icon, robots and conditional sitemap use App Router metadata conventions.

The existing Turbopack/Tailwind loader is preserved, and `turbopack.root` explicitly points to this application directory. Keep npm dependencies and the lockfile here. No hosting provider configuration was added. The cached footer year is compatible with Cache Components.

## Verification

`npm test` uses Node's test runner and the installed TypeScript compiler. It verifies real source modules for contour geometry, elevation, bounds, validation, email encoding, Lab empty/populated rendering and unsafe-link rejection.

`npm run test:browser` checks 320, 375, 768, 1024, 1440 and 1920px against the production build. It covers overflow, anchors, required sections, pointer/touch/keyboard sampling, pointer exit, animation-frame batching/cancellation, missing animation-frame support, reduced motion, no-script rendering, mobile dialog focus, Escape, scroll restoration, resizing, contact validation, draft handoff and clipboard fallback. Screenshots and JSON results are written to ignored `.taste-skill/qa/`.

The browser runner also includes HTTP status, responsive layout, and return-home checks for the custom 404. To skip contact behavior checks in PowerShell:

```powershell
$env:SKIP_CONTACT_TESTS = "1"
npm.cmd run test:browser
```

The About/Projects implementation recorded passing lint, type checking, a production build, non-email unit tests, responsive browser checks and landing/404 regression checks. After the owner's request for three visible team placeholders, the focused team test passed; the full suite was not repeated for that small content update. The focused team test and earlier implementation checks are separate verification records; the full suite was not rerun for the placeholder content update. A successful build alone does not verify every interaction, and historical Lighthouse results do not certify subsequent changes. Email tests remain excluded at the owner's request.

See `IMPLEMENTATION_REVIEW.md` for the change inventory, quality review, measured results and launch dependencies. Automated accessibility checks complement, but do not replace, assistive-technology and real-device testing.

## About and Projects

`/about` and `/projects` implement the approved designs in `../design/prototypes/` and `../design/specification.md`. Both reuse the header, footer, fonts, palette and Lucide controls. Page-specific CSS is scoped under `.about-page` and `.projects-page`; it does not change the landing page's section styles. The existing Tailwind loader is preserved.

The About page includes the editorial story, four principles, an illustrative decision tree, five-step method, exploration loop and permanent team section. Pointer/tap readouts are backed by a native disclosure and a full mobile explanation list. At the owner's request, `src/data/team.ts` currently contains three clearly labeled placeholders: `Team member 01`, `Team member 02`, and `Team member 03`, each with the role `Profile placeholder`. These are not real identities or verified roles. There is no team toggle, demo mode or alternate empty presentation. Portraits and optional fields collapse cleanly; absent portraits use monograms.

Replace each placeholder's `name`, `role` and `bio` with approved profile details while retaining its stable `id`. Add optional `expertise`, `interests`, `portrait` and `links` only when approved. Do not add fictional biographies, stock identities or unverified responsibilities. All three profiles use the same reusable presentation and prominence.

`src/data/projects.ts` remains the single project registry. `getPublicProjects()` is the server-side publication boundary. Records require `visibility: "public"`; engineering status never publishes a record. Client projects additionally require `client.approvedForPublication: true`. Ambiguous duplicate slugs and invalid slugs are rejected. Legacy `open-source`/`active` values normalize to `experiment`/`in-development`. Both the landing Lab and Projects archive use this boundary.

Featured placement requires `featured: true`. Missing images produce a text composition rather than a pretend preview. When public projects exist, the archive index derives its marks/counts from visible public records, with no capacity limit. For the empty archive, the owner requested illustrative placeholder marks: **2 client work, 4 internal products, and 3 experiments**. These counts live in `src/data/archive-placeholders.ts`; the figure explicitly labels them as placeholders, and they do not create project records or alter public project totals. Real entries automatically replace the placeholder presentation. Filters appear only when at least two categories have public entries. Approved case studies can link to verified external URLs; no detail-page design was supplied, so no `/projects/[slug]` route or placeholder links were added.

Navigation now supports Home, About, Capabilities, Projects and Contact. Existing Approach and Lab anchors remain available in the footer and at `/#approach` and `/#lab`. Sitemap entries for the new routes are emitted only when `NEXT_PUBLIC_SITE_URL` is configured.

Additional checks:

```sh
node --test --test-skip-pattern="contact requires|fallback safely" scripts/*.test.mjs
npm run test:pages
```

`test:pages` uses the existing Chrome driver plus Next's installed Webpack to build an ignored, isolated test fixture. It exercises actual React archive filters without adding production fixture routes, profiles, modes or projects. Images use a small stub only in that filter harness; the Node tests exercise the actual Next image component. Screenshots distinguish production pages from test-only team/project fixtures. Outputs live in `.taste-skill/pages/`. Set `SKIP_CONTACT_TESTS=1` when running `test:browser` to skip email checks, as requested for this work.

Approved real team details remain outstanding. The public project registry is intentionally empty; its illustrative archive marks are not published work.
