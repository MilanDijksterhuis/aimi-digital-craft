# Node Description Batch 14 of 34

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

- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf_trg_touch_chat_last_message": "trg_touch_chat_last_message" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L110 | neighbors=[20260523221229_0bee5172-97fa-490f-8bd8-…, public.chat_messages]
- "migrations_20260523231640_f0c31578_aa3c_4810_a448_68d00ea8bb26": "20260523231640_f0c31578-aa3c-4810-a448-68d00ea8bb26.sql" | kind=code-symbol | source=supabase/migrations/20260523231640_f0c31578-aa3c-4810-a448-68d00ea8bb26.sql:L1 | neighbors=[b29ceec Fixed weak PRNG and RLS, c4498f5 Changes]
- "migrations_20260523231942_fb4587f4_15b7_4604_9d1a_186964acb3fc": "20260523231942_fb4587f4-15b7-4604-9d1a-186964acb3fc.sql" | kind=code-symbol | source=supabase/migrations/20260523231942_fb4587f4-15b7-4604-9d1a-186964acb3fc.sql:L1 | neighbors=[7ca6d63 Changes, 8a81dd1 Fixed security issues]
- "migrations_20260610172053_c69c4c4e_eb62_440d_a0ce_08cd19608a27": "20260610172053_c69c4c4e-eb62-440d-a0ce-08cd19608a27.sql" | kind=code-symbol | source=supabase/migrations/20260610172053_c69c4c4e-eb62-440d-a0ce-08cd19608a27.sql:L1 | neighbors=[3e100e8 Fixed security findings, 6381715 Changes]
- "migrations_20260713130000_project_expansion_phase2_public_project_milestone_dependencies": "public.project_milestone_dependencies" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L67 | neighbors=[20260713130000_project_expansion_phase2…, public.project_milestones]
- "migrations_20260713130000_project_expansion_phase2_public_project_milestones": "public.project_milestones" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L69 | neighbors=[20260713130000_project_expansion_phase2…, public.project_milestone_dependencies]
- "migrations_20260713130000_project_expansion_phase2_public_project_template_milestones": "public.project_template_milestones" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L114 | neighbors=[20260713130000_project_expansion_phase2…, public.project_templates]
- "migrations_20260713130000_project_expansion_phase2_public_project_templates": "public.project_templates" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L105 | neighbors=[20260713130000_project_expansion_phase2…, public.project_template_milestones]
- "migrations_20260714090000_roles_permissions_module_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L41 | neighbors=[20260714090000_roles_permissions_module…, public.user_custom_roles]
- "migrations_20260714090000_roles_permissions_module_public_roles": "public.roles" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L9 | neighbors=[20260714090000_roles_permissions_module…, public.user_custom_roles]
- "public_site_error_route": "Route" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L18 | neighbors=[site-error.ts, routeTree.gen.ts]
- "public_site_ping_route": "Route" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L18 | neighbors=[site-ping.ts, routeTree.gen.ts]
- "routes_algemene_voorwaarden_route": "Route" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L4 | neighbors=[algemene-voorwaarden.tsx, routeTree.gen.ts]
- "routes_authenticated_route": "Route" | kind=code-symbol | source=src/routes/_authenticated.tsx:L11 | neighbors=[_authenticated.tsx, routeTree.gen.ts]
- "routes_index_route": "Route" | kind=code-symbol | source=src/routes/index.tsx:L14 | neighbors=[index.tsx, routeTree.gen.ts]
- "routes_login_route": "Route" | kind=code-symbol | source=src/routes/login.tsx:L5 | neighbors=[login.tsx, routeTree.gen.ts]
- "routes_privacybeleid_route": "Route" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L4 | neighbors=[privacybeleid.tsx, routeTree.gen.ts]
- "routes_root_route": "Route" | kind=code-symbol | source=src/routes/__root.tsx:L93 | neighbors=[__root.tsx, routeTree.gen.ts]
- "routes_sitemap_xml": "sitemap[.]xml.tsx" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L1 | neighbors=[Route, SitemapEntry]
- "routes_track_js": "track[.]js.tsx" | kind=code-symbol | source=src/routes/track[.]js.tsx:L1 | neighbors=[cors, Route]
- "src_router": "router.tsx" | kind=code-symbol | source=src/router.tsx:L1 | neighbors=[getRouter(), routeTree.gen.ts]
- "src_router_getrouter": "getRouter()" | kind=code-symbol | source=src/router.tsx:L5 | neighbors=[router.tsx, routeTree.gen.ts]
- "src_server_getserverentry": "getServerEntry()" | kind=code-symbol | source=src/server.ts:L32 | neighbors=[server.ts, fetch()]
- "src_server_iscatastrophicssrerrorbody": "isCatastrophicSsrErrorBody()" | kind=code-symbol | source=src/server.ts:L48 | neighbors=[server.ts, normalizeCatastrophicSsrResponse()]
- "src_server_ishttps": "isHttps()" | kind=code-symbol | source=src/server.ts:L127 | neighbors=[server.ts, applySecurityHeaders()]
- "src_server_ratelimitedresponse": "rateLimitedResponse()" | kind=code-symbol | source=src/server.ts:L91 | neighbors=[server.ts, applyRateLimit()]
- "src_start_startinstance": "startInstance" | kind=code-symbol | source=src/start.ts:L21 | neighbors=[routeTree.gen.ts, start.ts]
- "supabase_auth_attacher_attachsupabaseauth": "attachSupabaseAuth" | kind=code-symbol | source=src/integrations/supabase/auth-attacher.ts:L7 | neighbors=[start.ts, auth-attacher.ts]
- "supabase_leads_migration_lead_activities": "lead_activities" | kind=code-symbol | source=supabase-leads-migration.sql:L38 | neighbors=[supabase-leads-migration.sql, leads]
- "supabase_leads_migration_leads": "leads" | kind=code-symbol | source=supabase-leads-migration.sql:L17 | neighbors=[supabase-leads-migration.sql, lead_activities]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=src/components/ui/badge.tsx:L28 | neighbors=[badge.tsx, badgeVariants]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=src/components/ui/badge.tsx:L6 | neighbors=[badge.tsx, Badge()]
- "ui_button_buttonprops": "ButtonProps" | kind=code-symbol | source=src/components/ui/button.tsx:L34 | neighbors=[button.tsx, pagination.tsx]
- "ui_dialog_dialogcontent": "DialogContent" | kind=code-symbol | source=src/components/ui/dialog.tsx:L32 | neighbors=[command.tsx, dialog.tsx]
- "ui_input_input": "Input" | kind=code-symbol | source=src/components/ui/input.tsx:L5 | neighbors=[input.tsx, sidebar.tsx]
- "ui_label_label": "Label" | kind=code-symbol | source=src/components/ui/label.tsx:L13 | neighbors=[form.tsx, label.tsx]
- "ui_separator_separator": "Separator" | kind=code-symbol | source=src/components/ui/separator.tsx:L6 | neighbors=[separator.tsx, sidebar.tsx]
- "ui_sheet_sheetcontent": "SheetContent" | kind=code-symbol | source=src/components/ui/sheet.tsx:L57 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetdescription": "SheetDescription" | kind=code-symbol | source=src/components/ui/sheet.tsx:L99 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L74 | neighbors=[sheet.tsx, sidebar.tsx]

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
