# Node Description Batch 43 of 49

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

- "src_routetree_gen_websitelatenmakenbloemistroute": "WebsiteLatenMakenBloemistRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L252 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenboekhouderroute": "WebsiteLatenMakenBoekhouderRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L246 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakencateringbedrijfroute": "WebsiteLatenMakenCateringbedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L240 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakencoevordenroute": "WebsiteLatenMakenCoevordenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L234 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakendrachtenroute": "WebsiteLatenMakenDrachtenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L228 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenemmenroute": "WebsiteLatenMakenEmmenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L223 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakengroningenroute": "WebsiteLatenMakenGroningenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L217 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenheerenveenroute": "WebsiteLatenMakenHeerenveenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L211 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhoogeveenroute": "WebsiteLatenMakenHoogeveenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L205 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhoogezandroute": "WebsiteLatenMakenHoogezandRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L199 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhovenierroute": "WebsiteLatenMakenHovenierRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L193 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenkapsalonroute": "WebsiteLatenMakenKapsalonRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L187 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenklusbedrijfroute": "WebsiteLatenMakenKlusbedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L181 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenleeuwardenroute": "WebsiteLatenMakenLeeuwardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L175 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenloodgieterroute": "WebsiteLatenMakenLoodgieterRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L169 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenmakelaarroute": "WebsiteLatenMakenMakelaarRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L163 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenmeppelroute": "WebsiteLatenMakenMeppelRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L158 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakennagelstudioroute": "WebsiteLatenMakenNagelstudioRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L152 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenpedicureroute": "WebsiteLatenMakenPedicureRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L146 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenrestaurantroute": "WebsiteLatenMakenRestaurantRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L140 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenrodenroute": "WebsiteLatenMakenRodenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L135 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenroute": "WebsiteLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L275 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenschilderroute": "WebsiteLatenMakenSchilderRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L129 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenschoonheidssalonroute": "WebsiteLatenMakenSchoonheidssalonRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L123 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakensneekroute": "WebsiteLatenMakenSneekRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L118 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenstadskanaalroute": "WebsiteLatenMakenStadskanaalRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L112 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenveendamroute": "WebsiteLatenMakenVeendamRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L106 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenwinschotenroute": "WebsiteLatenMakenWinschotenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L100 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenvernieuwenroute": "WebsiteLatenVernieuwenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L95 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_werkwijzeroute": "WerkwijzeRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L90 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_wordpressofmaatwerkroute": "WordpressOfMaatwerkRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L85 | neighbors=[routeTree.gen.ts]
- "src_server_brotlicompressasync": "brotliCompressAsync" | kind=code-symbol | source=src/server.ts:L6 | neighbors=[server.ts]
- "src_server_compressedassetcache": "compressedAssetCache" | kind=code-symbol | source=src/server.ts:L190 | neighbors=[server.ts]
- "src_server_compressioninflight": "compressionInFlight" | kind=code-symbol | source=src/server.ts:L195 | neighbors=[server.ts]
- "src_server_gzipasync": "gzipAsync" | kind=code-symbol | source=src/server.ts:L7 | neighbors=[server.ts]
- "src_server_security_headers": "SECURITY_HEADERS" | kind=code-symbol | source=src/server.ts:L115 | neighbors=[server.ts]
- "src_server_serverentry": "ServerEntry" | kind=code-symbol | source=src/server.ts:L35 | neighbors=[server.ts]
- "src_start_errormiddleware": "errorMiddleware" | kind=code-symbol | source=src/start.ts:L6 | neighbors=[start.ts]
- "supabase_client_createsupabaseclient": "createSupabaseClient()" | kind=code-symbol | source=src/integrations/supabase/client.ts:L5 | neighbors=[client.ts]
- "supabase_client_server_createsupabaseadminclient": "createSupabaseAdminClient()" | kind=code-symbol | source=src/integrations/supabase/client.server.ts:L8 | neighbors=[client.server.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-042.json

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
