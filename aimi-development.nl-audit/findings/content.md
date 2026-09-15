# Content Quality & E-E-A-T — 2026-09-15

Method: `crawl-data.json` (all 48 pages: title/meta/h1/h2/word_count/schema) used for site-wide counts, cross-checked with live `render_page.py` fetches (trafilatura `extracted_text`) of 12 representative pages: homepage, `/website-laten-maken`, `/tarieven`, `/over-ons`, `/contact`, `/faq`, three branche pages (kapsalon, loodgieter, hovenier) and three stad pages (groningen, sneek, veendam). Legal pages (`/privacybeleid`, `/algemene-voorwaarden`) fetched for KvK/BTW verification.

**Content quality score: 55/100**
**AI citation readiness: 61/100**
**Weighted E-E-A-T: 36/100**

This supersedes the 2026-09-06 partial pass (14/48 pages, explicitly incomplete). Key methodology correction below (word-count discrepancy) is now resolved.

## Word-count methodology correction (resolves prior CQ-6)

`crawl-data.json`'s `word_count` field counts **all visible DOM text** (nav, header CTA, footer, repeated "Ook interessant" link list, cookie banner). Live `extracted_text` (trafilatura, main-content only) is consistently **56–61% of that figure** on every page checked:

| Page | crawl-data word_count | extracted_text (main content) | Ratio |
|---|---|---|---|
| kapsalon | 1,186 | 709 | 0.60 |
| loodgieter | 1,103 | 613 | 0.56 |
| hovenier | 1,250 | 760 | 0.61 |
| groningen | 1,131 | 635 | 0.56 |
| sneek | 970 | 532 | 0.55 |
| veendam | 1,141 | 656 | 0.57 |

Applying the ~0.58 average ratio site-wide: the 15 branche pages (raw avg 1,190 words) carry roughly **~690 words of real topical content** on average — below the 800-word service-page floor. The 15 stad pages (raw avg 1,069 words) carry roughly **~600 words** — at the very top edge of the 500–600 location-page range, several individual pages (sneek, winschoten, emmen — all under 1,000 raw) likely dip below 500 real words. Treat `crawl-data.json` word counts as **~1.7x inflated** relative to actual topical coverage for any page-type-minimum comparison going forward.

## Doorway-page / template-duplication risk (key question)

**Verdict: low-to-moderate risk. Not classic doorway pages — but structurally repetitive enough to warrant action.**

Quantified overlap (character-level `difflib` similarity, full extracted body text, pairwise):

| Pair | Similarity ratio |
|---|---|
| kapsalon vs. loodgieter | 0.31 |
| kapsalon vs. hovenier | 0.38 |
| loodgieter vs. hovenier | 0.36 |
| groningen vs. sneek | 0.33 |
| groningen vs. veendam | 0.29 |
| sneek vs. veendam | 0.38 |

Roughly **a third of each page's character content is identical/templated text**, two-thirds is page-specific. What is actually shared is precisely identifiable and consistent across all 6 sampled pages:

- The CTA block is **100% verbatim** on every branche/stad page except the location name: *"Klaar voor een nieuwe website [voor je X / in X]? Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte. Neem contact op."*
- Stad pages additionally share a **verbatim ~90-word block**: the "Wat we bouwen voor ondernemers in [stad]" intro sentence + the identical 4-item service bullet list (website/webshop/hosting/meer diensten with identical prices) + "Benieuwd hoe een traject verloopt? Lees onze werkwijze." This block is unchanged across groningen, sneek and veendam except the city name.
- Branche pages share the "Wat kost een website voor een [branche]" pricing paragraphs almost sentence-for-sentence (Starter €499 / Pro €749 template), with only the feature noun swapped ("prijslijst en team" / "spoedcontact en werkgebied" / "projectfoto's en offerteaanvraag").
- Both page types share an identical **section skeleton**: intro → "Wat een website voor X moet kunnen" / local-context section → 5-step numbered process (same 5 step names reworded, same "01/02/03/04/05" numbering pattern) → "Veelvoorkomende knelpunten/fouten" → pricing → FAQ → "Ook interessant" → CTA.

