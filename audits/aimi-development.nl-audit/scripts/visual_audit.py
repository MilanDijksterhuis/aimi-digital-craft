import json
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "https://aimi-development.nl"
PAGES = {
    "homepage": "/",
    "website-laten-maken": "/website-laten-maken",
    "tarieven": "/tarieven",
    "contact": "/contact",
}

OUT_DIR = Path(r"C:\Users\milan\Documents\AIMI\aimi-digital-craft\aimi-development.nl-audit")
SHOT_DIR = OUT_DIR / "screenshots"
SHOT_DIR.mkdir(parents=True, exist_ok=True)

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
}

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch()
    for page_key, path in PAGES.items():
        url = BASE + path
        results[page_key] = {}
        for vp_key, vp in VIEWPORTS.items():
            is_mobile = vp_key == "mobile"
            context = browser.new_context(
                viewport=vp,
                device_scale_factor=2 if is_mobile else 1,
                is_mobile=is_mobile,
                has_touch=is_mobile,
                user_agent=(
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 "
                    "(KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
                ) if is_mobile else None,
            )
            page = context.new_page()

            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

            layout_shifts = []
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as e:
                results[page_key][vp_key] = {"error": str(e)}
                context.close()
                continue

            time.sleep(1.2)  # let animations / late CLS settle

            fname = f"{page_key}-{vp_key}.png"
            fpath = SHOT_DIR / fname
            page.screenshot(path=str(fpath), full_page=True)

            # above-the-fold screenshot too (viewport only, not full page) - separate file for mobile fold check
            fold_fname = f"{page_key}-{vp_key}-fold.png"
            fold_path = SHOT_DIR / fold_fname
            page.screenshot(path=str(fold_path), full_page=False)

            metrics = page.evaluate(
                """
                () => {
                  const docEl = document.documentElement;
                  const bodyRect = document.body.getBoundingClientRect();
                  const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 1;
                  const viewportMeta = document.querySelector('meta[name="viewport"]');
                  // find first h1
                  const h1 = document.querySelector('h1');
                  const h1Rect = h1 ? h1.getBoundingClientRect() : null;
                  // find CTA-like elements: buttons, links with cta-ish text or role
                  const ctaSelectors = ['a[href*="contact"]','button','a.btn','a[class*="cta"]','a[class*="button"]'];
                  let cta = null;
                  for (const sel of ctaSelectors) {
                    const els = Array.from(document.querySelectorAll(sel));
                    for (const el of els) {
                      const r = el.getBoundingClientRect();
                      const style = getComputedStyle(el);
                      if (r.width > 0 && r.height > 0 && style.visibility !== 'hidden' && style.display !== 'none') {
                        cta = {
                          text: (el.textContent || '').trim().slice(0,60),
                          top: r.top, left: r.left, width: r.width, height: r.height,
                          inViewport: r.top >= 0 && r.top < window.innerHeight
                        };
                        break;
                      }
                    }
                    if (cta) break;
                  }
                  // smallest tap targets among interactive elements
                  const interactive = Array.from(document.querySelectorAll('a, button, input, select, textarea, [role="button"]'));
                  const small = [];
                  interactive.forEach(el => {
                    const r = el.getBoundingClientRect();
                    if (r.width === 0 || r.height === 0) return;
                    const style = getComputedStyle(el);
                    if (style.visibility === 'hidden' || style.display === 'none') return;
                    if (r.width < 44 || r.height < 44) {
                      small.push({
                        tag: el.tagName.toLowerCase(),
                        text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0,40),
                        width: Math.round(r.width),
                        height: Math.round(r.height),
                        top: Math.round(r.top),
                        left: Math.round(r.left)
                      });
                    }
                  });
                  // base font size on body / p
                  const bodyFont = getComputedStyle(document.body).fontSize;
                  const pEl = document.querySelector('p');
                  const pFont = pEl ? getComputedStyle(pEl).fontSize : null;
                  // cookie banner detection
                  const cookieSelectors = ['[class*="cookie"]','[id*="cookie"]','[class*="consent"]','[id*="consent"]'];
                  let cookieBanner = null;
                  for (const sel of cookieSelectors) {
                    const el = document.querySelector(sel);
                    if (el) {
                      const r = el.getBoundingClientRect();
                      if (r.width > 0 && r.height > 0) {
                        cookieBanner = { selector: sel, top: r.top, height: r.height, coversViewportPct: Math.min(100, Math.round((r.height / window.innerHeight) * 100)) };
                        break;
                      }
                    }
                  }
                  return {
                    scrollWidth: document.documentElement.scrollWidth,
                    innerWidth: window.innerWidth,
                    hasHorizontalOverflow,
                    viewportMetaContent: viewportMeta ? viewportMeta.getAttribute('content') : null,
                    h1Text: h1 ? h1.textContent.trim().slice(0,120) : null,
                    h1InViewport: h1Rect ? (h1Rect.top >= 0 && h1Rect.top < window.innerHeight) : false,
                    h1Top: h1Rect ? h1Rect.top : null,
                    cta,
                    smallTapTargetsCount: small.length,
                    smallTapTargetsSample: small.slice(0, 10),
                    bodyFontSize: bodyFont,
                    pFontSize: pFont,
                    cookieBanner,
                    documentHeight: document.documentElement.scrollHeight
                  };
                }
                """
            )

            # Measure CLS via PerformanceObserver injected before load would be more accurate;
            # here we approximate by re-checking layout after short wait (already done above).
            try:
                cls_value = page.evaluate(
                    """
                    () => new Promise(resolve => {
                        let cls = 0;
                        try {
                          const po = new PerformanceObserver((list) => {
                            for (const entry of list.getEntries()) {
                              if (!entry.hadRecentInput) cls += entry.value;
                            }
                          });
                          po.observe({type: 'layout-shift', buffered: true});
                          setTimeout(() => { resolve(cls); }, 500);
                        } catch(e) { resolve(null); }
                    })
                    """
                )
            except Exception:
                cls_value = None

            metrics["clsApprox"] = cls_value
            metrics["consoleErrors"] = console_errors[:10]
            metrics["screenshotFull"] = str(fpath)
            metrics["screenshotFold"] = str(fold_path)

            results[page_key][vp_key] = metrics
            context.close()
    browser.close()

with open(OUT_DIR / "visual_metrics.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print("DONE")
print(json.dumps(results, indent=2, ensure_ascii=False)[:2000])
