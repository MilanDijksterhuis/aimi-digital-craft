# Node Description Batch 9 of 36

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

- "routes_privacybeleid": "privacybeleid.tsx" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, ecdbe8e fixes, Footer.tsx, Footer(), PrivacyPage(), Route] | lang=en
- "src_server_fetch": "fetch()" | kind=code-symbol | source=src/server.ts:L193 | neighbors=[server.ts, applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), getServerEntry(), logServerCrash()] | lang=en
- "src_start": "start.ts" | kind=code-symbol | source=src/start.ts:L1 | neighbors=[routeTree.gen.ts, error-page.ts, renderErrorPage(), errorMiddleware, startInstance, auth-attacher.ts] | lang=en
- "ui_calendar": "calendar.tsx" | kind=code-symbol | source=src/components/ui/calendar.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, Button, buttonVariants, Calendar()] | lang=en
- "ui_toggle_group": "toggle-group.tsx" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L1 | neighbors=[utils.ts, cn(), toggle.tsx, ToggleGroup, ToggleGroupContext, ToggleGroupItem] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7443b546e0a688432fbc4ac3a4954aa1e9ebbb55": "7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, worktree-replicated-fluttering-whisper, AdminChatPanel.tsx, ChatWidget.tsx, 99bd8ac Surface site_errors in the acco…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f7b9fd5f37bf8a80154dd8335ab2d76ee2408e67": "f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[3901302 Fix mojibake in admin dashboard…, ee6f2e6 fixes, admin.tsx, main, 6b21362 Catch login network errors inst…, server.ts] | lang=en
- "components_processtimeline": "ProcessTimeline.tsx" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L1 | neighbors=[129b916 manier van werken, 9a2689c code fixes, ecdbe8e fixes, phases, ProcessTimeline(), index.tsx] | lang=en
- "hooks_use_permissions_usepermissions": "usePermissions()" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L6 | neighbors=[admin.tsx, server.tsx, BerichtenTab.tsx, DeletedChangesTab.tsx, TeamTab.tsx, use-permissions.tsx] | lang=en
- "lib_admin_functions_ensureroles": "ensureRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L26 | neighbors=[admin.functions.ts, ensureAdmin(), ensureLeadsAccess(), getRoles(), ensureStaff(), ensureSuperAdmin()] | lang=en
- "lib_email_server": "email.server.ts" | kind=code-symbol | source=src/lib/email.server.ts:L1 | neighbors=[5bc9ff0 google authenticatoin, a3773ee sec fixes, b83b044 Revert: verwijder Google OAuth …, escapeHtml(), sendWelcomeEmail(), transporter] | lang=en
- "lib_status_priority_label": "PRIORITY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L35 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260713130000_project_expansion_phase2_public_project_tasks": "public.project_tasks" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L11 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, auth.users, public.project_tasks, public.projects] | lang=en
- "supabase_auth_middleware_requiresupabaseauth": "requireSupabaseAuth" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L9 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, auth-middleware.ts] | lang=en
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
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@99bd8ac905d06effee68feda0ef2d2893d080220": "99bd8ac Surface site_errors in the account Activiteit tab" | kind=Commit | source=git | neighbors=[admin.accounts.$accountId.tsx, worktree-replicated-fluttering-whisper, 7443b54 Fix root cause: catch Supabase …, accounts.server.ts, dbd0657 Log server-side (SSR) crashes t…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a2681a9e5aba53942b6b04ef7a01b7dd2aadfac9": "a2681a9 ewa" | kind=Commit | source=git | neighbors=[81a87ed commit, main, worktree-replicated-fluttering-whisper, 2fcc9a3 fixes, admin.functions.ts] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bbc9d80c493eedf605f2e81d53384f621534a44f": "bbc9d80 Surface site_errors in the account Activiteit tab" | kind=Commit | source=git | neighbors=[2189780 fixes, admin.accounts.$accountId.tsx, main, 02d6137 fixes, accounts.server.ts] | lang=en
- "components_work": "Work.tsx" | kind=code-symbol | source=src/components/Work.tsx:L1 | neighbors=[98edc37 Changes, ab14295 Design overhauled, A11y-bar weg, ecdbe8e fixes, projects, Work()] | lang=en
- "lib_auth_guards_server_ensureroles": "ensureRoles()" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L16 | neighbors=[auth-guards.server.ts, ensureAdmin(), getRoles(), ensureStaff(), ensureSuperAdmin()] | lang=en
- "lib_project_status_isprojectoverdue": "isProjectOverdue()" | kind=code-symbol | source=src/lib/project-status.ts:L59 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_status_color": "PROJECT_STATUS_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L25 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_status_label": "PROJECT_STATUS_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L16 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_status_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/lib/status.ts:L23 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf": "20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L1 | neighbors=[public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message] | lang=en
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17": "20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L1 | neighbors=[public.audit_log, public.has_any_role(), public.has_role(), public.is_staff(), public.is_super_admin()] | lang=en
- "src_server_normalizecatastrophicssrresponse": "normalizeCatastrophicSsrResponse()" | kind=code-symbol | source=src/server.ts:L75 | neighbors=[server.ts, fetch(), brandedErrorResponse(), isCatastrophicSsrErrorBody(), logServerCrash()] | lang=en
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=src/components/ui/accordion.tsx:L1 | neighbors=[utils.ts, cn(), AccordionContent, AccordionItem, AccordionTrigger] | lang=en
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L91 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, alert-dialog.tsx] | lang=en
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=src/components/ui/avatar.tsx:L1 | neighbors=[utils.ts, cn(), Avatar, AvatarFallback, AvatarImage] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-008.json

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
