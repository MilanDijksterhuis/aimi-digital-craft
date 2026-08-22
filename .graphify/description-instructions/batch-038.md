# Node Description Batch 39 of 46

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

- "src_routetree_gen_authenticatedadminroute": "AuthenticatedAdminRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L372 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutechildren": "AuthenticatedAdminRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1513 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutewithchildren": "AuthenticatedAdminRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1532 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalprojectenprojectidroute": "AuthenticatedPortalProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L438 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroute": "AuthenticatedPortalRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L367 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutechildren": "AuthenticatedPortalRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1535 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutewithchildren": "AuthenticatedPortalRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1544 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroute": "AuthenticatedRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L353 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutechildren": "AuthenticatedRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1547 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutewithchildren": "AuthenticatedRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1561 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedserverroute": "AuthenticatedServerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L362 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_branchesroute": "BranchesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L343 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_casesroute": "CasesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L116 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_contactroute": "ContactRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L338 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_faqroute": "FaqRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L333 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyfullpath": "FileRoutesByFullPath" | kind=code-symbol | source=src/routeTree.gen.ts:L469 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyid": "FileRoutesById" | kind=code-symbol | source=src/routeTree.gen.ts:L611 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbypath": "FileRoutesByPath" | kind=code-symbol | source=src/routeTree.gen.ts:L960 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyto": "FileRoutesByTo" | kind=code-symbol | source=src/routeTree.gen.ts:L540 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutetypes": "FileRouteTypes" | kind=code-symbol | source=src/routeTree.gen.ts:L684 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_indexroute": "IndexRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L357 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_loginroute": "LoginRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L328 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_meerdienstenroute": "MeerDienstenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L323 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_onderhoudhostingroute": "OnderhoudHostingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L318 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_overonsroute": "OverOnsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L313 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_privacybeleidroute": "PrivacybeleidRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L308 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_register": "Register" | kind=code-symbol | source=src/routeTree.gen.ts:L1630 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_rootroutechildren": "RootRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L901 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_routetree": "routeTree" | kind=code-symbol | source=src/routeTree.gen.ts:L1623 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_seoroute": "SeoRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L303 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_sitemapdotxmlroute": "SitemapDotxmlRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L298 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_tarievenroute": "TarievenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L293 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_trackdotjsroute": "TrackDotjsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L288 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webdesignroute": "WebdesignRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L283 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webshoplatenmakenroute": "WebshopLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L278 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenassenroute": "WebsiteLatenMakenAssenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L268 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenautobedrijfroute": "WebsiteLatenMakenAutobedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L262 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenautorijschoolroute": "WebsiteLatenMakenAutorijschoolRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L256 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenbloemistroute": "WebsiteLatenMakenBloemistRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L250 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenboekhouderroute": "WebsiteLatenMakenBoekhouderRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L244 | neighbors=[routeTree.gen.ts]

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
