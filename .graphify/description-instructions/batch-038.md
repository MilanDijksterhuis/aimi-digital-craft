# Node Description Batch 39 of 52

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

- "lib_seo_nl_months": "NL_MONTHS" | kind=code-symbol | source=src/lib/seo.ts:L189 | neighbors=[seo.ts]
- "lib_status_blog_status_color": "BLOG_STATUS_COLOR" | kind=code-symbol | source=src/lib/status.ts:L79 | neighbors=[status.ts]
- "lib_status_blog_status_label": "BLOG_STATUS_LABEL" | kind=code-symbol | source=src/lib/status.ts:L73 | neighbors=[status.ts]
- "lib_status_simple_categories": "SIMPLE_CATEGORIES" | kind=code-symbol | source=src/lib/status.ts:L87 | neighbors=[status.ts]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-038.json

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
