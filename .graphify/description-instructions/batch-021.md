# Node Description Batch 22 of 50

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

- "routes_website_laten_maken_cateringbedrijf_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-cateringbedrijf.tsx:L57 | neighbors=[website-laten-maken-cateringbedrijf.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_coevorden_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-coevorden.tsx:L86 | neighbors=[website-laten-maken-coevorden.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_drachten_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-drachten.tsx:L55 | neighbors=[website-laten-maken-drachten.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_emmen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-emmen.tsx:L52 | neighbors=[website-laten-maken-emmen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_groningen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-groningen.tsx:L50 | neighbors=[website-laten-maken-groningen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_heerenveen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-heerenveen.tsx:L56 | neighbors=[website-laten-maken-heerenveen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_hoogeveen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-hoogeveen.tsx:L87 | neighbors=[website-laten-maken-hoogeveen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_hoogezand_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-hoogezand.tsx:L51 | neighbors=[website-laten-maken-hoogezand.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_hovenier_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-hovenier.tsx:L57 | neighbors=[website-laten-maken-hovenier.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_kapsalon_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-kapsalon.tsx:L57 | neighbors=[website-laten-maken-kapsalon.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_klusbedrijf_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-klusbedrijf.tsx:L58 | neighbors=[website-laten-maken-klusbedrijf.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_leeuwarden_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-leeuwarden.tsx:L56 | neighbors=[website-laten-maken-leeuwarden.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_loodgieter_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-loodgieter.tsx:L57 | neighbors=[website-laten-maken-loodgieter.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_makelaar_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-makelaar.tsx:L93 | neighbors=[website-laten-maken-makelaar.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_meppel_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-meppel.tsx:L90 | neighbors=[website-laten-maken-meppel.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_nagelstudio_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-nagelstudio.tsx:L57 | neighbors=[website-laten-maken-nagelstudio.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_pedicure_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-pedicure.tsx:L57 | neighbors=[website-laten-maken-pedicure.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_restaurant_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-restaurant.tsx:L57 | neighbors=[website-laten-maken-restaurant.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_roden_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-roden.tsx:L86 | neighbors=[website-laten-maken-roden.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken.tsx:L78 | neighbors=[website-laten-maken.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_schilder_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-schilder.tsx:L58 | neighbors=[website-laten-maken-schilder.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_schoonheidssalon_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-schoonheidssalon.tsx:L57 | neighbors=[website-laten-maken-schoonheidssalon.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_sneek_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-sneek.tsx:L56 | neighbors=[website-laten-maken-sneek.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_stadskanaal_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-stadskanaal.tsx:L51 | neighbors=[website-laten-maken-stadskanaal.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_veendam_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-veendam.tsx:L96 | neighbors=[website-laten-maken-veendam.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_winschoten_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-winschoten.tsx:L50 | neighbors=[website-laten-maken-winschoten.tsx, routeTree.gen.ts]
- "routes_website_laten_vernieuwen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L101 | neighbors=[website-laten-vernieuwen.tsx, routeTree.gen.ts]
- "routes_werkwijze_route": "Route" | kind=code-symbol | source=src/routes/werkwijze.tsx:L49 | neighbors=[werkwijze.tsx, routeTree.gen.ts]
- "routes_wordpress_of_maatwerk_route": "Route" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L107 | neighbors=[wordpress-of-maatwerk.tsx, routeTree.gen.ts]
- "scripts_indexnow_submit": "indexnow-submit.mjs" | kind=code-symbol | source=scripts/indexnow-submit.mjs:L1 | neighbors=[d38d9ab Add IndexNow key route, main()]
- "scripts_set_telegram_webhook": "set-telegram-webhook.ts" | kind=code-symbol | source=scripts/set-telegram-webhook.ts:L1 | neighbors=[2b1d78f telegram, main()]
- "src_router": "router.tsx" | kind=code-symbol | source=src/router.tsx:L1 | neighbors=[getRouter(), routeTree.gen.ts]
- "src_router_getrouter": "getRouter()" | kind=code-symbol | source=src/router.tsx:L5 | neighbors=[router.tsx, routeTree.gen.ts]
- "src_server_applyassetcaching": "applyAssetCaching()" | kind=code-symbol | source=src/server.ts:L162 | neighbors=[server.ts, applySecurityHeaders()]
- "src_server_fixnotfoundtitle": "fixNotFoundTitle()" | kind=code-symbol | source=src/server.ts:L361 | neighbors=[server.ts, fetch()]
- "src_server_getserverentry": "getServerEntry()" | kind=code-symbol | source=src/server.ts:L41 | neighbors=[server.ts, fetch()]
- "src_server_iscatastrophicssrerrorbody": "isCatastrophicSsrErrorBody()" | kind=code-symbol | source=src/server.ts:L57 | neighbors=[server.ts, normalizeCatastrophicSsrResponse()]
- "src_server_ishttps": "isHttps()" | kind=code-symbol | source=src/server.ts:L141 | neighbors=[server.ts, applySecurityHeaders()]
- "src_server_pickencoding": "pickEncoding()" | kind=code-symbol | source=src/server.ts:L197 | neighbors=[server.ts, compressStaticAsset()]
- "src_server_ratelimitedresponse": "rateLimitedResponse()" | kind=code-symbol | source=src/server.ts:L103 | neighbors=[server.ts, applyRateLimit()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-021.json

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
