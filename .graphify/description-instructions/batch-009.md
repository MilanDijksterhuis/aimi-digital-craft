# Node Description Batch 10 of 36

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

- "ui_badge": "badge.tsx" | kind=code-symbol | source=src/components/ui/badge.tsx:L1 | neighbors=[utils.ts, cn(), Badge(), BadgeProps, badgeVariants] | lang=en
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=src/components/ui/button.tsx:L7 | neighbors=[ConfirmDialog.tsx, alert-dialog.tsx, button.tsx, calendar.tsx, pagination.tsx] | lang=en
- "ui_label": "label.tsx" | kind=code-symbol | source=src/components/ui/label.tsx:L1 | neighbors=[form.tsx, utils.ts, cn(), Label, labelVariants] | lang=en
- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=src/components/ui/toggle.tsx:L1 | neighbors=[utils.ts, cn(), Toggle, toggleVariants, toggle-group.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3417a43ff60181e153b471af78493fc6a41d84b2": "3417a43 fixes" | kind=Commit | source=git | neighbors=[main, 9c1fa06 perf fixes, portal.functions.ts, 4510b3f perf fixes] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4510b3f526a22eb7d3175788d11ea38ccee4bfee": "4510b3f perf fixes" | kind=Commit | source=git | neighbors=[main, 3417a43 fixes, vite.config.ts, 9d0b477 perf fixes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4b4ebd9957a147bb39dbbbc6eb428552b7a1bb71": "4b4ebd9 Catch getSession() network errors in the auth route guard" | kind=Commit | source=git | neighbors=[worktree-replicated-fluttering-whisper, 6da1e20 Log root error boundary crashes…, _authenticated.tsx, 7f807c8 Catch login network errors inst…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d1e827778ae2a151181acfb4bdb2b189e5ce0e8": "5d1e827 Log server-side (SSR) crashes to site_errors too" | kind=Commit | source=git | neighbors=[main, 2189780 fixes, server.ts, b75b00d fixes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6b2136292b72d0c82416f5451ffc903f601b5761": "6b21362 Catch login network errors instead of crashing to the error boundary" | kind=Commit | source=git | neighbors=[main, 1713634 fixes, login.tsx, f7b9fd5 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6da1e20bfd1f2cb2370175d7b9210012fceb1a05": "6da1e20 Log root error boundary crashes to site_errors for visibility" | kind=Commit | source=git | neighbors=[4b4ebd9 Catch getSession() network erro…, worktree-replicated-fluttering-whisper, dbd0657 Log server-side (SSR) crashes t…, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f807c8281cf450804bce42b07393edff688e971": "7f807c8 Catch login network errors instead of crashing to the error boundary" | kind=Commit | source=git | neighbors=[3901302 Fix mojibake in admin dashboard…, worktree-replicated-fluttering-whisper, 4b4ebd9 Catch getSession() network erro…, login.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9d0b4772142f7398a571542c71d39cba97403f89": "9d0b477 perf fixes" | kind=Commit | source=git | neighbors=[7dbbf18 perf fixes, main, 4510b3f perf fixes, vite.config.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c91431841e3bb2cda79c964b746be4f73336dbfc": "c914318 ewa" | kind=Commit | source=git | neighbors=[500f718 Merge branch 'main' of https://…, main, worktree-replicated-fluttering-whisper, 4c90153 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cf5e1212ec15a8789acaa64d5e380fe76b95c72e": "cf5e121 Catch getSession() network errors in the auth route guard" | kind=Commit | source=git | neighbors=[1713634 fixes, main, 8e663f1 fixes, _authenticated.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d2da4c97008ae99fb598665045fea1b89db39a76": "d2da4c9 Log root error boundary crashes to site_errors for visibility" | kind=Commit | source=git | neighbors=[8e663f1 fixes, main, b75b00d fixes, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dbd0657ea193395ad36e71a78cfe0b953fc87956": "dbd0657 Log server-side (SSR) crashes to site_errors too" | kind=Commit | source=git | neighbors=[6da1e20 Log root error boundary crashes…, worktree-replicated-fluttering-whisper, 99bd8ac Surface site_errors in the acco…, server.ts] | lang=en
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L3 | neighbors=[Footer.tsx, algemene-voorwaarden.tsx, index.tsx, privacybeleid.tsx] | lang=en
- "lib_project_status_project_priority_color": "PROJECT_PRIORITY_COLOR" | kind=code-symbol | source=src/lib/project-status.ts:L52 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_project_status_project_priority_label": "PROJECT_PRIORITY_LABEL" | kind=code-symbol | source=src/lib/project-status.ts:L38 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.projecten.$projectId.tsx, project-status.ts] | lang=en
- "lib_rate_limit_checkratelimit": "checkRateLimit()" | kind=code-symbol | source=src/lib/rate-limit.ts:L11 | neighbors=[rate-limit.ts, site-error.ts, site-ping.ts, server.ts] | lang=en
- "lib_rbac_can": "can()" | kind=code-symbol | source=src/lib/rbac.ts:L70 | neighbors=[use-permissions.tsx, permissions.server.ts, rbac.ts, admin.functions.ts] | lang=en
- "lib_rbac_permissionaction": "PermissionAction" | kind=code-symbol | source=src/lib/rbac.ts:L127 | neighbors=[use-permissions.tsx, permissions.server.ts, rbac.ts, admin.functions.ts] | lang=en
- "lib_status_category_label": "CATEGORY_LABEL" | kind=code-symbol | source=src/lib/status.ts:L58 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, portal.tsx, status.ts] | lang=en
- "lib_status_iscategoryfree": "isCategoryFree()" | kind=code-symbol | source=src/lib/status.ts:L75 | neighbors=[portal.tsx, portal.functions.ts, status.ts, priceForChange()] | lang=en
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_profiles": "public.profiles" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L15 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, profiles_touch, public.handle_new_user(), auth.users] | lang=en
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017": "20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L1 | neighbors=[public.client_contacts, public.login_events, public.site_errors, public.site_pings] | lang=en
- "migrations_20260524095411_23164716_fa8a_4889_832b_f72b78c962ad": "20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql" | kind=code-symbol | source=supabase/migrations/20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql:L1 | neighbors=[28e88cb Changes, fcbe345 Admin sidebar en panels aangepa…, public.extra_change_requests, public.password_reset_requests] | lang=en
- "migrations_20260713130000_project_expansion_phase2_public_project_task_time_entries": "public.project_task_time_entries" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L42 | neighbors=[20260713130000_project_expansion_phase2…, auth.users, public.project_tasks, public.projects] | lang=en
- "migrations_20260714090000_roles_permissions_module": "20260714090000_roles_permissions_module.sql" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L1 | neighbors=[81a87ed commit, auth.users, public.roles, public.user_custom_roles] | lang=en
- "supabase_auth_attacher": "auth-attacher.ts" | kind=code-symbol | source=src/integrations/supabase/auth-attacher.ts:L1 | neighbors=[start.ts, attachSupabaseAuth, client.ts, supabase] | lang=en
- "supabase_client_server": "client.server.ts" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L1 | neighbors=[createSupabaseAdminClient(), supabaseAdmin, types.ts, Database] | lang=en
- "supabase_types_database": "Database" | kind=code-symbol | source=src/integrations/supabase/types.ts:L13 | neighbors=[auth-middleware.ts, client.ts, client.server.ts, types.ts] | lang=en
- "ui_button_button": "Button" | kind=code-symbol | source=src/components/ui/button.tsx:L39 | neighbors=[button.tsx, calendar.tsx, carousel.tsx, sidebar.tsx] | lang=en
- "ui_input": "input.tsx" | kind=code-symbol | source=src/components/ui/input.tsx:L1 | neighbors=[utils.ts, cn(), Input, sidebar.tsx] | lang=en
- "ui_radio_group": "radio-group.tsx" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L1 | neighbors=[utils.ts, cn(), RadioGroup, RadioGroupItem] | lang=en
- "ui_resizable": "resizable.tsx" | kind=code-symbol | source=src/components/ui/resizable.tsx:L1 | neighbors=[utils.ts, cn(), ResizableHandle(), ResizablePanelGroup()] | lang=en
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L1 | neighbors=[utils.ts, cn(), ScrollArea, ScrollBar] | lang=en
- "ui_separator": "separator.tsx" | kind=code-symbol | source=src/components/ui/separator.tsx:L1 | neighbors=[utils.ts, cn(), Separator, sidebar.tsx] | lang=en
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L1 | neighbors=[sidebar.tsx, utils.ts, cn(), TooltipContent] | lang=en
- "authenticated_portal_changecard": "ChangeCard()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L838 | neighbors=[portal.tsx, mapStatus(), stepIndex()] | lang=en

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
