# Intern werkplan + urenraming — Direct SportsWear NL

Intern document. Niet naar de klant sturen — dit bevat marges, buffers en interne aannames.
Gehanteerd intern tarief: **€ 65 / uur**. Alle bedragen excl. BTW.

---

## Fasering en uren

| # | Fase | Wat er gebeurt | Uren |
|---|---|---|---:|
| 0 | Discovery & UX | Intake, productstructuur/varianten uitvragen, sitemap, wireframes checkout + account, akkoord op scope | 8 |
| 1 | Fundament | Next.js App Router opzetten, huisstijl uit huidige site overzetten naar design tokens, componentbibliotheek, repo + CI + staging-omgeving | 20 |
| 2 | Database & Supabase | Nieuw Supabase-project, schema (producten, varianten, maten, voorraad, categorieën, klanten, adressen, orders, orderregels), RLS-policies, seeds, backupbeleid | 16 |
| 3 | Catalogus | Overzichtspagina met filters/sortering, categoriepagina's, productdetail met maatkeuze + voorraadstatus, zoekfunctie, maattabel | 24 |
| 4 | Winkelmand & checkout | Cart-state (persistent), checkout-flow, adres + verzendmethode, BTW- en verzendkostenlogica, **Mollie/iDEAL**, webhooks, orderbevestiging, foutafhandeling bij mislukte betaling | 24 |
| 5 | Accounts | Supabase Auth: registreren, inloggen, wachtwoord vergeten, e-mailverificatie, mijn-account met orderhistorie en adresboek | 16 |
| 6 | CMS / beheerpaneel | Zelfbeheer voor de klant: producten aanmaken/bewerken, foto-upload naar storage, prijzen, voorraad bijwerken, orders inzien en status wijzigen, klantenlijst, dashboard | 32 |
| 7 | Transactionele e-mail | Resend/Postmark koppelen, templates in huisstijl: orderbevestiging, betaalbevestiging, verzendmail, wachtwoord-reset | 8 |
| 8 | SEO-fundament | SSR-metadata per pagina, unieke titles/descriptions, `robots.txt`, dynamische `sitemap.xml`, canonicals, echte 404, schema.org Product + Organization + BreadcrumbList, Open Graph, `hreflang`/`lang=nl`, Core Web Vitals, Search Console + analytics inrichten, redirects van oude URL's | 20 |
| 9 | Juridisch & compliance | Algemene voorwaarden, privacybeleid, retour- en herroepingsbeleid, cookiebanner met consent, KvK/BTW in footer, betaalmethode-logo's, correcte NAW vervangen | 10 |
| 10 | Content & migratie | Echte productdata invoeren (tot 50 artikelen), foto's optimaliseren, teksten redigeren, categorieën inrichten | 12 |
| 11 | Test & oplevering | Cross-browser + mobiel, testbestellingen end-to-end, toegankelijkheid, performance, DNS-verhuizing zonder downtime, **handleiding + trainingssessie voor de klant** | 16 |
| | **Totaal maatwerk compleet** | | **206** |

**206 u × € 65 = € 13.390 excl. BTW**

---

## Varianten

### Variant A — Shopify-route (aanbevolen bij krap budget)
Wij bouwen een maatwerk-thema in de bestaande huisstijl op Shopify. Betaling, voorraad, orders, retouren en de wettelijke pagina's zitten in het platform.

| Onderdeel | Uren |
|---|---:|
| Discovery + inrichting shop | 8 |
| Maatwerk-thema in huisstijl | 24 |
| Producten + varianten + voorraad inrichten | 10 |
| Betaling, verzending, BTW, retourbeleid | 8 |
| SEO-inrichting + redirects + Search Console | 12 |
| Juridische pagina's + cookies | 6 |
| Test, livegang, training | 8 |
| **Totaal** | **76** |

**76 u × € 65 = € 4.940 excl. BTW** · plus Shopify-abonnement ~€ 36/mnd en transactiekosten.

### Variant B — Maatwerk MVP
Alles wat nodig is om te verkopen, met een eenvoudiger beheerpaneel en beperkte filters. Uitbreidbaar.

Fases 0–5 en 7–11, met fase 6 teruggebracht van 32 → 14 u (basis-CRUD i.p.v. volledig dashboard), fase 3 van 24 → 16 u en fase 10 van 12 → 8 u.

**≈ 134 u × € 65 = € 8.710 excl. BTW**

### Variant C — Maatwerk compleet
De volledige 206 uur hierboven. **€ 13.390 excl. BTW**

---

## Terugkerende kosten (per maand, excl. BTW)

| Post | Maatwerk (A/B/C) | Shopify |
|---|---:|---:|
| Hosting (Vercel Pro of onze VPS) | € 20 | — |
| Supabase (Pro, incl. dagelijkse backups) | € 25 | — |
| Shopify-abonnement | — | € 36 |
| Transactionele e-mail | € 10 | inbegrepen |
| Domein + SSL | € 2 | € 2 |
| **Onderhoudscontract** (updates, security, backups, monitoring, 1 u support) | € 95 | € 75 |
| **Totaal per maand** | **≈ € 152** | **≈ € 113** |

Transactiekosten Mollie: ± € 0,29 per iDEAL-transactie (rechtstreeks bij Mollie, loopt niet via ons).
Shopify rekent daarnaast een percentage per transactie.

---

## Doorlooptijd

| Variant | Doorlooptijd |
|---|---|
| A — Shopify | 3 – 4 weken |
| B — Maatwerk MVP | 6 – 8 weken |
| C — Maatwerk compleet | 10 – 12 weken |

Afhankelijk van hoe snel de klant productfoto's, teksten en bedrijfsgegevens aanlevert. Dat is in de praktijk de grootste vertragingsfactor — zet er een deadline op in de opdrachtbevestiging.

---

## Aandachtspunten voor de onderhandeling

1. **Verkoop niet de 206 uur.** Leg de drie varianten naast elkaar en laat de klant kiezen. Bij een shop met zes producten is Shopify het eerlijke advies; kiest de klant tóch maatwerk, dan is dat een bewuste keuze en geen verwijt achteraf.
2. **Fase 0 apart offreren** (8 u, € 520) als betaalde discovery. Zo verdien je aan de scoping ook als de deal niet doorgaat, en voorkom je gratis meedenken.
3. **Zet de meerprijzen expliciet in de offerte:** productfotografie, copywriting, meer dan 50 producten, koppeling met boekhouding of PostNL. Anders komt dat als scope creep terug.
4. **Het onderhoudscontract is de echte waarde.** Een webshop zonder onderhoud is over een jaar een beveiligingsrisico. Maak het geen optie maar onderdeel van de opdracht.
5. **Waarschuw over de huidige site.** Elke week dat "Preview - Chariot" live staat, verzamelt Google slechte signalen. Bied aan om dat vandaag nog te fixen (noindex of holdingpagina) — kleine moeite, groot vertrouwen.
6. **Betaaltermijn:** 40 % bij opdracht, 40 % bij oplevering staging, 20 % bij livegang.
7. **Eigendom vastleggen:** wie is eigenaar van het Supabase-account, het domein en de code als de samenwerking stopt. Regel dit vóór de start, niet erna.
