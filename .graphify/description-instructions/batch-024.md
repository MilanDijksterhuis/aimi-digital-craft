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

- "lib_admin_server_adminupdateuseremail": "adminUpdateUserEmail()" | kind=code-symbol | source=src/lib/admin.server.ts:L101 | neighbors=[admin.server.ts]
- "lib_admin_server_staff": "STAFF" | kind=code-symbol | source=src/lib/admin.server.ts:L226 | neighbors=[admin.server.ts]
- "lib_contact_functions_admin_like": "ADMIN_LIKE" | kind=code-symbol | source=src/lib/contact.functions.ts:L7 | neighbors=[contact.functions.ts]
- "lib_contact_functions_admindeletecontactsubmission": "adminDeleteContactSubmission" | kind=code-symbol | source=src/lib/contact.functions.ts:L64 | neighbors=[contact.functions.ts]
- "lib_contact_functions_adminlistcontactsubmissions": "adminListContactSubmissions" | kind=code-symbol | source=src/lib/contact.functions.ts:L37 | neighbors=[contact.functions.ts]
- "lib_contact_functions_admintogglecontacthandled": "adminToggleContactHandled" | kind=code-symbol | source=src/lib/contact.functions.ts:L50 | neighbors=[contact.functions.ts]
- "lib_contact_functions_ensurestaff": "ensureStaff()" | kind=code-symbol | source=src/lib/contact.functions.ts:L9 | neighbors=[contact.functions.ts]
- "lib_contact_functions_staff_roles": "STAFF_ROLES" | kind=code-symbol | source=src/lib/contact.functions.ts:L6 | neighbors=[contact.functions.ts]
- "lib_contact_functions_submitcontactform": "submitContactForm" | kind=code-symbol | source=src/lib/contact.functions.ts:L7 | neighbors=[contact.functions.ts]
- "lib_csv_csvparseresult": "CsvParseResult" | kind=code-symbol | source=src/lib/csv.ts:L104 | neighbors=[csv.ts]
- "lib_csv_header_aliases": "HEADER_ALIASES" | kind=code-symbol | source=src/lib/csv.ts:L88 | neighbors=[csv.ts]
- "lib_csv_norm": "norm()" | kind=code-symbol | source=src/lib/csv.ts:L85 | neighbors=[csv.ts]
- "lib_csv_parsedlead": "ParsedLead" | kind=code-symbol | source=src/lib/csv.ts:L97 | neighbors=[csv.ts]
- "lib_csv_true_values": "TRUE_VALUES" | kind=code-symbol | source=src/lib/csv.ts:L95 | neighbors=[csv.ts]
- "lib_email_server_transporter": "transporter" | kind=code-symbol | source=src/lib/email.server.ts:L15 | neighbors=[email.server.ts]
- "lib_error_capture_record": "record()" | kind=code-symbol | source=src/lib/error-capture.ts:L7 | neighbors=[error-capture.ts]
- "lib_monitoring_functions_admin_like": "ADMIN_LIKE" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L12 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L16 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getalerts": "getAlerts" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L96 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getdailychecklatest": "getDailyCheckLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L76 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_gethetznercostshistory": "getHetznerCostsHistory" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L131 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_gethetznercostslatest": "getHetznerCostsLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L124 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getlogsexportcsv": "getLogsExportCsv" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L154 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmetricscompareweeks": "getMetricsCompareWeeks" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L139 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmetricsexportcsv": "getMetricsExportCsv" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L146 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringhistory": "getMonitoringHistory" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L68 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringlatest": "getMonitoringLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L61 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getmonitoringlogs": "getMonitoringLogs" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L83 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_getsshloginslatest": "getSshLoginsLatest" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L117 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_hours": "HOURS" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L9 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_limit": "LIMIT" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L11 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_log_level": "LOG_LEVEL" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L8 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_monitoringfetch": "monitoringFetch()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L16 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_monitoringfetchtext": "monitoringFetchText()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L39 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_months": "MONTHS" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L10 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_resolvealert": "resolveAlert" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L109 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_shared_computemonitoringstats": "computeMonitoringStats()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L88 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_dayuptime": "DayUptime" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L72 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_fetchpingrows": "fetchPingRows()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L131 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_monitoringstats": "MonitoringStats" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L80 | neighbors=[monitoring.shared.ts]

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
