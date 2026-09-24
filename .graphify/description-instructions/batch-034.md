# Node Description Batch 35 of 57

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

- "design_handoff_meer_diensten_support_rendervals": "renderVals()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L838 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_resolvedottedpath": "resolveDottedPath()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1161 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_setstate": "setState()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L825 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_shallowequal": "shallowEqual()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L854 | neighbors=[support.js]
- "design_handoff_meer_diensten_support_warnunresolved": "warnUnresolved()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L563 | neighbors=[support.js]
- "eslint_config": "eslint.config.js" | kind=code-symbol | source=eslint.config.js:L1 | neighbors=[74ecdc1 code fixes]
- "hooks_use_auth_authctx": "AuthCtx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L5 | neighbors=[use-auth.tsx]
- "hooks_use_auth_ctx": "Ctx" | kind=code-symbol | source=src/hooks/use-auth.tsx:L12 | neighbors=[use-auth.tsx]
- "htmlparser": "HTMLParser" | kind=code-symbol | neighbors=[Extract]
- "kaart_hoogeveen_veendam_support_bundledblob": "bundledBlob()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1136 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_componentdidmount": "componentDidMount()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L831 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_componentdidupdate": "componentDidUpdate()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L833 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_componentwillunmount": "componentWillUnmount()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L835 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_constructor": "constructor()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L818 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_forceupdate": "forceUpdate()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L828 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_hiderawtemplate": "hideRawTemplate()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1818 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_hinttomin": "hintToMin()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L883 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_placeholder": "Placeholder()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L862 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_renderdeckkids": "renderDeckKids()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L543 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_rendervals": "renderVals()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L838 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_resolvedottedpath": "resolveDottedPath()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1161 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_setstate": "setState()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L825 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_shallowequal": "shallowEqual()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L854 | neighbors=[support.js]
- "kaart_hoogeveen_veendam_support_warnunresolved": "warnUnresolved()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L563 | neighbors=[support.js]
- "legacy_migrations_supabase_migration_dns_checks": "dns_checks" | kind=code-symbol | source=supabase/legacy-migrations/supabase-migration.sql:L32 | neighbors=[supabase-migration.sql]
- "legacy_migrations_supabase_migration_monitoring_alerts": "monitoring_alerts" | kind=code-symbol | source=supabase/legacy-migrations/supabase-migration.sql:L42 | neighbors=[supabase-migration.sql]
- "legacy_migrations_supabase_migration_role_permissions": "role_permissions" | kind=code-symbol | source=supabase/legacy-migrations/supabase-migration.sql:L59 | neighbors=[supabase-migration.sql]
- "legacy_migrations_supabase_migration_site_response_times": "site_response_times" | kind=code-symbol | source=supabase/legacy-migrations/supabase-migration.sql:L7 | neighbors=[supabase-migration.sql]
- "legacy_migrations_supabase_migration_ssl_checks": "ssl_checks" | kind=code-symbol | source=supabase/legacy-migrations/supabase-migration.sql:L19 | neighbors=[supabase-migration.sql]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-034.json

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
