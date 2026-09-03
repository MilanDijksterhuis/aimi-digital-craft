# Content Quality / E-E-A-T Audit — aimi-development.nl
Date: 2026-09-02
Method: Live fetches via `claude-seo run render_page.py` (mode=auto, trafilatura `extracted_text` + raw HTML) against the production site, cross-checked against the 2026-08-24 code-read audit (`SEO-AUDIT.md`). Pages fetched live for this pass: `/`, `/contact`, `/over-ons`, `/tarieven`, `/website-laten-maken-veendam`, `/website-laten-maken-groningen`, `/website-laten-maken-bloemist`. Source-level check (grep) on `LocationLanding.tsx` usage. Not every one of the 47 sitemap URLs was re-fetched live in this pass — findings below are scoped to what was actually re-verified; anything carried over from the Aug 24 audit is explicitly marked "confirmed still present" only where re-checked live here.

## Summary

AIMI's content is honest, jargon-free, and mostly non-templated — the branche and stad pages are genuinely unique per page, not doorway content. That's the good news. The bad news is that the site's weakest E-E-A-T pillar, **Trustworthiness**, has a concrete and previously-unflagged gap: the live `/contact` page carries no phone number, no physical address, and no KVK/BTW number — only an email address and a booking link. Combined with still-zero reviews/testimonials, no case studies (confirmed dead code, unchanged), and two very thin core pages (homepage 303 words, `/over-ons` 206 words), the site reads as credible-but-unverifiable: pleasant, plausible copy with almost nothing a skeptical visitor or an AI answer engine could independently check.

## Score: 52 / 100

| Factor | Weight | Score | Basis |
|---|---|---|---|
| Experience | 20% | 45 | No portfolio/cases (confirmed still dead: `Work.tsx` unused). But branche pages show real topical specificity (see "what works") that reads as earned domain knowledge, not generic AI filler. |
| Expertise | 25% | 50 | Named founders (Aidan & Milan), technically accurate and consistent pricing model, industry-specific detail on branche pages. No credentials, no years-in-business claim, no bylines. |
| Authoritativeness | 25% | 25 | Zero reviews, zero testimonials, zero external citations/press anywhere sampled. No AggregateRating schema (known, unchanged). |
| Trustworthiness | 30% | 40 | Transparent fixed pricing (strong) and clean privacy/terms pages exist, but **no phone, no address, no KVK/BTW anywhere sampled** — new finding, see CQ-1. |

Weighted E-E-A-T composite ≈ 40/100; overall content-quality score of 52/100 also credits genuinely unique, non-duplicate multi-page architecture, natural (non-stuffed) keyword usage, and clear heading hierarchy, which the Aug 24 audit already established and this pass re-confirmed on a second city-page sample.

## What works (verified live)

- **City pages are genuinely unique, not templated** — re-verified beyond the original Assen sample. `/website-laten-maken-veendam` (656 words) and `/website-laten-maken-groningen` (635 words) have distinct titles, meta descriptions, intros and body copy; no shared boilerplate paragraph detected in the extracted text. This directly re-confirms the Aug 24 finding on a fresh sample rather than just restating it.
- **`LocationLanding.tsx` duplicate-content risk is resolved.** The Aug 24 audit flagged this as unresolved and asked for a grep. Re-run here: `grep -r "LocationLanding" src` returns only `LocationPageV2.tsx` and `LocationLanding.tsx` itself, and the only hit in `LocationPageV2.tsx` is a code comment ("opvolger van LocationLanding.tsx"). No route file imports `LocationLanding`, so the old component that renders the full shared `<Services/>`+`<ProcessTimeline/>` block is dead code — it cannot reintroduce the doorway-page pattern on any live page.
- **Branche pages show real experiential specificity, not generic AI filler.** `/website-laten-maken-bloemist` (662 words) discusses concrete, industry-specific problems — bezorgcapaciteit rond Moederdag, a separate tone/page for rouwwerk, keeping a seasonal catalogue small enough to stay current — the kind of detail a generic AI content mill would not produce. This is a genuine positive E-E-A-T (Experience/Expertise) signal that partially offsets the absence of real case studies.
- **Pricing transparency and honest tone.** `/tarieven` (678 words) states fixed prices plainly (€499/€749/custom), with no hidden-fee language, consistent with the "vaste prijzen, geen uurtje-factuurtje" positioning repeated site-wide. This is a trust-building pattern that reads as authentic rather than sales-y.
- **Natural, non-stuffed keyword use.** No instance of keyword stuffing was found in any of the seven pages sampled; phrasing varies naturally ("website laten maken in Groningen", "webdesigner in Groningen", "AIMI bouwt snelle, maatwerk websites").

