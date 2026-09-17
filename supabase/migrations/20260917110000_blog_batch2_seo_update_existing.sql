-- Batch 2: werkt de 27 bestaande blogposts (1 t/m 27, gemigreerd in
-- 20260916120000/130000/140000) bij met verbeterde SEO-titel/omschrijving,
-- een focus-zoekwoord, tags (secundaire keywords) en een herziene
-- samenvatting/excerpt. Content/body van deze posts blijft ongewijzigd; alleen
-- de metadata is aangescherpt. Matcht op slug, dus onafhankelijk van id's.

-- 1. wordpress-site-gehackt
UPDATE public.blog_posts SET
  seo_title = $u1st$Wat als je WordPress-site gehackt wordt?$u1st$,
  seo_description = $u1sd$Een gehackte WordPress-site kost je klanten, rankings en vertrouwen. Lees wat er echt gebeurt bij een hack en hoe je dit voorkomt.$u1sd$,
  focus_keyword = $u1fk$wordpress site gehackt$u1fk$,
  tags = ARRAY['wordpress beveiligen', 'website hack voorkomen', 'wordpress kwetsbaarheden'],
  excerpt = $u1ex$WordPress draait meer dan 40% van alle websites wereldwijd. Precies daarom is het ook het populairste doelwit voor hackers. Niet omdat WordPress zelf onveilig is, maar omdat er zoveel sites zijn om te scannen dat de kans op een verouderde plugin of een zwak wachtwoord groot is.$u1ex$
WHERE slug = 'wordpress-site-gehackt';

-- 2. core-web-vitals-website-snelheid
UPDATE public.blog_posts SET
  seo_title = $u2st$Trage website? Zo verbeter je je snelheid in Google$u2st$,
  seo_description = $u2sd$Een trage website kost je bezoekers én omzet. Ontdek wat Core Web Vitals zijn en waarom snelheid direct invloed heeft op je aantal klanten.$u2sd$,
  focus_keyword = $u2fk$core web vitals$u2fk$,
  tags = ARRAY['website snelheid', 'laadtijd website', 'website optimaliseren'],
  excerpt = $u2ex$Je hebt maar een paar seconden om een bezoeker vast te houden. Duurt het laden van je website te lang, dan is diegene alweer weg voordat hij ook maar één woord van je aanbod heeft gelezen. Dat is niet alleen vervelend, het kost je direct klanten en het schaadt je positie in Google.$u2ex$
WHERE slug = 'core-web-vitals-website-snelheid';

-- 3. vps-hosting-kleine-bedrijven
UPDATE public.blog_posts SET
  seo_title = $u3st$Self-hosten op een VPS: is dat iets voor jou?$u3st$,
  seo_description = $u3sd$VPS-hosting klinkt technisch, maar levert kleine bedrijven vaak een snellere, veiligere en goedkopere website op dan gedeelde hosting. Lees waarom.$u3sd$,
  focus_keyword = $u3fk$vps hosting kleine bedrijven$u3fk$,
  tags = ARRAY['self hosten website', 'vps versus shared hosting', 'website hosting mkb'],
  excerpt = $u3ex$Als je aan hosting denkt, denk je waarschijnlijk aan een pakketje bij een grote hostingpartij: een paar euro per maand, een controlepaneel met veel knoppen, klaar. Dat heet shared hosting, en voor een simpele visitekaartjessite werkt het vaak prima. Maar zodra je site meer moet doen, of gewoon betrouwbaarder moet zijn, loop je snel tegen de grenzen aan.$u3ex$
WHERE slug = 'vps-hosting-kleine-bedrijven';

