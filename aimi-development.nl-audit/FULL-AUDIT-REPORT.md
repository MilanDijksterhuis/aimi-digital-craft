# Volledige SEO-audit — aimi-development.nl

Datum: 2026-09-02
Methode: live crawl (47 sitemap-URL's) + Playwright-rendering + 10 gespecialiseerde subagents (technical, content, schema, sitemap, performance, visual, GEO, SXO, local, backlinks), via de claude-seo plugin. Voortbouwend op de eerdere handmatige code-audit van 2026-08-24 (`SEO-AUDIT.md`) — elke overgenomen bevinding is expliciet herverifieerd op de live site, niet blind herhaald.

**Geen Google API/PageSpeed/CrUX-key, geen Moz/Bing-key, geen DataForSEO** geconfigureerd in deze sessie — overal waar dat een deelscore beperkt, staat dat expliciet vermeld. Geen enkel cijfer hieronder is verzonnen om een gat te vullen.

---

## SEO Health Score: 64 / 100

| Categorie (standaardweging) | Score | Weging | Bijdrage |
|---|---|---|---|
| Technical SEO | 79 | 22% | 17.4 |
| Content Quality | 52 | 23% | 12.0 |
| On-Page / Search Experience (sitemap 88 + SXO 45, gemiddeld) | 66.5 | 20% | 13.3 |
| Schema / Structured Data | 78 | 10% | 7.8 |
| Performance (CWV, lab-only) | 50 | 10% | 5.0 |
| AI Search Readiness (GEO) | 68 | 10% | 6.8 |
| Images | 35 | 5% | 1.75 |
| **Totaal** | | | **64.0 ≈ 64/100** |

**Niet in de standaardweging, maar cruciaal voor dit bedrijfstype (lokale dienstverlener):**

| Aanvullende categorie | Score | Toelichting |
|---|---|---|
| Local SEO | 41/100 | Sterke architectuur, maar geen telefoonnummer, geen KvK/BTW, nul reviews |
| Visual / Mobile UX | 68/100 | Sterke hero, maar een echte mobiele cookie-banner-bug + 45 pagina's zonder beeld |
| Backlinks | Onvoldoende data (Tier 0) | Domein niet gevonden in Common Crawl — jong domein, geen tooling-gat |

Zou Local SEO worden meegewogen (logisch voor een regionale dienstverlener), dan zakt de gecombineerde score richting **~58-60/100**. De site is technisch en architecturaal sterker dan de meeste concurrenten van deze omvang, maar verliest punten vooral op **bewijs en vertrouwen** (reviews, cases, contactgegevens), niet op code-kwaliteit.

---

## Top 5 kritieke problemen

1. **Nul bewijs van vertrouwen op exact de pagina's die moeten converteren** (Critical, meerdere audits onafhankelijk bevestigd: content, GEO, SXO, local). Geen enkele van de 15 stad- of 15 branchepagina's toont een jaartal "sinds wanneer actief", een aantal opgeleverde sites, een garantie, een review of een afbeelding — terwijl de daadwerkelijk rankende concurrenten in Groningen/Drenthe (VrijdagOnline, Chuck's Webdesign, Convident) precies dát vooraan zetten ("10+ jaar", "1000+ sites", "100% garantie"). Dit is het enige punt dat in vrijwel elke deelaudit terugkomt.
2. **Geen telefoonnummer, geen KvK/BTW-nummer, geen adres zichtbaar op de site** (High, gevonden door content én local onafhankelijk). `/contact` heeft alleen een e-mailadres en een Calendly-link. Voor een Nederlandse lokale dienstverlener is dit een basaal, makkelijk te controleren vertrouwenssignaal dat volledig ontbreekt.
3. **Homepage LCP is Poor: 7,9 seconden**, niet veroorzaakt door de (goed geoptimaliseerde) hero-afbeelding maar door renderingvertraging: 92% van de LCP-tijd zit in "Render Delay" doordat ~900KB grotendeels ongebruikte JS (61-71% unused) en 106KB render-blocking CSS eerst moeten laden. Dit weerlegt de aanname uit de audit van 24 augustus dat CWV al goed zat — dat was een codelezing, geen meting.
4. **45 van de 47 pagina's tonen geen enkele afbeelding** (branche- en stadspagina's) — bevestigd door zowel de visuele als de SXO- als de GEO-audit. Een bestaande, herbruikbare `ExampleSlideshow`-component (al gebruikt op `/website-laten-maken`) wordt nergens anders ingezet.
5. **Mobiele cookie-banner is functioneel kapot**: de "Alleen noodzakelijk" (weiger)-knop staat op 390px-breedte vrijwel volledig buiten beeld (~2px van 153px zichtbaar) — een bezoeker kan niet weigeren zonder eerst "Aanpassen" te openen. Dit is zowel een UX- als een cookie-compliance-risico, op elke pagina.

## Top 5 snelle wins

1. **Voeg `/website-checker` toe aan de sitemap** — bestaat al, is overal gelinkt, staat er alleen niet in (`src/routes/sitemap[.]xml.tsx`). 5 minuten werk.
2. **Verwijder de verouderde `HowTo`-schema van 6 pagina's** (`onderhoud-hosting`, `seo`, `webshop-laten-maken`, `website-laten-maken`, `website-laten-vernieuwen`, `werkwijze`) — Google heeft HowTo-rich-results in september 2023 stopgezet, dit is dode gewicht zonder enig voordeel. Mechanische verwijdering, geen contentwerk.
3. **Zet gzip/brotli aan voor JS/CSS en HTTP/2 in nginx** — puur configuratie, geen codewijziging, en raakt elke paginalading (~1MB → ~250-300KB potentieel).
4. **Fix de mobiele cookiebanner-positionering** — CSS-only fix, sluit direct een compliance-risico.
5. **Zet een concreet bedrag vooraan in de prijsparagraaf van elke branchepagina** (al gesignaleerd op 24 augustus als C-2, nu opnieuw bevestigd op een tweede pagina — dus nog niet doorgevoerd op geen enkele van de 15 pagina's). Hergebruikt bestaande data uit `/tarieven`.

---

## Categorie-detailrapporten

Alle onderliggende bevindingen, met bronvermelding per URL/bestand:regel, staan in `findings/`:

- [`findings/technical.md`](findings/technical.md) — 79/100
- [`findings/content.md`](findings/content.md) — 52/100
- [`findings/schema.md`](findings/schema.md) — 78/100
- [`findings/sitemap.md`](findings/sitemap.md) — 88/100
- [`findings/performance.md`](findings/performance.md) — 50/100 (lab-only, geen CrUX-data)
- [`findings/visual.md`](findings/visual.md) — 68/100
- [`findings/geo.md`](findings/geo.md) — 68/100
- [`findings/sxo.md`](findings/sxo.md) — 45/100
- [`findings/local.md`](findings/local.md) — 41/100
- [`findings/backlinks.md`](findings/backlinks.md) — onvoldoende data (Tier 0)

Screenshots (desktop + mobiel, 6 pagina's): `screenshots/`

## Wat al goed staat (niet opnieuw doen)

- Alle 47 sitemap-URL's crawlen schoon: unieke canonical/title/description, één H1, geldige JSON-LD, geen redirects/404's.
- Stad- en branchepagina's zijn écht uniek geschreven, geen doorway-patroon — herbevestigd op een nieuwe steekproef (Veendam, Groningen, bloemist).
- `LocationLanding.tsx` (oude, dubbele-content-risicovolle component) is bevestigd dode code — geen route gebruikt hem nog.
- Schema-architectuur (`ORG_ID`, `serviceJsonLd`, `breadcrumbJsonLd`) is ongewoon gedisciplineerd voor deze schaal: geen dubbele `@id`'s, geen verzonnen reviews, correcte `LocalBusiness` alleen op de ene echte vestiging (Veendam).
- robots.txt staat alle grote AI-crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) expliciet toe; `llms.txt` bestaat al en is goed opgezet.
- Server-side rendering is bevestigd echt: content is volledig leesbaar zonder JS-executie, ook voor AI-crawlers.
- Interne linkstructuur (footer → alle 15 steden + 15 branches, hub-pagina's) is inmiddels goed opgezet — een eerder gesignaleerd gat is al gedicht.

## Limitaties van deze audit

- Geen Google PageSpeed/CrUX/Search Console-toegang — performance is lab-only (Lighthouse), geen echte 75e-percentiel gebruikersdata.
- Geen Moz/Bing/DataForSEO — backlinkprofiel kon niet cijfermatig worden vastgesteld (Common Crawl "not found" is een aanwijzing, geen bewijs van nul links).
- Het gekoppelde Google Business Profile kon niet extern worden geïnspecteerd (consent-wall) — categorie, foto's en eventueel telefoonnummer op GBP zelf zijn onbevestigd.
- Niet alle 47 pagina's zijn individueel live gerenderd door elke subagent (tijdgebonden); steekproeven zijn expliciet vermeld per deelrapport.
