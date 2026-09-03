# Actieplan — aimi-development.nl

Gebaseerd op FULL-AUDIT-REPORT.md (2026-09-02). Gegroepeerd op impact/moeite, niet op auditcategorie — veel bevindingen uit verschillende deelaudits wijzen naar dezelfde onderliggende fix.

## Fase 1: Kritieke fixes (deze week)

1. **Voeg `/website-checker` toe aan `src/routes/sitemap[.]xml.tsx`** — [sitemap.md #1]
2. **Verwijder `howToJsonLd()`-aanroepen van 6 routes**: `onderhoud-hosting.tsx`, `seo.tsx`, `webshop-laten-maken.tsx`, `website-laten-maken.tsx`, `website-laten-vernieuwen.tsx`, `werkwijze.tsx` — [schema.md F-2]
3. **Nginx: zet gzip/brotli aan voor `/assets/*.js` en `*.css`, en HTTP/2** — configuratie-only, geen codewijziging — [technical.md, performance.md Finding 2-3]
4. **Fix mobiele cookiebanner**: full-width of gecentreerd onder ~480px, alle knoppen (incl. "Alleen noodzakelijk") volledig binnen viewport — [visual.md #1]
5. **Onderzoek waarom homepage FAQPage-schema in de code staat maar niet live rendert** — controleer deploy-timestamp vs. commit, mogelijk stale build of head-merge-bug — [schema.md F-1, content.md CQ-2]

## Fase 2: High-impact verbeteringen (week 2-3)

6. **Voeg telefoonnummer, KvK-nummer en BTW-nummer toe** aan footer, `/contact` en de Veendam `LocalBusiness`-schema — kies bewust: één nummer overal, of expliciet bevestigen dat GBP ook geen nummer toont — [local.md #1-2, content.md CQ-1]
7. **Zet een concreet startbedrag vooraan in de prijsparagraaf van alle 15 branchepagina's** (hergebruik de cijfers van `/tarieven`) — al gesignaleerd op 24-08 als C-2, nog steeds niet doorgevoerd — [content.md CQ-4, sxo.md SXO-2]
8. **Voeg een "trust-strip" toe aan alle 15 stadspagina's**: oprichtingsjaar (indien waar, niet verzinnen), werkgebied, contactblok — geen nieuwe pagina's nodig, één herbruikbaar component — [sxo.md SXO-1]
9. **Hergebruik `ExampleSlideshow` op branche- en stadspagina's** (minimaal 1-2 generieke voorbeeldschermen per branche) — component bestaat al voor `/website-laten-maken` — [visual.md #2, sxo.md SXO-4, geo.md #4]
10. **Reduceer JS-bundlegewicht**: analyseer de 695KB hoofdbundel (61% ongebruikt) met een bundle-visualizer, lazy-load `motion/react`-gebruik onder de vouw, controleer Radix-imports (71% ongebruikt) — [performance.md Finding 3]
11. **Extraheer kritieke CSS** (106KB render-blocking) naar inline `<head>`, laad de rest async — [performance.md Finding 2]
12. **Optimaliseer de LCP-tekst zelf** (niet de afbeelding): zorg dat de hero-subtekst direct zichtbaar is in de SSR-HTML, zonder JS-gated animatie-vertraging — [performance.md Finding 1]
13. **Maak een LinkedIn-bedrijfspagina en voeg toe aan `sameAs`** — [local.md #3, geo.md #5, backlinks.md #2]

## Fase 3: Content & autoriteit (maand 2)

14. **Verzamel 2-3 echte klantcases** met concrete resultaten (buiten de code, vereist klantmedewerking) — hoogste hefboom voor E-E-A-T/citability, zie ook GEO-audit — [geo.md #1, content.md CQ-5]
15. **Start met het verzamelen van echte Google-reviews** na oplevering — voeg pas dan `aggregateRating` toe aan schema — [local.md #5]
16. **Herschrijf openingszinnen van contentblokken naar zelfstandige 40-60-woorden antwoorden** (verwijder UI-verwijzingen zoals "de knop hierboven") — verbetert AI-citeerbaarheid — [geo.md #2]
17. **Voeg een marktvergelijkingssectie toe aan `/tarieven`** ("wat kost een website gemiddeld in Nederland") naast AIMI's eigen tarieven, voor de awareness-fase bezoeker — [sxo.md SXO-2]
18. **Voeg CRM/koppelings-content toe aan de makelaarpagina** — laagst scorende persona in de SXO-audit — [sxo.md SXO-3]
19. **Compileer een lijst van opgeleverde klantsites en controleer op "website door AIMI"-credits** (`verify_backlinks.py`) — realistische linkbron zonder externe kosten — [backlinks.md #3]
20. **Breid `/over-ons` en de homepage-body uit** met checkbare, niet-verzonnen specifieke details — [content.md CQ-2, CQ-3]

## Fase 4: Monitoring & lage prioriteit (doorlopend)

21. Verwijder dubbele HTTP-headers (nginx + server.ts zetten dezelfde header) — [technical.md]
22. Fix de dubbele redirect-hop voor `http://www...` — [technical.md]
23. Voeg `faqJsonLd()` toe aan de 15 stad- en 15 branchepagina's voor schema-consistentie (geen Google-richresult-voordeel meer, optioneel voor AI/GEO) — [schema.md F-4, local.md #6]
24. Verleng geo-coördinaten naar 5 decimalen — [local.md #6]
25. Voeg Speculation Rules toe voor prefetch/prerender van veelgeklikte navigatiepaden — [performance.md Finding 5]
26. Herhaal de Common Crawl-check volgend kwartaal om domeinopname te volgen — [backlinks.md #1]
27. Controleer handmatig Nederlandse bedrijvengidsen (KvK-gekoppeld, Clutch/Sortlist) — [backlinks.md #4, local.md #4]
28. Verifieer handmatig de Google Business Profile-categorie en volledigheid — [local.md #4]

---

**Buiten de code, hoogste hefboom volgens meerdere audits onafhankelijk:** echte reviews verzamelen en echte cases publiceren. Geen enkele codewijziging compenseert het ontbreken hiervan — dit is al in de audit van 24 augustus als hoofdconclusie benoemd en wordt door alle vier de relevante deelaudits (content, GEO, SXO, local) opnieuw bevestigd.
