# LenanaLabs — Projects page: design directions and implementation handoff

**Status:** prototype complete, awaiting review. Production untouched.
**Final prototype:** `design/prototypes/projects.html` (states: default empty, `#one`, `#demo`).
**Shared styles:** `design/prototypes/work.css`.

---

## 1. Two directions

### Direction A — Filter ledger
Hero, a row of category filter buttons, then dense rows: index, title, description, category chip, status, stack. Filtering is client-side and instant. Close to a conventional technical archive, and the closest to what the application currently ships (`ProjectArchive.tsx`).

- **Strengths:** fastest scanning at volume; familiar; trivial to implement; filters answer "show me only client work" in one click.
- **Weaknesses:** the filter row is the only structure — with 1–3 projects it is either hidden or pointless; the page reads as a list, not as a body of work; nothing distinguishes the studio from any other archive.

### Direction B — Field index (selected)
The archive is organised as three named sections, introduced by a **contents block** that reports how many entries each category holds. Within a section, projects are "plates": index and kind on the left, title/description/stack in the middle, a keyline preview frame (or a drawn mark) on the right, with alternating plates mirrored to break the rhythm.

- **Strengths:** the page states what the studio does before listing anything; sections scale indefinitely without new UI; no client-side state; each project gets room; the featured project sits in a "Selected" plate above the sections.
- **Weaknesses:** no instant "client only" filter — the contents nav jumps instead; more vertical space per entry.

| Criterion | A | B |
| --- | --- | --- |
| Originality | 6 | 9 |
| Brand consistency | 8 | 9 |
| Information clarity | 9 | 8 |
| Discoverability at scale | 9 | 8 (anchor nav, no filtering) |
| Responsiveness | 9 | 9 |
| Accessibility | 8 (filter state must be announced) | 9 (plain anchors) |
| Implementation cost | 9 | 7 |
| Handles 0–3 projects gracefully | 6 | 9 |

**Selected: B.** With an early-stage studio the archive will hold a handful of entries for a while. A filter UI is dead weight at that size, and hiding it (as the current implementation does) leaves the page with no structure at all. B gives the page a shape that works with one project or thirty, and it says something about the studio — work is grouped by *why it exists*, not by a dropdown.

The trade-off is explicit: at 30+ projects, B wants a sticky contents rail or a second-level index. That is a later change inside one component, not a redesign.

---

## 2. Page structure

1. **Header** — existing; `Projects` current.
2. **Hero** — `Projects / Archive`, index count, headline *"Work, in progress."*, a two-line policy note ("Only approved work is published"), and a lede.
3. **Contents** — three category links with counts, plus a summary line. Disabled entries (no projects) are inert, not fake links.
4. **Selected plate** — the featured project, at larger type, above the sections. Only when a project carries `featured: true`.
5. **Category sections** — `Client work`, `Internal products`, `Experiments`; each with a marker, title, count, one-line definition, and its plates.
6. **Empty state** — one statement, two actions, and links to the populated review states.
7. **Footer** — existing; the shared closing CTA is intentionally absent (the empty state and the header already offer a route to contact).

---

## 3. Composition and typography

| Element | Spec |
| --- | --- |
| Hero headline | Bricolage 600, `clamp(2.6rem, 6vw, 5.2rem)`, leading .93, tracking −.052em; "in progress" in signal |
| Lede | Instrument Sans, `clamp(1rem,1.25vw,1.125rem)`, ink-2, max 44ch |
| Policy note | IBM Plex Mono `.6875rem`, uppercase, right-aligned beside the headline |
| Contents | three columns, mono counts, 44px rows, hairline under each |
| Section title | Bricolage 600, `clamp(1.5rem,2.4vw,2rem)`, with a two-letter mono marker and count |
| Section definition | Instrument Sans `.875rem`, ink-2, max 52ch, right column |
| Plate title | Bricolage 600, `clamp(1.375rem,2.2vw,1.875rem)`, max 30ch |
| Featured title | Bricolage 600, `clamp(1.75rem,3.2vw,2.5rem)`, max 24ch |
| Status | mono `.625rem`, uppercase, dot + label |
| Stack tags | mono `.625rem`, 1px keyline |

Grid: 12 columns. Plate meta `1/3`, body `3/9`, preview `10/13`. Mirrored plates swap these (`1/4`, `5/11`, meta last). Hero headline `1/8`, policy `8/13`.

The preview frame is a 4:3 keyline with two horizontal rules; when no approved image exists it carries the label **"No preview"** rather than a stock image or a screenshot-shaped deception.

---

## 4. Content model (existing — do not duplicate)

The application already defines the right shape in `src/data/projects.ts`. This design consumes it unchanged:

```ts
type Project = {
  id: string; slug?: string;
  title: string; description: string;
  category: "client" | "product" | "experiment" | "open-source";
  status: "exploring" | "prototype" | "in-development" | "published" | "active";
  visibility?: "draft" | "public";        // approval, separate from status
  featured?: boolean;                     // explicit; never inferred from order
  year?: number; technologies?: string[]; services?: string[];
  image?: { src: string; alt: string };
  client?: { approvedForPublication: boolean; name?: string; logo?: …; website?: string };
  caseStudy?: { url?: string; … };
};

export const projectCategories: { key; label; description }[] = [ … ];
export const projectStatuses: Record<ProjectStatus, string> = { … };
export function getPublicProjects(entries?): PublicProject[] { … }
```

**Rules the design depends on:**
- `visibility: "public"` **and** (for client work) `client.approvedForPublication` are required before anything renders. Status alone never makes a project public.
- `featured` is explicit. The design renders **at most one** featured plate; if two are flagged, the first wins and the rest appear normally.
- `slug` must be unique — `getPublicProjects` already de-duplicates.
- Nothing may be authored to fill the layout. No fictional entries, no placeholder client names, no metrics.

