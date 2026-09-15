# Node Description Batch 28 of 50

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

- "components_cookiebanner_saveprefs": "savePrefs()" | kind=code-symbol | source=src/components/CookieBanner.tsx:L21 | neighbors=[CookieBanner.tsx]
- "components_faq_faq_categories": "FAQ_CATEGORIES" | kind=code-symbol | source=src/components/FAQ.tsx:L10 | neighbors=[FAQ.tsx]
- "components_faq_faqcategory": "FaqCategory" | kind=code-symbol | source=src/components/FAQ.tsx:L18 | neighbors=[FAQ.tsx]
- "components_faq_faqitem": "FaqItem" | kind=code-symbol | source=src/components/FAQ.tsx:L20 | neighbors=[FAQ.tsx]
- "components_faq_homepage_faq_questions": "HOMEPAGE_FAQ_QUESTIONS" | kind=code-symbol | source=src/components/FAQ.tsx:L154 | neighbors=[FAQ.tsx]
- "components_faq_homepagefaqitems": "homepageFaqItems" | kind=code-symbol | source=src/components/FAQ.tsx:L163 | neighbors=[FAQ.tsx]
- "components_faq_items": "items" | kind=code-symbol | source=src/components/FAQ.tsx:L5 | neighbors=[FAQ.tsx]
- "components_footer_branches": "branches" | kind=code-symbol | source=src/components/Footer.tsx:L69 | neighbors=[Footer.tsx]
- "components_footer_cities": "cities" | kind=code-symbol | source=src/components/Footer.tsx:L51 | neighbors=[Footer.tsx]
- "components_footer_columns": "columns" | kind=code-symbol | source=src/components/Footer.tsx:L6 | neighbors=[Footer.tsx]
- "components_footer_linkrow": "LinkRow()" | kind=code-symbol | source=src/components/Footer.tsx:L87 | neighbors=[Footer.tsx]
- "components_idletimeout_activity_events": "ACTIVITY_EVENTS" | kind=code-symbol | source=src/components/IdleTimeout.tsx:L19 | neighbors=[IdleTimeout.tsx]
- "components_leadspanel_activity_label": "ACTIVITY_LABEL" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L49 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_downloadcsv": "downloadCsv()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L122 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_fmtdate": "fmtDate()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L94 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_kpicard": "KpiCard()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L581 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_lastcontacttime": "lastContactTime()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L119 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_leaddetailmodal": "LeadDetailModal()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L872 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_needsaction": "needsAction()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L112 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_newleadmodal": "NewLeadModal()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L829 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_pillstyle": "pillStyle()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L66 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_pipelinetab": "PipelineTab()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L758 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_segmented": "Segmented()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L791 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_sortkey": "SortKey" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L87 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_sorts": "SORTS" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L81 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_statcard": "StatCard()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L824 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status": "Status" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L38 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L53 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_dot": "STATUS_DOT" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L63 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_hex": "STATUS_HEX" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L56 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L40 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_statuses": "STATUSES" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L37 | neighbors=[LeadsPanel.tsx]
- "components_locationlanding_locationfaq": "LocationFaq" | kind=code-symbol | source=src/components/LocationLanding.tsx:L16 | neighbors=[LocationLanding.tsx]
- "components_locationlanding_reasons": "REASONS" | kind=code-symbol | source=src/components/LocationLanding.tsx:L46 | neighbors=[LocationLanding.tsx]
- "components_locationlanding_services": "SERVICES" | kind=code-symbol | source=src/components/LocationLanding.tsx:L27 | neighbors=[LocationLanding.tsx]
- "components_locationpagev2_businesstypessection": "BusinessTypesSection()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L101 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_contextsection": "ContextSection()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L75 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_faqsection": "FaqSection()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L208 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_local_services": "LOCAL_SERVICES" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L27 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_locationsectionid": "LocationSectionId" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L22 | neighbors=[LocationPageV2.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-027.json

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
