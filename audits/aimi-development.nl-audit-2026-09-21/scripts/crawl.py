"""Crawl sitemap URLs and extract on-page SEO signals into crawl-data.json."""
import json
import re
import sys
import time
import gzip
import zlib
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

UA = "Mozilla/5.0 (compatible; ClaudeSEOAudit/1.0; +https://aimi-development.nl)"


def fetch(url, timeout=30):
    req = Request(url, headers={
        "User-Agent": UA,
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "text/html,application/xhtml+xml",
    })
    t0 = time.time()
    try:
        with urlopen(req, timeout=timeout) as r:
            raw = r.read()
            enc = (r.headers.get("Content-Encoding") or "").lower()
            if enc == "gzip":
                raw = gzip.decompress(raw)
            elif enc == "deflate":
                raw = zlib.decompress(raw, -zlib.MAX_WBITS)
            elif enc == "br":
                try:
                    import brotli
                    raw = brotli.decompress(raw)
                except Exception:
                    pass
            return {
                "status": r.status,
                "final_url": r.url,
                "headers": dict(r.headers),
                "html": raw.decode("utf-8", "replace"),
                "bytes": len(raw),
                "ms": int((time.time() - t0) * 1000),
            }
    except HTTPError as e:
        return {"status": e.code, "final_url": url, "headers": dict(e.headers or {}),
                "html": "", "bytes": 0, "ms": int((time.time() - t0) * 1000)}
    except (URLError, OSError) as e:
        return {"status": 0, "error": str(e), "final_url": url, "headers": {},
                "html": "", "bytes": 0, "ms": int((time.time() - t0) * 1000)}


