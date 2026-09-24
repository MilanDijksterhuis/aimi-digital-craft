# Node Description Batch 47 of 52

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

- "src_routetree_gen_websitelatenmakenkapsalonroute": "WebsiteLatenMakenKapsalonRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L193 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenklusbedrijfroute": "WebsiteLatenMakenKlusbedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L187 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenleeuwardenroute": "WebsiteLatenMakenLeeuwardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L181 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenloodgieterroute": "WebsiteLatenMakenLoodgieterRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L175 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenmakelaarroute": "WebsiteLatenMakenMakelaarRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L169 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenmeppelroute": "WebsiteLatenMakenMeppelRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L164 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakennagelstudioroute": "WebsiteLatenMakenNagelstudioRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L158 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenpedicureroute": "WebsiteLatenMakenPedicureRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L152 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenrestaurantroute": "WebsiteLatenMakenRestaurantRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L146 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenrodenroute": "WebsiteLatenMakenRodenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L141 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenroute": "WebsiteLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L281 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenschilderroute": "WebsiteLatenMakenSchilderRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L135 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenschoonheidssalonroute": "WebsiteLatenMakenSchoonheidssalonRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L129 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakensneekroute": "WebsiteLatenMakenSneekRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L124 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenstadskanaalroute": "WebsiteLatenMakenStadskanaalRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L118 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenveendamroute": "WebsiteLatenMakenVeendamRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L112 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenwinschotenroute": "WebsiteLatenMakenWinschotenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L106 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenvernieuwenroute": "WebsiteLatenVernieuwenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L101 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_werkwijzeroute": "WerkwijzeRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L96 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_wordpressofmaatwerkroute": "WordpressOfMaatwerkRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L91 | neighbors=[routeTree.gen.ts]
- "src_server_brotlicompressasync": "brotliCompressAsync" | kind=code-symbol | source=src/server.ts:L6 | neighbors=[server.ts]
- "src_server_compressedassetcache": "compressedAssetCache" | kind=code-symbol | source=src/server.ts:L194 | neighbors=[server.ts]
- "src_server_compressioninflight": "compressionInFlight" | kind=code-symbol | source=src/server.ts:L199 | neighbors=[server.ts]
- "src_server_gzipasync": "gzipAsync" | kind=code-symbol | source=src/server.ts:L7 | neighbors=[server.ts]
- "src_server_security_headers": "SECURITY_HEADERS" | kind=code-symbol | source=src/server.ts:L115 | neighbors=[server.ts]
- "src_server_serverentry": "ServerEntry" | kind=code-symbol | source=src/server.ts:L35 | neighbors=[server.ts]
- "src_start_errormiddleware": "errorMiddleware" | kind=code-symbol | source=src/start.ts:L6 | neighbors=[start.ts]
- "supabase_client_createsupabaseclient": "createSupabaseClient()" | kind=code-symbol | source=src/integrations/supabase/client.ts:L5 | neighbors=[client.ts]
- "supabase_client_server_createsupabaseadminclient": "createSupabaseAdminClient()" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L8 | neighbors=[client.server.ts]
- "supabase_client_server_supabaseadmin": "supabaseAdmin" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L36 | neighbors=[client.server.ts]
- "supabase_types_compositetypes": "CompositeTypes" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1648 | neighbors=[types.ts]
- "supabase_types_constants": "Constants" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1664 | neighbors=[types.ts]
- "supabase_types_databasewithoutinternals": "DatabaseWithoutInternals" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1553 | neighbors=[types.ts]
- "supabase_types_defaultschema": "DefaultSchema" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1555 | neighbors=[types.ts]
- "supabase_types_enums": "Enums" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1632 | neighbors=[types.ts]
- "supabase_types_json": "Json" | kind=code-symbol | source=src/integrations/supabase/types.ts:L5 | neighbors=[types.ts]
- "supabase_types_tables": "Tables" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1557 | neighbors=[types.ts]
- "supabase_types_tablesinsert": "TablesInsert" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1584 | neighbors=[types.ts]
- "supabase_types_tablesupdate": "TablesUpdate" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1608 | neighbors=[types.ts]
- "ui_accordion_accordioncontent": "AccordionContent" | kind=code-symbol | source=src/components/ui/accordion.tsx:L37 | neighbors=[accordion.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-046.json

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