---

## 5. Interaction

- **Contents nav** — plain anchor links to `#client`, `#product`, `#experiment`. No JavaScript state, no filter buttons, works with JS disabled once sections are server-rendered.
- **Plates** — no hover-only content. Hover changes background and moves the arrow; every fact is in the DOM at rest.
- **Case studies** — if `caseStudy.url` exists, the title becomes a link and the plate gains a "Case study" affordance. If it does not, the title is plain text: no dead links, no `href="#"`.
- **Reduced motion** — all transitions collapse via the global `prefers-reduced-motion` rule.

**Why no filters.** The production component currently ships filters that hide themselves below two categories. That is a control that disappears exactly when the archive is small — the common case for this studio. Sections plus anchors give navigation that is always present and always truthful about what exists.

---

## 6. Edge cases

| Case | Behaviour |
| --- | --- |
| No public projects | Empty statement; contents entries inert with `00`; no sections; review links to `#demo` / `#one` |
| One project | Featured plate; contents shows `01` for its category and `00` for the rest; no empty sections |
| Featured in a category with no other entries | Contents links to the featured plate's anchor instead of a missing section |
| No approved image | Keyline frame labelled "No preview" |
| No client permission | Project cannot appear at all (filtered upstream) |
| No technologies | Tag row omitted, no empty chips |
| Long title | Wraps; max 30ch (24ch featured); no truncation |
| Many projects | Sections grow; contents stays three rows |

---

## 7. Responsive

| Width | Behaviour |
| --- | --- |
| 1920px | shell capped at 1360px |
| 1440px | full three-column plates, mirrored alternates |
| 1024px | plates keep meta + body + preview, narrower preview |
| 768px | single column: meta row above title, preview last, 16:9 |
| 375px | same stack; contents collapse to one column; 44px rows |
| 320px | no horizontal overflow |

Measured at 335px: single column, no overflow.

---

## 8. Accessibility

- Sections are `<section aria-labelledby>`; titles are `h2`; plate titles `h3`. One `h1`.
- Contents is a labelled `<nav>`; disabled entries are `<a aria-disabled="true">` without `href` — not focusable, not announced as links.
- Status is dot **and** text; category is a text label.
- Preview frames are `aria-hidden` when they hold no image; images carry their approved `alt`.
- No information is revealed on hover only.
- Focus: 2px signal ring at 4px offset, inherited.
- Anchor targets land below the sticky header via `scroll-padding-top`.

---

## 9. Implementation handoff

Replace the filter UI in `ProjectArchive.tsx`; keep the data layer.

```
src/app/projects/page.tsx                 unchanged
src/components/projects/ProjectsContent.tsx   server: getPublicProjects() → hero + contents
src/components/projects/ArchiveContents.tsx   server: three anchors + counts
src/components/projects/ProjectPlate.tsx      server: one plate (featured | standard | mirrored)
src/components/projects/ProjectSection.tsx    server: category header + plates
```

- `ProjectArchive.tsx` (client) and `lib/project-filters.ts` become unnecessary if this direction ships — the anchor nav is server-rendered. Remove them only after confirming nothing else imports them.
- `ProjectEntry.tsx` can be retired in favour of `ProjectPlate.tsx`; do not keep both.
- `getPublicProjects`, `projectCategories`, `projectStatuses` stay as-is.
- Keep the demo data out of `projects.ts`; the prototype's five entries are fictional and live only in the prototype's script.
- Tokens: existing `:root` values; no new colours. `work.css` maps 1:1 onto Tailwind utilities or component CSS.

---

## 10. Quality checks

### Executed (browser, 335px viewport)

- **Demo state:** index `005`; contents rendered 3 links with counts `02 / 01 / 02`; featured plate present; 3 category sections; client section header shows `02` with "· 1 selected above"; no horizontal overflow.
- **Empty state:** index `000`; empty block visible (`display:block`, 548px tall); contents 3 disabled entries with `00`; zero sections built.
- **One-project state:** index `001`; one featured plate; contents `01 / 00 / 00`, only the populated category is a link.
- **Fix made during QA:** the hash-change listener sat after the empty-state `return`, so switching from empty to another state did nothing; moved above the branch.

### Not executed

- Native 320 / 375 / 768 / 1024 / 1440 / 1920 renders — only 335px measured; wider layout verified by CSS inspection and by a 1100px harness attempt that could not be captured.
- Screen-reader pass, JS-disabled render, reduced-motion emulation, Lighthouse.
- No production component was modified or compiled against this design.

### Confirmations

- **Created:** `design/prototypes/work.css`, `design/prototypes/projects-direction-a.html`, `design/prototypes/projects-direction-b.html`, `design/projects-specification.md`.
- **Modified:** `design/prototypes/projects.html` (rebuilt in place — no duplicate page), `design/README.md`.
- **Unchanged:** all files under `lenanalabs/`, plus `contact.html`, `about.html`, `final.html`, the team options, `lab.css`, `lab.js`.
- **No duplicate logic:** one render path, one data array in the prototype; direction files are static previews with no JavaScript.
- **No fabricated content presented as real:** every demo entry is behind a labelled banner; production data remains empty.

### Outstanding content requirements

- Approved project entries (none exist yet), each with `visibility: "public"`, a unique slug, and — for client work — `client.approvedForPublication`.
- At least one project flagged `featured` if the Selected plate should appear.
- Approved imagery and alt text before any preview frame shows a photograph.
