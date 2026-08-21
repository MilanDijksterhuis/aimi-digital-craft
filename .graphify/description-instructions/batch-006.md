# Node Description Batch 7 of 43

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dd0d069a00855388fe798fd1a7e55830918bdd32": "dd0d069 Changes" | kind=Commit | source=git | neighbors=[c3627b5 Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@de7fb47ac4177863fbdc73035a7c3f4a467c0c5d": "de7fb47 Wijzig prijzen: Starter €499, Pro €750" | kind=Commit | source=git | neighbors=[b9ed97e Gebruik getSession() voor auth …, main, cdd7702 Voeg FAQ toe, Hosting Only serv…, Pricing.tsx, tmp-main-merge, tmp-revert-main] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@df16e8400059578ecde8314c62d9c152270ef7f2": "df16e84 Changes" | kind=Commit | source=git | neighbors=[5820182 Changes, main, 0332090 Changes, index.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@df1c05d06f132dd79cdfebb551facd0c7e456743": "df1c05d Changes" | kind=Commit | source=git | neighbors=[282fc41 Changes, main, 7eafc83 Changes, Contact.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e810b38d7162721ad9ed35ac36ed8e01719f88d6": "e810b38 Changes" | kind=Commit | source=git | neighbors=[ad950dd Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e8bc1c3ebcf8f44588939a9dbf466b7357b20b90": "e8bc1c3 Changes" | kind=Commit | source=git | neighbors=[408d241 Changes, main, fc5a347 Changes, index.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ea845f437b1bba262dea3e254841e2164363ec6b": "ea845f4 Changes" | kind=Commit | source=git | neighbors=[dd0d069 Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ec6c394c095bfc4b63c245d126b2a1c45256eabe": "ec6c394 Fix typo in Hero component text" | kind=Commit | source=git | neighbors=[main, 38037d9 Update Hero.tsx, Hero.tsx, f263aeb Update text in Hero component, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f0dfd240ec8d8b6be6d448066bba02c3167b78bd": "f0dfd24 Services: interactief tab-panel a la Giga.ai" | kind=Commit | source=git | neighbors=[965b87a Fix foto, nav animaties, portal…, main, 00e2564 voorwaaren en privacy, Services.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f24ecdb825f21afef199789efb50d2b531a53d9f": "f24ecdb Change server preset from 'bun' to 'node-server'" | kind=Commit | source=git | neighbors=[e0af60e Update package.json, main, ee1b8ae Change start script from bun to…, vite.config.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f263aebb5eb57cc356769f2699c16ba0c9c058fe": "f263aeb Update text in Hero component" | kind=Commit | source=git | neighbors=[4c798fc Code edited in Lovable Code Edi…, main, ec6c394 Fix typo in Hero component text, Hero.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f32700a606ceb1b595f26a5598e5d7db4c9da993": "f32700a Changes" | kind=Commit | source=git | neighbors=[main, fd049dc Changes, Nav.tsx, fc5a347 Changes, tmp-main-merge, tmp-revert-main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f9e4bcf532d82fb67f8f830cafb241014d20dd1f": "f9e4bcf Changes" | kind=Commit | source=git | neighbors=[0d60453 Changes, portal.tsx, main, d52ba14 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fc5a347b0ae96f688eb824d5c81250fe839fba25": "fc5a347 Changes" | kind=Commit | source=git | neighbors=[e8bc1c3 Changes, main, f32700a Changes, index.tsx, tmp-main-merge, tmp-revert-main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fd049dcd858567e6a8441126f9959c5616dcdb9e": "fd049dc Changes" | kind=Commit | source=git | neighbors=[f32700a Changes, main, d42e3c5 Logo toegevoegd aan site, Nav.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe54e439bab146978cab37d3da8487cace37b71c": "fe54e43 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[273dbce Code edited in Lovable Code Edi…, main, 1dfd3b7 Code edited in Lovable Code Edi…, Hero.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe58e74f4e11df12e00354190618fb071148ee4d": "fe58e74 Update vite.config.ts" | kind=Commit | source=git | neighbors=[260e9c9 Change Supabase project credent…, main, e0af60e Update package.json, vite.config.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "components_chatwidget": "ChatWidget.tsx" | kind=code-symbol | source=src/components/ChatWidget.tsx:L1 | neighbors=[portal.tsx, 37c0d11 Dock tokens toegevoegd & emojis…, 97e70ec Changes, 9a2689c code fixes, f2eb4fe Fix root cause: catch Supabase …, fc7da2d animaties en paginas] | lang=en
- "components_deletedchangestab": "DeletedChangesTab.tsx" | kind=code-symbol | source=src/components/DeletedChangesTab.tsx:L1 | neighbors=[admin.tsx, 37c0d11 Dock tokens toegevoegd & emojis…, 97e70ec Changes, 9a2689c code fixes, ConfirmDialog.tsx, useConfirm()] | lang=en
- "components_footer_footer": "Footer()" | kind=code-symbol | source=src/components/Footer.tsx:L41 | neighbors=[Footer.tsx, LocationLanding.tsx, ServicePage.tsx, algemene-voorwaarden.tsx, contact.tsx, faq.tsx] | lang=en
- "components_idletimeout": "IdleTimeout.tsx" | kind=code-symbol | source=src/components/IdleTimeout.tsx:L1 | neighbors=[9a2689c code fixes, ACTIVITY_EVENTS, IdleTimeout(), alert-dialog.tsx, AlertDialogAction, AlertDialogContent] | lang=en
- "hooks_use_permissions": "use-permissions.tsx" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L1 | neighbors=[admin.tsx, admin.leads.tsx, server.tsx, 81a87ed commit, BerichtenTab.tsx, DeletedChangesTab.tsx] | lang=en
- "lib_callbacks": "callbacks.ts" | kind=code-symbol | source=src/lib/callbacks.ts:L1 | neighbors=[f958216 leads functions, CallbackAgenda.tsx, CallbackScheduleModal.tsx, AGENDA_COLOR_CLASSES, AgendaColor, CALLBACK_OUTCOMES] | lang=en
- "lib_csv": "csv.ts" | kind=code-symbol | source=src/lib/csv.ts:L1 | neighbors=[74ecdc1 code fixes, c480d2e leads, LeadsPanel.tsx, CsvParseResult, detectDelimiter(), HEADER_ALIASES] | lang=en
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf": "20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L1 | neighbors=[auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs] | lang=en
- "supabase_migration": "supabase-migration.sql" | kind=code-symbol | source=supabase-migration.sql:L1 | neighbors=[39d363a server basic, 6500c48 bug fixes, 8c0bb37 nieuwe featues, dns_checks, monitoring_alerts, profiles] | lang=en
- "ui_button": "button.tsx" | kind=code-symbol | source=src/components/ui/button.tsx:L1 | neighbors=[ConfirmDialog.tsx, alert-dialog.tsx, utils.ts, cn(), Button, ButtonProps] | lang=en
- "ui_context_menu": "context-menu.tsx" | kind=code-symbol | source=src/components/ui/context-menu.tsx:L1 | neighbors=[utils.ts, cn(), ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel] | lang=en
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L1 | neighbors=[utils.ts, cn(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel] | lang=en
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=src/components/ui/sheet.tsx:L1 | neighbors=[utils.ts, cn(), SheetContent, SheetContentProps, SheetDescription, SheetFooter()] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@0bb190079d2e688ac5c6509fa1320297710be919": "0bb1900 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, 67a9525 Code edited in Lovable Code Edi…, 36052ff Code edited in Lovable Code Edi…, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@1514d2bbfc7f74d75e4721689429497adf3b47cd": "1514d2b Changes" | kind=Commit | source=git | neighbors=[main, 879bad8 Handoff doc gemaakt, 7842118 Prijs wijzing 499, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@15acc2a9d40ccb35653a5d2f6901e310d0b3b1ca": "15acc2a Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@171c22aa4bca82b2edf127606b28ff594254c336": "171c22a Changes" | kind=Commit | source=git | neighbors=[main, 779aebc Nieuwe Lottielab-look toegepast, ec62d9f Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@204f17ad5afdc3852c25f15b43b940b6aef210ce": "204f17a Changes" | kind=Commit | source=git | neighbors=[main, 79f7d0a Changes, a4fa2cf Work in progress, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@260e9c978539c62213fcdc3fdcfca62f7ddf5a15": "260e9c9 Change Supabase project credentials in .env" | kind=Commit | source=git | neighbors=[main, fe58e74 Update vite.config.ts, be0f1fb Lovable update, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@27cb157f5430c73e002efd82ccf760288f226429": "27cb157 Work in progress" | kind=Commit | source=git | neighbors=[main, be0f1fb Lovable update, 825b6d5 Logo teruggezet naar vorige ver…, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3650c07d53450b3415e2cb1851b84def4d8d01a5": "3650c07 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3b65b5f4c51b80d08860b192ea29b51657c0d5b2": "3b65b5f Changes" | kind=Commit | source=git | neighbors=[main, 020d807 Changes, 94c1dcf Work in progress, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@3ca59a09c52ac7cff9951384b0b83e8e9681f8d6": "3ca59a0 Changes" | kind=Commit | source=git | neighbors=[15acc2a Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-006.json

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
