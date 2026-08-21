# Node Description Batch 5 of 43

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d3cd320f831690125fefb10f789160cb20a2796e": "d3cd320 Hero tekst groter, Services whitespace verkleind" | kind=Commit | source=git | neighbors=[00e2564 voorwaaren en privacy, main, 2d7a8d4 teksr wijzigingen, Hero.tsx, Services.tsx, tmp-main-merge]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e2cd3102356fb87079f7a174eccc89d0f22c68aa": "e2cd310 Ip blocker" | kind=Commit | source=git | neighbors=[main, 129b916 manier van werken, rate-limit.ts, server.ts, f67dba7 rate limiting, tmp-main-merge]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f3ee883eef32769a34d16321043945b714697e5e": "f3ee883 Lovable update" | kind=Commit | source=git | neighbors=[0b21971 Changes weergave verbeterd, a110759 Work in progress, main, ba3edce Update pricing for Starter and …, routeTree.gen.ts, tmp-main-merge]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f5b75ff1a1588c6e0e5dcbf7956086ed1be0c8c6": "f5b75ff Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[3e100e8 Fixed security findings, main, 273dbce Code edited in Lovable Code Edi…, About.tsx, routeTree.gen.ts, tmp-main-merge]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f67dba7f88adfcf5248c028b5d59f4b7d1e63573": "f67dba7 rate limiting" | kind=Commit | source=git | neighbors=[5f47f6d animaties, main, e2cd310 Ip blocker, rate-limit.ts, server.ts, tmp-main-merge]
- "lib_monitoring_shared": "monitoring.shared.ts" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L1 | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, 74ecdc1 code fixes, 9be6953 bug fixes, a837528 bug fixes, eccff4f bug fixes 2, assertPublicHost()]
- "ui_chart": "chart.tsx" | kind=code-symbol | source=src/components/ui/chart.tsx:L1 | neighbors=[utils.ts, cn(), ChartConfig, ChartContainer, ChartContext, ChartContextProps]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00d6931ace05801b13d3c6fec4d7f388c641b02f": "00d6931 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, 21355f6 Changes, b7f53d6 Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@020d80731071e5c7f54dd6dd5701fbd383ad65d8": "020d807 Changes" | kind=Commit | source=git | neighbors=[main, 408d241 Changes, routeTree.gen.ts, 3b65b5f Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0332090312971f581f0e392fbbd7d768b13f6ca5": "0332090 Changes" | kind=Commit | source=git | neighbors=[main, d7e04a1 Home-Afspraak weggehaald, Contact.tsx, df16e84 Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0d60453d8dfca04517b429e4b75eea63ff987c86": "0d60453 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, f9e4bcf Changes, 67f2077 Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0e9729e471af9b784f795955bb2564f1b4be2643": "0e9729e Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1a55bd1691dc3a0ec581b39588228848124ec64b": "1a55bd1 Fix formatting in FAQ answers" | kind=Commit | source=git | neighbors=[main, 85ad012 Cinematisch redesign: forest he…, FAQ.tsx, 735e902 Verwijder alle section-label ey…, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1dfd3b7b52dd448a5042242aa3d28dcf88bb0524": "1dfd3b7 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, 36052ff Code edited in Lovable Code Edi…, Hero.tsx, fe54e43 Code edited in Lovable Code Edi…, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1e3899b0e601c7853ccd697d87413040cba446aa": "1e3899b Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@21355f690be1ec24108a6387d344f78b0ca8afe3": "21355f6 Changes" | kind=Commit | source=git | neighbors=[00d6931 Changes, admin.tsx, main, 3d42113 Kleurproblemen opgeholzen, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@273dbcee6093323b2397b40699b18ddea60b8128": "273dbce Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, fe54e43 Code edited in Lovable Code Edi…, routeTree.gen.ts, f5b75ff Code edited in Lovable Code Edi…, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2770cdb3b248bb3ec2b8a2d9d514072a50dfc894": "2770cdb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, d48443c Changes, 86b3111 Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@282fc41cd9716f898e832e20b5fd7ea513063f53": "282fc41 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, df1c05d Changes, d7e04a1 Home-Afspraak weggehaald, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@28e88cb9a07284d863255db4be7e4f921da109a5": "28e88cb Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d57d40fd2a268b9db1f12bf550bd34254a991be": "2d57d40 Changes" | kind=Commit | source=git | neighbors=[main, 9d59757 Afspraakpagina toegevoegd, routeTree.gen.ts, 5aa324a Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d7a8d4952eb8794ea8f21d6907999d78483dc8f": "2d7a8d4 teksr wijzigingen" | kind=Commit | source=git | neighbors=[main, c431436 footer tekst weer anders, Footer.tsx, d3cd320 Hero tekst groter, Services whi…, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@332d0c84e235acf00e0169547cf9351c6b8fbe24": "332d0c8 Fix: externalize googleapis/nodemailer, cast app_settings queries" | kind=Commit | source=git | neighbors=[main, b83b044 Revert: verwijder Google OAuth …, vite.config.ts, 54af09c Remove .env from tracking, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@36052ffdb5f67ae9df46279a1daf2e88f60b7c63": "36052ff Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[1dfd3b7 Code edited in Lovable Code Edi…, main, 0bb1900 Code edited in Lovable Code Edi…, Hero.tsx, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@408d241df64c7048369cea062f4a02732bb61b6e": "408d241 Changes" | kind=Commit | source=git | neighbors=[020d807 Changes, main, e8bc1c3 Changes, __root.tsx, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@423b3f18d2ebd11ae0fa04536f8047238fd4e0a5": "423b3f1 cashing" | kind=Commit | source=git | neighbors=[main, e33fd2d tekst vergroten en cookies, _authenticated.tsx, 9c4f5d5 nummers verwijderd, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@451efd4274b82e0e3d1397b08ea5389d391e9167": "451efd4 Changes" | kind=Commit | source=git | neighbors=[0cfedfb Changes, main, 5aa324a Changes, routeTree.gen.ts, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@482bba9cb2c181cf7403b1f739b26ada40bf6193": "482bba9 Work in progress" | kind=Commit | source=git | neighbors=[main, 7476011 Changes, routeTree.gen.ts, d42e3c5 Logo toegevoegd aan site, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4c798fc1ce090c83a95e407e8bacec7aa22139f1": "4c798fc Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, f263aeb Update text in Hero component, Hero.tsx, 67a9525 Code edited in Lovable Code Edi…, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4c90153509b8a1b3c03687c1298757482bad88ee": "4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main, 7f7208a new]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@500f7185ddce5d62be5309d2dca2197d8ff0e17d": "500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, 30d7c60 Merge project detail pages (adm…, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@538314ce27a970515a5aa0ef9a6b3821d89c78be": "538314c Contactformulier en adminfix" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 2db539c Work in progress]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5597edf1e587bba06b784c6b4222191e142b5b07": "5597edf Changes" | kind=Commit | source=git | neighbors=[1e3899b Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@58201827a2bf0ac192c70c496279ad2a9c7f29f6": "5820182 Changes" | kind=Commit | source=git | neighbors=[main, df16e84 Changes, index.tsx, 79f7d0a Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5aa324aca561d3cc9c3369f431a578918aae6462": "5aa324a Changes" | kind=Commit | source=git | neighbors=[451efd4 Changes, admin.tsx, main, 2d57d40 Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5e76ecd684c6305f5108aa0d63152ad671d67aed": "5e76ecd Changes" | kind=Commit | source=git | neighbors=[main, 422202c Made the requested updates, routeTree.gen.ts, 930fc24 Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5f47f6dfb8f37161d6e09214e75b59ab8bad1823": "5f47f6d animaties" | kind=Commit | source=git | neighbors=[12764e3 Security: fix IDOR vulnerabilit…, main, f67dba7 rate limiting, Services.tsx, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6381715b39428afac8520ff81a8fb92227f2895a": "6381715 Changes" | kind=Commit | source=git | neighbors=[main, 3e100e8 Fixed security findings, 20260610172053_c69c4c4e-eb62-440d-a0ce-…, 7732f7b Changes, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@67a9525143d21bbc619344a77d509c75f51bffab": "67a9525 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[0bb1900 Code edited in Lovable Code Edi…, main, 4c798fc Code edited in Lovable Code Edi…, Hero.tsx, tmp-main-merge, tmp-revert-main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@67f2077f6a443bea802409866b5a18d624de4379": "67f2077 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, 0d60453 Changes, 7f63a6a Changes, tmp-main-merge, tmp-revert-main]

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
