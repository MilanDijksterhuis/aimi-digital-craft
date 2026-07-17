# Node Description Batch 33 of 34

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

- "ui_pagination_paginationcontent": "PaginationContent" | kind=code-symbol | source=src/components/ui/pagination.tsx:L17 | neighbors=[pagination.tsx]
- "ui_pagination_paginationellipsis": "PaginationEllipsis()" | kind=code-symbol | source=src/components/ui/pagination.tsx:L78 | neighbors=[pagination.tsx]
- "ui_pagination_paginationitem": "PaginationItem" | kind=code-symbol | source=src/components/ui/pagination.tsx:L24 | neighbors=[pagination.tsx]
- "ui_pagination_paginationlink": "PaginationLink()" | kind=code-symbol | source=src/components/ui/pagination.tsx:L34 | neighbors=[pagination.tsx]
- "ui_pagination_paginationlinkprops": "PaginationLinkProps" | kind=code-symbol | source=src/components/ui/pagination.tsx:L29 | neighbors=[pagination.tsx]
- "ui_pagination_paginationnext": "PaginationNext()" | kind=code-symbol | source=src/components/ui/pagination.tsx:L65 | neighbors=[pagination.tsx]
- "ui_pagination_paginationprevious": "PaginationPrevious()" | kind=code-symbol | source=src/components/ui/pagination.tsx:L49 | neighbors=[pagination.tsx]
- "ui_popover_popovercontent": "PopoverContent" | kind=code-symbol | source=src/components/ui/popover.tsx:L12 | neighbors=[popover.tsx]
- "ui_progress_progress": "Progress" | kind=code-symbol | source=src/components/ui/progress.tsx:L8 | neighbors=[progress.tsx]
- "ui_radio_group_radiogroup": "RadioGroup" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L7 | neighbors=[radio-group.tsx]
- "ui_radio_group_radiogroupitem": "RadioGroupItem" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L15 | neighbors=[radio-group.tsx]
- "ui_resizable_resizablehandle": "ResizableHandle()" | kind=code-symbol | source=src/components/ui/resizable.tsx:L15 | neighbors=[resizable.tsx]
- "ui_resizable_resizablepanelgroup": "ResizablePanelGroup()" | kind=code-symbol | source=src/components/ui/resizable.tsx:L6 | neighbors=[resizable.tsx]
- "ui_scroll_area_scrollarea": "ScrollArea" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L6 | neighbors=[scroll-area.tsx]
- "ui_scroll_area_scrollbar": "ScrollBar" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L24 | neighbors=[scroll-area.tsx]
- "ui_select_selectcontent": "SelectContent" | kind=code-symbol | source=src/components/ui/select.tsx:L63 | neighbors=[select.tsx]
- "ui_select_selectitem": "SelectItem" | kind=code-symbol | source=src/components/ui/select.tsx:L107 | neighbors=[select.tsx]
- "ui_select_selectlabel": "SelectLabel" | kind=code-symbol | source=src/components/ui/select.tsx:L95 | neighbors=[select.tsx]
- "ui_select_selectscrolldownbutton": "SelectScrollDownButton" | kind=code-symbol | source=src/components/ui/select.tsx:L49 | neighbors=[select.tsx]
- "ui_select_selectscrollupbutton": "SelectScrollUpButton" | kind=code-symbol | source=src/components/ui/select.tsx:L35 | neighbors=[select.tsx]
- "ui_select_selectseparator": "SelectSeparator" | kind=code-symbol | source=src/components/ui/select.tsx:L129 | neighbors=[select.tsx]
- "ui_select_selecttrigger": "SelectTrigger" | kind=code-symbol | source=src/components/ui/select.tsx:L15 | neighbors=[select.tsx]
- "ui_sheet_sheetcontentprops": "SheetContentProps" | kind=code-symbol | source=src/components/ui/sheet.tsx:L52 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L79 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay" | kind=code-symbol | source=src/components/ui/sheet.tsx:L18 | neighbors=[sheet.tsx]
- "ui_sheet_sheetvariants": "sheetVariants" | kind=code-symbol | source=src/components/ui/sheet.tsx:L33 | neighbors=[sheet.tsx]
- "ui_sidebar_sidebar": "Sidebar" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L153 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontent": "SidebarContent" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L392 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontext": "SidebarContext" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L38 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontextprops": "SidebarContextProps" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L28 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarfooter": "SidebarFooter" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L363 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroup": "SidebarGroup" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L409 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupaction": "SidebarGroupAction" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L444 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupcontent": "SidebarGroupContent" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L467 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargrouplabel": "SidebarGroupLabel" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L423 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarheader": "SidebarHeader" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L349 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarinput": "SidebarInput" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L331 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarinset": "SidebarInset" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L314 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenu": "SidebarMenu" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L479 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuaction": "SidebarMenuAction" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L584 | neighbors=[sidebar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-032.json

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
