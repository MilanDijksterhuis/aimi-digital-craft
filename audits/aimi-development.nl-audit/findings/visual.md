# Visual / Mobile SEO Analysis — aimi-development.nl

**Method:** Playwright (Chromium 1.62.0) automated capture, desktop 1440x900 and mobile 390x844 (iPhone UA, `device_scale_factor: 2`), on `/`, `/website-laten-maken`, `/tarieven`, `/contact`. Full-page and above-the-fold screenshots, plus DOM/CSSOM metrics (scrollWidth, tap-target rects, computed font sizes, `layout-shift` PerformanceObserver, cookie-banner detection).

**Category score: 70 / 100**

---

## Top findings

### 1. [HIGH] Cookie consent banner renders off-screen on mobile — all 4 pages
The cookie banner container is horizontally mis-centered on mobile viewports (≤512px), pushing roughly half of it off the right edge of the screen. The "Alles accepteren" / "Alleen noodzakelijk" buttons and "Aanpassen" link are visually cut off on every page tested (homepage, /website-laten-maken, /tarieven, /contact).

- **Root cause (confirmed in source):** `src/components/CookieBanner.tsx:67`
  ```
  className="fixed bottom-6 left-1/2 z-50 w-full max-w-lg px-4"
  ```
  `left-1/2` places the element's left edge at 50% of the viewport, but there is no `-translate-x-1/2` (or equivalent) to re-center it. Measured on a 390px viewport: `left: 195px`, `width: 390px` → the box spans `195px`–`585px`, i.e. 195px hangs past the right edge of a 390px screen.
- **Impact:** Buttons remain technically clickable (hit area extends off-canvas) but are not fully visible, which undermines trust, looks broken/unfinished, and is a weak pattern for consent UX (reject/customize options should be as visible as accept). This affects 100% of first-time mobile visitors on every page.
- **Screenshots:** `homepage-mobile-fold.png`, `website-laten-maken-mobile-fold.png`, `tarieven-mobile-fold.png`, `contact-mobile-fold.png` — all show the cut-off banner.

### 2. [MEDIUM] Pricing comparison table on /tarieven is horizontally scrollable with no visual affordance (mobile)
The "AIMI vergeleken met een bouwpakket of freelancer" table sits in a `div.overflow-x-auto` container (`scrollWidth: 640px` vs `clientWidth: 342px` on a 390px viewport). This is intentional (not a page-level overflow bug — `document.scrollWidth` stays equal to `innerWidth` on every page/viewport tested), but there is no scroll shadow, arrow, or "swipe to compare" hint, so the third column (Bouwpakket/freelancer comparison data) is invisible by default and easy to miss on mobile. Given this table is meant to justify AIMI's pricing versus competitors, hiding that data reduces its persuasive value.
- **Screenshot:** `_debug_tarieven_table.png` (cropped from `tarieven-mobile.png`), full page in `tarieven-mobile.png`.

### 3. [MEDIUM] Many tap targets below the 44×44px recommended minimum
Across all pages, header nav links measure ~34–38px tall (e.g. "Diensten", "Tarieven", "Werkwijze" on desktop nav; mobile "AIMI." logo link 54×33px, mobile header "Contact" pill 91×38px). Footer/body text links are worse: phone/email links and footer sitemap links are commonly 15–20px tall (e.g. "06 11851093" / "sales@aimi-development.nl" both 16px tall on multiple pages, footer nav items 15–18px). Counts of sub-44px interactive elements per page (desktop/mobile): homepage 77/68, website-laten-maken 76/69, tarieven 71/63, contact 66/59. These are legible but cramped for thumb tapping, particularly the footer link clusters and inline text links.

### 4. [LOW] Base/body copy sits below the 16px legibility guideline in places
`<body>` computed font-size is 14px sitewide (likely a Tailwind base default). Paragraph (`<p>`) computed sizes vary by page: homepage/tarieven 16px (fine), /website-laten-maken 15px, /contact 14px. The 14–15px paragraph text on /contact and /website-laten-maken is under Google's recommended ~16px minimum for comfortable mobile reading without zoom.

