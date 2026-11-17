# LenanaLabs — page prototypes

Approved visual references for the native `/about` and `/projects` pages now implemented in `lenanalabs/`. Files in this directory remain standalone prototypes, not application routes or production data sources. See [current implementation status](../lenanalabs/README.md#about-and-projects).

The Contact page (`prototypes/contact.html`) and Projects redesign (`prototypes/projects.html`, grouping + contents nav) are now implemented as native `/contact` and `/projects` routes. Prototypes remain standalone design references; their demo states are not production functionality.

## Open these

| File | State |
| --- | --- |
| `prototypes/about.html` | Full About page. Team renders three demonstration profiles directly — no empty state, no toggle. |
| `prototypes/team-option-a.html` | Team alternative A — refined editorial roster (rows). |
| `prototypes/team-option-b.html` | Team alternative B — three-person editorial composition (columns). Selected. |
| `prototypes/projects.html` | Projects — grouped "field index". Empty archive by default. |
| `prototypes/projects.html#one` | One project published. |
| `prototypes/projects.html#demo` | Five fictional entries, banner-labelled — layout review only. |
| `prototypes/projects-direction-a.html` | Projects direction A — filter ledger. Static preview. |
| `prototypes/projects-direction-b.html` | Projects direction B — field index. Selected. Static preview. |
| `prototypes/contact.html` | Contact page — three fields (name, email, message), two-column composition, validation and demo states. |
| `prototypes/contact-direction-a.html` | **Superseded** — six-field direction from the previous brief. Historical reference only. |
| `prototypes/contact-direction-b.html` | **Superseded** — six-field direction from the previous brief. Historical reference only. |
| `../final.html` | Landing-page reference this work extends. |

Open them directly with `file://` — no server, no build. Fonts load from Google Fonts; offline, the fallback stacks keep the layout intact.

## Shared files

- `prototypes/lab.css` — stylesheet for both new pages, token-for-token with `lenanalabs/src/app/globals.css`.
- `prototypes/work.css` — Projects-specific styles (hero, contents, plates, sections).
- `prototypes/lab.js` — mobile menu and scroll reveals.
- `prototypes/harness.html` — fixed-width preview harness, hash format `#page.html|width|scale|scrollOffset|height|stateHash`. Used to review at exactly 1440 / 768 / 375.

## Read this

- `specification.md` — design DNA report, page-by-page rationale, responsive behaviour, accessibility, component breakdown, implementation handoff and QA scoring.
- `contact-specification.md` — contact page direction, form data contract, validation rules, interaction states, accessibility and handoff.
- `projects-specification.md` — projects directions, archive composition, content model, edge cases and handoff.

## What is real and what is not

Real: the palette, type stack, header, footer, tokens, contact email, Nairobi/EAT details.

Not real: the prototype's three `Name Surname` profiles and five demonstration projects. They are not imported into the application. The production project registry remains empty; the application has no review-state switch or demo-data mode (only the prototypes do).

The owner subsequently requested three application team placeholders. They now render as `Team member 01–03`, explicitly labeled `Profile placeholder`, from `src/data/team.ts`. Replace them with approved real names, roles and biographies before final content sign-off; this request does not approve the prototype's fictional biographies.

The owner also requested empty-archive index placeholders matching the visual reference: 2 client-work marks, 4 internal-product marks and 3 experiment marks. The application labels these as illustrative placeholders; they are not published projects, interactive project links or a fixed archive capacity. Public project totals remain data-driven.
