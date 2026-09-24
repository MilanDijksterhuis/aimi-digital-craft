# Node Description Batch 22 of 57

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

- "kaart_hoogeveen_veendam_support_loadscript": "loadScript()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1823 | neighbors=[support.js, loadReactUmd()]
- "kaart_hoogeveen_veendam_support_parenswrapwhole": "parensWrapWhole()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L237 | neighbors=[support.js, resolve()]
- "kaart_hoogeveen_veendam_support_parsedctext": "parseDcText()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L38 | neighbors=[support.js, parseDataProps()]
- "kaart_hoogeveen_veendam_support_resolvepath": "resolvePath()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L263 | neighbors=[support.js, resolve()]
- "kaart_hoogeveen_veendam_support_safedecode": "safeDecode()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L143 | neighbors=[support.js, rootNameForDocument()]
- "kaart_hoogeveen_veendam_support_walktext": "walkText()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L569 | neighbors=[support.js, walk()]
- "legacy_migrations_supabase_callbacks_migration": "supabase-callbacks-migration.sql" | kind=code-symbol | source=supabase/legacy-migrations/supabase-callbacks-migration.sql:L1 | neighbors=[lead_callbacks, leads]
- "legacy_migrations_supabase_callbacks_migration_lead_callbacks": "lead_callbacks" | kind=code-symbol | source=supabase/legacy-migrations/supabase-callbacks-migration.sql:L10 | neighbors=[supabase-callbacks-migration.sql, leads]
- "legacy_migrations_supabase_callbacks_migration_leads": "leads" | kind=code-symbol | source=supabase/legacy-migrations/supabase-callbacks-migration.sql:L12 | neighbors=[supabase-callbacks-migration.sql, lead_callbacks]
- "legacy_migrations_supabase_leads_migration": "supabase-leads-migration.sql" | kind=code-symbol | source=supabase/legacy-migrations/supabase-leads-migration.sql:L1 | neighbors=[lead_activities, leads]
- "legacy_migrations_supabase_leads_migration_lead_activities": "lead_activities" | kind=code-symbol | source=supabase/legacy-migrations/supabase-leads-migration.sql:L38 | neighbors=[supabase-leads-migration.sql, leads]
- "legacy_migrations_supabase_leads_migration_leads": "leads" | kind=code-symbol | source=supabase/legacy-migrations/supabase-leads-migration.sql:L17 | neighbors=[supabase-leads-migration.sql, lead_activities]
- "legacy_migrations_supabase_telegram_migration_telegram_link_tokens": "telegram_link_tokens" | kind=code-symbol | source=supabase/legacy-migrations/supabase-telegram-migration.sql:L29 | neighbors=[supabase-telegram-migration.sql, profiles]
- "legacy_migrations_supabase_telegram_migration_telegram_mfa_codes": "telegram_mfa_codes" | kind=code-symbol | source=supabase/legacy-migrations/supabase-telegram-migration.sql:L44 | neighbors=[supabase-telegram-migration.sql, profiles]
- "legacy_migrations_supabase_telegram_migration_telegram_notification_recipients": "telegram_notification_recipients" | kind=code-symbol | source=supabase/legacy-migrations/supabase-telegram-migration.sql:L77 | neighbors=[supabase-telegram-migration.sql, profiles]
- "legacy_migrations_supabase_telegram_migration_telegram_pending_logins": "telegram_pending_logins" | kind=code-symbol | source=supabase/legacy-migrations/supabase-telegram-migration.sql:L62 | neighbors=[supabase-telegram-migration.sql, profiles]
- "lib_accounts_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L13 | neighbors=[accounts.functions.ts, getRoles()]
- "lib_accounts_functions_ensuresuper": "ensureSuper()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L17 | neighbors=[accounts.functions.ts, getRoles()]
- "lib_admin_functions_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/admin.functions.ts:L34 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensureleadsaccess": "ensureLeadsAccess()" | kind=code-symbol | source=src/lib/admin.functions.ts:L3464 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensurestaff": "ensureStaff()" | kind=code-symbol | source=src/lib/admin.functions.ts:L42 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_ensuresuperadmin": "ensureSuperAdmin()" | kind=code-symbol | source=src/lib/admin.functions.ts:L38 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_generateduerecurringtaskinstances": "generateDueRecurringTaskInstances()" | kind=code-symbol | source=src/lib/admin.functions.ts:L2140 | neighbors=[admin.functions.ts, nextRecurrenceDueDate()]
- "lib_admin_functions_getroles": "getRoles()" | kind=code-symbol | source=src/lib/admin.functions.ts:L21 | neighbors=[admin.functions.ts, ensureRoles()]
- "lib_admin_functions_nextrecurrenceduedate": "nextRecurrenceDueDate()" | kind=code-symbol | source=src/lib/admin.functions.ts:L2128 | neighbors=[admin.functions.ts, generateDueRecurringTaskInstances()]
- "lib_admin_server_admincreatecustomer": "adminCreateCustomer()" | kind=code-symbol | source=src/lib/admin.server.ts:L11 | neighbors=[admin.server.ts, generateTempPassword()]
- "lib_admin_server_admininvitestaffmember": "adminInviteStaffMember()" | kind=code-symbol | source=src/lib/admin.server.ts:L265 | neighbors=[admin.server.ts, genTempPw()]
- "lib_admin_server_generatetemppassword": "generateTempPassword()" | kind=code-symbol | source=src/lib/admin.server.ts:L3 | neighbors=[admin.server.ts, adminCreateCustomer()]
- "lib_admin_server_gentemppw": "genTempPw()" | kind=code-symbol | source=src/lib/admin.server.ts:L228 | neighbors=[admin.server.ts, adminInviteStaffMember()]
- "lib_auth_guards_server_ensureadmin": "ensureAdmin()" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L29 | neighbors=[auth-guards.server.ts, ensureRoles()]
- "lib_auth_guards_server_ensurestaff": "ensureStaff()" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L37 | neighbors=[auth-guards.server.ts, ensureRoles()]
- "lib_auth_guards_server_ensuresuperadmin": "ensureSuperAdmin()" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L33 | neighbors=[auth-guards.server.ts, ensureRoles()]
- "lib_auth_guards_server_getroles": "getRoles()" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L11 | neighbors=[auth-guards.server.ts, ensureRoles()]
- "lib_blog_links_countbodyimageswithoutalt": "countBodyImagesWithoutAlt()" | kind=code-symbol | source=src/lib/blog-links.ts:L31 | neighbors=[BlogPostForm.tsx, blog-links.ts]
- "lib_blog_links_insertmarkdownlink": "insertMarkdownLink()" | kind=code-symbol | source=src/lib/blog-links.ts:L43 | neighbors=[BlogPostForm.tsx, blog-links.ts]
- "lib_blog_server_adminduplicateblogpostimpl": "adminDuplicateBlogPostImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L239 | neighbors=[blog.server.ts, syncPostLinks()]
- "lib_blog_server_adminsuggestlinktargetsimpl": "adminSuggestLinkTargetsImpl()" | kind=code-symbol | source=src/lib/blog.server.ts:L371 | neighbors=[blog.server.ts, significantWords()]
- "lib_blog_server_significantwords": "significantWords()" | kind=code-symbol | source=src/lib/blog.server.ts:L359 | neighbors=[blog.server.ts, adminSuggestLinkTargetsImpl()]
- "lib_blog_server_syncslugredirect": "syncSlugRedirect()" | kind=code-symbol | source=src/lib/blog.server.ts:L105 | neighbors=[blog.server.ts, adminUpdateBlogPostImpl()]
- "lib_callbacks_agenda_color_classes": "AGENDA_COLOR_CLASSES" | kind=code-symbol | source=src/lib/callbacks.ts:L47 | neighbors=[CallbackAgenda.tsx, callbacks.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-021.json

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
