# Node Description Batch 20 of 46

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

- "routes_meer_diensten_route": "Route" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L83 | neighbors=[meer-diensten.tsx, routeTree.gen.ts]
- "routes_onderhoud_hosting_route": "Route" | kind=code-symbol | source=src/routes/onderhoud-hosting.tsx:L64 | neighbors=[onderhoud-hosting.tsx, routeTree.gen.ts]
- "routes_over_ons_route": "Route" | kind=code-symbol | source=src/routes/over-ons.tsx:L34 | neighbors=[over-ons.tsx, routeTree.gen.ts]
- "routes_privacybeleid_route": "Route" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L5 | neighbors=[privacybeleid.tsx, routeTree.gen.ts]
- "routes_root_route": "Route" | kind=code-symbol | source=src/routes/__root.tsx:L104 | neighbors=[__root.tsx, routeTree.gen.ts]
- "routes_track_js": "track[.]js.tsx" | kind=code-symbol | source=src/routes/track[.]js.tsx:L1 | neighbors=[cors, Route]
- "routes_webdesign_route": "Route" | kind=code-symbol | source=src/routes/webdesign.tsx:L31 | neighbors=[webdesign.tsx, routeTree.gen.ts]
- "routes_webshop_laten_maken_route": "Route" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L77 | neighbors=[webshop-laten-maken.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_assen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-assen.tsx:L50 | neighbors=[website-laten-maken-assen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_coevorden_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-coevorden.tsx:L86 | neighbors=[website-laten-maken-coevorden.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_drachten_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-drachten.tsx:L54 | neighbors=[website-laten-maken-drachten.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_emmen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-emmen.tsx:L51 | neighbors=[website-laten-maken-emmen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_groningen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-groningen.tsx:L50 | neighbors=[website-laten-maken-groningen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_heerenveen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-heerenveen.tsx:L55 | neighbors=[website-laten-maken-heerenveen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_hoogeveen_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-hoogeveen.tsx:L87 | neighbors=[website-laten-maken-hoogeveen.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_hoogezand_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-hoogezand.tsx:L51 | neighbors=[website-laten-maken-hoogezand.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_hovenier_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-hovenier.tsx:L56 | neighbors=[website-laten-maken-hovenier.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_kapsalon_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-kapsalon.tsx:L56 | neighbors=[website-laten-maken-kapsalon.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_klusbedrijf_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-klusbedrijf.tsx:L57 | neighbors=[website-laten-maken-klusbedrijf.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_leeuwarden_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-leeuwarden.tsx:L55 | neighbors=[website-laten-maken-leeuwarden.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_loodgieter_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-loodgieter.tsx:L56 | neighbors=[website-laten-maken-loodgieter.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_meppel_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-meppel.tsx:L90 | neighbors=[website-laten-maken-meppel.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_nagelstudio_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-nagelstudio.tsx:L56 | neighbors=[website-laten-maken-nagelstudio.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_pedicure_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-pedicure.tsx:L56 | neighbors=[website-laten-maken-pedicure.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_roden_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-roden.tsx:L86 | neighbors=[website-laten-maken-roden.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken.tsx:L78 | neighbors=[website-laten-maken.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_schilder_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-schilder.tsx:L57 | neighbors=[website-laten-maken-schilder.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_schoonheidssalon_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-schoonheidssalon.tsx:L56 | neighbors=[website-laten-maken-schoonheidssalon.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_sneek_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-sneek.tsx:L55 | neighbors=[website-laten-maken-sneek.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_stadskanaal_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-stadskanaal.tsx:L51 | neighbors=[website-laten-maken-stadskanaal.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_veendam_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-veendam.tsx:L87 | neighbors=[website-laten-maken-veendam.tsx, routeTree.gen.ts]
- "routes_website_laten_maken_winschoten_route": "Route" | kind=code-symbol | source=src/routes/website-laten-maken-winschoten.tsx:L49 | neighbors=[website-laten-maken-winschoten.tsx, routeTree.gen.ts]
- "routes_werkwijze_route": "Route" | kind=code-symbol | source=src/routes/werkwijze.tsx:L49 | neighbors=[werkwijze.tsx, routeTree.gen.ts]
- "scripts_set_telegram_webhook": "set-telegram-webhook.ts" | kind=code-symbol | source=scripts/set-telegram-webhook.ts:L1 | neighbors=[2b1d78f telegram, main()]
- "src_router": "router.tsx" | kind=code-symbol | source=src/router.tsx:L1 | neighbors=[getRouter(), routeTree.gen.ts]
- "src_router_getrouter": "getRouter()" | kind=code-symbol | source=src/router.tsx:L5 | neighbors=[router.tsx, routeTree.gen.ts]
- "src_server_applyassetcaching": "applyAssetCaching()" | kind=code-symbol | source=src/server.ts:L149 | neighbors=[server.ts, applySecurityHeaders()]
- "src_server_fixnotfoundtitle": "fixNotFoundTitle()" | kind=code-symbol | source=src/server.ts:L239 | neighbors=[server.ts, fetch()]
- "src_server_getserverentry": "getServerEntry()" | kind=code-symbol | source=src/server.ts:L32 | neighbors=[server.ts, fetch()]
- "src_server_iscatastrophicssrerrorbody": "isCatastrophicSsrErrorBody()" | kind=code-symbol | source=src/server.ts:L48 | neighbors=[server.ts, normalizeCatastrophicSsrResponse()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-019.json

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
