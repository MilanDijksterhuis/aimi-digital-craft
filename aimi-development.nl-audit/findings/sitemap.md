# Sitemap & Architecture — 2026-09-04

Score: **84/100**

## What works

- Valid XML, correct namespace, 48 URLs, **all resolving 200** in canonical form.
- No `changefreq`/`priority` — correct; Google ignores both.
- Declared in robots.txt.
- Noindexed portal/auth routes correctly excluded.
- **Zero orphan pages** — every URL has inbound links.
- Flat, readable, keyword-aligned URLs (`/website-laten-maken-veendam`) with no parameters or nesting depth issues.

## Findings

### SM-1 — Every page links to every other page (Medium)
The strongest structural signal in this audit. Inbound internal links per page:

- 47 of 48 pages: **exactly 48 inbound links**
- `/website-checker`: 46
- Average outbound internal links per page: **49**

Because the navigation and footer expose the entire site on every page, link equity is distributed perfectly evenly — which means **it carries no information**. Google infers topical hierarchy partly from internal link patterns, and this pattern says every page is exactly as important as every other.

The pages that should be strongest (`/website-laten-maken`, `/tarieven`) receive no more internal support than `/algemene-voorwaarden`.

The fix is not to remove navigation — it is to add *contextual* in-body links that create an actual hierarchy: city pages → their region hub and the main service page; branch pages → related branches and `/tarieven`. Body-content links carry more weight than boilerplate nav links, and the current "Ook interessant" blocks are the natural place to build this.

### SM-2 — `lastmod` values are stale (Low)
See TECH-5: 47 of 48 URLs date to 2026-08-20/22 despite a 2026-09-03 deploy.

### SM-3 — No `/sitemap_index.xml` (Info)
Returns 404. Entirely fine at 48 URLs — a single sitemap is correct until roughly 10,000 URLs. Noted only to confirm it is intentional.
