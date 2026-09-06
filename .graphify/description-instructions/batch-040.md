# Node Description Batch 41 of 49

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

- "routes_website_laten_vernieuwen_preserved": "preserved" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L62 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_signals": "signals" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L27 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_steps": "steps" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L54 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_vernieuwenpage": "VernieuwenPage()" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L143 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_werkwijze_principles": "principles" | kind=code-symbol | source=src/routes/werkwijze.tsx:L36 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_standards": "standards" | kind=code-symbol | source=src/routes/werkwijze.tsx:L43 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_steps": "steps" | kind=code-symbol | source=src/routes/werkwijze.tsx:L13 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_werkwijzepage": "WerkwijzePage()" | kind=code-symbol | source=src/routes/werkwijze.tsx:L74 | neighbors=[werkwijze.tsx]
- "routes_wordpress_of_maatwerk_choosecustom": "chooseCustom" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L73 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_choosewp": "chooseWp" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L66 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_comparison": "comparison" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L23 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_faqs": "faqs" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L80 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_row": "Row" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L21 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_vergelijkingpage": "VergelijkingPage()" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L158 | neighbors=[wordpress-of-maatwerk.tsx]
- "scripts_set_telegram_webhook_main": "main()" | kind=code-symbol | source=scripts/set-telegram-webhook.ts:L23 | neighbors=[set-telegram-webhook.ts]
- "src_routetree_gen_algemenevoorwaardenroute": "AlgemeneVoorwaardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L361 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublichooksexpireaccountsroute": "ApiPublicHooksExpireAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L445 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsiteerrorroute": "ApiPublicSiteErrorRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L405 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsitepingroute": "ApiPublicSitePingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L400 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apitelegramwebhookroute": "ApiTelegramWebhookRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L395 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedaccountroute": "AuthenticatedAccountRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L390 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsaccountidroute": "AuthenticatedAdminAccountsAccountIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L475 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroute": "AuthenticatedAdminAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L439 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutechildren": "AuthenticatedAdminAccountsRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1495 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutewithchildren": "AuthenticatedAdminAccountsRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1505 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminagendaroute": "AuthenticatedAdminAgendaRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L119 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangeschangeidroute": "AuthenticatedAdminChangesChangeIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L469 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroute": "AuthenticatedAdminChangesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L433 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutechildren": "AuthenticatedAdminChangesRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1510 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutewithchildren": "AuthenticatedAdminChangesRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1520 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadmininstellingenroute": "AuthenticatedAdminInstellingenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L427 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminleadsroute": "AuthenticatedAdminLeadsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L422 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenprojectidroute": "AuthenticatedAdminProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L463 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroute": "AuthenticatedAdminProjectenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L416 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutechildren": "AuthenticatedAdminProjectenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1525 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutewithchildren": "AuthenticatedAdminProjectenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1535 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroleidroute": "AuthenticatedAdminRollenRoleIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L457 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroute": "AuthenticatedAdminRollenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L410 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutechildren": "AuthenticatedAdminRollenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1540 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutewithchildren": "AuthenticatedAdminRollenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1549 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-040.json

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