-- 4. gratis-website-checker-uitleg
UPDATE public.blog_posts SET
  seo_title = $u4st$Gratis website-check: hoe gezond is jouw site?$u4st$,
  seo_description = $u4sd$Onze gratis website-checker scant snelheid, beveiliging en SEO in een paar minuten. Lees wat er precies gecontroleerd wordt en waarom dat telt.$u4sd$,
  focus_keyword = $u4fk$gratis website checker$u4fk$,
  tags = ARRAY['website check', 'website laten testen', 'website analyse'],
  excerpt = $u4ex$De meeste ondernemers weten niet hoe hun website er écht voor staat. Hij ziet er mooi uit, dus dat zal wel goed zijn, toch? Niet per se. Een website kan er visueel prima uitzien en tegelijk traag laden, kwetsbaar zijn voor hacks of slecht scoren in Google. Daarom hebben we een gratis website-checker gebouwd: een snelle, onafhankelijke scan die laat zien waar je site staat.$u4ex$
WHERE slug = 'gratis-website-checker-uitleg';

-- 5. google-business-profile-fouten
UPDATE public.blog_posts SET
  seo_title = $u5st$Google Bedrijfsprofiel: 7 fouten die klanten kosten$u5st$,
  seo_description = $u5sd$Een slecht ingericht Google Business Profile kost je lokale klanten. Dit zijn de 5 meest voorkomende fouten en hoe je ze oplost.$u5sd$,
  focus_keyword = $u5fk$google business profile fouten$u5fk$,
  tags = ARRAY['google mijn bedrijf optimaliseren', 'lokale seo', 'google bedrijfsprofiel'],
  excerpt = $u5ex$Zoek je op Google naar "loodgieter Assen" of "kapper Hoogeveen", dan krijg je eerst een kaartje met drie bedrijven te zien, nog vóór de gewone zoekresultaten. Dat kaartje komt uit Google Business Profile (voorheen Google Mijn Bedrijf). Voor lokale bedrijven is dit vaak de belangrijkste plek om gevonden te worden, maar veel profielen worden slecht bijgehouden. Dit zijn de vijf fouten die we het vaakst tegenkomen.$u5ex$
WHERE slug = 'google-business-profile-fouten';

-- 6. mooi-versus-converteert
UPDATE public.blog_posts SET
  seo_title = $u6st$Waarom je mooie website geen klanten oplevert$u6st$,
  seo_description = $u6sd$Een mooie website levert niet automatisch klanten op. Lees waarom design en conversie twee verschillende dingen zijn en hoe je ze combineert.$u6sd$,
  focus_keyword = $u6fk$website converteert niet$u6fk$,
  tags = ARRAY['website conversie verbeteren', 'mooie website geen klanten', 'conversiegericht ontwerp'],
  excerpt = $u6ex$"Onze nieuwe website is echt heel mooi geworden." We horen deze zin vaak, en het is meestal ook waar. Maar een paar weken later volgt regelmatig de vraag: waarom komen er dan geen aanvragen binnen? Mooi en effectief zijn namelijk niet hetzelfde, en die verwarring kost bedrijven onnodig veel omzet.$u6ex$
WHERE slug = 'mooi-versus-converteert';

-- 7. onderhoudskosten-na-livegang
UPDATE public.blog_posts SET
  seo_title = $u7st$Wat kost website-onderhoud per maand?$u7st$,
  seo_description = $u7sd$Een website is nooit "af" na livegang. Lees wat onderhoud in de praktijk inhoudt, wat het kost en waarom dit vaak wordt onderschat.$u7sd$,
  focus_keyword = $u7fk$website onderhoud kosten$u7fk$,
  tags = ARRAY['onderhoud na livegang', 'kosten website onderhouden', 'website beheer'],
  excerpt = $u7ex$"Mijn website staat live, klaar is Kees." Deze gedachte klopt helaas zelden. Een website is geen folder die je één keer drukt en daarna nooit meer aanraakt, het is een stukje online infrastructuur dat blijft draaien, en dus ook onderhoud vraagt. Wat dat onderhoud precies inhoudt en wat het realistisch kost, blijft echter vaak vaag. Daarom hier een concreet overzicht.$u7ex$
WHERE slug = 'onderhoudskosten-na-livegang';

