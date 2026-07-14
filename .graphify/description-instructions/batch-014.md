# Node Description Batch 15 of 32

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

- "authenticated_admin_adminsidebar": "AdminSidebar()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L338 | neighbors=[admin.tsx]
- "authenticated_admin_afsprakentab": "AfsprakenTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L527 | neighbors=[admin.tsx]
- "authenticated_admin_alertspanel": "AlertsPanel()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L785 | neighbors=[admin.tsx]
- "authenticated_admin_archivedchangespanel": "ArchivedChangesPanel()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L749 | neighbors=[admin.tsx]
- "authenticated_admin_card": "Card()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L329 | neighbors=[admin.tsx]
- "authenticated_admin_changes_adminchangespage": "AdminChangesPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L36 | neighbors=[admin.changes.tsx]
- "authenticated_admin_changes_changeid_adminchangedetailpage": "AdminChangeDetailPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L23 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeid_attachmentlist": "AttachmentList()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L197 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeid_changedetail": "ChangeDetail()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L59 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeid_changeheader": "ChangeHeader()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L98 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeid_communicatietab": "CommunicatieTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L216 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeid_overzichttab": "OverzichtTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L150 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeid_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L18 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeid_tijdlijntab": "TijdlijnTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.$changeId.tsx:L269 | neighbors=[admin.changes.$changeId.tsx]
- "authenticated_admin_changes_changeslistsection": "ChangesListSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L166 | neighbors=[admin.changes.tsx]
- "authenticated_admin_changes_changessidebar": "ChangesSidebar()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L87 | neighbors=[admin.changes.tsx]
- "authenticated_admin_changes_formfield": "FormField()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L332 | neighbors=[admin.changes.tsx]
- "authenticated_admin_changes_newchangesection": "NewChangeSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L344 | neighbors=[admin.changes.tsx]
- "authenticated_admin_changes_section": "Section" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L34 | neighbors=[admin.changes.tsx]
- "authenticated_admin_changes_tableskeleton": "TableSkeleton()" | kind=code-symbol | source=src/routes/_authenticated/admin.changes.tsx:L17 | neighbors=[admin.changes.tsx]
- "authenticated_admin_dashboard": "Dashboard()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L239 | neighbors=[admin.tsx]
- "authenticated_admin_metriccard": "MetricCard()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L311 | neighbors=[admin.tsx]
- "authenticated_admin_notificationsbell": "NotificationsBell()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L685 | neighbors=[admin.tsx]
- "authenticated_admin_notificationspanel": "NotificationsPanel()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L709 | neighbors=[admin.tsx]
- "authenticated_admin_passwordresetspanel": "PasswordResetsPanel()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L412 | neighbors=[admin.tsx]
- "authenticated_admin_projecten_adminprojectenpage": "AdminProjectenPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L70 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_dashboardwidgetssection": "DashboardWidgetsSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L930 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_kanbancard": "KanbanCard()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L719 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_kanbancolumn": "KanbanColumn()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L749 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_kanbansection": "KanbanSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L768 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_newprojectsection": "NewProjectSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L278 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_projectensidebar": "ProjectenSidebar()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L128 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_projectid_activitytab": "ActivityTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L345 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_adminprojectdetailpage": "AdminProjectDetailPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L63 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_changestab": "ChangesTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L971 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_contactstab": "ContactsTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L443 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_notestab": "NotesTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L379 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_overzichttab": "OverzichtTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L259 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_projectdetail": "ProjectDetail()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L99 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_projectheader": "ProjectHeader()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L157 | neighbors=[admin.projecten.$projectId.tsx]

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
