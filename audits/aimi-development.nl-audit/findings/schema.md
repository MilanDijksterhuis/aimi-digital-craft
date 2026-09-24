# Schema & Structured Data — Audit, 2026-09-15

Method: source-level validation via `graphify query` (to locate the JSON-LD call sites) followed by direct reads of `src/lib/seo.ts` (the shared JSON-LD helper module), `src/routes/__root.tsx` (site-wide `Organization`/`WebSite` entities), and the route/component files behind the 8 requested pages: `/` (`src/routes/index.tsx`), `/website-laten-maken` (+ `ServicePage.tsx`), `/tarieven`, `/faq` (+ `FAQ.tsx`), `/website-laten-maken-kapsalon` (+ `BranchPage.tsx`), `/website-laten-maken-groningen` (+ `LocationPageV2.tsx`), `/contact`, `/over-ons`. All routes render this JSON-LD server-side (TanStack Start SSR, not client-injected), so source == what ships in the HTML.

Also spot-checked `src/routes/website-laten-maken-veendam.tsx` to verify the one `LocalBusiness` entity on the site for entity-graph consistency.

**Score: 87/100**

Delta vs. the 2026-09-06 live audit: broadly consistent — same core gap (no street address on the primary entity) persists. Two items from that audit are now resolved/clarified at the source level:
- `businessIdentityJsonLd()` **is** confirmed spread into the `/#organization` block in `__root.tsx` (line 185) — the wiring the prior audit flagged as unverified is correct. It currently contributes nothing only because `ADDRESS.streetAddress`/`postalCode` are still empty.
- One **new** finding not previously flagged: the FAQ dataset used for `/` and `/faq` is confirmed to be the exact same shared array (`faqItems` in `src/components/FAQ.tsx`), so the byte-identical duplication SCH-4 described is not incidental — it's structural (both pages import the same constant).

## What works well

- **Single, consistent org entity.** `Organization`/`ProfessionalService` type-array with `@id: https://aimi-development.nl/#organization` is defined once in `src/routes/__root.tsx` and injected sitewide via the root route's `head()` — every page gets the byte-identical block. No risk of Google splitting this into multiple entities.
- **`WebSite` + `Organization` correctly linked** via `publisher: { "@id": ORG_ID }`, both defined once at the root.
- **Clean helper architecture.** `src/lib/seo.ts` centralizes `serviceJsonLd()`, `breadcrumbJsonLd()`, `faqJsonLd()`, `webPageJsonLd()`, `contactPageJsonLd()`, `cityAreaServed()` — all route files compose from these rather than hand-rolling JSON-LD, which keeps `@context`/`@type` correct by construction and makes sitewide fixes a one-file change.
- **`priceValidUntil` never silently expires.** `PRICE_VALID_UNTIL` is computed as `Date.now() + 365 days` at render time, not a hardcoded date — avoids the common Merchant/Rich-Results-Test staleness warning.
- **`/tarieven` Offer/priceSpecification is already correctly implemented** — no gap to recommend here. `OfferCatalog` with per-tier `Offer`s (price, priceCurrency, priceValidUntil, availability) plus a `UnitPriceSpecification` (`billingIncrement: 1`, `unitCode: "MON"`) on the €30/month hosting offer. This is exactly the pattern the task asked me to check was missing — it isn't.
- **`Service` schema on both requested service pages is correct and intentionally differentiated.** `/website-laten-maken-kapsalon` passes `areaServed: null` (branch pages aren't region-bound — correct, documented decision in `serviceJsonLd()`'s JSDoc); `/website-laten-maken-groningen` passes `areaServed: cityAreaServed("Groningen", "Groningen")` (city + province, correct for a location page). Both `provider: { "@id": ORG_ID }` correctly, no duplicate org entities.
- **`BreadcrumbList` present and correct** on all 6 inner pages checked (`/website-laten-maken`, `/tarieven`, `/faq`, `/website-laten-maken-kapsalon`, `/website-laten-maken-groningen`, `/contact`, `/over-ons`), correctly absent on `/` (root has no meaningful breadcrumb). Trail arrays match the visible `<Breadcrumbs>` component markup in every case checked.
- **`ContactPage` + `ContactPoint` on `/contact`** correctly reuses `ORG_ID` for `mainEntity` (JSON-LD merges same-`@id` nodes — this attaches the `ContactPoint` to the existing org entity instead of minting a second one). Good `@id` hygiene.
- **FAQPage content matches visible content everywhere checked** — no schema/visible-content mismatch on `/`, `/faq`, `/tarieven`, `/website-laten-maken-kapsalon`, `/website-laten-maken-groningen`. Branch/location FAQs are genuinely unique per page (not copy-pasted), so no thin/duplicate FAQ content risk beyond the `/` vs `/faq` case below.
- **No fabricated `AggregateRating`/`Review`** anywhere in the codebase — correctly withheld in the absence of real collected reviews. This is the right call, not a gap.
- **No deprecated types found** anywhere in `seo.ts` or the sampled routes — no `HowTo`, `SpecialAnnouncement`, `CourseInfo`, etc.

