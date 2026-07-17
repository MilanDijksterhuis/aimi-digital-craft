# Node Description Batch 26 of 35

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

- "lib_portal_functions_assertownproject": "assertOwnProject()" | kind=code-symbol | source=src/lib/portal.functions.ts:L553 | neighbors=[portal.functions.ts]
- "lib_portal_functions_cancelmychange": "cancelMyChange" | kind=code-symbol | source=src/lib/portal.functions.ts:L290 | neighbors=[portal.functions.ts]
- "lib_portal_functions_getattachmenturl": "getAttachmentUrl" | kind=code-symbol | source=src/lib/portal.functions.ts:L512 | neighbors=[portal.functions.ts]
- "lib_portal_functions_getmydashboard": "getMyDashboard" | kind=code-symbol | source=src/lib/portal.functions.ts:L8 | neighbors=[portal.functions.ts]
- "lib_portal_functions_loglogin": "logLogin" | kind=code-symbol | source=src/lib/portal.functions.ts:L226 | neighbors=[portal.functions.ts]
- "lib_portal_functions_markallnotificationsread": "markAllNotificationsRead" | kind=code-symbol | source=src/lib/portal.functions.ts:L456 | neighbors=[portal.functions.ts]
- "lib_portal_functions_marknotificationread": "markNotificationRead" | kind=code-symbol | source=src/lib/portal.functions.ts:L442 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalcompleteonboarding": "portalCompleteOnboarding" | kind=code-symbol | source=src/lib/portal.functions.ts:L189 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalcompletetutorial": "portalCompleteTutorial" | kind=code-symbol | source=src/lib/portal.functions.ts:L214 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetonboardingstate": "portalGetOnboardingState" | kind=code-symbol | source=src/lib/portal.functions.ts:L123 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetproject": "portalGetProject" | kind=code-symbol | source=src/lib/portal.functions.ts:L605 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgetprojectmonitoring": "portalGetProjectMonitoring" | kind=code-symbol | source=src/lib/portal.functions.ts:L620 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalgettutorialstate": "portalGetTutorialState" | kind=code-symbol | source=src/lib/portal.functions.ts:L201 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmilestonedependencies": "portalListMilestoneDependencies" | kind=code-symbol | source=src/lib/portal.functions.ts:L665 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmyprojects": "portalListMyProjects" | kind=code-symbol | source=src/lib/portal.functions.ts:L574 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistmyprojectsforchangeform": "portalListMyProjectsForChangeForm" | kind=code-symbol | source=src/lib/portal.functions.ts:L592 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistprojectmilestones": "portalListProjectMilestones" | kind=code-symbol | source=src/lib/portal.functions.ts:L650 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portallistprojectnotes": "portalListProjectNotes" | kind=code-symbol | source=src/lib/portal.functions.ts:L686 | neighbors=[portal.functions.ts]
- "lib_portal_functions_portalsaveonboardingstep": "portalSaveOnboardingStep" | kind=code-symbol | source=src/lib/portal.functions.ts:L138 | neighbors=[portal.functions.ts]
- "lib_portal_functions_postcustomercomment": "postCustomerComment" | kind=code-symbol | source=src/lib/portal.functions.ts:L468 | neighbors=[portal.functions.ts]
- "lib_portal_functions_requestextracredits": "requestExtraCredits" | kind=code-symbol | source=src/lib/portal.functions.ts:L430 | neighbors=[portal.functions.ts]
- "lib_portal_functions_requestpasswordreset": "requestPasswordReset" | kind=code-symbol | source=src/lib/portal.functions.ts:L532 | neighbors=[portal.functions.ts]
- "lib_portal_functions_simple_categories_server": "SIMPLE_CATEGORIES_SERVER" | kind=code-symbol | source=src/lib/portal.functions.ts:L338 | neighbors=[portal.functions.ts]
- "lib_portal_functions_submitchangerequest": "submitChangeRequest" | kind=code-symbol | source=src/lib/portal.functions.ts:L317 | neighbors=[portal.functions.ts]
- "lib_portal_functions_updatemyprofile": "updateMyProfile" | kind=code-symbol | source=src/lib/portal.functions.ts:L92 | neighbors=[portal.functions.ts]
- "lib_project_status_projectpriority": "ProjectPriority" | kind=code-symbol | source=src/lib/project-status.ts:L36 | neighbors=[project-status.ts]
- "lib_project_status_projectprogress": "projectProgress()" | kind=code-symbol | source=src/lib/project-status.ts:L71 | neighbors=[project-status.ts]
- "lib_project_status_projectstatus": "ProjectStatus" | kind=code-symbol | source=src/lib/project-status.ts:L14 | neighbors=[project-status.ts]
- "lib_rate_limit_ban_durations_ms": "BAN_DURATIONS_MS" | kind=code-symbol | source=src/lib/rate-limit.ts:L8 | neighbors=[rate-limit.ts]
- "lib_rate_limit_banentry": "BanEntry" | kind=code-symbol | source=src/lib/rate-limit.ts:L2 | neighbors=[rate-limit.ts]
- "lib_rate_limit_bans": "bans" | kind=code-symbol | source=src/lib/rate-limit.ts:L5 | neighbors=[rate-limit.ts]
- "lib_rate_limit_entry": "Entry" | kind=code-symbol | source=src/lib/rate-limit.ts:L1 | neighbors=[rate-limit.ts]
- "lib_rate_limit_store": "store" | kind=code-symbol | source=src/lib/rate-limit.ts:L4 | neighbors=[rate-limit.ts]
- "lib_rbac_approle": "AppRole" | kind=code-symbol | source=src/lib/rbac.ts:L2 | neighbors=[rbac.ts]
- "lib_rbac_isstaffrole": "isStaffRole()" | kind=code-symbol | source=src/lib/rbac.ts:L30 | neighbors=[rbac.ts]
- "lib_rbac_staff_roles": "STAFF_ROLES" | kind=code-symbol | source=src/lib/rbac.ts:L21 | neighbors=[rbac.ts]
- "lib_status_simple_categories": "SIMPLE_CATEGORIES" | kind=code-symbol | source=src/lib/status.ts:L73 | neighbors=[status.ts]
- "lib_status_status_flow": "STATUS_FLOW" | kind=code-symbol | source=src/lib/status.ts:L13 | neighbors=[status.ts]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_available_credits": "public.available_credits()" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L81 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_has_role": "public.has_role()" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L74 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-025.json

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
