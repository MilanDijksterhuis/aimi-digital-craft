import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
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
};

export const Route = createFileRoute("/blog_/$slug")({
  loader: async ({ params }): Promise<BlogPostDetail> => {
    const { data: post } = await supabase
      .from("blog_posts")
      .select(
        "slug, title, excerpt, content, published_at, updated_at, featured_image_url, featured_image_alt, seo_title, seo_description, og_title, og_description, og_image_url, noindex, canonical_url, faq_items",
      )
      .eq("slug", params.slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle();
    if (!post) throw notFound();
    return post as BlogPostDetail;
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
                alt={post.featured_image_alt ?? ""}
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