## Findings

### CQ-1 — Contact page has no phone, address, or KVK/BTW (new finding)
**Severity:** High
**URL:** https://aimi-development.nl/contact
**Description:** Live extraction of `/contact` yields only 72 words of body copy: a short pitch, a promise of a reply "binnen één werkdag," a booking-calendar CTA, and the email address `sales@aimi-development.nl`. There is no telephone number, no street address, and no KVK/BTW registration number anywhere on the page or in the homepage footer content that was checked. For a Dutch local-service business this is a meaningful, easily-checkable trust gap: Google's guidelines and typical local-business schema expect verifiable contact details, and visitors/AI systems assessing trustworthiness for a "who is behind this business" query have nothing to verify against beyond an email address and a Google Maps `sameAs` link buried in JSON-LD (per Aug 24 finding, not visible to a human reader). This was not called out as its own issue in the Aug 24 audit, which focused on schema/reviews rather than the visible contact-page content itself.
**Recommendation:** Add a visible phone number (even a mobile number is fine for a two-person shop), a KVK number, and BTW number to `/contact` and the site footer. If AIMI genuinely has no fixed office address, state the service area explicitly ("Wij werken vanuit Veendam, langs heel Noord-Nederland") rather than omitting location info entirely.

### CQ-2 — Homepage is thin relative to its role (303 words)
**Severity:** Medium
**URL:** https://aimi-development.nl/
**Description:** Extracted body text of the live homepage totals 303 words — well under the skill's 500-word homepage floor, and (contrary to what the Aug 24 code-read audit assumed) the homepage does not appear to render the FAQ component's content at all; no FAQ question text was present in the extracted text. This means the earlier recommendation to add FAQPage schema to the homepage would need to first confirm the FAQ block actually renders there — as observed live on 2026-09-02, it does not visibly appear in the crawlable/extracted content.
**Recommendation:** Either (a) add substantive homepage copy — a short "why AIMI" proof section, a compressed version of the process, or a handful of FAQ items rendered inline — to close the word-count gap and give crawlers/AI systems more to work with, or (b) if the intent is to keep the homepage a lean funnel page, confirm that's a deliberate trade-off, since 303 words is thin for a page competing on head terms.

### CQ-3 — `/over-ons` is too thin to carry the site's main Expertise/Trust signal
**Severity:** Medium
**URL:** https://aimi-development.nl/over-ons
**Description:** 206 words total. The page names both founders (Aidan & Milan) and states four operating principles (direct contact, fixed prices, everything in-house, fast delivery), which is a genuine, specific voice — better than boilerplate "we are passionate experts" copy. But there are no credentials, no years-active claim, no photos referenced in the extracted content, and no link to any external verification (LinkedIn, portfolio, certification). This is the one page whose entire job is to carry Expertise/Trust signal, and at 206 words it under-delivers on that job.
**Recommendation:** Expand with concrete, checkable specifics: how long AIMI/the founders have been building sites, technologies used, one or two verifiable facts (e.g., education/background), and a photo. Do not invent client counts or years of experience that can't be substantiated — per Aug 24's own guidance, fabricated proof is worse than no proof.

