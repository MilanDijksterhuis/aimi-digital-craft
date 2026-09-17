-- Blog CMS uitbreiding: extra SEO-, Open Graph- en interne-linking-velden op
-- blog_posts, zodat de editor deze kan tonen/bewerken zonder bestaande data
-- te overschrijven (alles is nullable / heeft een veilige default).

ALTER TABLE public.blog_posts
  ADD COLUMN og_title text,
  ADD COLUMN og_description text,
  ADD COLUMN og_image_url text,
  ADD COLUMN noindex boolean NOT NULL DEFAULT false,
  ADD COLUMN canonical_url text,
  ADD COLUMN focus_keyword text,
  ADD COLUMN tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN faq_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN featured_image_alt text;

COMMENT ON COLUMN public.blog_posts.og_title IS 'Fallback: seo_title, dan title.';
COMMENT ON COLUMN public.blog_posts.og_description IS 'Fallback: seo_description, dan excerpt.';
COMMENT ON COLUMN public.blog_posts.og_image_url IS 'Fallback: featured_image_url.';
COMMENT ON COLUMN public.blog_posts.canonical_url IS 'Leeg = eigen URL (default). Alleen invullen om te sturen.';
COMMENT ON COLUMN public.blog_posts.faq_items IS 'Array van {"q": string, "a": string}, gebruikt voor FAQPage-schema. Alleen wat hier expliciet is ingevuld, nooit afgeleid/verzonnen.';
