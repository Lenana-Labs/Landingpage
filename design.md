# Lenana Labs: Landing Page Design

Single source of truth for the website design. Every decision lives here.

**Status legend:** `DECIDED` = confirmed by you · `PROPOSED` = my suggestion, awaiting your yes/no · `OPEN` = needs input

---

## 1. Direction

| Item | Value | Status |
|---|---|---|
| Style | Swiss / International Typographic Style | DECIDED |
| Page background | White or near-white | DECIDED |
| Accent palette | Carmine red, sulphur yellow, black | DECIDED |
| Sections | Header, Hero, Introduction, Products, Solutions (maybe), Contact card, Footer | DECIDED |
| Architecture | Reusable, modular elements | DECIDED |

### Swiss principles we apply (PROPOSED)

1. **Grid first.** Everything snaps to a 12-column grid. Nothing floats.
2. **Typography is the design.** Big, confident type does the work that images and illustrations do elsewhere.
3. **Flush-left, ragged-right.** Never centered body text, never justified.
4. **Asymmetry with order.** Big empty areas are intentional; content sits on grid lines.
5. **Color is rare and meaningful.** White carries the page. Red signals action and emphasis. Yellow marks highlight blocks. Black is text and structure.
6. **Rules, not boxes.** Thin black lines separate content instead of shadows, rounded cards or gradients.
7. **No decoration.** No shadows, no gradients, no stock illustrations, no rounded corners.

---

## 2. Design Tokens

### 2.1 Color (DECIDED values, PROPOSED roles)

| Token | Name | RGB | HEX | Role |
|---|---|---|---|---|
| `--color-carmine` | Carmine Red | 166, 44, 55 | `#A62C37` | Primary accent: CTAs, key numbers, links on hover, one emphasis per view |
| `--color-sulphur` | Sulphur Yellow | 245, 236, 194 | `#F5ECC2` | Highlight surfaces: feature blocks, contact card, tags |
| `--color-ink` | Black | 17, 19, 20 | `#111314` | Text, rules, footer surface, secondary buttons |
| `--color-paper` | White | 255, 255, 255 | `#FFFFFF` | Page background |
| `--color-paper-alt` | Warm white | 250, 249, 245 | `#FAF9F5` | Optional subtle alternate band (use sparingly) |
| `--color-muted` | Muted ink | 17, 19, 20 @ 62% | `rgba(17,19,20,.62)` | Secondary text, captions |
| `--color-rule` | Rule | 17, 19, 20 | `#111314` | 1px dividers (full ink, not grey, for Swiss crispness) |

**Usage ratio (PROPOSED):** ~80% white, ~12% black (text/rules), ~5% yellow, ~3% carmine.

**Approved pairings (contrast roughly AA or better; verify with a checker before shipping):**

| Text | On | Use |
|---|---|---|
| Black | White | Body text |
| Black | Sulphur | Text in yellow blocks |
| White | Carmine | Primary button label |
| Carmine | White | Large headings, numbers, links |
| Sulphur | Black | Footer accents |
| White | Black | Footer body text |

**Avoid:** carmine text on black, yellow text on white (unreadable), carmine next to yellow as adjacent large fills (visually vibrates). Separate them with white or a black rule.

### 2.2 Typography (PROPOSED)

- **Typeface:** Inter (free, Swiss-grotesk lineage, loads easily via `next/font`). Fallback stack: `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- **Mono accent (optional):** JetBrains Mono for small labels and index numbers like `01`, `02`.
- **Weights used:** 400 (body), 500 (labels), 700 (headlines). Nothing else.
- **Case:** Sentence case for headlines. Uppercase only for tiny labels with +0.08em tracking.

| Token | Size (desktop / mobile) | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display` | 96 / 48 px | 700 | 0.98 | -0.04em | Hero headline only |
| `h1` | 64 / 36 px | 700 | 1.02 | -0.03em | Section titles |
| `h2` | 40 / 28 px | 700 | 1.1 | -0.02em | Sub-section, card titles |
| `h3` | 24 / 20 px | 500 | 1.25 | -0.01em | Item titles |
| `body-lg` | 20 / 18 px | 400 | 1.5 | 0 | Intro paragraphs |
| `body` | 16 / 16 px | 400 | 1.6 | 0 | Default text |
| `label` | 12 / 12 px | 500 | 1.2 | +0.08em, uppercase | Tags, section indexes, nav meta |

