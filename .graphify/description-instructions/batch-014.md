# Node Description Batch 15 of 57

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

- "components_callbackagenda_callbackagenda": "CallbackAgenda()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L62 | neighbors=[admin.leads.tsx, CallbackAgenda.tsx, fmtDayLabel(), startOfWeek()]
- "components_callbackagenda_startofweek": "startOfWeek()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L45 | neighbors=[CallbackAgenda.tsx, CallbackAgenda(), addDays(), startOfDay()]
- "components_exampleslideshow_exampleslideshow": "ExampleSlideshow()" | kind=code-symbol | source=src/components/ExampleSlideshow.tsx:L12 | neighbors=[BranchPage.tsx, ExampleSlideshow.tsx, LocationPageV2.tsx, ServicePage.tsx]
- "components_processtimeline_processtimeline": "ProcessTimeline()" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L48 | neighbors=[LocationLanding.tsx, ProcessTimeline.tsx, index.tsx, LocationPageV2.tsx]
- "components_rodeachtergrond_reddiagonalbackground": "RedDiagonalBackground()" | kind=code-symbol | source=src/components/rodeachtergrond.tsx:L4 | neighbors=[rodeachtergrond.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx]
- "components_servicepage_servicepage": "ServicePage()" | kind=code-symbol | source=src/components/ServicePage.tsx:L39 | neighbors=[ServicePage.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx]
- "components_servicepage_servicepagedata": "ServicePageData" | kind=code-symbol | source=src/components/ServicePage.tsx:L25 | neighbors=[ServicePage.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx]
- "design_handoff_meer_diensten_support_getreact": "getReact()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L9 | neighbors=[support.js, boot(), createComponentFactory(), evalDcLogic()]
- "design_handoff_meer_diensten_support_loadreactumd": "loadReactUmd()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1838 | neighbors=[support.js, cdnScriptFor(), loadScript(), resolve()]
- "design_handoff_meer_diensten_support_rootnamefordocument": "rootNameForDocument()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L133 | neighbors=[support.js, boot(), dcNameFromPath(), safeDecode()]
- "design_handoff_meer_diensten_support_walkfor": "walkFor()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L611 | neighbors=[support.js, walk(), compileAttr(), walkChildren()]
- "design_handoff_meer_diensten_support_walkif": "walkIf()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L646 | neighbors=[support.js, walk(), compileAttr(), walkChildren()]
- "kaart_hoogeveen_veendam_support_getreact": "getReact()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L9 | neighbors=[support.js, boot(), createComponentFactory(), evalDcLogic()]
- "kaart_hoogeveen_veendam_support_loadreactumd": "loadReactUmd()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1838 | neighbors=[support.js, cdnScriptFor(), loadScript(), resolve()]
- "kaart_hoogeveen_veendam_support_rootnamefordocument": "rootNameForDocument()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L133 | neighbors=[support.js, boot(), dcNameFromPath(), safeDecode()]
- "kaart_hoogeveen_veendam_support_walkfor": "walkFor()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L611 | neighbors=[support.js, walk(), compileAttr(), walkChildren()]
- "kaart_hoogeveen_veendam_support_walkif": "walkIf()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L646 | neighbors=[support.js, walk(), compileAttr(), walkChildren()]
- "lib_blog_schedule_bulkscheduleoptions": "BulkScheduleOptions" | kind=code-symbol | source=src/lib/blog-schedule.ts:L5 | neighbors=[admin.blog.tsx, BulkScheduleDialog.tsx, blog-schedule.ts, blog.server.ts]
- "lib_blog_server_admincreateblogpostimpl": "adminCreateBlogPostImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L143 | neighbors=[blog.server.ts, assertUniqueSlug(), resolveStatusFields(), syncPostLinks()]
- "lib_blog_server_syncpostlinks": "syncPostLinks()" | kind=code-symbol | source=src/lib/blog.server.ts:L60 | neighbors=[blog.server.ts, adminCreateBlogPostImpl(), adminDuplicateBlogPostImpl(), adminUpdateBlogPostImpl()]
- "lib_project_status_project_priority_color": "PROJECT_PRIORITY_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L52 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_project_status_project_priority_label": "PROJECT_PRIORITY_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L38 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_rbac_can": "can()" | kind=code-symbol | source=src/lib/rbac.ts:L70 | neighbors=[use-permissions.tsx, permissions.server.ts, rbac.ts, admin.functions.ts]
- "lib_rbac_permissionaction": "PermissionAction" | kind=code-symbol | source=src/lib/rbac.ts:L127 | neighbors=[use-permissions.tsx, permissions.server.ts, rbac.ts, admin.functions.ts]
- "lib_redirects_server": "redirects.server.ts" | kind=code-symbol | source=src/lib/redirects.server.ts:L1 | neighbors=[1727351 blog, adminCreateRedirectImpl(), adminDeleteRedirectImpl(), adminListRedirectsImpl()]
- "lib_slug": "slug.ts" | kind=code-symbol | source=src/lib/slug.ts:L1 | neighbors=[6ccd4dc CMS, BlogPostForm.tsx, blog.server.ts, slugify()]
- "lib_status_category_label": "CATEGORY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L58 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, portal.tsx, status.ts]
- "lib_status_iscategoryfree": "isCategoryFree()" | kind=code-symbol | source=src/lib/status.ts:L89 | neighbors=[portal.tsx, portal.functions.ts, status.ts, priceForChange()]
- "lib_telegram_server_sendtelegrammessage": "sendTelegramMessage()" | kind=code-symbol | source=src/lib/telegram.server.ts:L44 | neighbors=[telegram.server.ts, generateAndSendMfaCode(), safeSend(), botToken()]
- "lib_website_checker_server_fetchsafely": "fetchSafely()" | kind=code-symbol | source=src/lib/website-checker.server.ts:L136 | neighbors=[website-checker.server.ts, assertHttpUrl(), fetchText(), runWebsiteCheck()]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_profiles": "public.profiles" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L15 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, profiles_touch, public.handle_new_user(), auth.users]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017": "20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L1 | neighbors=[public.client_contacts, public.login_events, public.site_errors, public.site_pings]
- "migrations_20260524095411_23164716_fa8a_4889_832b_f72b78c962ad": "20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql" | kind=code-symbol | source=supabase/migrations/20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql:L1 | neighbors=[public.extra_change_requests, public.password_reset_requests, 28e88cb Changes, fcbe345 Admin sidebar en panels aangepa…]
- "migrations_20260713130000_project_expansion_phase2_public_project_task_time_entries": "public.project_task_time_entries" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L42 | neighbors=[20260713130000_project_expansion_phase2…, auth.users, public.project_tasks, public.projects]
- "migrations_20260714090000_roles_permissions_module": "20260714090000_roles_permissions_module.sql" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L1 | neighbors=[81a87ed commit, auth.users, public.roles, public.user_custom_roles]
- "routes_llms_full_txt": "llms-full[.]txt.tsx" | kind=code-symbol | source=src/routes/llms-full[.]txt.tsx:L1 | neighbors=[4a960c6 SEO, Route, client.ts, supabase]
- "routes_website_checker_reportcard": "ReportCard()" | kind=code-symbol | source=src/routes/website-checker.tsx:L332 | neighbors=[website-checker.tsx, getFindings(), scoreVerdict(), useCountUp()]
- "src_server_applysecurityheaders": "applySecurityHeaders()" | kind=code-symbol | source=src/server.ts:L275 | neighbors=[server.ts, applyAssetCaching(), isHttps(), fetch()]
- "supabase_auth_attacher": "auth-attacher.ts" | kind=code-symbol | source=src/integrations/supabase/auth-attacher.ts:L1 | neighbors=[start.ts, attachSupabaseAuth, client.ts, supabase]
- "supabase_client_server": "client.server.ts" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L1 | neighbors=[createSupabaseAdminClient(), supabaseAdmin, types.ts, Database]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-014.json

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
