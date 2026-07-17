# Node Description Batch 6 of 35

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@95b52753579c4b90283b539f8c822770ab08f569": "95b5275 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9611f091027f65224987068ff4f1789a6bd4fde1": "9611f09 Changes" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@978e28876c072c01f91c23d639d9bec55bfab18e": "978e288 Changes" | kind=Commit | source=git | neighbors=[422202c Made the requested updates, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9827b2f256ef0f8893a8883341b55d50ced22a96": "9827b2f Changes" | kind=Commit | source=git | neighbors=[9611f09 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@99450d7635f335cbc90f6cc2f7db94f8eea736bd": "99450d7 Fix typo in Hero component text 2" | kind=Commit | source=git | neighbors=[38037d9 Update Hero.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9c4f5d59d7aaee8742a75ce6ef4159e4cd297482": "9c4f5d5 nummers verwijderd" | kind=Commit | source=git | neighbors=[6aba49e euro teken, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9f689f765315a425413d8b8e88445aebcf7c9a5c": "9f689f7 tracking voor user M" | kind=Commit | source=git | neighbors=[129b916 manier van werken, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a11075959148ee41dbd0fd64057e80ac25a771e7": "a110759 Work in progress" | kind=Commit | source=git | neighbors=[0b21971 Changes weergave verbeterd, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a4fa2cf4d68d63e3b7ed9217a876e7fff63b058b": "a4fa2cf Work in progress" | kind=Commit | source=git | neighbors=[3d42113 Kleurproblemen opgeholzen, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a8375281beebe589a5e4a6f040eeead6fae497ab": "a837528 bug fixes" | kind=Commit | source=git | neighbors=[6500c48 bug fixes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a8b31df30e0052d246cfb047819739257dac82e9": "a8b31df Changes" | kind=Commit | source=git | neighbors=[admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ad950dd3bd93400aa56c67e7a37c7fad5176f47c": "ad950dd Changes" | kind=Commit | source=git | neighbors=[41d8eb5 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ae858bb1d86994963f4ba6ccba2a4eeecbd971c8": "ae858bb Changes" | kind=Commit | source=git | neighbors=[95b5275 Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b0eef5e760ef12f76b52b2003143bc255855db8f": "b0eef5e Changes" | kind=Commit | source=git | neighbors=[3650c07 Changes, admin.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b51540025e5419b4dfc6532611f3be55b93cd511": "b515400 Redesign: warm licht thema, ink blauw accent, Syne headings" | kind=Commit | source=git | neighbors=[main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b574d276dc1489e682651698a4f2f10e5f5cc2ac": "b574d27 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b7647ca231efaa0b8334732ace2c362ff251c985": "b7647ca Changes" | kind=Commit | source=git | neighbors=[5d704cb Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b7f53d69bb6adf8cd388a415864d0313e42e9634": "b7f53d6 Changes" | kind=Commit | source=git | neighbors=[b574d27 Changes, portal.tsx, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-005.json

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
