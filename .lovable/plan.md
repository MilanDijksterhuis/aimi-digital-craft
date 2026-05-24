Dit is een omvangrijke opdracht (8 features, ~15-20 nieuwe files, meerdere DB-migraties, een cron edge function en realtime). Ik wil dit graag in fases uitvoeren zodat je tussendoor kunt testen en credits gespaard blijven als iets niet hoeft.

## Voorgestelde fases

### Fase 1 — Database fundering (1 migratie)
Eén migratie waarin alles tegelijk:
- `profiles`: `is_blocked bool`, `access_expires_at timestamptz`, `last_seen_at timestamptz`
- `profiles.tags` → `text[]` (was al array volgens schema, verifiëren + fix policy zodat admins kunnen schrijven)
- `change_requests`: `archived bool`, `archived_at`, `archived_by`, `assigned_to uuid`
  (let op: `internal_note` bestaat al, dus die hoeven we niet toe te voegen)
- nieuwe tabel `admin_notifications` (id, type, title, message, link, is_read, created_at, triggered_by_user_id) + RLS (staff read/update eigen, system insert via service role)
- realtime publicatie aan voor `profiles` en `admin_notifications`
- RLS-update zodat admin `tags`, `is_blocked`, `access_expires_at` ook echt mag schrijven (huidig profiles UPDATE-policy blokkeert dit voor non-admin maar admin-pad zou al moeten werken — verifiëren)

### Fase 2 — Accounts beheer pagina (punt 1 + 7 + 8)
- nieuwe route `/admin/accounts` met tabel, zoek/filter, online-indicator, tags-modal
- server fns: lijst accounts, rol wijzigen (met `is_super_admin` check), blokkeren, tags bijwerken, last_seen ping
- realtime sub op `profiles.last_seen_at`

### Fase 3 — Tijdelijke accounts (punt 6)
- "+ Nieuw tijdelijk account" modal in /admin/accounts
- server fn met `supabaseAdmin.auth.admin.createUser` + welkomstmail
- access-check in `requireSupabaseAuth` middleware (verlopen → 403)
- waarschuwingsbanner in portal als < 3 dagen
- cron edge function (dagelijks 02:00 UTC) die verlopen accounts blokkeert
  ⚠ Resend voor welkomstmail: wil je dat ik dit nu opzet (vereist `RESEND_API_KEY` secret) of skip welkomstmail in v1 en alleen account aanmaken?

### Fase 4 — Changes archiveren + bulk + assign (punt 2)
- archiveer/herstel/hard-delete knoppen + "Gearchiveerd" tab
- bulk-archiveer met checkboxes
- "Toegewezen aan" dropdown + notificatie naar toegewezen staff
- "Prioriteit overschrijven" en "Interne notitie" UI (kolom bestaat al)
- klant-side: filter `archived=false` toevoegen

### Fase 5 — Admin notificaties (punt 3)
- bel-icoon in admin nav + dropdown met realtime
- `/admin/notifications` pagina
- triggers: server fns die al bestaan uitbreiden (nieuwe change, chat, reset, extra change, contact, change goedgekeurd, verlopen account)
- "tijdelijk account bijna verlopen" → onderdeel van Fase 3 cron

### Fase 6 — Bevestigingsdialoog extra changes (punt 4)
Kleine wijziging in bestaande "Aanvragen" knop in portal.

### Fase 7 — Tracking snippet (punt 5)
Toevoegen aan `__root.tsx` head (geen `index.html` in TanStack Start).
⚠ Let op: die URL lijkt jullie eigen `/track.js` route te zijn met een user-id parameter. Klopt het dat álle bezoekers (ook niet-ingelogd op de publieke site) onder die specifieke user-id getrackt moeten worden? Of moet `u=` dynamisch zijn per ingelogde gebruiker?

---

## Vragen voordat ik begin

1. **Volgorde / scope nu**: alle 8 fases in één keer, of liever per fase met tussentijds testen? Dit is realistisch 8-12 grote edits.
2. **Welkomstmail Resend** (Fase 3): nu opzetten of skip in v1?
3. **Tracking snippet `u=` parameter** (Fase 7): vaste user-id of dynamisch?
4. **Account verwijderen** (punt 1): hard delete van auth user via `supabaseAdmin.auth.admin.deleteUser` — bevestig dat dit OK is (verwijdert ook alle gerelateerde rows via cascade/triggers).

Zodra je deze 4 vragen beantwoordt + akkoord geeft op de fasering begin ik met Fase 1 (migratie).