### 5. [INFO / positive] No page-level horizontal overflow, minimal layout shift, hero renders cleanly
- `document.documentElement.scrollWidth === window.innerWidth` on every page/viewport combination tested (no page-level horizontal scrollbar).
- CLS approximation (PerformanceObserver `layout-shift`, sampled ~1.7s after load) was ≤0.025 on every page/viewport — well under the 0.1 "good" threshold. Contact-desktop was the highest at 0.024, still good.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` present and correct on all pages.
- Hero background image (mountain/forest photo) loads and scales correctly at both viewports with good text contrast (white/light headline and CTA pills over a dark gradient overlay); no distortion or broken image observed.
- H1 and at least one CTA (header "Contact" pill, and on the homepage the "Neem contact op" hero button) are within the visible viewport without scrolling on mobile for all 4 pages — value proposition is above the fold. Note: on first load, the mis-positioned cookie banner (finding #1) visually dominates the lower half of the fold until dismissed, which somewhat undercuts this.
- No console errors were captured during navigation/load on any page/viewport.
- Mobile navigation correctly collapses secondary links (Diensten, Werkwijze, Over ons, FAQ) behind a hamburger icon instead of cramming them into the header — good responsive pattern.

---

## Per-page above-the-fold summary (mobile, 390×844)

| Page | H1 visible w/o scroll | CTA visible w/o scroll | Cookie banner cut off | Horizontal overflow |
|---|---|---|---|---|
| Homepage (`/`) | Yes | Yes (header + hero "Neem contact op") | Yes | No |
| /website-laten-maken | Yes | Yes (header + "Vraag een offerte aan") | Yes | No |
| /tarieven | Yes | Yes (header CTA) | Yes | No |
| /contact | Yes | Yes (header CTA) | Yes | No |

---

## Screenshots saved

Directory: `C:\Users\milan\Documents\AIMI\aimi-digital-craft\aimi-development.nl-audit\screenshots\`

- `homepage-desktop.png`, `homepage-desktop-fold.png`, `homepage-mobile.png`, `homepage-mobile-fold.png`
- `website-laten-maken-desktop.png`, `website-laten-maken-desktop-fold.png`, `website-laten-maken-mobile.png`, `website-laten-maken-mobile-fold.png`
- `tarieven-desktop.png`, `tarieven-desktop-fold.png`, `tarieven-mobile.png`, `tarieven-mobile-fold.png`
- `contact-desktop.png`, `contact-desktop-fold.png`, `contact-mobile.png`, `contact-mobile-fold.png`
- `_debug_tarieven_table.png` (cropped detail supporting finding #2)

Raw metrics (per page/viewport: h1/CTA visibility, tap-target rects, font sizes, CLS, scrollWidth) saved to:
`C:\Users\milan\Documents\AIMI\aimi-digital-craft\aimi-development.nl-audit\visual_metrics.json`

Capture script (reusable): `C:\Users\milan\Documents\AIMI\aimi-digital-craft\aimi-development.nl-audit\scripts\visual_audit.py`

---

## Recommended fixes (priority order)

1. **Fix cookie banner centering** — `src/components/CookieBanner.tsx:67`: add `-translate-x-1/2` (Tailwind) so `left-1/2` is paired with a matching negative translate, e.g. `className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"`. This is a one-line, low-risk fix with high impact (affects every mobile visitor, every page).
2. **Add a scroll affordance to the /tarieven comparison table** — right-edge fade/gradient, a small "swipe →" hint, or restructure to stacked cards on mobile so the third column isn't hidden by default.
3. **Increase footer/inline text-link tap areas** on mobile — wrap phone/email/footer nav links in elements with `padding` or `min-height: 44px` touch targets, especially in the footer link grid and contact-info rows.
4. **Bump paragraph font-size to 16px** on `/contact` and `/website-laten-maken` mobile body copy for consistency with the other pages and better legibility.
