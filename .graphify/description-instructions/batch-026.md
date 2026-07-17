# Node Description Batch 27 of 34

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

- "migrations_20260524095411_23164716_fa8a_4889_832b_f72b78c962ad_public_password_reset_requests": "public.password_reset_requests" | kind=code-symbol | source=supabase/migrations/20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql:L6 | neighbors=[20260524095411_23164716-fa8a-4889-832b-…]
- "migrations_20260524100732_01aa016d_d09a_439e_a7a9_6f5f2c3138e0_public_is_super_admin": "public.is_super_admin()" | kind=code-symbol | source=supabase/migrations/20260524100732_01aa016d-d09a-439e-a7a9-6f5f2c3138e0.sql:L14 | neighbors=[20260524100732_01aa016d-d09a-439e-a7a9-…]
- "migrations_20260524104213_c69cd657_d923_41b6_a4eb_02eef1c9606c_public_admin_notifications": "public.admin_notifications" | kind=code-symbol | source=supabase/migrations/20260524104213_c69cd657-d923-41b6-a4eb-02eef1c9606c.sql:L41 | neighbors=[20260524104213_c69cd657-d923-41b6-a4eb-…]
- "migrations_20260713120000_project_detail_expansion": "20260713120000_project_detail_expansion.sql" | kind=code-symbol | source=supabase/migrations/20260713120000_project_detail_expansion.sql:L1 | neighbors=[7f7208a new]
- "migrations_20260714100000_role_permissions_seed": "20260714100000_role_permissions_seed.sql" | kind=code-symbol | source=supabase/migrations/20260714100000_role_permissions_seed.sql:L1 | neighbors=[81a87ed commit]
- "migrations_20260714110000_customer_onboarding_flow": "20260714110000_customer_onboarding_flow.sql" | kind=code-symbol | source=supabase/migrations/20260714110000_customer_onboarding_flow.sql:L1 | neighbors=[2fcc9a3 fixes]
- "migrations_20260714120000_customer_self_onboarding_toggle": "20260714120000_customer_self_onboarding_toggle.sql" | kind=code-symbol | source=supabase/migrations/20260714120000_customer_self_onboarding_toggle.sql:L1 | neighbors=[2fcc9a3 fixes]
- "migrations_20260716090000_customer_portal_tutorial_toggle": "20260716090000_customer_portal_tutorial_toggle.sql" | kind=code-symbol | source=supabase/migrations/20260716090000_customer_portal_tutorial_toggle.sql:L1 | neighbors=[ee6f2e6 fixes]
- "public_site_error_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L6 | neighbors=[site-error.ts]
- "public_site_error_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L12 | neighbors=[site-error.ts]
- "public_site_ping_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L6 | neighbors=[site-ping.ts]
- "public_site_ping_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L12 | neighbors=[site-ping.ts]
- "routes_algemene_voorwaarden_voorwaardenpage": "VoorwaardenPage()" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L15 | neighbors=[algemene-voorwaarden.tsx]
- "routes_authenticated_accountmenu": "AccountMenu()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L143 | neighbors=[_authenticated.tsx]
- "routes_authenticated_authlayout": "AuthLayout()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L33 | neighbors=[_authenticated.tsx]
- "routes_authenticated_inner": "Inner()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L41 | neighbors=[_authenticated.tsx]
- "routes_index_index": "Index()" | kind=code-symbol | source=src/routes/index.tsx:L75 | neighbors=[index.tsx]
- "routes_login_loginpage": "LoginPage()" | kind=code-symbol | source=src/routes/login.tsx:L16 | neighbors=[login.tsx]
- "routes_privacybeleid_privacypage": "PrivacyPage()" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L15 | neighbors=[privacybeleid.tsx]
- "routes_root_errorcomponent": "ErrorComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L39 | neighbors=[__root.tsx]
- "routes_root_notfoundcomponent": "NotFoundComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L17 | neighbors=[__root.tsx]
- "routes_root_rootcomponent": "RootComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L162 | neighbors=[__root.tsx]
- "routes_root_rootshell": "RootShell()" | kind=code-symbol | source=src/routes/__root.tsx:L148 | neighbors=[__root.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-026.json

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
