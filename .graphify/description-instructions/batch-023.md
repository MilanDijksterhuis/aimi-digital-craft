# Node Description Batch 24 of 35

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

- "lib_admin_functions_adminsetrequestfields": "adminSetRequestFields" | kind=code-symbol | source=src/lib/admin.functions.ts:L504 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetrolepermission": "adminSetRolePermission" | kind=code-symbol | source=src/lib/admin.functions.ts:L2767 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetselfonboarding": "adminSetSelfOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L243 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsettutorialenabled": "adminSetTutorialEnabled" | kind=code-symbol | source=src/lib/admin.functions.ts:L262 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsnoozealert": "adminSnoozeAlert" | kind=code-symbol | source=src/lib/admin.functions.ts:L2736 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsoftdeletechange": "adminSoftDeleteChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1166 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsynccustomermonitoring": "adminSyncCustomerMonitoring" | kind=code-symbol | source=src/lib/admin.functions.ts:L2603 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admintoggleonboardingitem": "adminToggleOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L728 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admintogglerequestpaid": "adminToggleRequestPaid" | kind=code-symbol | source=src/lib/admin.functions.ts:L467 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatecustomer": "adminUpdateCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L96 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatelead": "adminUpdateLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3152 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateproject": "adminUpdateProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1482 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectcontact": "adminUpdateProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L1897 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectmilestone": "adminUpdateProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1709 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectnote": "adminUpdateProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1820 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojecttask": "adminUpdateProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2058 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdaterequeststatus": "adminUpdateRequestStatus" | kind=code-symbol | source=src/lib/admin.functions.ts:L281 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatewebsitelink": "adminUpdateWebsiteLink" | kind=code-symbol | source=src/lib/admin.functions.ts:L1367 | neighbors=[admin.functions.ts]
- "lib_admin_functions_all_permission_actions": "ALL_PERMISSION_ACTIONS" | kind=code-symbol | source=src/lib/admin.functions.ts:L20 | neighbors=[admin.functions.ts]
- "lib_admin_functions_allowed_redirect_hosts": "ALLOWED_REDIRECT_HOSTS" | kind=code-symbol | source=src/lib/admin.functions.ts:L615 | neighbors=[admin.functions.ts]
- "lib_admin_functions_checkdnshealth": "checkDNSHealth()" | kind=code-symbol | source=src/lib/admin.functions.ts:L2588 | neighbors=[admin.functions.ts]
- "lib_admin_functions_checksslcert": "checkSSLCert()" | kind=code-symbol | source=src/lib/admin.functions.ts:L2531 | neighbors=[admin.functions.ts]
- "lib_admin_functions_csvescape": "csvEscape()" | kind=code-symbol | source=src/lib/admin.functions.ts:L2186 | neighbors=[admin.functions.ts]
- "lib_admin_functions_lead_statuses": "LEAD_STATUSES" | kind=code-symbol | source=src/lib/admin.functions.ts:L3009 | neighbors=[admin.functions.ts]
- "lib_admin_functions_leads_roles": "LEADS_ROLES" | kind=code-symbol | source=src/lib/admin.functions.ts:L3003 | neighbors=[admin.functions.ts]
- "lib_admin_functions_leadstatus": "LeadStatus" | kind=code-symbol | source=src/lib/admin.functions.ts:L3010 | neighbors=[admin.functions.ts]
- "lib_admin_functions_logaudit": "logAudit()" | kind=code-symbol | source=src/lib/admin.functions.ts:L22 | neighbors=[admin.functions.ts]
- "lib_admin_functions_normphone": "normPhone()" | kind=code-symbol | source=src/lib/admin.functions.ts:L3012 | neighbors=[admin.functions.ts]
- "lib_admin_functions_project_priority_values": "PROJECT_PRIORITY_VALUES" | kind=code-symbol | source=src/lib/admin.functions.ts:L1431 | neighbors=[admin.functions.ts]
- "lib_admin_functions_project_status_values": "PROJECT_STATUS_VALUES" | kind=code-symbol | source=src/lib/admin.functions.ts:L1430 | neighbors=[admin.functions.ts]
- "lib_admin_functions_staff_base_roles": "STAFF_BASE_ROLES" | kind=code-symbol | source=src/lib/admin.functions.ts:L20 | neighbors=[admin.functions.ts]
- "lib_admin_functions_staff_roles_srv": "STAFF_ROLES_SRV" | kind=code-symbol | source=src/lib/admin.functions.ts:L18 | neighbors=[admin.functions.ts]
- "lib_admin_server_admingeneraterecoverylink": "adminGenerateRecoveryLink()" | kind=code-symbol | source=src/lib/admin.server.ts:L84 | neighbors=[admin.server.ts]
- "lib_admin_server_admingetcustomerdetail": "adminGetCustomerDetail()" | kind=code-symbol | source=src/lib/admin.server.ts:L186 | neighbors=[admin.server.ts]
- "lib_admin_server_admingetgrowthmetrics": "adminGetGrowthMetrics()" | kind=code-symbol | source=src/lib/admin.server.ts:L108 | neighbors=[admin.server.ts]
- "lib_admin_server_adminlistcustomers": "adminListCustomers()" | kind=code-symbol | source=src/lib/admin.server.ts:L34 | neighbors=[admin.server.ts]
- "lib_admin_server_adminliststaffmembers": "adminListStaffMembers()" | kind=code-symbol | source=src/lib/admin.server.ts:L235 | neighbors=[admin.server.ts]
- "lib_admin_server_adminremovestaffroles": "adminRemoveStaffRoles()" | kind=code-symbol | source=src/lib/admin.server.ts:L315 | neighbors=[admin.server.ts]
- "lib_admin_server_adminreplacerole": "adminReplaceRole()" | kind=code-symbol | source=src/lib/admin.server.ts:L303 | neighbors=[admin.server.ts]
- "lib_admin_server_adminsetuserpassword": "adminSetUserPassword()" | kind=code-symbol | source=src/lib/admin.server.ts:L94 | neighbors=[admin.server.ts]

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