## Findings

### SCH-1 — Primary `Organization`/`ProfessionalService` entity has no address, geo, or opening hours (High)

`ADDRESS.streetAddress` and `ADDRESS.postalCode` in `src/lib/seo.ts` are both still empty strings:

```ts
export const ADDRESS = {
  streetAddress: "", // bv. "Kerkstraat 1"
  postalCode: "", // bv. "9641 AA"
  addressLocality: "Veendam",
  addressRegion: "Groningen",
  addressCountry: "NL",
};
```

`postalAddress()` only returns a `PostalAddress` object when both are filled, so `businessIdentityJsonLd()` — correctly spread into the `/#organization` block in `__root.tsx` — currently contributes nothing. The result: the site's one canonical business entity (present identically on every one of the 8 pages checked) declares `telephone`, `email`, `priceRange`, `sameAs`, `knowsAbout`, `areaServed`, `hasOfferCatalog` — but no `address`, no `geo`, no `openingHoursSpecification`. `ProfessionalService` is a `LocalBusiness` subtype and Google's guidance expects an address on that type when one exists.

Also missing sitewide: `openingHoursSpecification`. No file in the codebase defines it (confirmed via search) — this isn't a wiring gap, it's simply not implemented anywhere yet.

Note: `/website-laten-maken-veendam` (not one of the 8 requested pages, spot-checked for entity-graph consistency) *does* carry a full `LocalBusiness` with real `PostalAddress` (city-level: Veendam/Groningen/NL, no street) and `GeoCoordinates` (53.1042, 6.8778), correctly linked back via `parentOrganization: { "@id": ORG_ID }`. That's the right pattern — one dedicated local-business page carries the geo claim instead of stamping it on every page — but it means 47 of 48 pages, including the 8 checked here, have zero geo/address signal on their primary entity.

**Recommendation:** Fill `streetAddress`/`postalCode` in `ADDRESS` once available (this alone activates `businessIdentityJsonLd()` on the org entity with no further code changes needed). Add an `openingHoursSpecification` array to the `/#organization` block in `__root.tsx` once hours are confirmed and stable — this is a straightforward, low-risk addition since it doesn't depend on a physical address being public.

### SCH-2 — `FAQPage` on `/` and `/faq` is the exact same dataset, not incidentally similar (Info)

`src/routes/index.tsx` calls `faqJsonLd(faqItems)`; `src/routes/faq.tsx` calls `faqJsonLd(faqItems)` — same imported constant from `src/components/FAQ.tsx`, currently 25+ Q&A pairs. This produces byte-identical `FAQPage` JSON-LD at two different URLs, with no `mainEntityOfPage` to indicate which is canonical.

Per current policy this is **Info severity only** — Google retired FAQ rich results for all sites, so there's no SERP feature at stake, and any AI/GEO citation benefit from `FAQPage` markup specifically is unconfirmed. The redundancy is a content-architecture question more than a schema-correctness one.

