# Node Description Batch 19 of 57

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

- "migrations_20260917091000_post_links": "20260917091000_post_links.sql" | kind=code-symbol | source=supabase/migrations/20260917091000_post_links.sql:L1 | neighbors=[1727351 blog, public.blog_posts, public.post_links]
- "migrations_20260917092000_redirects": "20260917092000_redirects.sql" | kind=code-symbol | source=supabase/migrations/20260917092000_redirects.sql:L1 | neighbors=[1727351 blog, auth.users, public.redirects]
- "migrations_20260917120000_blog_batch2_new_posts_scheduled": "20260917120000_blog_batch2_new_posts_scheduled.sql" | kind=code-symbol | source=supabase/migrations/20260917120000_blog_batch2_new_posts_scheduled.sql:L1 | neighbors=[1727351 blog, 4a960c6 SEO, f80d1a3 blur]
- "routes_b03bb73bce86422c6a74b3cfc829f2dd_txt": "b03bb73bce86422c6a74b3cfc829f2dd[.]txt.tsx" | kind=code-symbol | source=src/routes/b03bb73bce86422c6a74b3cfc829f2dd[.]txt.tsx:L1 | neighbors=[d38d9ab Add IndexNow key route, seo.ts, Route]
- "routes_llms_txt": "llms[.]txt.tsx" | kind=code-symbol | source=src/routes/llms[.]txt.tsx:L1 | neighbors=[Route, client.ts, supabase]
- "routes_meer_diensten_buildleaves": "buildLeaves()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L279 | neighbors=[meer-diensten.tsx, rng(), MeerDiensten()]
- "routes_website_checker_websitecheckerpage": "WebsiteCheckerPage()" | kind=code-symbol | source=src/routes/website-checker.tsx:L146 | neighbors=[website-checker.tsx, isLikelyValidUrl(), usePrefersReducedMotion()]
- "scripts_publish_scheduled_posts_main": "main()" | kind=code-symbol | source=scripts/publish-scheduled-posts.js:L53 | neighbors=[publish-scheduled-posts.js, loadEnv(), log()]
- "src_server_applyratelimit": "applyRateLimit()" | kind=code-symbol | source=src/server.ts:L294 | neighbors=[server.ts, rateLimitedResponse(), fetch()]
- "src_server_brandederrorresponse": "brandedErrorResponse()" | kind=code-symbol | source=src/server.ts:L50 | neighbors=[server.ts, fetch(), normalizeCatastrophicSsrResponse()]
- "src_server_compressstaticasset": "compressStaticAsset()" | kind=code-symbol | source=src/server.ts:L207 | neighbors=[server.ts, pickEncoding(), fetch()]
- "src_server_logservercrash": "logServerCrash()" | kind=code-symbol | source=src/server.ts:L17 | neighbors=[server.ts, fetch(), normalizeCatastrophicSsrResponse()]
- "src_server_resolveredirect": "resolveRedirect()" | kind=code-symbol | source=src/server.ts:L429 | neighbors=[server.ts, fetch(), getRedirectMap()]
- "telegram_webhook": "webhook.ts" | kind=code-symbol | source=src/routes/api/telegram/webhook.ts:L1 | neighbors=[2b1d78f telegram, routeTree.gen.ts, Route]
- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=src/components/ui/checkbox.tsx:L1 | neighbors=[utils.ts, cn(), Checkbox]
- "ui_dialog_dialogcontent": "DialogContent" | kind=code-symbol | source=src/components/ui/dialog.tsx:L32 | neighbors=[BulkScheduleDialog.tsx, command.tsx, dialog.tsx]
- "ui_hover_card": "hover-card.tsx" | kind=code-symbol | source=src/components/ui/hover-card.tsx:L1 | neighbors=[utils.ts, cn(), HoverCardContent]
- "ui_popover": "popover.tsx" | kind=code-symbol | source=src/components/ui/popover.tsx:L1 | neighbors=[utils.ts, cn(), PopoverContent]
- "ui_progress": "progress.tsx" | kind=code-symbol | source=src/components/ui/progress.tsx:L1 | neighbors=[utils.ts, cn(), Progress]
- "ui_slider": "slider.tsx" | kind=code-symbol | source=src/components/ui/slider.tsx:L1 | neighbors=[utils.ts, cn(), Slider]
- "ui_sonner": "sonner.tsx" | kind=code-symbol | source=src/components/ui/sonner.tsx:L1 | neighbors=[__root.tsx, Toaster(), ToasterProps]
- "ui_switch": "switch.tsx" | kind=code-symbol | source=src/components/ui/switch.tsx:L1 | neighbors=[utils.ts, cn(), Switch]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=src/components/ui/textarea.tsx:L1 | neighbors=[utils.ts, cn(), Textarea]
- "authenticated_account_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/account.tsx:L7 | neighbors=[account.tsx, routeTree.gen.ts]
- "authenticated_admin_accounts_accountslistsection": "AccountsListSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L264 | neighbors=[admin.accounts.tsx, accountStatus()]
- "authenticated_admin_accounts_accountstatus": "accountStatus()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L39 | neighbors=[admin.accounts.tsx, AccountsListSection()]
- "authenticated_admin_accounts_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L17 | neighbors=[admin.accounts.tsx, routeTree.gen.ts]
- "authenticated_admin_blog_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.blog.tsx:L33 | neighbors=[admin.blog.tsx, routeTree.gen.ts]
- "authenticated_admin_changes_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L12 | neighbors=[admin.changes.tsx, routeTree.gen.ts]
- "authenticated_admin_projecten_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L41 | neighbors=[admin.projecten.tsx, routeTree.gen.ts]
- "authenticated_admin_rollen_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L20 | neighbors=[admin.rollen.tsx, routeTree.gen.ts]
- "authenticated_admin_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L87 | neighbors=[admin.tsx, routeTree.gen.ts]
- "authenticated_portal_matchesfilter": "matchesFilter()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L106 | neighbors=[portal.tsx, mapStatus()]
- "authenticated_portal_projecten_projectid_monitoringsection": "MonitoringSection()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L80 | neighbors=[portal.projecten.$projectId.tsx, timeAgo()]
- "authenticated_portal_projecten_projectid_timeago": "timeAgo()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L27 | neighbors=[portal.projecten.$projectId.tsx, MonitoringSection()]
- "authenticated_portal_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L58 | neighbors=[portal.tsx, routeTree.gen.ts]
- "authenticated_portal_stepper": "Stepper()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L822 | neighbors=[portal.tsx, stepIndex()]
- "authenticated_server_formatserverage": "formatServerAge()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L131 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_formatssldate": "formatSslDate()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L123 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_formatuptime": "formatUptime()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L37 | neighbors=[server.tsx, ServerPage()]

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
