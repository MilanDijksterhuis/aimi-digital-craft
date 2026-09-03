# Technische analyse — directsportswear.nl

Datum: 26-08-2026 · Analist: AIMI Development
Methode: HTTP-inspectie + reverse engineering van de productie-JS-bundle (de site is een client-side SPA, dus de bron zit volledig in `index-DCmvWQlB.js`).

---

## 1. Wat er nu staat

| Onderdeel | Bevinding |
|---|---|
| Platform | **Chariot AI** (chariotai.com) — AI-website-generator |
| Techniek | React 19 + React Router + Tailwind + framer-motion, gebouwd met Vite |
| Hosting | Netlify (statische SPA, geen server-rendering) |
| Bundle | 405 KB JS in **één bestand**, geen code-splitting |
| Domein | directsportswear.nl, HTTPS + HSTS actief (dat is goed) |
| Branche | Vechtsport / kickboks-uitrusting |

**Conclusie vooraf:** dit is geen webshop. Het is een *etalage-prototype* dat eruitziet als een webshop. Er zit geen database, geen betaling, geen account en geen beheer achter. Alles wat je ziet is hardcoded in de JavaScript.

---

## 2. Wat er in de site zit (volledige inventaris)

**Pagina's — er zijn er precies vier:**

```
/                 homepage
/producten        productoverzicht
/producten/:id    productdetail
/contact          contactformulier
*                 "Page not found"
```

**Producten — zes stuks, hardgecodeerd in de bundle:**

| Product | Prijs |
|---|---|
| Pro-Combat Bokshandschoenen | € 89,95 |
| Heavy Duty Bokszak 180cm | € 129,00 |
| Elite Beschermingsset | € 54,50 |
| Hybrid Kickboks Shorts | € 39,95 |
| Mondbeschermer Elite | € 19,95 |
| Pro Hand Wraps (5m) | € 14,95 |

Categorieën in de UI: Handschoenen, Bescherming, Kleding, Accessoires, Apparatuur, Overig — grotendeels leeg.

---

## 3. Waarom "de knoppen niet werken"

Dit is geen bug maar een ontbrekend fundament. Concreet:

### 3.1 De winkelmand bestaat niet
De knop **"Toevoegen aan Winkelmand"** staat op elke productpagina. Er is geen `/winkelwagen`-route, geen cart-state, geen checkout. De knop kán niets doen. Ook "Snel Kopen" en "Selecteer Maat" hangen in de lucht — maatvarianten worden getoond maar nergens opgeslagen.

### 3.2 Inloggen bestaat niet
Er is **geen enkele vorm van authenticatie** in de bundle: geen login-route, geen sessie, geen token, geen gebruikersobject. "Aanmelden" in de header/footer is nieuwsbrief-inschrijving, geen account. "Bestelling status" linkt nergens heen.

### 3.3 Dode links in de footer
De volgende links worden getoond, maar de bijbehorende pagina's bestaan niet:
`Algemene Voorwaarden` · `Privacybeleid` · `Retouren & Klachten` · `Veelgestelde Vragen` · `Maattabel` · `Klantenservice` · `Zakelijk / Bulk` · `Lees ons verhaal` · `Bekijk Collectie` · `Showroom`

Dat is minimaal tien niet-werkende knoppen. Vier daarvan (AV, privacy, retouren, herroeping) zijn **wettelijk verplicht** voor een Nederlandse webshop.

### 3.4 Betalen kan niet
Geen Mollie, geen Stripe, geen Adyen, geen iDEAL. De footer belooft "Veilig Betalen" en "Gratis Verzending bij bestellingen boven €75,-" — beide zijn op dit moment loze claims.

### 3.5 Het contactformulier is een risico
Het formulier post naar `https://chariotai.com/api/forms/submit` met een vaste token in de bundle. Twee problemen:
1. **Vendor lock-in** — stopt Chariot of het abonnement, dan verdwijnen de aanvragen zonder foutmelding.
2. **AVG** — persoonsgegevens gaan naar een derde partij zonder verwerkersovereenkomst.

---

## 4. SEO — de ernstigste bevinding

Deze site is op dit moment vrijwel **onvindbaar in Google**, en dat is niet subtiel.

| Probleem | Impact |
|---|---|
| `<title>` is letterlijk **"Preview - Chariot"** | Dit is wat Google in de zoekresultaten toont. Geen merknaam, geen zoekwoord. Kritiek. |
| `<html lang="en">` terwijl de site Nederlands is | Google kan de site aan het verkeerde taalgebied koppelen |
| Geen meta description | Google verzint zelf een omschrijving |
| Geen `robots.txt` | Geen sturing voor crawlers |
| Geen `sitemap.xml` | Google moet alles zelf ontdekken — bij een SPA lukt dat slecht |
| **Elke URL geeft HTTP 200**, ook `/dit-bestaat-niet-123` | Soft-404's. Google kan oneindig veel "bestaande" duplicaatpagina's indexeren. Zeer schadelijk. |
| Geen server-side rendering | De HTML die Google ontvangt is een lege `<div id="root">`. Alles hangt af van JS-rendering, wat traag en onbetrouwbaar geïndexeerd wordt |
| Geen Open Graph / Twitter cards | Delen op social/WhatsApp toont een blanco kaart |
| Geen `schema.org` Product-markup | Geen prijs- en voorraadweergave (rich results) in Google Shopping/zoekresultaten |
| Geen canonicals | Duplicate-content-risico |
| Eén JS-bundle van 405 KB, geen splitting | Slechte Core Web Vitals op mobiel = rankingverlies |

