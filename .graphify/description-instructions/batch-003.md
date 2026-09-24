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

- "ui_carousel": "carousel.tsx" | kind=code-symbol | source=src/components/ui/carousel.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, Button, Carousel, CarouselApi] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@04c01f83ed73c16d90744d4b989523421b29496e": "04c01f8 SEO" | kind=Commit | source=git | neighbors=[main, bc99d99 achtegrond, algemene-voorwaarden.tsx, contact.tsx, index.tsx, login.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6262799006ef224d43b0bd811bd784528d859cfa": "6262799 fixes" | kind=Commit | source=git | neighbors=[5d3df91 new, main, c27f4c8 new, Contact.tsx, FAQ.tsx, Hero.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7dbbf181c7a21b02a3567994cd322406f3725e70": "7dbbf18 perf fixes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, server.tsx, main, 9d0b477 perf fixes, AdminChatPanel.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f7208aa43fdfa244b60b6276caa8aa58711a29f": "7f7208a new" | kind=Commit | source=git | neighbors=[4c90153 Merge branch 'main' of https://…, admin.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@972c2223fa7c04609621529ff6457abd72bf7c09": "972c222 Fases 6-7 en Fase 1 voltooid" | kind=Commit | source=git | neighbors=[5597edf Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9784613ecb68fc2ae54edec239121e8a5b3a1e69": "9784613 4 nieuwe portal-paginaën toegevoegd" | kind=Commit | source=git | neighbors=[account.tsx, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@98edc37ba6ff0139a6a4671733da1a6e5c3f3977": "98edc37 Changes" | kind=Commit | source=git | neighbors=[2db539c Work in progress, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9be69532127d2e1ce84e2f83fdd56e1b8e841de5": "9be6953 bug fixes" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, eccff4f bug fixes 2, admin.functions.ts, monitoring.shared.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ab2306942c15e5b23bd1375283f3d830985cf2f6": "ab23069 admin en klantportaal wijzigingen" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, c3a6178 portal changes, FAQ.tsx, Nav.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cc405f4b18ac550381c9432541596964a8d2bf8e": "cc405f4 pagina updates" | kind=Commit | source=git | neighbors=[main, e84aa2e hoofdpagina, Contact.tsx, CookieBanner.tsx, FAQ.tsx, Footer.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d7e04a1984f7e9822af0be83b0232bbdf2b06082": "d7e04a1 Home-Afspraak weggehaald" | kind=Commit | source=git | neighbors=[0332090 Changes, 3d42113 Kleurproblemen opgeholzen, main, 0b21971 Changes weergave verbeterd, 282fc41 Changes, Contact.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f80d1a3c7f7d9a2496c3327fc408ea8d938711c3": "f80d1a3 blur" | kind=Commit | source=git | neighbors=[1727351 blog, main, 7a80ccf docs(seo): volledige SEO-audit …, e543723 Merge pull request #1 from Mila…, BranchPage.tsx, FAQ.tsx] | lang=pt
- "components_branchpage_branchpage": "BranchPage()" | kind=code-symbol | source=src/components/BranchPage.tsx:L232 | neighbors=[BranchPage.tsx, website-laten-maken-autobedrijf.tsx, website-laten-maken-autorijschool.tsx, website-laten-maken-bloemist.tsx, website-laten-maken-boekhouder.tsx, website-laten-maken-cateringbedrijf.tsx] | lang=en
- "components_branchpage_branchpagedata": "BranchPageData" | kind=code-symbol | source=src/components/BranchPage.tsx:L26 | neighbors=[BranchPage.tsx, website-laten-maken-autobedrijf.tsx, website-laten-maken-autorijschool.tsx, website-laten-maken-bloemist.tsx, website-laten-maken-boekhouder.tsx, website-laten-maken-cateringbedrijf.tsx] | lang=en
- "components_locationpagev2_locationpagedata": "LocationPageData" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L50 | neighbors=[LocationPageV2.tsx, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "components_locationpagev2_locationpagev2": "LocationPageV2()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L248 | neighbors=[LocationPageV2.tsx, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "lib_project_status": "project-status.ts" | kind=code-symbol | source=src/lib/project-status.ts:L1 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, 7f7208a new, isProjectOverdue()] | lang=en
- "routes_webdesign": "webdesign.tsx" | kind=code-symbol | source=src/routes/webdesign.tsx:L1 | neighbors=[36d8ccb new pages, c27f4c8 new, CookieBanner.tsx, CookieBanner(), Footer.tsx, Footer()] | lang=en
- "routes_website_laten_maken_assen": "website-laten-maken-assen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-assen.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx] | lang=en
- "routes_website_laten_maken_coevorden": "website-laten-maken-coevorden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-coevorden.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 6e488ba fixes, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx] | lang=en
- "routes_website_laten_maken_meppel": "website-laten-maken-meppel.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-meppel.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 6e488ba fixes, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx] | lang=en
- "supabase_client_supabase": "supabase" | kind=code-symbol | source=src/integrations/supabase/client.ts:L34 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, BlogPostForm.tsx, ChatWidget.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00e2564e6e05873392daa31f3002dbcd55ba5e49": "00e2564 voorwaaren en privacy" | kind=Commit | source=git | neighbors=[main, d3cd320 Hero tekst groter, Services whi…, Footer.tsx, Pricing.tsx, algemene-voorwaarden.tsx, privacybeleid.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0b21971b50ba506c2049e26503e1eed118b4a56b": "0b21971 Changes weergave verbeterd" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, a110759 Work in progress, f3ee883 Lovable update, Contact.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@23bb181803f2ce5f4cc8ee5998de5890d3f28a00": "23bb181 sec" | kind=Commit | source=git | neighbors=[admin.tsx, main, ecdbe8e fixes, expire-accounts.ts, site-error.ts, site-ping.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2b1d78fa285d867c430c015c42dd4cf9ea6dd5dd": "2b1d78f telegram" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.$accountId.tsx, admin.instellingen.tsx, main, fc7da2d animaties en paginas, TelegramMfaCard.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@735e902c51d625ed7341c671107f9dbb42daf866": "735e902 Verwijder alle section-label eyebrows" | kind=Commit | source=git | neighbors=[1a66af6 Verbeter layout en visueel ritme, main, 1a55bd1 Fix formatting in FAQ answers, Contact.tsx, FAQ.tsx, Hero.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@74ecdc10ce81ec85c95c43d6611ebfdbac1fee7f": "74ecdc1 code fixes" | kind=Commit | source=git | neighbors=[main, 9a2689c code fixes, eslint.config.js, accounts.functions.ts, admin.functions.ts, auth-guards.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8c0bb379df770f798a18c767ee4e06e6fc4afb59": "8c0bb37 nieuwe featues" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, cdbf369 bug fixes, admin.functions.ts, portal.functions.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@97e70ec098f2a6b7e4e16fea53292b4a615cfb6f": "97e70ec Changes" | kind=Commit | source=git | neighbors=[account.tsx, admin.tsx, portal.tsx, main, 37c0d11 Dock tokens toegevoegd & emojis…, ChatWidget.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9d5975759956f36f5620e5bcc77dd8119e4f1fea": "9d59757 Afspraakpagina toegevoegd" | kind=Commit | source=git | neighbors=[2d57d40 Changes, admin.tsx, main, 9765b29 Home widget keuzemodel toegevoe…, dc274b5 Changes, Nav.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b5c2a226c946bfa58da9dc197b94bb43cdcd64f7": "b5c2a22 blog" | kind=Commit | source=git | neighbors=[6e488ba fixes, main, 6ccd4dc CMS, BranchPage.tsx, Nav.tsx, ProcessTimeline.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b83b044f1a1e5988a06e95684fa7b4d5f7d4f122": "b83b044 Revert: verwijder Google OAuth / Connectors implementatie" | kind=Commit | source=git | neighbors=[332d0c8 Fix: externalize googleapis/nod…, admin.tsx, main, 12764e3 Security: fix IDOR vulnerabilit…, admin.functions.ts, admin.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d42e3c51de5036824a5f1115e09ae44224507b66": "d42e3c5 Logo toegevoegd aan site" | kind=Commit | source=git | neighbors=[8f2439f Calendly-link bijgewerkt, main, 482bba9 Work in progress, 825b6d5 Logo teruggezet naar vorige ver…, Nav.tsx, index.tsx] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe0143f8262f69ee0e473f083e385c79d96904e0": "fe0143f Herschrijf copy voor professionelere, menselijkere toon" | kind=Commit | source=git | neighbors=[cdd7702 Voeg FAQ toe, Hosting Only serv…, main, b6f9658 Redesign: donker editorial them…, Contact.tsx, FAQ.tsx, Hero.tsx] | lang=nl
- "lib_seo_cityareaserved": "cityAreaServed()" | kind=code-symbol | source=src/lib/seo.ts:L274 | neighbors=[seo.ts, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "routes_algemene_voorwaarden": "algemene-voorwaarden.tsx" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 04c01f8 SEO, 36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, 6e488ba fixes] | lang=en
- "routes_privacybeleid": "privacybeleid.tsx" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 04c01f8 SEO, 36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, 6e488ba fixes] | lang=en
- "routes_website_laten_maken_drachten": "website-laten-maken-drachten.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-drachten.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, c27f4c8 new, LocationPageV2.tsx, LocationPageData] | lang=en

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
