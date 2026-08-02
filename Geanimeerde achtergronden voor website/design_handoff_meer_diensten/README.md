# Handoff: "Meer diensten" — geanimeerde boom-achtergrond (AIMI)

## Overview
Een full-screen, interactieve achtergrond voor de pagina **Meer diensten**. Een abstracte lichtboom groeit mee met de scrollpositie: bij scroll 0 staat er een klein boompje, bij het einde van de pagina een volledig vertakte kroon met drie dienst-knooppunten (Hosting, Performance, SEO). Klikken op een knooppunt stuurt een energiepuls vanaf de stam langs de takken naar dat icoon, waarna het knooppunt "openbloeit" in fijne filamenten met opstijgende vonken en een detailpaneel met prijs/uitleg verschijnt. Op de achtergrond dwarrelen continu blaadjes.

## About the Design Files
De bestanden in deze bundel zijn **design-referenties, gemaakt in HTML** — een prototype dat de bedoelde vormgeving en het gedrag laat zien, **geen productiecode om letterlijk over te nemen**. De opdracht is om dit ontwerp opnieuw te bouwen in de bestaande omgeving van de doel-codebase (React, Vue, Astro, Next, WordPress-thema, …) met de daar gebruikelijke patronen. Bestaat die omgeving nog niet, kies dan het meest passende framework en implementeer het ontwerp daarin.

Praktisch advies voor de herbouw: de tekening is één SVG (`viewBox="0 0 1000 1000"`, `preserveAspectRatio="xMidYMid meet"`) met een lijst `<path>`-elementen. De geometrie wordt **procedureel gegenereerd** in JS (recursieve takken), en de groei is puur `stroke-dasharray`/`stroke-dashoffset` gestuurd vanuit één `requestAnimationFrame`-loop. Kopieer die generator + loop; de rest (nav, hero, paneel, footer) is gewone markup.

## Fidelity
**High-fidelity.** Kleuren, typografie, spacing, timings en easings zijn definitief en staan hieronder exact beschreven. De animatie-parameters (groeivensters, puls-duur, stagger) mogen ±10% afwijken zonder het ontwerp te schaden.

## Screens / Views

### Enige view: "Meer diensten" (full page)
**Doel:** bezoeker ontdekt de drie losse diensten en opent er één voor details + CTA.

**Paginahoogte:** `min-height: 360vh` — de extra hoogte is puur scroll-runway voor de groei-animatie. Alle visuele lagen zijn `position: fixed`.

**Lagen (van achter naar voren):**

| z-index | Laag | Beschrijving |
|---|---|---|
| 0 | Achtergrond | `fixed inset:0`, rode halo-blur + bodem-gloed + vallende blaadjes |
| 1 | SVG-boom | `fixed inset:0`, klikbaar (klik naast een node = sluiten) |
| 5 | Hero-tekst | `fixed left:40px top:24vh`, max-width 430px |
| 5 | Footer | `absolute bottom:0` (onderaan de 360vh) |
| 6 | Nav | `fixed top:0`, gradient-fade achtergrond |
| 7 | Detailpaneel | `fixed right:40px top:50%` (breed) / bottom-sheet (smal) |

#### Nav (fixed, z-6)
- Padding `22px 40px`, `display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap`.
- Achtergrond: `linear-gradient(to bottom, rgba(6,6,7,.9), rgba(6,6,7,0))`.
- Logo: "AIMI" 21px/600, `letter-spacing:-0.02em`, punt in `#ff4b4b`.
- Links: 13.5px, `#9a9aa2`; actieve link ("Meer diensten") `#efeff1`; `gap:20px; white-space:nowrap`.
- Knoppen: "Portaal" — `padding:9px 18px; border-radius:999px; border:1px solid rgba(255,255,255,.16); font-size:13px`. "Contact" — zelfde maat, `background:#efeff1; color:#060607; font-weight:600`.

