# Performance / Core Web Vitals — 2026-09-15

Method: **lab data only, no Google API key configured.** No CrUX/PSI field data
available for this run (`pagespeed_check.py` not used — no credentials
configured per audit brief). All numbers below come from **Lighthouse 12.8.2
CLI** (`npx lighthouse`, `--only-categories=performance`), default mobile
config: simulated throttling, RTT 150ms, 1.6 Mbps down / 0.75 Mbps up, **4x CPU
slowdown**. This profile is deliberately harsher than a typical NL mobile
connection/device — treat LCP numbers as a stress-test ceiling, not a
prediction of real-user 75th-percentile pass/fail. Caching/compression headers
were verified directly against production with `curl -I` / `curl
--compressed`. Three pages tested per this audit's scope: `/`,
`/website-laten-maken`, `/tarieven`. Raw Lighthouse JSON saved to
`aimi-development.nl-audit/lighthouse-runs/{home,website-laten-maken,tarieven}.json`.

**Change vs. the 2026-09-06 audit** (which tested `/`, `/tarieven`,
`/website-laten-maken-kapsalon`, `/website-laten-maken-groningen`): Home and
Tarieven overlap between the two runs. Home's Lighthouse performance score
improved 67 → 76 and TBT dropped 286ms → 110ms; Tarieven improved 82 → 82
(flat) with TBT dropping 191ms → 50ms. LCP on both pages is materially the
same (Home 4.41s → 4.33s, Tarieven 3.38s → 3.54s, within normal lab-run
variance). The root cause identified on 2026-09-06 — LCP render delay driven
by main-thread JS contention, not network or image loading — is **confirmed
unchanged** in this run, including on a new page (`/website-laten-maken`)
whose LCP element is an actual (correctly preloaded) image rather than text.

## Scores & Core Web Vitals (lab, mobile, simulated throttling)

| Page | Perf score | LCP | FCP | TBT (INP proxy) | CLS | Speed Index | TTI |
|---|---|---|---|---|---|---|---|
| Home `/` | 76 | **4.33s** (Poor) | 3.7s | 110ms (Good) | 0.002 (Good) | 3.7s | 4.7s |
| `/website-laten-maken` | 77 | **3.69s** (Needs Improvement) | 3.5s | 200ms (borderline) | 0 (Good) | 4.6s | 4.1s |
| `/tarieven` | 82 | **3.54s** (Needs Improvement) | 3.2s | 50ms (Good) | 0 (Good) | 4.4s | 3.7s |

Thresholds: LCP good ≤2.5s / poor >4.0s. INP good ≤200ms (TBT used as lab
proxy — see note below). CLS good ≤0.1.

**CLS: pass on all 3 pages** (0–0.002), comfortably under 0.1. No layout-shift
issues found — images and the responsive hero all ship explicit
`width`/`height`.

**LCP: fails "good" on all 3 pages** under 4x-CPU-throttled mobile lab
conditions; Home is the only page in the "Poor" (>4.0s) band, the other two
are "Needs Improvement." Real-world field LCP is very likely meaningfully
better than this given the excellent real TTFB and compression story below —
this cannot be confirmed without CrUX/PSI field data (see note).

**INP: cannot be measured directly** — no field data or scripted interaction
trace. TBT is used as the lab proxy: Home (110ms) and Tarieven (50ms) are
comfortably under the 200ms "good" threshold; `/website-laten-maken` sits
right at 200ms, worth re-checking once real interaction data is available.

## Key finding: LCP render delay dominates on every page — 83–86% of LCP time is post-TTFB render delay, not network/image loading

| Page | LCP element | TTFB | Load Delay | Load Time | Render Delay |
|---|---|---|---|---|---|
| Home | `p.mt-8` (hero intro paragraph, **text**) | 600ms (14%) | 0ms | 0ms | **3,734ms (86%)** |
| `/website-laten-maken` | `img` example screenshot (`voorbeeld-website-1-architectuur.webp`) | 609ms (17%) | 0ms | 0ms | **3,080ms (83%)** |
| `/tarieven` | `p.mt-4` (pricing intro paragraph, **text**) | 615ms (17%) | 0ms | 0ms | **2,926ms (83%)** |

This is the same pattern documented in the 2026-09-06 audit and in the
existing `Performance-audit 2026-09-02` comment in `src/components/Hero.tsx`.
Notably, `/website-laten-maken`'s LCP element **is** an image this time, and
it's correctly optimized (`<link rel="preload" as="image">` present, explicit
`width="1440" height="900"`, `loading="eager"`) — yet Load Delay and Load Time
are still both 0ms and 83% of LCP time is still Render Delay. This confirms
the bottleneck is **main-thread contention delaying paint**, not
resource-loading — true for both text and image LCP candidates alike.

On the homepage specifically, the hero `<img>` (`fetchPriority="high"`, real
`srcSet` 640/960/1280/1920w, `width`/`height` set, correctly preloaded via
`<link rel="preload" as="image" imageSrcSet=... fetchPriority="high">`) is
**not** the LCP element being measured — it's `alt="" aria-hidden="true"`
(decorative background) and sits behind the intro paragraph, so Chrome's LCP
candidate selection lands on the text block instead. The image itself is
correctly implemented; it's simply not what LCP is measuring on this layout.

