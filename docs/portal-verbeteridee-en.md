# Ideeën ter verbetering van het klantenportaal (`/portal`)

Gebaseerd op een doorlichting van `src/routes/_authenticated/portal.tsx`,
`portal.projecten.$projectId.tsx` en gerelateerde admin-routes. Puur ideeën,
niks is uitgevoerd.

---

## 1. Overzicht / dashboard (tab "Overzicht")

- **Personalisatie**: begroeting kan tijdstip-afhankelijk ("Goedemorgen") en een
  korte samenvatting tonen ("Je hebt 2 openstaande changes en 1 nieuw bericht").
- **Actiegerichte cards bovenaan**: als er een change in "Klaar voor review" staat,
  of een ongelezen bericht is, zet dat als banner bovenaan i.p.v. onderin een lijst
  — dit zijn de dingen waar de klant nu iets mee moet.
- **Voortgangsbalk "changes deze maand"**: leg uit wanneer de teller reset (1e van de
  maand?) — nu staat dat nergens. Voeg een tooltip of subtekst toe.
- **Website status kaart**: nu een simpele groene/rode stip. Kan uitgebreid met
  laatste check-tijdstip, en een link naar de "Mijn website" tab i.p.v. alleen de
  externe link.
- **Recente activiteit**: toon ook wie de laatste actie deed (AIMI vs. klant) en
  wat er gebeurde (bijv. "Status gewijzigd naar Review"), niet alleen titel + datum.
- **Onboarding checklist**: als alle items klaar zijn, verberg deze sectie i.p.v.
  'm leeg/afgevinkt te laten staan — geeft een opgeruimder eindresultaat.
- **Lege-staat states**: check of elke sectie (afspraken, onboarding, activiteit)
  een goede empty-state heeft voor gloednieuwe klanten die nog niks hebben.

## 2. Changes tab

- **Sneltoetsen/bulkacties**: bij veel changes is er geen manier om meerdere tegelijk
  te filteren op categorie of om te exporteren (bijv. CSV van alle changes voor eigen
  administratie).
- **Statusfilter uitbreiden**: nu alleen all/open/in_behandeling/afgerond/afgewezen.
  Overweeg een los filter op categorie en op "heeft ongelezen berichten".
  Klanten met veel changes willen snel kunnen zien "waar wacht AIMI op input van mij".
- **Search kan uitgebreid** naar omschrijving en request-nummer zonder `#chg-` prefix
  te hoeven typen (nu wordt alleen title + volledig nummer gematcht).
- **"Goedkeuren" knop bij status Review doet nu `alert(...)`** — dat is een duidelijke
  placeholder (`onClick={() => alert("Neem contact op met AIMI...")}`). Dit is een
  gemiste kans: een klant kan in-app niet echt goedkeuren, wat wrijving oplevert op
  het meest kritieke moment (het opleveren van werk). Een echte approve-flow
  (met evt. handtekening/checkbox "ik keur dit goed") zou dit veel prettiger maken.
- **"Beoordeel deze change" (sterren-icoon bij afgerond) doet niks** — er is geen
  klik-handler. Als reviews/ratings een feature worden, kan dit een mooi
  feedback-kanaal zijn (CSAT per change) en input geven voor kwaliteitsbewaking.
- **Kostenoverzicht per change**: nu staat "Kosten: €40 / Gratis" als tekstregel.
  Een cumulatief overzicht ("Deze maand €120 aan betaalde changes") zou nuttig zijn
  voor klanten die grip willen houden op de rekening, vooral i.c.m. de "extra
  changes kopen" flow.
- **Threaded messages**: chat per change is functioneel maar mist:
  - typing/loading state bij versturen
  - bestand bijvoegen in een reactie (nu alleen bij het aanmaken van de change)
  - "markeer als gelezen" gebeurt nu alleen bij open-klikken; overweeg automatisch
    read-receipt zodra het bericht in beeld scrollt.
- **Formulier "Nieuwe change"**: templates zijn een goed idee. Overweeg:
  - character counter op omschrijving, zodat mensen weten hoeveel detail genoeg is
  - preview van bijgevoegde afbeeldingen i.p.v. alleen bestandsnaam
  - drag-and-drop voor bestanden i.p.v. alleen de knop
  - inline validatie (nu pas foutmelding na submit-poging via alert/toast)
- **Cancel-flow**: mooi met bevestiging + reden, maar de modal gebruikt een
  losse hardcoded kleur (`background: "#25262b"`) i.p.v. design tokens — inconsistent
  met de rest van de app die met `bg-card`/`border-border` werkt. Ook qua UX: geen
  "undo" mogelijkheid als iemand per ongeluk annuleert.
- **Prioriteit "urgent"** kan mogelijk misbruikt worden zonder consequenties (geen
  cooldown/limiet zoals bij spoed). Overweeg een duidelijke uitleg wanneer "urgent"
  gepast is, zodat de admin-kant niet overspoeld raakt.

