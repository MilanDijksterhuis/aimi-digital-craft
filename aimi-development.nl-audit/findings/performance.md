# Performance / Core Web Vitals — 2026-09-06

Method: **lab data only.** `pagespeed_check.py` (PSI API) returned `"PSI rate limit
exceeded (240 QPM / 25,000 QPD)"` for this domain at the time of testing — no CrUX
field data could be retrieved, so no 75th-percentile real-user pass/fail verdict
exists for this audit. All numbers below come from **Lighthouse 12.8.2 CLI**
(`npx lighthouse`, `--only-categories=performance`), default mobile config:
simulated throttling, RTT 150ms, 1.6 Mbps down / 0.675 Mbps up, **4x CPU
slowdown**. This profile is deliberately harsher than a typical NL mobile
connection/device, so treat these as a stress-test ceiling, not a prediction of
real-user percentiles. Four pages tested: `/`, `/tarieven`,
`/website-laten-maken-kapsalon`, `/website-laten-maken-groningen`.

## Scores & Core Web Vitals (lab, mobile, simulated throttling)

| Page | Perf score | LCP | FCP | TBT | CLS | Speed Index | TTI |
|---|---|---|---|---|---|---|---|
| Home `/` | 67 | **4.41s** (Poor) | 3.88s | 286ms | 0 (Good) | 5.51s | 4.76s |
| `/tarieven` | 82 | **3.38s** (Needs Improvement) | 3.23s | 191ms | 0.036 (Good) | 3.23s | 3.96s |
| `/website-laten-maken-kapsalon` | 73 | **3.85s** (Needs Improvement) | 3.58s | 270ms | 0 (Good) | 4.93s | 4.31s |
| `/website-laten-maken-groningen` | 82 | **3.52s** (Needs Improvement) | 3.37s | 136ms | 0 (Good) | 3.37s | 4.07s |

Thresholds used: LCP good ≤2.5s / poor >4.0s. CLS good ≤0.1. TBT is a lab proxy
for INP (no direct lab equivalent of INP exists; see note below).

**CLS: pass on all 4 pages** (0–0.036, well under 0.1). No layout-shift issues found.

**LCP: fails "good" on all 4 pages** in this throttled lab run, home is worst
(only page tested that pushes into the "Poor" >4.0s band). Real-world field LCP
is very likely better than this — Lighthouse's default 4x CPU slowdown is
aggressive — but it cannot be confirmed without CrUX/PSI data (see Note on Field
Data below).

**INP: cannot be measured.** INP requires real interaction sampling (field data)
or a scripted interaction trace; a static Lighthouse performance run reports
neither INP nor FID (FID has been fully retired from Chrome's tooling — CrUX
API and PSI stopped reporting it Sept 9 2024, and Lighthouse never reported it
as a lab metric). **Total Blocking Time (TBT)** is used below as the closest
available lab proxy for main-thread responsiveness risk.

## Key finding: LCP element is text, and 83–86% of LCP time is "Render Delay," not network

Lighthouse identifies the LCP element on **all four pages as a paragraph of
body text**, not the homepage hero image:

- Home: `p.mt-8` (the intro paragraph under the H1)
- Tarieven: `p.mt-4` (pricing intro copy)
- Kapsalon / Groningen: the vertical/city intro `<p>` in the hero grid

This matches an existing comment in `src/components/Hero.tsx` (`Performance-audit
2026-09-02`) recording the same discovery for the homepage. The hero `<img>`
(`fetchPriority="high"`, real `srcSet` 640/960/1280/1920w, `width`/`height` set)
is correctly optimized but is **not the LCP element being measured** — it's
absolutely positioned behind the text content, so Chrome's LCP candidate
selection is landing on the visible text block instead.

LCP phase breakdown (from Lighthouse's `largest-contentful-paint-element`
audit), all 4 pages:

