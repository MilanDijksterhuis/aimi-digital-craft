# Node Description Batch 23 of 35

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

- "lib_admin_functions_admingrantcredits": "adminGrantCredits" | kind=code-symbol | source=src/lib/admin.functions.ts:L553 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminharddeletechange": "adminHardDeleteChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1224 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminimportleads": "adminImportLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3093 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admininvitestaff": "adminInviteStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1073 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistallchanges": "adminListAllChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1013 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistappointments": "adminListAppointments" | kind=code-symbol | source=src/lib/admin.functions.ts:L809 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistchanges": "adminListChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L436 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistcontactmoments": "adminListContactMoments" | kind=code-symbol | source=src/lib/admin.functions.ts:L893 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistdeletedchanges": "adminListDeletedChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1237 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistleads": "adminListLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3017 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistloginevents": "adminListLoginEvents" | kind=code-symbol | source=src/lib/admin.functions.ts:L946 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistmilestonedependencies": "adminListMilestoneDependencies" | kind=code-symbol | source=src/lib/admin.functions.ts:L2234 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistpasswordresets": "adminListPasswordResets" | kind=code-symbol | source=src/lib/admin.functions.ts:L1315 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectchangerequests": "adminListProjectChangeRequests" | kind=code-symbol | source=src/lib/admin.functions.ts:L2511 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectcontacts": "adminListProjectContacts" | kind=code-symbol | source=src/lib/admin.functions.ts:L1858 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectmilestones": "adminListProjectMilestones" | kind=code-symbol | source=src/lib/admin.functions.ts:L1665 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectnotes": "adminListProjectNotes" | kind=code-symbol | source=src/lib/admin.functions.ts:L1780 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojects": "adminListProjects" | kind=code-symbol | source=src/lib/admin.functions.ts:L1390 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttasks": "adminListProjectTasks" | kind=code-symbol | source=src/lib/admin.functions.ts:L2012 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttemplates": "adminListProjectTemplates" | kind=code-symbol | source=src/lib/admin.functions.ts:L2294 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttimeentries": "adminListProjectTimeEntries" | kind=code-symbol | source=src/lib/admin.functions.ts:L2108 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistroles": "adminListRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L2788 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminliststaff": "adminListStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1064 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistusercustomroles": "adminListUserCustomRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L2984 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistwebsitelinks": "adminListWebsiteLinks" | kind=code-symbol | source=src/lib/admin.functions.ts:L1346 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminmarkalertseen": "adminMarkAlertSeen" | kind=code-symbol | source=src/lib/admin.functions.ts:L2747 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminmarkpasswordresethandled": "adminMarkPasswordResetHandled" | kind=code-symbol | source=src/lib/admin.functions.ts:L1328 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminpostcomment": "adminPostComment" | kind=code-symbol | source=src/lib/admin.functions.ts:L525 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminremovecustomrole": "adminRemoveCustomRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L2969 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminremovestaff": "adminRemoveStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1120 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminresetonboarding": "adminResetOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L221 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminrestorechange": "adminRestoreChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1202 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminrundnscheck": "adminRunDNSCheck" | kind=code-symbol | source=src/lib/admin.functions.ts:L2704 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminrunsslcheck": "adminRunSSLCheck" | kind=code-symbol | source=src/lib/admin.functions.ts:L2686 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsaveonboardingstep": "adminSaveOnboardingStep" | kind=code-symbol | source=src/lib/admin.functions.ts:L142 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsendnotification": "adminSendNotification" | kind=code-symbol | source=src/lib/admin.functions.ts:L591 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsendpasswordreset": "adminSendPasswordReset" | kind=code-symbol | source=src/lib/admin.functions.ts:L632 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetfreequota": "adminSetFreeQuota" | kind=code-symbol | source=src/lib/admin.functions.ts:L483 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetpassword": "adminSetPassword" | kind=code-symbol | source=src/lib/admin.functions.ts:L651 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminsetprojectmembers": "adminSetProjectMembers" | kind=code-symbol | source=src/lib/admin.functions.ts:L1641 | neighbors=[admin.functions.ts]

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
