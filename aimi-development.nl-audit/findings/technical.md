# Technical SEO — aimi-development.nl

Live-site audit, 2026-09-06. Supersedes the code-based audit dated 2026-08-24 and
the prior findings snapshot dated 2026-09-04 — every claim below was re-verified
against live HTTP responses/HTML on 2026-09-06, not assumed from source or the
older doc.

**Score: 90/100**

Method: `sitemap_discovery.py` for sitemap validation; `render_page.py --mode auto`
(homepage, confirmed `is_spa: false`, no Playwright needed) plus direct `curl`
against the live site for headers, redirects, and HTML source. Sample pages
audited in full: homepage (`/`), `/tarieven`, two vertical pages
(`/website-laten-maken-kapsalon`, `/website-laten-maken-hovenier`), two city
pages (`/website-laten-maken-veendam`, `/website-laten-maken-groningen`). Spot
checks (http→https, www→apex, trailing slash, 404, robots.txt, sitemap.xml,
llms.txt, IndexNow key) were run against the live domain directly.

No Google PageSpeed Insights/CrUX credentials are configured in this
environment, so Core Web Vitals below are lab/source-signal inferences from
HTML and asset headers, not field data or a Lighthouse run — flagged
explicitly as a limitation, not presented as a full CWV audit.

## What works

- **robots.txt** (live-fetched, not just declared): AI crawlers explicitly
  allowed — `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`,
  `ClaudeBot`, `Google-Extended`, plus `Googlebot`/`Bingbot`; scrapers
  (`Bytespider`, `PetalBot`, `MJ12bot`) disallowed; `/portal`, `/admin`,
  `/account`, `/server`, `/api/`, `/track.js` disallowed; `/login` deliberately
  left crawlable (comment explains this is so Google can read its noindex);
  `Sitemap:` line present and correct.
- **Sitemap**: `sitemap_discovery.py --json` confirms discovery via the
  robots.txt declaration, HTTP 200, `valid: true`, `kind: urlset`. Manual fetch
  confirms 48 `<loc>` entries, all in canonical (https, apex, no trailing
  slash) form, matching the 48-page inventory in the task brief.
- **Canonicals**: self-referencing and correct on all 6 sampled pages
  (`https://aimi-development.nl/`, `/tarieven`, `/website-laten-maken-kapsalon`,
  `/website-laten-maken-hovenier`, `/website-laten-maken-veendam`,
  `/website-laten-maken-groningen`).
- **Redirects**: `http://aimi-development.nl/` → 301 → `https://aimi-development.nl/`;
  `https://www.aimi-development.nl/` → 301 → `https://aimi-development.nl/`;
  `http://www.aimi-development.nl/` chains through 2 hops
  (http→https-www→apex) to the final canonical URL — no loop, no excess hops.
  `/tarieven/` (trailing slash) → 301 → `/tarieven`. Unknown path
  (`/this-page-does-not-exist-xyz`) returns a true `404`, not a soft-404.
- **Security headers** (live `curl -D-` on `/`): `content-security-policy`,
  `strict-transport-security: max-age=31536000; includeSubDomains`,
  `x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN`,
  `referrer-policy: strict-origin-when-cross-origin`,
  `permissions-policy: geolocation=(), microphone=(), camera=()`. Confirms the
  server.ts claim in the older code audit, with two caveats noted below
  (duplicate emission, `unsafe-inline` in CSP).