| Page | TTFB | Load Delay | Load Time | Render Delay |
|---|---|---|---|---|
| Home | 605ms (14%) | 0ms | 0ms | **3,805ms (86%)** |
| Tarieven | 602ms (18%) | 0ms | 0ms | **2,777ms (82%)** |
| Kapsalon | 614ms (16%) | 0ms | 0ms | **3,233ms (84%)** |
| Groningen | 603ms (16%) | 0ms | 0ms | **2,920ms (84%)** |

Because the LCP element is a text node (no separate image resource), "Load
Delay" and "Load Time" are always 0 — the entire non-TTFB budget lands in
"Render Delay," i.e., time from server response to the browser actually
painting that text. That much render delay on already-SSR'd text (the text is
present in the initial HTML, confirmed via `render_page.py`-equivalent curl
fetch — this is not client-injected content) points at the main thread being
too busy with JS parse/compile/execution to paint, which lines up with the
bootup-time and mainthread-work-breakdown numbers below.

Note server TTFB itself is excellent independent of this: `server-response-time`
audit reports 25–36ms raw origin response time on all 4 pages; the 601–614ms
TTFB figure above is the *simulated-throttling* network TTFB Lighthouse uses for
the LCP phase math, not the real origin latency.

## JS payload — Framer Motion confirmed as a meaningful contributor

Largest network transfers on the homepage (compressed transfer size /
uncompressed resource size, from Lighthouse `network-requests`):

| Asset | Transfer (compressed) | Uncompressed | Compression ratio |
|---|---|---|---|
| `index-CxzhDqWp.js` (main app bundle) | 250 KB | 883 KB | ~28% |
| `hero-forest-960.webp` | 46.6 KB | 46.3 KB | (already compressed image) |
| `motion-Bp-EBsJ0.js` (Framer Motion / `motion/react`) | **42.0 KB** | 126.7 KB | ~33% |
| `plus-jakarta-sans` woff2 (self-hosted font) | 27.7 KB | 27.3 KB | n/a |
| homepage HTML document | 19.0 KB | 111.6 KB | ~17% |
| `radix-Ehmlw_UZ.js` (Radix UI) | 18.7 KB | 54.3 KB | ~34% |

Total page weight (`total-byte-weight`): **451 KB on home**, 384–412 KB on the
other three pages, across 17–29 requests. Compression is working correctly here
(gzip/brotli ratios of ~28-34% are in the expected range for JS/text) — this
contradicts the "no compression on static assets" finding from the prior
2026-09-04 audit (`PERF-1`); either it has since been fixed server-side, or
that finding needs re-verification, but the evidence from this run shows
correct compression is in effect now.

**Framer Motion (`motion` chunk) is 42 KB compressed / 127 KB uncompressed on
every page tested**, on top of a 250 KB compressed main bundle. It is used
broadly per the codebase (Hero.tsx wraps the H1, CTA buttons, founder badge,
and scroll indicator each in their own `motion.div`/`motion.a`/`motion.span`;
also present in the FAQ accordion, nav, and service page examples per the audit
brief). Combined with Radix (18.7 KB compressed), these two libraries add
~61 KB compressed / ~181 KB uncompressed to every page's JS payload before any
page-specific code. `unused-javascript` audit reports **~142 KB of estimated
unused JS on all 4 pages** — consistent with only a fraction of Radix's and
Motion's shipped code paths being exercised by what's actually on these
marketing pages.

Main-thread cost from this JS on the homepage (worst of the four):
`bootup-time` (JS evaluation) = 1.1s, `mainthread-work-breakdown` (all main-
thread categories, parse/style/layout/paint/script) = 3.7s, and **Total
Blocking Time = 286ms** — under 4x CPU throttle. TBT is lowest on Groningen
(136ms) and highest on Home (286ms) and Kapsalon (270ms), tracking bundle size
and the number of animated elements rendered per page.

