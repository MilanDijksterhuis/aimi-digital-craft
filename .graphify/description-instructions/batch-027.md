# Node Description Batch 28 of 35

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

- "migrations_20260717140000_sec4_own_projects_primary_user": "20260717140000_sec4_own_projects_primary_user.sql" | kind=code-symbol | source=supabase/migrations/20260717140000_sec4_own_projects_primary_user.sql:L1 | neighbors=[a3773ee sec fixes]
- "migrations_20260717150000_sec5_durable_rate_limit_public_is_ip_banned": "public.is_ip_banned()" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L68 | neighbors=[20260717150000_sec5_durable_rate_limit.…]
- "migrations_20260717160000_perf1_indexes": "20260717160000_perf1_indexes.sql" | kind=code-symbol | source=supabase/migrations/20260717160000_perf1_indexes.sql:L1 | neighbors=[7dbbf18 perf fixes]
- "migrations_20260717170000_perf2_site_ping_counts_public_site_ping_counts": "public.site_ping_counts()" | kind=code-symbol | source=supabase/migrations/20260717170000_perf2_site_ping_counts.sql:L14 | neighbors=[20260717170000_perf2_site_ping_counts.s…]
- "migrations_20260717180000_perf3_project_last_activity_public_project_last_activity": "public.project_last_activity()" | kind=code-symbol | source=supabase/migrations/20260717180000_perf3_project_last_activity.sql:L9 | neighbors=[20260717180000_perf3_project_last_activ…]
- "public_site_error_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L6 | neighbors=[site-error.ts]
- "public_site_error_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L12 | neighbors=[site-error.ts]
- "public_site_ping_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L6 | neighbors=[site-ping.ts]
- "public_site_ping_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L12 | neighbors=[site-ping.ts]
- "routes_algemene_voorwaarden_voorwaardenpage": "VoorwaardenPage()" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L15 | neighbors=[algemene-voorwaarden.tsx]
- "routes_authenticated_accountmenu": "AccountMenu()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L126 | neighbors=[_authenticated.tsx]
- "routes_authenticated_authlayout": "AuthLayout()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L34 | neighbors=[_authenticated.tsx]
- "routes_authenticated_inner": "Inner()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L42 | neighbors=[_authenticated.tsx]
- "routes_index_index": "Index()" | kind=code-symbol | source=src/routes/index.tsx:L75 | neighbors=[index.tsx]
- "routes_login_loginpage": "LoginPage()" | kind=code-symbol | source=src/routes/login.tsx:L16 | neighbors=[login.tsx]
- "routes_privacybeleid_privacypage": "PrivacyPage()" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L15 | neighbors=[privacybeleid.tsx]
- "routes_root_errorcomponent": "ErrorComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L40 | neighbors=[__root.tsx]
- "routes_root_notfoundcomponent": "NotFoundComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L18 | neighbors=[__root.tsx]
- "routes_root_rootcomponent": "RootComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L163 | neighbors=[__root.tsx]
- "routes_root_rootshell": "RootShell()" | kind=code-symbol | source=src/routes/__root.tsx:L149 | neighbors=[__root.tsx]
- "routes_sitemap_xml_route": "Route" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L12 | neighbors=[sitemap[.]xml.tsx]
- "routes_sitemap_xml_sitemapentry": "SitemapEntry" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L6 | neighbors=[sitemap[.]xml.tsx]
- "routes_track_js_cors": "cors" | kind=code-symbol | source=src/routes/track[.]js.tsx:L3 | neighbors=[track[.]js.tsx]
- "routes_track_js_route": "Route" | kind=code-symbol | source=src/routes/track[.]js.tsx:L11 | neighbors=[track[.]js.tsx]
- "src_routetree_gen_algemenevoorwaardenroute": "AlgemeneVoorwaardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L56 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublichooksexpireaccountsroute": "ApiPublicHooksExpireAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L124 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsiteerrorroute": "ApiPublicSiteErrorRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L95 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsitepingroute": "ApiPublicSitePingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L90 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedaccountroute": "AuthenticatedAccountRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L85 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsaccountidroute": "AuthenticatedAdminAccountsAccountIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L154 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroute": "AuthenticatedAdminAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L118 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutechildren": "AuthenticatedAdminAccountsRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L490 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutewithchildren": "AuthenticatedAdminAccountsRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L500 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangeschangeidroute": "AuthenticatedAdminChangesChangeIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L148 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroute": "AuthenticatedAdminChangesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L112 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutechildren": "AuthenticatedAdminChangesRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L505 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutewithchildren": "AuthenticatedAdminChangesRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L515 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenprojectidroute": "AuthenticatedAdminProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L142 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroute": "AuthenticatedAdminProjectenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L106 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutechildren": "AuthenticatedAdminProjectenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L520 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-027.json

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
