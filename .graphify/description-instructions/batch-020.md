# Node Description Batch 21 of 50

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

- "migrations_20260714090000_roles_permissions_module_public_roles": "public.roles" | kind=code-symbol | source=supabase/migrations/20260714090000_roles_permissions_module.sql:L9 | neighbors=[20260714090000_roles_permissions_module…, public.user_custom_roles]
- "migrations_20260717150000_sec5_durable_rate_limit_public_rate_limit_bans": "public.rate_limit_bans" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L20 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.record_strike()]
- "migrations_20260717150000_sec5_durable_rate_limit_public_rate_limit_hits": "public.rate_limit_hits" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L13 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.check_rate_limit()]
- "migrations_20260717150000_sec5_durable_rate_limit_v_count": "v_count" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L57 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.check_rate_limit()]
- "migrations_20260717150000_sec5_durable_rate_limit_v_strikes": "v_strikes" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L103 | neighbors=[20260717150000_sec5_durable_rate_limit.…, public.record_strike()]
- "migrations_20260717170000_perf2_site_ping_counts": "20260717170000_perf2_site_ping_counts.sql" | kind=code-symbol | source=supabase/migrations/20260717170000_perf2_site_ping_counts.sql:L1 | neighbors=[7dbbf18 perf fixes, public.site_ping_counts()]
- "migrations_20260717180000_perf3_project_last_activity": "20260717180000_perf3_project_last_activity.sql" | kind=code-symbol | source=supabase/migrations/20260717180000_perf3_project_last_activity.sql:L1 | neighbors=[7dbbf18 perf fixes, public.project_last_activity()]
- "public_site_error_route": "Route" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L18 | neighbors=[site-error.ts, routeTree.gen.ts]
- "public_site_ping_route": "Route" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L18 | neighbors=[site-ping.ts, routeTree.gen.ts]
- "routes_algemene_voorwaarden_route": "Route" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L5 | neighbors=[algemene-voorwaarden.tsx, routeTree.gen.ts]
- "routes_authenticated_route": "Route" | kind=code-symbol | source=src/routes/_authenticated.tsx:L12 | neighbors=[_authenticated.tsx, routeTree.gen.ts]
- "routes_branches_route": "Route" | kind=code-symbol | source=src/routes/branches.tsx:L71 | neighbors=[branches.tsx, routeTree.gen.ts]
- "routes_contact_route": "Route" | kind=code-symbol | source=src/routes/contact.tsx:L10 | neighbors=[contact.tsx, routeTree.gen.ts]
- "routes_faq_route": "Route" | kind=code-symbol | source=src/routes/faq.tsx:L11 | neighbors=[faq.tsx, routeTree.gen.ts]
- "routes_index_route": "Route" | kind=code-symbol | source=src/routes/index.tsx:L15 | neighbors=[index.tsx, routeTree.gen.ts]
- "routes_login_route": "Route" | kind=code-symbol | source=src/routes/login.tsx:L8 | neighbors=[login.tsx, routeTree.gen.ts]
- "routes_meer_diensten_build": "build()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L126 | neighbors=[meer-diensten.tsx, MeerDiensten()]
- "routes_meer_diensten_fadeup": "fadeUp()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L74 | neighbors=[meer-diensten.tsx, MeerDiensten()]
- "routes_meer_diensten_readmobile": "readMobile()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L352 | neighbors=[meer-diensten.tsx, MeerDiensten()]
- "routes_meer_diensten_rng": "rng()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L107 | neighbors=[meer-diensten.tsx, buildLeaves()]
- "routes_meer_diensten_route": "Route" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L83 | neighbors=[meer-diensten.tsx, routeTree.gen.ts]
- "routes_onderhoud_hosting_route": "Route" | kind=code-symbol | source=src/routes/onderhoud-hosting.tsx:L64 | neighbors=[onderhoud-hosting.tsx, routeTree.gen.ts]
- "routes_over_ons_route": "Route" | kind=code-symbol | source=src/routes/over-ons.tsx:L34 | neighbors=[over-ons.tsx, routeTree.gen.ts]
- "routes_privacybeleid_route": "Route" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L5 | neighbors=[privacybeleid.tsx, routeTree.gen.ts]
- "routes_root_route": "Route" | kind=code-symbol | source=src/routes/__root.tsx:L114 | neighbors=[__root.tsx, routeTree.gen.ts]
- "routes_seo_route": "Route" | kind=code-symbol | source=src/routes/seo.tsx:L119 | neighbors=[seo.tsx, routeTree.gen.ts]
- "routes_tarieven_route": "Route" | kind=code-symbol | source=src/routes/tarieven.tsx:L177 | neighbors=[tarieven.tsx, routeTree.gen.ts]
- "routes_track_js": "track[.]js.tsx" | kind=code-symbol | source=src/routes/track[.]js.tsx:L1 | neighbors=[cors, Route]
- "routes_webdesign_route": "Route" | kind=code-symbol | source=src/routes/webdesign.tsx:L31 | neighbors=[webdesign.tsx, routeTree.gen.ts]
- "routes_webshop_laten_maken_route": "Route" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L77 | neighbors=[webshop-laten-maken.tsx, routeTree.gen.ts]
- "routes_website_checker_getfindings": "getFindings()" | kind=code-symbol | source=src/routes/website-checker.tsx:L136 | neighbors=[website-checker.tsx, ReportCard()]
- "routes_website_checker_islikelyvalidurl": "isLikelyValidUrl()" | kind=code-symbol | source=src/routes/website-checker.tsx:L53 | neighbors=[website-checker.tsx, WebsiteCheckerPage()]
- "routes_website_checker_route": "Route" | kind=code-symbol | source=src/routes/website-checker.tsx:L28 | neighbors=[website-checker.tsx, routeTree.gen.ts]
- "routes_website_checker_scoreverdict": "scoreVerdict()" | kind=code-symbol | source=src/routes/website-checker.tsx:L119 | neighbors=[website-checker.tsx, ReportCard()]
- "routes_website_checker_usecountup": "useCountUp()" | kind=code-symbol | source=src/routes/website-checker.tsx:L78 | neighbors=[website-checker.tsx, ReportCard()]
- "routes_website_checker_useprefersreducedmotion": "usePrefersReducedMotion()" | kind=code-symbol | source=src/routes/website-checker.tsx:L63 | neighbors=[website-checker.tsx, WebsiteCheckerPage()]
- "routes_website_laten_maken_assen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-assen.tsx:L50 | neighbors=[website-laten-maken-assen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_autobedrijf_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-autobedrijf.tsx:L57 | neighbors=[website-laten-maken-autobedrijf.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_autorijschool_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-autorijschool.tsx:L57 | neighbors=[website-laten-maken-autorijschool.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_bloemist_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-bloemist.tsx:L57 | neighbors=[website-laten-maken-bloemist.tsx, routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-020.json

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
