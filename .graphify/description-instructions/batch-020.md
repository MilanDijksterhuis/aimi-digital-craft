# Node Description Batch 21 of 35

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

- "lib_accounts_functions_adminsetaccounttags": "adminSetAccountTags" | kind=code-symbol | source=src/lib/accounts.functions.ts:L96 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminsetblocked": "adminSetBlocked" | kind=code-symbol | source=src/lib/accounts.functions.ts:L78 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminunarchivechange": "adminUnarchiveChange" | kind=code-symbol | source=src/lib/accounts.functions.ts:L241 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_checkmyaccess": "checkMyAccess" | kind=code-symbol | source=src/lib/accounts.functions.ts:L16 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_pinglastseen": "pingLastSeen" | kind=code-symbol | source=src/lib/accounts.functions.ts:L8 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_super": "SUPER" | kind=code-symbol | source=src/lib/accounts.functions.ts:L7 | neighbors=[accounts.functions.ts]
- "lib_accounts_server_admingetaccountdetailimpl": "adminGetAccountDetailImpl()" | kind=code-symbol | source=src/lib/accounts.server.ts:L24 | neighbors=[accounts.server.ts]
- "lib_accounts_server_adminharddeleteuserimpl": "adminHardDeleteUserImpl()" | kind=code-symbol | source=src/lib/accounts.server.ts:L65 | neighbors=[accounts.server.ts]
- "lib_accounts_server_adminlistallaccountsimpl": "adminListAllAccountsImpl()" | kind=code-symbol | source=src/lib/accounts.server.ts:L3 | neighbors=[accounts.server.ts]
- "lib_accounts_server_expireblockedaccountsimpl": "expireBlockedAccountsImpl()" | kind=code-symbol | source=src/lib/accounts.server.ts:L86 | neighbors=[accounts.server.ts]
- "lib_admin_functions_admin_like_roles": "ADMIN_LIKE_ROLES" | kind=code-symbol | source=src/lib/admin.functions.ts:L17 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminaddcost": "adminAddCost" | kind=code-symbol | source=src/lib/admin.functions.ts:L666 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminaddleadactivity": "adminAddLeadActivity" | kind=code-symbol | source=src/lib/admin.functions.ts:L3178 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminaddmilestonedependency": "adminAddMilestoneDependency" | kind=code-symbol | source=src/lib/admin.functions.ts:L2255 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminaddonboardingitem": "adminAddOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L704 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminarchiveproject": "adminArchiveProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1547 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminassigncustomrole": "adminAssignCustomRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2942 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminattachmenturl": "adminAttachmentUrl" | kind=code-symbol | source=src/lib/admin.functions.ts:L788 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulkcomplete": "adminBulkComplete" | kind=code-symbol | source=src/lib/admin.functions.ts:L869 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulkdeleteleads": "adminBulkDeleteLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3245 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulksoftdelete": "adminBulkSoftDelete" | kind=code-symbol | source=src/lib/admin.functions.ts:L1182 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminbulkupdateleadstatus": "adminBulkUpdateLeadStatus" | kind=code-symbol | source=src/lib/admin.functions.ts:L3229 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminchangerole": "adminChangeRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L1096 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincompleteonboarding": "adminCompleteOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L204 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateappointment": "adminCreateAppointment" | kind=code-symbol | source=src/lib/admin.functions.ts:L822 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatechangeforcustomer": "adminCreateChangeForCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L1268 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatechangerequest": "adminCreateChangeRequest" | kind=code-symbol | source=src/lib/admin.functions.ts:L369 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecontactmoment": "adminCreateContactMoment" | kind=code-symbol | source=src/lib/admin.functions.ts:L908 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecustomerfn": "adminCreateCustomerFn" | kind=code-symbol | source=src/lib/admin.functions.ts:L79 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatecustomrole": "adminCreateCustomRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2859 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatelead": "adminCreateLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3064 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateproject": "adminCreateProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1433 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectcontact": "adminCreateProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L1873 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectfromtemplate": "adminCreateProjectFromTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2383 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectmilestone": "adminCreateProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1680 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojectnote": "adminCreateProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1795 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttask": "adminCreateProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2030 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttemplate": "adminCreateProjectTemplate" | kind=code-symbol | source=src/lib/admin.functions.ts:L2324 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreateprojecttimeentry": "adminCreateProjectTimeEntry" | kind=code-symbol | source=src/lib/admin.functions.ts:L2144 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admincreatesnippet": "adminCreateSnippet" | kind=code-symbol | source=src/lib/admin.functions.ts:L756 | neighbors=[admin.functions.ts]

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
