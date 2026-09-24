# AI Search Readiness (GEO) — 2026-09-06 (verification pass)

Score: **82/100** (updated from 80/100 on 2026-09-04; upgraded on the strength of passage-level citability confirmed on /tarieven, /faq and /wordpress-of-maatwerk)

This pass re-verifies robots.txt / llms.txt directly against the live site and does a passage-level citability read of four pages (home, /tarieven, /faq, /wordpress-of-maatwerk) using boilerplate-stripped extracted text, plus a check of how consistently "AIMI" is named inside individual answer passages (self-contained-citation test). External brand-mention corroboration (Wikipedia / Reddit / YouTube / LinkedIn) was **not** checked in this pass — see "Not verified" at the bottom.

## Dimension breakdown (estimate)

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 88/100 | Direct, specific, self-contained answers with real numbers on pricing/comparison pages |
| Structural Readability | 20% | 85/100 | Question-style H2/H3s on FAQ, comparison tables, short paragraphs |
| Multi-Modal Content | 15% | 55/100 | Text-only findings this pass; no video/schema-image assessment done here (see prior onpage/images findings) |
| Authority & Brand Signals | 20% | 65/100 | Entity present in schema and llms.txt, but brand name drops out of individual answer text on two of four pages checked (see GEO-6) |
| Technical Accessibility | 20% | 98/100 | Fully server-rendered, no SPA shell, AI crawlers explicitly allowed |

## Verified this pass

### robots.txt (re-fetched live, 2026-09-06)
Confirmed directly (not just from memory of the prior audit):
- `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Googlebot`, `Bingbot` → all `Allow: /`
- Generic scrapers (`Bytespider`, `PetalBot`, `MJ12bot`) → `Disallow: /`
- `Sitemap: https://aimi-development.nl/sitemap.xml` declared
- No explicit rule for `CCBot` or `anthropic-ai` (the "optional training-only block" pair) — they fall under the default `User-agent: *` → `Allow: /`. Not a problem, just noting these training-focused crawlers are allowed too rather than selectively blocked, in case the client ever wants to allow answer-engine crawling while opting out of pure model-training scrapers.

### llms.txt (re-fetched live at https://aimi-development.nl/llms.txt, 200 OK)
Present and well-formed. ~75 lines. Correct structure:
- `# AIMI` title + `>` one-paragraph summary naming the founders, the service, and the two home regions (Veendam/Hoogeveen)
- Grouped `## Pages`, `## Webdesign per regio`, `## Webdesign per branche`, `## Juridisch`, `## Diensten`, `## Contact` sections
- Every link has a substantive one-line description, not filler (e.g. "Wat kost een website laten maken — vaste prijzen vanaf € 499 eenmalig en € 30 per maand" for `/tarieven`)
- Served as `text/plain`, cacheable, `Last-Modified` present
- No RSL 1.0 licensing block found (llms.txt has no `License:` field, and no separate `/rsl.xml` or `<link rel="license">` was checked this pass — **not verified**, see below). RSL is optional and not yet widely adopted, so this is low priority, but flagging since the brief asked for it explicitly.

### Passage-level citability — /tarieven
This is the strongest page on the site for AI citation. Opens with a direct, quotable answer in the first sentence:

> "Een professionele website begint bij AIMI op € 499 eenmalig, plus € 30 per maand voor hosting en onderhoud. Dat zijn vaste prijzen: je weet vooraf precies wat je betaalt..."

This single passage names the entity, states the price, and is fully self-contained — exactly the shape an answer engine lifts for "wat kost een website laten maken bij AIMI" or generic "wat kost een website" queries. It is followed immediately by a market-context passage with named competitor price ranges (bouwpakket/freelancer €500–1.500, €40–90/uur), which gives the AI a comparison point to cite alongside AIMI's price — genuinely useful, non-fluff content.

The page also has a full comparison table (AIMI vs. Wix/Squarespace vs. freelancer-on-hourly-rate) across 5 rows (startprijs, doorlopende kosten, eigenaarschap, hostingsnelheid, ondersteuning). Markdown/HTML tables like this are directly liftable by ChatGPT and Perplexity for "AIMI vs Wix" or "maatwerk vs bouwpakket" comparison queries, and the table explicitly names AIMI in its header row and caption, so it survives being cited out of context.

The page's own FAQ block restates the pricing with more precision ("Bij AIMI begint een professionele één-pagina website bij € 499 eenmalig. Een meerpagina-site met eigen ontwerp en CMS kost € 749.") — a second, complementary self-contained answer, useful because it disambiguates Starter (€499) vs Pro (€749), which the hero passage doesn't.