class Extract(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self._in_title = False
        self.meta = {}
        self.headings = []
        self._h = None
        self._hbuf = []
        self.links = []
        self.imgs = []
        self.jsonld = []
        self._in_ld = False
        self._ldbuf = []
        self.canonical = None
        self.hreflang = []
        self.html_lang = None
        self.text_parts = []
        self._skip = 0
        self.scripts = []
        self.preloads = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.html_lang = a.get("lang")
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            n = (a.get("name") or a.get("property") or a.get("http-equiv") or "").lower()
            if n:
                self.meta[n] = a.get("content", "")
        elif tag == "link":
            rel = (a.get("rel") or "").lower()
            if "canonical" in rel:
                self.canonical = a.get("href")
            if "alternate" in rel and a.get("hreflang"):
                self.hreflang.append({"hreflang": a.get("hreflang"), "href": a.get("href")})
            if "preload" in rel or "preconnect" in rel:
                self.preloads.append({"rel": rel, "href": a.get("href"), "as": a.get("as")})
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._h = tag
            self._hbuf = []
        elif tag == "a":
            self.links.append({"href": a.get("href", ""), "rel": a.get("rel", ""),
                               "target": a.get("target", ""), "text": ""})
        elif tag == "img":
            self.imgs.append({"src": a.get("src", ""), "alt": a.get("alt"),
                              "loading": a.get("loading"), "w": a.get("width"),
                              "h": a.get("height"), "srcset": bool(a.get("srcset")),
                              "fetchpriority": a.get("fetchpriority")})
        elif tag == "script":
            t = (a.get("type") or "").lower()
            if t == "application/ld+json":
                self._in_ld = True
                self._ldbuf = []
            else:
                self.scripts.append({"src": a.get("src"), "async": "async" in a,
                                     "defer": "defer" in a, "type": t})
            self._skip += 1
        elif tag in ("style", "noscript", "svg"):
            self._skip += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6") and self._h == tag:
            self.headings.append({"tag": tag, "text": " ".join("".join(self._hbuf).split())})
            self._h = None
        elif tag == "script":
            if self._in_ld:
                self.jsonld.append("".join(self._ldbuf))
                self._in_ld = False
            self._skip = max(0, self._skip - 1)
        elif tag in ("style", "noscript", "svg"):
            self._skip = max(0, self._skip - 1)

    def handle_data(self, d):
        if self._in_title:
            self.title += d
        if self._in_ld:
            self._ldbuf.append(d)
            return
        if self._h is not None:
            self._hbuf.append(d)
        if self.links and self._skip == 0:
            self.links[-1]["text"] += d
        if self._skip == 0:
            s = d.strip()
            if s:
                self.text_parts.append(s)


def analyze(url, res):
    out = {"url": url, "status": res["status"], "final_url": res.get("final_url"),
           "bytes": res["bytes"], "ms": res["ms"],
           "content_encoding": res["headers"].get("Content-Encoding"),
           "cache_control": res["headers"].get("Cache-Control"),
           "x_robots": res["headers"].get("X-Robots-Tag")}
    if not res["html"]:
        out["error"] = res.get("error", "no body")
        return out
    p = Extract()
    try:
        p.feed(res["html"])
    except Exception as e:
        out["parse_error"] = str(e)
    title = " ".join(p.title.split())
    desc = p.meta.get("description", "")
    text = " ".join(p.text_parts)
    words = len(text.split())
    h1s = [h["text"] for h in p.headings if h["tag"] == "h1"]
    schemas = []
    schema_errors = []
    for blob in p.jsonld:
        try:
            data = json.loads(blob)
        except Exception as e:
            schema_errors.append(str(e)[:120])
            continue
        items = data if isinstance(data, list) else [data]
        for it in items:
            if isinstance(it, dict):
                if "@graph" in it and isinstance(it["@graph"], list):
                    for g in it["@graph"]:
                        if isinstance(g, dict):
                            schemas.append(g)
                else:
                    schemas.append(it)
    internal, external = [], []
    for l in p.links:
        h = l["href"]
        if not h or h.startswith(("#", "mailto:", "tel:", "javascript:")):
            continue
        if h.startswith("/") or "aimi-development.nl" in h:
            internal.append({"href": h, "text": " ".join(l["text"].split())[:80]})
        elif h.startswith("http"):
            external.append({"href": h, "rel": l["rel"], "text": " ".join(l["text"].split())[:60]})
    out.update({
        "title": title, "title_len": len(title),
        "description": desc, "desc_len": len(desc),
        "robots_meta": p.meta.get("robots", ""),
        "canonical": p.canonical,
        "html_lang": p.html_lang,
        "hreflang": p.hreflang,
        "og": {k: v for k, v in p.meta.items() if k.startswith("og:")},
        "twitter": {k: v for k, v in p.meta.items() if k.startswith("twitter:")},
        "h1_count": len(h1s), "h1": h1s,
        "headings": p.headings,
        "word_count": words,
        "text_sample": text[:1500],
        "schema_types": [s.get("@type") for s in schemas],
        "schemas": schemas,
        "schema_errors": schema_errors,
        "images": p.imgs,
        "img_count": len(p.imgs),
        "img_missing_alt": [i["src"] for i in p.imgs if i.get("alt") is None],
        "img_empty_alt": [i["src"] for i in p.imgs if i.get("alt") == ""],
        "internal_links": internal,
        "internal_link_count": len(internal),
        "external_links": external,
        "scripts": p.scripts,
        "preloads": p.preloads,
    })
    return out


def main():
    urls = [u.strip() for u in open(sys.argv[1], encoding="utf-8") if u.strip()]
    print(f"Crawling {len(urls)} URLs...", file=sys.stderr)
    results = []

    def work(u):
        r = fetch(u)
        time.sleep(0.2)
        return analyze(u, r)

    with ThreadPoolExecutor(max_workers=5) as ex:
        for i, r in enumerate(ex.map(work, urls), 1):
            results.append(r)
            if i % 10 == 0:
                print(f"  {i}/{len(urls)}", file=sys.stderr)
    json.dump(results, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    ok = sum(1 for r in results if r["status"] == 200)
    print(f"Done: {ok}/{len(results)} OK", file=sys.stderr)


if __name__ == "__main__":
    main()
