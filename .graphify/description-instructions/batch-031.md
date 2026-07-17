# Node Description Batch 32 of 34

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

- "ui_menubar_menubarcheckboxitem": "MenubarCheckboxItem" | kind=code-symbol | source=src/components/ui/menubar.tsx:L131 | neighbors=[menubar.tsx]
- "ui_menubar_menubarcontent": "MenubarContent" | kind=code-symbol | source=src/components/ui/menubar.tsx:L93 | neighbors=[menubar.tsx]
- "ui_menubar_menubargroup": "MenubarGroup()" | kind=code-symbol | source=src/components/ui/menubar.tsx:L11 | neighbors=[menubar.tsx]
- "ui_menubar_menubaritem": "MenubarItem" | kind=code-symbol | source=src/components/ui/menubar.tsx:L113 | neighbors=[menubar.tsx]
- "ui_menubar_menubarlabel": "MenubarLabel" | kind=code-symbol | source=src/components/ui/menubar.tsx:L176 | neighbors=[menubar.tsx]
- "ui_menubar_menubarmenu": "MenubarMenu()" | kind=code-symbol | source=src/components/ui/menubar.tsx:L7 | neighbors=[menubar.tsx]
- "ui_menubar_menubarportal": "MenubarPortal()" | kind=code-symbol | source=src/components/ui/menubar.tsx:L15 | neighbors=[menubar.tsx]
- "ui_menubar_menubarradiogroup": "MenubarRadioGroup()" | kind=code-symbol | source=src/components/ui/menubar.tsx:L19 | neighbors=[menubar.tsx]
- "ui_menubar_menubarradioitem": "MenubarRadioItem" | kind=code-symbol | source=src/components/ui/menubar.tsx:L154 | neighbors=[menubar.tsx]
- "ui_menubar_menubarseparator": "MenubarSeparator" | kind=code-symbol | source=src/components/ui/menubar.tsx:L190 | neighbors=[menubar.tsx]
- "ui_menubar_menubarshortcut": "MenubarShortcut()" | kind=code-symbol | source=src/components/ui/menubar.tsx:L202 | neighbors=[menubar.tsx]
- "ui_menubar_menubarsub": "MenubarSub()" | kind=code-symbol | source=src/components/ui/menubar.tsx:L23 | neighbors=[menubar.tsx]
- "ui_menubar_menubarsubcontent": "MenubarSubContent" | kind=code-symbol | source=src/components/ui/menubar.tsx:L78 | neighbors=[menubar.tsx]
- "ui_menubar_menubarsubtrigger": "MenubarSubTrigger" | kind=code-symbol | source=src/components/ui/menubar.tsx:L57 | neighbors=[menubar.tsx]
- "ui_menubar_menubartrigger": "MenubarTrigger" | kind=code-symbol | source=src/components/ui/menubar.tsx:L42 | neighbors=[menubar.tsx]
- "ui_navigation_menu_navigationmenu": "NavigationMenu" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L8 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenucontent": "NavigationMenuContent" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L59 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenuindicator": "NavigationMenuIndicator" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L93 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenulist": "NavigationMenuList" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L23 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenutrigger": "NavigationMenuTrigger" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L41 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenutriggerstyle": "navigationMenuTriggerStyle" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L37 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenuviewport": "NavigationMenuViewport" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L76 | neighbors=[navigation-menu.tsx]
- "ui_pagination_pagination": "Pagination()" | kind=code-symbol | source=src/components/ui/pagination.tsx:L7 | neighbors=[pagination.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-031.json

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
