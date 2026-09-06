# GEO-analyse — aimi-development.nl

**Datum:** 6 september 2026
**Getest:** live productie (48 URL's in sitemap), homepage, /tarieven, /website-laten-maken-veendam, /faq, /over-ons
**Kader:** Google's AI-optimalisatiegids (mei 2026) — GEO is geen aparte discipline, maar SEO-fundamenten toegepast op AI-oppervlakken.

---

## 1. GEO Readiness Score: **66 / 100**

| Criterium | Weging | Score | Oordeel |
|---|---|---|---|
| Citeerbaarheid van passages | 25% | 17 / 25 | Goed geschreven, maar geen unieke data en het antwoord staat zelden vooraan |
| Structurele leesbaarheid | 20% | 16 / 20 | Schone koppenhiërarchie, tabellen, FAQ's server-side gerenderd |
| Multi-modale content | 15% | 8 / 15 | Beeld aanwezig, maar geen video, grafieken of gepubliceerde tooldata |
| Autoriteit en merksignalen | 20% | **6 / 20** | **De bottleneck.** Geen datums, geen entiteitskoppelingen, geen vermeldingen buiten de eigen site |
| Technische toegankelijkheid | 20% | 19 / 20 | Bijna perfect: SSR, AI-crawlers expliciet toegelaten, llms.txt, IndexNow |

**Samenvatting in één zin:** de techniek is beter op orde dan bij vrijwel elk bureau in de regio, maar AI-systemen kunnen AIMI niet als entiteit herkennen en zien nergens dat de content actueel is — en dat zijn precies de twee zwaarstwegende citatiefactoren.

---

## 2. Platform-uitsplitsing

| Platform | Score | Waarom |
|---|---|---|
| **Google AI Overviews** | 70 / 100 | Sterk ranking-gecorreleerd. De technische basis is in orde; de beperking is dat de pagina's eerst moeten ranken. 92% van AIO-citaties komt van top-10-pagina's. |
| **Google AI Mode** | 55 / 100 | Aparte citatiemotor: AIO en AI Mode citeren dezelfde URL's slechts **13,7%** van de tijd. Hier wegen versheid en entiteitsautoriteit zwaarder dan positie — en juist daar staat AIMI zwak (nul `dateModified`, geen entiteitspresentie). |
| **ChatGPT** | 35 / 100 | Citeert voor 47,9% Wikipedia en 11,3% Reddit. AIMI komt op geen van beide voor. |
| **Perplexity** | 30 / 100 | Citeert voor 46,7% Reddit. Nul community-aanwezigheid. |
| **Bing Copilot** | 65 / 100 | IndexNow is geïmplementeerd (`scripts/indexnow-submit.mjs` + key-route), wat hier direct helpt. |

---

## 3. AI-crawlertoegang: ✅ in orde

`robots.txt` is expliciet en correct opgezet — beter dan de meeste sites die ik hier zie.

| Crawler | Status |
|---|---|
| GPTBot, OAI-SearchBot, ChatGPT-User | ✅ Toegestaan |
| ClaudeBot | ✅ Toegestaan |
| PerplexityBot | ✅ Toegestaan |
| Google-Extended, Googlebot, Bingbot | ✅ Toegestaan |
| Bytespider, PetalBot, MJ12bot | ⛔ Geblokkeerd (bewuste keuze, prima) |

**Twee kleine aanvullingen:**

- **`Google-CloudVertexBot`** en **`cohere-ai`** ontbreken. Niet urgent, maar één regel werk.
- **`CCBot`** (Common Crawl) is niet genoemd en valt dus onder `User-agent: *` → toegestaan. Dat is verdedigbaar: Common Crawl voedt veel open modellen en is een indirecte zichtbaarheidsbron. Bewuste keuze maken, niet per ongeluk laten staan.

> **Let op:** `ChatGPT-User`, `Google-Agent` en `Google-NotebookLM` negeren `robots.txt` per ontwerp — dat zijn door gebruikers aangestuurde fetchers. Je `Allow` voor ChatGPT-User doet dus feitelijk niets, maar schaadt ook niet.

---

## 4. llms.txt: ✅ aanwezig en goed opgezet

`/llms.txt` geeft HTTP 200 en is inhoudelijk sterk: alle 48 pagina's gegroepeerd per regio, branche en dienst, met prijzen erin (`vanaf € 499`, `€ 30 per maand`).

**Belangrijke nuance:** Google stelt sinds 15 mei 2026 expliciet dat `llms.txt` **niet** meetelt voor Google Search en de zichtbaarheid niet helpt of schaadt. Het bestand levert dus geen ranking- of citatievoordeel bij AI Overviews of AI Mode. Voor andere systemen kán het helpen. Houd het, onderhoud het, maar reken er geen effect aan toe.

**Wel te repareren:** het bestand noemt `Aidan & Milan` en prijzen, maar geen enkele datum. Voeg een regel toe:

```
> Laatst bijgewerkt: 2026-09-06
```

---

## 5. Merkvermeldingen: ❌ dit is het grootste probleem

Merkvermeldingen correleren **3× sterker** met AI-citaties dan backlinks (Ahrefs, 75.000 merken). Domain Rating scoort ~0,266; YouTube-vermeldingen ~0,737.

Ik heb gezocht op `"AIMI" webdesign Veendam` en op `AIMI Development Veendam`. Resultaat:

| Platform | Status |
|---|---|
| Wikipedia / Wikidata | ❌ Niet aanwezig |
| Reddit | ❌ Niet gevonden |
| YouTube | ❌ Niet gevonden |
| LinkedIn | ❌ Niet gevonden in de SERP |
| Branchedirectories (Trustoo, Webdesignkaart, Webdesign-gids) | ❌ Niet vermeld — terwijl 10+ concurrenten dat wél zijn |
| Google-reviews | ❌ Geen publieke score |

**AIMI komt in geen enkel zoekresultaat voor zijn eigen markt voor.** Elf andere bureaus wel: NC-Websites, Convident, Maeno, De Leo Media, codeNext, Xless Design, Webmasterdienst, ccorner, onlinemeersucces, woutr.io en Webmazters.

### Het naamprobleem — onderschat dit niet

Het `Organization`-schema draagt `"name": "AIMI"`, zonder `alternateName` of `legalName`.

"AIMI" is een van de meest botsende merknamen die je kunt kiezen voor entiteitsherkenning: het Stanford AIMI Center (medische beeld-AI) domineert de term wereldwijd. Een LLM dat "AIMI" tegenkomt, koppelt dat vrijwel zeker aan medische AI, niet aan een webdesignbureau in Veendam.

Dat is geen tekstprobleem maar een entiteitsprobleem, en het beperkt élke andere GEO-inspanning. Zolang het onopgelost is, kun je vermeldingen verzamelen zonder dat een AI-systeem ze aan jouw bedrijf koppelt.

---

## 6. Citeerbaarheid van passages

**Wat goed gaat:**

- **FAQ-antwoorden staan server-side in de body**, niet alleen in de JSON-LD. Getest op /website-laten-maken-veendam: vraag én antwoord komen twee keer voor in de ruwe HTML (JSON-LD + zichtbare tekst). Dat is precies goed — veel sites zetten FAQ's alleen in schema en verliezen daarmee de citeerbaarheid.
- **Concrete, verifieerbare getallen** door de hele site: € 499, € 749, € 30 per maand. AI-systemen citeren bij voorkeur passages met harde cijfers, en dit is exact het gat dat je concurrenten laten liggen.
- **Alinealengte** op de locatiepagina's zit rond 150–200 woorden — dicht bij het optimum van 134–167 woorden voor citatie.

**Wat mist:**

- **Het antwoord staat zelden in de eerste 30% van de pagina.** Ongeveer 44% van de AI-citaties komt uit dat eerste deel. De homepage opent met `Websites die écht…` — merkcopy, geen antwoord. `/tarieven` doet het wél goed: het bedrag staat vlak onder de H1.
- **Geen definitiepatronen.** Nergens staat "Webdesign is…" of "Een maatwerkwebsite is…". Dat zijn de zinsvormen die LLM's als definitie oppikken.
- **Geen eigen data.** Alle cijfers op de site zijn je eigen prijzen of marktbrede schattingen. Er is geen enkel gegeven dat alleen bij AIMI vandaan kan komen — en unieke data is de sterkste citatietrekker die er is.

---

## 7. Server-side rendering: ✅ geen enkel probleem

AI-crawlers voeren geen JavaScript uit. Getest op drie pagina's:

| URL | HTML | Woorden in ruwe HTML | JSON-LD-blokken |
|---|---|---|---|
| `/` | 111 KB | ~3.010 | 3 |
| `/tarieven` | 55 KB | ~1.518 | 5 |
| `/website-laten-maken-veendam` | 45 KB | ~1.435 | 5 |

H1's, kopstructuur, bodytekst en FAQ-antwoorden staan allemaal in de eerste HTML-respons. TanStack Start met `NITRO_PRESET=node_server` doet hier exact wat het moet doen. **Hier is geen werk te doen.**

---

## 8. Top 5 hoogste impact

### 1. Voeg datums toe — `dateModified` én zichtbaar op de pagina

**Nul van de geteste pagina's heeft `dateModified`.** Content jonger dan 3 maanden wordt ~3× vaker geciteerd; pagina's die 6+ maanden onaangeroerd lijken, verliezen citatie-eligibiliteit (SE Ranking, onderzoek op 1,3 miljoen citaties).

De sitemap heeft wél `lastmod` (t/m 2026-09-04), dus de data bestáát al — ze staan alleen niet in de pagina's zelf.

Twee dingen:
- `dateModified` en `datePublished` in het schema van elke contentpagina
- Een zichtbare regel "Bijgewerkt op 6 september 2026" op tarieven-, locatie- en dienstenpagina's

Dit is de goedkoopste ingreep met de grootste opbrengst op deze site.

### 2. Los het entiteitsprobleem op

- `"name"` in het Organization-schema uitbreiden met `"alternateName": "AIMI Development"` en `"legalName"` zodra de KvK-inschrijving bekend is
- `sameAs` uitbreiden — nu staat er **één** link in (Google Maps). Voeg toe: LinkedIn-bedrijfspagina, eventueel YouTube, KvK-vermelding, Trustoo-profiel
- Gebruik "AIMI Development" consequent in externe vermeldingen, nooit alleen "AIMI"

### 3. Bouw merkvermeldingen buiten de eigen site

In volgorde van opbrengst tegen inspanning:

1. **Google-reviews** — je hebt een Maps-vermelding maar geen score. Dit is ook het conversiegat dat ik bij de Veendam-vergelijking al vond.
2. **Branchedirectories** — Trustoo, Webdesignkaart, Webdesign-gids. Concurrenten staan er allemaal; jij niet. Gratis, en het zijn precies de bronnen die AI-antwoorden op lokale zoekopdrachten aanhalen.
3. **LinkedIn-bedrijfspagina** — matige correlatie, maar het is entiteitsbewijs en kost een uur.
4. **Reddit** — 46,7% van Perplexity's citaties en 11,3% van ChatGPT's. Deelnemen in `r/ondernemen` of `r/thenetherlands` met echte antwoorden, niet met promotie.

### 4. Zet een citeerbaar antwoordblok in de eerste 30%

Op elke belangrijke pagina één zelfstandig leesbaar blok van 134–167 woorden, direct onder de H1, dat de kernvraag beantwoordt zonder de rest van de pagina nodig te hebben. Concreet: homepage, `/website-laten-maken`, `/webshop-laten-maken`, `/seo`, en elke locatiepagina.

### 5. Publiceer eigen data uit de website-checker

Je hebt met `/website-checker` een tool die echte metingen doet aan websites van bezoekers. Geaggregeerde uitkomsten daarvan zijn een dataset die nergens anders bestaat — bijvoorbeeld "van de X websites uit Noord-Nederland die we in 2026 maten, laadde Y% trager dan 3 seconden op mobiel".

Dat is originele research: de sterkste citatietrekker die er is, en meteen een reden voor anderen om naar je te linken. Let op de AVG — alleen geaggregeerd publiceren, nooit herleidbaar naar een individuele site.

---

## 9. Schema-aanbevelingen

Wat er al staat is goed: `WebSite`, `Organization` (met `@id`-consolidatie), `FAQPage`, `BreadcrumbList`, `LocalBusiness` met `GeoCoordinates` en `PostalAddress`, `OfferCatalog`, `Offer` met `UnitPriceSpecification`, `Person` (2×), `ContactPoint`. Dat is meer en netter dan gebruikelijk.

**Toe te voegen, op volgorde:**

| Wat | Waar | Waarom |
|---|---|---|
| `dateModified` + `datePublished` | Alle contentpagina's | Versheidssignaal — zie punt 8.1 |
| `alternateName: "AIMI Development"` | `Organization` in `src/lib/seo.ts` | Entiteitsdisambiguatie |
| `sameAs` uitbreiden | `Organization` | Nu één link; entiteitskoppeling is te dun |
| `WebPage`-node met `about` en `mainEntity` | Per pagina | Maakt expliciet waar een pagina óver gaat; AI Mode leunt op entiteitsduiding |
| `author` als `Person`-referentie | Content-/blogpagina's | Person-schema bestaat al voor Aidan en Milan — koppel het aan de content |
| `knowsAbout` | `Organization` | Expliciete expertise-afbakening, helpt bij entiteitsherkenning |
| `AggregateRating` | Pas ná echte reviews | **Niet eerder invullen.** Verzonnen ratings zijn een handmatige-actie-risico |

**Nog steeds leeg in `src/lib/seo.ts`:** `ADDRESS.streetAddress`, `ADDRESS.postalCode`, `KVK`, `VAT_ID`. De code laat ze correct weg zolang ze leeg zijn — maar KvK en BTW zijn wettelijk verplicht op de website en zijn tegelijk sterke entiteitssignalen. Dit staat al langer open.

---

## 10. Concrete herschrijfsuggesties

### Homepage — hero

Nu opent de pagina met `Websites die écht…`. Dat is merkcopy zonder informatie. Voeg direct daaronder, boven de vouw, een antwoordblok toe:

> **AIMI Development is een webdesignbureau in Veendam (Groningen) dat websites en webshops bouwt voor ondernemers in Noord-Nederland.** Een website kost € 499 eenmalig voor een eenpagina-site en € 749 voor een meerpagina-site met CMS, plus € 30 per maand voor hosting, SSL, back-ups en onderhoud. We bouwen op maat in plaats van met een page builder, hosten op een eigen Nederlandse server en leveren de broncode mee, zodat je later zonder rebuild kunt overstappen. Aidan en Milan bouwen de sites zelf; je hebt na oplevering contact met de developer die je site gemaakt heeft, niet met een helpdesk.

Dat blok is ~110 woorden, staat zelfstandig, opent met een definitiezin (`X is een…`), bevat vier harde cijfers en noemt de volledige merknaam. Het is bewust geschreven om als geheel geciteerd te kunnen worden.

### `/tarieven` — al bijna goed

De prijs staat vlak onder de H1: goed. Twee aanvullingen:
- Zichtbare "Bijgewerkt op"-regel bovenaan
- De vergelijkingstabel benoemt bouwpakket en freelancer, maar niet de categorie *webdesignbureau* — dezelfde bevinding als in de Veendam-analyse

### `/faq` — grootste onbenutte kans

Deze pagina heeft precies één H2 (`Veelgestelde vragen`) en verder niets. FAQ-pagina's zijn per definitie citeerbaar materiaal: elke vraag is een zoekopdracht.

- Groepeer de vragen onder thematische H2's (Prijzen, Werkwijze, Techniek, Onderhoud) — dat maakt de pagina scanbaar voor mens én model
- Elke vraag als H3, zodat het koppatroon overeenkomt met de zoekvraag
- Antwoorden van 40–60 woorden die los van de vraag leesbaar zijn

### Locatiepagina's — definitiezin toevoegen

De teksten zijn inhoudelijk sterk (de Veendam-pagina onderscheidt zich echt), maar openen narratief. Zet vóór het verhaal één definitiezin: *"Een website laten maken in Veendam kost bij AIMI € 499 tot € 749 eenmalig, plus € 30 per maand."*

---

## Wat je vooral níet moet doen

Google's gids van mei 2026 verwerpt deze expliciet als niet-werkend:

- Content in stukjes knippen speciaal voor AI ("chunking")
- Teksten laten herschrijven door AI om "AI-vriendelijker" te klinken
- Merkvermeldingen kopen of kweken op forums
- `llms.txt` als rankingfactor behandelen

De weg vooruit is saai en werkt: actuele content, een herkenbare entiteit, echte vermeldingen en concrete cijfers.

---

## Samengevat

De techniek is af. `robots.txt`, SSR, schema, sitemap, IndexNow en llms.txt zijn beter geregeld dan bij vrijwel alle concurrenten die ik tegenkwam, en daar valt weinig meer te winnen.

De 34 punten die je mist zitten vrijwel volledig in twee dingen: **AI-systemen kunnen niet zien dat je content actueel is** (nul `dateModified` over 48 pagina's) **en ze kunnen AIMI niet als bedrijf herkennen** (één `sameAs`-link, nul vermeldingen buiten de eigen site, en een merknaam die botst met een bekend Stanford-onderzoekscentrum).

Dat overlapt met wat er uit de Veendam-concurrentieanalyse kwam: reviews en externe zichtbaarheid zijn nu het knelpunt, niet de site zelf.
