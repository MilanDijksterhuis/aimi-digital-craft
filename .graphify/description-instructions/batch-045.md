# Node Description Batch 46 of 52

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

- "src_routetree_gen_casesroute": "CasesRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L116 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_contactroute": "ContactRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L361 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_faqroute": "FaqRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L356 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyfullpath": "FileRoutesByFullPath" | kind=code-symbol | source=src/routeTree.gen.ts:L519 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyid": "FileRoutesById" | kind=code-symbol | source=src/routeTree.gen.ts:L677 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbypath": "FileRoutesByPath" | kind=code-symbol | source=src/routeTree.gen.ts:L1064 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutesbyto": "FileRoutesByTo" | kind=code-symbol | source=src/routeTree.gen.ts:L598 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_fileroutetypes": "FileRouteTypes" | kind=code-symbol | source=src/routeTree.gen.ts:L758 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_indexroute": "IndexRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L391 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_llmsdottxtroute": "LlmsDottxtRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L346 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_llmsfulldottxtroute": "LlmsFullDottxtRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L351 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_loginroute": "LoginRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L341 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_meerdienstenroute": "MeerDienstenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L336 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_onderhoudhostingroute": "OnderhoudHostingRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L331 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_overonsroute": "OverOnsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L326 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_privacybeleidroute": "PrivacybeleidRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L321 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_register": "Register" | kind=code-symbol | source=src/routeTree.gen.ts:L1813 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_rootroutechildren": "RootRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L999 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_routetree": "routeTree" | kind=code-symbol | source=src/routeTree.gen.ts:L1806 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_seoroute": "SeoRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L316 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_sitemapdotxmlroute": "SitemapDotxmlRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L311 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_tarievenroute": "TarievenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L306 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_trackdotjsroute": "TrackDotjsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L301 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webdesignroute": "WebdesignRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L296 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webshoplatenmakenroute": "WebshopLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L291 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitecheckerroute": "WebsiteCheckerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L286 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenassenroute": "WebsiteLatenMakenAssenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L276 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenautobedrijfroute": "WebsiteLatenMakenAutobedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L270 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenautorijschoolroute": "WebsiteLatenMakenAutorijschoolRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L264 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenbloemistroute": "WebsiteLatenMakenBloemistRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L258 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenboekhouderroute": "WebsiteLatenMakenBoekhouderRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L252 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakencateringbedrijfroute": "WebsiteLatenMakenCateringbedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L246 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakencoevordenroute": "WebsiteLatenMakenCoevordenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L240 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakendrachtenroute": "WebsiteLatenMakenDrachtenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L234 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenemmenroute": "WebsiteLatenMakenEmmenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L229 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakengroningenroute": "WebsiteLatenMakenGroningenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L223 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenheerenveenroute": "WebsiteLatenMakenHeerenveenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L217 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhoogeveenroute": "WebsiteLatenMakenHoogeveenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L211 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhoogezandroute": "WebsiteLatenMakenHoogezandRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L205 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhovenierroute": "WebsiteLatenMakenHovenierRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L199 | neighbors=[routeTree.gen.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-045.json

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
