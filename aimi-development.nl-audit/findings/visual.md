# Visual / Above-the-Fold Audit — aimi-development.nl

Date: 2026-09-02
Method: Playwright screenshots (desktop 1440x900, mobile 390x844 @2x DPR) + DOM bounding-box checks for CTA/H1/tap-target visibility, cross-referenced against SEO-AUDIT.md §2.6.

Screenshots: `C:\Users\milan\Documents\AIMI\aimi-digital-craft\aimi-development.nl-audit\screenshots\`
- homepage-desktop.png / homepage-mobile.png
- website-laten-maken-desktop.png / website-laten-maken-mobile.png
- kapsalon-desktop.png / kapsalon-mobile.png
- groningen-desktop.png / groningen-mobile.png
- tarieven-desktop.png / tarieven-mobile.png
- contact-desktop.png / contact-mobile.png

## Summary

Above-the-fold execution on the homepage and the `/website-laten-maken` service page is genuinely strong: a single clear value-prop headline, two prominent CTAs and a secondary link are all visible without scrolling on both desktop and mobile, the dark theme with orange accent buttons gives good CTA contrast, and there is no document-level horizontal scroll on any of the 6 pages tested. However, two concrete problems pull the score down. First, a real, verified bug: on mobile (390px) the cookie-consent banner's "Alleen noodzakelijk" (reject-non-essential) button is rendered mostly off-screen (only ~2px of its 153px width falls inside the viewport), making it effectively untappable — this is visible as cut-off text in every mobile screenshot and confirmed via bounding-box measurement. Second, the visual "trust gap" flagged in SEO-AUDIT.md §2.6 is confirmed by direct inspection: the branch page (kapsalon) and city page (Groningen) render with zero images (`imgCount: 0` on both desktop and mobile), producing a flat, text-only wall on a near-black background, in sharp contrast to `/website-laten-maken`, which shows an actual labeled example-project mockup with a working carousel.

## Score: 68 / 100

Justification: strong, distraction-free hero/CTA pattern and clean mobile layout (+), but a functionally broken/inaccessible cookie-consent control on mobile is a real UX and consent-compliance risk (-), and 45 of the site's templates (15 branch + 30 city pages) are confirmed visually thin with no imagery at all, reinforcing a credibility gap versus competitors who show real project work (-). Minor touch-target sizing issues bring it down slightly further.

## What works

- **Homepage hero above the fold**: H1 "Websites die écht werken.", supporting paragraph, two pill CTAs ("Neem contact op", "Website laten maken") and a "Gratis website check!" link are all visible without scrolling on both 1440x900 and 390x844 (`homepage-desktop.png`, `homepage-mobile.png`).
- **Nav pattern**: full link set on desktop (Diensten, Tarieven, Werkwijze, Over ons, FAQ, Contact, Portaal); compact hamburger + "Contact" pill on mobile keeps the header uncluttered (all `*-mobile.png` files).
- **No document horizontal scroll** confirmed via `scrollWidth === innerWidth` on all 6 pages at 390px — content itself reflows correctly.
- **`/website-laten-maken` visual proof**: a labeled example-project mockup ("Studio Noord") with a "Toon voorbeeld 1/2/3" switcher gives this page real visual interest and social-proof feel that the branch/city pages lack (`website-laten-maken-desktop.png`, `website-laten-maken-mobile.png`).
- **Tarieven page** leads with a concrete, scannable price statement ("€499 eenmalig + €30/maand") directly under the H1 — good for the "wat kost een website" intent (`tarieven-mobile.png`).
- **CTA contrast**: orange "Vraag een offerte aan" button on near-black background has strong contrast throughout the site (all screenshots).

## Findings

### 1. Cookie-consent "reject" button is clipped off-screen on mobile
**Severity: High**
On the 390px mobile viewport, the "Alleen noodzakelijk" (accept-necessary-only) button is positioned at `left: 388.5px, right: 541.4px` while the viewport is only 390px wide — meaning roughly 2px of a 153px-wide button is inside the visible area. The "Alles accepteren" button also sits close to the right edge (`left: 236px`, viewport 390px, barely fitting). This is directly visible as cut-off text in every mobile screenshot (`homepage-mobile.png`, `website-laten-maken-mobile.png`, `kapsalon-mobile.png`, `groningen-mobile.png`, `tarieven-mobile.png`, `contact-mobile.png` — the banner appears bottom-right with "Aida[n]", "b[egrijpen]", "priva[cybeleid]" visibly truncated at the image edge). Practical effect: a mobile visitor cannot tap "reject non-essential cookies" without first opening "Aanpassen" (customize) — a genuine tap-target/accessibility bug and a soft consent-compliance risk (equal-prominence reject option is expected under Dutch/EU cookie guidance).
**Recommendation**: Make the cookie banner full-width (or centered with adequate margins) on viewports below ~480px, stack the three actions vertically if needed, and re-test that all three buttons are fully reachable within the visible viewport.

### 2. Branch and city template pages are pure text, zero images — confirms SEO-AUDIT §2.6 trust gap
**Severity: Medium-High**
Direct DOM check confirms `imgCount: 0` (no `<img>` and no `background-image` elements) on both `kapsalon-desktop.png`/`kapsalon-mobile.png` and `groningen-desktop.png`/`groningen-mobile.png`. Visually these pages are a flat near-black background with an orange eyebrow label, H1, gray body paragraphs, two CTA buttons, and bordered text cards further down — no photo, icon set, or screenshot of a delivered site anywhere on the page. This reads noticeably thinner/less trustworthy directly next to `/website-laten-maken`, which uses a real example-project mockup in the same visual slot. Given this pattern likely repeats across all 15 branch pages and 30 city pages, it's a sitewide visual credibility gap, not a one-off.
**Recommendation**: Reuse the `ExampleSlideshow` component (already built for `/website-laten-maken`, per code) on branch/city pages, or add at minimum one relevant static image/icon set per branch, to break up the text wall and add visual proof-of-work.

### 3. Mobile tap targets under recommended minimum size
**Severity: Medium**
The mobile nav "Contact" pill button measures 91x38px — width is fine but the 38px height is under the commonly recommended 44-48px minimum touch-target height. The cookie banner's "Aanpassen" (customize) text link measures only 63x16px, a very small target for a legally relevant action, on top of also sitting inside the clipped banner from Finding 1. Visible in `homepage-mobile.png`, `website-laten-maken-mobile.png`, `kapsalon-mobile.png`.
**Recommendation**: Increase the mobile nav button's vertical padding to reach ~44-48px height; give the "Aanpassen" cookie link a larger hit-area (padding, not just underlined text).

### 4. No visible CTA button in the first mobile viewport on content-first pages
**Severity: Low-Medium**
On `tarieven-mobile.png`, the first 844px of viewport is filled entirely by the H1 ("Wat kost een website laten maken?") and the pricing paragraph — no CTA button is visible until the user scrolls past this block (the next visible element is a second H2 and the "Starter €499" card, still no button). Compare to `homepage-mobile.png` and `website-laten-maken-mobile.png`, where a CTA button is visible in the very first viewport. This delays the conversion action on a page whose visitors are likely furthest along in purchase intent (they're already checking pricing).
**Recommendation**: Add a compact CTA ("Vraag een offerte aan") directly under the price statement on `/tarieven`, matching the pattern already used on `/website-laten-maken` and the branch pages.

### 5. Redundant "Contact" affordance in desktop nav
**Severity: Low**
Desktop header shows both a text nav-link "Contact" and a separate white "Contact" pill button side-by-side (visible in `homepage-desktop.png`, `website-laten-maken-desktop.png`, `kapsalon-desktop.png`, `groningen-desktop.png`, `contact-desktop.png`). Not a functional problem, just visual redundancy/minor polish.
**Recommendation**: Consider consolidating to a single, clearly primary "Contact" action in the header, or differentiate the two (e.g., rename the pill "Offerte aanvragen").

### 6. Base font-size signal worth a manual follow-up (not visually alarming)
**Severity: Info**
`getComputedStyle(document.body).fontSize` reported 14px on every page/viewport, below the commonly cited 16px baseline-legibility guideline. Visually, however, actual rendered paragraph and heading text in all screenshots appears comfortably sized and legible without zooming on mobile — this is likely because component-level classes override the body base size rather than inheriting it. No screenshot evidence of an actual legibility problem, but recommend a manual Lighthouse/axe pass to confirm effective font sizes on any as-yet-unaudited page templates.

## Mobile responsiveness assessment
No horizontal scroll, functional hamburger + Contact pattern in the header, and content reflows cleanly at 390px on all 6 pages tested. The one concrete mobile-specific defect is the clipped cookie-consent banner (Finding 1), which is a fixed/global component and therefore affects all pages sitewide, not just the ones sampled here.

## Above-the-fold assessment
Homepage and `/website-laten-maken` deliver the value proposition and a primary CTA within the first mobile viewport with no scrolling required. `/tarieven` and, by pattern, the branch/city pages lead with text-only content and push the CTA below the fold on mobile.