-- 8. webshop-vs-gewone-website
UPDATE public.blog_posts SET
  seo_title = $u8st$Webshop of gewone website: wat heb jij nodig?$u8st$,
  seo_description = $u8sd$Niet elk bedrijf heeft een webshop nodig. Lees wanneer een webshop wél zin heeft en wanneer een gewone website juist beter werkt.$u8sd$,
  focus_keyword = $u8fk$webshop of website nodig$u8fk$,
  tags = ARRAY['verschil webshop en website', 'webshop laten maken', 'wanneer webshop'],
  excerpt = $u8ex$"Moeten we niet gewoon een webshop laten bouwen?" Een vraag die we vaak horen, meestal zonder dat er goed is nagedacht of dat eigenlijk wel nodig is. Een webshop is namelijk geen upgrade van een gewone website, het is een ander soort systeem, met andere kosten, ander beheer en andere verwachtingen. Niet elk bedrijf is erbij gebaat.$u8ex$
WHERE slug = 'webshop-vs-gewone-website';

-- 9. verouderde-websites-groningen-drenthe
UPDATE public.blog_posts SET
  seo_title = $u9st$Website laten maken in Groningen: loop je achter?$u9st$,
  seo_description = $u9sd$Veel bedrijven in Groningen en Drenthe lopen achter met hun website. Lees waarom dat zo is en wat het je aan klanten kost.$u9sd$,
  focus_keyword = $u9fk$website vernieuwen Groningen$u9fk$,
  tags = ARRAY['verouderde website drenthe', 'website laten maken Groningen', 'lokale bedrijven website'],
  excerpt = $u9ex$Rijd je door plaatsen als Veendam, Hoogeveen, Assen of Stadskanaal, dan zie je genoeg bedrijven die prima draaien: vaste klantenkring, goede naam, jarenlange ervaring. Kijk je vervolgens naar hun website, dan zie je regelmatig iets heel anders: een site die eruitziet alsof hij tien jaar geleden is gebouwd en sindsdien niet meer is aangeraakt. Dat is geen toeval, en er zijn een paar duidelijke redenen voor.$u9ex$
WHERE slug = 'verouderde-websites-groningen-drenthe';

-- 10. checklist-nieuwe-website
UPDATE public.blog_posts SET
  seo_title = $u10st$Checklist: is het tijd voor een nieuwe website?$u10st$,
  seo_description = $u10sd$Twijfel je of je website nog voldoet? Deze checklist met 10 concrete punten laat zien of het tijd is voor een nieuwe website.$u10sd$,
  focus_keyword = $u10fk$nieuwe website nodig$u10fk$,
  tags = ARRAY['website vernieuwen', 'wanneer nieuwe website', 'oude website vervangen'],
  excerpt = $u10ex$Twijfel je of je huidige website nog voldoet, maar weet je niet goed waar je op moet letten? Loop onderstaande checklist langs. Herken je jezelf in meerdere punten, dan is de kans groot dat een vernieuwing zich snel terugbetaalt.$u10ex$
WHERE slug = 'checklist-nieuwe-website';

-- 11. ssl-certificaat-niet-veilig
UPDATE public.blog_posts SET
  seo_title = $u11st$SSL-certificaat: waarom "niet veilig" klanten wegjaagt$u11st$,
  seo_description = $u11sd$Staat er "niet veilig" in de adresbalk van je site? Dat jaagt klanten weg en kost je posities in Google. Lees wat SSL doet en waarom het telt.$u11sd$,
  focus_keyword = $u11fk$ssl certificaat website$u11fk$,
  tags = ARRAY['website niet veilig chrome', 'https website', 'ssl certificaat belangrijk'],
  excerpt = $u11ex$Klik je in Chrome op een website zonder SSL-certificaat, dan staat er letterlijk "niet veilig" naast de adresbalk. Geen kleine waarschuwing, maar een directe boodschap aan elke bezoeker: pas op. Voor een bedrijf dat vertrouwen probeert op te bouwen, is dat een van de slechtste eerste indrukken die je kunt maken.$u11ex$
