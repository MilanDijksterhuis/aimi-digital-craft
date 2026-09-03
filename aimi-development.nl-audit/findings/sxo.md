# SXO (Search Experience Optimization) Audit — aimi-development.nl
Date: 2026-09-02
Method: Live render + parse via `claude-seo run render_page.py --mode auto` / `parse_html.py` for 12 pages (`/`, `/website-laten-maken`, `/webshop-laten-maken`, `/tarieven`, `/webdesign`, `/branches`, `/website-laten-maken-groningen`, `/website-laten-maken-assen`, `/website-laten-maken-kapsalon`, `/website-laten-maken-makelaar`, `/wordpress-of-maatwerk`, `/over-ons`), full sitemap fetch (47 URLs), plus WebSearch SERP-backwards reads for 5 target queries: "website laten maken groningen", "website laten maken kapsalon", "website laten maken makelaar", "wat kost een website laten maken", "webdesign noord-nederland". Cross-referenced against the 2026-08-24 code-read audit (`SEO-AUDIT.md`) and the 2026-09-02 content/E-E-A-T pass (`findings/content.md`) — this pass does not re-litigate those findings but layers page-type/intent-match and persona-journey analysis on top.

## Summary

AIMI's page architecture is **type-correct but proof-empty**. For every target query checked, Google currently rewards Service/Local pages that lead with hard trust anchors baked directly into titles and above-the-fold copy: "10+ jaar ervaring", "1000+ websites opgeleverd", "100% tevredenheidsgarantie" (Chuck's Webdesign, VrijdagOnline — both ranking for "website laten maken groningen"), price-anchored titles like "Website laten maken Groningen €349,-", and for niche/branche queries, concrete functional depth (CRM-koppeling and map-based zoekfilters for makelaars; online boekingssystemen for kapsalons). AIMI's matching pages (`/website-laten-maken-groningen`, `-kapsalon`, `-makelaar`) use the *right page type* — no CRITICAL structural mismatch was found — but every one of them ships **zero images, zero case studies, zero years-in-business claim, and zero reviews**, which is exactly the content the ranking pages use to win trust. The one page carrying genuine informational intent ("wat kost een website laten maken") is answered by comparison-style content elsewhere in the market (price ranges across simple/business/webshop, freelance hourly rates, platform costs); AIMI's `/tarieven` only states its own three tiers, with no market-comparison framing — a page-depth gap, not a wrong page type.

## SXO Gap Score: 45 / 100

