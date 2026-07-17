# Node Description Batch 27 of 35

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

- "migrations_20260523211523_78239514_1a0c_4fc7_8d4a_5886dda4b322": "20260523211523_78239514-1a0c-4fc7-8d4a-5886dda4b322.sql" | kind=code-symbol | source=supabase/migrations/20260523211523_78239514-1a0c-4fc7-8d4a-5886dda4b322.sql:L1 | neighbors=[public.available_credits()]
- "migrations_20260523211523_78239514_1a0c_4fc7_8d4a_5886dda4b322_public_available_credits": "public.available_credits()" | kind=code-symbol | source=supabase/migrations/20260523211523_78239514-1a0c-4fc7-8d4a-5886dda4b322.sql:L10 | neighbors=[20260523211523_78239514-1a0c-4fc7-8d4a-…]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017_public_client_contacts": "public.client_contacts" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L22 | neighbors=[20260523213826_e88fd443-0f7e-4ead-ab91-…]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017_public_login_events": "public.login_events" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L36 | neighbors=[20260523213826_e88fd443-0f7e-4ead-ab91-…]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017_public_site_errors": "public.site_errors" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L62 | neighbors=[20260523213826_e88fd443-0f7e-4ead-ab91-…]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017_public_site_pings": "public.site_pings" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L49 | neighbors=[20260523213826_e88fd443-0f7e-4ead-ab91-…]
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf_public_user_presence": "public.user_presence" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L25 | neighbors=[20260523221229_0bee5172-97fa-490f-8bd8-…]
- "migrations_20260523221809_68010212_e7a6_4d77_92dc_e3309d2c6d55": "20260523221809_68010212-e7a6-4d77-92dc-e3309d2c6d55.sql" | kind=code-symbol | source=supabase/migrations/20260523221809_68010212-e7a6-4d77-92dc-e3309d2c6d55.sql:L1 | neighbors=[public.available_credits()]
- "migrations_20260523221809_68010212_e7a6_4d77_92dc_e3309d2c6d55_public_available_credits": "public.available_credits()" | kind=code-symbol | source=supabase/migrations/20260523221809_68010212-e7a6-4d77-92dc-e3309d2c6d55.sql:L2 | neighbors=[20260523221809_68010212-e7a6-4d77-92dc-…]
- "migrations_20260523222514_76072c48_00ff_4a61_8b80_8230f2a74134": "20260523222514_76072c48-00ff-4a61-8b80-8230f2a74134.sql" | kind=code-symbol | source=supabase/migrations/20260523222514_76072c48-00ff-4a61-8b80-8230f2a74134.sql:L1 | neighbors=[public.has_role()]
- "migrations_20260523222514_76072c48_00ff_4a61_8b80_8230f2a74134_public_has_role": "public.has_role()" | kind=code-symbol | source=supabase/migrations/20260523222514_76072c48-00ff-4a61-8b80-8230f2a74134.sql:L1 | neighbors=[20260523222514_76072c48-00ff-4a61-8b80-…]
- "migrations_20260523222548_37e6cf4c_26dd_416f_ae8a_1a9bf3ce42ed": "20260523222548_37e6cf4c-26dd-416f-ae8a-1a9bf3ce42ed.sql" | kind=code-symbol | source=supabase/migrations/20260523222548_37e6cf4c-26dd-416f-ae8a-1a9bf3ce42ed.sql:L1 | neighbors=[public.has_role()]
- "migrations_20260523222548_37e6cf4c_26dd_416f_ae8a_1a9bf3ce42ed_public_has_role": "public.has_role()" | kind=code-symbol | source=supabase/migrations/20260523222548_37e6cf4c-26dd-416f-ae8a-1a9bf3ce42ed.sql:L1 | neighbors=[20260523222548_37e6cf4c-26dd-416f-ae8a-…]
- "migrations_20260523222619_97b0ab7e_0852_46af_8704_4acb849c348d": "20260523222619_97b0ab7e-0852-46af-8704-4acb849c348d.sql" | kind=code-symbol | source=supabase/migrations/20260523222619_97b0ab7e-0852-46af-8704-4acb849c348d.sql:L1 | neighbors=[public.available_credits()]
- "migrations_20260523222619_97b0ab7e_0852_46af_8704_4acb849c348d_public_available_credits": "public.available_credits()" | kind=code-symbol | source=supabase/migrations/20260523222619_97b0ab7e-0852-46af-8704-4acb849c348d.sql:L1 | neighbors=[20260523222619_97b0ab7e-0852-46af-8704-…]
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17_public_audit_log": "public.audit_log" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L74 | neighbors=[20260523223743_d2a22147-7462-4990-8bbd-…]
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17_public_has_any_role": "public.has_any_role()" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L36 | neighbors=[20260523223743_d2a22147-7462-4990-8bbd-…]
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17_public_has_role": "public.has_role()" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L10 | neighbors=[20260523223743_d2a22147-7462-4990-8bbd-…]
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17_public_is_staff": "public.is_staff()" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L52 | neighbors=[20260523223743_d2a22147-7462-4990-8bbd-…]
- "migrations_20260523223743_d2a22147_7462_4990_8bbd_2393474e6c17_public_is_super_admin": "public.is_super_admin()" | kind=code-symbol | source=supabase/migrations/20260523223743_d2a22147-7462-4990-8bbd-2393474e6c17.sql:L58 | neighbors=[20260523223743_d2a22147-7462-4990-8bbd-…]
- "migrations_20260523230242_fc262cc7_dc2e_4ff3_bd1e_ce9dd2286b61": "20260523230242_fc262cc7-dc2e-4ff3-bd1e-ce9dd2286b61.sql" | kind=code-symbol | source=supabase/migrations/20260523230242_fc262cc7-dc2e-4ff3-bd1e-ce9dd2286b61.sql:L1 | neighbors=[public.contact_submissions]
- "migrations_20260523230242_fc262cc7_dc2e_4ff3_bd1e_ce9dd2286b61_public_contact_submissions": "public.contact_submissions" | kind=code-symbol | source=supabase/migrations/20260523230242_fc262cc7-dc2e-4ff3-bd1e-ce9dd2286b61.sql:L2 | neighbors=[20260523230242_fc262cc7-dc2e-4ff3-bd1e-…]
- "migrations_20260524095411_23164716_fa8a_4889_832b_f72b78c962ad_public_extra_change_requests": "public.extra_change_requests" | kind=code-symbol | source=supabase/migrations/20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql:L37 | neighbors=[20260524095411_23164716-fa8a-4889-832b-…]
- "migrations_20260524095411_23164716_fa8a_4889_832b_f72b78c962ad_public_password_reset_requests": "public.password_reset_requests" | kind=code-symbol | source=supabase/migrations/20260524095411_23164716-fa8a-4889-832b-f72b78c962ad.sql:L6 | neighbors=[20260524095411_23164716-fa8a-4889-832b-…]
- "migrations_20260524100732_01aa016d_d09a_439e_a7a9_6f5f2c3138e0_public_is_super_admin": "public.is_super_admin()" | kind=code-symbol | source=supabase/migrations/20260524100732_01aa016d-d09a-439e-a7a9-6f5f2c3138e0.sql:L14 | neighbors=[20260524100732_01aa016d-d09a-439e-a7a9-…]
- "migrations_20260524104213_c69cd657_d923_41b6_a4eb_02eef1c9606c_public_admin_notifications": "public.admin_notifications" | kind=code-symbol | source=supabase/migrations/20260524104213_c69cd657-d923-41b6-a4eb-02eef1c9606c.sql:L41 | neighbors=[20260524104213_c69cd657-d923-41b6-a4eb-…]
- "migrations_20260713120000_project_detail_expansion": "20260713120000_project_detail_expansion.sql" | kind=code-symbol | source=supabase/migrations/20260713120000_project_detail_expansion.sql:L1 | neighbors=[7f7208a new]
- "migrations_20260714100000_role_permissions_seed": "20260714100000_role_permissions_seed.sql" | kind=code-symbol | source=supabase/migrations/20260714100000_role_permissions_seed.sql:L1 | neighbors=[81a87ed commit]
- "migrations_20260714110000_customer_onboarding_flow": "20260714110000_customer_onboarding_flow.sql" | kind=code-symbol | source=supabase/migrations/20260714110000_customer_onboarding_flow.sql:L1 | neighbors=[2fcc9a3 fixes]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-026.json

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
