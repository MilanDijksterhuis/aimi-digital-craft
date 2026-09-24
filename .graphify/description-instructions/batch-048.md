# Node Description Batch 49 of 57

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

- "scripts_indexnow_submit_main": "main()" | kind=code-symbol | source=scripts/indexnow-submit.mjs:L11 | neighbors=[indexnow-submit.mjs]
- "scripts_publish_scheduled_posts_dirname": "__dirname" | kind=code-symbol | source=scripts/publish-scheduled-posts.js:L15 | neighbors=[publish-scheduled-posts.js]
- "scripts_publish_scheduled_posts_log_dir": "LOG_DIR" | kind=code-symbol | source=scripts/publish-scheduled-posts.js:L17 | neighbors=[publish-scheduled-posts.js]
- "scripts_publish_scheduled_posts_log_file": "LOG_FILE" | kind=code-symbol | source=scripts/publish-scheduled-posts.js:L18 | neighbors=[publish-scheduled-posts.js]
- "scripts_publish_scheduled_posts_repo_root": "REPO_ROOT" | kind=code-symbol | source=scripts/publish-scheduled-posts.js:L16 | neighbors=[publish-scheduled-posts.js]
- "scripts_set_telegram_webhook_main": "main()" | kind=code-symbol | source=scripts/set-telegram-webhook.ts:L23 | neighbors=[set-telegram-webhook.ts]
- "scripts_visual_audit": "visual_audit.py" | kind=code-symbol | source=audits/aimi-development.nl-audit/scripts/visual_audit.py:L1 | neighbors=[13e217a SEO]
- "src_routetree_gen_algemenevoorwaardenroute": "AlgemeneVoorwaardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L382 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublichooksexpireaccountsroute": "ApiPublicHooksExpireAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L476 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsiteerrorroute": "ApiPublicSiteErrorRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L431 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apipublicsitepingroute": "ApiPublicSitePingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L426 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_apitelegramwebhookroute": "ApiTelegramWebhookRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L421 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedaccountroute": "AuthenticatedAccountRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L416 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsaccountidroute": "AuthenticatedAdminAccountsAccountIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L512 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroute": "AuthenticatedAdminAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L470 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutechildren": "AuthenticatedAdminAccountsRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1614 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutewithchildren": "AuthenticatedAdminAccountsRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1624 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminagendaroute": "AuthenticatedAdminAgendaRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L119 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminblogpostidroute": "AuthenticatedAdminBlogPostIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L506 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminblogroute": "AuthenticatedAdminBlogRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L465 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminblogroutechildren": "AuthenticatedAdminBlogRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1629 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminblogroutewithchildren": "AuthenticatedAdminBlogRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1638 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangeschangeidroute": "AuthenticatedAdminChangesChangeIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L500 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroute": "AuthenticatedAdminChangesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L459 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutechildren": "AuthenticatedAdminChangesRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1643 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutewithchildren": "AuthenticatedAdminChangesRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1653 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadmininstellingenroute": "AuthenticatedAdminInstellingenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L453 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminleadsroute": "AuthenticatedAdminLeadsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L448 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenprojectidroute": "AuthenticatedAdminProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L494 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroute": "AuthenticatedAdminProjectenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L442 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutechildren": "AuthenticatedAdminProjectenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1658 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutewithchildren": "AuthenticatedAdminProjectenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1668 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroleidroute": "AuthenticatedAdminRollenRoleIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L488 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroute": "AuthenticatedAdminRollenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L436 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutechildren": "AuthenticatedAdminRollenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1673 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutewithchildren": "AuthenticatedAdminRollenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1682 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroute": "AuthenticatedAdminRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L411 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutechildren": "AuthenticatedAdminRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1687 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutewithchildren": "AuthenticatedAdminRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1708 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalprojectenprojectidroute": "AuthenticatedPortalProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L482 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-048.json

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
