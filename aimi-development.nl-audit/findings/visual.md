# Visual & Mobile UX Audit — 2026-09-06

**Method:** Live Playwright capture (Chromium) against the production site, desktop 1920×1080 and mobile 375×812 (iPhone UA, device-scale 2, touch enabled). For each page both a viewport-only ("above the fold") screenshot and a full-page screenshot were saved. DOM/CSS metrics (computed styles, bounding rects, contrast) were pulled via `page.evaluate` to verify what the screenshots show.

Pages audited: `/` (homepage), `/tarieven`, `/website-laten-maken-kapsalon`, `/website-laten-maken-groningen`, `/contact`. All 5 pages × 2 viewports were captured successfully — no incomplete captures.

## Screenshots

Saved to [`screenshots/`](../screenshots/):
- `homepage-desktop.png` / `homepage-mobile.png` (full page) + `-fold.png` variants (viewport-only, above-the-fold)
- `tarieven-desktop.png` / `tarieven-mobile.png` + `-fold.png`
- `kapsalon-desktop.png` / `kapsalon-mobile.png` + `-fold.png`
- `groningen-desktop.png` / `groningen-mobile.png` + `-fold.png`
- `contact-desktop.png` / `contact-mobile.png` + `-fold.png`

(Older `website-laten-maken-desktop/mobile.png` files from a prior 2026-09-02 session remain in the folder but are not part of this round's scope.)

## What works

- **No horizontal scroll on any of the 10 page/viewport combinations.** `document.documentElement.scrollWidth === window.innerWidth` held everywhere — a common mobile-template failure mode is absent here.
- **Homepage above-the-fold is genuinely strong.** Full-bleed hero image, white H1 "Websites die écht werken." at 48px (desktop) / 30px (mobile), a one-sentence value prop directly under it, and a clearly-styled primary pill CTA ("Neem contact op") plus a secondary CTA ("Website laten maken") both visible without scrolling on desktop *and* mobile. A tertiary text link ("Gratis website check!") sits just below. This is the best-executed fold on the site.
- **Responsive type scale is deliberate, not just shrunk.** H1 sizes step down sensibly by page/viewport (e.g. tarieven 51px→32px, kapsalon/groningen 34px→22px, contact 54px→38px) rather than using one fixed size everywhere.
- **Body-copy contrast is comfortably above WCAG AA** on the dark theme. Checked programmatically: secondary paragraph text `rgb(164,169,178)` on `rgb(15,16,16)` ≈ 8.1:1; smaller fine-print `rgb(134,139,148)` on the same background ≈ 5.6:1. Both clear the 4.5:1 minimum for normal text.
- **Vertical/city pages carry genuinely written, topic-specific copy**, not find-and-replace text. Groningen's body mentions the Folkingestraat and Grote Markt by name; kapsalon's body talks about online afspraken, "geen gebeld willen worden," and prijslijsten — these are not interchangeable paragraphs.

## Findings

### VIS-1 — Cookie-consent banner is broken on mobile: buttons render off-screen (High)
On mobile (375px viewport), the cookie consent panel is positioned with CSS classes `fixed bottom-6 left-1/2 z-50 w-full max-w-lg px-4` — `left-1/2` with no matching `-translate-x-1/2`. Measured via computed bounding box: the panel sits at `left: 187.5px`, `width: 375px`, i.e. it spans from the horizontal center of the screen to 187.5px *past* the right edge of the viewport. The screenshots (`homepage-mobile-fold.png`, `tarieven-mobile-fold.png`, `kapsalon-mobile-fold.png`, `groningen-mobile-fold.png`, `contact-mobile-fold.png`) all show the "Alles accepteren" / "Alleen noodzakelijk" / "Aanpassen" buttons visibly cut off at the right edge of the screen on every single page. Because there is no horizontal page scroll (confirmed: `scrollWidth === innerWidth`), the clipped portion of the buttons is not reachable by scrolling — it is simply off-canvas. This affects **100% of mobile sessions on every page** since the banner is global.
- Impact: mobile users effectively cannot cleanly interact with the consent choices (the accept button's left half is reachable but the reject/customize options are largely obscured), which is a real GDPR/UX risk and a persistent visual defect on first impression.
- It also visually blocks the bottom ~30–40% of the mobile fold — on `contact-mobile-fold.png` it obscures the entire "Stel je vraag of plan een gesprek" section; on `tarieven-mobile-fold.png` and `kapsalon-mobile-fold.png` it covers pricing/body copy.
- Fix: add `-translate-x-1/2` to the fixed-position wrapper (or switch to `inset-x-0 mx-auto` centering), and re-verify the button row doesn't need `flex-wrap` at 375px width.

### VIS-2 — Kapsalon and Groningen pages are visually indistinguishable except for text (Medium)
Side-by-side comparison of `kapsalon-desktop-fold.png` and `groningen-desktop-fold.png` (and the mobile equivalents) shows identical structure: same breadcrumb pattern, same red eyebrow label style, same H1/paragraph block, same "Actief sinds 2025 · Werkgebied: … · 06 11851093" metadata line, same dual CTA pair ("Vraag een offerte aan" orange button + "Bekijk tarieven" outline button in the same position), and — most notably — **the exact same decorative screenshot image** ("Studio Noord — Ruimtes die rust ademen," an architecture/interior-design portfolio mockup) used as the featured visual on both pages. That image has no connection to either a hair salon or the city of Groningen.
- The body copy itself is genuinely differentiated (see "What works" above), so this is not a full content clone, but the *visual* experience — the thing a human actually perceives when scanning the page — reads as a template with swapped headlines. For a city-vertical page in particular, showing a generic, unrelated portfolio graphic instead of any local proof (a Groningen project, a testimonial, a map, local imagery) undermines the "we know Groningen" positioning the copy is trying to establish, and is a classic signal (to both users and search engines) of programmatically generated location pages.
- Recommendation: swap in a vertical-specific portfolio example on `/website-laten-maken-kapsalon` (a salon-style site, if one exists, or a neutral/no-image treatment) and something Groningen-specific (or at minimum a different, rotating example) on the city page so the two don't present the identical graphic.

### VIS-3 — Tarieven and Contact pages have no in-content CTA above the fold (Low/Medium)
Unlike the homepage and the vertical/city pages (which both feature a prominent orange "Vraag een offerte aan" button in the hero), `/tarieven` and `/contact` rely solely on the persistent nav-bar "Contact" pill for an above-the-fold action.
- On `/contact` specifically this is the most consequential: the fold ends right at (desktop) or before (mobile) the "Stel je vraag of plan een gesprek" section, so the two actual contact mechanisms ("Plan een afspraak" / "Stuur een bericht") require scrolling on both viewports — and on mobile they're further hidden behind the VIS-1 cookie banner. For the one page whose entire purpose is conversion, making the visitor scroll (and fight a broken cookie overlay) before finding a way to act is a missed opportunity.
- Recommendation: pull one of the two contact-method cards (or a single "Plan een afspraak" button) into the hero copy block so it's visible without scrolling, consistent with how the homepage and vertical pages already do it.

### VIS-4 — Nav "Contact" pill and cookie-banner buttons fall under the 48px touch-target guideline (Low)
Measured on mobile (kapsalon page, representative of the shared header/cookie components):
- Header "Contact" button: 91×**38px** (height below the 48px recommendation).
- Cookie banner "Alles accepteren" / "Alleen noodzakelijk": 293×**35px** each (also below 48px, and per VIS-1 partly off-screen besides).
- By contrast, the in-page CTAs are already correctly sized: "Vraag een offerte aan" 188×48px, "Bekijk tarieven" 144×50px.
- Not a major issue on its own, but combined with VIS-1 it compounds friction on the cookie interaction specifically.

### VIS-5 — No above-the-fold layout shift observed in this pass (informational)
Screenshots were taken after `networkidle` + an 800ms settle delay, so this run cannot speak to first-paint shift, only settled state. Settled layouts show no obvious broken positioning, overlap, or text truncation outside of the VIS-1 cookie banner. This corroborates the prior (2026-09-04) headless-HTTP finding that width/height attributes are present on all images and CLS risk is architecturally low; a dedicated CLS trace (e.g. Lighthouse/CDP) would be needed to confirm empirically, which is out of scope for a static screenshot pass.

## Above-the-fold scorecard

| Page | H1 visible w/o scroll | CTA visible w/o scroll | Value prop clear | Mobile layout intentional |
|---|---|---|---|---|
| Homepage | Yes (both) | Yes — dual CTA, both viewports | Yes, one-sentence, immediate | Yes — full-bleed hero reflows cleanly |
| Tarieven | Yes (both) | Nav-only (no in-hero CTA) | Yes — price stated in H1 subtext (€499 / €30/mo) | Yes, but cookie banner covers pricing cards on mobile |
| Kapsalon | Yes (both) | Yes — orange "Vraag een offerte aan" | Yes, salon-specific | Yes; identical layout/image to Groningen (VIS-2) |
| Groningen | Yes (both) | Yes — orange "Vraag een offerte aan" | Yes, city-specific text | Yes; identical layout/image to kapsalon (VIS-2) |
| Contact | Yes (both) | Nav-only; real contact actions require scroll | Yes | Cookie banner covers most of the actionable content on mobile |

## Recommended next steps (priority order)
1. Fix the cookie-consent centering bug (VIS-1) — global, affects every page, actively blocks interaction on mobile.
2. Replace the shared "Studio Noord" portfolio image on the kapsalon and Groningen pages with vertical/location-relevant visuals (VIS-2) to make the differentiation real, not just textual.
3. Add an in-hero CTA button to `/contact` (and consider one for `/tarieven`) so the fold matches the standard already set by the homepage and vertical pages (VIS-3).
4. Bump the header "Contact" button and cookie-banner buttons to ≥48px tap height (VIS-4).
5. Re-capture desktop/mobile screenshots after the above land, and pair with a CLS trace, to close out VIS-5.
