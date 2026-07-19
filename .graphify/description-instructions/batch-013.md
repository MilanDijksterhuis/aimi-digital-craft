# Node Description Batch 14 of 36

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

- "lib_auth_guards_server_getroles": "getRoles()" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L11 | neighbors=[auth-guards.server.ts, ensureRoles()]
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
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf_trg_touch_chat_last_message": "trg_touch_chat_last_message" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L110 | neighbors=[20260523221229_0bee5172-97fa-490f-8bd8-…, public.chat_messages]
- "migrations_20260523231640_f0c31578_aa3c_4810_a448_68d00ea8bb26": "20260523231640_f0c31578-aa3c-4810-a448-68d00ea8bb26.sql" | kind=code-symbol | source=supabase/migrations/20260523231640_f0c31578-aa3c-4810-a448-68d00ea8bb26.sql:L1 | neighbors=[b29ceec Fixed weak PRNG and RLS, c4498f5 Changes]
- "migrations_20260523231942_fb4587f4_15b7_4604_9d1a_186964acb3fc": "20260523231942_fb4587f4-15b7-4604-9d1a-186964acb3fc.sql" | kind=code-symbol | source=supabase/migrations/20260523231942_fb4587f4-15b7-4604-9d1a-186964acb3fc.sql:L1 | neighbors=[7ca6d63 Changes, 8a81dd1 Fixed security issues]
- "migrations_20260610172053_c69c4c4e_eb62_440d_a0ce_08cd19608a27": "20260610172053_c69c4c4e-eb62-440d-a0ce-08cd19608a27.sql" | kind=code-symbol | source=supabase/migrations/20260610172053_c69c4c4e-eb62-440d-a0ce-08cd19608a27.sql:L1 | neighbors=[3e100e8 Fixed security findings, 6381715 Changes]
- "migrations_20260713130000_project_expansion_phase2_public_project_milestone_dependencies": "public.project_milestone_dependencies" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L67 | neighbors=[20260713130000_project_expansion_phase2…, public.project_milestones]
- "migrations_20260713130000_project_expansion_phase2_public_project_milestones": "public.project_milestones" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L69 | neighbors=[20260713130000_project_expansion_phase2…, public.project_milestone_dependencies]
- "migrations_20260713130000_project_expansion_phase2_public_project_template_milestones": "public.project_template_milestones" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L114 | neighbors=[20260713130000_project_expansion_phase2…, public.project_templates]
- "migrations_20260713130000_project_expansion_phase2_public_project_templates": "public.project_templates" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L105 | neighbors=[20260713130000_project_expansion_phase2…, public.project_template_milestones]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-013.json

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