WHERE slug = 'ssl-certificaat-niet-veilig';

-- 12. backups-website-uitgelegd
UPDATE public.blog_posts SET
  seo_title = $u12st$Website-backups: hoe wij het regelen (en bureaus niet)$u12st$,
  seo_description = $u12sd$Backups worden vaak stilgehouden tot het misgaat. Lees hoe website-backups horen te werken en waarom ze het verschil maken tussen uren en dagen.$u12sd$,
  focus_keyword = $u12fk$website backups$u12fk$,
  tags = ARRAY['backup website belangrijk', 'website herstellen na hack', 'automatische backups'],
  excerpt = $u12ex$Vraag een willekeurig webbureau hoe vaak jouw website wordt geback-upt, en je krijgt verrassend vaak een vaag antwoord. Niet omdat het ingewikkeld is om uit te leggen, maar omdat het antwoord soms simpelweg "eigenlijk nooit" is. Dat komt pas aan het licht op het moment dat het al te laat is: na een hack, een mislukte update, of een simpele menselijke fout.$u12ex$
WHERE slug = 'backups-website-uitgelegd';

-- 13. contactformulier-faalt
UPDATE public.blog_posts SET
  seo_title = $u13st$Contactformulier werkt niet? Zo test je het zelf$u13st$,
  seo_description = $u13sd$Een kapot contactformulier kost je onopgemerkt klanten. Lees waarom dit vaker misgaat dan je denkt en hoe je in een paar minuten checkt of het werkt.$u13sd$,
  focus_keyword = $u13fk$contactformulier werkt niet$u13fk$,
  tags = ARRAY['contactformulier testen', 'formulier verstuurt niet', 'website formulier check'],
  excerpt = $u13ex$Een contactformulier is voor veel bedrijven de belangrijkste plek op de hele website: hier wordt een bezoeker daadwerkelijk een lead. En precies dat onderdeel blijkt in de praktijk verrassend vaak stilletjes kapot te zijn, soms al maandenlang, zonder dat iemand het doorheeft.$u13ex$
WHERE slug = 'contactformulier-faalt';

-- 14. mobile-first-design
UPDATE public.blog_posts SET
  seo_title = $u14st$Mobile-first: 70% van je bezoekers zit op een telefoon$u14st$,
  seo_description = $u14sd$De meeste bezoekers gebruiken een telefoon, geen laptop. Lees wat mobile-first design betekent en waarom het geen keuze meer is maar noodzaak.$u14sd$,
  focus_keyword = $u14fk$mobile-first website$u14fk$,
  tags = ARRAY['website mobiel design', 'mobielvriendelijke website', 'mobile first ontwerpen'],
  excerpt = $u14ex$Bij veel kleine en middelgrote bedrijven komt ruim 70 procent van het websiteverkeer via een mobiele telefoon binnen, vaak nog meer. Toch worden websites nog regelmatig in eerste instantie ontworpen op een groot beeldscherm, waarna de mobiele versie er een beetje achteraf bij wordt gepropt. Dat is precies andersom van hoe het zou moeten.$u14ex$
WHERE slug = 'mobile-first-design';

-- 15. cdn-uitgelegd
UPDATE public.blog_posts SET
  seo_title = $u15st$Wat is een CDN en heb je er als klein bedrijf iets aan?$u15st$,
  seo_description = $u15sd$Een CDN klinkt als iets voor grote techbedrijven. Lees wanneer het ook voor kleine bedrijven zin heeft en wanneer je je geld beter elders steekt.$u15sd$,
  focus_keyword = $u15fk$cdn website$u15fk$,
  tags = ARRAY['content delivery network uitleg', 'cdn kleine bedrijven', 'website versnellen cdn'],
  excerpt = $u15ex$CDN is een van die technische termen die je weleens voorbij ziet komen zonder dat helder is wat het precies inhoudt, of waarom je het als klein bedrijf zou willen. Tijd om dat helder te maken, zonder onnodig jargon.$u15ex$
