# Technical SEO — aimi-development.nl

Full live-site audit, 2026-09-15. Supersedes the 2026-09-06 snapshot. That
snapshot sampled 6 of 48 pages in full; this pass uses the complete 48-page
pre-crawl (`crawl-data.json`) for site-wide checks (canonicals, titles,
headers, structured data, images, TTFB) plus fresh live `curl` probes for
everything that requires a real HTTP round-trip (redirects, 404 handling,
robots.txt, sitemap.xml, IndexNow key, case-sensitivity, CSP/header
duplication, asset caching). `sitemap_discovery.py --json` used for sitemap
discovery/validation. No Google PageSpeed Insights/CrUX credentials are
configured in this environment — Core Web Vitals below are lab/source-signal
inferences from HTML, headers and asset sizes, not field data or a Lighthouse
run. This is flagged explicitly as a scope limit, not presented as a
measured CWV score.

**Score: 90/100**

## What works well

- **Crawlability / robots.txt** (live-fetched): `Allow: /` by default;
  `/portal`, `/admin`, `/account`, `/server`, `/api/`, `/track.js`
  disallowed; `/login` deliberately left crawlable (comment: so Google can
  read its noindex meta) — verified live, `/login` returns `200` with
  `<meta name="robots" content="noindex"/>` and a self-referencing canonical.
  `/portal` also returns `200` with `noindex` (and is additionally blocked
  from crawling by `Disallow: /portal`, so it gets neither crawled nor
  indexed — correct belt-and-suspenders handling). AI crawlers explicitly
  allowed (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`,
  `ClaudeBot`, `Google-Extended`), scrapers blocked (`Bytespider`,
  `PetalBot`, `MJ12bot`). `Sitemap:` line present and correct.
- **Sitemap**: `sitemap_discovery.py --json` confirms discovery via the
  robots.txt declaration (not a stale/fallback path), `HTTP 200`,
  `valid: true`, `kind: urlset`. 48 `<loc>` entries, all canonical
  (https, apex, no trailing slash) form, matching the 48-page inventory.
  Zero sitemap URLs match any disallowed path prefix. All `lastmod` values
  are plausible (none in the future, range 2026-08-20 to 2026-09-04).
- **Canonicals**: verified across all 48 pages via `crawl-data.json` —
  0 mismatches between `canonical` and page `url` (upgraded from the prior
  audit's 6-page sample to a full site check).
- **Redirect hygiene**: `http://` → `https://` apex, 301; `https://www.` →
  `https://` apex, 301 (single hop); `http://www.` chains 2 hops
  (http→https-www→apex) to the same final URL — functional, no loop, but
  see TECH-7 below (one avoidable extra hop). Trailing-slash URLs
  (`/contact/`, `/website-laten-maken/`) 301 to the canonical no-slash form.
  `/index.html` correctly 404s rather than serving duplicate content at a
  second URL.
- **404 handling**: unknown path (`/this-page-does-not-exist-xyz123`)
  returns a true HTTP `404` (not a soft-404) with a proper Dutch
  "Pagina niet gevonden — AIMI" branded error page, full meta/OG tags,
  same layout/CSS as the rest of the site.
- **Security headers** (live `curl -D-`): `content-security-policy`,
  `strict-transport-security: max-age=31536000; includeSubDomains`,
  `x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN`,
  `referrer-policy: strict-origin-when-cross-origin`,
  `permissions-policy: geolocation=(), microphone=(), camera=()` present on
  100% of 48 crawled pages (`crawl-data.json` header-presence check: 0
  pages missing any of these). No `Server`-header tech-stack leak beyond
  nginx version/OS (see TECH-6), no `X-Powered-By` leak.
- **IndexNow**: key file `https://aimi-development.nl/b03bb73bce86422c6a74b3cfc829f2dd.txt`
  live-verified, returns `200`, body = `b03bb73bce86422c6a74b3cfc829f2dd`,
  matching `INDEXNOW_KEY` in `scripts/indexnow-submit.mjs`. **Newly
  confirmed this session** (open item in the prior audit): `scripts/deploy.sh`
  line 42 runs `node scripts/indexnow-submit.mjs || true` on every deploy —
  the submit call is wired into the actual publish pipeline, non-blocking on
  failure, and fetches the live sitemap.xml at submit time (not a stale
  URL list). This is a complete IndexNow implementation.
- **Case-sensitivity handling**: `/CONTACT` and `/Contact` both resolve
  `200` (framework routing is case-insensitive) but both carry
  `<link rel="canonical" href="https://aimi-development.nl/contact"/>` —
  Google will consolidate signals to the lowercase canonical URL rather than
  treating these as separate duplicate pages. Not best practice (a 301 to
  the canonical case would be cleaner — see TECH-8) but the safety net
  works.
- **Structured data**: valid, well-formed JSON-LD sitewide (spot-checked
  homepage's 3 `<script type="application/ld+json">` blocks — all parse
  clean). Page-type-aware coverage across 48 pages: `Organization` +
  `ProfessionalService` + `WebSite` on all 48; `BreadcrumbList` on 45;
  `Service` on 39; `FAQPage` on 36; plus `LocalBusiness`, `OfferCatalog`,
  `Article`, `ContactPage`, `ItemList` on relevant pages. No page has zero
  structured data.
- **SSR/crawlability**: a plain `curl` (no JS execution) returns full body
  text matching what a browser renders (homepage: ~1,977 words in raw HTML,
  matches `word_count` in the pre-crawl). Content is not gated behind
  client-side rendering — confirmed good for both classic crawlers and AI
  answer engines that don't execute JS.
- **Titles/descriptions**: 48/48 unique titles, 48/48 unique descriptions
  (zero duplicates site-wide). Only 2 minor length outliers (see TECH-9,
  Low). No `meta name="robots"` unexpectedly present on any indexable page.
- **Images**: only 1 image site-wide flagged "missing alt"
  (`hero-forest-*.webp` on the homepage) and on inspection this is
  correctly implemented as decorative (`alt=""` + `aria-hidden="true"`,
  purely a background/atmosphere image) — a false positive from naive
  alt-text linting, not a real accessibility/SEO gap. 0 images site-wide are
  missing explicit `width`/`height` (no CLS risk from unsized images).
- **LCP resource**: hero image uses responsive `srcset`/`sizes`, WebP,
  `fetchPriority="high"`, `<link rel="preload">`, explicit
  `width="1920" height="1255"` — correct practice for both LCP and CLS.
  Self-hosted variable-weight WOFF2 font (`Plus Jakarta Sans`), preloaded,
  `font-display: swap` — no third-party font-blocking, minimal FOIT risk.
- **Asset caching/compression**: static assets (JS/CSS/fonts/images) all
  return `Cache-Control: public, max-age=31536000, immutable` (or the
  duplicated equivalent, see TECH-4) and `Content-Encoding: gzip` confirmed
  live on the main JS bundle. HTML documents correctly have no long-lived
  cache header (expected for SSR content).
- **TTFB**: median 122ms, mean 164ms across 48 pages — excellent. Only one
  outlier (`/website-laten-maken`, 700ms; see TECH-10, Low, likely a single
  cold-cache sample).
- **Mobile viewport**: `<meta name="viewport" content="width=device-width,
  initial-scale=1"/>` present, zoom not disabled.
- **hreflang**: not applicable — single-locale (`nl_NL`) site, no
  alternate-language versions exist.

## Findings

### TECH-1 — Hero H1 and ~47 above-the-fold elements start at `opacity:0`, animated in via client-side JS (High — Core Web Vitals / LCP risk)

The homepage `<h1>` ("Websites die écht werken.") — very likely the LCP
element on this page — is served with inline `style="...opacity:0;
transform:translateY(20px)"`. The homepage carries 47 elements with this
same "hidden until JS animates it in" pattern (hero subhead, nav items,
CTAs), consistent with a `framer-motion`/`motion` fade-in-on-load library
(`/assets/motion-Bp-EBsJ0.js` is preloaded). `transform` is compositor-only
so it won't itself cause a layout shift (CLS is likely fine), but
`opacity:0` means the largest above-the-fold text block is invisible at
first paint and only becomes visible once JS has loaded, hydrated, and run
the animation. This is a well-documented LCP anti-pattern: it ties "time to
visually complete" to JS execution time rather than to HTML/CSS parse time,
which is exactly what SSR is supposed to avoid. This was not flagged in the
prior audit (source inspection focused on JS payload size, not animation
strategy) but is a distinct, likely larger contributor to LCP delay than
TECH-2 below.

**Recommendation**: for the LCP candidate specifically (the H1 and/or hero
image, whichever paints largest), either (a) remove the opacity animation
entirely and let it render at full opacity immediately, or (b) if the
fade-in is a deliberate brand choice, implement it with a CSS-only
`@keyframes`/`animation-delay` approach (no JS dependency for the *first*
paint) so the element is visually present even if JS hasn't hydrated yet,
or (c) use the `content-visibility`/CSS `@starting-style` pattern instead of
a JS-driven opacity toggle. Re-measure with Lighthouse/PSI once credentials
are available to quantify the actual LCP delta.

### TECH-2 — Homepage eagerly `modulepreload`s ~21 JS chunks, some non-critical (Medium — Core Web Vitals risk, unchanged from prior audit)

Still present as of 2026-09-15: `<head>` fires 21 `<link rel="modulepreload">`
tags including `Contact-B2LhGYg3.js`, `Footer-BB8uYLHM.js`,
`contact.functions-Df-PP1OP.js`, `auth-middleware-BxmmoFAN.js`,
`calendar-5Yl3ivCd.js`, `mail-DyXXUlUJ.js`, `send-CjJ7l3aR.js` — none needed
for first paint of a hero-focused landing page. This competes with the LCP
image/font for bandwidth on the critical path and adds hydration-related
main-thread work that can affect INP shortly after load.

**Recommendation**: unchanged from prior audit — restrict `modulepreload` to
first-paint/first-interaction chunks; route-split or lazy-load `Contact`,
`Footer`, `calendar`, `mail`, `auth-middleware`, `send` behind
scroll-into-view or user interaction.

### TECH-3 — CSP allows `'unsafe-inline'` for `script-src` and `style-src` (Medium, unchanged)

```
content-security-policy: default-src 'self'; img-src 'self' data: https://*.supabase.co;
connect-src 'self' https://*.supabase.co https://calendly.com; style-src 'self' 'unsafe-inline';
script-src 'self' 'unsafe-inline' https://assets.calendly.com; frame-src 'self' https://calendly.com;
font-src 'self'; frame-ancestors 'self'; base-uri 'self'; object-src 'none'
```
`'unsafe-inline'` on both directives removes CSP's primary protection
against injected inline script/style execution. The rest of the policy
(`object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`) is solid.

**Recommendation**: move inline `<style>`/`<script>` to external files or
switch to a nonce-based CSP generated per-response in `server.ts`; JSON-LD
`<script type="application/ld+json">` blocks don't need `'unsafe-inline'`
since they're not executed — only inline *executable* tags need the nonce.

### TECH-4 — Duplicate `Cache-Control` header on JS/CSS assets (Low, unchanged)

`/assets/index-CxzhDqWp.js` and `/assets/styles-DdbuqqY2.css` still emit two
`Cache-Control` lines (`max-age=31536000` and `public, immutable`
separately) — an nginx `expires`/`add_header` pair both firing. Fonts and
images already emit a single correctly-combined header
(`public, max-age=31536000, immutable`), so the JS/CSS location block is the
one left unfixed.

**Recommendation**: consolidate into one `add_header Cache-Control "public,
max-age=31536000, immutable";` in the JS/CSS location block.

### TECH-5 — Security headers duplicated on HTML responses (Low, unchanged)

`x-frame-options`, `x-content-type-options`, `referrer-policy` and
`strict-transport-security` are each emitted twice per response (once
lowercase, once Title-Case, identical values) — `content-security-policy`
and `permissions-policy` are not duplicated. Points at nginx re-adding a
legacy subset of headers the Node app already sets. Not currently harmful
(values agree) but redundant and a config-drift risk if the two layers are
edited independently in future.

**Recommendation**: set these 4 headers in exactly one layer (either
`server.ts` or the nginx vhost, not both).

### TECH-6 — `Server` header discloses exact nginx version and OS (Low, informational, unchanged)

`Server: nginx/1.28.3 (Ubuntu)` sent on every response — trivial to check
against known CVEs for that exact version.

**Recommendation**: add `server_tokens off;` to the nginx config.

### TECH-7 — `http://www.` variant takes 2 redirect hops instead of 1 (Low)

`http://www.aimi-development.nl/` → 301 → `https://www.aimi-development.nl/`
→ 301 → `https://aimi-development.nl/`. Functional, no loop, but every other
entry point (`http://` apex, `https://www.`) resolves in a single hop. Low
priority — real-world traffic hitting the `http+www` combination specifically
is rare, but it's an easy fix and shaves one round-trip for any crawler or
old backlink using that exact form.

**Recommendation**: have the nginx `www` server block redirect straight to
`https://aimi-development.nl/` regardless of the incoming scheme, instead of
upgrading scheme first and stripping `www` second.

### TECH-8 — Mixed-case URLs (`/CONTACT`, `/Contact`) serve `200` instead of redirecting to canonical case (Low)

Framework routing is case-insensitive: `/CONTACT` and `/Contact` both return
`200` with full page content and correctly self-reference
`https://aimi-development.nl/contact` via `<link rel="canonical">`. This
mitigates duplicate-indexing risk (Google should consolidate to the
canonical), but it's not best practice — anyone linking to a mixed-case
variant (typos, some case-preserving CMSs, old links) creates a second
crawlable, 200-status URL that relies entirely on the canonical tag rather
than an explicit redirect. No evidence this is currently causing duplicate
indexing, but it's an avoidable gap.

**Recommendation**: add a canonicalizing redirect (301, lowercase the path)
at the router/nginx level so mixed-case requests land on the exact canonical
URL rather than depending on the canonical tag alone.

### TECH-9 — Two pages have title/description length outliers (Low)

`/privacybeleid`: title is 20 characters (well under the ~30–60 char
sweet spot) and meta description is 169 characters (9 over the ~160 soft
cap, likely truncated in some SERP layouts). `/algemene-voorwaarden`: title
is 27 characters. Both are legal/boilerplate pages with minimal commercial
SEO value, so this is genuinely low priority, not ignorable-by-default on a
more important page.

**Recommendation**: optional — lengthen the two short titles slightly for
consistency (e.g. "Privacybeleid — AIMI Webdesign Veendam") and trim the
privacybeleid description under 160 characters if it matters for this page's
SERP snippet.

### TECH-10 — Single TTFB outlier on `/website-laten-maken` (Low, monitor only)

47 of 48 pages return TTFB in the 102–171ms range; `/website-laten-maken`
recorded 700ms in the pre-crawl. Single data point — consistent with a
cold cache/cold SSR render rather than a systemic issue (re-requesting this
page in this session was not part of the brief's scope for re-verification).

**Recommendation**: not urgent; if this recurs across multiple crawls, check
whether this specific route has a slower data dependency (e.g. an
uncached Supabase call) that others don't.

## Sitemap lastmod distribution (informational, unchanged pattern from prior audit)

| Date | Count |
|---|---|
| 2026-08-20 | 7 |
| 2026-08-21 | 20 |
| 2026-08-22 | 7 |
| 2026-09-03 | 1 |
| 2026-09-04 | 13 |

Large identical clusters (20 URLs sharing one exact date, 13 sharing
another) still read as deploy/build timestamps rather than genuine
per-page content-change tracking. Not a Critical/High issue — Google
tolerates this — but reduces `lastmod`'s usefulness as a recrawl-priority
signal. No blocked/disallowed paths appear in the sitemap, and no
future-dated entries.

## Explicitly out of scope / not verified in this pass

- No PageSpeed Insights/CrUX API credentials configured — all Core Web
  Vitals commentary (TECH-1, TECH-2) is inferred from source/asset
  inspection (animation strategy, preload strategy, sizes), not measured
  field or lab scores. Recommend running Lighthouse/PSI manually once
  credentials are available, prioritizing TECH-1 (opacity-gated LCP
  element) for confirmation since it's the most likely to move a measured
  LCP score.
- Detailed hreflang validation is not applicable (single-locale site);
  deferred to the `seo-hreflang` sub-skill for any future multi-locale work.
- Full per-page HTML fetch (H1/schema/animation-pattern spot checks) was
  done for the homepage, `/website-checker`, `/login`, `/portal`,
  `/CONTACT`/`/Contact`, and `/this-page-does-not-exist-xyz123`; the
  remaining pages were assessed via the structured `crawl-data.json`
  fields (title/description/canonical/headers/schema/images/word count),
  which cover all 48 pages but not full raw-HTML inspection of each.
