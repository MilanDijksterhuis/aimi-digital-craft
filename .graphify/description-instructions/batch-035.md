# Node Description Batch 36 of 49

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

- "lib_portal_functions_requestpasswordreset": "requestPasswordReset" | kind=code-symbol | source=src/lib/portal.functions.ts:L537 | neighbors=[portal.functions.ts]
- "lib_portal_functions_simple_categories_server": "SIMPLE_CATEGORIES_SERVER" | kind=code-symbol | source=src/lib/portal.functions.ts:L338 | neighbors=[portal.functions.ts]
- "lib_portal_functions_submitchangerequest": "submitChangeRequest" | kind=code-symbol | source=src/lib/portal.functions.ts:L317 | neighbors=[portal.functions.ts]
- "lib_portal_functions_updatemyprofile": "updateMyProfile" | kind=code-symbol | source=src/lib/portal.functions.ts:L92 | neighbors=[portal.functions.ts]
- "lib_project_status_projectpriority": "ProjectPriority" | kind=code-symbol | source=src/lib/project-status.ts:L36 | neighbors=[project-status.ts]
- "lib_project_status_projectprogress": "projectProgress()" | kind=code-symbol | source=src/lib/project-status.ts:L71 | neighbors=[project-status.ts]
- "lib_project_status_projectstatus": "ProjectStatus" | kind=code-symbol | source=src/lib/project-status.ts:L14 | neighbors=[project-status.ts]
- "lib_rate_limit_ban_durations_ms": "BAN_DURATIONS_MS" | kind=code-symbol | source=src/lib/rate-limit.ts:L8 | neighbors=[rate-limit.ts]
- "lib_rate_limit_banentry": "BanEntry" | kind=code-symbol | source=src/lib/rate-limit.ts:L2 | neighbors=[rate-limit.ts]
- "lib_rate_limit_bans": "bans" | kind=code-symbol | source=src/lib/rate-limit.ts:L5 | neighbors=[rate-limit.ts]
- "lib_rate_limit_entry": "Entry" | kind=code-symbol | source=src/lib/rate-limit.ts:L1 | neighbors=[rate-limit.ts]
- "lib_rate_limit_store": "store" | kind=code-symbol | source=src/lib/rate-limit.ts:L4 | neighbors=[rate-limit.ts]
- "lib_rbac_approle": "AppRole" | kind=code-symbol | source=src/lib/rbac.ts:L2 | neighbors=[rbac.ts]
- "lib_rbac_isstaffrole": "isStaffRole()" | kind=code-symbol | source=src/lib/rbac.ts:L30 | neighbors=[rbac.ts]
- "lib_rbac_staff_roles": "STAFF_ROLES" | kind=code-symbol | source=src/lib/rbac.ts:L21 | neighbors=[rbac.ts]
- "lib_seo_default_area_served": "DEFAULT_AREA_SERVED" | kind=code-symbol | source=src/lib/seo.ts:L97 | neighbors=[seo.ts]
- "lib_seo_ldscript": "LdScript" | kind=code-symbol | source=src/lib/seo.ts:L89 | neighbors=[seo.ts]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-035.json

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
