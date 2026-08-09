# Node Description Batch 11 of 41

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

- "src_server_normalizecatastrophicssrresponse": "normalizeCatastrophicSsrResponse()" | kind=code-symbol | source=src/server.ts:L75 | neighbors=[server.ts, fetch(), brandedErrorResponse(), isCatastrophicSsrErrorBody(), logServerCrash()]
- "supabase_telegram_migration_profiles": "profiles" | kind=code-symbol | source=supabase-telegram-migration.sql:L32 | neighbors=[supabase-telegram-migration.sql, telegram_notification_recipients, telegram_link_tokens, telegram_mfa_codes, telegram_pending_logins]
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=src/components/ui/accordion.tsx:L1 | neighbors=[utils.ts, cn(), AccordionContent, AccordionItem, AccordionTrigger]
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L91 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, alert-dialog.tsx]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=src/components/ui/avatar.tsx:L1 | neighbors=[utils.ts, cn(), Avatar, AvatarFallback, AvatarImage]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=src/components/ui/badge.tsx:L1 | neighbors=[utils.ts, cn(), Badge(), BadgeProps, badgeVariants]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=src/components/ui/button.tsx:L7 | neighbors=[ConfirmDialog.tsx, alert-dialog.tsx, button.tsx, calendar.tsx, pagination.tsx]
- "ui_label": "label.tsx" | kind=code-symbol | source=src/components/ui/label.tsx:L1 | neighbors=[form.tsx, utils.ts, cn(), Label, labelVariants]
- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=src/components/ui/toggle.tsx:L1 | neighbors=[utils.ts, cn(), Toggle, toggleVariants, toggle-group.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@02d6137f7e4b510a668e8625960354a18605578e": "02d6137 fixes" | kind=Commit | source=git | neighbors=[main, seo-verbetering, f2eb4fe Fix root cause: catch Supabase …, bbc9d80 Surface site_errors in the acco…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@17136346d2b074323d3dbbdd47e39843b9542f69": "1713634 fixes" | kind=Commit | source=git | neighbors=[main, seo-verbetering, cf5e121 Catch getSession() network erro…, 6b21362 Catch login network errors inst…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@171eb96adc82ad89ea816bd635fab71a8bbc3e0e": "171eb96 leads functions" | kind=Commit | source=git | neighbors=[main, seo-verbetering, bc842b8 leads functions, 85a6666 SEO en robot]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@21897802de523635124450d5d6d9171ea89caaca": "2189780 fixes" | kind=Commit | source=git | neighbors=[main, seo-verbetering, bbc9d80 Surface site_errors in the acco…, 5d1e827 Log server-side (SSR) crashes t…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4b4ebd9957a147bb39dbbbc6eb428552b7a1bb71": "4b4ebd9 Catch getSession() network errors in the auth route guard" | kind=Commit | source=git | neighbors=[worktree-replicated-fluttering-whisper, 6da1e20 Log root error boundary crashes…, _authenticated.tsx, 7f807c8 Catch login network errors inst…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6da1e20bfd1f2cb2370175d7b9210012fceb1a05": "6da1e20 Log root error boundary crashes to site_errors for visibility" | kind=Commit | source=git | neighbors=[4b4ebd9 Catch getSession() network erro…, worktree-replicated-fluttering-whisper, dbd0657 Log server-side (SSR) crashes t…, __root.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f807c8281cf450804bce42b07393edff688e971": "7f807c8 Catch login network errors instead of crashing to the error boundary" | kind=Commit | source=git | neighbors=[3901302 Fix mojibake in admin dashboard…, worktree-replicated-fluttering-whisper, 4b4ebd9 Catch getSession() network erro…, login.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8e663f1fb8f305df3e159fb27cfb8773e7b58adc": "8e663f1 fixes" | kind=Commit | source=git | neighbors=[main, seo-verbetering, d2da4c9 Log root error boundary crashes…, cf5e121 Catch getSession() network erro…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9c1fa0674c96765d2d6ee5f3d42b0024f5e29034": "9c1fa06 perf fixes" | kind=Commit | source=git | neighbors=[3417a43 fixes, main, seo-verbetering, 74ecdc1 code fixes]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b75b00da213fa0ede37fa8482e1f43dc4a6a9b04": "b75b00d fixes" | kind=Commit | source=git | neighbors=[main, seo-verbetering, 5d1e827 Log server-side (SSR) crashes t…, d2da4c9 Log root error boundary crashes…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c27ffd9d2912cb3ef331a0a5e858cd6ea4c0c764": "c27ffd9 fixes" | kind=Commit | source=git | neighbors=[main, seo-verbetering, a3773ee sec fixes, f2eb4fe Fix root cause: catch Supabase …]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dbd0657ea193395ad36e71a78cfe0b953fc87956": "dbd0657 Log server-side (SSR) crashes to site_errors too" | kind=Commit | source=git | neighbors=[6da1e20 Log root error boundary crashes…, worktree-replicated-fluttering-whisper, 99bd8ac Surface site_errors in the acco…, server.ts]
- "components_callbackagenda_callbackagenda": "CallbackAgenda()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L62 | neighbors=[admin.leads.tsx, CallbackAgenda.tsx, fmtDayLabel(), startOfWeek()]
- "components_callbackagenda_startofweek": "startOfWeek()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L45 | neighbors=[CallbackAgenda.tsx, CallbackAgenda(), addDays(), startOfDay()]
- "design_handoff_meer_diensten_support_getreact": "getReact()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L9 | neighbors=[support.js, boot(), createComponentFactory(), evalDcLogic()]
- "design_handoff_meer_diensten_support_loadreactumd": "loadReactUmd()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1838 | neighbors=[support.js, cdnScriptFor(), loadScript(), resolve()]
- "design_handoff_meer_diensten_support_rootnamefordocument": "rootNameForDocument()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L133 | neighbors=[support.js, boot(), dcNameFromPath(), safeDecode()]
- "design_handoff_meer_diensten_support_walkfor": "walkFor()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L611 | neighbors=[support.js, walk(), compileAttr(), walkChildren()]
- "design_handoff_meer_diensten_support_walkif": "walkIf()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L646 | neighbors=[support.js, walk(), compileAttr(), walkChildren()]
- "lib_project_status_project_priority_color": "PROJECT_PRIORITY_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L52 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_project_status_project_priority_label": "PROJECT_PRIORITY_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L38 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_rate_limit_checkratelimit": "checkRateLimit()" | kind=code-symbol | source=src/lib/rate-limit.ts:L11 | neighbors=[rate-limit.ts, site-error.ts, site-ping.ts, server.ts]
- "lib_rbac_can": "can()" | kind=code-symbol | source=src/lib/rbac.ts:L70 | neighbors=[use-permissions.tsx, permissions.server.ts, rbac.ts, admin.functions.ts]
- "lib_rbac_permissionaction": "PermissionAction" | kind=code-symbol | source=src/lib/rbac.ts:L127 | neighbors=[use-permissions.tsx, permissions.server.ts, rbac.ts, admin.functions.ts]
- "lib_status_category_label": "CATEGORY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L58 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, portal.tsx, status.ts]
- "lib_status_iscategoryfree": "isCategoryFree()" | kind=code-symbol | source=src/lib/status.ts:L75 | neighbors=[portal.tsx, portal.functions.ts, status.ts, priceForChange()]
- "lib_telegram_server_sendtelegrammessage": "sendTelegramMessage()" | kind=code-symbol | source=src/lib/telegram.server.ts:L44 | neighbors=[telegram.server.ts, generateAndSendMfaCode(), safeSend(), botToken()]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_profiles": "public.profiles" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L15 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, profiles_touch, public.handle_new_user(), auth.users]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017": "20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L1 | neighbors=[public.client_contacts, public.login_events, public.site_errors, public.site_pings]
- "migrations_20260524095411_23164716_fa8a_4889_832b_f72b78c962ad": "20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql" | kind=code-symbol | source=supabase/migrations/20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql:L1 | neighbors=[28e88cb Changes, fcbe345 Admin sidebar en panels aangepa…, public.extra_change_requests, public.password_reset_requests]
- "migrations_20260713130000_project_expansion_phase2_public_project_task_time_entries": "public.project_task_time_entries" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L42 | neighbors=[20260713130000_project_expansion_phase2…, auth.users, public.project_tasks, public.projects]

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
