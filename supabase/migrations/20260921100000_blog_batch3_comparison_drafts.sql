-- Batch 3: 5 nieuwe blogposts (68 t/m 72), thema "website vs. het alternatief".
-- Bewust als CONCEPT (status = 'draft') en ZONDER datum (published_at = NULL):
-- de redactie kiest zelf wanneer/of ze live gaan via de editor of de
-- bulk-planner. Alle SEO-velden zijn ingevuld: seo_title (max 70 tekens),
-- seo_description, og_title/og_description, focus_keyword, tags en faq_items
-- (voor FAQPage-schema). Afbeeldingsvelden (featured_image_url/-alt,
-- og_image_url) blijven NULL omdat er nog geen beeld is aangeleverd; noindex
-- blijft false en canonical_url leeg (= eigen URL). Matcht qua patroon op
-- 20260917120000_blog_batch2_new_posts_scheduled.sql.
--
-- Interne links in de content worden pas relationeel in post_links gezet zodra
-- een post via de editor wordt opgeslagen (adminSyncPostLinksImpl in
-- blog.server.ts). Zolang deze posts concept zijn, zijn ze niet publiek en is
-- dat geen probleem.

-- ============================================================
-- 68. website-vs-instagram-facebook
-- ============================================================
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, status, published_at,
  seo_title, seo_description, og_title, og_description, focus_keyword, tags, faq_items
) VALUES (
  $b1t$Website of alleen een Instagram/Facebook-pagina?$b1t$,
  'website-vs-instagram-facebook',
  $b1e$Veel ondernemers vragen zich af of een eigen website nog nodig is als ze al actief zijn op Instagram of Facebook. Social media is uitstekend om zichtbaar te zijn en contact te houden, maar het is geen vervanging voor een eigen website: je bent er te gast, je bepaalt de spelregels niet en je bent onvindbaar in Google. We leggen uit waar het verschil zit en waarom de combinatie het sterkst is.$b1e$,
  $b1c$# Website of alleen een Instagram/Facebook-pagina?

"Ik heb toch al een Instagram met een paar duizend volgers, waarom zou ik dan nog een website nodig hebben?" Het is een vraag die we vaak horen, en het is een terechte vraag. Social media werkt, kost weinig en voelt laagdrempelig. Maar er zit een addertje onder het gras: op Instagram en Facebook ben je te gast op andermans terrein. En dat heeft gevolgen die je pas merkt op het moment dat het misgaat.

## Wat social media wél goed doet

Laten we eerlijk zijn: een goede Instagram- of Facebookpagina is waardevol. Je bereikt mensen waar ze toch al zijn, je kunt snel iets delen, en je bouwt een band op met je volgers. Voor het laten zien van je werk, sfeer en persoonlijkheid is het ideaal. Voor veel bedrijven is het de plek waar het eerste contact ontstaat.

Dat wil niemand je afnemen. De vraag is alleen: is het genoeg om je hele online aanwezigheid op te bouwen?

## Waar het misgaat als je alléén social media hebt

**Je bent te gast, niet de eigenaar**
Je Instagram- of Facebookpagina is niet van jou. Het platform bepaalt de regels, en die veranderen zonder overleg. Wordt je account per ongeluk geblokkeerd of gehackt, dan ben je in één klap je hele "etalage" en al je volgers kwijt, zonder dat er een klantenservice klaarstaat om je te helpen. Op je eigen website overkomt je dat niet.

**Je bent vrijwel onvindbaar in Google**
Zoekt iemand op "kapper Hoogeveen" of "aannemer Assen", dan verschijnen er websites en Google-bedrijfsprofielen, geen Instagram-posts. Wie jou nog niet kent en actief op zoek is naar wat jij aanbiedt, vindt je via social media eigenlijk niet. Je mist precies de mensen die klaar zijn om klant te worden.

**Het algoritme bepaalt wie je bereikt**
Je hebt duizend volgers, maar je post wordt aan een fractie daarvan getoond. Hoeveel precies? Dat bepaalt het platform, niet jij. Je hebt geen enkele controle over wie je boodschap ziet, en steeds vaker moet je betalen om je eigen volgers te bereiken.

**Beperkte ruimte om je verhaal te vertellen**
Een dienstenoverzicht, duidelijke prijzen, een uitgebreide uitleg van je werkwijze, een contactformulier dat direct in je mailbox terechtkomt: dat past niet in een social-media-profiel. Je blijft hangen in losse posts en een bio-linkje.

**Je bouwt geen eigen bezit op**
Alle energie die je in je socials steekt, versterkt uiteindelijk het platform, niet jouw eigen fundament. Een website die goed scoort in Google blijft jaren klanten opleveren. Een virale post is de volgende dag alweer weggezakt.

## Waarom de combinatie het sterkst is

Dit hoeft geen of-of-keuze te zijn. Sterker nog, social media en een eigen website vullen elkaar perfect aan. Social media is je uitnodiging, je website is je huis. Je gebruikt Instagram of Facebook om aandacht te trekken en mensen warm te maken, en je stuurt ze vervolgens naar je website waar ze het volledige verhaal vinden en de stap naar contact of aankoop zetten.

Zo bouw je op de socials aan bekendheid, terwijl je op je eigen website aan iets bouwt dat écht van jou is: vindbaar in Google, volledig naar eigen inzicht in te richten, en niet afhankelijk van de grillen van een platform.

## Wanneer is alleen social media (voorlopig) genoeg?

Heel eerlijk: als je net begint, weinig budget hebt en vooral wilt testen of er vraag is naar wat je doet, kan een goed onderhouden social-media-pagina een prima startpunt zijn. Maar zie het als tijdelijk. Zodra je serieus klanten wilt binnenhalen en gevonden wilt worden door mensen die jou nog niet kennen, loop je tegen de grenzen aan.

Herken je jezelf daarin? Dan is het waarschijnlijk tijd voor een [eigen website](/website-laten-maken) die je social media versterkt in plaats van vervangt.

## Onze insteek

Bij AIMI bouwen we geen websites die los staan van de rest van je online aanwezigheid. We zorgen dat je website en je social media elkaar versterken: bezoekers vanaf Instagram of Facebook landen op een snelle, duidelijke site die precies opvangt wat een social-media-profiel niet kan. Zo haal je uit beide het maximale.

Twijfel je hoe jouw huidige online basis ervoor staat? Doe de [gratis website-checker](/website-checker) en je weet binnen een paar minuten waar je staat.$b1c$,
  'draft', NULL,
  $b1st$Website of alleen Instagram/Facebook? Wat werkt beter?$b1st$,
  $b1sd$Is een eigen website nog nodig als je al op Instagram en Facebook zit? Lees waarom social media je website niet vervangt en wanneer je beide nodig hebt.$b1sd$,
  $b1ot$Website of alleen social media?$b1ot$,
  $b1od$Waarom een Instagram- of Facebookpagina je eigen website niet vervangt, en hoe ze elkaar juist versterken.$b1od$,
  $b1fk$website of instagram$b1fk$,
  ARRAY['website versus social media', 'eigen website nodig', 'instagram of website', 'online vindbaarheid mkb'],
  $b1faq$[
    {"q": "Heb ik nog een website nodig als ik al veel volgers op Instagram heb?", "a": "Ja. Volgers zijn waardevol, maar je bereikt ze niet allemaal en je bent afhankelijk van het algoritme. Bovendien vinden mensen die je nog niet kennen je via Google, niet via Instagram. Een eigen website vangt precies die zoekende klanten op en is bezit dat je zelf in handen houdt."},
    {"q": "Wat gebeurt er als mijn Instagram- of Facebookaccount geblokkeerd wordt?", "a": "Dan ben je in één keer je hele etalage en al je volgers kwijt, vaak zonder dat er een klantenservice klaarstaat om je te helpen. Bij een eigen website overkomt je dat niet: die is en blijft van jou."},
    {"q": "Kan ik social media en een website combineren?", "a": "Dat is juist de sterkste aanpak. Gebruik social media om aandacht te trekken en stuur mensen door naar je website, waar ze het volledige verhaal vinden en de stap naar contact of aankoop zetten."}
  ]$b1faq$::jsonb
);

