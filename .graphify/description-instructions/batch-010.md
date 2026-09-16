# Node Description Batch 11 of 52

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
- "lib_seo_ld": "ld()" | kind=code-symbol | source=src/lib/seo.ts:L233 | neighbors=[seo.ts, breadcrumbJsonLd(), contactPageJsonLd(), faqJsonLd(), offeringsJsonLd(), serviceJsonLd()] | lang=en
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L7 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, on_auth_user_created, public.change_requests, public.extra_credits, public.notifications, public.profiles] | lang=en
- "migrations_20260717150000_sec5_durable_rate_limit": "20260717150000_sec5_durable_rate_limit.sql" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L1 | neighbors=[a3773ee sec fixes, public.check_rate_limit(), public.is_ip_banned(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike()] | lang=en
- "ui_card": "card.tsx" | kind=code-symbol | source=src/components/ui/card.tsx:L1 | neighbors=[utils.ts, cn(), Card, CardContent, CardDescription, CardFooter] | lang=en
- "authenticated_account": "account.tsx" | kind=code-symbol | source=src/routes/_authenticated/account.tsx:L1 | neighbors=[AccountPage(), Route, 37c0d11 Dock tokens toegevoegd & emojis…, 97e70ec Changes, routeTree.gen.ts, 9784613 4 nieuwe portal-paginaën toegev…] | lang=en
- "authenticated_server_serverpage": "ServerPage()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L320 | neighbors=[server.tsx, formatServerAge(), formatSslDate(), formatUptime(), na(), safeJsonParse()] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@04564c5bc0439aedd94852a88644fb7ece2445c8": "04564c5 fixes" | kind=Commit | source=git | neighbors=[main, 36d8ccb new pages, FAQ.tsx, Footer.tsx, index.tsx, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7ca6d63814f8da2c3cafd2efe19f73faf8637fd0": "7ca6d63 Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 8a81dd1 Fixed security issues, 20260523231942_fb4587f4-15b7-4604-9d1a-…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f7b9fd5f37bf8a80154dd8335ab2d76ee2408e67": "f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[3901302 Fix mojibake in admin dashboard…, ee6f2e6 fixes, admin.tsx, main, 6b21362 Catch login network errors inst…, server.ts] | lang=en
- "components_berichtentab": "BerichtenTab.tsx" | kind=code-symbol | source=src/components/BerichtenTab.tsx:L1 | neighbors=[admin.tsx, 9a2689c code fixes, BerichtenTab(), ConfirmDialog.tsx, useConfirm(), use-permissions.tsx] | lang=en
- "components_breadcrumbs_breadcrumbs": "Breadcrumbs()" | kind=code-symbol | source=src/components/Breadcrumbs.tsx:L15 | neighbors=[BranchPage.tsx, Breadcrumbs.tsx, LocationPageV2.tsx, ServicePage.tsx, seo.tsx, website-laten-vernieuwen.tsx] | lang=en
- "components_portaltutorial": "PortalTutorial.tsx" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L1 | neighbors=[portal.tsx, ee6f2e6 fixes, fadeVariants, PortalTutorial(), ProgressDots(), Slide] | lang=en
- "components_rodeachtergrond": "rodeachtergrond.tsx" | kind=code-symbol | source=src/components/rodeachtergrond.tsx:L1 | neighbors=[1c0e00f fixes, 8fdd571 SEO, bc99d99 achtegrond, RedDiagonalBackground(), onderhoud-hosting.tsx, webshop-laten-maken.tsx] | lang=en
- "design_handoff_meer_diensten_support_createruntime": "createRuntime()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1623 | neighbors=[support.js, createComponentFactory(), createExternalModules(), createHelmetManager(), createPseudoSheet(), createRegistry()] | lang=en
- "design_handoff_meer_diensten_support_walk": "walk()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L550 | neighbors=[support.js, walkComponent(), walkElement(), walkFor(), walkIf(), walkText()] | lang=en
- "design_handoff_meer_diensten_support_walkchildren": "walkChildren()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L483 | neighbors=[support.js, compileTemplate(), walkComponent(), walkElement(), walkFor(), walkIf()] | lang=en
- "design_handoff_meer_diensten_support_walkelement": "walkElement()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L787 | neighbors=[support.js, walk(), collectProps(), contentKey(), isDeckMountTag(), walkChildren()] | lang=en
- "design_handoff_meer_diensten_support_walkximport": "walkXImport()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L690 | neighbors=[support.js, walk(), collectProps(), compileAttr(), isDeckMountTag(), walkChildren()] | lang=en
- "hooks_use_auth": "use-auth.tsx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L1 | neighbors=[AuthCtx, AuthProvider(), Ctx, useAuth(), client.ts, supabase] | lang=en
- "hooks_use_permissions_usepermissions": "usePermissions()" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L6 | neighbors=[admin.tsx, admin.leads.tsx, server.tsx, BerichtenTab.tsx, DeletedChangesTab.tsx, TeamTab.tsx] | lang=en
- "kaart_hoogeveen_en_veendam_support_createruntime": "createRuntime()" | kind=code-symbol | source=Kaart Hoogeveen en Veendam/support.js:L1623 | neighbors=[support.js, createComponentFactory(), createExternalModules(), createHelmetManager(), createPseudoSheet(), createRegistry()] | lang=en
- "kaart_hoogeveen_en_veendam_support_walk": "walk()" | kind=code-symbol | source=Kaart Hoogeveen en Veendam/support.js:L550 | neighbors=[support.js, walkComponent(), walkElement(), walkFor(), walkIf(), walkText()] | lang=en
- "kaart_hoogeveen_en_veendam_support_walkchildren": "walkChildren()" | kind=code-symbol | source=Kaart Hoogeveen en Veendam/support.js:L483 | neighbors=[support.js, compileTemplate(), walkComponent(), walkElement(), walkFor(), walkIf()] | lang=en
- "kaart_hoogeveen_en_veendam_support_walkelement": "walkElement()" | kind=code-symbol | source=Kaart Hoogeveen en Veendam/support.js:L787 | neighbors=[support.js, walk(), collectProps(), contentKey(), isDeckMountTag(), walkChildren()] | lang=en
- "kaart_hoogeveen_en_veendam_support_walkximport": "walkXImport()" | kind=code-symbol | source=Kaart Hoogeveen en Veendam/support.js:L690 | neighbors=[support.js, walk(), collectProps(), compileAttr(), isDeckMountTag(), walkChildren()] | lang=en
- "lib_permissions_server": "permissions.server.ts" | kind=code-symbol | source=src/lib/permissions.server.ts:L1 | neighbors=[a3773ee sec fixes, ensurePermission(), getEffectivePermissions(), rbac.ts, ALL_PERMISSION_ACTIONS, can()] | lang=en
- "lib_status_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/lib/status.ts:L1 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, DeletedChangesTab.tsx] | lang=en
- "lib_website_checker_functions": "website-checker.functions.ts" | kind=code-symbol | source=src/lib/website-checker.functions.ts:L1 | neighbors=[dda7a04 web tester, rate-limit.ts, checkRateLimit(), getClientIp(), checkWebsite, hashIp()] | lang=en
- "src_start": "start.ts" | kind=code-symbol | source=src/start.ts:L1 | neighbors=[routeTree.gen.ts, error-page.ts, renderErrorPage(), errorMiddleware, startInstance, auth-attacher.ts] | lang=en
- "supabase_auth_middleware_requiresupabaseauth": "requireSupabaseAuth" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L9 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, telegram.functions.ts] | lang=en

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
