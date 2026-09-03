# Structured Data / Schema.org Audit — aimi-development.nl

Date: 2026-09-02
Method: code-read of `src/lib/seo.ts` + all route files, cross-checked against live rendering via `render_page.py` (raw fetch + forced Playwright render) for the homepage, `/website-laten-maken-kapsalon`, `/website-laten-maken-assen`, `/website-laten-maken-veendam`, `/faq`, `/branches`, `/webdesign`, `/tarieven`, `/contact`, `/website-laten-maken`. Live output matched code for every page except the homepage FAQPage case (see F-1).

## Score: 78 / 100

Justification: the `ORG_ID`/`serviceJsonLd`/`breadcrumbJsonLd` architecture in `src/lib/seo.ts` is unusually disciplined for a site this size — no duplicate `@id`s, no fabricated reviews, correct `Organization`→`LocalBusiness` parenting for the one real location (Veendam), and valid `OfferCatalog`/`Offer` pricing schema. Points lost for: deprecated `HowTo` schema live on 6 pages, a live homepage FAQPage schema that silently fails to render despite being in the code, and 45 city/branch pages with on-page FAQ content that emits no schema at all (low-severity now that FAQPage has no SERP benefit, but worth a decision either way).

## What works

- **Single canonical entity (`ORG_ID`)**: `src/lib/seo.ts:10`, applied in `__root.tsx` as `@type: ["Organization","ProfessionalService"]` with `@id: https://aimi-development.nl/#organization`. Confirmed live on every page sampled — no orphan or duplicate `@id`s found anywhere in the 10 pages checked.
- **`LocalBusiness` only where true**: only `/website-laten-maken-veendam` emits a `LocalBusiness` block (real address, geo, `parentOrganization: {"@id": ORG_ID}`). Every other city page correctly uses `Service` + `areaServed` instead of falsely claiming a branch office — this is exactly right and avoids a real NAP-consistency risk.
- **No fabricated Review/AggregateRating** — confirmed absent everywhere, correct given no real reviews exist yet.
- **`BreadcrumbList` is implemented site-wide**: 45 of 53 routes call `breadcrumbJsonLd()`; the only routes without it are legal pages, the homepage (no breadcrumb needed at root), auth-gated portal pages, `sitemap.xml`, `track.js` and `login` — all legitimate exclusions. This closes the gap flagged as untested in the 2026-08-24 audit.
- **T-1 from the prior audit is fixed**: `src/routes/index.tsx:50` now calls `faqJsonLd(faqItems)`, sourced from the same `faqItems` array that renders visibly in `<FAQ />` — content/schema parity is correct in the source. (See F-1 for a live-rendering caveat.)
- **T-2 from the prior audit is fixed**: `website-laten-maken-kapsalon.tsx:77-83` now uses `serviceJsonLd()` like every other branch page — the previously-flagged inline ad-hoc `Service` block is gone. Verified live: kapsalon page renders a clean `Service` type with no `areaServed` (correct, branch pages are region-independent).
- **`/tarieven` pricing schema is solid**: `OfferCatalog` with `@id`, `provider: {"@id": ORG_ID}`, and per-tier `Offer` objects with `price`, `priceCurrency`, `priceValidUntil`, `availability` — all required/recommended `Offer` properties present, valid types.
- **`/faq` has both `BreadcrumbList` and `FAQPage`**, live-confirmed, correctly deduped against the homepage's own FAQ content (same `faqItems` array).

## Findings

### F-1 — Homepage FAQPage schema is in the code but does not render live
- **Severity**: Medium (technical correctness issue; low practical impact since Google no longer gives FAQPage rich results — see F-3)
- **Type**: FAQPage — `src/routes/index.tsx`
- **Description**: `index.tsx` head returns `scripts: [faqJsonLd(faqItems)]` (line 50), and this is the only script the homepage route defines — `__root.tsx` supplies the `Organization`/`WebSite` blocks separately. Live raw-fetch **and** forced-Playwright-render of `https://aimi-development.nl/` both return exactly 2 JSON-LD blocks (`Organization`+`ProfessionalService`, `WebSite`) — no `FAQPage` block at all, even though the visible `<FAQ />` component with all 25 questions renders correctly in the DOM. Also noted in passing: the `Organization` block's `hasOfferCatalog.itemListElement[].priceValidUntil` reads `2027-08-23` live, i.e. it was computed roughly 10 days before this audit — because `PRICE_VALID_UNTIL` in `seo.ts:18` is a **module-level constant** evaluated once when the server process starts, not per-request as the code comment ("berekend bij het renderen") implies. It will keep drifting further from "one year from now" until the Node process restarts.
- **Recommendation**: Confirm whether the deployed build actually includes the `faqJsonLd` change (check build/deploy timestamp vs. the commit that added it) — this looks like either a stale deployment or a TanStack Router head-merging quirk where the route's `scripts` array is being dropped/overwritten. Since FAQPage no longer produces rich results in Google (see F-3), this is not urgent to fix for SERP reasons, but the code/live mismatch itself should be resolved so the codebase is trustworthy. Separately, move `PRICE_VALID_UNTIL` computation inside a function (or the route loader) so it's evaluated per request/build instead of once per server boot.

