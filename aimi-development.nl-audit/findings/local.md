
# Local SEO Audit — aimi-development.nl (AIMI)

Audit date: 2026-09-02
Method: direct code read (TanStack Start codebase) + live-render verification of one location page via `claude-seo run render_page.py` (SSR HTML matched source exactly, `--mode never`) + external WebFetch attempts against the linked Google Maps profile and search engines. Search-engine scraping (Bing, DuckDuckGo) was blocked/CAPTCHA'd and the Maps short-link sits behind a consent wall the fetch tool couldn't clear — those checks are marked as limitations below, not as findings of absence.

## Local SEO Score: 41 / 100

| Dimension | Weight | Sub-score | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 35/100 | 8.75 |
| Reviews & Reputation | 20% | 10/100 | 2.00 |
| Local On-Page SEO | 20% | 85/100 | 17.00 |
| NAP Consistency & Citations | 15% | 25/100 | 3.75 |
| Local Schema Markup | 10% | 80/100 | 8.00 |
| Local Link & Authority Signals | 10% | 15/100 | 1.50 |
| **Total** | | | **41.0** |

## Business type detected

**Service-area business (SAB) with one genuine base of operations (Veendam), correctly modeled.** AIMI has no public storefront; the codebase explicitly recognizes this (`src/routes/website-laten-maken-veendam.tsx:108-109`: *"Veendam is de enige echte vestiging: hier hoort het LocalBusiness-schema, met het werkelijke adres en de werkelijke coördinaten."*). The other 14 city pages deliberately use `Service` schema, not `LocalBusiness`, with `areaServed` instead of an `address` — this avoids the common and penalizable mistake of stamping out 15 fake `LocalBusiness` listings with identical/fabricated addresses (a doorway-page and NAP-spam pattern Google actively targets). This is a well-reasoned architecture, better than most local competitors' likely setup.

Copy on nearby-city pages (Hoogezand, Hoogeveen) correctly frames Veendam as the base and offers "op locatie" meetings for other towns rather than claiming a branch there — consistent SAB messaging, no storefront-in-every-city puffery found.

## Industry vertical

Web design / digital agency (professional service). Schema uses `["Organization","ProfessionalService"]` site-wide (`src/routes/__root.tsx:153`) and `LocalBusiness` only on the Veendam page — appropriate subtypes; no restaurant/healthcare/legal-specific schema needed.

## What works

- **No fabricated reviews or AggregateRating schema.** Correct restraint — there are no real reviews, and inventing them would be a policy violation. This is the right call, not a gap to "fix" by faking data.
- **Single canonical LocalBusiness entity** (Veendam only) with `parentOrganization` linking back to the site-wide `ORG_ID` — clean entity graph, no duplicate/conflicting `@id`s across the 15 city pages.
- **Dedicated, non-templated service-area pages for all 15 cities** — verified Assen vs. Leeuwarden by direct read: different intros, different context paragraphs (TT-circuit/Assen vs. Culturele Hoofdstad/Leeuwarden), different FAQ sets and workflow copy. Per Whitespark 2026, dedicated location/service pages are the **#1 local organic ranking factor** — this is AIMI's strongest asset.
- **`geo.region` / `geo.placename` meta tags present on all 15 city routes** (verified via grep count = 1 per file), consistent city↔region pairing.
- **Full street-level `PostalAddress` correctly *not* over-specified** for the SAB pages, and the Veendam `LocalBusiness` schema uses locality/region/country without a street address — reasonable for a home/office-based two-person agency, mirroring Google's own guidance to keep exact addresses of non-storefront SABs unlisted.
- **FAQPage schema now live on the homepage** (`src/routes/index.tsx:50`, `faqJsonLd(faqItems)`) — this closes an item (T-1) flagged as open in the prior 2026-08-24 SEO-AUDIT.md, good sign of iterative progress.
- **`sameAs` links the Organization entity to a Google Maps/GBP profile** (`__root.tsx:170`), the single strongest disambiguation signal available given "AIMI" is a common abbreviation.

## Findings

### 1. No telephone number anywhere on the public site
**Severity: High**
A site-wide grep for `tel:`, phone patterns, and "telefoon" in copy found phone numbers discussed only as *advice given to other businesses* (e.g., the loodgieter/plumber landing page). AIMI's own contact channels are exclusively email (`sales@aimi-development.nl`) and a Calendly booking widget (`src/components/Contact.tsx`). No `telephone` property appears in any schema block, and no `tel:` link exists in `Footer.tsx`, `Nav`, or `contact.tsx`.
Telephone is a recommended `LocalBusiness`/`ProfessionalService` schema property and one of the three NAP anchors used by virtually every citation directory. Its total absence means: (a) the schema can never carry a `telephone` field to validate, (b) most Tier-1 Dutch business directories (Facebook, LinkedIn Company, KvK-linked gidsen, Detelefoongids-style sites) either require a phone number or rank phone-having listings higher, and (c) if the linked Google Business Profile *does* list a phone number (very likely, since GBP nudges owners to add one), that creates an unverifiable-but-plausible NAP mismatch between GBP and the website.
**Recommendation**: Either add a real business phone/WhatsApp number consistently to the footer, `/contact`, and the Veendam `LocalBusiness` schema's `telephone` field, or — if the two-person, appointment-only model is a deliberate choice — explicitly confirm the GBP profile also omits a phone number so the "N-only" NAP profile is consistent across every surface, not just the site.