-- ============================================================
-- 69. website-of-google-bedrijfsprofiel
-- ============================================================
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, status, published_at,
  seo_title, seo_description, og_title, og_description, focus_keyword, tags, faq_items
) VALUES (
  $b2t$Website nodig of is een Google Bedrijfsprofiel genoeg?$b2t$,
  'website-of-google-bedrijfsprofiel',
  $b2e$Een gratis Google Bedrijfsprofiel (voorheen Google Mijn Bedrijf) zorgt dat je opduikt in Google Maps en het lokale kaartje. Handig, maar het is geen vervanging voor een eigen website: je hebt beperkte controle, weinig ruimte om je verhaal te vertellen en je kunt bezoekers niet echt sturen. We leggen uit wat een bedrijfsprofiel wél doet, waar het ophoudt en waarom de twee samen het sterkst zijn.$b2e$,
  $b2c$# Website nodig of is een Google Bedrijfsprofiel genoeg?

Je hebt een Google Bedrijfsprofiel ingericht, je verschijnt netjes op de kaart als iemand in de buurt zoekt, en er komen af en toe telefoontjes binnen. Logische vraag: waarom zou je dan nog geld uitgeven aan een eigen website? Het eerlijke antwoord: een bedrijfsprofiel is een uitstekend begin, maar het is nooit het hele verhaal.

## Wat een Google Bedrijfsprofiel precies is

Een Google Bedrijfsprofiel (vroeger Google Mijn Bedrijf) is de gratis vermelding die verschijnt in Google Maps en in het lokale kaartje bovenaan de zoekresultaten. Zoek je op "tandarts Veendam", dan zie je eerst drie bedrijven op een kaartje: naam, beoordeling, openingstijden, telefoonnummer en een routebeschrijving. Dat komt allemaal uit het bedrijfsprofiel.

Voor lokale bedrijven is dit ontzettend belangrijk. Het is vaak het allereerste wat een potentiële klant ziet. Een goed ingericht profiel is dan ook geen luxe, maar een must. We schreven eerder over de [5 fouten die lokale bedrijven maken](/blog/google-business-profile-fouten) bij het inrichten ervan.

## Waar een bedrijfsprofiel ophoudt

Een bedrijfsprofiel is krachtig, maar het is en blijft een vermelding binnen Google, met alle beperkingen die daarbij horen.

**Je hebt weinig controle en ruimte**
Je kunt een korte omschrijving, foto's, openingstijden en enkele diensten kwijt, maar daar houdt het op. Je volledige aanbod uitleggen, je werkwijze toelichten, referenties tonen of een verhaal vertellen dat je onderscheidt van de concurrent: daar is simpelweg geen plek voor.

**Google bepaalt hoe je eruitziet**
De vormgeving, de indeling en welke onderdelen er getoond worden, dat bepaalt Google, niet jij. Je kunt je nauwelijks onderscheiden van het bedrijf ernaast in het kaartje. Iedereen ziet er ongeveer hetzelfde uit.

**Je stuurt bezoekers nergens echt naartoe**
Een bezoeker kan bellen of een routebeschrijving opvragen, maar een doordacht pad naar een offerteaanvraag, een online boeking of een contactformulier ontbreekt. Je vangt de klik niet op, je laat hem gebeuren of niet.

**Beperkte vindbaarheid buiten "in de buurt"-zoekopdrachten**
Een bedrijfsprofiel scoort vooral op lokale zoekopdrachten met een duidelijke locatie. Zoekt iemand op een specifieke dienst, een probleem of een vraag zonder plaatsnaam, dan verschijnen er websites, geen kaartjes. Precies daar mis je klanten zonder eigen site.

**Je bouwt geen eigen fundament op**
Net als bij social media geldt: al je inspanning versterkt uiteindelijk het platform. Een eigen website die goed scoort, blijft jarenlang klanten opleveren en is volledig van jou.

## Waarom de twee samen het sterkst zijn

Hier zit de kern: een Google Bedrijfsprofiel en een website zijn geen concurrenten, ze werken samen. Het bedrijfsprofiel trekt de lokale zoeker aan en toont in één oogopslag de basisgegevens. De website vangt die bezoeker vervolgens op en overtuigt hem: hier vindt hij het volledige verhaal, de details en een duidelijke volgende stap.

Sterker nog, een goede website versterkt je bedrijfsprofiel. Google kijkt naar de samenhang tussen je profiel en je website (kloppende gegevens, een actieve, snelle site) en beloont dat met betere posities in het lokale kaartje. Het een maakt het ander beter.

## Wanneer is alleen een bedrijfsprofiel voorlopig genoeg?

Ben je een puur lokaal bedrijf, werk je op basis van mond-tot-mondreclame en heb je vooral behoefte aan telefoontjes uit de directe omgeving? Dan kun je met een goed onderhouden bedrijfsprofiel een tijd vooruit. Maar zodra je wilt groeien, je wilt onderscheiden van concurrenten of gevonden wilt worden op méér dan alleen "dienst plus plaatsnaam", loop je tegen de grenzen aan.

Dat is precies het moment waarop een [eigen website](/website-laten-maken) het verschil maakt. Zie ook waarom veel [lokale bedrijven in Groningen en Drenthe](/blog/verouderde-websites-groningen-drenthe) juist hier kansen laten liggen.

## Onze insteek

Bij AIMI zorgen we dat je website en je Google Bedrijfsprofiel op elkaar aansluiten in plaats van los van elkaar te bestaan: kloppende gegevens, dezelfde uitstraling en een site die de klik vanuit Google netjes opvangt. Zo haal je uit je gratis bedrijfsprofiel én je website samen het maximale.

Benieuwd of jouw website de klik vanuit Google goed opvangt? Doe de [gratis website-checker](/website-checker).$b2c$,
  'draft', NULL,
  $b2st$Website nodig of is Google Bedrijfsprofiel genoeg?$b2st$,
  $b2sd$Is een gratis Google Bedrijfsprofiel genoeg of heb je een eigen website nodig? Lees wat een bedrijfsprofiel wél doet, waar het ophoudt en waarom je beide wilt.$b2sd$,
  $b2ot$Website of Google Bedrijfsprofiel?$b2ot$,
  $b2od$Wat een gratis Google Bedrijfsprofiel wél kan, waar het ophoudt en waarom een eigen website het onmisbaar aanvult.$b2od$,
  $b2fk$website of google bedrijfsprofiel$b2fk$,
  ARRAY['google bedrijfsprofiel', 'google mijn bedrijf', 'lokale vindbaarheid', 'website nodig'],
  $b2faq$[
    {"q": "Is een gratis Google Bedrijfsprofiel genoeg zonder website?", "a": "Voor puur lokale telefoontjes uit de buurt kom je een tijd vooruit, maar een bedrijfsprofiel heeft weinig ruimte en controle. Je kunt je verhaal niet volledig vertellen, je onderscheidt je nauwelijks en je scoort vooral op zoekopdrachten met een plaatsnaam. Een eigen website vangt de rest op."},
    {"q": "Versterkt een website mijn Google Bedrijfsprofiel?", "a": "Ja. Google kijkt naar de samenhang tussen je profiel en je website. Kloppende gegevens en een actieve, snelle site helpen je aan betere posities in het lokale kaartje. Het een maakt het ander beter."},
    {"q": "Wat is het verschil tussen Google Mijn Bedrijf en een Google Bedrijfsprofiel?", "a": "Dat is hetzelfde. Google Mijn Bedrijf is inmiddels omgedoopt tot Google Bedrijfsprofiel. Het is de gratis vermelding die in Google Maps en het lokale kaartje verschijnt."}
  ]$b2faq$::jsonb
);

