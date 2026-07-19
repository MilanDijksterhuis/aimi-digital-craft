# Node Description Batch 22 of 36

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

- "lib_admin_functions_adminarchiveproject": "adminArchiveProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1676 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminassigncustomrole": "adminAssignCustomRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L3384 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminattachmenturl": "adminAttachmentUrl" | kind=code-symbol | source=src/lib/admin.functions.ts:L874 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulkcomplete": "adminBulkComplete" | kind=code-symbol | source=src/lib/admin.functions.ts:L955 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulkdeleteleads": "adminBulkDeleteLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3735 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulksoftdelete": "adminBulkSoftDelete" | kind=code-symbol | source=src/lib/admin.functions.ts:L1277 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulkupdateleadstatus": "adminBulkUpdateLeadStatus" | kind=code-symbol | source=src/lib/admin.functions.ts:L3719 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminchangerole": "adminChangeRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L1196 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincompletecallback": "adminCompleteCallback" | kind=code-symbol | source=src/lib/admin.functions.ts:L3896 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincompleteonboarding": "adminCompleteOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L257 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateappointment": "adminCreateAppointment" | kind=code-symbol | source=src/lib/admin.functions.ts:L908 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecallback": "adminCreateCallback" | kind=code-symbol | source=src/lib/admin.functions.ts:L3829 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatechangeforcustomer": "adminCreateChangeForCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L1357 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatechangerequest": "adminCreateChangeRequest" | kind=code-symbol | source=src/lib/admin.functions.ts:L446 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecontactmoment": "adminCreateContactMoment" | kind=code-symbol | source=src/lib/admin.functions.ts:L991 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecustomerfn": "adminCreateCustomerFn" | kind=code-symbol | source=src/lib/admin.functions.ts:L85 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecustomrole": "adminCreateCustomRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L3281 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatelead": "adminCreateLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3530 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateproject": "adminCreateProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1538 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectcontact": "adminCreateProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L2047 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectfromtemplate": "adminCreateProjectFromTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2623 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectmilestone": "adminCreateProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1827 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectnote": "adminCreateProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1953 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttask": "adminCreateProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2219 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttemplate": "adminCreateProjectTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2551 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttimeentry": "adminCreateProjectTimeEntry" | kind=code-symbol | source=src/lib/admin.functions.ts:L2347 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatesnippet": "adminCreateSnippet" | kind=code-symbol | source=src/lib/admin.functions.ts:L842 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteappointment": "adminDeleteAppointment" | kind=code-symbol | source=src/lib/admin.functions.ts:L943 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletecallback": "adminDeleteCallback" | kind=code-symbol | source=src/lib/admin.functions.ts:L3964 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletecontactmoment": "adminDeleteContactMoment" | kind=code-symbol | source=src/lib/admin.functions.ts:L1017 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletecost": "adminDeleteCost" | kind=code-symbol | source=src/lib/admin.functions.ts:L780 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletelead": "adminDeleteLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3704 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeletemilestonedependency": "adminDeleteMilestoneDependency" | kind=code-symbol | source=src/lib/admin.functions.ts:L2500 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteonboardingitem": "adminDeleteOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L830 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteproject": "adminDeleteProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1661 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectcontact": "adminDeleteProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L2107 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectmilestone": "adminDeleteProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1917 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojectnote": "adminDeleteProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L2011 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttask": "adminDeleteProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2287 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admindeleteprojecttemplate": "adminDeleteProjectTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2606 | neighbors=[admin.functions.ts]

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
