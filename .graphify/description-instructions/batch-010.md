# Node Description Batch 11 of 42

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fa2ea52f59de7d272b890bac4dfe7ad4b8edade2": "fa2ea52 feat(seo): nav + uitgebreide footer met interne links (geen orphan page…" | kind=Commit | source=git | neighbors=[e0f6b72 feat(seo): interne links op lok…, main, ef44acd feat(seo): sitemap + llms.txt a…, Footer.tsx, Nav.tsx] | lang=nl
- "components_work": "Work.tsx" | kind=code-symbol | source=src/components/Work.tsx:L1 | neighbors=[98edc37 Changes, ab14295 Design overhauled, A11y-bar weg, ecdbe8e fixes, projects, Work()] | lang=en
- "design_handoff_meer_diensten_support_boot": "boot()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L150 | neighbors=[support.js, getReact(), getReactDOM(), parseDcDocument(), rootNameForDocument()] | lang=en
- "design_handoff_meer_diensten_support_resolve": "resolve()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L205 | neighbors=[support.js, loadReactUmd(), findTopLevelEquality(), parensWrapWhole(), resolvePath()] | lang=en
- "design_handoff_meer_diensten_support_walkcomponent": "walkComponent()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L661 | neighbors=[support.js, walk(), collectProps(), compileAttr(), walkChildren()] | lang=en
- "lib_auth_guards_server_ensureroles": "ensureRoles()" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L16 | neighbors=[auth-guards.server.ts, ensureAdmin(), getRoles(), ensureStaff(), ensureSuperAdmin()] | lang=en
- "lib_project_status_isprojectoverdue": "isProjectOverdue()" | kind=code-symbol | source=src/lib/project-status.ts:L59 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_status_color": "PROJECT_STATUS_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L25 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_status_label": "PROJECT_STATUS_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L16 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_seo_faqjsonld": "faqJsonLd()" | kind=code-symbol | source=src/lib/seo.ts:L61 | neighbors=[seo.ts, ld(), onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx] | lang=en
- "lib_seo_servicejsonld": "serviceJsonLd()" | kind=code-symbol | source=src/lib/seo.ts:L16 | neighbors=[seo.ts, ld(), onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx] | lang=en
- "lib_status_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/lib/status.ts:L23 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, status.ts] | lang=en
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf": "20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L1 | neighbors=[public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message] | lang=en
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17": "20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L1 | neighbors=[public.audit_log, public.has_any_role(), public.has_role(), public.is_staff(), public.is_super_admin()] | lang=en
- "src_server_normalizecatastrophicssrresponse": "normalizeCatastrophicSsrResponse()" | kind=code-symbol | source=src/server.ts:L75 | neighbors=[server.ts, fetch(), brandedErrorResponse(), isCatastrophicSsrErrorBody(), logServerCrash()] | lang=en
- "supabase_telegram_migration_profiles": "profiles" | kind=code-symbol | source=supabase-telegram-migration.sql:L32 | neighbors=[supabase-telegram-migration.sql, telegram_notification_recipients, telegram_link_tokens, telegram_mfa_codes, telegram_pending_logins] | lang=en
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=src/components/ui/accordion.tsx:L1 | neighbors=[utils.ts, cn(), AccordionContent, AccordionItem, AccordionTrigger] | lang=en
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L91 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, alert-dialog.tsx] | lang=en
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=src/components/ui/avatar.tsx:L1 | neighbors=[utils.ts, cn(), Avatar, AvatarFallback, AvatarImage] | lang=en
- "ui_badge": "badge.tsx" | kind=code-symbol | source=src/components/ui/badge.tsx:L1 | neighbors=[utils.ts, cn(), Badge(), BadgeProps, badgeVariants] | lang=en
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=src/components/ui/button.tsx:L7 | neighbors=[ConfirmDialog.tsx, alert-dialog.tsx, button.tsx, calendar.tsx, pagination.tsx] | lang=en
- "ui_label": "label.tsx" | kind=code-symbol | source=src/components/ui/label.tsx:L1 | neighbors=[form.tsx, utils.ts, cn(), Label, labelVariants] | lang=en
- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=src/components/ui/toggle.tsx:L1 | neighbors=[utils.ts, cn(), Toggle, toggleVariants, toggle-group.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@02d6137f7e4b510a668e8625960354a18605578e": "02d6137 fixes" | kind=Commit | source=git | neighbors=[main, f2eb4fe Fix root cause: catch Supabase …, bbc9d80 Surface site_errors in the acco…, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@17136346d2b074323d3dbbdd47e39843b9542f69": "1713634 fixes" | kind=Commit | source=git | neighbors=[main, cf5e121 Catch getSession() network erro…, 6b21362 Catch login network errors inst…, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@171eb96adc82ad89ea816bd635fab71a8bbc3e0e": "171eb96 leads functions" | kind=Commit | source=git | neighbors=[main, bc842b8 leads functions, 85a6666 SEO en robot, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@21897802de523635124450d5d6d9171ea89caaca": "2189780 fixes" | kind=Commit | source=git | neighbors=[main, bbc9d80 Surface site_errors in the acco…, 5d1e827 Log server-side (SSR) crashes t…, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4b4ebd9957a147bb39dbbbc6eb428552b7a1bb71": "4b4ebd9 Catch getSession() network errors in the auth route guard" | kind=Commit | source=git | neighbors=[worktree-replicated-fluttering-whisper, 6da1e20 Log root error boundary crashes…, _authenticated.tsx, 7f807c8 Catch login network errors inst…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6da1e20bfd1f2cb2370175d7b9210012fceb1a05": "6da1e20 Log root error boundary crashes to site_errors for visibility" | kind=Commit | source=git | neighbors=[4b4ebd9 Catch getSession() network erro…, worktree-replicated-fluttering-whisper, dbd0657 Log server-side (SSR) crashes t…, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f807c8281cf450804bce42b07393edff688e971": "7f807c8 Catch login network errors instead of crashing to the error boundary" | kind=Commit | source=git | neighbors=[3901302 Fix mojibake in admin dashboard…, worktree-replicated-fluttering-whisper, 4b4ebd9 Catch getSession() network erro…, login.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8e663f1fb8f305df3e159fb27cfb8773e7b58adc": "8e663f1 fixes" | kind=Commit | source=git | neighbors=[main, d2da4c9 Log root error boundary crashes…, cf5e121 Catch getSession() network erro…, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9965896be37eddc1db3ae92b5d7a76b354441697": "9965896 feat(seo): contact- en cases-pagina met LocalBusiness/Breadcrumb schema" | kind=Commit | source=git | neighbors=[main, e0f6b72 feat(seo): interne links op lok…, contact.tsx, f207e52 feat(seo): dienstenpagina's web…] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9c1fa0674c96765d2d6ee5f3d42b0024f5e29034": "9c1fa06 perf fixes" | kind=Commit | source=git | neighbors=[3417a43 fixes, main, 74ecdc1 code fixes, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b75b00da213fa0ede37fa8482e1f43dc4a6a9b04": "b75b00d fixes" | kind=Commit | source=git | neighbors=[main, 5d1e827 Log server-side (SSR) crashes t…, d2da4c9 Log root error boundary crashes…, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c27ffd9d2912cb3ef331a0a5e858cd6ea4c0c764": "c27ffd9 fixes" | kind=Commit | source=git | neighbors=[main, a3773ee sec fixes, f2eb4fe Fix root cause: catch Supabase …, seo-verbetering] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dbd0657ea193395ad36e71a78cfe0b953fc87956": "dbd0657 Log server-side (SSR) crashes to site_errors too" | kind=Commit | source=git | neighbors=[6da1e20 Log root error boundary crashes…, worktree-replicated-fluttering-whisper, 99bd8ac Surface site_errors in the acco…, server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ef44acdc4cbe4becaa41d27890af2e3744393916": "ef44acd feat(seo): sitemap + llms.txt aangevuld met alle nieuwe pagina's" | kind=Commit | source=git | neighbors=[main, 7a63e47 chore: graphify graph bijgewerkt, sitemap[.]xml.tsx, fa2ea52 feat(seo): nav + uitgebreide fo…] | lang=nl
- "components_callbackagenda_callbackagenda": "CallbackAgenda()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L62 | neighbors=[admin.leads.tsx, CallbackAgenda.tsx, fmtDayLabel(), startOfWeek()] | lang=en
- "components_callbackagenda_startofweek": "startOfWeek()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L45 | neighbors=[CallbackAgenda.tsx, CallbackAgenda(), addDays(), startOfDay()] | lang=en
- "components_servicepage_servicepage": "ServicePage()" | kind=code-symbol | source=src/components/ServicePage.tsx:L33 | neighbors=[ServicePage.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx, website-laten-maken.tsx] | lang=en

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
