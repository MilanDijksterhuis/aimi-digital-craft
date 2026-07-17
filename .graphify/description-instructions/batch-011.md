# Node Description Batch 12 of 34

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "ui_sonner": "sonner.tsx" | kind=code-symbol | source=src/components/ui/sonner.tsx:L1 | neighbors=[__root.tsx, Toaster(), ToasterProps]
- "ui_switch": "switch.tsx" | kind=code-symbol | source=src/components/ui/switch.tsx:L1 | neighbors=[utils.ts, cn(), Switch]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=src/components/ui/textarea.tsx:L1 | neighbors=[utils.ts, cn(), Textarea]
- "authenticated_account_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/account.tsx:L7 | neighbors=[account.tsx, routeTree.gen.ts]
- "authenticated_admin_accounts_accountslistsection": "AccountsListSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L264 | neighbors=[admin.accounts.tsx, accountStatus()]
- "authenticated_admin_accounts_accountstatus": "accountStatus()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L39 | neighbors=[admin.accounts.tsx, AccountsListSection()]
- "authenticated_admin_accounts_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L17 | neighbors=[admin.accounts.tsx, routeTree.gen.ts]
- "authenticated_admin_changes_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L12 | neighbors=[admin.changes.tsx, routeTree.gen.ts]
- "authenticated_admin_projecten_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L40 | neighbors=[admin.projecten.tsx, routeTree.gen.ts]
- "authenticated_admin_rollen_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L20 | neighbors=[admin.rollen.tsx, routeTree.gen.ts]
- "authenticated_admin_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L65 | neighbors=[admin.tsx, routeTree.gen.ts]
- "authenticated_portal_matchesfilter": "matchesFilter()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L105 | neighbors=[portal.tsx, mapStatus()]
- "authenticated_portal_projecten_projectid_monitoringsection": "MonitoringSection()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L80 | neighbors=[portal.projecten.$projectId.tsx, timeAgo()]
- "authenticated_portal_projecten_projectid_timeago": "timeAgo()" | kind=code-symbol | source=src/routes/_authenticated/portal.projecten.$projectId.tsx:L27 | neighbors=[portal.projecten.$projectId.tsx, MonitoringSection()]
- "authenticated_portal_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L57 | neighbors=[portal.tsx, routeTree.gen.ts]
- "authenticated_portal_stepper": "Stepper()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L766 | neighbors=[portal.tsx, stepIndex()]
- "authenticated_server_formatserverage": "formatServerAge()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L131 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_formatssldate": "formatSslDate()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L123 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_formatuptime": "formatUptime()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L37 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_na": "na()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L110 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L32 | neighbors=[server.tsx, routeTree.gen.ts]
- "authenticated_server_safejsonparse": "safeJsonParse()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L114 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_statuscolor": "statusColor()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L52 | neighbors=[server.tsx, ServerPage()]
- "components_about_about": "About()" | kind=code-symbol | source=src/components/About.tsx:L3 | neighbors=[About.tsx, index.tsx]
- "components_adminchatpanel_adminchatpanel": "AdminChatPanel()" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L27 | neighbors=[admin.tsx, AdminChatPanel.tsx]
- "components_berichtentab_berichtentab": "BerichtenTab()" | kind=code-symbol | source=src/components/BerichtenTab.tsx:L10 | neighbors=[admin.tsx, BerichtenTab.tsx]
- "components_chatwidget_chatwidget": "ChatWidget()" | kind=code-symbol | source=src/components/ChatWidget.tsx:L15 | neighbors=[portal.tsx, ChatWidget.tsx]
- "components_contact_contact": "Contact()" | kind=code-symbol | source=src/components/Contact.tsx:L10 | neighbors=[Contact.tsx, index.tsx]
- "components_cookiebanner_cookiebanner": "CookieBanner()" | kind=code-symbol | source=src/components/CookieBanner.tsx:L25 | neighbors=[CookieBanner.tsx, index.tsx]
- "components_deletedchangestab_deletedchangestab": "DeletedChangesTab()" | kind=code-symbol | source=src/components/DeletedChangesTab.tsx:L11 | neighbors=[admin.tsx, DeletedChangesTab.tsx]
- "components_faq_faq": "FAQ()" | kind=code-symbol | source=src/components/FAQ.tsx:L28 | neighbors=[FAQ.tsx, index.tsx]
- "components_hero_hero": "Hero()" | kind=code-symbol | source=src/components/Hero.tsx:L5 | neighbors=[Hero.tsx, index.tsx]
- "components_leadspanel_leadspanel": "LeadsPanel()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L124 | neighbors=[admin.tsx, LeadsPanel.tsx]
- "components_nav_nav": "Nav()" | kind=code-symbol | source=src/components/Nav.tsx:L11 | neighbors=[Nav.tsx, index.tsx]
- "components_onboardingwizard_onboardingwizard": "OnboardingWizard()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L43 | neighbors=[admin.accounts.$accountId.tsx, OnboardingWizard.tsx]
- "components_portalonboardingtour_portalonboardingtour": "PortalOnboardingTour()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L46 | neighbors=[portal.tsx, PortalOnboardingTour.tsx]
- "components_portaltutorial_portaltutorial": "PortalTutorial()" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L51 | neighbors=[portal.tsx, PortalTutorial.tsx]
- "components_pricing_pricing": "Pricing()" | kind=code-symbol | source=src/components/Pricing.tsx:L57 | neighbors=[Pricing.tsx, index.tsx]
- "components_processtimeline_processtimeline": "ProcessTimeline()" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L48 | neighbors=[ProcessTimeline.tsx, index.tsx]
- "components_services_services": "services" | kind=code-symbol | source=src/components/Services.tsx:L4 | neighbors=[Services.tsx, index.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-011.json

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
