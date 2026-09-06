# Local SEO — 2026-09-04

Business type: **Service Area Business (SAB)** — physical base in Veendam (Groningen), serving Groningen / Drenthe / Friesland and the Netherlands more widely.

Score: **72/100**

## What works

- **15 city pages, each substantially written** (avg 1,051 words) with only 7.7% heading overlap. These are not doorway pages — each argues a different local case (Groningen as student city and largest northern economy; Hoogeveen's regional function along the A28/A37; Stadskanaal's veenkoloniën catchment).
- **Honest location schema.** Only Veendam claims a `PostalAddress` + `GeoCoordinates`. The other 14 cities use `areaServed` instead of a fabricated address — this is precisely correct SAB modelling and avoids the location-spam pattern Google actively filters.
- **Consistent NAP anchoring in code.** `PHONE_DISPLAY` / `PHONE_E164` are single-sourced in [seo.ts](src/lib/seo.ts), so the visible `tel:` links and the schema cannot drift apart.
- Phone present on 31 of 48 pages; `/webdesign` hub links all locations.
- `ACTIVE_SINCE_YEAR = 2025` used as a genuine trust signal rather than an invented founding date.

## Findings

### LOC-1 — No postal address published anywhere on-page (High)
The Veendam address exists in JSON-LD but appears in **no visible page content** — not on `/contact`, not in the footer. Google cross-checks on-page NAP against Google Business Profile and citations; schema alone is the weakest form of that signal, and users looking for a local supplier cannot see where you are.

### LOC-2 — No KvK / BTW number (High)
See CQ-1. Beyond the legal requirement, the KvK number is a primary local-citation key — it is how directories and aggregators match your business to the register.

### LOC-3 — Single `sameAs`, no citation footprint (Medium)
One Google Maps link and nothing else. No LinkedIn, no Facebook, no Instagram, and no evidence of Dutch directory listings (Telefoonboek.nl, Detelefoongids, Bedrijvenpagina, Startpagina). Citation consistency across directories is a core local ranking factor and currently near-zero.

### LOC-4 — No reviews (High)
No review content on the site and no `aggregateRating`. Review count and velocity are among the strongest map-pack ranking factors. With a Google Maps profile already linked, the gap is collection, not infrastructure.

### LOC-5 — No opening hours (Medium)
Neither `openingHoursSpecification` in schema nor visible hours on `/contact`. Standard for a local business entity and currently absent everywhere.

### LOC-6 — Google Business Profile not directly auditable (Info)
No DataForSEO or Google API credentials were configured for this audit, so GBP completeness, review velocity, geo-grid rank and competitor radius could not be measured. The `sameAs` Maps link confirms a profile exists. A GBP-connected re-audit would be the highest-value addition to the next round.