What is **genuinely unique** and not just noun-swapped: kapsalon copy is built around online boekingen, no-shows, prijslijst-per-behandeling and stylist portfolios; loodgieter copy is built entirely around emergency/spoed framing, phone-number-above-the-fold, and mobile-4G-speed; hovenier copy is built around before/after photo galleries, aanleg-vs-onderhoud segmentation, and seasonality. These are substantively different sales arguments per vertical, not a find-and-replace template — this is the main reason this is not a hard doorway-page violation. Similarly, groningen leans on student/binnenstad competitive density, sneek leans on watersport/Sneekweek seasonality, veendam leans on HQ-proximity and streekfunctie history — genuine local framing, not generic filler.

**Net assessment:** each page clears the bar for "not spun/AI-doorway junk" on substance, but fails the bar for "doesn't look programmatically generated" on structure. A user (or an AI crawler doing cross-page pattern detection across 30 near-identical URLs) who opens two of these back to back will immediately recognize the template — same numbered 5-step block, same knelpunten framing, same pricing paragraph shape, same CTA sentence, repeated 15 and 15 times respectively. Combined with the below-floor real word count on branche pages, this pushes several branche pages toward **thin-programmatic** rather than doorway-spam. This is a pattern the `seo-programmatic` sub-skill should also weigh in on for the ranking-risk angle; the content-quality read is: substance is real, structural monotony is the liability.

**Recommendation:** (1) vary the CTA sentence and the 5-step section order/naming across at least 3-4 template variants rotated across pages, rather than one skeleton reused 30 times; (2) drop the verbatim stad-page service-bullet block or rewrite it per-region (e.g., differentiate by mentioning regional service delivery specifics); (3) add one vertical-specific section type absent from the shared skeleton (e.g. a photo/portfolio-format section only on visually-driven trades, a compliance/document section for boekhouder) so not all 15 branche pages share the exact same 6-section shape.

## E-E-A-T breakdown

