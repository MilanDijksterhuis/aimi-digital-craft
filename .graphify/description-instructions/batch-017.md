# Node Description Batch 18 of 34

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

- "authenticated_server_downloadcsv": "downloadCsv()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L168 | neighbors=[server.tsx]
- "authenticated_server_errorbox": "ErrorBox()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L82 | neighbors=[server.tsx]
- "authenticated_server_expandablemetriccard": "ExpandableMetricCard()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L219 | neighbors=[server.tsx]
- "authenticated_server_exportbutton": "ExportButton()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L180 | neighbors=[server.tsx]
- "authenticated_server_formatdateshort": "formatDateShort()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L202 | neighbors=[server.tsx]
- "authenticated_server_formatdatetimeshort": "formatDateTimeShort()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L207 | neighbors=[server.tsx]
- "authenticated_server_formattime": "formatTime()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L45 | neighbors=[server.tsx]
- "authenticated_server_hours_options": "HOURS_OPTIONS" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L64 | neighbors=[server.tsx]
- "authenticated_server_log_levels": "LOG_LEVELS" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L70 | neighbors=[server.tsx]
- "authenticated_server_metriccard": "MetricCard()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L94 | neighbors=[server.tsx]
- "authenticated_server_serversection": "ServerSection" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L249 | neighbors=[server.tsx]
- "authenticated_server_serversidebar": "ServerSidebar()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L251 | neighbors=[server.tsx]
- "authenticated_server_skeletoncard": "SkeletonCard()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L72 | neighbors=[server.tsx]
- "authenticated_server_status_dot": "STATUS_DOT" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L58 | neighbors=[server.tsx]
- "authenticated_server_statusindicator": "StatusIndicator()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L142 | neighbors=[server.tsx]
- "authenticated_server_trendicon": "TrendIcon()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L212 | neighbors=[server.tsx]
- "components_a11ybar": "A11yBar.tsx" | kind=code-symbol | source=src/components/A11yBar.tsx:L1 | neighbors=[A11yBar()]
- "components_a11ybar_a11ybar": "A11yBar()" | kind=code-symbol | source=src/components/A11yBar.tsx:L3 | neighbors=[A11yBar.tsx]
- "components_adminchatpanel_chatrow": "ChatRow" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L15 | neighbors=[AdminChatPanel.tsx]
- "components_adminchatpanel_message": "Message" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L5 | neighbors=[AdminChatPanel.tsx]
- "components_chatwidget_message": "Message" | kind=code-symbol | source=src/components/ChatWidget.tsx:L4 | neighbors=[ChatWidget.tsx]
- "components_contact_field": "Field()" | kind=code-symbol | source=src/components/Contact.tsx:L238 | neighbors=[Contact.tsx]
- "components_contact_mode": "Mode" | kind=code-symbol | source=src/components/Contact.tsx:L8 | neighbors=[Contact.tsx]
- "components_cookiebanner_cookieprefs": "CookiePrefs" | kind=code-symbol | source=src/components/CookieBanner.tsx:L4 | neighbors=[CookieBanner.tsx]
- "components_cookiebanner_loadprefs": "loadPrefs()" | kind=code-symbol | source=src/components/CookieBanner.tsx:L12 | neighbors=[CookieBanner.tsx]
- "components_cookiebanner_saveprefs": "savePrefs()" | kind=code-symbol | source=src/components/CookieBanner.tsx:L21 | neighbors=[CookieBanner.tsx]
- "components_faq_items": "items" | kind=code-symbol | source=src/components/FAQ.tsx:L5 | neighbors=[FAQ.tsx]
- "components_leadspanel_activity_label": "ACTIVITY_LABEL" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L54 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_downloadcsv": "downloadCsv()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L96 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_fmtdate": "fmtDate()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L73 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_lastcontacttime": "lastContactTime()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L93 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_leaddetailmodal": "LeadDetailModal()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L764 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_needsaction": "needsAction()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L86 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_newleadmodal": "NewLeadModal()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L876 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_pipelinetab": "PipelineTab()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L662 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_reltime": "relTime()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L76 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_segmented": "Segmented()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L693 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_sortkey": "SortKey" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L66 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_sorts": "SORTS" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L60 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_statcard": "StatCard()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L724 | neighbors=[LeadsPanel.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-017.json

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
