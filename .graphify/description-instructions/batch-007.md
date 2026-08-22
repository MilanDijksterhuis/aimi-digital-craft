# Node Description Batch 8 of 46

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

- "routes_website_laten_maken_coevorden": "website-laten-maken-coevorden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-coevorden.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_drachten": "website-laten-maken-drachten.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-drachten.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_emmen": "website-laten-maken-emmen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-emmen.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_groningen": "website-laten-maken-groningen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-groningen.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_heerenveen": "website-laten-maken-heerenveen.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-heerenveen.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_hoogezand": "website-laten-maken-hoogezand.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-hoogezand.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_leeuwarden": "website-laten-maken-leeuwarden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-leeuwarden.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_meppel": "website-laten-maken-meppel.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-meppel.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_roden": "website-laten-maken-roden.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-roden.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_sneek": "website-laten-maken-sneek.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-sneek.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_stadskanaal": "website-laten-maken-stadskanaal.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-stadskanaal.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
- "routes_website_laten_maken_winschoten": "website-laten-maken-winschoten.tsx" | kind=code-symbol | source=src/routes/website-laten-maken-winschoten.tsx:L1 | neighbors=[c27f4c8 new, LocationPageV2.tsx, LocationPageData, LocationPageV2(), seo.ts, breadcrumbJsonLd()] | lang=en
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
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@43d815cc6fb948727d167c26c906741fc53c55b4": "43d815c Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@47ef3dd3470ae956daaef44cd73a0c0fa5e66d19": "47ef3dd Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@54af09cc33691a723eded23ead375d8b253f464b": "54af09c Remove .env from tracking" | kind=Commit | source=git | neighbors=[main, 332d0c8 Fix: externalize googleapis/nod…, 5bc9ff0 google authenticatoin, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@5d704cb11898aeb9c55b1fcdf669d25eb9b8e9a7": "5d704cb Changes" | kind=Commit | source=git | neighbors=[47ef3dd Changes, portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@65b58f18e32ff3974def08ab5316d86e96fe13a5": "65b58f1 Work in progress" | kind=Commit | source=git | neighbors=[59d8b3c Code edited in Lovable Code Edi…, main, 9ed5748 Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@68ae2dd803c5af16da5b6ec0fb2731ffb2ae21b6": "68ae2dd Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, fcf1ee7 Changes] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@692d2316adb2949927749a6d4c0d281a300d6fd7": "692d231 Update .gitignore to include .env files" | kind=Commit | source=git | neighbors=[05a6c9e Verbeter admin changes-tab layo…, main, b9ed97e Gebruik getSession() voor auth …, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@6dc7740da001bd2b70e578e71b148ac5a32950ca": "6dc7740 Changes" | kind=Commit | source=git | neighbors=[3ca59a0 Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7f9166ef104618599ad1f7094c1d65787c3ef542": "7f9166e Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@85a66662163282e8dd9b8f2efe6119cc769880cf": "85a6666 SEO en robot" | kind=Commit | source=git | neighbors=[main, 171eb96 leads functions, ProcessTimeline.tsx, Services.tsx, index.tsx, __root.tsx] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@8a81dd141dffbb9e136fbbeadff0f1a615ca92dd": "8a81dd1 Fixed security issues" | kind=Commit | source=git | neighbors=[7ca6d63 Changes, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=pt
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@90677bfe31851fdd79ce7a5a1d724616869cf281": "90677bf Changes" | kind=Commit | source=git | neighbors=[tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, ab14295 Design overhauled, A11y-bar weg] | lang=en
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@95b52753579c4b90283b539f8c822770ab08f569": "95b5275 Changes" | kind=Commit | source=git | neighbors=[portal.tsx, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-007.json

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
