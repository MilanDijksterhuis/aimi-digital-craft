# Node Description Batch 28 of 42

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

- "lib_admin_functions_admingetoverview": "adminGetOverview" | kind=code-symbol | source=src/lib/admin.functions.ts:L45 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetproject": "adminGetProject" | kind=code-symbol | source=src/lib/admin.functions.ts:L1704 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetprojectsdashboardwidgets": "adminGetProjectsDashboardWidgets" | kind=code-symbol | source=src/lib/admin.functions.ts:L2727 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetrole": "adminGetRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L3221 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetrolepermissions": "adminGetRolePermissions" | kind=code-symbol | source=src/lib/admin.functions.ts:L3143 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingetsitestats": "adminGetSiteStats" | kind=code-symbol | source=src/lib/admin.functions.ts:L1045 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admingrantcredits": "adminGrantCredits" | kind=code-symbol | source=src/lib/admin.functions.ts:L644 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminharddeletechange": "adminHardDeleteChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1316 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminimportleads": "adminImportLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3562 | neighbors=[admin.functions.ts]
- "lib_admin_functions_admininvitestaff": "adminInviteStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1173 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistallchanges": "adminListAllChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1113 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistappointments": "adminListAppointments" | kind=code-symbol | source=src/lib/admin.functions.ts:L895 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistcallbacks": "adminListCallbacks" | kind=code-symbol | source=src/lib/admin.functions.ts:L3765 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistchanges": "adminListChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L522 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistcontactmoments": "adminListContactMoments" | kind=code-symbol | source=src/lib/admin.functions.ts:L976 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistdeletedchanges": "adminListDeletedChanges" | kind=code-symbol | source=src/lib/admin.functions.ts:L1329 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistleads": "adminListLeads" | kind=code-symbol | source=src/lib/admin.functions.ts:L3483 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistloginevents": "adminListLoginEvents" | kind=code-symbol | source=src/lib/admin.functions.ts:L1029 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistmilestonedependencies": "adminListMilestoneDependencies" | kind=code-symbol | source=src/lib/admin.functions.ts:L2449 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistpasswordresets": "adminListPasswordResets" | kind=code-symbol | source=src/lib/admin.functions.ts:L1404 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectchangerequests": "adminListProjectChangeRequests" | kind=code-symbol | source=src/lib/admin.functions.ts:L2771 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectcontacts": "adminListProjectContacts" | kind=code-symbol | source=src/lib/admin.functions.ts:L2032 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectmilestones": "adminListProjectMilestones" | kind=code-symbol | source=src/lib/admin.functions.ts:L1812 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojectnotes": "adminListProjectNotes" | kind=code-symbol | source=src/lib/admin.functions.ts:L1938 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojects": "adminListProjects" | kind=code-symbol | source=src/lib/admin.functions.ts:L1481 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttasks": "adminListProjectTasks" | kind=code-symbol | source=src/lib/admin.functions.ts:L2201 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttemplates": "adminListProjectTemplates" | kind=code-symbol | source=src/lib/admin.functions.ts:L2521 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistprojecttimeentries": "adminListProjectTimeEntries" | kind=code-symbol | source=src/lib/admin.functions.ts:L2308 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistroles": "adminListRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L3188 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminliststaff": "adminListStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1164 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistusercustomroles": "adminListUserCustomRoles" | kind=code-symbol | source=src/lib/admin.functions.ts:L3443 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminlistwebsitelinks": "adminListWebsiteLinks" | kind=code-symbol | source=src/lib/admin.functions.ts:L1435 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminmarkalertseen": "adminMarkAlertSeen" | kind=code-symbol | source=src/lib/admin.functions.ts:L3129 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminmarkpasswordresethandled": "adminMarkPasswordResetHandled" | kind=code-symbol | source=src/lib/admin.functions.ts:L1417 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminpostcomment": "adminPostComment" | kind=code-symbol | source=src/lib/admin.functions.ts:L616 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminremovecustomrole": "adminRemoveCustomRole" | kind=code-symbol | source=src/lib/admin.functions.ts:L3420 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminremovestaff": "adminRemoveStaff" | kind=code-symbol | source=src/lib/admin.functions.ts:L1219 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminresetonboarding": "adminResetOnboarding" | kind=code-symbol | source=src/lib/admin.functions.ts:L277 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminrestorechange": "adminRestoreChange" | kind=code-symbol | source=src/lib/admin.functions.ts:L1295 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminrundnscheck": "adminRunDNSCheck" | kind=code-symbol | source=src/lib/admin.functions.ts:L3051 | neighbors=[admin.functions.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-027.json

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