- **Previously-flagged issues from the 2026-09-04 findings snapshot are now
  fixed, verified live today:**
  - Asset compression: `curl -H "Accept-Encoding: gzip"` on
    `/assets/index-CxzhDqWp.js`, `/assets/styles-DdbuqqY2.css` and
    `/fonts/plus-jakarta-sans-latin-wght-normal.woff2` all now return
    `Content-Encoding: gzip` (previously served fully uncompressed — was
    Critical).
  - Font/image caching: the font and the hero webp
    (`/assets/hero-forest-1280-DAG1AbCS.webp`) now return
    `Cache-Control: public, max-age=31536000, immutable` (previously had no
    caching header at all — was High).
  - IndexNow key file: `https://aimi-development.nl/b03bb73bce86422c6a74b3cfc829f2dd.txt`
    now returns `200` with body `b03bb73bce86422c6a74b3cfc829f2dd`, matching
    `scripts/indexnow-submit.mjs` (route was added in commit `d38d9ab`,
    previously 404 — was High). **Not verified**: whether the submission
    script is actually invoked on publish (CI hook / cron) — that's a process
    check outside the scope of a live-site fetch.
- **Structured data**: page-type-aware and comprehensive. Sitewide
  `Organization`/`ProfessionalService` + `WebSite`. `/tarieven` adds
  `OfferCatalog`/`Offer` with real prices and `FAQPage`. City pages
  (Veendam, Groningen) add `LocalBusiness` with `PostalAddress`/`GeoCoordinates`.
  Vertical pages (kapsalon, hovenier) add `Service`. All sampled pages also
  carry `BreadcrumbList` and `FAQPage`. No validation errors observed in the
  raw JSON (well-formed, consistent `@id` usage linking `Organization` across
  page types).
- **SSR/crawlability**: `render_page.py` reports `is_spa: false` for the
  homepage, and a plain `curl` (no JS execution) returns the full page text
  (`extracted_text` matches what a browser would render) — content is not
  gated behind client-side rendering. Good for both classic crawlers and AI
  answer engines that don't execute JS.
- **Content differentiation**: measured textual similarity (Python
  `difflib.SequenceMatcher` on stripped body text) between same-type
  templated pages: Veendam vs. Groningen ≈ 35%, kapsalon vs. hovenier ≈ 30%.
  The rest is unique per-page copy (local context, FAQ answers, service
  framing). Word counts ~1,100–1,250 per page. No thin-content or
  near-duplicate risk found in the sample.
- **Mobile viewport**: `<meta name="viewport" content="width=device-width,
  initial-scale=1"/>` present on all sampled pages, zoom not disabled (no
  `maximum-scale`/`user-scalable=no`).
- **Fonts**: single variable-weight woff2 (`Plus Jakarta Sans`, weight range
  200–800) with `font-display: swap` in the CSS — avoids extra per-weight font
  requests and minimizes FOIT risk.
- **LCP resource**: the hero image uses a responsive `srcset`/`sizes`, `webp`
  format, `fetchPriority="high"`, is `<link rel="preload">`'d, and has explicit
  `width="1920" height="1255"` — correct practice for both LCP and CLS.
- **llms.txt**: present at `/llms.txt` (200), well-structured with page
  descriptions grouped by section (core pages, "webdesign per regio" hub with
  links to all city pages). Not a core scoring category but a genuine
  agent-UX asset worth keeping current as pages change.
- **Titles/descriptions**: unique per sampled page, reasonable lengths (e.g.
  homepage title ~58 chars, description ~152 chars; vertical/city pages
  40–75 chars titles), no `meta name="robots"` present anywhere sampled
  (correct default index/follow, no accidental noindex found).
- **hreflang**: not applicable — single-locale site (`nl_NL`), no
  alternate-language versions exist, so no hreflang implementation is
  expected or missing.

## Findings

### TECH-1 — CSP allows `'unsafe-inline'` for `script-src` and `style-src` (Medium)

Live CSP header on `/`:
```
content-security-policy: default-src 'self'; img-src 'self' data: https://*.supabase.co;
connect-src 'self' https://*.supabase.co https://calendly.com; style-src 'self' 'unsafe-inline';
script-src 'self' 'unsafe-inline' https://assets.calendly.com; frame-src 'self' https://calendly.com;
font-src 'self'; frame-ancestors 'self'; base-uri 'self'; object-src 'none'
```
`'unsafe-inline'` on both `script-src` and `style-src` removes CSP's main
protection against injected inline script/style execution — if an inline
script is ever injected (compromised dependency, reflected input, third-party
tag), the CSP will not block it. The rest of the policy (`object-src 'none'`,
`base-uri 'self'`, `frame-ancestors 'self'`) is solid, which makes this the
one meaningful gap.

