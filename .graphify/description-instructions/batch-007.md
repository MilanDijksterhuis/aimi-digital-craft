# Node Description Batch 8 of 32

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ec62d9f02b3a195f89dcf50b62b93a648b9c6aac": "ec62d9f Changes" | kind=Commit | source=git | neighbors=[c532299 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ee1b8aef2b854fd9adfc972132e301fa732457d5": "ee1b8ae Change start script from bun to node" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "components_deletedchangestab": "DeletedChangesTab.tsx" | kind=code-symbol | source=src/components/DeletedChangesTab.tsx:L1 | neighbors=[admin.tsx, 37c0d11 Dock tokens toegevoegd & emojis…, 97e70ec Changes, DeletedChangesTab(), use-permissions.tsx, usePermissions()]
- "components_teamtab": "TeamTab.tsx" | kind=code-symbol | source=src/components/TeamTab.tsx:L1 | neighbors=[admin.tsx, 6bf533b pushes, c480d2e leads, TeamTab(), use-permissions.tsx, usePermissions()]
- "hooks_expire_accounts": "expire-accounts.ts" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 9e611dd Changes, cf4ac91 Alle fases toegevoegd & cron re…, isAuthorized(), Route]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L7 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, on_auth_user_created, public.change_requests, public.extra_credits, public.notifications, public.profiles]
- "public_site_error": "site-error.ts" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, rate-limit.ts, checkRateLimit(), Body, cors]
- "supabase_auth_middleware": "auth-middleware.ts" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L1 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, requireSupabaseAuth]
- "ui_card": "card.tsx" | kind=code-symbol | source=src/components/ui/card.tsx:L1 | neighbors=[utils.ts, cn(), Card, CardContent, CardDescription, CardFooter]
- "authenticated_account": "account.tsx" | kind=code-symbol | source=src/routes/_authenticated/account.tsx:L1 | neighbors=[AccountPage(), Route, 37c0d11 Dock tokens toegevoegd & emojis…, 9784613 4 nieuwe portal-paginaën toegev…, 97e70ec Changes, fb1c670 Changes]
- "authenticated_server_serverpage": "ServerPage()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L320 | neighbors=[server.tsx, formatServerAge(), formatSslDate(), formatUptime(), na(), safeJsonParse()]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7ca6d63814f8da2c3cafd2efe19f73faf8637fd0": "7ca6d63 Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 8a81dd1 Fixed security issues, 20260523231942_fb4587f4-15b7-4604-9d1a-…]
- "components_adminchatpanel": "AdminChatPanel.tsx" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L1 | neighbors=[admin.tsx, c3a6178 portal changes, AdminChatPanel(), ChatRow, Message, client.ts]
- "components_chatwidget": "ChatWidget.tsx" | kind=code-symbol | source=src/components/ChatWidget.tsx:L1 | neighbors=[portal.tsx, 37c0d11 Dock tokens toegevoegd & emojis…, 97e70ec Changes, ChatWidget(), Message, client.ts]
- "components_cookiebanner": "CookieBanner.tsx" | kind=code-symbol | source=src/components/CookieBanner.tsx:L1 | neighbors=[e33fd2d tekst vergroten en cookies, ecdbe8e fixes, CookieBanner(), CookiePrefs, loadPrefs(), savePrefs()]
- "hooks_use_auth": "use-auth.tsx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L1 | neighbors=[AuthCtx, AuthProvider(), Ctx, useAuth(), client.ts, supabase]
- "lib_accounts_server": "accounts.server.ts" | kind=code-symbol | source=src/lib/accounts.server.ts:L1 | neighbors=[81a87ed commit, 9e611dd Changes, cf4ac91 Alle fases toegevoegd & cron re…, adminGetAccountDetailImpl(), adminHardDeleteUserImpl(), adminListAllAccountsImpl()]
- "lib_status_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/lib/status.ts:L1 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, DeletedChangesTab.tsx]
- "routes_algemene_voorwaarden": "algemene-voorwaarden.tsx" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, ecdbe8e fixes, Footer.tsx, Footer(), Route, VoorwaardenPage()]
- "routes_privacybeleid": "privacybeleid.tsx" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, ecdbe8e fixes, Footer.tsx, Footer(), PrivacyPage(), Route]
- "src_start": "start.ts" | kind=code-symbol | source=src/start.ts:L1 | neighbors=[routeTree.gen.ts, error-page.ts, renderErrorPage(), errorMiddleware, startInstance, auth-attacher.ts]
- "ui_calendar": "calendar.tsx" | kind=code-symbol | source=src/components/ui/calendar.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, Button, buttonVariants, Calendar()]
- "ui_toggle_group": "toggle-group.tsx" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L1 | neighbors=[utils.ts, cn(), toggle.tsx, ToggleGroup, ToggleGroupContext, ToggleGroupItem]
- "hooks_use_permissions_usepermissions": "usePermissions()" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L6 | neighbors=[admin.tsx, server.tsx, BerichtenTab.tsx, DeletedChangesTab.tsx, TeamTab.tsx, use-permissions.tsx]
- "lib_admin_functions_ensureroles": "ensureRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L49 | neighbors=[admin.functions.ts, ensureAdmin(), ensureLeadsAccess(), getRoles(), ensureStaff(), ensureSuperAdmin()]
- "lib_status_priority_label": "PRIORITY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L35 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, status.ts]
- "migrations_20260713130000_project_expansion_phase2_public_project_tasks": "public.project_tasks" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L11 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, auth.users, public.project_tasks, public.projects]
- "src_server_fetch": "fetch()" | kind=code-symbol | source=src/server.ts:L168 | neighbors=[server.ts, applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), getServerEntry(), normalizeCatastrophicSsrResponse()]
- "supabase_auth_middleware_requiresupabaseauth": "requireSupabaseAuth" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L9 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, auth-middleware.ts]
- "ui_alert": "alert.tsx" | kind=code-symbol | source=src/components/ui/alert.tsx:L1 | neighbors=[utils.ts, cn(), Alert, AlertDescription, AlertTitle, alertVariants]
- "ui_input_otp": "input-otp.tsx" | kind=code-symbol | source=src/components/ui/input-otp.tsx:L1 | neighbors=[utils.ts, cn(), InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot]
- "ui_tabs_tabscontent": "TabsContent" | kind=code-symbol | source=src/components/ui/tabs.tsx:L38 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx]
- "ui_tabs_tabslist": "TabsList" | kind=code-symbol | source=src/components/ui/tabs.tsx:L8 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx]
- "ui_tabs_tabstrigger": "TabsTrigger" | kind=code-symbol | source=src/components/ui/tabs.tsx:L23 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx]
- "components_processtimeline": "ProcessTimeline.tsx" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L1 | neighbors=[129b916 manier van werken, ecdbe8e fixes, phases, ProcessTimeline(), index.tsx]
- "components_work": "Work.tsx" | kind=code-symbol | source=src/components/Work.tsx:L1 | neighbors=[98edc37 Changes, ab14295 Design overhauled, A11y-bar weg, ecdbe8e fixes, projects, Work()]
- "lib_project_status_isprojectoverdue": "isProjectOverdue()" | kind=code-symbol | source=src/lib/project-status.ts:L59 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_project_status_project_status_color": "PROJECT_STATUS_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L25 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_project_status_project_status_label": "PROJECT_STATUS_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L16 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_status_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/lib/status.ts:L23 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, status.ts]

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