Max line length: 64 characters for body text.

### 2.3 Grid and layout (PROPOSED)

| Property | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
|---|---|---|---|
| Columns | 12 | 8 | 4 |
| Gutter | 24 px | 20 px | 16 px |
| Page margin | 48 px | 32 px | 20 px |
| Max content width | 1280 px | fluid | fluid |

Typical placement pattern: **section label in columns 1–3, content in columns 4–12.** This left-label / right-content split is the signature layout of the site and repeats in every section.

### 2.4 Spacing scale (PROPOSED)

Base unit 8 px: `4, 8, 16, 24, 32, 48, 64, 96, 128, 192`.
Vertical rhythm between sections: **128 px desktop / 80 px mobile.**

### 2.5 Shape, borders, motion (PROPOSED)

- **Border radius:** `0` everywhere. No exceptions.
- **Rules:** 1px solid ink between items; 2px solid ink above major section titles.
- **Shadows:** none.
- **Motion:** minimal and fast. 150ms ease-out color/underline transitions. No parallax, no scroll-jacking. Respect `prefers-reduced-motion`.
- **Imagery:** optional. If used: rectangular crops, snapped to the grid, black and white or flat color. No rounded masks.

### 2.6 CSS variables (starting point)

```css
:root {
  --color-carmine: #A62C37;
  --color-sulphur: #F5ECC2;
  --color-ink: #111314;
  --color-paper: #FFFFFF;
  --color-paper-alt: #FAF9F5;
  --color-muted: rgba(17, 19, 20, 0.62);

  --font-sans: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --space-1: 4px;  --space-2: 8px;   --space-3: 16px; --space-4: 24px;
  --space-5: 32px; --space-6: 48px;  --space-7: 64px; --space-8: 96px;
  --space-9: 128px;

  --radius: 0;
  --rule: 1px solid var(--color-ink);
  --rule-heavy: 2px solid var(--color-ink);
}
```

---

## 3. Reusable Components

Built once, used across all sections. Naming is Next.js/React-friendly.

### 3.1 Primitives

| Component | Description | Variants |
|---|---|---|
| `Container` | Max-width wrapper with page margins | none |
| `Grid` | 12/8/4 column grid wrapper | none |
| `Section` | Vertical spacing + optional top rule + optional background | `paper`, `sulphur`, `ink` |
| `SectionHeader` | Index number + label + title, laid out in the left-label/right-content pattern | with/without description |
| `Rule` | Horizontal divider | `thin`, `heavy` |
| `Label` | Small uppercase mono text | `default`, `carmine` |
| `Tag` | Label inside a bordered rectangle | `outline`, `sulphur` |
| `Button` | Rectangular, no radius, 48px tall, label 14px/500 | `primary` (carmine fill, white text), `secondary` (ink outline), `ink` (ink fill), each with arrow `→` option |
| `TextLink` | Underlined 1px offset, turns carmine on hover | `default`, `inverse` (on ink) |
| `IndexNumber` | Large numeral (`01`, `02`) in carmine | `sm`, `lg` |

**Button states:** hover = background shifts to ink (primary) or fills ink (secondary); focus = 2px carmine outline with 2px offset; disabled = 40% opacity.

### 3.2 Composite components

| Component | Description | Used in |
|---|---|---|
| `NavBar` | Logo left, links right, CTA far right | Header |
| `ProductCard` | Index number, name, one-line description, tags, link. Separated by rules, not boxes | Products |
| `SolutionItem` | Index, title, short text, optional list of capabilities | Solutions |
| `StatBlock` | Large number + small label | Optional strip below the hero |
| `ContactCard` | Sulphur surface, heading, short text, email/phone/location, primary `Button` | Contact |
| `FooterColumn` | Label + vertical list of `TextLink` | Footer |

### 3.3 V1 component inventory

Everything needed to ship the v1 pages (Home, 404, Privacy). Build in this order: layout, then UI, then composites, then section assemblies.

**Layout (5)**

