# On-page SEO — aimi-development.nl

**Datum:** 2026-09-21 · **Basis:** verse crawl van alle sitemap-URL's (`crawl-data.json`, 70 entries / 60 unieke pagina's, allemaal HTTP 200)

---

## Wat goed gaat

Dit is de sterkste categorie van de site. De volgende punten zijn over alle 60 unieke pagina's gecontroleerd en kloppen zonder uitzondering:

- **Canonicals**: elke pagina heeft een self-referencing canonical. Nul ontbrekende, nul mismatches.
- **H1**: precies één H1 per pagina. Geen enkele pagina met nul of meerdere.
- **Kopstructuur**: geen enkele overgeslagen niveausprong (geen h1→h3) en geen enkele lege kop.
- **Meta-descriptions**: alle 60 tussen 70 en 160 tekens. Geen ontbrekende.
- **Open Graph / Twitter**: `og:title`, `og:description`, `og:image` en `twitter:card` op alle pagina's aanwezig. `og-image.png` geeft HTTP 200 (62 KB PNG).
- **Taal**: `lang="nl"` op alle pagina's, consistent. Geen hreflang — correct voor een eentalige site.
- **Ankerteksten**: nul generieke ankers ("lees meer", "klik hier", "hier") in de hele interne linkstructuur.
- **Wees-pagina's**: geen. Elke pagina krijgt minstens één interne link.
- **Redirects**: `www` → apex en `http` → `https` geven beide een schone 301 in één hop.
- **404**: een niet-bestaande URL geeft een echte HTTP 404, geen soft-404.

---

## ONP-1 — Sitemap somt tien blogartikelen dubbel op; de database bevat dubbele rijen

**Severity: High**

De sitemap adverteert 70 URL's, maar er zijn er maar 60 uniek. Tien van de elf blogartikelen staan er twee keer in.

Bewijs, uit de live sitemap (opgehaald met cache-buster en `Cache-Control: no-cache`, dus geen cache-artefact):

```
2026-09-16 /blog/wordpress-site-gehackt
2026-09-17 /blog/wordpress-site-gehackt
2026-09-16 /blog/core-web-vitals-website-snelheid
2026-09-17 /blog/core-web-vitals-website-snelheid
… (10 slugs in totaal, telkens één rij van 16 sept en één van 17 sept)
2026-09-19 /blog/ssl-certificaat-niet-veilig   ← enige post die één keer voorkomt
```

De oorzaak ligt niet in de sitemapcode maar in de data. `src/routes/sitemap[.]xml.tsx:34-47` haalt de blogposts rechtstreeks op:

```ts
const { data: posts } = await supabase
  .from("blog_posts")
  .select("slug, updated_at, noindex")
  .eq("status", "published")
  .eq("noindex", false)
  .lte("published_at", new Date().toISOString());
```

Die query doet precies wat hij moet doen. De `blog_posts`-tabel bevat zelf dubbele rijen: per slug één rij met `updated_at` 2026-09-16 en één met 2026-09-17. Alleen `ssl-certificaat-niet-veilig` (gepubliceerd 19 sept, dus ná het duplicatiemoment) staat er één keer in. Dat wijst op een seed- of migratiescript dat op 17 september een tweede keer is gedraaid.

**Waarom dit niet eerder opviel:** de blogindexpagina toont elk artikel keurig één keer. Dat komt niet doordat de query daar anders is — `src/routes/blog.tsx:25-30` filtert juist mínder streng — maar doordat React bij het renderen op `key={post.slug}` (`src/routes/blog.tsx:163-165`) dubbele keys samenvouwt. De pagina verbergt het probleem dus. De sitemap bouwt platte tekst zonder keys en legt het bloot.

**Gevolg:** Google krijgt dezelfde URL twee keer aangeboden met twee verschillende `lastmod`-datums. Dat maakt `lastmod` onbetrouwbaar als signaal, wat schadelijker is dan helemaal geen `lastmod`. Daarnaast levert elke detailquery op slug nu twee rijen op, waardoor de detailpagina een willekeurige van de twee toont — met risico dat een bewerking op de ene rij onzichtbaar blijft.

**Fix, in deze volgorde:**

1. Ruim de tabel op. Bepaal eerst welke rij per slug de juiste is (vrijwel zeker de nieuwste, `updated_at` 2026-09-17) en verwijder de andere. Maak vooraf een back-up van de tabel — dit is een destructieve ingreep op productiedata en hoort niet blind te gebeuren.
2. Zet een `UNIQUE`-constraint op `blog_posts.slug`, zodat een tweede seed-run faalt in plaats van stilletjes te dupliceren.
3. Zoek het seed-/migratiescript dat op 17 september is gedraaid en maak het idempotent (`upsert` op slug in plaats van `insert`).

Stap 2 is de eigenlijke oplossing. Zonder die constraint komt dit terug.

---

## ONP-2 — Blogartikelen staan vrijwel los van de rest van de site

**Severity: Medium**

Inkomende interne links per pagina, geteld over de hele site:

| Paginatype | Inkomende interne links |
|---|---|
| Dienst-, plaats-, branche- en juridische pagina's | 58–60 |
| `/website-checker` | 58 |
| Blogartikelen | 1–4 |

Zes van de elf artikelen hebben er precies één: de link vanaf `/blog` zelf. `verouderde-websites-groningen-drenthe`, `checklist-nieuwe-website`, `webshop-vs-gewone-website`, `vps-hosting-kleine-bedrijven`, `ssl-certificaat-niet-veilig` en `gratis-website-checker-uitleg` zitten alle zes in die categorie.

Het verschil is puur structureel: alle niet-blogpagina's zitten in de navigatie of de footer en krijgen daardoor op elke pagina een link. De artikelen zitten nergens in, behalve in het overzicht.

