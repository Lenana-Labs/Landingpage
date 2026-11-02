# LenanaLabs — About page refactor: design specification

**Status:** refactor complete, awaiting approval. Production untouched.
**Scope:** About page only. Projects is unchanged from the previous review and is documented here only for reference.

**Implementation update — 2026-11-02:** Native `/about` and `/projects` routes are implemented. The owner subsequently requested three visible team placeholders; the application uses `Team member 01–03`, each explicitly labeled `Profile placeholder`. This supersedes the earlier instruction to omit all placeholder profiles, without approving fictional identities or biographies. The design-review notes below describe the prototype stage. Current implementation and content dependencies are documented in `lenanalabs/README.md` (About and Projects section).

**Archive-index update:** The owner requested illustrative placeholder marks for the empty archive: client work **2**, internal products **4**, experiments **3**. They are explicitly labeled, noninteractive visual placeholders, not public project records or a capacity limit. Once public projects exist, their actual records determine the index marks and counts.

---

## 1. Reviewing these files

| File | What it shows |
| --- | --- |
| `design/prototypes/about.html` | The refactored About page. Three profiles render directly; there is no team toggle and no empty state anywhere in the file. |
| `design/prototypes/team-option-a.html` | Team alternative A — refined editorial roster (three rows). |
| `design/prototypes/team-option-b.html` | Team alternative B — three-person editorial composition (three columns). Selected. |
| `design/prototypes/projects.html` | Unchanged from the previous review. |
| `design/prototypes/final.html` | Landing-page reference. |
| `design/prototypes/lab.css`, `lab.js` | Shared prototype assets. |

Open directly with `file://`. The two option files carry a dark review bar above the site header; that bar is a review label, not part of the design, and does not appear in `about.html`.

---

## 2. What changed in this refactor

| # | Change | Rationale |
| --- | --- | --- |
| 1 | **Team empty state removed completely** — markup, `data-team` attribute, toggle button, click handler, and all `.team-empty` / `.team-toggle` / `[data-team="empty"]` selectors. No replacement toggle, parameter or mode switch. | Mandated. Missing content is an approval dependency, not a page state. |
| 2 | Team renders three profiles directly, as a permanent section. | The page must introduce the three people who exist. |
| 3 | Left-aligned monograms moved into a consistent top row per profile (index left, monogram right). | Removes the drifting baselines the previous version produced when biographies differed in length. |
| 4 | **Five process steps restored** (Understand → Explore → Prototype → Engineer → Evaluate) as a five-column strip beneath the decision plate, each with a signal tick on its top rule. | The brief requires them; they are now tied to the plate by a single line: *"Most branches die between steps 02 and 03."* |
| 5 | Story rewritten. The old opening led with absence ("no long history… no wall of logos… no founding myth"). | Confident opening that states why the studio exists, without inventing a founding story. |
| 6 | Belief explanations rewritten to remove overlap with the method section and with each other. | Each principle now states a distinct position rather than restating the process. |
| 7 | Explore copy explains transfer of *learning* and states the IP boundary explicitly. | Prevents the diagram from implying client code or confidential detail is reused. |
| 8 | Hero type scale reduced (max 5.4rem) and title column retained at 1/10. | The second sentence now sets on one line at 1440 instead of orphaning "engineering." — better hierarchy, no layout change. |
| 9 | **New `<details>` disclosure under the plate: "What was cut, and why".** | Testing showed SVG `<g tabindex="0">` does not receive focus in this browser, so the hover readout was unreachable by keyboard. The disclosure is native, keyboard-operable, and closed by default. |
| 10 | Technical labels raised earlier remain: tree labels 12px, metadata 11–12px. | Readability at 1440. |

---

## 3. Narrative audit

| Section | Question it answers | Must not repeat |
| --- | --- | --- |
| Hero | Who is LenanaLabs, in one line? | — |
| Our story | Why the studio exists, and what kind of problems it wants. | The stage-of-company disclaimer, twice. |
| What we believe | What principles govern decisions. | The method's step names. |
| How we think | How a technical decision is actually made — including what gets cut. | The landing page's four-stage Approach. |
| What we explore | Where the capability is applied, and how the three areas feed each other. | The landing page's Capabilities copy. |
| Team | Who does the work, and what each person brings. | Org-chart language, seniority, founder claims. |
| Closing | How to start a conversation. | New claims of any kind. |

