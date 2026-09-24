# Wat ik al gedaan heb

**Datum:** 2026-09-04 · Tegenhanger van [JOUW-TAKEN.md](JOUW-TAKEN.md)

Alles hieronder staat lokaal in je working tree. **Niet gecommit en niet gepusht** —
dat doe jij zelf. `npx tsc --noEmit` en `npx vite build` zijn allebei schoon.

---

## Correcties op mijn eigen audit

Bij het uitvoeren bleek een aantal bevindingen uit het eerste rapport niet te
kloppen. Ik heb ze geverifieerd tegen de code in plaats van tegen mijn eigen
crawl-output, en vier ervan haal ik in.

### OP-4 — dubbele HTML-encoding · **vervalt**
Ik meldde `&#x27;` in twee descriptions als double-encoding. Dat was een fout in
míjn crawler: die decodeerde `&#39;` wel en `&#x27;` niet. In de echte HTML staat
`&#x27;` precies één keer geëncodeerd, wat correcte React-output is. Nul hits op
`&amp;#x27;`. Er was niets kapot.

### IMG-1 — lazy loading · **vervalt**
Ik meldde "0 van 33 afbeeldingen gebruikt `loading="lazy"`". In werkelijkheid
staat er **één** `<img>` in de hele codebase: de hero. Die is je LCP-element en
hoort juist níét lazy te zijn. Hij heeft al `fetchPriority="high"`,
`decoding="async"`, `width`/`height` en een volledige srcset. De "33" waren
33 pagina's met elk diezelfde ene afbeelding.

### IMG-4 — lege alt · **vervalt**
De lege `alt` zit op de decoratieve achtergrond-hero en staat er samen met
`aria-hidden="true"`. Dat is exact de juiste manier. Geen actie nodig.

**Afbeeldingen ging daarmee van 85 naar 95** — er is feitelijk niets mis.

### PERF-3 — 21 modulepreload-hints · **afgezwakt**
Ik schreef dat de homepage chunks preloadt die hij niet nodig heeft, en noemde
`auth-middleware` en `contact.functions`. Dat klopte niet: `index.tsx` rendert
echt `<Contact />`, dus die chunks horen bij de afhankelijkheden van de pagina.
Wat overblijft is veel kleiner — de code van het formulier onder de vouw laadt
met dezelfde prioriteit als content erboven. Na compressie is het totaal ~330 KB
en is dit geen prioriteit meer. **Ik heb hier bewust niets aan veranderd**: het
formulier lazy maken zou hem uit de SSR-HTML halen, en dat is content die Google
juist moet zien.

### GEO-2 — geen Person-entiteiten · **afgezwakt**
Er staan al `founder`-entiteiten voor Aidan en Milan in het Organization-schema.
Wat er ontbreekt is kleiner dan ik schreef: geen `@id`, geen `jobTitle`, geen
`sameAs`. Dat vult zich vanzelf zodra je taak 10 (foto's en bio's) aanlevert.

---

## Doorgevoerde wijzigingen

### Titles ingekort tot onder 60 tekens

| Pagina | Was | Nu | |
|---|---|---|---|
| `/seo` | 70 | **54** | SEO laten doen \| Snelheid & lokale vindbaarheid — AIMI |
| `/` | 64 | **56** | AIMI — Webdesignbureau uit Veendam \| Websites & webshops |
| `/tarieven` | 63 | **54** | Wat kost een website laten maken? Tarieven vanaf € 499 |
| `/website-laten-vernieuwen` | 61 | **54** | Website laten vernieuwen \| Opknappen of opnieuw bouwen |

Keuzes die ik daarbij maakte:

- **`/tarieven`** — "— AIMI" eruit in plaats van de zoekterm. Zo blijven zowel
  "website laten maken" als de "€ 499"-haak binnen de zichtbare lengte; je merk
  staat toch al in het domein ernaast.
- **`/`** — "Noord-Nederland" werd "Veendam". Dat paste niet alleen beter, het is
  ook specifieker voor lokale zoekopdrachten. Wil je de bredere claim terug, dan
  is "AIMI — Webdesignbureau Noord-Nederland | Websites & webshops" precies 60 —
  krap maar mogelijk.

De `og:title` en `twitter:title` liet ik staan: die kennen geen SERP-limiet.

### Meta descriptions verlengd naar 145–156 tekens

Alle zes zaten net onder de 120 en lieten een halve regel SERP-ruimte liggen.

`/website-laten-maken-assen` (117→156) · `/branches` (116→149) ·
`/website-laten-maken-autorijschool` (115→145) · `/website-laten-maken-klusbedrijf`
(113→150) · `/website-laten-maken-schilder` (107→153) · `/website-laten-maken-roden`
(107→155)

Ook `/privacybeleid` (47→170) en `/algemene-voorwaarden` (33→148), die veel te
kort waren om iets te zeggen.

