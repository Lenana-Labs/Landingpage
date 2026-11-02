# LenanaLabs — About & Projects prototypes

Design extension of the implemented LenanaLabs site. Everything here is a **prototype**: no file in `lenanalabs/` was modified.

## Open these

| File | State |
| --- | --- |
| `prototypes/about.html` | Full About page. Team renders three demonstration profiles directly — no empty state, no toggle. |
| `prototypes/team-option-a.html` | Team alternative A — refined editorial roster (rows). |
| `prototypes/team-option-b.html` | Team alternative B — three-person editorial composition (columns). Selected. |
| `prototypes/projects.html` | Empty archive (production default). |
| `prototypes/projects.html#one` | One project published. |
| `prototypes/projects.html#demo` | Five fictional entries, clearly banner-labelled — layout review only. |
| `prototypes/final.html` | Landing-page reference this work extends. |

Open them directly with `file://` — no server, no build. Fonts load from Google Fonts; offline, the fallback stacks keep the layout intact.

## Shared files

- `prototypes/lab.css` — stylesheet for both new pages, token-for-token with `lenanalabs/src/app/globals.css`.
- `prototypes/lab.js` — mobile menu and scroll reveals.
- `prototypes/harness.html` — fixed-width preview harness, hash format `#page.html|width|scale|scrollOffset|height|stateHash`. Used to review at exactly 1440 / 768 / 375.
- `prototypes/direction-1..3.html` — the three original creative directions, kept for reference.

## Read this

- `specification.md` — design DNA report, page-by-page rationale, responsive behaviour, accessibility, component breakdown, implementation handoff and QA scoring.

## What is real and what is not

Real: the palette, type stack, header, footer, tokens, contact email, Nairobi/EAT details.

Not real: the three team profiles ("Name Surname") and the five demonstration projects. Both are labelled in the interface and must not ship. `data/projects.ts` in the app is empty, and the team content must be replaced with three approved profiles before publication.
