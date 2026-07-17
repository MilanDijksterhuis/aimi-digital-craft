# Node Description Batch 15 of 34

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

- "ui_sheet_sheettitle": "SheetTitle" | kind=code-symbol | source=src/components/ui/sheet.tsx:L87 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sonner_toaster": "Toaster()" | kind=code-symbol | source=src/components/ui/sonner.tsx:L5 | neighbors=[__root.tsx, sonner.tsx]
- "ui_toggle_togglevariants": "toggleVariants" | kind=code-symbol | source=src/components/ui/toggle.tsx:L7 | neighbors=[toggle.tsx, toggle-group.tsx]
- "ui_tooltip_tooltipcontent": "TooltipContent" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L14 | neighbors=[sidebar.tsx, tooltip.tsx]
- "authenticated_account_accountpage": "AccountPage()" | kind=code-symbol | source=src/routes/_authenticated/account.tsx:L12 | neighbors=[account.tsx]
- "authenticated_admin_aanvragentab": "AanvragenTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L460 | neighbors=[admin.tsx]
- "authenticated_admin_accounts_account_status_color": "ACCOUNT_STATUS_COLOR" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L50 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_account_status_label": "ACCOUNT_STATUS_LABEL" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L45 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_accountid_accountdetail": "AccountDetail()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L104 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_accountheader": "AccountHeader()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L227 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_activiteittab": "ActiviteitTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L682 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_adminaccountdetailpage": "AdminAccountDetailPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L56 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_customrolessection": "CustomRolesSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L605 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_financieeltab": "FinancieelTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L381 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_instellingentab": "InstellingenTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L789 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_notitiestab": "NotitiesTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L758 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_onboarding_status_color": "ONBOARDING_STATUS_COLOR" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L98 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_onboarding_status_label": "ONBOARDING_STATUS_LABEL" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L92 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_onboardingtab": "OnboardingTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L496 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_overzichttab": "OverzichtTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L281 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_projectscard": "ProjectsCard()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L261 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_role_label": "ROLE_LABEL" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L51 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L46 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_staff_base_roles": "STAFF_BASE_ROLES" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L603 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountid_toegangtab": "ToegangTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.$accountId.tsx:L553 | neighbors=[admin.accounts.$accountId.tsx]
- "authenticated_admin_accounts_accountssidebar": "AccountsSidebar()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L95 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_adminaccountspage": "AdminAccountsPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L58 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_newaccountsection": "NewAccountSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L171 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_newcustomersection": "NewCustomerSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L216 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_section": "Section" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L56 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_accounts_tableskeleton": "TableSkeleton()" | kind=code-symbol | source=src/routes/_authenticated/admin.accounts.tsx:L22 | neighbors=[admin.accounts.tsx]
- "authenticated_admin_adminpage": "AdminPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L70 | neighbors=[admin.tsx]
- "authenticated_admin_adminsidebar": "AdminSidebar()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L338 | neighbors=[admin.tsx]
- "authenticated_admin_afsprakentab": "AfsprakenTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L527 | neighbors=[admin.tsx]
- "authenticated_admin_alertspanel": "AlertsPanel()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L790 | neighbors=[admin.tsx]
- "authenticated_admin_archivedchangespanel": "ArchivedChangesPanel()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L754 | neighbors=[admin.tsx]
- "authenticated_admin_card": "Card()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L329 | neighbors=[admin.tsx]
- "authenticated_admin_changes_adminchangespage": "AdminChangesPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L36 | neighbors=[admin.changes.tsx]
- "authenticated_admin_changes_changeid_adminchangedetailpage": "AdminChangeDetailPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L23 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeid_attachmentlist": "AttachmentList()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L197 | neighbors=[admin.changes.$changeId.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-014.json

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
