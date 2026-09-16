-- Blog CMS module: eigen blog_posts-tabel (i.p.v. hardcoded src/lib/blog-posts.ts),
-- RLS zodat alleen admin-achtige rollen schrijven en het publiek alleen
-- gepubliceerde posts leest, een storage-bucket voor uitgelichte afbeeldingen,
-- en een data-migratie van de 10 bestaande hardcoded posts (zie stap 1 van de
-- inventarisatie: content stond in src/lib/blog-posts.ts, geen eigen tabel).
-- Bestaande /blog/<slug> URL's blijven exact hetzelfde (SEO/backlinks).

-- ============================================================
-- 1. Tabel + status-enum
-- ============================================================

CREATE TYPE public.blog_post_status AS ENUM ('draft', 'scheduled', 'published');

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL DEFAULT '',
  featured_image_url text,
  status public.blog_post_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX blog_posts_status_published_at_idx ON public.blog_posts (status, published_at);
CREATE INDEX blog_posts_slug_idx ON public.blog_posts (slug);

-- Hergebruikt de bestaande trigger-functie (zie migratie 20260523183942).
CREATE TRIGGER blog_posts_touch_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============================================================
-- 2. Row Level Security
-- ============================================================

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Publiek (incl. anoniem): alleen posts die echt gepubliceerd EN al voorbij
-- hun published_at zijn (geplande posts blijven verborgen tot de cronjob ze omzet).
CREATE POLICY "public read published blog posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

-- Staff (dezelfde rollen die ook het adminportaal mogen inzien): mogen alle
-- posts lezen, incl. concepten/gepland, voor het overzicht in /admin/blog.
CREATE POLICY "staff read all blog posts"
ON public.blog_posts FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','support_agent','viewer','admin']::public.app_role[]));

-- Alleen admin-achtige rollen (super_admin/co_admin/admin, zelfde set als
-- ADMIN_LIKE_ROLES in src/lib/rbac.ts) mogen aanmaken/wijzigen/verwijderen.
CREATE POLICY "admins manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]));

-- ============================================================
-- 3. Storage-bucket voor uitgelichte afbeeldingen
-- ============================================================
-- Publiek leesbaar (afbeeldingen worden getoond op de live blogpagina's),
-- alleen admin-achtige rollen mogen uploaden/wijzigen/verwijderen.

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public read blog-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'blog-images');

CREATE POLICY "admins upload blog-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images' AND public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]));

CREATE POLICY "admins update blog-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images' AND public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]))
WITH CHECK (bucket_id = 'blog-images' AND public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]));

CREATE POLICY "admins delete blog-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images' AND public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]));

-- ============================================================
-- 4. Data-migratie: bestaande hardcoded posts uit src/lib/blog-posts.ts
-- ============================================================
-- author_id blijft NULL (de oude data had geen gekoppelde auteur). Alle 10
-- posts krijgen status 'published' met hun oorspronkelijke `date` als
-- published_at (tijd 09:00 UTC, arbitrair maar consistent), zodat ze meteen
-- zichtbaar blijven op de live site na de switch naar de database.