| Component | Used by |
|---|---|
| `Container` | Every section |
| `Grid` | Every section |
| `Section` | Every section (variants: `paper`, `sulphur`, `ink`) |
| `SectionHeader` | Introduction, Products, Solutions, Contact |
| `Rule` | Header, Products, Solutions, Footer |

**UI primitives (6)**

| Component | Used by |
|---|---|
| `Button` | Header CTA, Hero, Contact card |
| `TextLink` | Nav, Contact card, Footer, Privacy, 404 |
| `Label` | Section headers, nav, footer columns |
| `Tag` | Product rows |
| `IndexNumber` | Product rows, Solution items, Section headers |
| `SkipLink` | Header (accessibility: "Skip to content") |

**Composites (13)**

| Component | Used by |
|---|---|
| `NavBar` | Header |
| `NavDropdown` | Header (trigger button + panel; handles open/close, keyboard, aria) |
| `NavDropdownItem` | `NavDropdown` panel row: index, title, description, link |
| `MobileMenu` | Header (full-screen panel on mobile, dropdowns become accordions) |
| `ProductRow` | Products (renders `ProductCard` data as a ruled row; rename `ProductCard` to `ProductRow` in code) |
| `SolutionItem` | Solutions |
| `HeroImage` | Hero (full-bleed B&W background image wrapper) |
| `HeroPanel` | Hero (sulphur text block anchored bottom-left) |
| `MediaFrame` | Introduction (image at a fixed aspect ratio with the B&W treatment; reusable for later pages) |
| `FactRow` | Introduction (label + value in a ruled row; reusable for any key/value list) |
| `StatBlock` | Optional strip below the hero (not in the hero) |
| `ContactCard` | Contact section |
| `FooterColumn` | Footer |

**Section assemblies (7)**

| Component | Composed of |
|---|---|
| `Header` | `SkipLink`, `NavBar`, `NavDropdown`, `MobileMenu`, `Button`, `Rule` |
| `Hero` | `Section`, `HeroImage`, `HeroPanel`, `Label`, `Button` |
| `Introduction` | `Section`, `Container`, `Grid`, `SectionHeader`, `MediaFrame`, `FactRow`, `Rule` |
| `Products` | `Section`, `SectionHeader`, `ProductRow` list |
| `Solutions` | `Section`, `SectionHeader`, `SolutionItem` x3 |
| `Contact` | `Section`, `ContactCard` |
| `Footer` | `Section` (ink), `FooterColumn`, `Rule`, `TextLink` |

**Page-level (2)**

| Component | Used by |
|---|---|
| `Prose` | Privacy (and future Terms): readable long text, max 64ch, uses `h2`/`body` tokens |
| `NotFound` | 404 page |

**Total: 33 components for v1.**

**Deferred to v1.5+:** `ProductDetail` template, `ContactForm`, `FormField`/`Input`/`Textarea`, `TeamMember`, `CaseStudyCard`, `PostCard`.

### 3.4 Folder suggestion (PROPOSED)

```
components/
  ui/          Button, TextLink, Label, Tag, Rule, IndexNumber
  layout/      Container, Grid, Section, SectionHeader
  sections/    Header, Hero, Introduction, Products, Solutions, Contact, Footer
  cards/       ProductCard, SolutionItem, StatBlock, ContactCard
```

Section content (product list, solutions list) lives in typed data files (`data/products.ts`, `data/solutions.ts`) so adding a product never requires touching layout code.

---

## 4. Pages and Page Structure

### 4.0 Site map

| Route | Page | Release | Notes |
|---|---|---|---|
| `/` | Home | **v1** | Whole story in one scroll: Hero, Introduction, Products, Solutions, Contact card. Header links jump to anchors |
| `/404` | Not found | **v1** | Swiss-style: one huge "404" in type, a text link home |
| `/privacy` | Privacy | **v1** | Plain prose page; needed once contact details are collected |
| `/products/[slug]` | Product detail | v1.5 | One template reused per product; fed from `data/products.ts`. Only for products with more to say than a one-liner |
| `/contact` | Contact | v1.5 | Only if we want a real form; until then the contact card on Home is enough |
| `/open-source` | Open source | Later | Linked from Devs dropdown |
| `/docs` | Docs | Later | Linked from Devs dropdown |
| `/about` | About / Team | Later | When clients start vetting us |
| `/work` | Case studies | Later | Needs real projects to show |
| `/blog` | Blog | Later | Skip until someone will actually write it |
| `/terms` | Terms | Later | Only if we sell through the site |