`render-blocking-resources` reports **0ms estimated savings on all 4 pages** —
no render-blocking CSS/JS was flagged, so the render delay is main-thread
contention (JS parse/execute), not blocking `<link>`/`<script>` tags.

## Findings (prioritized)

### PERF-1 — LCP render delay (83–86% of LCP time) likely driven by main-thread JS cost (High)
The LCP element (body text, already in the SSR HTML) takes 2.8–3.8s to paint
after the server responds, under 4x CPU throttle, with render-blocking
resources ruled out. The remaining explanation is main-thread contention from
parsing/executing ~250 KB (compressed) of JS — including Motion and Radix —
before the browser gets a free main-thread slot to paint. Reducing JS parsed/
executed before first paint (route-level code splitting so marketing pages
don't load portal/admin-only Radix usage, deferring non-critical Motion
animations) is the highest-leverage lever for LCP here, more than image
optimization (the hero image is not the bottleneck).

### PERF-2 — Framer Motion + Radix add ~61 KB compressed / ~181 KB uncompressed to every page (Medium-High)
Confirmed via network-requests: `motion-*.js` (42 KB / 127 KB) and
`radix-*.js` (18.7 KB / 54.3 KB) load on every page tested, including plain
content pages like the city landing pages. `unused-javascript` flags ~142 KB
of this as unused per page. Recommendations:
- Audit which Radix primitives are actually used on public marketing routes vs
  the authenticated portal/admin, and code-split so public routes only pull
  what they render.
- For Motion, evaluate whether the simple fade/slide-in animations in
  Hero.tsx, the FAQ accordion, and nav could be replaced with CSS
  `@keyframes`/`transition` for above-the-fold elements specifically, reserving
  Motion for interactions that need it (e.g., FAQ accordion open/close), since
  above-the-fold entrance animations are the ones most likely to compete with
  LCP for main-thread time.

### PERF-3 — TBT of 270-286ms on Home and Kapsalon exceeds the ~200ms INP-adjacent budget (Medium)
No direct INP measurement is possible without field data (see below), but TBT
is a widely used lab proxy for main-thread responsiveness risk. Home (286ms)
and Kapsalon (270ms) are both above the 200ms "good" INP threshold under 4x CPU
throttle; Tarieven (191ms) and Groningen (136ms) are under it. This tracks with
JS payload size, reinforcing PERF-1/PERF-2 as the fix.

### PERF-4 — CLS is solid, no action needed
All 4 pages score 0–0.036, comfortably under the 0.1 "good" threshold. No
layout-shift bottlenecks found (images have explicit width/height, no
late-injected content observed pushing layout).

### PERF-5 — Server TTFB is excellent (Low priority, no action)
Raw origin response time is 25–36ms across all 4 pages (`server-response-time`
audit) — this is not a bottleneck. The 601–614ms "TTFB" figure inside the LCP
phase table is Lighthouse's simulated-network TTFB, not real server latency.

## Note on field data

No CrUX/PSI field data could be retrieved for this audit — `pagespeed_check.py`
returned a PSI rate-limit error (`240 QPM / 25,000 QPD`) rather than a missing-
credentials error, meaning a key is configured but was throttled at the time of
testing. The lab numbers above (particularly LCP, which is the metric furthest
from "good") were captured under Lighthouse's default 4x CPU / throttled-4G
mobile simulation, which is materially harsher than most real Dutch mobile
traffic. **Do not treat the lab LCP figures (3.4–4.4s) as a stand-in for the
75th-percentile field verdict** — re-run `pagespeed_check.py` once the rate
limit clears (or connect Search Console/CrUX) to get an actual pass/fail
against real-user data before prioritizing spend on LCP fixes further.

INP specifically has **no measurement of any kind** in this audit (lab or
field) — this is expected for a static Lighthouse run and is not a gap unique
to this site; only CrUX field data or synthetic interaction scripting
(e.g., Puppeteer + Chrome DevTools Protocol trace of a real click/tap) can
produce an INP number.
