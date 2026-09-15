# Schema & Structured Data — Live Audit, 2026-09-06

Method: live fetch (raw HTML, server-rendered — `is_spa: false`, `mode_used: raw` on every page, `content` and `raw_content` character counts identical, confirming no client-side JSON-LD injection) of 10 sampled URLs via `render_page.py --mode auto --json --json-ld-output`:

`/`, `/tarieven`, `/website-laten-maken`, `/webshop-laten-maken`, `/faq`, `/website-laten-maken-kapsalon`, `/website-laten-maken-groningen`, `/webdesign`, `/over-ons`, `/contact`, plus `/website-laten-maken-veendam` (fetched to verify the address hypothesis) and a source read of `src/lib/seo.ts` + `src/components/BranchPage.tsx` to explain a structural difference found live.

Score: **88/100** (up from the 2026-09-04 static-code score of 86; a High-severity gap remains — no postal address anywhere on the site's primary entity).

## What works (confirmed live)

- All JSON-LD blocks on all 10 sampled pages parse without error, use `"@context": "https://schema.org"`, and none use a deprecated type (no `HowTo`, no `SpecialAnnouncement`).
- **Stable, byte-identical entity IDs.** The `Organization`/`ProfessionalService` block (`@id: https://aimi-development.nl/#organization`) and `WebSite` block (`@id: https://aimi-development.nl/#website`) are word-for-word identical across all 10 sampled pages. Google consolidates one entity instead of inventing ten.
- **`parentOrganization` linking.** The Veendam `LocalBusiness` (`@id: .../website-laten-maken-veendam#localbusiness`) points back to `/#organization` via `parentOrganization` — a correct entity graph.
- `BreadcrumbList` correctly absent from the homepage (it is the root) and present with the correct trail on every inner page sampled.
- `priceValidUntil` is `2027-09-06` on every `Offer` — computed one year forward at render time (`PRICE_VALID_UNTIL` in `src/lib/seo.ts`), not a hardcoded date that will silently expire.
- `/tarieven`'s hosting `Offer` correctly nests a `UnitPriceSpecification` (`billingIncrement: 1`, `unitCode: "MON"`) for the recurring €30/month charge — a level of correctness most sites skip.

## Verification of prior hypotheses (from SEO-AUDIT.md, 2026-08-24)

| Hypothesis | Live verdict |
|---|---|
| Homepage's 25-question FAQ is rendered visually but **not** emitted as `FAQPage` schema | **False / stale.** Live fetch of `/` shows a third JSON-LD block, `FAQPage`, 8,829 bytes, 25 `Question`/`Answer` pairs, text matching the visible component. This was fixed at some point between the 2026-08-24 static audit and now. |
| Single consolidated `Organization`/`ProfessionalService` entity via `ORG_ID`, no duplicate `@id` conflicts across pages | **Confirmed true**, live, across all 10 sampled pages — the block is byte-for-byte identical everywhere it appears. |
| Kapsalon vertical page uses an inline one-off `Service` schema instead of the shared helper, missing `@context` consistency | **False.** `@context` is present and correct. Structurally, the kapsalon page's `Service` block *is* smaller (391 bytes vs. 547 bytes on `/website-laten-maken`) because it omits `areaServed` — but this is not a one-off hack. `src/components/BranchPage.tsx` and `src/lib/seo.ts`'s `serviceJsonLd()` show this is the *same shared helper* used everywhere, called with `areaServed: null` by deliberate, documented design: `"areaServed: overschrijft het standaard werkgebied... null laat areaServed helemaal weg (branchepagina's, die niet regiogebonden zijn)"`. Branch pages (kapsalon, makelaar, restaurant, etc.) are industry-vertical pages, not location pages, so omitting a region claim is the *correct* call, not an inconsistency. |
| No `Review`/`AggregateRating` schema anywhere | **Confirmed true**, unchanged. No review markup found on any of the 10 sampled pages. |
| `sameAs` links to a Google Maps/Business profile | **Confirmed true.** Every sampled page's `sameAs` array contains exactly one entry: `https://maps.app.goo.gl/EKAvqcdgMuUsoFrSA`. Still only one link (see SCH-2 below). |

## Per-page structured data inventory (live)

| Page | Types present |
|---|---|
| `/` | `Organization`+`ProfessionalService`, `WebSite`, `FAQPage` (25 Q&A) |
| `/tarieven` | `Organization`+`ProfessionalService`, `WebSite`, `BreadcrumbList`, `OfferCatalog` (3 offers incl. `UnitPriceSpecification`), `FAQPage` (7 Q&A) |
| `/website-laten-maken` | `Organization`+`ProfessionalService`, `WebSite`, `Service` (with `areaServed`), `BreadcrumbList`, `ItemList` (4 items) |
| `/webshop-laten-maken` | `Organization`+`ProfessionalService`, `WebSite`, `Service` (with `areaServed`), `BreadcrumbList`, `ItemList` |
| `/faq` | `Organization`+`ProfessionalService`, `WebSite`, `BreadcrumbList`, `FAQPage` (25 Q&A — **identical to homepage's**, see finding below) |
| `/website-laten-maken-kapsalon` | `Organization`+`ProfessionalService`, `WebSite`, `Service` (no `areaServed`, by design), `BreadcrumbList`, `FAQPage` (7 Q&A) |
| `/website-laten-maken-groningen` | `Organization`+`ProfessionalService`, `WebSite`, `Service` (city-specific `areaServed`), `BreadcrumbList`, `FAQPage` (6 Q&A) |
| `/webdesign` | `Organization`+`ProfessionalService`, `WebSite`, `Service` (regional `areaServed`), `BreadcrumbList` |
| `/over-ons` | `Organization`+`ProfessionalService`, `WebSite`, `BreadcrumbList` only |
| `/contact` | `Organization`+`ProfessionalService`, `WebSite`, `BreadcrumbList`, `ContactPage`+`ContactPoint` |
| `/website-laten-maken-veendam` (extra check) | `Organization`+`ProfessionalService`, `WebSite`, `LocalBusiness` (with `PostalAddress` city-level + `GeoCoordinates`), `BreadcrumbList`, `FAQPage` (6 Q&A) |

## Findings

### SCH-1 — `ProfessionalService`/`Organization` has no address, geo, or opening hours anywhere (High)

Confirmed live and unchanged from the prior static audit. The shared `/#organization` entity (identical on all 10 sampled pages) declares `telephone`, `email`, `priceRange: "€€"`, `sameAs`, `knowsAbout`, `areaServed` and `hasOfferCatalog` — but no `address`, `geo`, or `openingHoursSpecification`.

The one `PostalAddress` on the entire site (on the Veendam `LocalBusiness`) is city-level only:

```json
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Veendam",
  "addressRegion": "Groningen",
  "addressCountry": "NL"
}
```

No `streetAddress` or `postalCode`. This traces directly to `src/lib/seo.ts`:

```ts
export const ADDRESS = {
  streetAddress: "", // bv. "Kerkstraat 1"
  postalCode: "", // bv. "9641 AA"
  addressLocality: "Veendam",
  addressRegion: "Groningen",
  addressCountry: "NL",
};
```

with an explicit code comment that this is deliberate — a half-filled address is worse than none. This is a defensible interim decision, but it means the site's primary local-business entity still never states a checkable street address anywhere.

**Recommendation:** Fill in the real `streetAddress` and `postalCode` in the `ADDRESS` constant once available. The helper (`postalAddress()`) already auto-includes it in both `businessIdentityJsonLd()` (spread into the org entity — though note `businessIdentityJsonLd()` does not currently appear to be spread into the `/#organization` block itself; verify this wiring) and the Veendam `LocalBusiness` the moment those two fields are non-empty — no new schema code should be needed, only the data. Also add `openingHoursSpecification` once hours are confirmed, and consider whether `geo`/`GeoCoordinates` should live on the main org entity or only on the Veendam local page (current approach — geo only on Veendam — is defensible to avoid claiming a citywide presence elsewhere).

### SCH-2 — Only one `sameAs` reference (Medium)

Confirmed live, unchanged. Every sampled page's `sameAs` array contains exactly one Google Maps short link. No LinkedIn, Facebook, Instagram, or KvK register URL.

**Recommendation:** Add profile URLs as they become available; each additional corroborating link strengthens Knowledge Graph disambiguation.

### SCH-3 — No `aggregateRating` or `Review` anywhere (Medium)

Confirmed live, unchanged. No review markup on any of the 10 sampled pages, consistent with (and correctly gated by) the absence of real, collected reviews on-site.

**Recommendation:** Collect genuine reviews first, then mark them up. Do not add `AggregateRating`/`Review` schema without real reviews behind it — that would be schema spam under Google's guidelines.

### SCH-4 — Identical `FAQPage` schema duplicated verbatim on `/` and `/faq` (Info — new finding)

The homepage's `FAQPage` block and the `/faq` page's `FAQPage` block are **both exactly 8,829 bytes** with the same 25 `Question`/`Answer` pairs in the same order — byte-identical JSON-LD served at two different URLs. Neither block carries a `mainEntityOfPage` or distinct `@id` to indicate which URL is the canonical home for that content.

This is not a Google ranking risk — FAQ rich results are retired for all sites as of 2026-05-07 (see SCH-5) — but it is redundant, duplicate structured data, and would have been ambiguous under the old FAQ rich-result rules (Google historically picked one URL to award the rich result to when the same FAQ content appeared on multiple pages).

**Recommendation:** Pick one canonical location for the full 25-question set (`/faq` is the more natural home) and trim the homepage's `FAQPage` to a short, curated subset most relevant to conversion — mirroring what's already done well on the vertical/city pages (6-8 page-specific questions each, not a repeated master list). Alternatively, add `mainEntityOfPage` pointing at `/faq` on both blocks to disambiguate.

### SCH-5 — Homepage `FAQPage` still carries all 25 questions (Info, downgraded from Low)

Per current guidance: Google retired FAQ rich results for **all** sites as of 2026-05-07 (superseding the 2023 government/health-only restriction), so there is no SERP feature to gain here regardless of question count. Any AI-citation/GEO value is unconfirmed. Live verification: all 25 questions match the visible on-page FAQ component text — no schema/visible-content mismatch. No action needed for Google SERP purposes; see SCH-4 for the duplication angle.

### SCH-6 — `/over-ons` has no `WebPage`/`AboutPage` entity (Low)

`/over-ons` carries only the site-wide `Organization`, `WebSite`, and `BreadcrumbList` blocks — no page-level entity. Notably, the codebase already defines a `webPageJsonLd()` helper in `src/lib/seo.ts` (with `about`, `isPartOf`, `dateModified` — good GEO/freshness signal) but it was **not observed on any of the 10 sampled live pages**, including `/over-ons`, `/tarieven`, `/webdesign`, or the service pages.

**Recommendation:** Apply `webPageJsonLd()` (or a `["WebPage","AboutPage"]` variant) to `/over-ons` at minimum. Worth checking with the codebase owner whether this helper was intended to ship sitewide and simply hasn't been wired into routes yet, since it already exists and is well-designed — this looks like an implementation gap rather than a missing design.

## Not checked / scope notes

- Only 10 of 48 live pages were sampled per the requested scope (plus `/website-laten-maken-veendam` as a targeted address check). The remaining 14 city pages and 15 branch pages were not individually re-verified live; the 2026-09-04 static audit's page-count table (`BreadcrumbList` on 45/48, `Service` on 39/48, `FAQPage` on 36/48, `LocalBusiness` on 1/48) was not re-validated at full scale in this pass and should be treated as the best available baseline for pages outside the sample.
- `businessIdentityJsonLd()`'s actual wiring into the `/#organization` block (vs. only the Veendam `LocalBusiness`) was not traced to a specific call site in this pass — flagged as a follow-up under SCH-1 rather than independently confirmed.
- Microdata/RDFa: not detected on any sampled page (JSON-LD only, as recommended).
