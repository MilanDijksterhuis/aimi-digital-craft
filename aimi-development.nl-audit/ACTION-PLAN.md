# Action Plan — aimi-development.nl

**Date:** 2026-09-04 · **Health Score:** 79/100
Ordered by impact ÷ effort. Phase 1 is roughly half a day and moves the score most.

---

## Phase 1 — Critical fixes (this week)

### 1.1 Enable compression for static assets `[Critical · 15 min · server]`

**Impact: highest on the site.** Saves ~870 KB per uncached visit.

nginx currently gzips only the proxied HTML, not the files it serves from disk. In the server block:

```nginx
gzip on;
gzip_vary on;
gzip_comp_level 6;
gzip_min_length 1024;
gzip_proxied any;
gzip_types
    application/javascript
    text/javascript
    text/css
    application/json
    image/svg+xml
    font/woff2;
```

Brotli is better still if `ngx_brotli` is available (`brotli on; brotli_types <same list>;`) — roughly 15–20% smaller again.

Verify:

```bash
curl -sI -H "Accept-Encoding: gzip, br" https://aimi-development.nl/assets/index-B6pDCZvI.js | grep -i content-encoding
```

Expect `Content-Encoding: gzip` (or `br`). Currently returns nothing.

> Do **not** gzip `.webp` — it is already compressed. It needs caching (1.2), not compression.

### 1.2 Add cache headers for fonts and images `[High · 10 min · server]`

`/fonts/*.woff2` and `/assets/*.webp` return no `Cache-Control` at all — including the **LCP hero image**. Extend the static location to cover them, and collapse the duplicate header while there (an `expires` directive and an `add_header` are both firing, producing two `Cache-Control` lines):

```nginx
location ~* \.(js|css|woff2|webp|png|jpg|svg|avif)$ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    access_log off;
}
```

### 1.3 Deploy the IndexNow key route `[High · 5 min]`

`https://aimi-development.nl/b03bb73bce86422c6a74b3cfc829f2dd.txt` returns **404**, so every IndexNow submission is rejected and the feature does nothing.

The route already exists locally but is uncommitted:

- `src/routes/b03bb73bce86422c6a74b3cfc829f2dd[.]txt.tsx`
- `scripts/indexnow-submit.mjs`

Commit and deploy, then confirm the URL returns the key as plain text.

---

## Phase 2 — Trust & compliance (weeks 2–3)

### 2.1 Add KvK, BTW and postal address to the footer `[High · 30 min]`

Currently **0 of 48 pages** show either number. This is a legal requirement for a Dutch business under the Handelsregisterwet, and simultaneously the cheapest E-E-A-T signal available.

Add to [Footer.tsx](src/components/Footer.tsx) so it appears site-wide: company name, Veendam postal address, KvK number, BTW-ID, phone, email.

### 2.2 Complete the Organization schema `[High · 20 min]`

`ProfessionalService` is a `LocalBusiness` subtype, so Google expects an address. The `/#organization` entity in [seo.ts](src/lib/seo.ts) currently has none. The real Veendam address is already used on the city page — reuse it:

```js
address: { "@type": "PostalAddress", streetAddress: "…", postalCode: "…",
           addressLocality: "Veendam", addressRegion: "Groningen", addressCountry: "NL" },
geo: { "@type": "GeoCoordinates", latitude: 53.1042, longitude: 6.8778 },
openingHoursSpecification: [{ "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
  opens: "09:00", closes: "17:00" }],
priceRange: "€€",
```

### 2.3 Start collecting reviews `[High · ongoing]`

No reviews anywhere, and no `aggregateRating` because there is nothing real to mark up. A Google Business Profile already exists (it is the one `sameAs` link). Ask every delivered client for a Google review; add `aggregateRating` **only once genuine reviews exist** — never mark up ratings without them.

### 2.4 Expand `sameAs` `[Medium · 15 min]`

One Maps link is thin corroboration for entity resolution. Add LinkedIn, Instagram/Facebook and the KvK register URL as they become available.

### 2.5 Fix over-length titles `[Medium · 15 min]`

