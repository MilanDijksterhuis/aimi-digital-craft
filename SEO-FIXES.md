# SEO-fixlijst aimi-development.nl

Volledige audit van de TanStack Start/React codebase — 14 publieke routes, 15 portal/admin-routes,
alle componenten, `public/` en de server-/buildconfig.

**Status:** alleen rapportage. Er is geen code gewijzigd.
**Methode:** statische code-analyse (twee volledige passes, bevindingen onderling geverifieerd).
**Legenda:** `[HOOG]` / `[MIDDEN]` / `[LAAG]` = SEO-impact. `[VERIFIEER]` = niet vanuit de repo vast te
stellen, vereist een check op de live server. `[OK]` = gecontroleerd en in orde, geen actie nodig.

---

## Servercontroles — uitgevoerd 16-08-2026

| Check | Uitkomst | Gevolg |
|---|---|---|
| `__l5e` logo-URL | **HTTP 404** | #12 **bevestigd kapot** — alle 8 verwijzingen zijn dood |
| `/bestaat-niet-xyz` | **HTTP 404** | #89 **opgelost** — geen soft-404, geen actie nodig |
| `http://www.` | **301 → `https://www.`** | #90 **deels** — http→https werkt, maar landt op www i.p.v. non-www |

De reverse proxy is nginx/1.28.3 op Ubuntu; de redirect-config staat daar, niet in deze repo.
De CSP- en security-headers uit `src/server.ts` komen correct door op de responses.

### Nog uitvoeren om #90 af te ronden

```bash
# Volgt na https://www. ook een 301 naar non-www, of blijft de site op www staan?
curl -sIL http://www.aimi-development.nl/  | grep -E "^HTTP|^Location"
curl -sIL http://aimi-development.nl/      | grep -E "^HTTP|^Location"
```

Gewenste eindsituatie: alle drie de varianten (`http://`, `http://www.`, `https://www.`) eindigen in
**één** 301-keten naar `https://aimi-development.nl/`, want dat is wat alle canonicals aangeven.

---

## A. Kritiek — content die crawlers niet zien

Dit is structureel de grootste winst. Vier componenten renderen hun inhoud pas ná JS-interactie,
waardoor Google een fractie van de content ziet.

1. **[HOOG]** `src/components/FAQ.tsx` r. 80-94: de FAQ-antwoorden staan in `{isOpen && ...}` en zitten
   dus **niet in de SSR-HTML**. Op `/faq` ziet Google 5 vragen en 0 antwoorden. Render alle antwoorden in
   de HTML (bijv. `<details>/<summary>`, zoals `ServicePage.tsx` al doet) en verberg ze met CSS in plaats
   van conditioneel te renderen.
2. **[HOOG]** `src/components/Services.tsx` r. 144-176: alleen de actieve dienst (`current.desc` +
   `current.steps`) staat in de HTML. 3 van de 4 dienstbeschrijvingen ontbreken op de homepage. Render
   alle 4 en verberg de inactieve met CSS.
3. **[HOOG]** `src/components/ProcessTimeline.tsx` r. 152-258: idem — alleen de actieve fase staat in de
   HTML, 3 van de 4 fasen ontbreken. Render alle 4.
4. **[HOOG]** `src/routes/meer-diensten.tsx`: `useState(false)` (r. 358) betekent dat SSR de desktop-tak
   rendert; de dienstbeschrijvingen (`s.desc`, `points`) renderen alleen in de mobiele tak (r. 1107) of
   pas ná een klik. Crawlers zien ~60 woorden op de pagina die SEO als dienst verkoopt. Zet alle
   dienstteksten als echte HTML op de pagina.
5. **[HOOG]** `src/components/Nav.tsx` r. 94-136: de 4 servicelinks zitten in `{open && ...}`
   (hover-dropdown) en staan **niet in de SSR-HTML**. Uit de hele nav zijn alleen `/`, `/portal` en
   `/contact` crawlbaar. Render de dropdown-links altijd in de DOM.

## B. Kritiek — prijzen spreken elkaar tegen

6. **[HOOG]** Er staan **5 verschillende prijzen** voor hetzelfde product op de site. Kies één waarheid
   en trek alles gelijk:
   - `src/components/Pricing.tsx` r. 7 / r. 13 (zichtbaar op homepage): Starter **€ 499**, Pro **€ 749**
   - `src/routes/index.tsx` r. 64-66 (JSON-LD op diezelfde pagina): **1250** en **3500**
   - `src/routes/index.tsx` r. 23 (meta description): **"Vanaf € 1.250"**
   - `src/components/LocationLanding.tsx` r. 57 (zichtbaar op Veendam + Hoogeveen): **"vanaf € 1.250"**
   - `src/routes/website-laten-maken.tsx` + beide locatiepagina's (meta + FAQ): **€ 499**
   - `public/llms.txt` r. 8 + r. 21: **€ 1.250**
