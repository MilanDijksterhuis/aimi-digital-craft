#!/usr/bin/env node
// Statische SEO-preflight (SEO-audit 2026-09-20, §7.3). Draait vóór elke deploy
// (zie scripts/deploy.sh) en faalt de build bij precies de fouten die de audit
// heeft aangetroffen, zodat ze niet stilletjes terugkomen:
//
//   1. Een PAGE_DATES-pad dat met /blog/ begint (die horen alleen uit de DB
//      te komen; zie sitemap[.]xml.tsx en A3-1).
//   2. Een publieke route uit routeTree.gen.ts die in PAGE_DATES ontbreekt.
//   3. Een blogpost-slug in een migratie die botst met een statische route.
//   4. `robots.txt` met `Disallow: /` op `User-agent: *`.
//
// Geen DB-toegang nodig: alles wordt statisch uit de repo gelezen, dus dit
// script kan ook zonder live Supabase-verbinding draaien (CI, lokaal).

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function readSource(relPath) {
  return readFileSync(path.join(ROOT, relPath), "utf8");
}

// --- 1 & 2: PAGE_DATES vs. routeTree.gen.ts -------------------------------

const seoSrc = readSource("src/lib/seo.ts");
const pageDatesMatch = seoSrc.match(/export const PAGE_DATES: Record<string, string> = \{([\s\S]*?)\n\};/);
if (!pageDatesMatch) {
  errors.push("Kon PAGE_DATES niet vinden/parsen in src/lib/seo.ts.");
}
const pageDatesKeys = pageDatesMatch
  ? [...pageDatesMatch[1].matchAll(/"([^"]+)":\s*"[^"]+"/g)].map((m) => m[1])
  : [];

// Individuele blogpost-paden mogen in PAGE_DATES staan (webPageJsonLd() heeft
// er een dateModified uit nodig, zie blog_.$slug.tsx), maar mogen NOOIT in de
// sitemap belanden naast de DB-versie — dat gaf de dubbele <loc> uit A3-1.
// In plaats van dat hier te verbieden, checken we dat de sitemap-route de
// blog-paden nog steeds wegfiltert.
const sitemapSrc = readSource("src/routes/sitemap[.]xml.tsx");
if (!/staticUrls\s*=\s*Object\.entries\(PAGE_DATES\)\s*\n?\s*\.filter\(\(\[path\]\) => !path\.startsWith\("\/blog\/"\)\)/.test(sitemapSrc)) {
  errors.push(
    `src/routes/sitemap[.]xml.tsx filtert /blog/*-paden niet meer uit staticUrls — ` +
      `dat geeft dubbele <loc>-entries met tegenstrijdige lastmod zodra blogposts ` +
      `zowel in PAGE_DATES als in de DB staan. Zie A3-1.`,
  );
}

const dupes = pageDatesKeys.filter((k, i) => pageDatesKeys.indexOf(k) !== i);
if (dupes.length > 0) {
  errors.push(`PAGE_DATES bevat dubbele paden: ${[...new Set(dupes)].join(", ")}`);
}

const routeTreeSrc = readSource("src/routeTree.gen.ts");
const byFullPathMatch = routeTreeSrc.match(/export interface FileRoutesByFullPath \{([\s\S]*?)\n\}/);
const allRoutePaths = byFullPathMatch
  ? [...byFullPathMatch[1].matchAll(/^\s*'([^']+)':/gm)].map((m) => m[1])
  : [];

if (allRoutePaths.length === 0) {
  errors.push("Kon geen routes uit src/routeTree.gen.ts parsen (FileRoutesByFullPath leeg?).");
}

// Niet-publieke of niet-in-PAGE_DATES-horende routes uitsluiten.
const PRIVATE_PREFIXES = ["/admin", "/portal", "/account", "/server", "/api", "/login"];
const EXCLUDE_EXACT = new Set([
  "/track.js",
  "/sitemap.xml",
  "/blog/$slug", // dynamisch, komt uit de DB
]);

const publicStaticRoutes = allRoutePaths.filter((p) => {
  if (EXCLUDE_EXACT.has(p)) return false;
  if (p.endsWith(".txt")) return false; // IndexNow key-verificatieroute
  if (PRIVATE_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`))) return false;
  if (p.includes("$")) return false; // overige dynamische routes
  return true;
});

const pageDatesSet = new Set(pageDatesKeys);
for (const route of publicStaticRoutes) {
  if (!pageDatesSet.has(route)) {
    errors.push(
      `Route "${route}" (uit routeTree.gen.ts) ontbreekt in PAGE_DATES (src/lib/seo.ts) — ` +
        `staat daardoor niet in de sitemap en krijgt een dateModified van "vandaag". Zie B2-3.`,
    );
  }
}

// --- 3: blogpost-slugs uit migraties vs. statische routes ------------------

const staticRoutePaths = new Set(publicStaticRoutes.map((p) => p.replace(/^\//, "")));
const migrationsDir = path.join(ROOT, "supabase", "migrations");
let migrationFiles = [];
try {
  migrationFiles = readdirSync(migrationsDir).filter((f) => f.endsWith(".sql"));
} catch {
  // geen migratiemap: niets te controleren
}

for (const file of migrationFiles) {
  const sql = readFileSync(path.join(migrationsDir, file), "utf8");
  // Matcht `INSERT INTO public.blog_posts (...) VALUES (... , 'slug-hier', ...`
  // net zo goed als los toegevoegde slug-regels zoals in de batch-migraties
  // van dit project (title op een dollar-quoted regel, slug op de regel erna).
  const slugMatches = [...sql.matchAll(/^\s*'([a-z0-9-]+)',\s*$/gm)];
  for (const m of slugMatches) {
    const slug = m[1];
    if (staticRoutePaths.has(slug)) {
      errors.push(
        `Blogpost-slug '${slug}' in ${path.relative(ROOT, path.join(migrationsDir, file))} ` +
          `botst met de statische route /${slug}. Zie A2-1.`,
      );
    }
  }
}

// --- 4: robots.txt mag geen site-brede Disallow bevatten -------------------

let robotsTxt = "";
try {
  robotsTxt = readSource("public/robots.txt");
} catch {
  errors.push("public/robots.txt ontbreekt.");
}
if (robotsTxt) {
  // Knip het bestand in blokken per User-agent-regel en pak alleen het
  // blok voor "*" (tot de volgende User-agent-regel of einde bestand).
  const blocks = robotsTxt.split(/^User-agent:\s*/m).slice(1);
  const starBlock = blocks.find((b) => b.startsWith("*"));
  if (starBlock && /^\s*Disallow:\s*\/\s*$/m.test(starBlock)) {
    errors.push("robots.txt bevat 'Disallow: /' onder 'User-agent: *' — dat blokkeert de hele site.");
  }
}

// --- resultaat ---------------------------------------------------------

if (errors.length > 0) {
  console.error(`SEO-invariantenchecks gefaald (${errors.length}):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`SEO-invariantenchecks OK (${publicStaticRoutes.length} publieke routes, ${pageDatesKeys.length} PAGE_DATES-entries).`);
