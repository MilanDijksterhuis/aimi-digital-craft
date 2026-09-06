# Visual & Mobile — 2026-09-04

**Method note:** this round was a headless HTTP audit; no new Playwright screenshots were captured. The images in [`screenshots/`](screenshots/) are from the 2026-09-02 audit and are retained for reference. Findings below are limited to what is verifiable from the served markup and headers.

## What works

- **Viewport meta present on 48/48 pages** — no mobile-rendering blocker anywhere.
- **Every image carries explicit `width` and `height`** (0 of 33 missing). This is the primary defence against layout shift, and it is applied consistently — a common source of poor CLS is simply absent here.
- **Responsive hero** with a 640/960/1280 WebP `srcset`, so phones do not download the desktop asset.
- **Font preloaded with `crossorigin` and self-hosted**, avoiding a third-party connection on the critical path and reducing FOUT risk.
- Content is fully server-rendered — nothing depends on client hydration to become visible.

## Findings

### VIS-1 — Above-fold bandwidth contention on mobile (Medium)
Not a layout problem but a perceived-speed one. On first paint the browser is asked to fetch, concurrently: an uncompressed 881 KB JS bundle, an uncompressed 106 KB CSS file, a 74 KB uncached hero WebP, a 27 KB uncached font, and 21 `modulepreload` chunks. On a mid-tier phone over 4G this is where the site feels slower than it is — the server responds in 46 ms and the transfer layer then undoes it.

Phase 1.1 and 4.1 of the action plan address this directly.

### VIS-2 — No lazy loading below the fold (Low)
0 of 33 images use `loading="lazy"`, so below-fold images compete with the hero. See IMG-1.

## Recommended for the next round
Re-capture desktop and mobile screenshots after Phase 1 lands, so the before/after is measurable rather than inferred.
