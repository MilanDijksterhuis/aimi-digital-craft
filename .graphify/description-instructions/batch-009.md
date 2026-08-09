# Node Description Batch 10 of 41

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

- "design_handoff_meer_diensten_support_compileattr": "compileAttr()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L401 | neighbors=[support.js, collectProps(), walkComponent(), walkFor(), walkIf(), walkXImport()] | lang=en
- "lib_admin_functions_ensureroles": "ensureRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L26 | neighbors=[admin.functions.ts, ensureAdmin(), ensureLeadsAccess(), getRoles(), ensureStaff(), ensureSuperAdmin()] | lang=en
- "lib_email_server": "email.server.ts" | kind=code-symbol | source=src/lib/email.server.ts:L1 | neighbors=[5bc9ff0 google authenticatoin, a3773ee sec fixes, b83b044 Revert: verwijder Google OAuth …, escapeHtml(), sendWelcomeEmail(), transporter] | lang=en
- "lib_status_priority_label": "PRIORITY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L35 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260713130000_project_expansion_phase2_public_project_tasks": "public.project_tasks" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L11 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, auth.users, public.project_tasks, public.projects] | lang=en
- "supabase_telegram_migration": "supabase-telegram-migration.sql" | kind=code-symbol | source=supabase-telegram-migration.sql:L1 | neighbors=[2b1d78f telegram, profiles, telegram_link_tokens, telegram_mfa_codes, telegram_notification_recipients, telegram_pending_logins] | lang=en
- "ui_alert": "alert.tsx" | kind=code-symbol | source=src/components/ui/alert.tsx:L1 | neighbors=[utils.ts, cn(), Alert, AlertDescription, AlertTitle, alertVariants] | lang=en
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L83 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L28 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L71 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en
- "ui_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L51 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en
- "ui_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L46 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en
- "ui_alert_dialog_alertdialogtitle": "AlertDialogTitle" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L59 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, alert-dialog.tsx] | lang=en
- "ui_input_otp": "input-otp.tsx" | kind=code-symbol | source=src/components/ui/input-otp.tsx:L1 | neighbors=[utils.ts, cn(), InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot] | lang=en
- "ui_tabs_tabscontent": "TabsContent" | kind=code-symbol | source=src/components/ui/tabs.tsx:L38 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx] | lang=en
- "ui_tabs_tabslist": "TabsList" | kind=code-symbol | source=src/components/ui/tabs.tsx:L8 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx] | lang=en
- "ui_tabs_tabstrigger": "TabsTrigger" | kind=code-symbol | source=src/components/ui/tabs.tsx:L23 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx] | lang=en
- "authenticated_admin_instellingen": "admin.instellingen.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.instellingen.tsx:L1 | neighbors=[AdminInstellingenPage(), RecipientsPanel(), Route, 2b1d78f telegram, fc7da2d animaties en paginas] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3417a43ff60181e153b471af78493fc6a41d84b2": "3417a43 fixes" | kind=Commit | source=git | neighbors=[main, seo-verbetering, 9c1fa06 perf fixes, portal.functions.ts, 4510b3f perf fixes] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4510b3f526a22eb7d3175788d11ea38ccee4bfee": "4510b3f perf fixes" | kind=Commit | source=git | neighbors=[main, seo-verbetering, 3417a43 fixes, vite.config.ts, 9d0b477 perf fixes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d1e827778ae2a151181acfb4bdb2b189e5ce0e8": "5d1e827 Log server-side (SSR) crashes to site_errors too" | kind=Commit | source=git | neighbors=[main, seo-verbetering, 2189780 fixes, server.ts, b75b00d fixes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6b2136292b72d0c82416f5451ffc903f601b5761": "6b21362 Catch login network errors instead of crashing to the error boundary" | kind=Commit | source=git | neighbors=[main, seo-verbetering, 1713634 fixes, login.tsx, f7b9fd5 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@99bd8ac905d06effee68feda0ef2d2893d080220": "99bd8ac Surface site_errors in the account Activiteit tab" | kind=Commit | source=git | neighbors=[admin.accounts.$accountId.tsx, worktree-replicated-fluttering-whisper, 7443b54 Fix root cause: catch Supabase …, accounts.server.ts, dbd0657 Log server-side (SSR) crashes t…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9d0b4772142f7398a571542c71d39cba97403f89": "9d0b477 perf fixes" | kind=Commit | source=git | neighbors=[7dbbf18 perf fixes, main, seo-verbetering, 4510b3f perf fixes, vite.config.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bc842b80ee3dbb87035733315ca8c748240f96b1": "bc842b8 leads functions" | kind=Commit | source=git | neighbors=[171eb96 leads functions, main, seo-verbetering, 2b1d78f telegram, sitemap[.]xml.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c91431841e3bb2cda79c964b746be4f73336dbfc": "c914318 ewa" | kind=Commit | source=git | neighbors=[500f718 Merge branch 'main' of https://…, main, seo-verbetering, worktree-replicated-fluttering-whisper, 4c90153 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cf5e1212ec15a8789acaa64d5e380fe76b95c72e": "cf5e121 Catch getSession() network errors in the auth route guard" | kind=Commit | source=git | neighbors=[1713634 fixes, main, seo-verbetering, 8e663f1 fixes, _authenticated.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d2da4c97008ae99fb598665045fea1b89db39a76": "d2da4c9 Log root error boundary crashes to site_errors for visibility" | kind=Commit | source=git | neighbors=[8e663f1 fixes, main, seo-verbetering, b75b00d fixes, __root.tsx] | lang=en
- "components_work": "Work.tsx" | kind=code-symbol | source=src/components/Work.tsx:L1 | neighbors=[98edc37 Changes, ab14295 Design overhauled, A11y-bar weg, ecdbe8e fixes, projects, Work()] | lang=en
- "design_handoff_meer_diensten_support_boot": "boot()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L150 | neighbors=[support.js, getReact(), getReactDOM(), parseDcDocument(), rootNameForDocument()] | lang=en
- "design_handoff_meer_diensten_support_resolve": "resolve()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L205 | neighbors=[support.js, loadReactUmd(), findTopLevelEquality(), parensWrapWhole(), resolvePath()] | lang=en
- "design_handoff_meer_diensten_support_walkcomponent": "walkComponent()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L661 | neighbors=[support.js, walk(), collectProps(), compileAttr(), walkChildren()] | lang=en
- "lib_auth_guards_server_ensureroles": "ensureRoles()" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L16 | neighbors=[auth-guards.server.ts, ensureAdmin(), getRoles(), ensureStaff(), ensureSuperAdmin()] | lang=en
- "lib_project_status_isprojectoverdue": "isProjectOverdue()" | kind=code-symbol | source=src/lib/project-status.ts:L59 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_status_color": "PROJECT_STATUS_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L25 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_status_label": "PROJECT_STATUS_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L16 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_status_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/lib/status.ts:L23 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf": "20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L1 | neighbors=[public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message] | lang=en
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17": "20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L1 | neighbors=[public.audit_log, public.has_any_role(), public.has_role(), public.is_staff(), public.is_super_admin()] | lang=en
- "routes_sitemap_xml": "sitemap[.]xml.tsx" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L1 | neighbors=[b48bbc0 chore: snapshot lokale SEO-pagi…, bc842b8 leads functions, LASTMOD, Route, SitemapEntry] | lang=en

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
