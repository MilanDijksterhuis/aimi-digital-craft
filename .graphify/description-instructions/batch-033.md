# Node Description Batch 34 of 35

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

- "ui_sidebar_sidebargroupaction": "SidebarGroupAction" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L444 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupcontent": "SidebarGroupContent" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L467 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargrouplabel": "SidebarGroupLabel" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L423 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarheader": "SidebarHeader" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L349 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarinput": "SidebarInput" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L331 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarinset": "SidebarInset" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L314 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenu": "SidebarMenu" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L479 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuaction": "SidebarMenuAction" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L584 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenubadge": "SidebarMenuBadge" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L615 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenubutton": "SidebarMenuButton" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L525 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenubuttonvariants": "sidebarMenuButtonVariants" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L503 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuitem": "SidebarMenuItem" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L491 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuskeleton": "SidebarMenuSkeleton" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L635 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenusub": "SidebarMenuSub" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L668 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenusubbutton": "SidebarMenuSubButton" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L689 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenusubitem": "SidebarMenuSubItem" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L684 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarprovider": "SidebarProvider" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L49 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarrail": "SidebarRail" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L286 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarseparator": "SidebarSeparator" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L377 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebartrigger": "SidebarTrigger" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L260 | neighbors=[sidebar.tsx]
- "ui_sidebar_usesidebar": "useSidebar()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L40 | neighbors=[sidebar.tsx]
- "ui_slider_slider": "Slider" | kind=code-symbol | source=src/components/ui/slider.tsx:L6 | neighbors=[slider.tsx]
- "ui_sonner_toasterprops": "ToasterProps" | kind=code-symbol | source=src/components/ui/sonner.tsx:L3 | neighbors=[sonner.tsx]
- "ui_switch_switch": "Switch" | kind=code-symbol | source=src/components/ui/switch.tsx:L6 | neighbors=[switch.tsx]
- "ui_table_table": "Table" | kind=code-symbol | source=src/components/ui/table.tsx:L5 | neighbors=[table.tsx]
- "ui_table_tablebody": "TableBody" | kind=code-symbol | source=src/components/ui/table.tsx:L22 | neighbors=[table.tsx]
- "ui_table_tablecaption": "TableCaption" | kind=code-symbol | source=src/components/ui/table.tsx:L86 | neighbors=[table.tsx]
- "ui_table_tablecell": "TableCell" | kind=code-symbol | source=src/components/ui/table.tsx:L71 | neighbors=[table.tsx]
- "ui_table_tablefooter": "TableFooter" | kind=code-symbol | source=src/components/ui/table.tsx:L30 | neighbors=[table.tsx]
- "ui_table_tablehead": "TableHead" | kind=code-symbol | source=src/components/ui/table.tsx:L56 | neighbors=[table.tsx]
- "ui_table_tableheader": "TableHeader" | kind=code-symbol | source=src/components/ui/table.tsx:L14 | neighbors=[table.tsx]
- "ui_table_tablerow": "TableRow" | kind=code-symbol | source=src/components/ui/table.tsx:L42 | neighbors=[table.tsx]
- "ui_textarea_textarea": "Textarea" | kind=code-symbol | source=src/components/ui/textarea.tsx:L5 | neighbors=[textarea.tsx]
- "ui_toggle_group_togglegroup": "ToggleGroup" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L15 | neighbors=[toggle-group.tsx]
- "ui_toggle_group_togglegroupcontext": "ToggleGroupContext" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L10 | neighbors=[toggle-group.tsx]
- "ui_toggle_group_togglegroupitem": "ToggleGroupItem" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L31 | neighbors=[toggle-group.tsx]
- "ui_toggle_toggle": "Toggle" | kind=code-symbol | source=src/components/ui/toggle.tsx:L29 | neighbors=[toggle.tsx]
- "vite_config_manualchunks": "manualChunks()" | kind=code-symbol | source=vite.config.ts:L17 | neighbors=[vite.config.ts]
- "eslint_config": "eslint.config.js" | kind=code-symbol | source=eslint.config.js:L1
- "migrations_20260523183958_4e926af8_8fa7_4dc2_9067_5b7dd7cd2ec1": "20260523183958_4e926af8-8fa7-4dc2-9067-5b7dd7cd2ec1.sql" | kind=code-symbol | source=supabase/migrations/20260523183958_4e926af8-8fa7-4dc2-9067-5b7dd7cd2ec1.sql:L1

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-033.json

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
