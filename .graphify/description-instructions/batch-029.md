# Node Description Batch 30 of 36

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

- "src_routetree_gen_authenticatedroutewithchildren": "AuthenticatedRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L614 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedserverroute": "AuthenticatedServerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L71 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyfullpath": "FileRoutesByFullPath" | kind=code-symbol | source=src/routeTree.gen.ts:L167 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyid": "FileRoutesById" | kind=code-symbol | source=src/routeTree.gen.ts:L217 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbypath": "FileRoutesByPath" | kind=code-symbol | source=src/routeTree.gen.ts:L337 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyto": "FileRoutesByTo" | kind=code-symbol | source=src/routeTree.gen.ts:L192 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutetypes": "FileRouteTypes" | kind=code-symbol | source=src/routeTree.gen.ts:L244 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_indexroute": "IndexRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L66 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_loginroute": "LoginRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L52 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_privacybeleidroute": "PrivacybeleidRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L47 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_register": "Register" | kind=code-symbol | source=src/routeTree.gen.ts:L637 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_rootroutechildren": "RootRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L323 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_routetree": "routeTree" | kind=code-symbol | source=src/routeTree.gen.ts:L630 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_sitemapdotxmlroute": "SitemapDotxmlRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L42 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_trackdotjsroute": "TrackDotjsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L37 | neighbors=[routeTree.gen.ts]
- "src_server_security_headers": "SECURITY_HEADERS" | kind=code-symbol | source=src/server.ts:L103 | neighbors=[server.ts]
- "src_server_serverentry": "ServerEntry" | kind=code-symbol | source=src/server.ts:L26 | neighbors=[server.ts]
- "src_start_errormiddleware": "errorMiddleware" | kind=code-symbol | source=src/start.ts:L6 | neighbors=[start.ts]
- "supabase_client_createsupabaseclient": "createSupabaseClient()" | kind=code-symbol | source=src/integrations/supabase/client.ts:L5 | neighbors=[client.ts]
- "supabase_client_server_createsupabaseadminclient": "createSupabaseAdminClient()" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L8 | neighbors=[client.server.ts]
- "supabase_client_server_supabaseadmin": "supabaseAdmin" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L36 | neighbors=[client.server.ts]
- "supabase_migration_dns_checks": "dns_checks" | kind=code-symbol | source=supabase-migration.sql:L32 | neighbors=[supabase-migration.sql]
- "supabase_migration_monitoring_alerts": "monitoring_alerts" | kind=code-symbol | source=supabase-migration.sql:L42 | neighbors=[supabase-migration.sql]
- "supabase_migration_role_permissions": "role_permissions" | kind=code-symbol | source=supabase-migration.sql:L59 | neighbors=[supabase-migration.sql]
- "supabase_migration_site_response_times": "site_response_times" | kind=code-symbol | source=supabase-migration.sql:L7 | neighbors=[supabase-migration.sql]
- "supabase_migration_ssl_checks": "ssl_checks" | kind=code-symbol | source=supabase-migration.sql:L19 | neighbors=[supabase-migration.sql]
- "supabase_types_compositetypes": "CompositeTypes" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1525 | neighbors=[types.ts]
- "supabase_types_constants": "Constants" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1542 | neighbors=[types.ts]
- "supabase_types_databasewithoutinternals": "DatabaseWithoutInternals" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1425 | neighbors=[types.ts]
- "supabase_types_defaultschema": "DefaultSchema" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1427 | neighbors=[types.ts]
- "supabase_types_enums": "Enums" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1508 | neighbors=[types.ts]
- "supabase_types_json": "Json" | kind=code-symbol | source=src/integrations/supabase/types.ts:L5 | neighbors=[types.ts]
- "supabase_types_tables": "Tables" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1429 | neighbors=[types.ts]
- "supabase_types_tablesinsert": "TablesInsert" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1458 | neighbors=[types.ts]
- "supabase_types_tablesupdate": "TablesUpdate" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1483 | neighbors=[types.ts]
- "ui_accordion_accordioncontent": "AccordionContent" | kind=code-symbol | source=src/components/ui/accordion.tsx:L37 | neighbors=[accordion.tsx]
- "ui_accordion_accordionitem": "AccordionItem" | kind=code-symbol | source=src/components/ui/accordion.tsx:L9 | neighbors=[accordion.tsx]
- "ui_accordion_accordiontrigger": "AccordionTrigger" | kind=code-symbol | source=src/components/ui/accordion.tsx:L17 | neighbors=[accordion.tsx]
- "ui_alert_alert": "Alert" | kind=code-symbol | source=src/components/ui/alert.tsx:L22 | neighbors=[alert.tsx]
- "ui_alert_alertdescription": "AlertDescription" | kind=code-symbol | source=src/components/ui/alert.tsx:L41 | neighbors=[alert.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-029.json

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
