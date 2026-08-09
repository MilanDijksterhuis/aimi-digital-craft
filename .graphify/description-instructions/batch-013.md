# Node Description Batch 14 of 42

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

- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf_public_chats": "public.chats" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L2 | neighbors=[20260523221229_0bee5172-97fa-490f-8bd8-…, public.chat_messages, public.touch_chat_last_message()]
- "migrations_20260524100732_01aa016d_d09a_439e_a7a9_6f5f2c3138e0": "20260524100732_01aa016d-d09a-439e-a7a9-6f5f2c3138e0.sql" | kind=code-symbol | source=supabase/migrations/20260524100732_01aa016d-d09a-439e-a7a9-6f5f2c3138e0.sql:L1 | neighbors=[43d815c Changes, bf0cfa4 Fixed security scan issues, public.is_super_admin()]
- "migrations_20260524104213_c69cd657_d923_41b6_a4eb_02eef1c9606c": "20260524104213_c69cd657-d923-41b6-a4eb-02eef1c9606c.sql" | kind=code-symbol | source=supabase/migrations/20260524104213_c69cd657-d923-41b6-a4eb-02eef1c9606c.sql:L1 | neighbors=[972c222 Fases 6-7 en Fase 1 voltooid, c3627b5 Changes, public.admin_notifications]
- "migrations_20260713130000_project_expansion_phase2_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L16 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, public.project_tasks]
- "migrations_20260713130000_project_expansion_phase2_public_projects": "public.projects" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L13 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, public.project_tasks]
- "migrations_20260714090000_roles_permissions_module_public_user_custom_roles": "public.user_custom_roles" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L39 | neighbors=[20260714090000_roles_permissions_module…, auth.users, public.roles]
- "migrations_20260717130000_project_rls_baseline": "20260717130000_project_rls_baseline.sql" | kind=code-symbol | source=supabase/migrations/20260717130000_project_rls_baseline.sql:L1 | neighbors=[a3773ee sec fixes, public.is_project_member(), public.is_staff_user()]
- "migrations_20260717150000_sec5_durable_rate_limit_public_check_rate_limit": "public.check_rate_limit()" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L41 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.rate_limit_hits, v_count]
- "migrations_20260717150000_sec5_durable_rate_limit_public_record_strike": "public.record_strike()" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L90 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.rate_limit_bans, v_strikes]
- "routes_meer_diensten_buildleaves": "buildLeaves()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L279 | neighbors=[meer-diensten.tsx, rng(), MeerDiensten()]
- "src_server_applyratelimit": "applyRateLimit()" | kind=code-symbol | source=src/server.ts:L175 | neighbors=[server.ts, rateLimitedResponse(), fetch()]
- "src_server_brandederrorresponse": "brandedErrorResponse()" | kind=code-symbol | source=src/server.ts:L41 | neighbors=[server.ts, fetch(), normalizeCatastrophicSsrResponse()]
- "src_server_logservercrash": "logServerCrash()" | kind=code-symbol | source=src/server.ts:L12 | neighbors=[server.ts, fetch(), normalizeCatastrophicSsrResponse()]
- "supabase_callbacks_migration": "supabase-callbacks-migration.sql" | kind=code-symbol | source=supabase-callbacks-migration.sql:L1 | neighbors=[f958216 leads functions, lead_callbacks, leads]
- "supabase_leads_migration": "supabase-leads-migration.sql" | kind=code-symbol | source=supabase-leads-migration.sql:L1 | neighbors=[c480d2e leads, lead_activities, leads]
- "supabase_migration_profiles": "profiles" | kind=code-symbol | source=supabase-migration.sql:L129 | neighbors=[supabase-migration.sql, project_members, projects]
- "supabase_migration_project_members": "project_members" | kind=code-symbol | source=supabase-migration.sql:L134 | neighbors=[supabase-migration.sql, profiles, projects]
- "supabase_migration_projects": "projects" | kind=code-symbol | source=supabase-migration.sql:L124 | neighbors=[supabase-migration.sql, project_members, profiles]
- "telegram_webhook": "webhook.ts" | kind=code-symbol | source=src/routes/api/telegram/webhook.ts:L1 | neighbors=[2b1d78f telegram, routeTree.gen.ts, Route]
- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=src/components/ui/checkbox.tsx:L1 | neighbors=[utils.ts, cn(), Checkbox]
- "ui_hover_card": "hover-card.tsx" | kind=code-symbol | source=src/components/ui/hover-card.tsx:L1 | neighbors=[utils.ts, cn(), HoverCardContent]
- "ui_popover": "popover.tsx" | kind=code-symbol | source=src/components/ui/popover.tsx:L1 | neighbors=[utils.ts, cn(), PopoverContent]
- "ui_progress": "progress.tsx" | kind=code-symbol | source=src/components/ui/progress.tsx:L1 | neighbors=[utils.ts, cn(), Progress]
- "ui_slider": "slider.tsx" | kind=code-symbol | source=src/components/ui/slider.tsx:L1 | neighbors=[utils.ts, cn(), Slider]
- "ui_sonner": "sonner.tsx" | kind=code-symbol | source=src/components/ui/sonner.tsx:L1 | neighbors=[__root.tsx, Toaster(), ToasterProps]
- "ui_switch": "switch.tsx" | kind=code-symbol | source=src/components/ui/switch.tsx:L1 | neighbors=[utils.ts, cn(), Switch]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=src/components/ui/textarea.tsx:L1 | neighbors=[utils.ts, cn(), Textarea]
- "authenticated_account_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/account.tsx:L7 | neighbors=[account.tsx, routeTree.gen.ts]
- "authenticated_admin_accounts_accountslistsection": "AccountsListSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L264 | neighbors=[admin.accounts.tsx, accountStatus()]
- "authenticated_admin_accounts_accountstatus": "accountStatus()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L39 | neighbors=[admin.accounts.tsx, AccountsListSection()]
- "authenticated_admin_accounts_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L17 | neighbors=[admin.accounts.tsx, routeTree.gen.ts]
- "authenticated_admin_changes_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L12 | neighbors=[admin.changes.tsx, routeTree.gen.ts]
- "authenticated_admin_projecten_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L41 | neighbors=[admin.projecten.tsx, routeTree.gen.ts]
- "authenticated_admin_rollen_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L20 | neighbors=[admin.rollen.tsx, routeTree.gen.ts]
- "authenticated_admin_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L64 | neighbors=[admin.tsx, routeTree.gen.ts]
- "authenticated_portal_matchesfilter": "matchesFilter()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L106 | neighbors=[portal.tsx, mapStatus()]
- "authenticated_portal_projecten_projectid_monitoringsection": "MonitoringSection()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L80 | neighbors=[portal.projecten.$projectId.tsx, timeAgo()]
- "authenticated_portal_projecten_projectid_timeago": "timeAgo()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L27 | neighbors=[portal.projecten.$projectId.tsx, MonitoringSection()]
- "authenticated_portal_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L58 | neighbors=[portal.tsx, routeTree.gen.ts]
- "authenticated_portal_stepper": "Stepper()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L822 | neighbors=[portal.tsx, stepIndex()]

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
