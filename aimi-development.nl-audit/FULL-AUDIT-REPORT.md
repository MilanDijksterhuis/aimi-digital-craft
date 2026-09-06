# Full SEO Audit — aimi-development.nl

**Date:** 2026-09-04 (herzien na doorvoeren fixes)
**Pages crawled:** 48 / 48 in sitemap (100%)
**Business type:** Service Area Business — web agency, Veendam (GR), serving Noord-Nederland + NL
**Previous audit:** 2026-09-02

---

## SEO Health Score: 82 / 100

> **Herzien 2026-09-04.** De code-fixes zijn doorgevoerd (score 79 → 82) en vier
> findings zijn ingetrokken na verificatie tegen de broncode. Zie
> **[WAT-IK-AL-DEED.md](WAT-IK-AL-DEED.md)** voor de wijzigingen en correcties, en
> **[JOUW-TAKEN.md](JOUW-TAKEN.md)** voor wat er nog van de eigenaar moet komen.
>
> Ingetrokken: OP-4 (dubbele encoding — fout in de crawler van deze audit),
> IMG-1 en PERF-5 (lazy loading — er is één afbeelding, de LCP-hero),
> IMG-4 (lege alt — correct decoratief gebruik).
> Afgezwakt: PERF-3 (de homepage gebruikt die chunks echt) en GEO-2
> (`founder`-entiteiten bestaan al).

| Categorie | Weging | Was | Nu |
|---|---|---|---|
| Technical SEO | 22% | 78 | 78 |
| Content Quality | 23% | 76 | **78** |
| On-Page SEO | 20% | 90 | **96** |
| Schema / Structured Data | 10% | 82 | **86** |
| Performance (CWV) | 10% | 58 | 58 |
| AI Search Readiness | 10% | 80 | **84** |
| Images | 5% | 85 | **95** |
| **Totaal** | | **79** | **82** |

Technical en Performance blijven staan tot de nginx-wijziging live is — dat is
taak 1 en 2 in [JOUW-TAKEN.md](JOUW-TAKEN.md) en brengt de score naar ongeveer 87.

---

## Executive summary

This is a **well-built site**. The technical fundamentals are close to flawless in a way that is genuinely rare: 48/48 pages carry correct self-referencing canonicals, exactly one `<h1>`, `lang="nl"`, a viewport, complete Open Graph and Twitter tags. There are no duplicate titles, no duplicate descriptions, no missing descriptions, no accidental `noindex`, no redirect chains, no broken pages, and no orphans. The security header set — CSP with `object-src 'none'`, HSTS, Permissions-Policy — is better configured than most commercial sites.

The programmatic pages are the standout. Thirty city and branch pages average over 1,000 words each with only **7.7% heading overlap** between cities, and **249 unique FAQ questions** across the site. That is real writing at scale, not a find-and-replace template — the failure mode that sinks most location-page strategies is simply not present here. The schema work shows the same care: stable `@id` entities, `parentOrganization` linking, and — notably — a refusal to fabricate a `PostalAddress` for the 14 cities where there is no office.

So the score is not held back by sloppiness. It is held back by **three specific things**, and two of them are not code problems at all.

**First, a server misconfiguration is wasting most of the site's speed advantage.** nginx serves every `/assets/*.js` and `*.css` file **completely uncompressed**. The main bundle ships **881 KB where 248 KB would do**. Across the homepage that is roughly **1.2 MB transferred instead of ~330 KB** — about 870 KB wasted on every uncached visit. The server itself is fast (46 ms median TTFB) and the LCP image and font are properly preloaded; all that work is then undone at the transfer layer. One nginx directive recovers it, with no code change and no regression risk.

