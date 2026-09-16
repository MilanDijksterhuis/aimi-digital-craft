# Node Description Batch 5 of 52

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

- "routes_algemene_voorwaarden": "algemene-voorwaarden.tsx" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 04c01f8 SEO, 36d8ccb new pages, 59bb970 eyoo, 6e488ba fixes, 8fdd571 SEO] | lang=en
- "routes_privacybeleid": "privacybeleid.tsx" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 04c01f8 SEO, 36d8ccb new pages, 59bb970 eyoo, 6e488ba fixes, 8fdd571 SEO] | lang=en
- "routes_website_laten_maken_drachten": "website-laten-maken-drachten.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-drachten.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "routes_website_laten_maken_emmen": "website-laten-maken-emmen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-emmen.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "routes_website_laten_maken_groningen": "website-laten-maken-groningen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-groningen.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "routes_website_laten_maken_heerenveen": "website-laten-maken-heerenveen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-heerenveen.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "routes_website_laten_maken_hoogezand": "website-laten-maken-hoogezand.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-hoogezand.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "routes_website_laten_maken_klusbedrijf": "website-laten-maken-klusbedrijf.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-klusbedrijf.tsx:L1 | neighbors=[36d8ccb new pages, 59bb970 eyoo, aabf034 SEO, c27f4c8 new, BranchPage.tsx, BranchPage()] | lang=en
- "routes_website_laten_maken_leeuwarden": "website-laten-maken-leeuwarden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-leeuwarden.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "routes_website_laten_maken_schilder": "website-laten-maken-schilder.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-schilder.tsx:L1 | neighbors=[36d8ccb new pages, 59bb970 eyoo, aabf034 SEO, c27f4c8 new, BranchPage.tsx, BranchPage()] | lang=en
- "routes_website_laten_maken_sneek": "website-laten-maken-sneek.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-sneek.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "routes_website_laten_maken_stadskanaal": "website-laten-maken-stadskanaal.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-stadskanaal.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "routes_website_laten_maken_winschoten": "website-laten-maken-winschoten.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-winschoten.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2()] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d81f503bf330e743d938de12ac875806a431d8b": "2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse p…" | kind=Commit | source=git | neighbors=[032ba88 SEO, main, ec1f322 feat(ui): Diensten-dropdown in …, Footer.tsx, Nav.tsx, onderhoud-hosting.tsx] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3e100e89b470747d643ed553e0d9cd86e2a12da8": "3e100e8 Fixed security findings" | kind=Commit | source=git | neighbors=[main, f5b75ff Code edited in Lovable Code Edi…, 20260610172053_c69c4c4e-eb62-440d-a0ce-…, routeTree.gen.ts, 6381715 Changes, 59d8b3c Code edited in Lovable Code Edi…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@422202ca21e0d3af9a6e6dee69207ff36dc3d59f": "422202c Made the requested updates" | kind=Commit | source=git | neighbors=[37c0d11 Dock tokens toegevoegd & emojis…, main, 779aebc Nieuwe Lottielab-look toegepast, 978e288 Changes, __root.tsx, 5e76ecd Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@59d8b3c2f97e6936e50cf4977f0be2dcccd5edf3": "59d8b3c Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, 3e100e8 Fixed security findings, 65b58f1 Work in progress, Pricing.tsx, routeTree.gen.ts, 9765b29 Home widget keuzemodel toegevoe…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5fa25a3040331f2e10f5b0c4aca47ccde167297d": "5fa25a3 Add project detail pages for admin and client portal" | kind=Commit | source=git | neighbors=[39d363a server basic, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6bf533b6ef76444668d849914f51230c39e54b7c": "6bf533b pushes" | kind=Commit | source=git | neighbors=[admin.tsx, main, 0193196 monitoring, Pricing.tsx, TeamTab.tsx, c480d2e leads] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7671988e57720f280f187d84d645129a09c85398": "7671988 monitoring2" | kind=Commit | source=git | neighbors=[0193196 monitoring, admin.tsx, server.tsx, main, 39d363a server basic, routeTree.gen.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@779aebc5f7cc527a1d6adf8a7af053c8da7624c8": "779aebc Nieuwe Lottielab-look toegepast" | kind=Commit | source=git | neighbors=[171c22a Changes, 422202c Made the requested updates, main, 3d42113 Kleurproblemen opgeholzen, 86b3111 Changes, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@825b6d5c4b234eb840d2414b8ab28fd7c5df7e58": "825b6d5 Logo teruggezet naar vorige versie" | kind=Commit | source=git | neighbors=[7d64543 Changes, main, 27cb157 Work in progress, be0f1fb Lovable update, Nav.tsx, d42e3c5 Logo toegevoegd aan site] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@965b87aabe543bd9d548a28fd49631983919930c": "965b87a Fix foto, nav animaties, portal leesbaarheid" | kind=Commit | source=git | neighbors=[85ad012 Cinematisch redesign: forest he…, main, f0dfd24 Services: interactief tab-panel…, Hero.tsx, Nav.tsx, _authenticated.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9765b2993c9bfd44968795d3007cbbd1ee5ac2f0": "9765b29 Home widget keuzemodel toegevoegd" | kind=Commit | source=git | neighbors=[main, 59d8b3c Code edited in Lovable Code Edi…, Contact.tsx, routeTree.gen.ts, c07aca6 Changes, 9d59757 Afspraakpagina toegevoegd] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9e611dd128a773ed19b71ee2cfd4ec4b2f102b70": "9e611dd Changes" | kind=Commit | source=git | neighbors=[972c222 Fases 6-7 en Fase 1 voltooid, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b48bbc00918e7d8958db25acdcf8a5729deeea27": "b48bbc0 chore: snapshot lokale SEO-pagina's (Veendam/Hoogeveen) + sitemap" | kind=Commit | source=git | neighbors=[main, f207e52 feat(seo): dienstenpagina's web…, Footer.tsx, LocationLanding.tsx, index.tsx, meer-diensten.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b9ed97e9721c5bdc7e7a8e961909212a0b9cd1a5": "b9ed97e Gebruik getSession() voor auth check zodat sessies persistent blijven" | kind=Commit | source=git | neighbors=[692d231 Update .gitignore to include .e…, main, de7fb47 Wijzig prijzen: Starter €499, P…, Pricing.tsx, _authenticated.tsx, routeTree.gen.ts] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e33fd2d65d3b43ea54a47e29bace710b10e6e172": "e33fd2d tekst vergroten en cookies" | kind=Commit | source=git | neighbors=[423b3f1 cashing, main, ab23069 admin en klantportaal wijziging…, CookieBanner.tsx, Nav.tsx, index.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f958216b3ca515ca3d0d8c9e854052ef349135db": "f958216 leads functions" | kind=Commit | source=git | neighbors=[9a2689c code fixes, admin.tsx, admin.leads.tsx, main, 85a6666 SEO en robot, CallbackAgenda.tsx] | lang=en
- "components_exampleslideshow": "ExampleSlideshow.tsx" | kind=code-symbol | source=src/components/ExampleSlideshow.tsx:L1 | neighbors=[6e488ba fixes, aabf034 SEO, BranchPage.tsx, ExampleSlideshow(), GENERIC_EXAMPLES, ServiceExample] | lang=en
- "public_site_ping": "site-ping.ts" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 8c0bb37 nieuwe featues, 9be6953 bug fixes, a3773ee sec fixes, abdbfe4 bug fixes 2] | lang=en
- "routes_login": "login.tsx" | kind=code-symbol | source=src/routes/login.tsx:L1 | neighbors=[04c01f8 SEO, 2b1d78f telegram, 36d8ccb new pages, 6b21362 Catch login network errors inst…, 6e488ba fixes, 8fdd571 SEO] | lang=en
- "routes_website_laten_maken_autorijschool": "website-laten-maken-autorijschool.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-autorijschool.tsx:L1 | neighbors=[36d8ccb new pages, 59bb970 eyoo, aabf034 SEO, BranchPage.tsx, BranchPage(), BranchPageData] | lang=en
- "routes_website_laten_maken_hovenier": "website-laten-maken-hovenier.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-hovenier.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, BranchPage.tsx, BranchPage(), BranchPageData] | lang=en
- "supabase_client": "client.ts" | kind=code-symbol | source=src/integrations/supabase/client.ts:L1 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, ChatWidget.tsx, use-auth.tsx] | lang=en
- "ui_command": "command.tsx" | kind=code-symbol | source=src/components/ui/command.tsx:L1 | neighbors=[utils.ts, cn(), Command, CommandDialog(), CommandEmpty, CommandGroup] | lang=en
- "ui_pagination": "pagination.tsx" | kind=code-symbol | source=src/components/ui/pagination.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, ButtonProps, buttonVariants, Pagination()] | lang=en
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L3 | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.tsx] | lang=en
- "authenticated_admin_leads": "admin.leads.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.leads.tsx:L1 | neighbors=[LeadsPage(), Route, SectionKey, SECTIONS, CallbackAgenda.tsx, CallbackAgenda()] | lang=en
- "authenticated_admin_rollen": "admin.rollen.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L1 | neighbors=[AdminRollenPage(), NewRoleSection(), ROLE_LABEL, RolesListSection(), RollenSidebar(), Route] | lang=en

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
