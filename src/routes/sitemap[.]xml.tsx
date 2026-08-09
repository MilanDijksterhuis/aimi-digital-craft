import { createFileRoute } from "@tanstack/react-router";
import type { } from "@tanstack/react-start";

const BASE_URL = import.meta.env.VITE_SITE_URL ?? "https://aimi-development.nl";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

// Eén datum per build; Google gebruikt <lastmod> als hint voor hercrawlen.
const LASTMOD = new Date().toISOString().slice(0, 10);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          // Kernpagina's
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: LASTMOD },

          // Dienstenpagina's
          { path: "/website-laten-maken", changefreq: "monthly", priority: "0.9", lastmod: LASTMOD },
          { path: "/webshop-laten-maken", changefreq: "monthly", priority: "0.9", lastmod: LASTMOD },
          { path: "/onderhoud-hosting", changefreq: "monthly", priority: "0.8", lastmod: LASTMOD },

          // Lokale landingspagina's — hoofddoel voor lokale SEO (Veendam/Hoogeveen)
          { path: "/website-laten-maken-veendam", changefreq: "monthly", priority: "0.9", lastmod: LASTMOD },
          { path: "/website-laten-maken-hoogeveen", changefreq: "monthly", priority: "0.9", lastmod: LASTMOD },

          // Overige publieke pagina's
          { path: "/werkwijze", changefreq: "monthly", priority: "0.7", lastmod: LASTMOD },
          { path: "/meer-diensten", changefreq: "monthly", priority: "0.8", lastmod: LASTMOD },
          { path: "/over-ons", changefreq: "monthly", priority: "0.7", lastmod: LASTMOD },
          { path: "/faq", changefreq: "monthly", priority: "0.7", lastmod: LASTMOD },
          { path: "/contact", changefreq: "monthly", priority: "0.7", lastmod: LASTMOD },

          // Juridisch
          { path: "/algemene-voorwaarden", changefreq: "yearly", priority: "0.3", lastmod: LASTMOD },
          { path: "/privacybeleid", changefreq: "yearly", priority: "0.3", lastmod: LASTMOD },
        ];
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
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