# Node Description Batch 10 of 47

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

- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, utils.ts] | lang=en
- "vite_config": "vite.config.ts" | kind=code-symbol | source=vite.config.ts:L1 | neighbors=[332d0c8 Fix: externalize googleapis/nod…, 4510b3f perf fixes, 7dbbf18 perf fixes, 821a216 Update vite.config.ts, 85a6666 SEO en robot, 9d0b477 perf fixes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3ee5ecb08528968ff2c00c4da8885489b010b85d": "3ee5ecb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bc99d995fc54a93c71b1e81777475cd6b33cc03b": "bc99d99 achtegrond" | kind=Commit | source=git | neighbors=[04c01f8 SEO, main, 8fdd571 SEO, rodeachtergrond.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f207e52c87c9713fff8c4ac51f4a9efb667aa9d1": "f207e52 feat(seo): dienstenpagina's website/webshop/hosting met unieke content …" | kind=Commit | source=git | neighbors=[b48bbc0 chore: snapshot lokale SEO-pagi…, main, 9965896 feat(seo): contact- en cases-pa…, ServicePage.tsx, seo.ts, onderhoud-hosting.tsx] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fcf1ee779f8b822cf8ee26742bdcf20c8a46286e": "fcf1ee7 Changes" | kind=Commit | source=git | neighbors=[68ae2dd Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "components_breadcrumbs": "Breadcrumbs.tsx" | kind=code-symbol | source=src/components/Breadcrumbs.tsx:L1 | neighbors=[36d8ccb new pages, BranchPage.tsx, Breadcrumbs(), Crumb, LocationPageV2.tsx, ServicePage.tsx] | lang=en
- "components_callbackschedulemodal": "CallbackScheduleModal.tsx" | kind=code-symbol | source=src/components/CallbackScheduleModal.tsx:L1 | neighbors=[f958216 leads functions, CallbackScheduleForm(), CallbackScheduleModal(), CallbackScheduleValue, callbacks.ts, CALLBACK_REASONS] | lang=en
- "migrations_20260713130000_project_expansion_phase2": "20260713130000_project_expansion_phase2.sql" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L1 | neighbors=[81a87ed commit, auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks] | lang=en
- "public_site_error": "site-error.ts" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, a3773ee sec fixes, rate-limit.ts, checkRateLimit(), Body] | lang=en
- "routes_website_laten_maken_autobedrijf": "website-laten-maken-autobedrijf.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-autobedrijf.tsx:L1 | neighbors=[36d8ccb new pages, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_autorijschool": "website-laten-maken-autorijschool.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-autorijschool.tsx:L1 | neighbors=[36d8ccb new pages, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_bloemist": "website-laten-maken-bloemist.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-bloemist.tsx:L1 | neighbors=[36d8ccb new pages, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_boekhouder": "website-laten-maken-boekhouder.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-boekhouder.tsx:L1 | neighbors=[36d8ccb new pages, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_cateringbedrijf": "website-laten-maken-cateringbedrijf.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-cateringbedrijf.tsx:L1 | neighbors=[36d8ccb new pages, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_makelaar": "website-laten-maken-makelaar.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-makelaar.tsx:L1 | neighbors=[36d8ccb new pages, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_restaurant": "website-laten-maken-restaurant.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-restaurant.tsx:L1 | neighbors=[36d8ccb new pages, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "src_server_fetch": "fetch()" | kind=code-symbol | source=src/server.ts:L297 | neighbors=[server.ts, applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), fixNotFoundTitle(), getServerEntry()] | lang=en
- "supabase_auth_middleware": "auth-middleware.ts" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L1 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, telegram.functions.ts] | lang=en
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L1 | neighbors=[utils.ts, cn(), Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink] | lang=en
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=src/components/ui/dialog.tsx:L1 | neighbors=[command.tsx, utils.ts, cn(), DialogContent, DialogDescription, DialogFooter()] | lang=en
- "ui_drawer": "drawer.tsx" | kind=code-symbol | source=src/components/ui/drawer.tsx:L1 | neighbors=[utils.ts, cn(), Drawer(), DrawerContent, DrawerDescription, DrawerFooter()] | lang=en
- "ui_navigation_menu": "navigation-menu.tsx" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L1 | neighbors=[utils.ts, cn(), NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList] | lang=en
- "ui_select": "select.tsx" | kind=code-symbol | source=src/components/ui/select.tsx:L1 | neighbors=[utils.ts, cn(), SelectContent, SelectItem, SelectLabel, SelectScrollDownButton] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1c0e00fa545187c581096e77cedf5c2093451d2e": "1c0e00f fixes" | kind=Commit | source=git | neighbors=[main, 5d3df91 new, LocationLanding.tsx, rodeachtergrond.tsx, meer-diensten.tsx, website-laten-maken-hoogeveen.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2db539c32f8111052eba7d719d7600bec14619e9": "2db539c Work in progress" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 98edc37 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@390130257deb2b7ec8c8e624493c776642bd2990": "3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug" | kind=Commit | source=git | neighbors=[2fcc9a3 fixes, admin.tsx, main, f7b9fd5 Merge branch 'main' of https://…, server.ts, worktree-replicated-fluttering-whisper] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@40c3bfff6b12140abfc7240e3b919dbecd850cc2": "40c3bff Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, a6260b9 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d6e898cb8d8d1125c41d89f5b68bff81325b838": "5d6e898 Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 538314c Contactformulier en adminfix] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a6260b9228de5a3e8e996ef8663caf9e066bcf85": "a6260b9 Changes" | kind=Commit | source=git | neighbors=[40c3bff Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a8cb18d0d01d7c76dcbf5be694a9498706e1eb68": "a8cb18d Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 5d6e898 Changes] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b29ceecb5efa88c0e8d9ba1fe3e2f43becf32466": "b29ceec Fixed weak PRNG and RLS" | kind=Commit | source=git | neighbors=[worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 7ca6d63 Changes, 8a81dd1 Fixed security issues, admin.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c67cd437297dbe69b158dc12c4801a2807f5d640": "c67cd43 Changes" | kind=Commit | source=git | neighbors=[8a81dd1 Fixed security issues, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f2eb4fee5708d1ae2198a43a0ef81a988ec315f0": "f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes" | kind=Commit | source=git | neighbors=[02d6137 fixes, admin.tsx, admin.accounts.tsx, main, c27ffd9 fixes, AdminChatPanel.tsx] | lang=en
- "components_confirmdialog_useconfirm": "useConfirm()" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L48 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, BerichtenTab.tsx, CallbackAgenda.tsx, ConfirmDialog.tsx] | lang=en
- "components_teamtab": "TeamTab.tsx" | kind=code-symbol | source=src/components/TeamTab.tsx:L1 | neighbors=[admin.tsx, 6bf533b pushes, c480d2e leads, TeamTab(), use-permissions.tsx, usePermissions()] | lang=en
- "hooks_expire_accounts": "expire-accounts.ts" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, isAuthorized(), Route, timingSafeStringEqual(), routeTree.gen.ts] | lang=en
- "lib_seo_howtojsonld": "howToJsonLd()" | kind=code-symbol | source=src/lib/seo.ts:L89 | neighbors=[seo.ts, ld(), onderhoud-hosting.tsx, seo.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx] | lang=en
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L7 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, on_auth_user_created, public.change_requests, public.extra_credits, public.notifications, public.profiles] | lang=en
- "migrations_20260717150000_sec5_durable_rate_limit": "20260717150000_sec5_durable_rate_limit.sql" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L1 | neighbors=[a3773ee sec fixes, public.check_rate_limit(), public.is_ip_banned(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-009.json

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