WHERE slug = 'cdn-uitgelegd';

-- 16. domeinnaam-en-hosting-apart
UPDATE public.blog_posts SET
  seo_title = $u16st$Domeinnaam en hosting scheiden: waarom dat slim is$u16st$,
  seo_description = $u16sd$Domeinnaam en hosting bij één partij lijkt handig, maar kan je vastzetten. Lees waarom scheiden je meer vrijheid en controle geeft.$u16sd$,
  focus_keyword = $u16fk$domeinnaam en hosting scheiden$u16fk$,
  tags = ARRAY['domeinnaam eigen beheer', 'hosting overstappen', 'domeinnaam vastzitten'],
  excerpt = $u16ex$Bij het opzetten van een website kiezen veel bedrijven ervoor om domeinnaam en hosting bij dezelfde partij te regelen. Handig, één factuur, één aanspreekpunt. Wat op korte termijn simpel lijkt, kan op de langere termijn juist voor onnodige afhankelijkheid zorgen.$u16ex$
WHERE slug = 'domeinnaam-en-hosting-apart';

-- 17. laadtijd-en-google-ranking
UPDATE public.blog_posts SET
  seo_title = $u17st$Waarom trage laadtijd je Google-ranking sloopt$u17st$,
  seo_description = $u17sd$Trage laadtijd raakt niet alleen bezoekers, maar ook je positie in Google. Lees hoe snelheid en ranking precies samenhangen.$u17sd$,
  focus_keyword = $u17fk$laadtijd google ranking$u17fk$,
  tags = ARRAY['website snelheid seo', 'trage website google', 'laadtijd verbeteren seo'],
  excerpt = $u17ex$We schreven eerder al over Core Web Vitals, de specifieke meetwaarden die Google gebruikt om snelheid te beoordelen. Maar het bredere verhaal achter waarom snelheid zo zwaar meetelt in Google's algoritme, verdient een eigen uitleg. Het gaat namelijk verder dan alleen die drie technische waarden.$u17ex$
WHERE slug = 'laadtijd-en-google-ranking';

-- 18. cookiebanners-en-avg
UPDATE public.blog_posts SET
  seo_title = $u18st$Cookiebanner en AVG: wat moet er op je website staan?$u18st$,
  seo_description = $u18sd$Veel cookiebanners voldoen niet aan de AVG. Lees wat er minimaal geregeld moet zijn en welke veelgemaakte fouten je moet vermijden.$u18sd$,
  focus_keyword = $u18fk$cookiebanner avg$u18fk$,
  tags = ARRAY['avg website eisen', 'cookiemelding verplicht', 'privacyverklaring website'],
  excerpt = $u18ex$Bijna elke website heeft tegenwoordig een cookiebanner, maar lang niet elke banner voldoet daadwerkelijk aan de regels. We zijn geen juristen en dit artikel is geen juridisch advies, maar wel een praktische uitleg van waar je op moet letten als klein bedrijf.$u18ex$
WHERE slug = 'cookiebanners-en-avg';

-- 19. 404-pagina-en-foutafhandeling
UPDATE public.blog_posts SET
  seo_title = $u19st$Wat een 404-pagina zegt over je webbureau$u19st$,
  seo_description = $u19sd$Een slordige 404-pagina lijkt onbelangrijk, maar verraadt hoe zorgvuldig een site wordt onderhouden. Lees waarom dit detail meer zegt dan je denkt.$u19sd$,
  focus_keyword = $u19fk$404 pagina website$u19fk$,
  tags = ARRAY['foutafhandeling website', 'gebroken links website', 'website foutpagina'],
  excerpt = $u19ex$De 404-pagina, de melding die verschijnt als iemand een niet-bestaande pagina probeert te bezoeken, is misschien wel het meest genegeerde onderdeel van een website. Precies daarom zegt de manier waarop dit is ingericht (of juist niet) veel over hoe zorgvuldig een website en het bureau erachter te werk gaan.$u19ex$