#### Hero (fixed, z-5, `pointer-events:none`)
- Kicker: "OOK LOS AF TE NEMEN" — 11.5px/500, `letter-spacing:.22em`, uppercase, `#ff4b4b`.
- Titel: "Alles wat" (300) + newline + "wij kunnen" (600) — 60px, `line-height:1`, `letter-spacing:-0.03em`, `#efeff1`.
- Body: 14.5px/300, `line-height:1.75`, `#8f8f98`, tekst:
  "Eén stam, drie takken. Hosting, snelheid en vindbaarheid — los af te nemen, zonder dat we een nieuwe site hoeven te bouwen."
- Scroll-hint: rood streepje 34×1px + "SCROLL OM TE LATEN GROEIEN" 10.5px, `letter-spacing:.24em`, uppercase, `#5e5e66`.
- **Scroll-gedrag:** met `k = min(1, scrollProgress / 0.35)`:
  `opacity = 1 - k*0.45`, `transform = translateY(-k*90px) scale(1 - k*0.26)`, `transform-origin: left top`.
  De tekst blijft dus altijd zichtbaar (min. 55% opacity, 74% grootte).

#### SVG-boom (fixed, z-1)
- `viewBox="0 0 1000 1000"`, `preserveAspectRatio="xMidYMid meet"`, `overflow:visible`, `width/height:100%`.
- Wortel `ROOT = [500, 1015]`, vork `FORK = [500, 700]`.
- Stam: `M500,1015 Q516,857 500,700`, `stroke rgba(236,236,240,.5)`, width 6, groeivenster `t 0 → 0.13`.
- **Baby-kroon** (zichtbaar bij scroll 0): 5 twijgjes vanaf de stamtop, `stroke rgba(255,70,70,.42)`, width 1.9, vensters 0.030–0.114. Offsets (dir, dy, t0, dx, dy2): `(-1,30,.030,42,-46) (1,24,.038,46,-50) (-1,8,.048,30,-62) (1,4,.056,34,-66) (0,0,.064,6,-78)`.
- **Drie hoofdtakken** vanaf FORK naar de dienst-knooppunten, elk gesplitst in 2 quadratic-segmenten (nodig voor de puls-keten), `stroke rgba(236,236,240,.36)`, width 3.4 → 2.6.
  - Hosting: node `[206,392]`, control `[352,660]`
  - Performance: node `[520,196]`, control `[470,500]`
  - SEO: node `[826,372]`, control `[664,640]`
  - Groeivenster per tak `i`: start `0.17 + i*0.05`, eind `0.45 + i*0.115`.
- **Twijgen:** op 9 posities langs elke hoofdtak (`t = .10 .20 .30 .41 .52 .62 .72 .82 .92`) twee recursieve takken (diepte 4 op elke 3e positie, anders 3). Lengte 52–118 px (viewBox-units), per niveau ×0.6–0.76, spreidingshoek 0.38–0.72 rad. Stroke `rgba(255,70,70, .14 + depth*.09)`, width `max(.55, depth*.62)`.
- **Regel die je niet mag breken:** een kind-tak start pas als zijn moedertak volledig getekend is (`childStart = t0 + span`) en een twijg start pas als de hoofdtak dat punt bereikt heeft (`w0 = start + (end-start)*t + 0.006`). Zonder dit lijken takken los te zweven.
- Totaal ± 620 paths. Elk path krijgt bij mount `stroke-dasharray = getTotalLength()` en `stroke-dashoffset = length`.

**Groei-mapping (per frame):**
```
pTarget = scrollY / (scrollHeight - innerHeight)      // 0..1
p      += (pTarget - p) * 0.09                        // smoothing
pDraw   = 0.12 + p * 0.88                             // start op baby-boom
k       = clamp((pDraw - t0) / (t1 - t0), 0, 1)
e       = k < .5 ? 2k² : 1 - (-2k+2)²/2               // easeInOutQuad
dashoffset = length * (1 - e)
stroke-linecap = e > 0.002 ? 'round' : 'butt'         // anders rode stipjes
```

