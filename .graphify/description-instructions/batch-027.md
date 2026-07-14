# Node Description Batch 28 of 32

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

- "ui_card_carddescription": "CardDescription" | kind=code-symbol | source=src/components/ui/card.tsx:L34 | neighbors=[card.tsx]
- "ui_card_cardfooter": "CardFooter" | kind=code-symbol | source=src/components/ui/card.tsx:L48 | neighbors=[card.tsx]
- "ui_card_cardheader": "CardHeader" | kind=code-symbol | source=src/components/ui/card.tsx:L16 | neighbors=[card.tsx]
- "ui_card_cardtitle": "CardTitle" | kind=code-symbol | source=src/components/ui/card.tsx:L23 | neighbors=[card.tsx]
- "ui_carousel_carousel": "Carousel" | kind=code-symbol | source=src/components/ui/carousel.tsx:L41 | neighbors=[carousel.tsx]
- "ui_carousel_carouselapi": "CarouselApi" | kind=code-symbol | source=src/components/ui/carousel.tsx:L8 | neighbors=[carousel.tsx]
- "ui_carousel_carouselcontent": "CarouselContent" | kind=code-symbol | source=src/components/ui/carousel.tsx:L135 | neighbors=[carousel.tsx]
- "ui_carousel_carouselcontext": "CarouselContext" | kind=code-symbol | source=src/components/ui/carousel.tsx:L29 | neighbors=[carousel.tsx]
- "ui_carousel_carouselcontextprops": "CarouselContextProps" | kind=code-symbol | source=src/components/ui/carousel.tsx:L20 | neighbors=[carousel.tsx]
- "ui_carousel_carouselitem": "CarouselItem" | kind=code-symbol | source=src/components/ui/carousel.tsx:L156 | neighbors=[carousel.tsx]
- "ui_carousel_carouselnext": "CarouselNext" | kind=code-symbol | source=src/components/ui/carousel.tsx:L205 | neighbors=[carousel.tsx]
- "ui_carousel_carouseloptions": "CarouselOptions" | kind=code-symbol | source=src/components/ui/carousel.tsx:L10 | neighbors=[carousel.tsx]
- "ui_carousel_carouselplugin": "CarouselPlugin" | kind=code-symbol | source=src/components/ui/carousel.tsx:L11 | neighbors=[carousel.tsx]
- "ui_carousel_carouselprevious": "CarouselPrevious" | kind=code-symbol | source=src/components/ui/carousel.tsx:L177 | neighbors=[carousel.tsx]
- "ui_carousel_carouselprops": "CarouselProps" | kind=code-symbol | source=src/components/ui/carousel.tsx:L13 | neighbors=[carousel.tsx]
- "ui_carousel_usecarousel": "useCarousel()" | kind=code-symbol | source=src/components/ui/carousel.tsx:L31 | neighbors=[carousel.tsx]
- "ui_carousel_usecarouselparameters": "UseCarouselParameters" | kind=code-symbol | source=src/components/ui/carousel.tsx:L9 | neighbors=[carousel.tsx]
- "ui_chart_chartconfig": "ChartConfig" | kind=code-symbol | source=src/components/ui/chart.tsx:L9 | neighbors=[chart.tsx]
- "ui_chart_chartcontainer": "ChartContainer" | kind=code-symbol | source=src/components/ui/chart.tsx:L35 | neighbors=[chart.tsx]
- "ui_chart_chartcontext": "ChartContext" | kind=code-symbol | source=src/components/ui/chart.tsx:L23 | neighbors=[chart.tsx]
- "ui_chart_chartcontextprops": "ChartContextProps" | kind=code-symbol | source=src/components/ui/chart.tsx:L19 | neighbors=[chart.tsx]
- "ui_chart_chartlegendcontent": "ChartLegendContent" | kind=code-symbol | source=src/components/ui/chart.tsx:L243 | neighbors=[chart.tsx]
- "ui_chart_chartstyle": "ChartStyle()" | kind=code-symbol | source=src/components/ui/chart.tsx:L64 | neighbors=[chart.tsx]
- "ui_chart_charttooltipcontent": "ChartTooltipContent" | kind=code-symbol | source=src/components/ui/chart.tsx:L95 | neighbors=[chart.tsx]
- "ui_chart_getpayloadconfigfrompayload": "getPayloadConfigFromPayload()" | kind=code-symbol | source=src/components/ui/chart.tsx:L299 | neighbors=[chart.tsx]
- "ui_chart_themes": "THEMES" | kind=code-symbol | source=src/components/ui/chart.tsx:L7 | neighbors=[chart.tsx]
- "ui_chart_usechart": "useChart()" | kind=code-symbol | source=src/components/ui/chart.tsx:L25 | neighbors=[chart.tsx]
- "ui_checkbox_checkbox": "Checkbox" | kind=code-symbol | source=src/components/ui/checkbox.tsx:L7 | neighbors=[checkbox.tsx]
- "ui_command_command": "Command" | kind=code-symbol | source=src/components/ui/command.tsx:L11 | neighbors=[command.tsx]
- "ui_command_commanddialog": "CommandDialog()" | kind=code-symbol | source=src/components/ui/command.tsx:L26 | neighbors=[command.tsx]
- "ui_command_commandempty": "CommandEmpty" | kind=code-symbol | source=src/components/ui/command.tsx:L70 | neighbors=[command.tsx]
- "ui_command_commandgroup": "CommandGroup" | kind=code-symbol | source=src/components/ui/command.tsx:L79 | neighbors=[command.tsx]
- "ui_command_commandinput": "CommandInput" | kind=code-symbol | source=src/components/ui/command.tsx:L38 | neighbors=[command.tsx]
- "ui_command_commanditem": "CommandItem" | kind=code-symbol | source=src/components/ui/command.tsx:L107 | neighbors=[command.tsx]
- "ui_command_commandlist": "CommandList" | kind=code-symbol | source=src/components/ui/command.tsx:L57 | neighbors=[command.tsx]
- "ui_command_commandseparator": "CommandSeparator" | kind=code-symbol | source=src/components/ui/command.tsx:L95 | neighbors=[command.tsx]
- "ui_command_commandshortcut": "CommandShortcut()" | kind=code-symbol | source=src/components/ui/command.tsx:L123 | neighbors=[command.tsx]
- "ui_context_menu_contextmenucheckboxitem": "ContextMenuCheckboxItem" | kind=code-symbol | source=src/components/ui/context-menu.tsx:L90 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenucontent": "ContextMenuContent" | kind=code-symbol | source=src/components/ui/context-menu.tsx:L55 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenuitem": "ContextMenuItem" | kind=code-symbol | source=src/components/ui/context-menu.tsx:L72 | neighbors=[context-menu.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-027.json

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
