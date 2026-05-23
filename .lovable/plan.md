# Klantenportaal voor AIMI

Een volledig klantportaal toevoegen aan de bestaande site: klanten loggen in, dienen change requests in (max 3/maand, extra bij te kopen), en jij beheert alles vanuit een admin-dashboard met notificaties.

## Wat ik ga bouwen

### 1. Backend (Lovable Cloud aanzetten)
- **Auth**: Email + wachtwoord. Klanten registreren zichzelf NIET — alleen jij maakt accounts aan vanuit het admin-dashboard (klant krijgt invite-mail om wachtwoord in te stellen).
- **Tabellen**:
  - `profiles` — naam, email, bedrijf, gekoppeld aan `auth.users`
  - `user_roles` (admin/customer) — aparte tabel, security definer functie `has_role()`
  - `change_requests` — titel, beschrijving, status (pending/in_progress/done), klant, datum
  - `change_credits` — per klant: extra credits bovenop de 3/maand
  - `notifications` — in-app notificaties per klant (read/unread)
- **RLS**: klanten zien alleen hun eigen data; admins zien alles.

### 2. Klantenportaal (`/portal`)
- "Klantenportaal" knop in de nav (rechtsboven naast "Let's talk")
- Login pagina (`/login`)
- Dashboard met:
  - Resterende changes deze maand (3 + extra credits − gebruikt)
  - Lijst van eigen ingediende requests met status
  - Form om nieuwe change in te dienen (geblokkeerd bij 0 credits)
  - "Koop extra changes" knop → Stripe checkout (€49/change, instelbaar)
  - Notificatie-bel met ongelezen meldingen

### 3. Admin-dashboard (`/admin`)
- Alleen toegankelijk voor admin role
- Klantbeheer: nieuwe klant aanmaken (email + naam + bedrijf) → genereert account + verstuurt welkomstmail met wachtwoord-reset link
- Overzicht alle change requests, filter op klant/status, status updaten
- Notificatie sturen naar klant: verschijnt in portaal én wordt gemaild
- Credits handmatig toekennen aan klant

### 4. Payments (Stripe)
- Stripe aanzetten via Lovable
- Edge function / server function voor checkout sessie "extra change credit"
- Webhook → credits toevoegen aan `change_credits`

### 5. Emails (Lovable Emails)
- Welkomstmail bij account-aanmaak (met wachtwoord-reset link)
- Notificatie-mail wanneer admin notificatie stuurt
- Statusupdate-mail wanneer change request status verandert

## Wat ik van jou nodig heb

1. **Bevestiging om Lovable Cloud + Stripe + Lovable Emails aan te zetten** (allemaal nodig, gratis tiers).
2. **Jouw admin-email** — welke email wil je gebruiken om in te loggen als admin? Ik maak het account automatisch aan na setup en stuur je het tijdelijke wachtwoord (of je gebruikt "wachtwoord vergeten" direct).
3. **Prijs per extra change** — voorstel €49. Akkoord of ander bedrag?
4. **Email-domein** — wil je later een eigen `notify@aimi-...nl` opzetten, of voor nu de standaard Lovable sender gebruiken?

Zodra je akkoord bent, zet ik alles in één doorloop op.
