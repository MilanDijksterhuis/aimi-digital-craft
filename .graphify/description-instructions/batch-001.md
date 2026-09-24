# Node Description Batch 2 of 52

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8fdd571f29e94604cdb34287a0859bf6a360ade5": "8fdd571 SEO" | kind=Commit | source=git | neighbors=[main, 1c0e00f fixes, AnalyticsLoader.tsx, Contact.tsx, CookieBanner.tsx, FAQ.tsx]
- "lib_accounts_functions": "accounts.functions.ts" | kind=code-symbol | source=src/lib/accounts.functions.ts:L1 | neighbors=[74ecdc1 code fixes, 81a87ed commit, a3773ee sec fixes, c480d2e leads, adminArchiveChange, adminAssignChange]
- "authenticated_admin_projecten": "admin.projecten.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L1 | neighbors=[AdminProjectenPage(), DashboardWidgetsSection(), KanbanCard(), KanbanColumn(), KanbanSection(), NewProjectSection()]
- "authenticated_portal_projecten_projectid": "portal.projecten.$projectId.tsx" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L1 | neighbors=[MonitoringSection(), PortalProjectDetailPage(), ProjectSwitcher(), Route, timeAgo(), UptimeChart()]
- "components_confirmdialog": "ConfirmDialog.tsx" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, 9a2689c code fixes, BerichtenTab.tsx, CallbackAgenda.tsx]
- "components_contact": "Contact.tsx" | kind=code-symbol | source=src/components/Contact.tsx:L1 | neighbors=[0332090 Changes, 0b21971 Changes weergave verbeterd, 6262799 fixes, 6e488ba fixes, 735e902 Verwijder alle section-label ey…, 7eafc83 Changes]
- "lib_blog_server": "blog.server.ts" | kind=code-symbol | source=src/lib/blog.server.ts:L1 | neighbors=[1727351 blog, 6ccd4dc CMS, blog-links.ts, extractInternalLinks(), blog-schedule.ts, BulkScheduleOptions]
- "routes_authenticated": "_authenticated.tsx" | kind=code-symbol | source=src/routes/_authenticated.tsx:L1 | neighbors=[423b3f1 cashing, 7dbbf18 perf fixes, 85ad012 Cinematisch redesign: forest he…, 965b87a Fix foto, nav animaties, portal…, 9a2689c code fixes, ab23069 admin en klantportaal wijziging…]
- "routes_website_checker": "website-checker.tsx" | kind=code-symbol | source=src/routes/website-checker.tsx:L1 | neighbors=[4a960c6 SEO, 6e488ba fixes, dda7a04 web tester, CookieBanner.tsx, CookieBanner(), Footer.tsx]
- "components_cookiebanner": "CookieBanner.tsx" | kind=code-symbol | source=src/components/CookieBanner.tsx:L1 | neighbors=[8fdd571 SEO, 9a2689c code fixes, aabf034 SEO, cc405f4 pagina updates, e33fd2d tekst vergroten en cookies, ecdbe8e fixes]
- "components_faq": "FAQ.tsx" | kind=code-symbol | source=src/components/FAQ.tsx:L1 | neighbors=[04564c5 fixes, 1a55bd1 Fix formatting in FAQ answers, 5d3df91 new, 6262799 fixes, 6e488ba fixes, 735e902 Verwijder alle section-label ey…]
- "routes_tarieven": "tarieven.tsx" | kind=code-symbol | source=src/routes/tarieven.tsx:L1 | neighbors=[36d8ccb new pages, 59bb970 eyoo, 6e488ba fixes, aabf034 SEO, cc405f4 pagina updates, dca01f9 pagina updates]
- "routes_website_laten_maken_hoogeveen": "website-laten-maken-hoogeveen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-hoogeveen.tsx:L1 | neighbors=[04c01f8 SEO, 1c0e00f fixes, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 4a960c6 SEO, 5d3df91 new]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@81a87edaf7b9db05e33477346e1821aa12e8e485": "81a87ed commit" | kind=Commit | source=git | neighbors=[7f7208a new, admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.changes.tsx, admin.changes.$changeId.tsx]
- "components_blogpostform": "BlogPostForm.tsx" | kind=code-symbol | source=src/components/BlogPostForm.tsx:L1 | neighbors=[admin.blog.tsx, admin.blog.$postId.tsx, 1727351 blog, 6ccd4dc CMS, ALLOWED_IMAGE_MIME, BlogPostFaqItem]
- "routes_faq": "faq.tsx" | kind=code-symbol | source=src/routes/faq.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 5d3df91 new, 6e488ba fixes, 8fdd571 SEO, dca01f9 pagina updates]
- "routes_onderhoud_hosting": "onderhoud-hosting.tsx" | kind=code-symbol | source=src/routes/onderhoud-hosting.tsx:L1 | neighbors=[04c01f8 SEO, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 4a960c6 SEO, 5d3df91 new, 6e488ba fixes]
- "authenticated_admin_blog": "admin.blog.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.blog.tsx:L1 | neighbors=[AdminBlogPage(), BlogSidebar(), NewPostSection(), PostsListSection(), Route, Section]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ecdbe8e1f4e58bfc169589dc2da50a537cf32f2e": "ecdbe8e fixes" | kind=Commit | source=git | neighbors=[23bb181 sec, portal.tsx, main, c480d2e leads, CookieBanner.tsx, FAQ.tsx]
- "components_callbackagenda": "CallbackAgenda.tsx" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L1 | neighbors=[admin.leads.tsx, f958216 leads functions, addDays(), CallbackAgenda(), CallbackDetailModal(), CallbackItem()]
- "lib_monitoring_functions": "monitoring.functions.ts" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L1 | neighbors=[0193196 monitoring, 39d363a server basic, 74ecdc1 code fixes, a3773ee sec fixes, getAlerts, getDailyCheckLatest]
- "routes_seo": "seo.tsx" | kind=code-symbol | source=src/routes/seo.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, 6e488ba fixes, aabf034 SEO, f80d1a3 blur]
- "routes_website_laten_maken_veendam": "website-laten-maken-veendam.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-veendam.tsx:L1 | neighbors=[04c01f8 SEO, 1c0e00f fixes, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 5d3df91 new, 6e488ba fixes]
- "routes_website_laten_vernieuwen": "website-laten-vernieuwen.tsx" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L1 | neighbors=[36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, 6e488ba fixes, aabf034 SEO, f80d1a3 blur]
- "routes_werkwijze": "werkwijze.tsx" | kind=code-symbol | source=src/routes/werkwijze.tsx:L1 | neighbors=[04c01f8 SEO, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 4a960c6 SEO, 5d3df91 new, 6262799 fixes]
- "routes_over_ons": "over-ons.tsx" | kind=code-symbol | source=src/routes/over-ons.tsx:L1 | neighbors=[04c01f8 SEO, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 4a960c6 SEO, 5d3df91 new, 6262799 fixes]
- "routes_webshop_laten_maken": "webshop-laten-maken.tsx" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L1 | neighbors=[04c01f8 SEO, 2d81f50 feat(seo): vervang /cases door …, 4a960c6 SEO, 5d3df91 new, 6e488ba fixes, 8fdd571 SEO]
- "authenticated_admin_rollen_roleid": "admin.rollen.$roleId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L1 | neighbors=[ActivityTab(), AdminRoleDetailPage(), ALL_PERMISSIONS, OverzichtTab(), PermissiesTab(), ROLE_LABEL]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9a2689caf4f6864cfdf4108ef679ab96a9b76d9a": "9a2689c code fixes" | kind=Commit | source=git | neighbors=[74ecdc1 code fixes, admin.accounts.$accountId.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, main]
- "components_locationlanding": "LocationLanding.tsx" | kind=code-symbol | source=src/components/LocationLanding.tsx:L1 | neighbors=[1c0e00f fixes, 5d3df91 new, 6262799 fixes, 8fdd571 SEO, b48bbc0 chore: snapshot lokale SEO-pagi…, e0f6b72 feat(seo): interne links op lok…]
- "components_services": "Services.tsx" | kind=code-symbol | source=src/components/Services.tsx:L1 | neighbors=[1a66af6 Verbeter layout en visueel ritme, 36d8ccb new pages, 5f47f6d animaties, 6262799 fixes, 6aba49e euro teken, 6e488ba fixes]
- "lib_status": "status.ts" | kind=code-symbol | source=src/lib/status.ts:L1 | neighbors=[admin.blog.tsx, admin.changes.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx]
- "routes_blog_slug": "blog_.$slug.tsx" | kind=code-symbol | source=src/routes/blog_.$slug.tsx:L1 | neighbors=[1727351 blog, 4a960c6 SEO, 6ccd4dc CMS, b5c2a22 blog, CookieBanner.tsx, CookieBanner()]
- "routes_website_laten_maken": "website-laten-maken.tsx" | kind=code-symbol | source=src/routes/website-laten-maken.tsx:L1 | neighbors=[04c01f8 SEO, 4a960c6 SEO, 5d3df91 new, 6e488ba fixes, 8fdd571 SEO, aabf034 SEO]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@59bb97088d46010ddb3077d6aefc321e27b2fdd3": "59bb970 eyoo" | kind=Commit | source=git | neighbors=[main, 8af95bc backlink, Footer.tsx, seo.ts, algemene-voorwaarden.tsx, branches.tsx]
- "routes_contact": "contact.tsx" | kind=code-symbol | source=src/routes/contact.tsx:L1 | neighbors=[04c01f8 SEO, 36d8ccb new pages, 4a960c6 SEO, 59bb970 eyoo, 5d3df91 new, 6e488ba fixes]
- "routes_wordpress_of_maatwerk": "wordpress-of-maatwerk.tsx" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L1 | neighbors=[36d8ccb new pages, 59bb970 eyoo, 6e488ba fixes, cc405f4 pagina updates, Breadcrumbs.tsx, Breadcrumbs()]
- "supabase_types": "types.ts" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1 | neighbors=[1727351 blog, 6ccd4dc CMS, 74ecdc1 code fixes, 7f7208a new, 81a87ed commit, c480d2e leads]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fc7da2d775fafb0a3eb95f413bddc50adb6dea13": "fc7da2d animaties en paginas" | kind=Commit | source=git | neighbors=[2b1d78f telegram, admin.tsx, admin.instellingen.tsx, admin.leads.tsx, portal.tsx, main]
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L49 | neighbors=[BranchPage.tsx, Footer.tsx, LocationLanding.tsx, LocationPageV2.tsx, ServicePage.tsx, algemene-voorwaarden.tsx]

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
