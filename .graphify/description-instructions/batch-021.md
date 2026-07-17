# Node Description Batch 22 of 34

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

- "lib_admin_functions_admindeleteprojectcontact": "adminDeleteProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L1948 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectmilestone": "adminDeleteProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1790 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectnote": "adminDeleteProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1868 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttask": "adminDeleteProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2118 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttemplate": "adminDeleteProjectTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2395 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttimeentry": "adminDeleteProjectTimeEntry" | kind=code-symbol | source=src/lib/admin.functions.ts:L2198 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleterole": "adminDeleteRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2938 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletesnippet": "adminDeleteSnippet" | kind=code-symbol | source=src/lib/admin.functions.ts:L800 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminexportprojecttimeentriescsv": "adminExportProjectTimeEntriesCsv" | kind=code-symbol | source=src/lib/admin.functions.ts:L2216 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetallalerts": "adminGetAllAlerts" | kind=code-symbol | source=src/lib/admin.functions.ts:L2744 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetauditlog": "adminGetAuditLog" | kind=code-symbol | source=src/lib/admin.functions.ts:L1158 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetchangedetail": "adminGetChangeDetail" | kind=code-symbol | source=src/lib/admin.functions.ts:L354 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetcustomer": "adminGetCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L94 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetcustomermonitoring": "adminGetCustomerMonitoring" | kind=code-symbol | source=src/lib/admin.functions.ts:L2668 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingethealthscores": "adminGetHealthScores" | kind=code-symbol | source=src/lib/admin.functions.ts:L1004 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetleadactivities": "adminGetLeadActivities" | kind=code-symbol | source=src/lib/admin.functions.ts:L3074 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetmyeffectivepermissions": "adminGetMyEffectivePermissions" | kind=code-symbol | source=src/lib/admin.functions.ts:L2802 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetmyroles": "adminGetMyRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L1080 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetoverview": "adminGetOverview" | kind=code-symbol | source=src/lib/admin.functions.ts:L63 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetproject": "adminGetProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1599 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetprojectsdashboardwidgets": "adminGetProjectsDashboardWidgets" | kind=code-symbol | source=src/lib/admin.functions.ts:L2492 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetrole": "adminGetRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2839 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetrolepermissions": "adminGetRolePermissions" | kind=code-symbol | source=src/lib/admin.functions.ts:L2782 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetsitestats": "adminGetSiteStats" | kind=code-symbol | source=src/lib/admin.functions.ts:L986 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingrantcredits": "adminGrantCredits" | kind=code-symbol | source=src/lib/admin.functions.ts:L577 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminharddeletechange": "adminHardDeleteChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1248 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminimportleads": "adminImportLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3117 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admininvitestaff": "adminInviteStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1097 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistallchanges": "adminListAllChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1037 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistappointments": "adminListAppointments" | kind=code-symbol | source=src/lib/admin.functions.ts:L833 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistchanges": "adminListChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L460 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistcontactmoments": "adminListContactMoments" | kind=code-symbol | source=src/lib/admin.functions.ts:L917 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistdeletedchanges": "adminListDeletedChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1261 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistleads": "adminListLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3041 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistloginevents": "adminListLoginEvents" | kind=code-symbol | source=src/lib/admin.functions.ts:L970 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistmilestonedependencies": "adminListMilestoneDependencies" | kind=code-symbol | source=src/lib/admin.functions.ts:L2258 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistpasswordresets": "adminListPasswordResets" | kind=code-symbol | source=src/lib/admin.functions.ts:L1339 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectchangerequests": "adminListProjectChangeRequests" | kind=code-symbol | source=src/lib/admin.functions.ts:L2535 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectcontacts": "adminListProjectContacts" | kind=code-symbol | source=src/lib/admin.functions.ts:L1882 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectmilestones": "adminListProjectMilestones" | kind=code-symbol | source=src/lib/admin.functions.ts:L1689 | neighbors=[admin.functions.ts]

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
