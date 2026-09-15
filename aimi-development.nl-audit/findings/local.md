# Local SEO — 2026-09-06 (revised)

Method: source-code read (`src/lib/seo.ts`, `src/routes/__root.tsx`, `src/routes/website-laten-maken-*.tsx`, `src/components/{Footer,Contact,LocationPageV2,TrustStrip}.tsx`) cross-checked against the live site (homepage, `/contact`, `/website-laten-maken-groningen`) and a live fetch of the `sameAs` Google Maps link. No DataForSEO/Google Business Profile API access — see Limitations.

Business type: **Hybrid, leaning Service-Area Business.** Genuine single office in Veendam (Groningen), explicitly marketed as such on the Veendam page, but the other 14 regional landing pages are SAB-style (`areaServed`, no address claimed) and the org-wide schema/copy frames AIMI as serving Noord-Nederland + all of NL remotely.

City pages found: **15**, not 13 — `assen, coevorden, drachten, emmen, groningen, heerenveen, hoogeveen, hoogezand, leeuwarden, meppel, roden, sneek, stadskanaal, veendam, winschoten` (route files in `src/routes/website-laten-maken-*.tsx`). This matches the 15 cities actually listed in the brief; the "13" in the brief's prose undercounts its own list.

Local SEO Score: **44/100** (weighted rubric — see breakdown). This is markedly lower than the previous local.md's holistic **72/100** from 2026-09-04; that is a methodology difference, not a regression — see "Reconciling the two scores" below. No code changed between the two audits in a way that would move this number.

## Score breakdown

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 40/100 | 10.0 |
| Reviews & Reputation | 20% | 15/100 | 3.0 |
| Local On-Page SEO | 20% | 82/100 | 16.4 |
| NAP Consistency & Citations | 15% | 42/100 | 6.3 |
| Local Schema Markup | 10% | 75/100 | 7.5 |
| Local Link & Authority | 10% | 12/100 | 1.2 |
| **Total** | | | **44.4 ≈ 44/100** |

**Reconciling the two scores:** the 2026-09-04 local.md scored 72/100 holistically — rewarding honest, non-spammy code (correct SAB modelling, no fabricated addresses, single-sourced NAP constants) and treating reviews/citations as "off-site, not a code defect." This report uses the stricter weighted rubric requested for this audit, where Reviews (20%) and Link/Authority (10%) sit near zero because there is genuinely nothing to score — zero reviews, one external link. Both are accurate; they answer different questions. The 72 answers "is the implementation sound?" (yes). The 44 answers "how ranking-competitive are the visible local signals right now?" (weak, almost entirely for off-site reasons).

---

## What works (confirmed live)

