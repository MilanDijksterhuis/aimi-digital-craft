# Node Description Batch 17 of 57

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

- "design_handoff_meer_diensten_support_parsedataprops": "parseDataProps()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L56 | neighbors=[support.js, parseDcDocument(), parseDcText()]
- "design_handoff_meer_diensten_support_parsedcdocument": "parseDcDocument()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L24 | neighbors=[support.js, boot(), parseDataProps()]
- "design_handoff_meer_diensten_support_scanunquotedurl": "scanUnquotedUrl()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1498 | neighbors=[support.js, importantify(), stripComments()]
- "design_handoff_meer_diensten_support_stripcomments": "stripComments()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1511 | neighbors=[support.js, importantify(), scanUnquotedUrl()]
- "design_handoff_meer_diensten_support_walkdeckchildren": "walkDeckChildren()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L493 | neighbors=[support.js, walkElement(), walkXImport()]
- "hooks_use_form_draft": "use-form-draft.ts" | kind=code-symbol | source=src/hooks/use-form-draft.ts:L1 | neighbors=[portal.tsx, 9a2689c code fixes, useFormDraft()]
- "kaart_hoogeveen_veendam_support_compiletemplate": "compileTemplate()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L467 | neighbors=[support.js, encodeCase(), walkChildren()]
- "kaart_hoogeveen_veendam_support_createcomponentfactory": "createComponentFactory()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L888 | neighbors=[support.js, getReact(), createRuntime()]
- "kaart_hoogeveen_veendam_support_csstoobj": "cssToObj()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L391 | neighbors=[support.js, kebabToCamel(), hostPositionStyle()]
- "kaart_hoogeveen_veendam_support_encodecase": "encodeCase()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L372 | neighbors=[support.js, compileTemplate(), encodeCamelAttrs()]
- "kaart_hoogeveen_veendam_support_importantify": "importantify()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1542 | neighbors=[support.js, scanUnquotedUrl(), stripComments()]
- "kaart_hoogeveen_veendam_support_init": "init()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1848 | neighbors=[support.js, createRuntime(), createStreamTracker()]
- "kaart_hoogeveen_veendam_support_isdeckmounttag": "isDeckMountTag()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L489 | neighbors=[support.js, walkElement(), walkXImport()]
- "kaart_hoogeveen_veendam_support_kebabtocamel": "kebabToCamel()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L388 | neighbors=[support.js, collectProps(), cssToObj()]
- "kaart_hoogeveen_veendam_support_parsedataprops": "parseDataProps()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L56 | neighbors=[support.js, parseDcDocument(), parseDcText()]
- "kaart_hoogeveen_veendam_support_parsedcdocument": "parseDcDocument()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L24 | neighbors=[support.js, boot(), parseDataProps()]
- "kaart_hoogeveen_veendam_support_scanunquotedurl": "scanUnquotedUrl()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1498 | neighbors=[support.js, importantify(), stripComments()]
- "kaart_hoogeveen_veendam_support_stripcomments": "stripComments()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1511 | neighbors=[support.js, importantify(), scanUnquotedUrl()]
- "kaart_hoogeveen_veendam_support_walkdeckchildren": "walkDeckChildren()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L493 | neighbors=[support.js, walkElement(), walkXImport()]
- "legacy_migrations_supabase_migration_profiles": "profiles" | kind=code-symbol | source=supabase/legacy-migrations/supabase-migration.sql:L129 | neighbors=[supabase-migration.sql, project_members, projects]
- "legacy_migrations_supabase_migration_project_members": "project_members" | kind=code-symbol | source=supabase/legacy-migrations/supabase-migration.sql:L134 | neighbors=[supabase-migration.sql, profiles, projects]
- "legacy_migrations_supabase_migration_projects": "projects" | kind=code-symbol | source=supabase/legacy-migrations/supabase-migration.sql:L124 | neighbors=[supabase-migration.sql, project_members, profiles]
- "lib_accounts_functions_getroles": "getRoles()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L9 | neighbors=[accounts.functions.ts, ensureAdmin(), ensureSuper()]
- "lib_blog_links_extractinternallinks": "extractInternalLinks()" | kind=code-symbol | source=src/lib/blog-links.ts:L12 | neighbors=[blog-links.ts, hasInternalLink(), blog.server.ts]
- "lib_blog_links_hasinternallink": "hasInternalLink()" | kind=code-symbol | source=src/lib/blog-links.ts:L25 | neighbors=[BlogPostForm.tsx, blog-links.ts, extractInternalLinks()]
- "lib_blog_schedule_adddays": "addDays()" | kind=code-symbol | source=src/lib/blog-schedule.ts:L14 | neighbors=[blog-schedule.ts, computeScheduleDates(), rollToWorkday()]
- "lib_blog_schedule_rolltoworkday": "rollToWorkday()" | kind=code-symbol | source=src/lib/blog-schedule.ts:L21 | neighbors=[blog-schedule.ts, computeScheduleDates(), addDays()]
- "lib_blog_server_assertuniqueslug": "assertUniqueSlug()" | kind=code-symbol | source=src/lib/blog.server.ts:L8 | neighbors=[blog.server.ts, adminCreateBlogPostImpl(), adminUpdateBlogPostImpl()]
- "lib_blog_server_resolvestatusfields": "resolveStatusFields()" | kind=code-symbol | source=src/lib/blog.server.ts:L128 | neighbors=[blog.server.ts, adminCreateBlogPostImpl(), adminUpdateBlogPostImpl()]
- "lib_callbacks_todatetimelocalvalue": "toDatetimeLocalValue()" | kind=code-symbol | source=src/lib/callbacks.ts:L82 | neighbors=[CallbackAgenda.tsx, CallbackScheduleModal.tsx, callbacks.ts]
- "lib_csv_parsecsv": "parseCsv()" | kind=code-symbol | source=src/lib/csv.ts:L30 | neighbors=[csv.ts, detectDelimiter(), parseLeadsCsv()]
- "lib_csv_parseleadscsv": "parseLeadsCsv()" | kind=code-symbol | source=src/lib/csv.ts:L111 | neighbors=[LeadsPanel.tsx, csv.ts, parseCsv()]
- "lib_error_capture": "error-capture.ts" | kind=code-symbol | source=src/lib/error-capture.ts:L1 | neighbors=[consumeLastCapturedError(), record(), server.ts]
- "lib_error_page": "error-page.ts" | kind=code-symbol | source=src/lib/error-page.ts:L1 | neighbors=[renderErrorPage(), server.ts, start.ts]
- "lib_error_page_rendererrorpage": "renderErrorPage()" | kind=code-symbol | source=src/lib/error-page.ts:L1 | neighbors=[error-page.ts, server.ts, start.ts]
- "lib_markdown_estimatereadtime": "estimateReadTime()" | kind=code-symbol | source=src/lib/markdown.tsx:L81 | neighbors=[markdown.tsx, blog.tsx, blog_.$slug.tsx]
- "lib_markdown_markdownbody": "MarkdownBody()" | kind=code-symbol | source=src/lib/markdown.tsx:L87 | neighbors=[BlogPostForm.tsx, markdown.tsx, blog_.$slug.tsx]
- "lib_monitoring_shared_assertpublichost": "assertPublicHost()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L4 | neighbors=[monitoring.shared.ts, isPrivateOrReservedIp(), measureResponseTime()]
- "lib_project_status_project_priority_values": "PROJECT_PRIORITY_VALUES" | kind=code-symbol | source=src/lib/project-status.ts:L34 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, project-status.ts]
- "lib_project_status_project_status_values": "PROJECT_STATUS_VALUES" | kind=code-symbol | source=src/lib/project-status.ts:L5 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, project-status.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-016.json

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
