# Node Description Batch 17 of 42

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

- "lib_callbacks_callback_outcomes": "CALLBACK_OUTCOMES" | kind=code-symbol | source=src/lib/callbacks.ts:L25 | neighbors=[CallbackAgenda.tsx, callbacks.ts]
- "lib_callbacks_callback_reasons": "CALLBACK_REASONS" | kind=code-symbol | source=src/lib/callbacks.ts:L7 | neighbors=[CallbackScheduleModal.tsx, callbacks.ts]
- "lib_callbacks_callback_status_label": "CALLBACK_STATUS_LABEL" | kind=code-symbol | source=src/lib/callbacks.ts:L16 | neighbors=[CallbackAgenda.tsx, callbacks.ts]
- "lib_callbacks_callbackstatus": "CallbackStatus" | kind=code-symbol | source=src/lib/callbacks.ts:L14 | neighbors=[CallbackAgenda.tsx, callbacks.ts]
- "lib_callbacks_suggestcallbackdate": "suggestCallbackDate()" | kind=code-symbol | source=src/lib/callbacks.ts:L75 | neighbors=[CallbackScheduleModal.tsx, callbacks.ts]
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
- "lib_rbac_admin_like_roles": "ADMIN_LIKE_ROLES" | kind=code-symbol | source=src/lib/rbac.ts:L38 | neighbors=[auth-guards.server.ts, rbac.ts]
- "lib_rbac_all_permission_actions": "ALL_PERMISSION_ACTIONS" | kind=code-symbol | source=src/lib/rbac.ts:L45 | neighbors=[permissions.server.ts, rbac.ts]
- "lib_rbac_role_label": "ROLE_LABEL" | kind=code-symbol | source=src/lib/rbac.ts:L11 | neighbors=[TeamTab.tsx, rbac.ts]
- "lib_rbac_staff_guard_roles": "STAFF_GUARD_ROLES" | kind=code-symbol | source=src/lib/rbac.ts:L40 | neighbors=[auth-guards.server.ts, rbac.ts]
- "lib_rbac_super_admin_roles": "SUPER_ADMIN_ROLES" | kind=code-symbol | source=src/lib/rbac.ts:L39 | neighbors=[auth-guards.server.ts, rbac.ts]
- "lib_status_change_templates": "CHANGE_TEMPLATES" | kind=code-symbol | source=src/lib/status.ts:L88 | neighbors=[portal.tsx, status.ts]
- "lib_telegram_server_bottoken": "botToken()" | kind=code-symbol | source=src/lib/telegram.server.ts:L23 | neighbors=[telegram.server.ts, sendTelegramMessage()]
- "lib_telegram_server_botusername": "botUsername()" | kind=code-symbol | source=src/lib/telegram.server.ts:L29 | neighbors=[telegram.server.ts, generateLinkToken()]
- "lib_telegram_server_generateandsendmfacode": "generateAndSendMfaCode()" | kind=code-symbol | source=src/lib/telegram.server.ts:L200 | neighbors=[telegram.server.ts, sendTelegramMessage()]
- "lib_telegram_server_generatelinktoken": "generateLinkToken()" | kind=code-symbol | source=src/lib/telegram.server.ts:L74 | neighbors=[telegram.server.ts, botUsername()]
- "lib_telegram_server_handletelegramwebhook": "handleTelegramWebhook()" | kind=code-symbol | source=src/lib/telegram.server.ts:L128 | neighbors=[telegram.server.ts, safeSend()]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-016.json

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
