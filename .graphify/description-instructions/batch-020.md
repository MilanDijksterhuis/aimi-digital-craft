# Node Description Batch 21 of 57

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

- "design_handoff_meer_diensten_support_createpseudosheet": "createPseudoSheet()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1567 | neighbors=[support.js, createRuntime()]
- "design_handoff_meer_diensten_support_createregistry": "createRegistry()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1592 | neighbors=[support.js, createRuntime()]
- "design_handoff_meer_diensten_support_createstreamtracker": "createStreamTracker()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1792 | neighbors=[support.js, init()]
- "design_handoff_meer_diensten_support_dcnamefrompath": "dcNameFromPath()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L75 | neighbors=[support.js, rootNameForDocument()]
- "design_handoff_meer_diensten_support_encodecamelattrs": "encodeCamelAttrs()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L366 | neighbors=[support.js, encodeCase()]
- "design_handoff_meer_diensten_support_evaldclogic": "evalDcLogic()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L842 | neighbors=[support.js, getReact()]
- "design_handoff_meer_diensten_support_findtoplevelequality": "findTopLevelEquality()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L248 | neighbors=[support.js, resolve()]
- "design_handoff_meer_diensten_support_getreactdom": "getReactDOM()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L14 | neighbors=[support.js, boot()]
- "design_handoff_meer_diensten_support_hostpositionstyle": "hostPositionStyle()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L457 | neighbors=[support.js, cssToObj()]
- "design_handoff_meer_diensten_support_iselementclass": "isElementClass()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1348 | neighbors=[support.js, isRenderableType()]
- "design_handoff_meer_diensten_support_isrenderabletype": "isRenderableType()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1157 | neighbors=[support.js, isElementClass()]
- "design_handoff_meer_diensten_support_loadscript": "loadScript()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L1823 | neighbors=[support.js, loadReactUmd()]
- "design_handoff_meer_diensten_support_parenswrapwhole": "parensWrapWhole()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L237 | neighbors=[support.js, resolve()]
- "design_handoff_meer_diensten_support_parsedctext": "parseDcText()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L38 | neighbors=[support.js, parseDataProps()]
- "design_handoff_meer_diensten_support_resolvepath": "resolvePath()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L263 | neighbors=[support.js, resolve()]
- "design_handoff_meer_diensten_support_safedecode": "safeDecode()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L143 | neighbors=[support.js, rootNameForDocument()]
- "design_handoff_meer_diensten_support_walktext": "walkText()" | kind=code-symbol | source=design/geanimeerde-achtergronden/design_handoff_meer_diensten/support.js:L569 | neighbors=[support.js, walk()]
- "hooks_expire_accounts_isauthorized": "isAuthorized()" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L15 | neighbors=[expire-accounts.ts, timingSafeStringEqual()]
- "hooks_expire_accounts_route": "Route" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L32 | neighbors=[expire-accounts.ts, routeTree.gen.ts]
- "hooks_expire_accounts_timingsafestringequal": "timingSafeStringEqual()" | kind=code-symbol | source=src/routes/api/public/hooks/expire-accounts.ts:L8 | neighbors=[expire-accounts.ts, isAuthorized()]
- "hooks_use_auth_authprovider": "AuthProvider()" | kind=code-symbol | source=src/hooks/use-auth.tsx:L19 | neighbors=[use-auth.tsx, _authenticated.tsx]
- "hooks_use_auth_useauth": "useAuth()" | kind=code-symbol | source=src/hooks/use-auth.tsx:L60 | neighbors=[use-auth.tsx, _authenticated.tsx]
- "hooks_use_form_draft_useformdraft": "useFormDraft()" | kind=code-symbol | source=src/hooks/use-form-draft.ts:L11 | neighbors=[portal.tsx, use-form-draft.ts]
- "hooks_use_mobile": "use-mobile.tsx" | kind=code-symbol | source=src/hooks/use-mobile.tsx:L1 | neighbors=[useIsMobile(), sidebar.tsx]
- "hooks_use_mobile_useismobile": "useIsMobile()" | kind=code-symbol | source=src/hooks/use-mobile.tsx:L5 | neighbors=[use-mobile.tsx, sidebar.tsx]
- "kaart_hoogeveen_veendam_support_cdnscriptfor": "cdnScriptFor()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1149 | neighbors=[support.js, loadReactUmd()]
- "kaart_hoogeveen_veendam_support_contentkey": "contentKey()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L771 | neighbors=[support.js, walkElement()]
- "kaart_hoogeveen_veendam_support_createexternalmodules": "createExternalModules()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1171 | neighbors=[support.js, createRuntime()]
- "kaart_hoogeveen_veendam_support_createhelmetmanager": "createHelmetManager()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1366 | neighbors=[support.js, createRuntime()]
- "kaart_hoogeveen_veendam_support_createpseudosheet": "createPseudoSheet()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1567 | neighbors=[support.js, createRuntime()]
- "kaart_hoogeveen_veendam_support_createregistry": "createRegistry()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1592 | neighbors=[support.js, createRuntime()]
- "kaart_hoogeveen_veendam_support_createstreamtracker": "createStreamTracker()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1792 | neighbors=[support.js, init()]
- "kaart_hoogeveen_veendam_support_dcnamefrompath": "dcNameFromPath()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L75 | neighbors=[support.js, rootNameForDocument()]
- "kaart_hoogeveen_veendam_support_encodecamelattrs": "encodeCamelAttrs()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L366 | neighbors=[support.js, encodeCase()]
- "kaart_hoogeveen_veendam_support_evaldclogic": "evalDcLogic()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L842 | neighbors=[support.js, getReact()]
- "kaart_hoogeveen_veendam_support_findtoplevelequality": "findTopLevelEquality()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L248 | neighbors=[support.js, resolve()]
- "kaart_hoogeveen_veendam_support_getreactdom": "getReactDOM()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L14 | neighbors=[support.js, boot()]
- "kaart_hoogeveen_veendam_support_hostpositionstyle": "hostPositionStyle()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L457 | neighbors=[support.js, cssToObj()]
- "kaart_hoogeveen_veendam_support_iselementclass": "isElementClass()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1348 | neighbors=[support.js, isRenderableType()]
- "kaart_hoogeveen_veendam_support_isrenderabletype": "isRenderableType()" | kind=code-symbol | source=design/kaart-hoogeveen-veendam/support.js:L1157 | neighbors=[support.js, isElementClass()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-020.json

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
