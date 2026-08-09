# Node Description Batch 8 of 40

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0bb190079d2e688ac5c6509fa1320297710be919": "0bb1900 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1514d2bbfc7f74d75e4721689429497adf3b47cd": "1514d2b Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@171c22aa4bca82b2edf127606b28ff594254c336": "171c22a Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@204f17ad5afdc3852c25f15b43b940b6aef210ce": "204f17a Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@260e9c978539c62213fcdc3fdcfca62f7ddf5a15": "260e9c9 Change Supabase project credentials in .env" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@27cb157f5430c73e002efd82ccf760288f226429": "27cb157 Work in progress" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3b65b5f4c51b80d08860b192ea29b51657c0d5b2": "3b65b5f Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3ee5ecb08528968ff2c00c4da8885489b010b85d": "3ee5ecb Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@54af09cc33691a723eded23ead375d8b253f464b": "54af09c Remove .env from tracking" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@65b58f18e32ff3974def08ab5316d86e96fe13a5": "65b58f1 Work in progress" | kind=Commit | source=git | neighbors=[59d8b3c Code edited in Lovable Code Edi…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@692d2316adb2949927749a6d4c0d281a300d6fd7": "692d231 Update .gitignore to include .env files" | kind=Commit | source=git | neighbors=[05a6c9e Verbeter admin changes-tab layo…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@85a66662163282e8dd9b8f2efe6119cc769880cf": "85a6666 SEO en robot" | kind=Commit | source=git | neighbors=[main, 171eb96 leads functions, ProcessTimeline.tsx, Services.tsx, index.tsx, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9ed5748c4b6028bc51d46bcf1cd2aa997119824c": "9ed5748 Changes" | kind=Commit | source=git | neighbors=[65b58f1 Work in progress, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c5322995bd96d20508a21e6e7af970b4453b2cc9": "c532299 Changes" | kind=Commit | source=git | neighbors=[978e288 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ca832dba472890156800a46d2a36527acbd4835e": "ca832db Add .env to .gitignore." | kind=Commit | source=git | neighbors=[879bad8 Handoff doc gemaakt, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e0af60e416676458f6a99ae201c467c42d5292be": "e0af60e Update package.json" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ec62d9f02b3a195f89dcf50b62b93a648b9c6aac": "ec62d9f Changes" | kind=Commit | source=git | neighbors=[c532299 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ee1b8aef2b854fd9adfc972132e301fa732457d5": "ee1b8ae Change start script from bun to node" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ee6f2e6258f7f7d30a8a29602e032870f607320c": "ee6f2e6 fixes" | kind=Commit | source=git | neighbors=[2fcc9a3 fixes, admin.accounts.$accountId.tsx, portal.tsx, main, f7b9fd5 Merge branch 'main' of https://…, PortalTutorial.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fcf1ee779f8b822cf8ee26742bdcf20c8a46286e": "fcf1ee7 Changes" | kind=Commit | source=git | neighbors=[68ae2dd Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "components_callbackschedulemodal": "CallbackScheduleModal.tsx" | kind=code-symbol | source=src/components/CallbackScheduleModal.tsx:L1 | neighbors=[f958216 leads functions, CallbackScheduleForm(), CallbackScheduleModal(), CallbackScheduleValue, callbacks.ts, CALLBACK_REASONS] | lang=en
- "migrations_20260713130000_project_expansion_phase2": "20260713130000_project_expansion_phase2.sql" | kind=code-symbol | source=supabase/migrations/20260713130000_project_expansion_phase2.sql:L1 | neighbors=[81a87ed commit, auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks] | lang=en
- "public_site_error": "site-error.ts" | kind=code-symbol | source=src/routes/api/public/site-error.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, a3773ee sec fixes, rate-limit.ts, checkRateLimit(), Body] | lang=en
- "supabase_auth_middleware": "auth-middleware.ts" | kind=code-symbol | source=src/integrations/supabase/auth-middleware.ts:L1 | neighbors=[accounts.functions.ts, admin.functions.ts, contact.functions.ts, monitoring.functions.ts, portal.functions.ts, telegram.functions.ts] | lang=en
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L1 | neighbors=[utils.ts, cn(), Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink] | lang=en
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=src/components/ui/dialog.tsx:L1 | neighbors=[command.tsx, utils.ts, cn(), DialogContent, DialogDescription, DialogFooter()] | lang=en
- "ui_drawer": "drawer.tsx" | kind=code-symbol | source=src/components/ui/drawer.tsx:L1 | neighbors=[utils.ts, cn(), Drawer(), DrawerContent, DrawerDescription, DrawerFooter()] | lang=en
- "ui_navigation_menu": "navigation-menu.tsx" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L1 | neighbors=[utils.ts, cn(), NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList] | lang=en
- "ui_select": "select.tsx" | kind=code-symbol | source=src/components/ui/select.tsx:L1 | neighbors=[utils.ts, cn(), SelectContent, SelectItem, SelectLabel, SelectScrollDownButton] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2db539c32f8111052eba7d719d7600bec14619e9": "2db539c Work in progress" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 98edc37 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@40c3bfff6b12140abfc7240e3b919dbecd850cc2": "40c3bff Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, a6260b9 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d6e898cb8d8d1125c41d89f5b68bff81325b838": "5d6e898 Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 538314c Contactformulier en adminfix] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a6260b9228de5a3e8e996ef8663caf9e066bcf85": "a6260b9 Changes" | kind=Commit | source=git | neighbors=[40c3bff Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a8cb18d0d01d7c76dcbf5be694a9498706e1eb68": "a8cb18d Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 5d6e898 Changes] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b29ceecb5efa88c0e8d9ba1fe3e2f43becf32466": "b29ceec Fixed weak PRNG and RLS" | kind=Commit | source=git | neighbors=[worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 7ca6d63 Changes, 8a81dd1 Fixed security issues, admin.server.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c67cd437297dbe69b158dc12c4801a2807f5d640": "c67cd43 Changes" | kind=Commit | source=git | neighbors=[8a81dd1 Fixed security issues, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "components_confirmdialog_useconfirm": "useConfirm()" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L48 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, BerichtenTab.tsx, CallbackAgenda.tsx, ConfirmDialog.tsx] | lang=en
- "components_teamtab": "TeamTab.tsx" | kind=code-symbol | source=src/components/TeamTab.tsx:L1 | neighbors=[admin.tsx, 6bf533b pushes, c480d2e leads, TeamTab(), use-permissions.tsx, usePermissions()] | lang=en
- "hooks_expire_accounts": "expire-accounts.ts" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 9e611dd Changes, cf4ac91 Alle fases toegevoegd & cron re…, isAuthorized(), Route] | lang=en
- "migrations_20260523183942_31ca9a16_7791_46e0_b5cb_1df22bf0e07f_auth_users": "auth.users" | kind=code-symbol | source=supabase/migrations/20260523183942_31ca9a16-7791-46e0-b5cb-1df22bf0e07f.sql:L7 | neighbors=[20260523183942_31ca9a16-7791-46e0-b5cb-…, on_auth_user_created, public.change_requests, public.extra_credits, public.notifications, public.profiles] | lang=en

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