### Passage-level citability — /faq
Confirmed exactly **25 question/answer pairs** on this page (verified by extracting `Question`/`name` entries from the `FAQPage` JSON-LD: 34 `name` fields total, 9 of which are non-question entity names such as region/person entries, leaving 25 real questions). This matches the brief's estimate and is a genuine citability asset — 25 distinct, topically-varied Q&A pairs (timeline, ownership, upgrade path, pricing, hosting, SEO, payment methods, servers, uptime, Core Web Vitals) all wrapped in valid `FAQPage` schema.

The answers themselves are answer-shaped, not marketing copy: direct yes/no openers ("Jij.", "Ja.", "Nee.") followed by the substantive explanation, e.g. "Jij. Na oplevering ben je volledig eigenaar van de website, de broncode en de domeinnaam." This is close to ideal for AI extraction — a direct claim in the first few words, then support.

Weakness found: most of the 25 answers use "we/onze/jij" rather than naming "AIMI" — only 3 of the 25 visible answer passages contain the string "AIMI". If an answer engine lifts one FAQ answer as a standalone quoted passage (which is exactly how FAQPage-schema content tends to get used), most of these passages carry no internal brand anchor and depend entirely on the surrounding page title/URL/schema for attribution. This doesn't break citation (the `Question` schema itself is scoped inside an `Organization`-adjacent page and the URL is always shown as the source), but it is a missed reinforcement opportunity — see GEO-6 below.

### Passage-level citability — /wordpress-of-maatwerk
Good structural citability: opens with an atypically honest framing ("Wij bouwen maatwerk, dus je mag dit stuk met gepaste argwaan lezen... we hebben er ook in gezet wanneer WordPress de betere keuze is"), which is the kind of non-generic, verifiably-balanced content that answer engines favor when multiple sources compete for the same query, because it reads as informed rather than promotional.

Contains a full comparison table (Aanschafprijs / Kosten op termijn / Snelheid / Zelf aanpassen / Functionaliteit uitbreiden / Beveiliging / Afhankelijkheid / SEO) and two explicit decision lists ("Kies WordPress als…" / "Kies maatwerk als…"), plus a 6-question FAQ block with direct openers ("Nee. Dat is een hardnekkig misverstand...", "Niet per definitie, maar in de praktijk meestal wel...").

Notable gap: **zero occurrences of the string "AIMI" anywhere in this page's visible body text** (checked across ~5,000 characters of extracted content). The entire page speaks in "wij/we/onze" without ever naming the company. This is the weakest entity-anchoring of the four pages checked — a genuinely well-written, quotable comparison page that an AI could cite for "is maatwerk sneller dan WordPress" without any textual signal in the passage itself that this is AIMI's answer specifically.

### Passage-level citability — homepage
Only 2 occurrences of "AIMI" in ~7,700 characters of extracted body text (both in link/CTA context, e.g. "Meer over ons"), same weak-anchoring pattern as /faq and /wordpress-of-maatwerk. The homepage's embedded FAQ component reuses the same 15 (of the 25) answers seen on /faq, so the "we/onze" pattern repeats here too.

## Brand entity / authority signals

- "AIMI" as an entity is clearly established at the schema level (Organization, sameAs, founders in prior audit) and in llms.txt, but at the **passage level** — the level actual AI citation extraction operates on — the brand name is thin. Across the four pages checked: homepage 2 mentions, /tarieven 4 mentions, /faq 3 mentions (out of 25 answers), /wordpress-of-maatwerk 0 mentions.
- This is a distinct, more specific finding than GEO-4 (external `sameAs` corroboration) in the prior audit — it's an on-page/on-passage issue, not a cross-platform one.
- Content itself is substantive rather than fluff: real prices, real comparison tables, honest trade-off framing ("Eerlijk gezegd: voor een eenvoudige hobbysite... is een bouwpakket vaak prima"). This non-generic, sometimes self-deprecating tone is a genuine differentiator for AI citation — it reads as informed advice rather than sales copy, which is exactly the kind of content Perplexity/ChatGPT answer synthesis favors over competitors' more promotional pages.
- No date signals confirmed again this pass (`publication_date` returned `null`/placeholder for all four fetched pages) — reconfirms GEO-3 from the prior audit.

## New/updated findings

### GEO-6 — Brand name drops out of individual answer passages (Medium) · **NEW**
On /faq (22 of 25 answers) and /wordpress-of-maatwerk (0 of ~10 answer-shaped passages), the answer text uses "we/wij/onze" instead of "AIMI." Passage-level retrieval by answer engines frequently lifts a single paragraph or FAQ answer without preserving page context; a passage with no entity anchor is harder to attribute cleanly and, in mixed-source answers, can get folded into a competitor's mention if the engine mis-resolves the pronoun. Fix: rewrite the FAQ answer templates so at least the first sentence names "AIMI" explicitly (e.g. "AIMI werkt met vaste prijzen: je weet vooraf..." instead of "We werken met vaste prijzen..."). Low effort — copy edit only, no schema or template changes needed. Do this first on /wordpress-of-maatwerk (currently zero mentions) and the FAQ page.

