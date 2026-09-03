# Performance / Core Web Vitals audit — aimi-development.nl

Date: 2026-09-02
Method: **Lab data only.** No Google PageSpeed Insights / CrUX API key is configured (`pagespeed_check.py` returned `"PSI rate limit exceeded"` on the anonymous/no-key tier for every call, confirming no key rather than a real quota issue). Field data (75th-percentile real-user CrUX) is therefore **not available** — this report cannot state whether AIMI actually passes the Google Search Console CWV thresholds for real visitors, only what a lab run measures. Treat all numbers below as lab estimates under Lighthouse's simulated mobile-throttling profile (RTT 150ms, ~1.47 Mbps down, 4x CPU slowdown, Moto G Power emulation) — this is a conservative/pessimistic proxy, not a live-user measurement.

Tooling used:
- `claude-seo run pagespeed_check.py` (no key → confirms limitation, no data)
- `claude-seo run preload_check.py` — LCP/preload/speculation-rules signal check, all 4 URLs
- `npx lighthouse@12.8.2 --only-categories=performance` — full lab run, **homepage only** (deep-dived: network requests, unused-JS, bootup-time, main-thread breakdown, LCP element attribution)
- `curl -w` timing + asset-reference diffing — all 4 URLs (TTFB, response size, shared-bundle verification), used as a fast/lightweight check for the 3 remaining templates instead of running full Lighthouse a second/third/fourth time, to bound tool-call budget. **Explicitly flagged below wherever a number is extrapolated rather than directly measured.**

Pages tested: `/` (homepage), `/website-laten-maken-kapsalon` (branch template), `/website-laten-maken-groningen` (city template), `/tarieven`.

---

## Score: 50 / 100 (lab-based, mobile)

Justification: homepage Lighthouse Performance score = **55/100** (mobile, simulated throttling), driven almost entirely by a Poor LCP (7.9s) and Poor FCP (7.4s) despite excellent CLS and a fast server. The other three templates were not run through full Lighthouse (see method note), but they load the **identical** core JS/CSS bundle that causes the homepage's LCP/FCP problem (verified via direct asset-reference comparison), so the same bottleneck is expected to reproduce or worsen on those pages (they carry the extra branch/city page-specific chunk, +5-9KB, negligible). Score set to 50 rather than 55 to reflect that lack of positive evidence for the subpages (no independent confirmation they perform *better*) and the total absence of field data, which prevents claiming a passing 75th-percentile result either way.

---

## What works

- **TTFB is excellent everywhere.** Homepage lab TTFB 33ms; direct `curl` TTFB on the other three pages: kapsalon 86ms, Groningen 84ms, tarieven 88ms. Server/edge response time is not a bottleneck on any tested page.
- **CLS is excellent.** Homepage measured CLS = 0.00016 (essentially zero) — well inside "Good" (≤0.1). No layout-shift risk was observed; consistent with the prior code audit's note that LocationPageV2/BranchPage templates carry no images and use fixed-size text layouts.
- **HTML/document payload is small.** Document responses for the three lighter pages are 37-50KB.
- **Render-blocking is limited to a single CSS file** (no additional blocking `<script>` tags found) — i.e., the render-blocking surface is narrow and fixable in one place.
- **No speculation-rules/prerender is present anywhere**, which is a missed opportunity but not a regression — `preload_check.py` scored the homepage 75/100 and all three subpages 50/100 purely on this and one other missing signal (see Finding 5).

---

## Findings

### Finding 1 — LCP and FCP are both Poor, driven by front-loaded JS/CSS weight, not by the hero image
**Severity: Critical**
**Page: https://aimi-development.nl/ (measured directly, full Lighthouse run)**

Measured: LCP = **7,855ms** (threshold for Poor is >4,000ms), FCP = **7,405ms** (i.e. *nothing* paints for 7.4s — FCP and LCP are almost identical, meaning there is no early paint at all, not even background/skeleton). Lighthouse's own LCP-breakdown attributes only 8% (602ms) to TTFB/network-latency-to-first-byte and **92% (7,253ms) to "Render Delay."**

