# Node Description Batch 40 of 49

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
- "routes_website_laten_maken_groningen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-groningen.tsx:L8 | neighbors=[website-laten-maken-groningen.tsx]
- "routes_website_laten_maken_heerenveen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-heerenveen.tsx:L10 | neighbors=[website-laten-maken-heerenveen.tsx]
- "routes_website_laten_maken_hoogeveen_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-hoogeveen.tsx:L12 | neighbors=[website-laten-maken-hoogeveen.tsx]
- "routes_website_laten_maken_hoogezand_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-hoogezand.tsx:L8 | neighbors=[website-laten-maken-hoogezand.tsx]
- "routes_website_laten_maken_hovenier_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-hovenier.tsx:L7 | neighbors=[website-laten-maken-hovenier.tsx]
- "routes_website_laten_maken_kapsalon_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-kapsalon.tsx:L7 | neighbors=[website-laten-maken-kapsalon.tsx]
- "routes_website_laten_maken_klusbedrijf_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-klusbedrijf.tsx:L7 | neighbors=[website-laten-maken-klusbedrijf.tsx]
- "routes_website_laten_maken_leeuwarden_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-leeuwarden.tsx:L10 | neighbors=[website-laten-maken-leeuwarden.tsx]
- "routes_website_laten_maken_loodgieter_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-loodgieter.tsx:L7 | neighbors=[website-laten-maken-loodgieter.tsx]
- "routes_website_laten_maken_makelaar_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-makelaar.tsx:L7 | neighbors=[website-laten-maken-makelaar.tsx]
- "routes_website_laten_maken_meppel_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-meppel.tsx:L11 | neighbors=[website-laten-maken-meppel.tsx]
- "routes_website_laten_maken_nagelstudio_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-nagelstudio.tsx:L7 | neighbors=[website-laten-maken-nagelstudio.tsx]
- "routes_website_laten_maken_pedicure_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-pedicure.tsx:L7 | neighbors=[website-laten-maken-pedicure.tsx]
- "routes_website_laten_maken_restaurant_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-restaurant.tsx:L7 | neighbors=[website-laten-maken-restaurant.tsx]
- "routes_website_laten_maken_roden_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-roden.tsx:L11 | neighbors=[website-laten-maken-roden.tsx]
- "routes_website_laten_maken_schilder_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-schilder.tsx:L7 | neighbors=[website-laten-maken-schilder.tsx]
- "routes_website_laten_maken_schoonheidssalon_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-schoonheidssalon.tsx:L7 | neighbors=[website-laten-maken-schoonheidssalon.tsx]
- "routes_website_laten_maken_sneek_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-sneek.tsx:L10 | neighbors=[website-laten-maken-sneek.tsx]
- "routes_website_laten_maken_stadskanaal_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-stadskanaal.tsx:L8 | neighbors=[website-laten-maken-stadskanaal.tsx]
- "routes_website_laten_maken_veendam_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-veendam.tsx:L21 | neighbors=[website-laten-maken-veendam.tsx]
- "routes_website_laten_maken_winschoten_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-winschoten.tsx:L8 | neighbors=[website-laten-maken-winschoten.tsx]
- "routes_website_laten_vernieuwen_faqs": "faqs" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L70 | neighbors=[website-laten-vernieuwen.tsx]

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
