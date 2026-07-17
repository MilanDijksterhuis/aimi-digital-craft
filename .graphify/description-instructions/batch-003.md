# Node Description Batch 4 of 34

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6500c48efcae343190db74799e66a0f73c02a01d": "6500c48 bug fixes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@78421188dd4d19d0f0f68c1ece04256636412356": "7842118 Prijs wijzing 499" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@79f7d0a6d139d2ab2522919aaaa8b7e21b9be540": "79f7d0a Changes" | kind=Commit | source=git | neighbors=[204f17a Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7d645431a859561f7c053eff57396ef439a58259": "7d64543 Changes" | kind=Commit | source=git | neighbors=[7476011 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ba3edcec21dad2679b8d4831a70dad2c2311e69f": "ba3edce Update pricing for Starter and Pro tiers v2" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c3627b5ca34c14daf9f18452bf3dc46e97f05af9": "c3627b5 Changes" | kind=Commit | source=git | neighbors=[bf0cfa4 Fixed security scan issues, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cdbf369c7c3e2410857f89037a083fe1980ac982": "cdbf369 bug fixes" | kind=Commit | source=git | neighbors=[8c0bb37 nieuwe featues, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d3cd320f831690125fefb10f789160cb20a2796e": "d3cd320 Hero tekst groter, Services whitespace verkleind" | kind=Commit | source=git | neighbors=[00e2564 voorwaaren en privacy, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e2cd3102356fb87079f7a174eccc89d0f22c68aa": "e2cd310 Ip blocker" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f3ee883eef32769a34d16321043945b714697e5e": "f3ee883 Lovable update" | kind=Commit | source=git | neighbors=[0b21971 Changes weergave verbeterd, a110759 Work in progress, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f5b75ff1a1588c6e0e5dcbf7956086ed1be0c8c6": "f5b75ff Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[3e100e8 Fixed security findings, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f67dba7f88adfcf5248c028b5d59f4b7d1e63573": "f67dba7 rate limiting" | kind=Commit | source=git | neighbors=[5f47f6d animaties, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf": "20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L1 | neighbors=[auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs] | lang=en
- "supabase_migration": "supabase-migration.sql" | kind=code-symbol | source=supabase-migration.sql:L1 | neighbors=[39d363a server basic, 6500c48 bug fixes, 8c0bb37 nieuwe featues, dns_checks, monitoring_alerts, profiles] | lang=en
- "ui_context_menu": "context-menu.tsx" | kind=code-symbol | source=src/components/ui/context-menu.tsx:L1 | neighbors=[utils.ts, cn(), ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel] | lang=en
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L1 | neighbors=[utils.ts, cn(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel] | lang=en
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=src/components/ui/sheet.tsx:L1 | neighbors=[utils.ts, cn(), SheetContent, SheetContentProps, SheetDescription, SheetFooter()] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00d6931ace05801b13d3c6fec4d7f388c641b02f": "00d6931 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@020d80731071e5c7f54dd6dd5701fbd383ad65d8": "020d807 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0332090312971f581f0e392fbbd7d768b13f6ca5": "0332090 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0d60453d8dfca04517b429e4b75eea63ff987c86": "0d60453 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0e9729e471af9b784f795955bb2564f1b4be2643": "0e9729e Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@15acc2a9d40ccb35653a5d2f6901e310d0b3b1ca": "15acc2a Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1a55bd1691dc3a0ec581b39588228848124ec64b": "1a55bd1 Fix formatting in FAQ answers" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1dfd3b7b52dd448a5042242aa3d28dcf88bb0524": "1dfd3b7 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1e3899b0e601c7853ccd697d87413040cba446aa": "1e3899b Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@21355f690be1ec24108a6387d344f78b0ca8afe3": "21355f6 Changes" | kind=Commit | source=git | neighbors=[00d6931 Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@273dbcee6093323b2397b40699b18ddea60b8128": "273dbce Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2770cdb3b248bb3ec2b8a2d9d514072a50dfc894": "2770cdb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@282fc41cd9716f898e832e20b5fd7ea513063f53": "282fc41 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d57d40fd2a268b9db1f12bf550bd34254a991be": "2d57d40 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d7a8d4952eb8794ea8f21d6907999d78483dc8f": "2d7a8d4 teksr wijzigingen" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@332d0c84e235acf00e0169547cf9351c6b8fbe24": "332d0c8 Fix: externalize googleapis/nodemailer, cast app_settings queries" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@36052ffdb5f67ae9df46279a1daf2e88f60b7c63": "36052ff Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[1dfd3b7 Code edited in Lovable Code Edi…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3650c07d53450b3415e2cb1851b84def4d8d01a5": "3650c07 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3ca59a09c52ac7cff9951384b0b83e8e9681f8d6": "3ca59a0 Changes" | kind=Commit | source=git | neighbors=[15acc2a Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@408d241df64c7048369cea062f4a02732bb61b6e": "408d241 Changes" | kind=Commit | source=git | neighbors=[020d807 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@423b3f18d2ebd11ae0fa04536f8047238fd4e0a5": "423b3f1 cashing" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@43d815cc6fb948727d167c26c906741fc53c55b4": "43d815c Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@451efd4274b82e0e3d1397b08ea5389d391e9167": "451efd4 Changes" | kind=Commit | source=git | neighbors=[0cfedfb Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-003.json

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
