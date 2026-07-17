# Node Description Batch 23 of 34

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

- "lib_admin_functions_adminlistprojectnotes": "adminListProjectNotes" | kind=code-symbol | source=src/lib/admin.functions.ts:L1804 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojects": "adminListProjects" | kind=code-symbol | source=src/lib/admin.functions.ts:L1414 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttasks": "adminListProjectTasks" | kind=code-symbol | source=src/lib/admin.functions.ts:L2036 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttemplates": "adminListProjectTemplates" | kind=code-symbol | source=src/lib/admin.functions.ts:L2318 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttimeentries": "adminListProjectTimeEntries" | kind=code-symbol | source=src/lib/admin.functions.ts:L2132 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistroles": "adminListRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L2812 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminliststaff": "adminListStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1088 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistusercustomroles": "adminListUserCustomRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L3008 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistwebsitelinks": "adminListWebsiteLinks" | kind=code-symbol | source=src/lib/admin.functions.ts:L1370 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminmarkalertseen": "adminMarkAlertSeen" | kind=code-symbol | source=src/lib/admin.functions.ts:L2771 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminmarkpasswordresethandled": "adminMarkPasswordResetHandled" | kind=code-symbol | source=src/lib/admin.functions.ts:L1352 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminpostcomment": "adminPostComment" | kind=code-symbol | source=src/lib/admin.functions.ts:L549 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminremovecustomrole": "adminRemoveCustomRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2993 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminremovestaff": "adminRemoveStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1144 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminresetonboarding": "adminResetOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L245 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminrestorechange": "adminRestoreChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1226 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminrundnscheck": "adminRunDNSCheck" | kind=code-symbol | source=src/lib/admin.functions.ts:L2728 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminrunsslcheck": "adminRunSSLCheck" | kind=code-symbol | source=src/lib/admin.functions.ts:L2710 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsaveonboardingstep": "adminSaveOnboardingStep" | kind=code-symbol | source=src/lib/admin.functions.ts:L166 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsendnotification": "adminSendNotification" | kind=code-symbol | source=src/lib/admin.functions.ts:L615 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsendpasswordreset": "adminSendPasswordReset" | kind=code-symbol | source=src/lib/admin.functions.ts:L656 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetfreequota": "adminSetFreeQuota" | kind=code-symbol | source=src/lib/admin.functions.ts:L507 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetpassword": "adminSetPassword" | kind=code-symbol | source=src/lib/admin.functions.ts:L675 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetprojectmembers": "adminSetProjectMembers" | kind=code-symbol | source=src/lib/admin.functions.ts:L1665 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetrequestfields": "adminSetRequestFields" | kind=code-symbol | source=src/lib/admin.functions.ts:L528 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetrolepermission": "adminSetRolePermission" | kind=code-symbol | source=src/lib/admin.functions.ts:L2791 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetselfonboarding": "adminSetSelfOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L267 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsettutorialenabled": "adminSetTutorialEnabled" | kind=code-symbol | source=src/lib/admin.functions.ts:L286 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsnoozealert": "adminSnoozeAlert" | kind=code-symbol | source=src/lib/admin.functions.ts:L2760 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsoftdeletechange": "adminSoftDeleteChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1190 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsynccustomermonitoring": "adminSyncCustomerMonitoring" | kind=code-symbol | source=src/lib/admin.functions.ts:L2627 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admintoggleonboardingitem": "adminToggleOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L752 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admintogglerequestpaid": "adminToggleRequestPaid" | kind=code-symbol | source=src/lib/admin.functions.ts:L491 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatecustomer": "adminUpdateCustomer" | kind=code-symbol | source=src/lib/admin.functions.ts:L120 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdatelead": "adminUpdateLead" | kind=code-symbol | source=src/lib/admin.functions.ts:L3176 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateproject": "adminUpdateProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1506 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectcontact": "adminUpdateProjectContact" | kind=code-symbol | source=src/lib/admin.functions.ts:L1921 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectmilestone": "adminUpdateProjectMilestone" | kind=code-symbol | source=src/lib/admin.functions.ts:L1733 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojectnote": "adminUpdateProjectNote" | kind=code-symbol | source=src/lib/admin.functions.ts:L1844 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminupdateprojecttask": "adminUpdateProjectTask" | kind=code-symbol | source=src/lib/admin.functions.ts:L2082 | neighbors=[admin.functions.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-022.json

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