Concretely removed in this pass: the "no history / no logos / no founding myth" opening; "already described on the landing page" throat-clearing in the method intro; the duplicate explanation of iteration in belief 04 (now owned by the method).

---

## 4. Design DNA (unchanged)

Tokens from the implemented `lenanalabs/src/app/globals.css`: paper `#F3EEE3`, deep `#E8E0CF`, chalk `#FBF8F1`, ink `#17150F`, ink-2 `#4E4839`, signal `#C13A17`, pine `#14453A`, mustard `#E0A93F`, hairlines `rgba(23,21,15,.16 / .42)`.

Type: Bricolage Grotesque 600 display, Instrument Sans 400–600 body, IBM Plex Mono technical labels. Shell 1360px, gutter `clamp(18px,4vw,56px)`, 12-column grids, `.band` rhythm `clamp(56px,7vw,104px)`.

Contrast: ink/paper 15.4:1, ink-2/paper 7.4:1, signal/paper 4.7:1, chalk/pine 10.8:1, ink/mustard 8.6:1.

---

## 5. Section hierarchy (final)

1. **Hero** — "Built on curiosity. Grounded in engineering." Two-tone headline, numbered page index (five entries), lede, studio card (practice / location / time). No illustration.
2. **Our story (01)** — sticky heading, four paragraphs. Answers why the studio exists; ends on attention rather than absence.
3. **What we believe (02)** — four numbered principles with a draft-messaging note. No cards, no icons.
4. **How we think and work (03)** — headline "Most of the work is the cutting."; decision plate (Fig. 01); five-step strip; one linking line; loop note.
5. **What we explore (04)** — triangular loop diagram (Fig. 02) beside three definitions; explicit learning-transfer and IP sentence.
6. **Team (05)** — three profiles, permanent, no states.
7. **Closing (06)** — pine band, "Interesting problems deserve curious minds.", button and email.

---

## 6. The decision plate

- **What it is:** one problem on the left, six candidate approaches, five cut with a recorded reason, one carried to a square node labelled *"A decision, not a guarantee."*
- **Honesty:** the figure is labelled **"Fig. 01 — How a problem becomes a build"** and its head reads *"Six paths tested · one kept"*. It is illustrative, not a documented client decision, and the surviving node is explicitly not a guarantee.
- **Pointer:** hovering a closed branch raises it to signal and writes its reason into the live readout.
- **Keyboard:** a native `<details>` disclosure ("What was cut, and why") lists all six outcomes with reasons. This was added because `<g tabindex="0">` failed to take focus in testing; the readable path no longer depends on SVG focus at all. The readout remains `aria-live="polite"` for pointer users.
- **Mobile (≤720px):** the SVG is replaced by a six-row branch list with the same reasons; the disclosure is hidden to avoid duplicating it.
- **Reduced motion:** no animation in the plate; hover transitions collapse under `prefers-reduced-motion`.
- **Overflow:** the plate fits its container at every width; the wrap is `overflow-x:auto` only as a safety net and is not engaged at 375px or above.

---

## 7. Team section

### 7.1 Direction

**The people behind the work.** Three individuals with equal visual weight, presented as a technical roster rather than an org chart. No founder framing, no seniority ordering, no invented responsibilities.

### 7.2 The two alternatives

**Option A — refined editorial roster** (`team-option-a.html`): three horizontal rows; 96 × 112 monogram in a left rail, name and role, a wide prose column (up to 54ch), and a right-hand technical column with focus and tags.

**Option B — three-person editorial composition** (`team-option-b.html`): three equal columns sharing top and bottom rules; index and monogram on the top row, then name, role, biography, focus label and tags. Selected.

