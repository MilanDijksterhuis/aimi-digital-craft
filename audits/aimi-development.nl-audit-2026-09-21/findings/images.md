# Afbeeldingen — aimi-development.nl

**Datum:** 2026-09-21 · **Basis:** verse crawl van 60 unieke pagina's; alle afbeeldings-URL's afzonderlijk opgehaald en gecontroleerd

De site is uitgesproken afbeeldingsarm: 34 `<img>`-elementen over 60 pagina's, teruggebracht tot **vijf unieke bestanden**. Dat maakt de technische kant eenvoudig te beoordelen — en legt tegelijk een inhoudelijk probleem bloot.

---

## Wat goed gaat

- **Alt-teksten**: geen enkele afbeelding mist het `alt`-attribuut. Eén afbeelding heeft bewust `alt=""` (de hero, decoratief).
- **Afmetingen**: alle 34 afbeeldingen hebben expliciete `width` en `height`. Dat voorkomt layoutverschuiving en is een belangrijke reden dat CLS op deze site geen probleem is.
- **Formaat**: vier van de vijf bestanden zijn WebP.
- **Hero is correct geprioriteerd**: `fetchpriority="high"` plus `srcset` op het LCP-element van de homepage. Dat is precies goed gedaan.
- **Bestandsgroottes van de WebP's zijn netjes**: 27 KB, 36 KB, 59 KB en 107 KB.

---

## IMG-1 — Eén screenshot van een architectenbureau doet dienst als bewijs op 27 pagina's

**Severity: High** *(inhoudelijk, niet technisch)*

`/voorbeelden/voorbeeld-website-1-architectuur.webp` staat op 27 pagina's, telkens met de alt-tekst "Voorbeeld website voor een architectenbureau". Onder meer op:

`/website-laten-maken-hovenier` · `/website-laten-maken-loodgieter` · `/website-laten-maken-schilder` · `/website-laten-maken-klusbedrijf` · `/website-laten-maken-restaurant` · `/website-laten-maken-cateringbedrijf` · `/website-laten-maken-bloemist` · `/website-laten-maken-makelaar` · `/website-laten-maken-boekhouder` · `/website-laten-maken-autobedrijf` · `/website-laten-maken-autorijschool` · plus alle zestien plaatspagina's.

Een ondernemer die op "website laten maken loodgieter" binnenkomt, krijgt als enige visuele onderbouwing een screenshot van een architectensite, met een bijschrift dat dat ook letterlijk zegt. Hetzelfde geldt voor de restauranthouder en de bloemist.

Dit is de beeldkant van hetzelfde gat dat in `content.md` en `sxo.md` terugkomt: er is geen zichtbaar bewijs van geleverd werk. Het verschil is dat dit gat hier extra opvalt, omdat de pagina wél een "voorbeeld" belooft en dan iets uit een andere branche toont.

**Fix:** dit vraagt om echt materiaal, niet om een codewijziging. In volgorde van haalbaarheid:

1. Waar een echte klantsite in die branche bestaat: gebruik die, met toestemming en met de klantnaam erbij. Dat lost tegelijk het grootste E-E-A-T-probleem van de site op.
2. Waar die niet bestaat: maak per branchegroep één passende mockup. Drie of vier stuks (dienstverlening aan huis, horeca, retail, zakelijke dienstverlening) dekken de hele lijst al veel geloofwaardiger dan één architectensite.
3. Zolang beide niet kunnen: noem het geen voorbeeld. Een eerlijk "impressie van een opzet die we voor dit type bedrijf gebruiken" is beter dan een bijschrift dat de mismatch benoemt.

---

## IMG-2 — Alt-tekst noemt "schoonheidssalon" op de kapsalon-, nagelstudio- en pedicurepagina

**Severity: Medium**

Vier pagina's delen `/voorbeelden/voorbeeld-wellness-1-schoonheidssalon.webp` met de alt-tekst "Voorbeeld website voor een schoonheidssalon":

| Pagina | Alt-tekst |
|---|---|
| `/website-laten-maken-schoonheidssalon` | Voorbeeld website voor een schoonheidssalon ✓ |
| `/website-laten-maken-kapsalon` | Voorbeeld website voor een schoonheidssalon ✗ |
| `/website-laten-maken-nagelstudio` | Voorbeeld website voor een schoonheidssalon ✗ |
| `/website-laten-maken-pedicure` | Voorbeeld website voor een schoonheidssalon ✗ |