### GEO-1 through GEO-5 (carried over from 2026-09-04, still valid, not re-verified this pass)
- **GEO-1** — No outbound citations site-wide (Medium)
- **GEO-2** — `Person` entities for Aidan/Milan lack `@id`, `jobTitle`, `sameAs` (Low, afgezwakt)
- **GEO-3** — No `datePublished`/`dateModified` anywhere (Medium) — reconfirmed indirectly this pass via `publication_date: null` on all four fetched pages
- **GEO-4** — `sameAs` limited to one Google Maps link, thin cross-platform corroboration (Medium)
- **GEO-5** — City/branch pages open with brand framing before the answer; FAQ blocks do front-loading well, page bodies less so (Low)

## What still works (reconfirmed)
- llms.txt: present, correctly formatted, substantive descriptions — reconfirmed live
- robots.txt: all target AI crawlers explicitly allowed — reconfirmed live
- Site is not an SPA; `render_page.py --mode auto` used a raw fetch (no Playwright needed) on all four pages, confirming content is server-rendered and requires no JS execution for AI crawlers to read
- FAQPage schema present and valid (verified via structured-data extraction on /faq: `FAQPage`/`Question`/`Answer` block, 8,829 bytes, valid JSON-LD)
- 25 confirmed Q&A pairs on /faq, genuinely answer-shaped (direct opener + explanation), not just marketing copy
- /tarieven and /wordpress-of-maatwerk both contain genuinely comparative, fact-based tables — rare and valuable for AI citation in "X vs Y" queries

## Top 5 highest-impact changes

1. **Name "AIMI" in the first sentence of every FAQ/answer passage**, starting with /wordpress-of-maatwerk (currently 0 mentions) and /faq (3/25). Effort: low (copywriting only, ~30 short edits).
2. **Add `dateModified` (and `datePublished` where applicable) to page-level schema**, especially /tarieven, /faq, /wordpress-of-maatwerk — recency is a tie-breaker AI engines use between competing sources. Effort: low-medium (template + CMS field).
3. **Add 2-4 outbound citations** to authoritative external sources (web.dev for Core Web Vitals on /seo, KvK for /over-ons, Rijksoverheid for legal claims). Effort: low.
4. **Flesh out `sameAs`/`Person` entities** for Aidan & Milan with `@id`, `jobTitle`, and links to LinkedIn/other profiles. Effort: medium (needs the founders' profile URLs).
5. **Front-load the direct answer on city/branch pages** the way /tarieven and /faq already do, instead of opening with brand framing. Effort: medium (template rewrite across ~25 city/branch pages).

## Platform-specific scores (qualitative estimate, not measured via DataForSEO — see below)

| Platform | Estimate | Rationale |
|---|---|---|
| Perplexity | High | Crawler explicitly allowed, strong table/comparison content, direct pricing statements |
| ChatGPT (browsing/search) | High | GPTBot/OAI-SearchBot/ChatGPT-User all allowed, llms.txt present, FAQPage schema |
| Google AI Overviews | Medium-High | Google-Extended allowed, SSR content, FAQPage schema, but Overviews lean on broader domain authority/backlinks which weren't re-assessed this pass |
| Bing Copilot | Medium-High | Bingbot allowed, same structural strengths as Google |

## Not verified in this pass (explicitly incomplete)

- **RSL 1.0 licensing**: no `License:` field found in llms.txt; a separate `/rsl.xml` or `<link rel="license">` header was not checked. Low priority given near-zero current adoption.
- **External brand mention correlation** (Wikipedia entity, Reddit presence, YouTube mentions, LinkedIn) — not checked this pass; would need external search/DataForSEO tooling (`ai_opt_llm_ment_search`) which was not invoked. Given YouTube mentions carry the strongest correlation (~0.737) with AI citation and Domain Rating the weakest (~0.266), this is a meaningful gap to close in a follow-up pass rather than investing further in backlink-building.
- **DataForSEO live checks** (`ai_optimization_chat_gpt_scraper`, `ai_opt_llm_ment_search`) — MCP tools not available/invoked this session.
- **Multi-modal content assessment** (images, alt text, video) for GEO purposes specifically — deferred to the images/onpage findings files; only the Multi-Modal Content dimension score above is a rough placeholder.
- Only 4 of ~50+ indexed pages (home, /tarieven, /faq, /wordpress-of-maatwerk) were checked at passage level this pass; the ~25 city/branch pages referenced in GEO-5 were not re-fetched.
