# Backlink Profile Audit — aimi-development.nl (AIMI)

Audit date: 2026-09-02
Method: `claude-seo` backlink skill, Tier 0 only (Common Crawl web graph + local verification crawler). `backlinks_auth.py --check` confirmed no Moz API key and no Bing Webmaster API key are configured — **Moz (DA/PA/spam score/referring domains) and Bing Webmaster (inbound link list) data are unavailable in this audit.** This is a data-completeness limitation, not a finding about the site. No list of "known" backlinks was supplied to run through `verify_backlinks.py`, so link-level verification could not be performed either. All numbers below come from a single live query; none are estimated or carried over from the 2026-08-24 manual SEO-AUDIT.md (that document's backlink conclusion was qualitative/competitor-research-based, not tool-verified — it is cited separately below for context only).

## Backlink Health Score: INSUFFICIENT DATA (Tier 0)

Per the skill's own scoring guardrail: the confidence-weighted Backlink Health Score uses 7 factors (referring domain count, domain quality distribution, anchor text naturalness, toxic link ratio, link velocity, follow/nofollow ratio, geographic relevance). **0 of 7 factors have a Tier-0-available data source** — all 7 require Moz, Bing, or DataForSEO. Producing a numeric 0-100 score from zero scored factors would be fabricated precision, so none is given.

**Directional read (qualitative, not a scored metric):** every signal actually available this session points the same direction — very low/near-zero external authority — but this is a directional risk read, not a measurement:
- Domain not found anywhere in the Common Crawl web graph (see Finding 1) — confirmed, not inferred.
- No third-party citation profiles exist in the site's own schema markup beyond one Google Maps link (see Finding 2) — confirmed via code.
- No known backlinks were available to verify as present/absent.

If a single number is required for reporting purposes, treat this as **"Critical / effectively unscored"** rather than any specific digit — assign a number only once Moz or DataForSEO data closes at least 4 of the 7 factors.

## What works

- Nothing to report as an existing backlink-profile strength — no referring domains, anchor text, or link signals were found or could be measured at this tier. This is consistent with a genuinely young domain rather than a tooling gap: the CC "not found" result plus the zero-citation code check both point the same way (see Findings 1-2).

## Findings

### 1. Domain not found in the Common Crawl web graph at all
**Severity: High (data point, interpret carefully)**
`commoncrawl_graph.py aimi-development.nl --json` against the current release (`cc-main-2026-jan-feb-mar`, quarterly, source: https://commoncrawl.org/web-graphs) returned:
```
"in_crawl": false, "in_rankings": false, "pagerank": null,
"harmonic_centrality": null, "n_hosts": null
"note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."
```
Per the skill's own validation rule, **this must not be read as "confirmed zero authority."** `in_crawl: false` means Common Crawl's most recent crawl cycle never encountered the domain at all (neither as a crawled page nor as a link target referenced from any other crawled page) — it is consistent with either (a) genuinely no backlinks pointing to it, or (b) the domain being too new/low-traffic for CC's crawl scheduler to have picked up yet, independent of whether links exist. It is real, directly observed evidence of an unestablished footprint, but not proof of a specific referring-domain count (which Tier 0 cannot produce regardless — see Score section).
Source: Common Crawl Web Graph (confidence: 0.50, domain-level, per skill convention).
**Recommendation:** Re-run this exact check quarterly (next CC release, ~3 months). If the domain still doesn't appear after real backlinks exist (e.g., after the client-footer-credit campaign in Finding 3 recommendation), that would be a genuine gap worth escalating to Google via Search Console's URL Inspection / sitemap resubmission rather than a link problem.

### 2. Zero third-party citation/profile links in the site's own schema
**Severity: Medium**
Grep of `src/routes/__root.tsx` (`sameAs` field on the Organization entity) confirms exactly one external profile is referenced: `["https://maps.app.goo.gl/EKAvqcdgMuUsoFrSA"]` (Google Maps). No KvK-linked directory, LinkedIn, Facebook, Instagram, or agency-directory (Clutch/Sortlist-style) URL appears anywhere in `src/`. This was independently confirmed in the parallel Local SEO audit (`aimi-development.nl-audit/findings/local.md`, Finding 3), cited here only as corroboration, not as new backlink-specific evidence.
Source: direct code read (confidence: 0.95 — this is a fact about the codebase, not an inference).
**Recommendation:** Treat citation-building as a prerequisite to backlink-building, not a parallel track: each new profile (LinkedIn Company Page, a Dutch KvK-linked bedrijvengids, Clutch/Sortlist for agencies) is itself a low-difficulty, legitimate backlink plus a `sameAs` entry. Start with directories that don't require a phone number, since the site currently publishes none (see local.md Finding 1).

### 3. Natural link-building opportunity: client footer credits ("website door AIMI")
**Severity: Opportunity (not a defect)**
AIMI builds websites for its clients, which is a structurally legitimate and low-cost link acquisition channel most competitors of AIMI's age don't have available in the same way: every delivered client site is a potential referring domain. This audit could not verify whether any live client sites currently carry such a credit link (no client site list or known-backlinks file was provided to run through `verify_backlinks.py` — this would be a fast, concrete follow-up: compile the list of delivered client domains and run `verify_backlinks.py --target https://aimi-development.nl --links <client-list.json>` to check which ones already link back).
**Recommendation:** (1) Compile the list of client domains already live, and verify current footer-credit-link presence with `verify_backlinks.py`. (2) For clients without one, ask permission to add a small "Website door AIMI" (or similar) footer credit linking to aimi-development.nl — standard, disclosed, non-manipulative practice (distinct from hidden/paid link schemes) as long as it's a real, visible, dofollow-or-not-doesn't-matter editorial credit and not disguised anchor-text stuffing. This is the single most realistic near-term lever available given AIMI has no ad budget or years of accumulated links: it converts existing client relationships directly into referring domains from real, topically-relevant (local NL business) sites.

### 4. Dutch business-directory presence could not be verified with available tools
**Severity: Medium (verification gap, not a confirmed defect)**
The task asked whether AIMI is listed on typical Dutch business directories (KvK-linked bedrijvengidsen, Detelefoongids-style sites, Clutch/Sortlist for agencies). Tier 0 has no sanctioned tool for this (Moz's referring-domains report, which would normally surface this, requires the unavailable API key). An informal attempt using public search-engine HTML endpoints (DuckDuckGo, Bing) for the exact string `"aimi-development.nl"` returned only an Instagram profile link and no directory results; a broader unquoted query returned unrelated noise (tokenized into "aimi" + "development.nl" separately) and Bing returned a bot-blocked page. **This informal check is unscored, low-confidence, and should not be treated as proof of absence** — search engines actively block automated scraping, so a null result here is inconclusive, not evidence.
**Recommendation:** Manually check (a human browsing, not automated) whether AIMI appears on: KvK.nl company lookup, Detelefoongids.nl / Nationaledatabase.nl-style aggregators, and Clutch.co / Sortlist (agency-specific, both already surfaced as active category pages for competing NL web agencies during this session's informal search). This is a 15-30 minute manual task, not one that requires paid tooling.

## Data completeness summary

| Factor | Tier 0 source available? | Result this session |
|---|---|---|
| Domain-level PageRank / harmonic centrality | Yes (Common Crawl) | Not found in crawl — see Finding 1 |
| Referring domain count | No (needs Moz/DataForSEO) | Not available |
| Domain quality distribution | No (needs Moz/DataForSEO) | Not available |
| Anchor text naturalness | No (needs Moz/Bing/DataForSEO) | Not available |
| Toxic link ratio | No (needs Moz spam score/DataForSEO) | Not available |
| Link velocity trend | No (DataForSEO only) | Not available |
| Follow/nofollow ratio | No (needs Bing/DataForSEO) | Not available |
| Geographic relevance | No (needs Bing/DataForSEO) | Not available |
| Verified known backlinks | Tool available, no input list supplied | Not run — no candidate list provided |

## Recommendations, priority order

**Critical**
1. Do not chase a numeric backlink score improvement with more code work — this constraint is entirely outside the codebase (confirms prior manual audit's framing, cited for context only).

**High**
2. Compile client domain list and run `verify_backlinks.py` against it to check for existing/missing "website door AIMI" credits (Finding 3).
3. Add at least one more `sameAs` citation profile (LinkedIn minimum) as both a trust signal and a first real referring domain (Finding 2).

**Medium**
4. Manually check KvK-linked and agency directories (Clutch/Sortlist) for existing/missing listings (Finding 4).
5. Re-run `commoncrawl_graph.py aimi-development.nl --json` once next quarter's release lands, to track whether the domain starts appearing in-crawl over time (Finding 1).

## Limitations disclaimer

- Moz API and Bing Webmaster API are not configured — DA/PA, spam score, referring-domain counts, anchor text distribution, and follow/nofollow data are entirely unavailable this session. This affects every quantitative factor in the standard scoring model.
- No DataForSEO extension is installed, so no premium cross-validation was possible.
- No list of known/expected backlinks was supplied, so `verify_backlinks.py` was not run — this is a ready tool for a fast future check once a client-domain list exists (see Finding 3).
- The informal search-engine scraping used for Finding 4 is explicitly non-authoritative (bot-blocking makes null results inconclusive) and is not part of the tiered confidence methodology in this skill.
- Common Crawl web graphs are quarterly; the current release used is `cc-main-2026-jan-feb-mar` (source: https://commoncrawl.org/web-graphs). A "not found" result reflects that specific crawl cycle, not a permanent state.