Critically, the actual LCP element on the homepage is **not the hero image** — it is a text paragraph (`main#main-content > section.relative > div.relative > p.mt-8`, the hero subcopy "Wij ontwerpen, bouwen en hosten websites…"). This means the prior code-read audit's conclusion that "hero image LCP optimization is above-average" (responsive srcset, fetchPriority=high, no duplicate AVIF request) is **correct but not the deciding factor** — the image is well-optimized, but it isn't the LCP candidate, so that work has limited payoff. The real constraint is that the SSR'd hero text isn't visually complete/paintable until the render-blocking CSS (Finding 2) and a very large amount of JS (Finding 3) have been downloaded and parsed under throttled mobile conditions, consistent with Framer Motion driving this element's entrance animation (opacity/transform) — the browser has the markup from SSR, but Lighthouse doesn't count it painted until styling/hydration settles.

Recommendation: (a) treat this hero paragraph as the LCP target for optimization, not the image — ensure it is visible immediately with `opacity:1` in the server-rendered HTML/CSS with no JS-gated invisible-until-hydrated state (CSS-only fade-in via `@keyframes`/`animation` is not render-blocking the same way, or simply drop the entrance animation for this one above-fold text node); (b) reduce total network/parse weight blocking first paint (Findings 2-3), since even a non-animated paragraph is still gated behind CSS parse + main-thread availability at this weight.

### Finding 2 — Single render-blocking CSS file is large (106KB) and estimated to cost 3.15s
**Severity: High**
**Page: https://aimi-development.nl/ (measured; same file `styles-C5OV8pjV.css` is loaded on all 4 tested pages — confirmed via asset-reference check)**

Measured: `assets/styles-C5OV8pjV.css`, transfer size **106,190 bytes**, flagged by Lighthouse's `render-blocking-resources` audit with an estimated **3,152ms** of wasted/blocking time. It's the only render-blocking resource identified (no blocking `<script>` tags), so this is a single, well-scoped fix.

Recommendation: Extract and inline critical above-the-fold CSS (hero + nav) directly in `<head>`, load the remainder via `media="print" onload="this.media='all'"` or a `<link rel="preload" as="style">` swap. Separately, audit whether 106KB of CSS for a marketing site with a fairly small design system indicates an unpurged Tailwind build (duplicate utility variants across the many near-identical branch/city page templates) — a purge/content-scan check on the Tailwind config is worth 10 minutes and could shrink this meaningfully.

### Finding 3 — Site-wide JS bundle is ~900KB transferred with 55-71% unused on first load, shared by every template
**Severity: High**
**Page: https://aimi-development.nl/ (measured directly); reproduced verbatim on kapsalon/groningen/tarieven via asset-reference comparison — same file hashes load on all 4 pages, so the byte-weight and unused-% figures below apply site-wide, not just to the homepage**

Measured (homepage Lighthouse `unused-javascript` + `network-requests` audits):

| Bundle | Transfer size | Unused (Lighthouse est.) |
|---|---|---|
| `index-DGtTsYam.js` (main app bundle) | 711,716 B (~695KB) | 433,845 B — **61%** |
| `motion-Bp-EBsJ0.js` (Framer Motion / `motion/react`) | 127,042 B (~124KB) | 70,188 B — **55%** |
| `radix-Ehmlw_UZ.js` (Radix UI primitives) | 54,673 B (~53KB) | 38,453 B — **71%** |

