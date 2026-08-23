# Node Description Batch 41 of 47

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

- "src_routetree_gen_overonsroute": "OverOnsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L319 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_privacybeleidroute": "PrivacybeleidRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L314 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_register": "Register" | kind=code-symbol | source=src/routeTree.gen.ts:L1651 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_rootroutechildren": "RootRouteChildren" | kind=code-symbol | source=src/routeTree.gen.ts:L913 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_routetree": "routeTree" | kind=code-symbol | source=src/routeTree.gen.ts:L1644 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_seoroute": "SeoRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L309 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_sitemapdotxmlroute": "SitemapDotxmlRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L304 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_tarievenroute": "TarievenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L299 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_trackdotjsroute": "TrackDotjsRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L294 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webdesignroute": "WebdesignRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L289 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_webshoplatenmakenroute": "WebshopLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L284 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitecheckerroute": "WebsiteCheckerRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L279 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenassenroute": "WebsiteLatenMakenAssenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L269 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenautobedrijfroute": "WebsiteLatenMakenAutobedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L263 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenautorijschoolroute": "WebsiteLatenMakenAutorijschoolRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L257 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenbloemistroute": "WebsiteLatenMakenBloemistRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L251 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenboekhouderroute": "WebsiteLatenMakenBoekhouderRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L245 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakencateringbedrijfroute": "WebsiteLatenMakenCateringbedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L239 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakencoevordenroute": "WebsiteLatenMakenCoevordenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L233 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakendrachtenroute": "WebsiteLatenMakenDrachtenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L227 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenemmenroute": "WebsiteLatenMakenEmmenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L222 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakengroningenroute": "WebsiteLatenMakenGroningenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L216 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenheerenveenroute": "WebsiteLatenMakenHeerenveenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L210 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhoogeveenroute": "WebsiteLatenMakenHoogeveenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L204 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhoogezandroute": "WebsiteLatenMakenHoogezandRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L198 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenhovenierroute": "WebsiteLatenMakenHovenierRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L192 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenkapsalonroute": "WebsiteLatenMakenKapsalonRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L186 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenklusbedrijfroute": "WebsiteLatenMakenKlusbedrijfRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L180 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenleeuwardenroute": "WebsiteLatenMakenLeeuwardenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L174 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenloodgieterroute": "WebsiteLatenMakenLoodgieterRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L168 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenmakelaarroute": "WebsiteLatenMakenMakelaarRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L162 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenmeppelroute": "WebsiteLatenMakenMeppelRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L157 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakennagelstudioroute": "WebsiteLatenMakenNagelstudioRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L151 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenpedicureroute": "WebsiteLatenMakenPedicureRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L145 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenrestaurantroute": "WebsiteLatenMakenRestaurantRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L139 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenrodenroute": "WebsiteLatenMakenRodenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L134 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenroute": "WebsiteLatenMakenRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L274 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenschilderroute": "WebsiteLatenMakenSchilderRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L128 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakenschoonheidssalonroute": "WebsiteLatenMakenSchoonheidssalonRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L122 | neighbors=[routeTree.gen.ts]
- "src_routetree_gen_websitelatenmakensneekroute": "WebsiteLatenMakenSneekRoute" | kind=code-symbol | source=src/routeTree.gen.ts:L117 | neighbors=[routeTree.gen.ts]

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
