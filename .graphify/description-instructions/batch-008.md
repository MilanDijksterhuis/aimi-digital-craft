# Node Description Batch 9 of 32

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf": "20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L1 | neighbors=[public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message]
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17": "20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L1 | neighbors=[public.audit_log, public.has_any_role(), public.has_role(), public.is_staff(), public.is_super_admin()]
- "routes_login": "login.tsx" | kind=code-symbol | source=src/routes/login.tsx:L1 | neighbors=[LoginPage(), Route, client.ts, supabase, routeTree.gen.ts]
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=src/components/ui/accordion.tsx:L1 | neighbors=[utils.ts, cn(), AccordionContent, AccordionItem, AccordionTrigger]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=src/components/ui/avatar.tsx:L1 | neighbors=[utils.ts, cn(), Avatar, AvatarFallback, AvatarImage]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=src/components/ui/badge.tsx:L1 | neighbors=[utils.ts, cn(), Badge(), BadgeProps, badgeVariants]
- "ui_label": "label.tsx" | kind=code-symbol | source=src/components/ui/label.tsx:L1 | neighbors=[form.tsx, utils.ts, cn(), Label, labelVariants]
- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=src/components/ui/toggle.tsx:L1 | neighbors=[utils.ts, cn(), Toggle, toggleVariants, toggle-group.tsx]
- "vite_config": "vite.config.ts" | kind=code-symbol | source=vite.config.ts:L1 | neighbors=[332d0c8 Fix: externalize googleapis/nod…, 821a216 Update vite.config.ts, b83b044 Revert: verwijder Google OAuth …, f24ecdb Change server preset from 'bun'…, fe58e74 Update vite.config.ts]
- "components_berichtentab": "BerichtenTab.tsx" | kind=code-symbol | source=src/components/BerichtenTab.tsx:L1 | neighbors=[admin.tsx, BerichtenTab(), use-permissions.tsx, usePermissions()]
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L3 | neighbors=[Footer.tsx, algemene-voorwaarden.tsx, index.tsx, privacybeleid.tsx]
- "lib_email_server": "email.server.ts" | kind=code-symbol | source=src/lib/email.server.ts:L1 | neighbors=[5bc9ff0 google authenticatoin, b83b044 Revert: verwijder Google OAuth …, sendWelcomeEmail(), transporter]
- "lib_project_status_project_priority_color": "PROJECT_PRIORITY_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L52 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_project_status_project_priority_label": "PROJECT_PRIORITY_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L38 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts]
- "lib_rate_limit_checkratelimit": "checkRateLimit()" | kind=code-symbol | source=src/lib/rate-limit.ts:L15 | neighbors=[rate-limit.ts, site-error.ts, site-ping.ts, server.ts]
- "lib_status_category_label": "CATEGORY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L58 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, portal.tsx, status.ts]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_profiles": "public.profiles" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L15 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, profiles_touch, public.handle_new_user(), auth.users]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017": "20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L1 | neighbors=[public.client_contacts, public.login_events, public.site_errors, public.site_pings]
- "migrations_20260524095411_23164716_fa8a_4889_832b_f72b78c962ad": "20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql" | kind=code-symbol | source=supabase/migrations/20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql:L1 | neighbors=[28e88cb Changes, fcbe345 Admin sidebar en panels aangepa…, public.extra_change_requests, public.password_reset_requests]
- "migrations_20260713130000_project_expansion_phase2_public_project_task_time_entries": "public.project_task_time_entries" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L42 | neighbors=[20260713130000_project_expansion_phase2…, auth.users, public.project_tasks, public.projects]
- "migrations_20260714090000_roles_permissions_module": "20260714090000_roles_permissions_module.sql" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L1 | neighbors=[81a87ed commit, auth.users, public.roles, public.user_custom_roles]
- "src_server_normalizecatastrophicssrresponse": "normalizeCatastrophicSsrResponse()" | kind=code-symbol | source=src/server.ts:L56 | neighbors=[server.ts, fetch(), brandedErrorResponse(), isCatastrophicSsrErrorBody()]
- "supabase_auth_attacher": "auth-attacher.ts" | kind=code-symbol | source=src/integrations/supabase/auth-attacher.ts:L1 | neighbors=[start.ts, attachSupabaseAuth, client.ts, supabase]
- "supabase_client_server": "client.server.ts" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L1 | neighbors=[createSupabaseAdminClient(), supabaseAdmin, types.ts, Database]
- "supabase_types_database": "Database" | kind=code-symbol | source=src/integrations/supabase/types.ts:L9 | neighbors=[auth-middleware.ts, client.ts, client.server.ts, types.ts]
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L83 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L91 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L28 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L71 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L51 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L46 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogtitle": "AlertDialogTitle" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L59 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, alert-dialog.tsx]
- "ui_button_button": "Button" | kind=code-symbol | source=src/components/ui/button.tsx:L39 | neighbors=[button.tsx, calendar.tsx, carousel.tsx, sidebar.tsx]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=src/components/ui/button.tsx:L7 | neighbors=[alert-dialog.tsx, button.tsx, calendar.tsx, pagination.tsx]
- "ui_input": "input.tsx" | kind=code-symbol | source=src/components/ui/input.tsx:L1 | neighbors=[utils.ts, cn(), Input, sidebar.tsx]
- "ui_radio_group": "radio-group.tsx" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L1 | neighbors=[utils.ts, cn(), RadioGroup, RadioGroupItem]
- "ui_resizable": "resizable.tsx" | kind=code-symbol | source=src/components/ui/resizable.tsx:L1 | neighbors=[utils.ts, cn(), ResizableHandle(), ResizablePanelGroup()]
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L1 | neighbors=[utils.ts, cn(), ScrollArea, ScrollBar]
- "ui_separator": "separator.tsx" | kind=code-symbol | source=src/components/ui/separator.tsx:L1 | neighbors=[utils.ts, cn(), Separator, sidebar.tsx]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L1 | neighbors=[sidebar.tsx, utils.ts, cn(), TooltipContent]

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
