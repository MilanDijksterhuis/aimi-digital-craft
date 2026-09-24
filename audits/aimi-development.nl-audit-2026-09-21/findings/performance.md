# Performance / Core Web Vitals — 2026-09-21

**Status van deze sessie: onvolledig.** Door een turn-limit is deze sessie afgebroken
vóórdat er ook maar één Lighthouse-run kon worden uitgevoerd. Er zijn **geen
CrUX/PSI-velddata** beschikbaar (geen Google API-credentials, per opdracht) en er zijn
**geen lab-metingen** afgerond in deze sessie — Chromium/Lighthouse 12.8.2 waren wel
beschikbaar (`claude-seo doctor` bevestigt Chromium ready), maar zijn niet ingezet.
Alle cijfers hieronder zijn een van drie soorten, expliciet gelabeld per regel:

- **[PRODUCTIE-HEADER]** — direct via `curl` tegen de live site gemeten op 2026-09-21,
  losse steekproef (n=1), geen Lighthouse-lab en geen veld-aggregatie.
- **[CODE]** — geverifieerd door de broncode te lezen, geen runtime-meting.
- **[VORIGE AUDIT]** — cijfers uit `audits/aimi-development.nl-audit/findings/performance.md`
  (intern gedateerd 2026-09-15), puur ter context. De JS-bestandshashes zijn sindsdien
  veranderd (zie PERF-3), dus deze KB-cijfers kunnen niet 1-op-1 worden aangenomen voor
  de huidige build.

**Geen enkel LCP/INP/TBT/CLS/FCP-cijfer voor 2026-09-21 zelf is gemeten.** Dat is de
belangrijkste bevinding van deze sessie (zie PERF-1) en betekent dat de kernvraag van
deze opdracht — helpt de gzip-fix meetbaar, en is render delay nog dominant? — niet met
verse cijfers te beantwoorden is. Wat wel kon: brongecontroleerde verificatie van de
opacity:0-hydratie-hypothese en directe productie-header-checks.

## Wat goed gaat

