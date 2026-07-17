# Ideeën & tips: Klantenportaal (/portal) verbeteren

Gebaseerd op een doorlichting van `src/routes/_authenticated/portal.tsx` (en aanverwante routes zoals `portal.projecten.$projectId.tsx`). Puur inventarisatie — niks is uitgevoerd.

---

## 1. Onboarding & eerste indruk

- **Welkomstflow voor nieuwe klanten**: geen enkele change ingediend + geen website gekoppeld → toon een korte "aan de slag"-checklist bovenaan (nu bestaat er al een `onboarding` sectie onderaan, maar die staat pas na budget/website/activiteit — verplaats naar boven voor nieuwe klanten).
- **Lege staten verrijken**: `EmptyChanges` is goed, maar de "Mijn website"-tab bij het ontbreken van een URL kan een duidelijkere CTA krijgen ("Vul je website toe → link naar profiel/instellingen").
- **Progressieve onboarding-badge**: laat het percentage voltooide onboarding-stappen zien als ring/progress i.p.v. alleen een lijst met vinkjes.

## 2. Navigatie & informatiearchitectuur

- **Sidebar i.p.v. losse tabs**: nu zijn er 3 tabs (Overzicht / Jouw changes / Mijn website) plus een aparte projectenlijst binnen de website-tab. Overweeg een linker sidebar met Dashboard / Changes / Projecten / Website / Facturen, zodat het portaal meer als een "app" aanvoelt en minder als één lange scrollpagina.
- **Deep linking naar tabs**: tab-status zit nu alleen in React state (`useState<"overview"|"changes"|"website">`), niet in de URL. Bij page refresh of het delen van een link valt de klant altijd terug op "overview". Zet dit in de URL (search param of sub-route) zodat een support-medewerker een klant naar `/portal?tab=changes` kan verwijzen.
- **Breadcrumbs op projectdetailpagina** (`portal.projecten.$projectId.tsx`) voor duidelijke terugnavigatie.
- **"Mijn projecten" en "Mijn website" samenvoegen of beter onderscheiden**: nu zit projectenlijst bovenin de website-tab, wat verwarrend kan zijn — een klant met 1 website maar meerdere projecten (bv. fase 1 + fase 2) ziet dit door elkaar lopen.

## 3. Changes / aanvragen-flow

- **Statusuitleg tooltip**: de stepper (Ingediend → Beoordeeld → In uitvoering → Review → Afgerond) is visueel sterk, maar er is geen uitleg wat elke stap concreet betekent of hoelang deze gemiddeld duurt. Een tooltip/popover met "gemiddelde doorlooptijd per stap" verhoogt vertrouwen.
- **Voortgangsindicatie op dashard-niveau**: toon niet alleen "X open changes" maar ook "gemiddelde responstijd van AIMI" als vertrouwenswekkende metric.
- **Drag-and-drop file upload** i.p.v. alleen de knop "Bestand bijvoegen" — huidige input is functioneel maar weinig visueel (`<input type="file" className="hidden">`).
- **Preview van bijlagen**: nu toont het alleen bestandsnamen als knopjes; thumbnails voor afbeeldingen zouden prettiger zijn.
- **Autosave concept van het change-formulier**: als een klant per ongeluk de tab sluit terwijl hij een lange omschrijving aan het typen is, is alles kwijt. LocalStorage-draft (vergelijkbaar met hoe `seenThreads` al in localStorage zit) zou dit oplossen.
- **Live counter voor tekengrenzen**: geen maxlength/teller op titel/omschrijving — soms fijn voor klanten om te weten hoeveel ruimte ze hebben, of juist een minimum aan te geven ("beschrijf minimaal X tekens voor sneller oppakken").
- **Duidelijkere kostenweergave vooraf**: de prijsindicatie (`formPrice`) verschijnt nu pas onderaan het formulier. Zet een korte prijsindicatie ook al bij het kiezen van categorie, zodat de klant niet per ongeluk een betaalde categorie kiest zonder dit te beseffen.
- **"Goedkeuren" knop bij status Review doet nu een `alert()`** (`onClick={() => alert("Neem contact op met AIMI om goed te keuren.")}`) — dit is duidelijk een placeholder. Grote kans om hier een écht goedkeur-mechanisme te bouwen: klant klikt "Goedkeuren", change gaat automatisch naar "Afgerond", eventueel met een korte review/rating stap. Dit sluit ook aan bij de "Beoordeel deze change"-tekst die al staat bij `afgerond`-status maar nergens interactief is.
- **Sterren-rating niet klikbaar**: bij status `afgerond` staat een `<Star>` icoon met tekst "Beoordeel deze change" maar er zit geen click-handler aan. Dit is een gemiste kans om échte klanttevredenheid te meten per change.
- **Bulk-acties**: bij veel changes tegelijk (bv. meerdere kleine tekstwijzigingen) kan een klant nu alleen 1-voor-1 een change indienen. Overweeg een "meerdere items in 1 aanvraag" flow met losse subitems.
- **Sjablonen uitbreiden**: `CHANGE_TEMPLATES` bestaat al en is goed — voeg wellicht per branche/type project andere templates toe, of laat AIMI zelf templates beheren vanuit de adminkant zodat veelvoorkomende aanvragen sneller gaan.

