# Technical SEO Audit — aimi-development.nl

Date: 2026-09-02
Method: Live crawl of all 47 sitemap URLs (`curl`/headers + HTML parse), `sitemap_discovery.py`, `render_page.py` (Playwright/trafilatura SPA check), ALPN probe for HTTP/2, direct asset-header inspection. No Google API/PageSpeed/CrUX credentials available — CWV are inferred from source/header inspection, not real field/lab metrics (explicit limitation, not a pass/fail).

## Summary

The site (TanStack Start SSR, served via nginx) has a very clean crawlability/indexability/security foundation: all 47 sitemap URLs return clean 200s with unique titles, descriptions, single self-referencing canonicals, one H1, and valid JSON-LD; redirects, custom 404, and `/login` noindex all behave correctly; content is confirmed true SSR (no JS required to read it). The main gap found in this pass that the prior manual code-read audit did not catch is at the **infrastructure/nginx layer**: static JS/CSS bundles are served completely uncompressed (~1MB of JS+CSS with zero gzip/brotli, while HTML documents ARE gzip-compressed), and the server only negotiates HTTP/1.1 (no HTTP/2/ALPN h2), which compounds the impact of ~20 modulepreloaded JS chunks competing over a handful of connections. This is a real, fixable Core Web Vitals risk despite the excellent LCP-image handling praised in the 2026-08-24 code audit.

## Category Scores

| Category | Status | Notes |
|---|---|---|
| Crawlability | Pass | robots.txt + single valid sitemap.xml (47 URLs), all return 200, no accidental crawl of disallowed `/portal /admin /account /server /api/` |
| Indexability | Pass | Unique canonical/title/meta description per URL across all 47; `/login` correctly noindexed while crawlable; 404 returns true 404 + `X-Robots-Tag: noindex` |
| Security | Pass (minor) | CSP/HSTS/X-Frame-Options/X-Content-Type-Options/Referrer-Policy/Permissions-Policy all present; duplicate header emission is a hygiene issue |
| URL Structure | Pass (minor) | HTTPS/www/trailing-slash consolidation all single 301s except the compound http+www case (2 hops) |
| Mobile | Pass | Correct viewport meta confirmed live; deeper touch-target/media-query audit not completed in this pass (time-boxed) |
| Core Web Vitals | **At risk** | No compression on static assets + no HTTP/2 — real download-weight and connection-contention risk despite good LCP-image setup |
| Structured Data | Pass (minor) | Valid, parseable JSON-LD on every sampled page; homepage still missing FAQPage schema (open item from prior audit) |
| JS Rendering | Pass | Confirmed SSR — `render_page.py` reports `is_spa: false` and extracts full text from raw HTML, no Playwright render needed |
| IndexNow | Not verified | Not tested in this pass (time-boxed); no evidence gathered either way |

**Overall Technical Score: 79/100** — strong crawlability/indexability/security/structured-data foundation, held back mainly by the uncompressed-assets + no-HTTP/2 combination, which is a genuine field-performance risk on every single page load, plus a few small unresolved hygiene items.

## What Works