### F-2 — Deprecated HowTo schema live on 6 pages
- **Severity**: High
- **Type**: HowTo — `src/routes/onderhoud-hosting.tsx:94`, `src/routes/seo.tsx:155`, `src/routes/webshop-laten-maken.tsx:105`, `src/routes/website-laten-maken.tsx:106`, `src/routes/website-laten-vernieuwen.tsx:137`, `src/routes/werkwijze.tsx:73`
- **Description**: `howToJsonLd()` in `src/lib/seo.ts:89` emits `@type: "HowTo"` with `HowToStep` children. Google removed HowTo rich results from Search in September 2023. Live-confirmed on `/website-laten-maken`: the `HowTo`/`HowToStep` block renders exactly as coded. This schema now does nothing for any of the 6 pages that carry it — it's dead weight in the page payload with zero SERP upside, and keeping deprecated types around risks someone copying the pattern onto new pages.
- **Recommendation**: Remove `howToJsonLd()` calls from all 6 routes and retire the helper from `src/lib/seo.ts` (or leave the function but stop calling it). If the step-by-step content is worth preserving as schema, there is no direct 1:1 replacement recommended by Google for a generic process description — leave it as plain HTML content only (an `ItemList` is already used elsewhere on these pages for offerings and would be a reasonable, non-deprecated alternative if structured markup is still wanted).

### F-3 — FAQPage schema across the site provides no Google SERP benefit (Info)
- **Severity**: Info (per current Google policy: FAQ rich results were retired for all sites on 2026-05-07, no exceptions)
- **Type**: FAQPage — `src/routes/index.tsx`, `src/routes/faq.tsx`, `src/routes/tarieven.tsx`, `src/routes/seo.tsx`, `src/routes/website-laten-vernieuwen.tsx`, `src/routes/wordpress-of-maatwerk.tsx`
- **Description**: 6 pages emit valid `FAQPage` JSON-LD. The markup itself is technically correct (matches visible content, valid `Question`/`Answer` structure) but no longer yields a Google SERP feature. Any benefit to AI/GEO surfaces (e.g. AI Overviews, assistant citations) from this markup is unconfirmed.
- **Recommendation**: No action required to fix anything — this is not broken. Do not invest further effort adding FAQPage schema to more pages expecting a Google rich-result payoff. If Milan wants to keep it for the unconfirmed AI/GEO angle, that's a reasonable low-cost bet, but treat it as speculative, not a ranking lever.

### F-4 — 45 city and branch pages have on-page FAQ content with no corresponding schema (Info)
- **Severity**: Info
- **Type**: Missing FAQPage (intentionally not recommended as a fix) — all 30 `src/routes/website-laten-maken-{stad}.tsx` and 15 `src/routes/website-laten-maken-{branche}.tsx` files
- **Description**: Every city page (via `LocationPageV2.tsx`) and every branch page (via `BranchPage.tsx`, `FaqSection`) renders a 5-7 question FAQ block, but none of these 45 routes import or call `faqJsonLd()` — confirmed by static check across all route files. Given F-3, this is **not** a missed rich-result opportunity; it's flagged only for completeness/consistency, since the site is inconsistent (6 pages have FAQPage, 45 comparable pages don't).
- **Recommendation**: No action needed for Google SERP purposes. If schema consistency is desired for its own sake (or for the unconfirmed AI/GEO angle), add `faqJsonLd(data.faqs)` to each route's `scripts` array — the data already exists in `LocationPageData`/`BranchPageData`, so this is a mechanical change with no new content work. Not prioritized above F-2.

### F-5 — `Organization`/`ProfessionalService` root entity has no `telephone` and no `streetAddress` (Info)
- **Severity**: Info
- **Type**: Organization/ProfessionalService — `src/routes/__root.tsx` (root entity) and `src/routes/website-laten-maken-veendam.tsx` (LocalBusiness)
- **Description**: The root entity is typed as both `Organization` and `ProfessionalService` (a `LocalBusiness` subtype) but has no `telephone`. The Veendam `LocalBusiness` block has a `PostalAddress` with only `addressLocality`/`addressRegion`/`addressCountry` — no `streetAddress`. Neither is a required property for any Google-supported rich result (there's no dedicated "local business" rich result outside a few niche verticals), so nothing is invalid, but both are commonly recommended for local entity disambiguation and knowledge-panel completeness.
- **Recommendation**: If/when Milan is comfortable publishing a business phone number and street address publicly, add `telephone` to the `ORG_ID` block and `streetAddress` to the Veendam `LocalBusiness` block. Not urgent — purely additive, no validation errors today.

## Not found / explicitly correct to not have

- No `Review`/`AggregateRating` anywhere — correct, per prior audit guidance, since there are no real reviews yet. Do not add.
- No `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, or `LearningVideo` anywhere on the site.
- No duplicate/orphan `@id` values found across any of the 10 pages sampled live or the ~53 route files read.

## Generated JSON-LD for recommended fixes

No new JSON-LD needs to be generated — F-2's fix is a removal, and F-1/F-4/F-5 are either a redeploy/verification check or additive fields using the existing `serviceJsonLd`/`faqJsonLd`/`breadcrumbJsonLd` helpers already in `src/lib/seo.ts`. If F-4 is pursued despite it being optional, the addition per branch/city route is simply:

```ts
scripts: [
  serviceJsonLd({ /* existing */ }),
  breadcrumbJsonLd([ /* existing */ ]),
  faqJsonLd(data.faqs),
],
```
