# Node Description Batch 23 of 42

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
- "components_adminchatpanel_chatrow": "ChatRow" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L15 | neighbors=[AdminChatPanel.tsx]
- "components_adminchatpanel_message": "Message" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L5 | neighbors=[AdminChatPanel.tsx]
- "components_callbackagenda_callbackdetailmodal": "CallbackDetailModal()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L404 | neighbors=[CallbackAgenda.tsx]
- "components_callbackagenda_dayview": "DayView()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L306 | neighbors=[CallbackAgenda.tsx]
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
- "components_footer_columns": "columns" | kind=code-symbol | source=src/components/Footer.tsx:L5 | neighbors=[Footer.tsx]
- "components_idletimeout_activity_events": "ACTIVITY_EVENTS" | kind=code-symbol | source=src/components/IdleTimeout.tsx:L19 | neighbors=[IdleTimeout.tsx]
- "components_leadspanel_activity_label": "ACTIVITY_LABEL" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L49 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_downloadcsv": "downloadCsv()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L122 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_fmtdate": "fmtDate()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L94 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_kpicard": "KpiCard()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L581 | neighbors=[LeadsPanel.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-022.json

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
