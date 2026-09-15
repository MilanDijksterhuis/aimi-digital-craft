# SEO Audit — aimi-development.nl

**Datum:** 15 september 2026
**Scope:** volledige site, 48 pagina's (100% van de sitemap gecrawld)
**Methode:** 9 gespecialiseerde analyses (technisch, content, schema, performance, visueel/mobiel, GEO/AI, lokaal, SXO, backlinks) + on-page analyse over alle 48 pagina's. Lighthouse 12.8.2 lab-metingen (geen CrUX/GSC-velddata — geen Google API-key geconfigureerd).
**Bedrijfstype:** service area business — webdesignbureau (Veendam), werkgebied Noord-Nederland.

---

## Gezondheidsscore: 80 / 100

| Categorie | Gewicht | Score |
|---|---|---|
| Technical SEO | 22% | **90** |
| Content Quality | 23% | **55** |
| On-Page SEO | 20% | **92** |
| Schema / Structured Data | 10% | **87** |
| Performance (CWV, lab) | 10% | **74** |
| AI Search Readiness (GEO) | 10% | **82** |
| Images | 5% | **92** |
| *Aanvullend (buiten weging):* | | |
| *Local SEO* | — | *44* |
| *Visual / Mobile UX* | — | *70* |
| *SXO (5-keyword gap)* | — | *63* |
| *Backlinks* | — | *onvoldoende data* |

Vorige audit (6 sep 2026): 81. De score is stabiel; performance verbeterde fors (58 → 74, compressie/caching opgelost), content scoort strenger door correctie op echte main-content-woordaantallen (crawl-tellingen bleken ~1,7× geïnflateerd door nav/footer).

**Het patroon in één zin:** de site is technisch vrijwel af — het gat zit in *bewijs en zichtbaarheid buiten de site*: geen cases/reviews/portfolio, geen KvK/adres, geen citaties, onzichtbaar Bedrijfsprofiel.

---

## Top 5 kritieke bevindingen

1. **Nul bewijs van geleverd werk** — geen cases, portfolio, klantnamen, testimonials of reviews op alle 48 pagina's. Grootste E-E-A-T- en conversiegat; concurrenten in dezelfde SERP's tonen 3–5 benoemde cases en reviewaantallen. (CQ-1, SXO-6/8)
2. **KvK, BTW en straatadres ontbreken overal** — ook op de juridische pagina's; wettelijk verplicht in NL en blokkeert directory-citaties. De velden in `src/lib/seo.ts` zijn voorbereid maar leeg; footer en schema renderen ze automatisch zodra gevuld. (CQ-2, SCH-1/4)
3. **Cookiebanner valt op mobiel half buiten beeld, site-breed** — `src/components/CookieBanner.tsx:67` mist `-translate-x-1/2`. (VIS-1)
4. **LCP 3,5–4,3 s (mobiel lab), 83–86% renderuitstel door JS** — hero start op `opacity:0` tot Framer Motion hydrateert; Radix+Framer laden op elke pagina (~141 KB unused JS). Netwerk en afbeeldingen zijn al optimaal. (TECH-1, PERF-1)
5. **Lokale zichtbaarheid vrijwel nul** — Google Bedrijfsprofiel komt niet op bij merkzoekopdracht, nul off-site reviews (Trustpilot/Klantenvertellen 404), nul externe citaties, domein onbekend in Common Crawl. (Local, Backlinks)

## Top 5 quick wins

1. `seo.ts`-velden vullen (adres, postcode, KvK, BTW) + KvK/BTW op /algemene-voorwaarden — één datafix lost vier findings op.
2. Cookiebanner: één CSS-klasse toevoegen.
3. Brotli aanzetten in nginx (nu alleen gzip) — ~60–90 KB/pagina, pure serverconfig.
4. `/wordpress-of-maatwerk` title/H1 retargeten naar "WordPress **vs** maatwerk" — de SERP voor de huidige zoekterm toont uitsluitend "maatwerk WordPress"-dienstpagina's; de vergelijkingsintentie leeft onder de vs-variant. Content is al goed. (SXO-10)
5. Vanaf-prijs tonen op /webshop-laten-maken — nu de enige prijsloze pagina in een prijs-verankerde SERP. (SXO-9)

---

## Per categorie

### Technical SEO — 90/100
Vrijwel foutloos: robots.txt correct (AI-crawlers toegestaan, scrapers geblokkeerd), sitemap valide (48/48 canoniek), 0 canonical-mismatches, redirects en 404-afhandeling correct, security headers op 100% van de pagina's, IndexNow in de deploy-keten, volledige SSR, mediane TTFB 122 ms.
Aandachtspunten: hero op `opacity:0` tot hydratie (High, zie performance), ~21 modulepreloads incl. niet-kritieke chunks, CSP `unsafe-inline`, kleinigheden (dubbele headers, nginx-versie zichtbaar, /CONTACT geeft 200 i.p.v. 301). → `findings/technical.md`

