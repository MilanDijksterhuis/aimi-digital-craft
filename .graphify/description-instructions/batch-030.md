# Node Description Batch 31 of 34

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

- "ui_context_menu_contextmenusubtrigger": "ContextMenuSubTrigger" | kind=code-symbol | source=src/components/ui/context-menu.tsx:L19 | neighbors=[context-menu.tsx]
- "ui_dialog_dialogdescription": "DialogDescription" | kind=code-symbol | source=src/components/ui/dialog.tsx:L81 | neighbors=[dialog.tsx]
- "ui_dialog_dialogfooter": "DialogFooter()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L61 | neighbors=[dialog.tsx]
- "ui_dialog_dialogheader": "DialogHeader()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L56 | neighbors=[dialog.tsx]
- "ui_dialog_dialogoverlay": "DialogOverlay" | kind=code-symbol | source=src/components/ui/dialog.tsx:L17 | neighbors=[dialog.tsx]
- "ui_dialog_dialogtitle": "DialogTitle" | kind=code-symbol | source=src/components/ui/dialog.tsx:L69 | neighbors=[dialog.tsx]
- "ui_drawer_drawer": "Drawer()" | kind=code-symbol | source=src/components/ui/drawer.tsx:L6 | neighbors=[drawer.tsx]
- "ui_drawer_drawercontent": "DrawerContent" | kind=code-symbol | source=src/components/ui/drawer.tsx:L32 | neighbors=[drawer.tsx]
- "ui_drawer_drawerdescription": "DrawerDescription" | kind=code-symbol | source=src/components/ui/drawer.tsx:L75 | neighbors=[drawer.tsx]
- "ui_drawer_drawerfooter": "DrawerFooter()" | kind=code-symbol | source=src/components/ui/drawer.tsx:L58 | neighbors=[drawer.tsx]
- "ui_drawer_drawerheader": "DrawerHeader()" | kind=code-symbol | source=src/components/ui/drawer.tsx:L53 | neighbors=[drawer.tsx]
- "ui_drawer_draweroverlay": "DrawerOverlay" | kind=code-symbol | source=src/components/ui/drawer.tsx:L20 | neighbors=[drawer.tsx]
- "ui_drawer_drawertitle": "DrawerTitle" | kind=code-symbol | source=src/components/ui/drawer.tsx:L63 | neighbors=[drawer.tsx]
- "ui_dropdown_menu_dropdownmenucheckboxitem": "DropdownMenuCheckboxItem" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L94 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenucontent": "DropdownMenuContent" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L57 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuitem": "DropdownMenuItem" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L76 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenulabel": "DropdownMenuLabel" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L139 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradioitem": "DropdownMenuRadioItem" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L117 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L153 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenushortcut": "DropdownMenuShortcut()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L165 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubcontent": "DropdownMenuSubContent" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L42 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubtrigger": "DropdownMenuSubTrigger" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L21 | neighbors=[dropdown-menu.tsx]
- "ui_form_formcontrol": "FormControl" | kind=code-symbol | source=src/components/ui/form.tsx:L103 | neighbors=[form.tsx]
- "ui_form_formdescription": "FormDescription" | kind=code-symbol | source=src/components/ui/form.tsx:L121 | neighbors=[form.tsx]
- "ui_form_formfield": "FormField()" | kind=code-symbol | source=src/components/ui/form.tsx:L27 | neighbors=[form.tsx]
- "ui_form_formfieldcontext": "FormFieldContext" | kind=code-symbol | source=src/components/ui/form.tsx:L25 | neighbors=[form.tsx]
- "ui_form_formfieldcontextvalue": "FormFieldContextValue" | kind=code-symbol | source=src/components/ui/form.tsx:L18 | neighbors=[form.tsx]
- "ui_form_formitem": "FormItem" | kind=code-symbol | source=src/components/ui/form.tsx:L73 | neighbors=[form.tsx]
- "ui_form_formitemcontext": "FormItemContext" | kind=code-symbol | source=src/components/ui/form.tsx:L71 | neighbors=[form.tsx]
- "ui_form_formitemcontextvalue": "FormItemContextValue" | kind=code-symbol | source=src/components/ui/form.tsx:L67 | neighbors=[form.tsx]
- "ui_form_formlabel": "FormLabel" | kind=code-symbol | source=src/components/ui/form.tsx:L86 | neighbors=[form.tsx]
- "ui_form_formmessage": "FormMessage" | kind=code-symbol | source=src/components/ui/form.tsx:L138 | neighbors=[form.tsx]
- "ui_form_useformfield": "useFormField()" | kind=code-symbol | source=src/components/ui/form.tsx:L40 | neighbors=[form.tsx]
- "ui_hover_card_hovercardcontent": "HoverCardContent" | kind=code-symbol | source=src/components/ui/hover-card.tsx:L10 | neighbors=[hover-card.tsx]
- "ui_input_otp_inputotp": "InputOTP" | kind=code-symbol | source=src/components/ui/input-otp.tsx:L7 | neighbors=[input-otp.tsx]
- "ui_input_otp_inputotpgroup": "InputOTPGroup" | kind=code-symbol | source=src/components/ui/input-otp.tsx:L23 | neighbors=[input-otp.tsx]
- "ui_input_otp_inputotpseparator": "InputOTPSeparator" | kind=code-symbol | source=src/components/ui/input-otp.tsx:L59 | neighbors=[input-otp.tsx]
- "ui_input_otp_inputotpslot": "InputOTPSlot" | kind=code-symbol | source=src/components/ui/input-otp.tsx:L31 | neighbors=[input-otp.tsx]
- "ui_label_labelvariants": "labelVariants" | kind=code-symbol | source=src/components/ui/label.tsx:L9 | neighbors=[label.tsx]
- "ui_menubar_menubar": "Menubar" | kind=code-symbol | source=src/components/ui/menubar.tsx:L27 | neighbors=[menubar.tsx]

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
