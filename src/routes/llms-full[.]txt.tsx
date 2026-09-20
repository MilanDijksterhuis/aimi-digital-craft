import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

/* SEO-audit 2026-09-20 (B11-2): llms.txt geeft alleen een linklijst; voor een
 * site van deze omvang (51 pagina's + groeiend aantal blogposts) is een
 * volledige-tekstvariant een reële toevoeging. De blogcontent is al
 * gestructureerde markdown (blog_posts.content), dus lage inspanning om hem
 * hier integraal op te nemen. Statische pagina's staan in React/JSX-componenten
 * (geen platte markdown-bron), dus die krijgen hier alleen de link + korte
 * samenvatting — net als in llms.txt. */

const SITE_INTRO = `# AIMI — volledige content

> Web agency van Aidan & Milan. Wij ontwerpen, bouwen en hosten snelle, professionele websites en webshops voor ondernemers — met focus op de regio Veendam (Groningen) en Hoogeveen (Drenthe), en klanten door heel Nederland.

> Dit bestand bevat de volledige tekst van alle blogposts. Voor een overzicht van alle pagina's met korte samenvattingen, zie /llms.txt.
`;

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { data: posts } = await supabase
          .from("blog_posts")
          .select("slug, title, excerpt, content, published_at, updated_at")
          .eq("status", "published")
          .eq("noindex", false)
          .lte("published_at", new Date().toISOString())
          .order("published_at", { ascending: false });

        const articles = (posts ?? [])
          .map((p) => {
            const date = p.published_at?.slice(0, 10) ?? p.updated_at.slice(0, 10);
            return [
              `\n---\n`,
              `## ${p.title}`,
              `URL: /blog/${p.slug}`,
              `Gepubliceerd: ${date}`,
              p.excerpt ? `\n${p.excerpt}\n` : "",
              p.content,
            ]
              .filter(Boolean)
              .join("\n");
          })
          .join("\n");

        const body =
          SITE_INTRO +
          `\n> Laatst bijgewerkt: ${new Date().toISOString().slice(0, 10)}\n` +
          articles;

        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
