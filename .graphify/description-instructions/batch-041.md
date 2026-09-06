# Node Description Batch 42 of 49

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

- "src_routetree_gen_authenticatedadminroute": "AuthenticatedAdminRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L385 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutechildren": "AuthenticatedAdminRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1554 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedadminroutewithchildren": "AuthenticatedAdminRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1573 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalprojectenprojectidroute": "AuthenticatedPortalProjectenProjectIdRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L451 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroute": "AuthenticatedPortalRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L380 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutechildren": "AuthenticatedPortalRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1576 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedportalroutewithchildren": "AuthenticatedPortalRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1585 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroute": "AuthenticatedRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L366 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutechildren": "AuthenticatedRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1588 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedroutewithchildren": "AuthenticatedRouteWithChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L1602 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_authenticatedserverroute": "AuthenticatedServerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L375 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_b03bb73bce86422c6a74b3cfc829f2dddottxtroute": "B03bb73bce86422c6a74b3cfc829f2ddDottxtRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L355 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_branchesroute": "BranchesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L350 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_casesroute": "CasesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L116 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_contactroute": "ContactRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L345 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_faqroute": "FaqRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L340 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyfullpath": "FileRoutesByFullPath" | kind=code-symbol | source=src/routeTree.gen.ts:L482 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyid": "FileRoutesById" | kind=code-symbol | source=src/routeTree.gen.ts:L628 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbypath": "FileRoutesByPath" | kind=code-symbol | source=src/routeTree.gen.ts:L987 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyto": "FileRoutesByTo" | kind=code-symbol | source=src/routeTree.gen.ts:L555 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutetypes": "FileRouteTypes" | kind=code-symbol | source=src/routeTree.gen.ts:L703 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_indexroute": "IndexRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L370 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_loginroute": "LoginRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L335 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_meerdienstenroute": "MeerDienstenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L330 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_onderhoudhostingroute": "OnderhoudHostingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L325 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_overonsroute": "OverOnsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L320 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_privacybeleidroute": "PrivacybeleidRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L315 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_register": "Register" | kind=code-symbol | source=src/routeTree.gen.ts:L1674 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_rootroutechildren": "RootRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L926 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_routetree": "routeTree" | kind=code-symbol | source=src/routeTree.gen.ts:L1667 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_seoroute": "SeoRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L310 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_sitemapdotxmlroute": "SitemapDotxmlRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L305 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_tarievenroute": "TarievenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L300 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_trackdotjsroute": "TrackDotjsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L295 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webdesignroute": "WebdesignRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L290 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webshoplatenmakenroute": "WebshopLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L285 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitecheckerroute": "WebsiteCheckerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L280 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenassenroute": "WebsiteLatenMakenAssenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L270 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenautobedrijfroute": "WebsiteLatenMakenAutobedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L264 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenautorijschoolroute": "WebsiteLatenMakenAutorijschoolRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L258 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-041.json

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
