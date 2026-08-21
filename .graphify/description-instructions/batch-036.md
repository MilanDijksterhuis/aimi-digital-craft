# Node Description Batch 37 of 43

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

- "src_routetree_gen_indexroute": "IndexRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L222 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_loginroute": "LoginRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L198 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_meerdienstenroute": "MeerDienstenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L193 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_onderhoudhostingroute": "OnderhoudHostingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L188 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_overonsroute": "OverOnsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L183 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_privacybeleidroute": "PrivacybeleidRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L178 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_register": "Register" | kind=code-symbol | source=src/routeTree.gen.ts:L1194 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_rootroutechildren": "RootRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L646 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_routetree": "routeTree" | kind=code-symbol | source=src/routeTree.gen.ts:L1187 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_sitemapdotxmlroute": "SitemapDotxmlRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L173 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_trackdotjsroute": "TrackDotjsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L168 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webdesignroute": "WebdesignRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L163 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webshoplatenmakenroute": "WebshopLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L158 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenassenroute": "WebsiteLatenMakenAssenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L148 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakencoevordenroute": "WebsiteLatenMakenCoevordenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L142 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakendrachtenroute": "WebsiteLatenMakenDrachtenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L136 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenemmenroute": "WebsiteLatenMakenEmmenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L131 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakengroningenroute": "WebsiteLatenMakenGroningenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L125 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenheerenveenroute": "WebsiteLatenMakenHeerenveenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L119 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhoogeveenroute": "WebsiteLatenMakenHoogeveenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L113 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhoogezandroute": "WebsiteLatenMakenHoogezandRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L107 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenleeuwardenroute": "WebsiteLatenMakenLeeuwardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L101 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenmeppelroute": "WebsiteLatenMakenMeppelRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L96 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenrodenroute": "WebsiteLatenMakenRodenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L91 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenroute": "WebsiteLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L153 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakensneekroute": "WebsiteLatenMakenSneekRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L86 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenstadskanaalroute": "WebsiteLatenMakenStadskanaalRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L80 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenveendamroute": "WebsiteLatenMakenVeendamRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L74 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenwinschotenroute": "WebsiteLatenMakenWinschotenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L68 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_werkwijzeroute": "WerkwijzeRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L63 | neighbors=[routeTree.gen.ts]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-036.json

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
