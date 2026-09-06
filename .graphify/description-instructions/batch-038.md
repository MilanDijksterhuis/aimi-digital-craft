# Node Description Batch 39 of 49

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

- "routes_meer_diensten_root": "ROOT" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L88 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_service": "Service" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L20 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_services": "SERVICES" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L23 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_splitquad": "splitQuad()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L110 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_store": "Store" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L328 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_surge": "Surge" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L122 | neighbors=[meer-diensten.tsx]
- "routes_onderhoud_hosting_data": "data" | kind=code-symbol | source=src/routes/onderhoud-hosting.tsx:L8 | neighbors=[onderhoud-hosting.tsx]
- "routes_onderhoud_hosting_faqs": "faqs" | kind=code-symbol | source=src/routes/onderhoud-hosting.tsx:L7 | neighbors=[onderhoud-hosting.tsx]
- "routes_over_ons_overons": "OverOns()" | kind=code-symbol | source=src/routes/over-ons.tsx:L62 | neighbors=[over-ons.tsx]
- "routes_over_ons_stats": "stats" | kind=code-symbol | source=src/routes/over-ons.tsx:L8 | neighbors=[over-ons.tsx]
- "routes_over_ons_values": "values" | kind=code-symbol | source=src/routes/over-ons.tsx:L15 | neighbors=[over-ons.tsx]
- "routes_privacybeleid_privacypage": "PrivacyPage()" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L27 | neighbors=[privacybeleid.tsx]
- "routes_root_errorcomponent": "ErrorComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L59 | neighbors=[__root.tsx]
- "routes_root_notfoundcomponent": "NotFoundComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L29 | neighbors=[__root.tsx]
- "routes_root_rootcomponent": "RootComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L294 | neighbors=[__root.tsx]
- "routes_root_rootshell": "RootShell()" | kind=code-symbol | source=src/routes/__root.tsx:L277 | neighbors=[__root.tsx]
- "routes_seo_faqs": "faqs" | kind=code-symbol | source=src/routes/seo.tsx:L84 | neighbors=[seo.tsx]
- "routes_seo_included": "included" | kind=code-symbol | source=src/routes/seo.tsx:L29 | neighbors=[seo.tsx]
- "routes_seo_notpromised": "notPromised" | kind=code-symbol | source=src/routes/seo.tsx:L69 | neighbors=[seo.tsx]
- "routes_seo_seopage": "SeoPage()" | kind=code-symbol | source=src/routes/seo.tsx:L161 | neighbors=[seo.tsx]
- "routes_seo_steps": "steps" | kind=code-symbol | source=src/routes/seo.tsx:L76 | neighbors=[seo.tsx]
- "routes_sitemap_xml_lastmod": "LASTMOD" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L14 | neighbors=[sitemap[.]xml.tsx]
- "routes_sitemap_xml_route": "Route" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L11 | neighbors=[sitemap[.]xml.tsx]
- "routes_sitemap_xml_sitemapentry": "SitemapEntry" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L6 | neighbors=[sitemap[.]xml.tsx]
- "routes_tarieven_comparison": "comparison" | kind=code-symbol | source=src/routes/tarieven.tsx:L111 | neighbors=[tarieven.tsx]
- "routes_tarieven_faqs": "faqs" | kind=code-symbol | source=src/routes/tarieven.tsx:L144 | neighbors=[tarieven.tsx]
- "routes_tarieven_included": "included" | kind=code-symbol | source=src/routes/tarieven.tsx:L95 | neighbors=[tarieven.tsx]
- "routes_tarieven_notincluded": "notIncluded" | kind=code-symbol | source=src/routes/tarieven.tsx:L104 | neighbors=[tarieven.tsx]
- "routes_tarieven_recurring": "recurring" | kind=code-symbol | source=src/routes/tarieven.tsx:L78 | neighbors=[tarieven.tsx]
- "routes_tarieven_tarievenpage": "TarievenPage()" | kind=code-symbol | source=src/routes/tarieven.tsx:L256 | neighbors=[tarieven.tsx]
- "routes_tarieven_tier": "Tier" | kind=code-symbol | source=src/routes/tarieven.tsx:L21 | neighbors=[tarieven.tsx]
- "routes_tarieven_tiers": "tiers" | kind=code-symbol | source=src/routes/tarieven.tsx:L31 | neighbors=[tarieven.tsx]
- "routes_track_js_cors": "cors" | kind=code-symbol | source=src/routes/track[.]js.tsx:L3 | neighbors=[track[.]js.tsx]
- "routes_track_js_route": "Route" | kind=code-symbol | source=src/routes/track[.]js.tsx:L11 | neighbors=[track[.]js.tsx]
- "routes_webdesign_locations": "locations" | kind=code-symbol | source=src/routes/webdesign.tsx:L13 | neighbors=[webdesign.tsx]
- "routes_webshop_laten_maken_data": "data" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L8 | neighbors=[webshop-laten-maken.tsx]
- "routes_webshop_laten_maken_faqs": "faqs" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L7 | neighbors=[webshop-laten-maken.tsx]
- "routes_website_checker_buildcheckmap": "buildCheckMap()" | kind=code-symbol | source=src/routes/website-checker.tsx:L125 | neighbors=[website-checker.tsx]
- "routes_website_checker_categorybar": "CategoryBar()" | kind=code-symbol | source=src/routes/website-checker.tsx:L404 | neighbors=[website-checker.tsx]
- "routes_website_checker_checkssection": "ChecksSection()" | kind=code-symbol | source=src/routes/website-checker.tsx:L493 | neighbors=[website-checker.tsx]

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