## 4. Communicatie / thread per change

- **Ongelezen-badge werkt nu alleen lokaal via localStorage** (`seenThreads`) — dit werkt niet cross-device. Een klant die op laptop een bericht al gelezen heeft, ziet op mobiel weer "ongelezen". Verplaats deze logica naar de server (bv. `last_seen_at` per request/profiel in de database) voor consistente state.
- **Typing-indicator / "AIMI is aan het typen"** zou net wat meer levendigheid geven aan het threadgesprek, vooral in combinatie met de al aanwezige `ChatWidget`.
- **E-mail/push notificatie bij nieuw bericht**: check of dit al bestaat via `markNotificationRead`/`markAllNotificationsRead` — zo niet, is dit een grote win voor engagement (klant komt nu alleen terug als hij toevallig weer inlogt).
- **@mentions of file-attach in de thread zelf**: nu kan een klant alleen tekst typen in het reactieveld, geen bijlage toevoegen aan een reactie (alleen bij het oorspronkelijke change-formulier).

## 5. Website-monitoring tab

- **Alert-abonnement**: als uptime onder een grens zakt, kan de klant nu alleen zien dat de site plat lag via de kleurcodering — geen proactieve melding. Voeg een opt-in "stuur mij een e-mail als mijn site offline gaat" toe.
- **Historie verder terug dan 7 dagen**: `dailyUptime` toont nu alleen de afgelopen week. Een maand- of kwartaaloverzicht (evt. downloadbaar als rapport) versterkt het "wij monitoren je site professioneel"-gevoel richting de klant.
- **SSL/domeinvervaldatum tonen**: relevante technische zaken die klanten vaak vergeten (SSL-certificaat verloopt, domeinregistratie verloopt) kunnen in dezelfde tab worden getoond, wat het portaal waardevoller maakt dan alleen uptime.
- **Performance-trend grafiek**: responstijd wordt nu alleen als los getal getoond (`avgMs`), geen trendlijn zoals bij uptime. Een simpele sparkline zou inzicht geven of de site trager wordt over tijd.

## 6. Facturatie / "extra changes kopen"

- **Duidelijkere BTW-vermelding**: prijs wordt getoond als "€20 per extra change" en in de dialog als "€X excl. BTW" — zorg dat dit overal consistent excl./incl. wordt weergegeven, klanten worden hier vaak door verrast.
- **Online betalen i.p.v. factuur achteraf**: nu wordt bij het kopen van extra changes altijd een factuur gestuurd ("betaling binnen 14 dagen"). Overweeg Mollie/Stripe checkout direct in het portaal voor snellere doorlooptijd en minder betalingsachterstand.
- **Factuuroverzicht in portaal**: er is nergens een "Facturen" sectie zichtbaar in deze route — als dit nog niet bestaat, zou een overzicht van betaalde/openstaande facturen een logische toevoeging zijn naast changes en website.
- **Creditsysteem visualiseren als "wallet"**: `availableCredits` wordt nu getoond als tekst + voortgangsbalk. Een tegelvormige "credit balance"-widget (vergelijkbaar met veel SaaS-dashboards) kan dit prominenter en prettiger maken.

