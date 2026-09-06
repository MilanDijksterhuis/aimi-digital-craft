# Jouw taken — wat ik niet voor je kan doen

**Datum:** 2026-09-04 · Hoort bij de SEO-audit (score 79/100)

Alles wat in code kon, heb ik gedaan (zie [WAT-IK-AL-DEED.md](WAT-IK-AL-DEED.md)).
Hieronder staat alleen wat écht van jou moet komen: servertoegang, bedrijfsgegevens,
externe accounts en content waar ik de feiten niet van heb.

Op volgorde van impact.

---

## 1. nginx: compressie aanzetten `[15 min · grootste winst van de hele audit]`

**Dit is de belangrijkste taak op deze lijst.**

### Wat er precies aan de hand is

Ik heb het uitgezocht en de diagnose is scherper dan in het eerste rapport stond:

- Je HTML komt **wél** gecomprimeerd binnen → nginx heeft `gzip on` staan.
- Je `/assets/*.js` en `*.css` komen **niet** gecomprimeerd binnen.

De reden: nginx' `gzip_types` staat op de standaardwaarde, en die is **alleen
`text/html`**. Alles wat geen HTML is valt erbuiten.

Bewijs dat nginx die bestanden zelf van schijf serveert (en dus niet naar Node
doorstuurt):

```
/assets/index-B6pDCZvI.js  →  Last-Modified, ETag: "6a998f71-d7411", Accept-Ranges: bytes
/                          →  géén van die drie
```

Die ETag-vorm (`hex-mtime` + `hex-size`) is de handtekening van nginx die een
statisch bestand serveert.

> **Let op — dit raakt je eigen werk in `src/server.ts`.**
> Daar staat niet-gecommitte code (`compressStaticAsset`) die brotli/gzip toepast,
> met als comment dat nginx `/assets/` ongecomprimeerd serveert. Die code is goed
> geschreven, maar **hij gaat `/assets/` niet oplossen**: nginx serveert die
> bestanden rechtstreeks van schijf en stuurt ze nooit door naar Node, dus de
> handler draait er nooit voor. Hij helpt wél voor alles wat Node zelf uitserveert
> (`sitemap.xml`, `robots.txt`, `llms.txt`, API-responses) en is een prima vangnet.
> Houden dus — maar reken er niet op voor de 881 KB.

### Wat je moet doen

SSH naar de VPS, open de server-block (`/etc/nginx/sites-available/…`) en voeg toe:

```nginx
gzip on;
gzip_vary on;
gzip_comp_level 6;
gzip_min_length 1024;
gzip_proxied any;
gzip_types
    application/javascript
    text/javascript
    text/css
    application/json
    image/svg+xml
    font/woff2;
```

Daarna:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Controleren of het werkt

```bash
curl -sI -H "Accept-Encoding: gzip, br" \
  https://aimi-development.nl/assets/index-B6pDCZvI.js | grep -i content-encoding
```

Nu: **niets**. Straks: `Content-Encoding: gzip`.

| | Nu | Straks |
|---|---|---|
| Hoofdbundle | 881.681 B | ~248.487 B |
| Homepage totaal JS+CSS | ~1,2 MB | ~330 KB |

**Brotli is nog ~15–20% beter.** Check of je die module hebt:

```bash
nginx -V 2>&1 | grep -o brotli
```

Zo ja, voeg toe: `brotli on; brotli_comp_level 5; brotli_types <dezelfde lijst>;`

---

## 2. nginx: cache-headers voor fonts en afbeeldingen `[10 min]`

Je preloadte hero-WebP (74 KB, je **LCP-element**) en je font (27 KB) hebben
**geen enkele** `Cache-Control` — terwijl `.js` en `.css` in dezelfde map wél
`max-age=31536000, immutable` krijgen. Herhaalbezoekers halen ze dus elke keer opnieuw op.

Vervang de bestaande static-location door:

```nginx
location ~* \.(js|css|woff2|webp|png|jpg|jpeg|svg|avif|ico)$ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    access_log off;
}
```

**Ruim meteen de dubbele header op.** Nu komt dit terug:

```
Cache-Control: max-age=31536000
Cache-Control: public, immutable
```