| Factor | Weight | Score /100 | Basis |
|---|---|---|---|
| Experience | 20% | 25 | Vertical copy shows real operational familiarity (no-show reduction, aanleg vs. onderhoud, spoed-framing) but zero first-hand delivered-work evidence anywhere sampled — no portfolio, no before/after project photos, no client names, no "X sites gebouwd" counter. |
| Expertise | 25% | 45 | Technically accurate where checked (Core Web Vitals/LCP/CLS/INP explained correctly, iDEAL/Bancontact, VPS/hosting terminology correct, honest "wat er niet bij zit" section on `/tarieven` listing things they don't do — a genuine trust-building touch). No author bios beyond first names ("Aidan & Milan"), no credentials, no years-in-business claim anywhere. |
| Authoritativeness | 25% | 20 | Single external-recognition signal site-wide: a directory listing mention ("Webdesigngids") on `/over-ons`. No press, no case studies, no client logos, no backlink-worthy original research/data on the site. No `Article`/`author` schema tying any of the 15 industry-advice pages to a named expert. |
| Trustworthiness | 30% | 46 | Strong: explicit fixed pricing throughout, "geen lock-in" / source-code ownership stated, cancellation terms (1-month opzegtermijn) spelled out, named founders with direct phone (06 11851093) and email on `/contact`, security stack detailed (SSL, daily backups, 24/7 monitoring, Dutch VPS). Weak: **no KvK number, no BTW/VAT ID, no postal/visiting address found anywhere** — confirmed via direct HTML search on homepage, `/privacybeleid` and `/algemene-voorwaarden` (all three legal/contact-relevant pages return zero hits for "KvK", "BTW", "Kamer van Koophandel"). No reviews, ratings, or testimonials anywhere in the 48-page crawl (no `Review`/`AggregateRating` schema detected site-wide). |

**Weighted: 0.20×25 + 0.25×45 + 0.25×20 + 0.30×46 = 35.9 → 36/100.**

The content-quality score (55/100) sits above the raw E-E-A-T average because pricing transparency, schema coverage, and per-vertical topical specificity are genuinely solid and partially offset the trust/authority gap — but for a paid local-service business competing on 30 near-duplicate-shaped pages, the E-E-A-T number is the one that will gate rankings, and it is weak, specifically on Authoritativeness and Experience.

## Thin pages (flagged in brief, confirmed)

| Page | crawl-data word_count | Live main-content words (where fetched) | Assessment |
|---|---|---|---|
| `/contact` | 308 | 76 | Severely thin. Page exists mainly to route to Calendly; fine functionally, but as a trust/E-E-A-T page it offers no legal identity info, no map, no office photo. |
| `/over-ons` | 445 | 223 | Names founders and states 4 principles (direct contact, vaste prijzen, alles in eigen beheer, snel en betrokken) but zero case evidence, no years-in-business, no numbers, no team photo referenced in text. This is the page whose job is specifically to carry Experience/Trust signals and it under-delivers on that job. |
| `/branches` (hub) | 437 | not fetched live | Thin hub/index page linking to the 15 branche pages — acceptable for a pure navigation hub, but currently offers no differentiating value of its own. |
| `/meer-diensten` | 415 | not fetched live | Below typical service-page floor; acceptable if intentionally a lightweight index to `/onderhoud-hosting` and `/seo`. |
| `/website-checker` | 392 | not fetched live | Tool-landing page; word count less critical if the tool itself is the value, but currently thin as standalone content. |
| `/website-laten-maken` (core money page) | 711 | 474 | **Not in the original flagged list but worth flagging**: this is the primary "website laten maken" service page — the site's most important commercial page — and its real main-content word count (474) is thinner than several branche pages and well under the 800-word service-page floor. |

## Title / meta issues (confirmed)

- `/privacybeleid`: title = `"Privacybeleid — AIMI"`, **20 characters** — far under the ~50-60 char usable range, wastes SERP real estate (low priority page, but still a gap).
- `/algemene-voorwaarden`: title = `"Algemene Voorwaarden — AIMI"`, **27 characters** — same issue.
- Both are legal/utility pages so this is low-severity, but trivial to fix (e.g. "Privacybeleid | Hoe AIMI omgaat met jouw gegevens — AIMI").
- No other title-length or meta-description-length outliers found across the 48-page set; most titles cluster 35-56 chars and descriptions 120-169 chars, both within normal ranges.

## Duplicate content: homepage FAQ vs. `/faq` page

Line-by-line comparison confirms the homepage's 25-question FAQ block is **100% verbatim identical** to the 25 Q&As on the standalone `/faq` page — same questions, same answers, word-for-word. Both pages emit `FAQPage` JSON-LD independently. This is not a doorway/thin-content issue but it is an unforced duplication: it dilutes which URL is the canonical source for these answers (for both classic SERP FAQ-rich-results eligibility and for AI answer engines deciding which page to cite), and it makes the dedicated `/faq` page redundant in substance (its only unique value is the short 2-sentence intro). Recommend either (a) trimming the homepage FAQ to a curated subset of 6-8 highest-intent questions with "bekijk alle vragen" linking to `/faq`, or (b) keeping full parity but adding `/faq`-specific expansion (more detail per answer, or FAQ grouped by topic with anchor links) so it isn't a pure duplicate.

## AI citation readiness — 61/100

Positives:
- `FAQPage` JSON-LD valid on homepage and `/faq` (25 Q&As each) and on branche pages (kapsalon, loodgieter, hovenier all confirmed present in schema_types) — clean, extractable structured Q&A.
- Genuinely quotable, self-contained numeric facts throughout: "€499 eenmalig (Starter)", "€749 Pro-traject", "hosting vanaf €30 per maand", "binnen 2 tot 4 weken live", "opzegtermijn van één maand", "reactie binnen één werkdag". This is exactly the fact-density AI answer engines prefer to lift.
- Clear, consistent heading hierarchy (H1 → thematic H2 → FAQ) on every sampled page.
- `Organization`/`ProfessionalService` schema site-wide plus `LocalBusiness` on `/website-laten-maken-veendam` and `BreadcrumbList`/`OfferCatalog` on relevant pages — reasonable entity grounding.
- The `/tarieven` comparison table (AIMI vs. Wix/Squarespace vs. freelancer-op-uurtarief) is a well-structured, citable comparison block — good AI-Overview bait.

Negatives:
- No `Person`/`author` schema anywhere in the 48-page crawl (schema types found site-wide: Article, BreadcrumbList, ContactPage, FAQPage, ItemList, LocalBusiness, OfferCatalog, Organization, ProfessionalService, Service, WebSite — no Person, no Review, no AggregateRating). The 15 branche pages of "expert" industry advice have no attributable named author.
- Homepage/`/faq` duplicate content (above) muddies which URL an AI system should treat as the canonical FAQ source.
- No visible "last updated" date or `dateModified` anywhere; the render tool's `publication_date` field returned the same generic `2026-01-01` placeholder on every page sampled (home, wlm, tarieven, kapsalon, faq), which reads as a tooling default rather than a real extracted date — meaning there is **no detectable freshness signal on any page**, which weakens AI citation confidence for time-sensitive claims (pricing, "vanaf 2 tot 4 weken", etc.).
- No outbound citations to third-party sources on any sampled page — fully self-contained content, which is fine for a business site but means the site is unlikely to itself be treated as an authoritative cited source by AI systems doing cross-referencing.

## Readability (Dutch)

Average sentence length on branche/stad pages runs 19-24 words with several individual sentences over 30 words (e.g. kapsalon's "Wat kost" paragraph, groningen's competitive-density paragraph) — heavier than ideal for a small-business-owner audience skimming on mobile. Homepage/FAQ content is noticeably lighter (avg 14.6 words/sentence). The long compound-sentence pattern on the programmatic pages ("Een website die het telefoonnummer wegstopt onderaan de pagina... kost een loodgieter direct spoedaanvragen") is a mild AI-generated-copy marker — grammatically correct and on-topic, but denser and more uniform in rhythm than typically human-drafted small-business copy. Not a major issue on its own, but combined with the structural template repetition above, it reinforces the "programmatically assisted" read for anyone comparing multiple pages.

## Findings (severity-ranked)

### CQ-1 — No case studies, portfolio, testimonials, or quantified results anywhere on the site (High)
Zero client names, zero before/after project examples, zero "X websites delivered" style numbers, zero reviews/ratings (`Review`/`AggregateRating` schema absent site-wide, all 48 pages). This is the single largest E-E-A-T gap and the direct driver of the weak Authoritativeness (20) and Experience (25) sub-scores.
**Recommendation:** ship 2-3 real case examples (client name with permission, what was built, one concrete outcome) before adding further programmatic page volume — no amount of additional branche/stad pages substitutes for this.

### CQ-2 — No KvK/BTW/postal address anywhere on the site (High)
Confirmed via direct HTML text search on homepage, `/privacybeleid`, and `/algemene-voorwaarden`: zero hits for "KvK", "BTW", "Kamer van Koophandel". For a Dutch commercial entity this is both a trust gap and, depending on legal form, a potential compliance gap on the terms/privacy pages specifically.
**Recommendation:** add KvK number, BTW/VAT ID and a postal/visiting address to the footer and to `/algemene-voorwaarden` / `/privacybeleid`.

### CQ-3 — Branche pages average ~690 real words, below the 800-word service-page floor (Medium)
Corrected for chrome inflation (see methodology section): the 15 branche pages carry roughly 690 words of actual topical content on average, not the ~1,190 raw `crawl-data.json` figure suggests. Several stad pages (sneek, winschoten, emmen) likely sit below 500 real words, at or under the location-page floor.
**Recommendation:** treat `crawl-data.json` word counts as ~1.7x inflated for any floor-comparison; expand the "veelvoorkomende knelpunten" sections with one concrete scenario each rather than adding generic filler.

### CQ-4 — Template skeleton repeats near-identically across 30 branche/stad pages (Medium)
Quantified at 0.29-0.38 character-similarity between distinct verticals/cities; the CTA sentence and stad-page service-bullet block are 100% verbatim except for the place/branche name. Substance per page is genuinely differentiated (confirmed low doorway-page risk), but structural monotony (same 5-step numbered process, same section order, same knelpunten framing) is a real "looks programmatic" signal for both human cross-page comparison and AI pattern detection.
**Recommendation:** rotate 3-4 structural variants of the CTA/step-block across the page set; add one vertical-specific section type not present in the shared skeleton.

### CQ-5 — Homepage FAQ is a 100% verbatim duplicate of `/faq` (Medium)
25/25 Q&As identical word-for-word, both emitting independent `FAQPage` schema. Dilutes canonical-source clarity for AI citation and SERP rich results, and makes `/faq` substantively redundant.
**Recommendation:** trim homepage to a curated subset linking to the full `/faq`, or differentiate `/faq` with deeper per-answer detail.

### CQ-6 — `/over-ons` and `/contact` are thin for their trust-building role (Medium)
`/over-ons`: 223 real words — names founders, states 4 principles, no case evidence, no numbers, no years-in-business. `/contact`: 76 real words — functional but offers no legal identity info alongside the phone/email that is present.
**Recommendation:** expand `/over-ons` with founder background and (once available) the CQ-1 case evidence; add legal identity block (KvK/BTW/address) to `/contact` footer.

### CQ-7 — `/website-laten-maken`, the primary commercial page, is thinner than most branche pages (Medium)
474 real words vs. an 800-word service-page floor and vs. 613-760 real words on the sampled branche pages. This is the page most likely to be the primary landing target for the head-term "website laten maken" and it currently carries less topical depth than the long-tail branche variants.
**Recommendation:** expand with more concrete process/output detail; this page should out-depth the branche pages it funnels from, not underperform them.

### CQ-8 — `/privacybeleid` and `/algemene-voorwaarden` titles are too short (Low)
20 and 27 characters respectively, both well under usable SERP length. Low priority (legal utility pages) but a trivial fix.

### CQ-9 — No freshness/dateModified signal detected on any sampled page (Low)
No visible "laatst bijgewerkt" text and no `dateModified` in schema on any of the 5 pages where structured data was inspected; the render tool's date field returned a generic placeholder rather than an extracted date on every page. Weakens AI-citation confidence for time-sensitive claims (pricing, delivery timelines).
**Recommendation:** add a visible last-updated date on pricing-sensitive pages (`/tarieven`, branche pages) and populate `dateModified` in the `Service`/`Article` schema.

## What works well

- **Vertical/local content is genuinely written, not spun.** Kapsalon, loodgieter and hovenier pages each make a substantively different sales argument tied to real operational pain points of that trade (booking/no-shows, spoed/phone-first, before-after photo galleries). Groningen, sneek and veendam each carry real local framing (student density, watersport seasonality, HQ-proximity) rather than a swapped placeholder. This is well above the bar for typical programmatic-SEO doorway pages.
- **Pricing and policy transparency is a genuine trust asset**: explicit € figures everywhere, an honest "wat er niet bij zit" (what's not included) section on `/tarieven`, clear cancellation terms, and an AIMI-vs-Wix-vs-freelancer comparison table that is well-structured for both users and AI citation.
- **FAQPage schema is implemented correctly and consistently**, with concrete, extractable numeric answers — strong raw material for AI Overviews / answer engines, once the duplicate-source issue (CQ-5) and author-attribution gap are addressed.
- **Direct-contact positioning is credible and consistently reinforced**: named founders (Aidan & Milan), a real phone number and email visible on `/contact` and homepage, "you always talk to the person building your site" repeated as a genuine differentiator rather than empty marketing copy.
- **Technical content accuracy is solid where checked**: Core Web Vitals, VPS/hosting, and Dutch payment method (iDEAL/Bancontact) terminology are all used correctly, no factual red flags found.
