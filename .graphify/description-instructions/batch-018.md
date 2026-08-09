# Node Description Batch 19 of 42

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

- "routes_werkwijze_route": "Route" | kind=code-symbol | source=src/routes/werkwijze.tsx:L44 | neighbors=[werkwijze.tsx, routeTree.gen.ts]
- "scripts_set_telegram_webhook": "set-telegram-webhook.ts" | kind=code-symbol | source=scripts/set-telegram-webhook.ts:L1 | neighbors=[2b1d78f telegram, main()]
- "src_router": "router.tsx" | kind=code-symbol | source=src/router.tsx:L1 | neighbors=[getRouter(), routeTree.gen.ts]
- "src_router_getrouter": "getRouter()" | kind=code-symbol | source=src/router.tsx:L5 | neighbors=[router.tsx, routeTree.gen.ts]
- "src_server_applyassetcaching": "applyAssetCaching()" | kind=code-symbol | source=src/server.ts:L143 | neighbors=[server.ts, applySecurityHeaders()]
- "src_server_getserverentry": "getServerEntry()" | kind=code-symbol | source=src/server.ts:L32 | neighbors=[server.ts, fetch()]
- "src_server_iscatastrophicssrerrorbody": "isCatastrophicSsrErrorBody()" | kind=code-symbol | source=src/server.ts:L48 | neighbors=[server.ts, normalizeCatastrophicSsrResponse()]
- "src_server_ishttps": "isHttps()" | kind=code-symbol | source=src/server.ts:L127 | neighbors=[server.ts, applySecurityHeaders()]
- "src_server_ratelimitedresponse": "rateLimitedResponse()" | kind=code-symbol | source=src/server.ts:L91 | neighbors=[server.ts, applyRateLimit()]
- "src_start_startinstance": "startInstance" | kind=code-symbol | source=src/start.ts:L21 | neighbors=[routeTree.gen.ts, start.ts]
- "supabase_auth_attacher_attachsupabaseauth": "attachSupabaseAuth" | kind=code-symbol | source=src/integrations/supabase/auth-attacher.ts:L7 | neighbors=[start.ts, auth-attacher.ts]
- "supabase_callbacks_migration_lead_callbacks": "lead_callbacks" | kind=code-symbol | source=supabase-callbacks-migration.sql:L10 | neighbors=[supabase-callbacks-migration.sql, leads]
- "supabase_callbacks_migration_leads": "leads" | kind=code-symbol | source=supabase-callbacks-migration.sql:L12 | neighbors=[supabase-callbacks-migration.sql, lead_callbacks]
- "supabase_leads_migration_lead_activities": "lead_activities" | kind=code-symbol | source=supabase-leads-migration.sql:L38 | neighbors=[supabase-leads-migration.sql, leads]
- "supabase_leads_migration_leads": "leads" | kind=code-symbol | source=supabase-leads-migration.sql:L17 | neighbors=[supabase-leads-migration.sql, lead_activities]
- "supabase_telegram_migration_telegram_link_tokens": "telegram_link_tokens" | kind=code-symbol | source=supabase-telegram-migration.sql:L29 | neighbors=[supabase-telegram-migration.sql, profiles]
- "supabase_telegram_migration_telegram_mfa_codes": "telegram_mfa_codes" | kind=code-symbol | source=supabase-telegram-migration.sql:L44 | neighbors=[supabase-telegram-migration.sql, profiles]
- "supabase_telegram_migration_telegram_notification_recipients": "telegram_notification_recipients" | kind=code-symbol | source=supabase-telegram-migration.sql:L77 | neighbors=[supabase-telegram-migration.sql, profiles]
- "supabase_telegram_migration_telegram_pending_logins": "telegram_pending_logins" | kind=code-symbol | source=supabase-telegram-migration.sql:L62 | neighbors=[supabase-telegram-migration.sql, profiles]
- "telegram_webhook_route": "Route" | kind=code-symbol | source=src/routes/api/telegram/webhook.ts:L15 | neighbors=[routeTree.gen.ts, webhook.ts]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=src/components/ui/badge.tsx:L28 | neighbors=[badge.tsx, badgeVariants]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=src/components/ui/badge.tsx:L6 | neighbors=[badge.tsx, Badge()]
- "ui_button_buttonprops": "ButtonProps" | kind=code-symbol | source=src/components/ui/button.tsx:L34 | neighbors=[button.tsx, pagination.tsx]
- "ui_dialog_dialogcontent": "DialogContent" | kind=code-symbol | source=src/components/ui/dialog.tsx:L32 | neighbors=[command.tsx, dialog.tsx]
- "ui_input_input": "Input" | kind=code-symbol | source=src/components/ui/input.tsx:L5 | neighbors=[input.tsx, sidebar.tsx]
- "ui_label_label": "Label" | kind=code-symbol | source=src/components/ui/label.tsx:L13 | neighbors=[form.tsx, label.tsx]
- "ui_separator_separator": "Separator" | kind=code-symbol | source=src/components/ui/separator.tsx:L6 | neighbors=[separator.tsx, sidebar.tsx]
- "ui_sheet_sheetcontent": "SheetContent" | kind=code-symbol | source=src/components/ui/sheet.tsx:L57 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetdescription": "SheetDescription" | kind=code-symbol | source=src/components/ui/sheet.tsx:L99 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L74 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheettitle": "SheetTitle" | kind=code-symbol | source=src/components/ui/sheet.tsx:L87 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sonner_toaster": "Toaster()" | kind=code-symbol | source=src/components/ui/sonner.tsx:L5 | neighbors=[__root.tsx, sonner.tsx]
- "ui_toggle_togglevariants": "toggleVariants" | kind=code-symbol | source=src/components/ui/toggle.tsx:L7 | neighbors=[toggle.tsx, toggle-group.tsx]
- "ui_tooltip_tooltipcontent": "TooltipContent" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L14 | neighbors=[sidebar.tsx, tooltip.tsx]
- "authenticated_account_accountpage": "AccountPage()" | kind=code-symbol | source=src/routes/_authenticated/account.tsx:L12 | neighbors=[account.tsx]
- "authenticated_admin_aanvragentab": "AanvragenTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L454 | neighbors=[admin.tsx]
- "authenticated_admin_accounts_account_status_color": "ACCOUNT_STATUS_COLOR" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L50 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_account_status_label": "ACCOUNT_STATUS_LABEL" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L45 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_accountid_accountdetail": "AccountDetail()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L106 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_accountheader": "AccountHeader()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L229 | neighbors=[admin.accounts.$accountId.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-018.json

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