Het hergebruik van het beeld binnen deze vier verwante branches is verdedigbaar. De alt-tekst meeslepen is dat niet: op drie van de vier pagina's beschrijft hij iets anders dan waar de bezoeker voor kwam, en alt-tekst is een van de weinige plekken waar deze pagina's zich van elkaar onderscheiden.

**Fix:** maak de alt-tekst afhankelijk van de branche van de pagina in plaats van van het bestand. Het component dat deze pagina's rendert (`src/components/BranchPage.tsx`) krijgt de branchenaam al binnen; laat de alt-tekst die gebruiken.

---

## IMG-3 — Kaart-PNG van 219 KB is het zwaarste bestand van de site

**Severity: Medium**

`/assets/map-veendam-hoogeveen-clean-CsMuiFyV.png` — 218.925 bytes, 1800×2100 px, PNG.

Dit is veruit het grootste bestand: ruim vier keer de hero (59 KB) en acht keer de grootste voorbeeldafbeelding. Het staat op de homepage, onder de vouw, met `loading="lazy"` — dat laatste is goed gedaan en houdt het buiten het kritieke pad.

Twee dingen zijn hier onnodig duur. Het bestand is PNG terwijl alle andere beelden op de site WebP zijn. En 1800×2100 px is fors voor een illustratieve kaart.

**Fix:** converteer naar WebP en schaal terug naar wat er werkelijk getoond wordt. Voor een kaartillustratie met vlakke kleurvlakken levert WebP doorgaans 70–85% reductie zonder zichtbaar verschil. Verwachte winst: van 219 KB naar ruwweg 30–50 KB. Omdat het beeld lazy laadt raakt dit de LCP niet, maar het scheelt wel data voor mobiele bezoekers die doorscrollen.

---

## IMG-4 — 33 voorbeeldafbeeldingen laden `eager` terwijl ze onder de vouw staan

**Severity: Medium**

Alle voorbeeldafbeeldingen op de plaats- en branchepagina's hebben `loading="eager"`. Ze staan in een voorbeeldsectie verderop op de pagina, dus vrijwel zeker onder de vouw.

`eager` betekent dat de browser ze meteen ophaalt, in concurrentie met de bronnen die wél nodig zijn om de bovenkant van de pagina te tonen. Op een mobiele verbinding kost dat direct LCP-tijd op precies de pagina's waar de bezoeker binnenkomt.

De homepage doet het omgekeerd en goed: de hero staat op `fetchpriority="high"`, de kaart eronder op `loading="lazy"`. Die lijn is op de plaats- en branchepagina's niet doorgetrokken.

**Fix:** zet `loading="lazy"` op de voorbeeldafbeelding in het component dat deze pagina's rendert. Controleer eerst in de browser of het beeld op mobiel echt onder de vouw begint — staat het bij sommige pagina's net in beeld, laat het daar dan op `eager`. De `seo-visual`-bevindingen in `visual.md` bevatten de schermafdrukken om dat op te zoeken.

---

## IMG-5 — Geen `srcset` op de voorbeeldafbeeldingen

**Severity: Low**

Alleen de hero heeft een `srcset`. De voorbeeldafbeeldingen (1440×900 en 909×2160) worden in één formaat aan elk scherm geserveerd.

Bij de huidige bestandsgroottes (27–107 KB) is de winst beperkt, en met vijf unieke bestanden is de onderhoudslast van meerdere varianten relatief hoog. Pak dit op wanneer IMG-1 wordt opgelost en er toch nieuw beeldmateriaal wordt aangemaakt — dan is het een kleine extra stap in plaats van los werk.

---

## Categoriescore

**Afbeeldingen: 82/100**

Technisch is dit goed op orde: alt-attributen compleet, afmetingen overal expliciet, WebP als standaard, hero correct geprioriteerd. De aftrek komt bijna volledig uit twee dingen die geen van beide over bestandsformaten gaan — de voorbeeldafbeeldingen dragen de verkeerde branche uit (IMG-1, IMG-2) en de laadprioriteit op de plaats- en branchepagina's staat verkeerd om (IMG-4). De kaart-PNG (IMG-3) is het enige klassieke optimalisatiepunt.
