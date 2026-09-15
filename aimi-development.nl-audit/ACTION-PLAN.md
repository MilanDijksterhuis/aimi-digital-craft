# Actieplan — aimi-development.nl (audit 15 sep 2026)

Prioriteit: Critical → High → Medium → Low. Verwijzingen: `FULL-AUDIT-REPORT.md` en `findings/`.

## Fase 1 — Kritieke fixes & juridische basis (week 1)

| # | Actie | Fixt | Moeite |
|---|---|---|---|
| 1 | **KvK, BTW, straatadres, postcode invullen** in `src/lib/seo.ts` (constanten `ADDRESS.streetAddress`, `postalCode`, `KVK`, `VAT_ID`) + KvK/BTW vermelden op /algemene-voorwaarden. Footer en JSON-LD renderen automatisch mee. | CQ-2, SCH-1, SCH-4, Local (juridisch verplicht) | 15 min + data opzoeken |
| 2 | **Cookiebanner-fix**: `-translate-x-1/2` toevoegen aan de container in `src/components/CookieBanner.tsx:67`. | VIS-1 (High, 100% van mobiele sessies) | 1 regel |
| 3 | **Google Bedrijfsprofiel** via dashboard completeren: categorie ("Webdesigner"), openingstijden, foto's, diensten, beschrijving; link naar site verifiëren. Eerste 3–5 reviews vragen aan bestaande klanten (o.a. Direct SportsWear). | Local-1/3 (Critical) | 1–2 uur |
| 4 | **Brotli aanzetten** in nginx (`ngx_brotli`). | PERF-2 | serverconfig |
| 5 | **/wordpress-of-maatwerk retargeten**: title/H1 naar "WordPress vs maatwerk"-variant. NB: eerst GSC-querydata checken zodra beschikbaar — SXO-10 is een sterk maar directioneel signaal. | SXO-10 (Critical) | 30 min |
| 6 | Kleine fixes: `webPageJsonLd()` op /over-ons (SCH-5); titles /privacybeleid en /algemene-voorwaarden verlengen naar ~50–60 tekens. | SCH-5, TECH-9 | 30 min |

## Fase 2 — Bewijs & conversie (week 2–3)

| # | Actie | Fixt |
|---|---|---|
| 7 | **Portfolio/cases-sectie** met echte klantprojecten: naam, branche, voor/na, resultaat, quote. Minimaal 3 cases. Daarna (pas dan) Review-schema overwegen. | CQ-1, SXO-6/8 — grootste ranking- én conversieblokker |
| 8 | **`GENERIC_EXAMPLES` vervangen** in `ExampleSlideshow` door echte projectvoorbeelden per branche — één componentwijziging, effect op 23 pagina's. | SXO-5, VIS-2 |
| 9 | **Vanaf-prijs op /webshop-laten-maken** (nu "op aanvraag"). | SXO-9 |
| 10 | **/over-ons uitbouwen** (team, verhaal, werkwijze, foto's — E-E-A-T-drager; nu 223 echte woorden) en **/website-laten-maken verdiepen** (nu 474 — dunner dan de long-tail-pagina's die ernaar linken). | CQ-6/7 |
| 11 | **Homepage-FAQ inkorten** tot 5–6 vragen + link naar /faq; FAQPage-schema alleen op /faq laten. | CQ-5, SCH-2 |
| 12 | **Merknaam in citeerbare passages**: "AIMI" natuurlijk verwerken in sleutelantwoorden (FAQ, /wordpress-of-maatwerk, homepage). | GEO-6 |

## Fase 3 — Autoriteit & performance (maand 2)

| # | Actie | Fixt |
|---|---|---|
| 13 | **Citaties opbouwen** (volgorde uit `findings/backlinks.md`): LinkedIn-bedrijfspagina → Google/Bing Places → NL-directories (KvK-consistent) → regionale ondernemersverenigingen (Veendam/Groningen) → branchegidsen. `sameAs` in schema aanvullen per nieuw profiel. | Local, Backlinks, SCH-3, GEO |
| 14 | **Klant-colofonlinks** vragen; **website-checker als open-source repo** publiceren (linkable asset). | Backlinks |
| 15 | **LCP-refactor**: above-fold Framer Motion-animaties → CSS; Radix/portal-code uit publieke routes splitsen; modulepreload beperken tot kritieke chunks. Doel: LCP < 2,5 s mobiel lab. | TECH-1/2, PERF-1/3 |
| 16 | **Contextuele stad×branche-kruislinks** in content ("webdesign kapsalon Groningen"); structurele variatie aanbrengen in het gedeelde 6-secties-skelet van de 30 landingspagina's. | CQ-3, On-Page |
| 17 | Mobiele UX: tikdoelen ≥ 44 px (nav/footer), bodytekst ≥ 16 px, scroll-hint op /tarieven-tabel. | VIS-3/4 |
| 18 | Serveropruiming: dubbele headers ontdubbelen, `server_tokens off`, /CONTACT → 301 lowercase, Cache-Control op HTML (`max-age=300, stale-while-revalidate`), CSP richting nonces. | TECH-4–8, PERF-5 |

## Fase 4 — Meten & itereren (doorlopend)

- **Google Search Console koppelen + `GOOGLE_API_KEY`** (PSI/CrUX) configureren → volgende audit met velddata en querydata; valideert ook SXO-hypotheses (#5, #9).
- **Reviewvelocity**: structureel na elke oplevering om een review vragen (Google eerst, later Klantenvertellen).
- **Drift-baseline** vastleggen (`claude-seo` drift) en bij elke deploy vergelijken.
- **dateModified** in WebPage-schema, gevoed door echte wijzigingsdata.
- Kwartaalritme: her-audit + Lighthouse-vergelijking (`lighthouse-runs/`).
