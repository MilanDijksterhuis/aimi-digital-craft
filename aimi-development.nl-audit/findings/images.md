# Images — 2026-09-04

Score: **95/100** — herzien van 85 na verificatie tegen de broncode.

## Correctie op de eerste versie

Dit rapport meldde eerst twee problemen die geen van beide bestonden. Beide kwamen
voort uit geaggregeerd tellen over 48 pagina's in plaats van kijken naar de code.

- **"0 van 33 afbeeldingen gebruikt `loading="lazy"`"** — er staat **één** `<img>`
  in de hele codebase ([Hero.tsx](../../src/components/Hero.tsx)). De "33" waren
  33 pagina's met elk diezelfde hero. Die hero is het LCP-element en hoort
  nadrukkelijk **niet** lazy te zijn. Vervalt.
- **"Eén lege `alt`"** — die zit op de decoratieve achtergrond-hero, samen met
  `aria-hidden="true"`. Dat is exact correct. Vervalt.

## Wat werkt

- **0 van 33 afbeeldingen mist alt-tekst.**
- **0 mist `width`/`height`** — consistente CLS-preventie, zonder uitzondering.
- **WebP overal**, met een 640/960/1280/1920 responsive `srcset` op de hero.
- LCP-afbeelding gepreload met bijpassende `imageSrcSet`, plus
  `fetchPriority="high"` en `decoding="async"`.
- Correcte toegankelijkheid: decoratieve hero draagt `alt=""` + `aria-hidden`.

Dit is de best uitgevoerde categorie van de audit.

## Findings

### IMG-3 — `og-image.png` is 112 KB PNG (Low)
Wordt opgehaald door elke crawler en link-unfurler die een gedeelde URL aanraakt.
Als WebP of geoptimaliseerde PNG kan dat fors omlaag bij gelijke kwaliteit.

Niet aangepast: `public/og-image.png` heeft niet-gecommitte wijzigingen van de
eigenaar. Zie taak 11 in [JOUW-TAKEN.md](../JOUW-TAKEN.md).

### IMG-2 — hero-WebP zonder Cache-Control (Low → server)
Zie TECH-2 / PERF-4. Het LCP-element krijgt geen cache-header, dus herhaalbezoekers
halen het opnieuw op. Opgelost door de nginx-wijziging in taak 2.
