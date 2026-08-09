# Node Description Batch 33 of 41

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

- "migrations_20260714120000_customer_self_onboarding_toggle": "20260714120000_customer_self_onboarding_toggle.sql" | kind=code-symbol | source=supabase/migrations/20260714120000_customer_self_onboarding_toggle.sql:L1 | neighbors=[2fcc9a3 fixes]
- "migrations_20260716090000_customer_portal_tutorial_toggle": "20260716090000_customer_portal_tutorial_toggle.sql" | kind=code-symbol | source=supabase/migrations/20260716090000_customer_portal_tutorial_toggle.sql:L1 | neighbors=[ee6f2e6 fixes]
- "migrations_20260717120000_sec1_pin_block_expiry_columns": "20260717120000_sec1_pin_block_expiry_columns.sql" | kind=code-symbol | source=supabase/migrations/20260717120000_sec1_pin_block_expiry_columns.sql:L1 | neighbors=[a3773ee sec fixes]
- "migrations_20260717130000_project_rls_baseline_public_is_project_member": "public.is_project_member()" | kind=code-symbol | source=supabase/migrations/20260717130000_project_rls_baseline.sql:L39 | neighbors=[20260717130000_project_rls_baseline.sql]
- "migrations_20260717130000_project_rls_baseline_public_is_staff_user": "public.is_staff_user()" | kind=code-symbol | source=supabase/migrations/20260717130000_project_rls_baseline.sql:L27 | neighbors=[20260717130000_project_rls_baseline.sql]
- "migrations_20260717140000_sec4_own_projects_primary_user": "20260717140000_sec4_own_projects_primary_user.sql" | kind=code-symbol | source=supabase/migrations/20260717140000_sec4_own_projects_primary_user.sql:L1 | neighbors=[a3773ee sec fixes]
- "migrations_20260717150000_sec5_durable_rate_limit_public_is_ip_banned": "public.is_ip_banned()" | kind=code-symbol | source=supabase/migrations/20260717150000_sec5_durable_rate_limit.sql:L68 | neighbors=[20260717150000_sec5_durable_rate_limit.…]
- "migrations_20260717160000_perf1_indexes": "20260717160000_perf1_indexes.sql" | kind=code-symbol | source=supabase/migrations/20260717160000_perf1_indexes.sql:L1 | neighbors=[7dbbf18 perf fixes]
- "migrations_20260717170000_perf2_site_ping_counts_public_site_ping_counts": "public.site_ping_counts()" | kind=code-symbol | source=supabase/migrations/20260717170000_perf2_site_ping_counts.sql:L14 | neighbors=[20260717170000_perf2_site_ping_counts.s…]
- "migrations_20260717180000_perf3_project_last_activity_public_project_last_activity": "public.project_last_activity()" | kind=code-symbol | source=supabase/migrations/20260717180000_perf3_project_last_activity.sql:L9 | neighbors=[20260717180000_perf3_project_last_activ…]
- "public_site_error_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L6 | neighbors=[site-error.ts]
- "public_site_error_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L12 | neighbors=[site-error.ts]
- "public_site_ping_body": "Body" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L6 | neighbors=[site-ping.ts]
- "public_site_ping_cors": "cors" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L12 | neighbors=[site-ping.ts]
- "routes_algemene_voorwaarden_voorwaardenpage": "VoorwaardenPage()" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L15 | neighbors=[algemene-voorwaarden.tsx]
- "routes_authenticated_accountmenu": "AccountMenu()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L148 | neighbors=[_authenticated.tsx]
- "routes_authenticated_authlayout": "AuthLayout()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L34 | neighbors=[_authenticated.tsx]
- "routes_authenticated_inner": "Inner()" | kind=code-symbol | source=src/routes/_authenticated.tsx:L42 | neighbors=[_authenticated.tsx]
- "routes_faq_faqpage": "FaqPage()" | kind=code-symbol | source=src/routes/faq.tsx:L24 | neighbors=[faq.tsx]
- "routes_index_index": "Index()" | kind=code-symbol | source=src/routes/index.tsx:L77 | neighbors=[index.tsx]
- "routes_login_loginpage": "LoginPage()" | kind=code-symbol | source=src/routes/login.tsx:L18 | neighbors=[login.tsx]
- "routes_meer_diensten_bloom": "Bloom" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L121 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_branch": "Branch" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L120 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_embergroup": "EmberGroup" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L123 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_fork": "FORK" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L89 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_pt": "Pt" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L91 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_qpoint": "qPoint()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L93 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_qtangent": "qTangent()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L100 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_red": "RED()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L15 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_root": "ROOT" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L88 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_service": "Service" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L20 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_services": "SERVICES" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L34 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_splitquad": "splitQuad()" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L110 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_store": "Store" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L328 | neighbors=[meer-diensten.tsx]
- "routes_meer_diensten_surge": "Surge" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L122 | neighbors=[meer-diensten.tsx]
- "routes_over_ons_overons": "OverOns()" | kind=code-symbol | source=src/routes/over-ons.tsx:L54 | neighbors=[over-ons.tsx]
- "routes_over_ons_stats": "stats" | kind=code-symbol | source=src/routes/over-ons.tsx:L7 | neighbors=[over-ons.tsx]
- "routes_over_ons_values": "values" | kind=code-symbol | source=src/routes/over-ons.tsx:L14 | neighbors=[over-ons.tsx]
- "routes_privacybeleid_privacypage": "PrivacyPage()" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L15 | neighbors=[privacybeleid.tsx]
- "routes_root_errorcomponent": "ErrorComponent()" | kind=code-symbol | source=src/routes/__root.tsx:L40 | neighbors=[__root.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-032.json

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