-- ============================================================
-- 70. website-vs-marktplaats-etsy
-- ============================================================
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, status, published_at,
  seo_title, seo_description, og_title, og_description, focus_keyword, tags, faq_items
) VALUES (
  $b3t$Kleine ondernemer: eigen website of verkopen via Marktplaats/Etsy?$b3t$,
  'website-vs-marktplaats-etsy',
  $b3e$Verkopen via een marktplaats als Marktplaats of Etsy is laagdrempelig en levert direct bezoekers op, maar je betaalt commissie, je concurreert direct op prijs en je bouwt geen eigen klantrelatie op. Een eigen webshop kost meer opstartwerk, maar geeft je controle, marge en een merk dat van jou is. We zetten de voor- en nadelen op een rij, plus wanneer de combinatie slim is.$b3e$,
  $b3c$# Kleine ondernemer: eigen website of verkopen via Marktplaats/Etsy?

Je maakt iets moois of je verkoopt een mooi product, en je wilt online verkopen. De snelste route lijkt duidelijk: een account op Marktplaats, Etsy of Bol en je staat vandaag nog in de etalage. Maar is dat op de lange termijn ook de slimste route? Zoals zo vaak: het hangt ervan af. Laten we de eerlijke afweging maken.

## Waarom een marktplaats zo aantrekkelijk is

Er is een reden dat zoveel ondernemers op een platform beginnen, en dat is niet gek.

- Je hebt meteen bezoekers: mensen zijn er al aan het zoeken en kopen
- Je hoeft zelf geen verkeer op te bouwen; het platform brengt de bezoekers mee
- Betalen, verzendlabels en soms zelfs retouren zijn geregeld
- Je kunt vandaag beginnen zonder technische kennis

Voor het testen van een product of een rustige start is dat ideaal. Je ontdekt snel of er vraag is, zonder eerst te investeren in een eigen webshop.

## De prijs die je ervoor betaalt

Die gemakkelijke start heeft een keerzijde, en die wordt groter naarmate je meer verkoopt.

**Commissie en kosten happen in je marge**
Elk platform neemt een percentage van elke verkoop, plus vaak plaatsings- en transactiekosten. Bij lage marges kan dat het verschil zijn tussen winst en break-even. Je werkt deels voor het platform.

**Je concurreert keihard op prijs**
Op een marktplaats staat jouw product direct naast tien vergelijkbare aanbieders, vaak met een prijsvergelijking ernaast. De verleiding (en de druk) om de goedkoopste te zijn, is groot. Onderscheiden op kwaliteit of verhaal is lastig binnen een uniforme productpagina.

**Je bouwt geen eigen klantrelatie op**
Dit is misschien wel het grootste nadeel. De klant is van het platform, niet van jou. Je krijgt zelden hun e-mailadres, je mag ze vaak niet rechtstreeks benaderen, en herhaalaankopen lopen weer via het platform (en de commissie). Je bouwt aan andermans klantenbestand.

**Je bent overgeleverd aan de regels**
Het platform bepaalt de voorwaarden, de tarieven en of je account mag blijven. Verandert er iets in het beleid of wordt je account geschorst, dan sta je machteloos. Je hele verkoopkanaal kan van de ene op de andere dag opdrogen.

**Geen eigen merk**
Klanten onthouden "gekocht op Etsy", niet per se jouw merknaam. Je bouwt bekendheid op voor het platform, niet voor jezelf.

## Wat een eigen webshop je oplevert

Een [eigen webshop](/webshop-laten-maken) draait de verhouding om. Ja, het kost meer opstartwerk en je moet zelf bezoekers aantrekken, maar daar staat veel tegenover:

- **Geen commissie per verkoop**: je houdt je volledige marge, alleen de vaste kosten van hosting en betaalverwerking blijven over
- **Een eigen klantrelatie**: je hebt de klantgegevens, je mag ze (met toestemming) benaderen voor herhaalaankopen, nieuwsbrieven en aanbiedingen
- **Je eigen merk**: klanten kopen bij jóu en onthouden jouw naam, niet die van een platform
- **Volledige controle**: over je uitstraling, je prijzen, je productpresentatie en je klantbeleving
- **Vindbaar in Google**: een goed opgezette webshop trekt op termijn eigen, gratis bezoekers via de zoekmachine

De keerzijde is eerlijk: je moet zelf aan bekendheid en verkeer werken, en dat kost tijd. Een webshop is geen "zet hem live en de bestellingen stromen binnen"-oplossing.

## Vaak is de combinatie het slimst

Het hoeft geen of-of-keuze te zijn. Veel succesvolle kleine ondernemers gebruiken een marktplaats als extra vindplaats en aanjager, terwijl ze tegelijk hun eigen webshop opbouwen als thuisbasis. Nieuwe klanten vinden je op het platform; terugkerende klanten stuur je (waar toegestaan) naar je eigen shop, waar je meer marge houdt en de relatie in eigen hand hebt.

Zo profiteer je van het bereik van de marktplaats zonder er volledig afhankelijk van te blijven. Het platform is dan een kanaal, niet je hele bedrijf.

## Twijfel je of je überhaupt een webshop nodig hebt?

Niet elk bedrijf heeft een volwaardige webshop nodig. Verkoop je vooral diensten of maatwerk, dan is een gewone website vaak passender. We schreven daar eerder over in [webshop vs. gewone website](/blog/webshop-vs-gewone-website).

## Onze insteek

Bij AIMI adviseren we hier eerlijk over. Begin je net en wil je testen? Dan is een marktplaats een prima startpunt. Verkoop je serieus en structureel, dan is een eigen webshop bijna altijd de betere investering op termijn, juist vanwege de marge en de klantrelatie. We kijken naar wat jij verkoopt en hoe je klanten nu al kopen, en adviseren op basis daarvan.

Overweeg je de stap naar een eigen webshop? [Neem contact op](/contact), dan denken we vrijblijvend met je mee.$b3c$,
  'draft', NULL,
  $b3st$Eigen website of verkopen via Marktplaats/Etsy?$b3st$,
  $b3sd$Verkopen via Marktplaats of Etsy of een eigen webshop bouwen? Lees de eerlijke afweging: commissie, marge, klantrelatie en wanneer de combinatie slim is.$b3sd$,
  $b3ot$Eigen webshop of via Marktplaats/Etsy?$b3ot$,
  $b3od$Commissie, marge en klantrelatie: de eerlijke afweging tussen een marktplaats en een eigen webshop voor kleine ondernemers.$b3od$,
  $b3fk$website of marktplaats$b3fk$,
  ARRAY['eigen webshop of marktplaats', 'verkopen via etsy', 'verkopen op marktplaats', 'webshop kleine ondernemer'],
  $b3faq$[
    {"q": "Is een eigen webshop beter dan verkopen via Marktplaats of Etsy?", "a": "Voor een serieuze, structurele verkoop meestal wel, omdat je je volledige marge houdt, een eigen klantrelatie opbouwt en aan je eigen merk werkt. Een marktplaats is aantrekkelijk om snel te starten of te testen, maar kost commissie en je bouwt aan het klantenbestand van het platform, niet aan dat van jezelf."},
    {"q": "Kan ik een marktplaats en een eigen webshop combineren?", "a": "Dat is vaak de slimste aanpak. Gebruik de marktplaats als extra vindplaats voor nieuwe klanten en bouw tegelijk je eigen webshop op als thuisbasis. Terugkerende klanten stuur je, waar toegestaan, naar je eigen shop waar je meer marge houdt."},
    {"q": "Wat is het grootste nadeel van alleen via een marktplaats verkopen?", "a": "Je bouwt geen eigen klantrelatie op. De klant is van het platform: je krijgt zelden hun gegevens, mag ze vaak niet rechtstreeks benaderen en bent overgeleverd aan de regels en tarieven van het platform."}
  ]$b3faq$::jsonb
);