**Gevolg:** de artikelen liggen op drie klikken van de homepage en ontvangen nauwelijks interne linkwaarde. Voor artikelen die commercieel relevant zijn — `verouderde-websites-groningen-drenthe` raakt direct aan de plaatspagina's, `webshop-vs-gewone-website` aan `/webshop-laten-maken` — is dat weggegooide waarde.

**Fix:** leg contextuele links vanuit de dienstpagina's naar de bijbehorende artikelen, en omgekeerd. Concreet:

- `/webshop-laten-maken` ↔ `/blog/webshop-vs-gewone-website`
- `/onderhoud-hosting` ↔ `/blog/onderhoudskosten-na-livegang` en `/blog/vps-hosting-kleine-bedrijven`
- `/website-laten-vernieuwen` ↔ `/blog/checklist-nieuwe-website` en `/blog/verouderde-websites-groningen-drenthe`
- `/website-checker` ↔ `/blog/gratis-website-checker-uitleg`
- `/seo` ↔ `/blog/core-web-vitals-website-snelheid` en `/blog/google-business-profile-fouten`

Dit zijn echte inhoudelijke verbanden, geen kunstmatige linkjes. De clusteranalyse in `cluster.md` gaat dieper in op de gewenste hub-and-spoke-structuur.

---

## ONP-3 — Zeven blogtitels lopen over de SERP-breedte heen

**Severity: Low**

| Tekens | Pagina | Titel |
|---|---|---|
| 66 | `/blog/ssl-certificaat-niet-veilig` | SSL-certificaat: waarom "niet veilig" klanten wegjaagt \| AIMI Blog |
| 63 | `/blog/core-web-vitals-website-snelheid` | Trage website? Zo verbeter je je snelheid in Google \| AIMI Blog |
| 63 | `/blog/google-business-profile-fouten` | Google Bedrijfsprofiel: 7 fouten die klanten kosten \| AIMI Blog |
| 61 | `/blog/verouderde-websites-groningen-drenthe` | Website laten maken in Groningen: loop je achter? \| AIMI Blog |

Alle vier overschrijden de ~60 tekens waarbij Google in de praktijk begint af te kappen. Het achtervoegsel ` | AIMI Blog` kost telkens 12 tekens en voegt niets toe wat een zoeker helpt kiezen — het merk staat al in de zichtbare URL.

**Fix:** kort het achtervoegsel in tot ` | AIMI` (7 tekens) op de blogroute. Dat brengt alle vier onder de 60 zonder dat er aan de inhoudelijke kop iets verandert.

---

## ONP-4 — Eén gedeelde og:image voor alle 60 pagina's

**Severity: Low**

Alle pagina's verwijzen naar dezelfde `https://aimi-development.nl/og-image.png`. Dat is een werkende ondergrens — het bestand bestaat en is geldig — maar bij delen op LinkedIn of WhatsApp ziet een gedeelde blogpost er identiek uit aan de homepage en aan een tarievenpagina.

**Fix:** dit loont alleen waar daadwerkelijk gedeeld wordt. Geef in elk geval de elf blogartikelen en `/tarieven` een eigen afbeelding; voor de ~35 plaats- en branchepagina's is de gedeelde afbeelding prima. Dit is een verbetering voor doorklik bij delen, niet voor ranking.

---

## ONP-5 — H1 op de homepage levert "échtwerken" op als tekst

**Severity: Low**

De live markup:

```html
<h1 …>Websites die écht<br/>werken.</h1>
```

Bron: `src/components/Hero.tsx:62-64`.

Visueel klopt dit — de `<br />` zet "werken." op een tweede regel. Maar de tekstinhoud die parsers eruit halen is `Websites die échtwerken.`, zonder spatie. Dat raakt de drift-tooling (die registreerde de H1 zo), schermlezers, en mogelijk hoe de kop als tekstfragment wordt overgenomen.

**Fix:** zet een spatie vóór de `<br />`:

```jsx
Websites die écht{" "}
<br />
werken.
```

Visueel verandert er niets, de geëxtraheerde tekst wordt correct.

---

## ONP-6 — 82 interne links per pagina verdunt de linkwaarde

**Severity: Info**

Gemiddeld 80 interne links per pagina, op `/tarieven` gemeten 82 links naar 55 verschillende bestemmingen. `/contact` wordt vanaf die ene pagina zeven keer gelinkt, `/website-laten-maken`, `/onderhoud-hosting`, `/meer-diensten`, `/werkwijze` en `/faq` elk drie keer.

De oorzaak is een uitgebreide footer die op elke pagina alle ~35 plaats- en branchepagina's opsomt. Dat is niet fout — het houdt die pagina's bereikbaar en er zijn geen wees-pagina's — maar het maakt de interne linkstructuur vlak: elke pagina geeft evenveel waarde aan elke andere, dus de site geeft Google geen signaal welke pagina's het belangrijkst zijn.

**Overweging, geen harde aanbeveling:** een compactere footer met alleen de hoofddiensten, en de volledige plaats-/branchelijst op `/branches` en een vergelijkbare plaatsenoverzichtspagina, zou de hiërarchie scherper maken. Weeg dat af tegen het risico dat die pagina's dieper komen te liggen. Meet het effect voordat je het sitebreed doorvoert.

---

## Categoriescore

**On-Page SEO: 88/100**

De techniek van de on-page laag is vrijwel foutloos: canonicals, koppen, descriptions, taal, ankerteksten en redirects kloppen allemaal over de volle breedte. De aftrek zit in ONP-1 (de dubbele sitemap-entries zijn een echt indexatiesignaalprobleem met een datadefect eronder) en ONP-2 (de blogsectie is structureel losgekoppeld van de rest van de site). De overige punten zijn afrondingswerk.
