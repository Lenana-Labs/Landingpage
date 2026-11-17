# Projects implementation

## Status

Production route: `/projects`. Implements the approved Field index direction from `../design/prototypes/projects.html`, `work.css`, and `../design/projects-specification.md`. No project records were invented or modified. The current empty registry intentionally produces the approved empty archive.

## Architecture and files

- `src/app/projects/page.tsx`: existing server route, shared header/footer/skip link and metadata; removes the superseded repeated closing CTA.
- `src/app/projects/projects.css`: route-scoped Field index styling using existing tokens, fonts and shell. Root entry class is `work-plate` to avoid the landing terrain's `.plate`; contents navigation explicitly uses block display to avoid Tailwind's `contents` utility.
- `src/components/projects/ProjectsContent.tsx`: server selects approved records, renders hero, accurate index and empty/populated presentation.
- `src/components/projects/ArchiveContents.tsx`: native category anchors and real public counts; zero-count categories are inert spans.
- `src/components/projects/ProjectArchive.tsx`: now a Server Component, selecting the first explicitly featured public record once and grouping the remainder by category.
- `src/components/projects/ProjectEntry.tsx`: reused entry component, now editorial standard/selected/mirrored plates. Supports optional images, client permission-controlled attribution, logos, services, technologies, outcomes and validated external destinations.
- Removed unused `ArchiveIndex.tsx`, `src/lib/project-filters.ts`, and `src/data/archive-placeholders.ts`. Their earlier placeholder/filter behavior is superseded by the latest approved design.
- `scripts/pages.test.mjs`, `scripts/pages-browser.mjs`, `scripts/project-harness.mjs`: update existing tests rather than retaining parallel tests of obsolete filters. Server-rendered fixture markup is injected only into test browser DOM; fixtures never become production routes or project data.
- `README.md`: replaces the superseded Projects behavior paragraph. Existing Contact documentation is preserved.

The existing `src/data/projects.ts` remains the sole registry and publication boundary. Only explicit public records pass it. Client work additionally requires publication approval. Engineering status is independent. Duplicate/unsafe slugs and unsafe external URLs retain existing safeguards. No Projects Client Components or new dependencies are needed.

## Fidelity and deliberate differences

Preserves Work, in progress headline, approved copy, cream/ink/orange system, index, policy note, three-part contents, selected work, category sections, mirrored editorial plates and missing-image keyline frames. The latter are decorative and aria-hidden; real approved images keep their alt text and use Next Image.

Excludes prototype demo banners, hash-triggered sample states, review links and fictional content. Inert category entries use spans instead of anchor elements without href. Small technical labels are 13px for readability. At 768px plates stack as specified by the design handoff, while 1024px retains the desktop content columns. Fixes inherited CSS collisions without changing global CSS or other pages.

No project detail design was supplied; no detail route or synthetic case-study links were added. Only validated, supplied external project/case-study URLs render links. First featured public record in registry order wins deterministically; additional featured candidates appear normally in their categories.

## Verification

Baseline: `npm.cmd run lint` and `npm.cmd test` passed before edits (15 existing tests).

Final commands:
- `npm.cmd run lint`: passed.
- `npm.cmd run typecheck`: passed.
- `npm.cmd test`: 17 tests passed. Covers opt-in visibility/client approval, draft exclusion, unsafe/duplicate slugs, public projection, empty/one/many categories, one explicit selected project, multiple featured candidates, selected counts/anchors, 45 records, optional content, long text, images and existing About/Lab behavior.
- `npm.cmd run build`: passed; `/projects` statically generated. Existing metadataBase warning remains when NEXT_PUBLIC_SITE_URL is unset.
- `$env:TEST_URL='http://localhost:3102'; npm.cmd run test:pages`: browser suite targets the built production server. The first sandbox attempt timed out creating a tab; browser access outside that sandbox was required. Final results are in `.taste-skill/pages/results.json`.

Browser suite checks 320, 375, 768, 1024, 1440 and 1920px, empty and isolated populated Projects markup, no overflow, full available plate widths, native keyboard category navigation, correct active navigation, mobile menu focus containment/Escape, no-script content, reduced motion, About regression behavior and landing/Contact/404 HTTP status. No email messages are sent.

## Content dependencies and limitations

Approved public projects are still needed, including client publication permission, images/alt text, real destinations and explicit featured designation. Tests use clearly named isolated fixtures, not fictional portfolio content. No manual assistive-technology certification or physical-device testing is claimed. Publication remains empty until records are approved.

Final outcome: the rebuilt production browser suite passed at all six widths after the CSS collision, mirrored metadata and mobile preview-ratio fixes. Desktop/mobile empty and populated fixture screenshots were visually reviewed. Direct HTTP verification also passed for Projects title/description/current navigation, landing/About/Contact 200 responses and custom 404 responses. Completion status: complete with content dependencies (approved portfolio records and assets).
