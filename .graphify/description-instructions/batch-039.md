# Node Description Batch 40 of 47

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

- "src_routetree_gen_authenticatedadminaccountsroutewithchildren": "AuthenticatedAdminAccountsRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1484 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminagendaroute": "AuthenticatedAdminAgendaRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L119 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangeschangeidroute": "AuthenticatedAdminChangesChangeIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L462 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroute": "AuthenticatedAdminChangesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L426 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutechildren": "AuthenticatedAdminChangesRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1489 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminchangesroutewithchildren": "AuthenticatedAdminChangesRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1499 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadmininstellingenroute": "AuthenticatedAdminInstellingenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L420 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminleadsroute": "AuthenticatedAdminLeadsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L415 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenprojectidroute": "AuthenticatedAdminProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L456 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroute": "AuthenticatedAdminProjectenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L409 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutechildren": "AuthenticatedAdminProjectenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1504 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminprojectenroutewithchildren": "AuthenticatedAdminProjectenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1514 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroleidroute": "AuthenticatedAdminRollenRoleIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L450 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroute": "AuthenticatedAdminRollenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L403 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutechildren": "AuthenticatedAdminRollenRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1519 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminrollenroutewithchildren": "AuthenticatedAdminRollenRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1528 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroute": "AuthenticatedAdminRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L378 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutechildren": "AuthenticatedAdminRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1533 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutewithchildren": "AuthenticatedAdminRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1552 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalprojectenprojectidroute": "AuthenticatedPortalProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L444 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroute": "AuthenticatedPortalRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L373 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutechildren": "AuthenticatedPortalRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1555 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutewithchildren": "AuthenticatedPortalRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1564 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroute": "AuthenticatedRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L359 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutechildren": "AuthenticatedRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1567 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutewithchildren": "AuthenticatedRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1581 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedserverroute": "AuthenticatedServerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L368 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_branchesroute": "BranchesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L349 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_casesroute": "CasesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L116 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_contactroute": "ContactRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L344 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_faqroute": "FaqRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L339 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyfullpath": "FileRoutesByFullPath" | kind=code-symbol | source=src/routeTree.gen.ts:L475 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyid": "FileRoutesById" | kind=code-symbol | source=src/routeTree.gen.ts:L619 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbypath": "FileRoutesByPath" | kind=code-symbol | source=src/routeTree.gen.ts:L973 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyto": "FileRoutesByTo" | kind=code-symbol | source=src/routeTree.gen.ts:L547 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutetypes": "FileRouteTypes" | kind=code-symbol | source=src/routeTree.gen.ts:L693 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_indexroute": "IndexRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L363 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_loginroute": "LoginRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L334 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_meerdienstenroute": "MeerDienstenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L329 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_onderhoudhostingroute": "OnderhoudHostingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L324 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-039.json

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
