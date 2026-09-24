# AIMI SEO AUDIT — SEPTEMBER 2026
### Branchepagina's aimi-development.nl · auditdatum 23 september 2026 · alleen audit, geen code gewijzigd

> **Leeswijzer.** Elke bevinding is gemarkeerd met de bron:
> **[CODE]** = vastgesteld in de repository (bestand:regel) · **[ARCHIEF]** = gearchiveerde crawl `aimi-development.nl-audit/crawl-data.json` (15-09-2026) ·
> **[GOOGLE]** = officiële Google-richtlijn/documentatie · **[INDUSTRIE]** = SEO-vakpers/observatie · **[AANNAME]** = niet geverifieerd.
> Er staan **geen** zoekvolumes, Lighthouse-scores, rankings of AI-citatieclaims in dit rapport: die data was niet beschikbaar.

---

## Executive Summary

AIMI heeft **15 branchepagina's** op één gedeelde template (`src/components/BranchPage.tsx`) plus een hub (`/branches`). De basis is **technisch gezond**: server-side gerenderd (TanStack Start, `node-server` preset), self-referencing canonicals, in de sitemap, 200-status in de archiefcrawl, Service + BreadcrumbList + FAQPage JSON-LD.

De **bodytekst is aantoonbaar uniek per branche**: gemeten 5-gram-overlap tussen branchepagina's is laag (mediaan ±2%, maximum ±8%, loodgieter↔schilder). Dit is géén set keyword-substitutiepagina's.

De risico's zitten in de **laag eromheen**:

1. **Template-bug (P1):** `BranchPage` bouwt de pagina-URL uit het veld `branch` in plaats van uit de route. Bij **7 van 15 pagina's** wijst het WebPage-schema (`@id`, `url`) daardoor naar een **niet-bestaande URL**, en tonen ze een **"Bijgewerkt op"-datum die elke dag de datum van vandaag is**. Dat is een onjuist versheidssignaal dat niet overeenkomt met de sitemap.
2. **Hetzelfde "definitie"-blok boven de vouw op alle 15 pagina's**, met een prijsclaim (€ 499–€ 749) die sommige pagina's verderop zelf tegenspreken ("valt bijna altijd buiten de standaardpakketten").
3. **Geen branchebewijs:** 11 pagina's tonen dezelfde drie generieke screenshots (architectenbureau, praktijk, SaaS). Er zijn geen cases, reviews of klantnamen per branche.
4. **Zwakke interne linking:** de homepage, `/website-laten-maken`, `/tarieven` en de blog linken naar geen enkele branchepagina. `/website-laten-maken-schilder` krijgt maar één contextuele inlink (vanaf `/branches`).
5. **Structuur-template en FAQ's herhalen zich:** op alle 15 pagina's staan dezelfde vijf stappen (begin "Kennismaking", eind "Livegang en beheer"), dezelfde FAQ over de bouwtijd en hetzelfde CTA-blok. Vier pagina's hebben meta-SEO-FAQ's ("Wordt mijn site gevonden op 'X website laten maken'?").
6. **Geen adres, KvK of BTW-nummer** in code, footer of schema (`src/lib/seo.ts:42-53` staan leeg). Dat zwakt trust en entity-duidelijkheid af, en de code zelf noemt KvK/BTW wettelijk verplicht.

Het doorway- en scaled-content-risico schat ik **laag tot gemiddeld** in: laag op de bodytekst, gemiddeld op de template-laag en door het ontbrekende bewijs. Dit is een **risico-inschatting, geen oordeel dat Google iets bestraft**.

**Gemiddelde AIMI Internal SEO Audit Score: 5,9 / 10** (interne methodiek, geen Google-score).

---

## 1. Scope

| Onderdeel | Invulling |
|---|---|
| Codebase | `milandijksterhuis/aimi-digital-craft`, branch `claude/aimi-branch-pages-seo-audit-ncik6x`, working tree clean |
| Stack | TanStack Start + React 19, SSR via Nitro `node-server` (`vite.config.ts:4-10`), eigen `src/server.ts` (redirects, headers) |
| Onderzocht | `src/routes/*` (alle publieke routes), `BranchPage.tsx`, `ExampleSlideshow.tsx`, `TrustStrip.tsx`, `UpdatedOn.tsx`, `Breadcrumbs.tsx`, `Nav.tsx`, `Footer.tsx`, `__root.tsx`, `lib/seo.ts`, `lib/site-pages.ts`, `sitemap[.]xml.tsx`, `llms[.]txt.tsx`, `public/robots.txt`, `public/voorbeelden/*`, `server.ts`, blog-migraties (interne links), bestaande auditbestanden |
| Branchepagina's | 15 + hub `/branches` |
| Buiten scope | 15 locatiepagina's (alleen meegenomen voor interne links en cannibalisatie), blog-inhoud (die staat in Supabase, niet in de repo) |
| Externe bronnen | WebSearch (secundaire bronnen en vakpers). **`developers.google.com` en `aimi-development.nl` waren geblokkeerd door de egress-proxy** (HTTP 403 `connect_rejected`). Officiële Google-pagina's zijn daarom niet direct opgehaald. Waar ik ze citeer, is de inhoud bevestigd via meerdere onafhankelijke vakbronnen die naar die pagina verwijzen. |
| Beperkingen | Geen live-crawl, geen statuscodes van vandaag, geen Search Console, geen CrUX/PageSpeed, geen zoekvolumes, geen NL-Google-SERP (WebSearch is US-based), geen device-test, geen GBP-dashboard |

---

## 2. Branchepagina-inventaris

Alle pagina's gebruiken template `BranchPage` en staan in `PAGE_DATES` (`src/lib/seo.ts:124-139`) en dus in de sitemap. Alle hebben een self-canonical, `index` (geen robots-meta) en 200 in de archiefcrawl.

| # | Branche | URL / route-bestand | `branch`-veld | Woorden* | H2 | FAQ | Beelden | Contextuele inlinks** |
|---|---|---|---|---|---|---|---|---|
| 1 | Autobedrijf | `/website-laten-maken-autobedrijf` | autobedrijf | ~970 | 7 | 7 | generiek (3) | 2 |
| 2 | Autorijschool | `/website-laten-maken-autorijschool` | autorijschool | ~860 | 7 | 7 | generiek | 2 |
| 3 | Bloemist | `/website-laten-maken-bloemist` | **bloemenwinkel** ⚠ | ~880 | 7 | 7 | generiek | 2 |
| 4 | Boekhouder | `/website-laten-maken-boekhouder` | **administratiekantoor** ⚠ | ~870 | 7 | 7 | generiek | 3 |
| 5 | Cateringbedrijf | `/website-laten-maken-cateringbedrijf` | cateringbedrijf | ~880 | 7 | 7 | generiek | 2 |
| 6 | Hovenier | `/website-laten-maken-hovenier` | **hoveniersbedrijf** ⚠ | ~930 | 7 | 7 | generiek | 4 |
| 7 | Kapsalon | `/website-laten-maken-kapsalon` | kapsalon | ~860 | 7 | 7 | wellness (3) | 3 |
| 8 | Klusbedrijf | `/website-laten-maken-klusbedrijf` | klusbedrijf | ~880 | 7 | 8 | generiek | 6 |
| 9 | Loodgieter | `/website-laten-maken-loodgieter` | **loodgietersbedrijf** ⚠ | ~780 | 7 | 8 | generiek | 3 |
| 10 | Makelaar | `/website-laten-maken-makelaar` | **makelaarskantoor** ⚠ | ~900 | 7 | 7 | generiek | 2 |
| 11 | Nagelstudio | `/website-laten-maken-nagelstudio` | nagelstudio | ~820 | 7 | 7 | wellness | 2 |
| 12 | Pedicure | `/website-laten-maken-pedicure` | **pedicurepraktijk** ⚠ | ~810 | 7 | 7 | wellness | 2 |
| 13 | Restaurant | `/website-laten-maken-restaurant` | restaurant | ~935 | 7 | 7 | generiek | 9 |
| 14 | Schilder | `/website-laten-maken-schilder` | **schildersbedrijf** ⚠ | ~850 | 7 | 8 | generiek | **1** |
| 15 | Schoonheidssalon | `/website-laten-maken-schoonheidssalon` | schoonheidssalon | ~770 | 7 | 7 | wellness | 5 |
| — | Hub | `/branches` (`src/routes/branches.tsx`) | — | 437 (archief) | 5 | — | geen | nav + footer |

\* Unieke datavelden, zonder template-tekst. De archiefcrawl mat 1.095–1.293 woorden per pagina, inclusief nav, footer en template.
\*\* In-content links vanuit andere pagina's in de repo (`/branches` meegeteld). Sitemap, `llms.txt`, nav en footer niet meegeteld. Blogposts in de database zijn niet gecontroleerd.
⚠ = `branch` ≠ slug → template-bug, zie §3.1.

**Vaste H2's per pagina:** needs-kop, pitfalls-kop, approach-kop, pricing-kop, "Veelgestelde vragen", "Ook interessant", "Klaar voor een nieuwe website voor je {branch}?".
**Vaste CTA's:** "Vraag een offerte aan" (`/contact`), "Bekijk tarieven" (`/tarieven`), tel-link in TrustStrip, eind-CTA "Neem contact op" (`/contact`).
**Externe links:** geen.
**Alt-teksten:** aanwezig, maar generiek ("Voorbeeld website voor een SaaS-bedrijf", ook op de loodgieterpagina).

---

## 3. Overall Technical SEO

### 3.1 [P1] Slug-bug in `BranchPage`: verkeerde URL in schema en een dagelijks wisselende "Bijgewerkt op"-datum [CODE]
`src/components/BranchPage.tsx:216`:
```ts
const slug = `/website-laten-maken-${branch}`;
```
`branch` is de lopende-tekstterm, niet de slug. Voor bloemist, boekhouder, hovenier, loodgieter, makelaar, pedicure en schilder levert dit bijvoorbeeld `/website-laten-maken-makelaarskantoor` op. Die route bestaat niet (→ 404).

Gevolgen:
- **WebPage JSON-LD** (`BranchPage.tsx:221-230` → `seo.ts:220-242`): `@id` en `url` wijzen naar een 404-URL, terwijl de canonical correct is. Dat geeft tegenstrijdige entity-signalen.
- **`pageLastmod()`** (`seo.ts:186-187`) valt voor een onbekend pad terug op **vandaag**. De zichtbare "Bijgewerkt op" (`UpdatedOn`) en `dateModified` tonen op deze 7 pagina's dus elke dag de datum van die dag. De sitemap zegt ondertussen 21-08, 22-08 of 04-09-2026. Dit is precies het soort kunstmatig versheidssignaal dat de code zelf wil voorkomen (`seo.ts:89-98`).
- De "definitie"-tekst en de CTA-kop gebruiken dezelfde term, wat klopt maar stroef leest ("ondernemers in de branche administratiekantoor").

**Recommended action:** geef `BranchPageData` een expliciet `slug`- of `path`-veld (of lees het pad uit de router), gebruik dat voor `webPageJsonLd` en `UpdatedOn`, en laat `pageLastmod` bij onbekende paden géén "vandaag" teruggeven maar falen of een waarschuwing loggen.

