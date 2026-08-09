# Node Description Batch 8 of 42

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8a81dd141dffbb9e136fbbeadff0f1a615ca92dd": "8a81dd1 Fixed security issues" | kind=Commit | source=git | neighbors=[7ca6d63 Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@90677bfe31851fdd79ce7a5a1d724616869cf281": "90677bf Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, ab14295 Design overhauled, A11y-bar weg] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@95b52753579c4b90283b539f8c822770ab08f569": "95b5275 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9ed5748c4b6028bc51d46bcf1cd2aa997119824c": "9ed5748 Changes" | kind=Commit | source=git | neighbors=[65b58f1 Work in progress, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a8b31df30e0052d246cfb047819739257dac82e9": "a8b31df Changes" | kind=Commit | source=git | neighbors=[admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ae858bb1d86994963f4ba6ccba2a4eeecbd971c8": "ae858bb Changes" | kind=Commit | source=git | neighbors=[95b5275 Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b0eef5e760ef12f76b52b2003143bc255855db8f": "b0eef5e Changes" | kind=Commit | source=git | neighbors=[3650c07 Changes, admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b7647ca231efaa0b8334732ace2c362ff251c985": "b7647ca Changes" | kind=Commit | source=git | neighbors=[5d704cb Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b927a97079509c58c6fc410856844221c543a1de": "b927a97 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c5322995bd96d20508a21e6e7af970b4453b2cc9": "c532299 Changes" | kind=Commit | source=git | neighbors=[978e288 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c9908b925aca58a7df19b9b68a89204575c0a354": "c9908b9 Changes" | kind=Commit | source=git | neighbors=[6dc7740 Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ca832dba472890156800a46d2a36527acbd4835e": "ca832db Add .env to .gitignore." | kind=Commit | source=git | neighbors=[879bad8 Handoff doc gemaakt, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e0af60e416676458f6a99ae201c467c42d5292be": "e0af60e Update package.json" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e6fbbec0493ba2f7136608281f27571ba14ba958": "e6fbbec Changes" | kind=Commit | source=git | neighbors=[3ee5ecb Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ec62d9f02b3a195f89dcf50b62b93a648b9c6aac": "ec62d9f Changes" | kind=Commit | source=git | neighbors=[c532299 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ee1b8aef2b854fd9adfc972132e301fa732457d5": "ee1b8ae Change start script from bun to node" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ee6f2e6258f7f7d30a8a29602e032870f607320c": "ee6f2e6 fixes" | kind=Commit | source=git | neighbors=[2fcc9a3 fixes, admin.accounts.$accountId.tsx, portal.tsx, main, f7b9fd5 Merge branch 'main' of https://…, PortalTutorial.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f099d92d74bba337e0ab1a935f9073110bd0746a": "f099d92 Changes" | kind=Commit | source=git | neighbors=[a8b31df Changes, admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fb1c670fc9159c6d72de0ce53227e1ba130b7e7f": "fb1c670 Changes" | kind=Commit | source=git | neighbors=[ab14295 Design overhauled, A11y-bar weg, account.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "components_adminchatpanel": "AdminChatPanel.tsx" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L1 | neighbors=[admin.tsx, 7443b54 Fix root cause: catch Supabase …, 7dbbf18 perf fixes, c3a6178 portal changes, f2eb4fe Fix root cause: catch Supabase …, AdminChatPanel()] | lang=en
- "lib_accounts_server": "accounts.server.ts" | kind=code-symbol | source=src/lib/accounts.server.ts:L1 | neighbors=[7dbbf18 perf fixes, 81a87ed commit, 99bd8ac Surface site_errors in the acco…, 9e611dd Changes, bbc9d80 Surface site_errors in the acco…, cf4ac91 Alle fases toegevoegd & cron re…] | lang=en
- "lib_auth_guards_server": "auth-guards.server.ts" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L1 | neighbors=[74ecdc1 code fixes, ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()] | lang=en
- "lib_seo": "seo.ts" | kind=code-symbol | source=src/lib/seo.ts:L1 | neighbors=[f207e52 feat(seo): dienstenpagina's web…, breadcrumbJsonLd(), faqJsonLd(), ld(), LdScript, serviceJsonLd()] | lang=en
- "supabase_client_supabase": "supabase" | kind=code-symbol | source=src/integrations/supabase/client.ts:L34 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, ChatWidget.tsx, use-auth.tsx] | lang=en
- "ui_table": "table.tsx" | kind=code-symbol | source=src/components/ui/table.tsx:L1 | neighbors=[utils.ts, cn(), Table, TableBody, TableCaption, TableCell] | lang=en
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, utils.ts] | lang=en
- "vite_config": "vite.config.ts" | kind=code-symbol | source=vite.config.ts:L1 | neighbors=[332d0c8 Fix: externalize googleapis/nod…, 4510b3f perf fixes, 7dbbf18 perf fixes, 821a216 Update vite.config.ts, 85a6666 SEO en robot, 9d0b477 perf fixes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3ee5ecb08528968ff2c00c4da8885489b010b85d": "3ee5ecb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f207e52c87c9713fff8c4ac51f4a9efb667aa9d1": "f207e52 feat(seo): dienstenpagina's website/webshop/hosting met unieke content …" | kind=Commit | source=git | neighbors=[b48bbc0 chore: snapshot lokale SEO-pagi…, main, 9965896 feat(seo): contact- en cases-pa…, ServicePage.tsx, seo.ts, onderhoud-hosting.tsx] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fcf1ee779f8b822cf8ee26742bdcf20c8a46286e": "fcf1ee7 Changes" | kind=Commit | source=git | neighbors=[68ae2dd Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "components_callbackschedulemodal": "CallbackScheduleModal.tsx" | kind=code-symbol | source=src/components/CallbackScheduleModal.tsx:L1 | neighbors=[f958216 leads functions, CallbackScheduleForm(), CallbackScheduleModal(), CallbackScheduleValue, callbacks.ts, CALLBACK_REASONS] | lang=en
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L40 | neighbors=[Footer.tsx, LocationLanding.tsx, ServicePage.tsx, algemene-voorwaarden.tsx, contact.tsx, faq.tsx] | lang=en
- "migrations_20260713130000_project_expansion_phase2": "20260713130000_project_expansion_phase2.sql" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L1 | neighbors=[81a87ed commit, auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks] | lang=en
- "public_site_error": "site-error.ts" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, a3773ee sec fixes, rate-limit.ts, checkRateLimit(), Body] | lang=en
- "supabase_auth_middleware": "auth-middleware.ts" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L1 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, telegram.functions.ts] | lang=en
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L1 | neighbors=[utils.ts, cn(), Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink] | lang=en
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=src/components/ui/dialog.tsx:L1 | neighbors=[command.tsx, utils.ts, cn(), DialogContent, DialogDescription, DialogFooter()] | lang=en
- "ui_drawer": "drawer.tsx" | kind=code-symbol | source=src/components/ui/drawer.tsx:L1 | neighbors=[utils.ts, cn(), Drawer(), DrawerContent, DrawerDescription, DrawerFooter()] | lang=en
- "ui_navigation_menu": "navigation-menu.tsx" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L1 | neighbors=[utils.ts, cn(), NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList] | lang=en
- "ui_select": "select.tsx" | kind=code-symbol | source=src/components/ui/select.tsx:L1 | neighbors=[utils.ts, cn(), SelectContent, SelectItem, SelectLabel, SelectScrollDownButton] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-007.json

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
