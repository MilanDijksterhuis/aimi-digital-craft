# Node Description Batch 14 of 52

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9c1fa0674c96765d2d6ee5f3d42b0024f5e29034": "9c1fa06 perf fixes" | kind=Commit | source=git | neighbors=[3417a43 fixes, main, 74ecdc1 code fixes, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b75b00da213fa0ede37fa8482e1f43dc4a6a9b04": "b75b00d fixes" | kind=Commit | source=git | neighbors=[main, 5d1e827 Log server-side (SSR) crashes t…, d2da4c9 Log root error boundary crashes…, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c27ffd9d2912cb3ef331a0a5e858cd6ea4c0c764": "c27ffd9 fixes" | kind=Commit | source=git | neighbors=[main, a3773ee sec fixes, f2eb4fe Fix root cause: catch Supabase …, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dbd0657ea193395ad36e71a78cfe0b953fc87956": "dbd0657 Log server-side (SSR) crashes to site_errors too" | kind=Commit | source=git | neighbors=[6da1e20 Log root error boundary crashes…, worktree-replicated-fluttering-whisper, 99bd8ac Surface site_errors in the acco…, server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e543723262e08bccc4d31b29e4c4156d2a3b9af8": "e543723 Merge pull request #1 from MilanDijksterhuis/claude/aimi-seo-audit-dgsf…" | kind=Commit | source=git | neighbors=[7a80ccf docs(seo): volledige SEO-audit …, main, 4a960c6 SEO, f80d1a3 blur] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e84aa2e8d47ac69232a5f8cf79f36432aaa8ac63": "e84aa2e hoofdpagina" | kind=Commit | source=git | neighbors=[cc405f4 pagina updates, main, 6e488ba fixes, AnswerBlock.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ef44acdc4cbe4becaa41d27890af2e3744393916": "ef44acd feat(seo): sitemap + llms.txt aangevuld met alle nieuwe pagina's" | kind=Commit | source=git | neighbors=[main, 7a63e47 chore: graphify graph bijgewerkt, sitemap[.]xml.tsx, fa2ea52 feat(seo): nav + uitgebreide fo…] | lang=nl
- "components_blogpostform_blogpostform": "BlogPostForm()" | kind=code-symbol | source=src/components/BlogPostForm.tsx:L98 | neighbors=[admin.blog.tsx, admin.blog.$postId.tsx, BlogPostForm.tsx, isoToLocalInput()] | lang=en
- "components_callbackagenda_callbackagenda": "CallbackAgenda()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L62 | neighbors=[admin.leads.tsx, CallbackAgenda.tsx, fmtDayLabel(), startOfWeek()] | lang=en
- "components_callbackagenda_startofweek": "startOfWeek()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L45 | neighbors=[CallbackAgenda.tsx, CallbackAgenda(), addDays(), startOfDay()] | lang=en
- "components_exampleslideshow_exampleslideshow": "ExampleSlideshow()" | kind=code-symbol | source=src/components/ExampleSlideshow.tsx:L12 | neighbors=[BranchPage.tsx, ExampleSlideshow.tsx, LocationPageV2.tsx, ServicePage.tsx] | lang=en
- "components_processtimeline_processtimeline": "ProcessTimeline()" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L48 | neighbors=[LocationLanding.tsx, ProcessTimeline.tsx, index.tsx, LocationPageV2.tsx] | lang=en
- "components_rodeachtergrond_reddiagonalbackground": "RedDiagonalBackground()" | kind=code-symbol | source=src/components/rodeachtergrond.tsx:L4 | neighbors=[rodeachtergrond.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx] | lang=en
- "components_servicepage_servicepage": "ServicePage()" | kind=code-symbol | source=src/components/ServicePage.tsx:L39 | neighbors=[ServicePage.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx] | lang=en
- "components_servicepage_servicepagedata": "ServicePageData" | kind=code-symbol | source=src/components/ServicePage.tsx:L25 | neighbors=[ServicePage.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx] | lang=en
- "lib_blog_schedule_bulkscheduleoptions": "BulkScheduleOptions" | kind=code-symbol | source=src/lib/blog-schedule.ts:L5 | neighbors=[admin.blog.tsx, BulkScheduleDialog.tsx, blog-schedule.ts, blog.server.ts] | lang=en
- "lib_blog_server_admincreateblogpostimpl": "adminCreateBlogPostImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L143 | neighbors=[blog.server.ts, assertUniqueSlug(), resolveStatusFields(), syncPostLinks()] | lang=en
- "lib_blog_server_syncpostlinks": "syncPostLinks()" | kind=code-symbol | source=src/lib/blog.server.ts:L60 | neighbors=[blog.server.ts, adminCreateBlogPostImpl(), adminDuplicateBlogPostImpl(), adminUpdateBlogPostImpl()] | lang=en
- "lib_project_status_project_priority_color": "PROJECT_PRIORITY_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L52 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_priority_label": "PROJECT_PRIORITY_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L38 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_rbac_can": "can()" | kind=code-symbol | source=src/lib/rbac.ts:L70 | neighbors=[use-permissions.tsx, permissions.server.ts, rbac.ts, admin.functions.ts] | lang=en
- "lib_rbac_permissionaction": "PermissionAction" | kind=code-symbol | source=src/lib/rbac.ts:L127 | neighbors=[use-permissions.tsx, permissions.server.ts, rbac.ts, admin.functions.ts] | lang=en
- "lib_redirects_server": "redirects.server.ts" | kind=code-symbol | source=src/lib/redirects.server.ts:L1 | neighbors=[1727351 blog, adminCreateRedirectImpl(), adminDeleteRedirectImpl(), adminListRedirectsImpl()] | lang=en
- "lib_slug": "slug.ts" | kind=code-symbol | source=src/lib/slug.ts:L1 | neighbors=[6ccd4dc CMS, BlogPostForm.tsx, blog.server.ts, slugify()] | lang=en
- "lib_status_category_label": "CATEGORY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L58 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, portal.tsx, status.ts] | lang=en
- "lib_status_iscategoryfree": "isCategoryFree()" | kind=code-symbol | source=src/lib/status.ts:L89 | neighbors=[portal.tsx, portal.functions.ts, status.ts, priceForChange()] | lang=en
- "lib_telegram_server_sendtelegrammessage": "sendTelegramMessage()" | kind=code-symbol | source=src/lib/telegram.server.ts:L44 | neighbors=[telegram.server.ts, generateAndSendMfaCode(), safeSend(), botToken()] | lang=en
- "lib_website_checker_server_fetchsafely": "fetchSafely()" | kind=code-symbol | source=src/lib/website-checker.server.ts:L136 | neighbors=[website-checker.server.ts, assertHttpUrl(), fetchText(), runWebsiteCheck()] | lang=en
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_profiles": "public.profiles" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L15 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, profiles_touch, public.handle_new_user(), auth.users] | lang=en
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017": "20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L1 | neighbors=[public.client_contacts, public.login_events, public.site_errors, public.site_pings] | lang=en
- "migrations_20260524095411_23164716_fa8a_4889_832b_f72b78c962ad": "20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql" | kind=code-symbol | source=supabase/migrations/20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql:L1 | neighbors=[public.extra_change_requests, public.password_reset_requests, 28e88cb Changes, fcbe345 Admin sidebar en panels aangepa…] | lang=en
- "migrations_20260713130000_project_expansion_phase2_public_project_task_time_entries": "public.project_task_time_entries" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L42 | neighbors=[20260713130000_project_expansion_phase2…, auth.users, public.project_tasks, public.projects] | lang=en
- "migrations_20260714090000_roles_permissions_module": "20260714090000_roles_permissions_module.sql" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L1 | neighbors=[81a87ed commit, auth.users, public.roles, public.user_custom_roles] | lang=en
- "routes_llms_full_txt": "llms-full[.]txt.tsx" | kind=code-symbol | source=src/routes/llms-full[.]txt.tsx:L1 | neighbors=[4a960c6 SEO, Route, client.ts, supabase] | lang=en
- "routes_website_checker_reportcard": "ReportCard()" | kind=code-symbol | source=src/routes/website-checker.tsx:L332 | neighbors=[website-checker.tsx, getFindings(), scoreVerdict(), useCountUp()] | lang=en
- "src_server_applysecurityheaders": "applySecurityHeaders()" | kind=code-symbol | source=src/server.ts:L275 | neighbors=[server.ts, applyAssetCaching(), isHttps(), fetch()] | lang=en
- "supabase_auth_attacher": "auth-attacher.ts" | kind=code-symbol | source=src/integrations/supabase/auth-attacher.ts:L1 | neighbors=[start.ts, attachSupabaseAuth, client.ts, supabase] | lang=en
- "supabase_client_server": "client.server.ts" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L1 | neighbors=[createSupabaseAdminClient(), supabaseAdmin, types.ts, Database] | lang=en
- "supabase_types_database": "Database" | kind=code-symbol | source=src/integrations/supabase/types.ts:L7 | neighbors=[auth-middleware.ts, client.ts, client.server.ts, types.ts] | lang=en
- "ui_button_button": "Button" | kind=code-symbol | source=src/components/ui/button.tsx:L39 | neighbors=[button.tsx, calendar.tsx, carousel.tsx, sidebar.tsx] | lang=en

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