**Recommendation**: move any inline `<style>`/`<script>` to external files, or
switch to a nonce-based CSP (generate a per-response `nonce-{random}` in
`server.ts` and apply it to the few inline tags that remain, e.g. structured
data `<script type="application/ld+json">` — note: JSON-LD script blocks do
not need `'unsafe-inline'` since they're not executed, only inline
*executable* `<script>`/`<style>` tags need the nonce). Drop `'unsafe-inline'`
once nonces are in place.

### TECH-2 — Homepage eagerly `modulepreload`s ~21 JS chunks, including non-critical ones (Medium — Core Web Vitals risk)

The homepage `<head>` fires 21 `<link rel="modulepreload">` tags at high
fetch priority, competing with the LCP image and font for bandwidth on the
critical path. Several are not needed for first paint or even first
interaction on a page whose primary job is to render hero content:
`Contact-B2LhGYg3.js`, `Footer-BB8uYLHM.js`, `contact.functions-Df-PP1OP.js`,
`auth-middleware-BxmmoFAN.js`, `calendar-5Yl3ivCd.js`, `mail-DyXXUlUJ.js`,
`send-CjJ7l3aR.js`.

Measured gzip sizes (`curl -H "Accept-Encoding: gzip"`, actual wire bytes):

| Asset | gzip size |
|---|---|
| `index-CxzhDqWp.js` | 249,717 B |
| `motion-Bp-EBsJ0.js` | 41,531 B |
| `radix-Ehmlw_UZ.js` | 18,267 B |
| `styles-DdbuqqY2.css` | 18,011 B |
| `utils-DZiiT1zZ.js` | 8,962 B |
| `index-DoZ3MidG.js` | 4,971 B |
| `CookieBanner-BfP0EHBy.js` | 3,819 B |
| `Contact-B2LhGYg3.js` | 2,413 B |
| `Services-R5olLsou.js` | 1,955 B |
| `auth-middleware-BxmmoFAN.js` | 1,879 B |
| `Footer-BB8uYLHM.js` | 1,666 B |

Core chunks alone total ~325 KB gzip (~950 KB uncompressed per the
`Content-Length: 883060` seen on `index-CxzhDqWp.js` without
`Accept-Encoding`). The page is server-rendered (`is_spa: false`, content is
present without JS), but it still fully hydrates client-side, so this JS has
to be fetched, parsed and executed regardless. Preloading it all eagerly at
high priority is a plausible contributor to LCP delay (network contention)
and INP degradation (main-thread work during/after hydration) on mid/low-end
mobile — this is an inference from source inspection, not a measured lab
score (no PageSpeed/Lighthouse credentials available in this environment).

**Recommendation**: restrict `modulepreload` to chunks required for first
paint/first interaction; route-split or defer `Contact`, `Footer`, `calendar`,
`mail`, `auth-middleware`, `send` so they load on scroll-into-view or user
interaction instead of eagerly with every page load. Re-measure with
Lighthouse/PSI once API credentials are available to confirm actual LCP/INP
field impact.

### TECH-3 — Security headers duplicated on HTML responses (Low)

