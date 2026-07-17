# Node Description Batch 17 of 34

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

- "authenticated_admin_projecten_projectid_contactstab": "ContactsTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L443 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_notestab": "NotesTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L379 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_overzichttab": "OverzichtTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L259 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_projectdetail": "ProjectDetail()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L99 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_projectheader": "ProjectHeader()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L157 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_recurrence_label": "RECURRENCE_LABEL" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L711 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L58 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_settingstab": "SettingsTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L518 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_taskstab": "TasksTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L713 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectid_timetab": "TimeTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.$projectId.tsx:L853 | neighbors=[admin.projecten.$projectId.tsx]
- "authenticated_admin_projecten_projectslistsection": "ProjectsListSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L347 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_section": "Section" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L68 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_statssection": "StatsSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L213 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_tableskeleton": "TableSkeleton()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L45 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_templatessection": "TemplatesSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L808 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_projecten_websitelinkdetail": "WebsiteLinkDetail()" | kind=code-symbol | source=src/routes/_authenticated/admin.projecten.tsx:L489 | neighbors=[admin.projecten.tsx]
- "authenticated_admin_rollen_adminrollenpage": "AdminRollenPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L48 | neighbors=[admin.rollen.tsx]
- "authenticated_admin_rollen_newrolesection": "NewRoleSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L202 | neighbors=[admin.rollen.tsx]
- "authenticated_admin_rollen_role_label": "ROLE_LABEL" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L11 | neighbors=[admin.rollen.tsx]
- "authenticated_admin_rollen_roleid_activitytab": "ActivityTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L256 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleid_adminroledetailpage": "AdminRoleDetailPage()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L48 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleid_all_permissions": "ALL_PERMISSIONS" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L24 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleid_overzichttab": "OverzichtTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L183 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleid_permissiestab": "PermissiesTab()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L218 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleid_role_label": "ROLE_LABEL" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L15 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleid_roledetail": "RoleDetail()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L84 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleid_roleheader": "RoleHeader()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L121 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleid_route": "Route" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.$roleId.tsx:L43 | neighbors=[admin.rollen.$roleId.tsx]
- "authenticated_admin_rollen_roleslistsection": "RolesListSection()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L151 | neighbors=[admin.rollen.tsx]
- "authenticated_admin_rollen_rollensidebar": "RollenSidebar()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L86 | neighbors=[admin.rollen.tsx]
- "authenticated_admin_rollen_section": "Section" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L46 | neighbors=[admin.rollen.tsx]
- "authenticated_admin_rollen_staff_base_roles": "STAFF_BASE_ROLES" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L10 | neighbors=[admin.rollen.tsx]
- "authenticated_admin_rollen_tableskeleton": "TableSkeleton()" | kind=code-symbol | source=src/routes/_authenticated/admin.rollen.tsx:L25 | neighbors=[admin.rollen.tsx]
- "authenticated_admin_tableskeleton": "TableSkeleton()" | kind=code-symbol | source=src/routes/_authenticated/admin.tsx:L44 | neighbors=[admin.tsx]
- "authenticated_portal_allowed_attachment_mime": "ALLOWED_ATTACHMENT_MIME" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L36 | neighbors=[portal.tsx]
- "authenticated_portal_emptychanges": "EmptyChanges()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L728 | neighbors=[portal.tsx]
- "authenticated_portal_filter_label": "FILTER_LABEL" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L97 | neighbors=[portal.tsx]
- "authenticated_portal_filterkey": "FilterKey" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L96 | neighbors=[portal.tsx]
- "authenticated_portal_legacywebsitemonitoring": "LegacyWebsiteMonitoring()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L1189 | neighbors=[portal.tsx]
- "authenticated_portal_overviewsection": "OverviewSection()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L1284 | neighbors=[portal.tsx]

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
