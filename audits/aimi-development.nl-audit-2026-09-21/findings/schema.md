# Schema.org-audit — aimi-development.nl (2026-09-21)

Status: **onvolledig afgerond wegens turn-limiet.** Dit document bevat alleen bevindingen die daadwerkelijk met bewijs uit `crawl-data.json` en `src/lib/seo.ts` zijn onderbouwd. Waar iets niet gecontroleerd kon worden staat dat expliciet vermeld — er is niets bijverzonnen.

## Methodologische noot (belangrijk voor de cijfers hieronder)

`crawl-data.json` bevat 70 rijen, maar **60 unieke URL's**. Tien blogposts staan er dubbel in (identieke `bytes`, identieke `schemas`-JSON, alleen `ms` wijkt af — geconstateerd via directe vergelijking), plus één blogpost (`/blog/ssl-certificaat-niet-veilig`) die maar één keer voorkomt en ook ontbreekt in `PAGE_DATES` in `src/lib/seo.ts`. Dit is een crawl-artefact, geen sitefout. De typeverdeling uit de opdracht ("BlogPosting 21x") telt die dubbele rijen mee. Onderstaande cijfers zijn herberekend op de 60 unieke pagina's:

| Type | Aantal (opdracht, n=70) | Aantal (gecorrigeerd, n=60 unieke pagina's) |
|---|---|---|
| Organization+ProfessionalService | 70 | 60 (100%) |
| WebSite | 70 | 60 (100%) |
| WebPage | 59 | 49 (11 missen) |
| BreadcrumbList | 67 | 57 (3 missen) |
| Service | 39 | 39 blokken over 36 pagina's (`/meer-diensten` heeft er 3) |
| FAQPage | 35 | 35 |
| BlogPosting | 21 | **11** (echte, unieke blogposts) |
| ItemList | 3 | 3 |
| OfferCatalog | 1 | 1 (`/tarieven`) |
| Article | 1 | 1 (`/wordpress-of-maatwerk`) |
| LocalBusiness | 1 | 1 (`/website-laten-maken-veendam`) |
| ContactPage | 1 | 1 (`/contact`) |

Geen enkele JSON-LD-parsefout aangetroffen op de gecontroleerde pagina's (`schema_errors` leeg).

**Niet gecontroleerd binnen de beschikbare tijd** (expliciet géén onderzoek meer gedaan, conform instructie): volledige inhoud van het `/tarieven`-OfferCatalog-blok, het `/website-laten-maken-veendam`-LocalBusiness-blok, het `/wordpress-of-maatwerk`-Article-blok, de route-bestanden die verklaren waaróm 10 pagina's `WebPage` missen, of `/meer-diensten` zijn drie Service-blokken elk een eigen `@id` hebben, en of er ergens video-embeds zonder `VideoObject` staan.

## Wat goed gaat

- **Coherente entiteitsgraaf via `@id`.** Organization (`.../#organization`) → WebSite (`.../#website`, `publisher` verwijst terug) → WebPage (`.../#webpage`, `isPartOf`/`about`/`publisher` verwijzen terug) → BlogPosting (`.../#article`, `mainEntityOfPage`/`author`/`publisher` verwijzen terug). Dit is precies hoe Google aanraadt om entiteiten te dedupliceren i.p.v. losse anonieme blokken per pagina. Ook `Service.provider` verwijst naar `ORG_ID`.
- **Geen verboden/deprecated types.** Geen HowTo, geen SpecialAnnouncement, geen CourseInfo/EstimatedSalary/LearningVideo. Schoon op dat vlak.
- **Correct patroon voor een Service Area Business.** Slechts 1 pagina (de echte vestigingsplaats Veendam) heeft `LocalBusiness`; de overige 14 stadspagina's (Hoogeveen, Groningen, Assen, etc.) gebruiken `Service` + `areaServed` in plaats van een verzonnen `LocalBusiness`/adres per stad. Dat is exact wat Google adviseert voor bedrijven zonder fysieke vestiging in elke servicestad — voorkomt spam-achtige nep-vestigingen.
- **Geen verzonnen auteursnaam.** `articleJsonLd()` zet `author: { "@id": ORG_ID }` in plaats van een fictieve Person, met een expliciete codecommentaar waarom: "geen verzonnen auteursnaam ... is de Organization de (juiste, want feitelijke) publisher/auteur." Dat is precies de integriteit die deze audit vereist.
- **`priceValidUntil` wordt dynamisch berekend** (`PRICE_VALID_UNTIL`, één jaar vooruit vanaf rendermoment) in plaats van een hardgecodeerde datum die stilletjes verloopt.
- **`hasOfferCatalog` op het Organization-blok** bevat twee reële Offers (Starter €499, Pro €749) met `price`, `priceCurrency`, `availability`, `url` en `priceValidUntil` — de basisvelden die Google voor Offer verwacht, zijn aanwezig.

## Bevindingen

### SCH-1 — KvK, BTW-nummer en straatadres nog steeds leeg — **Critical** — status: ONVERANDERD

Dit is dezelfde bevinding als SCH-1/SCH-4 uit de audit van 2026-09-20. **Niet opgelost.** Bevestigd direct in de bron:

```ts
// src/lib/seo.ts
export const ADDRESS = {
  streetAddress: "", // bv. "Kerkstraat 1"
  postalCode: "", // bv. "9641 AA"
  addressLocality: "Veendam",
  addressRegion: "Groningen",
  addressCountry: "NL",
};
export const KVK = "";
export const VAT_ID = "";
```

En bevestigd in de daadwerkelijke output (Organization-blok, o.a. op `/blog/wordpress-site-gehackt`): geen `address`, geen `vatID`, geen `identifier`-veld voor KvK. `businessIdentityJsonLd()` is zo gebouwd dat het deze velden pas toevoegt zodra ze gevuld zijn — een bewuste, goede keuze ("half PostalAddress of verzonnen KvK-nummer is slechter dan géén"), maar de constanten zelf zijn nooit ingevuld.

Impact: KvK-nummer is wettelijk verplicht op een Nederlandse commerciële website (Handelsregisterwet). Zonder `address`/`geo` is het enige `LocalBusiness`-blok (Veendam) ook onvolledig, wat kansen op Local Pack/Maps-rich-results beperkt.

**Fix:** vul de drie constanten in `src/lib/seo.ts` in met de echte, controleerbare gegevens. De code pakt de rest automatisch op — er is geen schema-aanpassing nodig, alleen data:

```ts
export const ADDRESS = {
  streetAddress: "<echt straatadres + huisnummer>",
  postalCode: "<echte postcode>",
  addressLocality: "Veendam",
  addressRegion: "Groningen",
  addressCountry: "NL",
};
export const KVK = "<8-cijferig KvK-nummer>";
export const VAT_ID = "<NL123456789B01>";
```

Deze data moet door AIMI zelf aangeleverd worden — ik verzin hier bewust geen waarden.

### SCH-2 — WebPage ontbreekt op 10 van 60 pagina's — **Medium**

11 pagina's missen `WebPage` in `schema_types`, maar `/contact` is terecht uitgezonderd: die heeft `ContactPage` (een specifieker type, bewust toegevoegd — zie `contactPageJsonLd()`). De overige 10 zijn een echte inconsistentie:

- `/website-laten-vernieuwen`
- `/seo`
- `/wordpress-of-maatwerk`
- `/website-checker`
- `/branches`
- `/webdesign`
- `/werkwijze`
- `/meer-diensten`
- `/privacybeleid`
- `/algemene-voorwaarden`

Gevolg: deze pagina's missen het `dateModified`-versheidssignaal dat de codebase zelf als bewuste GEO-strategie beschrijft (zie commentaar bij `webPageJsonLd()`, "GEO-audit 2026-09-06, punt 9"). De route-bestanden die dit veroorzaken zijn niet gecontroleerd (turn-limiet) — vermoedelijk roepen deze routes `webPageJsonLd()` simpelweg niet aan.

**Fix:** voeg in de route-component van elk van de 10 pagina's een aanroep van `webPageJsonLd({ path, name, description })` toe, zoals al gebeurt op de 49 pagina's die het wel hebben.

### SCH-3 — dateModified loopt uiteen tussen WebPage en BlogPosting op dezelfde pagina — **Medium**

Op `/blog/wordpress-site-gehackt` (en vermoedelijk de overige blogposts, niet één-voor-één geverifieerd) geven de twee schemablokken een ander antwoord op "wanneer is dit voor het laatst gewijzigd":

```json
// WebPage-blok
"datePublished": "2026-09-16T09:00:00+00:00",
"dateModified": "2026-09-16"

// BlogPosting-blok, zelfde pagina
"datePublished": "2026-09-16T09:00:00+00:00",
"dateModified": "2026-09-17T08:49:34.42754+00:00"
```

`datePublished` is consistent, `dateModified` niet: het WebPage-blok gebruikt de handmatig onderhouden `PAGE_DATES`-waarde, het BlogPosting-blok een timestamp met milliseconde-precisie die één dag later valt — vermoedelijk een build/rendermoment in plaats van een echte content-wijzigingsdatum. Twee tegenstrijdige versheidssignalen op dezelfde URL ondermijnen precies het doel dat de code zelf nastreeft (zie `PAGE_DATES`-commentaar over AI Mode-versheid). Niet gecontroleerd: exacte bron van de BlogPosting-timestamp (geen route-bestanden ingezien).

**Fix:** beide velden uit dezelfde bron laten komen — laat `articleJsonLd()` ook `pageLastmod(opts.path)` gebruiken voor `dateModified` in plaats van een los meegegeven waarde, zodat WebPage en BlogPosting nooit kunnen afwijken.

### SCH-4 — FAQPage op 35 pagina's — **Info** (niet verwijderen)

Google heeft FAQ-rich-results per 7 mei 2026 voor **alle** sites ingetrokken (dit vervangt de eerdere aug-2023-beperking tot overheid/gezondheid). Er is dus sitewide geen SERP-voordeel meer. Dit is niet schadelijk — er is geen penalty voor het hebben van FAQPage — en een eventueel voordeel voor AI-antwoordmachines (GEO) is onbevestigd. De docstring in de code ("kan rich results in Google opleveren", bij `faqJsonLd()`) is inmiddels achterhaald en mag bijgewerkt worden, maar er is geen actie nodig op de 35 pagina's zelf. Geen "verwijderen"-advies; wel: niet verder investeren in FAQPage-uitbreiding met Google-rich-results als doel.

### SCH-5 — LocalBusiness (1x) en Article (1x) naast BlogPosting (11x) — waarschijnlijk bewust, niet volledig geverifieerd

- `LocalBusiness` alleen op `/website-laten-maken-veendam`: consistent met het SAB-patroon (zie "Wat goed gaat"), lijkt bewust en correct.
- `Article` alleen op `/wordpress-of-maatwerk`: dit is geen `/blog/*`-pagina maar een losstaande vergelijkingspagina, dus `Article` i.p.v. `BlogPosting` is semantisch verdedigbaar. De daadwerkelijke inhoud van dat Article-blok is niet ingezien — dus dit is een aanname, geen harde verificatie.

Geen fix voorgesteld; alleen vermeld omdat de opdracht expliciet vroeg dit te beoordelen.

## Ontbrekende kansen

- **Review/AggregateRating:** niet aanwezig, en er is geen bewijs van echte reviews aangeleverd in dit onderzoek. **Niet toevoegen zonder echte data** — als AIMI daadwerkelijk Google-reviews of testimonials heeft, lever de cijfers aan, dan kan dit alsnog toegevoegd worden. Zelf verzinnen is uitgesloten.
- **Person voor blogauteurs:** momenteel bewust `Organization` als auteur (zie "Wat goed gaat"). Er staan al twee reële Personen in het Organization-blok (`founder`: Aidan, Milan). Alleen toevoegen als een van hen daadwerkelijk als zichtbare auteur op de blogpagina's wordt gepresenteerd — anders blijft de huidige, eerlijke aanpak beter.
- **`/tarieven` OfferCatalog/priceSpecification:** er is al een `hasOfferCatalog` met concrete Offers sitewide via Organization; de aparte, uitgebreidere OfferCatalog op `/tarieven` zelf is niet in detail gecontroleerd (turn-limiet) — dus geen concrete fix hier, wel een openstaand controlepunt voor een vervolgaudit.
- **HowTo/VideoObject:** terecht niet aanwezig resp. niet aangetroffen; niet gecontroleerd of er video-embeds zonder markup op de site staan.

## Categoriescore: 70/100

Sterke technische fundamenten (coherente `@id`-graaf, geen deprecated types, correct SAB-patroon, geen verzonnen data) worden neergehaald door één onopgeloste kritieke bevinding uit de vorige audit (KvK/BTW/adres) en twee reële consistentie-gaten (WebPage-dekking, dateModified-mismatch).
