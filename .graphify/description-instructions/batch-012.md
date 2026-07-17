# Node Description Batch 13 of 35

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

- "components_portalonboardingtour_portalonboardingtour": "PortalOnboardingTour()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L46 | neighbors=[portal.tsx, PortalOnboardingTour.tsx]
- "components_portaltutorial_portaltutorial": "PortalTutorial()" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L51 | neighbors=[portal.tsx, PortalTutorial.tsx]
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
- "lib_accounts_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L13 | neighbors=[accounts.functions.ts, getRoles()]
- "lib_accounts_functions_ensuresuper": "ensureSuper()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L17 | neighbors=[accounts.functions.ts, getRoles()]
- "lib_admin_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/admin.functions.ts:L34 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensureleadsaccess": "ensureLeadsAccess()" | kind=code-symbol | source=src/lib/admin.functions.ts:L3005 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensurestaff": "ensureStaff()" | kind=code-symbol | source=src/lib/admin.functions.ts:L42 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensuresuperadmin": "ensureSuperAdmin()" | kind=code-symbol | source=src/lib/admin.functions.ts:L38 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_generateduerecurringtaskinstances": "generateDueRecurringTaskInstances()" | kind=code-symbol | source=src/lib/admin.functions.ts:L1950 | neighbors=[admin.functions.ts, nextRecurrenceDueDate()]
- "lib_admin_functions_getroles": "getRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L21 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_nextrecurrenceduedate": "nextRecurrenceDueDate()" | kind=code-symbol | source=src/lib/admin.functions.ts:L1938 | neighbors=[admin.functions.ts, generateDueRecurringTaskInstances()]
- "lib_admin_server_admincreatecustomer": "adminCreateCustomer()" | kind=code-symbol | source=src/lib/admin.server.ts:L11 | neighbors=[admin.server.ts, generateTempPassword()]
- "lib_admin_server_admininvitestaffmember": "adminInviteStaffMember()" | kind=code-symbol | source=src/lib/admin.server.ts:L265 | neighbors=[admin.server.ts, genTempPw()]
- "lib_admin_server_generatetemppassword": "generateTempPassword()" | kind=code-symbol | source=src/lib/admin.server.ts:L3 | neighbors=[admin.server.ts, adminCreateCustomer()]
- "lib_admin_server_gentemppw": "genTempPw()" | kind=code-symbol | source=src/lib/admin.server.ts:L228 | neighbors=[admin.server.ts, adminInviteStaffMember()]
- "lib_csv_detectdelimiter": "detectDelimiter()" | kind=code-symbol | source=src/lib/csv.ts:L4 | neighbors=[csv.ts, parseCsv()]
- "lib_email_server_escapehtml": "escapeHtml()" | kind=code-symbol | source=src/lib/email.server.ts:L6 | neighbors=[email.server.ts, sendWelcomeEmail()]
- "lib_email_server_sendwelcomeemail": "sendWelcomeEmail()" | kind=code-symbol | source=src/lib/email.server.ts:L25 | neighbors=[email.server.ts, escapeHtml()]
- "lib_error_capture_consumelastcapturederror": "consumeLastCapturedError()" | kind=code-symbol | source=src/lib/error-capture.ts:L18 | neighbors=[error-capture.ts, server.ts]
- "lib_monitoring_shared_isprivateorreservedip": "isPrivateOrReservedIp()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L28 | neighbors=[monitoring.shared.ts, assertPublicHost()]
- "lib_monitoring_shared_measureresponsetime": "measureResponseTime()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L40 | neighbors=[monitoring.shared.ts, assertPublicHost()]
- "lib_permissions_server_ensurepermission": "ensurePermission()" | kind=code-symbol | source=src/lib/permissions.server.ts:L78 | neighbors=[permissions.server.ts, getEffectivePermissions()]
- "lib_permissions_server_geteffectivepermissions": "getEffectivePermissions()" | kind=code-symbol | source=src/lib/permissions.server.ts:L31 | neighbors=[permissions.server.ts, ensurePermission()]
- "lib_project_status_project_priority_order": "PROJECT_PRIORITY_ORDER" | kind=code-symbol | source=src/lib/project-status.ts:L45 | neighbors=[admin.projecten.tsx, project-status.ts]
- "lib_rate_limit_getclientip": "getClientIp()" | kind=code-symbol | source=src/lib/rate-limit.ts:L54 | neighbors=[rate-limit.ts, server.ts]
- "lib_rate_limit_isipbanned": "isIpBanned()" | kind=code-symbol | source=src/lib/rate-limit.ts:L30 | neighbors=[rate-limit.ts, server.ts]
- "lib_rate_limit_recordstrike": "recordStrike()" | kind=code-symbol | source=src/lib/rate-limit.ts:L41 | neighbors=[rate-limit.ts, server.ts]
- "lib_rbac_all_permission_actions": "ALL_PERMISSION_ACTIONS" | kind=code-symbol | source=src/lib/rbac.ts:L45 | neighbors=[permissions.server.ts, rbac.ts]
- "lib_rbac_role_label": "ROLE_LABEL" | kind=code-symbol | source=src/lib/rbac.ts:L11 | neighbors=[TeamTab.tsx, rbac.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-012.json

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
