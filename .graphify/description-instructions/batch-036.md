# Node Description Batch 37 of 46

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

- "routes_meer_diensten_red": "RED()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L15 | neighbors=[meer-diensten.tsx]
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
- "routes_privacybeleid_privacypage": "PrivacyPage()" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L19 | neighbors=[privacybeleid.tsx]
- "routes_root_errorcomponent": "ErrorComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L50 | neighbors=[__root.tsx]
- "routes_root_notfoundcomponent": "NotFoundComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L20 | neighbors=[__root.tsx]
- "routes_root_rootcomponent": "RootComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L252 | neighbors=[__root.tsx]
- "routes_root_rootshell": "RootShell()" | kind=code-symbol | source=src/routes/__root.tsx:L235 | neighbors=[__root.tsx]
- "routes_sitemap_xml_lastmod": "LASTMOD" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L14 | neighbors=[sitemap[.]xml.tsx]
- "routes_sitemap_xml_route": "Route" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L11 | neighbors=[sitemap[.]xml.tsx]
- "routes_sitemap_xml_sitemapentry": "SitemapEntry" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L6 | neighbors=[sitemap[.]xml.tsx]
- "routes_track_js_cors": "cors" | kind=code-symbol | source=src/routes/track[.]js.tsx:L3 | neighbors=[track[.]js.tsx]
- "routes_track_js_route": "Route" | kind=code-symbol | source=src/routes/track[.]js.tsx:L11 | neighbors=[track[.]js.tsx]
- "routes_webdesign_locations": "locations" | kind=code-symbol | source=src/routes/webdesign.tsx:L13 | neighbors=[webdesign.tsx]
- "routes_webshop_laten_maken_data": "data" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L8 | neighbors=[webshop-laten-maken.tsx]
- "routes_webshop_laten_maken_faqs": "faqs" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L7 | neighbors=[webshop-laten-maken.tsx]
- "routes_website_laten_maken_assen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-assen.tsx:L8 | neighbors=[website-laten-maken-assen.tsx]
- "routes_website_laten_maken_coevorden_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-coevorden.tsx:L11 | neighbors=[website-laten-maken-coevorden.tsx]
- "routes_website_laten_maken_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken.tsx:L8 | neighbors=[website-laten-maken.tsx]
- "routes_website_laten_maken_drachten_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-drachten.tsx:L10 | neighbors=[website-laten-maken-drachten.tsx]
- "routes_website_laten_maken_emmen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-emmen.tsx:L8 | neighbors=[website-laten-maken-emmen.tsx]
- "routes_website_laten_maken_faqs": "faqs" | kind=code-symbol | source=src/routes/website-laten-maken.tsx:L7 | neighbors=[website-laten-maken.tsx]
- "routes_website_laten_maken_groningen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-groningen.tsx:L8 | neighbors=[website-laten-maken-groningen.tsx]
- "routes_website_laten_maken_heerenveen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-heerenveen.tsx:L10 | neighbors=[website-laten-maken-heerenveen.tsx]
- "routes_website_laten_maken_hoogeveen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-hoogeveen.tsx:L12 | neighbors=[website-laten-maken-hoogeveen.tsx]
- "routes_website_laten_maken_hoogezand_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-hoogezand.tsx:L8 | neighbors=[website-laten-maken-hoogezand.tsx]
- "routes_website_laten_maken_hovenier_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-hovenier.tsx:L7 | neighbors=[website-laten-maken-hovenier.tsx]
- "routes_website_laten_maken_kapsalon_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-kapsalon.tsx:L7 | neighbors=[website-laten-maken-kapsalon.tsx]
- "routes_website_laten_maken_klusbedrijf_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-klusbedrijf.tsx:L7 | neighbors=[website-laten-maken-klusbedrijf.tsx]
- "routes_website_laten_maken_leeuwarden_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-leeuwarden.tsx:L10 | neighbors=[website-laten-maken-leeuwarden.tsx]
- "routes_website_laten_maken_loodgieter_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-loodgieter.tsx:L7 | neighbors=[website-laten-maken-loodgieter.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-036.json

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
