# Node Description Batch 8 of 34

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

- "ui_drawer": "drawer.tsx" | kind=code-symbol | source=src/components/ui/drawer.tsx:L1 | neighbors=[utils.ts, cn(), Drawer(), DrawerContent, DrawerDescription, DrawerFooter()] | lang=en
- "ui_navigation_menu": "navigation-menu.tsx" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L1 | neighbors=[utils.ts, cn(), NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList] | lang=en
- "ui_select": "select.tsx" | kind=code-symbol | source=src/components/ui/select.tsx:L1 | neighbors=[utils.ts, cn(), SelectContent, SelectItem, SelectLabel, SelectScrollDownButton] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2db539c32f8111052eba7d719d7600bec14619e9": "2db539c Work in progress" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 98edc37 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@40c3bfff6b12140abfc7240e3b919dbecd850cc2": "40c3bff Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, a6260b9 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d6e898cb8d8d1125c41d89f5b68bff81325b838": "5d6e898 Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 538314c Contactformulier en adminfix] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a6260b9228de5a3e8e996ef8663caf9e066bcf85": "a6260b9 Changes" | kind=Commit | source=git | neighbors=[40c3bff Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a8cb18d0d01d7c76dcbf5be694a9498706e1eb68": "a8cb18d Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 5d6e898 Changes] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b29ceecb5efa88c0e8d9ba1fe3e2f43becf32466": "b29ceec Fixed weak PRNG and RLS" | kind=Commit | source=git | neighbors=[worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 7ca6d63 Changes, 8a81dd1 Fixed security issues, admin.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c67cd437297dbe69b158dc12c4801a2807f5d640": "c67cd43 Changes" | kind=Commit | source=git | neighbors=[8a81dd1 Fixed security issues, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "components_deletedchangestab": "DeletedChangesTab.tsx" | kind=code-symbol | source=src/components/DeletedChangesTab.tsx:L1 | neighbors=[admin.tsx, 37c0d11 Dock tokens toegevoegd & emojis…, 97e70ec Changes, DeletedChangesTab(), use-permissions.tsx, usePermissions()] | lang=en
- "components_teamtab": "TeamTab.tsx" | kind=code-symbol | source=src/components/TeamTab.tsx:L1 | neighbors=[admin.tsx, 6bf533b pushes, c480d2e leads, TeamTab(), use-permissions.tsx, usePermissions()] | lang=en
- "hooks_expire_accounts": "expire-accounts.ts" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 9e611dd Changes, cf4ac91 Alle fases toegevoegd & cron re…, isAuthorized(), Route] | lang=en
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L7 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, on_auth_user_created, public.change_requests, public.extra_credits, public.notifications, public.profiles] | lang=en
- "public_site_error": "site-error.ts" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, rate-limit.ts, checkRateLimit(), Body, cors] | lang=en
- "supabase_auth_middleware": "auth-middleware.ts" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L1 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, requireSupabaseAuth] | lang=en
- "ui_card": "card.tsx" | kind=code-symbol | source=src/components/ui/card.tsx:L1 | neighbors=[utils.ts, cn(), Card, CardContent, CardDescription, CardFooter] | lang=en
- "authenticated_account": "account.tsx" | kind=code-symbol | source=src/routes/_authenticated/account.tsx:L1 | neighbors=[AccountPage(), Route, 37c0d11 Dock tokens toegevoegd & emojis…, 9784613 4 nieuwe portal-paginaën toegev…, 97e70ec Changes, fb1c670 Changes] | lang=en
- "authenticated_server_serverpage": "ServerPage()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L320 | neighbors=[server.tsx, formatServerAge(), formatSslDate(), formatUptime(), na(), safeJsonParse()] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@390130257deb2b7ec8c8e624493c776642bd2990": "3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug" | kind=Commit | source=git | neighbors=[2fcc9a3 fixes, admin.tsx, main, worktree-replicated-fluttering-whisper, 7f807c8 Catch login network errors inst…, f7b9fd5 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7ca6d63814f8da2c3cafd2efe19f73faf8637fd0": "7ca6d63 Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 8a81dd1 Fixed security issues, 20260523231942_fb4587f4-15b7-4604-9d1a-…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f2eb4fee5708d1ae2198a43a0ef81a988ec315f0": "f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes" | kind=Commit | source=git | neighbors=[02d6137 fixes, admin.tsx, admin.accounts.tsx, main, c27ffd9 fixes, AdminChatPanel.tsx] | lang=en
- "components_cookiebanner": "CookieBanner.tsx" | kind=code-symbol | source=src/components/CookieBanner.tsx:L1 | neighbors=[e33fd2d tekst vergroten en cookies, ecdbe8e fixes, CookieBanner(), CookiePrefs, loadPrefs(), savePrefs()] | lang=en
- "components_portaltutorial": "PortalTutorial.tsx" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L1 | neighbors=[portal.tsx, ee6f2e6 fixes, fadeVariants, PortalTutorial(), ProgressDots(), Slide] | lang=en
- "hooks_use_auth": "use-auth.tsx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L1 | neighbors=[AuthCtx, AuthProvider(), Ctx, useAuth(), client.ts, supabase] | lang=en
- "lib_status_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/lib/status.ts:L1 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, DeletedChangesTab.tsx] | lang=en
- "routes_algemene_voorwaarden": "algemene-voorwaarden.tsx" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, ecdbe8e fixes, Footer.tsx, Footer(), Route, VoorwaardenPage()] | lang=en
- "routes_login": "login.tsx" | kind=code-symbol | source=src/routes/login.tsx:L1 | neighbors=[6b21362 Catch login network errors inst…, 7f807c8 Catch login network errors inst…, LoginPage(), Route, client.ts, supabase] | lang=en
- "routes_privacybeleid": "privacybeleid.tsx" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, ecdbe8e fixes, Footer.tsx, Footer(), PrivacyPage(), Route] | lang=en
- "src_server_fetch": "fetch()" | kind=code-symbol | source=src/server.ts:L193 | neighbors=[server.ts, applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), getServerEntry(), logServerCrash()] | lang=en
- "src_start": "start.ts" | kind=code-symbol | source=src/start.ts:L1 | neighbors=[routeTree.gen.ts, error-page.ts, renderErrorPage(), errorMiddleware, startInstance, auth-attacher.ts] | lang=en
- "ui_calendar": "calendar.tsx" | kind=code-symbol | source=src/components/ui/calendar.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, Button, buttonVariants, Calendar()] | lang=en
- "ui_toggle_group": "toggle-group.tsx" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L1 | neighbors=[utils.ts, cn(), toggle.tsx, ToggleGroup, ToggleGroupContext, ToggleGroupItem] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7443b546e0a688432fbc4ac3a4954aa1e9ebbb55": "7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, worktree-replicated-fluttering-whisper, AdminChatPanel.tsx, ChatWidget.tsx, 99bd8ac Surface site_errors in the acco…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f7b9fd5f37bf8a80154dd8335ab2d76ee2408e67": "f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[3901302 Fix mojibake in admin dashboard…, ee6f2e6 fixes, admin.tsx, main, 6b21362 Catch login network errors inst…, server.ts] | lang=en
- "hooks_use_permissions_usepermissions": "usePermissions()" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L6 | neighbors=[admin.tsx, server.tsx, BerichtenTab.tsx, DeletedChangesTab.tsx, TeamTab.tsx, use-permissions.tsx] | lang=en
- "lib_admin_functions_ensureroles": "ensureRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L26 | neighbors=[admin.functions.ts, ensureAdmin(), ensureLeadsAccess(), getRoles(), ensureStaff(), ensureSuperAdmin()] | lang=en
- "lib_status_priority_label": "PRIORITY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L35 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260713130000_project_expansion_phase2_public_project_tasks": "public.project_tasks" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L11 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, auth.users, public.project_tasks, public.projects] | lang=en
- "supabase_auth_middleware_requiresupabaseauth": "requireSupabaseAuth" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L9 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, auth-middleware.ts] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-007.json

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