- All 47 sitemap URLs return HTTP 200 with zero redirects, a single self-referencing `<link rel="canonical">`, a unique `<title>`, a unique non-empty meta description, and exactly one `<h1>` — verified by crawling every URL, not a sample (`report.tsv` in scratchpad; e.g. `https://aimi-development.nl/website-laten-maken-kapsalon` → canonical `https://aimi-development.nl/website-laten-maken-kapsalon`).
- Redirect consolidation works correctly for the common cases: `http://aimi-development.nl/` → `https://aimi-development.nl/` (301, 1 hop), `https://www.aimi-development.nl/` → `https://aimi-development.nl/` (301, 1 hop), `https://aimi-development.nl/tarieven/` → `https://aimi-development.nl/tarieven` (301, trailing-slash strip).
- Custom 404 handling is correct: `https://aimi-development.nl/this-page-does-not-exist-xyz123` returns real HTTP 404, a branded "Pagina niet gevonden" page, and an `X-Robots-Tag: noindex` header — no soft-404.
- `https://aimi-development.nl/login` returns HTTP 200 with `<meta name="robots" content="noindex"/>` while remaining crawlable, consistent with the robots.txt policy noted in the brief.
- Confirmed true server-side rendering on the live site: `render_page.py --mode auto --json` on `https://aimi-development.nl/website-laten-maken-groningen` reports `is_spa: false` and extracts 4,191 characters of body text directly from the raw HTML — no client-side JS execution is required to read or index page content.
- Valid JSON-LD on every sampled page (home, `/tarieven`, `/website-laten-maken-groningen`, `/website-laten-maken-kapsalon`): `Organization`/`ProfessionalService`, `WebSite`, `Service`, `BreadcrumbList`, plus `OfferCatalog` and `FAQPage` on `/tarieven` — all parse cleanly as JSON and `BreadcrumbList.itemListElement[].item` values are correct absolute URLs matching real pages.
- No mixed content found: zero `http://` resource references in the homepage HTML (only the inert `http://www.w3.org/2000/svg` XML namespace string, not a network fetch).
- Security headers (CSP, HSTS `max-age=31536000; includeSubDomains`, X-Frame-Options `SAMEORIGIN`, X-Content-Type-Options `nosniff`, Referrer-Policy `strict-origin-when-cross-origin`, Permissions-Policy) all confirmed present on the live response via `curl -I https://aimi-development.nl/`, matching the prior audit.
- Viewport (`width=device-width, initial-scale=1`), `lang="nl"`, and full Open Graph + Twitter Card tags with a dedicated 1200x630 `og-image.png` are present on the homepage.
- 46 of 47 pages have substantive, unique meta descriptions with no duplicates found across the full crawl.

## Findings

### High — Static JS/CSS assets served with no compression at all
**Description:** Every hashed `/assets/*.js` and `/assets/*.css` file is served completely uncompressed, even though the client sends `Accept-Encoding: gzip, deflate, br`. Confirmed via `curl -D - -H "Accept-Encoding: gzip, deflate, br" https://aimi-development.nl/assets/index-DGtTsYam.js` → `Content-Length: 711344`, no `Content-Encoding` header at all. Same for `https://aimi-development.nl/assets/styles-C5OV8pjV.css` (105,832 bytes, uncompressed). By contrast, the HTML document itself IS compressed (`curl -I https://aimi-development.nl/` → `Content-Encoding: gzip`), so this is specifically an nginx config gap for the static-asset location block, not a general server limitation. Summing the ~20 JS chunks the homepage `modulepreload`s (`index-DGtTsYam.js`, `motion-Bp-EBsJ0.js`, `radix-Ehmlw_UZ.js`, etc.) gives ~948 KB of JS plus ~105 KB of CSS = **~1.05 MB transferred uncompressed** on first visit to the homepage alone. With gzip/brotli this would typically drop to ~250-300 KB.
**Recommendation:** Enable gzip (and ideally brotli, since curl advertised `br` support) for `application/javascript`, `text/css`, and related MIME types on the nginx location block serving `/assets/` — either via `gzip on; gzip_types application/javascript text/css;` (and `brotli`/`brotli_static` if the module is available), or by having the Vite/TanStack Start build emit `.gz`/`.br` sidecar files and serving them with `gzip_static on;`. This is a config-only fix with no code changes required and will materially reduce page weight and improve INP/LCP on every page.

### High — No HTTP/2 support (ALPN negotiates HTTP/1.1 only)
**Description:** A raw TLS handshake with ALPN protocols `['h2', 'http/1.1']` against `aimi-development.nl:443` negotiates `http/1.1` — the server does not offer HTTP/2. `curl -I` responses also all show `HTTP/1.1`. This matters more than usual here because the homepage ships ~20 separate `<link rel="modulepreload">` JS chunks plus one CSS file, one preloaded font, and the preloaded LCP image — all competing for the ~6 concurrent connections browsers open per origin on HTTP/1.1, versus effectively unlimited multiplexed streams on HTTP/2. Combined with the uncompressed-assets finding above, this doubles down on first-load latency risk for LCP and script-parsing-driven INP delays, especially on the 3G/4G mobile connections implied by the "vanaf € 499" small-business target audience.
**Recommendation:** Enable HTTP/2 (or HTTP/3/QUIC) in the nginx `listen 443 ssl` directive (`listen 443 ssl http2;` on nginx <1.25, or the newer `http2 on;` directive syntax on 1.25+/1.28). This is a one-line nginx config change and no application code changes are needed.