### `og:url` toegevoegd
`/privacybeleid` en `/algemene-voorwaarden` waren de enige twee pagina's zonder.
Ook `og:type` erbij voor consistentie.

### `ContactPage`-schema op `/contact`
Nieuwe helper `contactPageJsonLd()` in [src/lib/seo.ts](../src/lib/seo.ts), met een
`ContactPoint` (telefoon, e-mail, `availableLanguage: nl`, `areaServed: NL`).

De `mainEntity` hergebruikt bewust `ORG_ID`: JSON-LD voegt nodes met hetzelfde
`@id` samen, dus dit hangt het contactpunt aan je bestaande organisatie in plaats
van er een tweede entiteit naast te zetten.

### Bedrijfsgegevens voorbereid (jij vult alleen de waarden)
In `seo.ts`: `ADDRESS`, `KVK`, `VAT_ID` plus de helpers `postalAddress()` en
`businessIdentityJsonLd()`. Bedraad in:

- **`__root.tsx`** — het `Organization`-schema neemt adres, `vatID` en de
  KvK-`identifier` automatisch over
- **`Footer.tsx`** — toont adres, KvK en BTW op alle 48 pagina's

Alles rendert **alleen als het ingevuld is**. Nu leeg → `businessIdentityJsonLd()`
geeft `{}` terug en de footerbalk verschijnt niet. Geverifieerd.

### `priceRange: "€€"` op de organisatie
Zelfde niveau als je Veendam-vestigingspagina al claimde, dus de twee entiteiten
spreken elkaar niet tegen. Veilig omdat het geen nieuwe informatie is.

### `EMAIL`-constante
`sales@aimi-development.nl` stond hardgecodeerd in `__root.tsx`. Nu één plek in
`seo.ts`, net als `PHONE_DISPLAY`/`PHONE_E164` — zo kunnen schema en ContactPoint
niet uit elkaar lopen.

### Drie uitgaande citaties
De site linkte naar **nul** externe bronnen. Dat telt mee voor E-E-A-T en zwaar
voor AI-citaties: een site die niemand aanhaalt, wordt zelf ook minder aangehaald.

| Pagina | Link | Waarom daar |
|---|---|---|
| `/seo` | [web.dev/articles/vitals](https://web.dev/articles/vitals) | Onderbouwt je claim dat de CWV-drempels niet jouw interpretatie zijn |
| `/privacybeleid` | Autoriteit Persoonsgegevens | Stond er als tekst; hoort een link te zijn |
| `/wordpress-of-maatwerk` | wordpress.org | Versterkt juist de eerlijke toon van die vergelijking |

Alle drie `rel="noopener"` en `target="_blank"`.

### Sitemap `lastmod` bijgewerkt
13 pagina's die ik daadwerkelijk wijzigde staan op `2026-09-04`. De rest liet ik
staan — de datums worden bewust handmatig bijgehouden (staat zo in de comment) en
dan hoort er alleen een datum bij een échte wijziging.

---

## Bewust níét gedaan

| | Waarom |
|---|---|
| **Adres, KvK, BTW invullen** | Jouw gegevens. Bedrading ligt klaar → taak 3 |
| **`public/og-image.png`** | Had niet-gecommitte wijzigingen van jou |
| **Contact-sectie lazy laden** | Zou hem uit de SSR-HTML halen; slechter voor SEO dan de winst waard is |
| **`aggregateRating`** | Er zijn geen echte reviews. Verzonnen ratings = handmatige actie |
| **`sameAs` uitbreiden** | Ik kan geen profiel-URL's verzinnen → taak 8 |
| **Openingstijden** | Bedrijfsbeslissing → taak 5 |
| **Committen en pushen** | Doe jij zelf |
| **nginx** | Geen toegang vanuit deze repo → taken 1 en 2 |

---

## Verificatie

```
npx tsc --noEmit   → schoon
npx vite build     → ✓ built in 41s
```

De twee build-warnings (`client.server.ts` dynamic import, `"use client"` in
TanStack Router) bestonden al vóór deze wijzigingen.

Ik heb de nieuwe JSON-LD apart gevalideerd: leeg levert `{}` op, ingevuld levert
een correct `PostalAddress` + `vatID` + KvK-`identifier` op, en de `ContactPage`
parseert schoon.

---

## Verwachte score na deze wijzigingen

| | Was | Nu |
|---|---|---|
| On-Page SEO | 90 | **96** |
| Afbeeldingen | 85 | **95** (correctie) |
| Schema | 82 | **86** |
| AI-vindbaarheid | 80 | **84** |
| Content | 76 | **78** |
| **Totaal** | **79** | **~82** |

De rest zit vast aan jouw taken. Met taak 1 en 2 erbij (nginx) kom je op **~87**;
Performance springt dan van 58 naar ongeveer 85.
