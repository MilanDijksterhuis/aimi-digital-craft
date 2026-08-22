# Node Description Batch 6 of 46

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

- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@482bba9cb2c181cf7403b1f739b26ada40bf6193": "482bba9 Work in progress" | kind=Commit | source=git | neighbors=[main, 7476011 Changes, routeTree.gen.ts, d42e3c5 Logo toegevoegd aan site, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4c798fc1ce090c83a95e407e8bacec7aa22139f1": "4c798fc Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[main, f263aeb Update text in Hero component, Hero.tsx, 67a9525 Code edited in Lovable Code Edi…, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@4c90153509b8a1b3c03687c1298757482bad88ee": "4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx, main, 7f7208a new] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@500f7185ddce5d62be5309d2dca2197d8ff0e17d": "500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digita…" | kind=Commit | source=git | neighbors=[2d50590 wip: lokale wijzigingen voor pu…, 30d7c60 Merge project detail pages (adm…, admin.tsx, admin.projecten.$projectId.tsx, portal.tsx, portal.projecten.$projectId.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@538314ce27a970515a5aa0ef9a6b3821d89c78be": "538314c Contactformulier en adminfix" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 2db539c Work in progress] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5597edf1e587bba06b784c6b4222191e142b5b07": "5597edf Changes" | kind=Commit | source=git | neighbors=[1e3899b Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@58201827a2bf0ac192c70c496279ad2a9c7f29f6": "5820182 Changes" | kind=Commit | source=git | neighbors=[main, df16e84 Changes, index.tsx, 79f7d0a Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5aa324aca561d3cc9c3369f431a578918aae6462": "5aa324a Changes" | kind=Commit | source=git | neighbors=[admin.tsx, main, 2d57d40 Changes, 451efd4 Changes, tmp-main-merge, tmp-revert-main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5e76ecd684c6305f5108aa0d63152ad671d67aed": "5e76ecd Changes" | kind=Commit | source=git | neighbors=[main, 422202c Made the requested updates, routeTree.gen.ts, 930fc24 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5f47f6dfb8f37161d6e09214e75b59ab8bad1823": "5f47f6d animaties" | kind=Commit | source=git | neighbors=[12764e3 Security: fix IDOR vulnerabilit…, main, f67dba7 rate limiting, Services.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6381715b39428afac8520ff81a8fb92227f2895a": "6381715 Changes" | kind=Commit | source=git | neighbors=[main, 3e100e8 Fixed security findings, 20260610172053_c69c4c4e-eb62-440d-a0ce-…, 7732f7b Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@67a9525143d21bbc619344a77d509c75f51bffab": "67a9525 Code edited in Lovable Code Editor" | kind=Commit | source=git | neighbors=[0bb1900 Code edited in Lovable Code Edi…, main, 4c798fc Code edited in Lovable Code Edi…, Hero.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@67f2077f6a443bea802409866b5a18d624de4379": "67f2077 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, 0d60453 Changes, 7f63a6a Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6aba49e339aeb7cb3c0f78fc88b53033a077b52b": "6aba49e euro teken" | kind=Commit | source=git | neighbors=[main, 9c4f5d5 nummers verwijderd, Services.tsx, c431436 footer tekst weer anders, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6f2c51c7da6ab34b463fbf6c5d34838d31c8c590": "6f2c51c Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@74760114bda82b5a65d9b053293d97d3ac5a585b": "7476011 Changes" | kind=Commit | source=git | neighbors=[482bba9 Work in progress, main, 7d64543 Changes, Nav.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7732f7bb914e4cd8a6626e70c291b9c85d5445c0": "7732f7b Changes" | kind=Commit | source=git | neighbors=[main, 6381715 Changes, routeTree.gen.ts, 9ed5748 Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@775e9f5ade29396638b669763dd9e2938a490829": "775e9f5 bug fixes" | kind=Commit | source=git | neighbors=[admin.tsx, main, 8913689 bug fixes, eccff4f bug fixes 2, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7eafc83159788365bcd3f3c518f802b28c24c585": "7eafc83 Changes" | kind=Commit | source=git | neighbors=[main, 952880b Changes, Contact.tsx, df1c05d Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f63a6a9df9ae5260bdfbc003566b5c7fcd4666f": "7f63a6a Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, 67f2077 Changes, 952880b Changes, tmp-main-merge, tmp-revert-main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@821a2164edf167eb2c92b46d07ff0c7bda38aedd": "821a216 Update vite.config.ts" | kind=Commit | source=git | neighbors=[main, 7842118 Prijs wijzing 499, vite.config.ts, ee1b8ae Change start script from bun to…, tmp-main-merge, tmp-revert-main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@86b3111542493b56b2d7409decee7ed75bcb2ba2": "86b3111 Changes" | kind=Commit | source=git | neighbors=[779aebc Nieuwe Lottielab-look toegepast, portal.tsx, main, 2770cdb Changes, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@879bad8a91a2c6c3d6b30208817c3b4d18496823": "879bad8 Handoff doc gemaakt" | kind=Commit | source=git | neighbors=[1514d2b Changes, 7842118 Prijs wijzing 499, main, ca832db Add .env to .gitignore., tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8913689daf2814713c150db0381cf833259ce82e": "8913689 bug fixes" | kind=Commit | source=git | neighbors=[775e9f5 bug fixes, main, 6500c48 bug fixes, admin.functions.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8ccc23819b7b4d0f51c031773c446e71ed901768": "8ccc238 Work in progress" | kind=Commit | source=git | neighbors=[37c0d11 Dock tokens toegevoegd & emojis…, main, 930fc24 Changes, routeTree.gen.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@930fc24f8e21c168e5d97193bd8d6542c392bd48": "930fc24 Changes" | kind=Commit | source=git | neighbors=[8ccc238 Work in progress, main, 5e76ecd Changes, __root.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@94c1dcff19a045c0e10b3f49abb26679a70599d3": "94c1dcf Work in progress" | kind=Commit | source=git | neighbors=[8f2439f Calendly-link bijgewerkt, main, 3b65b5f Changes, routeTree.gen.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@952880bc669a7c85de8cea788eeca195a502e5e9": "952880b Changes" | kind=Commit | source=git | neighbors=[7eafc83 Changes, main, 7f63a6a Changes, Contact.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9611f091027f65224987068ff4f1789a6bd4fde1": "9611f09 Changes" | kind=Commit | source=git | neighbors=[main, 9827b2f Changes, Contact.tsx, ba3edce Update pricing for Starter and …, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@978e28876c072c01f91c23d639d9bec55bfab18e": "978e288 Changes" | kind=Commit | source=git | neighbors=[422202c Made the requested updates, main, c532299 Changes, __root.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9827b2f256ef0f8893a8883341b55d50ced22a96": "9827b2f Changes" | kind=Commit | source=git | neighbors=[9611f09 Changes, main, 8f2439f Calendly-link bijgewerkt, routeTree.gen.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@99450d7635f335cbc90f6cc2f7db94f8eea736bd": "99450d7 Fix typo in Hero component text 2" | kind=Commit | source=git | neighbors=[38037d9 Update Hero.tsx, main, 37c0d11 Dock tokens toegevoegd & emojis…, Hero.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9c4f5d59d7aaee8742a75ce6ef4159e4cd297482": "9c4f5d5 nummers verwijderd" | kind=Commit | source=git | neighbors=[6aba49e euro teken, main, 423b3f1 cashing, Services.tsx, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@9f689f765315a425413d8b8e88445aebcf7c9a5c": "9f689f7 tracking voor user M" | kind=Commit | source=git | neighbors=[129b916 manier van werken, main, 8c0bb37 nieuwe featues, __root.tsx, tmp-main-merge, tmp-revert-main] | lang=nl
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a11075959148ee41dbd0fd64057e80ac25a771e7": "a110759 Work in progress" | kind=Commit | source=git | neighbors=[0b21971 Changes weergave verbeterd, main, f3ee883 Lovable update, routeTree.gen.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a4fa2cf4d68d63e3b7ed9217a876e7fff63b058b": "a4fa2cf Work in progress" | kind=Commit | source=git | neighbors=[3d42113 Kleurproblemen opgeholzen, main, 204f17a Changes, routeTree.gen.ts, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a8375281beebe589a5e4a6f040eeead6fae497ab": "a837528 bug fixes" | kind=Commit | source=git | neighbors=[6500c48 bug fixes, main, 23bb181 sec, monitoring.shared.ts, tmp-main-merge, tmp-revert-main] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@ad950dd3bd93400aa56c67e7a37c7fad5176f47c": "ad950dd Changes" | kind=Commit | source=git | neighbors=[41d8eb5 Changes, main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b51540025e5419b4dfc6532611f3be55b93cd511": "b515400 Redesign: warm licht thema, ink blauw accent, Syne headings" | kind=Commit | source=git | neighbors=[main, 1a66af6 Verbeter layout en visueel ritme, Hero.tsx, b6f9658 Redesign: donker editorial them…, tmp-main-merge, tmp-revert-main] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@b574d276dc1489e682651698a4f2f10e5f5cc2ac": "b574d27 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, main, b7f53d6 Changes, d48443c Changes, tmp-main-merge, tmp-revert-main] | lang=en

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