- **`sameAs` Google Maps link is real and resolves** — verified live: `https://maps.app.goo.gl/EKAvqcdgMuUsoFrSA` (in `src/routes/__root.tsx:192`) 302-redirects to `maps.google.com/?q=AIMI+Development&ftid=0xabadfd43ed737c41:...`. This confirms a Google Business Profile named **"AIMI Development"** genuinely exists and the on-site claim in the earlier SEO-AUDIT.md was correct, not aspirational. `"AIMI Development"` is already declared as an `alternateName` in the Organization schema, so there's no name mismatch between the site and the profile.
- **NAP that *is* published is 100% consistent, with zero discrepancies.** Phone (`06 11851093` / `+31611851093`) and email (`sales@aimi-development.nl`) are single-sourced constants in `src/lib/seo.ts` (`PHONE_DISPLAY`, `PHONE_E164`, `EMAIL`) and every consumer — footer, `/contact`, Organization schema, Veendam `LocalBusiness` schema, `ContactPage`/`ContactPoint` schema — reads from the same constants. Confirmed live on the homepage and `/contact`. This is a genuine strength: the site cannot drift into the classic "different phone number on three pages" NAP problem because there is structurally only one place to edit it.
- **15 city pages are real content, not a doorway/swap pattern.** Spot-checked live (Groningen, Assen) and in source (Veendam, Hoogeveen, Assen): each has a distinct H1, a 3-paragraph `contextBody` referencing genuine local facts (Assen's TT-circuit traffic spikes, Hoogeveen's A28/A37 logistics position and regional draw from surrounding villages, Groningen's student/starter density, Veendam's veenkolonie history and streekfunctie), city-specific FAQs, and a locally-scoped `businessTypesBody`. The shared "Wat we bouwen voor ondernemers in {city}" block is deliberately kept to ~60 words per a code comment (`LocationPageV2.tsx:288-294`) specifically to avoid the doorway pattern — this is a documented, intentional fix, not an accident.
- **Honest, non-spammy location schema.** Only the genuine Veendam office carries a `LocalBusiness` type with `PostalAddress` + `GeoCoordinates` (`website-laten-maken-veendam.tsx:119-146`). The other 14 city pages correctly use `Service` + `areaServed` (via `cityAreaServed()`) instead of fabricating a second, third, fourteenth "office." Fabricating addresses on SAB pages is a well-known local-spam pattern Google actively suppresses — this codebase avoids it by design (confirmed in both `website-laten-maken-hoogeveen.tsx:106` comment and `website-laten-maken-assen.tsx`).
- **`ContactPage`/`ContactPoint` schema added since the last audit** (`src/lib/seo.ts:338-368`, wired into `src/routes/contact.tsx:34-39`) — this closes the previously-flagged schema.md SCH-4 gap and gives `/contact` its own entity with `telephone`, `email`, `availableLanguage`.
- `geo.region` / `geo.placename` / `geo.position` / `ICBM` meta tags on city pages match the JSON-LD coordinates exactly where both are present (Veendam: `53.1042;6.8778` in both meta and schema) — no drift between the two sources.

## NAP consistency audit (source comparison)

| Field | Footer (all pages) | `/contact` page body | Organization+ProfessionalService JSON-LD (all 48 pages) | Veendam `LocalBusiness` JSON-LD | Verdict |
|---|---|---|---|---|---|
| Name | "AIMI" | "AIMI" (nav/logo) | `"AIMI"`, alternateName `"AIMI Development"` | `"AIMI"` | Consistent |
| Address | "Veendam — actief sinds 2025" (locality only) | Not shown | Omitted entirely (`ADDRESS.streetAddress` is `""` in `seo.ts`, so `businessIdentityJsonLd()` emits nothing) | `PostalAddress` with `addressLocality: "Veendam"`, `addressRegion: "Groningen"` — **no `streetAddress` or `postalCode` field at all** | No source publishes a street address anywhere. Not *inconsistent* (nothing contradicts anything else), but incomplete everywhere. |
| Phone | `06 11851093` (tel: link) | `06 11851093` (tel: link) | `+31611851093` | `+31611851093` | Consistent (same constant, display vs. E.164 format as expected) |
| Email | `sales@aimi-development.nl` | `sales@aimi-development.nl` | `sales@aimi-development.nl` | `sales@aimi-development.nl` | Consistent |
| KvK / BTW | Absent | Absent | Absent (`KVK`/`VAT_ID` are `""` in `seo.ts`) | Absent | Consistent by omission — legally required on a Dutch commercial site, currently missing everywhere |

**Bottom line on NAP:** there is no cross-source conflict to fix — the code architecture (single constants file) structurally prevents that. The gap is completeness, not consistency: no source, anywhere, publishes a full street address, and KvK/BTW are blank in the one file (`seo.ts:42-53`) that would need to be filled to make them appear everywhere at once. `Footer.tsx:169-182` already has the conditional rendering logic built and waiting — this is a data-entry task, not a code task.

## GBP optimization checklist (on-site signals only)