## 7. Personalisatie & vertrouwen

- **Accountmanager/contactpersoon tonen**: als AIMI werkt met vaste contactpersonen per klant, toon naam + foto van de verantwoordelijke persoon in het portaal — dit verhoogt vertrouwen en verlaagt drempel om te chatten.
- **Voortgang tov. vergelijkbare klanten**: (optioneel, alleen als privacy-vriendelijk) "gemiddeld worden changes binnen X dagen afgerond" als sociale proof.
- **Dark/light mode check**: cancel-dialog gebruikt een hardcoded kleur (`background: "#25262b"`) i.p.v. design tokens — kan problemen geven als er ooit een lichte modus komt of als het thema wijzigt. Los dit op door consistent design-tokens (`bg-card`, etc.) te gebruiken i.p.v. hex-codes verspreid door de component.

## 8. Toegankelijkheid & mobiel

- **Filter-knoppen op mobiel**: de filter-balk (`Alle/Open/In behandeling/...`) is een horizontaal scrollende rij zonder scroll-indicator; klanten kunnen missen dat er meer filters rechts staan. Voeg een subtiele fade/gradient of pijltje toe aan de randen.
- **Formulierlengte op mobiel**: het "Nieuwe change"-formulier is best lang op klein scherm. Overweeg een wizard-achtige (stap 1: titel/omschrijving, stap 2: categorie/prioriteit, stap 3: bijlagen+bevestigen) opzet voor mobiel, of behoud het lange formulier maar met een sticky "Indienen"-knop onderaan het scherm.
- **Focus states en toetsenbordnavigatie**: veel is al goed (aria-labels, focus-visible rings op enkele knoppen), maar controleer consistent op alle interactieve elementen (bv. filter-chips, categorie-templates) of focus-states aanwezig zijn.

## 9. Performance & techniek (kleine dingen die opvielen in de code)

- **`any`-types overal** (`data: any`, `r: any`, etc.) — geen directe UX-impact maar verhoogt kans op runtime bugs die de klant wél merkt (bv. undefined crashes). Op termijn de dashboard-response typen zou de betrouwbaarheid van het portaal verhogen.
- **Losse `useQuery` voor changeform-projecten en algemene projectenlijst** (`portalListMyProjectsForChangeForm` vs `portalListMyProjects`) — mogelijk overlappende data die met 1 query en client-side filtering samengevoegd kan worden, wat de laadtijd van tabs verbetert.
- **Geen paginering bij veel changes**: `filteredChanges` rendert alles in 1 keer. Bij klanten met tientallen changes kan dit traag worden — overweeg paginatie of "laad meer" na bv. 20 items.

## 10. Grotere, strategische toevoegingen (langere termijn)

- **Roadmap/planning-widget**: laat klant zien wat er de komende weken gepland staat voor hun project (sluit aan bij `PROJECT_STATUS_LABEL`/deadline-logica die al bestaat in `project-status.ts`).
- **Kennisbank/FAQ-tab**: veelgestelde vragen ("hoe dien ik een change in", "wat kost een spoedaanvraag") direct in het portaal i.p.v. alleen via de ChatWidget.
- **Exporteren van gegevens**: klant moet kunnen exporteren welke changes zijn ingediend/afgerond (CSV/PDF) voor eigen administratie.
- **Referral/aanbevelen-widget**: als AIMI groeit via mond-tot-mondreclame, kan een simpele "beveel AIMI aan" sectie in het portaal een laagdrempelige groeikanaal zijn.

---

### Quick wins (makkelijk te implementeren, hoge impact)
1. "Goedkeuren"-knop en ster-rating écht functioneel maken (nu alert/dode knop).
2. Ongelezen-status server-side opslaan i.p.v. alleen localStorage.
3. Tab-status in de URL zetten voor deelbare/verversbare links.
4. Hardcoded kleuren (`#25262b`, `#fe2c02`, etc.) vervangen door design-tokens voor consistentie.
5. Prijsindicatie tonen zodra categorie gekozen wordt, niet pas onderaan het formulier.
