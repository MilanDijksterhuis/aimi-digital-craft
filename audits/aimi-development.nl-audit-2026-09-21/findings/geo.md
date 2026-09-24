# GEO-audit — AI-zoekzichtbaarheid aimi-development.nl

Datum: 2026-09-21
Scope: 60 unieke pagina's (de crawl bevat 70 regels, maar 10 blogposts staan dubbel in de sitemap doordat de `blog_posts`-tabel dubbele rijen bevat — er zijn 11 unieke blogartikelen, niet 10). Bronnen: `crawl-data.json`, `urls.txt`, `public/robots.txt`, `src/routes/llms[.]txt.tsx`, `src/routes/llms-full[.]txt.tsx`, `src/routes/__root.tsx`.

Methodologische kanttekening vooraf: `text_sample` in de crawl-data is beperkt tot de eerste ~1500 tekens platte tekst per pagina (grotendeels navigatie + hero + intro, geen footer). Uitspraken die op dit veld leunen zijn daarop gemarkeerd. Ik heb in deze sessie geen WebSearch-tool tot mijn beschikking gehad (alleen single-URL fetch), dus merkzichtbaarheids-zoekopdrachten zijn niet uitgevoerd — dat is expliciet gemarkeerd als "niet gecontroleerd", niet verzonnen.

## Wat goed gaat

