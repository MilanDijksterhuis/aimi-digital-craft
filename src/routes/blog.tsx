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
  readTime: string;
  published_at: string | null;
};

export const Route = createFileRoute("/blog")({
  // SEO-audit 2026-09-20 (A1-3): `content` wordt alleen server-side gebruikt
  // om de leestijd te berekenen. Vroeger stond de volledige posttekst van
  // élke post daardoor ook in de SSR-payload van /blog (dubbel: HTML +
  // hydration-JSON). `readTime` wordt nu in de loader berekend en alleen dát
  // gaat naar de client — `content` verlaat de server nooit.
  loader: async (): Promise<{ posts: BlogListItem[] }> => {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, content, published_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    const posts = (data ?? []).map(({ content, ...post }) => ({
      ...post,
      readTime: estimateReadTime(content),
    }));
    return { posts };
  },
  head: () => ({
    meta: [
      // SEO-audit 2026-09-20 (B4-3): "Blog" vooraan is geen zoekwoord en de
      // description liet SERP-ruimte liggen (107 tekens, geen CTA).
      { title: "Webdesign- en SEO-blog voor ondernemers | AIMI" },
      {
        name: "description",
        content:
          "Praktische artikelen over webdesign, SEO en online groei voor kleine bedrijven en zelfstandigen in Groningen en Drenthe, geschreven door AIMI.",
      },
      { property: "og:title", content: "Webdesign- en SEO-blog voor ondernemers | AIMI" },
      {
        property: "og:description",
        content: "Praktische artikelen over webdesign, SEO en online groei, geschreven door AIMI.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Webdesign- en SEO-blog voor ondernemers | AIMI" },
      {
        name: "twitter:description",
        content: "Praktische artikelen over webdesign, SEO en online groei, geschreven door AIMI.",
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
        name: "Webdesign- en SEO-blog | AIMI webdesignbureau Veendam",
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

            {/* SEO-audit 2026-09-20 (B3-1): CSS-entrance i.p.v. framer-motion
                initial={{opacity:0}}, zelfde reden als Hero.tsx — anders is de
                H1 onzichtbaar tot JS gehydrateerd is. */}
            <p
              className="mt-10 mb-3 text-sm font-medium anim-fade-up"
              style={{
                color: "#fe2c02",
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                letterSpacing: "0.05em",
                animationDelay: "0.05s",
              }}
            >
              Blog
            </p>

            <h1
              className="text-white max-w-3xl anim-fade-up"
              style={{
                fontSize: "2.2rem",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                animationDelay: "0.1s",
              }}
            >
              Artikelen over webdesign, SEO en online groei.
            </h1>

            <p
              className="mt-6 max-w-2xl text-sm leading-relaxed anim-fade-up"
              style={{ color: "#a4a9b2", animationDelay: "0.18s" }}
            >
              Praktische inzichten uit ons eigen werk, voor kleine bedrijven en zelfstandigen die
              meer uit hun website willen halen.
            </p>
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
                        {post.readTime}
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