#### Dienst-knooppunten (3×, in de SVG)
Verschijnen op `pDraw = 0.40 + i*0.115` over een venster van 0.08 (`opacity 0 → 1`, `pointer-events` pas boven 0.8).

Opbouw per node (middelpunt `x,y`):
- Hit-area: transparante rect 104×104, `x-52, y-52`.
- Ruit: rect 60×60 op `x-30,y-30`, `transform="rotate(45 x y)"`, `fill rgba(6,6,7,.7)`, `stroke rgba(255,70,70,.75)`, width 1.1.
- Buitenruit: rect 88×88 op `x-44,y-44`, rotate 45°, `stroke rgba(255,70,70,.3)` width .8, animatie `breathe` 5s (`opacity .25 → .7 → .25`).
- Icoon, `stroke rgba(255,70,70,.95)`, `fill:none`, round caps/joins:
  - **Hosting** — computertje: rect 34×23 (`x-17, y-15`, `rx 2`) + standaard `line(x, y+8 → x, y+14)` + voet `line(x-10, y+14 → x+10, y+14)`, width 1.7.
  - **Performance** — bliksem: `polyline (x+7,y-15) (x-8,y+1) (x+3,y+1) (x-7,y+15)`, width 1.8.
  - **SEO** — loep: `circle(x-3, y-4, r=12)` + handvat `line(x+6,y+5 → x+13,y+13)`, width 1.8.
- Label: `<text>` op `x + labelDx, y + 78`, 17px/500, `letter-spacing 1.6`, `#efeff1`. Sub-label op `y + 96`, 11.5px, `letter-spacing 1.2`, `#78787f`.
  `labelDx / text-anchor`: Hosting `-62 / end`, Performance `0 / middle`, SEO `+62 / start`.
  Teksten: `HOSTING / vanaf € 29,50`, `PERFORMANCE / op aanvraag`, `SEO / op aanvraag`.

#### Detailpaneel (z-7)
- Breed (≥1100px): `right:40px; top:50%; width:340px; transform:translateY(-50%)`; dicht = `translateX(20px); opacity 0`.
- Smal (<1100px): bottom-sheet `left:20px; right:20px; bottom:70px; max-height:46vh; overflow-y:auto`; dicht = `translateY(20px); opacity 0`.
- Kaart: `padding:26px; border-radius:2px; border:1px solid rgba(255,70,70,.25); background:rgba(9,9,11,.86); backdrop-filter:blur(16px)`.
- Inhoud: label 10.5px/500 uppercase `letter-spacing:.24em` `#ff4b4b`; sluitkruis `×` 15px `#78787f`; prijs 30px/300; suffix 13px `#78787f`; omschrijving 13.5px/300 `line-height:1.7` `#9a9aa2`; bullets 13px/300 `#b6b6bd` met een 4×4px vierkantje `#ff4b4b` `rotate(45deg)` als bolletje, `gap:11px`; CTA "NEEM CONTACT OP" 12px/500 uppercase `letter-spacing:.16em`, `border:1px solid rgba(255,70,70,.35)`, `padding:13px 0`, volledige breedte.
- Transitions: `opacity .6s ease, transform .7s cubic-bezier(.2,.8,.2,1)`.

#### Vallende blaadjes (z-0)
22 divs, `position:absolute; top:0`, willekeurige `left` 0–100%, grootte 5–13px, `border-radius: 0 100% 0 100%`, kleur `rgba(255, 50-90, 50-80, .14-.44)`, animatie `leafFall` 22–48s linear infinite met negatieve delay (−0 tot −40s) zodat het scherm bij load al gevuld is.
```css
@keyframes leafFall{
  0%{transform:translate(0,-12vh) rotate(0deg);opacity:0}
  8%{opacity:1} 92%{opacity:1}
  100%{transform:translate(9vw,112vh) rotate(420deg);opacity:0}
}
```

