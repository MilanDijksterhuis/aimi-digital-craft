# Zoekwoordstrategie en aanbevelingen — vergelijkingspagina's

**Uitgangspunt:** `https://www.nc-websites.nl/webdesign-veendam/`
**Datum:** 6 september 2026

> **Over de cijfers:** er is in deze sessie geen keyword-tool aangesloten
> (DataForSEO/GSC niet geconfigureerd). Er staan daarom **geen verzonnen
> zoekvolumes** in dit document. De prioritering is gebaseerd op zoekintentie,
> concurrentiebeeld in de SERP en de omvang van Veendam (~27.000 inwoners).
> Verifieer de volumes voor je gaat bouwen — zie "Verificatie" onderaan.

---

## 1. Doelzoekwoorden voor de vergelijkingspagina

### Primair

| Zoekterm | Intentie | Waarom |
|---|---|---|
| `webdesign veendam` | Commercieel onderzoek | De term waarop NC-Websites nu scoort. AIMI heeft hier nog geen pagina voor: `/website-laten-maken-veendam` mikt op een andere formulering. |
| `webdesignbureau veendam` | Commercieel onderzoek | Zoeker zoekt expliciet een partij, niet een dienst. Sluit exact aan bij een vergelijkingspagina. |

### Secundair

| Zoekterm | Intentie |
|---|---|
| `webdesigner veendam` | Commercieel onderzoek |
| `webdesign bureau groningen vergelijken` | Vergelijking |
| `beste webdesignbureau groningen` | Vergelijking |
| `website laten maken kosten veendam` | Commercieel, prijsgericht |
| `webdesign veendam prijzen` | Commercieel, prijsgericht |

### Long-tail (verwerken in FAQ en tussenkoppen)

- `wat kost een website laten maken in veendam`
- `webdesignbureau in de buurt veendam`
- `wordpress of maatwerk website welke kiezen`
- `hoeveel kost hosting en onderhoud website per maand`
- `website laten maken oost-groningen`
- `webdesign winschoten of veendam`

### Bewust NIET targeten

| Zoekterm | Reden |
|---|---|
| `nc-websites alternatief`, `nc-websites ervaringen` | Merknaamverkeer van een lokale concurrent met naam en toenaam. Verwaarloosbaar volume, reëel reputatierisico. |
| `website laten maken veendam` | Al gedekt door `/website-laten-maken-veendam`. Twee pagina's op dezelfde term is kannibalisatie. |
| `goedkoopste webdesign veendam` | Trekt het verkeerde klanttype en botst met de positionering op vaste prijs in plaats van laagste prijs. |

---

## 2. Contentgaten in de huidige SERP

Wat geen van de vijf rankende pagina's biedt — en dus de reden dat deze pagina
kan winnen:

| Gat | Toelichting | Wie vult het nu |
|---|---|---|
| **Concrete prijzen** | Vier van de vijf bureaus noemen nul bedragen. Zoekers die "kosten" typen krijgen overal "vraag een offerte aan". | Niemand |
| **Vergelijking tussen bureaus** | Elke pagina verkoopt alleen zichzelf. De vergelijkingspagina's die wél bestaan (Trustoo, Mijnwebexpert) zijn dunne directorypagina's zonder echte inhoud. | Alleen directories, zwak |
| **Keuzecriteria voor de ondernemer** | Niemand legt uit waaróp je moet vergelijken (eigenaarschap broncode, maandkosten over 3 jaar, aanspreekpunt na oplevering). | Niemand |
| **WordPress versus maatwerk, eerlijk uitgelegd** | Drie bureaus zijn WordPress-only en hebben er belang bij dat niet ter discussie te stellen. | Niemand |
| **Echte lokale verankering** | Alle vijf claimen Veendam; alleen AIMI zit er. Dat wordt nergens expliciet gemaakt. | Niemand |

---

## 3. Concurrentiebeeld

| Bureau | Vestiging | Signaal van kracht | Zwak punt in hun pagina |
|---|---|---|---|
| NC-Websites | Winschoten | 17 jaar actief, ~20 medewerkers, Google Partner sinds 2010, 1.300+ klanten | Geen prijzen, geen echte Veendam-verankering (zegt zelf "10 minuten van Veendam"), pagina is ~800–1.000 woorden en grotendeels bureaupresentatie |
| Convident | Groningen | Sinds 2015, sterke reviewbasis (5,0 Google / 9,9 Trustoo), brede marketingkennis | Geen prijzen, WordPress-only, Veendam-pagina is een template met stadsnaam |
| ON. Digital IT | Groningen | Vaste prijs na adviesgesprek, WooCommerce | Dunne pagina, weinig eigen inhoud, geen prijzen |
| Webmazters | Wijchen (GLD) | Duidelijke technische focus (snelheid, Rank Math, WP Rocket) | ~180 km weg, puur programmatische locatiepagina, geen prijzen |
| Akinatech | Onbekend | SERP-snippet claimde "€ 499 all-in" | **Pagina geeft HTTP 404.** Niet verifieerbaar, dus buiten de vergelijking gelaten. |

**Kern:** de SERP wordt gedomineerd door bureaupresentaties en programmatische
locatiepagina's. Er is geen enkele pagina die de zoeker helpt kiezen. Dat is een
ongewoon open gat voor een lokale term.

---

## 4. Aanbevelingen