7. **[HOOG]** `src/routes/index.tsx` r. 60-69: de JSON-LD `Offer`-prijzen (1250/3500) komen **niet
   overeen met de zichtbare prijstabel** (499/749) op dezelfde pagina. Dit is een overtreding van
   Google's structured-data-richtlijnen en kan een handmatige maatregel opleveren. Laat de JSON-LD exact
   de zichtbare prijzen volgen.
8. **[MIDDEN]** `src/routes/index.tsx` r. 67: de `Offer` "Custom" heeft geen `price`/`priceCurrency` →
   ongeldige Offer. Weglaten of vullen.
9. **[LAAG]** `src/components/LocationLanding.tsx` r. 57 spreekt de FAQ op diezelfde pagina tegen
   (€ 1.250 in de body, € 499 in het FAQ-antwoord).

## C. Kritiek — kapotte assets

10. **[HOOG]** `og:image` wijst overal naar `/og-image.svg`. **SVG werkt niet als og:image** bij Facebook,
    LinkedIn, WhatsApp, X, Slack en iMessage — elke gedeelde link toont géén afbeelding. Maak een echte
    **PNG/JPG van 1200×630**. Raakt: `index.tsx` r. 29-30, `website-laten-maken.tsx`,
    `webshop-laten-maken.tsx`, `onderhoud-hosting.tsx`, `werkwijze.tsx`, `contact.tsx` en beide
    locatiepagina's.
11. **[HOOG]** `public/og-image.svg` is een 285-byte placeholder (zwart vlak met de letter "A."). Geen
    logo, geen tekst, geen merk. Vervangen.
12. **[HOOG]** **BEVESTIGD KAPOT (404, gemeten 16-08-2026).** De logo-URL
    `https://aimi-development.nl/__l5e/assets-v1/f039dfe4-…/aimi-logo.png` is een **Lovable-CDN-pad** dat
    na de verhuizing naar de eigen VPS niet meer bestaat (`public/__l5e/` ontbreekt; in `src/assets/`
    staat alleen een stub `aimi-logo.png.asset.json`). Gevolg: gebroken favicon, gebroken
    apple-touch-icon, gebroken `twitter:image`, en een `logo`/`image` dat Google niet kan ophalen in
    **alle** Organization-, LocalBusiness- en Service-schema's — waardoor de logo-rich-result vervalt.
    Zet een echte PNG in `public/` en vervang op alle 8 plekken:
    - `src/routes/__root.tsx` r. 109 (twitter:image)
    - `src/routes/__root.tsx` r. 113 (favicon)
    - `src/routes/__root.tsx` r. 114 (apple-touch-icon)
    - `src/routes/__root.tsx` r. 140 (Organization `logo`)
    - `src/lib/seo.ts` r. 6 (`LOGO_URL`)
    - `src/routes/index.tsx` r. 47-48 (`logo` + `image`)
    - `src/routes/website-laten-maken-veendam.tsx` r. 76
    - `src/routes/website-laten-maken-hoogeveen.tsx` r. 76
13. **[MIDDEN]** `public/favicon.svg` bestaat, maar wordt **alleen op de homepage** ingeladen
    (`index.tsx` r. 34). Alle andere pagina's krijgen het waarschijnlijk-404'ende `__l5e`-PNG uit
    `__root.tsx`. Zet de favicon in `__root.tsx`.
14. **[MIDDEN]** Geen `favicon.ico`-fallback en geen werkende `apple-touch-icon` PNG.
15. **[MIDDEN]** Geen `manifest.json` in `public/` en geen `<link rel="manifest">`.

## D. Kritiek — functionaliteit geblokkeerd door de eigen CSP

16. **[HOOG]** `src/components/Contact.tsx` r. 24-44 laadt de Calendly-widget, maar de CSP in
    `src/server.ts` blokkeert hem drievoudig:
    - `script-src 'self' 'unsafe-inline'` blokkeert `assets.calendly.com/.../widget.js`
    - er is **geen `frame-src`** (valt terug op `default-src 'self'`) → de Calendly-iframe wordt geblokkeerd
    - `connect-src 'self' https://*.supabase.co` blokkeert de Calendly-API

    **"Plan een afspraak" is daarmee stuk in productie.** Voeg `https://assets.calendly.com` toe aan
    `script-src`, `https://calendly.com` aan `frame-src` en aan `connect-src` — of haal Calendly eruit.
