# Node Description Batch 25 of 47

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

- "authenticated_portal_filterkey": "FilterKey" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L97 | neighbors=[portal.tsx]
- "authenticated_portal_legacywebsitemonitoring": "LegacyWebsiteMonitoring()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L1245 | neighbors=[portal.tsx]
- "authenticated_portal_overviewsection": "OverviewSection()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L1340 | neighbors=[portal.tsx]
- "authenticated_portal_portalpage": "PortalPage()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L118 | neighbors=[portal.tsx]
- "authenticated_portal_projecten_projectid_portalprojectdetailpage": "PortalProjectDetailPage()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L148 | neighbors=[portal.projecten.$projectId.tsx]
- "authenticated_portal_projecten_projectid_projectswitcher": "ProjectSwitcher()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L63 | neighbors=[portal.projecten.$projectId.tsx]
- "authenticated_portal_projecten_projectid_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L22 | neighbors=[portal.projecten.$projectId.tsx]
- "authenticated_portal_projecten_projectid_uptimechart": "UptimeChart()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L36 | neighbors=[portal.projecten.$projectId.tsx]
- "authenticated_portal_stat": "Stat()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L775 | neighbors=[portal.tsx]
- "authenticated_portal_status_style": "STATUS_STYLE" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L76 | neighbors=[portal.tsx]
- "authenticated_portal_statusbadge": "StatusBadge()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L803 | neighbors=[portal.tsx]
- "authenticated_portal_statuskey": "StatusKey" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L65 | neighbors=[portal.tsx]
- "authenticated_portal_steps": "STEPS" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L85 | neighbors=[portal.tsx]
- "authenticated_portal_uptimechart": "UptimeChart()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L1171 | neighbors=[portal.tsx]
- "authenticated_portal_websitetab": "WebsiteTab()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L1198 | neighbors=[portal.tsx]
- "authenticated_server_disk_days_options": "DISK_DAYS_OPTIONS" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L314 | neighbors=[server.tsx]
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
- "components_adminchatpanel_chatrow": "ChatRow" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L15 | neighbors=[AdminChatPanel.tsx]
- "components_adminchatpanel_message": "Message" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L5 | neighbors=[AdminChatPanel.tsx]
- "components_analyticsloader_cookieprefs": "CookiePrefs" | kind=code-symbol | source=src/components/AnalyticsLoader.tsx:L6 | neighbors=[AnalyticsLoader.tsx]
- "components_analyticsloader_loadtrackjs": "loadTrackJs()" | kind=code-symbol | source=src/components/AnalyticsLoader.tsx:L17 | neighbors=[AnalyticsLoader.tsx]
- "components_analyticsloader_readprefs": "readPrefs()" | kind=code-symbol | source=src/components/AnalyticsLoader.tsx:L8 | neighbors=[AnalyticsLoader.tsx]
- "components_branchpage_approachsection": "ApproachSection()" | kind=code-symbol | source=src/components/BranchPage.tsx:L54 | neighbors=[BranchPage.tsx]
- "components_branchpage_branchsectionid": "BranchSectionId" | kind=code-symbol | source=src/components/BranchPage.tsx:L18 | neighbors=[BranchPage.tsx]
- "components_branchpage_faqsection": "FaqSection()" | kind=code-symbol | source=src/components/BranchPage.tsx:L73 | neighbors=[BranchPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-024.json

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