### Content Quality — 55/100
Sterk: branche- en stadspagina's zijn écht per pagina geschreven (similariteit 0,29–0,38 — geen doorway-spam), prijstransparantie is een trust-asset, FAQ-antwoorden zijn citeerbaar.
Zwak: **geen enkel klantbewijs site-breed** (High); kernpagina's dunner dan long-tail (echte telling: /over-ons 223 woorden, /contact 76, /website-laten-maken 474 vs ~690 op branchepagina's); homepage-FAQ is byte-identiek duplicaat van /faq incl. dubbel schema; 30 pagina's delen een identiek 6-secties-skelet (oogt programmatisch); geen freshness-signalen. → `findings/content.md`

### On-Page SEO — 92/100
48/48 unieke titles en descriptions, exact één H1 per pagina, geen orphan-pagina's, footer linkt alle stads- en branchepagina's, schone URL-structuur. Klein: juridische titles te kort; contextuele stad×branche-kruislinks ontbreken. → eigen analyse + `crawl-data.json`

### Schema — 87/100
Nette geconsolideerde entity-graph (Organization/ProfessionalService/WebSite via `ORG_ID`), volledige Offer/prijs-structuur op /tarieven, correcte areaServed-discipline, geen verzonnen ratings. Ontbreekt: adres/geo/openingstijden in de Organization-entity (data, geen code), meer `sameAs`, KvK/BTW, WebPage-schema op /over-ons (éénregelig). → `findings/schema.md`

### Performance — 74/100 (lab)
LCP /: 4,33 s · /website-laten-maken: 3,69 s · /tarieven: 3,54 s (mobiel, throttled). CLS uitstekend (≤0,002), TTFB uitstekend, fonts en afbeeldingen al optimaal. Het knelpunt is uitsluitend main-thread JS (Framer Motion + Radix). Fixes: CSS-animaties above-fold, code-splitting, Brotli, Cache-Control op HTML. → `findings/performance.md` + `lighthouse-runs/`

### AI Search Readiness — 82/100
llms.txt aanwezig en goed; /tarieven en /faq vrijwel ideaal citeerbaar; volledige SSR. Verbeterpunt: merknaam ontbreekt in de citeerbare passages (3/25 FAQ-antwoorden noemen AIMI; /wordpress-of-maatwerk nergens) en de externe brand-voetafdruk is vrijwel nul. → `findings/geo.md`

### Images — 92/100
0 afbeeldingen zonder afmetingen, responsive webp + preload op hero's, decoratieve afbeeldingen correct gemarkeerd. Eén punt: de gedeelde voorbeelden-slideshow toont generieke stockmockups op 23 pagina's. → `findings/visual.md`

### Local SEO — 44/100 (aanvullend)
De zwakste plek, en vrijwel volledig *off-site*: GBP onzichtbaar voor merkzoekopdracht, geen adres, nul reviews, geen KvK, nul citaties. On-site is het juist goed: consistente NAP, correcte LocalBusiness/Service-schema-discipline, gedifferentieerde stadspagina's. → `findings/local.md`

### Visual / Mobile UX — 70/100 (aanvullend)
Cookiebanner-bug (High), tikdoelen < 44 px, tabel-scroll zonder hint, 14 px tekst op /contact. Sterke basis: geen overflow, geen CLS, CTA boven de vouw. Screenshots: `screenshots/`. → `findings/visual.md`

### SXO — 63/100 (aanvullend)
4/5 keywords: paginatype klopt met wat Google beloont, maar het *bewijs*- en *prijs*-gat kost posities. 1/5 (wordpress-of-maatwerk): verkeerde zoekvariant getarget. Kanttekening: SERP-sampling op titel/snippet-niveau, geen GSC-data — verifieer vóór de title-wijziging. → `findings/sxo.md`

### Backlinks — onvoldoende data (aanvullend)
Domein niet aanwezig in Common Crawl (verwacht voor een jong domein). Geprioriteerd NL-linkplan opgesteld: basiscitaties → regionale verenigingen/branchegidsen → klant-colofonlinks → website-checker als open-source linkable asset. → `findings/backlinks.md`

---

## Beperkingen

- Geen Google API-key / Search Console-koppeling: alle CWV-cijfers zijn lab-data, geen velddata; indexatiestatus en querydata konden niet worden gecheckt. Aanrader: GSC + `GOOGLE_API_KEY` configureren vóór de volgende audit.
- Geen Moz/Bing/DataForSEO-keys: backlink-autoriteit niet meetbaar.
- GBP-details (categorie, uren, reviews) zitten achter Googles consent-wall — alleen via het dashboard te verifiëren.
- SERP-analyses zijn ongepersonaliseerde snapshots, geen rank-tracking.

Zie `ACTION-PLAN.md` voor het gefaseerde plan.
