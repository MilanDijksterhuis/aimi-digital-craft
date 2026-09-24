# Node Description Batch 3 of 57

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

- "supabase_types": "types.ts" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1 | neighbors=[1727351 blog, 6ccd4dc CMS, 74ecdc1 code fixes, 7f7208a new, 81a87ed commit, c480d2e leads] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fc7da2d775fafb0a3eb95f413bddc50adb6dea13": "fc7da2d animaties en paginas" | kind=Commit | source=git | neighbors=[2b1d78f telegram, admin.tsx, admin.instellingen.tsx, admin.leads.tsx, portal.tsx, main] | lang=en
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L49 | neighbors=[BranchPage.tsx, Footer.tsx, LocationLanding.tsx, LocationPageV2.tsx, ServicePage.tsx, algemene-voorwaarden.tsx] | lang=en
- "components_pricing": "Pricing.tsx" | kind=code-symbol | source=src/components/Pricing.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 36d8ccb new pages, 6262799 fixes, 6bf533b pushes, 6e488ba fixes, 735e902 Verwijder alle section-label ey…] | lang=en
- "routes_branches": "branches.tsx" | kind=code-symbol | source=src/routes/branches.tsx:L1 | neighbors=[13e217a SEO, 36d8ccb new pages, 59bb970 eyoo, 6e488ba fixes, c27f4c8 new, BranchLinks.tsx] | lang=en
- "authenticated_admin_changes_changeid": "admin.changes.$changeId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L1 | neighbors=[AdminChangeDetailPage(), AttachmentList(), ChangeDetail(), ChangeHeader(), CommunicatieTab(), OverzichtTab()] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d3df91966bd6bb7989f9c9eb9b8d806edc98a82": "5d3df91 new" | kind=Commit | source=git | neighbors=[1c0e00f fixes, main, 6262799 fixes, FAQ.tsx, LocationLanding.tsx, ServicePage.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a3773ee34a596fb2964b7b639fc365984e0098aa": "a3773ee sec fixes" | kind=Commit | source=git | neighbors=[main, 7dbbf18 perf fixes, Contact.tsx, accounts.functions.ts, admin.functions.ts, contact.functions.ts] | lang=pt
- "lib_blog_functions": "blog.functions.ts" | kind=code-symbol | source=src/lib/blog.functions.ts:L1 | neighbors=[1727351 blog, 6ccd4dc CMS, adminBulkDeleteBlogPosts, adminBulkScheduleBlogPosts, adminBulkSetBlogPostStatus, adminBulkShiftBlogPosts] | lang=en
- "lib_website_checker_server": "website-checker.server.ts" | kind=code-symbol | source=src/lib/website-checker.server.ts:L1 | neighbors=[dda7a04 web tester, assertHttpUrl(), BLOCKED_HOSTNAMES, BLOCKED_IPV4_RANGES, CategoryScore, CheckResult] | lang=en
- "routes_sitemap_xml": "sitemap[.]xml.tsx" | kind=code-symbol | source=src/routes/sitemap[.]xml.tsx:L1 | neighbors=[1727351 blog, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, 5d3df91 new] | lang=en
- "authenticated_admin_accounts": "admin.accounts.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L1 | neighbors=[ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), AccountsSidebar(), accountStatus(), AdminAccountsPage()] | lang=en
- "components_cookiebanner_cookiebanner": "CookieBanner()" | kind=code-symbol | source=src/components/CookieBanner.tsx:L28 | neighbors=[BranchPage.tsx, CookieBanner.tsx, LocationLanding.tsx, LocationPageV2.tsx, ServicePage.tsx, blog.tsx] | lang=en
- "components_nav_nav": "Nav()" | kind=code-symbol | source=src/components/Nav.tsx:L410 | neighbors=[BranchPage.tsx, LocationLanding.tsx, LocationPageV2.tsx, Nav.tsx, ServicePage.tsx, blog.tsx] | lang=en
- "routes_blog": "blog.tsx" | kind=code-symbol | source=src/routes/blog.tsx:L1 | neighbors=[4a960c6 SEO, 6ccd4dc CMS, b5c2a22 blog, CookieBanner.tsx, CookieBanner(), Footer.tsx] | lang=en
- "authenticated_admin_changes": "admin.changes.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L1 | neighbors=[AdminChangesPage(), ChangesListSection(), ChangesSidebar(), FormField(), NewChangeSection(), Route] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@85ad012fdc1c37cb42ccd3aef07c4ae3a086d343": "85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond" | kind=Commit | source=git | neighbors=[1a55bd1 Fix formatting in FAQ answers, main, 965b87a Fix foto, nav animaties, portal…, Contact.tsx, FAQ.tsx, Footer.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ab14295bf0f991ae5f05ccf837cbcab6dfd984fa": "ab14295 Design overhauled, A11y-bar weg" | kind=Commit | source=git | neighbors=[538314c Contactformulier en adminfix, 90677bf Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c480d2e78b924711eb93a74ee039c53839cedb3d": "c480d2e leads" | kind=Commit | source=git | neighbors=[admin.tsx, main, 6bf533b pushes, LeadsPanel.tsx, TeamTab.tsx, accounts.functions.ts] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dca01f98b0cf3156df0faa88f28b4ecc7facbe12": "dca01f9 pagina updates" | kind=Commit | source=git | neighbors=[8af95bc backlink, main, cc405f4 pagina updates, AnswerBlock.tsx, BranchPage.tsx, FAQ.tsx] | lang=en
- "lib_rbac": "rbac.ts" | kind=code-symbol | source=src/lib/rbac.ts:L1 | neighbors=[74ecdc1 code fixes, 81a87ed commit, a3773ee sec fixes, c480d2e leads, TeamTab.tsx, use-permissions.tsx] | lang=en
- "lib_telegram_functions": "telegram.functions.ts" | kind=code-symbol | source=src/lib/telegram.functions.ts:L1 | neighbors=[2b1d78f telegram, dda7a04 web tester, fc7da2d animaties en paginas, adminCreateRecipient, adminDeleteRecipient, adminGenerateRecipientLink] | lang=en
- "routes_website_laten_maken_kapsalon": "website-laten-maken-kapsalon.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-kapsalon.tsx:L1 | neighbors=[13e217a SEO, 36d8ccb new pages, 4a960c6 SEO, 6e488ba fixes, aabf034 SEO, b5c2a22 blog] | lang=en
- "routes_website_laten_maken_nagelstudio": "website-laten-maken-nagelstudio.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-nagelstudio.tsx:L1 | neighbors=[13e217a SEO, 36d8ccb new pages, 4a960c6 SEO, 6e488ba fixes, aabf034 SEO, b5c2a22 blog] | lang=en
- "routes_website_laten_maken_pedicure": "website-laten-maken-pedicure.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-pedicure.tsx:L1 | neighbors=[13e217a SEO, 36d8ccb new pages, 4a960c6 SEO, 6e488ba fixes, aabf034 SEO, b5c2a22 blog] | lang=en
- "routes_website_laten_maken_schoonheidssalon": "website-laten-maken-schoonheidssalon.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-schoonheidssalon.tsx:L1 | neighbors=[13e217a SEO, 36d8ccb new pages, 4a960c6 SEO, 6e488ba fixes, aabf034 SEO, b5c2a22 blog] | lang=en
- "supabase_client": "client.ts" | kind=code-symbol | source=src/integrations/supabase/client.ts:L1 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, BlogPostForm.tsx, ChatWidget.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@37c0d1132e12148d34d0e28584a73e5dbdeb80d1": "37c0d11 Dock tokens toegevoegd & emojis weg" | kind=Commit | source=git | neighbors=[account.tsx, admin.tsx, portal.tsx, main, 422202c Made the requested updates, 8ccc238 Work in progress] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6ccd4dcedcea70ed9789ca8d61cac08d3f6bae7f": "6ccd4dc CMS" | kind=Commit | source=git | neighbors=[admin.tsx, admin.blog.tsx, admin.blog.$postId.tsx, main, 1727351 blog, BlogPostForm.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@cf4ac916c9d21d8583be09d4560a4b9edfc772a3": "cf4ac91 Alle fases toegevoegd & cron ready" | kind=Commit | source=git | neighbors=[0e9729e Changes, 972c222 Fases 6-7 en Fase 1 voltooid, admin.tsx, main, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fcbe34536a4c3d5289a7b032e5333621022762cd": "fcbe345 Admin sidebar en panels aangepast" | kind=Commit | source=git | neighbors=[9784613 4 nieuwe portal-paginaën toegev…, f099d92 Changes, admin.tsx, portal.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "components_portalonboardingtour": "PortalOnboardingTour.tsx" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L1 | neighbors=[portal.tsx, 2fcc9a3 fixes, ContactBlock, Contacts, DoneScreen(), fadeVariants] | lang=en
- "lib_admin_server": "admin.server.ts" | kind=code-symbol | source=src/lib/admin.server.ts:L1 | neighbors=[5bc9ff0 google authenticatoin, b83b044 Revert: verwijder Google OAuth …, c480d2e leads, adminCreateCustomer(), adminGenerateRecoveryLink(), adminGetCustomerDetail()] | lang=en
- "routes_website_laten_maken_roden": "website-laten-maken-roden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-roden.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, 6e488ba fixes, aabf034 SEO, c27f4c8 new] | lang=en
- "ui_menubar": "menubar.tsx" | kind=code-symbol | source=src/components/ui/menubar.tsx:L1 | neighbors=[utils.ts, cn(), Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup()] | lang=en
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L1 | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.blog.tsx, admin.blog.$postId.tsx, admin.changes.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2d5059059162451d0aaeacc22ba26501474c6336": "2d50590 wip: lokale wijzigingen voor pull" | kind=Commit | source=git | neighbors=[admin.tsx, portal.tsx, server.tsx, main, 500f718 Merge branch 'main' of https://…, expire-accounts.ts] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@2fcc9a3163985aad54209b8dffaf9b30700f563a": "2fcc9a3 fixes" | kind=Commit | source=git | neighbors=[admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@39d363a2495e5f26f7f19a28e943e127069dd2b1": "39d363a server basic" | kind=Commit | source=git | neighbors=[admin.tsx, server.tsx, main, 2d50590 wip: lokale wijzigingen voor pu…, 30d7c60 Merge project detail pages (adm…, 5fa25a3 Add project detail pages for ad…] | lang=pt
- "components_onboardingwizard": "OnboardingWizard.tsx" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, 2fcc9a3 fixes, ContactBlock, Contacts, DoneScreen(), fadeVariants] | lang=en

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