### CQ-4 — Branche-page pricing still generic, confirmed on a second branche live (bloemist)
**Severity:** Medium
**Status:** Confirmed still present (re-verified live, different page than the Aug 24 sample)
**URL:** https://aimi-development.nl/website-laten-maken-bloemist
**Description:** The Aug 24 audit flagged this pattern on the kapsalon page; this pass independently re-checked it live on the bloemist page and found the same gap. The pricing section reads: "Wil je alleen gevonden worden... dan zit je in de buurt van ons Starter- of Pro-pakket... Wil je daadwerkelijk online laten bestellen... dan is het een webshoptraject... We bekijken samen wat je nodig hebt en geven daarna een vaste prijs." No euro amount appears anywhere in the pricing paragraph, even though `/tarieven` itself states concrete numbers (€499/€749). This is a missed featured-snippet/AI-citation opportunity: a "wat kost een website voor een bloemenwinkel" query has no quotable number to extract from this page.
**Recommendation:** As already specified in the Aug 24 backlog (C-2): open the pricing paragraph with a concrete anchor figure consistent with `/tarieven` (e.g., "Een compacte site vanaf € 499 eenmalig (Starter)...") before the qualifying language about scope-dependent webshop pricing. Apply across all 15 branche pages, not just this one — this pass sampled only bloemist and found the issue unresolved, so it likely affects all of them.

### CQ-5 — No reviews, testimonials, or external validation anywhere sampled
**Severity:** Medium
**Status:** Confirmed still present (unchanged since Aug 24)
**URL:** https://aimi-development.nl/, https://aimi-development.nl/over-ons
**Description:** Neither the homepage nor `/over-ons` contains any review quote, testimonial, client logo, or third-party validation. This matches the Aug 24 finding and is re-confirmed live rather than merely restated — both pages were freshly fetched and re-read for this audit.
**Recommendation:** Unchanged from Aug 24: collect real Google reviews post-delivery; do not fabricate testimonials. Once real reviews exist, surface at least 2-3 as quoted text on the homepage (quotable, AI-citable) in addition to any schema.

### CQ-6 — No visible freshness signal; `publication_date` metadata is a uniform placeholder
**Severity:** Low
**URL:** all sampled pages (`/`, `/tarieven`, `/website-laten-maken-veendam`, `/website-laten-maken-groningen`, `/website-laten-maken-bloemist`, `/over-ons`, `/contact`)
**Description:** `render_page.py`'s extracted `publication_date` returned the identical value `2026-01-01` for every single page fetched in this pass, regardless of actual content or the sitemap's own `lastmod` values (which cluster between 2026-08-20 and 2026-08-22). No sampled page shows a human-visible "laatst bijgewerkt" date. For AI-citation readiness specifically, answer engines weighing recency have no reliable per-page freshness signal to key off beyond sitemap XML, which itself shows all 47 URLs updated within a 3-day window — consistent with a bulk deploy rather than genuine rolling content maintenance, and not something a reader or crawler can distinguish from a stale site that just redeployed.
**Recommendation:** Add a real `dateModified` to page schema (or at minimum a visible "bijgewerkt op" note) that reflects actual content edits, not deploy timestamps. Not urgent, but relevant to AI-citability and to demonstrating ongoing content maintenance rather than a one-time launch.

## Recommendations, prioritized

1. **High:** Add phone/KVK/BTW to `/contact` and footer (CQ-1) — cheapest, highest-trust-impact fix on the whole list.
2. **Medium:** Ship the already-specified branche-page pricing-anchor fix (CQ-4 / Aug 24's C-2) across all 15 branche pages — this pass shows it's still not done anywhere sampled.
3. **Medium:** Expand `/over-ons` and homepage body copy (CQ-2, CQ-3) with checkable specifics rather than adding word count for its own sake.
4. **Medium/ongoing (off-code):** Start collecting real reviews (CQ-5) — this remains the single highest-leverage authority fix and is entirely outside the codebase.
5. **Low:** Real `dateModified`/visible update dates (CQ-6).

Relevant file: `C:\Users\milan\Documents\AIMI\aimi-digital-craft\SEO-AUDIT.md` (2026-08-24 baseline audit referenced throughout).