17. **[HOOG]** `src/routes/meer-diensten.tsx` laadt nog een Google-Fonts-stylesheet
    (`fonts.googleapis.com/css2?family=Sora`) plus een `preconnect`. De CSP (`style-src 'self'
    'unsafe-inline'`) blokkeert dit → render-vertraging, CSP-fout in de console, en Sora laadt nooit.
    Overblijfsel van vóór het self-hosten van de fonts. **Verwijderen** (beide regels in `links`).
18. **[LAAG]** De CSP mist `font-src` en `frame-src` volledig. Expliciet toevoegen.

## E. Sitemap & robots.txt

19. **[HOOG]** `src/routes/sitemap[.]xml.tsx` r. 41-42: `/algemene-voorwaarden` en `/privacybeleid` staan
    in de sitemap **én** hebben `robots: noindex` → Search Console-fout "Ingediende URL gemarkeerd als
    noindex". Kies één signaal (advies: uit de sitemap halen, noindex behouden).
20. **[HOOG]** `sitemap[.]xml.tsx` r. 14: `LASTMOD = new Date()` wordt aan **alle 13 URL's** gehangen en
    bij elke serverstart opnieuw berekend → elke pagina claimt altijd "vandaag gewijzigd". Google leert
    dit signaal negeren. Gebruik een echte datum per pagina.
21. **[MIDDEN]** `public/robots.txt` blokkeert routes die niet bestaan: `/klantenportaal`, `/auth/`,
    `/wachtwoord-vergeten`, `/monitoring-api/`. Opruimen.
22. **[MIDDEN]** `public/robots.txt` mist bestaande privéroutes: **`/account`** en **`/server`** zijn
    echte authenticated routes maar staan niet in de disallow-lijst. Ook `/api/` en `/track.js` zijn vrij
    crawlbaar.
23. **[MIDDEN]** `/login` heeft zowel een robots.txt-disallow als een `noindex`-meta. Google kan de
    noindex niet lezen omdat de URL geblokkeerd is → de URL kan alsnog kaal in de index komen. Kies er één.
24. **[LAAG]** `changefreq` en `priority` worden door Google sinds 2023 genegeerd — mogen weg.
25. **[LAAG]** `VITE_SITE_URL` wordt gebruikt in `sitemap[.]xml.tsx` r. 4 maar staat niet in
    `.env.example` (daar staat alleen `VITE_APP_URL`). Toevoegen, of `SITE_URL` uit `lib/seo.ts` gebruiken.
26. **[LAAG]** `public/llms.txt` beschrijft `/meer-diensten` met content die crawlers daar niet
    aantreffen, en noemt de verkeerde prijs.
27. **[OK]** De sitemap is inhoudelijk compleet: alle 13 publieke routes staan erin, geen dode of
    niet-bestaande routes.

## F. Meta tags

28. **[HOOG]** Kapotte scheidingstekens in titles — er is duidelijk een find/replace op het em-streepje
    misgegaan. Ergste geval: `algemene-voorwaarden.tsx` r. 7 = `"Algemene Voorwaarden  AIMI—"` (dubbele
    spatie + streepje aan het **eind**). Verder is het streepje wég in:
    - `"Over ons AIMI"` (`over-ons.tsx`)
    - `"Meer diensten AIMI"` (`meer-diensten.tsx`)
    - `"Privacybeleid AIMI"` (`privacybeleid.tsx`)
    - `"Website laten maken | Professioneel & vanaf € 499 AIMI"` (`website-laten-maken.tsx`)
    - `"Webshop laten maken | Verkoopklaar & op maat AIMI"` (`webshop-laten-maken.tsx`)
    - `"Onderhoud & hosting | Vanaf € 30 p/m AIMI"` (`onderhoud-hosting.tsx`)
    - `"Onze werkwijze | Zo bouwen wij jouw website AIMI"` (`werkwijze.tsx`)

    Overal `— AIMI` van maken.
29. **[MIDDEN]** Homepage-title is 68 tekens → afgekapt in de SERP. Begint bovendien met "AIMI
    Development" in plaats van het zoekwoord. Naar ≤ 60 tekens.
30. **[MIDDEN]** Zes meta descriptions boven 160 tekens → afgekapt: `/` (164),
    `/webshop-laten-maken` (164), `/onderhoud-hosting` (165), `/website-laten-maken-veendam` (**177**),
    `/website-laten-maken-hoogeveen` (**179**), `/contact` (**177**). Inkorten naar 150-160.
31. **[MIDDEN]** Veendam en Hoogeveen hebben bijna identieke descriptions (alleen de plaatsnaam
    gewisseld) → duplicate-risico. Uniek maken.
