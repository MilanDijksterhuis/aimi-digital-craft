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
        // A-21: algemene-voorwaarden en privacybeleid stonden hier bewust niet in
        // omdat ze noindex waren. Die noindex is verwijderd (juridische pagina's
        // zijn trust-signalen), dus horen ze er nu wél in.
        const entries: SitemapEntry[] = [
          // Kernpagina's
          { path: "/", lastmod: "2026-08-20" },

          // Dienstenpagina's
          { path: "/website-laten-maken", lastmod: "2026-08-20" },
          { path: "/webshop-laten-maken", lastmod: "2026-08-20" },
          { path: "/onderhoud-hosting", lastmod: "2026-08-20" },
          { path: "/website-laten-vernieuwen", lastmod: "2026-08-22" },
          { path: "/seo", lastmod: "2026-08-22" },
          { path: "/tarieven", lastmod: "2026-08-22" },

          // Informatief / oriënterend
          { path: "/wordpress-of-maatwerk", lastmod: "2026-08-22" },

          // Branchepagina's — geen regio-as, functionele zoektermen
          { path: "/branches", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-kapsalon", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-nagelstudio", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-schoonheidssalon", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-pedicure", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-hovenier", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-klusbedrijf", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-schilder", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-loodgieter", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-autobedrijf", lastmod: "2026-08-22" },
          { path: "/website-laten-maken-autorijschool", lastmod: "2026-08-22" },
          { path: "/website-laten-maken-makelaar", lastmod: "2026-08-22" },
          { path: "/website-laten-maken-boekhouder", lastmod: "2026-08-22" },
          { path: "/website-laten-maken-restaurant", lastmod: "2026-08-22" },
          { path: "/website-laten-maken-cateringbedrijf", lastmod: "2026-08-22" },
          { path: "/website-laten-maken-bloemist", lastmod: "2026-08-22" },

          // Lokale landingspagina's — hoofddoel voor lokale SEO
          { path: "/webdesign", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-veendam", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-hoogeveen", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-groningen", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-assen", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-hoogezand", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-stadskanaal", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-emmen", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-winschoten", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-roden", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-coevorden", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-meppel", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-leeuwarden", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-drachten", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-heerenveen", lastmod: "2026-08-21" },
          { path: "/website-laten-maken-sneek", lastmod: "2026-08-21" },

          // Overige publieke pagina's
          { path: "/werkwijze", lastmod: "2026-08-20" },
          { path: "/meer-diensten", lastmod: "2026-08-20" },
          { path: "/over-ons", lastmod: "2026-08-20" },
          { path: "/faq", lastmod: "2026-08-20" },
          { path: "/contact", lastmod: "2026-08-20" },

          // Juridisch — trust-signalen, indexeerbaar sinds A-21
          { path: "/privacybeleid", lastmod: "2026-08-22" },
          { path: "/algemene-voorwaarden", lastmod: "2026-08-22" },
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