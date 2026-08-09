# Node Description Batch 29 of 42

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

- "lib_admin_functions_adminrunsslcheck": "adminRunSSLCheck" | kind=code-symbol | source=src/lib/admin.functions.ts:L3023 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsaveonboardingstep": "adminSaveOnboardingStep" | kind=code-symbol | source=src/lib/admin.functions.ts:L169 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsendnotification": "adminSendNotification" | kind=code-symbol | source=src/lib/admin.functions.ts:L682 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsendpasswordreset": "adminSendPasswordReset" | kind=code-symbol | source=src/lib/admin.functions.ts:L719 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetfreequota": "adminSetFreeQuota" | kind=code-symbol | source=src/lib/admin.functions.ts:L574 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetpassword": "adminSetPassword" | kind=code-symbol | source=src/lib/admin.functions.ts:L741 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetprojectmembers": "adminSetProjectMembers" | kind=code-symbol | source=src/lib/admin.functions.ts:L1776 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetrequestfields": "adminSetRequestFields" | kind=code-symbol | source=src/lib/admin.functions.ts:L595 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetrolepermission": "adminSetRolePermission" | kind=code-symbol | source=src/lib/admin.functions.ts:L3152 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetselfonboarding": "adminSetSelfOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L299 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsettutorialenabled": "adminSetTutorialEnabled" | kind=code-symbol | source=src/lib/admin.functions.ts:L322 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsnoozealert": "adminSnoozeAlert" | kind=code-symbol | source=src/lib/admin.functions.ts:L3113 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsoftdeletechange": "adminSoftDeleteChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1261 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsynccustomermonitoring": "adminSyncCustomerMonitoring" | kind=code-symbol | source=src/lib/admin.functions.ts:L2891 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admintoggleonboardingitem": "adminToggleOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L816 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admintogglerequestpaid": "adminToggleRequestPaid" | kind=code-symbol | source=src/lib/admin.functions.ts:L560 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatecallback": "adminUpdateCallback" | kind=code-symbol | source=src/lib/admin.functions.ts:L3867 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatecustomer": "adminUpdateCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L102 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatelead": "adminUpdateLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3629 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateproject": "adminUpdateProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1597 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectcontact": "adminUpdateProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L2075 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectmilestone": "adminUpdateProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1858 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectnote": "adminUpdateProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1982 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojecttask": "adminUpdateProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2249 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdaterequeststatus": "adminUpdateRequestStatus" | kind=code-symbol | source=src/lib/admin.functions.ts:L345 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatewebsitelink": "adminUpdateWebsiteLink" | kind=code-symbol | source=src/lib/admin.functions.ts:L1456 | neighbors=[admin.functions.ts]
- "lib_admin_functions_all_permission_actions": "ALL_PERMISSION_ACTIONS" | kind=code-symbol | source=src/lib/admin.functions.ts:L20 | neighbors=[admin.functions.ts]
- "lib_admin_functions_allowed_redirect_hosts": "ALLOWED_REDIRECT_HOSTS" | kind=code-symbol | source=src/lib/admin.functions.ts:L706 | neighbors=[admin.functions.ts]
- "lib_admin_functions_callback_outcome_note": "CALLBACK_OUTCOME_NOTE" | kind=code-symbol | source=src/lib/admin.functions.ts:L3958 | neighbors=[admin.functions.ts]
- "lib_admin_functions_callbackoutcome": "CallbackOutcome" | kind=code-symbol | source=src/lib/admin.functions.ts:L3757 | neighbors=[admin.functions.ts]
- "lib_admin_functions_callbackstatus": "CallbackStatus" | kind=code-symbol | source=src/lib/admin.functions.ts:L3756 | neighbors=[admin.functions.ts]
- "lib_admin_functions_checkdnshealth": "checkDNSHealth()" | kind=code-symbol | source=src/lib/admin.functions.ts:L2872 | neighbors=[admin.functions.ts]
- "lib_admin_functions_checksslcert": "checkSSLCert()" | kind=code-symbol | source=src/lib/admin.functions.ts:L2791 | neighbors=[admin.functions.ts]
- "lib_admin_functions_csvescape": "csvEscape()" | kind=code-symbol | source=src/lib/admin.functions.ts:L2398 | neighbors=[admin.functions.ts]
- "lib_admin_functions_lead_statuses": "LEAD_STATUSES" | kind=code-symbol | source=src/lib/admin.functions.ts:L3468 | neighbors=[admin.functions.ts]
- "lib_admin_functions_leads_roles": "LEADS_ROLES" | kind=code-symbol | source=src/lib/admin.functions.ts:L3462 | neighbors=[admin.functions.ts]
- "lib_admin_functions_leadstatus": "LeadStatus" | kind=code-symbol | source=src/lib/admin.functions.ts:L3476 | neighbors=[admin.functions.ts]
- "lib_admin_functions_logaudit": "logAudit()" | kind=code-symbol | source=src/lib/admin.functions.ts:L28 | neighbors=[admin.functions.ts]
- "lib_admin_functions_normphone": "normPhone()" | kind=code-symbol | source=src/lib/admin.functions.ts:L3478 | neighbors=[admin.functions.ts]
- "lib_admin_functions_project_priority_values": "PROJECT_PRIORITY_VALUES" | kind=code-symbol | source=src/lib/admin.functions.ts:L1536 | neighbors=[admin.functions.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-028.json

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
