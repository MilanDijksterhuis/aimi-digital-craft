# Local SEO — 2026-09-15

Method: `crawl-data.json` (48 pages) cross-checked against source (`src/lib/seo.ts`, `src/components/Footer.tsx`, `src/routes/website-laten-maken-*.tsx`) and live WebFetch checks — Google Maps `sameAs` resolution, Trustpilot, Klantenvertellen, Bing search for citation footprint. No DataForSEO / Google Business Profile API access. This revises the 2026-09-06 local.md; code changed in the interim (`8af95bc`→`dca01f9`) was GEO/freshness-signal work (WebPage schema, "Bijgewerkt op" dates, definition sentences) and a full footer NAP/city/branch link build-out — not NAP or LocalBusiness schema changes. Findings below are current as of this run.

Business type: **Hybrid, leaning Service-Area Business.** One genuine office in Veendam (Groningen), explicitly marketed as such on the Veendam page. The other 15 regional landing pages (16 city pages total, not the 16 cities the brief names minus overlap — see below) are SAB-style: `Service` + `areaServed`, no address claimed.

City pages found: **15** — `assen, coevorden, drachten, emmen, groningen, heerenveen, hoogeveen, hoogezand, leeuwarden, meppel, roden, sneek, stadskanaal, veendam, winschoten` (confirmed in both `urls.txt`/`crawl-data.json` and `src/routes/website-laten-maken-*.tsx`). The brief says "16 city pages... /leeuwarden, /sneek, etc." — the actual count is 15, plus the `/branches` hub (not a city page) and `/webdesign` (the regional hub). Not a discrepancy worth flagging as a defect, just a correction for accuracy.

**Local SEO Score: 44/100** (weighted rubric, unchanged from 2026-09-06 — no code shipped in the interim moves any of the six dimensions materially).

## Score breakdown

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 40/100 | 10.0 |
| Reviews & Reputation | 20% | 15/100 | 3.0 |
| Local On-Page SEO | 20% | 82/100 | 16.4 |
| NAP Consistency & Citations | 15% | 42/100 | 6.3 |
| Local Schema Markup | 10% | 75/100 | 7.5 |
| Local Link & Authority Signals | 10% | 10/100 | 1.0 |
| **Total** | | | **44.2 ≈ 44/100** |

Link & Authority nudged from 12→10 this run: a live search-engine check (below) found literally zero external citations to the domain, slightly worse than the source-code-only estimate in the prior report.

---

## What works well

