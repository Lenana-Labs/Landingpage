# Creative Direction Exploration

Three interpretations of **Structured Creativity** for LenanaLabs. Each is renderable: `design/prototypes/direction-1.html`, `direction-2.html`, `direction-3.html`.

All three share the mandated content (headline *Technology built around real problems.*, the two CTAs, the three capability areas) so they can be compared on design alone.

---

## Direction 1 — Editorial Engineering

**Idea.** The studio as a well-set publication. Structure is Swiss; expression comes from typographic scale, asymmetric columns and hairline rules.

- **Type.** High-contrast serif display (`Instrument Serif`) against a neutral grotesque (`Instrument Sans`), with `IBM Plex Mono` for labels and coordinates.
- **Colour.** Warm paper, ink, one signal red used only for emphasis and action.
- **Layout.** 12 columns, headline spanning 9, content deliberately short-line. Sections separated by rules, not boxes.
- **Hero.** Typographic. No illustration except a small measured diagram.
- **Motion.** Ink-like reveals, underline wipes, one large type transition.

**Strengths.** Immediately reads as intelligent and commercially credible. Cheap to build, easy to extend, ages well.
**Risk.** If the serif is the only idea, it drifts back toward "expensive but quiet" — the failure mode of the current site with better fonts.

## Direction 2 — Experimental Systems

**Idea.** The studio as an instrument. The page behaves like a survey or telemetry console: grid, ticks, readouts, a live field.

- **Type.** Grotesque display (`Space Grotesk`) plus monospace for almost all interface text.
- **Colour.** Graphite ground, chalk text, one hot signal accent.
- **Layout.** Visible 1px measurement grid, corner ticks, data tables instead of cards.
- **Hero.** A pointer-reactive contour field with a live coordinate readout — the site demonstrates technical curiosity rather than describing it.
- **Motion.** The field responds; everything else is still.

**Strengths.** Highest distinctiveness; the graphic is justified by the subject matter and is cheap to render (SVG + a little maths, no 3D).
**Risk.** Dark instrument panels are the default costume of "AI company" sites. Mono everywhere hurts reading comfort and, on a phone, reads as a terminal rather than a studio.

## Direction 3 — Playful Precision

**Idea.** Engineering discipline, human delivery. Thick rules, rotated stamps, colour blocks, confident type.

- **Type.** Wide grotesque display (`Bricolage Grotesque`) with generous weight contrast.
- **Colour.** Warm off-white, ink, signal red, highland green, mustard.
- **Layout.** Deliberate grid breaks, offset blocks, numbered entries at slight angles.
- **Hero.** Type-led with a stamped, sticker-like annotation layer.
- **Motion.** Small physical reactions: cards settle, stamps tilt, arrows travel.

**Strengths.** Memorable and warm; differentiates hard from corporate consultancies.
**Risk.** Playfulness without discipline becomes decoration, and the angled elements fight the responsive grid on narrow screens.

---

## Evaluation

Weights from the master specification. Scores 1–10; weighted total out of 10.

| Criterion | Weight | D1 | D2 | D3 |
| --- | ---: | ---: | ---: | ---: |
| Brand alignment | 25% | 9 | 8 | 8 |
| Visual distinctiveness | 20% | 7 | 9 | 8 |
| Creativity and personality | 20% | 7 | 8 | 9 |
| Usability and accessibility | 15% | 9 | 6 | 8 |
| Technical feasibility | 10% | 9 | 6 | 8 |
| Long-term maintainability | 10% | 9 | 7 | 7 |
| **Weighted total** | | **8.20** | **7.65** | **8.05** |

**Rationale (short).** D1 wins on the criteria that protect a real business — legibility, accessibility, maintainability — but is the least distinctive, which is precisely the current site's problem. D2 is the most memorable and its central graphic (a contour field) is the only one that *demonstrates* engineering rather than asserting it; it loses points for reading comfort, mobile behaviour and the cost of keeping a graphical system alive. D3 is the most human and the most fun, but its angles and stickers resist a strict grid at 320px and will age fastest.

## Selected: hybrid — "Editorial Survey"

Take **D1's structure and typographic discipline**, **D2's survey-plate graphic as the signature visual**, and **D3's warmth** (paper rather than white, signal red plus highland green, a little physical energy in interaction).

This is not variety for its own sake: the three parts answer three separate weaknesses in the current site — rigidity (D1's asymmetric editorial grid), absence of a motif (D2's contour plate), and coldness (D3's palette and touch). The result reads as an engineering practice that measures things, which is the brand's actual proposition.

Concretely:

| Element | Source |
| --- | --- |
| 12-column asymmetric grid, rules instead of cards | D1 |
| Serif/grotesque/mono three-voice typography | D1 |
| Interactive contour field, coordinate annotations, tick rules | D2 |
| Warm paper, signal red, highland green, mustard punctuation | D3 |
| Small physical reactions on hover/focus, no scroll hijacking | D3 |

**Discarded from the hybrid:** D2's dark ground and mono-as-body-text (readability), D3's rotated cards (responsive cost), D1's purely typographic hero (no motif).
