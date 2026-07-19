# Node Description Batch 17 of 36

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
- "authenticated_admin_dashboard": "Dashboard()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L232 | neighbors=[admin.tsx]
- "authenticated_admin_metriccard": "MetricCard()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L304 | neighbors=[admin.tsx]
- "authenticated_admin_notificationsbell": "NotificationsBell()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L678 | neighbors=[admin.tsx]
- "authenticated_admin_notificationspanel": "NotificationsPanel()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L714 | neighbors=[admin.tsx]
- "authenticated_admin_passwordresetspanel": "PasswordResetsPanel()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L405 | neighbors=[admin.tsx]
- "authenticated_admin_projecten_adminprojectenpage": "AdminProjectenPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L71 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_dashboardwidgetssection": "DashboardWidgetsSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L933 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_kanbancard": "KanbanCard()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L721 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_kanbancolumn": "KanbanColumn()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L751 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_kanbansection": "KanbanSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L770 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_newprojectsection": "NewProjectSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L279 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_projectensidebar": "ProjectenSidebar()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L129 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_projectid_activitytab": "ActivityTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L346 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_adminprojectdetailpage": "AdminProjectDetailPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L64 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_changestab": "ChangesTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L976 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_contactstab": "ContactsTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L445 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_notestab": "NotesTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L380 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_overzichttab": "OverzichtTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L260 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_projectdetail": "ProjectDetail()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L100 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_projectheader": "ProjectHeader()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L158 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_recurrence_label": "RECURRENCE_LABEL" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L714 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L59 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_settingstab": "SettingsTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L521 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_taskstab": "TasksTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L716 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_timetab": "TimeTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L857 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectslistsection": "ProjectsListSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L348 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_section": "Section" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L69 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_statssection": "StatsSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L214 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_tableskeleton": "TableSkeleton()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L46 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_templatessection": "TemplatesSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L810 | neighbors=[admin.projecten.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-016.json

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
