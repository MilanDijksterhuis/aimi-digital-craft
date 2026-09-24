# Node Description Batch 48 of 57

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "routes_website_laten_maken_winschoten_data": "data" | kind=code-symbol | source=src/routes/website-laten-maken-winschoten.tsx:L15 | neighbors=[website-laten-maken-winschoten.tsx]
- "routes_website_laten_vernieuwen_faqs": "faqs" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L70 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_preserved": "preserved" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L62 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_signals": "signals" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L27 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_steps": "steps" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L54 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_website_laten_vernieuwen_vernieuwenpage": "VernieuwenPage()" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L143 | neighbors=[website-laten-vernieuwen.tsx]
- "routes_werkwijze_principles": "principles" | kind=code-symbol | source=src/routes/werkwijze.tsx:L37 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_standards": "standards" | kind=code-symbol | source=src/routes/werkwijze.tsx:L44 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_steps": "steps" | kind=code-symbol | source=src/routes/werkwijze.tsx:L14 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_werkwijzepage": "WerkwijzePage()" | kind=code-symbol | source=src/routes/werkwijze.tsx:L122 | neighbors=[werkwijze.tsx]
- "routes_werkwijze_werkwijzevideo": "WerkwijzeVideo()" | kind=code-symbol | source=src/routes/werkwijze.tsx:L75 | neighbors=[werkwijze.tsx]
- "routes_wordpress_of_maatwerk_choosecustom": "chooseCustom" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L73 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_choosewp": "chooseWp" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L66 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_comparison": "comparison" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L23 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_faqs": "faqs" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L80 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_row": "Row" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L21 | neighbors=[wordpress-of-maatwerk.tsx]
- "routes_wordpress_of_maatwerk_vergelijkingpage": "VergelijkingPage()" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L161 | neighbors=[wordpress-of-maatwerk.tsx]
- "scripts_check_seo_invariants_byfullpathmatch": "byFullPathMatch" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L57 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_dupes": "dupes" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L51 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_errors": "errors" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L20 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_exclude_exact": "EXCLUDE_EXACT" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L68 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_migrationfiles": "migrationFiles" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L96 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_migrationsdir": "migrationsDir" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L95 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_pagedatesmatch": "pageDatesMatch" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L29 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_pagedatesset": "pageDatesSet" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L82 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_private_prefixes": "PRIVATE_PREFIXES" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L67 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_publicstaticroutes": "publicStaticRoutes" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L74 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_readsource": "readSource()" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L22 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_root": "ROOT" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L19 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_routetreesrc": "routeTreeSrc" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L56 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_seosrc": "seoSrc" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L28 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_sitemapsrc": "sitemapSrc" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L42 | neighbors=[check-seo-invariants.mjs]
- "scripts_check_seo_invariants_staticroutepaths": "staticRoutePaths" | kind=code-symbol | source=scripts/check-seo-invariants.mjs:L94 | neighbors=[check-seo-invariants.mjs]
- "scripts_crawl_extract_handle_data": ".handle_data()" | kind=code-symbol | source=audits/aimi-development.nl-audit-2026-09-21/scripts/crawl.py:L130 | neighbors=[Extract]
- "scripts_crawl_extract_handle_endtag": ".handle_endtag()" | kind=code-symbol | source=audits/aimi-development.nl-audit-2026-09-21/scripts/crawl.py:L116 | neighbors=[Extract]
- "scripts_crawl_extract_handle_starttag": ".handle_starttag()" | kind=code-symbol | source=audits/aimi-development.nl-audit-2026-09-21/scripts/crawl.py:L75 | neighbors=[Extract]
- "scripts_crawl_extract_init": ".__init__()" | kind=code-symbol | source=audits/aimi-development.nl-audit-2026-09-21/scripts/crawl.py:L54 | neighbors=[Extract]
- "scripts_crawl_fetch": "fetch()" | kind=code-symbol | source=audits/aimi-development.nl-audit-2026-09-21/scripts/crawl.py:L16 | neighbors=[crawl.py]
- "scripts_crawl_main": "main()" | kind=code-symbol | source=audits/aimi-development.nl-audit-2026-09-21/scripts/crawl.py:L220 | neighbors=[crawl.py]
- "scripts_crawl_rationale_1": "Crawl sitemap URLs and extract on-page SEO signals into crawl-data.json." | kind=entity | source=audits/aimi-development.nl-audit-2026-09-21/scripts/crawl.py:L1 | neighbors=[crawl.py]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-047.json

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
