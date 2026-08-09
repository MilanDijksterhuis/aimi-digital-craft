# Node Description Batch 34 of 42

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

- "migrations_20260717170000_perf2_site_ping_counts_public_site_ping_counts": "public.site_ping_counts()" | kind=code-symbol | source=supabase/migrations/20260717170000_perf2_site_ping_counts.sql:L14 | neighbors=[20260717170000_perf2_site_ping_counts.s…]
- "migrations_20260717180000_perf3_project_last_activity_public_project_last_activity": "public.project_last_activity()" | kind=code-symbol | source=supabase/migrations/20260717180000_perf3_project_last_activity.sql:L9 | neighbors=[20260717180000_perf3_project_last_activ…]
- "public_site_error_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L6 | neighbors=[site-error.ts]
- "public_site_error_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L12 | neighbors=[site-error.ts]
- "public_site_ping_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L6 | neighbors=[site-ping.ts]
- "public_site_ping_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L12 | neighbors=[site-ping.ts]
- "routes_algemene_voorwaarden_voorwaardenpage": "VoorwaardenPage()" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L15 | neighbors=[algemene-voorwaarden.tsx]
- "routes_authenticated_accountmenu": "AccountMenu()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L148 | neighbors=[_authenticated.tsx]
- "routes_authenticated_authlayout": "AuthLayout()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L34 | neighbors=[_authenticated.tsx]
- "routes_authenticated_inner": "Inner()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L42 | neighbors=[_authenticated.tsx]
- "routes_contact_contactpage": "ContactPage()" | kind=code-symbol | source=src/routes/contact.tsx:L60 | neighbors=[contact.tsx]
- "routes_faq_faqpage": "FaqPage()" | kind=code-symbol | source=src/routes/faq.tsx:L24 | neighbors=[faq.tsx]
- "routes_index_index": "Index()" | kind=code-symbol | source=src/routes/index.tsx:L77 | neighbors=[index.tsx]
- "routes_login_loginpage": "LoginPage()" | kind=code-symbol | source=src/routes/login.tsx:L18 | neighbors=[login.tsx]
- "routes_meer_diensten_bloom": "Bloom" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L121 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_branch": "Branch" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L120 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_embergroup": "EmberGroup" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L123 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_fork": "FORK" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L89 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_pt": "Pt" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L91 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_qpoint": "qPoint()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L93 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_qtangent": "qTangent()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L100 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_red": "RED()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L15 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_root": "ROOT" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L88 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_service": "Service" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L20 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_services": "SERVICES" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L34 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_splitquad": "splitQuad()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L110 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_store": "Store" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L328 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_surge": "Surge" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L122 | neighbors=[meer-diensten.tsx]
- "routes_onderhoud_hosting_data": "data" | kind=code-symbol | source=src/routes/onderhoud-hosting.tsx:L26 | neighbors=[onderhoud-hosting.tsx]
- "routes_onderhoud_hosting_faqs": "faqs" | kind=code-symbol | source=src/routes/onderhoud-hosting.tsx:L7 | neighbors=[onderhoud-hosting.tsx]
- "routes_over_ons_overons": "OverOns()" | kind=code-symbol | source=src/routes/over-ons.tsx:L54 | neighbors=[over-ons.tsx]
- "routes_over_ons_stats": "stats" | kind=code-symbol | source=src/routes/over-ons.tsx:L7 | neighbors=[over-ons.tsx]
- "routes_over_ons_values": "values" | kind=code-symbol | source=src/routes/over-ons.tsx:L14 | neighbors=[over-ons.tsx]
- "routes_privacybeleid_privacypage": "PrivacyPage()" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L15 | neighbors=[privacybeleid.tsx]
- "routes_root_errorcomponent": "ErrorComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L40 | neighbors=[__root.tsx]
- "routes_root_notfoundcomponent": "NotFoundComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L18 | neighbors=[__root.tsx]
- "routes_root_rootcomponent": "RootComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L175 | neighbors=[__root.tsx]
- "routes_root_rootshell": "RootShell()" | kind=code-symbol | source=src/routes/__root.tsx:L161 | neighbors=[__root.tsx]
- "routes_sitemap_xml_lastmod": "LASTMOD" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L14 | neighbors=[sitemap[.]xml.tsx]
- "routes_sitemap_xml_route": "Route" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L16 | neighbors=[sitemap[.]xml.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-033.json

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