32. **[MIDDEN]** Titles te kort en zonder zoekwoord: `/over-ons` (13 tekens), `/meer-diensten` (18),
    `/privacybeleid` (18), `/faq` (26).
33. **[MIDDEN]** `/faq` description is maar 95 tekens. Uitbreiden naar 150-160.
34. **[LAAG]** `/contact` title mist de merknaam.
35. **[LAAG]** `keywords`-meta staat op 6 pagina's (`index`, beide dienstenpagina's, beide
    locatiepagina's, `werkwijze`, `contact`). Google negeert dit sinds 2009 — mag weg.
36. **[OK]** Geen enkele pagina heeft een lege of ontbrekende title/description; alle 14 zijn uniek.

### Gemeten lengtes (richtlijn: title 30-60, description 120-160)

| Route | Title | len | Desc len | Oordeel |
|---|---|---|---|---|
| `/` | AIMI Development Website laten maken \| Webdesign Veendam & Hoogeveen | 68 | 164 | beide te lang |
| `/website-laten-maken` | Website laten maken \| Professioneel & vanaf € 499 AIMI | 54 | 158 | ok |
| `/webshop-laten-maken` | Webshop laten maken \| Verkoopklaar & op maat AIMI | 49 | 164 | desc te lang |
| `/onderhoud-hosting` | Onderhoud & hosting \| Vanaf € 30 p/m AIMI | 41 | 165 | desc te lang |
| `/website-laten-maken-veendam` | Website laten maken in Veendam \| AIMI Webdesign | 47 | 177 | desc te lang |
| `/website-laten-maken-hoogeveen` | Website laten maken in Hoogeveen \| AIMI Webdesign | 49 | 179 | desc te lang |
| `/werkwijze` | Onze werkwijze \| Zo bouwen wij jouw website AIMI | 48 | 160 | ok |
| `/meer-diensten` | Meer diensten AIMI | 18 | 121 | title te kort |
| `/over-ons` | Over ons AIMI | 13 | 152 | title veel te kort |
| `/faq` | Veelgestelde vragen — AIMI | 26 | 95 | beide te kort |
| `/contact` | Contact \| Vraag een offerte aan | 31 | 177 | geen merk, desc te lang |
| `/algemene-voorwaarden` | `Algemene Voorwaarden  AIMI—` | 27 | 33 | kapot |
| `/privacybeleid` | Privacybeleid AIMI | 18 | 47 | te kort |
| `/login` | Inloggen — AIMI Klantenportaal | 30 | 34 | ok (noindex) |

## G. Open Graph & social sharing

37. **[HOOG]** `__root.tsx` definieert **geen `og:image`** als fallback, waardoor `/meer-diensten`,
    `/over-ons` en `/faq` helemaal geen og:image hebben. Voeg een default toe in de root.
38. **[MIDDEN]** `/website-laten-maken-veendam` en `-hoogeveen` missen `twitter:card` + `twitter:image` →
    ze erven de kapotte `__l5e`-URL uit de root. Juist de belangrijkste lokale landingspagina's.
39. **[MIDDEN]** `/faq` mist `og:description`.
40. **[MIDDEN]** `/meer-diensten`, `/over-ons` en `/faq` missen `og:type`.
41. **[MIDDEN]** Nergens `og:image:width` (1200), `og:image:height` (630) of `og:image:alt`.
42. **[LAAG]** Nergens `og:locale` = `nl_NL`.
43. **[LAAG]** `index.tsx` r. 30 gebruikt `property: "twitter:image"`; alle andere pagina's gebruiken
    `name:`. Twitter-tags horen `name=` te zijn. Gelijktrekken.

### Dekkingsmatrix (`--` = ontbreekt)

| Route | og:title | og:desc | og:image | og:url | og:type | tw:card | tw:image | canonical |
|---|---|---|---|---|---|---|---|---|
| `/` | ok | ok | ok | ok | `--` | `--` | ok | ok |
| `/website-laten-maken` | ok | ok | ok | ok | ok | ok | ok | ok |
| `/webshop-laten-maken` | ok | ok | ok | ok | ok | ok | ok | ok |
| `/onderhoud-hosting` | ok | ok | ok | ok | ok | ok | ok | ok |
| `/…-veendam` | ok | ok | ok | ok | ok | `--` | `--` | ok |
| `/…-hoogeveen` | ok | ok | ok | ok | ok | `--` | `--` | ok |
| `/werkwijze` | ok | ok | ok | ok | ok | ok | ok | ok |
| `/meer-diensten` | ok | ok | `--` | ok | `--` | `--` | `--` | ok |
| `/over-ons` | ok | ok | `--` | ok | `--` | `--` | `--` | ok |
| `/faq` | ok | `--` | `--` | ok | `--` | `--` | `--` | ok |
| `/contact` | ok | ok | ok | ok | ok | ok | ok | ok |
| `/algemene-voorwaarden` | `--` | `--` | `--` | `--` | `--` | `--` | `--` | **`--`** |
| `/privacybeleid` | `--` | `--` | `--` | `--` | `--` | `--` | `--` | **`--`** |
| `/login` | `--` | `--` | `--` | `--` | `--` | `--` | `--` | **`--`** |

