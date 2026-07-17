# Node Description Batch 13 of 34

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

- "hooks_use_mobile": "use-mobile.tsx" | kind=code-symbol | source=src/hooks/use-mobile.tsx:L1 | neighbors=[useIsMobile(), sidebar.tsx]
- "hooks_use_mobile_useismobile": "useIsMobile()" | kind=code-symbol | source=src/hooks/use-mobile.tsx:L5 | neighbors=[use-mobile.tsx, sidebar.tsx]
- "lib_accounts_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L13 | neighbors=[accounts.functions.ts, getRoles()]
- "lib_accounts_functions_ensuresuper": "ensureSuper()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L17 | neighbors=[accounts.functions.ts, getRoles()]
- "lib_admin_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/admin.functions.ts:L34 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensureleadsaccess": "ensureLeadsAccess()" | kind=code-symbol | source=src/lib/admin.functions.ts:L3013 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensurestaff": "ensureStaff()" | kind=code-symbol | source=src/lib/admin.functions.ts:L42 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensuresuperadmin": "ensureSuperAdmin()" | kind=code-symbol | source=src/lib/admin.functions.ts:L38 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_generateduerecurringtaskinstances": "generateDueRecurringTaskInstances()" | kind=code-symbol | source=src/lib/admin.functions.ts:L1972 | neighbors=[admin.functions.ts, nextRecurrenceDueDate()]
- "lib_admin_functions_getroles": "getRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L21 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_nextrecurrenceduedate": "nextRecurrenceDueDate()" | kind=code-symbol | source=src/lib/admin.functions.ts:L1960 | neighbors=[admin.functions.ts, generateDueRecurringTaskInstances()]
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
- "lib_project_status_project_priority_order": "PROJECT_PRIORITY_ORDER" | kind=code-symbol | source=src/lib/project-status.ts:L45 | neighbors=[admin.projecten.tsx, project-status.ts]
- "lib_rate_limit_getclientip": "getClientIp()" | kind=code-symbol | source=src/lib/rate-limit.ts:L54 | neighbors=[rate-limit.ts, server.ts]
- "lib_rate_limit_isipbanned": "isIpBanned()" | kind=code-symbol | source=src/lib/rate-limit.ts:L30 | neighbors=[rate-limit.ts, server.ts]
- "lib_rate_limit_recordstrike": "recordStrike()" | kind=code-symbol | source=src/lib/rate-limit.ts:L41 | neighbors=[rate-limit.ts, server.ts]
- "lib_rbac_role_label": "ROLE_LABEL" | kind=code-symbol | source=src/lib/rbac.ts:L11 | neighbors=[TeamTab.tsx, rbac.ts]
- "lib_status_change_templates": "CHANGE_TEMPLATES" | kind=code-symbol | source=src/lib/status.ts:L88 | neighbors=[portal.tsx, status.ts]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_change_requests_touch": "change_requests_touch" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L122 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, public.change_requests]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_on_auth_user_created": "on_auth_user_created" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L111 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, auth.users]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_profiles_touch": "profiles_touch" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L120 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, public.profiles]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_extra_credits": "public.extra_credits" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L42 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, auth.users]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_notifications": "public.notifications" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L53 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, auth.users]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_purchase_requests": "public.purchase_requests" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L64 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, auth.users]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L154 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…, on_auth_user_created]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_on_auth_user_created": "on_auth_user_created" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L153 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…, auth.users]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_change_attachments": "public.change_attachments" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L29 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…, public.change_requests]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_change_comments": "public.change_comments" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L56 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…, public.change_requests]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_profiles": "public.profiles" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L138 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…, public.handle_new_user()]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_user_roles": "public.user_roles" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L146 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…, public.handle_new_user()]
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf_public_touch_chat_last_message": "public.touch_chat_last_message()" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L99 | neighbors=[20260523221229_0bee5172-97fa-490f-8bd8-…, public.chats]

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
