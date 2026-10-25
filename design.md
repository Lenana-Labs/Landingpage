# Lenana Labs: Landing Page Design (Updated)

## 1. Direction

| Item | Value | Status |
|---|---|---|
| Style | Swiss / International Typographic Style | DECIDED |
| Page background | White or near-white | DECIDED |
| Accent palette | Carmine red, sulphur yellow, black | DECIDED |
| Sections | Header, Hero, Problem, Solution Overview, Introduction, Products, Solutions (optional), Early Traction, Team Snapshot, Testimonials, CTA Banner, Contact (card), Footer | DECIDED |
| Architecture | Reusable, modular elements | DECIDED |

### Swiss principles we apply (PROPOSED)
1. **Grid first.** Everything snaps to a 12‑column grid. Nothing floats.
2. **Typography is the design.** Big, confident type does the work that images and illustrations do elsewhere.
3. **Flush‑left, ragged‑right.** Never centered body text, never justified.
4. **Asymmetry with order.** Big empty areas are intentional; content sits on grid lines.
5. **Color is rare and meaningful.** White carries the page. Red signals action and emphasis. Yellow marks highlight blocks. Black is text and structure.
6. **Rules, not boxes.** Thin black lines separate content instead of shadows, rounded cards or gradients.
7. **No decoration.** No shadows, no gradients, no stock illustrations, no rounded corners.

---

## 2. Design Tokens (unchanged)
*(see existing token tables for colors, typography, grid, spacing, shape, motion – retained as‑is)*

---

## 3. Reusable Components (updated inventory)

### 3.1 Primitives (unchanged)
| Component | Description | Variants |
|---|---|---|
| `Container` | Max‑width wrapper with page margins | none |
| `Grid` | 12/8/4 column grid wrapper | none |
| `Section` | Vertical spacing + optional top rule + optional background | `paper`, `sulphur`, `ink` |
| `SectionHeader` | Index number + label + title, laid out in the left‑label/right‑content pattern | with/without description |
| `Rule` | Horizontal divider | `thin`, `heavy` |
| `Label` | Small uppercase mono text | `default`, `carmine` |
| `Tag` | Label inside a bordered rectangle | `outline`, `sulphur` |
| `Button` | Rectangular, no radius, 48px tall, label 14px/500 | `primary`, `secondary`, `ink` |
| `TextLink` | Underlined 1px offset, turns carmine on hover | `default`, `inverse` |
| `IndexNumber` | Large numeral (`01`, `02`) in carmine | `sm`, `lg` |
| `SkipLink` | Accessibility skip to main content | – |

### 3.2 Composite components (expanded)
| Component | Description | Used in |
|---|---|---|
| `NavBar` | Logo left, links right, CTA far right | Header |
| `NavDropdown` | Dropdown panel for Products / Solutions | Header |
| `NavDropdownItem` | Index, title, description, link inside dropdown | Header |
| `MobileMenu` | Full‑screen overlay menu on mobile | Header |
| `HeroImage` | Full‑bleed B&W background image wrapper | Hero |
| `HeroPanel` | Text block anchored bottom‑left of hero | Hero |
| `ProblemBlock` | Short statement of the problem you solve | Problem |
| `SolutionOverview` | Bullet list of high‑level solution pillars | Solution Overview |
| `MediaFrame` | Fixed‑aspect‑ratio image container | Introduction |
| `FactRow` | Label + value pair used in Introduction facts | Introduction |
| `ProductRow` | Index, name, tagline, description, tags, link | Products |
| `SolutionItem` | Index, title, description, capabilities list | Solutions |
| `StatBlock` | Optional large number + label strip (e.g., “10 years experience”) | Optional hero strip |
| `TeamMember` | Photo, name, role, short bio (optional link) | Team Snapshot |
| `Testimonial` | Quote, author, short attribution | Testimonials |
| `CTAButtonBar` | Primary/secondary call‑to‑action buttons in a banner | CTA Banner |
| `ContactCard` | Sulphur surface with heading, contact details, primary button | Contact |
| `FooterColumn` | Label + vertical list of `TextLink` | Footer |

### 3.3 Section assemblies (modular)
| Component | Composed of |
|---|---|
| `Header` | `SkipLink`, `NavBar`, `NavDropdown`, `MobileMenu`, `Button`, `Rule` |
| `Hero` | `Section`, `HeroImage`, `HeroPanel`, `Label`, `Button` |
| `Problem` | `Section`, `SectionHeader`, `ProblemBlock` |
| `SolutionOverview` | `Section`, `SectionHeader`, `SolutionOverview` (list) |
| `Introduction` | `Section`, `Container`, `Grid`, `SectionHeader`, `MediaFrame`, `FactRow`, `Rule` |
| `Products` | `Section`, `SectionHeader`, `ProductRow` list |
| `Solutions` | `Section`, `SectionHeader`, `SolutionItem` list |
| `EarlyTraction` | `Section`, `SectionHeader`, `StatBlock` list |
| `Team` | `Section`, `SectionHeader`, `TeamMember` grid |
| `Testimonials` | `Section`, `SectionHeader`, `Testimonial` carousel |
| `CTABanner` | `Section`, `CTAButtonBar` |
| `Contact` | `Section`, `ContactCard` |
| `Footer` | `Section` (ink), `FooterColumn`, `Rule`, `TextLink` |

---

## 4. Page Structure (Home)

1. **Header** – sticky navigation with dropdowns and mobile menu.
2. **Hero** – full‑bleed B&W image + foreground text block.
3. **Problem** – concise statement of the pain point.
4. **Solution Overview** – high‑level bullet summary.
5. **Introduction** – portrait image + key facts.
6. **Products** – ruled list of product rows.
7. **Solutions** – optional left‑label/right‑content items.
8. **Early Traction** – statistical blocks (e.g., years, users, launches).
9. **Team Snapshot** – small grid of team members.
10. **Testimonials** – rotating quotes carousel.
11. **CTA Banner** – high‑contrast carmine strip with primary action.
12. **Contact** – sulphur card with email/phone and button.
13. **Footer** – ink background with navigation, social links, legal.

All sections follow the **left‑label / right‑content** pattern and respect the 12‑column grid, making the build fully modular – each section is a self‑contained React component that can be reordered, added, or removed without touching others.

---

## 5. Development Roadmap (Brief)
- Refactor existing `Header`, `Hero`, `Introduction`, `Products`, `Solutions`, `Contact`, `Footer` to match the new component list.
- Implement new composites: `ProblemBlock`, `SolutionOverview`, `StatBlock`, `TeamMember`, `Testimonial`, `CTAButtonBar`.
- Wire them together in `src/app/page.tsx` following the order above.
- Keep all design tokens and CSS variables in `globals.css`; components use CSS classes that reference those tokens.
- Ensure each component lives under a logical folder (`components/sections/`, `components/cards/`, `components/ui/`).

---

## 6. Accessibility & Responsiveness (unchanged)
*(retain existing guidance on contrast, focus rings, landmarks, reduced‑motion, breakpoints, touch targets)*

---

*All updates keep the Swiss aesthetic while expanding the homepage to tell a richer startup story in a modular, maintainable way.*
