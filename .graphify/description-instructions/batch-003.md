# Node Description Batch 4 of 52

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9784613ecb68fc2ae54edec239121e8a5b3a1e69": "9784613 4 nieuwe portal-paginaën toegevoegd" | kind=Commit | source=git | neighbors=[account.tsx, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@98edc37ba6ff0139a6a4671733da1a6e5c3f3977": "98edc37 Changes" | kind=Commit | source=git | neighbors=[2db539c Work in progress, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9be69532127d2e1ce84e2f83fdd56e1b8e841de5": "9be6953 bug fixes" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, eccff4f bug fixes 2, admin.functions.ts, monitoring.shared.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ab2306942c15e5b23bd1375283f3d830985cf2f6": "ab23069 admin en klantportaal wijzigingen" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, c3a6178 portal changes, FAQ.tsx, Nav.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d7e04a1984f7e9822af0be83b0232bbdf2b06082": "d7e04a1 Home-Afspraak weggehaald" | kind=Commit | source=git | neighbors=[0332090 Changes, 3d42113 Kleurproblemen opgeholzen, main, 0b21971 Changes weergave verbeterd, 282fc41 Changes, Contact.tsx] | lang=pt
- "components_branchpage_branchpage": "BranchPage()" | kind=code-symbol | source=src/components/BranchPage.tsx:L192 | neighbors=[BranchPage.tsx, website-laten-maken-autobedrijf.tsx, website-laten-maken-autorijschool.tsx, website-laten-maken-bloemist.tsx, website-laten-maken-boekhouder.tsx, website-laten-maken-cateringbedrijf.tsx] | lang=en
- "components_branchpage_branchpagedata": "BranchPageData" | kind=code-symbol | source=src/components/BranchPage.tsx:L26 | neighbors=[BranchPage.tsx, website-laten-maken-autobedrijf.tsx, website-laten-maken-autorijschool.tsx, website-laten-maken-bloemist.tsx, website-laten-maken-boekhouder.tsx, website-laten-maken-cateringbedrijf.tsx] | lang=en
- "components_locationpagev2_locationpagedata": "LocationPageData" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L50 | neighbors=[LocationPageV2.tsx, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "components_locationpagev2_locationpagev2": "LocationPageV2()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L248 | neighbors=[LocationPageV2.tsx, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "lib_project_status": "project-status.ts" | kind=code-symbol | source=src/lib/project-status.ts:L1 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, 7f7208a new, isProjectOverdue()] | lang=en
- "routes_webdesign": "webdesign.tsx" | kind=code-symbol | source=src/routes/webdesign.tsx:L1 | neighbors=[36d8ccb new pages, c27f4c8 new, CookieBanner.tsx, CookieBanner(), Footer.tsx, Footer()] | lang=en
- "routes_website_laten_maken_roden": "website-laten-maken-roden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-roden.tsx:L1 | neighbors=[36d8ccb new pages, 59bb970 eyoo, 6e488ba fixes, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx] | lang=en
- "supabase_client": "client.ts" | kind=code-symbol | source=src/integrations/supabase/client.ts:L1 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, ChatWidget.tsx, use-auth.tsx] | lang=en
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L1 | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00e2564e6e05873392daa31f3002dbcd55ba5e49": "00e2564 voorwaaren en privacy" | kind=Commit | source=git | neighbors=[main, d3cd320 Hero tekst groter, Services whi…, Footer.tsx, Pricing.tsx, algemene-voorwaarden.tsx, privacybeleid.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0b21971b50ba506c2049e26503e1eed118b4a56b": "0b21971 Changes weergave verbeterd" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, a110759 Work in progress, f3ee883 Lovable update, Contact.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@23bb181803f2ce5f4cc8ee5998de5890d3f28a00": "23bb181 sec" | kind=Commit | source=git | neighbors=[admin.tsx, main, ecdbe8e fixes, expire-accounts.ts, site-error.ts, site-ping.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@735e902c51d625ed7341c671107f9dbb42daf866": "735e902 Verwijder alle section-label eyebrows" | kind=Commit | source=git | neighbors=[1a66af6 Verbeter layout en visueel ritme, main, 1a55bd1 Fix formatting in FAQ answers, Contact.tsx, FAQ.tsx, Hero.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@74ecdc10ce81ec85c95c43d6611ebfdbac1fee7f": "74ecdc1 code fixes" | kind=Commit | source=git | neighbors=[main, 9a2689c code fixes, eslint.config.js, accounts.functions.ts, admin.functions.ts, auth-guards.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@97e70ec098f2a6b7e4e16fea53292b4a615cfb6f": "97e70ec Changes" | kind=Commit | source=git | neighbors=[account.tsx, admin.tsx, portal.tsx, main, 37c0d11 Dock tokens toegevoegd & emojis…, ChatWidget.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9d5975759956f36f5620e5bcc77dd8119e4f1fea": "9d59757 Afspraakpagina toegevoegd" | kind=Commit | source=git | neighbors=[2d57d40 Changes, admin.tsx, main, 9765b29 Home widget keuzemodel toegevoe…, dc274b5 Changes, Nav.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b83b044f1a1e5988a06e95684fa7b4d5f7d4f122": "b83b044 Revert: verwijder Google OAuth / Connectors implementatie" | kind=Commit | source=git | neighbors=[332d0c8 Fix: externalize googleapis/nod…, admin.tsx, main, 12764e3 Security: fix IDOR vulnerabilit…, admin.functions.ts, admin.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d42e3c51de5036824a5f1115e09ae44224507b66": "d42e3c5 Logo toegevoegd aan site" | kind=Commit | source=git | neighbors=[8f2439f Calendly-link bijgewerkt, main, 482bba9 Work in progress, 825b6d5 Logo teruggezet naar vorige ver…, Nav.tsx, index.tsx] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe0143f8262f69ee0e473f083e385c79d96904e0": "fe0143f Herschrijf copy voor professionelere, menselijkere toon" | kind=Commit | source=git | neighbors=[cdd7702 Voeg FAQ toe, Hosting Only serv…, main, b6f9658 Redesign: donker editorial them…, Contact.tsx, FAQ.tsx, Hero.tsx] | lang=nl
- "lib_seo_cityareaserved": "cityAreaServed()" | kind=code-symbol | source=src/lib/seo.ts:L263 | neighbors=[seo.ts, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "routes_website_laten_maken_assen": "website-laten-maken-assen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-assen.tsx:L1 | neighbors=[36d8ccb new pages, 59bb970 eyoo, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_coevorden": "website-laten-maken-coevorden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-coevorden.tsx:L1 | neighbors=[36d8ccb new pages, 6e488ba fixes, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "routes_website_laten_maken_meppel": "website-laten-maken-meppel.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-meppel.tsx:L1 | neighbors=[36d8ccb new pages, 6e488ba fixes, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en
- "ui_form": "form.tsx" | kind=code-symbol | source=src/components/ui/form.tsx:L1 | neighbors=[utils.ts, cn(), FormControl, FormDescription, FormField(), FormFieldContext] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@01931966e029b775aef8f1d58e90ab7970202bef": "0193196 monitoring" | kind=Commit | source=git | neighbors=[server.tsx, main, 7671988 monitoring2, Hero.tsx, monitoring.functions.ts, routeTree.gen.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@30d7c6075c7b349a3e0618743a156ef00effa1f5": "30d7c60 Merge project detail pages (admin + klantenportaal)" | kind=Commit | source=git | neighbors=[admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main, 500f718 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3d4211399a05421021aecdfb57628bccc5c6e0bc": "3d42113 Kleurproblemen opgeholzen" | kind=Commit | source=git | neighbors=[21355f6 Changes, admin.tsx, portal.tsx, main, a4fa2cf Work in progress, d7e04a1 Home-Afspraak weggehaald] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5bc9ff091d924aa3e0087dc62ab5e248795531af": "5bc9ff0 google authenticatoin" | kind=Commit | source=git | neighbors=[admin.tsx, main, 54af09c Remove .env from tracking, admin.functions.ts, admin.server.ts, email.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8f2439fed941da366b5f6eff2aa3425cd87c2d27": "8f2439f Calendly-link bijgewerkt" | kind=Commit | source=git | neighbors=[main, 94c1dcf Work in progress, d42e3c5 Logo toegevoegd aan site, Contact.tsx, routeTree.gen.ts, 9827b2f Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@abdbfe4f597ec5da05820419baed92c87754418d": "abdbfe4 bug fixes 2" | kind=Commit | source=git | neighbors=[admin.tsx, main, 9be6953 bug fixes, admin.functions.ts, portal.functions.ts, site-ping.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b5c2a226c946bfa58da9dc197b94bb43cdcd64f7": "b5c2a22 blog" | kind=Commit | source=git | neighbors=[6e488ba fixes, main, BranchPage.tsx, Nav.tsx, ProcessTimeline.tsx, markdown.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b6f96582b51177ea9582d7a228befb942d6bf94f": "b6f9658 Redesign: donker editorial thema, Syne font, goud accent" | kind=Commit | source=git | neighbors=[main, b515400 Redesign: warm licht thema, ink…, Footer.tsx, Hero.tsx, Nav.tsx, index.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c3a6178d2539b75789ecac85585670295225b732": "c3a6178 portal changes" | kind=Commit | source=git | neighbors=[ab23069 admin en klantportaal wijziging…, admin.tsx, portal.tsx, main, 5bc9ff0 google authenticatoin, AdminChatPanel.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cdd7702d3810e996fabb170f6ef845dfe471e125": "cdd7702 Voeg FAQ toe, Hosting Only service, geanimeerde CTA-knop" | kind=Commit | source=git | neighbors=[main, fe0143f Herschrijf copy voor profession…, FAQ.tsx, Hero.tsx, Services.tsx, index.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dda7a0472154e76df4cebdccd57646690e2b817b": "dda7a04 web tester" | kind=Commit | source=git | neighbors=[36d8ccb new pages, main, aabf034 SEO, Hero.tsx, Nav.tsx, telegram.functions.ts] | lang=pt

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