Twee regels, omdat er zowel een `expires`-directive als een `add_header` afgaat.
Browsers komen er wel uit, maar sommige proxies en CDN's niet. Haal de
`expires`-regel weg en houd alleen de `add_header` hierboven.

---

## 3. Bedrijfsgegevens invullen `[10 min · wettelijk verplicht]`

Ik heb **alle bedrading al gelegd**. Jij hoeft alleen drie waarden in te vullen in
[src/lib/seo.ts](../src/lib/seo.ts), bovenaan bij het blok `Bedrijfsgegevens`:

```ts
export const ADDRESS = {
  streetAddress: "",   // ← invullen, bv. "Kerkstraat 1"
  postalCode: "",      // ← invullen, bv. "9641 AA"
  addressLocality: "Veendam",
  addressRegion: "Groningen",
  addressCountry: "NL",
};

export const KVK = "";      // ← 8 cijfers
export const VAT_ID = "";   // ← formaat NL123456789B01
```

Zodra die gevuld zijn gebeurt dit **automatisch**:

- de footer toont adres, KvK en BTW op alle 48 pagina's;
- het `Organization`/`ProfessionalService`-schema krijgt `address`, `vatID` en een
  KvK-`identifier`.

Zolang ze leeg zijn wordt er **niets** gerenderd — geen half adres, geen lege velden
in de JSON-LD. Dat is bewust: een onvolledig `PostalAddress` is slechter dan geen.

**Waarom dit hoog staat:** KvK- en BTW-nummer zijn wettelijk verplicht op een
Nederlandse bedrijfswebsite (Handelsregisterwet + EU-regels voor
e-commerce). Daarnaast is `ProfessionalService` een subtype van `LocalBusiness`,
en Google verwacht daar een adres bij. Het is de goedkoopste vertrouwenswinst
op de hele lijst.

---

## 4. IndexNow live zetten `[5 min]`

`https://aimi-development.nl/b03bb73bce86422c6a74b3cfc829f2dd.txt` geeft nu **404**.
Zolang dat zo is wijst Bing élke IndexNow-melding af — de hele setup doet niets.

De route bestaat al lokaal maar staat nog niet in git:

- `src/routes/b03bb73bce86422c6a74b3cfc829f2dd[.]txt.tsx`
- `scripts/indexnow-submit.mjs`

Committen en deployen (jij pusht zelf), daarna controleren:

```bash
curl -s https://aimi-development.nl/b03bb73bce86422c6a74b3cfc829f2dd.txt
```

Moet exact de sleutel als platte tekst teruggeven.

---

## 5. Openingstijden bepalen `[5 min · jouw keuze]`

`openingHoursSpecification` ontbreekt in het schema en er staan geen tijden op
`/contact`. Dat is een bedrijfsbeslissing, geen technische — vandaar dat ik hem
niet heb ingevuld.

Geef me de tijden door, dan zet ik ze in het schema én op de contactpagina. Of zet
ze zelf in `src/lib/seo.ts` naast `ADDRESS`.

Bij een afsprakenbureau zonder inloop is `"Mo-Fr 09:00-17:00"` gebruikelijk, maar
zet neer wat waar is — onjuiste tijden zijn erger dan geen tijden.

---

## 6. Externe accounts koppelen `[30 min · maakt de volgende audit veel scherper]`

Deze audit had **geen field data**. Alle snelheidscijfers zijn lab- en
transfermetingen, geen echte bezoekers, en de autoriteitscategorie kon ik
helemaal niet scoren.

| Account | Waarom | Kosten |
|---|---|---|
| **Google Search Console** | Echte LCP/INP/CLS van bezoekers, indexatiestatus, welke zoektermen je binnenhalen | gratis |
| **Bing Webmaster Tools** | Backlinkprofiel en ankerteksten — hiermee kan de autoriteitscategorie eindelijk gescoord worden. Activeert ook IndexNow voor Bing | gratis |

Verifiëren kan via een DNS-record of een HTML-bestand. Zeg het als je het
verificatiebestand als route wilt — dat kan ik wel bouwen.

---

## 7. Reviews verzamelen `[doorlopend · sterkste lokale rankingfactor]`

