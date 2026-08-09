# Node Description Batch 34 of 40

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

- "src_routetree_gen_apitelegramwebhookroute": "ApiTelegramWebhookRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L125 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedaccountroute": "AuthenticatedAccountRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L120 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsaccountidroute": "AuthenticatedAdminAccountsAccountIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L205 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroute": "AuthenticatedAdminAccountsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L169 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutechildren": "AuthenticatedAdminAccountsRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L651 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminaccountsroutewithchildren": "AuthenticatedAdminAccountsRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L661 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminagendaroute": "AuthenticatedAdminAgendaRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L119 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangeschangeidroute": "AuthenticatedAdminChangesChangeIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L199 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroute": "AuthenticatedAdminChangesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L163 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutechildren": "AuthenticatedAdminChangesRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L666 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutewithchildren": "AuthenticatedAdminChangesRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L676 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadmininstellingenroute": "AuthenticatedAdminInstellingenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L157 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminleadsroute": "AuthenticatedAdminLeadsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L152 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenprojectidroute": "AuthenticatedAdminProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L193 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroute": "AuthenticatedAdminProjectenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L146 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutechildren": "AuthenticatedAdminProjectenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L681 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutewithchildren": "AuthenticatedAdminProjectenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L691 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroleidroute": "AuthenticatedAdminRollenRoleIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L187 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroute": "AuthenticatedAdminRollenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L140 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutechildren": "AuthenticatedAdminRollenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L696 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutewithchildren": "AuthenticatedAdminRollenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L705 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroute": "AuthenticatedAdminRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L115 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutechildren": "AuthenticatedAdminRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L710 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutewithchildren": "AuthenticatedAdminRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L729 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalprojectenprojectidroute": "AuthenticatedPortalProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L181 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroute": "AuthenticatedPortalRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L110 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutechildren": "AuthenticatedPortalRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L732 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutewithchildren": "AuthenticatedPortalRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L741 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroute": "AuthenticatedRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L96 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutechildren": "AuthenticatedRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L744 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutewithchildren": "AuthenticatedRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L758 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedserverroute": "AuthenticatedServerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L105 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_faqroute": "FaqRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L86 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyfullpath": "FileRoutesByFullPath" | kind=code-symbol | source=src/routeTree.gen.ts:L212 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyid": "FileRoutesById" | kind=code-symbol | source=src/routeTree.gen.ts:L276 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbypath": "FileRoutesByPath" | kind=code-symbol | source=src/routeTree.gen.ts:L430 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyto": "FileRoutesByTo" | kind=code-symbol | source=src/routeTree.gen.ts:L244 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutetypes": "FileRouteTypes" | kind=code-symbol | source=src/routeTree.gen.ts:L310 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_indexroute": "IndexRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L100 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_loginroute": "LoginRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L81 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-033.json

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
