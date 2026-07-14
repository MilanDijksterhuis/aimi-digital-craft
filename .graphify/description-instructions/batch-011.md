# Node Description Batch 12 of 32

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "components_nav_nav": "Nav()" | kind=code-symbol | source=src/components/Nav.tsx:L11 | neighbors=[Nav.tsx, index.tsx]
- "components_pricing_pricing": "Pricing()" | kind=code-symbol | source=src/components/Pricing.tsx:L57 | neighbors=[Pricing.tsx, index.tsx]
- "components_processtimeline_processtimeline": "ProcessTimeline()" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L48 | neighbors=[ProcessTimeline.tsx, index.tsx]
- "components_services_services": "services" | kind=code-symbol | source=src/components/Services.tsx:L4 | neighbors=[Services.tsx, index.tsx]
- "components_teamtab_teamtab": "TeamTab()" | kind=code-symbol | source=src/components/TeamTab.tsx:L12 | neighbors=[admin.tsx, TeamTab.tsx]
- "hooks_expire_accounts_isauthorized": "isAuthorized()" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L15 | neighbors=[expire-accounts.ts, timingSafeStringEqual()]
- "hooks_expire_accounts_route": "Route" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L32 | neighbors=[expire-accounts.ts, routeTree.gen.ts]
- "hooks_expire_accounts_timingsafestringequal": "timingSafeStringEqual()" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L8 | neighbors=[expire-accounts.ts, isAuthorized()]
- "hooks_use_auth_authprovider": "AuthProvider()" | kind=code-symbol | source=src/hooks/use-auth.tsx:L19 | neighbors=[use-auth.tsx, _authenticated.tsx]
- "hooks_use_auth_useauth": "useAuth()" | kind=code-symbol | source=src/hooks/use-auth.tsx:L60 | neighbors=[use-auth.tsx, _authenticated.tsx]
- "hooks_use_mobile": "use-mobile.tsx" | kind=code-symbol | source=src/hooks/use-mobile.tsx:L1 | neighbors=[useIsMobile(), sidebar.tsx]
- "hooks_use_mobile_useismobile": "useIsMobile()" | kind=code-symbol | source=src/hooks/use-mobile.tsx:L5 | neighbors=[use-mobile.tsx, sidebar.tsx]
- "lib_accounts_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L12 | neighbors=[accounts.functions.ts, getRoles()]
- "lib_accounts_functions_ensuresuper": "ensureSuper()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L16 | neighbors=[accounts.functions.ts, getRoles()]
- "lib_admin_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/admin.functions.ts:L57 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensureleadsaccess": "ensureLeadsAccess()" | kind=code-symbol | source=src/lib/admin.functions.ts:L3044 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensurestaff": "ensureStaff()" | kind=code-symbol | source=src/lib/admin.functions.ts:L65 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensuresuperadmin": "ensureSuperAdmin()" | kind=code-symbol | source=src/lib/admin.functions.ts:L61 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_generateduerecurringtaskinstances": "generateDueRecurringTaskInstances()" | kind=code-symbol | source=src/lib/admin.functions.ts:L1972 | neighbors=[admin.functions.ts, nextRecurrenceDueDate()]
- "lib_admin_functions_getroles": "getRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L44 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_nextrecurrenceduedate": "nextRecurrenceDueDate()" | kind=code-symbol | source=src/lib/admin.functions.ts:L1960 | neighbors=[admin.functions.ts, generateDueRecurringTaskInstances()]
- "lib_admin_server_admincreatecustomer": "adminCreateCustomer()" | kind=code-symbol | source=src/lib/admin.server.ts:L11 | neighbors=[admin.server.ts, generateTempPassword()]
- "lib_admin_server_admininvitestaffmember": "adminInviteStaffMember()" | kind=code-symbol | source=src/lib/admin.server.ts:L265 | neighbors=[admin.server.ts, genTempPw()]
- "lib_admin_server_generatetemppassword": "generateTempPassword()" | kind=code-symbol | source=src/lib/admin.server.ts:L3 | neighbors=[admin.server.ts, adminCreateCustomer()]
- "lib_admin_server_gentemppw": "genTempPw()" | kind=code-symbol | source=src/lib/admin.server.ts:L228 | neighbors=[admin.server.ts, adminInviteStaffMember()]
- "lib_csv_detectdelimiter": "detectDelimiter()" | kind=code-symbol | source=src/lib/csv.ts:L4 | neighbors=[csv.ts, parseCsv()]
- "lib_error_capture_consumelastcapturederror": "consumeLastCapturedError()" | kind=code-symbol | source=src/lib/error-capture.ts:L18 | neighbors=[error-capture.ts, server.ts]
- "lib_monitoring_shared_isprivateorreservedip": "isPrivateOrReservedIp()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L28 | neighbors=[monitoring.shared.ts, assertPublicHost()]
- "lib_monitoring_shared_measureresponsetime": "measureResponseTime()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L40 | neighbors=[monitoring.shared.ts, assertPublicHost()]
- "lib_project_status_project_priority_order": "PROJECT_PRIORITY_ORDER" | kind=code-symbol | source=src/lib/project-status.ts:L45 | neighbors=[admin.projecten.tsx, project-status.ts]
- "lib_rate_limit_getclientip": "getClientIp()" | kind=code-symbol | source=src/lib/rate-limit.ts:L56 | neighbors=[rate-limit.ts, server.ts]
- "lib_rate_limit_isipbanned": "isIpBanned()" | kind=code-symbol | source=src/lib/rate-limit.ts:L36 | neighbors=[rate-limit.ts, server.ts]
- "lib_rate_limit_recordstrike": "recordStrike()" | kind=code-symbol | source=src/lib/rate-limit.ts:L43 | neighbors=[rate-limit.ts, server.ts]
- "lib_rbac_role_label": "ROLE_LABEL" | kind=code-symbol | source=src/lib/rbac.ts:L11 | neighbors=[TeamTab.tsx, rbac.ts]
- "lib_status_change_templates": "CHANGE_TEMPLATES" | kind=code-symbol | source=src/lib/status.ts:L88 | neighbors=[portal.tsx, status.ts]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_change_requests_touch": "change_requests_touch" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L122 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, public.change_requests]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_on_auth_user_created": "on_auth_user_created" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L111 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, auth.users]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_profiles_touch": "profiles_touch" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L120 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, public.profiles]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_extra_credits": "public.extra_credits" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L42 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, auth.users]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_notifications": "public.notifications" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L53 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, auth.users]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-011.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
