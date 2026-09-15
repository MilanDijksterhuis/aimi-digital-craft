# Backlinks & Authority — 2026-09-15

Score: **INSUFFICIENT DATA** — not a numeric score. Backlink health scoring requires data on at least referring domains, domain quality, anchor text, and toxicity; at Tier 0 zero of those seven scoring factors have a data source, so any number would be fabricated.

## Data source status

- **Credential check** (`backlinks_auth.py --check`, re-verified 2026-09-15): **Tier 0** — Common Crawl web graph + local verification crawler only. Moz, Bing Webmaster and DataForSEO API keys are all absent from `~/.config/claude-seo/backlinks-api.json` and environment.
- **Common Crawl domain graph** (`commoncrawl_graph.py aimi-development.nl`, confidence: 0.50, source: https://commoncrawl.org/web-graphs, release `cc-main-2026-jan-feb-mar`, cached): `aimi-development.nl` remains **not found** in the Common Crawl host graph — `in_crawl: false`, `in_rankings: false`, `pagerank: null`, `pagerank_rank: null`, `harmonic_centrality: null`, `harmonic_centrality_rank: null`, `n_hosts: null`. Same result as the 2026-09-06 run; this is an absence-of-data signal, not a low score. Common Crawl only samples a fraction of the web per quarterly release and skews toward already-linked domains, so a young/small domain routinely falls outside it for several release cycles even after it starts earning links.
- **Verification crawler**: no third-party URLs citing aimi-development.nl were supplied for this run, so `verify_backlinks.py` was not invoked — skipped, not failed. If/when specific referring pages are known (e.g. a directory listing or partner mention goes live), re-run `claude-seo run verify_backlinks.py --target aimi-development.nl --links <file> --json` to confirm the link actually resolves, is `dofollow`, and the anchor text matches expectation.
- **Moz / Bing Webmaster / DataForSEO**: unavailable — no API keys configured. See "Recommended next steps" below.
- **Validator**: `validate_backlink_report.py` run against this report's structured data — **PASS**, 0 errors, 0 warnings.

## What can be established without API data

### BL-1 — No link-earning asset exists (Medium)
Every one of the 48 URLs is a commercial service page. There is no blog, no research, no tool writeup, no dataset — nothing whose natural purpose is to be cited. `/website-checker` is the one exception and the closest thing to a linkable asset the site has.

### BL-2 — Zero outbound links (Medium)
See CQ-4 / GEO-1. Beyond the E-E-A-T angle, linking out is how a site enters a topical neighbourhood; a site that references nobody tends to be referenced by nobody.

### BL-3 — Thin external footprint (Medium)
One `sameAs` (Google Maps) and no discoverable directory presence. For a local Dutch business the realistic starting set is: KvK register, Google Business Profile (exists), LinkedIn company page, and regional business directories — foundational citations that are also links.

### BL-4 — Domain absent from Common Crawl's host graph (Informational)
Expected for a young/small agency site (Veendam-based, launched recently) and not itself a red flag. It does mean there is currently no free, automatable way to estimate referring-domain count or PageRank-style authority for this domain; that gap can only be closed with a proper link index (Moz, Ahrefs, Semrush, DataForSEO) or Bing Webmaster Tools (first-party, requires site verification).

## Recommended next steps (tooling)

1. **Moz API (free tier)** — sign up at https://moz.com/products/api (2,500 rows/month free). Unlocks DA/PA, referring domain counts, anchor text distribution and Spam Score at confidence 0.85 — the single highest-value next step for this category.
2. **Bing Webmaster Tools** (free, first-party) — verify the domain to expose inbound links and anchor text at confidence 0.70, at no cost.
3. Once either is in place, re-run this audit category — a real numeric Backlink Health Score can then be computed using the confidence-weighted model (referring domains 20%, domain quality distribution 20%, anchor text naturalness 15%, toxic link ratio 20%, link velocity 10%, follow/nofollow 5%, geographic relevance 10%). Factors still missing after that (e.g. link velocity, which needs DataForSEO) keep being reported as skipped with weight redistributed, not scored as zero.

---

## NL-market link building starter plan (prioritized)

Given the domain currently has ~zero measurable inbound link footprint, this is a from-scratch outreach plan for a Veendam/Groningen-Drenthe based webdesign agency. Ordered by effort-to-authority ratio (cheapest, highest-certainty wins first). None of these require paid tools — all are manually executable and each produces a citation that is also a link.

### Priority: Critical — foundational NL business citations (do first, week 1-2)
These are near-zero-effort, high-certainty (agency is legally registered so eligible immediately), and form the base that every later local-SEO and directory tactic depends on. All are "KvK-linked" in the sense that they verify against the same KvK number/company name, which builds NAP (Name-Address-Phone) consistency — itself a ranking and trust signal even before counting the link.

| Target | Type | Action | Notes |
|---|---|---|---|
| Google Business Profile | Foundational | Confirm listing is claimed, complete, and category-correct; add the KvK number in the description | Already exists per BL-3; verify it links to aimi-development.nl, not a generic URL |
| KvK Handelsregister | Registry | No public link from KvK itself, but ensures the KvK-nummer + vestigingsadres used everywhere else matches exactly | Prerequisite for every directory below — mismatched NAP data weakens all of them |
| LinkedIn company page | Foundational | Create/complete with website URL in the "Website" field (dofollow-equivalent, high DA) | Also a distribution channel for future content/case studies |
| Nationale Bedrijven Databank / Company.info-style registries | Directory | Many auto-pull from KvK; check/claim listing, correct website URL | Low effort, often already exists in stub form |
| Detailhandel.info / Bedrijvenpagina.nl / Telefoongids.nl (Bedrijven) | Directory | Free basic listing with website field | High-volume generic NL directories; low individual value but near-zero cost |

### Priority: High — regional Groningen/Drenthe directories & networks (week 2-4)
Higher relevance/topical-local value than generic national directories because they signal geographic relevance (also a scoring factor, 10% weight once DataForSEO/Bing data exists) and are more likely to be followed by real local prospects, not just crawlers.

| Target | Type | Action |
|---|---|---|
| Ondernemersvereniging / bedrijvenkring Veendam / Veendam-Pekela | Local business association | Join as member; most have a members directory page with website link |
| VNO-NCW / MKB-Nederland regional chapter (Groningen/Drenthe) | Trade association | Membership listing, often includes company website |
| Gemeente Veendam / Provincie Groningen ondernemersloket pages | Government/municipal | Some municipalities maintain a "lokale ondernemers" or "starters" page — request inclusion |
| Regionale kranten zakelijke sectie (Dagblad van het Noorden, RTV Noord bedrijven) | Regional media directory | Check if they run a business directory or "ondernemers in de regio" feature separate from press |
| Groningen/Drenthe-specific branchegidsen for webdesign/IT (e.g. ICT-koppelgids Noord-Nederland style directories) | Niche directory | Search "webdesign bureau Groningen/Drenthe directory" and submit to any that exist |

### Priority: High — branchegidsen (webdesign/IT sector directories, week 2-4)
Sector-specific directories carry more topical relevance than generic ones and are what prospects actually search.

| Target | Type | Action |
|---|---|---|
| Webdesignbureaus.nl-style aggregators (search: "webdesign bureau vergelijken", "beste webbouwers Nederland") | Comparison/directory site | Submit listing with portfolio link; many are free, some freemium |
| Clutch.co / GoodFirms (NL/EU filter) | B2B agency directory | Free profile creation; internationally recognized, decent authority, dofollow in most cases |
| Bureaus.nl or similar Dutch agency marketplaces | Directory | Submit profile |
| WordPress/Shopify/webbuilder partner directories (if the agency builds on a specific stack) | Platform partner directory | If using WordPress, Shopify, etc., check "find an expert/partner" directories — often dofollow and highly relevant |

### Priority: Medium — partner & client showcase links (ongoing, week 3+)
Every completed client project is a natural, low-effort link opportunity and doubles as social proof.

| Target | Type | Action |
|---|---|---|
| Existing/past clients (e.g. Direct SportsWear per memory notes) | Client showcase | Ask each client to add a small "website door [Bureau] " credit in their footer or an "over ons"/colofon page linking back |
| Case study reciprocity | Partner | If any subcontractors, freelancers, or platform partners are used (hosting, plugin devs), ask for mutual "in samenwerking met" mentions |
| Testimonial link-backs | Client showcase | When leaving a testimonial for a supplier/tool (hosting provider, SaaS tool used to build sites), most testimonial pages include a link to the reviewer's own site |

### Priority: Medium — open source / GitHub presence (week 3+)
Lower immediate SEO value (GitHub links are typically nofollow) but builds a durable technical-credibility footprint and is a legitimate linkable asset per BL-1 — this is the fix for "no link-earning asset exists."

| Target | Type | Action |
|---|---|---|
| GitHub org/profile | Technical credibility | Ensure the org/profile bio has aimi-development.nl in the "Website" field; even if nofollow, it's a real citation signal and often gets picked up by aggregate profile-scraper directories |
| Publish 1-2 small open-source utilities (e.g. a stripped version of the `/website-checker` tool, a boilerplate) | Linkable asset | Directly resolves BL-1 — this is the kind of asset that gets organically cited/starred, unlike commercial service pages |
| Dev.to / Hashnode technical write-up on a build the agency did | Content + link | Cross-post a short technical case study linking back; dofollow on most of these platforms |

### Priority: Low — local press (opportunistic, ongoing)
Least controllable/schedulable, but highest individual authority when it lands.

| Target | Type | Action |
|---|---|---|
| Dagblad van het Noorden / RTV Noord | Regional press | Pitch a short local-business story (e.g. "lokale ondernemer bouwt X" angle) when there's a newsworthy hook — new office, notable local client project, a founder milestone |
| Regional startup/ondernemers newsletters or podcasts | Press/PR | Low-frequency, opportunistic; worth a standing note to pitch when there's real news |

### Sequencing rationale
Foundational citations (Critical) are prerequisite NAP consistency and cost almost nothing — do these before anything else so later directory submissions don't propagate an inconsistent address/KvK number. Regional and branchegidsen (High) are the highest relevance-to-effort local links available and directly answer BL-3. Client showcase and open-source (Medium) both require slightly more lead time (client goodwill, or producing something worth open-sourcing) but directly fix BL-1's "no linkable asset" gap. Press (Low) is included for completeness but shouldn't be scheduled — it's opportunistic, not a checklist item.

**Caveat**: none of the above submissions can be confirmed as live, dofollow, or NAP-correct from this tool without a follow-up check. Once any of these are actually submitted, re-run `claude-seo run verify_backlinks.py --target aimi-development.nl --links <file> --json` against the list of claimed listing URLs to confirm the links resolve — do not assume a directory submission was accepted or indexed without verifying.

## Cross-references
- For E-E-A-T / content authority signals, see `/seo content aimi-development.nl` (already reflected in CQ-4).
- For crawlability/technical prerequisites to being discovered and linked, see `/seo technical aimi-development.nl`.
- For toxic link pattern reference and anchor text benchmarks once a link index is available, see `skills/seo/references/backlink-quality.md`.
