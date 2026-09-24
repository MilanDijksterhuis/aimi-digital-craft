# Search Experience (SXO) — 2026-09-04

Score: **77/100**

## What works

- **Page type matches intent** across the board. `/tarieven` answers a price query with prices; `/wordpress-of-maatwerk` answers a comparison query with a comparison; city pages answer local-intent queries with local content. No mismatches found — the common failure mode where a blog post targets a commercial query is entirely absent here.
- **Prices are public** (from € 499, hosting from € 30/mo) on 18 of 48 pages. Most agencies hide pricing; publishing it wins the significant share of searchers whose actual query is "what does this cost", and it is why `/tarieven` can rank for a high-intent term.
- Consistent CTA structure — every service page closes with a clear next step.
- `/website-checker` is a genuine lead magnet, matching a real "how does my site score" intent.
- Branch pages open with "Wat een website voor een [vak] moet kunnen" — framed around the reader's problem rather than the agency's services.

## Findings

### SXO-1 — No proof of work for a visual buying decision (High)
Prospects choosing a web agency evaluate on demonstrated craft first. There is no portfolio, no case study, no before/after, and testimonial language appears on exactly one page. The site describes quality at length but never shows it.

For a company selling *websites*, this is the highest-leverage conversion gap on the site — and it is what makes CQ-3 and LOC-4 more than checkbox items.

### SXO-2 — "Ook interessant" blocks are undifferentiated (Medium)
Every city and branch page ends with the same related-links pattern, which reads as navigation rather than a recommendation. These blocks are the natural vehicle for the contextual internal linking SM-1 calls for — currently they neither help the user choose nor build hierarchy.

### SXO-3 — Trust signals absent at the decision point (Medium)
`/contact` — where intent is highest — carries no address, no KvK, no hours, no response-time guarantee beyond "binnen één werkdag", and no reassurance about what happens after submitting. Each missing element is a small reason to hesitate at the exact moment hesitation is most expensive.

### SXO-4 — Founders under-used as differentiator (Low)
"Je praat direct met Aidan of Milan" op `/contact` is de site's single most persuasive line — direct access to the people doing the work is exactly what a two-person shop can offer that an agency cannot. It appears on 6 of 48 pages and nowhere on the 30 pages built to attract new visitors.

---

## SERP-Backwards Keyword Analysis — 2026-09-06

This section applies the SXO skill's SERP-backwards methodology to the four most commercially important query/page pairs on the site: the core money page, the pricing page, one industry-vertical page, and one city page. It refines the "no mismatches found" conclusion above — page-*type* is indeed broadly correct everywhere, but two of the four pages fail to match the *depth and proof format* that actually ranks, which functions as a mismatch in practice even though the taxonomy label is right.

**Method:** page content was read directly from source (`src/routes/*.tsx`, `src/components/BranchPage.tsx`, `src/components/LocationPageV2.tsx`, `src/components/ExampleSlideshow.tsx`) rather than re-fetched live, since this is the shipped markup. SERP composition was sampled via web search per keyword, then 3 ranking competitor pages were fetched in full to establish the concrete structural benchmark cited under each target below. See **Limitations** at the end for what this does and does not cover.

### Target A — `/website-laten-maken` × "website laten maken"

Note first: the homepage does **not** target this term. A prior audit fix (comment `A-03` in `src/routes/index.tsx`) deliberately moved this keyword to `/website-laten-maken` and repositioned the homepage on brand + service overview. That split is sound information architecture, so this analysis follows the keyword to its actual page.

- **SERP dominant type:** Service Page, price-anchored directly in the title tag (confidence ~90%, 9/9 sampled results: "v.a. €299", "vanaf €799,-", "vanaf €695 all-in", etc.).
- **Deep benchmark** (wecaremedia.nl/website-laten-maken/, fetched in full): heading order is *Website laten maken → Website pakketten → **Voorbeelden van websites die wij hebben gemaakt** → Waarom ons → Webdesign op maat → Zelf aanpassen → Werkwijze → Offerte → **Wat klanten zeggen** → FAQ*. It shows 3 **named** client case studies (Geleidehonden Opleiding Ans Labee, Dennis Snijders hoveniersbedrijf, Cillux) and 8 named testimonials with a 4.8★/76-review aggregate.
- **AIMI classification:** Service Page — **type is ALIGNED**. Offerings, process steps, and a price anchor ("vanaf € 499") are all present and well-organized (`src/routes/website-laten-maken.tsx`).
- **Gap within the correct type (High):** the "examples" shown are three generic stock mockups — `voorbeeld-website-1-architectuur.webp`, `-2-praktijk.webp`, `-3-saas.webp` — with no client name, no logo, no outcome, no review, no rating. Against a competitor benchmark of 3 named cases + 8 named reviews + a visible star rating, this is not a minor gap, it is the single required element the taxonomy calls out for Service Pages ("at least one case study or testimonial") delivered in name only.

