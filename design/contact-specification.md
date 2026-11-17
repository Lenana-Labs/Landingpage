# LenanaLabs Contact prototype specification

Status: design prototype only. Production Next.js files and shared styles/scripts are unchanged.

## Direction and review

Concept: An Open Conversation. On this page, LenanaLabs' Structured Creativity becomes a disciplined editorial frame around an unrestricted first message. The form is the live interaction.

The supplied wireframe governs composition. The taste-skill draw offered uneven-photographs, contact-sheet and name-as-monument; each conflicts with the prescribed compact form composition. None was adopted. Explicit brief requirements override the skill's imagery, motion, palette, monospace and rule restrictions. No stock imagery, footage, extra sections or scroll scenes were introduced.

Reference inventory: LenanaLabs name and mountain mark; Nairobi location; Kenya; EAT; engineering studio; Structured Creativity; cream ground; burnt-orange actions; Bricolage display; Instrument body; IBM Plex technical labels. Landing (`../../final.html`), About and Projects retain the same shared visual vocabulary.

Claims and copy deck:
- Navigation: visitors can reach the studio's other pages through the shared links.
- Hero/form: "04 / Contact", "LET'S TALK.", "Have something in mind?", "Tell us about the problem, idea, or project you're working on.", "No elaborate brief required."
- Form: "Your name", "Email address", "What's on your mind?", "Send message". Three answers are sufficient to begin a conversation.
- Direct contact: "Prefer email?", "[Verified email address]", "Content dependency: approved email needed.", "Based in / Kenya".
- Footer: shared studio identity and navigation.

## Layout

Four regions only: shared navigation, combined introduction/form, compact direct-contact strip, shared footer. Left aligned throughout. Desktop uses a 12-column grid: introduction columns 1-5, form columns 6-12. Grid gap is 18-40px plus 18-56px internal form offset, giving approximately 64-96px of separation at desktop. A thin vertical rule marks the division; no floating card.

Contact shell is at most 1472px including padding (approximately 1310px usable at 1440). Side padding clamps between 22px and 106px at 5.5vw. Shared header/footer retain their existing shell. Main top padding is 36-80px; bottom padding 44-80px. The form begins beside the section label within the first desktop screen.

Below 1024px both columns span the grid. A horizontal rule replaces the vertical division. Mobile uses 22px side padding, 32px between intro and form, full-width fields and submit. At 1024px the two-column layout remains. At 1920px the shell is constrained and centered.

## Tokens and type

Reuse lab.css without modification: paper #F3EEE3, ink #17150F, secondary ink #4E4839, signal #C13A17, pine #14453A, chalk #FBF8F1, line rgba(23,21,15,.16), strong line rgba(23,21,15,.42).

Bricolage Grotesque 600: headline 80-112px desktop, 52-64px mobile, .9 leading, -.055em tracking. Headline deliberately has two lines; only its full stop is orange. Supporting heading is 24-34px. Instrument Sans: body 17-19px, input text 17px desktop/16px mobile. IBM Plex Mono: uppercase field labels and section marker 13px. Shared footer and navigation retain their existing typography.

## Form and states

Exactly three primary fields, all required:
1. Name: text, autocomplete name; reject whitespace-only value.
2. Email: email, autocomplete email, email keyboard; require a nonempty address matching the prototype's email expression.
3. Message: textarea, six rows; reject whitespace-only value.

Inputs have square corners, light chalk-tinted ground, 56px minimum height and 15px/16px padding. Textarea minimum height 168px. Labels sit 10px above controls. Fields have 22-28px bottom spacing. Submit is 56px tall, orange, full width, with cream text and a right-aligned arrow. Hover darkens the button and moves the arrow 3px diagonally. Reduced motion follows the shared stylesheet.

Default: fields empty, visible labels and examples. Focus: 2px orange outline with offset. Invalid: explicit field-specific text linked through aria-describedby, aria-invalid, border and label treatment; first invalid field receives focus. Corrected malformed emails retain their error until valid.

Submitting: local 1100ms timer only. Status explicitly describes a demonstration. Disable submit and the failure control; a submitting guard rejects duplicate submit events. Preserve entered values.

