# SEO Drift-analyse — aimi-development.nl

Datum analyse: 2026-09-21
Baseline gebruikt voor vergelijking: id 1, vastgelegd 2026-09-03T16:28:45Z (homepage)
Vorige vergelijking: 2026-09-06 (0 critical / 2 warning / 1 info)
Verse vergelijking: 2026-09-21T10:41:37Z — **0 critical / 2 warning / 2 info** (4 van de 17 regels getriggerd)

Context: tussen de baseline (3 sept) en vandaag zijn 54 bestanden in de codebase gewijzigd
(o.a. content-herziening en een eerdere SEO-audit op 2026-09-20). Onderstaande beoordeelt
per wijziging of dat een bedoelde verbetering of een onbedoelde regressie lijkt.

## Samenvatting getriggerde regels (homepage)

| Regel | Zwaarte | Oud | Nieuw | Beoordeling |
|---|---|---|---|---|
| `title_changed` | WARNING | "AIMI — Webdesignbureau uit Noord-Nederland \| Websites & webshops" | "AIMI: Webdesignbureau uit Veendam \| Websites & webshops" | **Verbetering, waarschijnlijk bedoeld.** Plaatsnaam is preciezer (Veendam = werkelijke vestigingsplaats, consistent met de meta description die dit al noemde). Actie: CTR 2 weken monitoren in Search Console. |
| `schema_modified` | WARNING | hash `7e8acff7c232...` | hash `53af9da28e58...` | **Niet vastgesteld of verbetering of regressie.** Aantal schema-blocks is gelijk gebleven (3), dus niets verwijderd/toegevoegd — wel inhoudelijk gewijzigd. Vereist validatie met `/seo schema`. |
| `h2_structure_changed` | INFO | 6 H2's | 5 H2's | Vermoedelijk gevolg van de content-herziening; geen kritiek verlies van structuur, niet inhoudelijk gevalideerd welke H2 verviel. |
| `content_hash_changed` | INFO | hash `40fd74d8d0c9...` | hash `e6a20ba1389c...` | Verwacht, gezien de 54 gewijzigde bestanden sinds de baseline. Geen aparte beoordeling nodig. |

## Niet-getriggerde regels (bevestigd: geen regressie)

- Canonical: ongewijzigd, `https://aimi-development.nl/`
- Noindex: niet toegevoegd
- H1: niet verwijderd, tekst 100% gelijk aan baseline (zie analyse hieronder)
- Title: niet verwijderd
- Status code: 200 → 200
- Meta description: ongewijzigd
- CWV-regressie / performance-score: **niet vastgesteld** — vergelijking overgeslagen, geen CWV-data beschikbaar (`has_cwv: false` in zowel baseline als nu)
- OG-tags: rule meldt "unchanged" (niet getriggerd), maar de ruwe tool-output toont hierbij inconsistente old/new-waarden (new_value leeg terwijl de rule niet afgaat). Dit is een weergave-anomalie in de vergelijkingstool zelf, geen echte regressie: de zojuist vastgelegde nieuwe baseline (id 3) telt gewoon 10 OG-tags op de homepage, dus OG-tags staan live nog gewoon correct.

## H1-analyse — is de spatiefout echt?

**Antwoord: nee, het is geen echte, zichtbare tekstfout op de site.** De letterlijke, automatisch
geëxtraheerde tekst is wel degelijk `"Websites die échtwerken."` (zonder spatie) — dat is bevestigd
in zowel de baseline van 3 september als de verse meting van vandaag (100% gelijk, dus geen wijziging).

Bron gecontroleerd: `src/components/Hero.tsx` regels 62–64:

```
Websites die écht
<br />
werken.
```

Dit is een **bewuste regelafbreking** (`<br />`) tussen "écht" en "werken.", geen ontbrekende spatie
in de brontekst. Bezoekers zien de kop dus over twee regels: "Websites die écht" / "werken." —
leesbaar als de bedoelde merkzin "Websites die écht werken."

De aaneengeschreven vorm ontstaat puur in de meetmethode: `parse_html.py` (onderdeel van de
claude-seo tooling, regel 149) haalt H1-tekst op met BeautifulSoup's `heading.get_text(strip=True)`,
zonder separator-argument. Die functie plakt tekst vóór en na een `<br>` direct aan elkaar zonder
spatie — standaardgedrag van BeautifulSoup, geen bug op de website. Conclusie: **extractie-artefact
van de baseline-tool, geen regressie en geen actie nodig op de site zelf.**

## Verbetering vs. regressie — eindoordeel

**Verbeteringen (bedoeld):**
- Title homepage: plaatsnaam gepreciseerd naar Veendam.
- Volgens een code-comment bij de H1 (`SEO-audit 2026-09-20 (B4-4)`) is er een subregel met
  zoekwoorden toegevoegd binnen de H1 (als losstaand `<span>` na de merkzin), omdat de hoofdkop zelf
  geen zoekwoord bevatte. De hoofdkop/merkzin zelf is niet aangepast.

**Nog te bevestigen (niet duidelijk verbetering of regressie):**
- Schema-wijziging op de homepage — validatie met `/seo schema` nodig.
- H2-structuurwijziging (6 → 5) — welke kop is verdwenen, is niet inhoudelijk gecontroleerd.

**Regressies:** geen kritieke regressies gevonden. Canonical, noindex-status, H1-aanwezigheid,
title-aanwezigheid en status code staan allemaal nog correct.

## Nieuwe baselines vastgelegd (2026-09-21)

| id | URL | Titel | H1 | Schema-blocks | OG-tags | Status |
|---|---|---|---|---|---|---|
| 3 | https://aimi-development.nl/ | AIMI: Webdesignbureau uit Veendam \| Websites & webshops | Websites die échtwerken. *(zie analyse hierboven — extractie-artefact)* | 3 | 10 | 200 |
| 4 | https://aimi-development.nl/website-laten-maken | Website laten maken \| Professioneel & vanaf € 499: AIMI | Website laten maken | 6 | 10 | 200 |
| 5 | https://aimi-development.nl/tarieven | Wat kost een website laten maken? Tarieven vanaf € 499 | Wat kost een website laten maken? | 6 | 10 | 200 |

Deze drie baselines dienen als vers ijkpunt voor toekomstige drift-vergelijkingen.

## Cross-skill aanbevelingen

- Schema-wijziging valideren: `/seo schema https://aimi-development.nl/`
- Title-wijziging / CTR-effect monitoren: `/seo page https://aimi-development.nl/` of Search Console
