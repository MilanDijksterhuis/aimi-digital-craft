# Schema & Structured Data — 2026-09-04

Score: **82/100**

## What works

All JSON-LD on all 48 pages **parses without error**. Coverage:

| Type | Pages |
|---|---|
| `Organization` + `ProfessionalService` | 48 |
| `WebSite` | 48 |
| `BreadcrumbList` | 45 |
| `Service` | 39 |
| `FAQPage` | 36 |
| `ItemList` | 3 |
| `LocalBusiness` | 1 |
| `Article` | 1 |
| `OfferCatalog` | 1 |

Genuinely well-architected details:

- **Stable entity IDs.** `@id: /#organization` and `/#website` are reused site-wide, so Google consolidates one entity instead of inventing 48. This is the part most sites get wrong.
- **`parentOrganization` linking.** The Veendam `LocalBusiness` points back to `/#organization` — a correct entity graph, not orphaned blobs.
- **Honest location handling.** Only `/website-laten-maken-veendam` carries a `LocalBusiness` with `PostalAddress` + `GeoCoordinates` (53.1042, 6.8778). The other 14 city pages deliberately do *not* claim an address. **This is the right call** — fabricating a PostalAddress in Assen or Emmen where there is no office is exactly the location spam Google penalises. Resisting that is a mark of a careful implementation.
- `BreadcrumbList` correctly absent from the homepage (it is the root).
- `PRICE_VALID_UNTIL` computed at render time rather than hardcoded — avoids silent expiry in Rich Results.

## Findings

### SCH-1 — `ProfessionalService` on 48 pages with no address (High)
`ProfessionalService` is a subtype of `LocalBusiness`, and Google's structured-data guidelines expect `address` on any `LocalBusiness`. The shared `/#organization` entity declares `telephone`, `email`, `logo`, `areaServed`, `sameAs` and `knowsAbout` — but **no `address`, `geo`, `openingHoursSpecification` or `priceRange`**.

The business has a genuine Veendam address (already used on the city page), so this can be filled honestly. Right now the site's primary entity is a local business that never says where it is.

### SCH-2 — Only one `sameAs` reference (Medium)
`sameAs` contains a single Google Maps short link. No LinkedIn, no Facebook, no Instagram, no KvK register URL. `sameAs` is the main mechanism for cross-corroborating a business entity in the Knowledge Graph; one link is thin corroboration.

### SCH-3 — No `aggregateRating` or `Review` anywhere (Medium)
No review markup on any page. Blocked by the absence of actual collected reviews (see CQ-3) — fix the reviews first, then the markup. Do **not** mark up ratings that do not exist behind them.

### SCH-4 — `/contact` has no `ContactPage` schema (Low)
Carries only the site-wide `Organization`/`WebSite`/`BreadcrumbList`. A `ContactPage` with `contactPoint` (phone, email, `availableLanguage: nl`, `contactType: customer service`) is a cheap, well-supported addition.

### SCH-5 — Homepage `FAQPage` carries 25 questions (Low)
Legal and valid, but unusually heavy. Google's FAQ rich results are now restricted to authoritative government and health sites, so there is no SERP payoff; the value is AI-citation surface. Worth checking that all 25 correspond to visible on-page content — schema must mirror what a user actually sees.
