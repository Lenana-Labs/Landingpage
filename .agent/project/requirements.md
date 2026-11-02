# Lenana Labs — Redesign Requirements (Single Source of Truth)

> Historical brief. Current implementation details are documented in `lenanalabs/README.md`. Later owner instructions supersede the placeholder-product decisions below: the public project registry is empty until approved work exists, and the About team section now displays three explicitly labeled owner-requested profile placeholders.

> Condensed from the Master Website Redesign Specification. All implementation waves must work from this file. Where it conflicts with the old `design.md` / `implementation_plan.md` at repo root, THIS file wins.

## 1. Company facts (verified, do not fabricate beyond these)
- Lenana Labs — early-stage technology engineering studio, Kenya (Nairobi).
- Three activities: (1) Client solutions, (2) Internal product development, (3) Research & experimentation.
- Positioning: multidisciplinary technology engineering studio. NOT exclusively an agency / AI company / marketing agency / research lab.
- Potential activity areas (may be presented as exploration areas, NOT as established commercial offerings): software engineering, AI, automation, digital products, infrastructure, hardware & electronics, technical research, emerging tech.
- Verified contact: `ngigemwaniki2004@gmail.com` (temporary mailbox selected by owner — keep, marked internally as temporary).
- Products in `src/content/site.ts` are owner-retained placeholders ("retained at the owner's request"). Present them as internal explorations / work-in-progress in Work/Lab, never as shipped client work. No invented clients, stats, testimonials.

## 2. Design principle
**Structured Creativity — discipline in the structure, freedom in the expression.**
Swiss design informs structure (grid, hierarchy, rules); the visual identity must become expressive, memorable, creative. The goal is NOT more futuristic — it is more expressive and distinctive without losing engineering credibility or usability.

Fix (from client critique): too plain, too rigid, too corporate, lacking personality. Audit causes: uniform section rhythm, static hero, no recurring motif, mono-everything, grayscale-only imagery, repetitive left-label/right-content pattern.

Brand personality: inventive, intelligent, curious, technically competent, creative, confident (primary); approachable, energetic, precise, adaptable, experimental, professional (secondary). Avoid corporate/institutional feel.

## 3. Information architecture (single page)
1. **Navigation** — Lenana Labs wordmark · About · Capabilities · Approach · Work/Lab · Contact. Responsive, accessible mobile menu, keyboard support, visible focus.
2. **Hero (signature)** —
   - H1: "Technology built around real problems."
   - Support: "LenanaLabs is a Kenya-based technology engineering studio exploring, designing, and building practical solutions through engineering and experimentation." (copy may be refined for rhythm; no unsupported claims)
   - Primary CTA: "Start a Conversation" · Secondary CTA: "Explore What We Do"
   - Signature computational visual: interactive geometric system / generative structure / modular system assembling itself / pointer-responsive technical visualization. No generic floating 3D. Must degrade to static (reduced motion, no-JS readable), stay performant.
3. **About** — suggested heading "Curiosity meets engineering." Studio intro; creativity + experimentation + engineering relationship. No fictional history.
4. **Capabilities** — exactly three areas:
   - Engineering Solutions — technology solutions developed around practical problems and requirements.
   - Product Development — exploring ideas and building software, tools, and digital products.
   - Research & Experimentation — investigating emerging technologies, turning concepts into working prototypes.
   - Visually engaging composition, NOT three identical cards.
5. **Approach** — four stages: 01 Understand → 02 Experiment → 03 Engineer → 04 Refine (with the spec's one-line descriptions). Experimental character; avoid generic numbered cards.
6. **Work / Lab** — flexible container for open-source, internal experiments, prototypes, products, approved client work. Use the four owner-retained internal product concepts as Lab entries + intentional empty-state support; must accept future additions without architectural changes. Check GitHub org findings in `.agent/project/discovery.md` before adding public repos.
7. **Contact** — suggested heading "Have something in mind? Let's build." mailto-based flow to the verified temporary mailbox; keep the existing project-brief form pattern if it remains functional; never a broken backend form.
8. **Footer** — identity, Kenya, nav links, verified external links only, copyright. No fictional socials.

## 4. Interaction & motion
- Purposeful only: hover transforms, button feedback, animated geometric details, scroll reveals, nav transitions, controlled kinetic type, interactive hero.
- Forbidden: parallax overload, scroll hijacking, gratuitous loaders, constant distracting motion, heavy animation libraries without justification.
- `prefers-reduced-motion`: full static experience. Keyboard accessible. No layout shift. Touch-friendly. CSS/SVG first; Canvas/WebGL only if justified.

## 5. Technical requirements
- Preserve: Next.js 16 App Router + React 19 + TypeScript + Tailwind v4. No framework migration. No new deps unless clear value.
- Existing functionality to preserve: skip link, sticky header, mobile nav, no-script nav fallback, anchor scroll-padding, focus-visible styles, selection style, reduced-motion CSS, content-visibility perf hints, project-brief contact pattern, metadata.
- Viewports to verify: 320 / 375 / 768 / 1024 / 1440 / 1920. No horizontal overflow, no overlapping text.
- Accessibility: semantic HTML, heading order, keyboard nav, visible focus, alt text, reduced motion, WCAG AA contrast for essential text.
- Performance: font loading strategy, no heavy assets blocking content, Lighthouse ≥ 90 (perf / a11y / best practices / SEO) — measure and report environment.
- SEO: title, meta description, Open Graph, semantic structure; do NOT invent a production domain (keep metadataBase env fallback).
- Edge cases: no-JS essential content; reduced motion; 320px usable; slow connections; graceful fallbacks; preserve unrelated working features.

## 6. Quality gates
- Build must pass (`npm run build`, lint, tsc).
- No duplicate code/tests, no unused deps, no unrelated file changes, no broken imports/missing assets.
- No fabricated info anywhere. No public deployment without owner authorization.
