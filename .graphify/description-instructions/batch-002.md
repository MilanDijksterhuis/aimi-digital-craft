# Node Description Batch 3 of 32

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3d4211399a05421021aecdfb57628bccc5c6e0bc": "3d42113 Kleurproblemen opgeholzen" | kind=Commit | source=git | neighbors=[21355f6 Changes, admin.tsx, portal.tsx, main, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5bc9ff091d924aa3e0087dc62ab5e248795531af": "5bc9ff0 google authenticatoin" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8f2439fed941da366b5f6eff2aa3425cd87c2d27": "8f2439f Calendly-link bijgewerkt" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@abdbfe4f597ec5da05820419baed92c87754418d": "abdbfe4 bug fixes 2" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b6f96582b51177ea9582d7a228befb942d6bf94f": "b6f9658 Redesign: donker editorial thema, Syne font, goud accent" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c3a6178d2539b75789ecac85585670295225b732": "c3a6178 portal changes" | kind=Commit | source=git | neighbors=[ab23069 admin en klantportaal wijziging…, admin.tsx, portal.tsx, main, tmp-main-merge, tmp-revert-main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cdd7702d3810e996fabb170f6ef845dfe471e125": "cdd7702 Voeg FAQ toe, Hosting Only service, geanimeerde CTA-knop" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@eccff4fd07b9b0fb4c6ce64f572f9d83c20650d2": "eccff4f bug fixes 2" | kind=Commit | source=git | neighbors=[9be6953 bug fixes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "components_footer": "Footer.tsx" | kind=code-symbol | source=src/components/Footer.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 2d7a8d4 teksr wijzigingen, 85ad012 Cinematisch redesign: forest he…, 98edc37 Changes, ab14295 Design overhauled, A11y-bar weg, b6f9658 Redesign: donker editorial them…] | lang=en
- "public_site_ping": "site-ping.ts" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 8c0bb37 nieuwe featues, 9be6953 bug fixes, abdbfe4 bug fixes 2, eccff4f bug fixes 2] | lang=en
- "ui_chart": "chart.tsx" | kind=code-symbol | source=src/components/ui/chart.tsx:L1 | neighbors=[utils.ts, cn(), ChartConfig, ChartContainer, ChartContext, ChartContextProps] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1a66af6f4adc8106f895467916a1a89740a4b1f1": "1a66af6 Verbeter layout en visueel ritme" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3e100e89b470747d643ed553e0d9cd86e2a12da8": "3e100e8 Fixed security findings" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@422202ca21e0d3af9a6e6dee69207ff36dc3d59f": "422202c Made the requested updates" | kind=Commit | source=git | neighbors=[37c0d11 Dock tokens toegevoegd & emojis…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@538314ce27a970515a5aa0ef9a6b3821d89c78be": "538314c Contactformulier en adminfix" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 2db539c Work in progress] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@59d8b3c2f97e6936e50cf4977f0be2dcccd5edf3": "59d8b3c Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5fa25a3040331f2e10f5b0c4aca47ccde167297d": "5fa25a3 Add project detail pages for admin and client portal" | kind=Commit | source=git | neighbors=[39d363a server basic, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6bf533b6ef76444668d849914f51230c39e54b7c": "6bf533b pushes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7671988e57720f280f187d84d645129a09c85398": "7671988 monitoring2" | kind=Commit | source=git | neighbors=[0193196 monitoring, admin.tsx, server.tsx, main, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@779aebc5f7cc527a1d6adf8a7af053c8da7624c8": "779aebc Nieuwe Lottielab-look toegepast" | kind=Commit | source=git | neighbors=[171c22a Changes, 422202c Made the requested updates, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@825b6d5c4b234eb840d2414b8ab28fd7c5df7e58": "825b6d5 Logo teruggezet naar vorige versie" | kind=Commit | source=git | neighbors=[7d64543 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8319472eb9d9db9d2e2ffc38140d8aae598adf86": "8319472 Portaal loading fix gedaan" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@965b87aabe543bd9d548a28fd49631983919930c": "965b87a Fix foto, nav animaties, portal leesbaarheid" | kind=Commit | source=git | neighbors=[85ad012 Cinematisch redesign: forest he…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9765b2993c9bfd44968795d3007cbbd1ee5ac2f0": "9765b29 Home widget keuzemodel toegevoegd" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9e611dd128a773ed19b71ee2cfd4ec4b2f102b70": "9e611dd Changes" | kind=Commit | source=git | neighbors=[972c222 Fases 6-7 en Fase 1 voltooid, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b9ed97e9721c5bdc7e7a8e961909212a0b9cd1a5": "b9ed97e Gebruik getSession() voor auth check zodat sessies persistent blijven" | kind=Commit | source=git | neighbors=[692d231 Update .gitignore to include .e…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bf0cfa42ca57c8fcfc83c260e4f5d0ea871ef910": "bf0cfa4 Fixed security scan issues" | kind=Commit | source=git | neighbors=[43d815c Changes, 8319472 Portaal loading fix gedaan, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e33fd2d65d3b43ea54a47e29bace710b10e6e172": "e33fd2d tekst vergroten en cookies" | kind=Commit | source=git | neighbors=[423b3f1 cashing, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "lib_rbac": "rbac.ts" | kind=code-symbol | source=src/lib/rbac.ts:L1 | neighbors=[81a87ed commit, c480d2e leads, TeamTab.tsx, use-permissions.tsx, admin.functions.ts, AppRole] | lang=en
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf": "20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L1 | neighbors=[auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs] | lang=en
- "supabase_migration": "supabase-migration.sql" | kind=code-symbol | source=supabase-migration.sql:L1 | neighbors=[39d363a server basic, 6500c48 bug fixes, 8c0bb37 nieuwe featues, dns_checks, monitoring_alerts, profiles] | lang=en
- "ui_context_menu": "context-menu.tsx" | kind=code-symbol | source=src/components/ui/context-menu.tsx:L1 | neighbors=[utils.ts, cn(), ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel] | lang=en
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L1 | neighbors=[utils.ts, cn(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel] | lang=en
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=src/components/ui/sheet.tsx:L1 | neighbors=[utils.ts, cn(), SheetContent, SheetContentProps, SheetDescription, SheetFooter()] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@05a6c9e9f8bcd3a34d63acabb3f20f7bd384cf6e": "05a6c9e Verbeter admin changes-tab layout en voeg verwijder-knop toe; verwijder…" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0cfedfb33503f3a3e63bd888bbab4ada9af28813": "0cfedfb Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@12764e3bf99b323d2b4c9395e4c221eef081bac5": "12764e3 Security: fix IDOR vulnerability in attachment URL generation" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@129b9165ad3dff3db206b50fe9994206e2a0d1c2": "129b916 manier van werken" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@28e88cb9a07284d863255db4be7e4f921da109a5": "28e88cb Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@38037d958c00d24317e786c390500725242c3a5e": "38037d9 Update Hero.tsx" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-002.json

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
