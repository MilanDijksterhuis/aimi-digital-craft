# Node Description Batch 28 of 46

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

- "components_work_projects": "projects" | kind=code-symbol | source=src/components/Work.tsx:L4 | neighbors=[Work.tsx]
- "components_work_work": "Work()" | kind=code-symbol | source=src/components/Work.tsx:L11 | neighbors=[Work.tsx]
- "design_handoff_meer_diensten_support_bundledblob": "bundledBlob()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1136 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_componentdidmount": "componentDidMount()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L831 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_componentdidupdate": "componentDidUpdate()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L833 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_componentwillunmount": "componentWillUnmount()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L835 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_constructor": "constructor()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L818 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_forceupdate": "forceUpdate()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L828 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_hiderawtemplate": "hideRawTemplate()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1818 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_hinttomin": "hintToMin()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L883 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_placeholder": "Placeholder()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L862 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_renderdeckkids": "renderDeckKids()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L543 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_rendervals": "renderVals()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L838 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_resolvedottedpath": "resolveDottedPath()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1161 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_setstate": "setState()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L825 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_shallowequal": "shallowEqual()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L854 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_warnunresolved": "warnUnresolved()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L563 | neighbors=[support.js]
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