#### Achtergrondgloed
- Halo: `left:12%; top:12%; width/height:76vw`, `radial-gradient(circle, rgba(255,60,60,.16), transparent 66%)`, `filter:blur(90px)`, `opacity:.55`, animatie `haloDrift` 26s ease-in-out infinite (`translate(0,0)→(2vw,-3vh) scale(1.12)→terug`).
- Bodemgloed: `radial-gradient(ellipse at 50% 95%, rgba(255,50,50,.10), transparent 55%)`.

## Interactions & Behavior

### Scrollen
Eén rAF-loop; scroll-listener is `{passive:true}` en zet alleen `pTarget`. Alles wordt per frame direct op DOM-nodes gezet (`element.style.strokeDashoffset = …`) — **geen re-render per frame**. ±620 style-writes per frame draait op ~90fps; in React: refs, geen state.

### Klik op een knooppunt — de "surge"-sequentie
1. **Puls (0 → 750ms).** Boven op de stam + de 2 segmenten van de gekozen hoofdtak liggen duplicaat-paths (`stroke rgba(255,90,90,.95)`, width 2.6, `stroke-dasharray: "70 <length>"`). De keten wordt sequentieel doorlopen: segment `k` van 3 loopt van `dashoffset = length` naar `-70`, zichtbaar zolang `0 < seg < 1`. Effect: een lichtstreepje van 70 units dat van de wortel naar het icoon schiet.
2. **Dimmen (direct).** Alle takken die niet bij de gekozen dienst horen: `opacity → 0.12` (`transition: opacity .8s ease`). De andere twee nodes gaan naar `opacity * 0.18`.
3. **Bloei (na 720ms).** 18 vooraf gegenereerde filamenten rond het knooppunt (hoeken `i/18 * 2π`, lengte 46–142, `stroke rgba(255,70,70,.16–.66)`, width .9) tekenen zich in met `transition: stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)` en **stagger van 45ms** per filament.
4. **Vonken.** 14 cirkels (r 0.9–2.6, `rgba(255,90,90,.9)`) rond de node, animatie `ember` 7s linear infinite met willekeurige delay; groep-opacity 0 → 1 (`transition .9s`).
   ```css
   @keyframes ember{0%{transform:translate(0,0);opacity:0}15%{opacity:.85}100%{transform:translate(6px,-210px);opacity:0}}
   ```
5. **Ruit reageert.** De frame-groep: `transform: scale(1.35) rotate(45deg)`, `transition .8s cubic-bezier(.2,.8,.2,1)`, `transform-box: view-box`, `transform-origin: <x>px <y>px`.
6. **Paneel** verschijnt gelijk met stap 3.

### Wegschuiven van de boom bij een open paneel (`applyLayout()`)
- Breed: `transform: translateX(-15%) scale(.9)`, `transition: transform 1.1s cubic-bezier(.2,.8,.2,1)`.
- Smal: schaal `.66` en de **verticale offset wordt gemeten**, niet geraden: zet tijdelijk `transition:none` + `transform:scale(.66)`, lees `node.getBoundingClientRect()`, en bereken `dy` zodat de node-groep (inclusief label!) in de vrije band valt tussen `navBottom + 8 = 100px` en `panelTop − 14`. Past hij niet, dan wordt de bovenkant op `bandTop + 60` gezet. Daarna transition herstellen en `translateY(dy) scale(.66)` toepassen. Ook opnieuw uitvoeren op `resize`.

### Sluiten
Klik op het kruisje óf ergens naast een knooppunt in de SVG-laag (`onClick` op de wrapper, node-clicks doen `stopPropagation`). Reset: filamenten terug naar `dashoffset = length` (delay 0), vonken opacity 0, ruit terug naar `scale(1) rotate(0)`, alle takken `opacity 1`, paneel dicht, boom `transform:none`.

### Responsive
Breekpunt **1100px**: paneel wordt bottom-sheet, boom schaalt naar .66 met gemeten offset. Onder ~700px breed is de SVG door `meet`-scaling klein; overweeg daar de nav-links te verbergen achter een menu (niet in dit prototype uitgewerkt).

