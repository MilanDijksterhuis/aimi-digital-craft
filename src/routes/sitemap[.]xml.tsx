import { createFileRoute } from "@tanstack/react-router";
import type { } from "@tanstack/react-start";

const BASE_URL = import.meta.env.VITE_SITE_URL ?? "https://aimi-development.nl";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },

          // Uncomment zodra de pagina daadwerkelijk live staat
          // { path: "/website-laten-maken", changefreq: "monthly", priority: "0.9" },
          // { path: "/webshop-laten-maken", changefreq: "monthly", priority: "0.9" },
          // { path: "/onderhoud-hosting", changefreq: "monthly", priority: "0.8" },
          // { path: "/cases", changefreq: "monthly", priority: "0.8" },
          // { path: "/over-ons", changefreq: "yearly", priority: "0.6" },
          // { path: "/contact", changefreq: "yearly", priority: "0.6" },

          { path: "/algemene-voorwaarden", changefreq: "yearly", priority: "0.3" },
          { path: "/privacybeleid", changefreq: "yearly", priority: "0.3" },
        ];
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
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