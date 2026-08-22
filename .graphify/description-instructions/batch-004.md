# Node Description Batch 5 of 46

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0cfedfb33503f3a3e63bd888bbab4ada9af28813": "0cfedfb Changes" | kind=Commit | source=git | neighbors=[main, 451efd4 Changes, Nav.tsx, routeTree.gen.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@12764e3bf99b323d2b4c9395e4c221eef081bac5": "12764e3 Security: fix IDOR vulnerability in attachment URL generation" | kind=Commit | source=git | neighbors=[main, 5f47f6d animaties, admin.functions.ts, portal.functions.ts, b83b044 Revert: verwijder Google OAuth …, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@129b9165ad3dff3db206b50fe9994206e2a0d1c2": "129b916 manier van werken" | kind=Commit | source=git | neighbors=[main, 9f689f7 tracking voor user M, ProcessTimeline.tsx, index.tsx, e2cd310 Ip blocker, tmp-main-merge] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@38037d958c00d24317e786c390500725242c3a5e": "38037d9 Update Hero.tsx" | kind=Commit | source=git | neighbors=[main, 99450d7 Fix typo in Hero component text…, c0b2317 Changes, Hero.tsx, ec6c394 Fix typo in Hero component text, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@41d8eb5b389b11b8cbc768f32208498dfd9d730b": "41d8eb5 Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6500c48efcae343190db74799e66a0f73c02a01d": "6500c48 bug fixes" | kind=Commit | source=git | neighbors=[admin.tsx, main, a837528 bug fixes, supabase-migration.sql, 8913689 bug fixes, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@78421188dd4d19d0f0f68c1ece04256636412356": "7842118 Prijs wijzing 499" | kind=Commit | source=git | neighbors=[main, 1514d2b Changes, 879bad8 Handoff doc gemaakt, Pricing.tsx, 821a216 Update vite.config.ts, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@79f7d0a6d139d2ab2522919aaaa8b7e21b9be540": "79f7d0a Changes" | kind=Commit | source=git | neighbors=[204f17a Changes, main, 5820182 Changes, Nav.tsx, routeTree.gen.ts, tmp-main-merge] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7d645431a859561f7c053eff57396ef439a58259": "7d64543 Changes" | kind=Commit | source=git | neighbors=[7476011 Changes, main, 825b6d5 Logo teruggezet naar vorige ver…, Nav.tsx, routeTree.gen.ts, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8319472eb9d9db9d2e2ffc38140d8aae598adf86": "8319472 Portaal loading fix gedaan" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ba3edcec21dad2679b8d4831a70dad2c2311e69f": "ba3edce Update pricing for Starter and Pro tiers v2" | kind=Commit | source=git | neighbors=[main, 8f2439f Calendly-link bijgewerkt, 9611f09 Changes, Pricing.tsx, f3ee883 Lovable update, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bf0cfa42ca57c8fcfc83c260e4f5d0ea871ef910": "bf0cfa4 Fixed security scan issues" | kind=Commit | source=git | neighbors=[43d815c Changes, 8319472 Portaal loading fix gedaan, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cdbf369c7c3e2410857f89037a083fe1980ac982": "cdbf369 bug fixes" | kind=Commit | source=git | neighbors=[8c0bb37 nieuwe featues, admin.tsx, main, abdbfe4 bug fixes 2, admin.functions.ts, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d3cd320f831690125fefb10f789160cb20a2796e": "d3cd320 Hero tekst groter, Services whitespace verkleind" | kind=Commit | source=git | neighbors=[00e2564 voorwaaren en privacy, main, 2d7a8d4 teksr wijzigingen, Hero.tsx, Services.tsx, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e2cd3102356fb87079f7a174eccc89d0f22c68aa": "e2cd310 Ip blocker" | kind=Commit | source=git | neighbors=[main, 129b916 manier van werken, rate-limit.ts, server.ts, f67dba7 rate limiting, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f3ee883eef32769a34d16321043945b714697e5e": "f3ee883 Lovable update" | kind=Commit | source=git | neighbors=[0b21971 Changes weergave verbeterd, a110759 Work in progress, main, ba3edce Update pricing for Starter and …, routeTree.gen.ts, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f5b75ff1a1588c6e0e5dcbf7956086ed1be0c8c6": "f5b75ff Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[3e100e8 Fixed security findings, main, 273dbce Code edited in Lovable Code Edi…, About.tsx, routeTree.gen.ts, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f67dba7f88adfcf5248c028b5d59f4b7d1e63573": "f67dba7 rate limiting" | kind=Commit | source=git | neighbors=[5f47f6d animaties, main, e2cd310 Ip blocker, rate-limit.ts, server.ts, tmp-main-merge] | lang=en
- "lib_monitoring_shared": "monitoring.shared.ts" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L1 | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, 74ecdc1 code fixes, 9be6953 bug fixes, a837528 bug fixes, eccff4f bug fixes 2, assertPublicHost()] | lang=en
- "ui_chart": "chart.tsx" | kind=code-symbol | source=src/components/ui/chart.tsx:L1 | neighbors=[utils.ts, cn(), ChartConfig, ChartContainer, ChartContext, ChartContextProps] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00d6931ace05801b13d3c6fec4d7f388c641b02f": "00d6931 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, 21355f6 Changes, b7f53d6 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@020d80731071e5c7f54dd6dd5701fbd383ad65d8": "020d807 Changes" | kind=Commit | source=git | neighbors=[main, 408d241 Changes, routeTree.gen.ts, 3b65b5f Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0332090312971f581f0e392fbbd7d768b13f6ca5": "0332090 Changes" | kind=Commit | source=git | neighbors=[main, d7e04a1 Home-Afspraak weggehaald, Contact.tsx, df16e84 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0d60453d8dfca04517b429e4b75eea63ff987c86": "0d60453 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, f9e4bcf Changes, 67f2077 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0e9729e471af9b784f795955bb2564f1b4be2643": "0e9729e Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1a55bd1691dc3a0ec581b39588228848124ec64b": "1a55bd1 Fix formatting in FAQ answers" | kind=Commit | source=git | neighbors=[main, 85ad012 Cinematisch redesign: forest he…, FAQ.tsx, 735e902 Verwijder alle section-label ey…, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1dfd3b7b52dd448a5042242aa3d28dcf88bb0524": "1dfd3b7 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, 36052ff Code edited in Lovable Code Edi…, Hero.tsx, fe54e43 Code edited in Lovable Code Edi…, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1e3899b0e601c7853ccd697d87413040cba446aa": "1e3899b Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@21355f690be1ec24108a6387d344f78b0ca8afe3": "21355f6 Changes" | kind=Commit | source=git | neighbors=[00d6931 Changes, admin.tsx, main, 3d42113 Kleurproblemen opgeholzen, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@273dbcee6093323b2397b40699b18ddea60b8128": "273dbce Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, fe54e43 Code edited in Lovable Code Edi…, routeTree.gen.ts, f5b75ff Code edited in Lovable Code Edi…, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2770cdb3b248bb3ec2b8a2d9d514072a50dfc894": "2770cdb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, d48443c Changes, 86b3111 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@282fc41cd9716f898e832e20b5fd7ea513063f53": "282fc41 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, df1c05d Changes, d7e04a1 Home-Afspraak weggehaald, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@28e88cb9a07284d863255db4be7e4f921da109a5": "28e88cb Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d57d40fd2a268b9db1f12bf550bd34254a991be": "2d57d40 Changes" | kind=Commit | source=git | neighbors=[main, 9d59757 Afspraakpagina toegevoegd, routeTree.gen.ts, 5aa324a Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d7a8d4952eb8794ea8f21d6907999d78483dc8f": "2d7a8d4 teksr wijzigingen" | kind=Commit | source=git | neighbors=[main, c431436 footer tekst weer anders, Footer.tsx, d3cd320 Hero tekst groter, Services whi…, tmp-main-merge, tmp-revert-main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@332d0c84e235acf00e0169547cf9351c6b8fbe24": "332d0c8 Fix: externalize googleapis/nodemailer, cast app_settings queries" | kind=Commit | source=git | neighbors=[main, b83b044 Revert: verwijder Google OAuth …, vite.config.ts, 54af09c Remove .env from tracking, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@36052ffdb5f67ae9df46279a1daf2e88f60b7c63": "36052ff Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[1dfd3b7 Code edited in Lovable Code Edi…, main, 0bb1900 Code edited in Lovable Code Edi…, Hero.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@408d241df64c7048369cea062f4a02732bb61b6e": "408d241 Changes" | kind=Commit | source=git | neighbors=[020d807 Changes, main, e8bc1c3 Changes, __root.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@423b3f18d2ebd11ae0fa04536f8047238fd4e0a5": "423b3f1 cashing" | kind=Commit | source=git | neighbors=[main, e33fd2d tekst vergroten en cookies, _authenticated.tsx, 9c4f5d5 nummers verwijderd, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@451efd4274b82e0e3d1397b08ea5389d391e9167": "451efd4 Changes" | kind=Commit | source=git | neighbors=[0cfedfb Changes, main, 5aa324a Changes, routeTree.gen.ts, tmp-main-merge, tmp-revert-main] | lang=en

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