### 4.1 Bouw deze pagina (hoogste prioriteit)

`/webdesignbureau-veendam-vergelijken` — volledige opzet in
[COMPARISON-PAGE.md](COMPARISON-PAGE.md), schema in
[comparison-schema.json](comparison-schema.json).

### 4.2 Verbeter wat er al staat

| Pagina | Actie | Waarom |
|---|---|---|
| `/tarieven` | De bestaande vergelijkingstabel (`comparison`, rond regel 111) vergelijkt AIMI met *bouwpakket* en *freelancer*. Voeg een vierde kolom of een tweede tabel toe: *webdesignbureau*. Dat is de categorie waar de Veendam-zoeker daadwerkelijk uit kiest. | De pagina mist nu de meest voorkomende alternatieve keuze |
| `/tarieven` | Link vanuit de tabel door naar de nieuwe vergelijkingspagina | Prijstransparantie is de brug tussen beide pagina's |
| `/website-laten-maken-veendam` | Voeg in het `related`-blok de vergelijkingspagina toe. Overweeg één alinea in `contextBody` die expliciet benoemt dat AIMI het enige in Veendam gevestigde bureau is. | Nu staat er "AIMI is gevestigd in Veendam", maar niet dat dat uniek is |
| `/wordpress-of-maatwerk` | Link naar de vergelijkingspagina en omgekeerd | Drie van de vier concurrenten zijn WordPress-only; deze pagina wordt daarmee een concurrentievoordeel in plaats van een technische uitleg |

### 4.3 Vervolgpagina's, in volgorde van kansrijkheid

1. **`/webdesignbureau-groningen-vergelijken`** — zelfde format, grotere markt,
   meer volume. Bouw pas als de Veendam-versie presteert; het format is dan
   bewezen en de tekst grotendeels herbruikbaar. Let op: bij een grotere stad
   moet je meer bureaus opnemen, anders leest het als een selectie in eigen
   voordeel.
2. **`/wordpress-of-maatwerk-website-kosten`** of uitbreiding van de bestaande
   pagina met een kostensectie — vangt de vergelijkende intentie op productniveau
   in plaats van bureauniveau, en is landelijk in te zetten.
3. **`/website-laten-maken-kosten`** — een uitgebreide kostenpagina, los van
   `/tarieven`. `/tarieven` verkoopt; een kostenpagina informeert. Dat zijn twee
   verschillende zoekintenties en de tweede wordt veel vaker gelinkt en geciteerd.
4. **Webshop-variant** — `/webshop-laten-maken` heeft nog geen vergelijkende
   tegenhanger, terwijl webshopkeuze (Shopify vs WooCommerce vs maatwerk) een
   zoekterm met hoge commerciële waarde is.

### 4.4 Conversieoptimalisatie

- **Prijzen boven de vouw.** Het enige echte onderscheid van AIMI is
  prijstransparantie. Verstop die niet halverwege de pagina.
- **Geen CTA in de concurrentprofielen.** Een verkoopknop onder de beschrijving
  van een concurrent kost vertrouwen op precies het moment dat de lezer aan het
  afwegen is.
- **Twee CTA-typen, niet één.** "Bekijk tarieven" (laagdrempelig, past bij de
  oriënterende fase) naast "Plan een kennismaking". De offerteknop hoort hier
  niet; die zoeker is nog niet zover.
- **Reviews verzamelen is nu het grootste conversiegat.** NC-Websites toont 9,8,
  Convident 5,0 op Google met 43 reviews. AIMI heeft niets. Op een pagina die
  bureaus naast elkaar zet, is een lege reviewkolom het zwakste vakje in de
  tabel. Los dit op vóór of vlak na publicatie; het is belangrijker dan welke
  tekstoptimalisatie ook.
- **Datum en verantwoording zichtbaar.** "Bijgewerkt 6 september 2026" plus de
  transparantieverklaring doen op dit paginatype meer voor conversie dan een
  extra knop.

### 4.5 Technisch

- Toevoegen aan `src/routes/sitemap[.]xml.tsx`
- IndexNow na publicatie: `node scripts/indexnow-submit.mjs`
- Tabel horizontaal scrollbaar op mobiel, niet inklappen — een tabel die je moet
  uitklappen wordt niet gelezen en niet geciteerd door AI-zoekmachines
- Kwartaalcontrole in de agenda: prijzen, teamgrootte en reviewscores van
  concurrenten wijzigen, en een verouderde vergelijking is een risico in plaats
  van een asset

---

## 5. Verificatie vóór publicatie

1. **Zoekvolumes** — controleer de termen uit paragraaf 1 in Google Keyword
   Planner of via `/claude-seo:seo-dataforseo` als je die extensie aanzet. Bij
   een plaats van 27.000 inwoners zijn de absolute volumes klein; het gaat om de
   koopintentie, niet om bereik.
2. **SERP-check** — Google `webdesign veendam` opnieuw vlak voor publicatie. De
   SERP van een lokale term verschuift snel.
3. **Concurrentdata** — alle claims in de tabel nogmaals langs de bron. Wat hier
   staat is gecontroleerd op 6 september 2026 en heeft een houdbaarheid van
   ongeveer een kwartaal.
4. **Akinatech** — opnieuw proberen. Als de pagina terug is, verifieer de
   "€ 499 all-in"-claim en neem het bureau alsnog op; het is qua prijspunt de
   directste concurrent van AIMI.