-- ============================================================
-- 71. niks-doen-vs-website-opbrengst
-- ============================================================
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, status, published_at,
  seo_title, seo_description, og_title, og_description, focus_keyword, tags, faq_items
) VALUES (
  $b4t$Wat kost niks doen versus wat levert een website op?$b4t$,
  'niks-doen-vs-website-opbrengst',
  $b4e$Een website voelt als een kostenpost, maar geen (goede) website hebben kost óók geld, alleen minder zichtbaar. Gemiste opdrachten, klanten die naar de beter vindbare concurrent gaan en tijd die je kwijt bent aan vragen die een site had kunnen beantwoorden, tellen op. We rekenen voor waarom de vraag niet is "wat kost een website" maar "wat kost het om er geen te hebben".$b4e$,
  $b4c$# Wat kost niks doen versus wat levert een website op?

De meeste ondernemers kijken naar een website als een uitgave: een bedrag dat van de rekening gaat. Begrijpelijk. Maar het is maar de helft van het verhaal. Want geen website hebben, of een verouderde site laten aanmodderen, kost óók geld. Alleen staat dat bedrag nergens op een factuur, waardoor het onzichtbaar blijft. Laten we beide kanten eerlijk naast elkaar leggen.

## De onzichtbare kosten van niks doen

Dit zijn de kosten die je niet ziet, maar die wel degelijk oplopen.

**Gemiste opdrachten**
Elke potentiële klant die je niet vindt in Google, of die op een verouderde, trage site belandt en wegklikt, is een gemiste opdracht. Eén misgelopen klus per maand lijkt weinig, maar reken het eens door over een jaar. Voor een dienstverlener met opdrachten van honderden of duizenden euro's tikt dat hard aan.

**Klanten die naar de concurrent gaan**
Wie jou niet goed kan vinden of niet overtuigd raakt, kiest simpelweg de volgende in de zoekresultaten. Je verliest die opdracht niet zichtbaar, je hoort er gewoon nooit van. De concurrent die wél investeerde in een goede site, pakt de klant die eigenlijk bij jou had kunnen komen.

**Tijd die je kwijt bent aan telkens dezelfde vragen**
"Wat kost het ongeveer?", "Waar zitten jullie?", "Wat doen jullie precies?" Zonder goede website beantwoord je die vragen telkens opnieuw per telefoon of mail. Een duidelijke site vangt dat op en scheelt je uren per maand, tijd die je aan je eigenlijke werk kunt besteden.

**Verlies van vertrouwen**
Steeds meer mensen checken je online voordat ze contact opnemen. Vinden ze niets, of een gedateerde site, dan zakt je geloofwaardigheid nog voordat het gesprek begint. Dat verlies is lastig te meten, maar heel reëel.

**Achterstand die steeds duurder wordt**
Hoe langer je wacht, hoe verder je achterloopt op concurrenten die wél investeren, en hoe groter de inhaalslag later. Niks doen is geen neutrale keuze; het is elke maand een klein stukje terrein verliezen.

## Wat een goede website oplevert

Aan de andere kant van de weegschaal staat wat een doordachte site je teruggeeft.

**Nieuwe klanten die je anders nooit had bereikt**
Een site die goed scoort in Google trekt mensen aan die actief op zoek zijn naar wat jij doet, dag en nacht, zonder dat jij er iets voor hoeft te doen. Dat is het verschil tussen wachten tot iemand je toevallig aanbeveelt en gevonden worden door wie nú een oplossing zoekt.

**Meer opdrachten uit hetzelfde verkeer**
Een goede site is niet alleen mooi, hij stuurt bezoekers naar actie: bellen, mailen, een offerte aanvragen. We schreven eerder waarom [mooi niet hetzelfde is als converteert](/blog/mooi-versus-converteert). Een conversiegerichte site haalt meer klanten uit dezelfde bezoekers.

**Tijdwinst**
Een site die veelgestelde vragen, prijzen en werkwijze duidelijk toont, filtert je aanvragen voor. Je spreekt vaker mensen die al weten wat ze willen, en verspilt minder tijd aan gesprekken die nergens toe leiden.

**Vertrouwen dat de deal makkelijker maakt**
Een professionele, actuele site bevestigt dat je te vertrouwen bent, nog voordat je iemand spreekt. Dat verkort het verkoopgesprek en verhoogt de kans dat het een ja wordt.

**Een investering die blijft renderen**
Anders dan een advertentie die stopt zodra je stopt met betalen, blijft een goed vindbare website jarenlang klanten opleveren. De kosten maak je één keer (plus [onderhoud](/blog/onderhoudskosten-na-livegang)), de opbrengst loopt door.

## Het rekensommetje dat telt

Zet het simpel tegenover elkaar. Wat kost een website je per maand, uitgesmeerd over de jaren dat je hem gebruikt, inclusief onderhoud? En hoeveel is één extra opdracht per maand je waard? Voor de meeste bedrijven verdient een goede site zich terug met een handvol extra klanten per jaar, en alles daarboven is winst.

De echte vraag is dus niet "kan ik me een website veroorloven", maar "kan ik me veroorloven om er geen te hebben terwijl mijn concurrent er wél in investeert".

## Onze insteek

Bij AIMI verkopen we geen dure sites om het duur te maken. We kijken naar wat een website jou concreet kan opleveren en bouwen daarnaartoe, met een eerlijke afweging van kosten en verwachte opbrengst. Geen luchtkastelen, wel een realistisch beeld van wat het je oplevert.

Wil je eerst weten hoe je huidige site (of het ontbreken ervan) je positie beïnvloedt? Doe de [gratis website-checker](/website-checker), of [neem contact op](/contact) voor een eerlijk gesprek.$b4c$,
  'draft', NULL,
  $b4st$Wat kost niks doen vs. wat levert een website op?$b4st$,
  $b4sd$Een website voelt als een kostenpost, maar geen website kost óók geld: gemiste opdrachten en klanten die naar de concurrent gaan. We rekenen het voor.$b4sd$,
  $b4ot$Wat kost het om géén website te hebben?$b4ot$,
  $b4od$Gemiste opdrachten, klanten naar de concurrent en verloren tijd: de onzichtbare kosten van niks doen versus wat een website oplevert.$b4od$,
  $b4fk$wat levert een website op$b4fk$,
  ARRAY['kosten website', 'website terugverdienen', 'rendement website', 'website voor bedrijf'],
  $b4faq$[
    {"q": "Verdient een website zich echt terug?", "a": "Voor de meeste bedrijven verdient een goede website zich terug met een handvol extra opdrachten per jaar. De kosten maak je grotendeels eenmalig, terwijl een goed vindbare site jarenlang klanten blijft opleveren. Alles boven dat break-evenpunt is winst."},
    {"q": "Wat kost het om géén website te hebben?", "a": "Die kosten staan nergens op een factuur, maar zijn reëel: gemiste opdrachten, klanten die naar de beter vindbare concurrent gaan, tijd die je kwijt bent aan telkens dezelfde vragen, en verlies van vertrouwen bij mensen die je online opzoeken en niets vinden."},
    {"q": "Is een website een kostenpost of een investering?", "a": "Anders dan een advertentie die stopt zodra je stopt met betalen, blijft een goed vindbare website jarenlang klanten opleveren. Je maakt de kosten grotendeels één keer, de opbrengst loopt door. Daarmee is het eerder een investering dan een kostenpost."}
  ]$b4faq$::jsonb
);