Server TTFB is excellent independent of the above: `server-response-time`
audit reports **30–40ms raw origin response time** on all 3 pages — the
600–615ms "TTFB" figure in the LCP phase table is Lighthouse's
simulated-throttling network TTFB, not real server latency. This is
consistent with the pre-crawled `ttfb_ms` data (~100–150ms warm, ~450–700ms
cold) — the origin itself responds fast; the crawl-data variance reflects
edge/connection conditions at fetch time, not backend slowness.

## JS payload

Largest network transfers on the homepage (compressed transfer / raw
uncompressed size):

| Asset | Transfer (compressed) | Uncompressed | Ratio |
|---|---|---|---|
| `index-CxzhDqWp.js` (main app bundle) | 244 KB | 862 KB | ~28% |
| `hero-forest-960.webp` | 45 KB | 45 KB | (already-compressed image) |
| `motion-Bp-EBsJ0.js` (Framer Motion) | 41 KB | 124 KB | ~33% |
| `plus-jakarta-sans` woff2 (self-hosted) | 27 KB | 27 KB | n/a |
| homepage HTML document | 19 KB | 109 KB | ~17% |
| `radix-Ehmlw_UZ.js` | 18 KB | 53 KB | ~34% |
| `styles-DdbuqqY2.css` | 18 KB | 104 KB | ~18% |

Total page weight (`total-byte-weight`, resource-summary): **Home 451 KiB /
28 requests, `/website-laten-maken` 409 KiB / 18 requests, `/tarieven` 383
KiB / 16 requests.** `unused-javascript` flags ~141–142 KiB of estimated
unused JS on all three pages, consistent with Motion + Radix shipping more
code than these marketing pages exercise. `render-blocking-resources` reports
**0ms estimated savings on all 3 pages** — no render-blocking `<link>`/
`<script>` was flagged; the LCP delay is main-thread contention, not blocking
resources.

## Image optimization — verified as claimed

- Homepage hero: responsive WebP with real `srcset` (640/960/1280/1920w),
  `sizes="100vw"`, `fetchPriority="high"` on both the `<img>` and its matching
  `<link rel="preload" as="image" imageSrcSet=... fetchPriority="high">`,
  explicit `width="1920" height="1255"`. Confirmed present verbatim via
  `curl --compressed` against production HTML.
- `/website-laten-maken` hero/example image: also preloaded
  (`<link rel="preload" as="image" href="/voorbeelden/voorbeeld-website-1-architectuur.webp">`),
  explicit `width`/`height`, `loading="eager"`.
- `modern-image-formats`, `uses-responsive-images`, `uses-text-compression`
  Lighthouse audits all report **0 bytes wasted** — no further image-format or
  responsive-sizing savings available.
- Both images are correctly implemented; neither is the actual bottleneck
  (see LCP render-delay finding above).

## Font loading strategy — verified best-practice

Confirmed via the production CSS (`styles-DdbuqqY2.css`):
```
@font-face{font-family:Plus Jakarta Sans;font-style:normal;font-display:swap;
font-weight:200 800;src:url(/fonts/plus-jakarta-sans-latin-wght-normal.woff2)
format("woff2-variations");unicode-range:...}
```
- Self-hosted variable font (single file covers weight range 200–800,
  avoiding multiple static-weight downloads).
- `font-display: swap` set — no FOIT risk.
- Split into `latin` / `latin-ext` unicode-range subsets — only the needed
  subset downloads.
- Preloaded in `<head>`:
  `<link rel="preload" href="/fonts/plus-jakarta-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous"/>`.
- Lighthouse `font-display` audit: 0 items flagged (no savings available).
- This fully explains the near-zero CLS scores — no font-swap layout jump.

## Caching headers — verified per asset type

| Asset type | Cache-Control | Notes |
|---|---|---|
| Hashed JS (`/assets/*.js`) | `public, immutable, max-age=31536000` (1yr) + `Expires` | Correct — content-hashed filenames, safe to cache forever |
| Hashed CSS (`/assets/*.css`) | `public, immutable, max-age=31536000` (1yr) + `Expires` | Correct |
| Images (`/assets/*.webp`) | `public, max-age=31536000, immutable` | Correct |
| Fonts (`/fonts/*.woff2`) | `public, max-age=31536000, immutable` | Correct |
| HTML documents (`/`, `/tarieven`, etc.) | **No `Cache-Control` header at all** | Reasonable for SSR HTML (must revalidate), but a short `max-age` + `stale-while-revalidate` (e.g. `max-age=0, s-maxage=60, stale-while-revalidate=300` at a CDN/edge layer) would let repeat visits and crawlers skip a full server round-trip without risking stale content |

## Compression — gzip confirmed, brotli NOT enabled (finding)

