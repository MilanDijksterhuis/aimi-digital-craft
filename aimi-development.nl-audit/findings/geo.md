# AI Search Readiness (GEO) — 2026-09-04

Score: **80/100**

## What works

- **`/llms.txt` present and genuinely good** — 75 lines, correct format: an `>` summary line, then grouped sections (Pages / Webdesign per regio / …) with a one-line purpose per URL. Descriptions carry real detail ("Vestigingsplaats van AIMI, in de Groningse veenkoloniën"), not filler. This is above the standard of most implementations. (Note: ignored by Google Search; it matters for ChatGPT, Claude and Perplexity.)
- **AI crawlers explicitly allowed** in robots.txt — GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended. Nothing is left to default interpretation.
- **Content is in the server-rendered HTML.** No AI crawler needs to execute JavaScript to read any page — the single most common reason sites are invisible to LLM retrieval.
- **249 unique Q&A pairs in `FAQPage` schema** across 36 pages. Question-and-answer structure is the most citable format there is, and this is a substantial, well-populated corpus.
- **Clean entity graph** with stable `@id`s, so an AI resolving "AIMI" finds one coherent business.

## Findings

### GEO-1 — No outbound citations (Medium)
Zero external links site-wide. Generative engines preferentially cite sources that are themselves well-connected and verifiable. Content that references nothing external is harder to corroborate and reads as an isolated brochure.

Natural, honest candidates: web.dev or Google's docs where Core Web Vitals are discussed on `/seo`; the KvK register on `/over-ons`; the official Rijksoverheid pages where legal obligations are mentioned.

### GEO-2 — `Person`-entiteiten zijn te dun (Low) · **AFGEZWAKT**
Correctie: er **staan** al `founder`-entiteiten voor Aidan en Milan in het Organization-schema. Wat ontbreekt is kleiner dan eerst gemeld: geen `@id`, geen `jobTitle`, geen `sameAs`. Een AI die vraagt wie AIMI runt vindt dus wel namen, maar niets om ze aan te verankeren.

This compounds CQ-2: the humans are the differentiator for a two-person agency, and they are currently the least machine-legible thing on the site.

### GEO-3 — No date signals on any content (Medium)
No `datePublished` or `dateModified` on any page, and only one `Article`. AI systems weight recency when choosing between competing sources, and have no way to tell whether this advice is from last month or three years ago.

### GEO-4 — `sameAs` too thin to corroborate the entity (Medium)
One Google Maps link. See SCH-2 — the same gap, viewed from the AI-retrieval side: cross-platform corroboration is how an engine gains confidence that an entity is real.

### GEO-5 — Answers not front-loaded on service pages (Low)
City and branch pages open with brand framing before reaching the substantive answer. Passage-level retrieval favours content where a direct, self-contained answer appears early and can be lifted without surrounding context. The FAQ blocks do this well; the page bodies less so.
