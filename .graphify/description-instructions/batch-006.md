# Node Description Batch 7 of 36

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@df16e8400059578ecde8314c62d9c152270ef7f2": "df16e84 Changes" | kind=Commit | source=git | neighbors=[5820182 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@df1c05d06f132dd79cdfebb551facd0c7e456743": "df1c05d Changes" | kind=Commit | source=git | neighbors=[282fc41 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e6fbbec0493ba2f7136608281f27571ba14ba958": "e6fbbec Changes" | kind=Commit | source=git | neighbors=[3ee5ecb Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e810b38d7162721ad9ed35ac36ed8e01719f88d6": "e810b38 Changes" | kind=Commit | source=git | neighbors=[ad950dd Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e8bc1c3ebcf8f44588939a9dbf466b7357b20b90": "e8bc1c3 Changes" | kind=Commit | source=git | neighbors=[408d241 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ea845f437b1bba262dea3e254841e2164363ec6b": "ea845f4 Changes" | kind=Commit | source=git | neighbors=[dd0d069 Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ec6c394c095bfc4b63c245d126b2a1c45256eabe": "ec6c394 Fix typo in Hero component text" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f099d92d74bba337e0ab1a935f9073110bd0746a": "f099d92 Changes" | kind=Commit | source=git | neighbors=[a8b31df Changes, admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f0dfd240ec8d8b6be6d448066bba02c3167b78bd": "f0dfd24 Services: interactief tab-panel a la Giga.ai" | kind=Commit | source=git | neighbors=[965b87a Fix foto, nav animaties, portal…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f24ecdb825f21afef199789efb50d2b531a53d9f": "f24ecdb Change server preset from 'bun' to 'node-server'" | kind=Commit | source=git | neighbors=[e0af60e Update package.json, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f263aebb5eb57cc356769f2699c16ba0c9c058fe": "f263aeb Update text in Hero component" | kind=Commit | source=git | neighbors=[4c798fc Code edited in Lovable Code Edi…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f32700a606ceb1b595f26a5598e5d7db4c9da993": "f32700a Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f9e4bcf532d82fb67f8f830cafb241014d20dd1f": "f9e4bcf Changes" | kind=Commit | source=git | neighbors=[0d60453 Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fb1c670fc9159c6d72de0ce53227e1ba130b7e7f": "fb1c670 Changes" | kind=Commit | source=git | neighbors=[ab14295 Design overhauled, A11y-bar weg, account.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fc5a347b0ae96f688eb824d5c81250fe839fba25": "fc5a347 Changes" | kind=Commit | source=git | neighbors=[e8bc1c3 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fd049dcd858567e6a8441126f9959c5616dcdb9e": "fd049dc Changes" | kind=Commit | source=git | neighbors=[f32700a Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe54e439bab146978cab37d3da8487cace37b71c": "fe54e43 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[273dbce Code edited in Lovable Code Edi…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe58e74f4e11df12e00354190618fb071148ee4d": "fe58e74 Update vite.config.ts" | kind=Commit | source=git | neighbors=[260e9c9 Change Supabase project credent…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "components_adminchatpanel": "AdminChatPanel.tsx" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L1 | neighbors=[admin.tsx, 7443b54 Fix root cause: catch Supabase …, 7dbbf18 perf fixes, c3a6178 portal changes, f2eb4fe Fix root cause: catch Supabase …, AdminChatPanel()] | lang=en
- "components_chatwidget": "ChatWidget.tsx" | kind=code-symbol | source=src/components/ChatWidget.tsx:L1 | neighbors=[portal.tsx, 37c0d11 Dock tokens toegevoegd & emojis…, 7443b54 Fix root cause: catch Supabase …, 97e70ec Changes, 9a2689c code fixes, f2eb4fe Fix root cause: catch Supabase …] | lang=en
- "hooks_use_permissions": "use-permissions.tsx" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L1 | neighbors=[admin.tsx, server.tsx, 81a87ed commit, BerichtenTab.tsx, DeletedChangesTab.tsx, TeamTab.tsx] | lang=en
- "lib_accounts_server": "accounts.server.ts" | kind=code-symbol | source=src/lib/accounts.server.ts:L1 | neighbors=[7dbbf18 perf fixes, 81a87ed commit, 99bd8ac Surface site_errors in the acco…, 9e611dd Changes, bbc9d80 Surface site_errors in the acco…, cf4ac91 Alle fases toegevoegd & cron re…] | lang=en
- "lib_auth_guards_server": "auth-guards.server.ts" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L1 | neighbors=[74ecdc1 code fixes, ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()] | lang=en
- "supabase_client_supabase": "supabase" | kind=code-symbol | source=src/integrations/supabase/client.ts:L34 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, ChatWidget.tsx, use-auth.tsx] | lang=en
- "ui_table": "table.tsx" | kind=code-symbol | source=src/components/ui/table.tsx:L1 | neighbors=[utils.ts, cn(), Table, TableBody, TableCaption, TableCell] | lang=en
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, utils.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0bb190079d2e688ac5c6509fa1320297710be919": "0bb1900 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1514d2bbfc7f74d75e4721689429497adf3b47cd": "1514d2b Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@171c22aa4bca82b2edf127606b28ff594254c336": "171c22a Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@204f17ad5afdc3852c25f15b43b940b6aef210ce": "204f17a Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@260e9c978539c62213fcdc3fdcfca62f7ddf5a15": "260e9c9 Change Supabase project credentials in .env" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@27cb157f5430c73e002efd82ccf760288f226429": "27cb157 Work in progress" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3b65b5f4c51b80d08860b192ea29b51657c0d5b2": "3b65b5f Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3ee5ecb08528968ff2c00c4da8885489b010b85d": "3ee5ecb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@54af09cc33691a723eded23ead375d8b253f464b": "54af09c Remove .env from tracking" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@65b58f18e32ff3974def08ab5316d86e96fe13a5": "65b58f1 Work in progress" | kind=Commit | source=git | neighbors=[59d8b3c Code edited in Lovable Code Edi…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@692d2316adb2949927749a6d4c0d281a300d6fd7": "692d231 Update .gitignore to include .env files" | kind=Commit | source=git | neighbors=[05a6c9e Verbeter admin changes-tab layo…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9ed5748c4b6028bc51d46bcf1cd2aa997119824c": "9ed5748 Changes" | kind=Commit | source=git | neighbors=[65b58f1 Work in progress, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c5322995bd96d20508a21e6e7af970b4453b2cc9": "c532299 Changes" | kind=Commit | source=git | neighbors=[978e288 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ca832dba472890156800a46d2a36527acbd4835e": "ca832db Add .env to .gitignore." | kind=Commit | source=git | neighbors=[879bad8 Handoff doc gemaakt, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-006.json

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