Op 48 pagina's staat op **één** pagina iets wat op een klantervaring lijkt. Er is
geen `aggregateRating`, want er is niets om te markeren.

Je Google Bedrijfsprofiel bestaat al (het is de enige `sameAs` in je schema), dus
de infrastructuur is er — het gaat puur om verzamelen. Reviewaantal en -snelheid
horen bij de sterkste factoren voor de map pack.

Bouw een vast moment in bij oplevering: link naar je Google-reviewpagina in de
opleveringsmail.

> **Belangrijk:** zet `aggregateRating` pas in het schema als er échte reviews
> achter zitten. Verzonnen ratings zijn een handmatige-actie-risico bij Google.
> Zeg het als je er een paar hebt, dan bouw ik de markup.

---

## 8. Social profielen aanmaken `[30 min]`

Je `sameAs` bevat één link (Google Maps). Dat is dunne bevestiging voor een
zoekmachine die wil vaststellen dat "AIMI" een echt bedrijf is — en "AIMI" is een
dubbelzinnige afkorting waar meerdere organisaties op zitten.

Minimaal aan te raden: **LinkedIn-bedrijfspagina**. Daarnaast Instagram of Facebook
als je die toch bijhoudt, plus je KvK-registerpagina.

Geef me de URL's, dan zet ik ze in het `sameAs`-blok in
[src/routes/\_\_root.tsx](../src/routes/__root.tsx).

---

## 9. Portfolio of cases `[grootste inhoudelijke gat]`

Je verkoopt websites en laat er geen één zien. Geen portfolio, geen case, geen
voor/na. Voor een webbureau is dit het belangrijkste conversiegat op de site —
mensen kopen hier op zichtbaar vakmanschap.

Dit kan ik niet voor je maken: ik heb geen echte projecten, geen resultaten en
geen toestemming van klanten.

**Wat ik van je nodig heb, per case:**

- klantnaam + toestemming om die te noemen (of "een kapsalon in Veendam")
- het probleem waarmee ze kwamen
- wat jullie gebouwd hebben
- een meetbaar resultaat als je het hebt (laadtijd, aanvragen, posities)
- één screenshot

Met drie cases bouw ik de sectie, inclusief `CreativeWork`-schema. Het wordt
meteen ook het eerste stuk van je site dat andere sites zouden willen linken.

---

## 10. Foto's en bio's van jullie twee `[15 min]`

"Aidan" en "Milan" staan op 6 van de 48 pagina's — en op **geen enkele** van de 30
stad- en branchepagina's die juist gebouwd zijn om bezoekers binnen te halen.

Voor een tweemansbureau zijn jullie het onderscheid. "Je praat direct met Aidan of
Milan" is de sterkste zin op de hele site, en hij staat op de verkeerde pagina's.

**Nodig:** een foto van elk, en per persoon één of twee zinnen (wat je doet, sinds
wanneer, waar je goed in bent).

Dan zet ik een auteursblok in de stad- en branchetemplates, plus `Person`-schema.
De `founder`-entiteiten bestaan al in je schema, maar dragen nu alleen een naam —
geen functie, geen `@id`, geen link.

---

## 11. og-image.png `[10 min · laag]`

112 KB PNG, opgehaald door elke crawler en elke link-unfurler. Als WebP of
geoptimaliseerde PNG kan dat fors omlaag bij gelijke kwaliteit.

Ik heb hem **niet** aangeraakt omdat `public/og-image.png` niet-gecommitte
wijzigingen van jou heeft — daar zat je kennelijk zelf in. Squoosh of `oxipng`
doet dit in een minuut.

---

## Volgorde die ik zou aanhouden

| Wanneer | Taken | Effect |
|---|---|---|
| **Nu** | 1, 2, 4 — nginx + IndexNow | 79 → ~85 |
| **Deze week** | 3, 5, 6 — gegevens + accounts | ~89 |
| **Deze maand** | 7, 8, 10 — reviews, socials, bio's | ~91 |
| **Later** | 9, 11 — portfolio, og-image | ~93 |

Taken 1, 2 en 4 zijn samen ongeveer een half uur en leveren de meeste winst op.
