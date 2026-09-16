import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { MarkdownBody, estimateReadTime } from "@/lib/markdown";
import { supabase } from "@/integrations/supabase/client";

type BlogPostDetail = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  published_at: string | null;
  featured_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

export const Route = createFileRoute("/blog_/$slug")({
  loader: async ({ params }): Promise<BlogPostDetail> => {
    const { data: post } = await supabase
      .from("blog_posts")
      .select(
        "slug, title, excerpt, content, published_at, featured_image_url, seo_title, seo_description",
      )
      .eq("slug", params.slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle();
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: post }) => {
    if (!post) return {};
    const description = post.seo_description || post.excerpt || "";
    const title = post.seo_title || post.title;
    return {
      meta: [
        { title: `${title} | AIMI Blog` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/blog/${post.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: post.featured_image_url || OG_IMAGE_URL },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: post.featured_image_url || OG_IMAGE_URL },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${post.slug}` }],
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

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-10 mb-3 text-xs"
              style={{
                color: "#868b94",
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
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
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white"
              style={{
                fontSize: "2.2rem",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {post.title}
            </motion.h1>
          </div>
        </section>

        <section className="py-16" style={{ background: "#1a1a1a" }}>
          {post.featured_image_url && (
            <div className="mx-auto max-w-3xl px-6 mb-10">
              <img
                src={post.featured_image_url}
                alt=""
                className="w-full rounded-xl object-cover"
              />
            </div>
          )}
          <div
            className="mx-auto max-w-3xl px-6 space-y-6 text-sm leading-relaxed"
            style={{ color: "#a4a9b2" }}
          >
            <MarkdownBody content={post.content} />
          </div>

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