**Second, the site has no KvK or BTW number anywhere.** Zero hits across 48 pages. For a Dutch business this is a legal requirement under the Handelsregisterwet, not merely an SEO nicety — and it is simultaneously the cheapest trust signal available. The related gap: no postal address is visible anywhere on-page (it exists only inside Veendam's JSON-LD), and the primary `ProfessionalService` entity — a `LocalBusiness` subtype — declares no `address` at all.

**Third, the site sells websites but never shows one.** There is no portfolio, no case study, no before/after, and review language appears on exactly one page in 48. There is no `aggregateRating` because there are no reviews to mark up. For a web agency this is the central conversion gap, and reviews are also among the strongest map-pack ranking factors — so it costs rankings and conversions at the same time.

One structural note worth flagging: **every page links to every other page** (48 inbound links each, 49 outbound). Navigation and footer expose the whole site everywhere, so internal link equity is distributed perfectly evenly — which means it communicates no hierarchy. `/tarieven` receives exactly as much internal support as `/algemene-voorwaarden`.

### Top 5 critical & high-priority issues

1. **Static assets served uncompressed** — 881 KB main bundle vs 248 KB gzipped; ~870 KB wasted per visit *(Critical, server config)*
2. **No KvK / BTW number on the site** — legal requirement + primary trust signal *(High)*
3. **No portfolio, case studies or reviews** — the core proof gap for an agency *(High)*
4. **IndexNow key file 404s** — the whole IndexNow setup is inert; route is written but undeployed *(High)*
5. **Fonts and the LCP hero image have no `Cache-Control`** — re-fetched on every repeat visit *(High)*

### Top 5 quick wins

1. **Enable gzip/brotli for JS+CSS in nginx** — one directive, ~870 KB saved per visit, 15 minutes
2. **Deploy the IndexNow route** — already written locally, just needs committing and deploying
3. **Add `Cache-Control` for `woff2` and `webp`** — same nginx block as #1
4. **Add KvK + BTW + postal address to the footer** — one component, fixes a legal gap and appears on all 48 pages
5. **Shorten 4 over-length titles** — `/seo` (70 chars), `/`, `/tarieven`, `/website-laten-vernieuwen`

---

## Category detail

Full findings per category are in [`findings/`](findings/):

| File | Covers |
|---|---|
| [technical.md](findings/technical.md) | Compression, caching, IndexNow, redirects, security headers |
| [content.md](findings/content.md) | E-E-A-T, KvK/BTW, authorship, duplication analysis |
| [onpage.md](findings/onpage.md) | Titles, descriptions, canonicals, headings |
| [schema.md](findings/schema.md) | Entity graph, LocalBusiness modelling, coverage |
| [performance.md](findings/performance.md) | Bundle size, modulepreload, LCP path |
| [geo.md](findings/geo.md) | llms.txt, AI crawlers, citability |
| [images.md](findings/images.md) | Alt text, dimensions, formats, lazy loading |
| [sitemap.md](findings/sitemap.md) | Sitemap validity, internal link architecture |
| [local.md](findings/local.md) | NAP, SAB modelling, citations, reviews |
| [sxo.md](findings/sxo.md) | Intent match, proof, conversion path |
| [backlinks.md](findings/backlinks.md) | Authority signals (no API credentials — unscored) |

---

## What was verified

- 48/48 sitemap URLs fetched and parsed (titles, meta, canonicals, headings, JSON-LD, images, links, TTFB, transfer size)
- robots.txt, llms.txt, sitemap.xml, IndexNow key file, favicon, og-image
- Response headers for HTML, JS, CSS, WebP and WOFF2
- `www`/`http` redirect behaviour and 404 handling
- Compression measured by re-compressing the live bundle locally
- Pairwise content-similarity and heading-overlap analysis across the 30 programmatic pages
- Full internal link graph (inbound/outbound per URL)

## Limitations

- **No field data.** No Google Search Console, CrUX or GA4 credentials configured — CWV figures are lab/transfer-level, not real-user.
- **No backlink data.** No Moz, Bing Webmaster or DataForSEO credentials — the authority category is unscored.
- **No GBP data.** Google Business Profile completeness, review velocity and geo-grid rank were not directly measurable.
- **Live site audited.** The working tree has uncommitted changes (`seo.ts`, `server.ts`, `og-image.png`, the IndexNow route) not yet reflected on the live site.
