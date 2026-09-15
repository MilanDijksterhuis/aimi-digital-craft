# Node Description Batch 37 of 49

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

- "lib_telegram_functions_adminsetrecipientnotify": "adminSetRecipientNotify" | kind=code-symbol | source=src/lib/telegram.functions.ts:L167 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_admintogglerecipient": "adminToggleRecipient" | kind=code-symbol | source=src/lib/telegram.functions.ts:L153 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_adminunlinktelegram": "adminUnlinkTelegram" | kind=code-symbol | source=src/lib/telegram.functions.ts:L45 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_anonclient": "anonClient()" | kind=code-symbol | source=src/lib/telegram.functions.ts:L218 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_loginresendmfa": "loginResendMfa" | kind=code-symbol | source=src/lib/telegram.functions.ts:L320 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_loginstart": "loginStart" | kind=code-symbol | source=src/lib/telegram.functions.ts:L227 | neighbors=[telegram.functions.ts]
- "lib_telegram_functions_loginverifymfa": "loginVerifyMfa" | kind=code-symbol | source=src/lib/telegram.functions.ts:L289 | neighbors=[telegram.functions.ts]
- "lib_telegram_server_linkscope": "LinkScope" | kind=code-symbol | source=src/lib/telegram.server.ts:L77 | neighbors=[telegram.server.ts]
- "lib_telegram_server_notifynewchange": "notifyNewChange()" | kind=code-symbol | source=src/lib/telegram.server.ts:L302 | neighbors=[telegram.server.ts]
- "lib_telegram_server_telegramupdate": "TelegramUpdate" | kind=code-symbol | source=src/lib/telegram.server.ts:L125 | neighbors=[telegram.server.ts]
- "lib_telegram_server_verifymfacode": "verifyMfaCode()" | kind=code-symbol | source=src/lib/telegram.server.ts:L261 | neighbors=[telegram.server.ts]
- "lib_website_checker_functions_checkwebsite": "checkWebsite" | kind=code-symbol | source=src/lib/website-checker.functions.ts:L31 | neighbors=[website-checker.functions.ts]
- "lib_website_checker_functions_haship": "hashIp()" | kind=code-symbol | source=src/lib/website-checker.functions.ts:L26 | neighbors=[website-checker.functions.ts]
- "lib_website_checker_functions_urlinput": "UrlInput" | kind=code-symbol | source=src/lib/website-checker.functions.ts:L9 | neighbors=[website-checker.functions.ts]
- "lib_website_checker_server_blocked_hostnames": "BLOCKED_HOSTNAMES" | kind=code-symbol | source=src/lib/website-checker.server.ts:L21 | neighbors=[website-checker.server.ts]
- "lib_website_checker_server_blocked_ipv4_ranges": "BLOCKED_IPV4_RANGES" | kind=code-symbol | source=src/lib/website-checker.server.ts:L34 | neighbors=[website-checker.server.ts]
- "lib_website_checker_server_categoryscore": "CategoryScore" | kind=code-symbol | source=src/lib/website-checker.server.ts:L214 | neighbors=[website-checker.server.ts]
- "lib_website_checker_server_checkresult": "CheckResult" | kind=code-symbol | source=src/lib/website-checker.server.ts:L206 | neighbors=[website-checker.server.ts]
- "lib_website_checker_server_checkstatus": "CheckStatus" | kind=code-symbol | source=src/lib/website-checker.server.ts:L204 | neighbors=[website-checker.server.ts]
- "lib_website_checker_server_fetchedpage": "FetchedPage" | kind=code-symbol | source=src/lib/website-checker.server.ts:L123 | neighbors=[website-checker.server.ts]
- "lib_website_checker_server_ssrfblockederror_constructor": ".constructor()" | kind=code-symbol | source=src/lib/website-checker.server.ts:L69 | neighbors=[SsrfBlockedError]
- "lib_website_checker_server_ssrfsafeagent": "ssrfSafeAgent" | kind=code-symbol | source=src/lib/website-checker.server.ts:L113 | neighbors=[website-checker.server.ts]
- "lib_website_checker_server_websitecheckreport": "WebsiteCheckReport" | kind=code-symbol | source=src/lib/website-checker.server.ts:L220 | neighbors=[website-checker.server.ts]
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
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017_public_login_events": "public.login_events" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L36 | neighbors=[20260523213826_e88fd443-0f7e-4ead-ab91-…]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017_public_site_errors": "public.site_errors" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L62 | neighbors=[20260523213826_e88fd443-0f7e-4ead-ab91-…]
- "migrations_20260523213826_e88fd443_0f7e_4ead_ab91_f3d19f723017_public_site_pings": "public.site_pings" | kind=code-symbol | source=supabase/migrations/20260523213826_e88fd443-0f7e-4ead-ab91-f3d19f723017.sql:L49 | neighbors=[20260523213826_e88fd443-0f7e-4ead-ab91-…]
- "migrations_20260523221229_0bee5172_97fa_490f_8bd8_70dca65853cf_public_user_presence": "public.user_presence" | kind=code-symbol | source=supabase/migrations/20260523221229_0bee5172-97fa-490f-8bd8-70dca65853cf.sql:L25 | neighbors=[20260523221229_0bee5172-97fa-490f-8bd8-…]
- "migrations_20260523221809_68010212_e7a6_4d77_92dc_e3309d2c6d55": "20260523221809_68010212-e7a6-4d77-92dc-e3309d2c6d55.sql" | kind=code-symbol | source=supabase/migrations/20260523221809_68010212-e7a6-4d77-92dc-e3309d2c6d55.sql:L1 | neighbors=[public.available_credits()]
- "migrations_20260523221809_68010212_e7a6_4d77_92dc_e3309d2c6d55_public_available_credits": "public.available_credits()" | kind=code-symbol | source=supabase/migrations/20260523221809_68010212-e7a6-4d77-92dc-e3309d2c6d55.sql:L2 | neighbors=[20260523221809_68010212-e7a6-4d77-92dc-…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-036.json

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
