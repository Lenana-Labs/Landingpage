# Lenana Labs — Landing Page Implementation Plan

> Based on [design.md](file:///c:/Users/user/Documents/Landingpage/design.md) · Swiss / International Typographic Style
> **Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4**

---

## Overview

| Attribute | Value |
|---|---|
| Framework | Next.js 16 — App Router + TypeScript |
| Styling | **Tailwind CSS v4** — CSS-first config via `@theme` in `globals.css` |
| Fonts | Google Fonts — **Inter** (body) + **DM Mono** (labels/index numbers) via `next/font/google` |
| Grid | Tailwind `grid-cols-12` → `grid-cols-8` (md) → `grid-cols-4` (sm) |
| Accent palette | Carmine `#C8102E` · Sulphur `#F5E642` · Ink `#0D0D0D` · Paper `#FAFAFA` |
| Folder convention | `src/components/ui/`, `src/components/cards/`, `src/components/sections/` |

> **Note on Tailwind v4:** No `tailwind.config.ts` needed. All tokens are defined in `globals.css` using `@theme { }`. Utility classes are auto-generated (e.g. `text-carmine`, `bg-sulphur`, `border-ink`).

---

## Phase 1 — Project Scaffold ✅ Done

Project created at [`lenanalabs/`](file:///c:/Users/user/Documents/Landingpage/lenanalabs).

---

## Phase 2 — Design Tokens (Tailwind v4 `@theme`) ✅ In progress

**File:** [`src/app/globals.css`](file:///c:/Users/user/Documents/Landingpage/lenanalabs/src/app/globals.css)

Tailwind v4 uses `@theme { }` to register custom tokens as utilities:

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-paper:   #FAFAFA;
  --color-ink:     #0D0D0D;
  --color-carmine: #C8102E;
  --color-sulphur: #F5E642;

  /* Fonts (CSS vars injected by next/font) */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-dm-mono);

  /* Type scale extras */
  --text-7xl: 5rem;
  --text-8xl: 6.5rem;

  /* Spacing */
  --max-width-page: 1440px;

  /* Easing */
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Base */
body {
  @apply bg-paper text-ink font-sans antialiased;
}
```

**Also update `layout.tsx`** — swap Geist fonts for Inter + DM Mono:
```tsx
import { Inter, DM_Mono } from "next/font/google";

const inter  = Inter ({ variable: "--font-inter",   subsets: ["latin"] });
const dmMono = DM_Mono({ variable: "--font-dm-mono", subsets: ["latin"], weight: ["400","500"] });
```

**Deliverable:** All Swiss tokens available as Tailwind classes across the project.

---

## Phase 3 — Primitive Components

Build in `src/components/ui/`. Pure Tailwind v4 utility classes.

| # | Component | Key classes |
|---|---|---|
| 1 | `Container` | `mx-auto max-w-page px-[clamp(1.5rem,5vw,5rem)] w-full` |
| 2 | `Grid` | `grid grid-cols-12 gap-6 md:grid-cols-8 sm:grid-cols-4` |
| 3 | `Section` | `py-20 md:py-14 sm:py-10`; prop → `bg-paper` / `bg-sulphur` / `bg-ink text-paper` |
| 4 | `SectionHeader` | Two-col `Grid`: `IndexNumber` + `Label` left · `<h2>` right |
| 5 | `Rule` | `border-t border-ink` / `border-t-2 border-ink` |
| 6 | `Label` | `font-mono text-xs uppercase tracking-[0.12em]` |
| 7 | `Tag` | `border border-ink px-2 py-0.5 text-xs font-mono rounded-none`; `bg-sulphur` variant |
| 8 | `Button` | `h-12 px-6 text-sm font-medium rounded-none transition-colors duration-150`; `bg-carmine text-paper` / `border border-ink bg-paper` / `bg-ink text-paper` |
| 9 | `TextLink` | `underline underline-offset-4 decoration-1 hover:text-carmine transition-colors duration-150` |
| 10 | `IndexNumber` | `font-mono text-7xl text-carmine leading-none` |
| 11 | `SkipLink` | `sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-carmine focus:text-paper focus:px-4 focus:py-2` |

---

## Phase 4 — Composite Components

### Navigation (`src/components/ui/`)
- [ ] **`NavBar`** — `flex items-center justify-between h-16 border-b border-ink bg-paper`
- [ ] **`NavDropdown`** — `absolute top-full left-0 w-full bg-paper border-b border-ink shadow-none`; show on `group-hover`/`focus-within`
- [ ] **`NavDropdownItem`** — small `IndexNumber` + title + description + `→` arrow
- [ ] **`MobileMenu`** — `fixed inset-0 z-50 bg-ink text-paper flex flex-col p-8 overflow-y-auto`

### Content cards (`src/components/cards/`)
- [ ] **`HeroImage`** — `absolute inset-0 w-full h-full object-cover grayscale` (`next/image`)
- [ ] **`HeroPanel`** — `absolute bottom-0 left-0 bg-paper p-8 md:p-6 max-w-xl`
- [ ] **`ProblemBlock`** — `text-4xl md:text-3xl sm:text-2xl font-sans font-medium leading-tight`
- [ ] **`SolutionOverview`** — `divide-y divide-ink`; each row `py-5 flex gap-8`
- [ ] **`MediaFrame`** — `aspect-[4/5] relative overflow-hidden` + B&W `next/image`
- [ ] **`FactRow`** — `grid grid-cols-2 items-baseline border-t border-ink py-4`
- [ ] **`ProductRow`** — `grid grid-cols-12 gap-6 border-b border-ink py-8 items-start`
- [ ] **`SolutionItem`** — `grid grid-cols-12 gap-6 py-8 border-b border-ink`
- [ ] **`StatBlock`** — `flex flex-col gap-2`; `font-mono text-7xl text-carmine` + `Label`
- [ ] **`TeamMember`** — square `MediaFrame` + name + role; `grayscale hover:grayscale-0 transition`
- [ ] **`Testimonial`** — `border-l-4 border-carmine pl-6 py-2`; blockquote + author
- [ ] **`CTAButtonBar`** — `flex flex-wrap gap-4 items-center`
- [ ] **`ContactCard`** — `bg-sulphur p-10 md:p-8`; heading + details + `Button`
- [ ] **`FooterColumn`** — `flex flex-col gap-3`; `Label` + `TextLink[]`

---

## Phase 5 — Section Assemblies

Build in `src/components/sections/`. Wired into `src/app/page.tsx`.

| # | Section | Background | Notes |
|---|---|---|---|
| 1 | `Header` | `bg-paper` | `sticky top-0 z-50`; hamburger at `md:` |
| 2 | `Hero` | — | `relative h-svh overflow-hidden` |
| 3 | `Problem` | `bg-paper` | Generous `py-32` whitespace |
| 4 | `SolutionOverview` | `bg-paper` | Ruled item list |
| 5 | `Introduction` | `bg-paper` | 5-col image · 7-col facts |
| 6 | `Products` | `bg-paper` | Ruled `ProductRow[]` list |
| 7 | `Solutions` | `bg-paper` | Optional; render if content present |
| 8 | `EarlyTraction` | `bg-sulphur` | `StatBlock[]` in a row |
| 9 | `Team` | `bg-paper` | `TeamMember` grid `grid-cols-4 md:grid-cols-2` |
| 10 | `Testimonials` | `bg-paper` | `scroll-snap-x` carousel; `aria-live="polite"` |
| 11 | `CTABanner` | `bg-carmine text-paper` | Full-width high-contrast strip |
| 12 | `Contact` | `bg-paper` | `ContactCard` |
| 13 | `Footer` | `bg-ink text-paper` | `FooterColumn[]` + legal strip |

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <SolutionOverview />
        <Introduction />
        <Products />
        <Solutions />
        <EarlyTraction />
        <Team />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

---

## Phase 6 — Content & Assets

- [ ] Replace placeholder copy with real Lenana Labs brand text in each section
- [ ] Hero image — B&W, high-contrast, full-bleed (generate or source)
- [ ] Team photos — use `grayscale` CSS, optionally `hover:grayscale-0`
- [ ] SEO metadata in `layout.tsx` (`title`, `description`, Open Graph)
- [ ] Favicon — black `L` monogram SVG in `public/`

---

## Phase 7 — Responsiveness & Accessibility

### Tailwind v4 Breakpoints
| Prefix | Width |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

### Checklist
- [ ] Grid collapses `12 → 8 → 4` cols at `md:` / `sm:`
- [ ] Header: `hidden md:flex` desktop nav, `flex md:hidden` hamburger
- [ ] Hero panel: `absolute md:static md:bg-paper` reflow on mobile
- [ ] Touch targets ≥ `min-h-[44px] min-w-[44px]`
- [ ] All `<Image>` have descriptive `alt`
- [ ] Focus rings: `focus-visible:outline-2 focus-visible:outline-carmine focus-visible:outline-offset-2`
- [ ] `prefers-reduced-motion` via `motion-safe:` / `motion-reduce:` Tailwind variants
- [ ] ARIA landmarks and `role="navigation"` on `<nav>`
- [ ] Contrast ≥ 4.5:1 (carmine on paper, ink on sulphur)

---

## Phase 8 — QA & Polish

- [ ] **Lighthouse**: Performance ≥ 90, Accessibility = 100
- [ ] **Cross-browser**: Chrome, Firefox, Safari desktop + mobile
- [ ] **Keyboard nav**: full end-to-end tab flow
- [ ] **`next build`**: zero TS errors, zero ESLint errors
- [ ] **Bundle**: check `.next` output; lazy-load below-fold sections if needed

---

## Build Schedule

| Day | Work |
|---|---|
| **Day 1** | ✅ Scaffold done → Phase 2: tokens + fonts |
| **Day 2** | Phase 3 — all 11 primitives |
| **Day 3** | Phase 4 — nav + hero composites |
| **Day 4** | Phase 4 — remaining cards |
| **Day 5** | Phase 5 — all sections wired into page |
| **Day 6** | Phase 6 — real content + assets |
| **Day 7** | Phase 7 + 8 — responsive, a11y, QA |