### 3.2 Indexeerbaarheid, rendering en canonicals [CODE]/[ARCHIEF]
- SSR: H1, body, FAQ-antwoorden en JSON-LD staan in de server-HTML. De FAQ-antwoorden staan dicht geklapt (`height:0; opacity:0`) maar wel in de DOM, dus crawlbaar. **Geen P0.**
- Canonical: self-referencing, absoluut, https, geen trailing slash. ✓
- Trailing slash en de CMS-redirecttabel worden in één 301 afgehandeld (`server.ts:427-448`). ✓ Hoofdletter-varianten worden niet genormaliseerd **[AANNAME: afhankelijk van Nginx, niet in de repo]**.
- 404 krijgt `X-Robots-Tag: noindex` (`server.ts:285`). ✓
- Sitemap: alle 15 plus `/branches` uit `PAGE_DATES`, geen changefreq/priority. ✓ De `lastmod`-data van de 15 pagina's (21-08 t/m 04-09) zijn ouder dan de laatste codewijzigingen aan titles/H1's die in de archiefcrawl van 15-09 nog anders waren. **Verifieer** of `lastmod` bij inhoudelijke wijzigingen wordt bijgewerkt.
- Archiefcrawl (15-09): alle 15 → 200, TTFB 107–141 ms.

### 3.3 [P2, sitebreed] robots.txt-groepen heffen de Disallows op voor genoemde bots [CODE]
`public/robots.txt`: de `Disallow`-regels staan onder `User-agent: *`, maar Googlebot, Bingbot, GPTBot enz. hebben elk een eigen groep met alleen `Allow: /`. Volgens de robots.txt-standaard (RFC 9309) volgt een crawler **alleen de meest specifieke groep**. Voor Googlebot gelden de Disallows op `/portal`, `/admin`, `/api/` enz. dus niet. Niet branche-specifiek, maar het raakt de hele crawlstrategie.
**Action:** herhaal de Disallow-regels in elke benoemde groep, of schrap de benoemde "Allow"-groepen die niets toevoegen.

### 3.4 Metadata-architectuur [CODE]
Per route handmatig: `title`, `description`, `og:*`, `twitter:*`, canonical en schema. Dat werkt, maar is foutgevoelig. `loodgieter` schrijft zijn Service-schema bijvoorbeeld inline in plaats van via `serviceJsonLd` (`website-laten-maken-loodgieter.tsx:74-86`). Bij uitbreiding naar 30+ branches is een datagedreven route (`/website-laten-maken-$branche` met één databestand) schaalbaarder en consistenter. Zie §29.

---

## 4. Overall Content SEO

**Sterk [CODE]:**
- Elke pagina heeft een eigen invalshoek met echte branchekennis. Voorbeelden: autobedrijf "verkoop vs werkplaats", makelaar "acquisitie van verkopers, niet kopers", bloemist "piekdagen en rouwwerk", restaurant "menukaart als HTML i.p.v. PDF", pedicure "regulier vs medisch en vergoeding".
- Eerlijke toon zonder rankinggaranties (makelaar-FAQ: "Nee, en dat belooft niemand die eerlijk is").
- Sectievolgorde varieert per pagina (`sectionOrder`).

**Zwak:**
1. **Definitieblok identiek op 15 pagina's** (`BranchPage.tsx:217`) en als eerste alinea onder de H1. Zie §5.
2. **Prijsconsistentie:** de definitie zegt "€ 499 tot € 749", maar:
   - autobedrijf: "Een autowebsite valt bijna altijd buiten de standaardpakketten"
   - makelaar: Starter (€ 499) "met woningaanbod, zoekfilters", terwijl `/tarieven` Starter omschrijft als "één-pagina website" (`tarieven.tsx:149`)
   - bloemist: webshop-functionaliteit bij € 749

   Tegenstrijdige feiten op één pagina zijn schadelijk voor gebruikers en maken de pagina minder bruikbaar als antwoordbron. **[CODE]**
3. **UI-verwijzende tekst:** kapsalon "bekijk de knop 'Bekijk tarieven' hierboven" (`kapsalon.tsx:37`). Tien pagina's noemen "de tarievenpagina" in platte tekst **zonder link**. **[CODE]**
4. **Search-engine-first signalen:**
   - vier FAQ's over "Wordt mijn site gevonden op zoektermen als 'X website laten maken'?" (hovenier, klusbedrijf, loodgieter, schilder)
   - de pedicure-intro opent met terminologie-uitleg ("We spreken hier bewust van een pedicurepraktijk in plaats van pedicure…"), met een FAQ over hetzelfde onderwerp

   Deze teksten beantwoorden geen gebruikersvraag. **[CODE]** Relevant voor [GOOGLE] "people-first content".
5. **Taal:** de H1 van autobedrijf "Een website waarop je occasions **verkopen**" is grammaticaal fout (→ "verkoopt"). Titles gebruiken koppeltekens die in het Nederlands aaneen horen ("Makelaars-website" → "makelaarswebsite"). **[CODE]**
6. **Onverifieerbare claims:** "zelf auto's toevoegen en op verkocht zetten via het klantenportaal" (autobedrijf) en "zelf woningen toevoegen" (makelaar). Het klantenportaal in deze repo is een wijzigingsverzoek-systeem, geen voorraad-CMS. Mogelijk worden zulke CMS'en per klant gebouwd **[AANNAME]**, maar maak dat expliciet.

---

## 5. Duplicate / Template Content

### Meting [CODE]
5-woord-shingles (Jaccard), branchenaam genormaliseerd, alleen de unieke datavelden:
- mediaan **±2%**, minimum 1,4%, maximum 7,9% (loodgieter↔schilder)
- clusters met iets meer overlap: bouw (loodgieter, schilder, klusbedrijf, hovenier: 4–8%) en wellness (nagelstudio, schoonheidssalon, pedicure, kapsalon: 4–6,5%)
- mobiliteit, zakelijk en horeca: ≤3,3%

### Wat identiek of bijna identiek is

| Element | Voorkomen | Beoordeling |
|---|---|---|
| Definitiezin "Een website laten maken voor je {b} kost bij AIMI € 499 tot € 749 … ook voor ondernemers in de branche {b}." | 15/15, eerste alinea | **Potentially problematic**: substitutie-template op de meest prominente plek |
| Pricing-opener "Een eenvoudige website voor je {b} met … begint bij € 499 eenmalig (Starter). Met … zit je eerder in het Pro-traject vanaf € 749." | 15/15 | Acceptable reuse, maar voorspelbaar patroon |
| Approach-kop "Zo pakken we het aan" / "Zo werken we het uit" | 12/15 + 3/15 | Acceptable template reuse |
| Stap 1 "Kennismaking", stap 5 "Livegang en beheer" | 15/15 | Acceptable, laag risico |
| FAQ "Hoe lang duurt het bouwen van een website voor mijn {b}?" + "2 tot 4 weken" | 15/15 | Acceptable (gebruikersvraag), maar geen branchewaarde |
| FAQ "Hoeveel kost / Wat kost een website voor (mijn/een) {b}" | 8/15 | Acceptable |
| FAQ "Werken jullie in een specifieke regio?" (+ varianten) | 7/15 | Acceptable, gedeeltelijk dubbel |
| Meta-SEO-FAQ "gevonden op zoektermen als …" | 4/15 | **Potentially problematic** (search-engine-first) |
| CTA-blok "Klaar voor een nieuwe website voor je {b}?" + tekst | 15/15 | Acceptable template reuse |
| TrustStrip, breadcrumb-vorm, "Ook interessant" | 15/15 | Acceptable |
| Afbeeldingen (GENERIC_EXAMPLES) | 11/15 identiek, ook op `/website-laten-maken` en locatiepagina's | **Potentially problematic**: geen branchebewijs |
| og:image | 15/15 zelfde `og-image.png` | Acceptable, maar gemiste kans |

### Risico-inschatting
- **Thin content:** laag. ~800–970 unieke woorden met echte informatie.
- **Keyword-substitutiepagina's:** laag voor de body. Gemiddeld voor de eerste alinea (definitieblok) en het CTA-blok.
- **Doorway-achtig:** laag tot gemiddeld. De pagina's hebben zelfstandige waarde. Maar ze verwijzen allemaal naar dezelfde generieke `/contact`, zonder branchebewijs, en de interne linkstructuur maakt ze eerder "zoekingangen" dan een browsebare hiërarchie.
- **Scaled content abuse:** laag. 15 pagina's met duidelijk handwerk is geen massaproductie. Het risico groeit als het patroon wordt opgeschaald naar tientallen branches **zonder** eigen bewijs.
- **Relevante richtlijn [GOOGLE]:** Spam policies → *Doorway abuse*: "sites or pages created to rank for specific, similar search queries", met als voorbeeld "Substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy". *Scaled content abuse*: veel pagina's "for the primary purpose of manipulating search rankings and not helping users". [INDUSTRIE] Google draaide in 2026 spam-updates in maart, juni en augustus; vakpers noemt scaled content en doorways als focus.

**Aanbevolen:**
1. Vervang de definitiezin door een branche-eigen samenvatting van 2–3 zinnen.
2. Verwijder de 4 meta-SEO-FAQ's en de pedicure-terminologie-intro.
3. Voeg per branche minstens één uniek bewijsstuk toe (screenshot, case, quote).
4. Varieer of verbijzonder de bouwtijd-FAQ, of zet die centraal op `/faq` en link ernaar.

---

## 6. Search Intent (per branche)

De zoekopdracht "website laten maken [branche]" is **commercieel/transactioneel**: de zoeker is een ondernemer die een bureau zoekt. [INDUSTRIE, SERP-steekproef §18] De resultaten bestaan uit bureau-landingspagina's, platform-/bouwpakketaanbieders (Hostnet, Sitezilla, eigenwebsite.nl) en nichespecialisten (bv. loodgietersweb.nl). Er zijn vaak prijzen in de title ("vanaf € 675", "vanaf € 2499").

