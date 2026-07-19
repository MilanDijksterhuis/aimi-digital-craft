# Node Description Batch 2 of 36

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

- "authenticated_admin_changes": "admin.changes.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L1 | neighbors=[AdminChangesPage(), ChangesListSection(), ChangesSidebar(), FormField(), NewChangeSection(), Route] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@85ad012fdc1c37cb42ccd3aef07c4ae3a086d343": "85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond" | kind=Commit | source=git | neighbors=[1a55bd1 Fix formatting in FAQ answers, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c480d2e78b924711eb93a74ee039c53839cedb3d": "c480d2e leads" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "lib_rbac": "rbac.ts" | kind=code-symbol | source=src/lib/rbac.ts:L1 | neighbors=[74ecdc1 code fixes, 81a87ed commit, a3773ee sec fixes, c480d2e leads, TeamTab.tsx, use-permissions.tsx] | lang=en
- "lib_status": "status.ts" | kind=code-symbol | source=src/lib/status.ts:L1 | neighbors=[admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, DeletedChangesTab.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fcbe34536a4c3d5289a7b032e5333621022762cd": "fcbe345 Admin sidebar en panels aangepast" | kind=Commit | source=git | neighbors=[9784613 4 nieuwe portal-paginaën toegev…, f099d92 Changes, admin.tsx, portal.tsx, main, tmp-main-merge] | lang=en
- "components_portalonboardingtour": "PortalOnboardingTour.tsx" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L1 | neighbors=[portal.tsx, 2fcc9a3 fixes, ContactBlock, Contacts, DoneScreen(), fadeVariants] | lang=en
- "components_pricing": "Pricing.tsx" | kind=code-symbol | source=src/components/Pricing.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 59d8b3c Code edited in Lovable Code Edi…, 6bf533b pushes, 735e902 Verwijder alle section-label ey…, 7842118 Prijs wijzing 499, 85ad012 Cinematisch redesign: forest he…] | lang=en
- "lib_admin_server": "admin.server.ts" | kind=code-symbol | source=src/lib/admin.server.ts:L1 | neighbors=[5bc9ff0 google authenticatoin, b29ceec Fixed weak PRNG and RLS, b83b044 Revert: verwijder Google OAuth …, c480d2e leads, adminCreateCustomer(), adminGenerateRecoveryLink()] | lang=en
- "ui_menubar": "menubar.tsx" | kind=code-symbol | source=src/components/ui/menubar.tsx:L1 | neighbors=[utils.ts, cn(), Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup()] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@37c0d1132e12148d34d0e28584a73e5dbdeb80d1": "37c0d11 Dock tokens toegevoegd & emojis weg" | kind=Commit | source=git | neighbors=[account.tsx, admin.tsx, portal.tsx, main, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@39d363a2495e5f26f7f19a28e943e127069dd2b1": "39d363a server basic" | kind=Commit | source=git | neighbors=[admin.tsx, server.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@98edc37ba6ff0139a6a4671733da1a6e5c3f3977": "98edc37 Changes" | kind=Commit | source=git | neighbors=[2db539c Work in progress, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cf4ac916c9d21d8583be09d4560a4b9edfc772a3": "cf4ac91 Alle fases toegevoegd & cron ready" | kind=Commit | source=git | neighbors=[0e9729e Changes, 972c222 Fases 6-7 en Fase 1 voltooid, admin.tsx, main, tmp-main-merge, tmp-revert-main] | lang=en
- "components_onboardingwizard": "OnboardingWizard.tsx" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, 2fcc9a3 fixes, ContactBlock, Contacts, DoneScreen(), fadeVariants] | lang=en
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, ConfirmDialog.tsx, IdleTimeout.tsx, utils.ts] | lang=en
- "ui_carousel": "carousel.tsx" | kind=code-symbol | source=src/components/ui/carousel.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, Button, Carousel, CarouselApi] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d5059059162451d0aaeacc22ba26501474c6336": "2d50590 wip: lokale wijzigingen voor pull" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, server.tsx, main, worktree-replicated-fluttering-whisper, 500f718 Merge branch 'main' of https://…] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2fcc9a3163985aad54209b8dffaf9b30700f563a": "2fcc9a3 fixes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9784613ecb68fc2ae54edec239121e8a5b3a1e69": "9784613 4 nieuwe portal-paginaën toegevoegd" | kind=Commit | source=git | neighbors=[account.tsx, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "components_services": "Services.tsx" | kind=code-symbol | source=src/components/Services.tsx:L1 | neighbors=[1a66af6 Verbeter layout en visueel ritme, 5f47f6d animaties, 6aba49e euro teken, 735e902 Verwijder alle section-label ey…, 85ad012 Cinematisch redesign: forest he…, 98edc37 Changes] | lang=en
- "lib_project_status": "project-status.ts" | kind=code-symbol | source=src/lib/project-status.ts:L1 | neighbors=[admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, 7f7208a new, isProjectOverdue()] | lang=en
- "lib_rate_limit": "rate-limit.ts" | kind=code-symbol | source=src/lib/rate-limit.ts:L1 | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, a3773ee sec fixes, e2cd310 Ip blocker, f67dba7 rate limiting, checkRateLimit(), getClientIp()] | lang=en
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L1 | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@735e902c51d625ed7341c671107f9dbb42daf866": "735e902 Verwijder alle section-label eyebrows" | kind=Commit | source=git | neighbors=[1a66af6 Verbeter layout en visueel ritme, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7dbbf181c7a21b02a3567994cd322406f3725e70": "7dbbf18 perf fixes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, server.tsx, main, 9d0b477 perf fixes, AdminChatPanel.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f7208aa43fdfa244b60b6276caa8aa58711a29f": "7f7208a new" | kind=Commit | source=git | neighbors=[4c90153 Merge branch 'main' of https://…, admin.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8c0bb379df770f798a18c767ee4e06e6fc4afb59": "8c0bb37 nieuwe featues" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@972c2223fa7c04609621529ff6457abd72bf7c09": "972c222 Fases 6-7 en Fase 1 voltooid" | kind=Commit | source=git | neighbors=[5597edf Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9be69532127d2e1ce84e2f83fdd56e1b8e841de5": "9be6953 bug fixes" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ab2306942c15e5b23bd1375283f3d830985cf2f6": "ab23069 admin en klantportaal wijzigingen" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d7e04a1984f7e9822af0be83b0232bbdf2b06082": "d7e04a1 Home-Afspraak weggehaald" | kind=Commit | source=git | neighbors=[0332090 Changes, 3d42113 Kleurproblemen opgeholzen, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe0143f8262f69ee0e473f083e385c79d96904e0": "fe0143f Herschrijf copy voor professionelere, menselijkere toon" | kind=Commit | source=git | neighbors=[cdd7702 Voeg FAQ toe, Hosting Only serv…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=nl
- "ui_form": "form.tsx" | kind=code-symbol | source=src/components/ui/form.tsx:L1 | neighbors=[utils.ts, cn(), FormControl, FormDescription, FormField(), FormFieldContext] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@00e2564e6e05873392daa31f3002dbcd55ba5e49": "00e2564 voorwaaren en privacy" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0b21971b50ba506c2049e26503e1eed118b4a56b": "0b21971 Changes weergave verbeterd" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@23bb181803f2ce5f4cc8ee5998de5890d3f28a00": "23bb181 sec" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@74ecdc10ce81ec85c95c43d6611ebfdbac1fee7f": "74ecdc1 code fixes" | kind=Commit | source=git | neighbors=[main, 9a2689c code fixes, eslint.config.js, accounts.functions.ts, admin.functions.ts, auth-guards.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@97e70ec098f2a6b7e4e16fea53292b4a615cfb6f": "97e70ec Changes" | kind=Commit | source=git | neighbors=[account.tsx, admin.tsx, portal.tsx, main, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9d5975759956f36f5620e5bcc77dd8119e4f1fea": "9d59757 Afspraakpagina toegevoegd" | kind=Commit | source=git | neighbors=[2d57d40 Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-001.json

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
