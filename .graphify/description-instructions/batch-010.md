# Node Description Batch 11 of 36

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "authenticated_portal_mapstatus": "mapStatus()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L67 | neighbors=[portal.tsx, ChangeCard(), matchesFilter()]
- "authenticated_portal_stepindex": "stepIndex()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L86 | neighbors=[portal.tsx, ChangeCard(), Stepper()]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@02d6137f7e4b510a668e8625960354a18605578e": "02d6137 fixes" | kind=Commit | source=git | neighbors=[main, f2eb4fe Fix root cause: catch Supabase …, bbc9d80 Surface site_errors in the acco…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@17136346d2b074323d3dbbdd47e39843b9542f69": "1713634 fixes" | kind=Commit | source=git | neighbors=[main, cf5e121 Catch getSession() network erro…, 6b21362 Catch login network errors inst…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@21897802de523635124450d5d6d9171ea89caaca": "2189780 fixes" | kind=Commit | source=git | neighbors=[main, bbc9d80 Surface site_errors in the acco…, 5d1e827 Log server-side (SSR) crashes t…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8e663f1fb8f305df3e159fb27cfb8773e7b58adc": "8e663f1 fixes" | kind=Commit | source=git | neighbors=[main, d2da4c9 Log root error boundary crashes…, cf5e121 Catch getSession() network erro…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9c1fa0674c96765d2d6ee5f3d42b0024f5e29034": "9c1fa06 perf fixes" | kind=Commit | source=git | neighbors=[3417a43 fixes, main, 74ecdc1 code fixes]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a903820d8d2f9a723af2516050fdd67634743e19": "a903820 Fix Rules of Hooks violation crashing admin Projecten tab" | kind=Commit | source=git | neighbors=[39d363a server basic, admin.tsx, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b75b00da213fa0ede37fa8482e1f43dc4a6a9b04": "b75b00d fixes" | kind=Commit | source=git | neighbors=[main, 5d1e827 Log server-side (SSR) crashes t…, d2da4c9 Log root error boundary crashes…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c27ffd9d2912cb3ef331a0a5e858cd6ea4c0c764": "c27ffd9 fixes" | kind=Commit | source=git | neighbors=[main, a3773ee sec fixes, f2eb4fe Fix root cause: catch Supabase …]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c4498f5f1a1f0788e92e4dfda2feffb1cfc073f5": "c4498f5 Changes" | kind=Commit | source=git | neighbors=[worktree-curious-wibbling-narwhal, b29ceec Fixed weak PRNG and RLS, 20260523231640_f0c31578-aa3c-4810-a448-…]
- "hooks_use_form_draft": "use-form-draft.ts" | kind=code-symbol | source=src/hooks/use-form-draft.ts:L1 | neighbors=[portal.tsx, 9a2689c code fixes, useFormDraft()]
- "lib_accounts_functions_getroles": "getRoles()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L9 | neighbors=[accounts.functions.ts, ensureAdmin(), ensureSuper()]
- "lib_csv_parsecsv": "parseCsv()" | kind=code-symbol | source=src/lib/csv.ts:L30 | neighbors=[csv.ts, detectDelimiter(), parseLeadsCsv()]
- "lib_csv_parseleadscsv": "parseLeadsCsv()" | kind=code-symbol | source=src/lib/csv.ts:L111 | neighbors=[LeadsPanel.tsx, csv.ts, parseCsv()]
- "lib_error_capture": "error-capture.ts" | kind=code-symbol | source=src/lib/error-capture.ts:L1 | neighbors=[consumeLastCapturedError(), record(), server.ts]
- "lib_error_page": "error-page.ts" | kind=code-symbol | source=src/lib/error-page.ts:L1 | neighbors=[renderErrorPage(), server.ts, start.ts]
- "lib_error_page_rendererrorpage": "renderErrorPage()" | kind=code-symbol | source=src/lib/error-page.ts:L1 | neighbors=[error-page.ts, server.ts, start.ts]
- "lib_monitoring_shared_assertpublichost": "assertPublicHost()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L4 | neighbors=[monitoring.shared.ts, isPrivateOrReservedIp(), measureResponseTime()]
- "lib_project_status_project_priority_values": "PROJECT_PRIORITY_VALUES" | kind=code-symbol | source=src/lib/project-status.ts:L34 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, project-status.ts]
- "lib_project_status_project_status_values": "PROJECT_STATUS_VALUES" | kind=code-symbol | source=src/lib/project-status.ts:L5 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, project-status.ts]
- "lib_status_category_keys": "CATEGORY_KEYS" | kind=code-symbol | source=src/lib/status.ts:L69 | neighbors=[admin.changes.tsx, portal.tsx, status.ts]
- "lib_status_priceforchange": "priceForChange()" | kind=code-symbol | source=src/lib/status.ts:L82 | neighbors=[portal.tsx, status.ts, isCategoryFree()]
- "lib_status_priority_color": "PRIORITY_COLOR" | kind=code-symbol | source=src/lib/status.ts:L49 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, status.ts]
- "lib_status_priority_weight": "PRIORITY_WEIGHT" | kind=code-symbol | source=src/lib/status.ts:L42 | neighbors=[admin.changes.tsx, portal.tsx, status.ts]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_change_requests": "public.change_requests" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L28 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, change_requests_touch, auth.users]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_handle_new_user": "public.handle_new_user()" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L95 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, public.profiles, public.user_roles]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_user_roles": "public.user_roles" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L5 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, public.handle_new_user(), auth.users]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_change_requests": "public.change_requests" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L31 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…, public.change_attachments, public.change_comments]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_handle_new_user": "public.handle_new_user()" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L131 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…, public.profiles, public.user_roles]
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf_public_chat_messages": "public.chat_messages" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L12 | neighbors=[20260523221229_0bee5172-97fa-490f-8bd8-…, public.chats, trg_touch_chat_last_message]
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf_public_chats": "public.chats" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L2 | neighbors=[20260523221229_0bee5172-97fa-490f-8bd8-…, public.chat_messages, public.touch_chat_last_message()]
- "migrations_20260524100732_01aa016d_d09a_439e_a7a9_6f5f2c3138e0": "20260524100732_01aa016d-d09a-439e-a7a9-6f5f2c3138e0.sql" | kind=code-symbol | source=supabase/migrations/20260524100732_01aa016d-d09a-439e-a7a9-6f5f2c3138e0.sql:L1 | neighbors=[43d815c Changes, bf0cfa4 Fixed security scan issues, public.is_super_admin()]
- "migrations_20260524104213_c69cd657_d923_41b6_a4eb_02eef1c9606c": "20260524104213_c69cd657-d923-41b6-a4eb-02eef1c9606c.sql" | kind=code-symbol | source=supabase/migrations/20260524104213_c69cd657-d923-41b6-a4eb-02eef1c9606c.sql:L1 | neighbors=[972c222 Fases 6-7 en Fase 1 voltooid, c3627b5 Changes, public.admin_notifications]
- "migrations_20260713130000_project_expansion_phase2_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L16 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, public.project_tasks]
- "migrations_20260713130000_project_expansion_phase2_public_projects": "public.projects" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L13 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, public.project_tasks]
- "migrations_20260714090000_roles_permissions_module_public_user_custom_roles": "public.user_custom_roles" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L39 | neighbors=[20260714090000_roles_permissions_module…, auth.users, public.roles]
- "migrations_20260717130000_project_rls_baseline": "20260717130000_project_rls_baseline.sql" | kind=code-symbol | source=supabase/migrations/20260717130000_project_rls_baseline.sql:L1 | neighbors=[a3773ee sec fixes, public.is_project_member(), public.is_staff_user()]
- "migrations_20260717150000_sec5_durable_rate_limit_public_check_rate_limit": "public.check_rate_limit()" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L41 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.rate_limit_hits, v_count]
- "migrations_20260717150000_sec5_durable_rate_limit_public_record_strike": "public.record_strike()" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L90 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.rate_limit_bans, v_strikes]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-010.json

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
