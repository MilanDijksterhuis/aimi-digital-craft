# Sitemap & Architecture — 2026-09-06

Score: **82/100**

Note on scope: this pass focused on XML validity, robots.txt declaration, lastmod
accuracy, and the programmatic industry×city quality gate, using a fresh fetch of
the live sitemap plus git history as the source of truth for "genuine last
change." Per-URL live status-code / canonical re-crawl was **not repeated** in
this pass — the prior audit (2026-09-04) already verified all 48 URLs resolve
200 in canonical form with zero orphans, and nothing in this pass (robots.txt,
route file structure) suggests that has changed, but it should be treated as
**carried over, not independently re-verified today**.

## Checks performed

| Check | Result |
|---|---|
| `https://aimi-development.nl/sitemap.xml` reachable | ✅ HTTP 200, `Content-Type: application/xml` |
| XML well-formed, correct `urlset` namespace | ✅ Valid (verified via `claude-seo sitemap_discovery.py` + manual parse) |
| Declared in robots.txt | ✅ `Sitemap: https://aimi-development.nl/sitemap.xml` present, single line, correct absolute URL |
| No competing/orphaned sitemap files | ✅ `sitemap_index.xml`, `sitemap-index.xml`, `wp-sitemap.xml` all correctly 404 — no stray candidates |
| URL count vs. 50,000 cap | ✅ 48 URLs — 0.1% of the limit, no split needed |
| File size vs. 50MB cap | ✅ Trivial (~6KB) |
| `priority` / `changefreq` tags | ✅ Absent entirely — correct, nothing to remove |
| `lastmod` present on every `<url>` | ✅ All 48 entries have a valid `YYYY-MM-DD` W3C Datetime |
| All `lastmod` identical (fake-freshness smell) | ✅ Not identical — 5 distinct dates spread across Aug 20 – Sep 6 |
| Per-URL live status code / canonical self-reference | ⚠️ Not re-crawled this pass — relying on 2026-09-04 audit result (all 200, canonical) |
| `robots.txt` Disallow rules leak into sitemap | ✅ No — `/portal`, `/admin`, `/account`, `/server`, `/api/` are correctly absent from the sitemap |
| City × industry cross-combinations | ✅ Confirmed absent (e.g. no `/website-laten-maken-kapsalon-groningen`) — see PSEO-1 |

## Findings

### SM-1 — `lastmod` accuracy: mix of genuine updates and unbacked freshness bumps (Medium)

`src/lib/seo.ts` introduced a `PAGE_DATES` map (currently **uncommitted** — `git status`
shows `M src/lib/seo.ts`) that is the single source for the sitemap `lastmod`,
the `WebPage.dateModified` schema, and a visible "Bijgewerkt op" line. This is
good architecture (one source of truth, no drift between the three signals) —
but the dates themselves don't all correspond to a real content commit, which
matters because the code comment explicitly frames this as a GEO/freshness
signal for AI answer engines. Cross-checking `PAGE_DATES` against `git log` per
route file:

**Backed by a real content commit that day (genuine):**
- `/` → `2026-09-06` — homepage `<title>` changed same day (commit `59bb970`)
- `/seo` → `2026-09-06` — new sourced paragraph + title change same day (`59bb970`)
- `/tarieven` → `2026-09-06` — title tag changed same day (`59bb970`)

**Claimed `2026-09-06` with no corresponding commit that day (unbacked — fake-freshness risk):**
- `/website-laten-maken` — `PAGE_DATES` says `09-06`; last real commit to the route file is `2026-09-03`
- `/website-laten-maken-veendam` — `PAGE_DATES` says `09-06`; last real commit is `2026-09-03`
- `/faq` — `PAGE_DATES` says `09-06`; the FAQ route/component last changed `2026-08-22`/`08-21`

**Stale in the other direction (real edit not reflected):**
- `/over-ons` — `PAGE_DATES` still says `2026-08-20`, but commit `8af95bc` ("backlink", `2026-09-06`) added a new paragraph/link to that page the same day. The map wasn't updated to match.

Recommendation: `PAGE_DATES` must only be bumped in the same commit that makes
the qualifying content edit (title/meta tweaks count if genuinely user-visible,
but should be bundled, not pre-dated). Consider a pre-commit or CI check that
diffs changed route files against `PAGE_DATES` so entries can't drift in either
direction. Until `/website-laten-maken`, `/website-laten-maken-veendam`, and
`/faq` get an actual edit, roll their dates back to their real last-change date
— an unbacked "fresh" date is exactly the doorway-style manipulation Google's
freshness/quality signals are designed to discount, and if noticed erodes trust
in the other (genuine) dates in the same file.

### SM-2 — `PAGE_DATES` change is uncommitted / not yet deployed (Low, process)

