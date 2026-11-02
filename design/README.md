# LenanaLabs — About & Projects prototypes

Approved visual references for the native `/about` and `/projects` pages now implemented in `lenanalabs/`. Files in this directory remain standalone prototypes, not application routes or production data sources. See [current implementation status](../lenanalabs/README.md#about-and-projects).

## Open these

| File | State |
| --- | --- |
| `prototypes/about.html` | Full About page. Team renders three demonstration profiles directly — no empty state, no toggle. |
| `prototypes/team-option-a.html` | Team alternative A — refined editorial roster (rows). |
| `prototypes/team-option-b.html` | Team alternative B — three-person editorial composition (columns). Selected. |
| `prototypes/projects.html` | Empty archive (production default). |
| `prototypes/projects.html#one` | One project published. |
| `prototypes/projects.html#demo` | Five fictional entries, clearly banner-labelled — layout review only. |
| `../final.html` | Landing-page reference this work extends. |

Open them directly with `file://` — no server, no build. Fonts load from Google Fonts; offline, the fallback stacks keep the layout intact.

## Shared files

- `prototypes/lab.css` — stylesheet for both new pages, token-for-token with `lenanalabs/src/app/globals.css`.
- `prototypes/lab.js` — mobile menu and scroll reveals.
- `prototypes/harness.html` — fixed-width preview harness, hash format `#page.html|width|scale|scrollOffset|height|stateHash`. Used to review at exactly 1440 / 768 / 375.

## Read this

- `specification.md` — design DNA report, page-by-page rationale, responsive behaviour, accessibility, component breakdown, implementation handoff and QA scoring.

## What is real and what is not

Real: the palette, type stack, header, footer, tokens, contact email, Nairobi/EAT details.

Not real: the prototype's three `Name Surname` profiles and five demonstration projects. They are not imported into the application. The production project registry remains empty, and Projects has no review-state switch or demo-data mode.

The owner subsequently requested three application team placeholders. They now render as `Team member 01–03`, explicitly labeled `Profile placeholder`, from `src/data/team.ts`. Replace them with approved real names, roles and biographies before final content sign-off; this request does not approve the prototype's fictional biographies.

The owner also requested empty-archive index placeholders matching the visual reference: 2 client-work marks, 4 internal-product marks and 3 experiment marks. The application labels these as illustrative placeholders; they are not published projects, interactive project links or a fixed archive capacity. Public project totals remain data-driven.