**Decision:** Solutions is a section on Home, not a separate page.
**Open:** which products get a detail page at v1.5, and which stay as a row on Home.

### 4.0.1 Home page order (PROPOSED)

Order top to bottom:

1. Header
2. Hero
3. Introduction
4. Products
5. Solutions (optional)
6. Contact card
7. Footer

### 4.1 Header

**Background:** white, 1px black rule beneath. Sticky on scroll. Height 72px desktop / 56px mobile.

```
┌──────────────────────────────────────────────────────────────────┐
│ LENANA LABS          Products ▾  Solutions ▾  Devs ▾  Blog ▾  [Contact]│
└──────────────────────────────────────────────────────────────────┘
```

**Layout (DECIDED):** company name far left; nav items on the right with dropdowns; Contact button in the far right corner.

| Part | Spec |
|---|---|
| Company name | "Lenana Labs" wordmark, Inter 700, tracking -0.02em, links to `/`. Small carmine square (12x12) before it as a placeholder mark until a logo exists |
| Nav items | `Products`, `Solutions`, `Devs`, `Blog` (Blog is optional, see below). `label` style, ink. A small `▾` after each item that has a dropdown |
| Nav item states | Hover/open = 2px carmine underline. Current section = ink underline |
| Contact button | `Button` primary (carmine fill, white text), small (40px tall), label "Contact", far right. Jumps to the contact card on Home |
| Spacing | Nav items 32px apart; 48px gap before the Contact button |

**Dropdowns (PROPOSED):**

```
 Products ▾
┌─────────────────────────────┐
│ 01  Product one             │
│     One-line description    │
│ ─────────────────────────── │
│ 02  Product two             │
│     One-line description    │
│ ─────────────────────────── │
│ All products →              │
└─────────────────────────────┘
```

- Panel: white background, 1px ink border, **no shadow, no radius**, 320px wide, aligned to the left edge of its trigger, 0px gap below the header rule so it reads as attached to the header.
- Rows: index number (carmine, `label`) + title (`h3`) + one-line description (`body`, muted). Separated by 1px rules. Hover = sulphur background.
- Last row is a `TextLink` with arrow ("All products →").
- Behavior: opens on click, and on hover for pointer devices with a ~150ms delay; closes on outside click, `Esc`, or focus leaving. Only one open at a time. Trigger is a `<button>` with `aria-expanded` and `aria-controls`; panel items are plain links reachable by `Tab`; arrow keys move between items.
- Motion: 150ms opacity fade only. No sliding.

**Dropdown contents (OPEN, placeholders):**

| Menu | Items | Where items go at v1 |
|---|---|---|
| Products | One row per product + "All products" | Anchors on Home (`/#products`); product detail pages at v1.5 |
| Solutions | One row per solution category | Anchors on Home (`/#solutions`) |
| Devs | **GitHub**, **Open source**, **Docs** (DECIDED) | GitHub = external link to the lenanalabs GitHub (opens in new tab, marked with `↗`). Open source and Docs = pages built later; **hide those two rows until their pages exist**, so v1 Devs shows GitHub only |
| Blog | e.g. Latest, Categories | No blog at v1, so **hide this item until there is a blog** |

**Note (v1 Devs behavior):** while GitHub is the only Devs destination, `Devs` is a plain external link to the lenanalabs GitHub (opens in a new tab, `↗` instead of `▾`, no dropdown panel). Once the Open source and Docs pages exist, `Devs` becomes a normal dropdown with all three rows. On mobile it is a single row in the menu until then, with no accordion. Same rule for Blog: no dropdown until there is more than one thing to list.

**Mobile (<1024):** wordmark left, `Menu` text button right (no hamburger icon). Opens a full-screen white panel: each nav item is a large `h2` row separated by rules, tapping a row expands its dropdown items as an accordion beneath it. `Contact` button is full width, pinned at the bottom of the panel. Body scroll locked while open; `Esc` and a `Close` text button dismiss it.