| Signal | Status | Notes |
|---|---|---|
| Profile exists and is linked (`sameAs`) | Present | Verified live, resolves to a real, uniquely-named place |
| Business name matches site (incl. disambiguation) | Present | "AIMI Development" declared as `alternateName` |
| Maps embed on any page | Missing | No iframe/embed found anywhere in `src/components` or route files |
| Review widget / carousel on-site | Missing | No component found (confirmed by targeted search) |
| "Find us on Google" / photo evidence referenced | Missing | No photo, post, or GBP-content reference on-site |
| Category, hours, photos, Posts cadence on the profile itself | **Not assessable from a site crawl** | Requires Google Business Profile access or a Maps/Places API key; see Limitations |
| Review count / rating on the profile itself | **Not assessable** | An unauthenticated fetch of the resolved Maps URL hits Google's consent wall (`consent.google.com/ml?continue=...`), which returns no rating/review data |

## Review health snapshot

- **On-site: zero.** Confirmed live on the homepage and in source — no testimonial component, no star rating, no quote block anywhere in `src/components`. No `aggregateRating` or `Review` schema exists (correctly: schema.md SCH-3 already flags that faking this would be worse than omitting it).
- **On the GBP profile itself: unknown.** The profile is real (see above) but its actual review count, average rating, and review velocity cannot be read from an unauthenticated fetch — Google interposes a consent page before any place data renders. This must be checked directly in the Google Business Profile dashboard or via a Places API call with credentials, neither of which this audit had access to.
- **18-day velocity rule:** cannot be assessed at all without the above access. Flagging this as the single highest-value follow-up if GBP/Places API credentials become available, since review velocity is a much larger ranking lever than anything left in the codebase.
- Confirms, live, the prior SEO-AUDIT.md (2026-08-24) and local.md (2026-09-04) claims of zero reviews — nothing has changed on this front.

## Local schema validation

| Check | Status |
|---|---|
| Correct subtype per entity | `LocalBusiness` reserved for the one real office (Veendam) only; `Service`+`areaServed` for the other 14 cities and `ProfessionalService` (a `LocalBusiness` subtype, correctly chosen for a professional agency) at the org level — all correct |
| Required properties (`name`, `address`) | `name` present everywhere. `address` present only on the Veendam `LocalBusiness` — and even there it's incomplete (locality/region only, no `streetAddress`/`postalCode`) |
| `geo` precision | Present on Veendam only: `53.1042, 6.8778` — **4 decimal places, not the recommended 5** (roughly ±11m vs. ±1m precision). Minor, easy fix once real coordinates are pulled from the GBP listing or a map pin |
| `openingHoursSpecification` | Absent everywhere, including Veendam | 
| `telephone` | Present on org-level and Veendam schema |
| `url` | Present on all local/service schema |
| `aggregateRating`/`Review` | Correctly absent (no real reviews exist yet) |
| Stable `@id` graph | Good — `ORG_ID` (`/#organization`) reused site-wide, Veendam's `LocalBusiness` has its own `@id` via `localBusinessId()` and links back with `parentOrganization`, avoiding duplicate-entity confusion |

## Location page quality (multi-location assessment)

Spot-checked 4 of 15 city pages (Veendam, Assen, Hoogeveen in source; Groningen live) against BrightLocal-style local-landing-page standards:

