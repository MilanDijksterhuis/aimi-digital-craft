# Content Quality & E-E-A-T — 2026-09-06 (live re-verification)

Method: live fetch of rendered pages via `render_page.py` (trafilatura `extracted_text`, structured-data extraction), not source-code reading. Sampled 14 of 48 pages: homepage, `/over-ons`, and 6 of 13 vertical pages (kapsalon, nagelstudio, hovenier, makelaar, autobedrijf, boekhouder) and 6 of 13 city pages (veendam, groningen, assen, hoogeveen, leeuwarden, drachten). **Coverage caveat: this run was cut short on explicit instruction to stop crawling and report — the remaining 7 vertical pages, 7 city pages, and the other 12 core pages (contact, tarieven, seo, webshop-laten-maken, werkwijze, wordpress-of-maatwerk, website-checker, etc.) were not fetched live in this pass.** Findings below are stated only for what was directly observed; anything not checked is flagged explicitly rather than assumed.

Content quality score (0-100): **58/100**
AI citation readiness: **66/100**

## E-E-A-T breakdown (internal weighting model, see skill notes)

| Factor | Weight | Score /100 | Basis |
|---|---|---|---|
| Experience | 20% | 30 | No first-hand delivered-work evidence (photos, screenshots, before/after) anywhere sampled. Per-industry FAQ/body copy shows real domain familiarity (no-show reduction for kapsalon, aanleg-vs-onderhoud split for hovenier) but nothing verifiably tied to an actual project. |
| Expertise | 25% | 45 | Technical accuracy is good where checked (Core Web Vitals/LCP/CLS/INP explained correctly, iDEAL/Bancontact, VPS hosting terminology used correctly). No author bios, no credentials, no years-of-experience claim, no certifications on any sampled page. |
| Authoritativeness | 25% | 22 | Only one external-recognition signal found in the whole sample: a mention on `/over-ons` of a listing in "de Webdesigngids" (a directory, not a case study, press mention, or award). No backlink/citation evidence checkable from content alone. |
| Trustworthiness | 30% | 52 | Strong on pricing/policy transparency (explicit € amounts, "geen lock-in", source-code ownership stated, cancellation terms, security stack listed: SSL, daily backups, 24/7 monitoring). Weak on legal identity — no KvK number, no BTW/VAT ID, no postal address seen on homepage or over-ons; no reviews, no ratings, no testimonials in the sample. |

Weighted E-E-A-T: **~38/100**. The overall content quality score (58/100) is higher than the raw E-E-A-T weighted average because word-count adequacy, keyword naturalness, and AI-citation structuring (FAQ schema, concrete numeric answers) are genuinely solid and partially offset the trust/authority gap for a general content-quality read — but for anything competitive or YMYL-adjacent (this is a paid-service business), the E-E-A-T number is the one that matters and it is weak.

## Verification of the prior static-code finding (SEO-AUDIT.md, 2026-08-24)

The prior audit claimed: *"No real portfolio/case-study evidence anywhere on the site... zero reviews, no visible social proof or client names, no quantified results."* Live check confirms **this is still true**, with one partial exception:

- Homepage (`/`): no testimonials, no client names, no case studies, no numbers of clients/projects delivered. Only a generic FAQ (25 Q&As, correctly emitting `FAQPage` JSON-LD) and the three pricing tiers.
- `/over-ons`: names the two founders ("Aidan & Milan") and states operating principles (direct contact, fixed pricing, in-house hosting) — this is a genuine, if small, Experience/authenticity signal that the old audit's "dead code only" framing didn't capture (this is live rendered text, not the unrendered `Work.tsx` component it flagged). But the page is **223 words**, has no photos referenced in the text, no case studies, no client names, no quantified results ("X websites delivered", "X years"), and the only external-recognition mention is the Webdesigngids directory listing.
- Vertical and city pages sampled: zero testimonials, zero client references, zero numbers-based social proof on any of the 12 pages checked.

**Conclusion: confirmed live. This remains the single biggest E-E-A-T gap on the site.** Not a stale finding.

## Verification of the "cost for X" / "how long for X" long-tail gap

The prior audit (§2.8, backlog C-2/C-3) flagged that branch pages used generic pricing language with no concrete figure, and no branch-specific "how long does it take" answer. **This has been fixed since the 2026-08-24 audit** — confirmed live on all 6 vertical pages sampled:

- Every sampled vertical page has a "Wat kost een website voor een [branche]" section with explicit tiered pricing ("begint bij € 499 eenmalig (Starter)... Pro-traject vanaf € 749"), and the JSON-LD FAQ on `website-laten-maken-kapsalon` includes both `Wat kost een website voor een kapsalon laten maken?` and `Hoe lang duurt het bouwen van een website voor mijn kapsalon?` as distinct, industry-specific Q&As.
- This is good evidence the backlog item was actioned. Recommend spot-checking the remaining 7 vertical pages not sampled in this pass to confirm consistency.

