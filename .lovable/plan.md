## Scope

Dit is een grote uitbreiding (10+ features) verdeeld over admin, klantportaal, database en een externe website-tracking integratie. Ik wil een paar dingen verifiëren voordat ik bouw, want sommige onderdelen kunnen niet "echt" werken zonder extra setup.

---

## Wat ik in één keer kan bouwen (bevestig dit lijstje)

### Admin portaal
1. **Bulk acties** — checkboxes in change-lijst, knop "Markeer 5 als gereed + factureer" (zet status=`done` en `is_paid=true` voor selectie).
2. **Klant contactmomenten** — nieuwe tabel `client_contacts` (telefoon/meeting/mail + datum + samenvatting), zichtbaar per klant.
3. **Klant gezondheidsscore** — berekend uit: % betaalde changes betaald, change frequentie laatste 30 dagen, gem. responstijd op comments. Groen/oranje/rood badge in klantlijst.
4. **Alle changes overzicht** — aparte tab "Alle changes" met filters op klant, datum, status, categorie + zoeken op nummer.
5. **Changes nummers** — kolom `request_number` (auto-increment, bv. `CHG-0001`), getoond in admin én klantportaal.

### Klantportaal
6. **Meerdere contactpersonen** — uitbreiding profiel: `contact_financial`, `contact_technical`, `contact_general` (naam + email + tel).
7. **Change annuleren** — knop "Annuleer" op pending/in_review changes (niet bij in_progress/done). Zet status op `rejected` met reden.
8. **Ticket categorieën** — extra veld `ticket_type` (vraag/bug/feature/klacht) bij aanmaken change.

---

## Wat extra setup vereist — graag keuze

### Login geschiedenis (laatste 5 inlogmomenten met IP + apparaat)
Supabase Auth logt dit wel intern, maar via de gewone API is het niet ophaalbaar per gebruiker. Opties:
- **A** — Eigen tabel `login_events` bijhouden via een client-side hook na elke login (IP via een serverFn, user-agent uit browser). Werkt vanaf nu, niet voor historische logins.
- **B** — Niet bouwen.

### Website uptime + foutenlog ("alle sites gemaakt met Lovable, data sturen naar ons portaal")
Lovable projecten exposen geen uptime/error API die wij van buitenaf kunnen pollen. Om dit "echt" te maken zijn er twee paden:
- **A** — Mini-snippet die jij in elke klantsite plakt (`<script src="https://onze-site/track.js">`). Die snippet pingt elke X minuten een endpoint (`/api/public/heartbeat`) en stuurt JS errors door naar `/api/public/error`. Wij slaan op in `site_pings` + `site_errors` tabellen en tonen uptime % + laatste 5 fouten in klantportaal.
- **B** — Externe uptime-service (UptimeRobot API) per klant, vereist API key. Meer setup.
- **C** — Skip nu, alleen UI placeholder.

Mijn voorkeur: **A** (volledig zelfgebouwd, geen externe key, werkt direct).

---

## Database migrations
- `change_requests`: kolommen `request_number` (serial), `ticket_type`, `cancellation_reason`. Status enum krijgt `cancelled`.
- `profiles`: kolommen voor 3 contactpersonen (JSON of 9 losse velden — ik kies JSON `contacts jsonb`).
- Nieuwe tabel `client_contacts` (admin logs contactmomenten).
- Nieuwe tabel `login_events` (als optie A gekozen).
- Nieuwe tabellen `site_pings` + `site_errors` (als optie A gekozen).

---

## Vragen
1. **Login geschiedenis** — A (zelf loggen vanaf nu) of B (skip)?
2. **Website uptime/fouten** — A (eigen tracking snippet) / B (UptimeRobot) / C (skip)?
3. **Volgorde** — alles in één grote batch, of admin-features eerst en website-tracking apart?

Laat me weten, dan begin ik direct.