WHERE slug = '404-pagina-en-foutafhandeling';

-- 20. gratis-website-bouwers-kosten
UPDATE public.blog_posts SET
  seo_title = $u20st$Waarom "gratis" website-bouwers je meer kosten$u20st$,
  seo_description = $u20sd$Een gratis website-bouwer lijkt goedkoop, maar brengt verborgen kosten en beperkingen mee. Lees waar je op termijn toch voor betaalt.$u20sd$,
  focus_keyword = $u20fk$gratis website bouwer nadelen$u20fk$,
  tags = ARRAY['gratis website maken nadelen', 'website builder kosten', 'verborgen kosten website'],
  excerpt = $u20ex$Een gratis website in tien minuten in elkaar klikken: het klinkt aantrekkelijk, zeker voor een startend bedrijf met een beperkt budget. Maar "gratis" bij deze bouwers betekent zelden dat er echt geen kosten aan verbonden zijn. Het betekent vaak dat de kosten pas later, en soms onverwacht, naar boven komen.$u20ex$
WHERE slug = 'gratis-website-bouwers-kosten';

-- 21. ai-content-zonder-redactie-seo
UPDATE public.blog_posts SET
  seo_title = $u21st$AI-content zonder redactie: waarom het je SEO schaadt$u21st$,
  seo_description = $u21sd$AI genereert snel content, maar ongeredigeerde teksten kunnen je SEO juist schaden. Lees waarom redactie en eigen kennis onmisbaar blijven.$u21sd$,
  focus_keyword = $u21fk$ai content seo$u21fk$,
  tags = ARRAY['ai teksten seo risico', 'seo teksten schrijven', 'ai gegenereerde content google'],
  excerpt = $u21ex$AI-tools maken het verleidelijk eenvoudig om in een paar minuten tientallen pagina's content te genereren. Snel, goedkoop, en op het eerste gezicht prima leesbaar. Toch zien we steeds vaker dat dit averechts werkt, juist voor SEO, het doel waar de content eigenlijk voor bedoeld was.$u21ex$
WHERE slug = 'ai-content-zonder-redactie-seo';

-- 22. uptime-monitoring-website
UPDATE public.blog_posts SET
  seo_title = $u22st$Uptime-monitoring: waarom offline zijn je klanten kost$u22st$,
  seo_description = $u22sd$Een site die zomaar offline gaat zonder dat iemand het merkt, kost je klanten. Lees waarom uptime-monitoring geen luxe is maar noodzaak.$u22sd$,
  focus_keyword = $u22fk$uptime monitoring website$u22fk$,
  tags = ARRAY['website offline monitoring', 'website uptime bewaken', 'downtime website'],
  excerpt = $u22ex$"O, was de site offline? Dat wisten we niet." Deze zin horen we vaker dan je zou verwachten, en elke keer is het een teken van hetzelfde probleem: niemand houdt actief in de gaten of een website daadwerkelijk bereikbaar is.$u22ex$
WHERE slug = 'uptime-monitoring-website';

-- 23. favicon-meta-titels-og-afbeeldingen
UPDATE public.blog_posts SET
  seo_title = $u23st$Favicon, meta-titels en OG: kleine details, groot effect$u23st$,
  seo_description = $u23sd$Favicon, meta-titels en OG-afbeeldingen worden vaak vergeten, maar bepalen mee of mensen op je klikken en je vertrouwen. Lees waarom ze tellen.$u23sd$,
  focus_keyword = $u23fk$favicon meta titel og afbeelding$u23fk$,
  tags = ARRAY['meta titel optimaliseren', 'og image social media', 'favicon website'],
  excerpt = $u23ex$Sommige onderdelen van een website vallen bijna niemand op als ze goed geregeld zijn, maar juist wel op als ze ontbreken. Favicon, meta-titels en OG-afbeeldingen horen in die categorie thuis: klein, technisch, en toch direct van invloed op hoe professioneel je overkomt.$u23ex$
WHERE slug = 'favicon-meta-titels-og-afbeeldingen';

