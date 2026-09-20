import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PAGE_DATES } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";

const BASE_URL = import.meta.env.VITE_SITE_URL ?? "https://aimi-development.nl";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // lastmod = datum van de laatste inhoudelijke wijziging per pagina. Sinds
        // GEO-audit 2026-09-06 (punt 8.1) is `PAGE_DATES` in src/lib/seo.ts de
        // enige bron voor de statische pagina's: de sitemap, het WebPage-schema
        // (`dateModified`) en de zichtbare "Bijgewerkt op"-regel lezen alle drie
        // hieruit, zodat ze nooit uit elkaar lopen. Geen changefreq/priority:
        // Google negeert die sinds 2023.
        // Individuele blogposts komen hieronder uit de database (zie blogUrls).
        // /blog zelf (de indexpagina) staat wel in PAGE_DATES en blijft hier staan.
        const staticUrls = Object.entries(PAGE_DATES)
          .filter(([path]) => !path.startsWith("/blog/"))
          .map(([path, lastmod]) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${path}</loc>`,
              `    <lastmod>${lastmod}</lastmod>`,
              `  </url>`,
            ].join("\n"),
          );

        // Blogposts komen uit de blog_posts-tabel (blog-CMS module) i.p.v.
        // PAGE_DATES, want die lijst groeit/verandert onafhankelijk van een
        // code-deploy zodra admins in /admin/blog publiceren.
        const { data: posts } = await supabase
          .from("blog_posts")
          .select("slug, updated_at, noindex")
          .eq("status", "published")
          .eq("noindex", false)
          .lte("published_at", new Date().toISOString());
        const blogUrls = (posts ?? []).map((p) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}/blog/${p.slug}</loc>`,
            `    <lastmod>${p.updated_at.slice(0, 10)}</lastmod>`,
            `  </url>`,
          ].join("\n"),
        );

        const urls = [...staticUrls, ...blogUrls];
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
