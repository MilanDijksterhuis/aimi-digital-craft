# Backlinks & Authority — 2026-09-06

Score: **INSUFFICIENT DATA** — not a numeric score. Backlink health scoring requires data on at least referring domains, domain quality, anchor text, and toxicity; at Tier 0 zero of those seven scoring factors have a data source, so any number would be fabricated.

## Data source status

- **Credential check** (`backlinks_auth.py --check`): **Tier 0** — Common Crawl + verification crawler only. Moz, Bing Webmaster and DataForSEO keys are all absent.
- **Common Crawl domain graph** (`commoncrawl_graph.py aimi-development.nl`, confidence: 0.50, source: https://commoncrawl.org/web-graphs, release cc-main-2026-jan-feb-mar): `aimi-development.nl` was **not found** in the Common Crawl host graph at all — `in_crawl: false`, `in_rankings: false`, PageRank/harmonic centrality/rank all `null`. This is not a low score, it is an absence of data: the domain is too new/small to have been picked up by Common Crawl's last few crawl cycles. No numeric CC metric can be reported.
- **Verification crawler**: no known backlink list was supplied for this run (no third-party pages citing aimi-development.nl were provided to check), so there is nothing to verify. This step was skipped, not failed.
- **Moz / Bing / DataForSEO**: unavailable — no API keys configured.

## What can be established without API data

### BL-1 — No link-earning asset exists (Medium)
Every one of the 48 URLs is a commercial service page. There is no blog, no research, no tool writeup, no dataset — nothing whose natural purpose is to be cited. `/website-checker` is the one exception and the closest thing to a linkable asset the site has.

### BL-2 — Zero outbound links (Medium)
See CQ-4 / GEO-1. Beyond the E-E-A-T angle, linking out is how a site enters a topical neighbourhood; a site that references nobody tends to be referenced by nobody.

### BL-3 — Thin external footprint (Medium)
One `sameAs` (Google Maps) and no discoverable directory presence. For a local Dutch business the realistic starting set is: KvK register, Google Business Profile (exists), LinkedIn company page, and regional business directories — foundational citations that are also links.

### BL-4 — Domain absent from Common Crawl's host graph (Informational)
This is expected for a young/small agency site (Veendam-based, launched recently) and is not itself a red flag — Common Crawl's web graph only samples a fraction of the web per release and skews toward already-linked domains. It does mean there is currently no free, automatable way to estimate referring-domain count or PageRank-style authority for this domain; that gap can only be closed with a proper link index (Moz, Ahrefs, Semrush, DataForSEO) or Bing Webmaster Tools (first-party, requires site verification).

## Recommended next steps

1. **Moz API (free tier)** — sign up at https://moz.com/products/api (2,500 rows/month free). This unlocks DA/PA, referring domain counts, anchor text distribution and Spam Score for this domain at confidence 0.85, and is the single highest-value next step for this category.
2. **Bing Webmaster Tools** (free, first-party) — verify the domain to expose inbound links and anchor text at confidence 0.70, at no cost.
3. Once either is in place, re-run this audit category — a real numeric Backlink Health Score can then be computed using the confidence-weighted model (referring domains 20%, domain quality distribution 20%, anchor text naturalness 15%, toxic link ratio 20%, link velocity 10%, follow/nofollow 5%, geographic relevance 10%). Until then, any factors still missing (e.g. link velocity, which needs DataForSEO) will keep being reported as skipped with weight redistributed, not scored at zero.

## Cross-references
- For E-E-A-T / content authority signals, see `/seo content aimi-development.nl` (already reflected in CQ-4).
- For crawlability/technical prerequisites to being discovered and linked, see `/seo technical aimi-development.nl`.
