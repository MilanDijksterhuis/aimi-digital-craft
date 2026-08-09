# Node Description Batch 5 of 40

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "supabase_migration": "supabase-migration.sql" | kind=code-symbol | source=supabase-migration.sql:L1 | neighbors=[39d363a server basic, 6500c48 bug fixes, 8c0bb37 nieuwe featues, dns_checks, monitoring_alerts, profiles]
- "ui_button": "button.tsx" | kind=code-symbol | source=src/components/ui/button.tsx:L1 | neighbors=[ConfirmDialog.tsx, alert-dialog.tsx, utils.ts, cn(), Button, ButtonProps]
- "ui_context_menu": "context-menu.tsx" | kind=code-symbol | source=src/components/ui/context-menu.tsx:L1 | neighbors=[utils.ts, cn(), ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L1 | neighbors=[utils.ts, cn(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=src/components/ui/sheet.tsx:L1 | neighbors=[utils.ts, cn(), SheetContent, SheetContentProps, SheetDescription, SheetFooter()]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00d6931ace05801b13d3c6fec4d7f388c641b02f": "00d6931 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@020d80731071e5c7f54dd6dd5701fbd383ad65d8": "020d807 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0332090312971f581f0e392fbbd7d768b13f6ca5": "0332090 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0d60453d8dfca04517b429e4b75eea63ff987c86": "0d60453 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0e9729e471af9b784f795955bb2564f1b4be2643": "0e9729e Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@15acc2a9d40ccb35653a5d2f6901e310d0b3b1ca": "15acc2a Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1a55bd1691dc3a0ec581b39588228848124ec64b": "1a55bd1 Fix formatting in FAQ answers" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1dfd3b7b52dd448a5042242aa3d28dcf88bb0524": "1dfd3b7 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1e3899b0e601c7853ccd697d87413040cba446aa": "1e3899b Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@21355f690be1ec24108a6387d344f78b0ca8afe3": "21355f6 Changes" | kind=Commit | source=git | neighbors=[00d6931 Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@273dbcee6093323b2397b40699b18ddea60b8128": "273dbce Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2770cdb3b248bb3ec2b8a2d9d514072a50dfc894": "2770cdb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@282fc41cd9716f898e832e20b5fd7ea513063f53": "282fc41 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d57d40fd2a268b9db1f12bf550bd34254a991be": "2d57d40 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d7a8d4952eb8794ea8f21d6907999d78483dc8f": "2d7a8d4 teksr wijzigingen" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@332d0c84e235acf00e0169547cf9351c6b8fbe24": "332d0c8 Fix: externalize googleapis/nodemailer, cast app_settings queries" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@36052ffdb5f67ae9df46279a1daf2e88f60b7c63": "36052ff Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[1dfd3b7 Code edited in Lovable Code Edi…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3650c07d53450b3415e2cb1851b84def4d8d01a5": "3650c07 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3ca59a09c52ac7cff9951384b0b83e8e9681f8d6": "3ca59a0 Changes" | kind=Commit | source=git | neighbors=[15acc2a Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@408d241df64c7048369cea062f4a02732bb61b6e": "408d241 Changes" | kind=Commit | source=git | neighbors=[020d807 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@423b3f18d2ebd11ae0fa04536f8047238fd4e0a5": "423b3f1 cashing" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@43d815cc6fb948727d167c26c906741fc53c55b4": "43d815c Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@451efd4274b82e0e3d1397b08ea5389d391e9167": "451efd4 Changes" | kind=Commit | source=git | neighbors=[0cfedfb Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@47ef3dd3470ae956daaef44cd73a0c0fa5e66d19": "47ef3dd Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@482bba9cb2c181cf7403b1f739b26ada40bf6193": "482bba9 Work in progress" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4c798fc1ce090c83a95e407e8bacec7aa22139f1": "4c798fc Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4c90153509b8a1b3c03687c1298757482bad88ee": "4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main, worktree-replicated-fluttering-whisper]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@500f7185ddce5d62be5309d2dca2197d8ff0e17d": "500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, 30d7c60 Merge project detail pages (adm…, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5597edf1e587bba06b784c6b4222191e142b5b07": "5597edf Changes" | kind=Commit | source=git | neighbors=[1e3899b Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@58201827a2bf0ac192c70c496279ad2a9c7f29f6": "5820182 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5aa324aca561d3cc9c3369f431a578918aae6462": "5aa324a Changes" | kind=Commit | source=git | neighbors=[451efd4 Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d704cb11898aeb9c55b1fcdf669d25eb9b8e9a7": "5d704cb Changes" | kind=Commit | source=git | neighbors=[47ef3dd Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5e76ecd684c6305f5108aa0d63152ad671d67aed": "5e76ecd Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5f47f6dfb8f37161d6e09214e75b59ab8bad1823": "5f47f6d animaties" | kind=Commit | source=git | neighbors=[12764e3 Security: fix IDOR vulnerabilit…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6381715b39428afac8520ff81a8fb92227f2895a": "6381715 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-004.json

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
