# Node Description Batch 21 of 34

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

- "lib_admin_functions_adminbulksoftdelete": "adminBulkSoftDelete" | kind=code-symbol | source=src/lib/admin.functions.ts:L1206 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulkupdateleadstatus": "adminBulkUpdateLeadStatus" | kind=code-symbol | source=src/lib/admin.functions.ts:L3237 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminchangerole": "adminChangeRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L1120 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincompleteonboarding": "adminCompleteOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L228 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateappointment": "adminCreateAppointment" | kind=code-symbol | source=src/lib/admin.functions.ts:L846 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatechangeforcustomer": "adminCreateChangeForCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L1292 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatechangerequest": "adminCreateChangeRequest" | kind=code-symbol | source=src/lib/admin.functions.ts:L393 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecontactmoment": "adminCreateContactMoment" | kind=code-symbol | source=src/lib/admin.functions.ts:L932 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecustomerfn": "adminCreateCustomerFn" | kind=code-symbol | source=src/lib/admin.functions.ts:L103 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecustomrole": "adminCreateCustomRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2867 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatelead": "adminCreateLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3072 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateproject": "adminCreateProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1455 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectcontact": "adminCreateProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L1895 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectfromtemplate": "adminCreateProjectFromTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2387 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectmilestone": "adminCreateProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1702 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectnote": "adminCreateProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1817 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttask": "adminCreateProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2034 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttemplate": "adminCreateProjectTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2328 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttimeentry": "adminCreateProjectTimeEntry" | kind=code-symbol | source=src/lib/admin.functions.ts:L2148 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatesnippet": "adminCreateSnippet" | kind=code-symbol | source=src/lib/admin.functions.ts:L780 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteappointment": "adminDeleteAppointment" | kind=code-symbol | source=src/lib/admin.functions.ts:L881 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletecontactmoment": "adminDeleteContactMoment" | kind=code-symbol | source=src/lib/admin.functions.ts:L958 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletecost": "adminDeleteCost" | kind=code-symbol | source=src/lib/admin.functions.ts:L716 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletelead": "adminDeleteLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3225 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletemilestonedependency": "adminDeleteMilestoneDependency" | kind=code-symbol | source=src/lib/admin.functions.ts:L2284 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteonboardingitem": "adminDeleteOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L768 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteproject": "adminDeleteProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1557 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectcontact": "adminDeleteProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L1946 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectmilestone": "adminDeleteProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1788 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectnote": "adminDeleteProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1866 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttask": "adminDeleteProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2098 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttemplate": "adminDeleteProjectTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2375 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttimeentry": "adminDeleteProjectTimeEntry" | kind=code-symbol | source=src/lib/admin.functions.ts:L2178 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleterole": "adminDeleteRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2922 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletesnippet": "adminDeleteSnippet" | kind=code-symbol | source=src/lib/admin.functions.ts:L800 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminexportprojecttimeentriescsv": "adminExportProjectTimeEntriesCsv" | kind=code-symbol | source=src/lib/admin.functions.ts:L2196 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetallalerts": "adminGetAllAlerts" | kind=code-symbol | source=src/lib/admin.functions.ts:L2728 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetauditlog": "adminGetAuditLog" | kind=code-symbol | source=src/lib/admin.functions.ts:L1158 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetchangedetail": "adminGetChangeDetail" | kind=code-symbol | source=src/lib/admin.functions.ts:L354 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetcustomer": "adminGetCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L94 | neighbors=[admin.functions.ts]

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
