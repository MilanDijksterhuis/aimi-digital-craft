# Sitemap & Site Structure Audit — aimi-development.nl

**Date:** 2026-09-02
**Sitemap:** https://aimi-development.nl/sitemap.xml (5.6 KB, 47 URLs)
**Score: 88 / 100**

## Summary

The sitemap is hand-maintained (via `src/routes/sitemap[.]xml.tsx`), well-formed, and every one of its 47 URLs was live-checked: all return **HTTP 200** with no redirects, no 404s, and no `noindex` tags. Correctly-disallowed paths (`/portal`, `/admin`, `/account`, `/server`, `/api/`, `/track.js`) and the noindexed `/login` page are all absent from the sitemap. No `priority`/`changefreq` are present (correct — Google ignores both). A prior manual audit flagged that branche and stad (city) pages didn't cross-link — this has since been fixed: the sitewide `Footer` now links to all 15 cities and all 15 branches from every public page, and each detail page also carries 2-4 contextual "Ook interessant" links to specific related branch/city pairs, plus the `/branches` and `/webdesign` hub pages link to all their children. Click depth from the homepage to any leaf page is effectively **1** via the footer. The one real gap is a genuinely indexable, internally-linked tool page (`/website-checker`) that is missing from the sitemap.

## What Works

- Valid `urlset` XML per the sitemaps.org protocol; parses cleanly, one `<loc>`+`<lastmod>` pair per URL, no schema errors.
- All 47 URLs return 200 (verified via direct request, no `-L` follow, checked for redirect targets — none found).
- None of the 47 URLs carry a `noindex` meta/header.
- No deprecated `priority`/`changefreq` tags — nothing to clean up.
- robots.txt-disallowed paths (`/portal`, `/admin`, `/account`, `/server`, `/api/`, `/track.js`) are correctly excluded from the sitemap.
- `/login` is crawlable per robots.txt (intentionally, so Googlebot can read its `noindex` meta tag) but correctly excluded from the sitemap.
- 47 URLs / 5.6 KB is trivially within Google's 50,000 URL / 50 MB per-file limit; a sitemap index is not needed.
- Internal linking / doorway-pattern remediation already in place: sitewide footer links to all 15 branche pages and all 15 stad pages (code comment `A-30` confirms this fixed a prior gap of "2 of 15 cities, 0 of 15 branches" linked); hub pages `/branches` and `/webdesign` each link to all 15 children; each detail page has hand-picked cross-links to a relevant sibling branch/city. Click depth from homepage to any location/branch page is 1.
- `lastmod` values are valid W3C dates (`YYYY-MM-DD`) and are described in code as manually maintained per meaningful content change, not an auto-generated build timestamp — the right intent per Google's guidance.
- A single flat sitemap (no image/news/per-type split) is appropriate at this scale (47 pages); splitting would add unneeded complexity.

## Findings

### 1. `/website-checker` is a real, linked, indexable page missing from the sitemap
- **Severity:** Medium
- **Description:** `/website-checker` (the free website-scan tool) returns 200, has full meta tags, OG/Twitter tags, a canonical URL, and its own BreadcrumbList JSON-LD (`src/routes/website-checker.tsx`), carries no `noindex`, and is linked from the homepage Hero CTA (`src/components/Hero.tsx`) and from the sitewide Nav dropdown (`src/components/Nav.tsx`) — i.e., it's reachable from every page and clearly meant to be indexed. It is the only publicly-linked, indexable route not present in the hardcoded sitemap entry list.
- **Recommendation:** Add `{ path: "/website-checker", lastmod: "<real last-edit date>" }` to the `entries` array in `src/routes/sitemap[.]xml.tsx`.

### 2. `lastmod` values are hand-maintained and clustered in a 3-day window
- **Severity:** Low
- **Description:** All 47 `lastmod` dates fall between 2026-08-20 and 2026-08-22 — plausible for a recent initial rollout of these pages, and the code comment confirms the intent is "date of the last substantive change" rather than a build-time stamp. The risk is drift going forward: because the array is a manually-edited literal list, any future content edit that forgets to bump its `lastmod` will silently leave a stale (and eventually inaccurate/gameable-looking) date, and there's no build-time check enforcing it.
- **Recommendation:** Low priority given current accuracy, but consider deriving `lastmod` from the file's last meaningful git commit date (or a lightweight per-page "last edited" front-matter field) so it can't drift silently as the site grows past a handful of contributors.

### 3. No image sitemap / no sitemap splitting by content type
- **Severity:** Info / Low priority
- **Description:** The site has a single flat sitemap covering all 47 URLs with no separate image or per-content-type sitemap.
- **Recommendation:** Not warranted yet at this scale. Revisit only if the site adds a substantial image-heavy content type (e.g., a portfolio/case-study gallery) where image search traffic would matter, or once total URL count grows enough to benefit from a sitemap index split by section (services / branches / regions).

## Not Findings (Verified Clean)

- XML validity, HTTP status of all 47 URLs, absence of `priority`/`changefreq`, robots.txt exclusion correctness, and branche↔stad internal cross-linking (previously flagged, now fixed via Footer + hub pages + per-page related links) — all verified as passing, no action needed.
