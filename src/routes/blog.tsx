import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { estimateReadTime } from "@/lib/markdown";
import { supabase } from "@/integrations/supabase/client";

type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  published_at: string | null;
};

export const Route = createFileRoute("/blog")({
  loader: async (): Promise<{ posts: BlogListItem[] }> => {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, content, published_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    return { posts: data ?? [] };
  },
  head: () => ({
    meta: [
      { title: "Blog | AIMI Web Agency Veendam & Hoogeveen" },
      {
        name: "description",
        content:
          "Artikelen over webdesign, SEO en online groei voor kleine bedrijven en zelfstandigen, geschreven door AIMI.",
      },
      { property: "og:title", content: "Blog: AIMI" },
      {
        property: "og:description",
        content: "Artikelen over webdesign, SEO en online groei van AIMI.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog: AIMI" },
      {
        name: "twitter:description",
        content: "Artikelen over webdesign, SEO en online groei van AIMI.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Blog", "/blog"],
      ]),
      webPageJsonLd({
        path: "/blog",
        name: "Blog: AIMI webdesignbureau Veendam",
        description:
          "Artikelen over webdesign, SEO en online groei voor kleine bedrijven en zelfstandigen, geschreven door AIMI.",
      }),
    ],
  }),
  component: Blog,
});

function Blog() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <section className="pt-40 pb-24" style={{ background: "#1a1a1a" }}>
          <div className="mx-auto max-w-7xl px-6">
            <Link
              to="/"
              className="text-sm transition-colors"
              style={{
                color: "#a4a9b2",
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
              }}
            >
              ← Terug naar home
            </Link>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-10 mb-3 text-sm font-medium"
              style={{
                color: "#fe2c02",
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Blog
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white max-w-3xl"
              style={{
                fontSize: "2.2rem",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Artikelen over webdesign, SEO en online groei.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 max-w-2xl text-sm leading-relaxed"
              style={{ color: "#a4a9b2" }}
            >
              Praktische inzichten uit ons eigen werk, voor kleine bedrijven en zelfstandigen die
              meer uit hun website willen halen.
            </motion.p>
          </div>
        </section>

        <section className="py-20" style={{ background: "#1a1a1a" }}>
          <div className="mx-auto max-w-7xl px-6">
            {posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
              >
                <p className="text-sm leading-relaxed" style={{ color: "#a4a9b2" }}>
                  Binnenkort delen we hier onze eerste artikelen. Heb je een vraag over webdesign of
                  SEO waar je nu al antwoord op wilt? Neem gerust{" "}
                  <a
                    href="/#contact"
                    className="underline underline-offset-4 transition-colors hover:text-white"
                    style={{ color: "#a4a9b2" }}
                  >
                    contact
                  </a>{" "}
                  op.
                </p>
              </motion.div>
            ) : (
              <div className="flex flex-col divide-y" style={{ borderColor: "#2a2b2b" }}>
                {posts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 py-8"
                      style={{ textDecoration: "none", borderColor: "#2a2b2b" }}
                    >
                      <div className="flex-1">
                        <h2
                          className="text-white transition-colors"
                          style={{
                            fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                            fontSize: "1.3rem",
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {post.title}
                        </h2>
                        <p
                          className="text-sm mt-2 max-w-2xl leading-relaxed"
                          style={{ color: "#a4a9b2" }}
                        >
                          {post.excerpt}
                        </p>
                      </div>
                      <div
                        className="text-xs whitespace-nowrap md:text-right"
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
                        <br />
                        {estimateReadTime(post.content)}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
