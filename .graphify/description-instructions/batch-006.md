# Node Description Batch 7 of 46

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b7f53d69bb6adf8cd388a415864d0313e42e9634": "b7f53d6 Changes" | kind=Commit | source=git | neighbors=[b574d27 Changes, portal.tsx, main, 00d6931 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@be0f1fba11d8da2783065c1e6090ac5b564012f8": "be0f1fb Lovable update" | kind=Commit | source=git | neighbors=[27cb157 Work in progress, 825b6d5 Logo teruggezet naar vorige ver…, main, 260e9c9 Change Supabase project credent…, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c07aca608f1343df3fe373eff1dc908efe96a824": "c07aca6 Changes" | kind=Commit | source=git | neighbors=[main, 9765b29 Home widget keuzemodel toegevoe…, routeTree.gen.ts, dc274b5 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c0b2317d3fa0d7fda838ecbd2f4ec8ef06f35700": "c0b2317 Changes" | kind=Commit | source=git | neighbors=[38037d9 Update Hero.tsx, main, 97e70ec Changes, __root.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c3627b5ca34c14daf9f18452bf3dc46e97f05af9": "c3627b5 Changes" | kind=Commit | source=git | neighbors=[bf0cfa4 Fixed security scan issues, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c4314369e053ae0d3b423391ebb79eb9414ae20f": "c431436 footer tekst weer anders" | kind=Commit | source=git | neighbors=[2d7a8d4 teksr wijzigingen, main, 6aba49e euro teken, Footer.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c748c8932d8aa5c4ab46f6d2ddc38a6d093e7498": "c748c89 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c7e76b23dc638cce75b9b4413c728baea44238a6": "c7e76b2 Revert \"Merge project detail pages (admin + klantenportaal)\"" | kind=Commit | source=git | neighbors=[30d7c60 Merge project detail pages (adm…, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d48443cd34024ed81e5fc794305b56420d291383": "d48443c Changes" | kind=Commit | source=git | neighbors=[2770cdb Changes, portal.tsx, main, b574d27 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d52ba14522c4f91f8d9302a00963357017ba97af": "d52ba14 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, 0b21971 Changes weergave verbeterd, f9e4bcf Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d60b2ed6e48b7353a4f5988e6692c98802a7c22e": "d60b2ed Changes" | kind=Commit | source=git | neighbors=[c748c89 Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d8e3e57568c02bdb8e19081bda20fdae1f2c8805": "d8e3e57 Work in progress" | kind=Commit | source=git | neighbors=[cf4ac91 Alle fases toegevoegd & cron re…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dc274b55adda1324d8263ecea51661df941faa46": "dc274b5 Changes" | kind=Commit | source=git | neighbors=[9d59757 Afspraakpagina toegevoegd, main, c07aca6 Changes, Contact.tsx, tmp-main-merge, tmp-revert-main] | lang=en
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
- "components_idletimeout": "IdleTimeout.tsx" | kind=code-symbol | source=src/components/IdleTimeout.tsx:L1 | neighbors=[9a2689c code fixes, ACTIVITY_EVENTS, IdleTimeout(), alert-dialog.tsx, AlertDialogAction, AlertDialogContent] | lang=en
- "components_processtimeline": "ProcessTimeline.tsx" | kind=code-symbol | source=src/components/ProcessTimeline.tsx:L1 | neighbors=[129b916 manier van werken, 6262799 fixes, 85a6666 SEO en robot, 8fdd571 SEO, 9a2689c code fixes, ecdbe8e fixes] | lang=en
- "hooks_use_permissions": "use-permissions.tsx" | kind=code-symbol | source=src/hooks/use-permissions.tsx:L1 | neighbors=[admin.tsx, admin.leads.tsx, server.tsx, 81a87ed commit, BerichtenTab.tsx, DeletedChangesTab.tsx] | lang=en
- "lib_callbacks": "callbacks.ts" | kind=code-symbol | source=src/lib/callbacks.ts:L1 | neighbors=[f958216 leads functions, CallbackAgenda.tsx, CallbackScheduleModal.tsx, AGENDA_COLOR_CLASSES, AgendaColor, CALLBACK_OUTCOMES] | lang=en
- "lib_csv": "csv.ts" | kind=code-symbol | source=src/lib/csv.ts:L1 | neighbors=[74ecdc1 code fixes, c480d2e leads, LeadsPanel.tsx, CsvParseResult, detectDelimiter(), HEADER_ALIASES] | lang=en
- "migrations_20260523190624_1b6c9585_e5a9_4c6a_a6fb_569a456bccaf": "20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql" | kind=code-symbol | source=supabase/migrations/20260523190624_1b6c9585-e5a9-4c6a-a6fb-569a456bccaf.sql:L1 | neighbors=[auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs] | lang=en
- "routes_login": "login.tsx" | kind=code-symbol | source=src/routes/login.tsx:L1 | neighbors=[04c01f8 SEO, 2b1d78f telegram, 6b21362 Catch login network errors inst…, 8fdd571 SEO, seo.ts, LoginPage()] | lang=en
- "routes_website_laten_maken_assen": "website-laten-maken-assen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-assen.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en

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