The live sitemap (fetched just now) still shows the *previous* generation of
dates (e.g. `/` = `2026-09-04`, `/tarieven` = `2026-09-04`, `/website-laten-maken-veendam`
= `2026-08-21`, `/faq` = `2026-08-20`) because `src/lib/seo.ts` with the new
`PAGE_DATES` map is a local working-tree change (`git status` → ` M src/lib/seo.ts`),
not yet committed/pushed/deployed. Once committed and deployed, re-verify the
live sitemap matches the source map exactly — and fix SM-1 first so the deploy
doesn't ship the unbacked dates.

### SM-3 — No `/sitemap_index.xml` (Info)

Returns 404, as expected. Entirely correct at 48 URLs — a single flat sitemap
is fine until roughly 10,000 URLs; a split index is unnecessary overhead here.

### SM-4 — Every page links to every other page (Medium, carried over from 2026-09-04)

Not re-measured this pass, but nothing in the route structure changed to
address it: global nav + footer expose all 48 URLs from every page, so internal
link equity is distributed perfectly evenly and carries no hierarchy signal.
Re-verify once contextual in-body links ("Ook interessant" blocks) are added
between city pages → region hub/service page, and branch pages → related
branches/`/tarieven`.

## Programmatic SEO quality gate — industry × city pages

- **13 industry-vertical pages** (`/website-laten-maken-{industry}`: kapsalon,
  nagelstudio, schoonheidssalon, pedicure, hovenier, klusbedrijf, schilder,
  loodgieter, autobedrijf, autorijschool, makelaar, boekhouder, restaurant,
  cateringbedrijf, bloemist — 15 counted in the live sitemap, slightly more
  than the 13 stated in the brief; treat 13 as the intended set and confirm
  the extra two weren't unintentional duplicates)
- **13 city pages** (`/website-laten-maken-{city}`: veendam, hoogeveen,
  groningen, assen, hoogezand, stadskanaal, emmen, winschoten, roden,
  coevorden, meppel, leeuwarden, drachten, heerenveen, sneek — again 15
  counted live, one more than 13 stated)
- **No industry × city cross-combinations exist** — confirmed no URL of the
  form `/website-laten-maken-kapsalon-groningen`. This keeps total
  programmatic surface at ~26–30 pages combined, well under both the 30-page
  WARNING threshold and the 50-page HARD STOP for location-style pages.

This is a reasonable, intentional scope decision, not a sitemap-validity
defect: cross-multiplying 13×13 would produce 169 near-duplicate
"[industry] website in [city]" pages with a real doorway-page risk (thin,
templated, city-name-swapped content), which is exactly the pattern the
quality gate exists to catch. Recommendation: if the business ever wants to
target industry+city intent (e.g. "kapsalon website Groningen"), do it via
on-page sections/FAQ blocks on the existing city or industry page rather than
new templated URLs, to avoid crossing the WARNING threshold later.

⚠️ Because this pass did not re-crawl each of the 30 template pages, uniqueness
of body content per page (the 60%+ threshold that applies once past 30
location-style pages) was **not verified** here. At the current ~26-30 count
this is a WARNING-adjacent, not HARD STOP, scale — worth a dedicated
content-uniqueness sample check in a follow-up pass before adding any more
industry or city pages.

## Robots.txt cross-check

```
User-agent: *
Allow: /
Disallow: /portal
Disallow: /admin
Disallow: /account
Disallow: /server
Disallow: /api/
Disallow: /track.js
Sitemap: https://aimi-development.nl/sitemap.xml
```

- Declaration format is correct (absolute URL, own line, standard directive).
- All `Disallow`ed paths are correctly absent from the sitemap — no wasted
  crawl budget declared for pages Google shouldn't index.
- `/login` is intentionally left crawlable (per code comment) so Googlebot can
  read its `noindex` meta tag — also correctly absent from the sitemap. Good
  practice: `noindex` pages should never appear in the sitemap even if
  crawlable.
- AI-crawler allowances (`GPTBot`, `PerplexityBot`, `ClaudeBot`,
  `Google-Extended`, etc.) don't affect sitemap scope and are consistent with
  the GEO-freshness intent visible in `src/lib/seo.ts`.

## Not verified this pass (explicitly flagged, per time-box)

- Live per-URL status codes / canonical self-reference for all 48 URLs
  (relying on the 2026-09-04 audit's "all 200, canonical" result).
- Rendered-page crawl to discover internal links not present in the sitemap
  (relying on route-file enumeration in `src/routes/` instead of a live
  render pass).
- Body-content uniqueness sampling across the 15 industry / 15 city pages.

## Relevant files

- `c:\Users\milan\Documents\AIMI\aimi-digital-craft\src\routes\sitemap[.]xml.tsx` — sitemap generator (reads `PAGE_DATES`)
- `c:\Users\milan\Documents\AIMI\aimi-digital-craft\src\lib\seo.ts` — `PAGE_DATES` map, currently uncommitted (see SM-1/SM-2)
- `c:\Users\milan\Documents\AIMI\aimi-digital-craft\public\robots.txt` — sitemap declaration, Disallow rules