| Page | Now | Suggested |
|---|---|---|
| `/seo` | 70 | SEO laten doen \| Technisch, snel & lokaal vindbaar — AIMI |
| `/` | 64 | AIMI — Webdesignbureau Noord-Nederland \| Websites & webshops |
| `/tarieven` | 63 | Wat kost een website? \| Tarieven vanaf € 499 — AIMI |
| `/website-laten-vernieuwen` | 61 | Website laten vernieuwen \| Opknappen of opnieuw — AIMI |

Also: add `og:url` to `/privacybeleid` and `/algemene-voorwaarden`, and fix the `&#x27;` double-encoding in the `/website-laten-maken-schilder` and `/website-laten-maken-roden` descriptions.

---

## Phase 3 — Content & authority (month 2)

### 3.1 Build a portfolio or case-study section `[High · significant]`

The largest single gap. The site sells websites and shows none. Even three case studies — problem, approach, outcome, screenshot — would address the proof gap (SXO-1), give the site its first genuinely linkable asset (BL-1), and create material worth citing.

### 3.2 Add author identity to the programmatic pages `[High · moderate]`

Aidan and Milan appear on 6 of 48 pages, and on **none** of the 30 pages built to attract visitors. Add a short bylined block — photo, name, one line of experience — to the city and branch templates, plus `Person` schema linked via `founder`/`employee` (GEO-2). For a two-person agency the founders *are* the differentiator; right now they are the least visible thing on the site.

### 3.3 Build contextual internal links `[Medium · moderate]`

Every page currently links to every other page, so internal linking conveys no hierarchy. Use the existing "Ook interessant" blocks to create one: city pages → regional hub + main service page; branch pages → 2–3 genuinely related branches + `/tarieven`. In-body contextual links carry more weight than boilerplate nav links.

### 3.4 Add outbound citations `[Medium · 1 hour]`

Zero external links site-wide. Add a handful of honest ones — web.dev on Core Web Vitals from `/seo`, the KvK register from `/over-ons`, Rijksoverheid where legal obligations are mentioned. Helps E-E-A-T and materially helps AI citability.

### 3.5 Enrich `/contact` `[Medium · 30 min]`

At 304 words it is the thinnest page on the site, and it is where intent is highest. Add postal address, opening hours, response-time commitment, service area, and what happens after submitting. Add `ContactPage` schema with `contactPoint`.

---

## Phase 4 — Performance & monitoring (ongoing)

### 4.1 Trim the homepage modulepreload list `[High · 1 hour]`

21 `modulepreload` hints fire on the homepage, including `auth-middleware`, `contact.functions`, `calendar`, `mail` and `send` — none needed to render it. They compete with the LCP image and font for early bandwidth. Preload the critical path only.

### 4.2 Split portal/admin code out of the public bundle `[Medium · moderate]`

The 881 KB main bundle carries Radix UI (54 KB) largely needed by the authenticated portal and admin, not by marketing pages. Route-level splitting would cut first-visit payload materially. Do this **after** 1.1 — compression alone changes the picture.

### 4.3 Lazy-load below-fold images `[Low · 15 min]`

0 of 33 images use `loading="lazy"`. Add it to below-fold images; keep the hero eager.

### 4.4 Optimise `og-image.png` `[Low · 10 min]`

112 KB PNG, fetched by every crawler and link unfurler.

### 4.5 Make sitemap `lastmod` real `[Low · 30 min]`

47 of 48 URLs claim 2026-08-20/22 despite a 2026-09-03 deploy. Derive it from actual content changes or drop the field — inaccurate dates train Google to ignore it.

### 4.6 Connect measurement `[High · 30 min]`

This audit had no field data. Worth doing before the next one:

- **Google Search Console** — real LCP/INP/CLS, indexation, query data
- **Bing Webmaster Tools** (free) — backlink profile and anchor text, so the authority category can be scored
- Re-run this audit afterwards to measure Phase 1 impact

---

## Expected impact

| After | Score |
|---|---|
| Now | **79** |
| Phase 1 | **~85** — Performance 58 → 85, Technical 78 → 90 |
| Phase 2 | **~89** — Content, Schema and Local all lift |
| Phase 3 | **~93** — Content Quality and authority |
