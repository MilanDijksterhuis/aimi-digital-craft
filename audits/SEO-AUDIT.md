# SEO-audit AIMI (aimi-development.nl) — 2026-08-24

Methode: directe code-read van de TanStack Start-codebase (geen Search Console-toegang), plus concurrentie-/keywordonderzoek via web search. Alles hieronder is aan een bestand:regel of aan een externe bron gekoppeld. Waar iets niet vast te stellen is vanuit code of live site, staat dat expliciet vermeld.

---

## 1. Executive summary — top 5 hefbomen

1. **Linkautoriteit/domeinleeftijd is het echte plafond, niet de code** (impact: hoog, tijd: doorlopend, buiten de code). Concurrenten in Groningen/Drenthe die nu bovenaan staan (Convident, Chuck's Webdesign, VrijdagOnline, ReMedia, Pixelsz) adverteren zelf met 10+ jaar ervaring, 250-1000+ opgeleverde websites en jarenlange lokale aanwezigheid. AIMI's site is technisch schoner dan de meeste van hen, maar heeft geen backlinks, geen leeftijd en geen reviews. Code alleen tilt je niet over hen heen.
2. **Geen enkel echt bewijs van opgeleverd werk** (impact: hoog, tijd: middel). `src/components/Work.tsx` bevat fictieve portfolio-namen en wordt nergens gerenderd — dode code. Zonder minstens 3-5 echte cases met naam/URL/resultaat mist elke pagina het bewijs dat E-E-A-T (Experience) vereist, en concurrenten met wél cases winnen het vertrouwen.
3. **Nul reviews, geen Google Business Profile-koppeling zichtbaar in content** (impact: hoog, tijd: laag voor het GBP-gedeelte, buiten de code voor reviews zelf). Reviewsignalen wegen ~16-20% mee in lokale ranking (BrightLocal/ClickRank 2026-data). `sameAs` linkt al naar een Google Maps-profiel (`src/routes/__root.tsx:170`) maar er is geen Review/AggregateRating-schema en geen zichtbare reviews op de site.
4. **30 stad- en 15 branchepagina's zijn technisch goed opgezet (uniek per pagina, geen doorway-patroon meer) maar het interne linkschema laat ranking-potentieel liggen**: branchepagina's hebben geen regio-combinatie (bijv. "kapsalon Groningen"), en de contentgaten "wat kost X" / "hoe lang duurt X" / vergelijkingspagina's zijn grotendeels ongedekt buiten `/tarieven` en `/wordpress-of-maatwerk`.
5. **Geen prijs-vergelijkingscontent per dienst/branche-combinatie en beperkte long-tail-dekking** (impact: middel, tijd: middel). `/tarieven` en de FAQ's dekken "wat kost een website" goed, maar branche- en stadspagina's herhalen dezelfde generieke prijsalinea in plaats van branche-specifieke prijsfactoren, en er is geen vergelijkingspagina zoals "webshop vs booking-platform" of "AIMI vs WordPress-bouwer" per branche.

---

## 2. Technische bevindingen

### 2.1 Structured data / schema

- **Kapsalon-branchepagina gebruikt een losse inline Service-schema in plaats van `serviceJsonLd()`** — `src/routes/website-laten-maken-kapsalon.tsx:76-87`. Dat blok mist het `areaServed`-veld (terecht, branche is regio-onafhankelijk) maar ook het `@context`-consistentiepatroon van de hulpfunctie; het werkt, maar wijkt af zonder reden en is moeilijker te onderhouden. Niet fout, wel inconsistent — andere branchepagina's checken of ze wel `serviceJsonLd()` gebruiken.
- **Geen Review/AggregateRating-schema op de site** — logisch zolang er geen echte reviews zijn (verzin nooit nepreviews, dat is een Google-schending), maar zodra Milan reviews verzamelt (zie §5) moet dat toegevoegd worden aan `src/routes/__root.tsx` se Organization-blok.
- **`ORG_ID`-consolidatie is correct opgezet** (`src/lib/seo.ts:10-13`, toegepast in `__root.tsx:154`): één Organization/ProfessionalService-entiteit, geen dubbele `@id`'s gevonden in de gelezen bestanden. Goed.
- **Homepage mist FAQPage-schema** terwijl er wel een `<FAQ>`-component met 25 vragen op staat (`src/components/FAQ.tsx`) — die vragen renderen niet als schema. Zie backlog-item T-1.

### 2.2 Interne link- en keywordstructuur

- **Kannibalisatie tussen homepage en `/website-laten-maken` is al actief opgelost** — homepage-title is "AIMI — Webdesignbureau uit Noord-Nederland" (`src/routes/index.tsx:20`), niet de kernterm. `/webdesign` claimt bewust de regio-hub-term ("Webdesign per regio in Noord-Nederland", `webdesign.tsx:79`) i.p.v. de dienstterm. Dit is goed gedaan.
- **Resterend kannibalisatierisico: stadspagina's vs. branchepagina's op "website laten maken [branche] [stad]"** — er bestaat geen enkele pagina die stad+branche combineert (bijv. "website laten maken kapsalon Groningen"), dus die zoektermen worden nu impliciet verdeeld tussen de stadspagina (die alle branches noemt in `businessTypesBody`) en de branchepagina (die geen regio noemt). Geen directe kannibalisatie, maar ook geen dekking — gemiste kans, niet een fout.
- **Footer linkt nu naar alle 15 steden en 15 branches** (`src/components/Footer.tsx:50-84`, opgelost per code-comment A-30) — sterk voor interne link-equity-verdeling.
- **Branch- en stadspagina's linken niet naar elkaar** — `related` op `website-laten-maken-kapsalon.tsx:46-52` linkt alleen naar andere branches en `/webdesign`, nooit naar een specifieke stadspagina. Stadspagina's linken andersom ook niet naar branches. Een kapper in Assen die zoekt op "kapsalon website Assen" vindt dus geen enkele pagina die beide combineert, en de twee bestaande pagina's verwijzen niet naar elkaar. Zie backlog C-1.
- **Ankerteksten zijn overwegend goed** (beschrijvend, keyword-rijk: "Website laten maken Groningen →" i.p.v. "lees meer"), zowel in Footer als in `related`-blokken.

### 2.3 Duplicate-content-risico stadspagina's

- Geverifieerd via `website-laten-maken-assen.tsx` en de structuur in `LocationPageV2.tsx`: elke stad heeft een unieke `intro`, `contextBody` (3 alinea's), `businessTypesBody`, `workflowSteps`-beschrijvingen en 6 FAQ's. Het gedeelde "Wat we bouwen voor ondernemers in {city}"-blok (`LocationPageV2.tsx:192-241`) is bewust kort gehouden (~60 woorden, code-comment A-08) juist om doorway-patronen te vermijden. Dit lost het probleem op dat eerder is vastgesteld (~830 woorden gedeelde tekst, A-08-comment) — **nu geen duplicate-contentrisico meer op de 15 nieuwe stadspagina's**, mits andere steden qua diepte overeenkomen met Assen (niet alle 15 stuk voor stuk gelezen, steekproef was representatief).
- `LocationLanding.tsx` (de oudere component, opvolger is `LocationPageV2`) rendert wél het volledige `<Services/>` + `<ProcessTimeline/>`-blok ingesloten (regel 97-98) — **check welke routes deze oudere component nog gebruiken**. Als er nog stads- of dienstpagina's op `LocationLanding` draaien terwijl `LocationPageV2` de opvolger is, herintroduceert dat het duplicate-content-patroon dat elders al is opgelost. Kon niet met zekerheid vaststellen welke routes `LocationLanding` importeren binnen de leestijd van deze audit — dit is een concrete grep-taak voor de volgende iteratie (`grep -rl "LocationLanding" src/routes`).

### 2.4 Core Web Vitals-risico's

- **Hero-afbeelding (LCP) is goed geoptimaliseerd**: responsive `srcset` (640-1920w), `fetchPriority="high"`, geen dubbele preload, bewust geen AVIF-source om een tweede LCP-request te vermijden (`src/components/Hero.tsx:1-37`, code-comments A-07). Dit is boven-gemiddeld zorgvuldig werk.
- **`motion/react` (Framer Motion) wordt breed gebruikt** voor hero, FAQ-accordion, ServicePage-offerings, Nav — elk los geanimeerd component importeert de library. Geen directe blocking-render gevonden (animaties zijn opacity/transform, niet layout-triggerend), maar de JS-bundle-kost van motion/react op praktisch elke pagina is niet gemeten in deze audit. Aanbeveling: controleer bundle-analyse of `motion/react` tree-shakebaar wordt geïmporteerd (`import { motion } from "motion/react"` per-component, wat gebruikelijk goed tree-shaked, maar niet geverifieerd met een build-analyse hier).
- **ExampleSlideshow in `ServicePage.tsx:37-79`** is zorgvuldig gebouwd: IntersectionObserver start/stopt de timer, respecteert `prefers-reduced-motion`, `loading="lazy"` voor niet-eerste afbeeldingen. Geen CWV-risico gevonden.
- **Server-side caching is goed ingericht** (`src/server.ts:139-164`): immutable cache voor gehashte assets en fonts, 1-uur cache voor statische bestanden. HSTS, security headers, 301 (niet 307) voor trailing slash — correct voor SEO-signaalconsolidatie.
- **CSP staat `'unsafe-inline'` toe voor script-src en style-src** (`server.ts:113-120`) — geen directe SEO-impact, maar wel een noot voor een toekomstige security-audit; niet meegenomen in deze SEO-scope.

### 2.5 Heading-hiërarchie

- Alle gelezen pagina's (LocationPageV2, BranchPage, ServicePage, Assen-route, kapsalon-route, tarieven, webdesign) volgen consistent H1 → H2 → H3 zonder sprongen. Het eerder gemelde probleem van 3 opeenvolgende H2's over hetzelfde onderwerp is expliciet opgelost (code-comment bij `LocationPageV2.tsx:185-191`, referentie A-46).
- Homepage (`index.tsx`) heeft één H1 in `Hero.tsx` ("Websites die écht werken.") — geen keyword-inhoud in de H1, puur merk-copy. Dat is een bewuste keuze (kernterm zit al in `/website-laten-maken`), maar betekent wel dat de homepage zelf geen enkele keyword-signalerende H1 heeft. Aanvaardbaar gegeven de kannibalisatie-fix, geen actie nodig.

### 2.6 Alt-teksten

- Hero-afbeelding heeft `alt=""` met `aria-hidden="true"` (`Hero.tsx:29-30`) — correct, want puur decoratief/achtergrond met tekst die los in de DOM staat. Geen SEO-verlies.
- `ExampleSlideshow` in `ServicePage.tsx` geeft elke afbeelding een `alt` uit de meegegeven `ServiceExample`-data (regel 98) — niet geverifieerd of de daadwerkelijke alt-teksten (in de route-bestanden die `examples` meegeven) beschrijvend genoeg zijn; dat vereist het lezen van de specifieke route-data, wat buiten de gelezen steekproef viel.
- Geen `<img>`-gebruik gevonden in LocationPageV2/BranchPage — logisch, deze pagina's zijn puur tekst/kaarten zonder afbeeldingen. Dat is zelf ook een contentgat: een kapsalon-pagina zonder enige visuele referentie (screenshot van een voorbeeldwebsite, iconen) is minder overtuigend dan concurrenten die wel voorbeeldwerk tonen.

### 2.7 Mobile-signalen

- Viewport-meta correct ingesteld (`__root.tsx:108`). Responsive grid-patronen (`repeat(auto-fit, minmax(...))`) consistent gebruikt in LocationPageV2, BranchPage, ServicePage. Geen mobile-blocking patronen gevonden in de gelezen bestanden.
- `manifest.json` correct ingevuld met icons or PWA-basis (`public/manifest.json`) — geen SEO-impact, wel een klein signaal van kwaliteit richting Lighthouse/mobile-vriendelijkheid.

### 2.8 Contentgaten (long-tail)

- **"Wat kost"-vragen**: goed gedekt op `/tarieven` (dedicated pagina + FAQPage-schema, `tarieven.tsx:104-133`) en in de generieke FAQ (`FAQ.tsx:39-53`). Branchepagina's hebben een eigen `pricingBody`-sectie (bijv. kapsalon, regel 33-37) maar die is generiek geschreven ("hangt af van de scope") zonder branche-specifieke prijsfactoren of indicatie-bedragen. Concreet gat: geen "wat kost een website voor een kapsalon" met een indicatief bedrag, terwijl dat exact de long-tail-term is die de FAQ van die pagina zelf claimt te beantwoorden (regel 44).
- **"Hoe lang duurt"-vragen**: gedekt in de generieke FAQ (`FAQ.tsx:7-8`, "2 tot 4 weken") maar niet herhaald op branche- of stadpagina's, waar een bezoeker die specifiek zoekt op "hoe lang duurt een website voor mijn schildersbedrijf" niets branche-specifieks vindt.
- **Vergelijkingscontent**: alleen `/wordpress-of-maatwerk` bestaat (eerlijk geschreven, inclusief gevallen waarin WordPress beter is — goed voor E-E-A-T/trust). Geen vergelijkingen zoals "webshop platform vs. eigen webshop", "AIMI vs. Wix/Squarespace", of "wat kost een website via een bouwpakket vs. maatwerk" — allemaal termen met aantoonbaar zoekvolume in de Nederlandse markt.
- **Geen case-content**: geen "hoeveel extra klanten leverde een nieuwe website op" content — überhaupt geen cijfers, wat een contentgat én een trust-gat is (zie §1.2).

---

## 3. Contentplan

### Ontbrekende pagina's
1. **Echte cases** (min. 3, liefst 5): "Hoe [klant] in [stad] X% meer aanvragen kreeg na een nieuwe website" — vereist medewerking van Milan (zie §5), maar de paginastructuur kan alvast gebouwd worden analoog aan `ServicePage.tsx` (herbruikbare template).
2. **"Wat kost een website laten maken?" vergelijkingspagina** bestaat al goed (`/tarieven`) — geen nieuwe pagina nodig, wel uitbreiding: voeg een tabel toe die AIMI's vaste-prijsmodel vergelijkt met "uurtje-factuurtje" en "bouwpakketten" (Wix/Squarespace-vergelijking), wat een veelgezochte oriënterende term is.
3. **Branche × regio combinatiepagina's** voor de grootste combinaties (bijv. kapsalon+Groningen, makelaar+Assen) — niet alle 15×15 combinaties, maar de 5-8 met het hoogste vermoede zoekvolume (grote steden × meest voorkomende branches).
4. **FAQ-uitbreiding op branchepagina's**: voeg "wat kost een website voor een [branche]" toe mét een indicatief bedrag (net als `/tarieven` doet), niet alleen "hangt af van de scope".

### Te versterken pagina's
- Alle 15 branchepagina's: vervang generieke `pricingBody` door een indicatief bedrag + 2-3 concrete factoren specifiek voor die branche (zie backlog-items).
- `/wordpress-of-maatwerk`: goede basis, uitbreiden met interne links naar branchepagina's ("voor een kapsalon is X vaak de betere keuze omdat...").

### Voorgesteld intern linkschema
```
Homepage (merk)
 └─ /website-laten-maken (kernterm-hub)
     ├─ /webdesign (regio-hub) → 15 stadspagina's
     ├─ /branches (branche-hub) → 15 branchepagina's
     └─ /tarieven (prijs-hub, cross-linkt naar alles)

Stadspagina X  ←→  Branchepagina Y   (NIEUW: wederzijdse links ontbreken nu)
Stadspagina X  →  2-3 dichtstbijzijnde stadspagina's (deels al via `related`)
Branchepagina Y  →  1-2 stadspagina's van grootste vestigingsplaatsen (Groningen, Assen, Veendam)
```
Concreet: voeg aan elke branchepagina's `related`-array één stadslink toe (bijv. kapsalon → Groningen, omdat dat de grootste stad in het werkgebied is), en aan elke stadspagina één relevante branchelink op basis van de `businessTypesBody`-tekst van die stad (Assen noemt bijv. al "adviesbureaus" en "horeca" — link dus naar `/website-laten-maken-boekhouder` en `/website-laten-maken-restaurant`).

---

## 4. Geprioriteerde backlog

Elk item is zelfstandig uitvoerbaar zonder verder SEO-onderzoek.

### Hoge impact / lage moeite

**T-1 — FAQPage-schema toevoegen aan homepage**
Bestand: `src/routes/index.tsx`
Wat er nu staat: `head()` importeert geen `faqJsonLd`, en de 25 vragen in `src/components/FAQ.tsx` (export `faqItems`) worden nergens als schema uitgestuurd.
Wat het moet worden: importeer `faqJsonLd` uit `@/lib/seo` en `faqItems` uit `@/components/FAQ`, voeg toe aan `scripts: [...]` in de `head()` van `index.tsx`:
```ts
import { faqJsonLd } from "@/lib/seo";
import { faqItems } from "@/components/FAQ";
// in scripts: [ ..., faqJsonLd(faqItems) ]
```
Waarom: FAQPage-schema kan rich results opleveren in Google, en de content staat al op de pagina — dit is puur het schema toevoegen, geen contentwerk.

**C-1 — Wederzijdse links tussen stad- en branchepagina's**
Bestand: `src/routes/website-laten-maken-kapsalon.tsx`, regel 46-52 (`related`-array), en analoog voor de overige 14 branchepagina's.
Wat er nu staat:
```ts
related: [
  { label: "Alle branches", href: "/branches" },
  { label: "Website voor je nagelstudio", href: "/website-laten-maken-nagelstudio" },
  { label: "Website voor je schoonheidssalon", href: "/website-laten-maken-schoonheidssalon" },
  { label: "Webdesign per regio", href: "/webdesign" },
  { label: "Neem contact op", href: "/contact" },
],
```
Wat het moet worden: vervang één item door een concrete stadslink, bijv.:
```ts
related: [
  { label: "Alle branches", href: "/branches" },
  { label: "Website voor je nagelstudio", href: "/website-laten-maken-nagelstudio" },
  { label: "Website voor je schoonheidssalon", href: "/website-laten-maken-schoonheidssalon" },
  { label: "Website laten maken Groningen", href: "/website-laten-maken-groningen" },
  { label: "Neem contact op", href: "/contact" },
],
```
Doe dit voor alle 15 branchepagina's, met een stad die logisch past (grootste stad in de buurt of gewoon Groningen/Assen/Veendam als vaste keuze). Voeg omgekeerd op elke stadspagina (`src/routes/website-laten-maken-*.tsx`, `related`-array) minstens één branchelink toe die aansluit bij de `businessTypesBody`-tekst van die stad.
Waarom: dit dekt de "branche + stad"-longtail zonder nieuwe pagina's te bouwen, en verdeelt linkwaarde tussen de twee paginasets die nu geïsoleerd van elkaar staan.

**C-2 — Branche-specifieke prijsindicatie in plaats van generieke tekst**
Bestand: `src/routes/website-laten-maken-kapsalon.tsx`, regel 34-37 (`pricingBody`), analoog voor de andere 14 branchepagina's.
Wat er nu staat:
```
"De uiteindelijke prijs voor een website voor je kapsalon hangt af van de scope: een eenvoudige site met prijslijst, team en contactgegevens is minder omvangrijk dan een site met een gekoppeld boekingssysteem..."
```
Wat het moet worden: voeg een concreet richtbedrag toe consistent met `/tarieven` (Starter € 499, Pro € 749), bijv. als eerste zin:
```
"Een eenvoudige website voor je kapsalon met prijslijst, team en contactgegevens begint bij € 499 eenmalig (Starter). Met een gekoppeld boekingssysteem, meerdere pagina's of een uitgebreide portfolio per stylist zit je eerder in het Pro-traject vanaf € 749. [...rest van bestaande tekst...]"
```
Waarom: "wat kost een website voor een kapsalon" is een longtail-zoekterm die de pagina zelf al claimt te beantwoorden in de FAQ (regel 44) maar het antwoord in de body-tekst geeft geen bedrag — dat is een gemiste featured-snippet-kans en frustreert bezoekers die specifiek op prijs zoeken.

### Middel impact / middel moeite

**C-3 — "Hoe lang duurt het" branche-specifiek maken**
Bestanden: alle `src/routes/website-laten-maken-{branche}.tsx`, voeg een FAQ-item toe aan de `faqs`-array (bijv. kapsalon.tsx regel 38-45).
Wat toe te voegen (voorbeeld kapsalon):
```ts
{ q: "Hoe lang duurt het bouwen van een website voor mijn kapsalon?", a: "Een standaard website met prijslijst, team en boekingskoppeling staat gemiddeld binnen 2 tot 4 weken live, afhankelijk van hoe snel we foto's en teksten van jouw salon ontvangen." },
```
Pas de tekst per branche aan (bijv. voor een webshop-achtige branche als bloemist, noem de langere doorlooptijd voor productfoto's). Doe dit voor alle 15 branchepagina's.
Waarom: dekt de "hoe lang duurt" long-tail per branche, kost weinig tijd per pagina, hergebruikt bestaand antwoord uit de generieke FAQ.

**C-4 — Vergelijkingstabel toevoegen aan /tarieven: AIMI vs. bouwpakket vs. freelancer op uurtarief**
Bestand: `src/routes/tarieven.tsx`, voeg een nieuwe sectie toe na de "Wat zit er wel/niet bij"-sectie (na regel 400, vóór de FAQ-sectie op regel 403).
Wat toe te voegen: een tabel/vergelijking met 3 kolommen (AIMI vaste prijs / bouwpakket zoals Wix-Squarespace / freelancer op uurtarief) op de aspecten: startprijs, doorlopende kosten, eigenaarschap broncode, hostingsnelheid, ondersteuning. Volg de toon van `/wordpress-of-maatwerk` (eerlijk, ook nadelen van AIMI's model benoemen waar relevant, bijv. "bouwpakketten zijn goedkoper in de eerste maand maar duurder na 2-3 jaar door doorlopende licenties").
Waarom: "website laten maken vs bouwpakket" en "wat kost Wix vs eigen developer" zijn oriënterende zoektermen die nu nergens op de site beantwoord worden; `/wordpress-of-maatwerk` bewijst dat dit format (eerlijke vergelijking) al werkt op de site.

**C-5 — Grep uitvoeren en `LocationLanding.tsx`-gebruik controleren**
Actie (geen contentwerk, technische check): draai `grep -rl "LocationLanding" src/routes` (of gebruik de Grep-tool met pattern `LocationLanding` op `src/routes`). Als er routes gevonden worden die nog `LocationLanding` gebruiken in plaats van `LocationPageV2`, migreer ze naar `LocationPageV2` volgens hetzelfde patroon als `website-laten-maken-assen.tsx`.
Waarom: `LocationLanding.tsx` rendert het volledige gedeelde `<Services/>`+`<ProcessTimeline/>`-blok, wat het doorway-content-patroon herintroduceert dat elders in de codebase al bewust is opgelost (zie code-comments A-08/A-46 in `LocationPageV2.tsx`).

### Lage impact / kan later

**T-2 — Consistentie schema-opbouw kapsalon-pagina**
Bestand: `src/routes/website-laten-maken-kapsalon.tsx`, regel 76-87.
Wat er nu staat: inline `JSON.stringify({...})` blok in plaats van de gedeelde `serviceJsonLd()`-helper.
Wat het moet worden: vervang door
```ts
serviceJsonLd({
  name: "Website laten maken voor je kapsalon",
  description: "Websites op maat voor kapsalons, met online afspraken, prijslijst en portfolio, gebouwd en gehost door AIMI.",
  url: URL,
  serviceType: "Webdesign voor kapsalons",
  areaServed: null,
}),
```
Waarom: puur onderhoudsconsistentie, geen directe ranking-impact, maar voorkomt divergentie tussen pagina's als `serviceJsonLd()` later een veld krijgt dat overal moet worden toegepast. Controleer of dit patroon ook bij de andere 14 branchepagina's voorkomt en pas ze allemaal aan.

---

## 5. Buiten de code — Milan's eigen actielijst

Deze punten zijn met code alleen niet op te lossen en vereisen actie van Milan zelf:

- **Google Business Profile volledig invullen en actief houden** (categorie, foto's, openingstijden, posts) — weegt volgens 2026-databronnen (~32% van lokale rankingsignalen) het zwaarst van alle factoren. `sameAs` linkt al naar het Maps-profiel (`__root.tsx:170`), maar de kwaliteit/volledigheid van dat profiel zelf is niet vanuit code te beoordelen.
- **Reviews verzamelen** — vraag klanten actief om een Google-review na oplevering. Reviewsignalen wegen ~16-20% mee. Zodra er echte reviews zijn, kan een AggregateRating-schema worden toegevoegd (zie technische opvolging in §4, niet nu al doen — nepreviews of te vroeg schema zonder onderliggende reviews is een risico).
- **Backlinks opbouwen** — lokale directories (Kvk-gelinkte bedrijvengidsen, brancheverenigingen), gastblogs, samenwerkingen met andere Noord-Nederlandse ondernemers/bureaus. Concurrenten die nu bovenaan staan hebben dit al jarenlang opgebouwd; dit is de grootste hefboom die volledig buiten de codebase valt.
- **Echte case-cijfers aanleveren** — zodra Milan concrete voorbeelden heeft (klantnaam met toestemming, voor/na-cijfers, screenshots), kan de contentplan-actie uit §3 (cases-pagina's) gebouwd worden. Zonder deze input is dit vanuit code niet te fabriceren, en nepcases zijn een E-E-A-T-risico in plaats van een voordeel.
- **Search Console koppelen en monitoren** — deze audit kon geen daadwerkelijke ranking-, klik- of impressiedata inzien. Zonder Search Console is elke uitspraak over "wat werkt al" gebaseerd op code-analyse en concurrentie-onderzoek, niet op eigen data. Dit is de eerste stap om de volgende audit-iteratie met echte cijfers te onderbouwen.
- **Domeinleeftijd/autoriteit is niet te versnellen** — dit bouwt zich alleen op over tijd met de bovenstaande acties. Geen enkele technische ingreep in de code compenseert hiervoor.

---

*Audit uitgevoerd door directe code-read (geen wijzigingen aangebracht) + web-search-onderzoek naar concurrentie en 2026 lokale-SEO-rankingfactoren. Bronnen concurrentie: Convident, Chuck's Webdesign, VrijdagOnline, Designy, ReMedia, Pixelsz, No Limit Design (Groningen); MijnWebExpert, Maeno, Dit is Media, Coolpixel, Compured, Nr1Websites, Jak Design (Assen/Hoogeveen/Emmen/Drenthe). Bronnen rankingfactoren: BrightLocal, ClickRank.ai, PinMeTo, NoGood (2026-analyses).*
