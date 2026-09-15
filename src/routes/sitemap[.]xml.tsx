import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PAGE_DATES } from "@/lib/seo";

const BASE_URL = import.meta.env.VITE_SITE_URL ?? "https://aimi-development.nl";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // lastmod = datum van de laatste inhoudelijke wijziging per pagina. Sinds
        // GEO-audit 2026-09-06 (punt 8.1) is `PAGE_DATES` in src/lib/seo.ts de
        // enige bron: de sitemap, het WebPage-schema (`dateModified`) en de
        // zichtbare "Bijgewerkt op"-regel lezen alle drie hieruit, zodat ze nooit
        // uit elkaar lopen. Geen changefreq/priority: Google negeert die sinds 2023.
        const urls = Object.entries(PAGE_DATES).map(([path, lastmod]) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `  </url>`,
          ].join("\n"),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