## H. Structured data (JSON-LD)

44. **[HOOG]** `LocalBusiness` mist verplichte adresvelden. Veendam/Hoogeveen (r. 79) hebben alleen
    `addressLocality`/`addressRegion`/`addressCountry` — **geen `streetAddress`, geen `postalCode`**.
    `/contact` heeft **helemaal geen `address`**. Nergens een `telephone`. Zonder deze velden geen local
    rich results.
45. **[HOOG]** `logo`/`image` in élk schema wijst naar de kapotte `__l5e`-URL (zie #12) → Google kan de
    afbeelding niet ophalen en de logo-rich-result vervalt.
46. **[MIDDEN]** Drie concurrerende bedrijfsentiteiten: `contact.tsx` gebruikt `"@id": ".../contact"`
    (naam "AIMI"), Veendam `"@id": ".../website-laten-maken-veendam"` (naam "AIMI Webdesign Veendam"),
    Hoogeveen idem. Voor Google zijn dat **3 verschillende bedrijven**. Gebruik één canonieke `@id`
    (bijv. `https://aimi-development.nl/#organization`) en verwijs daarnaar.
47. **[MIDDEN]** Op de homepage staan `Organization` (root) én `ProfessionalService` (`index.tsx`) los
    van elkaar, zonder `@id`-koppeling → dubbele entiteit. Samenvoegen of koppelen.
48. **[MIDDEN]** `/faq` heeft **geen `FAQPage`-schema**, terwijl de 3 dienstenpagina's het wél hebben.
    Juist de echte FAQ-pagina mist het. Toevoegen nadat #1 is opgelost.
49. **[MIDDEN]** Geen `BreadcrumbList` op `/over-ons`, `/meer-diensten` en `/faq` (de rest heeft het wel).
50. **[MIDDEN]** Geen `openingHoursSpecification` op enige `LocalBusiness`.
51. **[MIDDEN]** Geen **zichtbare** breadcrumb-navigatie; alleen schema. Google wil dat schema overeenkomt
    met zichtbare UI. Voeg een echte breadcrumb toe in plaats van de losse "← Terug naar home"-link.
52. **[LAAG]** Geen `sameAs` (LinkedIn, Instagram, Facebook, KvK-nummer) op `Organization` → mist de
    sterkste entiteit-bevestiging die er is.
53. **[LAAG]** Geen `AggregateRating`/`Review`-schema. Alleen toevoegen als er echte reviews zijn — nooit
    verzinnen.
54. **[OK]** Alle schema's zijn syntactisch valide JSON met correcte `@context`/`@type`; `breadcrumbJsonLd`
    telt `position` correct vanaf 1. Geen parse-fouten.

## I. Canonical tags

55. **[HOOG]** Geen canonical op `/algemene-voorwaarden`, `/privacybeleid` en `/login` — deze
    `head`-blokken hebben helemaal geen `links`-array.
56. **[MIDDEN]** Geen default-canonical in `__root.tsx` → elke nieuwe route die het vergeet heeft er
    meteen geen. Zo is #55 ontstaan.
57. **[LAAG]** Drie verschillende manieren om dezelfde URL te schrijven: hardcoded string, lokale
    `const URL`, en `${SITE_URL}`. Centraliseren in `lib/seo.ts`.
58. **[OK]** De 11 aanwezige canonicals zijn correct self-referencing en absoluut; de homepage gebruikt
    terecht de trailing slash. Geen conflicten bij dynamische routes (die zitten allemaal achter
    `_authenticated` en zijn `noindex`).

## J. Headings & contentstructuur

59. **[HOOG]** `/faq` heeft **geen H1**. `faq.tsx` rendert `<Nav />`, een "terug"-link en dan `<FAQ />`,
    en die component begint met een `motion.h2` (r. 46). H1 toevoegen.
60. **[HOOG]** `/meer-diensten` heeft **nul H2's en nul H3's** over 1305 regels, en twee `<h1>` in de
    broncode (r. 975 desktop, r. 1037 mobiel). Kopstructuur aanbrengen, één H1.
61. **[HOOG]** Thin content op de commerciële pagina's: `/contact` ~106 woorden, `/over-ons` ~173,
    `/faq` ~176, dienstenpagina's ~174, locatiepagina's ~206. Concurrenten op "website laten maken"
    zitten op 800-1500 woorden. Uitbreiden.
62. **[MIDDEN]** Veendam en Hoogeveen draaien op dezelfde `LocationLanding`-template met alleen de
    plaatsnaam en omliggende plaatsen gewisseld; de FAQ-antwoorden zijn bijna woordelijk gelijk. Bij een
    3e/4e plaats wordt dit een echt duplicate-content-probleem. Geef elke plaats unieke tekst (lokale
    cases, wijken, branches).
63. **[MIDDEN]** `/over-ons` heeft maar **één H2** voor een hele pagina; de 4 waarden en 4 stats staan in
    `<div>`'s. Maak van de waarden H3's.
64. **[MIDDEN]** 404- en errorpagina zijn **Engelstalig** op een Nederlandse site: `__root.tsx` r. 23-33
    ("Page not found", "Go home") en r. 66-87 ("This page didn't load"). Vertalen.
65. **[MIDDEN]** De 404-pagina overschrijft de `<title>` niet (erft "AIMI — Web Agency") en zet geen
    `noindex`. Beide toevoegen.
66. **[LAAG]** `ProcessTimeline.tsx` r. 28: de fase heet `"ontwikkeling"` met kleine letter terwijl de
    andere drie een hoofdletter hebben — dit staat zichtbaar in de H3.
67. **[LAAG]** `algemene-voorwaarden.tsx` r. 26: "Laatst bijgewerkt: juni 2025" is verouderd.
68. **[LAAG]** Lege placeholder-elementen (waarschijnlijk verwijderde nummering) die niets renderen:
    `Services.tsx` r. 83-90 en r. 152-156, `ProcessTimeline.tsx` r. 101-108 en r. 164-168. Opruimen.
69. **[LAAG]** `Services.tsx` r. 78: `<button>` in een `.map()` **zonder `key`-prop** → React-waarschuwing.
    Bug, geen SEO.

### Heading-overzicht

| Route | H1 | Structuur | Oordeel |
|---|---|---|---|
| `/` | 1 | H1 → 5×H2 → H3 | ok |
| `/website-laten-maken` | 1 | H1 → 5×H2 → 2×H3 | ok |
| `/webshop-laten-maken` | 1 | idem | ok |
| `/onderhoud-hosting` | 1 | idem | ok |
| `/…-veendam` / `-hoogeveen` | 1 | H1 → 6×H2 → 2×H3 | ok |
| `/werkwijze` | 1 | H1 → 5×H2 → 3×H3 | ok |
| `/contact` | 1 | H1 → H2 → 3×H3 | ok |
| `/over-ons` | 1 | H1 → 1×H2 | zwak |
| `/faq` | **0** | alleen H2 | fout |
| `/meer-diensten` | 2 in code | geen H2/H3 | fout |

## K. Interne links

70. **[HOOG]** `src/components/Services.tsx`: de sectie "Wat we doen" op de homepage **linkt naar geen
    enkele dienstenpagina**. De 4 diensten zijn `<button>`s en de enige link is `#contact`. Maak er links
    van naar `/website-laten-maken`, `/webshop-laten-maken`, `/onderhoud-hosting` en `/meer-diensten`.
71. **[MIDDEN]** De dienstnamen op de homepage ("Design & Development", "Hosting & Beheer", "Performance",
    "Hosting Only") komen **niet overeen** met de namen van de echte dienstenpagina's ("Website laten
    maken", "Webshop laten maken", "Onderhoud & hosting", "Meer diensten"). Keyword-mismatch. Gelijktrekken.
72. **[MIDDEN]** `/meer-diensten` heeft als enige publieke pagina **geen `<Footer />`** → doodlopende
    pagina, zeker in combinatie met #5.
73. **[MIDDEN]** `Nav.tsx` gebruikt `<a href>` in plaats van `<Link>` (r. 21, 116, 150, 164, 167) → elke
    navigatieklik doet een volledige documentreload en gooit de SPA-routing weg. `Footer.tsx` doet het
    wél goed.
74. **[MIDDEN]** De nav mist links naar `/faq` en naar beide locatiepagina's.
75. **[MIDDEN]** `LocationLanding.tsx` r. 98 en r. 280: de CTA's gaan naar `/#contact` (homepage-anker) in
    plaats van `/contact`, waardoor linkwaarde naar de homepage gaat en de bezoeker de landingspagina
    verlaat. `ServicePage.tsx` doet het wél goed met `/contact`.
76. **[LAAG]** De dienst-kaarten in `ServicePage.tsx` (`offerings`) en `LocationLanding.tsx` (`SERVICES`)
    zijn niet-klikbare `<div>`'s. "SEO & vindbaarheid" zou naar `/meer-diensten` moeten linken.
77. **[LAAG]** `/faq` linkt alleen "← Terug naar home"; `/werkwijze` heeft maar 2 uitgaande links (`/` en
    `/contact`) ondanks de langste tekst van de site. FAQ-antwoorden over prijs, doorlooptijd en hosting
    zijn ideale ankerplekken.
78. **[OK]** **Geen orphan pages** — de footer linkt alle 12 publieke pagina's (Diensten 4, Regio 2,
    AIMI 4, Juridisch 2). **Geen broken interne links** — alle `href`/`to`-doelen bestaan, net als de
    ankers `#contact`, `#pricing` en `#services`. Veendam ↔ Hoogeveen linken naar elkaar, en de
    dienstenpagina's linken onderling en naar de locatiepagina's.