### 4.2 Hero, Option C: image + sulphur block (DECIDED)

**Concept:** a full-bleed black and white photo with no overlay, and one sulphur text block anchored bottom-left. The photo stays bright; legibility comes from the block, not from darkening the image.

```
Desktop
┌──────────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░ image (B&W) ░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ focal subject ░░░░░░░░░░░░░│
│┌─────────────────────────────┐░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
││ LENANA LABS / NAIROBI       │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
││                             │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
││ We build technology         │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
││ that works.                 │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
││ Short paragraph.            │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
││ [Our work →] [Contact]      │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│└─────────────────────────────┘░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└──────────────────────────────────────────────────────────────┘
  cols 1–6 sulphur block, flush to the bottom edge of the hero

Mobile
┌────────────────────────┐
│░░░░░░░ image ░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░│
│┌──────────────────────┐│
││ LENANA LABS / NAIROBI││
││ We build technology  ││
││ that works.          ││
││ Short paragraph.     ││
││ [Our work →]         ││
││ [Contact]            ││
│└──────────────────────┘│
└────────────────────────┘
```

| Part | Spec |
|---|---|
| Hero height | min 80vh, never under 560px on desktop; 70svh on mobile |
| Image | Full-bleed under the header rule, `object-fit: cover`, no overlay, no gradient |
| Image treatment | Grayscale, slightly raised contrast (`grayscale(1) contrast(1.1)`), optional light grain |
| Image delivery | At least 2400px wide, WebP/AVIF through `next/image` with `priority`; decorative, so `alt=""` |
| Image subject | **OPEN**: Point Lenana / Mount Kenya, or Nairobi skyline. Keep the visual interest in columns 7–12, since the block covers the bottom-left |
| Block | Sulphur `#F5ECC2`, columns 1–6 (max 640px), flush to the bottom of the hero, aligned to the left page margin, padding 48px (24px on mobile), no radius, no shadow |
| Mobile block | Full width, flush to the bottom, padding 24px |
| Label | `Lenana Labs / Nairobi` (no section number; the hero is not numbered), `label` style, ink |
| Headline | `h1` token (64px desktop, 36px mobile), black, 700, -0.03em. No colored emphasis word (carmine on sulphur is avoided) |
| Paragraph | `body-lg`, black, max 44ch, 24px below headline |
| Buttons | Primary (carmine fill, white text) + secondary (1px ink outline, ink text; hover fills ink with white text). 32px below paragraph, 16px apart. Stack on mobile |
| Contrast | Black on sulphur is about 16:1, so text is always legible whatever the photo is |
| Stats | Removed from the hero. `StatBlock` becomes an optional strip on white directly below the hero (**OPEN**) |

**Copy (OPEN, placeholders):** headline "We build technology that works." and the intro paragraph.

#### 4.2.1 Reference implementation (hero only)

Working preview: `hero-panel.html` (header + hero, standalone). It uses the tokens from section 2. Replace the `--hero-image` variable with the real photo, e.g. `url("hero.jpg")`.

```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true"></div>
  <div class="container grid">
    <div class="hero__panel">
      <p class="label">Lenana Labs / Nairobi</p>
      <h1 id="hero-title" class="hero__title">We build technology that works.</h1>
      <p class="hero__text">Lenana Labs is a tech solutions company from Nairobi. Placeholder copy: a short line about what we do and who we do it for.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#products">Our work →</a>
        <a class="btn btn--outline" href="#contact">Contact</a>
      </div>
    </div>
  </div>
</section>

```

