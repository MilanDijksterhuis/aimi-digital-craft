# Node Description Batch 24 of 34

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

- "lib_admin_functions_project_status_values": "PROJECT_STATUS_VALUES" | kind=code-symbol | source=src/lib/admin.functions.ts:L1452 | neighbors=[admin.functions.ts]
- "lib_admin_functions_staff_base_roles": "STAFF_BASE_ROLES" | kind=code-symbol | source=src/lib/admin.functions.ts:L19 | neighbors=[admin.functions.ts]
- "lib_admin_functions_staff_roles_srv": "STAFF_ROLES_SRV" | kind=code-symbol | source=src/lib/admin.functions.ts:L18 | neighbors=[admin.functions.ts]
- "lib_admin_server_admingeneraterecoverylink": "adminGenerateRecoveryLink()" | kind=code-symbol | source=src/lib/admin.server.ts:L84 | neighbors=[admin.server.ts]
- "lib_admin_server_admingetcustomerdetail": "adminGetCustomerDetail()" | kind=code-symbol | source=src/lib/admin.server.ts:L186 | neighbors=[admin.server.ts]
- "lib_admin_server_admingetgrowthmetrics": "adminGetGrowthMetrics()" | kind=code-symbol | source=src/lib/admin.server.ts:L108 | neighbors=[admin.server.ts]
- "lib_admin_server_adminlistcustomers": "adminListCustomers()" | kind=code-symbol | source=src/lib/admin.server.ts:L34 | neighbors=[admin.server.ts]
- "lib_admin_server_adminliststaffmembers": "adminListStaffMembers()" | kind=code-symbol | source=src/lib/admin.server.ts:L235 | neighbors=[admin.server.ts]
- "lib_admin_server_adminremovestaffroles": "adminRemoveStaffRoles()" | kind=code-symbol | source=src/lib/admin.server.ts:L315 | neighbors=[admin.server.ts]
- "lib_admin_server_adminreplacerole": "adminReplaceRole()" | kind=code-symbol | source=src/lib/admin.server.ts:L303 | neighbors=[admin.server.ts]
- "lib_admin_server_adminsetuserpassword": "adminSetUserPassword()" | kind=code-symbol | source=src/lib/admin.server.ts:L94 | neighbors=[admin.server.ts]
- "lib_admin_server_adminupdateuseremail": "adminUpdateUserEmail()" | kind=code-symbol | source=src/lib/admin.server.ts:L101 | neighbors=[admin.server.ts]
- "lib_admin_server_staff": "STAFF" | kind=code-symbol | source=src/lib/admin.server.ts:L226 | neighbors=[admin.server.ts]
- "lib_contact_functions_admin_like": "ADMIN_LIKE" | kind=code-symbol | source=src/lib/contact.functions.ts:L7 | neighbors=[contact.functions.ts]
- "lib_contact_functions_admindeletecontactsubmission": "adminDeleteContactSubmission" | kind=code-symbol | source=src/lib/contact.functions.ts:L73 | neighbors=[contact.functions.ts]
- "lib_contact_functions_adminlistcontactsubmissions": "adminListContactSubmissions" | kind=code-symbol | source=src/lib/contact.functions.ts:L46 | neighbors=[contact.functions.ts]
- "lib_contact_functions_admintogglecontacthandled": "adminToggleContactHandled" | kind=code-symbol | source=src/lib/contact.functions.ts:L59 | neighbors=[contact.functions.ts]
- "lib_contact_functions_ensurestaff": "ensureStaff()" | kind=code-symbol | source=src/lib/contact.functions.ts:L9 | neighbors=[contact.functions.ts]
- "lib_contact_functions_staff_roles": "STAFF_ROLES" | kind=code-symbol | source=src/lib/contact.functions.ts:L6 | neighbors=[contact.functions.ts]
- "lib_contact_functions_submitcontactform": "submitContactForm" | kind=code-symbol | source=src/lib/contact.functions.ts:L16 | neighbors=[contact.functions.ts]
- "lib_csv_csvparseresult": "CsvParseResult" | kind=code-symbol | source=src/lib/csv.ts:L97 | neighbors=[csv.ts]
- "lib_csv_header_aliases": "HEADER_ALIASES" | kind=code-symbol | source=src/lib/csv.ts:L81 | neighbors=[csv.ts]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-023.json

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
