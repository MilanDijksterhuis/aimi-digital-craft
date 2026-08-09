# Node Description Batch 32 of 42

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

- "lib_rate_limit_ban_durations_ms": "BAN_DURATIONS_MS" | kind=code-symbol | source=src/lib/rate-limit.ts:L8 | neighbors=[rate-limit.ts]
- "lib_rate_limit_banentry": "BanEntry" | kind=code-symbol | source=src/lib/rate-limit.ts:L2 | neighbors=[rate-limit.ts]
- "lib_rate_limit_bans": "bans" | kind=code-symbol | source=src/lib/rate-limit.ts:L5 | neighbors=[rate-limit.ts]
- "lib_rate_limit_entry": "Entry" | kind=code-symbol | source=src/lib/rate-limit.ts:L1 | neighbors=[rate-limit.ts]
- "lib_rate_limit_store": "store" | kind=code-symbol | source=src/lib/rate-limit.ts:L4 | neighbors=[rate-limit.ts]
- "lib_rbac_approle": "AppRole" | kind=code-symbol | source=src/lib/rbac.ts:L2 | neighbors=[rbac.ts]
- "lib_rbac_isstaffrole": "isStaffRole()" | kind=code-symbol | source=src/lib/rbac.ts:L30 | neighbors=[rbac.ts]
- "lib_rbac_staff_roles": "STAFF_ROLES" | kind=code-symbol | source=src/lib/rbac.ts:L21 | neighbors=[rbac.ts]
- "lib_seo_ldscript": "LdScript" | kind=code-symbol | source=src/lib/seo.ts:L8 | neighbors=[seo.ts]
- "lib_status_simple_categories": "SIMPLE_CATEGORIES" | kind=code-symbol | source=src/lib/status.ts:L73 | neighbors=[status.ts]
- "lib_status_status_flow": "STATUS_FLOW" | kind=code-symbol | source=src/lib/status.ts:L13 | neighbors=[status.ts]
- "lib_telegram_functions_admincreaterecipient": "adminCreateRecipient" | kind=code-symbol | source=src/lib/telegram.functions.ts:L125 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_admindeleterecipient": "adminDeleteRecipient" | kind=code-symbol | source=src/lib/telegram.functions.ts:L193 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_admingeneraterecipientlink": "adminGenerateRecipientLink" | kind=code-symbol | source=src/lib/telegram.functions.ts:L142 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_admingeneratetelegramlink": "adminGenerateTelegramLink" | kind=code-symbol | source=src/lib/telegram.functions.ts:L13 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_admingettelegramstatus": "adminGetTelegramStatus" | kind=code-symbol | source=src/lib/telegram.functions.ts:L25 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_adminlistrecipients": "adminListRecipients" | kind=code-symbol | source=src/lib/telegram.functions.ts:L112 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_adminsetmfaenabled": "adminSetMfaEnabled" | kind=code-symbol | source=src/lib/telegram.functions.ts:L73 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_adminsetrecipientnotify": "adminSetRecipientNotify" | kind=code-symbol | source=src/lib/telegram.functions.ts:L167 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_admintogglerecipient": "adminToggleRecipient" | kind=code-symbol | source=src/lib/telegram.functions.ts:L153 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_adminunlinktelegram": "adminUnlinkTelegram" | kind=code-symbol | source=src/lib/telegram.functions.ts:L45 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_anonclient": "anonClient()" | kind=code-symbol | source=src/lib/telegram.functions.ts:L218 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_loginresendmfa": "loginResendMfa" | kind=code-symbol | source=src/lib/telegram.functions.ts:L316 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_loginstart": "loginStart" | kind=code-symbol | source=src/lib/telegram.functions.ts:L227 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_loginverifymfa": "loginVerifyMfa" | kind=code-symbol | source=src/lib/telegram.functions.ts:L285 | neighbors=[telegram.functions.ts]
- "lib_telegram_server_linkscope": "LinkScope" | kind=code-symbol | source=src/lib/telegram.server.ts:L65 | neighbors=[telegram.server.ts]
- "lib_telegram_server_notifynewchange": "notifyNewChange()" | kind=code-symbol | source=src/lib/telegram.server.ts:L290 | neighbors=[telegram.server.ts]
- "lib_telegram_server_telegramupdate": "TelegramUpdate" | kind=code-symbol | source=src/lib/telegram.server.ts:L113 | neighbors=[telegram.server.ts]
- "lib_telegram_server_verifymfacode": "verifyMfaCode()" | kind=code-symbol | source=src/lib/telegram.server.ts:L249 | neighbors=[telegram.server.ts]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_available_credits": "public.available_credits()" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L81 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_has_role": "public.has_role()" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L74 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…]
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_public_touch_updated_at": "public.touch_updated_at()" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L116 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_customer_costs": "public.customer_costs" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L85 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_onboarding_items": "public.onboarding_items" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L102 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…]
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf_public_reply_snippets": "public.reply_snippets" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L118 | neighbors=[20260523190624_1b6c9585-e5a9-4c6a-a6fb-…]
- "migrations_20260523192559_036cdcd0_b4f9_4d34_8244_5b307069818e": "20260523192559_036cdcd0-b4f9-4d34-8244-5b307069818e.sql" | kind=code-symbol | source=supabase/migrations/20260523192559_036cdcd0-b4f9-4d34-8244-5b307069818e.sql:L1 | neighbors=[public.appointments]
- "migrations_20260523192559_036cdcd0_b4f9_4d34_8244_5b307069818e_public_appointments": "public.appointments" | kind=code-symbol | source=supabase/migrations/20260523192559_036cdcd0-b4f9-4d34-8244-5b307069818e.sql:L8 | neighbors=[20260523192559_036cdcd0-b4f9-4d34-8244-…]
- "migrations_20260523211523_78239514_1a0c_4fc7_8d4a_5886dda4b322": "20260523211523_78239514-1a0c-4fc7-8d4a-5886dda4b322.sql" | kind=code-symbol | source=supabase/migrations/20260523211523_78239514-1a0c-4fc7-8d4a-5886dda4b322.sql:L1 | neighbors=[public.available_credits()]
- "migrations_20260523211523_78239514_1a0c_4fc7_8d4a_5886dda4b322_public_available_credits": "public.available_credits()" | kind=code-symbol | source=supabase/migrations/20260523211523_78239514-1a0c-4fc7-8d4a-5886dda4b322.sql:L10 | neighbors=[20260523211523_78239514-1a0c-4fc7-8d4a-…]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017_public_client_contacts": "public.client_contacts" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L22 | neighbors=[20260523213826_e88fd443-0f7e-4ead-ab91-…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-031.json

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
