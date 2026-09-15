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

Generate a PDF report? Use `/seo google report`.
