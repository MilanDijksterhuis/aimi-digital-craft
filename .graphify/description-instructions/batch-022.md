# Node Description Batch 23 of 32

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

- "lib_email_server_transporter": "transporter" | kind=code-symbol | source=src/lib/email.server.ts:L3 | neighbors=[email.server.ts]
- "lib_error_capture_record": "record()" | kind=code-symbol | source=src/lib/error-capture.ts:L7 | neighbors=[error-capture.ts]
- "lib_monitoring_functions_admin_like": "ADMIN_LIKE" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L4 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L8 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getalerts": "getAlerts" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L92 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getdailychecklatest": "getDailyCheckLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L74 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_gethetznercostshistory": "getHetznerCostsHistory" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L125 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_gethetznercostslatest": "getHetznerCostsLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L118 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getlogsexportcsv": "getLogsExportCsv" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L148 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmetricscompareweeks": "getMetricsCompareWeeks" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L133 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmetricsexportcsv": "getMetricsExportCsv" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L140 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringhistory": "getMonitoringHistory" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L66 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringlatest": "getMonitoringLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L59 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringlogs": "getMonitoringLogs" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L81 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getsshloginslatest": "getSshLoginsLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L111 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_monitoringfetch": "monitoringFetch()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L14 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_monitoringfetchtext": "monitoringFetchText()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L37 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_resolvealert": "resolveAlert" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L103 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_shared_computemonitoringstats": "computeMonitoringStats()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L88 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_dayuptime": "DayUptime" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L72 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_monitoringstats": "MonitoringStats" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L80 | neighbors=[monitoring.shared.ts]
- "lib_portal_functions_assertownproject": "assertOwnProject()" | kind=code-symbol | source=src/lib/portal.functions.ts:L554 | neighbors=[portal.functions.ts]
- "lib_portal_functions_cancelmychange": "cancelMyChange" | kind=code-symbol | source=src/lib/portal.functions.ts:L287 | neighbors=[portal.functions.ts]
- "lib_portal_functions_getattachmenturl": "getAttachmentUrl" | kind=code-symbol | source=src/lib/portal.functions.ts:L513 | neighbors=[portal.functions.ts]
- "lib_portal_functions_getmydashboard": "getMyDashboard" | kind=code-symbol | source=src/lib/portal.functions.ts:L7 | neighbors=[portal.functions.ts]
- "lib_portal_functions_loglogin": "logLogin" | kind=code-symbol | source=src/lib/portal.functions.ts:L223 | neighbors=[portal.functions.ts]
- "lib_portal_functions_markallnotificationsread": "markAllNotificationsRead" | kind=code-symbol | source=src/lib/portal.functions.ts:L453 | neighbors=[portal.functions.ts]
- "lib_portal_functions_marknotificationread": "markNotificationRead" | kind=code-symbol | source=src/lib/portal.functions.ts:L439 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalcompleteonboarding": "portalCompleteOnboarding" | kind=code-symbol | source=src/lib/portal.functions.ts:L211 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetonboardingstate": "portalGetOnboardingState" | kind=code-symbol | source=src/lib/portal.functions.ts:L145 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetproject": "portalGetProject" | kind=code-symbol | source=src/lib/portal.functions.ts:L606 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetprojectmonitoring": "portalGetProjectMonitoring" | kind=code-symbol | source=src/lib/portal.functions.ts:L621 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmilestonedependencies": "portalListMilestoneDependencies" | kind=code-symbol | source=src/lib/portal.functions.ts:L689 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmyprojects": "portalListMyProjects" | kind=code-symbol | source=src/lib/portal.functions.ts:L575 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmyprojectsforchangeform": "portalListMyProjectsForChangeForm" | kind=code-symbol | source=src/lib/portal.functions.ts:L593 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistprojectmilestones": "portalListProjectMilestones" | kind=code-symbol | source=src/lib/portal.functions.ts:L674 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistprojectnotes": "portalListProjectNotes" | kind=code-symbol | source=src/lib/portal.functions.ts:L710 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalsaveonboardingstep": "portalSaveOnboardingStep" | kind=code-symbol | source=src/lib/portal.functions.ts:L160 | neighbors=[portal.functions.ts]
- "lib_portal_functions_postcustomercomment": "postCustomerComment" | kind=code-symbol | source=src/lib/portal.functions.ts:L465 | neighbors=[portal.functions.ts]
- "lib_portal_functions_requestextracredits": "requestExtraCredits" | kind=code-symbol | source=src/lib/portal.functions.ts:L427 | neighbors=[portal.functions.ts]

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