-- ============================================================
-- 72. website-met-onderhoud-vs-eenmalig
-- ============================================================
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, status, published_at,
  seo_title, seo_description, og_title, og_description, focus_keyword, tags, faq_items
) VALUES (
  $b5t$Website met onderhoud versus eenmalig opleveren$b5t$,
  'website-met-onderhoud-vs-eenmalig',
  $b5e$Een website eenmalig laten bouwen lijkt goedkoper: je betaalt één keer en klaar. Maar software, beveiliging en zoekmachines staan nooit stil, dus een site zonder onderhoud veroudert snel, wordt kwetsbaar en zakt weg in Google. We leggen uit wat het verschil is tussen eenmalig opleveren en een website met onderhoud, en wanneer welke keuze verstandig is.$b5e$,
  $b5c$# Website met onderhoud versus eenmalig opleveren

"Kan ik de website niet gewoon één keer laten bouwen en dan zelf verder?" Een begrijpelijke vraag: je betaalt één keer, en daarna ben je van de vaste lasten af. Op papier de goedkoopste optie. In de praktijk pakt dat vaak anders uit, want een website is geen schilderij dat je ophangt en verder met rust laat. Het is software die blijft draaien in een wereld die niet stilstaat.

## Wat "eenmalig opleveren" betekent

Bij een eenmalige oplevering krijg je een afgeronde website, betaalt je de rekening, en daarna is de site van jou om zelf te beheren. Klinkt netjes en overzichtelijk. En voor bepaalde situaties is het ook prima, daar komen we zo op. Maar het belangrijkste om te begrijpen is: vanaf het moment van oplevering begint de site langzaam te verouderen, en niemand houdt hem meer in de gaten.

## Waarom een website niet "af" is na oplevering

**Software staat nooit stil**
De onderliggende systemen, plugins en servers krijgen voortdurend updates, vaak juist om net ontdekte beveiligingslekken te dichten. Blijven die updates uit, dan stapelen de kwetsbaarheden zich op. Een site die een jaar niet is bijgewerkt, is in de praktijk een openstaande deur.

**Beveiliging veroudert**
Wat vandaag veilig is, kan over een half jaar een bekend risico zijn. Zonder onderhoud loop je een reëel risico op een hack, met alle gevolgen van dien. We beschreven eerder [wat er gebeurt als je WordPress-site gehackt wordt](/blog/wordpress-site-gehackt): verlies van klanten, rankings en vertrouwen.

**Zoekmachines veranderen hun spelregels**
Google past zijn beoordelingscriteria voortdurend aan. Content en techniek die vandaag goed scoren, zakken zonder bijstelling langzaam weg ten opzichte van concurrenten die wél actief aan hun site werken.

**Er gaat vanzelf iets stuk**
Een contactformulier dat stilletjes stopt met werken, een link die niet meer klopt, een pagina die na een browserupdate raar oogt. Zonder monitoring merk je dat pas als een klant het meldt, of nooit, en mis je in de tussentijd aanvragen.

**Je bedrijf verandert**
Nieuwe diensten, andere prijzen, een gewijzigd telefoonnummer. Zonder iemand die dat bijhoudt, loopt je site langzaam achter op de werkelijkheid, en dat straalt af op je betrouwbaarheid.

## Wat een website met onderhoud toevoegt

Een [website met onderhoud](/onderhoud-hosting) draait deze risico's om. In plaats van dat je pas ingrijpt als het misgaat, wordt de site actief bijgehouden:

- Regelmatige updates van de onderliggende software, vóór problemen ontstaan
- Beveiliging en monitoring, zodat verdachte activiteit of storingen snel worden opgemerkt
- Back-ups, zodat herstel een kwestie van minuten is in plaats van dagen
- Kleine inhoudelijke aanpassingen, zodat je site actueel blijft
- Bijsturing waar nodig, zodat je vindbaarheid op peil blijft

Wat het kost en wat je er precies voor krijgt, hebben we uitgesplitst in [wat onderhoud na livegang écht kost](/blog/onderhoudskosten-na-livegang). De kern: structureel onderhoud is vrijwel altijd goedkoper dan de kosten van een hack, een lange periode van dalende vindbaarheid, of een site die na een paar jaar volledig vernieuwd moet worden omdat niemand hem heeft bijgehouden.

## Wanneer is eenmalig opleveren wél verdedigbaar?

Eerlijk is eerlijk: niet elke situatie vraagt om een onderhoudsabonnement.

- Je hebt een simpele, statische site die je bewust zelf technisch kunt en wilt beheren
- Je hebt in eigen huis iemand met de kennis om updates, beveiliging en back-ups te verzorgen
- Het gaat om een tijdelijke site (bijvoorbeeld voor één evenement) die daarna toch offline gaat

In de meeste andere gevallen, en zeker als je website belangrijk is voor je omzet, is "eenmalig en dan zelf maar zien" een schijnbesparing die je op termijn duurder uitkomt.

## Het gaat niet om af zijn, maar om aan blijven

De kern van het verschil: een eenmalige oplevering levert een site op die vanaf dag één begint te verouderen. Onderhoud houdt de site veilig, snel en actueel zolang hij online staat. Het is het verschil tussen een auto die je koopt en nooit meer laat keuren, en een auto die af en toe onder handen wordt genomen zodat hij blijft rijden.

## Onze insteek

Bij AIMI bouwen we op eigen infrastructuur, juist om onderhoud voorspelbaar en behapbaar te houden: updates, back-ups, monitoring en beveiliging, zonder verrassingen achteraf. We leggen vooraf uit wat je kunt verwachten en waarom, zodat je een bewuste keuze maakt in plaats van er later achter te komen.

Bekijk de [onderhoud & hosting-pagina](/onderhoud-hosting) voor wat erin zit, of doe eerst de [gratis website-checker](/website-checker) om te zien hoe je huidige site ervoor staat.$b5c$,
  'draft', NULL,
  $b5st$Website met onderhoud of eenmalig opleveren?$b5st$,
  $b5sd$Een website eenmalig laten bouwen lijkt goedkoper, maar zonder onderhoud veroudert je site snel en wordt hij kwetsbaar. Lees wanneer welke keuze verstandig is.$b5sd$,
  $b5ot$Website-onderhoud of eenmalig opleveren?$b5ot$,
  $b5od$Waarom een website niet "af" is na oplevering, en wanneer eenmalig opleveren wél verdedigbaar is.$b5od$,
  $b5fk$website onderhoud of eenmalig$b5fk$,
  ARRAY['website onderhoud', 'website eenmalig laten bouwen', 'onderhoud na livegang', 'website beheer'],
  $b5faq$[
    {"q": "Is een website eenmalig laten bouwen goedkoper dan met onderhoud?", "a": "Op papier wel, maar meestal is het een schijnbesparing. Zonder onderhoud veroudert je site, wordt hij kwetsbaar voor hacks en zakt hij weg in Google. Structureel onderhoud is vrijwel altijd goedkoper dan de kosten van een hack of een site die na een paar jaar volledig vernieuwd moet worden."},
    {"q": "Wat gebeurt er met een website zonder onderhoud?", "a": "Software en beveiliging veranderen niet mee, waardoor kwetsbaarheden zich opstapelen. Formulieren kunnen stilletjes stoppen met werken, de site zakt weg in Google en de inhoud loopt achter op je bedrijf. Zonder monitoring merk je problemen vaak pas als een klant het meldt."},
    {"q": "Wanneer is eenmalig opleveren wél verstandig?", "a": "Bij een simpele, statische site die je bewust zelf kunt en wilt beheren, als je in huis iemand hebt met de kennis voor updates en back-ups, of bij een tijdelijke site die daarna toch offline gaat. In de meeste andere gevallen is onderhoud de verstandiger keuze."}
  ]$b5faq$::jsonb
);