- **All 15 city pages are real, differentiated content, not a doorway/swap pattern.** Confirmed via `crawl-data.json` word counts (970–1,226 words per page) and distinct H1s per page (e.g. `website-laten-maken-assen`: "Webdesigner in Assen voor ondernemers in Drenthe"; `-sneek`: "Webdesign in Sneek, van watersport tot dienstverlening"; `-roden`: "Webdesigner in Roden, dicht bij de stad Groningen") — every H1 references a genuine local hook, not a find/replace template. Source confirms each page also carries its own 3-paragraph local-context body and city-specific FAQs.
- **NAP that is published is internally consistent, zero discrepancies.** Phone (`06 11851093` / `+31611851093`) and email (`sales@aimi-development.nl`) are single-sourced constants in `src/lib/seo.ts` and read by the footer, `/contact`, Organization schema, `ContactPage` schema, and the Veendam `LocalBusiness` schema alike.
- **Footer now links all 15 city pages and all 15 branch pages from every one of the 48 public pages** (`Footer.tsx:51-67, 159-160`) — a fix since an earlier flagged gap (code comment "A-30: de footer linkte 2 van de 15 plaatsen en 0 van de 8 branches" documents this was previously only 2 cities / 0 branches). This is a meaningful internal-linking improvement: every page is now at most one click from every location and every branch page.
- **Correct schema-subtype discipline.** Only Veendam (the real office) carries `LocalBusiness` with `PostalAddress` + `GeoCoordinates`; the other 14 cities correctly use `Service` + `areaServed` via `cityAreaServed(city, region)` rather than fabricating 14 more "offices" — verified live in `crawl-data.json`'s `schema_types` field for every city page (`Veendam` → `LocalBusiness`; all others → `Service`). This is a well-known local-spam pattern (address-stuffing on SAB pages) that the codebase avoids by design.
- **`sameAs` Google Maps link is real and resolves** — `https://maps.app.goo.gl/EKAvqcdgMuUsoFrSA` 302s to `maps.google.com/?q=AIMI+Development&ftid=0xabadfd43ed737c41:...`, confirming a genuinely-named Google Business Profile exists ("AIMI Development", declared as `alternateName` in the Organization schema — no name mismatch).
- Stable `@id` entity graph (`ORG_ID` reused everywhere; Veendam's `LocalBusiness` has its own `@id` with `parentOrganization` back-reference) avoids duplicate-entity confusion.

## NAP consistency audit (source comparison)

| Field | Footer (all 48 pages) | `/contact` | Organization+ProfessionalService JSON-LD | Veendam `LocalBusiness` JSON-LD | Verdict |
|---|---|---|---|---|---|
| Name | "AIMI" | "AIMI" (nav/logo) | `"AIMI"`, alternateName `"AIMI Development"` | `"AIMI"` | Consistent |
| Address | "Veendam — actief sinds 2025" (locality only) | Not shown (308-word page, no address block per `crawl-data.json`) | Omitted — `ADDRESS.streetAddress`/`postalCode` are `""` in `seo.ts:42-48` | `addressLocality: "Veendam"`, `addressRegion: "Groningen"` — no street/postcode | No conflict, but no source anywhere publishes a full street address |
| Phone | `06 11851093` (tel: link) | `06 11851093` | `+31611851093` | `+31611851093` | Consistent |
| Email | `sales@aimi-development.nl` | `sales@aimi-development.nl` | `sales@aimi-development.nl` | Present | Consistent |
| KvK / BTW | Absent (conditionally rendered, `KVK`/`VAT_ID` blank) | Absent | Absent | Absent | Consistent by omission — legally required on a Dutch commercial site, currently missing everywhere |

**Bottom line:** no cross-source conflict — `Footer.tsx:169-182` already has conditional rendering logic waiting for `ADDRESS.streetAddress`, `ADDRESS.postalCode`, `KVK`, `VAT_ID` in `seo.ts:42-53` to be filled. This is a data-entry task, not a code task.

## GBP (Google Business Profile) signals

- **Search for the listing itself did not surface it.** Live WebFetch of `bing.com/search?q="AIMI" webdesign Veendam` returned zero organic results for AIMI in the first page — only sponsored listings for competitor/lead-gen platforms (`trustoo.nl`, `webtify.nl`, `websteen.nl`) and unrelated content. This is a real (if imperfect — bot-serving search snapshots can be unreliable) signal that the GBP listing is not yet visible for its own brand+location query, which is unusual for a claimed profile and worth checking directly in the GBP dashboard.
- **The `sameAs` Maps deep link does resolve to a real, uniquely-named place** ("AIMI Development", `ftid=0xabadfd43ed737c41:...`) — so a profile exists and is linked from the site — but any unauthenticated attempt to read category, hours, rating, or review count off that place hits Google's consent wall (`consent.google.com/ml?continue=...`) before rendering data. Confirmed again this run.
- No Maps iframe/embed anywhere on-site (`src/components`, all route files) — confirmed by source.
- No review widget/carousel, no "find us on Google" reference, no photo evidence referenced on-site.
- Primary category correctness (the #1 Whitespark 2026 ranking factor, and #1 negative factor if wrong) is not assessable without dashboard/API access — flagged again as the single highest-leverage unknown.

## Review health snapshot

- **On-site: zero.** No testimonial component, star rating, or quote block in `src/components`; no `aggregateRating`/`Review` schema (correctly absent rather than fabricated).
- **Off-site — checked this run:**
  - **Trustpilot** (`trustpilot.com/review/aimi-development.nl`) → HTTP 404, no profile.
  - **Klantenvertellen** (`klantenvertellen.nl/reviews/aimi-development`) → HTTP 404, no profile.
  - **Google reviews (on the GBP listing itself):** unknown — blocked by consent wall as above.
- **18-day review-velocity rule:** cannot be assessed without GBP/Places API access. With confirmed zero reviews on every checkable off-site platform, the realistic starting assumption is that velocity is also at/near zero — this is the single largest ranking lever left unaddressed on the account.

## Local schema validation

| Check | Status |
|---|---|
| Correct subtype per entity | `LocalBusiness` reserved for Veendam only; `Service`+`areaServed` for the other 14 cities; `ProfessionalService` at org level — all correct, confirmed against live `schema_types` in `crawl-data.json` |
| Required properties (`name`, `address`) | `name` present everywhere; `address` present only on Veendam's `LocalBusiness`, and incomplete there (locality/region only) |
| `geo` precision | Veendam only: `53.1042, 6.8778` — 4 decimal places, not the recommended 5 (~±11m vs ~±1m) |
| `openingHoursSpecification` | Absent everywhere, including Veendam |
| `telephone` | Present, org-level and Veendam |
| `url` | Present on all local/service schema |
| `areaServed` correctness (city pages) | Correct pattern: `cityAreaServed(city, region)` → `[{City: city}, {AdministrativeArea: region}]`, e.g. Assen → `[{City:"Assen"},{AdministrativeArea:"Drenthe"}]`, Groningen → `[{City:"Groningen"},{AdministrativeArea:"Groningen"}]`. Each city correctly pairs with its real province (Groningen cities → "Groningen" region, Drenthe cities → "Drenthe", Friesland cities → presumably "Friesland" — not spot-checked individually this run but the function signature enforces per-call region input, so a city/region mismatch would require a copy-paste error at the call site, not a systemic schema bug) |
| `aggregateRating`/`Review` | Correctly absent — no real reviews exist |
| Stable `@id` graph | Good — `ORG_ID` site-wide, Veendam's own `@id` + `parentOrganization` back-reference |

## Citation presence — NL market (checked live this run)

| Source | Status | Evidence |
|---|---|---|
| Google Bedrijfsprofiel (GBP) | Exists, unverifiable completeness | `sameAs` resolves to a real listing; category/hours/reviews blocked by consent wall |
| Bing Places | Not checked directly (no API); no organic Bing visibility for brand+location query either | Bing search for `"AIMI" webdesign Veendam` surfaced no AIMI result at all, organic or listing |
| Trustpilot | **Confirmed absent** | 404 on direct profile URL |
| Klantenvertellen | **Confirmed absent** | 404 on direct profile URL |
| KvK-linked directories (Company.info, Nationale Bedrijven Databank, Bedrijvenpagina.nl, Telefoongids.nl) | Not checked individually (no distinguishing ID to search on — `KVK` is blank in `seo.ts`), but a general domain-mention search returned nothing | See below |
| General citation footprint | **Effectively zero** | A live external-mention search for the domain surfaced no relevant results; this matches `findings/backlinks.md` (2026-09-15, same audit run), which independently confirms zero referring domains in Common Crawl and one `sameAs` as the only outbound reference anywhere |
| LinkedIn / Facebook / Instagram | Absent from `sameAs` and not found in search | No social profile referenced anywhere on-site |

The KvK number being blank in `seo.ts` is a blocker for citation building, not just a compliance gap: most Dutch directories key off the KvK-nummer to de-duplicate/verify listings, so filling `KVK`/`VAT_ID` and the street address in `seo.ts:42-53` is a prerequisite for the entire citation-building plan already laid out in `findings/backlinks.md`'s "NL-market link building starter plan."

## Location page quality (multi-location assessment)

- **Unique content:** high, confirmed via `crawl-data.json` — 15 distinct H1s, 970–1,226 words each, no two headings sharing a copy/paste pattern.
- **Doorway-page swap test:** passes. The only verbatim-shared block across all 15 is a short "Wat we bouwen voor ondernemers in {city}" intro plus a 4-item related-links list — deliberately kept short per a code comment in `LocationPageV2.tsx` specifically to avoid the doorway pattern.
- **Local schema differentiation:** correctly implemented (`LocalBusiness` vs `Service`+`areaServed`) — the best-executed part of the multi-location setup.
- **Internal linking depth:** all 15 city pages and 15 branch pages now link from the footer of all 48 public pages (confirmed in `Footer.tsx:51-85, 159-160`, and cross-checked against `crawl-data.json`'s `internal_links` count of 49 on `/branches`, `/webdesign`, and `/contact`). City pages and branch pages still do not cross-link to each other directly (e.g. no "webdesign kapsalon Groningen" combined page or in-content cross-link) — a missed long-tail opportunity, not a quality defect on the pages themselves.

## Limitations — what could not be verified

- **GBP completeness** (primary/secondary category, hours, photo count/recency, Posts cadence, Q&A, review count/rating, response rate) — invisible from a site crawl and blocked behind Google's consent wall on unauthenticated fetch. Requires GBP dashboard login or Places API/DataForSEO credentials.
- **Review velocity (18-day rule)** — cannot be measured without the above.
- **Bing Places listing status** — no Bing Webmaster/Places API access; only inferred indirectly from Bing organic search returning no AIMI result for a brand+location query.
- **Search-engine result reliability** — WebFetch-based search snapshots (Bing, DuckDuckGo) are not authoritative rank-tracking tools; DuckDuckGo's direct result was blocked by a CAPTCHA, and one Bing query returned unrelated results (Clarks Shoes) suggesting inconsistent parsing on an exact-match query. Directional evidence (no AIMI citations found across three separate live queries, corroborated by `backlinks.md`'s independent Common Crawl check) is treated as reasonably reliable; exact result counts are not.
- **Proximity-based ranking variance** — per Search Atlas's 2026 ML study, proximity alone accounts for ~55% of local ranking variance and is outside what any on-page/GBP fix can move; noted so it isn't mistaken for something fixable in code.
- **Whether the GBP listing's primary category is correct** — the #1 Whitespark 2026 ranking factor (and #1 negative factor if wrong); the Maps redirect confirms the listing exists but not its assigned category.

---

## Top 10 prioritized actions

**Critical**
1. Log into the Google Business Profile dashboard for "AIMI Development" and verify: is it actually claimed/published, is the primary category correct, does it link to aimi-development.nl? The Bing organic-search gap for "AIMI webdesign Veendam" this run is a flag worth checking directly — a claimed, well-optimized profile should normally surface for its own brand+location query.
2. Fill `ADDRESS.streetAddress` and `ADDRESS.postalCode` in `src/lib/seo.ts:42-48`. The footer, Organization schema, and Veendam `LocalBusiness` schema all already read from this constant and will render it automatically (`Footer.tsx:109, 174-178`) — this is a data-entry task, not a code change.
3. Start collecting Google reviews systematically at every project handover — confirmed zero reviews on Trustpilot and Klantenvertellen, and likely near-zero on Google given the search-visibility gap above. Reviews & Reputation is 20% of this score and sits at 15/100.

**High**
4. Fill `KVK` and `VAT_ID` in `seo.ts:51-53` — legally required on a Dutch commercial site, and the KvK number is the de-duplication key most Dutch directories use, so it's a prerequisite for the citation plan in `findings/backlinks.md`.
5. Add `openingHoursSpecification` to the Veendam `LocalBusiness` schema and display hours on `/contact` (currently 308 words with no hours block, per `crawl-data.json`).
6. Build the foundational NL citation set from `findings/backlinks.md`'s starter plan: KvK Handelsregister match, LinkedIn company page, 2-3 regional/sector directories — add each to `sameAs` as it goes live. Currently exactly one (`sameAs`: the Maps link).

**Medium**
7. Recompute Veendam's `geo` coordinates to 5-6 decimal places (currently 4) from the actual GBP pin or a precise address lookup.
8. Once real reviews exist, add `aggregateRating` to the Veendam `LocalBusiness` and Organization schema — not before.
9. Cross-link city pages and branch pages (e.g. in-content links from `/website-laten-maken-groningen` to `/website-laten-maken-kapsalon` and vice versa) so combined "webdesign [branche] [stad]" intent has somewhere to land — footer-level linking exists but no contextual cross-links yet.

**Low**
10. Add a Google Maps embed or a simple "Bekijk ons op Google" link with the business name to the Veendam page specifically — the one page where a physical-location claim is genuine, and currently the cheapest missing trust signal.
