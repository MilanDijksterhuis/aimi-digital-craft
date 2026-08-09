# Node Description Batch 13 of 42

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

- "components_callbackagenda_startofday": "startOfDay()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L39 | neighbors=[CallbackAgenda.tsx, sameDay(), startOfWeek()]
- "components_contact_contact": "Contact()" | kind=code-symbol | source=src/components/Contact.tsx:L10 | neighbors=[Contact.tsx, contact.tsx, index.tsx]
- "components_faq_faq": "FAQ()" | kind=code-symbol | source=src/components/FAQ.tsx:L28 | neighbors=[FAQ.tsx, faq.tsx, index.tsx]
- "components_leadspanel_leaddetail": "LeadDetail()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L620 | neighbors=[LeadsPanel.tsx, initials(), relTime()]
- "components_leadspanel_leadspanel": "LeadsPanel()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L157 | neighbors=[admin.leads.tsx, LeadsPanel.tsx, admin.tsx]
- "components_locationlanding_locationdata": "LocationData" | kind=code-symbol | source=src/components/LocationLanding.tsx:L18 | neighbors=[LocationLanding.tsx, website-laten-maken-hoogeveen.tsx, website-laten-maken-veendam.tsx]
- "components_locationlanding_locationlanding": "LocationLanding()" | kind=code-symbol | source=src/components/LocationLanding.tsx:L61 | neighbors=[LocationLanding.tsx, website-laten-maken-hoogeveen.tsx, website-laten-maken-veendam.tsx]
- "components_telegrammfacard": "TelegramMfaCard.tsx" | kind=code-symbol | source=src/components/TelegramMfaCard.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, 2b1d78f telegram, TelegramMfaCard()]
- "design_handoff_meer_diensten_support_compiletemplate": "compileTemplate()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L467 | neighbors=[support.js, encodeCase(), walkChildren()]
- "design_handoff_meer_diensten_support_createcomponentfactory": "createComponentFactory()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L888 | neighbors=[support.js, getReact(), createRuntime()]
- "design_handoff_meer_diensten_support_csstoobj": "cssToObj()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L391 | neighbors=[support.js, kebabToCamel(), hostPositionStyle()]
- "design_handoff_meer_diensten_support_encodecase": "encodeCase()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L372 | neighbors=[support.js, compileTemplate(), encodeCamelAttrs()]
- "design_handoff_meer_diensten_support_importantify": "importantify()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1542 | neighbors=[support.js, scanUnquotedUrl(), stripComments()]
- "design_handoff_meer_diensten_support_init": "init()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1848 | neighbors=[support.js, createRuntime(), createStreamTracker()]
- "design_handoff_meer_diensten_support_isdeckmounttag": "isDeckMountTag()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L489 | neighbors=[support.js, walkElement(), walkXImport()]
- "design_handoff_meer_diensten_support_kebabtocamel": "kebabToCamel()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L388 | neighbors=[support.js, collectProps(), cssToObj()]
- "design_handoff_meer_diensten_support_parsedataprops": "parseDataProps()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L56 | neighbors=[support.js, parseDcDocument(), parseDcText()]
- "design_handoff_meer_diensten_support_parsedcdocument": "parseDcDocument()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L24 | neighbors=[support.js, boot(), parseDataProps()]
- "design_handoff_meer_diensten_support_scanunquotedurl": "scanUnquotedUrl()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1498 | neighbors=[support.js, importantify(), stripComments()]
- "design_handoff_meer_diensten_support_stripcomments": "stripComments()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1511 | neighbors=[support.js, importantify(), scanUnquotedUrl()]
- "design_handoff_meer_diensten_support_walkdeckchildren": "walkDeckChildren()" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L493 | neighbors=[support.js, walkElement(), walkXImport()]
- "hooks_use_form_draft": "use-form-draft.ts" | kind=code-symbol | source=src/hooks/use-form-draft.ts:L1 | neighbors=[portal.tsx, 9a2689c code fixes, useFormDraft()]
- "lib_accounts_functions_getroles": "getRoles()" | kind=code-symbol | source=src/lib/accounts.functions.ts:L9 | neighbors=[accounts.functions.ts, ensureAdmin(), ensureSuper()]
- "lib_callbacks_todatetimelocalvalue": "toDatetimeLocalValue()" | kind=code-symbol | source=src/lib/callbacks.ts:L82 | neighbors=[CallbackAgenda.tsx, CallbackScheduleModal.tsx, callbacks.ts]
- "lib_csv_parsecsv": "parseCsv()" | kind=code-symbol | source=src/lib/csv.ts:L30 | neighbors=[csv.ts, detectDelimiter(), parseLeadsCsv()]
- "lib_csv_parseleadscsv": "parseLeadsCsv()" | kind=code-symbol | source=src/lib/csv.ts:L111 | neighbors=[LeadsPanel.tsx, csv.ts, parseCsv()]
- "lib_error_capture": "error-capture.ts" | kind=code-symbol | source=src/lib/error-capture.ts:L1 | neighbors=[consumeLastCapturedError(), record(), server.ts]
- "lib_error_page": "error-page.ts" | kind=code-symbol | source=src/lib/error-page.ts:L1 | neighbors=[renderErrorPage(), server.ts, start.ts]
- "lib_error_page_rendererrorpage": "renderErrorPage()" | kind=code-symbol | source=src/lib/error-page.ts:L1 | neighbors=[error-page.ts, server.ts, start.ts]
- "lib_monitoring_shared_assertpublichost": "assertPublicHost()" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L4 | neighbors=[monitoring.shared.ts, isPrivateOrReservedIp(), measureResponseTime()]
- "lib_project_status_project_priority_values": "PROJECT_PRIORITY_VALUES" | kind=code-symbol | source=src/lib/project-status.ts:L34 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, project-status.ts]
- "lib_project_status_project_status_values": "PROJECT_STATUS_VALUES" | kind=code-symbol | source=src/lib/project-status.ts:L5 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, project-status.ts]
- "lib_status_category_keys": "CATEGORY_KEYS" | kind=code-symbol | source=src/lib/status.ts:L69 | neighbors=[admin.changes.tsx, portal.tsx, status.ts]
- "lib_status_priceforchange": "priceForChange()" | kind=code-symbol | source=src/lib/status.ts:L82 | neighbors=[portal.tsx, status.ts, isCategoryFree()]
- "lib_status_priority_color": "PRIORITY_COLOR" | kind=code-symbol | source=src/lib/status.ts:L49 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, status.ts]
- "lib_status_priority_weight": "PRIORITY_WEIGHT" | kind=code-symbol | source=src/lib/status.ts:L42 | neighbors=[admin.changes.tsx, portal.tsx, status.ts]
- "lib_telegram_server_safesend": "safeSend()" | kind=code-symbol | source=src/lib/telegram.server.ts:L181 | neighbors=[telegram.server.ts, handleTelegramWebhook(), sendTelegramMessage()]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_change_requests": "public.change_requests" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L28 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, change_requests_touch, auth.users]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_handle_new_user": "public.handle_new_user()" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L95 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, public.profiles, public.user_roles]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_user_roles": "public.user_roles" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L5 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, public.handle_new_user(), auth.users]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-012.json

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
