# Node Description Batch 20 of 32

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

- "lib_admin_functions_admindeleteonboardingitem": "adminDeleteOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L772 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteproject": "adminDeleteProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1557 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectcontact": "adminDeleteProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L1946 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectmilestone": "adminDeleteProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1788 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectnote": "adminDeleteProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1866 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttask": "adminDeleteProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2098 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttemplate": "adminDeleteProjectTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2375 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttimeentry": "adminDeleteProjectTimeEntry" | kind=code-symbol | source=src/lib/admin.functions.ts:L2178 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleterole": "adminDeleteRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2955 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletesnippet": "adminDeleteSnippet" | kind=code-symbol | source=src/lib/admin.functions.ts:L804 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminexportprojecttimeentriescsv": "adminExportProjectTimeEntriesCsv" | kind=code-symbol | source=src/lib/admin.functions.ts:L2196 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetallalerts": "adminGetAllAlerts" | kind=code-symbol | source=src/lib/admin.functions.ts:L2728 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetauditlog": "adminGetAuditLog" | kind=code-symbol | source=src/lib/admin.functions.ts:L1162 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetchangedetail": "adminGetChangeDetail" | kind=code-symbol | source=src/lib/admin.functions.ts:L358 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetcustomer": "adminGetCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L117 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetcustomermonitoring": "adminGetCustomerMonitoring" | kind=code-symbol | source=src/lib/admin.functions.ts:L2652 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingethealthscores": "adminGetHealthScores" | kind=code-symbol | source=src/lib/admin.functions.ts:L1008 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetleadactivities": "adminGetLeadActivities" | kind=code-symbol | source=src/lib/admin.functions.ts:L3089 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetmyeffectivepermissions": "adminGetMyEffectivePermissions" | kind=code-symbol | source=src/lib/admin.functions.ts:L2786 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetmyroles": "adminGetMyRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L1084 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetoverview": "adminGetOverview" | kind=code-symbol | source=src/lib/admin.functions.ts:L86 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetproject": "adminGetProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1597 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetprojectsdashboardwidgets": "adminGetProjectsDashboardWidgets" | kind=code-symbol | source=src/lib/admin.functions.ts:L2472 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetrole": "adminGetRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2856 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetrolepermissions": "adminGetRolePermissions" | kind=code-symbol | source=src/lib/admin.functions.ts:L2766 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetsitestats": "adminGetSiteStats" | kind=code-symbol | source=src/lib/admin.functions.ts:L990 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingrantcredits": "adminGrantCredits" | kind=code-symbol | source=src/lib/admin.functions.ts:L581 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminharddeletechange": "adminHardDeleteChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1249 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminimportleads": "adminImportLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3132 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admininvitestaff": "adminInviteStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1101 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistallchanges": "adminListAllChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1041 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistappointments": "adminListAppointments" | kind=code-symbol | source=src/lib/admin.functions.ts:L837 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistchanges": "adminListChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L464 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistcontactmoments": "adminListContactMoments" | kind=code-symbol | source=src/lib/admin.functions.ts:L921 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistdeletedchanges": "adminListDeletedChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1261 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistleads": "adminListLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3056 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistloginevents": "adminListLoginEvents" | kind=code-symbol | source=src/lib/admin.functions.ts:L974 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistmilestonedependencies": "adminListMilestoneDependencies" | kind=code-symbol | source=src/lib/admin.functions.ts:L2238 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistpasswordresets": "adminListPasswordResets" | kind=code-symbol | source=src/lib/admin.functions.ts:L1339 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectchangerequests": "adminListProjectChangeRequests" | kind=code-symbol | source=src/lib/admin.functions.ts:L2519 | neighbors=[admin.functions.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-019.json

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