### Medium — Homepage still missing FAQPage structured data
**Description:** The homepage renders a full FAQ component with 25 questions, but the only JSON-LD blocks present on `https://aimi-development.nl/` are `Organization`/`ProfessionalService` and `WebSite` (confirmed by parsing all `<script type="application/ld+json">` blocks in the live HTML — 2 blocks, neither is `FAQPage`). `/tarieven` does correctly ship a `FAQPage` block (5 JSON-LD blocks including `FAQPage`), proving the helper function exists and works elsewhere in the codebase — it's just not wired up on the homepage. This is the same open item (`T-1`) flagged in the prior 2026-08-24 code-read audit (`C:\Users\milan\Documents\AIMI\aimi-digital-craft\SEO-AUDIT.md`), confirmed still unresolved on the live site as of this crawl.
**Recommendation:** Wire the existing `faqJsonLd()` helper and the homepage's FAQ item list into `head().scripts` for the homepage route, matching the pattern already used on `/tarieven`.

### Medium — Duplicate/redundant HTTP response headers on every page
**Description:** `curl -I https://aimi-development.nl/` shows several security/cache headers sent twice per response: `x-frame-options`/`X-Frame-Options`, `x-content-type-options`/`X-Content-Type-Options`, `referrer-policy`/`Referrer-Policy`, and `strict-transport-security`/`Strict-Transport-Security` (once lowercase, once mixed-case), plus `Cache-Control: max-age=31536000` and `Cache-Control: public, immutable` sent as two separate header lines instead of one on hashed assets (confirmed on `https://aimi-development.nl/assets/index-DGtTsYam.js`). This is functionally harmless in most clients (values are consistent, not conflicting) but indicates the header is being set at two layers (likely both an nginx `add_header` directive and the application/server middleware), which is fragile — if the two layers ever diverge, it becomes a real bug, and some strict proxies/security scanners flag duplicate headers as a smell.
**Recommendation:** Set each header in exactly one place (either nginx `add_header` globally, or in `src/server.ts`, not both) and merge the two `Cache-Control` directives into a single header value (`Cache-Control: public, max-age=31536000, immutable`).

### Medium — http+www entry point requires 2 redirect hops
**Description:** `http://www.aimi-development.nl/` → 301 → `https://www.aimi-development.nl/` → 301 → `https://aimi-development.nl/` (confirmed via sequential `curl -D -` on each hop). All other entry points (`https://www...`, `http://aimi-development.nl/`) resolve to the canonical URL in a single 301 hop; only the `http://www...` combination chains two redirects.
**Recommendation:** Add a single nginx `server` block (or rewrite rule) that sends any request with `Host: www.aimi-development.nl` on port 80 straight to `https://aimi-development.nl$request_uri` in one 301, rather than falling through the existing http→https redirect first.

### Low — Thin meta descriptions on two legal pages
**Description:** `/privacybeleid` ("Lees hoe AIMI omgaat met jouw persoonsgegevens.", 47 chars) and `/algemene-voorwaarden` ("De algemene voorwaarden van AIMI.", 33 chars) have meta descriptions well under the ~120-155 character range that typically fills the SERP snippet; all other 45 sitemap URLs have descriptions in a reasonable range with no duplicates found.
**Recommendation:** Low priority given these are non-commercial legal pages, but a 1-2 sentence expansion would avoid Google auto-generating a snippet from page body text instead.

### Info — Limitations of this pass
- No Google PageSpeed Insights / CrUX API credentials were available, so LCP/INP/CLS are not measured with real lab or field data in this report — findings above are inferred from response headers, asset sizes, and markup, per the brief's stated constraint.
- IndexNow protocol support was not tested in this pass (time-boxed per coordinator instruction) — neither a pass nor a fail, simply not verified.
- Mobile touch-target sizing and a full CSS media-query sweep were not completed in this pass (time-boxed); the viewport meta tag and responsive grid patterns cited in the prior code audit were spot-checked and confirmed present on the homepage only.
- hreflang was not applicable/found (single-locale `nl` site) — no cross-skill hreflang delegation was needed.
