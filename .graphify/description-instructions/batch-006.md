# Node Description Batch 7 of 40

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b927a97079509c58c6fc410856844221c543a1de": "b927a97 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@be0f1fba11d8da2783065c1e6090ac5b564012f8": "be0f1fb Lovable update" | kind=Commit | source=git | neighbors=[27cb157 Work in progress, 825b6d5 Logo teruggezet naar vorige ver…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c07aca608f1343df3fe373eff1dc908efe96a824": "c07aca6 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c0b2317d3fa0d7fda838ecbd2f4ec8ef06f35700": "c0b2317 Changes" | kind=Commit | source=git | neighbors=[38037d9 Update Hero.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c4314369e053ae0d3b423391ebb79eb9414ae20f": "c431436 footer tekst weer anders" | kind=Commit | source=git | neighbors=[2d7a8d4 teksr wijzigingen, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c748c8932d8aa5c4ab46f6d2ddc38a6d093e7498": "c748c89 Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c7e76b23dc638cce75b9b4413c728baea44238a6": "c7e76b2 Revert \"Merge project detail pages (admin + klantenportaal)\"" | kind=Commit | source=git | neighbors=[30d7c60 Merge project detail pages (adm…, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c9908b925aca58a7df19b9b68a89204575c0a354": "c9908b9 Changes" | kind=Commit | source=git | neighbors=[6dc7740 Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d48443cd34024ed81e5fc794305b56420d291383": "d48443c Changes" | kind=Commit | source=git | neighbors=[2770cdb Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d52ba14522c4f91f8d9302a00963357017ba97af": "d52ba14 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d60b2ed6e48b7353a4f5988e6692c98802a7c22e": "d60b2ed Changes" | kind=Commit | source=git | neighbors=[c748c89 Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@d8e3e57568c02bdb8e19081bda20fdae1f2c8805": "d8e3e57 Work in progress" | kind=Commit | source=git | neighbors=[cf4ac91 Alle fases toegevoegd & cron re…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dc274b55adda1324d8263ecea51661df941faa46": "dc274b5 Changes" | kind=Commit | source=git | neighbors=[9d59757 Afspraakpagina toegevoegd, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@dd0d069a00855388fe798fd1a7e55830918bdd32": "dd0d069 Changes" | kind=Commit | source=git | neighbors=[c3627b5 Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@de7fb47ac4177863fbdc73035a7c3f4a467c0c5d": "de7fb47 Wijzig prijzen: Starter €499, Pro €750" | kind=Commit | source=git | neighbors=[b9ed97e Gebruik getSession() voor auth …, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@df16e8400059578ecde8314c62d9c152270ef7f2": "df16e84 Changes" | kind=Commit | source=git | neighbors=[5820182 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@df1c05d06f132dd79cdfebb551facd0c7e456743": "df1c05d Changes" | kind=Commit | source=git | neighbors=[282fc41 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e6fbbec0493ba2f7136608281f27571ba14ba958": "e6fbbec Changes" | kind=Commit | source=git | neighbors=[3ee5ecb Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e810b38d7162721ad9ed35ac36ed8e01719f88d6": "e810b38 Changes" | kind=Commit | source=git | neighbors=[ad950dd Changes, admin.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@e8bc1c3ebcf8f44588939a9dbf466b7357b20b90": "e8bc1c3 Changes" | kind=Commit | source=git | neighbors=[408d241 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ea845f437b1bba262dea3e254841e2164363ec6b": "ea845f4 Changes" | kind=Commit | source=git | neighbors=[dd0d069 Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ec6c394c095bfc4b63c245d126b2a1c45256eabe": "ec6c394 Fix typo in Hero component text" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f099d92d74bba337e0ab1a935f9073110bd0746a": "f099d92 Changes" | kind=Commit | source=git | neighbors=[a8b31df Changes, admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f0dfd240ec8d8b6be6d448066bba02c3167b78bd": "f0dfd24 Services: interactief tab-panel a la Giga.ai" | kind=Commit | source=git | neighbors=[965b87a Fix foto, nav animaties, portal…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f24ecdb825f21afef199789efb50d2b531a53d9f": "f24ecdb Change server preset from 'bun' to 'node-server'" | kind=Commit | source=git | neighbors=[e0af60e Update package.json, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f263aebb5eb57cc356769f2699c16ba0c9c058fe": "f263aeb Update text in Hero component" | kind=Commit | source=git | neighbors=[4c798fc Code edited in Lovable Code Edi…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f32700a606ceb1b595f26a5598e5d7db4c9da993": "f32700a Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@f9e4bcf532d82fb67f8f830cafb241014d20dd1f": "f9e4bcf Changes" | kind=Commit | source=git | neighbors=[0d60453 Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fb1c670fc9159c6d72de0ce53227e1ba130b7e7f": "fb1c670 Changes" | kind=Commit | source=git | neighbors=[ab14295 Design overhauled, A11y-bar weg, account.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fc5a347b0ae96f688eb824d5c81250fe839fba25": "fc5a347 Changes" | kind=Commit | source=git | neighbors=[e8bc1c3 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fd049dcd858567e6a8441126f9959c5616dcdb9e": "fd049dc Changes" | kind=Commit | source=git | neighbors=[f32700a Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe54e439bab146978cab37d3da8487cace37b71c": "fe54e43 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[273dbce Code edited in Lovable Code Edi…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@fe58e74f4e11df12e00354190618fb071148ee4d": "fe58e74 Update vite.config.ts" | kind=Commit | source=git | neighbors=[260e9c9 Change Supabase project credent…, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "components_adminchatpanel": "AdminChatPanel.tsx" | kind=code-symbol | source=src/components/AdminChatPanel.tsx:L1 | neighbors=[admin.tsx, 7443b54 Fix root cause: catch Supabase …, 7dbbf18 perf fixes, c3a6178 portal changes, f2eb4fe Fix root cause: catch Supabase …, AdminChatPanel()] | lang=en
- "lib_accounts_server": "accounts.server.ts" | kind=code-symbol | source=src/lib/accounts.server.ts:L1 | neighbors=[7dbbf18 perf fixes, 81a87ed commit, 99bd8ac Surface site_errors in the acco…, 9e611dd Changes, bbc9d80 Surface site_errors in the acco…, cf4ac91 Alle fases toegevoegd & cron re…] | lang=en
- "lib_auth_guards_server": "auth-guards.server.ts" | kind=code-symbol | source=src/lib/auth-guards.server.ts:L1 | neighbors=[74ecdc1 code fixes, ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()] | lang=en
- "supabase_client_supabase": "supabase" | kind=code-symbol | source=src/integrations/supabase/client.ts:L34 | neighbors=[admin.tsx, admin.accounts.tsx, portal.tsx, AdminChatPanel.tsx, ChatWidget.tsx, use-auth.tsx] | lang=en
- "ui_table": "table.tsx" | kind=code-symbol | source=src/components/ui/table.tsx:L1 | neighbors=[utils.ts, cn(), Table, TableBody, TableCaption, TableCell] | lang=en
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, admin.changes.$changeId.tsx, admin.projecten.$projectId.tsx, admin.rollen.$roleId.tsx, portal.projecten.$projectId.tsx, utils.ts] | lang=en
- "vite_config": "vite.config.ts" | kind=code-symbol | source=vite.config.ts:L1 | neighbors=[332d0c8 Fix: externalize googleapis/nod…, 4510b3f perf fixes, 7dbbf18 perf fixes, 821a216 Update vite.config.ts, 85a6666 SEO en robot, 9d0b477 perf fixes] | lang=en

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
