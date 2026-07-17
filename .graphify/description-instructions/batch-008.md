# Node Description Batch 9 of 34

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

- "lib_email_server": "email.server.ts" | kind=code-symbol | source=src/lib/email.server.ts:L1 | neighbors=[5bc9ff0 google authenticatoin, a3773ee sec fixes, b83b044 Revert: verwijder Google OAuth …, escapeHtml(), sendWelcomeEmail(), transporter] | lang=en
- "lib_status_priority_label": "PRIORITY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L35 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260713130000_project_expansion_phase2_public_project_tasks": "public.project_tasks" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L11 | neighbors=[20260713130000_project_expansion_phase2…, public.project_task_time_entries, auth.users, public.project_tasks, public.projects] | lang=en
- "supabase_auth_middleware_requiresupabaseauth": "requireSupabaseAuth" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L9 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, auth-middleware.ts] | lang=en
- "ui_alert": "alert.tsx" | kind=code-symbol | source=src/components/ui/alert.tsx:L1 | neighbors=[utils.ts, cn(), Alert, AlertDescription, AlertTitle, alertVariants] | lang=en
- "ui_input_otp": "input-otp.tsx" | kind=code-symbol | source=src/components/ui/input-otp.tsx:L1 | neighbors=[utils.ts, cn(), InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot] | lang=en
- "ui_tabs_tabscontent": "TabsContent" | kind=code-symbol | source=src/components/ui/tabs.tsx:L38 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx] | lang=en
- "ui_tabs_tabslist": "TabsList" | kind=code-symbol | source=src/components/ui/tabs.tsx:L8 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx] | lang=en
- "ui_tabs_tabstrigger": "TabsTrigger" | kind=code-symbol | source=src/components/ui/tabs.tsx:L23 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, tabs.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@99bd8ac905d06effee68feda0ef2d2893d080220": "99bd8ac Surface site_errors in the account Activiteit tab" | kind=Commit | source=git | neighbors=[admin.accounts.$accountId.tsx, worktree-replicated-fluttering-whisper, 7443b54 Fix root cause: catch Supabase …, accounts.server.ts, dbd0657 Log server-side (SSR) crashes t…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a2681a9e5aba53942b6b04ef7a01b7dd2aadfac9": "a2681a9 ewa" | kind=Commit | source=git | neighbors=[81a87ed commit, main, worktree-replicated-fluttering-whisper, 2fcc9a3 fixes, admin.functions.ts] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bbc9d80c493eedf605f2e81d53384f621534a44f": "bbc9d80 Surface site_errors in the account Activiteit tab" | kind=Commit | source=git | neighbors=[2189780 fixes, admin.accounts.$accountId.tsx, main, 02d6137 fixes, accounts.server.ts] | lang=en
- "components_processtimeline": "ProcessTimeline.tsx" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L1 | neighbors=[129b916 manier van werken, ecdbe8e fixes, phases, ProcessTimeline(), index.tsx] | lang=en
- "components_work": "Work.tsx" | kind=code-symbol | source=src/components/Work.tsx:L1 | neighbors=[98edc37 Changes, ab14295 Design overhauled, A11y-bar weg, ecdbe8e fixes, projects, Work()] | lang=en
- "lib_project_status_isprojectoverdue": "isProjectOverdue()" | kind=code-symbol | source=src/lib/project-status.ts:L59 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_status_color": "PROJECT_STATUS_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L25 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_status_label": "PROJECT_STATUS_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L16 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_status_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/lib/status.ts:L23 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf": "20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L1 | neighbors=[public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message] | lang=en
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17": "20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L1 | neighbors=[public.audit_log, public.has_any_role(), public.has_role(), public.is_staff(), public.is_super_admin()] | lang=en
- "src_server_normalizecatastrophicssrresponse": "normalizeCatastrophicSsrResponse()" | kind=code-symbol | source=src/server.ts:L75 | neighbors=[server.ts, fetch(), brandedErrorResponse(), isCatastrophicSsrErrorBody(), logServerCrash()] | lang=en
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=src/components/ui/accordion.tsx:L1 | neighbors=[utils.ts, cn(), AccordionContent, AccordionItem, AccordionTrigger] | lang=en
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=src/components/ui/avatar.tsx:L1 | neighbors=[utils.ts, cn(), Avatar, AvatarFallback, AvatarImage] | lang=en
- "ui_badge": "badge.tsx" | kind=code-symbol | source=src/components/ui/badge.tsx:L1 | neighbors=[utils.ts, cn(), Badge(), BadgeProps, badgeVariants] | lang=en
- "ui_label": "label.tsx" | kind=code-symbol | source=src/components/ui/label.tsx:L1 | neighbors=[form.tsx, utils.ts, cn(), Label, labelVariants] | lang=en
- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=src/components/ui/toggle.tsx:L1 | neighbors=[utils.ts, cn(), Toggle, toggleVariants, toggle-group.tsx] | lang=en
- "vite_config": "vite.config.ts" | kind=code-symbol | source=vite.config.ts:L1 | neighbors=[332d0c8 Fix: externalize googleapis/nod…, 821a216 Update vite.config.ts, b83b044 Revert: verwijder Google OAuth …, f24ecdb Change server preset from 'bun'…, fe58e74 Update vite.config.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4b4ebd9957a147bb39dbbbc6eb428552b7a1bb71": "4b4ebd9 Catch getSession() network errors in the auth route guard" | kind=Commit | source=git | neighbors=[worktree-replicated-fluttering-whisper, 6da1e20 Log root error boundary crashes…, _authenticated.tsx, 7f807c8 Catch login network errors inst…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d1e827778ae2a151181acfb4bdb2b189e5ce0e8": "5d1e827 Log server-side (SSR) crashes to site_errors too" | kind=Commit | source=git | neighbors=[main, 2189780 fixes, server.ts, b75b00d fixes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6b2136292b72d0c82416f5451ffc903f601b5761": "6b21362 Catch login network errors instead of crashing to the error boundary" | kind=Commit | source=git | neighbors=[main, 1713634 fixes, login.tsx, f7b9fd5 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6da1e20bfd1f2cb2370175d7b9210012fceb1a05": "6da1e20 Log root error boundary crashes to site_errors for visibility" | kind=Commit | source=git | neighbors=[4b4ebd9 Catch getSession() network erro…, worktree-replicated-fluttering-whisper, dbd0657 Log server-side (SSR) crashes t…, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f807c8281cf450804bce42b07393edff688e971": "7f807c8 Catch login network errors instead of crashing to the error boundary" | kind=Commit | source=git | neighbors=[3901302 Fix mojibake in admin dashboard…, worktree-replicated-fluttering-whisper, 4b4ebd9 Catch getSession() network erro…, login.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c91431841e3bb2cda79c964b746be4f73336dbfc": "c914318 ewa" | kind=Commit | source=git | neighbors=[500f718 Merge branch 'main' of https://…, main, worktree-replicated-fluttering-whisper, 4c90153 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cf5e1212ec15a8789acaa64d5e380fe76b95c72e": "cf5e121 Catch getSession() network errors in the auth route guard" | kind=Commit | source=git | neighbors=[1713634 fixes, main, 8e663f1 fixes, _authenticated.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d2da4c97008ae99fb598665045fea1b89db39a76": "d2da4c9 Log root error boundary crashes to site_errors for visibility" | kind=Commit | source=git | neighbors=[8e663f1 fixes, main, b75b00d fixes, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dbd0657ea193395ad36e71a78cfe0b953fc87956": "dbd0657 Log server-side (SSR) crashes to site_errors too" | kind=Commit | source=git | neighbors=[6da1e20 Log root error boundary crashes…, worktree-replicated-fluttering-whisper, 99bd8ac Surface site_errors in the acco…, server.ts] | lang=en
- "components_berichtentab": "BerichtenTab.tsx" | kind=code-symbol | source=src/components/BerichtenTab.tsx:L1 | neighbors=[admin.tsx, BerichtenTab(), use-permissions.tsx, usePermissions()] | lang=en
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L3 | neighbors=[Footer.tsx, algemene-voorwaarden.tsx, index.tsx, privacybeleid.tsx] | lang=en
- "lib_project_status_project_priority_color": "PROJECT_PRIORITY_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L52 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_priority_label": "PROJECT_PRIORITY_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L38 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en

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
