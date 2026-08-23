# Node Description Batch 39 of 47

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

- "routes_website_laten_maken_klusbedrijf_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-klusbedrijf.tsx:L7 | neighbors=[website-laten-maken-klusbedrijf.tsx]
- "routes_website_laten_maken_leeuwarden_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-leeuwarden.tsx:L10 | neighbors=[website-laten-maken-leeuwarden.tsx]
- "routes_website_laten_maken_loodgieter_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-loodgieter.tsx:L7 | neighbors=[website-laten-maken-loodgieter.tsx]
- "routes_website_laten_maken_makelaar_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-makelaar.tsx:L7 | neighbors=[website-laten-maken-makelaar.tsx]
- "routes_website_laten_maken_meppel_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-meppel.tsx:L11 | neighbors=[website-laten-maken-meppel.tsx]
- "routes_website_laten_maken_nagelstudio_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-nagelstudio.tsx:L7 | neighbors=[website-laten-maken-nagelstudio.tsx]
- "routes_website_laten_maken_pedicure_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-pedicure.tsx:L7 | neighbors=[website-laten-maken-pedicure.tsx]
- "routes_website_laten_maken_restaurant_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-restaurant.tsx:L7 | neighbors=[website-laten-maken-restaurant.tsx]
- "routes_website_laten_maken_roden_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-roden.tsx:L11 | neighbors=[website-laten-maken-roden.tsx]
- "routes_website_laten_maken_schilder_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-schilder.tsx:L7 | neighbors=[website-laten-maken-schilder.tsx]
- "routes_website_laten_maken_schoonheidssalon_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-schoonheidssalon.tsx:L7 | neighbors=[website-laten-maken-schoonheidssalon.tsx]
- "routes_website_laten_maken_sneek_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-sneek.tsx:L10 | neighbors=[website-laten-maken-sneek.tsx]
- "routes_website_laten_maken_stadskanaal_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-stadskanaal.tsx:L8 | neighbors=[website-laten-maken-stadskanaal.tsx]
- "routes_website_laten_maken_veendam_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-veendam.tsx:L12 | neighbors=[website-laten-maken-veendam.tsx]
- "routes_website_laten_maken_winschoten_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-winschoten.tsx:L8 | neighbors=[website-laten-maken-winschoten.tsx]
- "routes_website_laten_vernieuwen_faqs": "faqs" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L71 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_preserved": "preserved" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L63 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_signals": "signals" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L28 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_steps": "steps" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L55 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_vernieuwenpage": "VernieuwenPage()" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L150 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_werkwijze_principles": "principles" | kind=code-symbol | source=src/routes/werkwijze.tsx:L36 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_standards": "standards" | kind=code-symbol | source=src/routes/werkwijze.tsx:L43 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_steps": "steps" | kind=code-symbol | source=src/routes/werkwijze.tsx:L13 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_werkwijzepage": "WerkwijzePage()" | kind=code-symbol | source=src/routes/werkwijze.tsx:L84 | neighbors=[werkwijze.tsx]
- "routes_wordpress_of_maatwerk_choosecustom": "chooseCustom" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L73 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_choosewp": "chooseWp" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L66 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_comparison": "comparison" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L23 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_faqs": "faqs" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L80 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_row": "Row" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L21 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_vergelijkingpage": "VergelijkingPage()" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L158 | neighbors=[wordpress-of-maatwerk.tsx]
- "scripts_set_telegram_webhook_main": "main()" | kind=code-symbol | source=scripts/set-telegram-webhook.ts:L23 | neighbors=[set-telegram-webhook.ts]
- "src_routetree_gen_algemenevoorwaardenroute": "AlgemeneVoorwaardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L354 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublichooksexpireaccountsroute": "ApiPublicHooksExpireAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L438 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsiteerrorroute": "ApiPublicSiteErrorRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L398 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsitepingroute": "ApiPublicSitePingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L393 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apitelegramwebhookroute": "ApiTelegramWebhookRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L388 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedaccountroute": "AuthenticatedAccountRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L383 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsaccountidroute": "AuthenticatedAdminAccountsAccountIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L468 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroute": "AuthenticatedAdminAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L432 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutechildren": "AuthenticatedAdminAccountsRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1474 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-038.json

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
