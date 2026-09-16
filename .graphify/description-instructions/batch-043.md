# Node Description Batch 44 of 52

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

- "routes_werkwijze_standards": "standards" | kind=code-symbol | source=src/routes/werkwijze.tsx:L43 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_steps": "steps" | kind=code-symbol | source=src/routes/werkwijze.tsx:L13 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_werkwijzepage": "WerkwijzePage()" | kind=code-symbol | source=src/routes/werkwijze.tsx:L74 | neighbors=[werkwijze.tsx]
- "routes_wordpress_of_maatwerk_choosecustom": "chooseCustom" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L73 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_choosewp": "chooseWp" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L66 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_comparison": "comparison" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L23 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_faqs": "faqs" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L80 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_row": "Row" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L21 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_vergelijkingpage": "VergelijkingPage()" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L161 | neighbors=[wordpress-of-maatwerk.tsx]
- "scripts_indexnow_submit_main": "main()" | kind=code-symbol | source=scripts/indexnow-submit.mjs:L11 | neighbors=[indexnow-submit.mjs]
- "scripts_set_telegram_webhook_main": "main()" | kind=code-symbol | source=scripts/set-telegram-webhook.ts:L23 | neighbors=[set-telegram-webhook.ts]
- "scripts_visual_audit": "visual_audit.py" | kind=code-symbol | source=aimi-development.nl-audit/scripts/visual_audit.py:L1 | neighbors=[cc405f4 pagina updates]
- "src_routetree_gen_algemenevoorwaardenroute": "AlgemeneVoorwaardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L370 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublichooksexpireaccountsroute": "ApiPublicHooksExpireAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L464 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsiteerrorroute": "ApiPublicSiteErrorRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L419 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsitepingroute": "ApiPublicSitePingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L414 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apitelegramwebhookroute": "ApiTelegramWebhookRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L409 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedaccountroute": "AuthenticatedAccountRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L404 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsaccountidroute": "AuthenticatedAdminAccountsAccountIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L500 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroute": "AuthenticatedAdminAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L458 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutechildren": "AuthenticatedAdminAccountsRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1574 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutewithchildren": "AuthenticatedAdminAccountsRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1584 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminagendaroute": "AuthenticatedAdminAgendaRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L119 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminblogpostidroute": "AuthenticatedAdminBlogPostIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L494 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminblogroute": "AuthenticatedAdminBlogRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L453 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminblogroutechildren": "AuthenticatedAdminBlogRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1589 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminblogroutewithchildren": "AuthenticatedAdminBlogRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1598 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangeschangeidroute": "AuthenticatedAdminChangesChangeIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L488 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroute": "AuthenticatedAdminChangesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L447 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutechildren": "AuthenticatedAdminChangesRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1603 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutewithchildren": "AuthenticatedAdminChangesRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1613 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadmininstellingenroute": "AuthenticatedAdminInstellingenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L441 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminleadsroute": "AuthenticatedAdminLeadsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L436 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenprojectidroute": "AuthenticatedAdminProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L482 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroute": "AuthenticatedAdminProjectenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L430 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutechildren": "AuthenticatedAdminProjectenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1618 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutewithchildren": "AuthenticatedAdminProjectenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1628 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroleidroute": "AuthenticatedAdminRollenRoleIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L476 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroute": "AuthenticatedAdminRollenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L424 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutechildren": "AuthenticatedAdminRollenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1633 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-043.json

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