| Criterion | Option A | Option B |
| --- | --- | --- |
| Consistency with the site | 9 | 9 |
| Individual personality | 9 — wide prose column | 7 — narrower column |
| Readability of long bios | 9 | 8 |
| Mobile behaviour | 8 | 9 — identical order, less reflow |
| Visual distinctiveness | 6 — the page already uses row lists (beliefs) | 9 — vertical rhythm breaks the pattern |
| Scalability (4–6 people) | 9 — rows extend indefinitely | 7 — 3-up becomes 2+1 and needs the rail treatment |
| Implementation complexity | 9 | 8 |

**Selected: Option B.** It gives the three people equal prominence without a hierarchy, it gives the page a vertical rhythm after two horizontal sections, and it is the stronger close to the argument before the CTA. The trade-off is documented: if biographies grow beyond roughly 45 words each, Option A becomes the better container — the swap is confined to one component and does not touch the page.

Option A is retained as a reviewable file, not a mode inside the page.

### 7.3 Content model

```ts
export type TeamMember = {
  /** required */
  id: string;                 // stable slug, e.g. "amina-w"
  name: string;               // full name as approved by the person
  role: string;               // verified role or title — never assumed
  monogram: string;           // 2 letters, used when no portrait exists

  /** optional — each must collapse cleanly when absent */
  bio?: string;               // 2–3 sentences; omit rather than pad
  expertise?: string[];       // areas of expertise, max 3
  interests?: string[];       // technical interests, max 3
  portrait?: { src: string; alt: string };   // approved assets only
  links?: { label: string; href: string }[]; // https only, max 2
};
```

Rendering rules: `portrait` replaces the monogram inside the same keyline frame; `bio` omitted → the profile ends at the role and focus; `expertise`/`interests` omitted → the focus block is not rendered at all (no empty label); `links` omitted → no link row; long names wrap without truncation and the column does not stretch.

### 7.4 Edge cases

| Case | Behaviour |
| --- | --- |
| Missing portrait | Monogram in the same 96 × 112 frame; no placeholder silhouette |
| Missing biography | Role and focus only; column height is not padded to match neighbours |
| Long name or role | Wraps; no ellipsis; grid columns are `minmax(0,1fr)` so nothing overflows |
| Missing links | Link row absent |
| Fourth member | Wraps to a second row of three with the same rules; no component change |
| Unapproved content | Do not invent identities. The owner's later request permits three explicitly labeled application placeholders until approved profile details are supplied. |

### 7.5 Responsive

| Width | Behaviour |
| --- | --- |
| ≥1101px | three equal columns, hairline rules between |
| 721–1024px | two columns; third profile spans full width with its monogram in a left rail |
| ≤720px | single column; monogram 64 × 76; full name, role, biography and focus retained |

### 7.6 Accessibility

Profiles are `<article>` with an `h3` name; role is text, never colour-only; the column wash on hover is decorative and reveals nothing; monograms are `aria-hidden` (the name follows as text); links are 44px minimum; focus rings follow the global 2px signal rule. No profile information exists only on hover.

### 7.7 Content requirements before publication

Real name, verified role, approved biography, approved portrait, and any links must be supplied by the studio. Placeholder strings ("Name Surname", "Role title") and the three demonstration biographies must be replaced. The page must not ship with `id`, `name` or `role` missing.

---

## 8. What we explore

The triangular diagram is retained. Reading order: Client work → research ("exposes harder problems"), Research → internal products ("makes it real"), Products → client work ("proves it in the open"). The accompanying paragraph now states that **learning** travels between the three areas and that client code, data and confidential detail do not travel without permission — the diagram no longer implies IP reuse by omission.

Accessibility: the SVG carries a descriptive `aria-label`, the three areas are also listed as text beside it, and the diagram collapses above its list at ≤1100px.

---

## 9. Implementation handoff

```
src/app/about/page.tsx
src/components/about/{Hero,Story,Beliefs,Method,ExploreLoop,TeamSection,TeamProfile,ClosingCta}.tsx
src/components/about/DecisionPlate.tsx     "use client" — pointer readout only
src/data/team.ts                          TeamMember[]
src/data/principles.ts                    beliefs (draft status flagged)
```