```css
/* ---------- Hero: image + sulphur block (Option C) ---------- */
.hero {
  position: relative;
  isolation: isolate;
  min-height: max(80vh, 560px);
  display: flex;
  align-items: flex-end;           /* block sits flush to the bottom edge */
  background: var(--color-ink);
  overflow: hidden;
}
.hero__bg {
  position: absolute; inset: 0; z-index: -1;
  background-image: var(--hero-image),
    linear-gradient(135deg, #c4c6c7 0%, #77797a 45%, #2b2d2e 100%); /* placeholder until a photo is set */
  background-size: cover;
  background-position: center;
  filter: grayscale(1) contrast(1.1);  /* no overlay, no gradient */
}

.hero .container { width: 100%; }
.hero__panel {
  grid-column: 1 / span 6;          /* columns 1–6 on desktop */
  max-width: 640px;
  background: var(--color-sulphur);
  color: var(--color-ink);
  padding: 48px;
}
.hero__title {
  margin-top: 32px;
  font-size: 64px;
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.03em;
}
.hero__text {
  margin-top: 24px;
  max-width: 44ch;
  font-size: 20px;
  line-height: 1.5;
}
.hero__actions { margin-top: 32px; display: flex; flex-wrap: wrap; gap: 16px; }

@media (max-width: 1023px) {
  :root { --margin: 32px; --gutter: 20px; }
  .hero__panel { grid-column: 1 / span 7; max-width: none; }
}
@media (max-width: 639px) {
  :root { --margin: 20px; --gutter: 16px; }
  .header__inner { height: 56px; }
  .nav a.nav__link { display: none; }   /* mobile menu not built in this preview */
  .hero { min-height: 70svh; }
  .hero .container { padding: 0; }      /* block runs full width on mobile */
  .hero__panel { grid-column: 1 / -1; padding: 24px; }
  .hero__title { font-size: 36px; margin-top: 24px; }
  .hero__text { font-size: 18px; }
  .hero__actions { flex-direction: column; align-items: stretch; }
  .hero__actions .btn { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; scroll-behavior: auto !important; }
}

```

Notes:
- The block is flush to the bottom of the hero because `.hero` uses `align-items: flex-end` and the container has no bottom padding.
- On mobile the container padding is removed so the block runs edge to edge.
- Port to React as `Hero` = `HeroImage` (the `.hero__bg` layer) + `HeroPanel` (the `.hero__panel` block); keep copy and image path in data/config, not in the component.

### 4.3 Introduction, Option B: tall image + ruled facts (DECIDED)

**Concept:** a tall portrait image on the left, with the company story and a short table of facts on the right. It contrasts with the wide hero above it and reads as the "who we are" moment.

**Background:** white. 2px black rule on top, like every numbered section.

```
Desktop
┌──────────────────────────────────────────────────────────────┐
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ┌───────────────┐          01 / INTRODUCTION                 │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│                                            │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│          We are a small team                │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│          building software                 │
│ │▓ image 4:5 ▓▓▓│          that works.                       │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│                                            │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│          One paragraph about the company.  │
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│                                            │
│ └───────────────┘          ────────────────────────────────  │
│   cols 1–5                 Based in    Nairobi, Kenya        │
│   (col 6 empty)            ────────────────────────────────  │
│                            Focus       Web, AI, custom       │
│                            ────────────────────────────────  │
│                            Team        Founders + developers │
│                            ────────────────────────────────  │
│                              cols 7–12                       │
└──────────────────────────────────────────────────────────────┘

Mobile
┌────────────────────────┐
│ ━━━━━━━━━━━━━━━━━━━━━━ │
│ 01 / INTRODUCTION      │
│ We are a small team    │
│ building software      │
│ that works.            │
│ One paragraph.         │
│ ┌────────────────────┐ │
│ │▓▓▓▓ image 4:5 ▓▓▓▓▓│ │
│ └────────────────────┘ │
│ ────────────────────── │
│ Based in   Nairobi     │
│ ────────────────────── │
│ Focus      Web, AI     │
│ ────────────────────── │
└────────────────────────┘
```

| Part | Spec |
|---|---|
| Grid | Image in columns 1–5, column 6 left empty, text in columns 7–12 |
| Image | `MediaFrame`, 4:5 portrait, B&W (`grayscale(1) contrast(1.1)`), no overlay, no radius, no shadow, `object-fit: cover`. Should differ from the hero image (people, workspace or detail shot, not another landscape) |
| Section header | `SectionHeader` with the index `01` and label `Introduction`, aligned to the top of the text column, 2px rule above the section |
| Headline | `h1` token (64px desktop / 36px mobile), black, max 14ch per line feel, left-aligned |
| Paragraph | `body-lg`, black, max 52ch, 24px below the headline |
| Facts table | 3 `FactRow`s, 48px below the paragraph. Each row: 1px ink rule on top (and one closing rule at the bottom), label in `label` style in columns 7–8, value in `body` (500 weight) in columns 9–12, 16px vertical padding |
| Optional link | `TextLink` "Learn more →" below the facts, only once an About page exists (later) |
| Image/text alignment | Image top aligns with the section header; the image may be taller than the text, and text stays top-aligned (no vertical centering) |
| Mobile order | Header, headline, paragraph, image, then facts. Image is full width at 4:5, facts stack with label above value on narrow phones |
| Spacing | 128px above and below on desktop, 80px on mobile |

