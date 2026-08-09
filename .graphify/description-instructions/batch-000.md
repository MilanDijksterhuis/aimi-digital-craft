# Node Description Batch 1 of 42

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

- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#main": "main" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 02d6137 fixes, 032ba88 SEO]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#seo-verbetering": "seo-verbetering" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 02d6137 fixes, 0332090 Changes]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#tmp-main-merge": "tmp-main-merge" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#tmp-revert-main": "tmp-revert-main" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#worktree-curious-wibbling-narwhal": "worktree-curious-wibbling-narwhal" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#worktree-fix-admin-projects-hooks": "worktree-fix-admin-projects-hooks" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#worktree-floofy-conjuring-petal": "worktree-floofy-conjuring-petal" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "branch:repo:github.com/MilanDijksterhuis/aimi-digital-craft#worktree-replicated-fluttering-whisper": "worktree-replicated-fluttering-whisper" | kind=Branch | source=git | neighbors=[00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layo…]
- "lib_admin_functions": "admin.functions.ts" | kind=code-symbol | source=src/lib/admin.functions.ts:L1 | neighbors=[12764e3 Security: fix IDOR vulnerabilit…, 2d50590 wip: lokale wijzigingen voor pu…, 2fcc9a3 fixes, 39d363a server basic, 3ca59a0 Changes, 5bc9ff0 google authenticatoin]
- "src_routetree_gen": "routeTree.gen.ts" | kind=code-symbol | source=src/routeTree.gen.ts:L1 | neighbors=[00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0cfedfb Changes, 273dbce Code edited in Lovable Code Edi…, 2b1d78f telegram]
- "authenticated_portal": "portal.tsx" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L1 | neighbors=[ALLOWED_ATTACHMENT_MIME, ChangeCard(), EmptyChanges(), FILTER_LABEL, FilterKey, LegacyWebsiteMonitoring()]
- "authenticated_admin": "admin.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L1 | neighbors=[AanvragenTab(), AdminPage(), AdminSidebar(), AfsprakenTab(), AlertsPanel(), ArchivedChangesPanel()]
- "design_handoff_meer_diensten_support": "support.js" | kind=code-symbol | source=Geanimeerde achtergronden voor website/design_handoff_meer_diensten/support.js:L1 | neighbors=[fc7da2d animaties en paginas, boot(), bundledBlob(), cdnScriptFor(), collectProps(), compileAttr()]
- "authenticated_admin_projecten_projectid": "admin.projecten.$projectId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L1 | neighbors=[ActivityTab(), AdminProjectDetailPage(), ChangesTab(), ContactsTab(), NotesTab(), OverzichtTab()]
- "lib_portal_functions": "portal.functions.ts" | kind=code-symbol | source=src/lib/portal.functions.ts:L1 | neighbors=[12764e3 Security: fix IDOR vulnerabilit…, 15acc2a Changes, 2fcc9a3 fixes, 3417a43 fixes, 74ecdc1 code fixes, 7f7208a new]
- "ui_sidebar": "sidebar.tsx" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L1 | neighbors=[use-mobile.tsx, useIsMobile(), utils.ts, cn(), button.tsx, Button]
- "lib_utils": "utils.ts" | kind=code-symbol | source=src/lib/utils.ts:L1 | neighbors=[ConfirmDialog.tsx, cn(), accordion.tsx, alert.tsx, alert-dialog.tsx, avatar.tsx]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=src/lib/utils.ts:L4 | neighbors=[ConfirmDialog.tsx, utils.ts, accordion.tsx, alert.tsx, alert-dialog.tsx, avatar.tsx]
- "authenticated_admin_accounts_accountid": "admin.accounts.$accountId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L1 | neighbors=[AccountDetail(), AccountHeader(), ActiviteitTab(), AdminAccountDetailPage(), CustomRolesSection(), FinancieelTab()]
- "routes_index": "index.tsx" | kind=code-symbol | source=src/routes/index.tsx:L1 | neighbors=[129b916 manier van werken, 5820182 Changes, 85a6666 SEO en robot, 85ad012 Cinematisch redesign: forest he…, 98edc37 Changes, ab14295 Design overhauled, A11y-bar weg]
- "components_leadspanel": "LeadsPanel.tsx" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L1 | neighbors=[admin.leads.tsx, 9a2689c code fixes, c480d2e leads, f958216 leads functions, fc7da2d animaties en paginas, CallbackScheduleModal.tsx]
- "components_nav": "Nav.tsx" | kind=code-symbol | source=src/components/Nav.tsx:L1 | neighbors=[05a6c9e Verbeter admin changes-tab layo…, 0cfedfb Changes, 2d81f50 feat(seo): vervang /cases door …, 7476011 Changes, 79f7d0a Changes, 7d64543 Changes]
- "routes_root": "__root.tsx" | kind=code-symbol | source=src/routes/__root.tsx:L1 | neighbors=[37c0d11 Dock tokens toegevoegd & emojis…, 408d241 Changes, 422202c Made the requested updates, 538314c Contactformulier en adminfix, 5597edf Changes, 6da1e20 Log root error boundary crashes…]
- "authenticated_server": "server.tsx" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L1 | neighbors=[DISK_DAYS_OPTIONS, downloadCsv(), ErrorBox(), ExpandableMetricCard(), ExportButton(), formatDateShort()]
- "src_server": "server.ts" | kind=code-symbol | source=src/server.ts:L1 | neighbors=[23bb181 sec, 2d50590 wip: lokale wijzigingen voor pu…, 3901302 Fix mojibake in admin dashboard…, 5d1e827 Log server-side (SSR) crashes t…, 85a6666 SEO en robot, a3773ee sec fixes]
- "lib_accounts_functions": "accounts.functions.ts" | kind=code-symbol | source=src/lib/accounts.functions.ts:L1 | neighbors=[74ecdc1 code fixes, 81a87ed commit, 9e611dd Changes, a3773ee sec fixes, c480d2e leads, cf4ac91 Alle fases toegevoegd & cron re…]
- "authenticated_admin_projecten": "admin.projecten.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L1 | neighbors=[AdminProjectenPage(), DashboardWidgetsSection(), KanbanCard(), KanbanColumn(), KanbanSection(), NewProjectSection()]
- "authenticated_portal_projecten_projectid": "portal.projecten.$projectId.tsx" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L1 | neighbors=[MonitoringSection(), PortalProjectDetailPage(), ProjectSwitcher(), Route, timeAgo(), UptimeChart()]
- "components_confirmdialog": "ConfirmDialog.tsx" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, 9a2689c code fixes, BerichtenTab.tsx, CallbackAgenda.tsx]
- "routes_authenticated": "_authenticated.tsx" | kind=code-symbol | source=src/routes/_authenticated.tsx:L1 | neighbors=[41d8eb5 Changes, 423b3f1 cashing, 4b4ebd9 Catch getSession() network erro…, 68ae2dd Changes, 6dc7740 Changes, 7dbbf18 perf fixes]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@81a87edaf7b9db05e33477346e1821aa12e8e485": "81a87ed commit" | kind=Commit | source=git | neighbors=[7f7208a new, admin.tsx, admin.accounts.tsx, admin.accounts.$accountId.tsx, admin.changes.tsx, admin.changes.$changeId.tsx]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ecdbe8e1f4e58bfc169589dc2da50a537cf32f2e": "ecdbe8e fixes" | kind=Commit | source=git | neighbors=[23bb181 sec, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal]
- "routes_meer_diensten": "meer-diensten.tsx" | kind=code-symbol | source=src/routes/meer-diensten.tsx:L1 | neighbors=[b48bbc0 chore: snapshot lokale SEO-pagi…, fc7da2d animaties en paginas, CookieBanner.tsx, CookieBanner(), Nav.tsx, Nav()]
- "components_callbackagenda": "CallbackAgenda.tsx" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L1 | neighbors=[admin.leads.tsx, f958216 leads functions, addDays(), CallbackAgenda(), CallbackDetailModal(), CallbackItem()]
- "lib_monitoring_functions": "monitoring.functions.ts" | kind=code-symbol | source=src/lib/monitoring.functions.ts:L1 | neighbors=[0193196 monitoring, 39d363a server basic, 74ecdc1 code fixes, a3773ee sec fixes, getAlerts, getDailyCheckLatest]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9a2689caf4f6864cfdf4108ef679ab96a9b76d9a": "9a2689c code fixes" | kind=Commit | source=git | neighbors=[74ecdc1 code fixes, admin.accounts.$accountId.tsx, admin.projecten.tsx, admin.projecten.$projectId.tsx, portal.tsx, main]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fc7da2d775fafb0a3eb95f413bddc50adb6dea13": "fc7da2d animaties en paginas" | kind=Commit | source=git | neighbors=[2b1d78f telegram, admin.tsx, admin.instellingen.tsx, admin.leads.tsx, portal.tsx, main]
- "components_hero": "Hero.tsx" | kind=code-symbol | source=src/components/Hero.tsx:L1 | neighbors=[0193196 monitoring, 1a66af6 Verbeter layout en visueel ritme, 1dfd3b7 Code edited in Lovable Code Edi…, 36052ff Code edited in Lovable Code Edi…, 38037d9 Update Hero.tsx, 4c798fc Code edited in Lovable Code Edi…]
- "authenticated_admin_rollen_roleid": "admin.rollen.$roleId.tsx" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L1 | neighbors=[ActivityTab(), AdminRoleDetailPage(), ALL_PERMISSIONS, OverzichtTab(), PermissiesTab(), ROLE_LABEL]
- "components_contact": "Contact.tsx" | kind=code-symbol | source=src/components/Contact.tsx:L1 | neighbors=[0332090 Changes, 0b21971 Changes weergave verbeterd, 538314c Contactformulier en adminfix, 5d6e898 Changes, 735e902 Verwijder alle section-label ey…, 7eafc83 Changes]

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
