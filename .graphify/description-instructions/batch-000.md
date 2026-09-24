# Node Description Batch 1 of 52

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "src_routetree_gen": "routeTree.gen.ts" | kind=code-symbol | source=src/routeTree.gen.ts:L1 | neighbors=[00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 2b1d78f telegram, 2d50590 wip: lokale wijzigingen voor pu…, 2d81f50 feat(seo): vervang /cases door …]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#main": "main" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 02d6137 fixes, 032ba88 SEO]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#seo-verbetering": "seo-verbetering" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 02d6137 fixes, 0332090 Changes]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#tmp-main-merge": "tmp-main-merge" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#tmp-revert-main": "tmp-revert-main" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#worktree-curious-wibbling-narwhal": "worktree-curious-wibbling-narwhal" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#worktree-fix-admin-projects-hooks": "worktree-fix-admin-projects-hooks" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#worktree-floofy-conjuring-petal": "worktree-floofy-conjuring-petal" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#worktree-replicated-fluttering-whisper": "worktree-replicated-fluttering-whisper" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "lib_admin_functions": "admin.functions.ts" | kind=code-symbol | source=src/lib/admin.functions.ts:L1 | neighbors=[12764e3 Security: fix IDOR vulnerabilit…, 2d50590 wip: lokale wijzigingen voor pu…, 2fcc9a3 fixes, 39d363a server basic, 5bc9ff0 google authenticatoin, 74ecdc1 code fixes]
- "authenticated_portal": "portal.tsx" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L1 | neighbors=[ALLOWED_ATTACHMENT_MIME, ChangeCard(), EmptyChanges(), FILTER_LABEL, FilterKey, LegacyWebsiteMonitoring()]
- "lib_seo": "seo.ts" | kind=code-symbol | source=src/lib/seo.ts:L1 | neighbors=[1727351 blog, 36d8ccb new pages, 59bb970 eyoo, 5d3df91 new, 8fdd571 SEO, aabf034 SEO]
- "authenticated_admin": "admin.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L1 | neighbors=[AanvragenTab(), AdminPage(), AdminSidebar(), AfsprakenTab(), AlertsPanel(), ArchivedChangesPanel()]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@36d8ccbb2c7a128fe10b4f02718f8ada22d886ac": "36d8ccb new pages" | kind=Commit | source=git | neighbors=[04564c5 fixes, main, dda7a04 web tester, BranchPage.tsx, Breadcrumbs.tsx, Footer.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4a960c65923583d07f26052f49acd65056f0af9b": "4a960c6 SEO" | kind=Commit | source=git | neighbors=[main, Footer.tsx, Hero.tsx, markdown.tsx, 20260917120000_blog_batch2_new_posts_sc…, 20260917130000_blog_batch2_post_links.s…]
- "components_nav": "Nav.tsx" | kind=code-symbol | source=src/components/Nav.tsx:L1 | neighbors=[05a6c9e Verbeter admin changes-tab layo…, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 6262799 fixes, 6e488ba fixes, 7476011 Changes]
- "routes_index": "index.tsx" | kind=code-symbol | source=src/routes/index.tsx:L1 | neighbors=[04564c5 fixes, 04c01f8 SEO, 129b916 manier van werken, 36d8ccb new pages, 5820182 Changes, 59bb970 eyoo]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@aabf034c7bafc8ac4b97edbc88df6ed32e9fefac": "aabf034 SEO" | kind=Commit | source=git | neighbors=[main, d38d9ab Add IndexNow key route, BranchPage.tsx, Contact.tsx, CookieBanner.tsx, ExampleSlideshow.tsx]
- "components_locationpagev2": "LocationPageV2.tsx" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, c27f4c8 new, dca01f9 pagina updates, f80d1a3 blur, Breadcrumbs.tsx]
- "routes_root": "__root.tsx" | kind=code-symbol | source=src/routes/__root.tsx:L1 | neighbors=[04564c5 fixes, 36d8ccb new pages, 37c0d11 Dock tokens toegevoegd & emojis…, 408d241 Changes, 422202c Made the requested updates, 4a960c6 SEO]
- "authenticated_admin_projecten_projectid": "admin.projecten.$projectId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L1 | neighbors=[ActivityTab(), AdminProjectDetailPage(), ChangesTab(), ContactsTab(), NotesTab(), OverzichtTab()]
- "lib_seo_breadcrumbjsonld": "breadcrumbJsonLd()" | kind=code-symbol | source=src/lib/seo.ts:L308 | neighbors=[seo.ts, ld(), blog.tsx, blog_.$slug.tsx, branches.tsx, contact.tsx]
- "src_server": "server.ts" | kind=code-symbol | source=src/server.ts:L1 | neighbors=[1727351 blog, 23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 36d8ccb new pages, 3901302 Fix mojibake in admin dashboard…, 4a960c6 SEO]
- "components_branchpage": "BranchPage.tsx" | kind=code-symbol | source=src/components/BranchPage.tsx:L1 | neighbors=[36d8ccb new pages, 6e488ba fixes, aabf034 SEO, b5c2a22 blog, c27f4c8 new, dca01f9 pagina updates]
- "components_footer": "Footer.tsx" | kind=code-symbol | source=src/components/Footer.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 04564c5 fixes, 2d7a8d4 teksr wijzigingen, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 4a960c6 SEO]
- "lib_portal_functions": "portal.functions.ts" | kind=code-symbol | source=src/lib/portal.functions.ts:L1 | neighbors=[12764e3 Security: fix IDOR vulnerabilit…, 2fcc9a3 fixes, 3417a43 fixes, 74ecdc1 code fixes, 7f7208a new, 81a87ed commit]
- "ui_sidebar": "sidebar.tsx" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L1 | neighbors=[use-mobile.tsx, useIsMobile(), utils.ts, cn(), button.tsx, Button]
- "lib_utils": "utils.ts" | kind=code-symbol | source=src/lib/utils.ts:L1 | neighbors=[ConfirmDialog.tsx, cn(), accordion.tsx, alert.tsx, alert-dialog.tsx, avatar.tsx]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=src/lib/utils.ts:L4 | neighbors=[ConfirmDialog.tsx, utils.ts, accordion.tsx, alert.tsx, alert-dialog.tsx, avatar.tsx]
- "authenticated_admin_accounts_accountid": "admin.accounts.$accountId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L1 | neighbors=[AccountDetail(), AccountHeader(), ActiviteitTab(), AdminAccountDetailPage(), CustomRolesSection(), FinancieelTab()]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6e488ba7341d27210d567bdafc9758c96047f4ba": "6e488ba fixes" | kind=Commit | source=git | neighbors=[main, b5c2a22 blog, AnswerBlock.tsx, BranchPage.tsx, Contact.tsx, ExampleSlideshow.tsx]
- "routes_meer_diensten": "meer-diensten.tsx" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L1 | neighbors=[04c01f8 SEO, 1c0e00f fixes, 36d8ccb new pages, 4a960c6 SEO, 5d3df91 new, 6262799 fixes]
- "lib_seo_faqjsonld": "faqJsonLd()" | kind=code-symbol | source=src/lib/seo.ts:L391 | neighbors=[seo.ts, ld(), blog_.$slug.tsx, faq.tsx, seo.tsx, tarieven.tsx]
- "lib_seo_servicejsonld": "serviceJsonLd()" | kind=code-symbol | source=src/lib/seo.ts:L283 | neighbors=[seo.ts, ld(), meer-diensten.tsx, onderhoud-hosting.tsx, seo.tsx, webdesign.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c27f4c803b9e3eadefa156ab20bcb558f0cbdaf1": "c27f4c8 new" | kind=Commit | source=git | neighbors=[6262799 fixes, main, 04564c5 fixes, BranchPage.tsx, Footer.tsx, LocationPageV2.tsx]
- "components_leadspanel": "LeadsPanel.tsx" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L1 | neighbors=[admin.leads.tsx, 9a2689c code fixes, c480d2e leads, f958216 leads functions, fc7da2d animaties en paginas, CallbackScheduleModal.tsx]
- "authenticated_server": "server.tsx" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L1 | neighbors=[DISK_DAYS_OPTIONS, downloadCsv(), ErrorBox(), ExpandableMetricCard(), ExportButton(), formatDateShort()]
- "components_hero": "Hero.tsx" | kind=code-symbol | source=src/components/Hero.tsx:L1 | neighbors=[0193196 monitoring, 1a66af6 Verbeter layout en visueel ritme, 36d8ccb new pages, 38037d9 Update Hero.tsx, 4a960c6 SEO, 4c798fc Code edited in Lovable Code Edi…]
- "components_servicepage": "ServicePage.tsx" | kind=code-symbol | source=src/components/ServicePage.tsx:L1 | neighbors=[36d8ccb new pages, 5d3df91 new, 6262799 fixes, 8fdd571 SEO, aabf034 SEO, dca01f9 pagina updates]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@17273512489de1bd1a263392f48731a8dfab2d7f": "1727351 blog" | kind=Commit | source=git | neighbors=[admin.blog.tsx, admin.blog.$postId.tsx, main, f80d1a3 blur, BlogCalendar.tsx, BlogPostForm.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-000.json

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
