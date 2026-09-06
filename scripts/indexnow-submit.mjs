#!/usr/bin/env node
// IndexNow-submit: meldt alle sitemap-URL's bij Bing/Yandex/Naver na een
// deploy (SEO-audit 2026-09-03, technical.md Low priority #5). Google
// gebruikt IndexNow niet — dit dient alleen de andere zoekmachines. Faalt
// deze aanroep, dan mag dat een deploy nooit blokkeren; scripts/deploy.sh
// roept dit script daarom bewust met `|| true` aan.

const SITE_URL = "https://aimi-development.nl";
const INDEXNOW_KEY = "b03bb73bce86422c6a74b3cfc829f2dd";

async function main() {
  const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`sitemap.xml ophalen mislukt: HTTP ${sitemapRes.status}`);
  }
  const xml = await sitemapRes.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    throw new Error("Geen <loc>-URL's gevonden in sitemap.xml");
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  // IndexNow retourneert 200 (of 202) bij succes, geen JSON-body.
  if (!res.ok) {
    throw new Error(`IndexNow-submit mislukt: HTTP ${res.status} ${await res.text().catch(() => "")}`);
  }

  console.log(`IndexNow: ${urlList.length} URL's gemeld (HTTP ${res.status}).`);
}

main().catch((err) => {
  console.error("IndexNow-submit mislukt:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