Verified with `curl -H "Accept-Encoding: br"` against the main JS bundle,
CSS, and HTML document:
- All three respond with `Content-Encoding: gzip` when gzip is offered.
- **When only `br` is offered in `Accept-Encoding`, nginx returns the
  resource uncompressed** (`Content-Length: 883060`, no `Content-Encoding`
  header) — confirming brotli is not configured on this nginx instance
  (`nginx/1.28.3 (Ubuntu)`), only gzip.
- Brotli typically compresses JS/CSS/HTML text 15–25% smaller than gzip at
  equivalent quality. On the 244 KB (gzip) main bundle alone, brotli would
  likely save roughly 35–55 KB of transfer per first visit; across the full
  ~350 KB of script+CSS+HTML transferred per page, total savings could be in
  the 60–90 KB range per page load. This is a low-effort, server-config-only
  fix (`ngx_brotli` module + `brotli on; brotli_types ...;` in the nginx
  config) — no application code changes needed.

## Findings (prioritized)

### PERF-1 — LCP render delay (83–86% of LCP time) is main-thread JS contention, confirmed on both text and image LCP elements (High)
Across all three pages tested (including one, `/website-laten-maken`, whose
LCP element is a correctly preloaded image with 0ms Load Delay/Load Time),
83–86% of LCP time is Render Delay — time between resource-ready and the
browser actually painting — under 4x CPU throttle, with render-blocking
resources ruled out (0ms savings on all pages). This points at main-thread
work (parsing/executing ~250 KB compressed of JS, including Framer Motion and
Radix, before the browser has a free slot to paint) as the dominant lever.
Recommendation: route-level code-split so marketing/content pages don't load
portal/admin-only Radix usage; consider replacing above-the-fold entrance
animations (hero H1, CTA buttons, founder badge — see Hero.tsx) with CSS
`@keyframes`/`transition` rather than Framer Motion, reserving Motion for
interactions that need it (FAQ accordion, etc.), since above-the-fold
animations are the ones most likely to compete with LCP for main-thread time.

### PERF-2 — Brotli compression not enabled on nginx (Medium-High, low effort)
Confirmed via direct `curl` testing: only gzip is available, brotli requests
fall back to uncompressed. Enabling brotli (`ngx_brotli`, static + dynamic)
for `text/html`, `application/javascript`, `text/css` would cut transfer size
by an estimated 60–90 KB per page load with zero application-code changes —
one of the highest-ROI, lowest-risk fixes available from this audit.

### PERF-3 — Framer Motion + Radix add ~59 KB compressed / ~177 KB uncompressed to every page (Medium)
`motion-*.js` (41 KB/124 KB) and `radix-*.js` (18 KB/53 KB) load on every
page tested, including plain content pages. `unused-javascript` flags
~141–142 KB of this as unused per page. Recommend auditing which Radix
primitives are used on public marketing routes vs. the authenticated
portal/admin and code-splitting accordingly.

### PERF-4 — TBT borderline on `/website-laten-maken` (Low-Medium)
200ms TBT sits exactly at the INP "good" boundary on this page (vs. 110ms
Home, 50ms Tarieven) under 4x CPU throttle — same JS-payload root cause as
PERF-1. No action beyond PERF-1/PERF-3 needed; flagging for re-check once
field/interaction data is available.

### PERF-5 — CLS, font loading, image optimization, caching, and TTFB are all solid (Low priority, no action needed)
- CLS: 0–0.002 across all three pages, comfortably under 0.1.
- Fonts: self-hosted variable woff2, `font-display: swap`, preloaded,
  unicode-range subsetted — textbook implementation.
- Images: responsive srcset, correct `fetchPriority`/preload, explicit
  dimensions on both the homepage hero and the `/website-laten-maken`
  example screenshot; 0 bytes flagged by `modern-image-formats` /
  `uses-responsive-images`.
- Caching: all hashed static assets (JS/CSS/images/fonts) correctly served
  `public, immutable, max-age=31536000`.
- TTFB: 30–40ms real origin response time (`server-response-time` audit) —
  not a bottleneck at all.

## Note on field data

No CrUX/PSI field data is available for this audit run (no Google API
credentials configured per the audit brief) — all LCP/CLS/TBT figures above
are lab-only, captured under Lighthouse's default 4x CPU / throttled-4G
mobile simulation, which is materially harsher than most real Dutch mobile
traffic and typical desktop use. **Do not treat the lab LCP figures
(3.5–4.3s) as a stand-in for the 75th-percentile field pass/fail verdict** —
run `pagespeed_check.py` (once credentials/rate limits allow) or connect
Search Console/CrUX to get an actual field verdict before prioritizing
further LCP spend beyond the code-splitting/brotli recommendations above,
which are safe wins regardless of what field data eventually shows.

INP specifically has **no measurement of any kind** in this audit (lab or
field) — expected for a static Lighthouse run, not a gap unique to this site.
Only CrUX field data or synthetic interaction scripting (Puppeteer/CDP trace
of a real click/tap) can produce an actual INP number. TBT (50–200ms across
the three pages) is used above as the closest available proxy.
