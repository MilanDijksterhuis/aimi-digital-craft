# On-Page SEO — 2026-09-04

Score: **96/100** (was 90) — sterkste categorie; alle findings zijn doorgevoerd.

## What works

| Check | Result |
|---|---|
| Canonical present & correct | 48/48 |
| Exactly one `<h1>` | 48/48 |
| `<html lang="nl">` | 48/48 |
| Viewport meta | 48/48 |
| `og:image` / `og:title` / `og:type` | 48/48 |
| `twitter:card` | 48/48 |
| Duplicate titles | 0 |
| Duplicate descriptions | 0 |
| Missing descriptions | 0 |
| Accidental `noindex` | 0 |

Heading hierarchy is clean throughout, and no page relies on client-side rendering for its primary content — every title, heading and paragraph is present in the raw SSR HTML.

## Findings

### OP-1 — Four titles exceed the SERP display limit (Medium) · **OPGELOST 2026-09-04**
| Chars | Page | Title |
|---|---|---|
| 70 | `/seo` | SEO laten doen \| Technische SEO, snelheid & lokale vindbaarheid — AIMI |
| 64 | `/` | AIMI — Webdesignbureau uit Noord-Nederland \| Websites & webshops |
| 63 | `/tarieven` | Wat kost een website laten maken? \| Tarieven vanaf € 499 — AIMI |
| 61 | `/website-laten-vernieuwen` | Website laten vernieuwen \| Opknappen of opnieuw bouwen — AIMI |

Google truncates around 60 characters. `/seo` loses "— AIMI" and part of "lokale vindbaarheid"; `/tarieven` risks losing the "€ 499" price hook, which is its strongest click driver.

### OP-2 — Two pages missing `og:url` (Low) · **OPGELOST 2026-09-04**
`/privacybeleid` and `/algemene-voorwaarden` — the only two pages without it. Low impact (legal pages are rarely shared), but it is an inconsistency in an otherwise complete set.

### OP-3 — Six descriptions slightly under target (Low) · **OPGELOST 2026-09-04**
112–117 characters where 120–160 is the useful range: `/website-laten-maken-assen` (117), `/branches` (116), `/website-laten-maken-autorijschool` (115), `/website-laten-maken-klusbedrijf` (113), `/website-laten-maken-schilder` (112), `/website-laten-maken-roden` (112).

Not a ranking factor, but each is leaving roughly half a line of free SERP real estate unused.

### OP-4 — dubbele HTML-encoding · **VERVALT**
Gemeld als `&#x27;` double-encoding in twee descriptions. Dat was een fout in de
crawler van deze audit: die decodeerde `&#39;` wel en `&#x27;` niet. De live HTML
bevat `&#x27;` precies één keer geëncodeerd — correcte React-output — en nul hits
op `&amp;#x27;`. Er was niets kapot.
