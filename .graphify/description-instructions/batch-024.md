# Node Description Batch 25 of 35

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

- "lib_csv_norm": "norm()" | kind=code-symbol | source=src/lib/csv.ts:L78 | neighbors=[csv.ts]
- "lib_csv_parsedlead": "ParsedLead" | kind=code-symbol | source=src/lib/csv.ts:L90 | neighbors=[csv.ts]
- "lib_csv_true_values": "TRUE_VALUES" | kind=code-symbol | source=src/lib/csv.ts:L88 | neighbors=[csv.ts]
- "lib_email_server_transporter": "transporter" | kind=code-symbol | source=src/lib/email.server.ts:L15 | neighbors=[email.server.ts]
- "lib_error_capture_record": "record()" | kind=code-symbol | source=src/lib/error-capture.ts:L7 | neighbors=[error-capture.ts]
- "lib_monitoring_functions_admin_like": "ADMIN_LIKE" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L12 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L16 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getalerts": "getAlerts" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L102 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getdailychecklatest": "getDailyCheckLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L82 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_gethetznercostshistory": "getHetznerCostsHistory" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L137 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_gethetznercostslatest": "getHetznerCostsLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L130 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getlogsexportcsv": "getLogsExportCsv" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L160 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmetricscompareweeks": "getMetricsCompareWeeks" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L145 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmetricsexportcsv": "getMetricsExportCsv" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L152 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringhistory": "getMonitoringHistory" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L74 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringlatest": "getMonitoringLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L67 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringlogs": "getMonitoringLogs" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L89 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getsshloginslatest": "getSshLoginsLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L123 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_hours": "HOURS" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L8 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_limit": "LIMIT" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L10 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_log_level": "LOG_LEVEL" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L7 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_monitoringfetch": "monitoringFetch()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L22 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_monitoringfetchtext": "monitoringFetchText()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L45 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_months": "MONTHS" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L9 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_resolvealert": "resolveAlert" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L115 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_shared_computemonitoringstats": "computeMonitoringStats()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L88 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_dayuptime": "DayUptime" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L72 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_monitoringstats": "MonitoringStats" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L80 | neighbors=[monitoring.shared.ts]
- "lib_portal_functions_assertownproject": "assertOwnProject()" | kind=code-symbol | source=src/lib/portal.functions.ts:L575 | neighbors=[portal.functions.ts]
- "lib_portal_functions_cancelmychange": "cancelMyChange" | kind=code-symbol | source=src/lib/portal.functions.ts:L312 | neighbors=[portal.functions.ts]
- "lib_portal_functions_getattachmenturl": "getAttachmentUrl" | kind=code-symbol | source=src/lib/portal.functions.ts:L534 | neighbors=[portal.functions.ts]
- "lib_portal_functions_getmydashboard": "getMyDashboard" | kind=code-symbol | source=src/lib/portal.functions.ts:L7 | neighbors=[portal.functions.ts]
- "lib_portal_functions_loglogin": "logLogin" | kind=code-symbol | source=src/lib/portal.functions.ts:L248 | neighbors=[portal.functions.ts]
- "lib_portal_functions_markallnotificationsread": "markAllNotificationsRead" | kind=code-symbol | source=src/lib/portal.functions.ts:L478 | neighbors=[portal.functions.ts]
- "lib_portal_functions_marknotificationread": "markNotificationRead" | kind=code-symbol | source=src/lib/portal.functions.ts:L464 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalcompleteonboarding": "portalCompleteOnboarding" | kind=code-symbol | source=src/lib/portal.functions.ts:L211 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalcompletetutorial": "portalCompleteTutorial" | kind=code-symbol | source=src/lib/portal.functions.ts:L236 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetonboardingstate": "portalGetOnboardingState" | kind=code-symbol | source=src/lib/portal.functions.ts:L145 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetproject": "portalGetProject" | kind=code-symbol | source=src/lib/portal.functions.ts:L627 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetprojectmonitoring": "portalGetProjectMonitoring" | kind=code-symbol | source=src/lib/portal.functions.ts:L642 | neighbors=[portal.functions.ts]

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