| Branche | Primaire intentie | Secundair | Aansluiting |
|---|---|---|---|
| Autobedrijf | commercieel: website autobedrijf/garage | info: voorraadkoppeling, APK-afspraken | Goed op occasions. **Mist "garage"/"autogarage"** in title en H1, terwijl de werkplaatsintentie wel in de body zit |
| Autorijschool | commercieel: rijschool website | info: pakketprijzen, inschrijven | Goed. H1 zegt "rijschool", title en slug "autorijschool". Prima dekking van beide varianten |
| Bloemist | commercieel: website/webshop bloemist | transactioneel: webshop | Goed. Slug "bloemist", copy "bloemenwinkel". Dekt beide, maar H1/title missen "bloemist" |
| Boekhouder | commercieel: website boekhouder/administratiekantoor | info: klantportaal, tarieven | Redelijk. **Slug "boekhouder", title en copy "administratiekantoor"**. Kies een primaire term |
| Cateringbedrijf | commercieel | info: offerteformulier, allergenen | Goed |
| Hovenier | commercieel | info: projectfoto's, aanleg/onderhoud | Goed |
| Kapsalon | commercieel: kapsalon/kapper website | functioneel: online boeken | Goed. "kapper" komt voor in de meta, nauwelijks in de body |
| Klusbedrijf | commercieel | info: foto-upload offerte | Redelijk. Overlapt deels met loodgieter en schilder (zie §17) |
| Loodgieter | commercieel | functioneel: spoed/bellen | Goed |
| Makelaar | commercieel: makelaar website | info: waardebepaling, koppeling | Goed, sterke invalshoek |
| Nagelstudio | commercieel | functioneel: booking, portfolio | Goed |
| Pedicure | commercieel | info: medisch/vergoeding | Redelijk. De intro opent met terminologie in plaats van de gebruikersvraag |
| Restaurant | commercieel | functioneel: reserveren, menukaart | Goed |
| Schilder | commercieel | info: projectgalerij | Goed |
| Schoonheidssalon | commercieel | functioneel: intake, cadeaubonnen | Goed |

**Lokale intentie:** zoekopdrachten als "website laten maken kapsalon Groningen" bestaan waarschijnlijk **[AANNAME, geen volumedata]**. De branchepagina's zijn bewust niet regiogebonden (`areaServed: null`). Dat is correct: maak **geen** branche×stad-combinaties (zie §9).

---

## 7. Keyword & Entity Analysis

> **Zoekvolumes niet beschikbaar.** Geen Keyword Planner-, Search Console- of Ahrefs-data in deze audit. Hieronder staan logische termen, geen gemeten volumes.

| Branche | Primary | Secondary / long-tail | Kern-entities aanwezig | Ontbrekende of onderbelichte entities |
|---|---|---|---|---|
| Autobedrijf | website autobedrijf laten maken | garage website, occasionwebsite, website autogarage | occasions, voorraad, APK, onderhoud, werkplaats, schadeherstel, kilometerstand | **garage/autogarage** (1× "garagebedrijf"), RDW/kenteken-lookup, BOVAG*, financial lease, inruil, proefrit |
| Autorijschool | website rijschool laten maken | website autorijschool, rijschool website pakketten | lespakketten, instructeur, theorie, proefles?, inschrijven | CBR, praktijkexamen, proefles, slagingspercentage*, faalangst, automaat/schakel |
| Bloemist | website bloemist laten maken | webshop bloemist, bloemenwinkel website | bezorging, rouwwerk, Moederdag, Valentijn, piekdagen, bezorggebied | **bloemist** in H1/title, bruidswerk, abonnementen, Fleurop-achtige netwerken* |
| Boekhouder | website boekhouder laten maken | website administratiekantoor, accountantskantoor website | ZZP, MKB, aangifte, overstap, klantportaal, boekhoudsoftware | **boekhouder** in title, NOAB/RB/SRA*, IB/BTW-aangifte, loonadministratie, AVG/veilig uploaden |
| Catering | website cateringbedrijf laten maken | cateraar website, website catering | formules, richtprijzen, allergenen, bruiloft, bedrijfsfeest, offerte | HACCP*, per-persoonsprijs, locatie/zaalverhuur, foodtruck |
| Hovenier | website hovenier laten maken | hoveniersbedrijf website | aanleg, onderhoud, bestrating, beplanting, projectfoto's | tuinontwerp, seizoen, VHG*, schutting, subsidies (groene daken)* |
| Kapsalon | website kapsalon laten maken | kapper website, kapperswebsite, barbier website | online afspraken, prijslijst, stylisten, kleuring, no-shows | **kapper/kapperswebsite** in body, barbershop, online boekingssystemen (generiek), Google-reviews |
| Klusbedrijf | website klusbedrijf laten maken | klussenbedrijf website, klusjesman website | specialismen, foto-upload, mobiel | werkgebied, reviews, KvK/VCA* |
| Loodgieter | website loodgieter laten maken | installatiebedrijf website, loodgietersbedrijf website | spoed, lekkage, storingsdienst, telefoonnummer | **installatiebedrijf/installateur**, CV-ketel, verstopping, 24/7, click-to-call |
| Makelaar | website makelaar laten maken | makelaarskantoor website, website makelaardij | verkopers, courtage, waardebepaling, verkochte woningen, taxatie, aankoop | Funda (bewust "grote platforms"), NVM/VBO*, Realworks-achtige koppelingen (bewust generiek) |
| Nagelstudio | website nagelstudio laten maken | nagelsalon website | nailart, portfolio, cadeaubonnen, booking | gellak, acryl, BIAB, Instagram-feed |
| Pedicure | website pedicure laten maken | pedicurepraktijk website, medisch pedicure website | regulier/medisch, diabetes, reuma, vergoeding, kwaliteitsregister | ProCert/KRP* (bij naam), zorgverzekeraar, huisbezoek |
| Restaurant | website restaurant laten maken | horeca website, restaurantwebsite | menukaart, reserveren, openingstijden, afhaal, bezorging | allergenen (EU-verplichting)*, groepsreserveringen, cadeaubon |
| Schilder | website schilder laten maken | schildersbedrijf website | binnen/buiten, projectgalerij, materialen, oppervlakte | onderhoudsplan/VvE, houtrot, seizoen |
| Schoonheidssalon | website schoonheidssalon laten maken | beautysalon website | behandelmenu, intake, cadeaubonnen, herhaalafspraak | huidtherapie, ANBOS*, gezichtsbehandeling, massage |

\* Branche-entity die AIMI alleen moet noemen als het klopt en relevant is. Noem nooit een keurmerk als eis zonder bron.

**Entity-relaties die onduidelijk zijn:** "AIMI → bouwt websites voor → [branche]" is duidelijk. "AIMI → heeft gebouwd voor → [klant in branche]" ontbreekt overal (geen bewijsentity).

---

## 8. Internal Linking

### Kaart [CODE]
- **Nav:** "Webdesign per branche" → `/branches`, en submenu naar `/branches#groep` (5 anchors). **Geen enkele directe branchelink.**
- **Footer:** "Webdesign per branche" → `/branches`. De branchelinks zijn bewust verwijderd (`Footer.tsx:81-86`, audit B5-1).
- **Homepage, `/website-laten-maken`, `/tarieven`, `/faq`, `/werkwijze`:** 0 links naar branchepagina's.
- **Blog (10 posts in migraties):** 0 links naar branchepagina's gevonden (`supabase/migrations/2026091713*`).
- **`/branches` hub:** linkt alle 15, maar 4 van de 5 groepen zijn standaard dicht (accordion `height:0`). De links staan wel in de HTML.
- **Onderlinge branchelinks ("Ook interessant"):** 2–4 per pagina, logisch geclusterd.
- **Locatiepagina's → branche:** restaurant (8×), klusbedrijf (2×), boekhouder (2×), schoonheidssalon, hovenier, loodgieter, bloemist (1×).
- **Breadcrumbs:** Home → Branches → [pagina] (zichtbaar + schema). ✓

### Problemen
| Probleem | Pagina's |
|---|---|
| Bijna-orphan (1 contextuele inlink) | **schilder** |
| Weinig inlinks (2) | autobedrijf, autorijschool, bloemist, catering, makelaar, nagelstudio, pedicure |
| "tarievenpagina" genoemd zonder link | 10 pagina's |
| Links vanuit branche naar dienst ontbreken | geen link naar `/website-laten-maken`, `/webshop-laten-maken` (behalve bloemist en restaurant), `/seo`, `/onderhoud-hosting` |
| Groningen als standaard "related" op 13/15 | ontstaan als patroon, niet inhoudelijk (waarom Groningen bij een landelijke branchepagina?) |
| Anchor texts | "Alle branches", "Tarieven": prima. "Website laten maken Groningen" op branchepagina's: weinig relevant |

### Aanbevelingen
1. Homepage en `/website-laten-maken`: voeg een blok "Voor jouw branche" toe met 5–8 belangrijkste branches (tekstlinks, geen card-grid; zie de design-regels in CLAUDE.md).
2. `/tarieven`: link per pakket naar 2–3 branchevoorbeelden ("Pro past bij bv. kapsalon met online boeken").
3. Maak "tarievenpagina" in de pricing-secties en FAQ's een echte link.
4. Schilder: link vanuit klusbedrijf-copy (body, niet alleen related), vanaf hovenier en van relevante locatiepagina's.
5. Vervang de standaard Groningen-link door een relevante dienst (bv. `/webshop-laten-maken` voor bloemist en catering, `/onderhoud-hosting` voor loodgieter/spoed).
6. Blog: link bestaande posts (bv. "Google Business Profile fouten", "mooi vs converteert") contextueel naar 2–3 branches.
7. Nav: overweeg directe branchelinks in het submenu in plaats van alleen groep-anchors.

---

## 9. Local SEO

- **Branchepagina's zijn terecht niet lokaal:** `areaServed: null`, TrustStrip "Noord-Nederland, heel het land op afstand". ✓ **Er zijn geen fake location pages** en geen branche×stad-doorways. [CODE]
- **Organization/ProfessionalService** (`__root.tsx:165-244`): telefoon, e-mail, sameAs naar Google Maps, areaServed. **Geen `address`**: `ADDRESS.streetAddress`/`postalCode` zijn leeg. ProfessionalService is een LocalBusiness-subtype waarvoor Google een adres verwacht (de code zegt dat zelf in `__root.tsx:181-183`). [CODE]
- **NAP:** naam (AIMI Development), telefoon (06 11851093) en e-mail zijn consistent via constanten. **Adres ontbreekt** zichtbaar en in schema. [CODE]
- **KvK/BTW leeg** (`seo.ts:51-53`). De footer toont ze pas als ze gevuld zijn. [CODE]
- **GBP:** er is een profiel (sameAs). De koppeling met branchepagina's is niet relevant: GBP gaat over AIMI zelf, niet over de klantbranches.
- **15 locatiepagina's** vallen buiten scope. Ze worden alleen genoemd voor cannibalisatie (§17).

**Action:** vul ADDRESS, KVK en VAT_ID (als AIMI een bezoek- of vestigingsadres wil publiceren; bij een service-area-business zonder publiek adres: kies bewust en documenteer dat). Voeg op de branchepagina's niets lokaals toe.

---

## 10. Structured Data

Per branchepagina worden 6 blokken gerenderd:

