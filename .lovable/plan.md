Grote refactor van klantportaal en admin portaal. Twee nieuwe Supabase tabellen, sidebar herstructurering met Lucide icons, drie nieuwe admin pagina's, overzicht herontwerp, en bug fixes.

## Stap 1 — Database migratie

Twee nieuwe tabellen aanmaken via migration:

- `password_reset_requests` (id, user_id, user_email, user_name, requested_at, status default 'pending', handled_at, handled_by)
  - RLS: user mag eigen INSERT/SELECT; staff (admin) mag alles
- `extra_change_requests` (id, user_id, user_email, user_name, amount, total_eur, requested_at, status default 'pending', handled_at, handled_by)
  - RLS: user mag eigen INSERT/SELECT; staff mag alles + UPDATE
- Bestaande `profiles` tabel krijgt geen wijziging — `website_url` bestaat al. `snippet_active` boolean toevoegen.

## Stap 2 — Bug fix portaal initial load

In `src/routes/_authenticated/portal.tsx` (en `account.tsx`) wordt nu een errorComponent getoond bij race-condition. Oplossing:
- `beforeLoad` toevoegen aan `_authenticated.tsx` met `supabase.auth.getUser()` hydratie (zoals docs voorschrijven), zodat bearer token aanwezig is voordat server fn draait.
- Initial `isLoading` toont skeleton card i.p.v. "Try again" foutweergave.

## Stap 3 — AccountMenu fixes (`src/routes/_authenticated.tsx`)

- Verwijder "Mijn changes" link.
- Vervang "Wachtwoord wijzigen" door knop "Wachtwoord reset aanvragen" die `requestPasswordReset` server fn aanroept → insert in `password_reset_requests`. Sonner toast bevestiging.

## Stap 4 — Portaal Overzicht herontwerp (`portal.tsx` overview tab)

- Verwijder 3 losse stat-cards.
- Voeg toe: `BudgetCard` met progress bar (gebruikt/totaal, kleur #D4622A).
- `OpenChangesCard` met grote teller en link naar Changes tab.
- `RecentActivity` (laatste 3 changes, status dot + titel + datum).
- `WebsiteStatusWidget` (groene/rode stip + url).
- `ExtraChangesBanner` donker (#1C1917) met − / count / + en "Aanvragen" knop → roept `requestExtraChanges` server fn aan → insert in `extra_change_requests`.

## Stap 5 — Portaal Mijn website tab

- Verwijder tracking snippet UI volledig.
- Stats kaal → met context (percentage gekleurd, "Laatste check: X min geleden", lege-state vriendelijke melding).

## Stap 6 — Admin sidebar herstructurering (`admin.tsx`)

Bouw een nieuwe linker sidebar component met:
- Lucide icons (BarChart2, Users, GitPullRequest, Inbox, MessageSquare, Calendar, MessagesSquare, UserCheck, Trash2, Key, ShoppingCart, Link2).
- 5 collapsible groepen (chevron rotatie):
  1. OVERZICHT: Dashboard
  2. KLANTEN: Alle klanten, Wachtwoord reset verzoeken, Extra change aanvragen
  3. WERK: Changes, Berichten, Aanvragen
  4. BEHEER: Website koppelingen, Team, Afspraken
  5. OVERIG: Verwijderd
- Stijl: actief = linker border 2px #D4622A + tekstkleur, hover alleen tekstkleur.
- Pending count badges (rood) voor reset & extra-change verzoeken.

Tab state uitbreiden met: `password_resets`, `extra_changes`, `website_links`.

## Stap 7 — Admin nieuwe pagina's

Drie nieuwe panel-componenten in `admin.tsx`:

- **PasswordResetsPanel**: tabel met pending+handled tabs, "Markeer afgehandeld" knop → update status.
- **ExtraChangesPanel**: tabel, "Goedkeuren" knop (insert in `extra_credits` + zet status approved) of "Afwijzen".
- **WebsiteLinksPanel**: lijst klanten met expandable rij: website_url editable, generated snippet `<script src=".../track.js?u=USER_ID">` met copy-knop, snippet_active toggle, status indicator (groen check als pings>0, oranje vraag als geen data, grijs kruis als niet gekoppeld).

Server functies toevoegen in `src/lib/admin.functions.ts`:
- `adminListPasswordResets`, `adminMarkPasswordResetHandled`
- `adminListExtraChangeRequests`, `adminApproveExtraChangeRequest`, `adminRejectExtraChangeRequest`
- `adminListWebsiteLinks`, `adminUpdateWebsiteLink`

## Stap 8 — Admin dashboard cards

- Lucide icoontje #D4622A linksboven per card.
- Trend indicator (pijl + percentage, 0% als geen vergelijking).
- Subtekst per metric.
- Extra cards: "Openstaande changes" (link) en "Pending verzoeken" (oranje als >0).

## Stap 9 — Server functies portaal toevoegen (`src/lib/portal.functions.ts`)

- `requestPasswordReset`: insert in password_reset_requests met user info.
- `requestExtraChanges`: insert in extra_change_requests met amount + total.

## Bestanden

**Nieuwe migratie**: `supabase/migrations/<timestamp>_password_reset_and_extra_changes.sql`

**Te bewerken**:
- `src/routes/_authenticated.tsx` — AccountMenu, beforeLoad guard
- `src/routes/_authenticated/portal.tsx` — overzicht & mijn website refactor, loading state
- `src/routes/_authenticated/admin.tsx` — sidebar + nieuwe panels + dashboard cards
- `src/lib/portal.functions.ts` — nieuwe server fns
- `src/lib/admin.functions.ts` — nieuwe server fns

Niets aan kleurenpalet, fonts, chat-widget, of bestaande auth logica.
