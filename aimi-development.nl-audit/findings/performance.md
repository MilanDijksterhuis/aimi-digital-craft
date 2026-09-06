# Performance — 2026-09-04

Score: **58/100** — zwakste categorie, en volledig op te lossen in de serverlaag.

> **Diagnose aangescherpt 2026-09-04:** nginx heeft `gzip on` staan (de HTML komt
> gecomprimeerd binnen), maar `gzip_types` staat op de standaardwaarde `text/html`.
> Daardoor valt alles wat geen HTML is buiten de compressie. Eén directive lost het op.
>
> Let op: de niet-gecommitte `compressStaticAsset` in `src/server.ts` lost dit **niet**
> op — nginx serveert `/assets/` rechtstreeks van schijf (bewijs: `Last-Modified`,
> `ETag: "6a998f71-d7411"`, `Accept-Ranges`) en proxyt die requests nooit naar Node.

## What works

- **TTFB: 46 ms median**, 275 ms worst case. Excellent SSR.
- **LCP image preloaded correctly** with a responsive `imageSrcSet` (640/960/1280 WebP variants).
- **Font self-hosted** (no third-party origin) and preloaded with `crossorigin`.
- **`max-age=31536000, immutable`** on hashed JS/CSS — correct strategy for fingerprinted assets.
- **Zero render-blocking third-party scripts.** Calendly is CSP-allowed but not loaded upfront.
- HTML gzipped, average 42 KB.

## Findings

### PERF-1 — No compression on any static asset (Critical)
See TECH-1. The main bundle ships **881 KB instead of 248 KB**; total JS/CSS is roughly **1.2 MB instead of ~330 KB**.

This is the single highest-impact fix on the site. It is a server config change, requires no code edit, and cannot regress anything.

### PERF-2 — 881 KB main bundle is oversized even compressed (High)
At 248 KB gzipped, `index-B6pDCZvI.js` is still large for a marketing site. Contributors visible in the chunk graph: `radix` (54 KB raw) and `motion` (127 KB raw).

Radix UI is largely needed by the **authenticated portal and admin**, not by public marketing pages. Splitting portal/admin code out of the route bundle that public pages load would cut what a first-time visitor downloads before anything is interactive.

### PERF-3 — 21 modulepreload-hints op de homepage (Low) · **AFGEZWAKT**
Oorspronkelijk gemeld als High, met de claim dat de homepage chunks preloadt die
hij niet nodig heeft (`auth-middleware`, `contact.functions`, `calendar`, `mail`,
`send`). Dat klopte niet: [index.tsx](../../src/routes/index.tsx) rendert echt
`<Contact />`, dus die chunks horen bij de afhankelijkheden van de pagina.

Wat overblijft is veel kleiner: de code van het formulier onder de vouw laadt met
dezelfde prioriteit als content erboven. Na compressie (PERF-1) is het totaal
~330 KB en is dit geen prioriteit meer.

**Bewust niet aangepast.** Het contactformulier lazy laden zou het uit de
SSR-HTML halen, en dat is content die Google juist moet zien — slechter voor SEO
dan de winst waard is.

### PERF-4 — LCP image and font uncached (High)
See TECH-2. The hero WebP (74 KB) is the LCP element and carries no `Cache-Control`; the preloaded font (27 KB) likewise. Repeat visitors pay for both again.

### PERF-5 — Lazy loading op afbeeldingen · **VERVALT**
Gemeld als "0 van 33 afbeeldingen gebruikt `loading="lazy"`". Er staat één `<img>`
in de codebase: de LCP-hero, die juist niet lazy hoort te zijn. Zie
[images.md](images.md).

### PERF-6 — Homepage HTML is 109 KB (Low)
More than twice the 42 KB site average, largely from 25 inline FAQ entries in JSON-LD plus 12.7 KB of inline scripts. Not urgent, but it delays first paint slightly on slow connections.

## Note on field data
No CrUX/Search Console credentials were configured for this audit, so all measurements above are lab/transfer-level. Connecting Search Console would let the next audit report real-user LCP/INP/CLS.