## Programmatic page uniqueness / duplicate-content risk (vertical + city pages)

Sampled 6 verticals + 6 cities side by side (full text diff, e.g. kapsalon vs. hovenier).

- **Genuinely unique prose per page, not a find-and-replace template.** Kapsalon copy talks about no-shows, prijslijst per behandeling, stylisten-portfolio; hovenier copy talks about voor/na-fotogalerij, aanleg-vs-onderhoud split, seizoensgebonden vraag, offerteformulier-lengte. These are substantively different arguments, not the same paragraph with a noun swapped. **Duplicate-content risk: low.**
- **Structural template is identical across all sampled pages**: `Wat een website voor X moet kunnen` → 5-step `Zo pakken we het aan` process → `Veelvoorkomende knelpunten/fouten` → `Wat kost een website voor X` → `Veelgestelde vragen` → `Ook interessant` → CTA. This is a legitimate shared spine (Google's guidance treats a shared skeleton with unique substance as fine, not a doorway pattern) but it does mean 13 vertical pages will read as formulaic to a human comparing two of them side by side, and to any AI system evaluating "is this the same page 13 times with words changed." Recommend varying at least the section order or adding one page-type-specific section (e.g., a photography/image-heavy section only on visually-driven verticals like hovenier/kapsalon/bloemist, vs. a compliance/document section for boekhouder) to break the pattern further.
- City pages follow the equivalent pattern (intro, local context, business types served, workflow, FAQ) with locale-specific detail (confirmed unique across the 6 sampled) — consistent with the prior audit's assessment that the ~830-word shared block issue was already resolved.

## Word count vs. minimums

| Page type | Sampled pages | Word count range (extracted_text, live) | Minimum | Status |
|---|---|---|---|---|
| Homepage | `/` | 1,157 words | 500 | Meets |
| About/company | `/over-ons` | 223 words | n/a (not a standard type) | Thin for its role — see CQ-5 |
| Vertical/service pages | 6 sampled | 646–760 words | 800 (service-page floor) | **Below floor on all 6 sampled** |
| City/location pages | 6 sampled | 562–656 words | 500–600 | Meets/at top of range |

**Note on discrepancy:** an earlier version of this findings file (dated 2026-09-04, now superseded by this rewrite) reported branch-page and city-page averages of 1,177 and 1,051 words respectively — roughly double what was measured live here. This pass measured word counts from `trafilatura`-extracted main content on the actual rendered URLs (`extracted_text`), which strips nav/footer/CTA chrome by design. The gap is large enough that it should be reconciled rather than assumed to be a methodology artifact — either the earlier count included boilerplate (nav, footer, related-links, cookie banner) that inflated the total, or the page content has since been shortened. **Action: re-run a word count on 2-3 of the same URLs from both methodologies to identify the cause before treating either number as final.**

Per Google's own guidance (word count is not a ranking factor, comprehensiveness is what matters), the 646-760 word branch pages are not automatically a problem — but combined with the identical template structure and lack of unique visual/case evidence per page, several sections (especially "Veelvoorkomende knelpunten") are fairly generic advice that could be expanded with one concrete, branche-specific example each to add real depth rather than just length.

## Readability (Dutch)

Qualitative assessment only in this pass (no formula run). Sentences on vertical pages run long and compound (e.g., the kapsalon "Wat kost" paragraph is a single ~90-word sentence chain), which is heavier than ideal for a small-business owner audience skimming on mobile. The homepage FAQ introduces technical jargon without explanation for a general audience ("Core Web Vitals (LCP, CLS en INP)" is defined inline, which is good, but sits alongside consumer-facing content with no other jargon — an inconsistent register). Not a major issue, but shorter sentences and one plain-language pass on the FAQ would help.

## AI citation readiness — 66/100

Positives:
- `FAQPage` JSON-LD confirmed present and valid on the homepage (25 Q&As) and on the kapsalon vertical page (7 Q&As including industry-specific price and duration answers) — both extracted cleanly via structured-data parsing.
- Concrete, quotable numeric facts are common: "€499 eenmalig (Starter)", "€749 Pro-traject", "hosting vanaf €30 per maand", "binnen 2 tot 4 weken live", "opzegtermijn van één maand". This is exactly the kind of self-contained, extractable fact AI answer engines prefer.
- Clear heading hierarchy on all sampled pages (H1 → thematic H2s → FAQ).
- `Organization`/`ProfessionalService` schema present sitewide including `Person` entities (founders) — good for entity grounding.

Negatives:
- No `Review`/`AggregateRating` schema (correctly, since there are no real reviews to back it — do not add this until reviews exist).
- No `Article`/`author` schema tying any of the industry advice to a named, credentialed person — AI systems weighting E-E-A-T for citation will not find an attributable expert behind the advice.
- No outbound citations to third-party sources anywhere sampled (not checked exhaustively, but none appeared in 14 pages) — self-contained content without external grounding is less likely to be treated as an authoritative citation source itself.

## Findings

### CQ-1 — No case studies, portfolio, testimonials, or quantified results anywhere sampled (High) — confirmed live, unresolved
Checked homepage, over-ons, and 12 programmatic pages. Zero client names, zero before/after examples, zero "X websites delivered" or similar numbers, zero review/rating content. `/over-ons` names the two founders and states principles but offers no evidence of past work. This is the largest E-E-A-T gap on the site and the direct cause of the low Authoritativeness (22/100) and Experience (30/100) sub-scores above.
**Recommendation:** add at minimum 2-3 real case examples (client name with permission, what was built, one concrete outcome number) before investing further in programmatic page volume — this is a prerequisite for the Experience/Authoritativeness scores to move at all, and no amount of additional templated vertical/city pages will substitute for it.

### CQ-2 — No KvK/BTW/postal address visible on sampled pages (High) — not re-verified on `/contact` this pass, flagged as carried over
Not directly re-checked live on `/contact` in this pass (out of the 14 pages sampled). The 2026-09-04 findings file reported 0 hits for KvK/BTW across all 48 pages. Given this wasn't re-verified live here, treat as **unconfirmed-but-likely-still-true** and prioritize a direct check of `/contact` and the footer on next pass.
**Recommendation:** if still absent, add KvK number, BTW/VAT ID, and a postal/visiting address to the footer or `/contact` — legally relevant for a Dutch business and one of the cheapest trust signals to add.

### CQ-3 — Vertical/service pages run below the 800-word service-page floor (Medium)
All 6 sampled vertical pages (kapsalon, nagelstudio, hovenier, makelaar, autobedrijf, boekhouder) measured 646-760 words of main content, live. Word count itself is not a ranking factor, but combined with CQ-1 (no unique visual/case evidence) and the identical template skeleton across pages, the topical coverage per page is on the thin side for pages meant to compete on 13 separate industry keyword sets.
**Recommendation:** expand the "Veelvoorkomende knelpunten" section on each vertical page with one concrete, industry-specific example or scenario rather than generic advice, and verify the remaining 7 unsampled vertical pages match this range rather than dropping lower.

### CQ-4 — Templated structure repeats identically across all sampled vertical/city pages (Low-Medium)
Confirmed via direct text comparison of kapsalon vs. hovenier: identical section order and headings, genuinely different substance within each section. Not a duplicate-content violation, but a formulaic pattern that both human visitors comparing pages and AI crawlers assessing page-set quality may notice across 13 near-identical skeletons.
**Recommendation:** vary section order or add one vertical-specific section type (e.g., an image/gallery-relevant section for visually-driven trades vs. a compliance/document-handling section for boekhouder) to break the pattern.

### CQ-5 — `/over-ons` is thin for its trust-building role (Medium)
223 words live. Names founders and states four principles but has no case evidence, no team photos referenced in text, no years-in-business claim, no numbers. For the page whose job is specifically to build Experience/Trust signals, this is under-built relative to that job.
**Recommendation:** expand with founder background (relevant prior experience, why they started AIMI), and once available, the case-study evidence from CQ-1.

### CQ-6 — Word-count methodology discrepancy vs. prior findings file (Low, process flag)
The previous version of this file (2026-09-04) reported branch/city page averages roughly double what this live pass measured on the same page types (though not verified on the exact same URLs). Flagging rather than resolving, since resolving requires re-running both methodologies against identical URLs, which was out of scope for this pass per the stop instruction.
**Recommendation:** next audit pass should reconcile this before reporting a trend (improvement or regression) in word count over time.

### CQ-7 — Positive: pricing/duration long-tail content gap from the prior audit appears fixed (Informational)
Confirmed live on 6/13 vertical pages: branch-specific price ranges and "hoe lang duurt" FAQ answers are present and correctly structured as distinct FAQPage Q&As. Recommend spot-checking the remaining 7 vertical pages for consistency, but no action needed on the pages sampled.

## Not verified in this pass (explicitly incomplete)

- 7 of 13 vertical pages and 7 of 13 city pages were not fetched live (nagelstudio... only a partial list was sampled — see method note at top for exact list).
- `/contact`, `/tarieven`, `/seo`, `/webshop-laten-maken`, `/werkwijze`, `/wordpress-of-maatwerk`, `/website-checker`, `/faq`, `/meer-diensten`, `/webdesign`, `/onderhoud-hosting`, `/website-laten-vernieuwen` — none of the other 12 core pages were fetched live this pass.
- No formal Dutch readability formula (e.g., Flesch-Douma) was computed — assessment above is qualitative only.
- KvK/BTW/postal-address absence was not re-verified live in this pass (carried over from the prior findings file, itself dated only two days earlier).
- Backlink/external-citation profile was not assessed (out of scope for this skill; see `seo-backlinks` sub-skill / `backlinks.md`).
