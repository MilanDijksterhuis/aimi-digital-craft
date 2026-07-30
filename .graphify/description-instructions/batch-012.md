# Node Description Batch 13 of 37

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

- "authenticated_portal_stepper": "Stepper()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L780 | neighbors=[portal.tsx, stepIndex()]
- "authenticated_server_formatserverage": "formatServerAge()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L131 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_formatssldate": "formatSslDate()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L123 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_formatuptime": "formatUptime()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L37 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_na": "na()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L110 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L32 | neighbors=[server.tsx, routeTree.gen.ts]
- "authenticated_server_safejsonparse": "safeJsonParse()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L114 | neighbors=[server.tsx, ServerPage()]
- "authenticated_server_statuscolor": "statusColor()" | kind=code-symbol | source=src/routes/_authenticated/server.tsx:L52 | neighbors=[server.tsx, ServerPage()]
- "components_about_about": "About()" | kind=code-symbol | source=src/components/About.tsx:L3 | neighbors=[About.tsx, index.tsx]
- "components_adminchatpanel_adminchatpanel": "AdminChatPanel()" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L27 | neighbors=[admin.tsx, AdminChatPanel.tsx]
- "components_berichtentab_berichtentab": "BerichtenTab()" | kind=code-symbol | source=src/components/BerichtenTab.tsx:L11 | neighbors=[admin.tsx, BerichtenTab.tsx]
- "components_callbackagenda_adddays": "addDays()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L40 | neighbors=[CallbackAgenda.tsx, startOfWeek()]
- "components_callbackagenda_callbackitem": "CallbackItem()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L275 | neighbors=[CallbackAgenda.tsx, fmtTime()]
- "components_callbackagenda_fmtdaylabel": "fmtDayLabel()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L55 | neighbors=[CallbackAgenda.tsx, CallbackAgenda()]
- "components_callbackagenda_fmttime": "fmtTime()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L53 | neighbors=[CallbackAgenda.tsx, CallbackItem()]
- "components_callbackagenda_istoday": "isToday()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L51 | neighbors=[CallbackAgenda.tsx, sameDay()]
- "components_callbackschedulemodal_callbackscheduleform": "CallbackScheduleForm()" | kind=code-symbol | source=src/components/CallbackScheduleModal.tsx:L17 | neighbors=[CallbackScheduleModal.tsx, LeadsPanel.tsx]
- "components_chatwidget_chatwidget": "ChatWidget()" | kind=code-symbol | source=src/components/ChatWidget.tsx:L15 | neighbors=[portal.tsx, ChatWidget.tsx]
- "components_confirmdialog_confirmprovider": "ConfirmProvider()" | kind=code-symbol | source=src/components/ConfirmDialog.tsx:L58 | neighbors=[ConfirmDialog.tsx, __root.tsx]
- "components_contact_contact": "Contact()" | kind=code-symbol | source=src/components/Contact.tsx:L10 | neighbors=[Contact.tsx, index.tsx]
- "components_cookiebanner_cookiebanner": "CookieBanner()" | kind=code-symbol | source=src/components/CookieBanner.tsx:L25 | neighbors=[CookieBanner.tsx, index.tsx]
- "components_deletedchangestab_deletedchangestab": "DeletedChangesTab()" | kind=code-symbol | source=src/components/DeletedChangesTab.tsx:L12 | neighbors=[admin.tsx, DeletedChangesTab.tsx]
- "components_faq_faq": "FAQ()" | kind=code-symbol | source=src/components/FAQ.tsx:L28 | neighbors=[FAQ.tsx, index.tsx]
- "components_hero_hero": "Hero()" | kind=code-symbol | source=src/components/Hero.tsx:L5 | neighbors=[Hero.tsx, index.tsx]
- "components_idletimeout_idletimeout": "IdleTimeout()" | kind=code-symbol | source=src/components/IdleTimeout.tsx:L21 | neighbors=[IdleTimeout.tsx, _authenticated.tsx]
- "components_nav_nav": "Nav()" | kind=code-symbol | source=src/components/Nav.tsx:L11 | neighbors=[Nav.tsx, index.tsx]
- "components_onboardingwizard_onboardingwizard": "OnboardingWizard()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L43 | neighbors=[admin.accounts.$accountId.tsx, OnboardingWizard.tsx]
- "components_portalonboardingtour_portalonboardingtour": "PortalOnboardingTour()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L46 | neighbors=[portal.tsx, PortalOnboardingTour.tsx]
- "components_portaltutorial_portaltutorial": "PortalTutorial()" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L51 | neighbors=[portal.tsx, PortalTutorial.tsx]
- "components_pricing_pricing": "Pricing()" | kind=code-symbol | source=src/components/Pricing.tsx:L57 | neighbors=[Pricing.tsx, index.tsx]
- "components_processtimeline_processtimeline": "ProcessTimeline()" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L48 | neighbors=[ProcessTimeline.tsx, index.tsx]
- "components_services_services": "services" | kind=code-symbol | source=src/components/Services.tsx:L4 | neighbors=[Services.tsx, index.tsx]
- "components_teamtab_teamtab": "TeamTab()" | kind=code-symbol | source=src/components/TeamTab.tsx:L12 | neighbors=[admin.tsx, TeamTab.tsx]
- "hooks_expire_accounts_isauthorized": "isAuthorized()" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L15 | neighbors=[expire-accounts.ts, timingSafeStringEqual()]
- "hooks_expire_accounts_route": "Route" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L32 | neighbors=[expire-accounts.ts, routeTree.gen.ts]
- "hooks_expire_accounts_timingsafestringequal": "timingSafeStringEqual()" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L8 | neighbors=[expire-accounts.ts, isAuthorized()]
- "hooks_use_auth_authprovider": "AuthProvider()" | kind=code-symbol | source=src/hooks/use-auth.tsx:L19 | neighbors=[use-auth.tsx, _authenticated.tsx]
- "hooks_use_auth_useauth": "useAuth()" | kind=code-symbol | source=src/hooks/use-auth.tsx:L60 | neighbors=[use-auth.tsx, _authenticated.tsx]
- "hooks_use_form_draft_useformdraft": "useFormDraft()" | kind=code-symbol | source=src/hooks/use-form-draft.ts:L11 | neighbors=[portal.tsx, use-form-draft.ts]
- "hooks_use_mobile": "use-mobile.tsx" | kind=code-symbol | source=src/hooks/use-mobile.tsx:L1 | neighbors=[useIsMobile(), sidebar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-012.json

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
