# Node Description Batch 25 of 34

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

- "lib_monitoring_functions_hours": "HOURS" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L8 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_limit": "LIMIT" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L10 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_log_level": "LOG_LEVEL" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L7 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_monitoringfetch": "monitoringFetch()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L22 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_monitoringfetchtext": "monitoringFetchText()" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L45 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_months": "MONTHS" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L9 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_functions_resolvealert": "resolveAlert" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L115 | neighbors=[monitoring.functions.ts]
- "lib_monitoring_shared_computemonitoringstats": "computeMonitoringStats()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L88 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_dayuptime": "DayUptime" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L72 | neighbors=[monitoring.shared.ts]
- "lib_monitoring_shared_monitoringstats": "MonitoringStats" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L80 | neighbors=[monitoring.shared.ts]
- "lib_portal_functions_assertownproject": "assertOwnProject()" | kind=code-symbol | source=src/lib/portal.functions.ts:L584 | neighbors=[portal.functions.ts]
- "lib_portal_functions_cancelmychange": "cancelMyChange" | kind=code-symbol | source=src/lib/portal.functions.ts:L312 | neighbors=[portal.functions.ts]
- "lib_portal_functions_getattachmenturl": "getAttachmentUrl" | kind=code-symbol | source=src/lib/portal.functions.ts:L543 | neighbors=[portal.functions.ts]
- "lib_portal_functions_getmydashboard": "getMyDashboard" | kind=code-symbol | source=src/lib/portal.functions.ts:L7 | neighbors=[portal.functions.ts]
- "lib_portal_functions_loglogin": "logLogin" | kind=code-symbol | source=src/lib/portal.functions.ts:L248 | neighbors=[portal.functions.ts]
- "lib_portal_functions_markallnotificationsread": "markAllNotificationsRead" | kind=code-symbol | source=src/lib/portal.functions.ts:L478 | neighbors=[portal.functions.ts]
- "lib_portal_functions_marknotificationread": "markNotificationRead" | kind=code-symbol | source=src/lib/portal.functions.ts:L464 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalcompleteonboarding": "portalCompleteOnboarding" | kind=code-symbol | source=src/lib/portal.functions.ts:L211 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalcompletetutorial": "portalCompleteTutorial" | kind=code-symbol | source=src/lib/portal.functions.ts:L236 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetonboardingstate": "portalGetOnboardingState" | kind=code-symbol | source=src/lib/portal.functions.ts:L145 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetproject": "portalGetProject" | kind=code-symbol | source=src/lib/portal.functions.ts:L636 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetprojectmonitoring": "portalGetProjectMonitoring" | kind=code-symbol | source=src/lib/portal.functions.ts:L651 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgettutorialstate": "portalGetTutorialState" | kind=code-symbol | source=src/lib/portal.functions.ts:L223 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmilestonedependencies": "portalListMilestoneDependencies" | kind=code-symbol | source=src/lib/portal.functions.ts:L719 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmyprojects": "portalListMyProjects" | kind=code-symbol | source=src/lib/portal.functions.ts:L605 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmyprojectsforchangeform": "portalListMyProjectsForChangeForm" | kind=code-symbol | source=src/lib/portal.functions.ts:L623 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistprojectmilestones": "portalListProjectMilestones" | kind=code-symbol | source=src/lib/portal.functions.ts:L704 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistprojectnotes": "portalListProjectNotes" | kind=code-symbol | source=src/lib/portal.functions.ts:L740 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalsaveonboardingstep": "portalSaveOnboardingStep" | kind=code-symbol | source=src/lib/portal.functions.ts:L160 | neighbors=[portal.functions.ts]
- "lib_portal_functions_postcustomercomment": "postCustomerComment" | kind=code-symbol | source=src/lib/portal.functions.ts:L490 | neighbors=[portal.functions.ts]
- "lib_portal_functions_requestextracredits": "requestExtraCredits" | kind=code-symbol | source=src/lib/portal.functions.ts:L452 | neighbors=[portal.functions.ts]
- "lib_portal_functions_requestpasswordreset": "requestPasswordReset" | kind=code-symbol | source=src/lib/portal.functions.ts:L563 | neighbors=[portal.functions.ts]
- "lib_portal_functions_simple_categories_server": "SIMPLE_CATEGORIES_SERVER" | kind=code-symbol | source=src/lib/portal.functions.ts:L338 | neighbors=[portal.functions.ts]
- "lib_portal_functions_submitchangerequest": "submitChangeRequest" | kind=code-symbol | source=src/lib/portal.functions.ts:L340 | neighbors=[portal.functions.ts]
- "lib_portal_functions_updatemyprofile": "updateMyProfile" | kind=code-symbol | source=src/lib/portal.functions.ts:L114 | neighbors=[portal.functions.ts]
- "lib_project_status_projectpriority": "ProjectPriority" | kind=code-symbol | source=src/lib/project-status.ts:L36 | neighbors=[project-status.ts]
- "lib_project_status_projectprogress": "projectProgress()" | kind=code-symbol | source=src/lib/project-status.ts:L71 | neighbors=[project-status.ts]
- "lib_project_status_projectstatus": "ProjectStatus" | kind=code-symbol | source=src/lib/project-status.ts:L14 | neighbors=[project-status.ts]
- "lib_rate_limit_ban_durations_ms": "BAN_DURATIONS_MS" | kind=code-symbol | source=src/lib/rate-limit.ts:L8 | neighbors=[rate-limit.ts]
- "lib_rate_limit_banentry": "BanEntry" | kind=code-symbol | source=src/lib/rate-limit.ts:L2 | neighbors=[rate-limit.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-024.json

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
