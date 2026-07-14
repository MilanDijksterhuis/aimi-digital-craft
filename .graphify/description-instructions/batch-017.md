# Node Description Batch 18 of 32

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

- "components_leadspanel_needsaction": "needsAction()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L86 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_newleadmodal": "NewLeadModal()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L876 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_pipelinetab": "PipelineTab()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L662 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_reltime": "relTime()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L76 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_segmented": "Segmented()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L693 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_sortkey": "SortKey" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L66 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_sorts": "SORTS" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L60 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_statcard": "StatCard()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L724 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status": "Status" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L24 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L35 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_dot": "STATUS_DOT" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L45 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L26 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_statuses": "STATUSES" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L23 | neighbors=[LeadsPanel.tsx]
- "components_nav_links": "links" | kind=code-symbol | source=src/components/Nav.tsx:L3 | neighbors=[Nav.tsx]
- "components_pricing_addons": "addons" | kind=code-symbol | source=src/components/Pricing.tsx:L4 | neighbors=[Pricing.tsx]
- "components_pricing_tiers": "tiers" | kind=code-symbol | source=src/components/Pricing.tsx:L25 | neighbors=[Pricing.tsx]
- "components_processtimeline_phases": "phases" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L5 | neighbors=[ProcessTimeline.tsx]
- "components_work_projects": "projects" | kind=code-symbol | source=src/components/Work.tsx:L4 | neighbors=[Work.tsx]
- "components_work_work": "Work()" | kind=code-symbol | source=src/components/Work.tsx:L11 | neighbors=[Work.tsx]
- "hooks_use_auth_authctx": "AuthCtx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L5 | neighbors=[use-auth.tsx]
- "hooks_use_auth_ctx": "Ctx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L12 | neighbors=[use-auth.tsx]
- "lib_accounts_functions_admin_like": "ADMIN_LIKE" | kind=code-symbol | source=src/lib/accounts.functions.ts:L5 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminarchivechange": "adminArchiveChange" | kind=code-symbol | source=src/lib/accounts.functions.ts:L240 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminassignchange": "adminAssignChange" | kind=code-symbol | source=src/lib/accounts.functions.ts:L282 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminbulkarchive": "adminBulkArchive" | kind=code-symbol | source=src/lib/accounts.functions.ts:L268 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminchangeaccountrole": "adminChangeAccountRole" | kind=code-symbol | source=src/lib/accounts.functions.ts:L65 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_admincreatetempaccount": "adminCreateTempAccount" | kind=code-symbol | source=src/lib/accounts.functions.ts:L167 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_admingetaccountdetail": "adminGetAccountDetail" | kind=code-symbol | source=src/lib/accounts.functions.ts:L55 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminharddeleteaccount": "adminHardDeleteAccount" | kind=code-symbol | source=src/lib/accounts.functions.ts:L148 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminlistallaccounts": "adminListAllAccounts" | kind=code-symbol | source=src/lib/accounts.functions.ts:L46 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminlistarchivedchanges": "adminListArchivedChanges" | kind=code-symbol | source=src/lib/accounts.functions.ts:L309 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminlistnotifications": "adminListNotifications" | kind=code-symbol | source=src/lib/accounts.functions.ts:L206 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminmarkallnotificationsread": "adminMarkAllNotificationsRead" | kind=code-symbol | source=src/lib/accounts.functions.ts:L230 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminmarknotificationread": "adminMarkNotificationRead" | kind=code-symbol | source=src/lib/accounts.functions.ts:L220 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminsetaccessexpiry": "adminSetAccessExpiry" | kind=code-symbol | source=src/lib/accounts.functions.ts:L127 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminsetaccounttags": "adminSetAccountTags" | kind=code-symbol | source=src/lib/accounts.functions.ts:L109 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminsetblocked": "adminSetBlocked" | kind=code-symbol | source=src/lib/accounts.functions.ts:L91 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminunarchivechange": "adminUnarchiveChange" | kind=code-symbol | source=src/lib/accounts.functions.ts:L254 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_checkmyaccess": "checkMyAccess" | kind=code-symbol | source=src/lib/accounts.functions.ts:L30 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_pinglastseen": "pingLastSeen" | kind=code-symbol | source=src/lib/accounts.functions.ts:L22 | neighbors=[accounts.functions.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-017.json

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
