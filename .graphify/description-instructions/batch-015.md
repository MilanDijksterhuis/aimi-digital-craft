# Node Description Batch 16 of 57

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "supabase_types_database": "Database" | kind=code-symbol | source=src/integrations/supabase/types.ts:L7 | neighbors=[auth-middleware.ts, client.ts, client.server.ts, types.ts]
- "ui_button_button": "Button" | kind=code-symbol | source=src/components/ui/button.tsx:L39 | neighbors=[button.tsx, calendar.tsx, carousel.tsx, sidebar.tsx]
- "ui_input": "input.tsx" | kind=code-symbol | source=src/components/ui/input.tsx:L1 | neighbors=[utils.ts, cn(), Input, sidebar.tsx]
- "ui_radio_group": "radio-group.tsx" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L1 | neighbors=[utils.ts, cn(), RadioGroup, RadioGroupItem]
- "ui_resizable": "resizable.tsx" | kind=code-symbol | source=src/components/ui/resizable.tsx:L1 | neighbors=[utils.ts, cn(), ResizableHandle(), ResizablePanelGroup()]
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L1 | neighbors=[utils.ts, cn(), ScrollArea, ScrollBar]
- "ui_separator": "separator.tsx" | kind=code-symbol | source=src/components/ui/separator.tsx:L1 | neighbors=[utils.ts, cn(), Separator, sidebar.tsx]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L1 | neighbors=[sidebar.tsx, utils.ts, cn(), TooltipContent]
- "authenticated_portal_changecard": "ChangeCard()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L880 | neighbors=[portal.tsx, mapStatus(), stepIndex()]
- "authenticated_portal_mapstatus": "mapStatus()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L67 | neighbors=[portal.tsx, ChangeCard(), matchesFilter()]
- "authenticated_portal_stepindex": "stepIndex()" | kind=code-symbol | source=src/routes/_authenticated/portal.tsx:L86 | neighbors=[portal.tsx, ChangeCard(), Stepper()]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@032ba882dcdd184c58fcd324caaaa455bba861e3": "032ba88 SEO" | kind=Commit | source=git | neighbors=[main, 2d81f50 feat(seo): vervang /cases door …, 7a63e47 chore: graphify graph bijgewerkt]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7a63e4743d57a1f4b9255081ebc9c8871897b99d": "7a63e47 chore: graphify graph bijgewerkt" | kind=Commit | source=git | neighbors=[main, 032ba88 SEO, ef44acd feat(seo): sitemap + llms.txt a…]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@7a80ccf33e842e1845ab2661fcfb4bfa5d93c8f6": "7a80ccf docs(seo): volledige SEO-audit 2026-09-20 (root cause dip + site-breed)" | kind=Commit | source=git | neighbors=[main, e543723 Merge pull request #1 from Mila…, f80d1a3 blur]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@a903820d8d2f9a723af2516050fdd67634743e19": "a903820 Fix Rules of Hooks violation crashing admin Projecten tab" | kind=Commit | source=git | neighbors=[39d363a server basic, admin.tsx, worktree-fix-admin-projects-hooks]
- "commit:repo:github.com/MilanDijksterhuis/aimi-digital-craft@c4498f5f1a1f0788e92e4dfda2feffb1cfc073f5": "c4498f5 Changes" | kind=Commit | source=git | neighbors=[worktree-curious-wibbling-narwhal, b29ceec Fixed weak PRNG and RLS, 20260523231640_f0c31578-aa3c-4810-a448-…]
- "components_blogpostform_blogpostformpayload": "BlogPostFormPayload" | kind=code-symbol | source=src/components/BlogPostForm.tsx:L24 | neighbors=[admin.blog.tsx, admin.blog.$postId.tsx, BlogPostForm.tsx]
- "components_blogpostlinkspanel": "BlogPostLinksPanel.tsx" | kind=code-symbol | source=src/components/BlogPostLinksPanel.tsx:L1 | neighbors=[1727351 blog, BlogPostForm.tsx, BlogPostLinksPanel()]
- "components_callbackagenda_sameday": "sameDay()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L50 | neighbors=[CallbackAgenda.tsx, isToday(), startOfDay()]
- "components_callbackagenda_startofday": "startOfDay()" | kind=code-symbol | source=src/components/CallbackAgenda.tsx:L39 | neighbors=[CallbackAgenda.tsx, sameDay(), startOfWeek()]
- "components_contact_contact": "Contact()" | kind=code-symbol | source=src/components/Contact.tsx:L11 | neighbors=[Contact.tsx, contact.tsx, index.tsx]
- "components_exampleslideshow_generic_examples": "GENERIC_EXAMPLES" | kind=code-symbol | source=src/components/ExampleSlideshow.tsx:L151 | neighbors=[BranchPage.tsx, ExampleSlideshow.tsx, LocationPageV2.tsx]
- "components_exampleslideshow_serviceexample": "ServiceExample" | kind=code-symbol | source=src/components/ExampleSlideshow.tsx:L6 | neighbors=[BranchPage.tsx, ExampleSlideshow.tsx, ServicePage.tsx]
- "components_faq_faq": "FAQ()" | kind=code-symbol | source=src/components/FAQ.tsx:L291 | neighbors=[FAQ.tsx, index.tsx, faq.tsx]
- "components_faq_faqitems": "faqItems" | kind=code-symbol | source=src/components/FAQ.tsx:L22 | neighbors=[FAQ.tsx, faq.tsx, index.tsx]
- "components_leadspanel_leaddetail": "LeadDetail()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L620 | neighbors=[LeadsPanel.tsx, initials(), relTime()]
- "components_leadspanel_leadspanel": "LeadsPanel()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L157 | neighbors=[admin.leads.tsx, LeadsPanel.tsx, admin.tsx]
- "components_locationlanding_locationdata": "LocationData" | kind=code-symbol | source=src/components/LocationLanding.tsx:L18 | neighbors=[LocationLanding.tsx, website-laten-maken-hoogeveen.tsx, website-laten-maken-veendam.tsx]
- "components_locationlanding_locationlanding": "LocationLanding()" | kind=code-symbol | source=src/components/LocationLanding.tsx:L27 | neighbors=[LocationLanding.tsx, website-laten-maken-hoogeveen.tsx, website-laten-maken-veendam.tsx]
- "components_redirectspanel": "RedirectsPanel.tsx" | kind=code-symbol | source=src/components/RedirectsPanel.tsx:L1 | neighbors=[admin.blog.tsx, 1727351 blog, RedirectsPanel()]
- "components_telegrammfacard": "TelegramMfaCard.tsx" | kind=code-symbol | source=src/components/TelegramMfaCard.tsx:L1 | neighbors=[admin.accounts.$accountId.tsx, 2b1d78f telegram, TelegramMfaCard()]
- "components_truststrip_truststrip": "TrustStrip()" | kind=code-symbol | source=src/components/TrustStrip.tsx:L8 | neighbors=[BranchPage.tsx, LocationPageV2.tsx, TrustStrip.tsx]
- "design_handoff_meer_diensten_support_compiletemplate": "compileTemplate()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L467 | neighbors=[support.js, encodeCase(), walkChildren()]
- "design_handoff_meer_diensten_support_createcomponentfactory": "createComponentFactory()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L888 | neighbors=[support.js, getReact(), createRuntime()]
- "design_handoff_meer_diensten_support_csstoobj": "cssToObj()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L391 | neighbors=[support.js, kebabToCamel(), hostPositionStyle()]
- "design_handoff_meer_diensten_support_encodecase": "encodeCase()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L372 | neighbors=[support.js, compileTemplate(), encodeCamelAttrs()]
- "design_handoff_meer_diensten_support_importantify": "importantify()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1542 | neighbors=[support.js, scanUnquotedUrl(), stripComments()]
- "design_handoff_meer_diensten_support_init": "init()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1848 | neighbors=[support.js, createRuntime(), createStreamTracker()]
- "design_handoff_meer_diensten_support_isdeckmounttag": "isDeckMountTag()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L489 | neighbors=[support.js, walkElement(), walkXImport()]
- "design_handoff_meer_diensten_support_kebabtocamel": "kebabToCamel()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L388 | neighbors=[support.js, collectProps(), cssToObj()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-015.json

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