### Toegankelijkheid (nog te doen bij implementatie)
De nodes zijn nu klikbare `<g>`'s. Geef ze in productie `role="button"`, `tabindex="0"`, `aria-label` en Enter/Space-handling; respecteer `prefers-reduced-motion` (dan: boom direct volgroeid tonen, geen blaadjes/vonken, paneel zonder puls).

## State Management
Minimaal:
- `open: number | null` — welke dienst open staat (enige echte React-state).
- Refs/mutable: `p`, `pTarget` (scrollvoortgang), `surge {chain, t, dur}` (lopende puls), arrays met path-elementen + hun lengtes, ember-groepen, node-groepen, frame-groepen.
- Geen data-fetching; de drie diensten zijn een statische array.

## Design Tokens

**Kleuren**
| Token | Waarde | Gebruik |
|---|---|---|
| bg | `#060607` | pagina |
| surface | `rgba(9,9,11,.86)` | paneel |
| text | `#efeff1` | koppen, labels |
| text-muted | `#9a9aa2` | body, nav-links |
| text-dim | `#8f8f98` / `#78787f` | hero-body / sub-labels |
| text-faint | `#5e5e66` / `#6f6f77` | scroll-hint, footer |
| accent | `#ff4b4b` | enige accentkleur |
| accent-line | `rgba(255,70,70, .14 → .95)` | takken, iconen, randen |
| structure | `rgba(236,236,240,.36 → .5)` | stam en hoofdtakken |
| hairline | `rgba(255,255,255,.07 / .16)` | footer-rand, knoprand |

**Typografie** — Sora (Google Fonts), gewichten 300/400/500/600.
`60/300` hero-titel (600 voor de tweede regel) · `30/300` prijs · `17/500 ls 1.6` node-label · `14.5/300 lh 1.75` hero-body · `13.5/300 lh 1.7` paneel-body · `13/300` bullets · `13.5/400` nav · `11.5 ls 1.2` sub-label · `11.5/500 ls .22em` kicker · `12/500 ls .16em` CTA · `10.5/500 ls .24em` paneel-label.

**Spacing** — 4 / 8 / 10 / 12 / 16 / 20 / 22 / 26 / 40 px. Pagina-padding 40px (nav, hero, footer), paneel 26px.

**Radius** — 2px (paneel/knoppen in paneel), 999px (nav-pillen), `0 100% 0 100%` (blaadje).

**Easing / timing** — groei `easeInOutQuad` + lerp 0.09 · layout-shift `1.1s cubic-bezier(.2,.8,.2,1)` · paneel `.6s/.7s` · bloei `1.2s cubic-bezier(.2,.8,.2,1)` stagger 45ms · puls 750ms · bloei-delay 720ms na klik · ruit `.8s`.

**Effecten** — `blur(90px)` halo, `backdrop-filter: blur(16px)` paneel.

## Assets
Geen afbeeldingen of icon-libraries. Alle iconen zijn inline SVG-primitieven (rect/line/polyline/circle). Enige externe afhankelijkheid: **Sora** via Google Fonts (`https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap`) — vervang door je eigen font-hosting indien gewenst. Logo "AIMI." is tekst.

## Files
- `Meer Diensten.dc.html` — het volledige prototype. Bovenin de template (markup + inline styles + keyframes in `<helmet>`), onderin in `<script data-dc-script>` de logica-class: `build()` genereert de boomgeometrie, `componentDidMount()` initialiseert dash-lengtes en listeners, `tick()` is de rAF-loop, `open()/close()/resetBloom()` de surge-sequentie, `applyLayout()` de responsive positionering.
- `support.js` — runtime van de prototype-omgeving. **Niet meenemen naar productie**; alleen nodig om het HTML-bestand lokaal te openen.

Openen kan door `Meer Diensten.dc.html` direct in de browser te laden (beide bestanden in dezelfde map houden).
