# Node Description Batch 9 of 46

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9ed5748c4b6028bc51d46bcf1cd2aa997119824c": "9ed5748 Changes" | kind=Commit | source=git | neighbors=[65b58f1 Work in progress, main, 7732f7b Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a8b31df30e0052d246cfb047819739257dac82e9": "a8b31df Changes" | kind=Commit | source=git | neighbors=[admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ae858bb1d86994963f4ba6ccba2a4eeecbd971c8": "ae858bb Changes" | kind=Commit | source=git | neighbors=[95b5275 Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b0eef5e760ef12f76b52b2003143bc255855db8f": "b0eef5e Changes" | kind=Commit | source=git | neighbors=[3650c07 Changes, admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b7647ca231efaa0b8334732ace2c362ff251c985": "b7647ca Changes" | kind=Commit | source=git | neighbors=[5d704cb Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b927a97079509c58c6fc410856844221c543a1de": "b927a97 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c5322995bd96d20508a21e6e7af970b4453b2cc9": "c532299 Changes" | kind=Commit | source=git | neighbors=[978e288 Changes, main, ec62d9f Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c9908b925aca58a7df19b9b68a89204575c0a354": "c9908b9 Changes" | kind=Commit | source=git | neighbors=[6dc7740 Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ca832dba472890156800a46d2a36527acbd4835e": "ca832db Add .env to .gitignore." | kind=Commit | source=git | neighbors=[879bad8 Handoff doc gemaakt, main, 05a6c9e Verbeter admin changes-tab layo…, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e0af60e416676458f6a99ae201c467c42d5292be": "e0af60e Update package.json" | kind=Commit | source=git | neighbors=[main, f24ecdb Change server preset from 'bun'…, fe58e74 Update vite.config.ts, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e6fbbec0493ba2f7136608281f27571ba14ba958": "e6fbbec Changes" | kind=Commit | source=git | neighbors=[3ee5ecb Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ec62d9f02b3a195f89dcf50b62b93a648b9c6aac": "ec62d9f Changes" | kind=Commit | source=git | neighbors=[c532299 Changes, main, 171c22a Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ee1b8aef2b854fd9adfc972132e301fa732457d5": "ee1b8ae Change start script from bun to node" | kind=Commit | source=git | neighbors=[main, 821a216 Update vite.config.ts, f24ecdb Change server preset from 'bun'…, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ee6f2e6258f7f7d30a8a29602e032870f607320c": "ee6f2e6 fixes" | kind=Commit | source=git | neighbors=[2fcc9a3 fixes, admin.accounts.$accountId.tsx, portal.tsx, main, f7b9fd5 Merge branch 'main' of https://…, PortalTutorial.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f099d92d74bba337e0ab1a935f9073110bd0746a": "f099d92 Changes" | kind=Commit | source=git | neighbors=[a8b31df Changes, admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fb1c670fc9159c6d72de0ce53227e1ba130b7e7f": "fb1c670 Changes" | kind=Commit | source=git | neighbors=[ab14295 Design overhauled, A11y-bar weg, account.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "components_adminchatpanel": "AdminChatPanel.tsx" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L1 | neighbors=[admin.tsx, 7dbbf18 perf fixes, c3a6178 portal changes, f2eb4fe Fix root cause: catch Supabase …, AdminChatPanel(), ChatRow] | lang=en
- "lib_accounts_server": "accounts.server.ts" | kind=code-symbol | source=src/lib/accounts.server.ts:L1 | neighbors=[7dbbf18 perf fixes, 81a87ed commit, bbc9d80 Surface site_errors in the acco…, adminGetAccountDetailImpl(), adminHardDeleteUserImpl(), adminListAllAccountsImpl()] | lang=en
- "lib_auth_guards_server": "auth-guards.server.ts" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L1 | neighbors=[74ecdc1 code fixes, ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()] | lang=en
- "routes_algemene_voorwaarden": "algemene-voorwaarden.tsx" | kind=code-symbol | source=src/routes/algemene-voorwaarden.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 04c01f8 SEO, 8fdd571 SEO, ecdbe8e fixes, Footer.tsx, Footer()] | lang=en
- "routes_privacybeleid": "privacybeleid.tsx" | kind=code-symbol | source=src/routes/privacybeleid.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 04c01f8 SEO, 8fdd571 SEO, ecdbe8e fixes, Footer.tsx, Footer()] | lang=en
- "routes_sitemap_xml": "sitemap[.]xml.tsx" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L1 | neighbors=[2d81f50 feat(seo): vervang /cases door …, 5d3df91 new, 8fdd571 SEO, b48bbc0 chore: snapshot lokale SEO-pagi…, bc842b8 leads functions, c27f4c8 new] | lang=en
- "supabase_client_supabase": "supabase" | kind=code-symbol | source=src/integrations/supabase/client.ts:L34 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, ChatWidget.tsx, use-auth.tsx] | lang=en
- "ui_table": "table.tsx" | kind=code-symbol | source=src/components/ui/table.tsx:L1 | neighbors=[utils.ts, cn(), Table, TableBody, TableCaption, TableCell] | lang=en
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, utils.ts] | lang=en
- "vite_config": "vite.config.ts" | kind=code-symbol | source=vite.config.ts:L1 | neighbors=[332d0c8 Fix: externalize googleapis/nod…, 4510b3f perf fixes, 7dbbf18 perf fixes, 821a216 Update vite.config.ts, 85a6666 SEO en robot, 9d0b477 perf fixes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3ee5ecb08528968ff2c00c4da8885489b010b85d": "3ee5ecb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@bc99d995fc54a93c71b1e81777475cd6b33cc03b": "bc99d99 achtegrond" | kind=Commit | source=git | neighbors=[04c01f8 SEO, main, 8fdd571 SEO, rodeachtergrond.tsx, onderhoud-hosting.tsx, webshop-laten-maken.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f207e52c87c9713fff8c4ac51f4a9efb667aa9d1": "f207e52 feat(seo): dienstenpagina's website/webshop/hosting met unieke content …" | kind=Commit | source=git | neighbors=[b48bbc0 chore: snapshot lokale SEO-pagi…, main, 9965896 feat(seo): contact- en cases-pa…, ServicePage.tsx, seo.ts, onderhoud-hosting.tsx] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fcf1ee779f8b822cf8ee26742bdcf20c8a46286e": "fcf1ee7 Changes" | kind=Commit | source=git | neighbors=[68ae2dd Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "components_branchpage_branchpage": "BranchPage()" | kind=code-symbol | source=src/components/BranchPage.tsx:L97 | neighbors=[BranchPage.tsx, website-laten-maken-hovenier.tsx, website-laten-maken-kapsalon.tsx, website-laten-maken-klusbedrijf.tsx, website-laten-maken-loodgieter.tsx, website-laten-maken-nagelstudio.tsx] | lang=en
- "components_branchpage_branchpagedata": "BranchPageData" | kind=code-symbol | source=src/components/BranchPage.tsx:L20 | neighbors=[BranchPage.tsx, website-laten-maken-hovenier.tsx, website-laten-maken-kapsalon.tsx, website-laten-maken-klusbedrijf.tsx, website-laten-maken-loodgieter.tsx, website-laten-maken-nagelstudio.tsx] | lang=en
- "components_callbackschedulemodal": "CallbackScheduleModal.tsx" | kind=code-symbol | source=src/components/CallbackScheduleModal.tsx:L1 | neighbors=[f958216 leads functions, CallbackScheduleForm(), CallbackScheduleModal(), CallbackScheduleValue, callbacks.ts, CALLBACK_REASONS] | lang=en
- "migrations_20260713130000_project_expansion_phase2": "20260713130000_project_expansion_phase2.sql" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L1 | neighbors=[81a87ed commit, auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks] | lang=en
- "public_site_error": "site-error.ts" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, a3773ee sec fixes, rate-limit.ts, checkRateLimit(), Body] | lang=en
- "routes_website_laten_maken_hovenier": "website-laten-maken-hovenier.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-hovenier.tsx:L1 | neighbors=[c27f4c8 new, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_kapsalon": "website-laten-maken-kapsalon.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-kapsalon.tsx:L1 | neighbors=[c27f4c8 new, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_klusbedrijf": "website-laten-maken-klusbedrijf.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-klusbedrijf.tsx:L1 | neighbors=[c27f4c8 new, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_loodgieter": "website-laten-maken-loodgieter.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-loodgieter.tsx:L1 | neighbors=[c27f4c8 new, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_nagelstudio": "website-laten-maken-nagelstudio.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-nagelstudio.tsx:L1 | neighbors=[c27f4c8 new, BranchPage.tsx, BranchPage(), BranchPageData, seo.ts, breadcrumbJsonLd()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-008.json

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
