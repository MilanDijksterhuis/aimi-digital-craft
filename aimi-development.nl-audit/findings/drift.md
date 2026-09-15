# SEO Drift — 2026-09-06

Baseline: id 1, captured 2026-09-03T16:28:45Z (homepage `https://aimi-development.nl/`).
Compared against live state fetched 2026-09-06T20:55:07Z via `claude-seo run drift_compare.py`.

Summary: **0 CRITICAL / 2 WARNING / 1 INFO** (of 17 rules checked).

## Homepage (`https://aimi-development.nl/`)

| Rule | Severity | Old value | New value | Action |
|---|---|---|---|---|
| `title_changed` | WARNING | "AIMI — Webdesignbureau uit Noord-Nederland \| Websites & webshops" | "AIMI — Webdesignbureau uit Veendam \| Websites & webshops" | Intentional-looking copy change (region → city). Monitor CTR in Search Console over 2 weeks. Recommend `/seo page https://aimi-development.nl` or `/seo content https://aimi-development.nl` to confirm keyword targeting is still sound. |
| `schema_modified` | WARNING | hash `7e8acff7c232...` | hash `0b0ebcb88998...` | JSON-LD payload changed (block count unchanged at 3, so nothing was removed, but content differs). Recommend `/seo schema https://aimi-development.nl` to validate the updated structured data. |
| `content_hash_changed` | INFO | hash `40fd74d8d0c9...` | hash `bb5bc6538715...` | Expected consequence of the title/schema edits above — HTML body hash differs from baseline. No action needed beyond the two items above. |

### Unchanged / stable (no drift)
- Canonical: `https://aimi-development.nl/` — unchanged
- Robots meta: `null` (no noindex) — unchanged
- H1: "Websites die échtwerken." — unchanged (100% similarity)
- Title presence — not removed (edited only)
- Status code: 200 → 200 — unchanged
- Meta description — unchanged
- OG tags — all 10 tags still present, unchanged
- Schema presence — still 3 blocks (not removed, not newly added)
- H2 structure — 6 H2s, unchanged
- CWV / performance score comparison — **skipped**, no CWV data in baseline (`has_cwv: false`) and none captured now

No CRITICAL findings. All 8 CRITICAL-tier rules (schema removed, canonical changed/removed, noindex added, H1 removed/changed >50%, title removed, status code 4xx/5xx) evaluated to "unchanged."

## `/tarieven`

**No pre-existing baseline was found** for `https://aimi-development.nl/tarieven` — `drift_compare.py` returned "No baseline found," so no regression comparison could be run for this page in this pass. Baseline capture requires a full separate cycle (baseline now, compare later); this is a **stability gap**, not a confirmed-stable result.

To close the gap for next time, an initial baseline was captured during this session:
- baseline id 2, timestamp 2026-09-06T20:55:45Z
- title: "Wat kost een website laten maken? Tarieven vanaf € 499"
- canonical: `https://aimi-development.nl/tarieven`
- H1: "Wat kost een website laten maken?"
- status: 200, 5 schema blocks, 10 OG tags, 7 H2 / 12 H3
- CWV: not captured

This is a **baseline only**, not a comparison — no drift conclusion can be drawn for `/tarieven` until a future run diffs against baseline id 2.

## Incomplete / not verified in this pass

- **Core Web Vitals drift**: not evaluated for either page — no CWV data exists in the homepage baseline (`has_cwv: false`) and none was captured in this comparison run, so the `cwv_regressed` and `perf_score_dropped` rules were skipped, not confirmed passing.
- **Other key pages beyond `/tarieven`**: not checked (no baselines exist yet for any additional URLs; only homepage had a baseline going into this session).
- **HTML report generation** (`drift_report.py`) was not run — not requested for this pass; can be generated on request for stakeholder sharing.
- **`audit-data.json` category integration**: not completed in this pass per explicit instruction to prioritize getting this findings file written; the "SEO Drift" category and structured JSON findings still need to be added separately.

## Cross-skill recommendations

- Title change on homepage: run `/seo page https://aimi-development.nl` or `/seo content https://aimi-development.nl` to confirm the Veendam-focused title still serves intent/keyword strategy, and watch Search Console CTR for ~2 weeks.
- Schema modification on homepage: run `/seo schema https://aimi-development.nl` to validate the new JSON-LD is still well-formed and eligible for the same rich results as before.
- No canonical/indexability or performance-regression action needed at this time (both stable/skipped, not regressed).

## Bottom line

Homepage: **no critical drift**. Two intentional-looking WARNING-level content changes (title copy, schema payload) worth a quick validation pass, not an emergency. `/tarieven`: **baseline captured for the first time this session** — treat as a new starting point, not a confirmed-stable result, until the next comparison run.