Alle titels, descriptions en headings zijn identiek op alle vier de pagina's, want een SPA zonder SSR heeft maar één `<head>`.

---

## 5. Wat de klant nog niet genoemd heeft, maar wel moet

- **Nep-bedrijfsgegevens.** Het vestigingsadres is `Sportlaan 123, 1011 AB Amsterdam` — dat is AI-verzonnen placeholder. Idem de openingstijden en "Onze Showroom". Foutieve NAW-gegevens schaden lokale SEO én zijn misleidend richting consumenten.
- **Geen KvK-nummer en geen BTW-nummer** zichtbaar. Wettelijk verplicht.
- **Stockfoto's van Pexels** als productafbeeldingen. Licentietechnisch mag het, maar je verkoopt zo producten met foto's van andermans spullen. Echte productfotografie is nodig.
- **Geen cookiebanner / consent** terwijl er straks analytics komt.
- **Geen voorraadbeheer.** Zonder dat verkoop je artikelen die op zijn.
- **Geen verzendkoppeling** (PostNL/DHL), geen track & trace, geen pakbonnen.
- **Geen transactionele e-mail.** Orderbevestiging en verzendmail bestaan niet.
- **Geen BTW- en verzendkostenlogica**, geen retourproces (14 dagen herroepingsrecht).
- **Geen analytics / Search Console.** Er is nu geen enkel inzicht in bezoekers.
- **Geen backup- of herstelprocedure.**

---

## 6. Advies: opnieuw bouwen, niet repareren

Repareren is hier duurder dan opnieuw bouwen. De reden: er is niets om op voort te bouwen. Geen backend, geen datamodel, geen CMS, geen server-rendering — en de code is machinaal gegenereerd zonder architectuur. Het enige waardevolle is het **visuele ontwerp**: de huisstijl (zwart/rood, schuine vette hoofdletters, sportief) is bruikbaar en die nemen we over.

### Voorgestelde architectuur

| Laag | Keuze | Waarom |
|---|---|---|
| Framework | **Next.js (App Router)** | Server-side rendering — lost in één klap het complete SEO-probleem op |
| Database + Auth | **Supabase** (eigen project voor deze klant) | Postgres + inlog + RLS + storage voor productfoto's, in één |
| Betalen | **Mollie** | iDEAL is in NL onmisbaar; Mollie is goedkoop en snel te koppelen |
| CMS / beheer | Maatwerk admin-paneel op Supabase | Klant beheert zelf producten, prijzen, voorraad, orders |
| E-mail | Resend of Postmark | Orderbevestiging, verzendmail, wachtwoord-reset |
| Hosting | Vercel óf onze eigen VPS | Zie kostenoverzicht |

**Let op bij Supabase:** een apart Supabase-project per klant is de juiste keuze (isolatie, eigen backups, overdraagbaar als de klant ooit weggaat). Zet het account op naam van AIMI met de klant als eigenaar-op-papier, en leg vast wie bij een breuk de sleutels krijgt.

---

## 7. Alternatief dat we eerlijk moeten voorleggen

Voor een shop met ~6 tot 50 producten is **Shopify** objectief goedkoper en sneller live dan maatwerk. Betaling, voorraad, retouren, orderbeheer, verzendlabels en de wettelijke pagina's zitten er standaard in. Wij zouden dan het thema bouwen in de bestaande huisstijl en de SEO inrichten.

Kies maatwerk als: de klant unieke functionaliteit wil (bulk/zakelijk bestellen, teamkleding-configurator), geen maandelijkse transactiekosten wil, of volledige eigendom van de code eist.
Kies Shopify als: budget en snelheid leidend zijn.

Wij nemen beide op in de offerte en laten de klant kiezen.

---

## 8. Risico's en aannames

- Prijsraming gaat uit van **aanlevering van echte productfoto's en teksten door de klant**. Doen wij dat, dan komt er fotografie/copywriting bij.
- Aantal producten aangenomen op **maximaal 50** bij livegang. Meer producten = meer invoerwerk (of een import-script).
- Mollie-account, KvK/BTW-gegevens en het domein moeten door de klant worden aangeleverd/overgedragen.
- Het domein staat nu op Netlify. Verhuizing van DNS moet ingepland worden om downtime te voorkomen.
- **Belangrijk:** zolang de huidige site live staat met "Preview - Chariot" als titel, bouwt hij negatieve SEO-geschiedenis op. Overweeg per direct een `noindex` of een tijdelijke "binnenkort open"-pagina.
