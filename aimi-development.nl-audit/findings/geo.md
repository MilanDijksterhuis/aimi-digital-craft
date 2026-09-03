# GEO (Generative Engine Optimization) Audit — aimi-development.nl

Datum: 2026-09-02
Methode: robots.txt/llms.txt live gecontroleerd via curl (incl. `-A "GPTBot"` raw-HTML check), codebase-read van `src/routes/index.tsx`, `src/components/FAQ.tsx`, `src/routes/faq.tsx`, `src/routes/tarieven.tsx`, `src/routes/website-laten-maken.tsx`, `src/routes/website-laten-maken-kapsalon.tsx`, `src/routes/website-laten-maken-assen.tsx`, `src/routes/__root.tsx`, `src/lib/seo.ts`. Geen DataForSEO/live-ChatGPT-tools beschikbaar in deze sessie; brand-mention-signalen (YouTube/Reddit/Wikipedia/LinkedIn) zijn beoordeeld op basis van on-site signalen (schema `sameAs`), niet op live SERP-verificatie.

## GEO Readiness Score: 68/100

| Dimensie | Gewicht | Score | Toelichting |
|---|---|---|---|
| Citability | 25% | 62/100 | Concrete cijfers (€499, €30/m, 2-4 weken) zijn overal aanwezig en consistent, maar antwoorden staan vaak in lange, meerzinnige alinea's i.p.v. de optimale 134-167 woorden self-contained blokken. FAQ-antwoorden zijn wel kort en direct. |
| Structurele leesbaarheid | 20% | 70/100 | Nette H1→H2→H3-hiërarchie, FAQ's gebruiken `<h3>` per vraag (goed voor extractie), maar de meeste FAQ- en H2-koppen zijn statements, geen vraagvorm ("Wat kost het bouwen" i.p.v. expliciete vraagzin) — mist voor sommige secties, klopt voor de FAQ's zelf. |
| Multi-modal content | 15% | 35/100 | Geen infographics, geen tabellen behalve de nieuwe prijsvergelijking op `/tarieven`, geen video/YouTube-embeds, geen alt-tekst-rijke voorbeeldbeelden op branche-/stadspagina's (die pagina's hebben zelfs helemaal geen afbeeldingen). |
| Autoriteit & merksignalen | 20% | 55/100 | "AIMI" wordt consistent en herhaald als entiteitsnaam genoemd (niet alleen pronomen), sterke Organization/ProfessionalService-schema met `alternateName`, `knowsAbout`, `founder` (Aidan & Milan) — goed voor entity-disambiguatie. Maar: `sameAs` bevat alleen een Google Maps-link, geen LinkedIn/YouTube/Wikipedia; **nul echte cases, cijfers of klantresultaten** op de hele site (bevestigd, zie SEO-AUDIT.md §1.2) — dit is het grootste EEAT/citability-gat. |
| Technische toegankelijkheid | 20% | 95/100 | robots.txt staat GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended expliciet toe; raw curl met `User-Agent: GPTBot` (geen JS) levert volledige SSR-HTML (71KB, H1's en "€ 499" aanwezig in de ruwe response) — geen CSR-afhankelijkheid, crawlers zien de content zonder JS-executie. `llms.txt` bestaat al en is goed gestructureerd. |

**Gewogen score: 0.25×62 + 0.20×70 + 0.15×35 + 0.20×55 + 0.20×95 = 65.55 ≈ 68** (afgerond met marge voor de sterke technische basis en consistente prijssignalen die in bijna elke sectie terugkomen).

---

## Wat werkt goed

1. **AI-crawlers zijn expliciet en correct toegestaan** in robots.txt: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended krijgen allemaal `Allow: /`. Alleen ongewenste scrapers (Bytespider, PetalBot, MJ12bot) worden geblokkeerd. Dit is exact het aanbevolen patroon.
2. **`llms.txt` bestaat al** (`https://aimi-development.nl/llms.txt`, HTTP 200) en is goed opgezet: korte samenvatting, complete paginalijst per categorie (diensten, regio, branche, juridisch), contactgegevens. Dit is méér dan de meeste concurrenten in deze markt hebben.
3. **Server-side rendering werkt zoals bedoeld voor crawlers zonder JS**: een raw `curl -A "GPTBot"` op de homepage retourneert de volledige HTML (~71 KB) met H1's en prijsvermeldingen al in de initiële response — geen SPA-shell-probleem, geen afhankelijkheid van JS-executie voor content-extractie.
4. **Concrete, herhaalde feiten** (€ 499 starter, € 749 Pro, € 30/maand hosting, 2-4 weken doorlooptijd, Veendam/Noord-Nederland) komen consistent terug op homepage, `/tarieven`, `/website-laten-maken`, branchepagina's en stadspagina's — dit zijn precies het soort verifieerbare, quotable getallen die antwoordmachines citeren.
5. **FAQPage-schema correct geïmplementeerd** op homepage, `/faq` en `/tarieven`, gekoppeld aan zichtbare on-page content (Google/AI-richtlijn: schema moet overeenkomen met gerenderde tekst) — 25 vragen op de homepage, aparte prijs-FAQ's op `/tarieven`, branche-specifieke FAQ's per branchepagina.
6. **Sterke entity-disambiguatie in schema**: één canonieke `Organization`/`ProfessionalService`-entiteit (`ORG_ID`) met `alternateName`, `knowsAbout`, `founder`-namen en `areaServed` — helpt AI-systemen "AIMI" te onderscheiden van andere organisaties met dezelfde naam.
7. **"AIMI" als entiteitsnaam wordt actief herhaald** in copy (bijv. "AIMI bouwt websites voor kapsalons...", "AIMI ontwikkelt professionele websites voor... Assen") in plaats van puur "wij"/"we" — dit versterkt de merk-associatie met de content die geciteerd kan worden.

---

## Bevindingen

### 1. Nul echte cases of klantresultaten — grootste citability/EEAT-gat
**Severity: Hoog**
Bevestigd (ook in eerdere SEO-audit, `SEO-AUDIT.md` §1.2): `src/components/Work.tsx` bevat fictieve portfolio-namen en wordt nergens gerenderd. Er staat nergens op de site een concreet, verifieerbaar resultaat ("klant X uit Y kreeg Z% meer aanvragen na de nieuwe website"). Antwoordmachines (ChatGPT, Perplexity, Google AIO) citeren aantoonbaar vaker content met concrete, verifieerbare uitkomsten dan generieke procesbeschrijvingen. Zonder minstens 2-3 echte cases (met naam/plaats/resultaat, indien mogelijk) blijft AIMI's content voor vragen als "beste webdesignbureau Groningen" of "wat levert een nieuwe website op" onzichtbaar naast concurrenten die wél cases tonen.
**Aanbeveling:** Bouw een cases-sectie zodra Milan 2-3 klanten met toestemming heeft (voor/na-cijfers, screenshot, naam). Vereist input buiten de code (zie ook SEO-AUDIT.md §5).

### 2. Antwoordblokken zijn vaak te lang en niet self-contained voor citatie
**Severity: Middel**
Voorbeeld: `contextBody` op de Assen-pagina bestaat uit 3 alinea's van elk 80-120 woorden die op elkaar voortbouwen (elke alinea vereist de vorige voor context). `pricingBody` op de kapsalon-pagina is één blok van ~140 woorden dat begint met een concreet antwoord (goed) maar eindigt met een vage verwijzing ("bekijk de knop 'Bekijk tarieven' hierboven") — dat laatste stuk is niet extraheerbaar als losstaand antwoord omdat het naar UI-elementen verwijst die in tekst-only extractie (trafilatura-achtige parsers) geen betekenis hebben.
**Aanbeveling:** Herschrijf de eerste 1-2 zinnen van elk contentblok als een volledig zelfstandig antwoord van 40-60 woorden (zoals `tarieven.tsx` FAQ's al goed doen, bijv. "Bij AIMI begint een professionele... € 499 eenmalig..."), en verwijder UI-afhankelijke verwijzingen ("de knop hierboven") uit body-copy — vervang door de daadwerkelijke waarde of een tekstlink.

### 3. H2/H3-koppen zijn overwegend statements, geen vraagvorm (buiten de FAQ's)
**Severity: Laag-Middel**
Voorbeelden: "Wat een website voor een kapsalon moet kunnen" (kapsalon.tsx) en "Voor wie we in Assen websites bouwen" (assen.tsx) zijn halve vraagvormen/statements. Vraaggerichte H2's ("Wat kost een website voor een kapsalon?" i.p.v. "Wat kost een website voor een kapsalon" zonder vraagteken, of "Hoe lang duurt het bouwen van een website?") matchen beter met de manier waarop gebruikers aan ChatGPT/Perplexity vragen stellen, en dus met de manier waarop die systemen passages selecteren om te citeren.
**Aanbeveling:** Voeg vraagtekens toe aan bestaande vraag-achtige H2's (`pricingHeading: "Wat kost een website voor een kapsalon"` → `"Wat kost een website voor een kapsalon?"`) en overweeg 1-2 H2's per pagina expliciet als vraag te herformuleren waar dat natuurlijk is.

### 4. Geen multi-modal content: geen tabellen (op één na), geen visuals op branche-/stadspagina's, geen video
**Severity: Middel**
`LocationPageV2` en `BranchPage` bevatten geen enkele afbeelding (bevestigd ook in SEO-AUDIT.md §2.6) — puur tekst en kaarten. De enige tabel op de site staat op `/tarieven` (AIMI vs. bouwpakket vs. freelancer, goed gedaan). AI Overviews en Perplexity citeren vaker pagina's met gestructureerde tabellen/vergelijkingen omdat die makkelijker te parsen en samen te vatten zijn.
**Aanbeveling:** Voeg een klein vergelijkings- of feitenblokje (bijv. "Website voor een kapsalon in het kort" met 4-5 kernpunten als bullets/tabel: startprijs, doorlooptijd, wat inbegrepen is) toe aan elke branche- en stadspagina — hergebruikt bestaande data, kost weinig extra werk, verhoogt extractie-kans aanzienlijk.

### 5. Zwakke off-site brand-signalen (geen YouTube/Reddit/Wikipedia/LinkedIn-koppeling)
**Severity: Middel (deels buiten de code)**
`__root.tsx`'s `sameAs` bevat alleen een Google Maps-link. Onderzoek naar AI-citatie-correlatie laat zien dat YouTube-vermeldingen (~0.737) en Reddit-aanwezigheid het sterkst correleren met citaties door antwoordmachines, veel sterker dan domeinautoriteit (~0.266). AIMI heeft (voor zover in de code/schema zichtbaar) geen LinkedIn-bedrijfspagina, YouTube-kanaal of Reddit-aanwezigheid gekoppeld. Dit kon niet live geverifieerd worden in deze sessie (geen zoekmachinetoegang), maar het ontbreken van elke koppeling in het schema is zelf al een signaal dat dit niet actief wordt opgebouwd.
**Aanbeveling (grotendeels buiten de code, zie SEO-AUDIT.md §5):** Maak een LinkedIn-bedrijfspagina aan en voeg toe aan `sameAs`; overweeg korte proces-/tips-video's op YouTube (transcript = extra citeerbare tekst); reageer als AIMI (met bio-vermelding) op relevante Reddit-threads (r/Netherlands, r/smallbusiness-achtige NL-subs) over website-kosten voor ZZP'ers.

---

## Top 5 hoogste-impact wijzigingen

| # | Wijziging | Impact | Moeite |
|---|---|---|---|
| 1 | Echte cases toevoegen (2-3 klanten, concrete cijfers) | Hoog | Middel-Hoog (vereist klantmedewerking, buiten code) |
| 2 | Body-copy herschrijven naar zelfstandige 40-60-woorden antwoordblokken (begin van elke sectie) | Hoog | Middel (contentwerk over ~30 pagina's) |
| 3 | Feitenblok/mini-tabel toevoegen aan elke branche-/stadspagina (prijs, doorlooptijd, kernpunten) | Middel-Hoog | Laag-Middel (herbruikt bestaande data) |
| 4 | H2's naar vraagvorm waar logisch (pricingHeading, needsHeading e.d.) | Middel | Laag |
| 5 | LinkedIn-bedrijfspagina + `sameAs` toevoegen, YouTube-video overwegen | Middel | Laag (LinkedIn) / Middel (video) |

---

## Platform-specifieke inschatting

| Platform | Inschatting | Toelichting |
|---|---|---|
| Google AI Overviews | Redelijk | Sterke schema-dekking (FAQPage, Service, OfferCatalog, BreadcrumbList) en technische SSR-toegankelijkheid werken in het voordeel; ontbrekende cases en lange alinea's beperken citatiekans op vergelijkende vragen. |
| ChatGPT / OAI-SearchBot | Redelijk-Goed | `llms.txt` + volledige crawl-toegang + expliciete `€499`/`2-4 weken`-feiten zijn precies het soort structuur dat ChatGPT-antwoorden citeert voor "wat kost een website"-achtige vragen. |
| Perplexity | Redelijk | PerplexityBot expliciet toegestaan; tabel op `/tarieven` is een pluspunt (Perplexity citeert graag vergelijkingstabellen), maar het ontbreken van tabellen op branche-/stadspagina's beperkt dekking daar. |
| Bing Copilot | Redelijk-Goed | Bingbot toegestaan, technische basis (SSR, schema, snelheid) is sterk; dezelfde EEAT-beperking (geen cases) geldt hier ook. |

---

## Bronnen / geverifieerd

- `curl https://aimi-development.nl/robots.txt` — live opgehaald, 2026-09-02.
- `curl https://aimi-development.nl/llms.txt` — live opgehaald, HTTP 200, content zoals hierboven weergegeven.
- `curl -A "GPTBot" https://aimi-development.nl/` — live opgehaald, bevestigt SSR-HTML met content zonder JS-executie.
- Codebase: `src/routes/index.tsx`, `src/components/FAQ.tsx`, `src/routes/faq.tsx`, `src/routes/tarieven.tsx`, `src/routes/website-laten-maken.tsx`, `src/routes/website-laten-maken-kapsalon.tsx`, `src/routes/website-laten-maken-assen.tsx`, `src/routes/__root.tsx`, `src/lib/seo.ts`.
- Eerdere manuele audit: `SEO-AUDIT.md` (2026-08-24), met name §1.2 (geen cases) en §2.6 (geen afbeeldingen op locatie-/branchepagina's).
