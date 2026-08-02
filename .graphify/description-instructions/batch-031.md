# Node Description Batch 32 of 38

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

- "src_routetree_gen_authenticatedadminprojectenroutewithchildren": "AuthenticatedAdminProjectenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L649 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroleidroute": "AuthenticatedAdminRollenRoleIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L173 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroute": "AuthenticatedAdminRollenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L126 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutechildren": "AuthenticatedAdminRollenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L654 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutewithchildren": "AuthenticatedAdminRollenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L663 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroute": "AuthenticatedAdminRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L101 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutechildren": "AuthenticatedAdminRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L668 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutewithchildren": "AuthenticatedAdminRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L687 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalprojectenprojectidroute": "AuthenticatedPortalProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L167 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroute": "AuthenticatedPortalRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L96 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutechildren": "AuthenticatedPortalRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L690 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutewithchildren": "AuthenticatedPortalRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L699 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroute": "AuthenticatedRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L82 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutechildren": "AuthenticatedRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L702 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutewithchildren": "AuthenticatedRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L716 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedserverroute": "AuthenticatedServerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L91 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_faqroute": "FaqRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L72 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyfullpath": "FileRoutesByFullPath" | kind=code-symbol | source=src/routeTree.gen.ts:L198 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyid": "FileRoutesById" | kind=code-symbol | source=src/routeTree.gen.ts:L258 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbypath": "FileRoutesByPath" | kind=code-symbol | source=src/routeTree.gen.ts:L402 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyto": "FileRoutesByTo" | kind=code-symbol | source=src/routeTree.gen.ts:L228 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutetypes": "FileRouteTypes" | kind=code-symbol | source=src/routeTree.gen.ts:L290 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_indexroute": "IndexRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L86 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_loginroute": "LoginRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L67 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_meerdienstenroute": "MeerDienstenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L62 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_overonsroute": "OverOnsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L57 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_privacybeleidroute": "PrivacybeleidRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L52 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_register": "Register" | kind=code-symbol | source=src/routeTree.gen.ts:L743 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_rootroutechildren": "RootRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L384 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_routetree": "routeTree" | kind=code-symbol | source=src/routeTree.gen.ts:L736 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_sitemapdotxmlroute": "SitemapDotxmlRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L47 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_trackdotjsroute": "TrackDotjsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L42 | neighbors=[routeTree.gen.ts]
- "src_server_security_headers": "SECURITY_HEADERS" | kind=code-symbol | source=src/server.ts:L103 | neighbors=[server.ts]
- "src_server_serverentry": "ServerEntry" | kind=code-symbol | source=src/server.ts:L26 | neighbors=[server.ts]
- "src_start_errormiddleware": "errorMiddleware" | kind=code-symbol | source=src/start.ts:L6 | neighbors=[start.ts]
- "supabase_client_createsupabaseclient": "createSupabaseClient()" | kind=code-symbol | source=src/integrations/supabase/client.ts:L5 | neighbors=[client.ts]
- "supabase_client_server_createsupabaseadminclient": "createSupabaseAdminClient()" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L8 | neighbors=[client.server.ts]
- "supabase_client_server_supabaseadmin": "supabaseAdmin" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L36 | neighbors=[client.server.ts]
- "supabase_migration_dns_checks": "dns_checks" | kind=code-symbol | source=supabase-migration.sql:L32 | neighbors=[supabase-migration.sql]
- "supabase_migration_monitoring_alerts": "monitoring_alerts" | kind=code-symbol | source=supabase-migration.sql:L42 | neighbors=[supabase-migration.sql]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-031.json

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
