# Plan: RBAC, change-verwijderen, klant-detail & team beheer

Dit is een grote uitbreiding. Ik splits het in 4 logische fases zodat we tussendoor kunnen testen. Laat me weten of je alles in één keer wilt, of fase-voor-fase.

## Fase 1 — Database & RBAC fundering

**Rollen uitbreiden** (`app_role` enum):
- Toevoegen: `super_admin`, `co_admin`, `support_agent`, `viewer`
- Behouden: `admin` (migreren naar `super_admin`), `customer`
- Jouw account wordt `super_admin`

**Nieuwe/aangepaste tabellen:**
- `change_requests`: kolommen `deleted_at`, `deleted_by`, `restored_at`, `restored_by` toevoegen (soft delete)
- `audit_log`: nieuwe tabel (`user_id`, `action`, `target_type`, `target_id`, `details jsonb`)
- `user_roles`: bestaand, krijgt extra waarden via uitgebreide enum
- Optioneel: `is_active` op profielen

**Security functions:**
- `has_any_role(_user_id, _roles[])` — handig voor RLS
- `can_manage_changes(_user_id)` → super_admin OR co_admin
- `can_delete_hard(_user_id)` → super_admin only
- RLS-policies herzien voor alle nieuwe rollen (viewer = SELECT, support_agent = SELECT + status update, etc.)
- Klant ziet géén soft-deleted changes (RLS filter `deleted_at IS NULL`)

## Fase 2 — Change verwijderen

**Server functions** (`admin.functions.ts`):
- `softDeleteChange(id)` — co_admin + super_admin
- `hardDeleteChange(id)` — super_admin only
- `restoreChange(id)` — super_admin only
- `bulkSoftDelete(ids[])`
- Alle acties loggen naar `audit_log`

**UI (admin changes lijst):**
- Rood prullenbak-icoon per change (alleen zichtbaar voor rollen met rechten)
- Confirmation modal met waarschuwing als status = `in_progress`
- Checkbox-selectie + "Verwijder geselecteerd"
- Banner bij geopende soft-deleted change: "Verwijderd door X op Y" + Herstel-knop (super_admin)
- Nieuwe route `/admin/changes/deleted` (super_admin only)

**Klant portaal:**
- Soft-deleted changes verdwijnen uit lijst
- Open link naar verwijderde change → melding "Niet langer beschikbaar"

## Fase 3 — Per-klant change overzicht

**Nieuwe route:** `/admin/clients/$clientId`

**Inhoud:**
- Klant basisgegevens (naam, email, telefoon, KVK, pakket, prijs)
- Statistieken: totaal changes, gratis vs betaald, omzet
- Volledige changes-tabel met filter (status incl. "verwijderd") + zoek
- Eenvoudige bar-chart "changes per maand" (recharts, al in project)
- CSV export-knop
- Knop "Nieuwe change namens klant" → opent dialog die change indient met `user_id = klant`
- Breadcrumb: Admin → Klanten → [Naam] → Changes
- Klantenlijst-rij wordt klikbaar

## Fase 4 — Team / gebruikersbeheer

**Nieuwe route:** `/admin/team` (super_admin only, co_admin read-only)

**Functionaliteit:**
- Lijst van alle non-klant gebruikers met rol, status, ingesteld door, datum
- "Nieuwe admin toevoegen" dialog: email + rol + optionele einddatum
  - Maakt/zoekt user via admin API, kent rol toe in `user_roles`
- Rol-wijzig dropdown (super_admin only)
- Deactiveer-knop (super_admin only, kan zichzelf niet)
- Audit-log paneel onderaan (super_admin only): laatste 100 acties

**Email uitnodiging:** ik gebruik Lovable's app-emails (transactional) infrastructuur. Vereist eerst email-domein setup — zonder dat skippen we de mail en toon ik in plaats daarvan de inloglink in de UI.

## Technische aanpak

- Centraal `usePermissions()` hook + `<Can action="...">` wrapper voor UI gating
- Server-side: elke server function controleert rol via `has_any_role`
- RLS blijft de laatste verdediging
- Bestaande `admin` rol → automatisch gemigreerd naar `super_admin`

## Scope-vragen

Voor ik begin met bouwen, twee dingen om te bevestigen:

1. **Email uitnodigingen voor co-admins** — wil je dat ik de Lovable app-emails setup ook doe (vereist domein-configuratie), of slaan we dat over en doen we het via een inloglink die je zelf doorstuurt?
2. **Volgorde** — alles in één grote build, of liever fase 1+2 eerst zodat je tussentijds kan testen?

Zeg bv "alles in 1x, geen email" of "fase 1+2 eerst, met email" en ik begin direct.