1. **robots.txt is expliciet en correct voor AI-crawlers.** GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Googlebot, Bingbot, Google-CloudVertexBot, cohere-ai en CCBot krijgen allemaal een eigen `Allow: /`-blok. Bytespider, PetalBot en MJ12bot zijn disallowed. Sitemap wordt vermeld.
2. **llms.txt bestaat, is geen dood statisch bestand, en heeft een altijd-actuele datumstempel.** Het is een server-route (`src/routes/llms[.]txt.tsx`) die bij elke request `Laatst bijgewerkt: <vandaag>` genereert en de blogsectie live uit de `blog_posts`-tabel haalt (alleen published, niet-noindex, `published_at` in het verleden). Er is ook een `llms-full.txt` met de volledige blogtekst — dat is meer dan de meeste concurrenten doen.
3. **FAQPage-schema (35 pagina's) bevat echt directe, zelfstandige antwoorden.** Steekproef op `/tarieven`: 7 vraag/antwoord-paren van 23-42 woorden, allemaal concreet en zonder marketingvulling (bv. "Nee. De eenmalige prijs dekt het ontwerp en de bouw. De maandelijkse [bedrag] dekt hosting, SSL, back-ups, updates en monitoring."). Dit is precies het soort zelfstandig citeerbare blok dat AI-engines nodig hebben.
4. **Consistente Organization/ProfessionalService-schema sitewide met stabiel `@id`.** Identiek teruggevonden op home, contact, over-ons en tarieven — goed voor entiteitsconsistentie.
5. **Machine-leesbare prijzen in `Offer`-schema zijn schoon.** `hasOfferCatalog` geeft twee heldere offers (Starter 499 EUR, Pro 749 EUR, `availability: InStock`, `priceValidUntil: 2027-09-17`) — geen tekstbugs in deze velden, want ze bevatten geen €-teken.
6. **Technische toegankelijkheid: alle 60 unieke pagina's zijn server-rendered.** Een pure raw-HTTP-crawl (geen JavaScript-executie, dezelfde manier waarop GPTBot/ClaudeBot/PerplexityBot de site zien) leverde bij elke pagina een substantiële woordentelling op (323-1354 woorden, status 200). Dat betekent dat AI-crawlers de content krijgen zonder JS te hoeven draaien.
7. **Stad- en branchepagina's zijn sjabloonmatig, maar niet inhoudsloos.** Kopjes volgen hetzelfde skelet, maar de content bevat echte lokale feiten (Meppel: "van spoorknooppunt tot digitale vindbaarheid"; Groningen: "een stad vol concurrentie"; Veendam: eigen vestigingsplaats-voordeel). Geen kale doorway-pages met alleen een find-and-replace op de plaatsnaam.

## Bevindingen

### GEO-1 — Eurotekens zijn sitewide corrupt, ook in de prijs-FAQ op /tarieven
**Severity: Kritiek**
**Bewijs:** Broncode bevat het correcte teken: `src/routes/__root.tsx:187` en `src/routes/website-laten-maken-veendam.tsx:134` hebben beide `priceRange: "€€"`. In de daadwerkelijk uitgeleverde HTML/JSON-LD (crawl-data, raw fetch + UTF-8-decode, geen renderfout in de rest van de tekst — "échtwerken" met é decodeert bijvoorbeeld overal correct) komt hier consequent een replacement character uit:
- JSON-LD `"priceRange": "��"` op home/contact/over-ons/tarieven.
- Meta description homepage: "...vaste prijzen vanaf � 499."
- Zichtbare hero-tekst op `/website-laten-maken` en `/website-laten-maken-veendam`: "vanaf � 499".
- Alle 7 FAQ-antwoorden op `/tarieven` (JSON-LD `FAQPage`): "bij � 499 eenmalig", "kost � 749", "� 30 per maand" enz.

Dit raakt exact de sterkste AI-citatiehaak die deze site heeft ("wat kost een website laten maken") op de pagina die daarvoor bedoeld is. Een AI-engine die de ruwe pagina of het FAQ-schema leest, citeert een kapot bedrag.
**Waarschijnlijke oorzaak (niet bevestigd, wel consistent met het patroon):** het teken corrumpeert 1-op-1 per €-teken (twee replacement characters voor "€€"), wat past bij een enkel ongeldig byte per teken — typisch voor een Windows-1252/Latin-1-bronbyte (0x80) waar UTF-8 wordt verwacht. Andere multibyte UTF-8-tekens (é, ë) decoderen elders wel gewoon correct, dus dit is geen generieke decodefout van de crawler maar een specifiek probleem met het €-teken in de content-pijplijn.
**Fix:** controleer de bestandscodering van `__root.tsx` en alle bestanden met een hardcoded €-teken (moet UTF-8 zonder mix zijn); controleer of de SSR/build-pipeline ergens dubbel encodeert; verifieer na de fix met een directe HTTP-fetch van `/tarieven` en `/` dat "€499" en "€30" correct in de ruwe bytes staan, niet alleen in de browser-render (browsers/editors verbloemen dit soort bugs vaak visueel).

### GEO-2 — KvK, BTW en straatadres ontbreken nog steeds (bevestiging vorige audit)
**Severity: Hoog**
**Bewijs:** Volledige `Organization`/`ProfessionalService`-schema (identiek op alle gecontroleerde pagina's) bevat `name`, `alternateName`, `email`, `telephone`, `areaServed` (provincies + Veendam als stad), `founder` — maar geen `address` (PostalAddress), geen `vatID`/`taxID`, geen `legalName`, geen KvK-nummer in welk veld dan ook. Een grep op "KvK", "BTW", "Kamer van Koophandel", "straatadres", "vestigingsadres" over de volledige `crawl-data.json` (alle schema's + de eerste 1500 tekens tekst per pagina) leverde nul treffers op.
**Kanttekening:** de tekst-check dekt alleen de bovenkant van elke pagina (geen footer-inhoud dieper op de pagina); de schema-check is wél volledig, en juist die telt het zwaarst voor AI-engines. Ik kan dus niet garanderen dat KvK/BTW nergens in de zichtbare footer-HTML staat, maar wel bevestigen dat het niet in de structured data staat.
**Fix:** voeg `address` (PostalAddress met minimaal `addressLocality` en `postalCode`, eventueel bewust zonder volledig straatadres als privacyoverweging voor een Service Area Business) en `vatID`/KvK-nummer toe aan de Organization-schema, en herhaal KvK/BTW/vestigingsplaats consequent in de footer en op `/contact` en `/over-ons`. Dit zijn precies de velden die AI-engines nodig hebben om een lokale dienstverlener te verifiëren.

### GEO-3 — Zeer smalle externe entiteitsbevestiging (sameAs, founder-namen)
**Severity: Hoog**
**Bewijs:** `sameAs` bevat exact 1 URL: een Google Maps shortlink (`maps.app.goo.gl/...`). Geen LinkedIn, Instagram, Facebook, Wikipedia of KvK-vermelding. `founder` bevat alleen voornamen ("Aidan", "Milan"), geen achternamen en geen eigen `sameAs`/`url` naar persoonlijke profielen.
**Impact:** de GEO-signalen die volgens het merkvermeldings-correlatiekader het sterkst samenhangen met AI-citaties (YouTube, Reddit, Wikipedia) zijn hier niet aanwezig, en zelfs de basale zakelijke socials ontbreken in de structured data. Een Google Maps-shortlink is bovendien een instabiel/niet-canoniek identifier vergeleken met een Place ID-URL.
**Fix:** `sameAs` uitbreiden met minimaal de LinkedIn-bedrijfspagina en eventuele actieve social-profielen; vervang de shortlink door de canonieke Google Business Profile-URL; overweeg volledige namen + LinkedIn-profielen voor de founders toe te voegen (authorship-signaal).

### GEO-4 — /website-checker ontbreekt in llms.txt
**Severity: Laag**
**Bewijs:** `src/routes/llms[.]txt.tsx` somt onder `## Pages` 13 pagina's op (Home t/m Contact) maar noemt `/website-checker` niet, terwijl deze pagina wel bestaat en in de sitemap staat.
**Fix:** regel toevoegen, bv. `- [Website checker](/website-checker): Gratis check van SEO, snelheid en toegankelijkheid.`

### GEO-5 — robots.txt: AI-botgroepen erven de Disallow-regels van "User-agent: *" niet
**Severity: Laag / informatief**
**Bewijs:** Volgens de robots.txt-spec geldt elke `User-agent`-groep zelfstandig. `GPTBot`, `ClaudeBot`, `PerplexityBot` e.a. hebben elk alleen `Allow: /` — de `Disallow: /portal`, `/admin`, `/account`, `/server`, `/api/`, `/track.js` die onder `User-agent: *` staan, gelden dus niet voor deze specifiek genoemde AI-bots.
**Impact:** vermoedelijk laag (dit zijn auth/portaalpagina's zonder citeerbare content), maar strikt genomen mogen deze AI-crawlers paden bezoeken die voor reguliere bots wél dicht staan.
**Fix:** als dit onbedoeld is, herhaal de relevante Disallow-regels expliciet in elke AI-bot-groep.

### GEO-6 — Server-niveau bot-blocking, CSP en rate-limiting: niet gecontroleerd
Ik heb in deze sessie geen nginx-config, CSP-headerinstellingen of rate-limit-regels gevonden of getest (geen toegang tot productie-serverconfig binnen de beschikbare tijd). Dit is dus niet geverifieerd, positief noch negatief — niet gecontroleerd, niet aannemen dat het in orde is.

### GEO-7 — Live-inhoud van /llms.txt en /llms-full.txt: alleen broncode gecontroleerd
De generatorlogica is gelezen en klopt qua opzet (dynamische datumstempel, live blogquery met published/noindex-filters). Ik heb de daadwerkelijke live HTTP-response niet opgehaald, dus ik kan niet 100% bevestigen dat de Supabase-data op dit moment precies overeenkomt met wat de code zou moeten produceren (bv. of de nieuwste blogpost "ssl-certificaat-niet-veilig" er al in staat). Aanbeveling: eenmalig `curl https://aimi-development.nl/llms.txt` uitvoeren en handmatig aftellen tegen de 11 unieke blogposts.

### GEO-8 — Overlap tussen stad-/branchepagina's: indicatief gemeten, geen hard duplicate-content probleem
**Bewijs:** 4-gram Jaccard-overlap op de eerste 1500 tekens tekst (dus grotendeels gedeelde navigatie + hero) geeft een gemiddelde van ~0,47-0,48 tussen stad-paren onderling en tussen branche-paren onderling. Dit cijfer is vertekend doordat het ook gedeelde menu-tekst meet, niet alleen body-copy — een schonere boilerplate-vrije vergelijking is met de beschikbare data niet mogelijk (geen `extracted_text`-veld in deze crawl).
**Tegenwicht:** een steekproef van koppen (Veendam/Groningen/Meppel) laat zien dat de content wél degelijk lokaal verschilt qua inhoud, niet alleen qua plaatsnaam. Dit is dus geen kaal doorway-page-patroon, maar het sjabloonskelet is wel identiek over 30 pagina's — bij verdere opschaling (meer steden) neemt het risico op door AI-engines als "vergelijkbaar" behandelde pagina's toe.
**Fix (lage prioriteit):** geen directe actie nodig; bij uitbreiding van het aantal locatiepagina's opnieuw beoordelen met een boilerplate-vrije tekstextractie.

### GEO-9 — FAQPage-schema: waarde specifiek voor AI-engines
**Beoordeling:** de waarde zit in de onderliggende vraag/antwoord-tekst, niet in de schema-markup zelf — een AI-crawler die ruwe HTML leest zou de zichtbare FAQ-accordion-tekst sowieso kunnen extraheren. Het `FAQPage`-schema helpt vooral omdat het de vraag/antwoord-structuur ondubbelzinnig machineleesbaar maakt (geen giswerk over waar een vraag eindigt en een antwoord begint), en dat is precies waar AI-engines op parsen los van of Google er een rich result voor toont. Gezien de content-kwaliteit die ik op `/tarieven` aantrof (kort, concreet, zelfstandig) is dit schema hier functioneel waardevol voor AI-citatie — mits de €-bug (GEO-1) wordt opgelost, anders citeert een AI-engine een fout bedrag met hoge schema-confidence.

### GEO-10 — Merkzichtbaarheid in zoekopdrachten: niet gecontroleerd
Ik had in deze sessie geen WebSearch-tool beschikbaar (alleen een single-URL-fetchtool), en heb geen zoekopdrachten als "website laten maken Veendam", "webdesignbureau Groningen" of "website laten maken Noord-Nederland" uitgevoerd. Ik heb dus geen aanwijzingen — positief of negatief — over AIMI's vindbaarheid in Google/ChatGPT/Perplexity voor deze termen, over Wikipedia-aanwezigheid, Reddit-vermeldingen, YouTube-vermeldingen of LinkedIn-zichtbaarheid. Dit is een expliciete leemte in deze audit, geen "niets gevonden"-resultaat: er is simpelweg niet gezocht. Aanbeveling: dit apart laten uitvoeren met een sessie die wel over een websearch-tool beschikt (of handmatig).

### GEO-11 — Sitemap/crawldata bevat 10 dubbele blogpost-URL's
**Severity: Laag**
**Bewijs:** in `urls.txt` en `crawl-data.json` komen 10 van de 11 blogposts twee keer voor (identieke `word_count` bij beide vermeldingen), veroorzaakt door dubbele rijen in de `blog_posts`-tabel. Dit is geen AI-crawler-toegangsprobleem, maar wel een datahygiëne-issue dat crawlbudget verspilt en de basis vormt voor deze audit (60 unieke pagina's, niet 70).
**Fix:** dubbele rijen in `blog_posts` opschonen; sitemap-generatie controleren op de onderliggende oorzaak.

## Citeerbaarheidsscore

**62/100.** Onderbouwing: de FAQ-laag (35 pagina's) is het sterkste onderdeel — kort, direct, zelfstandig citeerbaar, met concrete cijfers. Dat wordt echter direct ondermijnd doordat de belangrijkste cijfers (alle prijzen in lopende tekst en in de FAQ-antwoorden op `/tarieven`) sitewide kapot gecodeerd zijn (GEO-1). Buiten de FAQ-blokken kon ik de citeerbaarheid van doorlopende bodytekst niet volledig beoordelen (de crawl-data bevat alleen de eerste ~1500 tekens per pagina, veelal navigatie/hero); dat is een blinde vlek, geen aanname van goed of slecht.

## Categoriescore AI Search Readiness: 60/100

| Dimensie | Gewicht | Indicatieve score | Toelichting |
|---|---|---|---|
| Citability | 25% | 60 | Sterke FAQ-structuur, ondermijnd door €-bug; bodytekst diepgang niet volledig meetbaar |
| Structural Readability | 20% | 75 | Consistente H1/H2/H3, vraag-gestileerde koppen, 1 H1 per pagina |
| Multi-Modal Content | 15% | niet grondig gecontroleerd (indicatief 50) | Alt-tekst-dekking en video/afbeeldingsschema niet geanalyseerd binnen deze sessie |
| Authority & Brand Signals | 20% | 35 | Geen adres/KvK/BTW in schema, sameAs op 1 link, merkzichtbaarheid extern niet gecontroleerd |
| Technical Accessibility | 20% | 78 | robots.txt correct voor AI-bots, volledige server-side rendering bevestigd; serverniveau (CSP/rate-limit) niet gecontroleerd |

Gewogen totaal: **~60/100**. De twee zwaktes die het totaal het meest drukken zijn Authority & Brand Signals (structurele NAP/sameAs-gaten) en de €-encodingbug binnen Citability — beide zijn concreet en met bewijs onderbouwd, dus beide met prioriteit oplosbaar.
