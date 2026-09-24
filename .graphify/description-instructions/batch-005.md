# Node Description Batch 6 of 52

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@965b87aabe543bd9d548a28fd49631983919930c": "965b87a Fix foto, nav animaties, portal leesbaarheid" | kind=Commit | source=git | neighbors=[85ad012 Cinematisch redesign: forest he…, main, f0dfd24 Services: interactief tab-panel…, Hero.tsx, Nav.tsx, _authenticated.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9765b2993c9bfd44968795d3007cbbd1ee5ac2f0": "9765b29 Home widget keuzemodel toegevoegd" | kind=Commit | source=git | neighbors=[main, 59d8b3c Code edited in Lovable Code Edi…, Contact.tsx, routeTree.gen.ts, c07aca6 Changes, 9d59757 Afspraakpagina toegevoegd] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9e611dd128a773ed19b71ee2cfd4ec4b2f102b70": "9e611dd Changes" | kind=Commit | source=git | neighbors=[972c222 Fases 6-7 en Fase 1 voltooid, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b48bbc00918e7d8958db25acdcf8a5729deeea27": "b48bbc0 chore: snapshot lokale SEO-pagina's (Veendam/Hoogeveen) + sitemap" | kind=Commit | source=git | neighbors=[main, f207e52 feat(seo): dienstenpagina's web…, Footer.tsx, LocationLanding.tsx, index.tsx, meer-diensten.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b9ed97e9721c5bdc7e7a8e961909212a0b9cd1a5": "b9ed97e Gebruik getSession() voor auth check zodat sessies persistent blijven" | kind=Commit | source=git | neighbors=[692d231 Update .gitignore to include .e…, main, de7fb47 Wijzig prijzen: Starter €499, P…, Pricing.tsx, _authenticated.tsx, routeTree.gen.ts] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e33fd2d65d3b43ea54a47e29bace710b10e6e172": "e33fd2d tekst vergroten en cookies" | kind=Commit | source=git | neighbors=[423b3f1 cashing, main, ab23069 admin en klantportaal wijziging…, CookieBanner.tsx, Nav.tsx, index.tsx] | lang=en
- "components_bulkscheduledialog": "BulkScheduleDialog.tsx" | kind=code-symbol | source=src/components/BulkScheduleDialog.tsx:L1 | neighbors=[admin.blog.tsx, 1727351 blog, BulkScheduleDialog(), PostLite, SortableRow(), blog-schedule.ts] | lang=en
- "components_exampleslideshow": "ExampleSlideshow.tsx" | kind=code-symbol | source=src/components/ExampleSlideshow.tsx:L1 | neighbors=[6e488ba fixes, aabf034 SEO, BranchPage.tsx, ExampleSlideshow(), GENERIC_EXAMPLES, ServiceExample] | lang=en
- "components_internallinkpicker": "InternalLinkPicker.tsx" | kind=code-symbol | source=src/components/InternalLinkPicker.tsx:L1 | neighbors=[1727351 blog, BlogPostForm.tsx, InternalLinkPicker(), LinkPickTarget, site-pages.ts, CORE_PAGES] | lang=en
- "components_processtimeline": "ProcessTimeline.tsx" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L1 | neighbors=[129b916 manier van werken, 6262799 fixes, 6e488ba fixes, 85a6666 SEO en robot, 8fdd571 SEO, 9a2689c code fixes] | lang=en
- "public_site_ping": "site-ping.ts" | kind=code-symbol | source=src/routes/api/public/site-ping.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 8c0bb37 nieuwe featues, 9be6953 bug fixes, a3773ee sec fixes, abdbfe4 bug fixes 2] | lang=en
- "routes_website_laten_maken_autobedrijf": "website-laten-maken-autobedrijf.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-autobedrijf.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, BranchPage.tsx, BranchPage(), BranchPageData] | lang=en
- "routes_website_laten_maken_bloemist": "website-laten-maken-bloemist.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-bloemist.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, BranchPage.tsx, BranchPage(), BranchPageData] | lang=en
- "routes_website_laten_maken_boekhouder": "website-laten-maken-boekhouder.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-boekhouder.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, BranchPage.tsx, BranchPage(), BranchPageData] | lang=en
- "routes_website_laten_maken_cateringbedrijf": "website-laten-maken-cateringbedrijf.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-cateringbedrijf.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, BranchPage.tsx, BranchPage(), BranchPageData] | lang=en
- "routes_website_laten_maken_makelaar": "website-laten-maken-makelaar.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-makelaar.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, BranchPage.tsx, BranchPage(), BranchPageData] | lang=en
- "routes_website_laten_maken_restaurant": "website-laten-maken-restaurant.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-restaurant.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, BranchPage.tsx, BranchPage(), BranchPageData] | lang=en
- "ui_pagination": "pagination.tsx" | kind=code-symbol | source=src/components/ui/pagination.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, ButtonProps, buttonVariants, Pagination()] | lang=en
- "authenticated_admin_leads": "admin.leads.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.leads.tsx:L1 | neighbors=[LeadsPage(), Route, SectionKey, SECTIONS, CallbackAgenda.tsx, CallbackAgenda()] | lang=en
- "authenticated_admin_rollen": "admin.rollen.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L1 | neighbors=[AdminRollenPage(), NewRoleSection(), ROLE_LABEL, RolesListSection(), RollenSidebar(), Route] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@05a6c9e9f8bcd3a34d63acabb3f20f7bd384cf6e": "05a6c9e Verbeter admin changes-tab layout en voeg verwijder-knop toe; verwijder…" | kind=Commit | source=git | neighbors=[admin.tsx, main, 692d231 Update .gitignore to include .e…, Nav.tsx, ca832db Add .env to .gitignore., tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0cfedfb33503f3a3e63bd888bbab4ada9af28813": "0cfedfb Changes" | kind=Commit | source=git | neighbors=[main, 451efd4 Changes, Nav.tsx, routeTree.gen.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@12764e3bf99b323d2b4c9395e4c221eef081bac5": "12764e3 Security: fix IDOR vulnerability in attachment URL generation" | kind=Commit | source=git | neighbors=[main, 5f47f6d animaties, admin.functions.ts, portal.functions.ts, b83b044 Revert: verwijder Google OAuth …, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@129b9165ad3dff3db206b50fe9994206e2a0d1c2": "129b916 manier van werken" | kind=Commit | source=git | neighbors=[main, 9f689f7 tracking voor user M, ProcessTimeline.tsx, index.tsx, e2cd310 Ip blocker, tmp-main-merge] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1a66af6f4adc8106f895467916a1a89740a4b1f1": "1a66af6 Verbeter layout en visueel ritme" | kind=Commit | source=git | neighbors=[main, 735e902 Verwijder alle section-label ey…, Hero.tsx, Services.tsx, b515400 Redesign: warm licht thema, ink…, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@38037d958c00d24317e786c390500725242c3a5e": "38037d9 Update Hero.tsx" | kind=Commit | source=git | neighbors=[main, 99450d7 Fix typo in Hero component text…, c0b2317 Changes, Hero.tsx, ec6c394 Fix typo in Hero component text, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@41d8eb5b389b11b8cbc768f32208498dfd9d730b": "41d8eb5 Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper] | lang=en
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
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f67dba7f88adfcf5248c028b5d59f4b7d1e63573": "f67dba7 rate limiting" | kind=Commit | source=git | neighbors=[5f47f6d animaties, main, e2cd310 Ip blocker, rate-limit.ts, server.ts, tmp-main-merge] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f958216b3ca515ca3d0d8c9e854052ef349135db": "f958216 leads functions" | kind=Commit | source=git | neighbors=[9a2689c code fixes, admin.tsx, admin.leads.tsx, main, 85a6666 SEO en robot, CallbackAgenda.tsx] | lang=en
- "lib_monitoring_shared": "monitoring.shared.ts" | kind=code-symbol | source=src/lib/monitoring.shared.ts:L1 | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, 74ecdc1 code fixes, 9be6953 bug fixes, a837528 bug fixes, eccff4f bug fixes 2, assertPublicHost()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-005.json

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
