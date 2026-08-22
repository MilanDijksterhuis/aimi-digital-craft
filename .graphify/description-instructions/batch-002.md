# Node Description Batch 3 of 46

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d5059059162451d0aaeacc22ba26501474c6336": "2d50590 wip: lokale wijzigingen voor pull" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, server.tsx, main, 500f718 Merge branch 'main' of https://…, expire-accounts.ts] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2fcc9a3163985aad54209b8dffaf9b30700f563a": "2fcc9a3 fixes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6262799006ef224d43b0bd811bd784528d859cfa": "6262799 fixes" | kind=Commit | source=git | neighbors=[5d3df91 new, main, c27f4c8 new, About.tsx, Contact.tsx, FAQ.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@98edc37ba6ff0139a6a4671733da1a6e5c3f3977": "98edc37 Changes" | kind=Commit | source=git | neighbors=[2db539c Work in progress, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "components_faq": "FAQ.tsx" | kind=code-symbol | source=src/components/FAQ.tsx:L1 | neighbors=[04564c5 fixes, 1a55bd1 Fix formatting in FAQ answers, 5d3df91 new, 6262799 fixes, 735e902 Verwijder alle section-label ey…, 85ad012 Cinematisch redesign: forest he…] | lang=en
- "components_onboardingwizard": "OnboardingWizard.tsx" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, 2fcc9a3 fixes, ContactBlock, Contacts, DoneScreen(), fadeVariants] | lang=en
- "routes_contact": "contact.tsx" | kind=code-symbol | source=src/routes/contact.tsx:L1 | neighbors=[04c01f8 SEO, 5d3df91 new, 8fdd571 SEO, 9965896 feat(seo): contact- en cases-pa…, Contact.tsx, Contact()] | lang=en
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, utils.ts] | lang=en
- "ui_carousel": "carousel.tsx" | kind=code-symbol | source=src/components/ui/carousel.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, Button, Carousel, CarouselApi] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@04c01f83ed73c16d90744d4b989523421b29496e": "04c01f8 SEO" | kind=Commit | source=git | neighbors=[main, bc99d99 achtegrond, algemene-voorwaarden.tsx, contact.tsx, index.tsx, login.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2b1d78fa285d867c430c015c42dd4cf9ea6dd5dd": "2b1d78f telegram" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.$accountId.tsx, admin.instellingen.tsx, main, fc7da2d animaties en paginas, TelegramMfaCard.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@735e902c51d625ed7341c671107f9dbb42daf866": "735e902 Verwijder alle section-label eyebrows" | kind=Commit | source=git | neighbors=[1a66af6 Verbeter layout en visueel ritme, main, 1a55bd1 Fix formatting in FAQ answers, About.tsx, Contact.tsx, FAQ.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7dbbf181c7a21b02a3567994cd322406f3725e70": "7dbbf18 perf fixes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, server.tsx, main, 9d0b477 perf fixes, AdminChatPanel.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f7208aa43fdfa244b60b6276caa8aa58711a29f": "7f7208a new" | kind=Commit | source=git | neighbors=[4c90153 Merge branch 'main' of https://…, admin.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8c0bb379df770f798a18c767ee4e06e6fc4afb59": "8c0bb37 nieuwe featues" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, cdbf369 bug fixes, admin.functions.ts, portal.functions.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@972c2223fa7c04609621529ff6457abd72bf7c09": "972c222 Fases 6-7 en Fase 1 voltooid" | kind=Commit | source=git | neighbors=[5597edf Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9784613ecb68fc2ae54edec239121e8a5b3a1e69": "9784613 4 nieuwe portal-paginaën toegevoegd" | kind=Commit | source=git | neighbors=[account.tsx, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9be69532127d2e1ce84e2f83fdd56e1b8e841de5": "9be6953 bug fixes" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, eccff4f bug fixes 2, admin.functions.ts, monitoring.shared.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ab2306942c15e5b23bd1375283f3d830985cf2f6": "ab23069 admin en klantportaal wijzigingen" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, c3a6178 portal changes, FAQ.tsx, Nav.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d7e04a1984f7e9822af0be83b0232bbdf2b06082": "d7e04a1 Home-Afspraak weggehaald" | kind=Commit | source=git | neighbors=[0332090 Changes, 3d42113 Kleurproblemen opgeholzen, main, 0b21971 Changes weergave verbeterd, 282fc41 Changes, Contact.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe0143f8262f69ee0e473f083e385c79d96904e0": "fe0143f Herschrijf copy voor professionelere, menselijkere toon" | kind=Commit | source=git | neighbors=[cdd7702 Voeg FAQ toe, Hosting Only serv…, main, b6f9658 Redesign: donker editorial them…, About.tsx, Contact.tsx, FAQ.tsx] | lang=nl
- "components_locationpagev2_locationpagedata": "LocationPageData" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L46 | neighbors=[LocationPageV2.tsx, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "components_locationpagev2_locationpagev2": "LocationPageV2()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L145 | neighbors=[LocationPageV2.tsx, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "lib_project_status": "project-status.ts" | kind=code-symbol | source=src/lib/project-status.ts:L1 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, 7f7208a new, isProjectOverdue()] | lang=en
- "lib_rate_limit": "rate-limit.ts" | kind=code-symbol | source=src/lib/rate-limit.ts:L1 | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, a3773ee sec fixes, e2cd310 Ip blocker, f67dba7 rate limiting, checkRateLimit(), getClientIp()] | lang=en
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L1 | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00e2564e6e05873392daa31f3002dbcd55ba5e49": "00e2564 voorwaaren en privacy" | kind=Commit | source=git | neighbors=[main, d3cd320 Hero tekst groter, Services whi…, Footer.tsx, Pricing.tsx, algemene-voorwaarden.tsx, privacybeleid.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0b21971b50ba506c2049e26503e1eed118b4a56b": "0b21971 Changes weergave verbeterd" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, a110759 Work in progress, f3ee883 Lovable update, Contact.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@23bb181803f2ce5f4cc8ee5998de5890d3f28a00": "23bb181 sec" | kind=Commit | source=git | neighbors=[admin.tsx, main, ecdbe8e fixes, expire-accounts.ts, site-error.ts, site-ping.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@74ecdc10ce81ec85c95c43d6611ebfdbac1fee7f": "74ecdc1 code fixes" | kind=Commit | source=git | neighbors=[main, 9a2689c code fixes, eslint.config.js, accounts.functions.ts, admin.functions.ts, auth-guards.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@97e70ec098f2a6b7e4e16fea53292b4a615cfb6f": "97e70ec Changes" | kind=Commit | source=git | neighbors=[account.tsx, admin.tsx, portal.tsx, main, 37c0d11 Dock tokens toegevoegd & emojis…, ChatWidget.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9d5975759956f36f5620e5bcc77dd8119e4f1fea": "9d59757 Afspraakpagina toegevoegd" | kind=Commit | source=git | neighbors=[2d57d40 Changes, admin.tsx, main, 9765b29 Home widget keuzemodel toegevoe…, dc274b5 Changes, Nav.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b83b044f1a1e5988a06e95684fa7b4d5f7d4f122": "b83b044 Revert: verwijder Google OAuth / Connectors implementatie" | kind=Commit | source=git | neighbors=[332d0c8 Fix: externalize googleapis/nod…, admin.tsx, main, 12764e3 Security: fix IDOR vulnerabilit…, admin.functions.ts, admin.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d42e3c51de5036824a5f1115e09ae44224507b66": "d42e3c5 Logo toegevoegd aan site" | kind=Commit | source=git | neighbors=[8f2439f Calendly-link bijgewerkt, main, 482bba9 Work in progress, 825b6d5 Logo teruggezet naar vorige ver…, Nav.tsx, index.tsx] | lang=nl
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L103 | neighbors=[BranchPage.tsx, Footer.tsx, LocationLanding.tsx, LocationPageV2.tsx, ServicePage.tsx, algemene-voorwaarden.tsx] | lang=en
- "lib_seo_cityareaserved": "cityAreaServed()" | kind=code-symbol | source=src/lib/seo.ts:L41 | neighbors=[seo.ts, website-laten-maken-assen.tsx, website-laten-maken-coevorden.tsx, website-laten-maken-drachten.tsx, website-laten-maken-emmen.tsx, website-laten-maken-groningen.tsx] | lang=en
- "routes_webdesign": "webdesign.tsx" | kind=code-symbol | source=src/routes/webdesign.tsx:L1 | neighbors=[c27f4c8 new, CookieBanner.tsx, CookieBanner(), Footer.tsx, Footer(), Nav.tsx] | lang=en
- "ui_form": "form.tsx" | kind=code-symbol | source=src/components/ui/form.tsx:L1 | neighbors=[utils.ts, cn(), FormControl, FormDescription, FormField(), FormFieldContext] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@01931966e029b775aef8f1d58e90ab7970202bef": "0193196 monitoring" | kind=Commit | source=git | neighbors=[server.tsx, main, 7671988 monitoring2, Hero.tsx, monitoring.functions.ts, routeTree.gen.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@30d7c6075c7b349a3e0618743a156ef00effa1f5": "30d7c60 Merge project detail pages (admin + klantenportaal)" | kind=Commit | source=git | neighbors=[admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main, 500f718 Merge branch 'main' of https://…] | lang=en

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