**Recommendation (optional, not urgent):** If trimming, `/faq` is the more defensible home for the full set; the homepage could carry a shorter curated subset (mirroring how city/branch pages each get their own 6-7 page-specific questions rather than the master list). Not required for any ranking reason.

### SCH-3 — Only one `sameAs` entry on the org entity (Medium)

`sameAs: ["https://maps.app.goo.gl/EKAvqcdgMuUsoFrSA"]` in `__root.tsx` — a single Google Maps link. No LinkedIn, Facebook, Instagram, or KvK registry URL.

**Recommendation:** Add additional verified profile URLs as they come online. Each corroborating link strengthens entity disambiguation for a generic name like "AIMI" (the code comments already acknowledge this ambiguity risk and added `alternateName`/`knowsAbout` to compensate).

### SCH-4 — No `KVK`/`VAT_ID` anywhere on the site (Medium — legal, not just SEO)

`src/lib/seo.ts` defines `KVK = ""` and `VAT_ID = ""`, both empty, both deliberately gated so no placeholder ever renders. This is good schema hygiene (no fake data) but note it's a **Dutch legal requirement** (KvK-nummer + BTW-ID on a commercial website), independent of the SEO/schema question. Flagging alongside SCH-1 since both stem from the same three blank constants.

**Recommendation:** Not a schema-code fix — needs the actual business data. Once supplied, `businessIdentityJsonLd()` already handles both correctly (`identifier`/`PropertyValue` for KvK, `vatID` for BTW).

### SCH-5 — `/over-ons` carries no page-level `WebPage` entity (Low)

`/over-ons` (`src/routes/over-ons.tsx`) only emits `breadcrumbJsonLd(...)` in its `scripts` array — no `webPageJsonLd()` call, unlike `/`, `/tarieven`, and `/faq`, which all call it. `webPageJsonLd()` already exists, is well-designed (`about: { "@id": ORG_ID }`, `isPartOf`, `dateModified` sourced from `PAGE_DATES["/over-ons"]` which *is* populated), and is a one-line addition to the `scripts` array — this reads as an oversight rather than an intentional omission, since every other non-service page pattern includes it.

**Recommendation:** Add `webPageJsonLd({ path: "/over-ons", name: ..., description: ... })` to `/over-ons`'s `scripts` array. Consider `["WebPage", "AboutPage"]` as the `@type` for a closer semantic match, though plain `WebPage` (what the helper currently emits) is also valid and consistent with the rest of the site.

### SCH-6 — No `SearchAction` on the `WebSite` entity (Info / opportunity)

`WebSite` block in `__root.tsx` has `url`, `name`, `inLanguage`, `publisher` — no `potentialAction`. Confirmed there is no on-site search feature in the codebase (no search route/component found), so this isn't a missing-implementation bug — `SearchAction` requires an actual working search endpoint to point at. Not recommended to add unless/until a site search feature ships; adding a `SearchAction` pointing at a non-existent search URL would be worse than omitting it.

## Not applicable / correctly absent

- **`AggregateRating`/`Review`**: correctly absent, no real reviews collected yet. Do not add.
- **`FAQPage` as a growth lever**: per current rules, Google has no FAQ rich result for any site; do not prioritize new `FAQPage` additions for SERP reasons. The branch/location pages' existing FAQPage blocks are fine to keep (content-accurate, low cost) but shouldn't be treated as a ranking investment going forward.
- **Microdata/RDFa**: none found — JSON-LD only, as recommended, across every file checked.

## Scope note

Only the 8 requested pages (plus one spot-check of `/website-laten-maken-veendam` for entity-graph context) were validated this pass, at the source level rather than via live fetch. The remaining ~39 pages (13 more city pages, 7 more branch pages, and the rest) were not individually re-verified in this session; the 2026-09-06 live-audit baseline in git history (`BreadcrumbList` on 45/48, `Service` on 39/48, `FAQPage` on 36/48, `LocalBusiness` on 1/48) remains the best available reference for pages outside this sample, and nothing found in this pass contradicts it.
