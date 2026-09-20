import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import {
  SITE_URL,
  OG_IMAGE_URL,
  breadcrumbJsonLd,
  webPageJsonLd,
  articleJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import { MarkdownBody, estimateReadTime } from "@/lib/markdown";
import { supabase } from "@/integrations/supabase/client";

type RelatedPost = { slug: string; title: string; anchorText: string };

type BlogPostDetail = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  published_at: string | null;
  updated_at: string;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  noindex: boolean;
  canonical_url: string | null;
  faq_items: { q: string; a: string }[];
  relatedPosts: RelatedPost[];
};

export const Route = createFileRoute("/blog_/$slug")({
  loader: async ({ params }): Promise<BlogPostDetail> => {
    const { data: post } = await supabase
      .from("blog_posts")
      .select(
        "id, slug, title, excerpt, content, published_at, updated_at, featured_image_url, featured_image_alt, seo_title, seo_description, og_title, og_description, og_image_url, noindex, canonical_url, faq_items",
      )
      .eq("slug", params.slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle();
    if (!post) throw notFound();

    // SEO-audit 2026-09-20 (B4-8/B5-2): post_links werd al gevuld bij het
    // opslaan van een post, maar nooit publiek getoond (BlogPostLinksPanel is
    // admin-only) — de blog was daardoor onderling slecht verbonden. Haalt
    // hier alleen links op die naar een andere blogpost wijzen (to_post_slug),
    // niet de link-naar-dienstpagina's (to_page_path staan al inline in de
    // markdown-content zelf).
    const { data: links } = await supabase
      .from("post_links")
      .select("to_post_slug, anchor_text")
      .eq("from_post_id", post.id)
      .not("to_post_slug", "is", null)
      .limit(3);

    let relatedPosts: RelatedPost[] = [];
    const relatedSlugs = (links ?? []).map((l) => l.to_post_slug).filter((s): s is string => !!s);
    if (relatedSlugs.length > 0) {
      const { data: relatedRows } = await supabase
        .from("blog_posts")
        .select("slug, title")
        .in("slug", relatedSlugs)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString());
      const titleBySlug = new Map((relatedRows ?? []).map((r) => [r.slug, r.title]));
      relatedPosts = (links ?? [])
        .filter((l) => l.to_post_slug && titleBySlug.has(l.to_post_slug))
        .map((l) => ({
          slug: l.to_post_slug as string,
          title: titleBySlug.get(l.to_post_slug as string) as string,
          anchorText: l.anchor_text,
        }));
    }

    return { ...post, relatedPosts } as unknown as BlogPostDetail;
  },
  head: ({ loaderData: post }) => {
    if (!post) return {};
    const description = post.seo_description || post.excerpt || "";
    const title = post.seo_title || post.title;
    const ogTitle = post.og_title || title;
    const ogDescription = post.og_description || description;
    const ogImage = post.og_image_url || post.featured_image_url || OG_IMAGE_URL;
    const canonical = post.canonical_url || `${SITE_URL}/blog/${post.slug}`;
    const faqs = (post.faq_items ?? []).filter((f) => f.q.trim() && f.a.trim());

    return {
      meta: [
        { title: `${title} | AIMI Blog` },
        { name: "description", content: description },
        ...(post.noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: ogDescription },
        { property: "og:url", content: `${SITE_URL}/blog/${post.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ogTitle },
        { name: "twitter:description", content: ogDescription },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        breadcrumbJsonLd([
          ["Home", "/"],
          ["Blog", "/blog"],
          [post.title, `/blog/${post.slug}`],
        ]),
        webPageJsonLd({
          path: `/blog/${post.slug}`,
          name: post.title,
          description,
          datePublished: post.published_at ?? undefined,
        }),
        articleJsonLd({
          path: `/blog/${post.slug}`,
          headline: post.title,
          description,
          datePublished: post.published_at ?? post.updated_at,
          dateModified: post.updated_at,
          imageUrl: post.featured_image_url,
        }),
        ...(faqs.length > 0 ? [faqJsonLd(faqs)] : []),
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <section className="pt-40 pb-16" style={{ background: "#1a1a1a" }}>
          <div className="mx-auto max-w-3xl px-6">
            <Link
              to="/blog"
              className="text-sm transition-colors"
              style={{
                color: "#a4a9b2",
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
              }}
            >
              ← Terug naar blog
            </Link>

            {/* SEO-audit 2026-09-20 (B3-1): CSS-entrance i.p.v. framer-motion
                initial={{opacity:0}} — dit is de LCP-kandidaat van de pagina,
                die mag niet wachten op JS-hydration. Zelfde patroon als Hero.tsx. */}
            <p
              className="mt-10 mb-3 text-xs anim-fade-up"
              style={{
                color: "#868b94",
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                animationDelay: "0.05s",
              }}
            >
              {post.published_at &&
                new Date(post.published_at).toLocaleDateString("nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              {" · "}
              {estimateReadTime(post.content)}
            </p>

            <h1
              className="text-white anim-fade-up"
              style={{
                fontSize: "2.2rem",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                animationDelay: "0.1s",
              }}
            >
              {post.title}
            </h1>
          </div>
        </section>

        <section className="py-16" style={{ background: "#1a1a1a" }}>
          {post.featured_image_url && (
            <div className="mx-auto max-w-3xl px-6 mb-10">
              {/* SEO-audit 2026-09-20 (B4-6): geen width/height-kolom in
                  blog_posts, dus geen echte intrinsieke dimensies beschikbaar.
                  aspect-ratio reserveert wel de ruimte vóór het laden (voorkomt
                  CLS), en fetchPriority="high" is terecht: dit is vaak de
                  LCP-afbeelding van de pagina, dus geen loading="lazy". */}
              <img
                src={post.featured_image_url}
                alt={post.featured_image_alt || post.title}
                className="w-full rounded-xl object-cover"
                style={{ aspectRatio: "16 / 9" }}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          )}
          <div
            className="mx-auto max-w-3xl px-6 space-y-6 text-sm leading-relaxed"
            style={{ color: "#a4a9b2" }}
          >
            <MarkdownBody content={post.content} />
          </div>

          {post.faq_items.filter((f) => f.q.trim() && f.a.trim()).length > 0 && (
            <div className="mx-auto max-w-3xl px-6 mt-16 space-y-6">
              <h2
                className="text-white"
                style={{
                  fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                Veelgestelde vragen
              </h2>
              <div className="space-y-5">
                {post.faq_items
                  .filter((f) => f.q.trim() && f.a.trim())
                  .map((f, i) => (
                    <div key={i}>
                      <h3 className="text-white font-medium mb-1" style={{ fontSize: "1rem" }}>
                        {f.q}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#a4a9b2" }}>
                        {f.a}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {post.relatedPosts.length > 0 && (
            <div className="mx-auto max-w-3xl px-6 mt-16">
              <h2
                className="text-white mb-5"
                style={{
                  fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                Lees ook
              </h2>
              <ul className="flex flex-col divide-y" style={{ borderColor: "#2a2b2b" }}>
                {post.relatedPosts.map((r) => (
                  <li key={r.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: r.slug }}
                      className="group flex items-baseline justify-between gap-3 py-4 transition-colors"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="text-sm text-white group-hover:underline">{r.title}</span>
                      <span className="text-xs shrink-0" style={{ color: "#868b94" }}>
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mx-auto max-w-3xl px-6 mt-16">
            <div
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-8"
              style={{ border: "1px solid #2a2b2b", borderRadius: "16px" }}
            >
              <div>
                <h2
                  className="text-white mb-2"
                  style={{
                    fontSize: "1.1rem",
                    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Benieuwd hoe jouw website ervoor staat?
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#a4a9b2" }}>
                  Doe de gratis website-check of neem direct contact op voor advies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/website-checker" className="btn-secondary !text-[15px] justify-center">
                  Gratis website-check
                </Link>
                <Link to="/contact" className="btn-primary !text-[15px] justify-center">
                  Neem contact op
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