## 3. "Mijn website" tab

- **Monitoring is mooi opgezet** (uptime, response tijd, 7-daagse grafiek), maar:
  - geen downtime-notificatie/alert-instelling voor de klant zelf (bijv. e-mail bij
    >X min downtime) — nu moet je zelf inloggen om het te zien.
  - "Laatste fouten" sectie toont ruwe foutmeldingen (`e.message`) — dit kan
    technisch/intern jargon lekken naar de klant. Overweeg een klantvriendelijke
    samenvatting i.p.v. de raw error string.
  - Geen historie verder dan 7 dagen / 24u — een maandoverzicht (SLA-rapportage)
    zou toegevoegde waarde hebben, vooral voor klanten die uptime contractueel
    willen zien.
- **Mijn projecten sectie** binnen deze tab: logisch geplaatst, maar de naam
  "Mijn website" dekt de lading niet meer als er meerdere projecten in staan.
  Overweeg de tab te hernoemen naar "Website & projecten" of projecten een eigen
  tab te geven.
- Domeinkoppeling ontbreekt: als een klant een nieuwe/extra website wil koppelen
  is daar geen zelfbedieningsflow voor, moet via change request of los contact.

## 4. Navigatie & structuur

- **Drie tabs (Overzicht/Changes/Website)** dekken de huidige features, maar mist:
  - een "Facturen/Betalingen" tab — nu wordt bij het kopen van extra changes een
    factuur "verzonden", maar er is geen overzicht in de portal zelf van eerdere
    facturen/betaalstatus. Dit is een grote gemiste kans voor zelfbediening.
  - een "Documenten/Bestanden" plek — bijv. contracten, opgeleverde designs,
    exports.
- **Mobiele ervaring**: tabs hebben `overflow-x-auto`, dat werkt, maar de change-
  cards worden op mobiel al snel druk (veel metadata in grid-cols-2). Overweeg een
  compactere mobile-first kaart met "toon meer details" uitklap.
- **Notificatie-dropdown** toont alleen de laatste 10 en heeft geen "bekijk alles"
  link naar een volledig overzicht — bij drukke klanten (veel changes) mis je dan
  oudere meldingen.
- **Breadcrumbs/deep-linking**: tabstate zit alleen in React state (`useState`),
  niet in de URL. Een directe link naar "portal?tab=changes" delen (bijv. door
  support) kan niet. Overweeg tab-state te syncen met de query string.

## 5. Betrouwbaarheid & performance

- `getMyDashboard` haalt blijkbaar alles in één keer op (requests, notificaties,
  uptime, projecten). Bij klanten met veel historie kan dit traag worden — overweeg
  paginatie op de changes-lijst i.p.v. alles client-side filteren/sorteren.
- Losse queries (`portal-my-projects`, `portal-my-projects-change-form`,
  `dashboard`) lijken overlappende data op te halen (projecten). Zou
  gededupliceerd kunnen worden tot één query met gedeelde cache-key, of via
  `select` uit de dashboard-query afgeleid.
- Attachment-upload gebeurt sequentieel in een for-loop (`for (const f of files)`)
  — bij meerdere bestanden kan dit parallel met `Promise.all` voor snelheid.

## 6. Toegankelijkheid & polish

- Kleuren als `#fe2c02`, `#25262b`, `#e05252` zijn hardcoded i.p.v. via design
  tokens/CSS-variabelen — inconsistent met de rest die `var(--primary)` etc.
  gebruikt, en breekt vermoedelijk dark/light theming op die specifieke plekken.
- `alert()` gebruiken (bij "Goedkeuren") is niet toegankelijk en voelt niet als
  onderdeel van de UI — vervang door een Dialog zoals elders in de app al gebeurt.
- Contrast/labels: de meeste velden hebben goede `aria-label`s, maar check de
  filter-knoppen en de sterren-rating-tekst (die geen interactief element is,
  mogelijk verwarrend voor screenreaders daar het er als knop uitziet).

## 7. Groei-ideeën (verder weg, meer impact)

- **Self-service kennisbank/FAQ** gekoppeld aan de portal (bijv. "hoe vraag ik een
  spoedwijziging aan?") zodat minder simpele vragen als change/chat binnenkomen.
- **Live status van "wie werkt eraan"**: toon (optioneel) welke AIMI-medewerker
  een change oppakt — verhoogt vertrouwen en transparantie.
- **Maandelijkse samenvatting per e-mail**: "Deze maand: 4 changes afgerond,
  99.8% uptime" — versterkt de waardepropositie van het abonnement richting de klant.
- **Referral/uitbreiding**: knop "extra changes kopen" bestaat al — een soortgelijke
  CTA voor "upgrade abonnement" of "vraag een offerte voor nieuw project" zou de
  portal ook commercieel laten renderen, niet alleen support-gericht.