-- 24. wachtwoorden-delen-whatsapp
UPDATE public.blog_posts SET
  seo_title = $u24st$Deel nooit je website-wachtwoord via WhatsApp$u24st$,
  seo_description = $u24sd$Wachtwoorden delen via WhatsApp of mail voelt handig, maar is een groot beveiligingsrisico. Lees waarom en welke veilige manieren wél werken.$u24sd$,
  focus_keyword = $u24fk$wachtwoorden delen whatsapp$u24fk$,
  tags = ARRAY['website wachtwoord veilig delen', 'inloggegevens veilig versturen', 'wachtwoordbeheer bedrijf'],
  excerpt = $u24ex$"Stuur je me even het wachtwoord van de website via WhatsApp?" Een zin die dagelijks ergens wordt getypt, tussen bedrijven, met een webbouwer, of intern tussen collega's. Het voelt snel en praktisch, maar het is een van de meest onderschatte beveiligingsrisico's voor een website.$u24ex$
WHERE slug = 'wachtwoorden-delen-whatsapp';

-- 25. klantenportaal-tijdsbesparing
UPDATE public.blog_posts SET
  seo_title = $u25st$Hoe een klantenportaal je als ondernemer tijd bespaart$u25st$,
  seo_description = $u25sd$Een klantenportaal is meer dan een mooie extra. Lees hoe het je concreet tijd bespaart op communicatie, planning en administratie.$u25sd$,
  focus_keyword = $u25fk$klantenportaal voordelen$u25fk$,
  tags = ARRAY['klantenportaal ondernemer', 'klantportaal tijdsbesparing', 'klantenportaal website'],
  excerpt = $u25ex$Een klantenportaal wordt vaak gezien als een mooie, moderne toevoeging aan een website, iets voor grotere bedrijven met budget over. In de praktijk is het vooral een praktisch middel dat ondernemers concreet tijd bespaart, ongeacht de grootte van het bedrijf.$u25ex$
WHERE slug = 'klantenportaal-tijdsbesparing';

-- 26. webbureau-reageert-niet-website-terugkrijgen
UPDATE public.blog_posts SET
  seo_title = $u26st$Webbureau reageert niet? Zo krijg je je site terug$u26st$,
  seo_description = $u26sd$Geen reactie van je webbureau en geen toegang tot je eigen site? Lees welke stappen je zet om de controle over je website terug te krijgen.$u26sd$,
  focus_keyword = $u26fk$webbureau reageert niet$u26fk$,
  tags = ARRAY['geen toegang eigen website', 'website terugkrijgen bureau', 'webbureau failliet toegang'],
  excerpt = $u26ex$Een van de vervelendste situaties waar we ondernemers regelmatig uit zien helpen: het huidige webbureau reageert niet meer, terwijl zij wel alle toegang tot de website, hosting en soms zelfs de domeinnaam beheren. Je bent dan feitelijk afhankelijk van een partij die niet meer bereikbaar is, ook wel "gegijzeld" genoemd. Vervelend, maar meestal wel op te lossen.$u26ex$
WHERE slug = 'webbureau-reageert-niet-website-terugkrijgen';

-- 27. structured-data-schema-markup
UPDATE public.blog_posts SET
  seo_title = $u27st$Structured data: onzichtbaar, goud voor Google$u27st$,
  seo_description = $u27sd$Structured data is onzichtbaar voor bezoekers, maar helpt Google je content beter te tonen. Lees wat schema markup is en waarom het loont.$u27sd$,
  focus_keyword = $u27fk$structured data schema markup$u27fk$,
  tags = ARRAY['schema markup website', 'rich snippets google', 'structured data seo'],
  excerpt = $u27ex$Sommige SEO-technieken zie je als bezoeker nooit terug, en toch maken ze een groot verschil in hoe je site presteert in Google. Structured data, ook wel schema markup genoemd, is daar een goed voorbeeld van.$u27ex$
WHERE slug = 'structured-data-schema-markup';
