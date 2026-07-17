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
- "migrations_20260714090000_roles_permissions_module_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L41 | neighbors=[20260714090000_roles_permissions_module…, public.user_custom_roles]
- "migrations_20260714090000_roles_permissions_module_public_roles": "public.roles" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L9 | neighbors=[20260714090000_roles_permissions_module…, public.user_custom_roles]
- "migrations_20260717150000_sec5_durable_rate_limit_public_rate_limit_bans": "public.rate_limit_bans" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L20 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.record_strike()]
- "migrations_20260717150000_sec5_durable_rate_limit_public_rate_limit_hits": "public.rate_limit_hits" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L13 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.check_rate_limit()]
- "migrations_20260717150000_sec5_durable_rate_limit_v_count": "v_count" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L57 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.check_rate_limit()]
- "migrations_20260717150000_sec5_durable_rate_limit_v_strikes": "v_strikes" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L103 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.record_strike()]
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
