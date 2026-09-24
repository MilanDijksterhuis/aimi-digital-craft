# Contentkwaliteit & E-E-A-T — aimi-development.nl

Methode: beoordeling op basis van `crawl-data.json` (70 pagina's) en de bronbestanden in `src/routes/*.tsx`, `src/components/*.tsx` en `src/lib/seo.ts`. Niet opnieuw gecrawld. Er is een turn-limiet bereikt tijdens dit onderzoek; punten die niet zijn nagekeken staan expliciet als zodanig gemarkeerd in plaats van ingevuld met een aanname.

**Correctie op een uitgangspunt van de opdracht:** het aantal van "21 blogartikelen" klopt niet als aantal unieke artikelen. Volgens de auditcoördinator bevat de `blog_posts`-tabel 11 unieke artikelen, waarvan 10 dubbel voorkomen (één rij met `updated_at` 2026-09-16, één met 2026-09-17). De blogindex ontdubbelt dit visueel via `key={post.slug}`, maar de sitemap somt alle rijen op — vandaar de 21. Dit feit komt van de coördinator en is door mij niet zelf in de database geverifieerd; zie CQ-4. Alle uitspraken hieronder over "aantal artikelen" gaan uit van 11 unieke stuks.

## Wat goed gaat

- Telefoonnummer en e-mailadres staan als NAP-anker zichtbaar in de footer van elke pagina, met werkende `tel:`- en `mailto:`-links (`src/components/Footer.tsx:64-77`).
- Elke locatiepagina opent met een "definitiezin" met harde cijfers (prijsrange, plaatsnaam) vóór de narratieve tekst — bewust ontworpen als citeerbare passage voor AI-antwoordmachines (`src/components/LocationPageV2.tsx:255-258`, commentaar verwijst naar "GEO-audit 2026-09-06 punt 10").
- De locatiepagina's zijn aantoonbaar gecorrigeerd op het doorway-pagina-risico: een eerdere versie bevatte volgens de code-commentaar ~830 woorden identieke tekst (54% van de pagina) via ingesloten Services-/ProcessTimeline-blokken; dat is vervangen door een compact linkblok van ~60 woorden (`src/components/LocationPageV2.tsx:379-385`). De overgebleven body-tekst (intro, contextBody, businessTypesBody) bevat per stad aantoonbaar eigen, verifieerbare feiten — bijvoorbeeld Hoogeveen (ligging aan A28/A37, concurrentie met Emmen/Assen/Meppel), Groningen (Folkingestraat, Grote Markt, studentenstad-concurrentie tussen webdesignbureaus) en Stadskanaal (centrumfunctie Oost-Groningen, familiebedrijven). Dit is geen fill-in-the-blank sjabloon op alinea-niveau.
- `sectionOrder` is per pagina configureerbaar (`LocationPageV2.tsx:22`), waardoor pagina's ook structureel — niet alleen tekstueel — van elkaar verschillen (Stadskanaal: businessTypes → context → faq → workflow; Groningen: context → businessTypes → workflow → faq).
- `articleJsonLd()` verzint bewust geen auteurspersoon zolang die er niet is en gebruikt de organisatie als publisher/auteur (`src/lib/seo.ts:329-336`) — eerlijker dan een nepbio, ook al is het een gemiste E-E-A-T-kans (zie CQ-3).
- Versheidssignalen zijn gecentraliseerd via `PAGE_DATES` in `src/lib/seo.ts:107-182`, zodat sitemap, schema en de zichtbare "Bijgewerkt op"-regel niet uit elkaar kunnen lopen voor statische pagina's.
- Interne linkstructuur tussen hub- en satellietpagina's is opgeruimd: de 30 stad-/branchelinks staan alleen nog op de hubpagina's (`/webdesign`, `/branches`) in plaats van in de footer van elke pagina (`Footer.tsx:81-86`), wat een schone silo-structuur oplevert tussen hoofdpagina, hub en long-tail pagina's.
- Prijstransparantie is consistent en concreet (vaste bedragen, geen "vraag een offerte" als enige antwoord) — goed voor zowel gebruikersvertrouwen als AI-citeerbaarheid.
- Metabeschrijvingen zitten volgens de opgave allemaal binnen de 70-160 tekens — nette hygiëne, geen afkappingsrisico.

## Status van de twee hoofdpunten uit de vorige audit (2026-09-20)

**Hoofdpunt 1 — geen bewijs van geleverd werk (cases, portfolio, klantnamen, testimonials): onveranderd.** Zie CQ-2. Er is zelfs een nieuw element bijgekomen dat oppervlakkig als portfolio kán ogen maar dat niet is: generieke "voorbeeld"-afbeeldingen zonder klantnaam.

**Hoofdpunt 2 — KvK, BTW en vestigingsadres ontbreken: onveranderd.** Zie CQ-1. De velden in `src/lib/seo.ts` staan nog steeds leeg; de code is voorbereid om ze automatisch overal te tonen zodra ze ingevuld worden, maar dat is nog niet gebeurd.

## Bevindingen

### CQ-1 — KvK-nummer, BTW-nummer en vestigingsadres ontbreken volledig
**Zwaarte: Critical**
**Status: onveranderd sinds 2026-09-20**

Bewijs: `src/lib/seo.ts:42-53`
```
export const ADDRESS = {
  streetAddress: "", // bv. "Kerkstraat 1"
  postalCode: "", // bv. "9641 AA"
  ...
};
export const KVK = "";
export const VAT_ID = "";
```
`src/components/Footer.tsx:50`: `const hasAddress = Boolean(ADDRESS.streetAddress && ADDRESS.postalCode);` — dit is altijd `false`, dus het hele bedrijfsgegevens-blok (`Footer.tsx:114-127`) rendert nergens op de site. Ook `algemene-voorwaarden.tsx:43` noemt alleen "AIMI: het web agency van Aidan en Milan, gevestigd in Nederland" — geen rechtsvorm, geen KvK-nummer, geen adres.

Dit is wettelijk verplicht in Nederland (art. 3:15d BW / Handelsregisterwet) voor een website die diensten aanbiedt. Het is bovendien, zoals de code-commentaar zelf aangeeft, "de goedkoopste vertrouwenssignalen die er zijn" — precies het soort verifieerbaar feit dat Trustworthiness (het zwaarst wegende E-E-A-T-onderdeel) meet.

Verbetering: vul de drie constanten in `seo.ts` in met de echte gegevens. Dat is genoeg: Organization-schema, footer en (met een kleine tekstaanvulling) de voorwaardenpagina pakken de waarden automatisch op. Voeg op de voorwaardenpagina ook de rechtsvorm toe (eenmanszaak/vof/bv, wie tekent).

### CQ-2 — Geen enkel bewijs van geleverd werk; "voorbeelden" zijn generiek, niet klantspecifiek
**Zwaarte: Critical**
**Status: onveranderd, met een nieuw element dat het risico eerder vergroot dan verkleint**

Bewijs: `src/components/ExampleSlideshow.tsx:145-161`, eigen commentaar in de code: *"Generieke voorbeeldenset ... geen nep-branchespecifieke screenshots verzinnen, wel tenminste íets van visueel bewijs tonen i.p.v. niets."* De afbeeldingen ("architectenbureau", "praktijk", "SaaS-bedrijf") staan identiek op alle 15 stadspagina's én de hoofdpagina; er is geen klantnaam, geen link naar een live project, geen resultaat aan gekoppeld.

`src/routes/over-ons.tsx` (volledig gelezen) bevat geen testimonials, geen klantnamen, geen cases. De enige externe validatie is een vermelding in een directory: *"Ons werk is ook te vinden in de Webdesigngids"* (`over-ons.tsx:131-141`) — een linkvermelding, geen inhoudelijke referentie.

Voor een bureau dat zelf beoordeeld wordt op het vermogen om vertrouwen te bouwen voor andermans website, is dit het zwaarste gat: Experience en Authoritativeness scoren allebei laag zolang er niets te verifiëren valt buiten de eigen claims.

Verbetering: minimaal 3-5 benoemde klantprojecten (sector, wat er gebouwd is, concreet resultaat zoals laadtijd of livegang-datum); 1-2 testimonials met naam en bedrijf, of expliciet vermeld "op verzoek anoniem" als privacy dat vereist. Vervang op zijn minst de bijschriften van de generieke voorbeelden zodat ze niet kunnen worden aangezien voor portfolio ("Stijlvoorbeeld, geen klantproject" i.p.v. een suggestieve branche-omschrijving).

### CQ-3 — Blogartikelen hebben geen zichtbare auteur, bio of foto
**Zwaarte: High**

Bewijs: `src/lib/seo.ts:329-336`, commentaar: *"geen verzonnen auteursnaam: zolang er geen aparte auteursnaam-registratie is, is de Organization de (juiste, want feitelijke) publisher/auteur."* `articleJsonLd()` zet `author: { "@id": ORG_ID }` — de organisatie, geen persoon. In `src/routes/blog_.$slug.tsx:161-177` toont de pagina alleen publicatiedatum en leestijd, geen auteursregel.

Positief aan deze keuze: er is geen nepbio verzonnen, wat eerlijker is dan wat concullega's vaak doen. Maar het is wel een gemiste kans: de Sept 2025 QRG hecht expliciet gewicht aan "wie schreef dit en waarom is die persoon te vertrouwen", en AIMI heeft dat antwoord al klaarliggen — Aidan en Milan staan met naam op `/over-ons`.

Verbetering: voeg een auteursveld toe aan `blog_posts` en koppel elk artikel aan Aidan of Milan met een korte, echte bio (bijv. "developer bij AIMI, bouwt sinds 2025 websites voor ondernemers in Noord-Nederland") en een foto. Dit vereist geen verzonnen content — alleen het zichtbaar maken van wie al reëel bestaat.

### CQ-4 — Dubbele rijen in `blog_posts` vertekenen contentvolume en versheidssignalen
**Zwaarte: High**
**Bron: aangeleverd door de auditcoördinator, niet zelf in de database geverifieerd — impact op paginaweergave (crasht de route wel/niet bij dubbele slug) is niet gecontroleerd.**

Volgens de coördinator staan 10 van de 11 unieke blogartikelen dubbel in `blog_posts` (rij met `updated_at` 2026-09-16 én een identieke rij met 2026-09-17). De blogindex ontdubbelt visueel via React's `key={post.slug}`; de sitemap somt alle rijen op, wat de eerder aangenomen 21 artikelen verklaart.

Dit raakt drie dingen binnen contentkwaliteit:
1. **Contentvolume**: er zijn 11 unieke artikelen, niet 21. Voor een site die sinds 2025 actief is, is dat een redelijk aantal — niet dun, maar ook geen bewijs van een uitgebreide contentmachine.
2. **Versheidsintegriteit**: twee rijen met een verschillende `updated_at` voor vermoedelijk dezelfde inhoud roept de vraag op welke datum klopt, en of de zichtbare "bijgewerkt op"-datum en de `dateModified` in het schema betrouwbaar zijn voor deze artikelen.
3. **Sitemap-hygiëne**: dezelfde slug/URL meerdere keren in de sitemap is ruis voor crawlers.

Losstaande observatie uit `src/lib/seo.ts:166-177`: de `PAGE_DATES`-lijst onder "Blog" bevat maar 10 hardgecodeerde paden, allemaal gedateerd op 2026-09-16. Blogartikelen halen hun datum in de praktijk uit Supabase (`published_at`/`updated_at`) via de loader, dus dit is vermoedelijk een ongebruikte restlijst — maar als een blogpad ooit wél via `pageLastmod()` zou lopen zonder in deze lijst te staan, valt dat terug op de datum van vandaag bij elke render. Dit raakt het schema/technische domein net zo goed als content; ik vermeld het hier alleen omdat het dezelfde brondata betreft.

Verbetering: dedupliceer `blog_posts` op slug (met de meest recente/correcte rij als bron), zet een unieke database-constraint op `slug` zodat dit niet opnieuw kan ontstaan, en controleer de sitemapgenerator op deduplicatie.

### CQ-5 — Over-ons mist verifieerbare expertise-signalen
**Zwaarte: Medium**

Bewijs: `src/routes/over-ons.tsx` (volledig gelezen). De pagina noemt alleen voornamen ("AIMI is opgericht door Aidan & Milan", regel 114); er is geen achternaam, geen foto (geen `<img>`-tag voor een portret in het hele bestand), geen link naar LinkedIn of een ander controleerbaar profiel, geen concrete jaren ervaring, opleiding of eerdere werkgever. De stat-blokken ("2 directe contactpersonen", "<2w doorlooptijd", "100% in eigen beheer", "24/7 monitoring & hosting", regel 8-13) zijn proces-claims, geen verifieerbare feiten over de personen zelf.

Voor de pagina die het meeste E-E-A-T-gewicht zou moeten dragen, is dit dun voor wat betreft Expertise specifiek — los van het bredere portfolio-gat in CQ-2.

Verbetering: voeg achternamen, een foto per persoon en minstens één controleerbaar detail per persoon toe (LinkedIn-profiel, aantal jaren ervaring, relevante achtergrond). Dit is goedkoop te doen en direct verifieerbaar, in tegenstelling tot cases die tijd kosten om op te bouwen.

### CQ-6 — Sjabloonherhaling op locatie- en branchepagina's: geschat op 15-30% van de zichtbare hoofdtekst
**Zwaarte: Medium**

Methode: kwantitatieve 4-gram Jaccard-vergelijking van de `text_sample`-velden (eerste ~1500 tekens) van alle 15 stadspagina's en alle 15 branchepagina's, aangevuld met volledige lezing van drie stadspagina's (Hoogeveen, Stadskanaal, Groningen) om de bijdrage van gedeelde navigatie te scheiden van echte inhoudsoverlap. De branchepagina's zijn **niet** los volledig gelezen; de uitspraken daarover zijn een extrapolatie op basis van de architectuur (`BranchPage.tsx` volgt hetzelfde `BranchPageData`-patroon als `LocationPageV2.tsx`) en het vrijwel identieke gemiddelde Jaccard-cijfer (0,473 tegen 0,475 voor stadspagina's) — dit is dus met minder zekerheid vastgesteld dan de stadspagina-analyse.

Bevindingen:
- Gemiddelde 4-gram Jaccard-overlap tussen elk paar stadspagina's: 0,475; tussen branchepagina's: 0,473. Hoogste paar: Groningen↔Stadskanaal (0,55).
- Een groot deel van die overlap is sitewide navigatie (identiek op alle 70 pagina's, dus geen locatiepagina-specifiek probleem) en één letterlijk gedeelde zin: de "definitiezin" in `LocationPageV2.tsx:258` — *"Een website laten maken in {stad} kost bij AIMI € 499 tot € 749 eenmalig..."* — identieke structuur en identieke prijsrange voor alle 15 steden, ongeacht regio.
- Het blok "Wat we bouwen voor ondernemers in {stad}" met de vier `LOCAL_SERVICES`-kaarten (`LocationPageV2.tsx:27-48`) is woord-voor-woord identiek op elke locatiepagina.
- WorkflowSteps en FAQ's zijn niet letterlijk gekopieerd (elke stad heeft eigen bewoording), maar volgen wel een vast thematisch stramien: dezelfde 5-7 processtappen (kennismaking → ontwerp → bouw → livegang → hosting/beheer) en vergelijkbare vraagcategorieën ("Wat kost een website in X", "Werken jullie ook buiten X", "Blijft AIMI betrokken na oplevering").
- Intro, contextBody en businessTypesBody zijn aantoonbaar stad-specifiek geschreven met eigen feiten (zie "Wat goed gaat").

Schatting: circa 15% van de zichtbare hoofdtekst is vrijwel letterlijk template (definitiezin + servicesblok + generieke voorbeeldafbeeldingen), nog eens 25-30% volgt een herkenbaar herhaald retorisch patroon zonder letterlijke kopie (workflow/FAQ), en de resterende ~55-60% is aantoonbaar uniek per pagina. Dat is geen opvulpagina-niveau (vergelijk met de eerdere, expliciet als doorway-patroon herkende versie op 54% identieke tekst), maar de vaste prijsrange in de definitiezin (elke stad "€499-€749", ook Leeuwarden en Sneek buiten het kernwerkgebied) is een detail dat bij handmatige review opvalt als sjabloon-artefact.

Verbetering: geef de definitiezin een klein variabel element (bijv. regio-context i.p.v. een kale herhaling), en verplaats het LOCAL_SERVICES-blok naar een lichtere, meer gevarieerde presentatie per pagina (of accepteer het bewust als linkblok, wat het nu functioneel al is, en verklein het verder). Bevestig voor de branchepagina's expliciet (met een eigen leesronde) of hetzelfde servicesblok daar ook 1:1 wordt hergebruikt.

### CQ-7 — "Geen sjabloon" is zelf een terugkerende formule geworden
**Zwaarte: Low**

Bewijs: Stadskanaal — *"Geen kant-en-klaar sjabloon, maar een ontwerp dat past bij jouw bedrijf"* (`website-laten-maken-stadskanaal.tsx:26`); Groningen — *"zonder generiek sjabloon"* / *"Geen twee websites die we opleveren zien er hetzelfde uit"* (`website-laten-maken-groningen.tsx:27`); Hoogeveen — *"niet in een kant-en-klaar jasje"* (`website-laten-maken-hoogeveen.tsx:36`).

De positionering "wij bouwen geen sjabloonsites" is inhoudelijk juist en verdedigbaar, maar de herhaling van bijna dezelfde formulering op meerdere pagina's ondermijnt die claim een beetje — een lezer die twee of drie van deze pagina's na elkaar leest (of een AI-systeem dat ze samen indexeert) ziet een terugkerende zin waar net verteld wordt dat er niets terugkerends is.

Verbetering: bij een eerstvolgende contentronde deze specifieke formule op minstens de helft van de pagina's vervangen door een concreet voorbeeld in plaats van de stellige uitspraak zelf te herhalen.

### CQ-8 — Narratieve secties zijn dichte alinea's zonder opsommingen, cijfers of tabellen
**Zwaarte: Medium**

Bewijs: de `contextBody`- en `businessTypesBody`-secties (bijv. `website-laten-maken-groningen.tsx:16-19`, drie alinea's van 80-120 woorden elk) bestaan volledig uit doorlopende zinnen. Voorbeeld van zinslengte: *"Voor ondernemers betekent dit dat opvallen niet vanzelf gaat: een website die traag laadt of nauwelijks vindbaar is in Google, valt tussen wal en schip in zo'n drukke markt."* — one sentence, meerdere bijzinnen, geen opsomming, geen los te citeren feit.

Dit staat in contrast met de FAQ- en workflow-secties op dezelfde pagina's, die wél goed gestructureerd zijn (korte vraag/antwoord-paren, genummerde stappen met eigen H3) en dus prima citeerbaar zijn voor AI-antwoordmachines. De definitiezin vooraan is eveneens sterk (concreet cijfer, één zin, zelfstandig leesbaar).

Alleen de middenmoot — het narratieve "waarom deze stad"-verhaal — mist harde, geïsoleerde feiten (bijv. inwonertal, aantal bedrijven, concrete Core Web Vitals-cijfers) die een AI-systeem als standalone antwoord zou kunnen citeren. Dit is qua zinslengte en jargon overigens prima leesbaar Nederlands voor de doelgroep (geen vaktermen zonder uitleg, geen overdreven lange volzinnen), het is puur de afwezigheid van citeerbare structuur binnen dit ene blok.

Verbetering: voeg in minstens de contextBody één concreet, controleerbaar getal per pagina toe (inwonertal, aantal MKB-bedrijven in de regio, of een eigen prestatiecijfer) los van de lopende tekst, bijvoorbeeld als losse zin of klein statblok.

### CQ-9 — Overlap tussen hub, plaats- en branchepagina's: laag risico, met een gedeeld restrisico
**Zwaarte: Info / Low**

De hoofdpagina `/website-laten-maken` (736 woorden) target de generieke zoekterm; de 15 stadspagina's targeten "website laten maken in {stad}"/"webdesigner in {stad}"; de 15 branchepagina's targeten "website laten maken voor {branche}". Titels zijn per pagina daadwerkelijk gedifferentieerd (bijv. *"Webdesigner in Groningen, de studentenstad"* vs. *"Website laten maken in Stadskanaal — vaste prijs"*), en de interne linkstructuur is hiërarchisch: satellietpagina's linken omhoog naar `/webdesign` en `/branches`, en die twee hubpagina's bundelen de links naar alle 15 stuks (`Footer.tsx:81-86`). Dat is een schone silo, geen platte lijst van 30 identieke concurrerende URL's.

Het restrisico zit in de gedeelde blokken uit CQ-6: omdat de definitiezin, het servicesblok en het thematisch stramien van workflow/FAQ op alle 30 pagina's terugkomen, zou een deel van elke pagina door Google als vrijwel identiek aan de andere 29 gezien kunnen worden, ook al is de titel en het narratieve deel uniek. Dit is op dit moment geen acute kannibalisatie (geen enkele pagina lijkt in de verstrekte gegevens qua zoekterm rechtstreeks met een andere te concurreren), maar wel iets om te monitoren als het aantal pagina's verder groeit.

### CQ-10 — Beoordeling van de kortste pagina's individueel
**Zwaarte: Info**

- **/contact (323 woorden):** contactpagina's horen kort te zijn; de taak is een gesprek starten, niet ranken op long-tail content. Niet als thin te beschouwen. Volledige body niet gelezen in dit onderzoek — niet gecontroleerd of een reactietijd-belofte of andere concrete informatie aanwezig is.
- **/privacybeleid (391 woorden) en /algemene-voorwaarden (452 woorden):** lengte is voor juridische pagina's geen kwaliteitsmaat; volledigheid wel. Beide zijn gelezen: ze missen niet de gebruikelijke secties, maar missen wél de KvK/BTW/rechtsvorm-informatie (zie CQ-1). Op lengte zelf geen actie nodig.
- **/website-checker (412 woorden):** niet volledig gelezen. Gezien de functie (een gratis tool) zou uitleg over de gehanteerde criteria en methodiek het vertrouwen in de score vergroten; dit is een kandidaat voor uitbreiding maar niet geverifieerd hoe summier de huidige uitleg werkelijk is.
- **/meer-diensten (433 woorden):** niet volledig gelezen. Uit de navigatie blijkt dit een pagina voor één specifieke aanvullende dienst (performance-optimalisatie) te zijn, geen brede dienstenpagina — als dat klopt is 433 woorden waarschijnlijk toereikend, maar dit is niet geverifieerd.
- **/over-ons (464 woorden):** wel volledig gelezen (zie CQ-5). Lengte op zich is niet het probleem; de inhoudelijke dunheid op verifieerbare expertise wel.
- **/webdesign (491 woorden) en /branches (494 woorden):** niet volledig gelezen. Dit zijn hubpagina's die vooral doorlinken naar de 15 stad- resp. 15 branchepagina's; voor een linkhub is een beperkt aantal woorden gebruikelijk en niet per se een probleem, maar dit is niet met een eigen leesronde bevestigd.
- **/webdesign (491 woorden):** zie boven, per abuis niet dubbel op te voeren — zelfde punt als /branches.

Per saldo: van de acht genoemde pagina's is er maar één (/over-ons) waar de korte lengte samenvalt met een echt inhoudelijk gat, en dat gat zit in specificiteit (CQ-5), niet in woordaantal. De overige zeven zijn ofwel een paginatype waar bondigheid past, ofwel niet diepgaand genoeg gecontroleerd in dit onderzoek om een oordeel te vellen.

### CQ-11 — Zeven blogtitels net boven 60 tekens
**Zwaarte: Info**

Volgens de opgave liggen zeven blogtitels net boven de 60 tekens, met een licht afkappingsrisico in de Google-SERP. Dit is een on-page/technische bevinding meer dan een contentkwaliteitskwestie; mogelijk al opgenomen in een technical.md of onpage.md van deze audit. Vermeld hier voor de volledigheid, geen aparte actie vanuit contentkwaliteit nodig buiten het inkorten van die titels.

## E-E-A-T-score per factor

| Factor | Gewicht | Score | Toelichting |
|---|---|---|---|
| Experience | 20% | 35/100 | Geen cases, geen eigen projectdocumentatie met resultaat. Wel aantoonbare, specifieke regiokennis op de locatiepagina's, wat een zwakke vorm van "ervaring met de markt" toont, maar geen ervaring met eigen leveringen. |
| Expertise | 25% | 55/100 | Concrete, technisch onderbouwde claims (eigen VPS, geen page builders, eigen monitoring), blog met technische onderwerpen (Core Web Vitals, VPS-hosting, WordPress-hacks). Geen auteursnamen op artikelen (CQ-3), geen credentials/opleiding (CQ-5). |
| Authoritativeness | 25% | 25/100 | Eén externe vermelding (Webdesigngids-directory). Geen persvermeldingen, klantlogos, awards of citaties gevonden binnen de gecontroleerde pagina's. |
| Trustworthiness | 30% | 40/100 | Telefoon/e-mail zichtbaar, prijstransparantie sterk, privacybeleid en voorwaarden inhoudelijk aanwezig. Wettelijk verplichte KvK/BTW/adres ontbreken volledig (CQ-1) — een zwaarwegende min op precies de factor die Google als belangrijkste noemt. |

Gewogen E-E-A-T-score: circa 39/100.

## AI-citeerbaarheidsscore

**Circa 60/100.** Sterk: de per-stad "definitiezin" met harde cijfers, FAQ-schema op 35 pagina's, gestructureerde workflow-stappen met eigen H3's, consistente `dateModified`-signalen via `PAGE_DATES`. Zwak: de kernredenering per pagina (context/businessTypes) staat in dichte alinea's zonder tabellen of losstaande statistieken (CQ-8), en de betrouwbaarheid van de versheidssignalen op blogartikelen is onzeker door de dubbele database-rijen (CQ-4).

## Categoriescore Content Quality: 58/100

Onderbouwing: de site toont op meerdere plekken aantoonbare zorgvuldigheid — een expliciete, gedocumenteerde correctie van een eerder doorway-pagina-patroon, stad-specifieke feiten in plaats van fill-in-the-blank tekst, een goed doordacht schema/versheidssysteem en eerlijke (niet-verzonnen) auteurstoeschrijving. Dat trekt de score omhoog. Wat de score beperkt tot net boven de helft, is dat de twee zwaarste punten uit de vorige audit — geen bewijs van geleverd werk en ontbrekende wettelijk verplichte bedrijfsgegevens — allebei onveranderd zijn, en dat die twee punten precies de Trustworthiness- en Authoritativeness-factoren raken die volgens Google het zwaarst wegen.
