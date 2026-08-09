# Node Description Batch 11 of 40

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f807c8281cf450804bce42b07393edff688e971": "7f807c8 Catch login network errors instead of crashing to the error boundary" | kind=Commit | source=git | neighbors=[3901302 Fix mojibake in admin dashboard…, worktree-replicated-fluttering-whisper, 4b4ebd9 Catch getSession() network erro…, login.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9d0b4772142f7398a571542c71d39cba97403f89": "9d0b477 perf fixes" | kind=Commit | source=git | neighbors=[7dbbf18 perf fixes, main, 4510b3f perf fixes, vite.config.ts]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bc842b80ee3dbb87035733315ca8c748240f96b1": "bc842b8 leads functions" | kind=Commit | source=git | neighbors=[171eb96 leads functions, main, 2b1d78f telegram, sitemap[.]xml.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c91431841e3bb2cda79c964b746be4f73336dbfc": "c914318 ewa" | kind=Commit | source=git | neighbors=[500f718 Merge branch 'main' of https://…, main, worktree-replicated-fluttering-whisper, 4c90153 Merge branch 'main' of https://…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cf5e1212ec15a8789acaa64d5e380fe76b95c72e": "cf5e121 Catch getSession() network errors in the auth route guard" | kind=Commit | source=git | neighbors=[1713634 fixes, main, 8e663f1 fixes, _authenticated.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d2da4c97008ae99fb598665045fea1b89db39a76": "d2da4c9 Log root error boundary crashes to site_errors for visibility" | kind=Commit | source=git | neighbors=[8e663f1 fixes, main, b75b00d fixes, __root.tsx]
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
- "migrations_20260714090000_roles_permissions_module": "20260714090000_roles_permissions_module.sql" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L1 | neighbors=[81a87ed commit, auth.users, public.roles, public.user_custom_roles]
- "routes_meer_diensten_meerdiensten": "MeerDiensten()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L356 | neighbors=[meer-diensten.tsx, build(), buildLeaves(), readMobile()]
- "routes_sitemap_xml": "sitemap[.]xml.tsx" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L1 | neighbors=[bc842b8 leads functions, LASTMOD, Route, SitemapEntry]
- "src_server_applysecurityheaders": "applySecurityHeaders()" | kind=code-symbol | source=src/server.ts:L158 | neighbors=[server.ts, applyAssetCaching(), isHttps(), fetch()]
- "supabase_auth_attacher": "auth-attacher.ts" | kind=code-symbol | source=src/integrations/supabase/auth-attacher.ts:L1 | neighbors=[start.ts, attachSupabaseAuth, client.ts, supabase]
- "supabase_client_server": "client.server.ts" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L1 | neighbors=[createSupabaseAdminClient(), supabaseAdmin, types.ts, Database]
- "supabase_types_database": "Database" | kind=code-symbol | source=src/integrations/supabase/types.ts:L13 | neighbors=[auth-middleware.ts, client.ts, client.server.ts, types.ts]
- "ui_button_button": "Button" | kind=code-symbol | source=src/components/ui/button.tsx:L39 | neighbors=[button.tsx, calendar.tsx, carousel.tsx, sidebar.tsx]
- "ui_input": "input.tsx" | kind=code-symbol | source=src/components/ui/input.tsx:L1 | neighbors=[utils.ts, cn(), Input, sidebar.tsx]
- "ui_radio_group": "radio-group.tsx" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L1 | neighbors=[utils.ts, cn(), RadioGroup, RadioGroupItem]
- "ui_resizable": "resizable.tsx" | kind=code-symbol | source=src/components/ui/resizable.tsx:L1 | neighbors=[utils.ts, cn(), ResizableHandle(), ResizablePanelGroup()]
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L1 | neighbors=[utils.ts, cn(), ScrollArea, ScrollBar]
- "ui_separator": "separator.tsx" | kind=code-symbol | source=src/components/ui/separator.tsx:L1 | neighbors=[utils.ts, cn(), Separator, sidebar.tsx]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L1 | neighbors=[sidebar.tsx, utils.ts, cn(), TooltipContent]

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
