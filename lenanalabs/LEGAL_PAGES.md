# Legal pages: design and content handoff

## Direction

Existing brand: paper #F3EEE3, ink #17150F, signal #C13A17, pine #14453A, deep #E8E0CF. Bricolage Grotesque headings; Instrument Sans reading text; existing IBM Plex Mono in shared navigation/footer. No dependencies added.

Draw: Quiet instrument, seed 615210926, saved at ../.taste-skill/legal-direction/. Its quiet reading-column principle is adopted. The dealt dark two-door hero, photographic contact treatment and four-column intro cannot hold long legal copy and conflict with the requested existing brand and subject. They are replaced by a typographic title, a clear draft notice and a reading column. No stock photographs or scroll scenes: neither helps someone understand a privacy notice. Shared chrome retains its existing rules and technical labels.

Idea: LenanaLabs' Structured Creativity becomes a precise document with a navigable margin and plain-language commitments. The useful interaction is a native linked contents index, fully usable without JavaScript; email links let visitors raise questions and privacy requests.

Subject inventory: Nairobi studio; Kenya; engineering services; three work categories; early-stage company; actual Gmail address; email-draft inquiry flow; no account or checkout; no analytics/storage code in src; existing cream and orange identity. Confirm provider infrastructure separately rather than inferring it from application code.

## Argument and layout

- Title: identifies the document immediately.
- Introduction and preparation date: says what it covers without pretending the draft is adopted.
- Draft notice: makes its provisional status explicit.
- Contents rail: readers can jump to the concern that brought them here.
- Detailed sections: answer privacy/website-use questions in full, with no invented corporate facts.
- Contact close: provides an actual route to ask a question.
- Shared footer: both legal documents available throughout the website.

Desktop: existing shell, 1:2 contents/article grid with 40-88px gap, article at most 72ch. Contents sticks below the shared header. Body 17px at 1.75 line-height; section titles 23-30px; hero 45-92px. Below 900px, the rail becomes a two-column contents index above the article. Phone body 16px, compact section spacing, title 37-53px. Print stylesheet removes site chrome and the navigation rail for a straightforward document.

## Routes and content

/privacy-policy and /terms-and-conditions each use the shared LegalPage component and eleven explicit sections. Policy text lives in each route's page.tsx for straightforward editing. Shared footer links are server-rendered; headings, contents anchors and related-document links are real HTML. No document text depends on client JavaScript.

These are detailed placeholders, not adopted legal instruments. They have no effective-date claim. Both carry noindex, follow and remain outside the sitemap until approval. They do not impose a made-up liability limit, arbitration clause, payment schedule or automatic IP transfer. Signed project agreements are separate.

The privacy draft reflects the current mailto-based form and approved address. Hosting logs and infrastructure providers are expressly unverified. Do not change the no-analytics statement without checking deployed integrations as well as src.

## Before replacing the drafts

Confirm the legal entity and address; responsible privacy contact; hosting and email providers; logging/cookies; processing purposes and lawful bases; access controls; actual retention schedule and backup treatment; international transfers and safeguards; rights-request process; contracting rules; governing law/dispute venue; and effective dates. Review against real operations and obtain appropriate legal review before presenting either document as final. Replace the prominent draft notice, revise the preparation date, remove noindex and add approved routes to sitemap only after adoption.

Privacy-rights wording was checked against primary Kenyan sources:
- https://www.odpc.go.ke/rights-of-a-data-subject/index.html
- https://new.kenyalaw.org/akn/ke/act/2019/24/eng%402019-11-15/source

The page links to ODPC for visitors; it does not assert certification or registration. Neither an actual email nor a rights request was sent during testing.

## Verification

Lint, TypeScript, all 17 existing tests and the production build pass. The source design linter reports 0 failures and 0 warnings for the new legal components/routes. The production build retains the pre-existing metadataBase warning because NEXT_PUBLIC_SITE_URL is not configured.

`TEST_URL=http://localhost:3114 node scripts/legal-browser.mjs` checks both documents at 320, 375, 768, 1024, 1440 and 1920px, required draft/noindex metadata, eleven working section anchors, email and cross-document links, shared footer destinations on Home/About/Projects/Contact, no horizontal overflow, browser errors and static content without JavaScript. Reduced-motion rendering is included. No messages are sent.

An initial visual pass found overly long desktop lines; paragraphs and notice text were capped at 60ch. Final screenshots and browser reports are in .taste-skill/legal-privacy-inspect/ and .taste-skill/legal-terms-inspect/. The design inspector uses brand/content allowances only for the shared monospace and rules, cream palette, and the deliberate absence of imagery/motion in legal reading pages. Three faces and the inherited type scale are retained for consistency; no footage is appropriate for this content.

## Final visual critique

ROUND 2
Seen in one second: clearly titled legal documents in the existing LenanaLabs identity, explicitly marked as drafts.
Idea (one sentence): the studio's Structured Creativity becomes an indexed document with a calm reading column.
Live thing: native contents links and related-document/email links, available without JavaScript.
Layout words by section: hero=title and context / notice=flat tone field / body=margin index and article / contact=green close / footer=shared studio frame.
Scores: design 6.5 · usability 8.5 · creativity 6 · content 5 → overall 6.6 under the generic taste rubric; brief-specific readability is stronger than that marketing-page rubric reflects.
Caps applied: image-free documents cap generic design at 6.5; intentionally provisional content caps content at 5. No pictures or footage were added to inflate a legal-document score.
Top three problems (most visible first), each with screenshot and fix:
1. Round 1 desktop paragraphs ran too wide (desktop-fold.jpg, both documents): capped reading paragraphs and notice text at 60ch in round 2.
2. Phone draft notice and contents occupy much of the opening scroll (mobile-fold.jpg): retained because draft status must be prominent and eleven direct links make the complete document navigable; nothing is collapsed or hidden.
3. Unverified entity/provider/retention details remain throughout the draft (desktop-page-01.jpg and mobile-page-01.jpg): called out plainly, with a replacement checklist above rather than fabricated facts.

Final production inspectors: 0 FAIL and 4 WARN each at 1440/768/390, with documented allowances. Opened every final fold and contact-sheet screenshot for both documents. Font-count/type-scale warnings retain shared brand typography; no-footage is deliberate for reading pages. The off-centre warning measures a text edge after the 60ch cap; the actual shared shell still has equal outer padding and the title/notice/footer span that frame. No hidden content, overlapping headings or overflow was visible.

No found images, clips, generated artwork or placeholder portraits are used. All substantive text is the provisional copy to review and replace; the contact mailbox is approved. This work did not modify unrelated project or contact changes already in the worktree.