| Schema | Bron | Oordeel |
|---|---|---|
| Organization + ProfessionalService (`@id` #organization) | `__root.tsx` | Geldig. Mist `address`. `hasOfferCatalog` met 2 Offers is ok. `founder` Person zonder achternaam: dun maar niet fout |
| WebSite | `__root.tsx` | ✓ |
| Service | route-head (`serviceJsonLd`) | Geldig. `provider` → ORG_ID ✓. **Inconsistent `serviceType`** ("Webdesign" vs "Webdesign voor kapsalons"). Geen `offers`/`audience`. Loodgieter heeft een handgeschreven variant (zelfde inhoud, drift-risico) |
| BreadcrumbList | route-head | ✓ Komt overeen met de zichtbare kruimels |
| FAQPage | route-head (`faqJsonLd`) | Geldig en komt overeen met zichtbare (dichtgeklapte) FAQ's. **Levert geen rich result op** (zie §12) |
| WebPage | body (`BranchPage.tsx:221`) | **Fout op 7 pagina's**: `@id`/`url` naar een 404-URL, `dateModified` = vandaag (§3.1). Op 8 pagina's correct. `name` = H1 (niet de title), acceptabel |

**Niet toevoegen (ongeschikt of niet ondersteund door de inhoud):**
- `Review`/`AggregateRating`: er zijn geen reviews zichtbaar, en self-serving reviews op eigen Organization komen sinds 2019 niet in aanmerking voor review snippets [GOOGLE].
- `LocalBusiness` per branche: AIMI is niet de branche.
- `ItemList` op branchepagina's.

**Wel overwegen:**
- `ItemList` op `/branches` (lijst van de 15 pagina's) in plaats van het huidige Service-schema op de hub.
- `Service.audience` (`BusinessAudience` met branchenaam) en `Service.offers` (verwijzing naar Starter/Pro) **alleen als de pagina dezelfde prijs zichtbaar en consistent noemt** (zie §4.2).

[GOOGLE] Structured data moet de zichtbare inhoud weerspiegelen. [GOOGLE] Er is geen speciale markup nodig voor AI Overviews of AI Mode.

---

## 11. AEO — Answer Engine Optimization

| Vraag | Beantwoord? | Kwaliteit |
|---|---|---|
| Wat kost een website voor [branche]? | Ja, eigen H2 op 15/15 + definitie | Direct en met bedragen, maar **tegenstrijdig** op autobedrijf, makelaar en bloemist (§4.2) |
| Welke functies heeft een [branche]-website nodig? | Ja (needs-H2) | Sterk en branche-specifiek |
| Waarom heeft [branche] een website nodig? | Impliciet (intro) | Goed bij makelaar en restaurant, generiek elders |
| Hoe levert een website klanten op? | Deels (pitfalls) | Beschrijvend, zonder cijfers of bewijs |
| Hoe lang duurt het? | Ja, 15/15 | Eenduidig ("2 tot 4 weken"), maar identiek |
| Welke informatie moet erop? | Ja (needs) | Goed |

**Structuur:** H2's zijn vraag- of statement-achtig ✓. Alinea's zijn vrij lang (60–90 woorden) en er zijn **geen lijsten** in de needs- en pitfalls-secties. Lijsten en tabellen (bijv. "Functies per pakket voor een kapsalon") zijn makkelijker te scannen en te extraheren. FAQ's zijn Q/A-paren ✓.

**Action:** begin de needs-sectie per pagina met een korte opsomming (5–7 functies) en werk die daarna uit. Laat de prijs-H2 beginnen met één eenduidige zin die met `/tarieven` klopt.

---

## 12. GEO / AI Search

[GOOGLE] (via "AI features and your website"): er zijn geen extra eisen of speciale optimalisaties voor AI Overviews of AI Mode. Een pagina moet geïndexeerd zijn, in aanmerking komen voor een snippet en nuttig zijn. Er is geen speciaal schema of AI-tekstbestand nodig. [INDUSTRIE] Search Console rapporteert sinds juni 2026 apart over zichtbaarheid in AI-features.

**Observaties [CODE]:**
- **Duidelijk:** wie (AIMI, Veendam), wat (websites bouwen en hosten), voor wie (branche), prijs, bouwtijd.
- **Onduidelijk of zwak:**
  - (a) de bedrijfsidentiteit mist adres en KvK
  - (b) er is geen bewijs dat AIMI in de branche heeft gewerkt
  - (c) er zijn tegenstrijdige prijsfeiten
  - (d) er zijn geen auteur/persoon-signalen op de pagina (alleen "Aidan & Milan" elders)
  - (e) op 7 pagina's zijn de datum en `@id` onbetrouwbaar (§3.1)
- `llms.txt` en `llms-full.txt` bestaan en noemen alle 15. [GOOGLE] Google gebruikt dit niet. Andere systemen doen dat mogelijk **[AANNAME]**. Geen schade, geen bewezen effect.
- robots.txt staat AI-crawlers expliciet toe. ✓ Let op §3.3.

**Bronwaardigheid:** de pagina's bevatten nuttige, eigen redeneringen (bv. "zes tot tien foto's per occasion", "formulier voor waardebepaling kort houden"). Dat zijn **ervaringsclaims zonder bron of voorbeeld**. Onderbouwing met een concreet project of klantcitaat verhoogt de controleerbaarheid. **Geen claim** dat dit tot AI-citaties leidt.

---

## 13. E-E-A-T / Trust

| Signaal | Status [CODE] |
|---|---|
| Bedrijfsnaam, telefoon, e-mail | ✓ Zichtbaar (TrustStrip, footer) |
| Adres, KvK, BTW | ✗ Leeg |
| "Actief sinds 2025" | ✓ Eerlijk, maar kort. Geen aantal projecten (terecht niet verzonnen) |
| Portfolio per branche | ✗ Wellness heeft 3 voorbeeldscreens (inclusief "massagestudio", geen AIMI-branchepagina). Alle overige 11 tonen architectuur/praktijk/SaaS. **Onbekend of dit echte klanten of concepten zijn** [AANNAME]. Het woord "Voorbeeld" suggereert concepten. Maak dat expliciet |
| Cases, testimonials, reviews | ✗ Geen op de branchepagina's |
| Personen/auteur | ✗ Niet op de branchepagina's |
| Claims | "Binnen één werkdag reactie" (onderbouwbaar via proces). "Verkoopt merkbaar makkelijker" (autobedrijf) en "we zien vaak…" zijn ervaringsclaims zonder bewijs. Geen overdreven garanties ✓ |
| Rankingbeloftes | ✓ Expliciet afgewezen (makelaar-FAQ) |

**Action:** per branche één verifieerbaar bewijsstuk, of eerlijk vermelden "we hebben nog geen [branche]-klant, dit is ons ontwerpvoorstel". Vul de bedrijfsgegevens in. Toon de maker (naam + rol) onderaan elke branchepagina.

---

## 14. Mobile SEO *(uitsluitend vanuit code beoordeeld, geen device-test)*

- Viewport-meta ✓. Tailwind-grid `md:grid-cols-[1fr_1.1fr]` stapelt op mobiel ✓. `px-6` gutter ✓.
- Mobiel menu aanwezig (`Nav.tsx:248-278`, `md:hidden`).
- Tekstgrootte: body 14.5px, FAQ-antwoorden en stappen 13.5px, TrustStrip 13px. Dat is aan de kleine kant. Het staat op gespannen voet met de eigen pedicure-copy ("grote leesbare tekst"). **Risico, geen harde fout.**
- Tikdoelen: slideshow-dots 32×32px (onder de 44–48px-richtlijn). Related-pills ~35px hoog. CTA's ~44px ✓.
- Staande wellness-screens (909×2160, max 460px breed): op mobiel een lange afbeelding vóór de content-secties. Er is geen `sizes`/`srcset`.
- **Geen sticky bel/offerte-knop op mobiel.** Juist de loodgieterpagina bepleit "telefoonnummer voorop", maar de eigen pagina heeft alleen een kleine tel-link in de TrustStrip.

---

## 15. Performance / Core Web Vitals

**Runtime-metingen (LCP/INP/CLS, Lighthouse, CrUX): niet meetbaar vanuit de huidige audit.** De live site was niet bereikbaar. De archief-Lighthouse-runs bevatten geen branchepagina's.

Risico's vanuit de code:
- **LCP:** kandidaat is de H1/definitie-alinea of de hero-screenshot. De eerste slide `loading="eager"` zonder `fetchpriority="high"`. Er is geen `srcset`: de 1440-brede webp (27–45 KB) gaat ook naar mobiel, de wellness-screens zijn 102–122 KB. Laag tot matig risico.
- **CLS:** `width`/`height` + `aspect-ratio` zijn gezet ✓. Font-preload + self-hosted woff2 ✓. Laag risico.
- **INP:** `motion`-chunk wordt geladen voor de FAQ-accordion en de slideshow. De slideshow-interval pauzeert buiten de viewport ✓ en bij reduced-motion ✓. Laag risico.
- **JS:** Hydration van de volledige React-app + router + Radix/motion-chunks voor een grotendeels statische pagina. Matig risico op mobiele INP en TBT [AANNAME, niet gemeten].
- **Third-party:** alleen de eigen `track.js` via AnalyticsLoader. Geen externe tags ✓.
- **Speculation Rules** prefetch voor `/contact`, `/tarieven` en `/website-laten-maken` ✓.

---

## 16. Conversion SEO

Search → landing → info → vertrouwen → actie:
- **Landing:** H1 en definitie boven de vouw, CTA's direct zichtbaar ✓
- **Info:** sterk ✓
- **Vertrouwen:** zwak. Geen branchebewijs of reviews, en generieke beelden
- **Actie:** twee CTA's naar een **generieke `/contact`**. Geen branchecontext wordt meegegeven (contactroute leest geen query-param). Er is geen telefoon-CTA-knop, geen WhatsApp en geen formulier op de pagina zelf. Een eindgebruiker van een loodgieter- of bloemistsite wordt wel gewezen op WhatsApp (bloemist-FAQ), maar AIMI biedt het zelf niet aan.
- **Prijs:** zichtbaar ✓, maar tegenstrijdig (§4.2)

**Action:**
1. `/contact?branche=kapsalon` met een vooringevuld veld.
2. Een secundaire tel-CTA als knop.
3. Een bewijsblok vóór de eind-CTA.
4. De prijs per pagina in lijn brengen met `/tarieven`.

---

## 17. Cannibalization

| Pagina A | Pagina B | Overlappende intentie | Risico | Aanbevolen oplossing |
|---|---|---|---|---|
| `/website-laten-maken-klusbedrijf` | `/…-loodgieter`, `/…-schilder` | "website klusbedrijf" vs vakspecialist | Laag–gemiddeld: 6–8% tekstoverlap, zelfde bouwcluster | Maak van klusbedrijf expliciet "allround/meerdere vakken" en link vanuit de body naar de specialisten |
| `/…-kapsalon` | `/…-schoonheidssalon`, `/…-nagelstudio` | "salon website" | Laag: verschillende kernbehoefte | Houd de focus. Voeg eventueel "barbier/barbershop" toe aan kapsalon in plaats van een nieuwe pagina |
| `/…-restaurant` | `/…-cateringbedrijf` | "horeca website" | Laag | Ok. Restaurant claimt "horeca" in kicker en serviceType, catering niet ✓ |
| `/…-autobedrijf` | `/…-autorijschool` | "auto" | Zeer laag: andere intentie | Geen actie |
| `/…-boekhouder` | `/…-makelaar` | "zakelijke dienstverlening" | Zeer laag | Geen actie |
| `/branches` | `/webdesign` | "webdesign per X" | Laag: branche vs regio | Ok. De hub-title "Website laten maken per branche" is duidelijk |
| `/website-laten-maken` (generiek) | alle branchepagina's | "website laten maken" | Laag: branchepagina's hebben een eigen modifier | Link van generiek → branche (§8) |
| `/…-[branche]` | `/…-[stad]` | Zelfde URL-patroon `/website-laten-maken-{x}` | Laag voor Google, **verwarrend voor architectuur** (branche en stad in één namespace) | Bij herstructurering eventueel `/branches/{x}` (met 301). Niet nu nodig |

Search Console-data (welke URL rankt op welke query) is nodig om echte cannibalisatie vast te stellen. **Niet beschikbaar.**

---

## 18. Competitor / SERP Research

**Beperking:** WebSearch geeft US-gebaseerde resultaten, geen Google.nl-SERP. Er is geen informatie over local pack, People Also Ask, AI Overviews of gerelateerde zoekopdrachten. Onderstaande steekproef (2 queries, 23-09-2026) is indicatief.

- **"website laten maken kapsalon":** vwebdesign.nl, plazaxl.nl (prijs in snippet), coolpixel.nl ("Alles-in-één pakket 675,-" in de title), fbstudio.nl, sitezilla.nl, hostnet.nl, skitlecms.nl, sitegeny.com
- **"website laten maken loodgieter":** designpro.nl ("Vanaf €2499" in de title), vwebdesign.nl, miliai.nl, ettekoven-it.nl, heijtec.nl, eigenwebsite.nl, davium.nl, loodgietersweb.nl (nichespecialist), wolterswebdesign.com

**Patronen:**
- Paginatype: bureau- of platform-landingspagina per branche, vaak prijs in title/snippet
- Terugkerende onderwerpen: online boeken, click-to-call, werkgebied, reviews, CMS, vindbaarheid
- AIMI's pagina's zijn inhoudelijk dieper dan het typische format. Ze zijn zwakker op **bewijs** (portfolio per branche) en op **prijs in de title** (alleen 5 van 15 noemen "vanaf € 499")

Geen content gekopieerd. Geen concurrentieposities geclaimd.

---

## 19. Content Gaps (per branche)

Legenda: **Ontbreekt** = zou waarde toevoegen · *Niet noodzakelijk* = bewust weglaten

| Branche | Ontbreekt | Niet noodzakelijk |
|---|---|---|
| Autobedrijf | "garage/autogarage" als term, kentekencheck/RDW-koppeling als optie, voorbeeld van een voorraadpagina | Uitgebreide merk-/dealercontent |
| Autorijschool | CBR/examen-info als contenttip, proefles-CTA voor leerlingen, voorbeeld pakkettabel | Theorie-lesmateriaal |
| Bloemist | "bloemist" in H1/title, bruidswerk, bestel-cut-off-tijden, voorbeeld | Volledige webshop-uitleg (die staat op `/webshop-laten-maken`, link daarheen ✓) |
| Boekhouder | Keuze tussen de termen boekhouder en administratiekantoor, veilig documenten uploaden (AVG), voorbeeld | Fiscale inhoud |
| Catering | Allergenen-wetgeving als context, per-persoon-prijsvoorbeeld | — |
| Hovenier | Seizoensplanning (in het hub-desc genoemd, niet op de pagina), voor/na-voorbeeld | — |
| Kapsalon | "kapper/barbier", Google-reviews/GBP-koppeling, echte kapsalon-screen | Losse barbier-pagina (eerst via kapsalon) |
| Klusbedrijf | Werkgebied-uitleg, reviews | — |
| Loodgieter | "installatiebedrijf", 24/7 en sticky bel-knop als feature, voorbeeld | — |
| Makelaar | Voorbeeld waardebepalingsformulier | Woningzoek-functionaliteit (terecht afgeraden) |
| Nagelstudio | Instagram-integratie, behandeltermen (gellak/BIAB) | — |
| Pedicure | Echte gebruikersintro (in plaats van terminologie), registers bij naam alleen indien correct | Medische inhoud |
| Restaurant | Allergenen-info, groepsreservering, voorbeeld | — |
| Schilder | VvE/onderhoudsplannen, seizoen (hub noemt "seizoensplanning", pagina niet) | — |
| Schoonheidssalon | Behandelcategorieën (gezicht, lichaam), echte salon-case | — |
| **Alle** | Branchebewijs, lijst/tabel met functies per pakket, auteur/maker, link naar tarieven in tekst | Branche×stad-pagina's |

**Hub-mismatch:** `/branches` belooft "seizoensplanning" (schilder) en "werkgebied" (hovenier) als kernpunt. Die komen op de pagina's nauwelijks terug.

---

## 20. Metadata Matrix

| Branche | URL | Title (lengte) | H1 | Meta description (lengte) | Canonical | Index | Issues |
|---|---|---|---|---|---|---|---|
| Autobedrijf | /website-laten-maken-autobedrijf | Autobedrijf-website laten maken — occasions \| AIMI (50) | Een website waarop je occasions verkopen | …occasionvoorraad, eigen ingang werkplaats… (144) | self ✓ | ✓ | **H1-grammatica**, geen "garage", koppelteken |
| Autorijschool | …-autorijschool | Autorijschool-website laten maken — pakketten \| AIMI (52) | Website laten maken voor je rijschool | …pakketprijzen… Vanaf € 499. (145) | ✓ | ✓ | Koppelteken |
| Bloemist | …-bloemist | Bloemenwinkel-website laten maken — bezorging \| AIMI (52) | Een website voor je bloemenwinkel die ook bestellingen aanneemt | …bezorgdatum, rouwwerk, piekdagen. (131) | ✓ | ✓ | "bloemist" ontbreekt in title/H1, slug-bug |
| Boekhouder | …-boekhouder | Website voor je administratiekantoor — vanaf € 499 \| AIMI (57) | Een website die je boekhoudkantoor serieus laat overkomen | …boekhoud- of administratiekantoor… (139) | ✓ | ✓ | Title mist "laten maken" en "boekhouder", slug-bug |
| Catering | …-cateringbedrijf | Cateringbedrijf-website laten maken — vanaf € 499 \| AIMI (56) | Webdesign voor catering: van aanvraag tot offerte | …aanvraagformulier… richtprijzen. (132) | ✓ | ✓ | Koppelteken |
| Hovenier | …-hovenier | Hovenier-website laten maken — aanleg & onderhoud \| AIMI (56) | Een website die je hovenierswerk laat spreken | …projectfoto's… vanaf € 499. (152) | ✓ | ✓ | Slug-bug |
| Kapsalon | …-kapsalon | Kapsalon-website laten maken? Zo ziet dat eruit \| AIMI (54) | Website laten maken voor je kapsalon | …kappers in Noord-Nederland. (140) | ✓ | ✓ | Regio in meta terwijl pagina landelijk is |
| Klusbedrijf | …-klusbedrijf | Klusbedrijf-website laten maken — vanaf € 499 \| AIMI (52) | Website laten maken voor je klusbedrijf | Mobiel-first… foto-upload… (150) | ✓ | ✓ | — |
| Loodgieter | …-loodgieter | Loodgieter-website laten maken — spoedservice \| AIMI (52) | Een website waarmee je loodgietersbedrijf gebeld wordt | …razendsnelle mobiele laadtijd… (156) | ✓ | ✓ | Meta aan de lange kant, "razendsnel" is onbewezen, slug-bug |
| Makelaar | …-makelaar | Makelaars-website laten maken — vanaf € 499 \| AIMI (50) | Webdesign voor makelaars die opdrachten willen winnen | …verkopers overtuigt… (145) | ✓ | ✓ | Koppelteken, slug-bug, "vanaf € 499" botst met body |
| Nagelstudio | …-nagelstudio | Nagelstudio-website laten maken — booking \| AIMI (48) | Een website die je nagelstudio laat zien | …portfolio, online boeken… (132) | ✓ | ✓ | "booking" (Engels) |
| Pedicure | …-pedicure | Pedicure-website laten maken — vanaf € 499 \| AIMI (49) | Website laten maken voor je pedicurepraktijk | Vertrouwenwekkende, leesbare website… (135) | ✓ | ✓ | Slug-bug |
| Restaurant | …-restaurant | Restaurant-website laten maken — reserveringen \| AIMI (53) | Website laten maken voor je restaurant | …menukaart, reserveren… (140) | ✓ | ✓ | — |
| Schilder | …-schilder | Schildersbedrijf-website laten maken \| AIMI (43) | Webdesign voor je schildersbedrijf | …binnen- en buitenwerk… (153) | ✓ | ✓ | Slug-bug |
| Schoonheidssalon | …-schoonheidssalon | Schoonheidssalon-website laten maken \| AIMI (43) | Webdesign voor je schoonheidssalon | …behandelmenu, intake, cadeaubonnen… vanaf € 499. (144) | ✓ | ✓ | — |

Alle titles en descriptions zijn uniek ✓. og/twitter-title volgen overal het patroon "Website laten maken voor je {branch} | AIMI" (prima). og:image is overal gelijk.

**Aanbevolen titles en descriptions** (alleen waar verbetering nodig is, niet geïmplementeerd):

| Pagina | Voorgestelde title | Voorgestelde description |
|---|---|---|
| Autobedrijf | Website autobedrijf of garage laten maken — occasions & APK \| AIMI | Website voor je autobedrijf of garage: actuele occasionvoorraad, aparte ingang voor werkplaats en APK, snel op mobiel. Vaste prijs vooraf. |
| Bloemist | Website bloemist laten maken — bestellen & bezorgen \| AIMI | Website of webshop voor je bloemenwinkel: bestellen met bezorgdatum, rouwwerk apart en grip op piekdagen. Gebouwd en gehost door AIMI. |
| Boekhouder | Website boekhouder / administratiekantoor laten maken \| AIMI | Website voor je boekhoud- of administratiekantoor, opgesplitst per type ondernemer, met heldere tarieven en een uitgelegde overstap. |
| Makelaar | Makelaarswebsite laten maken — verkopers overtuigen \| AIMI | *(huidige is goed; "vanaf € 499" alleen in de title als de body die prijs bevestigt)* |
| Kapsalon | Kapperswebsite laten maken — online afspraken \| AIMI | Website voor je kapsalon of barbershop met online afspraken, prijslijst en foto's van je werk. Snel op mobiel, gebouwd en gehost door AIMI. |
| Loodgieter | Website loodgieter / installateur laten maken — spoed \| AIMI | Website voor je loodgieters- of installatiebedrijf met telefoonnummer voorop, spoedmelding bovenaan en snelle mobiele laadtijd. |
| Nagelstudio | Nagelstudio-website laten maken — online boeken \| AIMI | *(ok)* |
| Autobedrijf H1 | "Een website waarop je occasions verkoopt" | — |

---

## 21. Duplicate Content Matrix

Kwalitatief, gebaseerd op de gemeten 5-gram-overlap van de unieke tekst **plus** de gedeelde template-laag (definitie, CTA, beelden). De template-laag is voor alle paren gelijk, daarom is de ondergrens "laag" en niet "zeer laag".

| Pagina A | Pagina B | Overlap | Inhoudelijke overeenkomst | Toelichting |
|---|---|---|---|---|
| Loodgieter | Schilder | 7,9% | **Gemiddeld** | Zelfde FAQ-set (regio, zoektermen, kosten, bouwtijd), zelfde "Zo werken we het uit", zelfde beelden |
| Hovenier | Schilder | 7,2% | Gemiddeld | Stappen "Structuur en foto's", "Offerteformulier" identiek, projectgalerij-thema |
| Klusbedrijf | Loodgieter | 7,0% | Gemiddeld | Zoektermen-FAQ, regio-FAQ, mobiel-snelheid-thema |
| Nagelstudio | Schoonheidssalon | 6,5% | Gemiddeld | Cadeaubonnen, boeken, wellness-beelden, "Wat kost … laten maken" |
| Pedicure | Schoonheidssalon | 6,4% | Gemiddeld | Zelfde FAQ-afsluiters, wellness-beelden |
| Klusbedrijf | Schilder | 6,1% | Gemiddeld | Bouwcluster |
| Hovenier | Loodgieter | 5,3% | Laag–gemiddeld | Idem |
| Nagelstudio | Pedicure | 5,1% | Laag–gemiddeld | Idem |
| Kapsalon | Nagelstudio | 4,5% | Laag | Verschillende kern (prijslijst vs portfolio) |
| Kapsalon | Schoonheidssalon | 3,9% | Laag | — |
| Autorijschool | Boekhouder | 3,3% | Laag | Structureel vergelijkbare "prijzen publiceren?"-FAQ, andere branche |
| Restaurant | Catering | 2,4% | Laag | Verwant, maar duidelijk eigen intentie |
| Autobedrijf | Autorijschool | ≤2,3% | Laag | Andere intentie |
| Makelaar | Boekhouder | ≤2,4% | Laag | — |
| Bloemist | Catering | 2,3% | Laag | — |
| Alle overige paren | — | 1,4–3,7% | Laag | Alleen de template-laag is gedeeld |

---

## 22. AIMI Internal SEO Audit Scores

> **Interne beoordelingsmethodiek. Geen Google-score en geen voorspelling van rankings.**
> Kolommen: Tech · Content · Intent · Uniek · Int. links · Struct. data · Local · AEO · GEO · Conversie

| Branche | T | C | I | U | IL | SD | L | AEO | GEO | Conv | **Gem.** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Restaurant | 7 | 8 | 7 | 8 | 6 | 6 | 4 | 7 | 6 | 6 | **6,5** |
| Cateringbedrijf | 7 | 8 | 7 | 8 | 4 | 6 | 4 | 7 | 6 | 6 | **6,3** |
| Autobedrijf | 7 | 8 | 6 | 8 | 4 | 6 | 4 | 6 | 6 | 6 | **6,1** |
| Autorijschool | 7 | 7 | 7 | 8 | 4 | 6 | 4 | 6 | 6 | 6 | **6,1** |
| Kapsalon | 7 | 7 | 8 | 6 | 5 | 6 | 4 | 6 | 6 | 6 | **6,1** |
| Makelaar | 6 | 8 | 7 | 8 | 4 | 5 | 4 | 7 | 6 | 6 | **6,1** |
| Schoonheidssalon | 7 | 7 | 7 | 6 | 5 | 6 | 4 | 6 | 6 | 6 | **6,0** |
| Bloemist | 6 | 8 | 7 | 8 | 4 | 5 | 4 | 6 | 5 | 6 | **5,9** |
| Klusbedrijf | 7 | 6 | 7 | 6 | 6 | 6 | 4 | 6 | 5 | 6 | **5,9** |
| Nagelstudio | 7 | 7 | 7 | 6 | 4 | 6 | 4 | 6 | 6 | 6 | **5,9** |
| Boekhouder | 6 | 7 | 6 | 8 | 5 | 5 | 4 | 6 | 5 | 6 | **5,8** |
| Hovenier | 6 | 7 | 7 | 6 | 5 | 5 | 4 | 6 | 5 | 6 | **5,7** |
| Loodgieter | 6 | 6 | 7 | 6 | 5 | 5 | 4 | 6 | 5 | 6 | **5,6** |
| Schilder | 6 | 7 | 7 | 6 | 3 | 5 | 4 | 6 | 5 | 6 | **5,5** |
| Pedicure | 6 | 6 | 6 | 6 | 4 | 5 | 4 | 6 | 5 | 6 | **5,4** |
| **Gemiddeld** | | | | | | | | | | | **5,9** |

Local scoort overal 4: niet omdat de branchepagina's lokaal moeten zijn, maar omdat de onderliggende bedrijfsidentiteit (adres, KvK) ontbreekt.

---

## 23. P0 — Kritiek

**Geen P0-issues gevonden.** Alle 15 pagina's zijn (volgens code en archiefcrawl) indexeerbaar, server-gerenderd, canonical-correct en opgenomen in de sitemap. *Voorbehoud: de actuele live-status is niet geverifieerd (proxy-blokkade).*

## 24. P1 — Hoog

| ID | Issue | Pagina's | Impact | Effort | Reason | Recommended action |
|---|---|---|---|---|---|---|
| P1-1 | Slug-bug: WebPage `@id`/`url` naar 404-URL + "Bijgewerkt op" = elke dag vandaag | bloemist, boekhouder, hovenier, loodgieter, makelaar, pedicure, schilder | Hoog | Laag | Onjuiste versheid en tegenstrijdige entity-URL (`BranchPage.tsx:216`, `seo.ts:186`) | Expliciet `path`-veld in `BranchPageData`. `pageLastmod` niet laten terugvallen op vandaag |
| P1-2 | Identieke definitiezin boven de vouw op 15 pagina's | alle | Hoog | Middel | Substitutie-template op de meest prominente plek; doorway/scaled-risico | Branche-eigen samenvatting per pagina (datastructuur-veld `summary`) |
| P1-3 | Tegenstrijdige prijsclaims (definitie vs pricing-body vs `/tarieven`) | autobedrijf, makelaar, bloemist (+ check alle) | Hoog | Laag | Feitelijke consistentie voor gebruikers en antwoordmachines | Eén prijsverhaal per pagina. Definitie niet hardcoded "€ 499–€ 749" |
| P1-4 | Geen branchebewijs, generieke beelden (architectuur/SaaS op loodgieter enz.) | 11 generiek, 4 wellness | Hoog | Hoog | Trust/E-E-A-T, doorway-perceptie | Per branche echte of expliciet als concept gelabelde screens, cases, quotes |
| P1-5 | Zwakke interne linking: geen links vanaf homepage, dienstpagina's en blog. Schilder heeft 1 inlink | alle, vooral schilder | Hoog | Laag | Crawl-prioriteit en context | Zie §8 |
| P1-6 | H1-grammaticafout | autobedrijf | Middel | Zeer laag | Kwaliteitssignaal in de meest zichtbare kop | "…occasions verkoopt" |
| P1-7 | Bedrijfsidentiteit (adres/KvK/BTW) leeg | sitebreed | Hoog | Laag (data) | Trust, LocalBusiness-verwachting, wettelijke vermelding | Vul `ADDRESS`, `KVK`, `VAT_ID` in `seo.ts` |

## 25. P2 — Gemiddeld

| ID | Issue | Pagina's | Impact | Effort | Action |
|---|---|---|---|---|---|
| P2-1 | Meta-SEO-FAQ's ("gevonden op zoektermen als …") | hovenier, klusbedrijf, loodgieter, schilder | Middel | Zeer laag | Verwijderen of vervangen door een echte gebruikersvraag |
| P2-2 | Pedicure-intro en -FAQ over terminologie | pedicure | Middel | Laag | Intro herschrijven vanuit de gebruikersvraag |
| P2-3 | Bouwtijd-FAQ identiek op 15 pagina's | alle | Laag–middel | Laag | Branche-specifiek maken (wat vertraagt bij déze branche) of centraliseren |
| P2-4 | "tarievenpagina" zonder link, UI-verwijzing "knop hierboven" | 10 pagina's, kapsalon | Middel | Zeer laag | Echte contextuele links |
| P2-5 | CTA naar generieke `/contact` zonder branchecontext, geen tel-knop | alle | Middel | Laag | `?branche=` prefill, tel-CTA-knop, sticky mobiele CTA |
| P2-6 | Term/slug-mismatch | boekhouder (administratiekantoor), bloemist (bloemenwinkel), autobedrijf (geen "garage") | Middel | Laag | Primaire term kiezen, variant in title/H2 opnemen |
| P2-7 | robots.txt-groepen heffen Disallows op | sitebreed | Middel | Zeer laag | Disallows per benoemde groep herhalen |
| P2-8 | FAQPage-schema zonder rich-result-effect (retired 7 mei 2026) | alle | Laag | — | Laten staan (onschadelijk). Niet als rich-result-argument gebruiken. Waarde = gebruiker |
| P2-9 | Hub `/branches` dun (437 w), accordion dicht, Service-schema in plaats van ItemList | hub | Middel | Middel | Uitleg per groep, alle links standaard zichtbaar, `ItemList`-schema |
| P2-10 | "Groningen" als standaard-related op 13/15 | 13 | Laag | Zeer laag | Vervangen door een relevante dienst- of zusterlink |
| P2-11 | Kleine lettergrootte (13–14.5px) en kleine tikdoelen (dots 32px) | alle | Laag–middel | Laag | Body ≥16px op mobiel, tikdoelen ≥44px |
| P2-12 | Onverifieerbare "zelf beheren"-claims (voorraad, woningen) | autobedrijf, makelaar, bloemist, restaurant | Middel | Laag | Specificeren hoe (maatwerk-CMS per klant) of afzwakken |

## 26. P3 — Laag

| ID | Issue | Action |
|---|---|---|
| P3-1 | Koppeltekens in titles ("Makelaars-website") | Aaneenschrijven |
| P3-2 | `serviceType` inconsistent; loodgieter heeft handgeschreven Service-JSON-LD | Uniform via `serviceJsonLd` |
| P3-3 | Service zonder `audience`/`offers` | Alleen toevoegen bij consistente zichtbare prijs |
| P3-4 | og:image identiek op alle pagina's | Branche-og:image (optioneel) |
| P3-5 | Geen `fetchpriority="high"` en geen `srcset` op de hero-screenshot | Toevoegen |
| P3-6 | Engels "booking" in de nagelstudio-title | "online boeken" |
| P3-7 | Wellness-slideshow toont "massagestudio" (geen eigen branchepagina) | Vervangen of labelen |
| P3-8 | Hub-beschrijvingen beloven "seizoensplanning"/"werkgebied" die de pagina's niet uitwerken | Hub of pagina laten aansluiten |
| P3-9 | Kapsalon-meta noemt "Noord-Nederland" terwijl de pagina landelijk is | Consistent maken |

---

## 27. Top 20 Recommended Actions

1. Fix de slug-bug in `BranchPage` (`path`-veld) en verwijder de "vandaag"-fallback in `pageLastmod` (P1-1).
2. Vervang de identieke definitiezin door een unieke samenvatting per branche (P1-2).
3. Maak prijsinformatie per pagina consistent met `/tarieven` (P1-3).
4. Corrigeer de H1 van autobedrijf (P1-6).
5. Vul adres, KvK en BTW in (P1-7).
6. Link branchepagina's vanaf de homepage en `/website-laten-maken` (P1-5).
7. Maak "tarievenpagina" overal een echte link (P2-4).
8. Voeg per branche één bewijsstuk toe of label voorbeelden eerlijk als concept (P1-4).
9. Verwijder de 4 meta-SEO-FAQ's en herschrijf de pedicure-intro (P2-1, P2-2).
10. Geef schilder minstens 3 contextuele inlinks (P1-5).
11. Voeg een branche-prefill toe aan `/contact` en een tel-CTA-knop (P2-5).
12. Herstel de robots.txt-groepen (P2-7).
13. Kies een primaire term voor boekhouder, bloemist en autobedrijf ("garage") (P2-6).
14. Maak van de bouwtijd-FAQ een branche-specifieke vraag (P2-3).
15. Hub `/branches`: meer context, links standaard zichtbaar, ItemList (P2-9).
16. Vervang de Groningen-standaardlink door een relevante link (P2-10).
17. Zet functies per pakket als lijst of tabel in de needs- en pricing-secties (AEO, §11).
18. Link blogposts contextueel naar branches (§8).
19. Verbeter mobiele typografie en tikdoelen (P2-11).
20. Zet branchedata in één gestructureerd bestand en overweeg één dynamische route vóór uitbreiding (§29).

---

## 28. Recommended Future Content

Contentclusters rond "websites voor lokale bedrijven". Een deel bestaat al als blog of dienstpagina:

| Cluster | Bestaat | Voorstel |
|---|---|---|
| Kosten | `/tarieven`, blog "onderhoudskosten" | "Wat kost een website voor een zzp'er/dienstverlener?" met een branchetabel die naar branchepagina's linkt |
| Online afspraken | Verspreid over wellness-pagina's | Gids "Online boekingssysteem op je website: opties en valkuilen" → link naar kapsalon, nagelstudio, schoonheidssalon, pedicure, autorijschool |
| Offerteformulieren | Verspreid (bouw, catering) | Gids "Een offerteformulier dat wél wordt ingevuld" → bouw + catering |
| Lokale vindbaarheid | Blog GBP-fouten, `/seo` | "Google Bedrijfsprofiel voor [kapper/loodgieter]"-hoofdstukken binnen één gids, **geen** losse doorways |
| Snelheid/mobiel | Blog CWV | Link naar loodgieter en restaurant |
| Webshop vs website | Blog | Link naar bloemist en catering |
| Cases | Ontbreekt | Één casepagina per echte klant, gelinkt vanaf de juiste branchepagina |
| Nieuwe branches | — | Alleen toevoegen met echte expertise of bewijs. Logische kandidaten gezien de huidige clusters: barbier (of opnemen in kapsalon), installatiebedrijf (of opnemen in loodgieter), fysiotherapeut, fotograaf, dakdekker. **Geen volumedata, eerst valideren in Search Console/Keyword Planner** |

---

## 29. Technical Recommendations

1. **Datagedreven architectuur:** één `branches.ts` met `{ slug, term, synonyms, title, description, h1, summary, …, images, related }`. Dat voorkomt de slug-bug structureel en maakt metadata, schema, sitemap, `llms.txt` en hub consistent vanuit één bron. Nu staan dezelfde gegevens op 4 plekken (route, `PAGE_DATES`, `branches.tsx`, `llms.txt`).
2. `pageLastmod`: gooi een fout in dev of log een waarschuwing bij een onbekend pad. Nooit stil "vandaag" teruggeven.
3. Build-time check: elk pad in `PAGE_DATES` moet een route hebben, en elke branchedata-entry moet een `PAGE_DATES`-entry hebben.
4. robots.txt-groepen herstellen.
5. Hero-img: `fetchpriority="high"`, `srcset`/`sizes` (640/960/1440).
6. `/contact` met `validateSearch` voor `branche` en het veld vooraf invullen.
7. Hub: `ItemList`-schema, geen `Service`.
8. Optioneel op termijn: `/branches/{slug}` namespace (met 301's). Nu niet nodig, alleen bij >30 branches of als de verwarring tussen branche- en stadspagina's in de data zichtbaar wordt.

## 30. Content Recommendations

1. Per branche een unieke 2–3-zins-samenvatting als eerste alinea (vervangt de definitie).
2. Needs-sectie: begin met een lijst van 5–7 functies, daarna de uitleg.
3. Pricing: één concrete zin ("Een kapsalon-site met online boeken valt doorgaans in Pro, € 749") + link naar `/tarieven` + wat maatwerk maakt.
4. Eén bewijsblok per pagina (screen, case, quote, of eerlijk "ontwerpvoorstel").
5. Synoniemen natuurlijk verwerken (kapper, garage, installateur, bloemist, boekhouder).
6. Verwijder meta-SEO-teksten. Vervang de universele bouwtijd-FAQ door branche-eigen vragen.
7. Een zichtbare maker-/auteursregel (naam + rol).

## 31. AEO/GEO Recommendations

- Geen aparte "AI-optimalisatie" nodig [GOOGLE]. Focus op indexeerbaarheid, correcte feiten en duidelijke antwoorden.
- **Feitenconsistentie** (prijs, bouwtijd, wat inbegrepen is) tussen branchepagina's, `/tarieven`, `/faq` en schema.
- **Controleerbaarheid:** bewijs, bedrijfsgegevens, datum die klopt (§3.1).
- **Extraheerbaarheid:** lijsten, tabellen, korte eerste zin onder elke H2.
- **Entity-duidelijkheid:** één naam ("AIMI Development"), adres/KvK en consistente `@id`'s.
- Monitor in het Search Console-AI-rapport (sinds juni 2026 [INDUSTRIE]) of branchepagina's in AI-features verschijnen. Dit is monitoring, geen belofte.
- `llms.txt` houden (onschadelijk). Geen effect op Google verwachten [GOOGLE].

## 32. Final Assessment

De branchepagina's van AIMI zijn **inhoudelijk bovengemiddeld**: echte branchekennis, eigen invalshoeken en weinig tekstuele duplicatie. **Technisch zijn ze solide**: SSR, canonicals, sitemap en schema.

De zwakke punten zijn **systemisch en goed oplosbaar**:
- een template-bug die bij 7 pagina's onjuiste datum- en URL-signalen geeft
- een identiek definitieblok met een tegenstrijdige prijsclaim
- het ontbreken van branchebewijs en bedrijfsgegevens
- een interne linkstructuur die de pagina's alleen via een dichtgeklapte hub bereikbaar maakt

Geen enkel issue blokkeert indexering. Het risico op doorway- of scaled-content-perceptie is **laag tot gemiddeld** en zit in de template-laag, niet in de body.

De grootste hefboom (weinig werk, veel effect): P1-1, P1-2, P1-3, P1-5 en P1-6. De grootste strategische hefboom (veel werk): branchebewijs (P1-4).

---

## Per-branche rapporten

> Gedeelde template-issues (P1-2 definitieblok, P1-3 prijs, P1-4 bewijs, P1-5 linking, P1-7 identiteit, P2-3 bouwtijd-FAQ, P2-5 CTA, P2-8 FAQ-schema) gelden voor **alle** pagina's en worden hieronder niet herhaald. Performance-risico's zijn voor alle pagina's gelijk (§15); alleen afwijkingen worden genoemd. Local SEO: nvt voor de branche zelf; alleen de bedrijfsidentiteit telt (§9).

### Autobedrijf — `/website-laten-maken-autobedrijf`
- **Current state:** sterke verkoop-vs-werkplaatsinvalshoek, 7 FAQ's, generieke beelden, 2 inlinks.
- **Technical:** ✓ (branch = slug, WebPage-schema correct).
- **Search intent:** occasions ✓, werkplaats/garage-intentie onderbelicht in title en H1.
- **Content quality:** hoog. **Unique value:** hoog.
- **Keyword coverage:** mist garage/autogarage. **Entity coverage:** APK, occasions, schadeherstel ✓. RDW/kenteken, inruil ontbreken.
- **Internal linking:** alleen `/branches` + autorijschool.
- **Structured data:** Service/Breadcrumb/FAQ/WebPage ✓.
- **AEO:** goed. Prijs tegenstrijdig ("buiten standaardpakketten" vs definitie).
- **GEO:** duidelijk, zonder bewijs. **Trust:** "zelf auto's toevoegen via klantenportaal" niet verifieerbaar in deze repo.
- **Conversion:** generiek. Een "bezichtiging/werkplaats"-splitsing wordt gepredikt maar niet toegepast op AIMI's eigen CTA (acceptabel).
- **Problems:** H1-grammatica (P1-6), prijsconflict, geen garage-term.
- **Improvements:** H1 → "…verkoopt", title met "garage", prijs harmoniseren, link naar `/webshop-laten-maken` of `/onderhoud-hosting`.
- **Priority:** P1. **Score: 6,1**

### Autorijschool — `/website-laten-maken-autorijschool`
- Current state: leerling-vs-ouder-invalshoek, pakketprijzen. Technical ✓.
- Intent: goed (rijschool/autorijschool beide aanwezig).
- Content: goed. Uniek: hoog. Entities: CBR, proefles, examen ontbreken.
- Linking: 2 inlinks. SD ✓. AEO: goed ("prijzen op de site?"). Trust: geen bewijs.
- Problems: FAQ "buiten Noord-Nederland" (regio-template).
- Improvements: proefles/examen-entities, pakkettabel als voorbeeld.
- Priority: P2. **Score: 6,1**

### Bloemist — `/website-laten-maken-bloemist`
- Current state: sterke piekdag/rouwwerk-invalshoek.
- **Technical: slug-bug** (`bloemenwinkel` → WebPage-`@id` 404, datum = vandaag).
- Intent: goed, maar "bloemist" ontbreekt in title/H1. Content: hoog. Uniek: hoog.
- Entities: bezorging, rouwwerk, feestdagen ✓. Bruidswerk ontbreekt.
- Linking: 2 inlinks (hub, Winschoten). Goede link naar `/webshop-laten-maken`.
- SD: WebPage fout. AEO: "Heb ik een volledige webshop nodig?" is sterk.
- Problems: P1-1, term-mismatch.
- Improvements: path-fix, title "Website bloemist laten maken", voorbeeld-screen.
- Priority: P1. **Score: 5,9**

### Boekhouder — `/website-laten-maken-boekhouder`
- Current state: "wie zoekt als het knelt"-invalshoek, doelgroepen gesplitst.
- **Technical: slug-bug** (`administratiekantoor`).
- Intent: slug boekhouder, title/copy administratiekantoor. Kies een primaire term. Content goed. Uniek hoog.
- Entities: ZZP/MKB, aangifte, klantportaal ✓. AVG-veilig uploaden onderbelicht.
- Linking: 3 inlinks (hub, Assen, Meppel). SD: WebPage fout. Definitie leest "ondernemers in de branche administratiekantoor".
- Improvements: path-fix, title met "boekhouder" + "laten maken".
- Priority: P1. **Score: 5,8**

### Cateringbedrijf — `/website-laten-maken-cateringbedrijf`
- Current state: sterk ("belofte i.p.v. product", bruikbare offerteaanvragen). Technical ✓.
- Intent goed. Content hoog. Uniek hoog. Entities: allergenen, formules ✓.
- Linking: 2 inlinks. Link naar restaurant ✓. SD ✓. AEO: sterk ("welke gegevens moet het formulier uitvragen").
- Improvements: link naar `/webshop-laten-maken` bij bestelmodule, per-persoon-prijsvoorbeeld, voorbeeld-screen.
- Priority: P2. **Score: 6,3**

### Hovenier — `/website-laten-maken-hovenier`
- Current state: projectfoto's, aanleg vs onderhoud.
- **Technical: slug-bug** (`hoveniersbedrijf`).
- Intent goed. Content goed. Uniek gemiddeld (bouwcluster, overlap met schilder 7,2%).
- Meta-SEO-FAQ "gevonden op 'hovenier website laten maken'" (P2-1).
- Linking: 4 inlinks. SD: WebPage fout.
- Improvements: path-fix, FAQ vervangen, seizoensplanning uitwerken (hub belooft werkgebied).
- Priority: P1. **Score: 5,7**

### Kapsalon — `/website-laten-maken-kapsalon`
- Current state: online boeken, prijslijst, no-shows. Wellness-screens (inclusief massagestudio). Technical ✓.
- Intent: sterk op "kapsalon". "Kapper/kapperswebsite/barbier" zwak in de body.
- Content: goed, maar de pricing-tekst verwijst naar "de knop hierboven" (P2-4). Uniek: gemiddeld (wellness-cluster).
- Linking: 3 inlinks. SD ✓. Meta noemt Noord-Nederland (P3-9).
- Improvements: synoniemen, echte kapsalon-screen, UI-verwijzing verwijderen.
- Priority: P2. **Score: 6,1**

### Klusbedrijf — `/website-laten-maken-klusbedrijf`
- Current state: mobiel-first, foto-upload. Technical ✓. Meeste branche-inlinks na restaurant (6).
- Intent: overlapt deels met loodgieter/schilder (§17). Content: gemiddeld. Uniek: gemiddeld.
- Meta-SEO-FAQ (P2-1). 8 FAQ's. SD ✓.
- Improvements: positioneren als allround, body-links naar de specialisten, FAQ opschonen.
- Priority: P2. **Score: 5,9**

### Loodgieter — `/website-laten-maken-loodgieter`
- Current state: spoed/bellen.
- **Technical: slug-bug** (`loodgietersbedrijf`). Handgeschreven Service-schema (P3-2).
- Intent goed. "Installatiebedrijf/installateur" ontbreekt. Content: kortste bouwpagina (~780 w). Uniek: gemiddeld (7,9% met schilder).
- Meta-SEO-FAQ (P2-1). "Razendsnelle laadtijd" in de meta is onbewezen.
- Linking: 3 inlinks. Geen link naar `/tarieven` in related.
- Improvements: path-fix, installateur-term, FAQ opschonen, uniform schema.
- Priority: P1. **Score: 5,6**

### Makelaar — `/website-laten-maken-makelaar`
- Current state: sterkste invalshoek van de set (acquisitie van verkopers).
- **Technical: slug-bug** (`makelaarskantoor`).
- Intent goed. Content hoog. Uniek hoog. AEO sterk (courtage, platforms).
- **Prijsconflict:** Starter € 499 "met woningaanbod, zoekfilters" vs `/tarieven` Starter = één-pagina, en vs het advies op dezelfde pagina om géén zoekmachine te bouwen.
- Linking: 2 inlinks.
- Improvements: path-fix, prijsalinea herschrijven, title "Makelaarswebsite".
- Priority: P1. **Score: 6,1**

### Nagelstudio — `/website-laten-maken-nagelstudio`
- Current state: portfolio/nailart, cadeaubonnen. Echte nagelstudio-screen in de slideshow ✓. Technical ✓.
- Intent goed. Uniek gemiddeld (6,5% met schoonheidssalon). Entities: gellak/BIAB, Instagram ontbreken.
- Linking: 2 inlinks. Related linkt `/website-laten-maken` (goed).
- Improvements: vaktermen, "booking" → "online boeken".
- Priority: P2. **Score: 5,9**

### Pedicure — `/website-laten-maken-pedicure`
- Current state: regulier vs medisch, vergoeding, oudere doelgroep.
- **Technical: slug-bug** (`pedicurepraktijk`).
- Intent: intro opent met terminologie-uitleg (search-engine-first, P2-2). Terminologie-FAQ dito.
- Content: goed in de body. Uniek: gemiddeld. Entities: kwaliteitsregister niet bij naam (terecht voorzichtig).
- Linking: 2 inlinks. Ironie: de template gebruikt 13.5–14.5px tekst, terwijl de pagina "grote leesbare tekst" bepleit.
- Improvements: intro herschrijven, path-fix.
- Priority: P1. **Score: 5,4**

### Restaurant — `/website-laten-maken-restaurant`
- Current state: "kleine vraagjes"-invalshoek, menukaart als HTML. Technical ✓. Best gelinkt (9 inlinks, vooral vanaf locatiepagina's).
- Intent goed ("horeca" in kicker). Content hoog. Uniek hoog. AEO sterk ("PDF-kaart?", "social media genoeg?").
- Entities: allergenen ontbreken.
- Improvements: allergenen/groepsreservering, voorbeeld-screen.
- Priority: P2. **Score: 6,5**

### Schilder — `/website-laten-maken-schilder`
- Current state: binnen/buiten, projectgalerij, materialen.
- **Technical: slug-bug** (`schildersbedrijf`). **Bijna-orphan (1 inlink).**
- Intent goed. Content goed. Uniek gemiddeld (hoogste overlap: loodgieter 7,9%, hovenier 7,2%).
- Meta-SEO-FAQ (P2-1). Hub belooft "seizoensplanning", pagina niet.
- Improvements: path-fix, 3+ contextuele inlinks, FAQ opschonen, VvE/seizoen uitwerken.
- Priority: P1. **Score: 5,5**

### Schoonheidssalon — `/website-laten-maken-schoonheidssalon`
- Current state: intake, herhaalafspraken, cadeaubonnen. Echte schoonheidssalon-screen ✓. Technical ✓.
- Intent goed. Content: kortste pagina (~770 w). Uniek gemiddeld.
- Linking: 5 inlinks (incl. Hoogeveen). SD ✓.
- Improvements: behandelcategorieën, case/quote.
- Priority: P2. **Score: 6,0**

---

## Sources

| Bron | URL | Ondersteunt | Datum | Type | Opgehaald? |
|---|---|---|---|---|---|
| Google Search Central – Spam policies | https://developers.google.com/search/docs/essentials/spam-policies | Definities doorway abuse, scaled content abuse | doorlopend | **[GOOGLE]** | Nee (proxy). Inhoud via zoekresultaten/citaten |
| Google Search Central – Creating helpful, people-first content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | People-first vs search-engine-first | doorlopend | **[GOOGLE]** | Nee (proxy) |
| Google Search Central – AI features and your website | https://developers.google.com/search/docs/appearance/ai-features | Geen extra eisen/markup voor AI Overviews/AI Mode | doorlopend | **[GOOGLE]** | Nee (proxy). Via samenvatting zoekresultaat |
| Google Search Central Blog – Changes to HowTo and FAQ rich results | https://developers.google.com/search/blog/2023/08/howto-faq-changes | FAQ-beperking tot gov/health (aug 2023) | 08-2023 | **[GOOGLE]** | Nee (proxy) |
| Google Search Central Blog – Simplifying the search results page | https://developers.google.com/search/blog/2025/06/simplifying-search-results | Uitfasering structured-data-features | 06-2025 | **[GOOGLE]** | Nee (proxy) |
| Search Engine Land – Google to no longer support FAQ rich results | https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957 | FAQ rich results stoppen 7 mei 2026; SC-rapport juni, API aug 2026 | 2026 | [INDUSTRIE] | Via zoekresultaat |
| Search Engine Journal – Google Drops FAQ Rich Results | https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/ | Idem, markup mag blijven staan | 2026 | [INDUSTRIE] | Via zoekresultaat |
| Search Engine Roundtable – Google Drops FAQ Rich Results | https://www.seroundtable.com/google-drops-faq-rich-results-41298.html | Idem | 2026 | [INDUSTRIE] | Via zoekresultaat |
| Search Engine Journal – Google Is Not Diminishing The Use Of Structured Data In 2026 | https://www.searchenginejournal.com/google-is-not-diminishing-the-use-of-structured-data-in-2026/560516/ | Structured data blijft relevant | 2026 | [INDUSTRIE] | Via zoekresultaat |
| GSQI – August 2026 Spam Update case studies | https://www.gsqi.com/marketing-blog/august-2026-google-spam-update-case-studies/ | Spam-update aug 2026, scaled content | 2026 | [INDUSTRIE] | Via zoekresultaat |
| Clique Studios / Digital Applied – June 2026 Spam Update | https://cliquestudios.com/university/resources/google-june-2026-spam-update | Spam-update juni 2026 | 2026 | [INDUSTRIE] | Via zoekresultaat |
| Markfarkas.hu – Search Console AI report 2026 | https://markfarkas.hu/en/blog/google-search-console-ai-report-2026 | SC-rapport AI-features (juni 2026) | 2026 | [INDUSTRIE] | Via zoekresultaat |
| RFC 9309 – Robots Exclusion Protocol | https://www.rfc-editor.org/rfc/rfc9309 | Meest specifieke user-agent-groep geldt | 2022 | Standaard | Niet opgehaald; algemeen bekende norm |
| SERP-steekproef (WebSearch, US-gebaseerd) | zie §18 | Paginatypes concurrenten | 23-09-2026 | Onderzoeksinput | Ja |

**Speculatie is nergens als rankingfactor gepresenteerd.** Uitspraken over AI-citaties, `llms.txt`-effect en zoekvolumes zijn expliciet als onbekend of aanname gemarkeerd.

---

## Fact-check & eindcontrole

- [x] Alle 15 branchepagina's plus de hub opgenomen (route-lijst `src/routes/website-laten-maken-*.tsx` minus 15 steden en 1 generieke dienstpagina)
- [x] Duplicate-analyse is gemeten (5-gram-Jaccard) en niet geschat
- [x] Elke codebevinding heeft een bestand en regel of datavelden als bron
- [x] Geen zoekvolumes, performance-scores, rankings of concurrentieposities verzonnen
- [x] Geen rankinggaranties of AI-rankingclaims
- [x] Officiële Google-pagina's konden niet direct worden opgehaald. Dat staat per bron vermeld
- [x] **Geen code, content, metadata of schema gewijzigd.** De working tree is ongewijzigd. Dit rapport staat uitsluitend in de sessie-scratchpad, niet in de repo
