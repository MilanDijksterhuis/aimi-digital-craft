import { createFileRoute } from "@tanstack/react-router";
import type { } from "@tanstack/react-start";

const BASE_URL = import.meta.env.VITE_SITE_URL ?? "https://aimi-development.nl";

interface SitemapEntry {
  path: string;
  lastmod: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // lastmod = datum van de laatste inhoudelijke wijziging per pagina (handmatig
        // bijhouden). Geen changefreq/priority: Google negeert die sinds 2023.
        // algemene-voorwaarden en privacybeleid staan hier bewust niet in — die
        // hebben een noindex-meta en horen dus niet in de sitemap (anders geeft
        // Search Console "Ingediende URL gemarkeerd als noindex").
        const entries: SitemapEntry[] = [
          // Kernpagina's
          { path: "/", lastmod: "2026-08-16" },

          // Dienstenpagina's
          { path: "/website-laten-maken", lastmod: "2026-08-16" },
          { path: "/webshop-laten-maken", lastmod: "2026-08-16" },
          { path: "/onderhoud-hosting", lastmod: "2026-08-16" },

          // Lokale landingspagina's — hoofddoel voor lokale SEO (Veendam/Hoogeveen)
          { path: "/website-laten-maken-veendam", lastmod: "2026-08-16" },
          { path: "/website-laten-maken-hoogeveen", lastmod: "2026-08-16" },

          // Overige publieke pagina's
          { path: "/werkwijze", lastmod: "2026-08-16" },
          { path: "/meer-diensten", lastmod: "2026-08-16" },
          { path: "/over-ons", lastmod: "2026-08-16" },
          { path: "/faq", lastmod: "2026-08-16" },
          { path: "/contact", lastmod: "2026-08-16" },
        ];
        const urls = entries.map((e) =>
          [`  <url>`, `    <loc>${BASE_URL}${e.path}</loc>`, `    <lastmod>${e.lastmod}</lastmod>`, `  </url>`].join(
            "\n",
          ),
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