## L. Afbeeldingen

79. **[HOOG]** `src/assets/hero-forest.webp` is **594 KB** en wordt in `Hero.tsx` r. 11 als
    CSS-`background-image` op het LCP-element gezet. Eén variant voor alle schermen, geen AVIF, geen
    `srcset` (kan niet met een CSS-background). Comprimeren + responsieve varianten, of omzetten naar
    een `<img>` met `srcset`/`sizes`.
80. **[LAAG]** Geen image-sitemap (pas relevant zodra er echte afbeeldingen zijn).
81. **[OK]** Er is **geen enkel `<img>`-element in de codebase** → per definitie geen ontbrekende
    `alt`-tags en geen lazy-loading-problemen. Wel meenemen zodra er echte afbeeldingen bijkomen
    (portfolio, teamfoto's).

## M. Performance / Core Web Vitals

82. **[HOOG]** `src/components/rodeachtergrond.tsx`: een **fullscreen `<canvas>` met een oneindige
    `requestAnimationFrame`-loop** draait op de 5 belangrijkste landingspagina's (beide locatiepagina's +
    alle 3 dienstenpagina's). Er is **geen `prefers-reduced-motion`-check** — de CSS-regel in
    `styles.css` werkt niet op een canvas-rAF-loop. Kost permanent CPU en batterij en drukt op INP. Voeg
    een reduced-motion-check toe en pauzeer bij `document.hidden`.
    *(De canvas heeft wél `pointerEvents: none`, dus hij blokkeert geen kliks.)*
83. **[MIDDEN]** `/meer-diensten` is 1305 regels met een doorlopende rAF-loop en een grote inline-SVG-
    animatie → hoge TBT/INP op mobiel. *(Deze pagina checkt `prefers-reduced-motion` wél, r. 365.)*
84. **[MIDDEN]** `motion` (framer-motion) wordt geïmporteerd door `Nav`, `Hero`, `Services`, `About`,
    `Pricing`, `ProcessTimeline`, `Contact`, `FAQ` en `over-ons` → staat op het kritieke pad van élke
    publieke pagina.
85. **[MIDDEN]** `__root.tsx` r. 128 laadt `track.js` via een **hardcoded absolute productie-URL**
    (`https://aimi-development.nl/track.js?u=…`). Op staging/preview/localhost is dat cross-origin en
    wordt het door `script-src 'self'` geblokkeerd. Maak er een relatief pad van (`/track.js?u=…`).
86. **[LAAG]** `server.ts` `IMMUTABLE_ASSET_RE` dekt `/assets/`, `/_build/` en `/fonts/*.woff2`, maar niet
    `/og-image.*`, `/favicon.*`, `/robots.txt` of `/llms.txt` — die krijgen geen `Cache-Control`.
87. **[OK]** De `manualChunks`-config in `vite.config.ts` is goed: recharts/d3 zitten in een aparte
    `charts`-chunk en `clsx`/`cva`/`tailwind-merge` zijn apart getrokken, zodat `cn()` niet de hele
    recharts-chunk de landingspagina in trekt. Recharts zit alleen in `ui/chart.tsx` (admin/portal), niet
    op publieke routes.
88. **[OK]** Fonts zijn correct self-hosted met `font-display: swap` en een preload van de primaire
    latin-woff2.

## N. Technische basis

89. **[OK — gemeten 16-08-2026]** De 404 geeft een **echte HTTP 404**, geen soft-404. TanStack Start zet
    de status correct. Geen actie nodig. *(De losse punten #64 en #65 over de Engelstalige tekst, de
    ontbrekende `<title>`-override en de ontbrekende `noindex` op die pagina blijven wél staan.)*
90. **[HOOG — deels gemeten 16-08-2026]** http→https werkt: `http://www.` geeft een **301** naar
    `https://www.`. Maar de redirect landt op **www**, terwijl alle canonicals naar **non-www**
    (`https://aimi-development.nl`) wijzen. Als `https://www.aimi-development.nl/` vervolgens een 200
    teruggeeft in plaats van een 301 naar non-www, is de hele site op twee hostnames bereikbaar →
    duplicate content. De canonicals dempen dat, maar het is geen schone oplossing en het splitst je
    linkwaarde. Rond de keten af in de nginx-config op de VPS (zie de twee curls bovenaan dit document):
    `http://`, `http://www.` en `https://www.` moeten alle drie in één 301-keten eindigen op
    `https://aimi-development.nl/`.
91. **[MIDDEN]** Geen `<main>`-landmark op `/meer-diensten`, `/algemene-voorwaarden`, `/privacybeleid`
    en `/login`.
92. **[MIDDEN]** Geen skip-link ("Ga naar hoofdinhoud") op de hele site.
93. **[MIDDEN]** `Contact.tsx` r. 196-198 en r. 241-243: de `<label>`s hebben geen `htmlFor`/`id`-koppeling
    met hun input/textarea → niet programmatisch gekoppeld voor screenreaders.
94. **[MIDDEN]** De contactpagina toont **geen adres en geen telefoonnummer** — alleen een e-mailadres
    (`contact.tsx` r. 84). Voor lokale SEO is consistente NAP-data (Naam, Adres, Telefoon) op de site
    belangrijk, en het is nodig om #44 te kunnen vullen.
95. **[LAAG]** `/api/public/*` en `/track.js` zijn vrij crawlbaar (zie #22).
96. **[OK]** Geen mixed content — geen enkele `http://`-referentie in `src/` buiten schema-namespaces.
97. **[OK]** Security headers zijn op orde: HSTS (alleen over https), CSP, `X-Content-Type-Options`,
    `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
98. **[OK]** Alle 15 portal/admin-routes hebben `robots: noindex`.

## O. Privacy & cookies (raakt vertrouwen en E-E-A-T)

99. **[HOOG]** `src/routes/privacybeleid.tsx` r. 97-98 stelt: *"Wij gebruiken uitsluitend functionele
    cookies... Er worden geen tracking- of advertentiecookies geplaatst."* Maar `__root.tsx` r. 127-130
    laadt `track.js` dat pings en URL's naar de server stuurt, én `CookieBanner.tsx` biedt toggles aan
    voor "Analytisch" en "Marketing". De privacyverklaring klopt niet met de praktijk.
100. **[HOOG]** De cookietoestemming wordt **niet afgedwongen**: `CookieBanner.tsx` slaat de voorkeuren op
     in `localStorage`, maar niets leest ze uit om scripts te blokkeren (alleen `ChatWidget.tsx` r. 30
     gebruikt de key, en dan nog alleen voor positionering). `track.js` laadt onvoorwaardelijk, vóór
     enige toestemming. AVG-probleem.
101. **[MIDDEN]** De cookiebanner linkt niet naar `/privacybeleid`.

---

## Aanbevolen volgorde

**Stap 0 — verifiëren.** Afgerond op 16-08-2026, op één punt na: rond #90 af met de twee curls bovenaan.
Resultaat: #12 is bevestigd kapot (404), #89 is geen probleem, #90 is half in orde.

**Stap 1 — quick wins, grootste impact.**
#12 (logo-URL — nu bevestigd 404, raakt favicon + social + alle schema's in één klap) · #10 + #11 (echte
OG-afbeelding) · #19 (noindex/sitemap-conflict) · #55 (ontbrekende canonicals) · #28 (title-streepjes) ·
#6 + #7 (prijzen gelijktrekken) · #17 (Google Fonts eruit) · #59 (H1 op `/faq`) · #37 (og:image-fallback
in de root) · #90 (www-redirect afmaken in nginx).

**Stap 2 — structureel, meer werk.**
#1 t/m #5 (content server-renderbaar maken — dit is verreweg de grootste structurele winst) ·
#70 (homepage naar dienstenpagina's linken) · #16 (Calendly repareren) · #79 + #82 (LCP en
canvas-animatie) · #44 + #94 (NAP-data) · #61 (content uitbreiden) · #99 + #100 (privacy op orde).