### 2. No KvK number, BTW number, or registered business address disclosed anywhere on the site
**Severity: High**
Grepped `privacybeleid.tsx` and `algemene-voorwaarden.tsx`: no KvK/BTW number appears for AIMI itself (the `kvk` field exists only in the client-portal onboarding forms, for *AIMI's customers*, not for AIMI). No address beyond "gevestigd in Nederland" appears in the legal pages either.
This has two compounding effects: it's a trust/E-E-A-T gap for a Dutch B2B service provider (KvK number on legal pages is near-universal practice and often expected under Dutch consumer-protection disclosure norms), and it removes the single most common data point (KvK number) that Dutch business directories and data-aggregators use to auto-verify and de-duplicate a listing, making citation building slower and more manual.
**Recommendation**: Add KvK number (and BTW if applicable) to the footer or a dedicated section of `/privacybeleid` / `/algemene-voorwaarden`. This does not require disclosing a street address — locality is enough for the schema and for most directories.

### 3. No social-profile `sameAs` signals besides the one Maps link
**Severity: Medium**
Grep for `facebook.com|linkedin.com|instagram.com` across `src/` returned zero public-facing links (Nav, Footer, __root.tsx). The Organization schema's `sameAs` array contains exactly one entry (the Maps short-link). 3 of the top 5 AI-visibility factors per the brief are citation-related, and `sameAs` breadth is one of the cheapest ways to reinforce entity disambiguation for an ambiguous 4-letter brand name like "AIMI" (the code comment in `__root.tsx:156-161` already acknowledges this ambiguity risk).
**Recommendation**: Create/link a LinkedIn company page at minimum (standard for a B2B agency), add it to `sameAs`, and link it from the footer.

### 4. GBP completeness and category cannot be verified from the codebase or via automated fetch
**Severity: Medium (verification gap, not a confirmed defect)**
The Maps short-link (`https://maps.app.goo.gl/EKAvqcdgMuUsoFrSA`) redirects through a Google consent wall that the fetch tooling could not clear, and general web search (Bing, DuckDuckGo HTML) returned CAPTCHA/unrelated results rather than indexable snippets. This means primary GBP category (Whitespark's **#1 ranking factor**, score 193 — and wrong category is the **#1 negative factor**, score 176), photo count, posts activity, and review count/velocity could not be confirmed externally.
**Recommendation**: Manually verify in Google Business Profile Manager: (1) primary category is the most specific accurate match (e.g., "Website designer" rather than generic "Marketing agency"), (2) at least one photo and one GBP post exist, (3) whether a phone number is set (ties into Finding 1).

### 5. Review velocity is at zero — 18-day rule exposure
**Severity: High (business risk, not a code defect)**
Confirmed no `Review`/`AggregateRating` schema exists anywhere (matches prior audit, correctly not fabricated) and no testimonial/review widget renders on any page (grep for review/testimonial/rating terms only matched advice-copy on branch pages and unrelated internal admin code). Per Sterling Sky's 18-day rule, ranking rewards flow from *velocity*, not just volume — a business with zero reviews sits permanently outside that signal, which the brief notes is ~16-20% of local ranking weight.
**Recommendation**: This is explicitly flagged in the prior SEO-AUDIT.md (§5) as outside the codebase's control — repeating it here because it's the single highest-leverage lever available and remains unaddressed. Once 3-5 real reviews exist, add `aggregateRating` to the Organization or Veendam `LocalBusiness` block (not before).

### 6. Geo-coordinate precision is 4 decimals, not the recommended 5
**Severity: Low**
Veendam page: `latitude: 53.1042, longitude: 6.8778` (`website-laten-maken-veendam.tsx:134`) — 4 decimal places (~11m precision) versus the 5-decimal (~1m) precision recommended for `GeoCoordinates`.
**Recommendation**: Cosmetic; extend to 5 decimals if/when the coordinates are next touched. Not worth a dedicated release.

### 7. No `openingHoursSpecification` on the Veendam `LocalBusiness` schema
**Severity: Low**
Absent from `website-laten-maken-veendam.tsx`. For a genuinely appointment-only, two-person agency without public walk-in hours, omitting this is defensible — a wrong or padded "9-5" claim would be worse than no claim (a Calendly-booked, no-fixed-hours business shouldn't fake retail-style hours). Flagging only so it's a documented decision rather than an oversight.
**Recommendation**: No action needed unless AIMI adopts fixed availability windows; if so, add `openingHoursSpecification` reflecting reality (e.g., "by appointment").

### 8. Location-page quality: verified good on sample, one structural risk remains from prior audit
**Severity: Medium**
Direct comparison of `website-laten-maken-assen.tsx` and `website-laten-maken-leeuwarden.tsx` confirms genuinely unique intros, context paragraphs, FAQs and business-type framing — no doorway pattern on the two sampled pages (consistent with the prior audit's broader sampling). However, the prior SEO-AUDIT.md flagged an open item (C-5): confirm no route still renders the older `LocationLanding.tsx` component (which embeds a full `<Services/>` + `<ProcessTimeline/>` block and would reintroduce ~830 words of duplicate content across pages) instead of the newer `LocationPageV2.tsx`. This audit did not re-run that grep across all 15 files; it should be closed out before treating "all city pages are unique" as fully verified.
**Recommendation**: Run `grep -rl "LocationLanding" src/routes` (or Grep tool with that pattern) and migrate any stragglers to `LocationPageV2`.

## NAP consistency audit (source comparison)

| Field | Footer | `/contact` page | Organization schema (`__root.tsx`) | Veendam `LocalBusiness` schema | Legal pages |
|---|---|---|---|---|---|
| **Name** | "AIMI" | "AIMI" (implicit via Nav/branding) | "AIMI" (+ alternateName: AIMI Development, AIMI Web Agency) | "AIMI" | "AIMI" |
| **Address** | Not shown | Not shown | Not present (by design — multi-region org) | Locality/region/country only (Veendam, Groningen, NL) — no street address | Not shown |
| **Phone** | Not shown | Not shown | Not present | Not present | Not shown |
| **Email** | Not shown | `sales@aimi-development.nl` | `sales@aimi-development.nl` | `sales@aimi-development.nl` | Not shown |

No discrepancies were found because almost no NAP data is published at all — consistency is trivially satisfied by omission. This is the core tension in this audit: the site is *internally consistent* but externally under-anchored for citation/NAP-based ranking signals. Whether this matches the actual GBP listing (which very plausibly shows a phone number and/or a masked address, per Google's SAB conventions) could not be verified (see Limitations).

## GBP optimization checklist (detected vs. missing)

| Signal | Status |
|---|---|
| GBP link present on site (`sameAs`) | Detected |
| Maps embed on any page | Missing |
| Review/rating widget on-page | Missing (correctly, no reviews exist) |
| GBP posts indicator on-page | Not applicable/not detectable from site |
| Photo evidence of work (portfolio/screenshots) | Missing — flagged already in prior audit; `Work.tsx` is dead code with fictional names |
| Primary category verification | Could not verify (external limitation) |
| Phone number matching GBP | Could not verify — site has none to compare |

## Review health snapshot

- Visible rating: none
- Visible review count: none
- `AggregateRating`/`Review` schema: absent (correct, not fabricated)
- Review velocity: zero — full exposure to the "18-day rule" ranking cliff
- Response pattern: not assessable (no reviews)

## Citation presence status (Tier 1 directories)

Not verifiable via automated fetch in this session — Bing and DuckDuckGo HTML search were blocked (CAPTCHA/irrelevant results) and the Google Maps short-link sits behind a consent wall the fetch tool could not pass. Structurally, the site currently supplies almost none of the anchor data (phone, KvK, street-level locality-only address) that Dutch directories typically require to create or verify a listing, which is a leading indicator that citation coverage is likely thin even before checking specific directories. Recommend a manual check of: Google Business Profile, Facebook Business, LinkedIn Company Page, KvK-linked gidsen (Bedrijvenpagina.nl, Detelefoongids, Nederlandsebedrijven.nl), and Clutch/Sortlist (agency-specific directories relevant to a web design business).

## Local schema validation

| Check | Status |
|---|---|
| Correct subtype per page role | Pass — `Organization`+`ProfessionalService` site-wide, `LocalBusiness` only on the one real location, `Service` (not `LocalBusiness`) on the other 14 city pages and 15 branch pages |
| Single canonical `@id` for the org | Pass — `ORG_ID` reused everywhere, `parentOrganization` correctly links Veendam's `LocalBusiness` back to it |
| `name` | Present everywhere |
| `address` | Present only on Veendam page, locality-level only (reasonable for SAB) |
| `geo` | Present on Veendam page; 4-decimal precision (recommended: 5) |
| `telephone` | Absent everywhere (see Finding 1) |
| `url` | Present |
| `openingHoursSpecification` | Absent (defensible for appointment-only model, see Finding 7) |
| `areaServed` | Present and correctly scoped per page (province-level org-wide, city-level per location page) |
| `aggregateRating`/`Review` | Correctly absent — no real reviews exist |
| `BreadcrumbList` | Present on all sampled pages |
| `FAQPage` | Present on homepage (newly added, closes prior audit item T-1); not present on individual city/branch pages despite each having a `faqs` array in `LocationPageData` — worth a follow-up to add `faqJsonLd()` per city/branch page for rich-result eligibility, though this is an on-page/technical-SEO item more than a local-specific one |

## Location page quality (multi-location: 15 city pages)

- Unique content: confirmed on 2-page sample (Assen, Leeuwarden) — intros, context paragraphs, FAQs, and workflow copy all differ meaningfully; matches the prior audit's broader finding.
- Doorway-page swap test: not fully re-run across all 15 in this session (relied on prior audit's sampling + this session's 2-page spot-check); no evidence of swap-pattern found.
- Internal linking depth: all 15 city pages are linked from the footer on every page (`Footer.tsx:50-66`), plus `related` cross-links between nearby cities — good depth, consistent with prior audit's finding that this was already fixed (A-30).
- Open item carried over from prior audit: confirm zero routes still use the older `LocationLanding.tsx` (duplicate-content risk) instead of `LocationPageV2.tsx` — not re-verified this session (see Finding 8).

## Top 10 prioritized actions

**Critical**
1. Decide and standardize AIMI's own phone/WhatsApp policy: either publish one real number consistently across footer, `/contact`, and the Veendam schema's `telephone` field, or confirm the linked GBP also has none — right now the site and the (unverified) GBP profile risk silently disagreeing on the most basic NAP field. (Finding 1)
2. Manually audit the linked Google Business Profile for primary category accuracy — Whitespark's #1 ranking factor and #1 negative factor both hinge on this, and it cannot be checked from code. (Finding 4)

**High**
3. Publish KvK number (and BTW if applicable) on the legal pages / footer — closes a trust gap and unblocks faster, more automatable citation building. (Finding 2)
4. Continue the existing "collect real reviews" action from the prior audit (§5) — this remains the single highest-leverage unaddressed lever; zero reviews means zero review-velocity signal. (Finding 5)
5. Create a LinkedIn Company Page (minimum) and add it to `sameAs`; consider Facebook Business given a portion of Noord-Nederland SMB clients are active there. (Finding 3)

**Medium**
6. Add `faqJsonLd()` to each of the 15 city pages and 15 branch pages using their existing `faqs` arrays — the data already exists in `LocationPageData`/branch data, this is schema-only work, not content work.
7. Re-run `grep -rl "LocationLanding" src/routes` to close out the prior audit's open C-5 item and confirm no duplicate-content route remains live. (Finding 8)
8. Manually check Tier-1 Dutch directories (KvK-linked gidsen, Clutch/Sortlist for agencies) for existing/missing citations once phone/KvK data exists to anchor them. (Citation section)

**Low**
9. Extend the Veendam page's `GeoCoordinates` to 5-decimal precision. (Finding 6)
10. If AIMI ever adopts fixed consultation hours, add `openingHoursSpecification` reflecting them — otherwise leave as-is (a fabricated 9-5 claim would be worse than omission). (Finding 7)

## Limitations disclaimer

- The Google Maps/GBP profile linked via `sameAs` could not be inspected: the short-link redirects through a Google consent wall that automated fetching could not clear, so **primary category, photo count, posts activity, and any listed phone number/address on GBP itself are unverified**.
- General web search (Bing, DuckDuckGo HTML) returned CAPTCHA pages or irrelevant results rather than indexable snippets, so **Tier-1 directory presence (Yelp/BBB-equivalents, KvK-linked Dutch gidsen, Facebook, LinkedIn) could not be confirmed or ruled out** — the citation-status section above is a structural inference (thin anchor data → likely thin coverage), not a direct check.
- No Search Console, GBP Insights, or paid rank-tracking data was available, so **actual local-pack rankings, click-through, and review-velocity trend data are unassessed** — consistent with the prior 2026-08-24 audit's disclaimer.
- Proximity — 55.2% of ranking variance per the Search Atlas ML study cited in the brief — is outside the scope of any on-page or schema fix and is not scored here.
- Only 2 of the 15 city pages (Assen, Leeuwarden) were read in full for the uniqueness/doorway check in this session; the remaining 13 were spot-checked only for `geo.placename` meta presence via grep. This relies partly on the prior audit's broader (but also non-exhaustive) sampling.
