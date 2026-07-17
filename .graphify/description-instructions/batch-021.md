# Node Description Batch 22 of 35

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

- "lib_admin_functions_admindeleteappointment": "adminDeleteAppointment" | kind=code-symbol | source=src/lib/admin.functions.ts:L857 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletecontactmoment": "adminDeleteContactMoment" | kind=code-symbol | source=src/lib/admin.functions.ts:L934 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletecost": "adminDeleteCost" | kind=code-symbol | source=src/lib/admin.functions.ts:L692 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletelead": "adminDeleteLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3217 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletemilestonedependency": "adminDeleteMilestoneDependency" | kind=code-symbol | source=src/lib/admin.functions.ts:L2280 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteonboardingitem": "adminDeleteOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L744 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteproject": "adminDeleteProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1535 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectcontact": "adminDeleteProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L1924 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectmilestone": "adminDeleteProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1766 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectnote": "adminDeleteProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1844 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttask": "adminDeleteProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2094 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttemplate": "adminDeleteProjectTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2371 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttimeentry": "adminDeleteProjectTimeEntry" | kind=code-symbol | source=src/lib/admin.functions.ts:L2174 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleterole": "adminDeleteRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2914 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletesnippet": "adminDeleteSnippet" | kind=code-symbol | source=src/lib/admin.functions.ts:L776 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminexportprojecttimeentriescsv": "adminExportProjectTimeEntriesCsv" | kind=code-symbol | source=src/lib/admin.functions.ts:L2192 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetallalerts": "adminGetAllAlerts" | kind=code-symbol | source=src/lib/admin.functions.ts:L2720 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetauditlog": "adminGetAuditLog" | kind=code-symbol | source=src/lib/admin.functions.ts:L1134 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetchangedetail": "adminGetChangeDetail" | kind=code-symbol | source=src/lib/admin.functions.ts:L330 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetcustomer": "adminGetCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L70 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetcustomermonitoring": "adminGetCustomerMonitoring" | kind=code-symbol | source=src/lib/admin.functions.ts:L2644 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingethealthscores": "adminGetHealthScores" | kind=code-symbol | source=src/lib/admin.functions.ts:L980 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetleadactivities": "adminGetLeadActivities" | kind=code-symbol | source=src/lib/admin.functions.ts:L3050 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetmyeffectivepermissions": "adminGetMyEffectivePermissions" | kind=code-symbol | source=src/lib/admin.functions.ts:L2778 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetmyroles": "adminGetMyRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L1056 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetoverview": "adminGetOverview" | kind=code-symbol | source=src/lib/admin.functions.ts:L39 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetproject": "adminGetProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1575 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetprojectsdashboardwidgets": "adminGetProjectsDashboardWidgets" | kind=code-symbol | source=src/lib/admin.functions.ts:L2468 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetrole": "adminGetRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2815 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetrolepermissions": "adminGetRolePermissions" | kind=code-symbol | source=src/lib/admin.functions.ts:L2758 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetsitestats": "adminGetSiteStats" | kind=code-symbol | source=src/lib/admin.functions.ts:L962 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingrantcredits": "adminGrantCredits" | kind=code-symbol | source=src/lib/admin.functions.ts:L553 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminharddeletechange": "adminHardDeleteChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1224 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminimportleads": "adminImportLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3093 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admininvitestaff": "adminInviteStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1073 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistallchanges": "adminListAllChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1013 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistappointments": "adminListAppointments" | kind=code-symbol | source=src/lib/admin.functions.ts:L809 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistchanges": "adminListChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L436 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistcontactmoments": "adminListContactMoments" | kind=code-symbol | source=src/lib/admin.functions.ts:L893 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistdeletedchanges": "adminListDeletedChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1237 | neighbors=[admin.functions.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-021.json

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