**Fact rows (OPEN, placeholders):** Based in / Focus / Team. Add or swap rows later (e.g. Founded, Stack) without touching the layout, since rows come from data.

**Copy (OPEN, placeholders):** headline "We are a small team building software that works." and the paragraph.

**Image (OPEN):** subject and crop. Needs at least 1200px wide, served as WebP/AVIF through `next/image`; alt text describing the photo, since this one is content, not decoration.

### 4.4 Products

**Background:** white. 2px black rule on top.

```
┌────────────────────────────────────────────────────────────┐
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 02 / Products        Things we've built                    │
│                                                            │
│ ──────────────────────────────────────────────────────────│
│ 01   Product name              One-line description   [→]  │
│      [Tag] [Tag]                                           │
│ ──────────────────────────────────────────────────────────│
│ 02   Product name              One-line description   [→]  │
│      [Tag] [Tag]                                           │
│ ──────────────────────────────────────────────────────────│
└────────────────────────────────────────────────────────────┘
```

- Rendered as a **ruled list**, not a card grid. This is the most Swiss treatment and scales to any number of products.
- Row hover: background turns sulphur, arrow turns carmine.
- Featured product (optional): first row gets a sulphur background permanently.
- Mobile: index number above name, description below, tags below that.

### 4.5 Solutions (optional)

**Background:** `paper-alt` or white. Same left-label / right-content pattern.

```
┌────────────────────────────────────────────────────────────┐
│ 03 / Solutions       What we can build for you             │
│                                                            │
│  01 Web & Product      02 AI & Data      03 Custom Software│
│  ────────────────      ──────────────    ────────────────  │
│  Short text            Short text        Short text        │
│  • capability          • capability      • capability      │
└────────────────────────────────────────────────────────────┘
```

- Three equal columns on desktop (4 grid columns each), stacked on mobile.
- Each `SolutionItem` has a heavy rule above it, a carmine index number, `h2` title, body text, and bullet capabilities (square bullets, not circles).
- The three categories shown are placeholders; real categories are **OPEN**.
- If Solutions turns out to overlap Products, merge them and drop this section.

### 4.6 Contact card

**Background:** white page, with the card itself as a full-width sulphur block.

```
┌────────────────────────────────────────────────────────────┐
│ ████████████████████ SULPHUR ███████████████████████████████│
│ 04 / Contact                                               │
│                                                            │
│  Let's build something.            hello@lenanalabs.xx     │
│                                    +254 …                  │
│  [ Start a project → ]             Nairobi, Kenya          │
│ ████████████████████████████████████████████████████████████│
└────────────────────────────────────────────────────────────┘
```

- Heading in `h1`, black on sulphur.
- Contact details in `body-lg`, as `TextLink`s.
- Primary button (carmine) is the single strongest call to action on the page.
- A real contact form is **OPEN**. Default recommendation: no form for v1, just email + button (`mailto:`), then add a form once you know what fields you need.
- Email and phone are placeholders until you confirm the company's contact details.

### 4.7 Footer

**Background:** ink (black). The only dark section on the page, which gives the page a firm base.

```
┌────────────────────────────────────────────────────────────┐
│ ████████████████████████ BLACK ████████████████████████████│
│ LENANA LABS           Navigate      Connect       Legal    │
│ Tech solutions        Products      GitHub        Privacy  │
│ from Nairobi.         Solutions     LinkedIn      Terms    │
│                       Contact       Email                  │
│ ──────────────────────────────────────────────────────────│
│ © 2026 Lenana Labs                          Back to top ↑  │
└────────────────────────────────────────────────────────────┘
```

- Text white, labels in sulphur, rule in white at 20% opacity.
- 4 columns on desktop (brand 4 cols, then 3 columns of 2.67 each, rounded to grid), 2×2 on mobile.
- `TextLink` inverse variant: hover = sulphur.