| Dimension | Max | Score | Basis |
|---|---|---|---|
| Page Type | 15 | 10 | Every checked page uses the SERP-correct type (Service Page for core/branche terms, Local Page framing for city terms, pricing page for cost term). No CRITICAL type mismatch. Points lost because city pages lack the taxonomy's *required* Local Page elements (no page-level LocalBusiness schema, no NAP block, no embedded map — only sitewide Organization/ProfessionalService). |
| Content Depth | 15 | 8 | Word counts are respectable (400–929 words) and non-templated (confirmed unique per city/branche in prior audit), but missing the comparative framing ("wat kost" query) and functional depth (CRM/MLS for makelaar) that ranking pages provide. |
| UX Signals | 15 | 7 | Clean H1→H2→H3 hierarchy, working CTAs ("Vraag een offerte", "Bekijk tarieven", "Neem contact op") on every sampled page. Undercut by zero visual proof on 8 of 12 pages sampled (`images: []` on groningen, assen, kapsalon, makelaar, webdesign hub, branches hub, tarieven) — nothing to scan for a persona in decision mode. |
| Schema | 15 | 8 | Organization/ProfessionalService + WebSite + Service + BreadcrumbList applied consistently; FAQPage schema present on `/tarieven` (`OfferCatalog` + `FAQPage`). Missing: FAQPage on homepage despite FAQ component existing (dead-code gap, confirmed in prior audit), no LocalBusiness subtype schema on any city page, no Review/AggregateRating anywhere. |
| Media | 15 | 3 | Homepage and `/website-laten-maken` each carry exactly one image (hero, one example screenshot). `/webshop-laten-maken` has one example. All other sampled pages — including both city pages and both branche pages — render zero images. No portfolio screenshots, no team photos, no booking-flow screenshots. |
| Authority | 15 | 2 | Zero reviews, zero case studies, zero client-count or years-in-business claim anywhere sampled, including `/over-ons` itself. Every ranking competitor checked in this pass leads with exactly this proof. |
| Freshness | 10 | 7 | Sitemap `lastmod` values cluster Aug 20–22 2026 (recent), but this reads as a bulk redeploy rather than rolling maintenance (consistent with prior audit's `publication_date` placeholder finding). |

## What works

- **Correct page-type selection, no CRITICAL mismatches.** Homepage stays brand-only (no keyword cannibalization with `/website-laten-maken`), `/webdesign` correctly claims the regional-hub role, city and branche pages correctly use Service/Local framing rather than, say, a blog-post format for a commercial local query. This is a real strength most small agency sites get wrong.
- **CTAs are present and consistent** across every sampled page ("Vraag een offerte", "Bekijk tarieven", "Neem contact op") — no dead-end pages found in this sample.
- **FAQPage schema + OfferCatalog on `/tarieven`** directly targets the "wat kost een website laten maken" query with structured, extractable numbers (€499/€749), which is a genuine rich-result/AI-citation opportunity competitors' looser blog content doesn't structure as cleanly.
- **Niche functional relevance exists in copy**, even without imagery: the kapsalon page's meta description already names "online afspraken, prijslijst, teamfoto's" and the makelaar page names "verkochte woningen als bewijs" and "waardebepaling" — the right topics are present, just not proven visually or numerically.

## Findings

### SXO-1 — City pages (Local-intent query) lack every Local Page trust anchor competitors lead with
**Severity:** Critical
**URL:** https://aimi-development.nl/website-laten-maken-groningen (representative of all 15 city pages, incl. `/website-laten-maken-assen`)
**Inferred query intent:** "website laten maken groningen" — local commercial-investigation intent, persona actively comparing 2-3 agencies before requesting a quote.
**Description:** SERP-backwards read of "website laten maken groningen" shows the current top results (VrijdagOnline, Chuck's Webdesign, Convident) all lead with a specific, checkable trust claim in the first screen: "10+ jaar ervaring", "meer dan 1000 websites gebouwd", "100% tevredenheidsgarantie", price directly in the title ("€349,-"). AIMI's `/website-laten-maken-groningen` (913 words, correctly localized, unique copy) has none of this: no years-in-business claim, no project count, no guarantee, zero images (`images: []`), and no LocalBusiness/NAP/map block despite the taxonomy requiring these for Local Page intent. A kapper or schilder in Groningen comparing three agency tabs side by side sees two competitors with hard numbers and AIMI with prose only.
**Recommendation:** Add one checkable trust line above the fold on every city page (founding year, e.g. "sinds 2024" if that's accurate — do not fabricate a longer tenure) plus a visible service-area/contact block (phone, KVK, area served) reusable from `/contact`. This does not require new pages, just a shared trust-strip component surfaced on all 15 city pages.

### SXO-2 — `/tarieven` answers "what AIMI charges", not "what a website laten maken costs" — the actual query intent
**Severity:** High
**URL:** https://aimi-development.nl/tarieven
**Inferred query intent:** "wat kost een website laten maken" — broad awareness-stage research query, persona has not yet chosen a provider type (agency vs. freelancer vs. bouwpakket).
**Description:** Content ranking for this exact phrase (wecaremedia, onlinelabs, madebyanouk) is structured as a market comparison: simple site €500–1,500, business site €1,500–5,000, webshop €3,000–10,000+, freelancer hourly rate €75–150/hr, ongoing hosting/maintenance €200–1,000/yr. `/tarieven` (707 words, FAQPage schema present) only states AIMI's own three tiers (Starter €499, Pro €749, custom) with no market-range framing, so it cannot capture a searcher who is still deciding *what kind* of provider to use — the actual awareness-stage question behind this query. This matches the already-identified gap C-4 in the 2026-08-24 audit but reframes it as an intent mismatch rather than a missing feature: the page currently serves a decision-stage persona (someone who's already chosen AIMI) rather than the awareness-stage persona the query itself attracts.
**Recommendation:** Add a short "wat kost een website gemiddeld in Nederland?" section above or beside the AIMI-specific pricing table, with the market ranges above, framed honestly (AIMI is bewust goedkoper/vaster geprijsd dan uurtje-factuurtje). This captures the awareness-stage visitor without diluting the existing consideration-stage pricing table.

### SXO-3 — Makelaar page misses the functional depth (CRM/property search) that competing pages lead with
**Severity:** Medium
**URL:** https://aimi-development.nl/website-laten-maken-makelaar
**Inferred query intent:** "website laten maken makelaar" — niche B2B evaluator persona, decision-stage, comparing functional fit before price.
**Description:** Ranking/visible competitor pages for this query (Tussendoor "WordPress Website met CRM Koppeling", BS Connect) center the pitch on CRM integration and advanced property search with map display — the functional core a real-estate persona needs to see addressed before they'll even read pricing. AIMI's makelaar page (929 words) leads instead with "verkochte woningen als bewijs" and "waardebepaling met lage drempel" — a reasonable trust/lead-gen angle, but it never mentions CRM koppeling, MLS/Funda-integratie, or a property-search/filter feature, leaving the persona's top functional question unanswered.
**Recommendation:** Add one paragraph or FAQ item explicitly addressing CRM/koppeling-mogelijkheden (even if the honest answer is "we koppelen desgewenst met [CRM]" or "we bouwen een eigen woningaanbod-overzicht met filters") so the page doesn't read as functionally thinner than competitors on the one feature this persona checks first.

### SXO-4 — Zero visual proof on every niche and local page sampled
**Severity:** High
**URL:** https://aimi-development.nl/website-laten-maken-kapsalon, /website-laten-maken-makelaar, /website-laten-maken-groningen, /website-laten-maken-assen, /webdesign, /branches
**Inferred query intent:** applies across all commercial/local queries checked — every persona in consideration or decision stage.
**Description:** `parse_html.py` returned `images: []` for all six pages listed above. Only the homepage and `/website-laten-maken`/`/webshop-laten-maken` carry a single example image each. A kapsalon or makelaar owner scanning the page for "does this look like a website I'd want" has nothing to look at — no example screenshot, no booking-flow preview, no team photo — despite `ExampleSlideshow` already existing as a reusable component elsewhere on the site (per `SEO-AUDIT.md` §2.6).
**Recommendation:** Reuse the existing `ExampleSlideshow` component (already built for `/website-laten-maken` and `/webshop-laten-maken`) on the highest-traffic branche and city pages, even with 1-2 generic example screenshots per branche, rather than none.

### SXO-5 — Homepage FAQ content is not schema-tagged despite `/tarieven` proving the pattern works
**Severity:** Low
**URL:** https://aimi-development.nl/
**Inferred query intent:** brand + generic FAQ-style queries ("hoe lang duurt het bouwen van een website", "wat krijg ik voor 499 euro").
**Description:** Homepage structured-data blocks are limited to `Organization/ProfessionalService` and `WebSite` — no `FAQPage` block, even though `/tarieven` demonstrates the exact schema pattern already works on this codebase (`OfferCatalog` + `FAQPage`). This is a restatement of a previously-flagged item (T-1, 2026-08-24), included here because it directly affects rich-result eligibility for the awareness-stage personas this audit derived.
**Recommendation:** Apply the same `faqJsonLd()` pattern already used on `/tarieven` to the homepage's FAQ content, once it's confirmed the FAQ block actually renders in the crawlable homepage content (flagged as unconfirmed in `findings/content.md` CQ-2).

## User Stories → Persona Scores

| Persona (SERP signal source) | Journey Stage | Relevance /25 | Clarity /25 | Trust /25 | Action /25 | Total | Rating |
|---|---|---|---|---|---|---|---|
| **Trust-seeking local owner** (kapper/schilder comparing 3 Groningen agencies — signal: competitor "10+ jaar", "1000+ sites", "100% garantie") | Consideration/Decision | 20 | 16 | 4 | 14 | 54/100 | Needs Work |
| **Niche feature evaluator — makelaar** (signal: competitor "CRM Koppeling", kaartweergave) | Consideration | 14 | 14 | 6 | 16 | 50/100 | Needs Work |
| **Kapsalon owner wanting online boekingssysteem** (signal: kapsalon SERP consistently sells booking feature) | Decision | 19 | 12 | 5 | 16 | 52/100 | Needs Work |
| **Budget-conscious starter** (signal: price-anchored competitor titles, "€349,-", "€375,-") | Awareness/Consideration | 18 | 19 | 10 | 18 | 65/100 | Good |
| **Comparison shopper** (Wix/bouwpakket/freelancer vs. maatwerk — signal: "wat kost" SERP shows hourly-rate + platform ranges) | Awareness | 14 | 18 | 16 | 15 | 63/100 | Good |
| **Regional multi-location browser** (signal: "webdesign noord-nederland" competitor "sinds 2010", "2000+ MKB-klanten") | Awareness | 17 | 17 | 7 | 14 | 55/100 | Needs Work |

**Weakest persona: Niche feature evaluator — makelaar (50/100).** Top issue: no CRM/property-search feature mention (SXO-3) combined with zero trust proof. Recommended fix: add the CRM/functional paragraph (SXO-3) and reuse `ExampleSlideshow` (SXO-4) on this page specifically, since it's the lowest-scoring persona and the highest-value B2B niche in the branche set.

**Systemic issue:** Trust dimension averages 8/25 across all six personas — the single lowest-scoring dimension by a wide margin (next-lowest is Clarity/Action, both mid-teens). This confirms the Authority score (2/15) is the dominant drag on the overall SXO Gap Score, consistent with the E-E-A-T findings in `findings/content.md` (CQ-1, CQ-5).

## Limitations

- SERP analysis used WebSearch result snippets and summaries, not a full manual top-10 scrape with PAA/related-searches/AI-Overview panel capture — page-type classification for competitors is based on titles, meta descriptions, and summarized on-page claims, not a full render of each competitor URL.
- Only 12 of 47 sitemap URLs were rendered/parsed live for this pass (see Method). Findings on city/branche pages are treated as representative (per prior audit's confirmed pattern of unique-but-structurally-identical pages) but not individually verified for all 30 city and 15 branche pages.
- No Search Console or analytics access — all intent/persona inference is derived from public SERP signals and page structure, not actual click/impression data for AIMI's own rankings.
- Featured snippet, AI Overview, and PAA box contents for the target queries were not directly observed (WebSearch tool does not expose these SERP features separately); comparative-content inference for "wat kost een website laten maken" is based on the ranking pages' summarized content, not a confirmed snippet/AI Overview citation check.

## Cross-skill references

- Authority/Trust is the dominant systemic gap — recommend `/seo content` (already run, see `findings/content.md`) for deeper E-E-A-T remediation sequencing.
- No LocalBusiness schema on city pages (SXO-1) — recommend `/seo schema` for schema generation once NAP/address decisions are made.
- Local intent confirmed dominant for city-page queries — recommend `/seo local` for Google Business Profile analysis (flagged as highest-weight off-code lever in `SEO-AUDIT.md` §5).

---
Generate a PDF report? Use `/seo google report`.
