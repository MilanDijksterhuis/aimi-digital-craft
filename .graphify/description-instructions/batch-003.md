# Node Description Batch 4 of 40

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9765b2993c9bfd44968795d3007cbbd1ee5ac2f0": "9765b29 Home widget keuzemodel toegevoegd" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9e611dd128a773ed19b71ee2cfd4ec4b2f102b70": "9e611dd Changes" | kind=Commit | source=git | neighbors=[972c222 Fases 6-7 en Fase 1 voltooid, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b9ed97e9721c5bdc7e7a8e961909212a0b9cd1a5": "b9ed97e Gebruik getSession() voor auth check zodat sessies persistent blijven" | kind=Commit | source=git | neighbors=[692d231 Update .gitignore to include .e…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bf0cfa42ca57c8fcfc83c260e4f5d0ea871ef910": "bf0cfa4 Fixed security scan issues" | kind=Commit | source=git | neighbors=[43d815c Changes, 8319472 Portaal loading fix gedaan, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e33fd2d65d3b43ea54a47e29bace710b10e6e172": "e33fd2d tekst vergroten en cookies" | kind=Commit | source=git | neighbors=[423b3f1 cashing, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f958216b3ca515ca3d0d8c9e854052ef349135db": "f958216 leads functions" | kind=Commit | source=git | neighbors=[9a2689c code fixes, admin.tsx, admin.leads.tsx, main, 85a6666 SEO en robot, CallbackAgenda.tsx] | lang=en
- "components_about": "About.tsx" | kind=code-symbol | source=src/components/About.tsx:L1 | neighbors=[1a66af6 Verbeter layout en visueel ritme, 735e902 Verwijder alle section-label ey…, 85ad012 Cinematisch redesign: forest he…, 98edc37 Changes, 9a2689c code fixes, ab14295 Design overhauled, A11y-bar weg] | lang=en
- "components_faq": "FAQ.tsx" | kind=code-symbol | source=src/components/FAQ.tsx:L1 | neighbors=[1a55bd1 Fix formatting in FAQ answers, 735e902 Verwijder alle section-label ey…, 85ad012 Cinematisch redesign: forest he…, 9a2689c code fixes, ab23069 admin en klantportaal wijziging…, cdd7702 Voeg FAQ toe, Hosting Only serv…] | lang=en
- "lib_monitoring_shared": "monitoring.shared.ts" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L1 | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, 74ecdc1 code fixes, 9be6953 bug fixes, a837528 bug fixes, eccff4f bug fixes 2, assertPublicHost()] | lang=en
- "routes_faq": "faq.tsx" | kind=code-symbol | source=src/routes/faq.tsx:L1 | neighbors=[fc7da2d animaties en paginas, CookieBanner.tsx, CookieBanner(), FAQ.tsx, FAQ(), Footer.tsx] | lang=en
- "routes_over_ons": "over-ons.tsx" | kind=code-symbol | source=src/routes/over-ons.tsx:L1 | neighbors=[fc7da2d animaties en paginas, CookieBanner.tsx, CookieBanner(), Footer.tsx, Footer(), Nav.tsx] | lang=en
- "ui_chart": "chart.tsx" | kind=code-symbol | source=src/components/ui/chart.tsx:L1 | neighbors=[utils.ts, cn(), ChartConfig, ChartContainer, ChartContext, ChartContextProps] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@05a6c9e9f8bcd3a34d63acabb3f20f7bd384cf6e": "05a6c9e Verbeter admin changes-tab layout en voeg verwijder-knop toe; verwijder…" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0cfedfb33503f3a3e63bd888bbab4ada9af28813": "0cfedfb Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@12764e3bf99b323d2b4c9395e4c221eef081bac5": "12764e3 Security: fix IDOR vulnerability in attachment URL generation" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@129b9165ad3dff3db206b50fe9994206e2a0d1c2": "129b916 manier van werken" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@28e88cb9a07284d863255db4be7e4f921da109a5": "28e88cb Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@38037d958c00d24317e786c390500725242c3a5e": "38037d9 Update Hero.tsx" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@41d8eb5b389b11b8cbc768f32208498dfd9d730b": "41d8eb5 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@538314ce27a970515a5aa0ef9a6b3821d89c78be": "538314c Contactformulier en adminfix" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 2db539c Work in progress] | lang=en
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
- "components_chatwidget": "ChatWidget.tsx" | kind=code-symbol | source=src/components/ChatWidget.tsx:L1 | neighbors=[portal.tsx, 37c0d11 Dock tokens toegevoegd & emojis…, 7443b54 Fix root cause: catch Supabase …, 97e70ec Changes, 9a2689c code fixes, f2eb4fe Fix root cause: catch Supabase …] | lang=en
- "components_cookiebanner": "CookieBanner.tsx" | kind=code-symbol | source=src/components/CookieBanner.tsx:L1 | neighbors=[9a2689c code fixes, e33fd2d tekst vergroten en cookies, ecdbe8e fixes, CookieBanner(), CookiePrefs, loadPrefs()] | lang=en
- "components_deletedchangestab": "DeletedChangesTab.tsx" | kind=code-symbol | source=src/components/DeletedChangesTab.tsx:L1 | neighbors=[admin.tsx, 37c0d11 Dock tokens toegevoegd & emojis…, 97e70ec Changes, 9a2689c code fixes, ConfirmDialog.tsx, useConfirm()] | lang=en
- "components_idletimeout": "IdleTimeout.tsx" | kind=code-symbol | source=src/components/IdleTimeout.tsx:L1 | neighbors=[9a2689c code fixes, ACTIVITY_EVENTS, IdleTimeout(), alert-dialog.tsx, AlertDialogAction, AlertDialogContent] | lang=en
- "hooks_use_permissions": "use-permissions.tsx" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L1 | neighbors=[admin.tsx, admin.leads.tsx, server.tsx, 81a87ed commit, BerichtenTab.tsx, DeletedChangesTab.tsx] | lang=en
- "lib_callbacks": "callbacks.ts" | kind=code-symbol | source=src/lib/callbacks.ts:L1 | neighbors=[f958216 leads functions, CallbackAgenda.tsx, CallbackScheduleModal.tsx, AGENDA_COLOR_CLASSES, AgendaColor, CALLBACK_OUTCOMES] | lang=en
- "lib_csv": "csv.ts" | kind=code-symbol | source=src/lib/csv.ts:L1 | neighbors=[74ecdc1 code fixes, c480d2e leads, LeadsPanel.tsx, CsvParseResult, detectDelimiter(), HEADER_ALIASES] | lang=en
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf": "20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L1 | neighbors=[auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs] | lang=en

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