- **De opacity:0-hydratievertraging op de homepage-hero is aantoonbaar verholpen in de
  code.** `src/components/Hero.tsx:50-51` bevat een expliciete commentaarregel
  ("SEO-audit 2026-09-15 (TECH-1): entrance via CSS (.anim-fade-up) i.p.v.
  framer-motion, zodat de H1 niet op opacity:0 wacht tot JS hydrateert") en de H1
  (`Hero.tsx:52-79`) gebruikt inderdaad de CSS-klasse `anim-fade-up` in plaats van een
  `motion.h1`. De intro-paragraaf — het gemeten LCP-element uit de vorige audit
  (`p.mt-8`) — is nu een gewone `<p>` zonder motion-wrapper (`Hero.tsx:81-95`, met een
  toelichtende comment die de oude 7+ seconden opacity:0-vertraging beschrijft als
  verleden tijd). De CTA-knoppen en founder-badge gebruiken dezelfde `anim-fade-up`
  CSS-aanpak (`Hero.tsx:97-111`, `126-146`). [CODE]
- **`/tarieven` heeft dit probleem nooit gehad.** `src/routes/tarieven.tsx` importeert
  `motion`/framer-motion nergens; de volledige hero (regel 264-314, inclusief de
  paragraaf die in de vorige audit als LCP-element werd gemeten) is statische
  SSR-HTML zonder JS-gating. [CODE]
- **Calendly wordt pas geladen bij daadwerkelijke interactie, niet bij page load.**
  `src/components/Contact.tsx:21-46`: het `<script src="https://assets.calendly.com/...">`
  wordt pas dynamisch aangemaakt en aan `document.body` toegevoegd zodra de gebruiker op
  "Plan een afspraak" klikt (`mode === "appointment"`), met `async = true`. Het
  homepage-HTML en de HTML van `/website-laten-maken` bevatten geen enkele Calendly-
  referentie ([PRODUCTIE-HEADER]: grep op beide gedownloade HTML-documenten gaf 0
  treffers). De CSP staat calendly.com/assets.calendly.com weliswaar sitebreed toe
  (`connect-src`, `script-src`, `frame-src`), maar dat is alleen een statische header —
  die kost geen bytes of main-thread-tijd totdat de widget echt wordt aangeroepen. Dit
  is precies het juiste patroon voor third-party scripts die niet iedereen nodig heeft.
- **Gzip is aantoonbaar actief op de HTML-respons in productie.**
  [PRODUCTIE-HEADER]: `curl -H "Accept-Encoding: gzip" https://aimi-development.nl/` →
  `Content-Encoding: gzip` in de respons. De asset-bestandshashes zijn bovendien
  veranderd sinds de vorige audit (`index-D_5BHSUg.js` / `styles-D9ZTCRAG.css` vs.
  voorheen `index-CxzhDqWp.js` / `styles-DdbuqqY2.css`), wat bevestigt dat er een nieuwe
  build/deploy heeft plaatsgevonden — consistent met de door de opdrachtgever gemelde
  gzip-fix. Zie PERF-3 voor wat hier nog niet uit volgt.
- **Cache-Control op HTML is ongewijzigd en passend.** [PRODUCTIE-HEADER] op zowel `/`
  als `/website-laten-maken`: `Cache-Control: public, max-age=300,
  stale-while-revalidate=3600`. Voor SSR-marketingpagina's zonder CDN-laag is dit een
  redelijke balans tussen actualiteit en het vermijden van onnodige volledige
  server-round-trips bij herhaalbezoek — geen wijziging nodig.
- Uit de vorige audit (niet dit sessie herbevestigd, maar ook geen enkele aanwijzing in
  de code voor regressie): het hero-image in `Hero.tsx:25-37` heeft nog steeds een
  correcte `srcSet` (640/960/1280/1920w), `fetchPriority="high"`, expliciete
  `width`/`height` en `decoding="async"` — dezelfde responsive-image-aanpak als eerder
  goedgekeurd. [CODE, gedeeltelijk herverifieerd]

## Wat niet gemeten kon worden (het gat in deze sessie)

| Wat | Status |
|---|---|
| LCP, INP (TBT-proxy), CLS, FCP, TTFB per pagina, mobiel + desktop (6 combinaties) | **Niet gemeten** — geen Lighthouse-run afgerond |
| LCP-subparts (TTFB / load delay / load time / render delay) via `lcp_subparts.py` | **Niet gemeten** |
| JS-bundelgrootte na gzip in KB, welke libraries domineren in de huidige build | **Niet gemeten** — alleen bestandshash-verandering geconstateerd, geen bytes gemeten |
| Of render delay nog steeds 83-86% van LCP uitmaakt (kernvraag opdracht) | **Niet gemeten** — wel aannemelijk lager op Home/Tarieven op basis van code (zie PERF-1), maar dit is een redenering, geen meting |
| `src/components/ServicePage.tsx` (hero van `/website-laten-maken`) | **Niet geopend deze sessie** — status van eventuele opacity/motion-gating op deze pagina is onbekend |
| Gzip specifiek op `/assets/*.js` (alleen HTML getest) | **Niet gemeten** |
| `/tarieven` productie-headers (caching/CSP/compressie) | **Niet gemeten** — alleen broncode gecontroleerd; zelfde SSR-server dus vermoedelijk identiek aan `/` en `/website-laten-maken`, maar niet los bevestigd |
| Brotli-status (vorige audit: niet enabled, alleen gzip) | **Niet herverifieerd** |
| Render-blocking resources, font-display, preload-hints | **Niet herverifieerd** deze sessie (vorige audit: schoon, geen aanwijzing voor regressie in gelezen code) |

## Bevindingen (geprioriteerd)

### PERF-1 — Geen enkele CWV-meting voor 2026-09-21 afgerond (High)
Deze audit-sessie is afgebroken door een turn-limit vóór de geplande Lighthouse-runs
(3 pagina's × mobiel/desktop = 6 runs). Er is dus geen vers LCP/INP-proxy(TBT)/CLS-cijfer
voor `/`, `/website-laten-maken` of `/tarieven`. Dit betekent dat noch de vraag "is de
gzip-fix meetbaar" noch "is render delay nog dominant" met cijfers te beantwoorden is
in dit rapport — alleen met redeneringen op basis van code (zie PERF-2).
**Fix:** voer alsnog uit, zodra er weer ruimte is:
```
npx lighthouse https://aimi-development.nl/ --output json --output-path <AUDIT_DIR>/lighthouse-runs/home-mobile.json --preset=perf --form-factor=mobile --screenEmulation.mobile
npx lighthouse https://aimi-development.nl/ --output json --output-path <AUDIT_DIR>/lighthouse-runs/home-desktop.json --preset=perf --form-factor=desktop --screenEmulation.disabled
```
(en analoog voor `/website-laten-maken` en `/tarieven`), plus
`claude-seo run lcp_subparts.py` per pagina voor de render-delay-breakdown.

### PERF-2 — Root-cause van de vorige LCP-render-delay-bevinding is in de code verwijderd op 2 van de 3 pagina's, niet op alle 3 geverifieerd (Medium — was High in de vorige audit)
De vorige audit (TECH-1/PERF-1) wees main-thread-JS aan die de hero op `opacity:0` hield
tot hydratie, op zowel Home (tekst-LCP) als impliciet elders. Brongecontroleerd op
2026-09-21:
- **Home (`src/components/Hero.tsx`)**: opgelost — H1, intro-`<p>`, CTA's en
  founder-badge zijn CSS-gedreven (`anim-fade-up`) of ongeanimeerd, dus zichtbaar in de
  SSR-HTML zonder op JS te wachten (regels 50-51, 81-95, 97-111, 126-146). Alleen de
  scroll-indicator onderaan (`Hero.tsx:155-176`, `motion.div`/`motion.span`, oneindige
  loop) gebruikt nog framer-motion — decoratief, geen LCP-kandidaat.
- **`/tarieven` (`src/routes/tarieven.tsx`)**: nooit een probleem gehad — geen
  `motion`-import in het hele bestand, hero volledig statisch.
- **`/website-laten-maken` (`src/components/ServicePage.tsx`)**: **niet
  geverifieerd** — dit bestand is niet geopend voordat de sessie werd afgebroken. De
  route (`src/routes/website-laten-maken.tsx:109-112`) delegeert de volledige render
  naar `<ServicePage data={data} path="/website-laten-maken" />`. De vorige audit vond
  hier een image-LCP-element met 0ms load delay/load time, dus het risico is kleiner
  dan bij tekst-LCP, maar de huidige staat van eventuele motion-wrappers om de
  hero-tekst is onbekend.
**Fix:** open `src/components/ServicePage.tsx`, controleer of de hero-titel/tekst een
`motion.*` met `initial={{opacity:0}}` gebruikt vóór het daadwerkelijke LCP-element
(de preloaded `<img>`); zo ja, pas hetzelfde CSS-patroon toe als in `Hero.tsx`. Bevestig
daarna met een Lighthouse-run + `lcp_subparts.py` of render delay op alle drie de
pagina's daadwerkelijk is gedaald t.o.v. de 83-86% uit de vorige audit.

### PERF-3 — Gzip-fix werkt op HTML, impact op JS-bundel en LCP/TBT niet gekwantificeerd (Medium)
`curl -H "Accept-Encoding: gzip"` bevestigt `Content-Encoding: gzip` op de homepage-HTML
in productie op 2026-09-21. De asset-hashes zijn veranderd t.o.v. de vorige audit
(nieuwe build gedeployed), wat consistent is met de gemelde fix. Maar:
- Niet los getest of `/assets/*.js` zelf ook `Content-Encoding: gzip` teruggeeft (alleen
  HTML is getest) — de opdracht stelt dat dit al geverifieerd is buiten deze sessie, dat
  is hier niet onafhankelijk herbevestigd.
- Geen bytes gemeten: onbekend hoeveel KB `index-D_5BHSUg.js` en `styles-D9ZTCRAG.css`
  nu wegen, gecomprimeerd of ongecomprimeerd. De cijfers uit de vorige audit
  (244 KB/862 KB voor de oude `index-CxzhDqWp.js`) horen bij een ander bestand
  (andere hash = mogelijk andere inhoud/grootte) en mogen niet als huidige waarde worden
  aangenomen.
- Brotli-status niet herverifieerd (vorige audit: alleen gzip, geen brotli — mogelijk
  nog steeds een openstaande low-effort winst, PERF-2 uit de vorige audit).
**Fix:** `curl -s -o /dev/null -w "%{size_download}\n" --compressed
https://aimi-development.nl/assets/index-D_5BHSUg.js` (en idem voor de CSS) om de
werkelijke transfer-grootte te bevestigen; daarna een Lighthouse-run om te zien of TBT/
LCP zijn verbeterd t.o.v. de vorige 50-200ms TBT / 3,5-4,3s LCP-baseline.

### PERF-4 — Framer Motion + ~28 losse Radix-packages blijven in de dependency-boom (Medium, ongewijzigd t.o.v. vorige audit)
`package.json` bevat nog steeds `"motion": "^12.40.0"` en afzonderlijke
`@radix-ui/react-*`-packages (accordion, alert-dialog, avatar, checkbox, dialog,
dropdown-menu, navigation-menu, popover, select, tabs, tooltip, en meer — ~28 in
totaal). `Pricing.tsx` (homepage-sectie, niet gebruikt op `/tarieven`) en `Contact.tsx`
gebruiken beide nog `motion.*` met `initial={{opacity:0}}`-patronen voor
scroll-in-view-animaties — prima voor content die toch pas zichtbaar wordt na scrollen,
maar dit bevestigt dat de onderliggende librarygrootte niet is aangepakt, alleen de
above-the-fold-toepassing ervan op Home/Tarieven. Niet gemeten deze sessie: of dit
daadwerkelijk tot een aparte `motion-*.js`/`radix-*.js`-chunk leidt in de huidige build
(de vorige audit vond 41 KB/124 KB voor motion en 18 KB/53 KB voor radix, maar met
andere bestandshashes dus niet automatisch nog geldig).
**Fix:** ongewijzigd advies uit de vorige audit — controleer met een Lighthouse
network-requests-audit welke chunks daadwerkelijk op elke pagina laden, en of
Radix-primitives die alleen in `_authenticated`/portal-routes gebruikt worden
(bijv. dnd-kit, command, menubar) uit de publieke marketingroutes te splitsen zijn.

## Categoriescore: 55/100

**Dit is geen Lighthouse-performance-score** — die vereist een lab-run die deze sessie
niet is gelukt. De 55/100 is een beredeneerde inschatting op basis van wat wél
geverifieerd is:

- Plus: de belangrijkste vorige High-bevinding (opacity:0-hydratievertraging op de
  LCP-kandidaat) is aantoonbaar met CSS-only entrance-animaties opgelost op de homepage
  en was nooit aanwezig op `/tarieven`; Calendly laadt correct lazy; caching-headers op
  HTML zijn onveranderd passend; gzip-mechanisme werkt aantoonbaar op HTML in productie.
- Min: geen enkele verse CWV-meting (LCP/INP-proxy/CLS/FCP/TTFB) beschikbaar voor
  2026-09-21 — de kernvraag van deze opdracht blijft onbeantwoord in cijfers;
  `/website-laten-maken`'s hero-component (`ServicePage.tsx`) is niet gecontroleerd;
  bundle-omvang na de gzip-fix en brotli-status zijn niet bevestigd.

**Aanbevolen vervolgstap, met prioriteit:** rond PERF-1 af (de 6 Lighthouse-runs +
`lcp_subparts.py`) voordat verdere performance-conclusies worden getrokken — zonder die
cijfers is niet vast te stellen of de site nu daadwerkelijk aan de "good"-drempels
(LCP ≤2,5s, CLS ≤0,1) voldoet, ondanks de bemoedigende code-signalen.
