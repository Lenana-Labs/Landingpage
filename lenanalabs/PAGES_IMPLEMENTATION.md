# About and Projects — implementation status

Updated: 2026-11-02.

Historical initial implementation record. For the current grouped Projects archive, see PROJECTS_IMPLEMENTATION.md. For Contact and interim legal pages, see README.md and LEGAL_PAGES.md; those later implementations supersede the relevant behavior below.

## Implementation summary

Native `/about` and `/projects` routes reuse the existing fonts, palette, header, mobile navigation, footer and Lucide controls. The landing page and custom 404 remain in place.

About includes the editorial hero and story, four principles, interactive illustrative decision tree, accessible disclosure, mobile explanation list, five-step method, exploration diagram, team section and closing CTA.

Projects supports an honest empty archive, explicitly featured public projects, category filters, indexed rows, approved client metadata, optional imagery and verified external links. No project-detail design was approved, so no `/projects/[slug]` implementation or placeholder case-study links were added.

## Team placeholders

The owner requested three visible placeholders after the initial implementation:

- `Team member 01`
- `Team member 02`
- `Team member 03`

Each displays `Profile placeholder` and `Name, role and introduction to be added.` These are intentionally generic labels, not fictional people presented as real. The permanent team section has no empty-state toggle or demonstration mode.

Edit `src/data/team.ts` to replace their names, roles and biographies with approved details. Retain stable IDs. Portraits, expertise, interests and links are optional; absent portraits use monograms. The component supports additional members without changing the page structure.

## Project publication

`src/data/projects.ts` remains the single registry. The current array is empty.

- `visibility: "public"` explicitly permits publication; an engineering status of `published` does not.
- Client projects also require `client.approvedForPublication: true`.
- `getPublicProjects()` filters and projects records on the server before interactive components receive them.
- Invalid or ambiguous duplicate slugs are excluded. Unsafe external URLs are rejected.
- Featured placement requires `featured: true`; it is never inferred from array position.
- Counts and index marks derive from public records. Filters appear only when they provide a meaningful category choice.

The landing Lab uses the same publication boundary. Prototype projects, review hashes and fictional client outcomes are not application data.

## Main files

| Area | Files and responsibility |
| --- | --- |
| Routes | `src/app/about/page.tsx`, `src/app/projects/page.tsx` — page composition and metadata |
| Scoped styles | `src/app/about/about.css`, `src/app/projects/projects.css` — approved page layouts without a second token system |
| About components | `src/components/about/` — hero, story, beliefs, decision tree, method, exploration diagram and team |
| Project components | `src/components/projects/` — server publication boundary, archive index, interactive filters and entries |
| Shared integration | `src/components/sections/header.tsx`, `footer.tsx`, `src/components/layout/MobileNavigation.tsx`, `ClosingCta.tsx` |
| Data | `src/data/team.ts`, `projects.ts`, `principles.ts`, `decisions.ts`, `method.ts` |
| Navigation and metadata | `src/config/site.ts`, `src/app/sitemap.ts` |
| Tests | `scripts/pages.test.mjs`, `pages-browser.mjs`, `test-source.mjs`, `project-harness.mjs` |

Navigation supports Home, About, Capabilities, Projects and Contact. Existing Approach and Lab anchors remain reachable through the footer. New routes enter the sitemap when a verified production origin is configured.

## Verification record

This is a record of executed checks, not a claim that documentation edits reran the full suite.

- The implementation work recorded passing lint, TypeScript checking and a production build.
- Thirteen relevant non-email unit tests passed before the owner requested visible team placeholders.
- Browser records cover About and Projects at 320, 375, 768, 1024, 1440 and 1920px, including diagram explanations, navigation, reduced motion, no-script content and isolated project-filter/team fixtures.
- Landing-page and custom-404 regression checks passed with email checks disabled.
- After adding the three placeholders, the focused team test passed: `node --test --test-name-pattern="team supports" scripts/pages.test.mjs`.
- The full build/browser suite was not repeated as part of the placeholder or documentation updates. Email testing remains stopped at the owner's request.

For a fresh non-email verification run, execute from `lenanalabs/`:

```sh
npm run lint
npm run typecheck
node --test --test-skip-pattern="contact requires|fallback safely" scripts/*.test.mjs
npm run build
npm run start -- --port 3100
```

Then run `npm run test:pages` in another terminal. For landing/404 checks in PowerShell:

```powershell
$env:SKIP_CONTACT_TESTS = "1"
npm.cmd run test:browser
```

Generated fixtures and screenshots live under ignored `.taste-skill/`; they are not production routes or assets. The filter harness tests actual React archive behavior with test-only data, while the image component is exercised separately in server-rendering tests.

## GitHub publication

Both commits were pushed to `origin/main`:

1. `67f9b04` — `docs: add approved About and Projects design references`
2. `d041ec2` — `feat: implement About and Projects pages with team placeholders`

The working tree was clean and local `main` matched `origin/main` immediately after that push. Documentation changes made afterward require a subsequent commit/push.

## Content dependencies and limitations

Approved real team names, roles and biographies remain outstanding; portraits and links are optional. No public project or client assets have been supplied, so the Projects empty state is intentional.

A verified production origin is still needed for absolute metadata and a populated sitemap. Contact remains an explicitly described mailto fallback. Manual assistive-technology testing and real-device certification are not claimed. Accessibility findings from implementation should be rechecked against the latest build before launch; historical scores are not a guarantee for subsequent changes.
