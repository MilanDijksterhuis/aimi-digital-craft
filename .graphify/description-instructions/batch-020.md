# Node Description Batch 21 of 36

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

- "components_portaltutorial_progressdots": "ProgressDots()" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L151 | neighbors=[PortalTutorial.tsx]
- "components_portaltutorial_slide": "Slide" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L11 | neighbors=[PortalTutorial.tsx]
- "components_portaltutorial_slides": "SLIDES" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L17 | neighbors=[PortalTutorial.tsx]
- "components_pricing_addons": "addons" | kind=code-symbol | source=src/components/Pricing.tsx:L4 | neighbors=[Pricing.tsx]
- "components_pricing_tiers": "tiers" | kind=code-symbol | source=src/components/Pricing.tsx:L25 | neighbors=[Pricing.tsx]
- "components_processtimeline_phases": "phases" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L5 | neighbors=[ProcessTimeline.tsx]
- "components_work_projects": "projects" | kind=code-symbol | source=src/components/Work.tsx:L4 | neighbors=[Work.tsx]
- "components_work_work": "Work()" | kind=code-symbol | source=src/components/Work.tsx:L11 | neighbors=[Work.tsx]
- "eslint_config": "eslint.config.js" | kind=code-symbol | source=eslint.config.js:L1 | neighbors=[74ecdc1 code fixes]
- "hooks_use_auth_authctx": "AuthCtx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L5 | neighbors=[use-auth.tsx]
- "hooks_use_auth_ctx": "Ctx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L12 | neighbors=[use-auth.tsx]
- "lib_accounts_functions_admin_like": "ADMIN_LIKE" | kind=code-symbol | source=src/lib/accounts.functions.ts:L6 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminarchivechange": "adminArchiveChange" | kind=code-symbol | source=src/lib/accounts.functions.ts:L227 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminassignchange": "adminAssignChange" | kind=code-symbol | source=src/lib/accounts.functions.ts:L269 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminbulkarchive": "adminBulkArchive" | kind=code-symbol | source=src/lib/accounts.functions.ts:L255 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminchangeaccountrole": "adminChangeAccountRole" | kind=code-symbol | source=src/lib/accounts.functions.ts:L51 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_admincreatetempaccount": "adminCreateTempAccount" | kind=code-symbol | source=src/lib/accounts.functions.ts:L154 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_admingetaccountdetail": "adminGetAccountDetail" | kind=code-symbol | source=src/lib/accounts.functions.ts:L41 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminharddeleteaccount": "adminHardDeleteAccount" | kind=code-symbol | source=src/lib/accounts.functions.ts:L135 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminlistallaccounts": "adminListAllAccounts" | kind=code-symbol | source=src/lib/accounts.functions.ts:L32 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminlistarchivedchanges": "adminListArchivedChanges" | kind=code-symbol | source=src/lib/accounts.functions.ts:L296 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminlistnotifications": "adminListNotifications" | kind=code-symbol | source=src/lib/accounts.functions.ts:L193 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminmarkallnotificationsread": "adminMarkAllNotificationsRead" | kind=code-symbol | source=src/lib/accounts.functions.ts:L217 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminmarknotificationread": "adminMarkNotificationRead" | kind=code-symbol | source=src/lib/accounts.functions.ts:L207 | neighbors=[accounts.functions.ts]
- "lib_accounts_functions_adminsetaccessexpiry": "adminSetAccessExpiry" | kind=code-symbol | source=src/lib/accounts.functions.ts:L114 | neighbors=[accounts.functions.ts]
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
- "lib_admin_functions_adminaddcost": "adminAddCost" | kind=code-symbol | source=src/lib/admin.functions.ts:L754 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminaddleadactivity": "adminAddLeadActivity" | kind=code-symbol | source=src/lib/admin.functions.ts:L3660 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminaddmilestonedependency": "adminAddMilestoneDependency" | kind=code-symbol | source=src/lib/admin.functions.ts:L2470 | neighbors=[admin.functions.ts]
- "lib_admin_functions_adminaddonboardingitem": "adminAddOnboardingItem" | kind=code-symbol | source=src/lib/admin.functions.ts:L792 | neighbors=[admin.functions.ts]

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
