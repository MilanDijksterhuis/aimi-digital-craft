# Node Description Batch 40 of 50

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

- "routes_seo_notpromised": "notPromised" | kind=code-symbol | source=src/routes/seo.tsx:L69 | neighbors=[seo.tsx]
- "routes_seo_seopage": "SeoPage()" | kind=code-symbol | source=src/routes/seo.tsx:L161 | neighbors=[seo.tsx]
- "routes_seo_steps": "steps" | kind=code-symbol | source=src/routes/seo.tsx:L76 | neighbors=[seo.tsx]
- "routes_sitemap_xml_lastmod": "LASTMOD" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L14 | neighbors=[sitemap[.]xml.tsx]
- "routes_sitemap_xml_route": "Route" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L7 | neighbors=[sitemap[.]xml.tsx]
- "routes_sitemap_xml_sitemapentry": "SitemapEntry" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L6 | neighbors=[sitemap[.]xml.tsx]
- "routes_tarieven_comparison": "comparison" | kind=code-symbol | source=src/routes/tarieven.tsx:L113 | neighbors=[tarieven.tsx]
- "routes_tarieven_faqs": "faqs" | kind=code-symbol | source=src/routes/tarieven.tsx:L146 | neighbors=[tarieven.tsx]
- "routes_tarieven_included": "included" | kind=code-symbol | source=src/routes/tarieven.tsx:L97 | neighbors=[tarieven.tsx]
- "routes_tarieven_notincluded": "notIncluded" | kind=code-symbol | source=src/routes/tarieven.tsx:L106 | neighbors=[tarieven.tsx]
- "routes_tarieven_recurring": "recurring" | kind=code-symbol | source=src/routes/tarieven.tsx:L80 | neighbors=[tarieven.tsx]
- "routes_tarieven_tarievenpage": "TarievenPage()" | kind=code-symbol | source=src/routes/tarieven.tsx:L264 | neighbors=[tarieven.tsx]
- "routes_tarieven_tier": "Tier" | kind=code-symbol | source=src/routes/tarieven.tsx:L23 | neighbors=[tarieven.tsx]
- "routes_tarieven_tiers": "tiers" | kind=code-symbol | source=src/routes/tarieven.tsx:L33 | neighbors=[tarieven.tsx]
- "routes_track_js_cors": "cors" | kind=code-symbol | source=src/routes/track[.]js.tsx:L3 | neighbors=[track[.]js.tsx]
- "routes_track_js_route": "Route" | kind=code-symbol | source=src/routes/track[.]js.tsx:L11 | neighbors=[track[.]js.tsx]
- "routes_webdesign_locations": "locations" | kind=code-symbol | source=src/routes/webdesign.tsx:L13 | neighbors=[webdesign.tsx]
- "routes_webshop_laten_maken_data": "data" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L8 | neighbors=[webshop-laten-maken.tsx]
- "routes_webshop_laten_maken_faqs": "faqs" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L7 | neighbors=[webshop-laten-maken.tsx]
- "routes_website_checker_buildcheckmap": "buildCheckMap()" | kind=code-symbol | source=src/routes/website-checker.tsx:L125 | neighbors=[website-checker.tsx]
- "routes_website_checker_categorybar": "CategoryBar()" | kind=code-symbol | source=src/routes/website-checker.tsx:L404 | neighbors=[website-checker.tsx]
- "routes_website_checker_checkssection": "ChecksSection()" | kind=code-symbol | source=src/routes/website-checker.tsx:L493 | neighbors=[website-checker.tsx]
- "routes_website_checker_closingblock": "ClosingBlock()" | kind=code-symbol | source=src/routes/website-checker.tsx:L585 | neighbors=[website-checker.tsx]
- "routes_website_checker_ctacontactform": "CtaContactForm()" | kind=code-symbol | source=src/routes/website-checker.tsx:L625 | neighbors=[website-checker.tsx]
- "routes_website_checker_example": "EXAMPLE" | kind=code-symbol | source=src/routes/website-checker.tsx:L104 | neighbors=[website-checker.tsx]
- "routes_website_checker_groupneedsattention": "groupNeedsAttention()" | kind=code-symbol | source=src/routes/website-checker.tsx:L485 | neighbors=[website-checker.tsx]
- "routes_website_checker_groups": "GROUPS" | kind=code-symbol | source=src/routes/website-checker.tsx:L447 | neighbors=[website-checker.tsx]
- "routes_website_checker_hero_categories": "HERO_CATEGORIES" | kind=code-symbol | source=src/routes/website-checker.tsx:L112 | neighbors=[website-checker.tsx]
- "routes_website_checker_skeletonbody": "SkeletonBody()" | kind=code-symbol | source=src/routes/website-checker.tsx:L424 | neighbors=[website-checker.tsx]
- "routes_website_laten_maken_assen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-assen.tsx:L8 | neighbors=[website-laten-maken-assen.tsx]
- "routes_website_laten_maken_autobedrijf_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-autobedrijf.tsx:L7 | neighbors=[website-laten-maken-autobedrijf.tsx]
- "routes_website_laten_maken_autorijschool_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-autorijschool.tsx:L7 | neighbors=[website-laten-maken-autorijschool.tsx]
- "routes_website_laten_maken_bloemist_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-bloemist.tsx:L7 | neighbors=[website-laten-maken-bloemist.tsx]
- "routes_website_laten_maken_boekhouder_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-boekhouder.tsx:L7 | neighbors=[website-laten-maken-boekhouder.tsx]
- "routes_website_laten_maken_cateringbedrijf_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-cateringbedrijf.tsx:L7 | neighbors=[website-laten-maken-cateringbedrijf.tsx]
- "routes_website_laten_maken_coevorden_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-coevorden.tsx:L11 | neighbors=[website-laten-maken-coevorden.tsx]
- "routes_website_laten_maken_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken.tsx:L8 | neighbors=[website-laten-maken.tsx]
- "routes_website_laten_maken_drachten_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-drachten.tsx:L10 | neighbors=[website-laten-maken-drachten.tsx]
- "routes_website_laten_maken_emmen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-emmen.tsx:L8 | neighbors=[website-laten-maken-emmen.tsx]
- "routes_website_laten_maken_faqs": "faqs" | kind=code-symbol | source=src/routes/website-laten-maken.tsx:L7 | neighbors=[website-laten-maken.tsx]

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
