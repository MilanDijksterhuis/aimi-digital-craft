# Node Description Batch 11 of 47

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
- "lib_permissions_server": "permissions.server.ts" | kind=code-symbol | source=src/lib/permissions.server.ts:L1 | neighbors=[a3773ee sec fixes, ensurePermission(), getEffectivePermissions(), rbac.ts, ALL_PERMISSION_ACTIONS, can()] | lang=en
- "lib_status_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/lib/status.ts:L1 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, DeletedChangesTab.tsx] | lang=en
- "src_start": "start.ts" | kind=code-symbol | source=src/start.ts:L1 | neighbors=[routeTree.gen.ts, error-page.ts, renderErrorPage(), errorMiddleware, startInstance, auth-attacher.ts] | lang=en
- "supabase_auth_middleware_requiresupabaseauth": "requireSupabaseAuth" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L9 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, telegram.functions.ts] | lang=en
- "ui_calendar": "calendar.tsx" | kind=code-symbol | source=src/components/ui/calendar.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, Button, buttonVariants, Calendar()] | lang=en
- "ui_toggle_group": "toggle-group.tsx" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L1 | neighbors=[utils.ts, cn(), toggle.tsx, ToggleGroup, ToggleGroupContext, ToggleGroupItem] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7443b546e0a688432fbc4ac3a4954aa1e9ebbb55": "7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, worktree-replicated-fluttering-whisper, AdminChatPanel.tsx, ChatWidget.tsx, 99bd8ac Surface site_errors in the acco…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a2681a9e5aba53942b6b04ef7a01b7dd2aadfac9": "a2681a9 ewa" | kind=Commit | source=git | neighbors=[81a87ed commit, main, 2fcc9a3 fixes, admin.functions.ts, worktree-replicated-fluttering-whisper, seo-verbetering] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bbc9d80c493eedf605f2e81d53384f621534a44f": "bbc9d80 Surface site_errors in the account Activiteit tab" | kind=Commit | source=git | neighbors=[2189780 fixes, admin.accounts.$accountId.tsx, main, 02d6137 fixes, accounts.server.ts, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e0f6b72edcd68b79f746996f621cc1662c12c128": "e0f6b72 feat(seo): interne links op lokale landingspagina's" | kind=Commit | source=git | neighbors=[9965896 feat(seo): contact- en cases-pa…, main, fa2ea52 feat(seo): nav + uitgebreide fo…, LocationLanding.tsx, website-laten-maken-hoogeveen.tsx, website-laten-maken-veendam.tsx] | lang=nl
- "components_analyticsloader": "AnalyticsLoader.tsx" | kind=code-symbol | source=src/components/AnalyticsLoader.tsx:L1 | neighbors=[8fdd571 SEO, AnalyticsLoader(), CookiePrefs, loadTrackJs(), readPrefs(), __root.tsx] | lang=en
- "design_handoff_meer_diensten_support_collectprops": "collectProps()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L415 | neighbors=[support.js, compileAttr(), kebabToCamel(), walkComponent(), walkElement(), walkXImport()] | lang=en
- "design_handoff_meer_diensten_support_compileattr": "compileAttr()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L401 | neighbors=[support.js, collectProps(), walkComponent(), walkFor(), walkIf(), walkXImport()] | lang=en
- "lib_admin_functions_ensureroles": "ensureRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L26 | neighbors=[admin.functions.ts, ensureAdmin(), ensureLeadsAccess(), getRoles(), ensureStaff(), ensureSuperAdmin()] | lang=en
- "lib_email_server": "email.server.ts" | kind=code-symbol | source=src/lib/email.server.ts:L1 | neighbors=[5bc9ff0 google authenticatoin, a3773ee sec fixes, b83b044 Revert: verwijder Google OAuth …, escapeHtml(), sendWelcomeEmail(), transporter] | lang=en
- "lib_seo_ld": "ld()" | kind=code-symbol | source=src/lib/seo.ts:L24 | neighbors=[seo.ts, breadcrumbJsonLd(), faqJsonLd(), howToJsonLd(), offeringsJsonLd(), serviceJsonLd()] | lang=en
- "lib_status_priority_label": "PRIORITY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L35 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260713130000_project_expansion_phase2_public_project_tasks": "public.project_tasks" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L11 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, auth.users, public.project_tasks, public.projects] | lang=en
- "supabase_telegram_migration": "supabase-telegram-migration.sql" | kind=code-symbol | source=supabase-telegram-migration.sql:L1 | neighbors=[2b1d78f telegram, profiles, telegram_link_tokens, telegram_mfa_codes, telegram_notification_recipients, telegram_pending_logins] | lang=en
- "ui_alert": "alert.tsx" | kind=code-symbol | source=src/components/ui/alert.tsx:L1 | neighbors=[utils.ts, cn(), Alert, AlertDescription, AlertTitle, alertVariants] | lang=en
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L83 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L28 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L71 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en

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
