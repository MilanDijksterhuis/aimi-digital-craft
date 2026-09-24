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

- "routes_website_laten_maken_emmen": "website-laten-maken-emmen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-emmen.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_groningen": "website-laten-maken-groningen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-groningen.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_heerenveen": "website-laten-maken-heerenveen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-heerenveen.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_hoogezand": "website-laten-maken-hoogezand.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-hoogezand.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_klusbedrijf": "website-laten-maken-klusbedrijf.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-klusbedrijf.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, aabf034 SEO, c27f4c8 new, BranchPage.tsx] | lang=en
- "routes_website_laten_maken_leeuwarden": "website-laten-maken-leeuwarden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-leeuwarden.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_schilder": "website-laten-maken-schilder.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-schilder.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, aabf034 SEO, c27f4c8 new, BranchPage.tsx] | lang=en
- "routes_website_laten_maken_sneek": "website-laten-maken-sneek.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-sneek.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_stadskanaal": "website-laten-maken-stadskanaal.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-stadskanaal.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_winschoten": "website-laten-maken-winschoten.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-winschoten.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "ui_form": "form.tsx" | kind=code-symbol | source=src/components/ui/form.tsx:L1 | neighbors=[utils.ts, cn(), FormControl, FormDescription, FormField(), FormFieldContext] | lang=en
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L3 | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.blog.tsx, admin.blog.$postId.tsx, admin.changes.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@01931966e029b775aef8f1d58e90ab7970202bef": "0193196 monitoring" | kind=Commit | source=git | neighbors=[server.tsx, main, 7671988 monitoring2, Hero.tsx, monitoring.functions.ts, routeTree.gen.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@30d7c6075c7b349a3e0618743a156ef00effa1f5": "30d7c60 Merge project detail pages (admin + klantenportaal)" | kind=Commit | source=git | neighbors=[admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main, 500f718 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3d4211399a05421021aecdfb57628bccc5c6e0bc": "3d42113 Kleurproblemen opgeholzen" | kind=Commit | source=git | neighbors=[21355f6 Changes, admin.tsx, portal.tsx, main, a4fa2cf Work in progress, d7e04a1 Home-Afspraak weggehaald] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5bc9ff091d924aa3e0087dc62ab5e248795531af": "5bc9ff0 google authenticatoin" | kind=Commit | source=git | neighbors=[admin.tsx, main, 54af09c Remove .env from tracking, admin.functions.ts, admin.server.ts, email.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8f2439fed941da366b5f6eff2aa3425cd87c2d27": "8f2439f Calendly-link bijgewerkt" | kind=Commit | source=git | neighbors=[main, 94c1dcf Work in progress, d42e3c5 Logo toegevoegd aan site, Contact.tsx, routeTree.gen.ts, 9827b2f Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@abdbfe4f597ec5da05820419baed92c87754418d": "abdbfe4 bug fixes 2" | kind=Commit | source=git | neighbors=[admin.tsx, main, 9be6953 bug fixes, admin.functions.ts, portal.functions.ts, site-ping.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b6f96582b51177ea9582d7a228befb942d6bf94f": "b6f9658 Redesign: donker editorial thema, Syne font, goud accent" | kind=Commit | source=git | neighbors=[main, b515400 Redesign: warm licht thema, ink…, Footer.tsx, Hero.tsx, Nav.tsx, index.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c3a6178d2539b75789ecac85585670295225b732": "c3a6178 portal changes" | kind=Commit | source=git | neighbors=[ab23069 admin en klantportaal wijziging…, admin.tsx, portal.tsx, main, 5bc9ff0 google authenticatoin, AdminChatPanel.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cdd7702d3810e996fabb170f6ef845dfe471e125": "cdd7702 Voeg FAQ toe, Hosting Only service, geanimeerde CTA-knop" | kind=Commit | source=git | neighbors=[main, fe0143f Herschrijf copy voor profession…, FAQ.tsx, Hero.tsx, Services.tsx, index.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dda7a0472154e76df4cebdccd57646690e2b817b": "dda7a04 web tester" | kind=Commit | source=git | neighbors=[36d8ccb new pages, main, aabf034 SEO, Hero.tsx, Nav.tsx, telegram.functions.ts] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@eccff4fd07b9b0fb4c6ce64f572f9d83c20650d2": "eccff4f bug fixes 2" | kind=Commit | source=git | neighbors=[9be6953 bug fixes, main, 775e9f5 bug fixes, admin.functions.ts, monitoring.shared.ts, portal.functions.ts] | lang=en
- "lib_contact_functions": "contact.functions.ts" | kind=code-symbol | source=src/lib/contact.functions.ts:L1 | neighbors=[2b1d78f telegram, 74ecdc1 code fixes, a3773ee sec fixes, fc7da2d animaties en paginas, adminDeleteContactSubmission, adminListContactSubmissions] | lang=en
- "lib_telegram_server": "telegram.server.ts" | kind=code-symbol | source=src/lib/telegram.server.ts:L1 | neighbors=[2b1d78f telegram, dda7a04 web tester, fc7da2d animaties en paginas, botToken(), botUsername(), generateAndSendMfaCode()] | lang=en
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f": "20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L1 | neighbors=[auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.available_credits(), public.change_requests] | lang=en
- "routes_login": "login.tsx" | kind=code-symbol | source=src/routes/login.tsx:L1 | neighbors=[04c01f8 SEO, 2b1d78f telegram, 36d8ccb new pages, 4a960c6 SEO, 6b21362 Catch login network errors inst…, 6e488ba fixes] | lang=en
- "routes_website_laten_maken_autorijschool": "website-laten-maken-autorijschool.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-autorijschool.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, aabf034 SEO, BranchPage.tsx, BranchPage()] | lang=en
- "routes_website_laten_maken_hovenier": "website-laten-maken-hovenier.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-hovenier.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, BranchPage.tsx, BranchPage()] | lang=en
- "routes_website_laten_maken_loodgieter": "website-laten-maken-loodgieter.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-loodgieter.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, BranchPage.tsx, BranchPage()] | lang=en
- "ui_command": "command.tsx" | kind=code-symbol | source=src/components/ui/command.tsx:L1 | neighbors=[InternalLinkPicker.tsx, utils.ts, cn(), Command, CommandDialog(), CommandEmpty] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d81f503bf330e743d938de12ac875806a431d8b": "2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse p…" | kind=Commit | source=git | neighbors=[032ba88 SEO, main, ec1f322 feat(ui): Diensten-dropdown in …, Footer.tsx, Nav.tsx, onderhoud-hosting.tsx] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3e100e89b470747d643ed553e0d9cd86e2a12da8": "3e100e8 Fixed security findings" | kind=Commit | source=git | neighbors=[main, f5b75ff Code edited in Lovable Code Edi…, 20260610172053_c69c4c4e-eb62-440d-a0ce-…, routeTree.gen.ts, 6381715 Changes, 59d8b3c Code edited in Lovable Code Edi…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@422202ca21e0d3af9a6e6dee69207ff36dc3d59f": "422202c Made the requested updates" | kind=Commit | source=git | neighbors=[37c0d11 Dock tokens toegevoegd & emojis…, main, 779aebc Nieuwe Lottielab-look toegepast, 978e288 Changes, __root.tsx, 5e76ecd Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@59d8b3c2f97e6936e50cf4977f0be2dcccd5edf3": "59d8b3c Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, 3e100e8 Fixed security findings, 65b58f1 Work in progress, Pricing.tsx, routeTree.gen.ts, 9765b29 Home widget keuzemodel toegevoe…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5fa25a3040331f2e10f5b0c4aca47ccde167297d": "5fa25a3 Add project detail pages for admin and client portal" | kind=Commit | source=git | neighbors=[39d363a server basic, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6bf533b6ef76444668d849914f51230c39e54b7c": "6bf533b pushes" | kind=Commit | source=git | neighbors=[admin.tsx, main, 0193196 monitoring, Pricing.tsx, TeamTab.tsx, c480d2e leads] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7671988e57720f280f187d84d645129a09c85398": "7671988 monitoring2" | kind=Commit | source=git | neighbors=[0193196 monitoring, admin.tsx, server.tsx, main, 39d363a server basic, routeTree.gen.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@779aebc5f7cc527a1d6adf8a7af053c8da7624c8": "779aebc Nieuwe Lottielab-look toegepast" | kind=Commit | source=git | neighbors=[171c22a Changes, 422202c Made the requested updates, main, 3d42113 Kleurproblemen opgeholzen, 86b3111 Changes, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@825b6d5c4b234eb840d2414b8ab28fd7c5df7e58": "825b6d5 Logo teruggezet naar vorige versie" | kind=Commit | source=git | neighbors=[7d64543 Changes, main, 27cb157 Work in progress, be0f1fb Lovable update, Nav.tsx, d42e3c5 Logo toegevoegd aan site] | lang=nl

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
