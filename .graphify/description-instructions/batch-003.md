# Node Description Batch 4 of 43

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1a66af6f4adc8106f895467916a1a89740a4b1f1": "1a66af6 Verbeter layout en visueel ritme" | kind=Commit | source=git | neighbors=[main, 735e902 Verwijder alle section-label ey…, About.tsx, Hero.tsx, Services.tsx, b515400 Redesign: warm licht thema, ink…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d81f503bf330e743d938de12ac875806a431d8b": "2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse p…" | kind=Commit | source=git | neighbors=[032ba88 SEO, main, ec1f322 feat(ui): Diensten-dropdown in …, Footer.tsx, Nav.tsx, onderhoud-hosting.tsx] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3e100e89b470747d643ed553e0d9cd86e2a12da8": "3e100e8 Fixed security findings" | kind=Commit | source=git | neighbors=[main, f5b75ff Code edited in Lovable Code Edi…, 20260610172053_c69c4c4e-eb62-440d-a0ce-…, routeTree.gen.ts, 59d8b3c Code edited in Lovable Code Edi…, 6381715 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@422202ca21e0d3af9a6e6dee69207ff36dc3d59f": "422202c Made the requested updates" | kind=Commit | source=git | neighbors=[37c0d11 Dock tokens toegevoegd & emojis…, main, 779aebc Nieuwe Lottielab-look toegepast, 978e288 Changes, __root.tsx, 5e76ecd Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@59d8b3c2f97e6936e50cf4977f0be2dcccd5edf3": "59d8b3c Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, 3e100e8 Fixed security findings, 65b58f1 Work in progress, Pricing.tsx, routeTree.gen.ts, 9765b29 Home widget keuzemodel toegevoe…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5fa25a3040331f2e10f5b0c4aca47ccde167297d": "5fa25a3 Add project detail pages for admin and client portal" | kind=Commit | source=git | neighbors=[39d363a server basic, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6bf533b6ef76444668d849914f51230c39e54b7c": "6bf533b pushes" | kind=Commit | source=git | neighbors=[admin.tsx, main, 0193196 monitoring, Pricing.tsx, TeamTab.tsx, c480d2e leads] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7671988e57720f280f187d84d645129a09c85398": "7671988 monitoring2" | kind=Commit | source=git | neighbors=[0193196 monitoring, admin.tsx, server.tsx, main, 39d363a server basic, routeTree.gen.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@779aebc5f7cc527a1d6adf8a7af053c8da7624c8": "779aebc Nieuwe Lottielab-look toegepast" | kind=Commit | source=git | neighbors=[171c22a Changes, 422202c Made the requested updates, main, 3d42113 Kleurproblemen opgeholzen, 86b3111 Changes, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@825b6d5c4b234eb840d2414b8ab28fd7c5df7e58": "825b6d5 Logo teruggezet naar vorige versie" | kind=Commit | source=git | neighbors=[7d64543 Changes, main, 27cb157 Work in progress, be0f1fb Lovable update, Nav.tsx, d42e3c5 Logo toegevoegd aan site] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@965b87aabe543bd9d548a28fd49631983919930c": "965b87a Fix foto, nav animaties, portal leesbaarheid" | kind=Commit | source=git | neighbors=[85ad012 Cinematisch redesign: forest he…, main, f0dfd24 Services: interactief tab-panel…, Hero.tsx, Nav.tsx, _authenticated.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9765b2993c9bfd44968795d3007cbbd1ee5ac2f0": "9765b29 Home widget keuzemodel toegevoegd" | kind=Commit | source=git | neighbors=[main, 59d8b3c Code edited in Lovable Code Edi…, Contact.tsx, routeTree.gen.ts, 9d59757 Afspraakpagina toegevoegd, c07aca6 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9e611dd128a773ed19b71ee2cfd4ec4b2f102b70": "9e611dd Changes" | kind=Commit | source=git | neighbors=[972c222 Fases 6-7 en Fase 1 voltooid, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b48bbc00918e7d8958db25acdcf8a5729deeea27": "b48bbc0 chore: snapshot lokale SEO-pagina's (Veendam/Hoogeveen) + sitemap" | kind=Commit | source=git | neighbors=[main, f207e52 feat(seo): dienstenpagina's web…, Footer.tsx, LocationLanding.tsx, index.tsx, meer-diensten.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b9ed97e9721c5bdc7e7a8e961909212a0b9cd1a5": "b9ed97e Gebruik getSession() voor auth check zodat sessies persistent blijven" | kind=Commit | source=git | neighbors=[692d231 Update .gitignore to include .e…, main, de7fb47 Wijzig prijzen: Starter €499, P…, Pricing.tsx, _authenticated.tsx, routeTree.gen.ts] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e33fd2d65d3b43ea54a47e29bace710b10e6e172": "e33fd2d tekst vergroten en cookies" | kind=Commit | source=git | neighbors=[423b3f1 cashing, main, ab23069 admin en klantportaal wijziging…, CookieBanner.tsx, Nav.tsx, index.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f958216b3ca515ca3d0d8c9e854052ef349135db": "f958216 leads functions" | kind=Commit | source=git | neighbors=[9a2689c code fixes, admin.tsx, admin.leads.tsx, main, 85a6666 SEO en robot, CallbackAgenda.tsx] | lang=en
- "components_about": "About.tsx" | kind=code-symbol | source=src/components/About.tsx:L1 | neighbors=[1a66af6 Verbeter layout en visueel ritme, 6262799 fixes, 735e902 Verwijder alle section-label ey…, 85ad012 Cinematisch redesign: forest he…, 9a2689c code fixes, ecdbe8e fixes] | lang=en
- "lib_telegram_server": "telegram.server.ts" | kind=code-symbol | source=src/lib/telegram.server.ts:L1 | neighbors=[2b1d78f telegram, fc7da2d animaties en paginas, botToken(), botUsername(), generateAndSendMfaCode(), generateLinkToken()] | lang=en
- "public_site_ping": "site-ping.ts" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 8c0bb37 nieuwe featues, 9be6953 bug fixes, a3773ee sec fixes, abdbfe4 bug fixes 2] | lang=en
- "supabase_client": "client.ts" | kind=code-symbol | source=src/integrations/supabase/client.ts:L1 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, ChatWidget.tsx, use-auth.tsx] | lang=en
- "ui_command": "command.tsx" | kind=code-symbol | source=src/components/ui/command.tsx:L1 | neighbors=[utils.ts, cn(), Command, CommandDialog(), CommandEmpty, CommandGroup] | lang=en
- "ui_pagination": "pagination.tsx" | kind=code-symbol | source=src/components/ui/pagination.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, ButtonProps, buttonVariants, Pagination()] | lang=en
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L3 | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.tsx] | lang=en
- "authenticated_admin_leads": "admin.leads.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.leads.tsx:L1 | neighbors=[LeadsPage(), Route, SectionKey, SECTIONS, CallbackAgenda.tsx, CallbackAgenda()] | lang=en
- "authenticated_admin_rollen": "admin.rollen.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L1 | neighbors=[AdminRollenPage(), NewRoleSection(), ROLE_LABEL, RolesListSection(), RollenSidebar(), Route] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@05a6c9e9f8bcd3a34d63acabb3f20f7bd384cf6e": "05a6c9e Verbeter admin changes-tab layout en voeg verwijder-knop toe; verwijder…" | kind=Commit | source=git | neighbors=[admin.tsx, main, 692d231 Update .gitignore to include .e…, Nav.tsx, ca832db Add .env to .gitignore., tmp-main-merge] | lang=en
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