INSERT INTO public.blog_posts (title, slug, excerpt, content, status, published_at, created_at, updated_at)
VALUES
($t1$Wat gebeurt er als je WordPress-site gehackt wordt?$t1$, 'wordpress-site-gehackt', $e1$Een gehackte WordPress-site kost je klanten, rankings en vertrouwen. Lees wat er echt gebeurt bij een hack en hoe je dit voorkomt.$e1$, $c1$WordPress draait meer dan 40% van alle websites wereldwijd. Precies daarom is het ook het populairste doelwit voor hackers. Niet omdat WordPress zelf onveilig is, maar omdat er zoveel sites zijn om te scannen dat de kans op een verouderde plugin of een zwak wachtwoord groot is.

Als klein bedrijf denk je misschien: waarom zou iemand mijn site willen hacken? Maar de meeste aanvallen zijn niet persoonlijk. Het zijn geautomatiseerde bots die dag en nacht het internet afstruinen op zoek naar zwakke plekken. Jouw site hoeft niet interessant te zijn, hij hoeft alleen kwetsbaar te zijn.

## Wat er concreet gebeurt bij een hack

**Malware en spam-injectie**
De meest voorkomende hack is stiekeme code die spam-links of malware in je pagina's plaatst. Vaak zie je er zelf niks van, maar Google wel. Je site kan bezoekers doorsturen naar rare webshops of nep-medicijnen, terwijl jouw pagina's er normaal uitzien.

**Google zet je op een zwarte lijst**
Zodra Google malware detecteert, krijg je een waarschuwing in Search Console en in het ergste geval een rode waarschuwingspagina in Chrome: "Deze site kan schadelijk zijn." Bezoekers klikken daar niet doorheen. Je verkeer stort in, vaak binnen een dag.

**Je rankings kelderen**
Zelfs als bezoekers de waarschuwing negeren, straft Google gehackte sites structureel af in de zoekresultaten. Het herstellen van je positie kan weken tot maanden duren, ook nadat het probleem is opgelost.

**Klantgegevens kunnen lekken**
Heb je een contactformulier, een klantenportaal of een webshop? Dan kunnen namen, e-mailadressen en soms betaalgegevens in verkeerde handen vallen. Dat is niet alleen schadelijk voor je reputatie, het kan ook juridische gevolgen hebben onder de AVG.

**Je hostingpakket kan geblokkeerd worden**
Sommige hostingpartijen zetten een gehackte site simpelweg offline om andere klanten op dezelfde server te beschermen. Dan lig je eruit tot je zelf het probleem hebt opgelost, vaak zonder directe hulp van de hoster.

## Waarom WordPress-sites zo vaak kwetsbaar zijn

Het probleem zit zelden in WordPress zelf. Het zit in:

- Verouderde plugins en thema's die niet meer geüpdatet worden
- Zwakke of hergebruikte wachtwoorden voor het wp-admin panel
- Goedkope shared hosting zonder fatsoenlijke beveiligingslagen
- Geen twee-factor-authenticatie op het beheerpaneel
- Nooit gemaakte back-ups, waardoor herstel bijna onmogelijk is

Een website die je vijf jaar geleden hebt laten bouwen en sindsdien niet meer hebt aangeraakt, is in de praktijk een tikkende tijdbom.

## Hoe wij dit bij AIMI aanpakken

Wij bouwen bewust niet standaard op WordPress met tientallen plugins van onbekende makers. Onze sites draaien op een eigen VPS-omgeving met een kleiner en overzichtelijker aanvalsoppervlak. Dat betekent:

- Alleen de code en functionaliteit die je écht nodig hebt, geen stapel plugins die je niet gebruikt
- Regelmatige updates van de onderliggende software
- Beveiligde toegang tot serverbeheer, niet zomaar een openbaar inlogscherm
- Automatische back-ups, zodat herstel een kwestie van minuten is in plaats van dagen
- Monitoring die ons waarschuwt bij verdachte activiteit, vaak voordat jij er iets van merkt

Dat is ook precies waarom [onderhoud na livegang](/blog/onderhoudskosten-na-livegang) geen overbodige luxe is. Een website is geen product dat je eenmalig oplevert, het is infrastructuur die onderhoud nodig heeft zolang hij online staat.

## Wat kun je zelf doen

Ook als je site niet door ons beheerd wordt:

1. Update WordPress, thema's en plugins zodra er een update beschikbaar is
2. Gebruik een uniek, sterk wachtwoord voor je beheerpaneel en zet twee-factor-authenticatie aan
3. Verwijder plugins en thema's die je niet meer gebruikt, ook als ze uitgeschakeld zijn
4. Zorg voor automatische, losstaande back-ups (niet alleen bij je hostingpartij)
5. Laat je site periodiek controleren op kwetsbaarheden

Twijfel je of jouw site kwetsbaar is? Met onze [gratis website-checker](/website-checker) zie je in een paar minuten waar de risico's zitten.$c1$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t2$Website-snelheid: waarom Core Web Vitals je meer klanten opleveren$t2$, 'core-web-vitals-website-snelheid', $e2$Een trage website kost je bezoekers én omzet. Ontdek wat Core Web Vitals zijn en waarom snelheid direct invloed heeft op je aantal klanten.$e2$, $c2$Je hebt maar een paar seconden om een bezoeker vast te houden. Duurt het laden van je website te lang, dan is diegene alweer weg voordat hij ook maar één woord van je aanbod heeft gelezen. Dat is niet alleen vervelend, het kost je direct klanten en het schaadt je positie in Google.

## Wat zijn Core Web Vitals precies?

Core Web Vitals zijn drie meetbare waarden die Google gebruikt om de gebruikerservaring van een website te beoordelen:

**LCP (Largest Contentful Paint)**
Hoe lang duurt het voordat het grootste zichtbare element op je pagina (meestal een afbeelding of kop) volledig geladen is. Dit zou binnen 2,5 seconden moeten gebeuren.

**INP (Interaction to Next Paint)**
Hoe snel reageert je site als iemand ergens op klikt of tikt. Voelt een knop traag aan, dan haakt een bezoeker sneller af. Dit zou onder de 200 milliseconden moeten blijven.

**CLS (Cumulative Layout Shift)**
Hoe stabiel is je pagina tijdens het laden. Ken je dat gevoel dat je op een knop wilt klikken en de pagina op het laatste moment verspringt, waardoor je per ongeluk iets anders aanklikt? Dat is precies wat CLS meet.

## Waarom dit direct met omzet te maken heeft

Onderzoek van onder andere Google zelf laat structureel zien dat de kans dat een bezoeker een pagina verlaat flink oploopt zodra de laadtijd voorbij de 3 seconden gaat. Elke seconde vertraging kost je zichtbaar conversie, zeker op mobiel.

Denk aan een concreet voorbeeld: een lokale aannemer met een offerteformulier op zijn site. Als dat formulier traag laadt of bij het invullen hapert, stapt de bezoeker over naar de volgende aannemer in de zoekresultaten. Die overstap kost je niet zomaar een bezoeker, het kost je een opdracht.

## Snelheid is ook een rankingfactor

Google gebruikt Core Web Vitals als onderdeel van de beoordeling van je site. Bij twee vergelijkbare websites met vergelijkbare content wint de snellere, stabielere site het net iets vaker in de zoekresultaten. Zeker op mobiel, waar Google al jaren mobile-first indexeert, telt snelheid zwaar mee.

## Waarom veel websites traag zijn

- Te zware, ongecomprimeerde afbeeldingen
- Overvolle pagina's met tientallen plugins en externe scripts
- Goedkope shared hosting die traag reageert onder belasting
- Slecht geoptimaliseerde code uit templates die voor alles en niets gebouwd zijn
- Lettertypes en advertentiescripts die van externe servers geladen worden

Veel van dit soort problemen stapelen zich op na jaren van kleine aanpassingen: een plugin hier, een widget daar. Losse ingrepen, samen een trage site.

## Hoe wij hiermee omgaan

Bij AIMI bouwen we sites zonder overbodige laag op laag aan plugins. We hosten op eigen infrastructuur (een VPS bij Hetzner), comprimeren afbeeldingen automatisch en houden de codebase bewust licht. Het resultaat is een site die niet alleen prettig aanvoelt voor bezoekers, maar ook goed scoort op de metingen die Google gebruikt.

Wil je weten hoe jouw huidige site scoort op deze punten? Onze [gratis website-checker](/website-checker) laat in een paar minuten zien waar de snelheid van jouw site tegen aanloopt.$c2$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t3$Self-hosten op een VPS: is dat ook iets voor kleine bedrijven?$t3$, 'vps-hosting-kleine-bedrijven', $e3$VPS-hosting klinkt technisch, maar levert kleine bedrijven vaak een snellere, veiligere en goedkopere website op dan gedeelde hosting. Lees waarom.$e3$, $c3$Als je aan hosting denkt, denk je waarschijnlijk aan een pakketje bij een grote hostingpartij: een paar euro per maand, een controlepaneel met veel knoppen, klaar. Dat heet shared hosting, en voor een simpele visitekaartjessite werkt het vaak prima. Maar zodra je site meer moet doen, of gewoon betrouwbaarder moet zijn, loop je snel tegen de grenzen aan.

## Wat is een VPS eigenlijk?

VPS staat voor Virtual Private Server. In plaats van dat je website een klein hoekje deelt met honderden andere sites op dezelfde fysieke server (zoals bij shared hosting), krijg je je eigen afgeschermde stukje serverruimte met vaste rekenkracht en geheugen. Niemand anders kan die capaciteit van je afpakken, ook niet als een buurwebsite ineens veel bezoekers trekt.

## Waarom shared hosting vaak tegenvalt

Bij shared hosting deel je de server met vaak honderden andere websites. Krijgt een van die sites plotseling veel verkeer, bijvoorbeeld door een virale post, dan voel jij dat ook: je eigen site wordt trager, soms zelfs tijdelijk onbereikbaar. Daarnaast heb je weinig controle over beveiligingsinstellingen en ben je afhankelijk van wat de hostingpartij standaard aanbiedt.

## De voordelen van een VPS voor een klein bedrijf

**Snelheid die niet afhangt van je buren**
Omdat je eigen capaciteit hebt, blijft je site stabiel, ook als het ergens anders op de server druk is.

**Betere beveiliging**
Een VPS geeft meer controle over wie en wat toegang heeft. Dat maakt het lastiger voor kwaadwillenden om via een omweg bij jouw site te komen.

**Ruimte om mee te groeien**
Begin je met een simpele website en wil je later een klantenportaal, een boekingssysteem of een webshop toevoegen? Op een VPS kan dat zonder dat je meteen naar een compleet nieuwe hostingoplossing hoeft over te stappen.

**Vaak voordeliger dan gedacht**
Het klinkt alsof een VPS duurder moet zijn dan een standaard hostingpakket, maar in de praktijk vallen de kosten vaak mee, zeker als je bedenkt wat je aan stabiliteit en veiligheid terugkrijgt.

## Is dit dan iets om zelf te gaan beheren?

Hier zit de eerlijke kanttekening: een VPS vereist wel wat technische kennis. Je moet zelf (of via een partij die dat voor je doet) software up-to-date houden, back-ups regelen en beveiliging inrichten. Voor een ondernemer die zelf een webshop wil runnen zonder zich zorgen te maken over serverbeheer, is dat vaak niet de meest praktische route.

Daarom kiezen wij er bij AIMI voor om dit onderdeel volledig uit handen te nemen. Wij draaien onze klantprojecten op onze eigen VPS-infrastructuur (Hetzner) en regelen alles eromheen als onderdeel van ons [onderhoud & hosting](/onderhoud-hosting): updates, back-ups, monitoring en beveiliging. Jij krijgt de voordelen van een VPS zonder het beheer.

## Kortom

Voor een kleine flyer-site die je nooit meer aanraakt, is shared hosting misschien voldoende. Maar zodra je website belangrijk is voor je omzet, of je wilt uitbreiden met een klantenportaal of webshop, is een VPS-omgeving een stuk toekomstbestendiger. Het verschil zit hem niet in hype rond technologie, maar in stabiliteit, snelheid en controle op de lange termijn.

Benieuwd hoe jouw huidige hosting scoort? Check het met onze [gratis website-checker](/website-checker).$c3$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t4$Gratis website-checker: wat wij precies controleren en waarom$t4$, 'gratis-website-checker-uitleg', $e4$Onze gratis website-checker scant snelheid, beveiliging en SEO in een paar minuten. Lees wat er precies gecontroleerd wordt en waarom dat telt.$e4$, $c4$De meeste ondernemers weten niet hoe hun website er écht voor staat. Hij ziet er mooi uit, dus dat zal wel goed zijn, toch? Niet per se. Een website kan er visueel prima uitzien en tegelijk traag laden, kwetsbaar zijn voor hacks of slecht scoren in Google. Daarom hebben we een gratis website-checker gebouwd: een snelle, onafhankelijke scan die laat zien waar je site staat.

## Waarom we dit gratis aanbieden

Simpel: veel bedrijven weten niet eens dat er een probleem is, laat staan dat ze weten wat ze eraan kunnen doen. Door dit gratis en drempelloos te maken, kun je zelf zien of het de moeite waard is om verder te kijken, zonder dat je daar meteen een gesprek of offerte voor nodig hebt.

## Wat de checker precies controleert

**Snelheid en laadtijd**
We meten hoe snel je pagina's laden, zowel op desktop als mobiel, en kijken naar de Core Web Vitals: LCP, INP en CLS. Dit zijn dezelfde waarden die Google gebruikt om je site te beoordelen.

**Beveiliging**
We checken of je site een geldig SSL-certificaat heeft, of er verouderde software-versies zichtbaar zijn, en of er voor de hand liggende kwetsbaarheden zijn die vaak bij hacks worden misbruikt.

**Mobielvriendelijkheid**
Meer dan de helft van al het webverkeer komt via mobiel. We controleren of je site goed schaalt, of tekst leesbaar is zonder inzoomen, en of knoppen makkelijk aan te klikken zijn.

**Basis-SEO**
We kijken naar paginatitels, meta-omschrijvingen, koppenstructuur en of zoekmachines je pagina's goed kunnen lezen en indexeren.

**Technische basis**
We controleren of belangrijke technische zaken op orde zijn, zoals een werkende sitemap, correcte doorverwijzingen en of er gebroken links te vinden zijn.

## Wat je met de uitkomst kunt doen

Na de scan krijg je een overzicht van wat goed gaat en waar verbeterpunten zitten, in normale taal, niet in onbegrijpelijk technisch jargon. Sommige punten kun je zelf oppakken, bijvoorbeeld een verouderde plugin updaten. Voor andere punten, zoals structurele snelheidsproblemen of beveiligingsrisico's, is meer werk nodig.

We gebruiken de checker niet om je iets aan te smeren. Als je site er prima voor staat, zullen we dat ook gewoon zeggen. Loopt je site echter tegen dezelfde problemen aan als in onze artikelen over [gehackte WordPress-sites](/blog/wordpress-site-gehackt) of [trage Core Web Vitals](/blog/core-web-vitals-website-snelheid), dan weet je in elk geval concreet waar je aan toe bent.

## Voor wie is dit bedoeld?

Voor elk klein of middelgroot bedrijf dat wil weten of de website nog meedoet, of dat inmiddels wat is achtergebleven. Vooral relevant als:

- Je site al een paar jaar niet is aangepast
- Je twijfelt of je site wel snel genoeg is
- Je niet zeker weet of je site nog veilig is
- Je merkt dat je minder goed vindbaar bent dan vroeger

Wil je weten waar jouw website staat? Doe de [gratis website-check](/website-checker) en je hebt binnen een paar minuten duidelijkheid.$c4$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t5$Google Business Profile: 5 fouten die lokale bedrijven maken$t5$, 'google-business-profile-fouten', $e5$Een slecht ingericht Google Business Profile kost je lokale klanten. Dit zijn de 5 meest voorkomende fouten en hoe je ze oplost.$e5$, $c5$Zoek je op Google naar "loodgieter Assen" of "kapper Hoogeveen", dan krijg je eerst een kaartje met drie bedrijven te zien, nog vóór de gewone zoekresultaten. Dat kaartje komt uit Google Business Profile (voorheen Google Mijn Bedrijf). Voor lokale bedrijven is dit vaak de belangrijkste plek om gevonden te worden, maar veel profielen worden slecht bijgehouden. Dit zijn de vijf fouten die we het vaakst tegenkomen.

## 1. Onvolledige of verouderde informatie

Een profiel met een oud adres, verkeerde openingstijden of een telefoonnummer dat niet meer werkt, kost je direct klanten. Iemand die op zaterdag langsrijdt omdat Google zegt dat je open bent, terwijl je dicht bent, komt niet snel meer terug. Zorg dat naam, adres, telefoonnummer, openingstijden en website altijd kloppen, ook tijdens feestdagen en vakanties.

## 2. Verkeerde of te brede categorie

Veel bedrijven kiezen bij het aanmaken van hun profiel een algemene categorie, bijvoorbeeld "bedrijf" in plaats van "elektricien" of "schoonheidssalon". Google gebruikt deze categorie om te bepalen bij welke zoekopdrachten je getoond wordt. Een verkeerde categorie betekent dat je simpelweg niet verschijnt bij de zoekopdrachten waar je klanten wel naar zoeken.

## 3. Geen (of nauwelijks) reviews

Reviews zijn een van de sterkste signalen voor zowel potentiële klanten als voor Google zelf. Een profiel zonder reviews, of met een paar oude reacties, wekt weinig vertrouwen. Vraag actief aan tevreden klanten om een review achter te laten, bijvoorbeeld met een directe link die je na een afgeronde klus of aankoop deelt. En reageer op reviews, ook op negatieve. Dat laat zien dat er een actief bedrijf achter het profiel zit.

## 4. Geen (of slechte) foto's

Bedrijven met foto's van hun pand, team en werk krijgen aantoonbaar meer aanvragen om een routebeschrijving en meer clicks naar de website dan bedrijven zonder foto's, of met alleen een logo. Zorg voor recente, scherpe foto's: je pand van buiten, je team aan het werk, voorbeelden van geleverd werk. Vermijd stockfoto's, die vallen door de mand en voegen weinig toe.

## 5. Profiel wordt na het aanmaken nooit meer aangeraakt

Dit is misschien wel de meest voorkomende fout: het profiel wordt één keer ingericht en daarna nooit meer bijgewerkt. Google beloont actieve profielen. Regelmatig een update plaatsen, nieuwe foto's toevoegen, reageren op vragen en reviews, dat houdt je profiel relevant in de ogen van Google én van potentiële klanten.

## Waarom dit samenhangt met je website

Een goed ingericht Google Business Profile stuurt bezoekers naar je website. Komt die bezoeker vervolgens op een trage, verouderde site terecht, dan haakt hij alsnog af. Lokale vindbaarheid en een goede website gaan hand in hand, het een zonder het ander levert weinig op.

Twijfel je of je website die klik vanuit Google Business Profile wel goed opvangt? Laat het checken met onze [gratis website-checker](/website-checker).$c5$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t6$Waarom "mooi" niet hetzelfde is als "converteert" op je website$t6$, 'mooi-versus-converteert', $e6$Een mooie website levert niet automatisch klanten op. Lees waarom design en conversie twee verschillende dingen zijn en hoe je ze combineert.$e6$, $c6$"Onze nieuwe website is echt heel mooi geworden." We horen deze zin vaak, en het is meestal ook waar. Maar een paar weken later volgt regelmatig de vraag: waarom komen er dan geen aanvragen binnen? Mooi en effectief zijn namelijk niet hetzelfde, en die verwarring kost bedrijven onnodig veel omzet.

## Wat "mooi" oplevert

Een strak vormgegeven website met goede fotografie en een consistente huisstijl doet wel degelijk iets: het bouwt vertrouwen op. Bezoekers denken onbewust: als de website er professioneel uitziet, zal het bedrijf er ook wel professioneel zijn. Dat is een reëel effect en zeker niet onbelangrijk.

## Waarom mooi alleen niet genoeg is

Het probleem ontstaat wanneer design losstaat van doel. Een site kan er strak uitzien en toch:

- Geen duidelijke actie aanbieden (bel ons, vraag een offerte aan, plan een afspraak)
- Bezoekers laten zoeken naar informatie die eigenlijk meteen zichtbaar zou moeten zijn
- Zoveel nadruk leggen op vormgeving dat de boodschap ondersneeuwt
- Traag laden omdat er te veel zware beeldmaterialen gebruikt zijn
- Niet aansluiten op wat een bezoeker daadwerkelijk zoekt als hij op de site landt

Een prachtige homepage met een grote sfeerfoto en weinig tekst oogt fantastisch, maar als een bezoeker binnen vijf seconden niet snapt wat je doet en wat hij moet doen, is hij weer weg.

## Wat conversiegericht ontwerpen wél doet

Conversiegericht ontwerpen begint niet bij "hoe ziet dit eruit", maar bij "wat moet een bezoeker hier doen, en helpt deze pagina hem daarbij". Concreet betekent dat:

**Een duidelijke, enkele hoofdactie per pagina**
Niet tien knoppen die allemaal om aandacht vragen, maar één duidelijke volgende stap: bel, mail, vraag een offerte aan.

**Informatie op de plek waar iemand hem zoekt**
Prijsindicatie, openingstijden, contactgegevens: dingen die een bezoeker snel wil vinden, moeten niet drie klikken diep weggestopt zitten.

**Vertrouwen opbouwen zonder overdrijven**
Reviews, concrete voorbeelden van werk, duidelijke uitleg van je proces. Geen overdreven beloftes, wel duidelijkheid.

**Snelheid en bruikbaarheid**
Zoals we eerder schreven over [Core Web Vitals](/blog/core-web-vitals-website-snelheid): een trage of hakkelige site zorgt ervoor dat zelfs het mooiste ontwerp zijn werk niet kan doen.

## Design en conversie zijn geen tegenstelling

Het gaat niet om design óf conversie, het gaat om beide tegelijk. Een strak ontworpen site die ook nog eens duidelijk stuurt naar een actie, is de sterkste combinatie die er is. Het probleem ontstaat pas wanneer vormgeving een doel op zich wordt in plaats van een middel om een bezoeker te helpen de juiste keuze te maken.

## Hoe je dit checkt op je eigen site

Stel jezelf bij elke belangrijke pagina de vraag: als een onbekende bezoeker hier voor het eerst landt, weet hij dan binnen enkele seconden wat we doen, voor wie, en wat de volgende stap is? Kun je die vraag niet met een volmondig ja beantwoorden, dan is er ruimte voor verbetering, ongeacht hoe mooi de site eruitziet.

Wil je weten hoe jouw website hierop scoort? Onze [gratis website-checker](/website-checker) geeft je een eerlijk beeld.$c6$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t7$Wat kost onderhoud na livegang écht?$t7$, 'onderhoudskosten-na-livegang', $e7$Een website is nooit "af" na livegang. Lees wat onderhoud in de praktijk inhoudt, wat het kost en waarom dit vaak wordt onderschat.$e7$, $c7$"Mijn website staat live, klaar is Kees." Deze gedachte klopt helaas zelden. Een website is geen folder die je één keer drukt en daarna nooit meer aanraakt, het is een stukje online infrastructuur dat blijft draaien, en dus ook onderhoud vraagt. Wat dat onderhoud precies inhoudt en wat het realistisch kost, blijft echter vaak vaag. Daarom hier een concreet overzicht.

## Waarom onderhoud nodig blijft

Software staat nooit stil. Plugins, thema's, servers en beveiligingsstandaarden veranderen continu. Wat vandaag veilig en snel is, kan over een jaar verouderd zijn. Daarnaast verandert je bedrijf: nieuwe diensten, andere openingstijden, aangepaste prijzen. Als niemand de website bijhoudt, loopt hij langzaam maar zeker achter op de werkelijkheid.

## Concrete voorbeelden van wat onderhoud inhoudt

**Technisch onderhoud**
Updates van de onderliggende software, controle op kwetsbaarheden, monitoring of de site nog goed bereikbaar is, en het beheren van back-ups. Dit is vaak het minst zichtbare deel, maar wel het deel dat een [hack](/blog/wordpress-site-gehackt) voorkomt.

*Voorbeeld:* een kleine kwetsbaarheid in een verouderde plugin wordt zonder onderhoud pas ontdekt als de site al gehackt is. Met regelmatig onderhoud wordt die plugin al bijgewerkt voordat het een probleem wordt.

**Inhoudelijke aanpassingen**
Nieuwe teksten, aangepaste prijzen, een nieuwe medewerker op de teampagina, een gewijzigd telefoonnummer. Klein werk, maar het stapelt zich op als het nooit gebeurt.

*Voorbeeld:* een bedrijf verhoogt zijn tarieven, maar vergeet de prijspagina aan te passen. Klanten die bellen op basis van een verouderde prijs, voelen zich bekocht nog voor het gesprek is begonnen.

**Monitoring en snelheid**
Bijhouden of de site nog snel genoeg laadt, of er geen fouten optreden, en of formulieren nog werken zoals ze zouden moeten.

*Voorbeeld:* een contactformulier stopt stilletjes met werken door een update ergens anders op de site. Zonder monitoring merk je dit pas als een klant je erop wijst, of nooit.

**SEO-bijstelling**
Zoekmachines veranderen hun beoordelingscriteria voortdurend. Content die vandaag goed scoort, kan over een jaar achterblijven bij concurrenten die wel actief aan hun SEO werken.

## Wat kost dit in de praktijk?

De kosten variëren sterk per situatie, maar een paar vuistregels helpen om het te plaatsen:

- **Minimaal onderhoud** (alleen updates en beveiliging): meestal een klein vast bedrag per maand, vergelijkbaar met een hostingpakket
- **Actief onderhoud** (updates, kleine aanpassingen, monitoring): een middelgroot vast bedrag per maand, afhankelijk van hoeveel wijzigingen je verwacht
- **Doorlopende groei** (nieuwe content, SEO-optimalisatie, functionaliteit toevoegen): dit wordt vaak per uur of in een groter maandbedrag afgesproken, omdat de omvang varieert

Belangrijker dan het exacte bedrag is het besef dat structureel onderhoud vrijwel altijd goedkoper is dan de kosten van een hack, een lange periode van dalende vindbaarheid, of een site die na een jaar alweer helemaal vernieuwd moet worden omdat niemand hem heeft bijgehouden.

## Waarom wij hier transparant over zijn

Bij AIMI bouwen we sites op eigen infrastructuur, juist om onderhoud behapbaar en voorspelbaar te houden. Geen verrassingen achteraf, geen onduidelijke facturen voor werk dat niemand zag aankomen. We leggen vooraf uit wat je kunt verwachten, en waarom.

Meer weten over onze onderhoudsopties? Bekijk de [onderhoud & hosting-pagina](/onderhoud-hosting) voor de exacte tarieven en wat erin zit.$c7$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t8$Webshop vs. gewone website: wanneer heb je een webshop nodig?$t8$, 'webshop-vs-gewone-website', $e8$Niet elk bedrijf heeft een webshop nodig. Lees wanneer een webshop wél zin heeft en wanneer een gewone website juist beter werkt.$e8$, $c8$"Moeten we niet gewoon een webshop laten bouwen?" Een vraag die we vaak horen, meestal zonder dat er goed is nagedacht of dat eigenlijk wel nodig is. Een webshop is namelijk geen upgrade van een gewone website, het is een ander soort systeem, met andere kosten, ander beheer en andere verwachtingen. Niet elk bedrijf is erbij gebaat.

## Wat een gewone website wél en niet doet

Een [reguliere website](/website-laten-maken) is in de basis een digitaal visitekaartje: wie je bent, wat je doet, hoe je te bereiken bent. Voor dienstverleners zoals aannemers, adviseurs, kappers of praktijken is dit vaak precies genoeg. De website zorgt voor vindbaarheid en vertrouwen, en de daadwerkelijke transactie (een afspraak, een offerte, een behandeling) gebeurt via een telefoontje, mail of persoonlijk contact.

## Wat een webshop toevoegt (en vraagt)

Een [webshop](/webshop-laten-maken) voegt een compleet verkoopproces toe: productcatalogus, winkelwagen, betaalmethodes, voorraadbeheer, verzendopties en vaak ook retourprocessen. Dat klinkt logisch als je fysieke producten verkoopt, maar het brengt ook flink wat extra verantwoordelijkheid met zich mee:

- Voorraad moet actueel blijven, anders verkoop je producten die niet meer op voorraad zijn
- Betaalmethodes moeten veilig en betrouwbaar geïntegreerd zijn
- Verzendkosten en -tijden moeten kloppen
- Klantenservice rond bestellingen, retouren en klachten vraagt structuur
- De technische kant (beveiliging, updates, prestaties) is complexer dan bij een reguliere site

## Wanneer een webshop wél zinvol is

- Je verkoopt fysieke of digitale producten die iemand direct online kan afrekenen
- Klanten verwachten dat ze zonder tussenkomst kunnen bestellen (denk aan kleding, sieraden, cosmetica, voedingsproducten)
- Je huidige verkoop verloopt al goed via bijvoorbeeld Instagram of Marktplaats, en een eigen webshop geeft je meer controle en minder afhankelijkheid van die platformen
- Je wilt schaalbaar groeien zonder dat elke verkoop persoonlijk contact vereist

## Wanneer een gewone website beter past

- Je verkoopt vooral diensten (advies, installatie, behandelingen, onderhoud)
- Elke klant heeft toch een vorm van maatwerk of persoonlijk contact nodig voordat er iets wordt afgesproken
- Je bent een lokaal bedrijf waarbij vertrouwen en persoonlijk contact een grotere rol spelen dan directe online verkoop
- Je hebt nog geen bewezen vraag naar online bestellen, en wilt niet investeren in beheer van iets dat misschien weinig gebruikt wordt

## Een tussenweg: een website met beperkte online bestelmogelijkheid

Niet alles hoeft zwart-wit te zijn. Denk aan een boekingssysteem voor afspraken, een offerteaanvraag met directe prijsindicatie, of een beperkte "bestel vooraf"-functie zonder de volledige complexiteit van een webshop. Dit geeft klanten wel een stukje gemak, zonder dat je meteen alle uitdagingen van een volwaardige webshop op je bord krijgt.

## Onze aanpak

Bij AIMI bespreken we dit altijd eerlijk vooraf. Een webshop bouwen omdat het kan, terwijl het je bedrijfsmodel niet nodig heeft, kost je onnodig geld aan bouw en onderhoud. We kijken naar wat je daadwerkelijk verkoopt en hoe klanten dat nu al afnemen, en adviseren op basis daarvan of een webshop meerwaarde heeft of dat een goed ingerichte reguliere website een beter startpunt is.

Twijfel je wat voor jouw bedrijf de juiste keuze is? [Neem contact op](/contact), dan denken we vrijblijvend met je mee.$c8$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t9$Waarom lokale bedrijven in Groningen en Drenthe vaak een verouderde website hebben$t9$, 'verouderde-websites-groningen-drenthe', $e9$Veel bedrijven in Groningen en Drenthe lopen achter met hun website. Lees waarom dat zo is en wat het je aan klanten kost.$e9$, $c9$Rijd je door plaatsen als Veendam, Hoogeveen, Assen of Stadskanaal, dan zie je genoeg bedrijven die prima draaien: vaste klantenkring, goede naam, jarenlange ervaring. Kijk je vervolgens naar hun website, dan zie je regelmatig iets heel anders: een site die eruitziet alsof hij tien jaar geleden is gebouwd en sindsdien niet meer is aangeraakt. Dat is geen toeval, en er zijn een paar duidelijke redenen voor.

## Mond-tot-mondreclame werkte lang goed genoeg

In deze regio draait veel op vertrouwen en aanbevelingen. Je buurman kent een goede loodgieter, je collega raadt een boekhouder aan. Voor bedrijven die al jaren op deze manier klanten krijgen, voelde een goede website lange tijd als een overbodige investering. Waarom geld steken in iets online als de telefoon toch al roodgloeiend staat via via?

## De website is er wel, maar niemand houdt hem bij

Veel bedrijven hebben ooit wél een website laten maken, vaak door een neef, een vriend, of een goedkope bouwer die het er even bij deed. Die website staat er nog steeds, maar niemand heeft ooit de moeite genomen om hem up-to-date te houden. Zoals we eerder schreven over [onderhoud na livegang](/blog/onderhoudskosten-na-livegang), is dat precies waar het misgaat: een website zonder onderhoud veroudert razendsnel, technisch én inhoudelijk.

## Vergrijzing van de doelgroep, niet van de klant

Een veelgehoorde aanname is dat "onze klanten toch niet online zoeken". Dat klopt steeds minder. Ook in Groningen en Drenthe zoeken mensen tegenwoordig eerst op Google voordat ze een bedrijf bellen, ongeacht leeftijd. De verwachting dat oudere doelgroepen geen internet gebruiken, klopt in de praktijk simpelweg niet meer.

## Minder concurrentiedruk dan in de Randstad

In een grote stad met tientallen concurrerende bedrijven in dezelfde branche voel je de druk om online zichtbaar te zijn sneller. In kleinere plaatsen met minder directe concurrentie ontbreekt die druk soms, waardoor bedrijven langer wegkomen met een verouderde site, tot een concurrent wél investeert en ineens duidelijk beter vindbaar is.

## Wat dit concreet kost

Een verouderde website betekent in de praktijk:

- Slechtere posities in Google ten opzichte van concurrenten die wel actief aan hun site werken
- Minder vertrouwen bij nieuwe klanten die je voor het eerst online tegenkomen
- Een groter risico op [beveiligingsproblemen](/blog/wordpress-site-gehackt) door verouderde software
- Gemiste kansen bij zoekopdrachten in de eigen regio, zoals "loodgieter Assen" of "kapper Hoogeveen"

## De kans die hierin zit

Het goede nieuws: omdat veel lokale bedrijven achterlopen, is de concurrentie op lokaal niveau vaak minder scherp dan je zou denken. Een bedrijf dat wél investeert in een snelle, moderne en goed vindbare website, springt er in deze regio's relatief snel bovenuit. Je hoeft niet te concurreren met de hele Randstad, alleen met de andere bedrijven in jouw plaats of regio.

## Onze insteek

Wij zijn zelf gevestigd in deze regio en kennen de manier van zakendoen hier: nuchter, zonder overdreven poeha, gebaseerd op vertrouwen. Precies daarom bouwen we [websites op maat](/webdesign) die dat vertrouwen online overbrengen, zonder overdreven marketingtaal, wel met een moderne, snelle en veilige basis.

Wil je weten hoe jouw website er nu voor staat ten opzichte van concurrenten in de buurt? Doe de [gratis website-checker](/website-checker) en bekijk het zelf.$c9$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z'),
($t10$Checklist: is het tijd voor een nieuwe website?$t10$, 'checklist-nieuwe-website', $e10$Twijfel je of je website nog voldoet? Deze checklist met 10 concrete punten laat zien of het tijd is voor een nieuwe website.$e10$, $c10$Twijfel je of je huidige website nog voldoet, maar weet je niet goed waar je op moet letten? Loop onderstaande checklist langs. Herken je jezelf in meerdere punten, dan is de kans groot dat een vernieuwing zich snel terugbetaalt.

## 1. Je website is ouder dan 4 à 5 jaar

Webdesign, technologie en gebruikersverwachtingen veranderen snel. Wat vijf jaar geleden modern was, oogt nu vaak gedateerd, zowel visueel als technisch.

## 2. Je site laadt merkbaar traag

Moet je zelf even wachten als je je eigen website opent op je telefoon? Dan doen je bezoekers dat ook, en die wachten meestal niet. Zoals we eerder schreven bij [Core Web Vitals](/blog/core-web-vitals-website-snelheid), heeft snelheid direct invloed op hoeveel klanten je binnenhaalt.

## 3. Je website is niet prettig te gebruiken op mobiel

Test je site eens zelf op je telefoon. Moet je inzoomen om tekst te lezen? Zijn knoppen lastig aan te klikken? Meer dan de helft van je bezoekers komt via mobiel binnen, dus dit is geen bijzaak.

## 4. Je weet niet zeker of je site nog veilig is

Heb je geen idee wanneer de website voor het laatst is bijgewerkt, of wie er nog toegang toe heeft? Dat is een signaal dat onderhoud ontbreekt, met alle risico's van dien.

## 5. Je website vertelt niet meer wat je nu écht doet

Bedrijven veranderen: nieuwe diensten, andere doelgroep, ander aanbod. Een website die nog het verhaal van vijf jaar geleden vertelt, sluit niet meer aan op wat je vandaag verkoopt.

## 6. Bezoekers weten niet wat ze moeten doen

Land je zelf op je homepage en is het niet meteen duidelijk wat de volgende stap is (bellen, offerte aanvragen, afspraak maken)? Dan is de kans groot dat bezoekers hetzelfde ervaren en simpelweg wegklikken. We schreven hier uitgebreider over in [waarom mooi niet hetzelfde is als converteert](/blog/mooi-versus-converteert).

## 7. Je scoort slecht of onvindbaar in Google

Zoek eens op je eigen dienst plus je woonplaats. Sta je nergens te bekennen, terwijl concurrenten wel bovenaan staan? Dat is een directe indicatie dat je website (en de SEO eromheen) achterloopt.

## 8. Je Google Business Profile en website sluiten niet op elkaar aan

Klopt de informatie op je Google-profiel niet meer met je website, of andersom? Dat wekt weinig vertrouwen. Zie ook onze tips over [veelgemaakte fouten in Google Business Profile](/blog/google-business-profile-fouten).

## 9. Je wilt functionaliteit toevoegen die nu simpelweg niet kan

Denk aan een boekingssysteem, een klantenportaal, of misschien zelfs een webshop. Oudere websites zijn vaak gebouwd op verouderde systemen die dit soort uitbreidingen lastig of onmogelijk maken.

## 10. Je concurrenten zien er online beter uit dan jij

Als klanten voordat ze contact opnemen eerst even googelen (en dat doen ze bijna altijd), en de concurrent daar een sterkere indruk achterlaat, verlies je opdrachten nog voordat je de kans krijgt om je diensten toe te lichten.

## Wat nu?

Herken je jezelf in drie of meer punten hierboven? Dan is het waarschijnlijk tijd om serieus naar een nieuwe website te kijken. Dat hoeft niet meteen te betekenen dat alles overnieuw moet, soms is een gerichte vernieuwing van de belangrijkste pagina's al genoeg.

Wil je eerst objectief zien waar je site precies staat? Doe de [gratis website-checker](/website-checker), of lees direct verder over de mogelijkheden op onze pagina over [je website laten vernieuwen](/website-laten-vernieuwen).$c10$, 'published', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z', '2026-09-16T09:00:00Z');
