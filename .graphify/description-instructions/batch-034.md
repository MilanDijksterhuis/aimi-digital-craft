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
