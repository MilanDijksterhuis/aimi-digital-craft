# Node Description Batch 2 of 49

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

- "components_confirmdialog": "ConfirmDialog.tsx" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, 9a2689c code fixes, BerichtenTab.tsx, CallbackAgenda.tsx]
- "routes_authenticated": "_authenticated.tsx" | kind=code-symbol | source=src/routes/_authenticated.tsx:L1 | neighbors=[423b3f1 cashing, 7dbbf18 perf fixes, 85ad012 Cinematisch redesign: forest he…, 965b87a Fix foto, nav animaties, portal…, 9a2689c code fixes, ab23069 admin en klantportaal wijziging…]
- "components_hero": "Hero.tsx" | kind=code-symbol | source=src/components/Hero.tsx:L1 | neighbors=[0193196 monitoring, 1a66af6 Verbeter layout en visueel ritme, 1dfd3b7 Code edited in Lovable Code Edi…, 36052ff Code edited in Lovable Code Edi…, 36d8ccb new pages, 38037d9 Update Hero.tsx]
- "components_contact": "Contact.tsx" | kind=code-symbol | source=src/components/Contact.tsx:L1 | neighbors=[0332090 Changes, 0b21971 Changes weergave verbeterd, 6262799 fixes, 735e902 Verwijder alle section-label ey…, 7eafc83 Changes, 85ad012 Cinematisch redesign: forest he…]
- "routes_website_checker": "website-checker.tsx" | kind=code-symbol | source=src/routes/website-checker.tsx:L1 | neighbors=[dda7a04 web tester, CookieBanner.tsx, CookieBanner(), Footer.tsx, Footer(), Nav.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@81a87edaf7b9db05e33477346e1821aa12e8e485": "81a87ed commit" | kind=Commit | source=git | neighbors=[7f7208a new, admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.changes.tsx, admin.changes.$changeId.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ecdbe8e1f4e58bfc169589dc2da50a537cf32f2e": "ecdbe8e fixes" | kind=Commit | source=git | neighbors=[23bb181 sec, portal.tsx, main, c480d2e leads, About.tsx, CookieBanner.tsx]
- "components_servicepage": "ServicePage.tsx" | kind=code-symbol | source=src/components/ServicePage.tsx:L1 | neighbors=[36d8ccb new pages, 5d3df91 new, 6262799 fixes, 8fdd571 SEO, aabf034 SEO, ec1f322 feat(ui): Diensten-dropdown in …]
- "components_callbackagenda": "CallbackAgenda.tsx" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L1 | neighbors=[admin.leads.tsx, f958216 leads functions, addDays(), CallbackAgenda(), CallbackDetailModal(), CallbackItem()]
- "components_cookiebanner": "CookieBanner.tsx" | kind=code-symbol | source=src/components/CookieBanner.tsx:L1 | neighbors=[8fdd571 SEO, 9a2689c code fixes, aabf034 SEO, e33fd2d tekst vergroten en cookies, ecdbe8e fixes, BranchPage.tsx]
- "lib_monitoring_functions": "monitoring.functions.ts" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L1 | neighbors=[0193196 monitoring, 39d363a server basic, 74ecdc1 code fixes, a3773ee sec fixes, getAlerts, getDailyCheckLatest]
- "routes_website_laten_maken_hoogeveen": "website-laten-maken-hoogeveen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-hoogeveen.tsx:L1 | neighbors=[04c01f8 SEO, 1c0e00f fixes, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 5d3df91 new, 8fdd571 SEO]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9a2689caf4f6864cfdf4108ef679ab96a9b76d9a": "9a2689c code fixes" | kind=Commit | source=git | neighbors=[74ecdc1 code fixes, admin.accounts.$accountId.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fc7da2d775fafb0a3eb95f413bddc50adb6dea13": "fc7da2d animaties en paginas" | kind=Commit | source=git | neighbors=[2b1d78f telegram, admin.tsx, admin.instellingen.tsx, admin.leads.tsx, portal.tsx, main]
- "authenticated_admin_rollen_roleid": "admin.rollen.$roleId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L1 | neighbors=[ActivityTab(), AdminRoleDetailPage(), ALL_PERMISSIONS, OverzichtTab(), PermissiesTab(), ROLE_LABEL]
- "routes_onderhoud_hosting": "onderhoud-hosting.tsx" | kind=code-symbol | source=src/routes/onderhoud-hosting.tsx:L1 | neighbors=[04c01f8 SEO, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 5d3df91 new, 8fdd571 SEO, aabf034 SEO]
- "routes_website_laten_maken_veendam": "website-laten-maken-veendam.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-veendam.tsx:L1 | neighbors=[04c01f8 SEO, 1c0e00f fixes, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 5d3df91 new, 8fdd571 SEO]
- "components_locationlanding": "LocationLanding.tsx" | kind=code-symbol | source=src/components/LocationLanding.tsx:L1 | neighbors=[1c0e00f fixes, 5d3df91 new, 6262799 fixes, 8fdd571 SEO, b48bbc0 chore: snapshot lokale SEO-pagi…, e0f6b72 feat(seo): interne links op lok…]
- "components_services": "Services.tsx" | kind=code-symbol | source=src/components/Services.tsx:L1 | neighbors=[1a66af6 Verbeter layout en visueel ritme, 36d8ccb new pages, 5f47f6d animaties, 6262799 fixes, 6aba49e euro teken, 735e902 Verwijder alle section-label ey…]
- "routes_seo": "seo.tsx" | kind=code-symbol | source=src/routes/seo.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, Breadcrumbs.tsx, Breadcrumbs(), CookieBanner.tsx, CookieBanner()]
- "routes_tarieven": "tarieven.tsx" | kind=code-symbol | source=src/routes/tarieven.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, CookieBanner.tsx, CookieBanner(), Footer.tsx, Footer()]
- "routes_webshop_laten_maken": "webshop-laten-maken.tsx" | kind=code-symbol | source=src/routes/webshop-laten-maken.tsx:L1 | neighbors=[04c01f8 SEO, 2d81f50 feat(seo): vervang /cases door …, 5d3df91 new, 8fdd571 SEO, aabf034 SEO, bc99d99 achtegrond]
- "routes_website_laten_vernieuwen": "website-laten-vernieuwen.tsx" | kind=code-symbol | source=src/routes/website-laten-vernieuwen.tsx:L1 | neighbors=[36d8ccb new pages, aabf034 SEO, Breadcrumbs.tsx, Breadcrumbs(), CookieBanner.tsx, CookieBanner()]
- "routes_werkwijze": "werkwijze.tsx" | kind=code-symbol | source=src/routes/werkwijze.tsx:L1 | neighbors=[04c01f8 SEO, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 5d3df91 new, 6262799 fixes, 8fdd571 SEO]
- "authenticated_admin_changes_changeid": "admin.changes.$changeId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L1 | neighbors=[AdminChangeDetailPage(), AttachmentList(), ChangeDetail(), ChangeHeader(), CommunicatieTab(), OverzichtTab()]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d3df91966bd6bb7989f9c9eb9b8d806edc98a82": "5d3df91 new" | kind=Commit | source=git | neighbors=[1c0e00f fixes, main, 6262799 fixes, FAQ.tsx, LocationLanding.tsx, ServicePage.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a3773ee34a596fb2964b7b639fc365984e0098aa": "a3773ee sec fixes" | kind=Commit | source=git | neighbors=[main, 7dbbf18 perf fixes, Contact.tsx, accounts.functions.ts, admin.functions.ts, contact.functions.ts]
- "components_pricing": "Pricing.tsx" | kind=code-symbol | source=src/components/Pricing.tsx:L1 | neighbors=[00e2564 voorwaaren en privacy, 36d8ccb new pages, 59d8b3c Code edited in Lovable Code Edi…, 6262799 fixes, 6bf533b pushes, 735e902 Verwijder alle section-label ey…]
- "lib_website_checker_server": "website-checker.server.ts" | kind=code-symbol | source=src/lib/website-checker.server.ts:L1 | neighbors=[dda7a04 web tester, assertHttpUrl(), BLOCKED_HOSTNAMES, BLOCKED_IPV4_RANGES, CategoryScore, CheckResult]
- "routes_website_laten_maken": "website-laten-maken.tsx" | kind=code-symbol | source=src/routes/website-laten-maken.tsx:L1 | neighbors=[04c01f8 SEO, 5d3df91 new, 8fdd571 SEO, aabf034 SEO, bc99d99 achtegrond, f207e52 feat(seo): dienstenpagina's web…]
- "supabase_types": "types.ts" | kind=code-symbol | source=src/integrations/supabase/types.ts:L1 | neighbors=[74ecdc1 code fixes, 7f7208a new, 81a87ed commit, c480d2e leads, auth-middleware.ts, client.ts]
- "authenticated_admin_accounts": "admin.accounts.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L1 | neighbors=[ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), AccountsSidebar(), accountStatus(), AdminAccountsPage()]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@85ad012fdc1c37cb42ccd3aef07c4ae3a086d343": "85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond" | kind=Commit | source=git | neighbors=[1a55bd1 Fix formatting in FAQ answers, main, 965b87a Fix foto, nav animaties, portal…, About.tsx, Contact.tsx, FAQ.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ab14295bf0f991ae5f05ccf837cbcab6dfd984fa": "ab14295 Design overhauled, A11y-bar weg" | kind=Commit | source=git | neighbors=[538314c Contactformulier en adminfix, 90677bf Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c480d2e78b924711eb93a74ee039c53839cedb3d": "c480d2e leads" | kind=Commit | source=git | neighbors=[admin.tsx, main, 6bf533b pushes, LeadsPanel.tsx, TeamTab.tsx, accounts.functions.ts]
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L108 | neighbors=[BranchPage.tsx, Footer.tsx, LocationLanding.tsx, LocationPageV2.tsx, ServicePage.tsx, algemene-voorwaarden.tsx]
- "routes_over_ons": "over-ons.tsx" | kind=code-symbol | source=src/routes/over-ons.tsx:L1 | neighbors=[04c01f8 SEO, 2d81f50 feat(seo): vervang /cases door …, 36d8ccb new pages, 5d3df91 new, 6262799 fixes, 8fdd571 SEO]
- "routes_wordpress_of_maatwerk": "wordpress-of-maatwerk.tsx" | kind=code-symbol | source=src/routes/wordpress-of-maatwerk.tsx:L1 | neighbors=[36d8ccb new pages, Breadcrumbs.tsx, Breadcrumbs(), CookieBanner.tsx, CookieBanner(), Footer.tsx]
- "authenticated_admin_changes": "admin.changes.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L1 | neighbors=[AdminChangesPage(), ChangesListSection(), ChangesSidebar(), FormField(), NewChangeSection(), Route]
- "lib_rbac": "rbac.ts" | kind=code-symbol | source=src/lib/rbac.ts:L1 | neighbors=[74ecdc1 code fixes, 81a87ed commit, a3773ee sec fixes, c480d2e leads, TeamTab.tsx, use-permissions.tsx]

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