---

## 5. Responsive Behavior (PROPOSED)

| Breakpoint | Changes |
|---|---|
| ≥1024 | Full 12-col layout, left-label / right-content pattern |
| 640–1023 | 8-col grid; labels stack above content; Solutions becomes 2+1 |
| <640 | 4-col grid; everything stacked; display type drops to 48px; products rows stack; nav becomes full-screen menu |

Rules: no horizontal scroll at any width; touch targets at least 44px; headline never smaller than 36px.

---

## 6. Accessibility (PROPOSED)

- Text contrast AA minimum. Re-check carmine on sulphur and muted ink on white with a checker.
- Visible focus ring on every interactive element (2px carmine outline).
- Semantic landmarks: `header`, `main`, `section` with headings, `footer`.
- One `h1` (hero headline). Section titles are `h2`.
- Do not rely on color alone: links stay underlined; hover states also change shape or position.
- Respect `prefers-reduced-motion`.
- Alt text for any image; decorative color blocks are CSS, not images.

---

## 7. Content Placeholders to Replace

| Item | Placeholder | Status |
|---|---|---|
| Hero headline | "We build technology that works." | OPEN |
| Hero paragraph | Short company description | OPEN |
| Introduction headline + paragraph | "We are a small team building software that works." + one paragraph | OPEN |
| Introduction facts | Based in / Focus / Team | OPEN |
| Introduction image | Portrait photo, B&W, 4:5 | OPEN |
| Products list | Names, one-liners, tags, links | OPEN |
| Solutions categories | Web & Product / AI & Data / Custom Software | OPEN |
| Contact details | Email, phone, location | OPEN |
| Logo | Wordmark + carmine square | OPEN |
| Footer social links | GitHub, LinkedIn, etc. | OPEN |

---

## 8. Decision Log

| # | Decision | Date |
|---|---|---|
| 1 | Swiss design direction | 2026-10-25 |
| 2 | Palette: white base, carmine `#A62C37`, sulphur `#F5ECC2`, black `#111314` | 2026-10-25 |
| 3 | Sections: header, introduction, products, solutions (maybe), contact card, footer | 2026-10-25 |
| 4 | Components must be reusable and modular | 2026-10-25 |
| 5 | Pages: v1 = Home, 404, Privacy; v1.5 = Product detail, Contact; later = About, Work, Blog, Terms | 2026-10-25 |
| 6 | Solutions is a section on Home, not a separate page | 2026-10-25 |
| 7 | V1 component inventory (28 components) listed in section 3.3 | 2026-10-25 |
| 8 | Header: company name far left; nav on the right (Products, Solutions, Devs, maybe Blog) with dropdowns; Contact button in far right corner | 2026-10-25 |
| 9 | Devs dropdown points to GitHub, Open source, and Docs; Open source and Docs pages come later | 2026-10-25 |
| 10 | v1: `Devs` is a plain external link to GitHub (no dropdown) until Open source and Docs pages exist | 2026-10-25 |
| 11 | Introduction (hero) has a background image; text layout still open | 2026-10-25 |
| 12 | Hero layout: Option C, full-bleed B&W image with no overlay and a sulphur text block bottom-left (cols 1–6, flush to bottom) | 2026-10-25 |
| 13 | Stats removed from the hero; `HeroImage` and `HeroPanel` added, v1 inventory now 30 components | 2026-10-25 |
| 14 | Hero reference HTML/CSS for Option C added in section 4.2.1 (`hero-panel.html` is the live preview) | 2026-10-25 |
| 15 | Hero label renamed to `Lenana Labs / Nairobi` and the hero is unnumbered; sections numbered 01 Introduction, 02 Products, 03 Solutions, 04 Contact | 2026-10-25 |
| 16 | Introduction: Option B, tall 4:5 B&W image in cols 1–5, story + ruled fact rows in cols 7–12 | 2026-10-25 |
| 17 | Added `MediaFrame`, `FactRow`, `Introduction`; `Intro` renamed `Hero`; v1 inventory now 33 components | 2026-10-25 |

Everything else in this file is **PROPOSED** until moved here.
