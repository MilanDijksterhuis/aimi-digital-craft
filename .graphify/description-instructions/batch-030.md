# Node Description Batch 31 of 36

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

- "ui_alert_alerttitle": "AlertTitle" | kind=code-symbol | source=src/components/ui/alert.tsx:L30 | neighbors=[alert.tsx]
- "ui_alert_alertvariants": "alertVariants" | kind=code-symbol | source=src/components/ui/alert.tsx:L6 | neighbors=[alert.tsx]
- "ui_alert_dialog_alertdialogoverlay": "AlertDialogOverlay" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L13 | neighbors=[alert-dialog.tsx]
- "ui_avatar_avatar": "Avatar" | kind=code-symbol | source=src/components/ui/avatar.tsx:L8 | neighbors=[avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback" | kind=code-symbol | source=src/components/ui/avatar.tsx:L32 | neighbors=[avatar.tsx]
- "ui_avatar_avatarimage": "AvatarImage" | kind=code-symbol | source=src/components/ui/avatar.tsx:L20 | neighbors=[avatar.tsx]
- "ui_badge_badgeprops": "BadgeProps" | kind=code-symbol | source=src/components/ui/badge.tsx:L25 | neighbors=[badge.tsx]
- "ui_breadcrumb_breadcrumb": "Breadcrumb" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L7 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbellipsis": "BreadcrumbEllipsis()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L80 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbitem": "BreadcrumbItem" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L29 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblink": "BreadcrumbLink" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L36 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblist": "BreadcrumbList" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L15 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbpage": "BreadcrumbPage" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L54 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbseparator": "BreadcrumbSeparator()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L68 | neighbors=[breadcrumb.tsx]
- "ui_calendar_calendar": "Calendar()" | kind=code-symbol | source=src/components/ui/calendar.tsx:L10 | neighbors=[calendar.tsx]
- "ui_calendar_calendardaybutton": "CalendarDayButton()" | kind=code-symbol | source=src/components/ui/calendar.tsx:L139 | neighbors=[calendar.tsx]
- "ui_card_card": "Card" | kind=code-symbol | source=src/components/ui/card.tsx:L5 | neighbors=[card.tsx]
- "ui_card_cardcontent": "CardContent" | kind=code-symbol | source=src/components/ui/card.tsx:L41 | neighbors=[card.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-030.json

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