Error: "Demonstration error." No message was sent. Preserve fields and focus the banner. Use "Simulate a failed send" before submitting to exercise this state. Retry succeeds locally.

Success: replace the form with "Demo complete." and explicit text that no message was delivered. Focus the confirmation and offer Back to home. Never show "Message received" as a delivery claim.

No JavaScript: submit remains disabled from initial markup; fields and labels remain readable, with an explanation and navigation fallback. No endpoint, fetch, storage or external form service is used. Google Fonts is the existing font dependency.

## Contact content dependency

The address in src/config/site.ts is expressly provisional, not approved. It has been removed from this Contact prototype, including footer/error/no-script copies. The obvious [Verified email address] placeholder is deliberately not a clickable fictional mailto. Before integration, obtain an approved address and render it as a visible, keyboard-accessible mailto link in the direct-contact strip and shared contact slot. This dependency prevents claiming the page is ready to publish.

## Accessibility and implementation

Semantic main, sections, form, labels, input and textarea. Required attributes expose necessity; novalidate allows the local, field-associated errors. Polite status announcements describe validation/loading; focus moves to error or confirmation. Hidden form is removed from the tab order. Shared menu retains Escape/return focus and gains local dialog semantics and Tab containment. Minimum primary touch target 44px; failure-demo button is also 44px high. Native textarea resize remains available. No state relies on color alone.

Keep CSS scoped to Contact when translating into React. Use one form submit handler and one input handler. Replace the timer only during an independently authorized production integration; this prototype must never send externally. No backend or production files were changed.

## Design review

The starting contact.html already had three fields. This pass improves its hierarchy and corrects actual defects rather than claiming fields were removed in this pass. Removed the unconfirmed address, ambiguous delivery wording and broken local landing links. Kept the shared navigation/footer structure and all actual brand tokens. No new decorative sections were added.

The desktop form is immediately visible beside the intro; mobile follows headline, supporting copy, fields, direct contact, footer. The compact open-ended message accommodates questions and collaboration without a service/category decision.

Quality evidence and responsive previews are recorded in .taste-skill/contact-results.json and .taste-skill/contact-after/report.json when available. See the final delivery for checks actually completed; do not treat this specification as proof of a passing browser run.

## Verification and critique

Automated browser checks passed at 320, 375, 768, 1024, 1440 and 1920px: no horizontal overflow, exactly three labeled required controls, stacked layout below 1024px, two columns at and above 1024px, form above the desktop fold, and no unapproved mailto links. Empty/malformed validation, focus on first invalid field, duplicate-submit guard, loading, simulated failure, retained values, retry and focused demo confirmation passed. The checks open the actual standalone file URL.

The inspector initially found a footer placeholder contrast defect; its text now inherits the footer's accessible color. It reports zero failures with explicit allowances for the brief's section marker, numbering, monospace, tracked uppercase labels, hairlines, cream/orange palette, no pictures and restrained motion. Warnings about three faces, multiple sizes, no footage, small shared footer text and the requested Let's Talk title are retained to preserve the brief and shared chrome. This is automated and visual review, not a full manual WCAG certification.

Subjective critique (brief-specific): design 8/10, usability 9/10, creativity 7/10, content 7/10. The form supplies the primary action immediately on desktop; mobile keeps a clear reading order and full-width controls. Remaining limitation: an approved email is absent. No invented proof, found media, new dependencies or production changes. Under the taste skill's generic imagery rubric, design is capped at 6.5 because this intentionally image-free contact page follows the user's explicit brief instead.

Before/after: three fields remain three; headline changes from mixed-case inline text to a two-line uppercase composition; 1024px changes from stacked to two columns; provisional email becomes an explicit dependency; ambiguous Message received confirmation becomes Demo complete. The before inspector timed out, so no successful automated before measurements are claimed.

Source lint flags 10 instances of monospace, hairlines and the section marker, plus two outlined-control warnings. These are deliberate requirements of the supplied brief, not an unqualified lint pass. No source suppressions were added.
