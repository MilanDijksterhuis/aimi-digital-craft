# Node Description Batch 4 of 32

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@41d8eb5b389b11b8cbc768f32208498dfd9d730b": "41d8eb5 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6500c48efcae343190db74799e66a0f73c02a01d": "6500c48 bug fixes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@68ae2dd803c5af16da5b6ec0fb2731ffb2ae21b6": "68ae2dd Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@78421188dd4d19d0f0f68c1ece04256636412356": "7842118 Prijs wijzing 499" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@79f7d0a6d139d2ab2522919aaaa8b7e21b9be540": "79f7d0a Changes" | kind=Commit | source=git | neighbors=[204f17a Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7d645431a859561f7c053eff57396ef439a58259": "7d64543 Changes" | kind=Commit | source=git | neighbors=[7476011 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8a81dd141dffbb9e136fbbeadff0f1a615ca92dd": "8a81dd1 Fixed security issues" | kind=Commit | source=git | neighbors=[7ca6d63 Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@90677bfe31851fdd79ce7a5a1d724616869cf281": "90677bf Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ba3edcec21dad2679b8d4831a70dad2c2311e69f": "ba3edce Update pricing for Starter and Pro tiers v2" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c3627b5ca34c14daf9f18452bf3dc46e97f05af9": "c3627b5 Changes" | kind=Commit | source=git | neighbors=[bf0cfa4 Fixed security scan issues, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cdbf369c7c3e2410857f89037a083fe1980ac982": "cdbf369 bug fixes" | kind=Commit | source=git | neighbors=[8c0bb37 nieuwe featues, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d3cd320f831690125fefb10f789160cb20a2796e": "d3cd320 Hero tekst groter, Services whitespace verkleind" | kind=Commit | source=git | neighbors=[00e2564 voorwaaren en privacy, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e2cd3102356fb87079f7a174eccc89d0f22c68aa": "e2cd310 Ip blocker" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f3ee883eef32769a34d16321043945b714697e5e": "f3ee883 Lovable update" | kind=Commit | source=git | neighbors=[0b21971 Changes weergave verbeterd, a110759 Work in progress, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f5b75ff1a1588c6e0e5dcbf7956086ed1be0c8c6": "f5b75ff Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[3e100e8 Fixed security findings, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f67dba7f88adfcf5248c028b5d59f4b7d1e63573": "f67dba7 rate limiting" | kind=Commit | source=git | neighbors=[5f47f6d animaties, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fb1c670fc9159c6d72de0ce53227e1ba130b7e7f": "fb1c670 Changes" | kind=Commit | source=git | neighbors=[ab14295 Design overhauled, A11y-bar weg, account.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "components_about": "About.tsx" | kind=code-symbol | source=src/components/About.tsx:L1 | neighbors=[1a66af6 Verbeter layout en visueel ritme, 735e902 Verwijder alle section-label ey…, 85ad012 Cinematisch redesign: forest he…, 98edc37 Changes, ab14295 Design overhauled, A11y-bar weg, ecdbe8e fixes] | lang=en
- "components_faq": "FAQ.tsx" | kind=code-symbol | source=src/components/FAQ.tsx:L1 | neighbors=[1a55bd1 Fix formatting in FAQ answers, 735e902 Verwijder alle section-label ey…, 85ad012 Cinematisch redesign: forest he…, ab23069 admin en klantportaal wijziging…, cdd7702 Voeg FAQ toe, Hosting Only serv…, ecdbe8e fixes] | lang=en
- "hooks_use_permissions": "use-permissions.tsx" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L1 | neighbors=[admin.tsx, server.tsx, 81a87ed commit, BerichtenTab.tsx, DeletedChangesTab.tsx, TeamTab.tsx] | lang=en
- "lib_csv": "csv.ts" | kind=code-symbol | source=src/lib/csv.ts:L1 | neighbors=[c480d2e leads, LeadsPanel.tsx, CsvParseResult, detectDelimiter(), HEADER_ALIASES, norm()] | lang=en
- "lib_monitoring_shared": "monitoring.shared.ts" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L1 | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, 9be6953 bug fixes, a837528 bug fixes, eccff4f bug fixes 2, assertPublicHost(), computeMonitoringStats()] | lang=en
- "supabase_client_supabase": "supabase" | kind=code-symbol | source=src/integrations/supabase/client.ts:L34 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, ChatWidget.tsx, use-auth.tsx] | lang=en
- "ui_button": "button.tsx" | kind=code-symbol | source=src/components/ui/button.tsx:L1 | neighbors=[alert-dialog.tsx, utils.ts, cn(), Button, ButtonProps, buttonVariants] | lang=en
- "ui_table": "table.tsx" | kind=code-symbol | source=src/components/ui/table.tsx:L1 | neighbors=[utils.ts, cn(), Table, TableBody, TableCaption, TableCell] | lang=en
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, utils.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00d6931ace05801b13d3c6fec4d7f388c641b02f": "00d6931 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@020d80731071e5c7f54dd6dd5701fbd383ad65d8": "020d807 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0332090312971f581f0e392fbbd7d768b13f6ca5": "0332090 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0d60453d8dfca04517b429e4b75eea63ff987c86": "0d60453 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0e9729e471af9b784f795955bb2564f1b4be2643": "0e9729e Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@15acc2a9d40ccb35653a5d2f6901e310d0b3b1ca": "15acc2a Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1a55bd1691dc3a0ec581b39588228848124ec64b": "1a55bd1 Fix formatting in FAQ answers" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1dfd3b7b52dd448a5042242aa3d28dcf88bb0524": "1dfd3b7 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1e3899b0e601c7853ccd697d87413040cba446aa": "1e3899b Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@21355f690be1ec24108a6387d344f78b0ca8afe3": "21355f6 Changes" | kind=Commit | source=git | neighbors=[00d6931 Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@273dbcee6093323b2397b40699b18ddea60b8128": "273dbce Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2770cdb3b248bb3ec2b8a2d9d514072a50dfc894": "2770cdb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@282fc41cd9716f898e832e20b5fd7ea513063f53": "282fc41 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d57d40fd2a268b9db1f12bf550bd34254a991be": "2d57d40 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en

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