- **Unique content:** high. Each page has its own 3-paragraph context section referencing verifiable local facts (not just city-name find/replace) — e.g., Assen's TT-circuit traffic spikes are addressed as a real technical requirement ("stable under load during event weekends"), Hoogeveen's ligging aan de A28/A37 and regional draw are specific to that town, Veendam's copy explicitly leans into "we're actually here, not a remote vendor."
- **Doorway-page swap test:** passes. The only verbatim-shared block across all 15 is the ~60-word "Wat we bouwen voor ondernemers in {city}" intro plus a 4-item service link list (`LocationPageV2.tsx:295-368`) — small enough (roughly 5-8% of total page copy per the prior audit's word count) that it reads as a consistent site-wide module, not a scaled/duplicate page.
- **Local schema (`LocalBusiness`/`areaServed`):** correctly differentiated — real office gets `LocalBusiness`, everyone else gets `Service`+`areaServed`. This is the single best-executed part of the multi-location setup.
- **Internal linking depth:** all 15 are linked from the footer on every one of the 48 public pages (`Footer.tsx:51-67`) and from the `/webdesign` hub. Per the earlier SEO-AUDIT.md (C-1, still open), city pages and branch pages don't cross-link to each other, so "kapsalon website Groningen"-style combined intent isn't served by any single page — a missed opportunity but not a quality defect on the city pages themselves.

## Limitations — what this audit could not verify

- **Google Business Profile completeness** (primary category, secondary categories, hours, photo count/recency, Posts cadence, Q&A, review count and rating, response rate to reviews) — none of this is visible from a site crawl. The `sameAs` link confirms the profile *exists* and is *correctly named*; it says nothing about how complete or active it is. This requires either manual login to the GBP dashboard or a Google Places API / DataForSEO business-listings call, neither of which was available.
- **Review velocity (the 18-day rule)** — cannot be measured without the above access.
- **Tier-1 citation presence** (Dutch equivalents: Telefoonboek.nl, De Telefoongids, Bedrijvenpagina.nl, Startpagina, KvK register listing, plus international Yelp/BBB which have limited relevance in the NL market) — a proper check needs live search/API queries per directory; this audit only confirmed, via source and one live fetch, that the site itself references exactly one external profile (the Maps link) and does not surface evidence of any others.
- **Proximity-based ranking variance** — per Search Atlas's 2026 ML study, proximity alone accounts for ~55% of local ranking variance and is entirely outside what any on-page or GBP fix can move. Noted per the skill's guidance so this isn't mistaken for something fixable in code.
- **Whether the resolved GBP listing's category is correct** (the #1 Whitespark ranking factor, and the #1 negative factor if wrong) — the redirect confirms the listing exists under the name "AIMI Development" but the category assigned to it in Google's system is not visible from an unauthenticated Maps fetch.

---

## Top 10 prioritized actions

**Critical**
1. Fill `ADDRESS.streetAddress` and `ADDRESS.postalCode` in `src/lib/seo.ts:42-48` with the real Veendam street address. The Footer, Organization schema, and Veendam `LocalBusiness` schema all already read from this one place and will start rendering it automatically — this is confirmed by reading the conditional logic in `Footer.tsx:109` and `businessIdentityJsonLd()`.
2. Start collecting Google reviews systematically at project handover (outside the codebase, but the single highest-weighted fixable item — Reviews & Reputation is 20% of this score and currently near zero).
3. Log into the Google Business Profile dashboard for "AIMI Development" and verify/set the primary category correctly — per Whitespark 2026 data this is the single largest ranking lever, positive or negative, and it cannot be checked or fixed from the codebase.

**High**
4. Fill `KVK` and `VAT_ID` in `seo.ts:51-53` — legally required, and the KvK number is a citation-matching key for Dutch directories.
5. Add `openingHoursSpecification` to the Veendam `LocalBusiness` schema and display hours on `/contact`.
6. Build at least 2-3 foundational Dutch citations (KvK register listing, LinkedIn company page, one regional business directory) and add them to `sameAs` alongside the Maps link — currently there is exactly one.

**Medium**
7. Recompute the Veendam `geo` coordinates to 5-6 decimal places (currently 4) using the actual GBP pin or a precise address lookup.
8. Once reviews exist, add `aggregateRating` to the Veendam `LocalBusiness` and Organization schema — do not add this before real reviews exist.
9. Cross-link city pages and branch pages (already flagged as open item C-1 in the earlier SEO-AUDIT.md) so "webdesign [branche] [stad]" intent has a page to land on.

**Low**
10. Add a Google Maps embed or a simple "Find us on Google" link with the business name to the Veendam page specifically (the one page where a physical location claim is genuine) — cheap trust signal, currently absent.
