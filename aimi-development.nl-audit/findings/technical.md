# Technical SEO — 2026-09-04

Score: **78/100**

## What works

- **robots.txt**: exemplary. Portal/auth/API paths disallowed, AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended) explicitly allowed, scrapers (Bytespider, PetalBot, MJ12bot) blocked, sitemap declared. `/login` deliberately left crawlable so Google can read its noindex — correct reasoning.
- **Canonicals**: 48/48 pages, all self-referencing and correct. Zero mismatches.
- **Redirects**: `www` → apex 301, `http` → `https` 301. No chains (0 hops on all 48 pages).
- **Status codes**: 48/48 return 200. Unknown URL returns a real 404.
- **Security headers**: full set — CSP (with `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`), HSTS 1 year + includeSubDomains, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy. Better than most commercial sites.
- **TTFB**: 46 ms median, 275 ms worst (homepage). Server-side rendering is fast.
- **Sitemap**: valid XML, 48 URLs, all resolve 200, all in canonical form.

## Findings

### TECH-1 — Static assets served completely uncompressed (Critical)
`/assets/*.js` and `/assets/*.css` return **no `Content-Encoding`** header at all. Only the HTML (proxied from the Node server) is gzipped; everything nginx serves from disk is raw.

Measured:
| Asset | Served | gzip -9 | Waste |
|---|---|---|---|
| `index-B6pDCZvI.js` | 881,681 B | 248,487 B | **633 KB** |
| `motion-Bp-EBsJ0.js` | 126,670 B | ~40 KB | ~87 KB |
| `styles-Bi7R0mo9.css` | 106,099 B | ~18 KB | ~88 KB |
| `radix-Ehmlw_UZ.js` | 54,303 B | ~17 KB | ~37 KB |

Roughly **1.2 MB of JS/CSS transferred where ~330 KB would do** — about 870 KB wasted on every uncached visit. On a 4G connection that is several seconds of extra load time and directly damages LCP/INP field data.

Cause: nginx `gzip_types` does not cover `application/javascript` / `text/css` for the static `location` block. Config lives on the VPS, not in this repo.

### TECH-2 — Fonts and images have no Cache-Control (High)
`/fonts/plus-jakarta-sans-latin-wght-normal.woff2` (27 KB, preloaded) and `/assets/hero-forest-*.webp` (74 KB, the **LCP element**) return **no `Cache-Control` and no `Expires`**. Both are re-validated or re-fetched on repeat visits, while sibling `.js`/`.css` files in the same directory correctly get `max-age=31536000, immutable`.

The nginx location rule matches JS/CSS extensions but misses `woff2` and `webp`.

### TECH-3 — IndexNow key file returns 404 (High)
`https://aimi-development.nl/b03bb73bce86422c6a74b3cfc829f2dd.txt` → **404**. `INDEXNOW_KEY` is defined in [seo.ts](src/lib/seo.ts) and `scripts/indexnow-submit.mjs` exists, but the verification route `src/routes/b03bb73bce86422c6a74b3cfc829f2dd[.]txt.tsx` is **uncommitted and undeployed**. Any IndexNow submission is rejected — Bing/Yandex cannot verify ownership, so the whole IndexNow setup is currently inert.

### TECH-4 — Duplicate Cache-Control headers (Low)
Static assets return the header twice:
```
Cache-Control: max-age=31536000
Cache-Control: public, immutable
```
An nginx `expires` directive and an `add_header` are both firing. Browsers cope, but some proxies and CDNs handle duplicate headers inconsistently. Should be one header.

### TECH-5 — Sitemap lastmod is stale (Low)
47 of 48 URLs carry `lastmod` of 2026-08-20/21/22; only one shows 2026-09-03 despite a deploy that day. Dates appear hardcoded rather than derived from content changes. Google largely ignores unreliable `lastmod`, and inaccurate dates train it to keep ignoring yours.

No `changefreq`/`priority` — correct, Google ignores both.
