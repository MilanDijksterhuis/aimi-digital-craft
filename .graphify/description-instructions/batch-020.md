# Node Description Batch 21 of 38

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

- "components_callbackagenda_fmtdayshort": "fmtDayShort()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L57 | neighbors=[CallbackAgenda.tsx]
- "components_callbackagenda_todayoverview": "TodayOverview()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L230 | neighbors=[CallbackAgenda.tsx]
- "components_callbackagenda_viewmode": "ViewMode" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L60 | neighbors=[CallbackAgenda.tsx]
- "components_callbackagenda_weekview": "WeekView()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L361 | neighbors=[CallbackAgenda.tsx]
- "components_callbackschedulemodal_callbackschedulemodal": "CallbackScheduleModal()" | kind=code-symbol | source=src/components/CallbackScheduleModal.tsx:L137 | neighbors=[CallbackScheduleModal.tsx]
- "components_callbackschedulemodal_callbackschedulevalue": "CallbackScheduleValue" | kind=code-symbol | source=src/components/CallbackScheduleModal.tsx:L5 | neighbors=[CallbackScheduleModal.tsx]
- "components_chatwidget_message": "Message" | kind=code-symbol | source=src/components/ChatWidget.tsx:L4 | neighbors=[ChatWidget.tsx]
- "components_confirmdialog_confirmcontext": "ConfirmContext" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L46 | neighbors=[ConfirmDialog.tsx]
- "components_confirmdialog_confirmcontextvalue": "ConfirmContextValue" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L41 | neighbors=[ConfirmDialog.tsx]
- "components_confirmdialog_confirmoptions": "ConfirmOptions" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L22 | neighbors=[ConfirmDialog.tsx]
- "components_confirmdialog_pending": "Pending" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L56 | neighbors=[ConfirmDialog.tsx]
- "components_confirmdialog_pendingconfirm": "PendingConfirm" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L54 | neighbors=[ConfirmDialog.tsx]
- "components_confirmdialog_pendingprompt": "PendingPrompt" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L55 | neighbors=[ConfirmDialog.tsx]
- "components_confirmdialog_promptoptions": "PromptOptions" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L30 | neighbors=[ConfirmDialog.tsx]
- "components_contact_field": "Field()" | kind=code-symbol | source=src/components/Contact.tsx:L238 | neighbors=[Contact.tsx]
- "components_contact_mode": "Mode" | kind=code-symbol | source=src/components/Contact.tsx:L8 | neighbors=[Contact.tsx]
- "components_cookiebanner_cookieprefs": "CookiePrefs" | kind=code-symbol | source=src/components/CookieBanner.tsx:L4 | neighbors=[CookieBanner.tsx]
- "components_cookiebanner_loadprefs": "loadPrefs()" | kind=code-symbol | source=src/components/CookieBanner.tsx:L12 | neighbors=[CookieBanner.tsx]
- "components_cookiebanner_saveprefs": "savePrefs()" | kind=code-symbol | source=src/components/CookieBanner.tsx:L21 | neighbors=[CookieBanner.tsx]
- "components_faq_items": "items" | kind=code-symbol | source=src/components/FAQ.tsx:L5 | neighbors=[FAQ.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-020.json

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