`curl -D- https://aimi-development.nl/` shows four headers emitted **twice**
each, once lowercase and once Title-Case, with identical values:
```
x-frame-options: SAMEORIGIN
X-Frame-Options: SAMEORIGIN
x-content-type-options: nosniff
X-Content-Type-Options: nosniff
referrer-policy: strict-origin-when-cross-origin
Referrer-Policy: strict-origin-when-cross-origin
strict-transport-security: max-age=31536000; includeSubDomains
Strict-Transport-Security: max-age=31536000; includeSubDomains
```
`content-security-policy` and `permissions-policy` are **not** duplicated,
which points at nginx re-adding a legacy subset of headers that the
Node/TanStack Start app (`server.ts`) already sets. Not currently harmful
since the values agree, but it's redundant bytes on every response and a
config-drift risk if the two layers are ever edited independently and fall
out of sync.

**Recommendation**: set these 4 headers in exactly one layer (either
`server.ts` or the nginx vhost, not both).

### TECH-4 — Duplicate `Cache-Control` header on JS/CSS assets, unchanged from prior audit (Low)

Still present as of 2026-09-06 (confirmed via `curl -D-`):
```
Cache-Control: max-age=31536000
Cache-Control: public, immutable
```
on `/assets/index-CxzhDqWp.js` and `/assets/styles-DdbuqqY2.css` — an nginx
`expires`/`add_header` pair both firing. Note this is scoped to the JS/CSS
location block only: the font and hero webp checked in this pass return a
single, correctly-combined header (`public, max-age=31536000, immutable`), so
the fix applied to fonts/images was not also applied to the JS/CSS rule.

**Recommendation**: consolidate into one `add_header Cache-Control "public,
max-age=31536000, immutable";` in the JS/CSS location block, matching what's
already correct for fonts/images.

### TECH-5 — Sitemap `lastmod` still looks batch/deploy-driven, not content-driven (Low, improved since 2026-09-04)

Current `sitemap.xml` `lastmod` distribution across the 48 URLs:

| Date | Count |
|---|---|
| 2026-08-21 | 20 |
| 2026-09-04 | 13 |
| 2026-08-20 | 7 |
| 2026-08-22 | 7 |
| 2026-09-03 | 1 |

This is better than the 2026-09-04 snapshot (which had 47/48 URLs on the same
handful of dates with effectively one outlier), but the large identical
clusters (20 URLs sharing one exact date, 13 sharing another) still look like
deploy/build timestamps rather than genuine per-page content-change tracking.
Google is known to distrust `lastmod` values that don't correlate with real
changes, which reduces its usefulness as a recrawl signal over time.

**Recommendation**: derive `lastmod` from actual content/CMS modification
timestamps per route, or omit the field entirely if that data isn't reliably
tracked (Google ignores `changefreq`/`priority` already, correctly absent
here).

### TECH-6 — Server header discloses exact nginx version and OS (Low, informational)

`Server: nginx/1.28.3 (Ubuntu)` is sent on every response. Minor information
disclosure — makes it trivial to check the exact nginx version against known
CVEs.

**Recommendation**: add `server_tokens off;` to the nginx config.

## Explicitly out of scope / not verified in this pass

- No PageSpeed Insights/CrUX API credentials configured — all Core Web Vitals
  commentary above is inferred from source/asset inspection (sizes, headers,
  preload strategy), not measured field or lab scores. Recommend running
  Lighthouse/PSI manually once credentials are available to confirm TECH-2's
  actual LCP/INP impact.
- Only 6 of 48 pages were fetched and parsed in full; the remaining 42 were
  spot-checked only via the sitemap.xml URL list and status-code samples
  (`tarieven`, 2 vertical, 2 city, homepage, plus http/https/www/trailing-slash/404
  probes). Full per-URL canonical/redirect verification across all 48 pages
  was not re-run in this session — the 2026-09-04 snapshot recorded 48/48
  canonicals correct and 48/48 returning 200, and nothing observed in this
  session's sample contradicts that.
- Whether `scripts/indexnow-submit.mjs` is actually triggered on content
  publish (CI hook, cron, or manual) was not verified — only that the
  verification key file itself now resolves correctly.
- Detailed hreflang validation is not applicable here (single-locale site);
  deferred to the `seo-hreflang` sub-skill for any future multi-locale work.