**User story** (decision stage):
> As a small business owner comparing web agencies, I want to see real, named examples of websites this agency actually built and hear from people who paid for one, because I'm about to spend €500–1,500 that I can't easily undo, but I'm blocked by a trust gap — the page shows an unlabelled architect/SaaS/praktijk mockup with no name attached to it, so I have no way to verify the claim.
> *(Source: title-tag pricing pattern shared by all 9 sampled results + wecaremedia.nl's named-case + named-review structure ranking for the identical query.)*

**Persona scores — `/website-laten-maken`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Price-and-proof comparison shopper (decision) | 18/25 | 20/25 | 6/25 | 18/25 | 62/100 | Needs Work |
| Budget-conscious ZZP'er (awareness) | 22/25 | 21/25 | 10/25 | 20/25 | 73/100 | Good |

**Weakest dimension:** Trust, for both personas — driven entirely by the absence of named proof, not by page structure.

### Target B — `/tarieven` × "wat kost een website laten maken"

- **SERP dominant type:** Hybrid informational pricing-guide — agency-authored articles with segmented pricing tables and an FAQ (confidence ~90%, 6/6 sampled results).
- **Deep benchmark** (wecaremedia.nl/blog/wat-kost-een-website-laten-maken/, fetched in full): two pricing tables segmented by site type (informational/business/webshop/custom), a DIY-vs-freelancer-vs-agency cost comparison, and a dedicated FAQ.
- **AIMI classification:** Hybrid pricing guide — **type is ALIGNED, and this is the strongest page in the set.** `/tarieven` (`src/routes/tarieven.tsx`) has three priced tiers, a 5-row comparison table (AIMI vs. bouwpakket vs. freelancer), an explicit "wat zit er niet bij" honesty section, a market-orientation paragraph for undecided shoppers, and a 7-item FAQ with `FAQPage` schema. It goes further than the competitor benchmark by naming the two alternatives a searcher is actually weighing (bouwpakket, freelancer) instead of only listing AIMI's own price.

**User story** (awareness → consideration):
> As a first-time website buyer, I want to see price ranges by website type so I know what's reasonable before I contact anyone, because I don't want to be lowballed or overcharged, but I'm blocked by not knowing whether my need counts as "simple" or "professional."
> *(Source: every sampled result leads with a type-segmented pricing table; FAQ clusters cluster around "wat kost X".)*

**Persona scores — `/tarieven`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Budget-orienting first-time buyer (awareness/consideration) | 24/25 | 23/25 | 16/25 | 22/25 | 85/100 | Excellent |

Trust is the only dimension held back — by the same site-wide absence of reviews/case studies as Target A, not by anything specific to this page.

### Target C — `/website-laten-maken-kapsalon` × "website laten maken kapsalon"

- **SERP dominant type:** Niche Service Page, price-forward in the hero/title (confidence ~85%, 7/7 sampled results — e.g. "Alles-in-één pakket 675,-", "€24,95/maand").
- **Deep benchmark** (sitezilla.nl/kapperswebsite/, fetched in full): two priced packages shown as numbers ("€24,95/maand", "€34,95/maand" + setup fees) directly in a pricing block, one named testimonial ("Wouter van Veen"), one labelled "kapperswebsite voorbeeld" screenshot, and explicit mention of salon-scheduling-software integration. (coolpixel.nl, the #1 result, returned HTTP 403 and could not be fetched — see Limitations.)
- **AIMI classification:** Service Page (branch template, `src/components/BranchPage.tsx` via `src/routes/website-laten-maken-kapsalon.tsx`) — broadly the right type, but two concrete depth gaps:
  1. **Pricing is prose-only.** "€499"/"€749" appear inside a paragraph under "Wat kost een website voor een kapsalon", with no number callout, table, or bold price the way every sampled competitor leads with one.
  2. **The example image is not a kapsalon.** `BranchPage.tsx` imports `ExampleSlideshow` with the fixed `GENERIC_EXAMPLES` array (architect, praktijk, SaaS) — this is hard-coded and shared by **every** branch page, so a kapsalon owner is shown a SaaS company's website as "proof." This directly contradicts the page's own copy, which explicitly names "een pagina met je stylisten... en foto's van eigen werk" as the trust-builder a kapsalon website needs.

**User story** (consideration):
> As a kapsalon owner comparing agencies between clients, I want to quickly see what a hairdresser-specific website looks like and what it costs, because I have a few minutes and am checking several sites at once, but I'm blocked by having to read three paragraphs to find a number, and by being shown a SaaS company's website as the "example" instead of a salon.
> *(Source: SERP price-in-hero pattern for this query + AIMI's own on-page copy naming "foto's van eigen werk" as the exact trust signal the page then fails to deliver.)*

**Persona scores — `/website-laten-maken-kapsalon`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Kapsalon owner, time-pressed evaluator (consideration) | 20/25 | 12/25 | 8/25 | 17/25 | 57/100 | Needs Work |

**Weakest dimension:** Trust (8/25) — the mismatched example image actively works against the page rather than merely being absent; Clarity (12/25) is the second issue, since price is not scannable.

### Target D — `/website-laten-maken-groningen` × "website laten maken Groningen"

- **SERP dominant type:** Local Service Page with visible case proof and social-proof counts (confidence ~85%, 8/8 sampled results).
- **Deep benchmark** (chuckswebdesign.nl/website-laten-maken-groningen/, fetched in full): heading order is *Website laten maken Groningen → Onze website pakketten (3 priced tiers) → 4-step process → **"1000+ ondernemers uit de regio Groningen gingen u voor"** → **Cases** (5 named projects, e.g. Chris Witgoed Reparaties, Salon Belle) → FAQ → satisfaction guarantee*. VrijdagOnline's competing result leads with "300+ companies from Groningen."
- **AIMI classification:** Local Page (`src/components/LocationPageV2.tsx` via `src/routes/website-laten-maken-groningen.tsx`) with genuinely well-written, non-templated local context (Folkingestraat, Grote Markt, student-city framing — this is real local relevance, not boilerplate with the city name swapped in). **Mismatch severity: HIGH**, driven by three concrete gaps against the benchmark:
  1. **No pricing anywhere on the page** — not even the prose-level mention the kapsalon page has. A visitor must navigate away to `/tarieven` to get a number that every sampled competitor states on the page itself.
  2. **No case studies and no social-proof count.** `TrustStrip` shows "Actief sinds 2025 · Werkgebied: Groningen en omgeving · [phone]" — an honest but thin signal next to a competitor's "1000+ ondernemers" claim and named Cases section.
  3. **Same generic, non-local `ExampleSlideshow`** as every other branch/city page (architect, praktijk, SaaS — none in Groningen, none in any of the 15 cities this template serves).

**User story** (decision):
> As a Groningen business owner choosing between the dozen agencies that serve my city, I want proof this specific agency has actually delivered for other Groningen businesses, because a bad website choice wastes money I can't easily redo, but I'm blocked by AIMI showing the exact same generic mockup every other city and branch page shows, with no local client names, no review count, and no price on the page itself.
> *(Source: chuckswebdesign.nl's named Cases section + "1000+ ondernemers" claim; vrijdagonline.nl's "300+ companies from Groningen" framing — both absent on AIMI's page.)*

**Persona scores — `/website-laten-maken-groningen`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Groningen SMB owner comparing local options (decision) | 19/25 | 15/25 | 7/25 | 16/25 | 57/100 | Needs Work |

**Weakest dimension:** Trust (7/25) — no named local clients, no counts, no reviews, and pricing requires an extra click competitors don't require.

### Summary across the four targets

| Target | Keyword | SERP dominant type | AIMI page type | Mismatch | Persona score (primary) |
|---|---|---|---|---|---|
| `/website-laten-maken` | website laten maken | Service Page, price-anchored | Service Page | ALIGNED (type), HIGH gap on proof | 62/100 |
| `/tarieven` | wat kost een website laten maken | Hybrid pricing guide | Hybrid pricing guide | ALIGNED | 85/100 |
| `/website-laten-maken-kapsalon` | website laten maken kapsalon | Niche Service Page, price-forward | Service Page (branch template) | MEDIUM–HIGH (depth/format) | 57/100 |
| `/website-laten-maken-groningen` | website laten maken Groningen | Local Page with case proof | Local Page | HIGH (proof/pricing) | 57/100 |

**Supplementary SXO Gap Score for this analysis: 65/100** (average of the four primary persona totals above). This is a narrower, keyword-level benchmark against actual ranking competitor structures, not a sitewide average — it is separate from, and should not overwrite, the 77/100 score at the top of this file. It refines that earlier score: page-*type* selection is indeed correct on all four pages (confirming the original finding above), but two of the four fail on proof-of-work depth badly enough to function as a practical mismatch for the decision-stage searcher.

## New Findings

### SXO-5 — The shared example-image component shows the wrong industry on every branch and city page (High)
`ExampleSlideshow` is used by both `BranchPage.tsx` and `LocationPageV2.tsx`, and both call it with the same hard-coded `GENERIC_EXAMPLES` array (architectenbureau, praktijk, SaaS-bedrijf) — defined once in `src/components/ExampleSlideshow.tsx`. This means all 8 branch pages (kapsalon, nagelstudio, restaurant, loodgieter, etc.) and all 15 city pages show the identical three non-matching mockups. On the kapsalon page this directly contradicts the page's own copy, which promises photos of stylists' work as a trust-builder. This is one component change with a payout across 23 pages.

### SXO-6 — `/website-laten-maken`, the core money page, has zero named proof against a benchmark competitor with 3 cases + 8 reviews (High)
This sharpens SXO-1 with a concrete competitive number: wecaremedia.nl, ranking for the identical "website laten maken" query, shows 3 named client case studies and 8 named testimonials with a 4.8★/76-review aggregate directly on the page. AIMI's equivalent page shows three unlabelled stock mockups.

### SXO-7 — Vertical (branch) pages bury pricing in prose instead of a visible number (Medium-High)
Every sampled kapsalon-niche competitor states a price as a number in the hero or a dedicated pricing block. AIMI's kapsalon page (and, by template, the other 7 branch pages) mentions "€499"/"€749" only inside a paragraph under a "Wat kost..." heading — functionally invisible to a scanning reader.

### SXO-8 — City pages carry no on-page pricing and no local social-proof count (High)
The Groningen page (and, by template, the other 14 city pages) contains zero € mentions and no "X ondernemers geholpen"-style count, while the SERP-winning local competitor leads with a tiered price table and a specific local-client-count claim ("1000+ ondernemers uit de regio Groningen"). `TrustStrip`'s "Actief sinds 2025 · Werkgebied" signal is honest but does not close this gap.

## Cross-Skill References

- SXO-5/6/7/8 are E-E-A-T and content-depth issues at their core (missing proof, missing structured pricing) — recommend `/seo content` for a deeper trust/authority pass, and coordinate with existing findings CQ-3, LOC-4 and SXO-1.
- If genuine case studies are added, they should carry `Review`/`AggregateRating` schema — recommend `/seo schema` once real client-approved content exists (do not fabricate ratings).
- LOC-4 (no reviews) and SXO-6/SXO-8 point at the same root cause (no review collection process) from two different angles — fixing review collection once resolves both.

## Limitations

- SERP composition was sampled via `WebSearch` (title/snippet summaries) rather than a full top-10 raw HTML crawl; PAA boxes, ad copy, AI Overview presence, and featured-snippet format could not be directly observed, since the available tool does not expose these SERP features. Signals were inferred from result composition and from 4 competitor pages fetched in full (wecaremedia.nl ×2, chuckswebdesign.nl, sitezilla.nl).
- coolpixel.nl, the #1 result for "website laten maken kapsalon," returned HTTP 403 and could not be fetched; its structure is inferred from its title/snippet only ("Alles-in-één pakket 675,-").
- Google results are personalized and geo-sensitive; this reflects one unauthenticated query per keyword on 2026-09-06, not a tracked ranking position for AIMI's own pages.
- AIMI's page content was read directly from the React source (`src/routes`, `src/components`) rather than re-fetched via `render_page.py`/`parse_html.py` against the live site in this session. This is the shipped markup and is authoritative for structure and copy, but does not independently confirm final rendered DOM/hydration timing in production.
- Persona scores are directional, evidence-based estimates against the rubric in `seo-sxo/references/persona-scoring.md`, not derived from analytics, session recordings, or user testing.
- Only 4 of 48 pages were analyzed at this depth; the summary table's "by template" language (branch/city pages) is an inference from shared components (`BranchPage.tsx`, `LocationPageV2.tsx`, `ExampleSlideshow.tsx`), not a page-by-page re-verification of all 23 branch/city pages.

---

## SERP-Backwards Keyword Analysis — 2026-09-15 (5-keyword commercial set)

This section applies the same SERP-backwards method to the five keyword/page pairs specified for this run: the national head term, the primary local term, the webshop money page, one vertical, and the WordPress-vs-custom comparison page. Three of the five (`website laten maken`, `website laten maken groningen`, `website laten maken kapsalon`) were re-sampled fresh today; the underlying AIMI source files (`website-laten-maken.tsx`, `website-laten-maken-groningen.tsx`, `website-laten-maken-kapsalon.tsx`) are unchanged since the 2026-09-06 analysis (confirmed via `git log` — the only commit touching these files since then, `dca01f9`, added a single `path` prop and did not change copy, pricing or examples), so those three verdicts and persona scores stand and are carried forward rather than re-derived from scratch. `webshop laten maken` and `wordpress of maatwerk website` are analyzed fresh here for the first time.

**Method:** SERP composition sampled via `WebSearch` per keyword (title/snippet-level, google.nl-equivalent), then 6 competitor/reference pages fetched in full via `WebFetch` to establish structural benchmarks. AIMI page content read directly from `src/routes/*.tsx` (shipped markup) and cross-checked against `crawl-data.json`. See **Limitations (2026-09-15 addendum)** at the end.

### Target 1 — `/website-laten-maken` x "website laten maken" — CONFIRMED, unchanged

- **SERP dominant type:** Service Page, price-anchored (conversal.be "professioneel, betaalbaar", yourhosting.nl, webstijn.nl, flerque.nl). One cost-guide (stuurlui.nl, "Wat kost het om een website te laten maken in 2026?") also ranks, confirming price-guide content is a legitimate secondary format for this term — same conclusion `/tarieven` already benefits from. Confidence: 80% (4/5 pure service pages, 1/5 cost guide).
- **AIMI classification:** Service Page — **type ALIGNED**. Price shown ("vanaf € 499").
- **Verdict: ALIGNED (type), HIGH gap on proof** — unchanged from SXO-6: three unlabelled stock mockups vs. benchmark competitors' named cases and review counts.
- **Persona score:** Price-and-proof comparison shopper (decision) — **62/100**, Trust 6/25 is the binding constraint.

### Target 2 — `/website-laten-maken-groningen` x "website laten maken groningen" — CONFIRMED, unchanged

- **SERP dominant type:** Local Service Page with case proof and a stated local-client count (vrijdagonline.nl "300+ bedrijven uit Groningen", chuckswebdesign.nl "vanaf €649", adoop.nl "vanaf €749", designy.nl "best beoordeeld"). 9 results sampled, confidence ~85%.
- **AIMI classification:** Local Page — genuinely well-written local context, but **Mismatch severity: HIGH** (unchanged from SXO-8): no price on the page, no case studies, no social-proof count, and the same generic non-local `ExampleSlideshow` every city/branch page uses.
- **Persona score:** Groningen SMB owner comparing local options (decision) — **57/100**, Trust 7/25.

### Target 3 — `/website-laten-maken-kapsalon` x "website laten maken kapsalon" — CONFIRMED, unchanged

- **SERP dominant type:** Niche Service Page, price-forward (coolpixel.nl "Alles-in-één pakket 675,-", plazaxl.nl "€375 + €19,95/mnd, direct online afspraken boeken", sitezilla.nl, fbstudio.nl, vwebdesign.nl). 7 results sampled, confidence ~85%. Booking/scheduling integration is a recurring differentiator across this niche SERP.
- **AIMI classification:** Service Page (branch template) — **Mismatch severity: MEDIUM–HIGH** (unchanged from SXO-7): price is prose-only under a "Wat kost..." heading rather than a number callout, and the example image is a SaaS/architect mockup, not a salon — directly contradicting the page's own copy about "foto's van eigen werk."
- **Persona score:** Kapsalon owner, time-pressed evaluator (consideration) — **57/100**, Trust 8/25, Clarity 12/25.

### Target 4 — `/webshop-laten-maken` x "webshop laten maken" — NEW

- **SERP dominant type:** Mixed. Of 7 sampled results, 2 are DIY/SaaS builders (mijnwebwinkel.nl, mijndomein.nl), 3 are agency Service Pages (bsmedia.nl, chuckswebdesign.nl, duodor.nl), and 2 are cost-guide blog posts (opklopper.nl, eddylekens.com). This composition differs meaningfully from the other four keywords: DIY builders compete directly for this query in a way they do not for "website laten maken."
- **Deep benchmark, agency segment** (bsmedia.nl and chuckswebdesign.nl fetched in full): bsmedia shows a 4.9-star/219-review Google rating, 3 named clients (Warmtestore, Campergallery, VDK Groep) and one named testimonial. chuckswebdesign shows two numeric price tiers (**€699** / **€1.249**) directly under the H1, "1000+ tevreden klanten," 5 named/linked live shop projects, and a 12-item FAQ.
- **AIMI classification:** Service Page (`ServicePage.tsx` via `src/routes/webshop-laten-maken.tsx`) — type broadly matches the agency segment of the SERP, but three concrete gaps, one of which is more severe than the equivalent gap on any of the other four targets:
  1. **No price at all.** `priceLabel: "op aanvraag"` renders in the exact template slot where `/website-laten-maken` shows "vanaf € 499" and where every sampled competitor shows a number. Unlike the kapsalon page (price present but buried in prose), this page shows no figure whatsoever — the strongest pricing gap of the five targets, and a searcher who was about to compare AIMI's price against a ~€30/month DIY builder sees "on request" instead of a number to compare.
  2. **No named proof.** `examples` uses three category-matched but unlabelled stock mockups (`voorbeeld-webshop-1-keramiek.webp`, `-2-streetwear.webp`, `-3-koffie.webp`) — better-targeted than the shared `GENERIC_EXAMPLES` other pages use, but still no client name, no live link, no review, against a benchmark of named/linked live shops and a 4.9-star rating.
  3. **No FAQ, no comparison against DIY.** `schema_types` confirms `ItemList`, not `FAQPage` (unlike the kapsalon and groningen pages, which do have `FAQPage`). The page also never addresses why a custom build beats a low-cost DIY webshop builder, despite DIY builders occupying roughly 30% of the SERP for this exact query.
- **Mismatch severity: HIGH** (depth/proof, same family as SXO-6/7/8, but the missing price is a self-inflicted, template-level regression rather than a buried-in-prose issue).

**User stories:**
> **Awareness** — As a small retailer deciding between a DIY platform (Mijnwebwinkel, from roughly €30/mo) and hiring someone, I want a clear price so I can compare it against the DIY cost, but AIMI's page says "op aanvraag," which reads as "this is going to be expensive, contact us to find out" and pushes me back toward the DIY option I was trying to move away from.
> *(Source: DIY builders ranking directly alongside agencies for this exact query, plus all three sampled agency competitors showing explicit numbers.)*

> **Consideration** — As a starting webshop owner picking between agencies, I want to see other shops this agency actually built and how they perform, because I sell a physical product myself and want proof of e-commerce craft, but I'm shown three unlabelled stock product photos with no link to a real, live shop.
> *(Source: bsmedia.nl's named clients plus chuckswebdesign.nl's 5 linked live projects, both ranking for the identical query.)*

**Persona scores — `/webshop-laten-maken`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Starting webshop owner, DIY-vs-agency comparison (awareness/decision) | 20/25 | 14/25 | 6/25 | 17/25 | 57/100 | Needs Work |

**Weakest dimension:** Trust (6/25), tied with Clarity (14/25) — no number to anchor a price comparison and no named shop to anchor a craft comparison.

### Target 5 — `/wordpress-of-maatwerk` x "wordpress of maatwerk website" — NEW, CRITICAL finding

This target has a different failure mode than the other four: **the page content is the best-built comparison content on the site** (honest 8-row comparison table, explicit "kies WordPress als..." / "kies maatwerk als..." lists, 6-item candid FAQ that admits WordPress wins in some cases, `Article` + `FAQPage` schema) — but it is very likely optimized for a query variant that does not carry the search intent AIMI assumed.

- **SERP for the literal target phrase, "wordpress of maatwerk website":** 6/6 sampled results (dutchwebdesign.nl, wefabric.nl, wpbrothers.nl, visualpower.agency, gonzodesign.nl, maatwerk.website) are **"maatwerk WordPress" service/agency pages** — i.e. a custom-built website that still runs *on* WordPress, offered as a single service. **None of the 6 present WordPress and a non-WordPress custom build as two alternatives to choose between.** Even wpbrothers.nl, a blog-format result, is a single-option page ("Maatwerk WordPress Website: Hoe zit dat?" with advantages/disadvantages of *that one thing*, no alternative discussed). Confidence: 100% that the literal-phrase SERP carries a different intent than the page targets.
- **SERP for the adjacent phrase, "wordpress vs maatwerk website voor- en nadelen":** a genuinely different result set — redbanana.nl, postmastersoftware.nl, roefja.com, growinity.nl, vroeghweb.nl, task4studios.com — all real WordPress-vs-custom pro/con comparisons. Notably, **goedkope-website-latenmaken.nl ranks here with the title "WordPress of maatwerk website: wat is de beste keuze voor jouw bedrijf?"** — nearly word-for-word AIMI's own title — but it surfaces under the "vs" query, not the "of" query AIMI targets. This is strong evidence that Google's index associates genuine comparison intent with "vs"-style phrasing (or a broader semantic cluster reachable via it) rather than with the literal "of" phrase, for this topic.
- **AIMI classification:** Comparison/Buying-Guide Article — this **is** the correct universal page type for real WordPress-vs-custom intent, and the content quality is high. **Mismatch severity: CRITICAL, but it is a keyword-targeting mismatch, not a content-quality mismatch.** The page is very unlikely to rank for its own literal target phrase because that phrase's SERP is dominated by a different (single-option, WordPress-selling) intent; the query that actually carries comparison intent is one AIMI does not target in the title, H1, or URL.
- **Practical implication:** because this is a findability problem rather than an on-page problem, a persona score assuming the user has arrived on the page (below) is high — but that score is close to moot in practice if organic traffic for the literal target phrase is low. This is the one target in the set of five where the fix is cheap (re-target the primary keyword/H1/title toward the "vs" phrasing or dual-target both variants) rather than requiring new content, proof, or pricing work.

**User stories:**
> **Decision, from the intent this content actually matches (the "vs" SERP)** — As a business owner who has already ruled out DIY and is choosing between a WordPress-focused agency and a custom-build agency, I want an unbiased side-by-side of cost, speed, maintenance and lock-in, because I don't want to be steered toward whichever platform the agency happens to sell, and most agency "comparison" pages are sales copy in disguise.
> *(Source: roefja.com / growinity.nl / task4studios.com's genuine pro/con structure; goedkope-website-latenmaken.nl's near-identical title ranking under the "vs" query instead of the "of" query AIMI targets.)*

> **Awareness, from the query AIMI actually targets (the "of" SERP)** — As someone typing "wordpress of maatwerk website" into Google, what I actually find is a wall of "maatwerk WordPress" service offers, not a neutral comparison — so if my real question was "which of these two approaches should I pick," the dominant results don't answer it, and neither, in practice, does AIMI's page, because it isn't visible there.
> *(Source: 6/6 sampled results for the literal phrase are single-option "maatwerk WordPress" service pages.)*

**Persona scores — `/wordpress-of-maatwerk`** (on-page quality, assuming arrival — see practical implication above)

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Comparison-shopper, WordPress vs. custom (decision) | 24/25 | 24/25 | 20/25 | 15/25 | 83/100 | Excellent (on-page), but low practical reach |

**Weakest dimension on-page:** Action (15/25) — not because the CTA is weak (it is candid and low-pressure: "we zeggen eerlijk welke kant we zouden kiezen, ook als dat WordPress is"), but because the score cannot credit conversions that a mistargeted keyword prevents from ever arriving.

### Summary across the five targets

| Target | Keyword | SERP dominant type | AIMI page type | Verdict | Mismatch severity | Persona score |
|---|---|---|---|---|---|---|
| `/website-laten-maken` | website laten maken | Service Page, price-anchored | Service Page | Type ALIGNED, proof gap | High (proof) | 62/100 |
| `/website-laten-maken-groningen` | website laten maken groningen | Local Page, case proof + count | Local Page | Type ALIGNED, proof/price gap | High (proof/price) | 57/100 |
| `/webshop-laten-maken` | webshop laten maken | Service Page (mixed w/ DIY + cost-guide) | Service Page | Type ALIGNED, proof/price gap | High (proof/price) | 57/100 |
| `/website-laten-maken-kapsalon` | website laten maken kapsalon | Niche Service Page, price-forward | Service Page (branch template) | Type ALIGNED, depth/format gap | Medium-High | 57/100 |
| `/wordpress-of-maatwerk` | wordpress of maatwerk website | "Maatwerk WordPress" service pages (not comparison) | Comparison Article | **Keyword/intent mismatch** | **Critical** | 83/100 (on-page only) |

**Supplementary SXO Gap Score for this 5-keyword analysis: 63/100** (average of the five primary persona totals above: 62, 57, 57, 57, 83). This is a keyword-level benchmark against actual ranking competitor structures for five specific commercial terms, separate from — and not a replacement for — the sitewide 77/100 score at the top of this file. Read together with the four-target 2026-09-06 analysis (65/100), the pattern holds across seven of eight sampled keyword/page pairs: page **type** selection is correct almost everywhere on the site, but proof-of-work depth (named cases, reviews, live examples) and, on two pages, visible pricing, are consistently the binding constraint. The one exception (`/wordpress-of-maatwerk`) is a different failure mode entirely — excellent content aimed at a keyword phrase whose SERP does not carry the intent the content answers.

## New Findings (2026-09-15)

### SXO-9 — `/webshop-laten-maken` shows no price at all, in the exact slot where every sampled competitor and every other AIMI service page shows a number (High)
`priceLabel: "op aanvraag"` sits in the same template position that renders "vanaf € 499" on `/website-laten-maken`. Every sampled competitor for "webshop laten maken" (bsmedia.nl, chuckswebdesign.nl at €699/€1.249) leads with a number, and DIY builders (mijnwebwinkel.nl, mijndomein.nl) compete directly in this SERP at roughly €30/month — meaning a price-comparing visitor who lands on AIMI's page gets no anchor at all, at the exact moment they are weighing a DIY alternative. This is a stronger version of SXO-7 (prose-only pricing): here there is no figure whatsoever.

### SXO-10 — `/wordpress-of-maatwerk` is high-quality content that likely does not rank for its own target phrase (Critical)
The literal phrase "wordpress of maatwerk website" returns a SERP where 6/6 sampled results are single-option "maatwerk WordPress" (custom-built-on-WordPress) service pages, not WordPress-vs-custom comparisons. A near-identical competitor title ("WordPress of maatwerk website: wat is de beste keuze voor jouw bedrijf?" on goedkope-website-latenmaken.nl) instead ranks under the adjacent "wordpress vs maatwerk website" query. AIMI's page is well-built comparison content answering genuine comparison intent — but the keyword it is titled, H1'd and URL'd for does not appear to carry that intent in Google's index. Unlike SXO-6/7/8/9, the fix here is not more proof or pricing; it is re-targeting the primary keyword (title, H1, and ideally an added "vs" variant in on-page copy) toward the phrasing that actually returns comparison-intent results.

## Cross-Skill References (2026-09-15 addendum)

- SXO-9 is a one-line content fix (replace `priceLabel: "op aanvraag"` with a real "vanaf €" figure on `/webshop-laten-maken`) — no `/seo` sub-skill needed, but coordinate with `/tarieven` so the number matches whatever webshop tier is published there.
- SXO-10 is a keyword-research/on-page targeting question, not a content-quality or schema question — recommend a manual check in Google Search Console (if the site has query-level data for this URL) before retitling, to confirm whether "wordpress of maatwerk website" is genuinely near-zero-volume/mismatched-intent versus this being sample noise from one unauthenticated `WebSearch` call.
- SXO-9 and the DIY-builder competition observed in the `webshop laten maken` SERP together suggest the webshop page would also benefit from a short "waarom niet zelf een webshop bouwen" section — content-strategy work for `/seo content` rather than an SXO structural fix.

## Limitations (2026-09-15 addendum)

- SERP composition for all five keywords was sampled via `WebSearch` (title/snippet summaries), not a full top-10 raw HTML crawl; PAA boxes, ad copy, AI Overview presence and featured-snippet format could not be directly observed.
- Six competitor/reference pages were fetched in full via `WebFetch` for structural benchmarking (bsmedia.nl, wefabric.nl, chuckswebdesign.nl/webshop-laten-maken, wpbrothers.nl); the remaining SERP entries are represented by title/snippet only.
- The "wordpress of maatwerk website" finding (SXO-10) rests on one unauthenticated `WebSearch` query per phrasing variant on 2026-09-15, not on Search Console impression/query data for AIMI's own page — it is a strong directional signal (6/6 and a near-identical competitor title switching SERPs between phrasings), not a confirmed ranking-position measurement. Recommend confirming with GSC query data before making title/H1 changes.
- Three of the five verdicts (`website laten maken`, `groningen`, `kapsalon`) reuse the 2026-09-06 analysis rather than re-fetching competitor pages fresh today; this was a deliberate efficiency choice after confirming via `git log` that the underlying AIMI source files are unchanged, not an assumption that the SERPs themselves are unchanged.
- Google results are personalized and geo-sensitive; this reflects unauthenticated queries on 2026-09-06 and 2026-09-15, not tracked ranking positions for AIMI's own pages.
- Persona scores remain directional, evidence-based estimates, not derived from analytics, session recordings, or user testing.

Generate a PDF report? Use `/seo google report`.
