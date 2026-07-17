# Node Description Batch 35 of 35

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
- "migrations_20260523183958_4e926af8_8fa7_4dc2_9067_5b7dd7cd2ec1": "20260523183958_4e926af8-8fa7-4dc2-9067-5b7dd7cd2ec1.sql" | kind=code-symbol | source=supabase/migrations/20260523183958_4e926af8-8fa7-4dc2-9067-5b7dd7cd2ec1.sql:L1
- "migrations_20260523211545_420d64f5_a49b_4927_acc4_a86c972115a1": "20260523211545_420d64f5-a49b-4927-acc4-a86c972115a1.sql" | kind=code-symbol | source=supabase/migrations/20260523211545_420d64f5-a49b-4927-acc4-a86c972115a1.sql:L1
- "migrations_20260523221752_c080e1a1_411c_4668_a60e_b2cc7a356a1d": "20260523221752_c080e1a1-411c-4668-a60e-b2cc7a356a1d.sql" | kind=code-symbol | source=supabase/migrations/20260523221752_c080e1a1-411c-4668-a60e-b2cc7a356a1d.sql:L1
- "migrations_20260523223714_ac0e82da_3a19_4ef9_a41e_91e875e01193": "20260523223714_ac0e82da-3a19-4ef9-a41e-91e875e01193.sql" | kind=code-symbol | source=supabase/migrations/20260523223714_ac0e82da-3a19-4ef9-a41e-91e875e01193.sql:L1
- "ui_aspect_ratio": "aspect-ratio.tsx" | kind=code-symbol | source=src/components/ui/aspect-ratio.tsx:L1
- "ui_collapsible": "collapsible.tsx" | kind=code-symbol | source=src/components/ui/collapsible.tsx:L1

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-034.json

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