- Method: `DecisionPlate` is client-side only for the hover readout; the plate itself is static SVG markup and the reasons list is a native `<details>` — no JS required for keyboard access.
- Team: server-rendered from `team.ts`; no state, no toggle. If a portrait is missing, render the monogram span instead of an `<img>`.
- Navigation: `About → /about`, `Capabilities → /#capabilities`, `Projects → /projects`, `Contact → /#contact`; brand → `/`.
- Tokens: reuse the existing `:root` variables; if adding Tailwind `@theme` entries, add them under the existing names (`--color-deep`, `--color-chalk`, `--color-pine`, `--color-ink-2`) rather than a second system.
- Do not copy the prototype markup wholesale into one component; split by section as listed.

### Interaction states

| Element | Rest | Hover | Focus-visible | Active |
| --- | --- | --- | --- | --- |
| Buttons | signal fill | ink fill, −2px lift | 2px signal ring, 4px offset | lift removed |
| Text links | 1px underline | signal colour, arrow +4px | ring as above | — |
| Belief row | paper | +14px indent | — | — |
| Decision branch | ink-2 stroke | signal stroke + readout | same as hover where focusable | — |
| Profile column | paper | chalk wash, monogram inverts | ring on links only | — |
| Details summary | signal, 44px tall | underline | ring | open/closed native |

---

## 10. Quality review

| Criterion | Weight | Score |
| --- | ---: | ---: |
| Consistency with existing identity | 25% | 9 |
| Visual creativity and distinctiveness | 20% | 9 |
| Content hierarchy and storytelling | 20% | 9 |
| Usability and accessibility | 15% | 8 |
| Responsive design | 10% | 8 |
| Implementation feasibility | 10% | 9 |
| **Weighted total** | | **8.70** |

### Checks actually executed

- `about.html` at a 506px viewport: **3** `.profile` elements, **5** `.step` elements; **no** element matching `.team-toggle`, `.team-empty` or `[data-team]`; `scrollWidth − clientWidth = 0`.
- Section heights at that width: method 1,491px (five steps restored), team 1,287px, document 7,526px.
- `team-option-a.html`: 3 rows, each 450px, monogram 64px at mobile, no horizontal overflow.
- Decision plate keyboard audit: `document.querySelector('.term').focus()` **did not** move focus (`document.activeElement` unchanged) — the defect that led to the `<details>` disclosure. The disclosure is native HTML and does not depend on JS.
- Projects page states re-checked in the previous pass (empty 0 marks / filters hidden; demo 5 marks, counts 02·01·02).

### Not executed — must be run before sign-off

- Native renders at **320, 375, 768, 1024, 1440, 1920**. The browser capture tool was unavailable during this pass; breakpoints were verified by CSS/DOM inspection and one measured width only.
- A full keyboard tab-order walkthrough after the `<details>` change.
- `prefers-reduced-motion` emulation and a JavaScript-disabled render.
- Lighthouse or any performance measurement.
- Contrast measurement of the final rendered pairings (values above are computed from the token hex values, not sampled from screen).

### Confirmation

- **Changed:** `design/prototypes/about.html`, `design/specification.md`, `design/README.md`, and the new `design/prototypes/team-option-a.html`, `design/prototypes/team-option-b.html`.
- **Unchanged:** all files under `lenanalabs/` (production), `design/prototypes/projects.html`, `final.html`, `lab.css`, `lab.js`, direction prototypes.
- **No duplicate components:** the team empty-state block, its CSS and its handler are deleted, not commented out; the five-step strip replaces the three-term legend rather than sitting beside it.
- **No duplicate review states:** About has none. Projects retains its documented `#empty` / `#one` / `#demo` states, which were not touched.

### Known limitations

- The application currently renders three owner-requested, explicitly labeled team placeholders. Approved real profiles are still needed for final content sign-off.
- The decision plate remains illustrative — it is not a record of a real client decision and is labelled as such.
- Option A is a review artefact; it should not be shipped alongside B.