This directly answers the prior audit's flagged-but-unmeasured question about Framer Motion's per-page cost: **`motion/react` alone adds ~124KB of transfer weight to every single page** on the site (confirmed present on all 4 tested URLs), regardless of whether that page actually needs more than a fade-in. It is tree-shaken to its own chunk (good — it's not inlined into the main bundle), but the chunk itself is not deferred/lazy-loaded, so it's fetched and parsed on the critical path everywhere. Combined with the 695KB main bundle (61% unused) and Radix chunk (71% unused), homepage total page weight was **1,177,611 bytes (~1.15MB) across 28 requests**; the three other templates are estimated (not separately measured) at roughly **~1.0-1.05MB** each, since they load the identical `index`/`motion`/`radix`/`utils`/`styles` set plus a small page-specific chunk (BranchPage 4.9KB, LocationPageV2 7.1KB, kapsalon-specific 6.4KB, groningen-specific 5.9KB, tarieven-specific 9.2KB — these page-specific pieces are appropriately small and not the problem).

Main-thread cost tied to this: Script Evaluation 1,305ms + Script Parsing 16ms + bootup-time on `index-DGtTsYam.js` alone = 1,006ms, contributing to Total Blocking Time of 211ms (borderline "Needs Improvement" for the INP proxy; good is ≤200ms).

Recommendation, prioritized:
1. Run a bundle visualizer (`rollup-plugin-visualizer` or `vite-bundle-visualizer`) against the production build to see what's inside the 695KB `index` chunk — on a marketing site this size usually means portal/admin code, form libraries, or duplicated route logic aren't being split from the public pages.
2. Lazy-load `motion/react` usages that are below the fold (FAQ accordion, service-page offerings) via dynamic `import()` so only the hero's animation cost is paid on first paint; everything else can load after `requestIdleCallback`/on-scroll.
3. Audit Radix UI imports — 71% unused on the homepage suggests either a barrel import (`import * as ... from "@radix-ui/..."`) pulling in components not used on that page, or several primitives bundled together that should be per-route code-split.

### Finding 4 — TBT 211ms, borderline "Needs Improvement" (INP proxy)
**Severity: Medium**
**Page: https://aimi-development.nl/ (measured)**

Measured: Total Blocking Time = 211ms (Good is ≤200ms equivalent territory; this sits just past it). Main-thread work breakdown: Style & Layout 1,675ms, Script Evaluation 1,305ms, Other 1,145ms, Rendering 318ms — all consistent with Finding 3's bundle weight. This is not yet a Poor score, but it is a direct downstream consequence of the same JS weight and will worsen on lower-end devices or if more `motion/react` usage is added to a page (e.g., a future case-study page template).

Recommendation: same as Finding 3 (reduce/defer JS execution before interaction); no separate action needed beyond that — do not treat this as an independent problem to fix in isolation.

### Finding 5 — No Speculation Rules / prerender hints (minor, and a generic-but-partly-inapplicable false-positive on subpages)
**Severity: Low**
**Pages: all 4 tested — homepage `preload_check.py` score 75/100; kapsalon, groningen, tarieven each 50/100**

Measured: `speculation_rules.header_present = false` and `inline_blocks = 0` on all 4 URLs; homepage additionally has `preload_lcp_candidate: true` and `fetchpriority_high: 2`, while kapsalon/groningen/tarieven all report `preload_lcp_candidate: false` and `fetchpriority_high: 0`. Flag this last part as a **partial false-positive from the tool**, not a real defect: those three templates render no `<img>` at all (confirmed by the prior code-read audit and consistent with the LocationPageV2/BranchPage component structure), so there is no hero image to mark `fetchpriority="high"` in the first place — the tool's generic recommendation ("mark the LCP hero image with fetchpriority=high") does not apply to a template with no image. The genuinely actionable part of this finding is the missing Speculation Rules API usage across the whole site.

Recommendation: add a `<script type="speculationrules">` block (prefetch, and prerender for very-high-confidence next-clicks like `/contact` or `/tarieven` from the homepage nav) — low effort, saves an entire next-navigation's paint cost for users who follow the primary nav paths. Do not chase the fetchpriority recommendation on the text-only templates; it is not applicable there.

---

## Limitations / what this report cannot tell you

- **No CrUX field data.** Without a PSI/CrUX API key, there is no 75th-percentile real-user figure to check against the pass/fail thresholds — everything above is a single-run lab estimate under Lighthouse's simulated-throttling model, which is deliberately pessimistic (slow-4G-like profile) and can overstate real-world LCP/FCP for users on faster connections. Recommend configuring a Google API key (`pagespeed_check.py --api-key` or environment config) for the next audit pass to get real CrUX subpart data (`lcp_subparts.py`) and actual pass/fail against the 75th-percentile thresholds.
- **Only the homepage got a full Lighthouse run.** The other three templates' exact LCP/FCP/TBT numbers are not independently measured — the report extrapolates from (a) identical shared-bundle verification via `curl` and (b) matching `preload_check.py` signals, which is a reasonable but not equivalent substitute for a full trace. If a follow-up budget allows, run `npx lighthouse` against `/website-laten-maken-kapsalon`, `/website-laten-maken-groningen`, and `/tarieven` directly to confirm.
- CLS was only measured on the homepage; the text-only branch/city templates are assessed as low-risk by architecture (no images, no ads/embeds) rather than directly measured.
