-- SEO-audit 2026-09-20, bevinding B4-8/B5-2: post_links werd wel gevuld
-- (adminSyncPostLinksImpl) maar nooit publiek getoond — BlogPostLinksPanel is
-- een admin-only component. Om een "gerelateerde artikelen"-blok op de
-- publieke postpagina te kunnen renderen, moet de tabel leesbaar zijn voor
-- anonieme bezoekers. Alleen links die uitgaan van een gepubliceerde post
-- worden vrijgegeven (zelfde voorwaarde als "public read published blog
-- posts"), zodat de linkstructuur van concept-/geplande posts niet lekt.
CREATE POLICY "public read post_links from published posts"
ON public.post_links FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.blog_posts p
    WHERE p.id = post_links.from_post_id
      AND p.status = 'published'
      AND p.published_at IS NOT NULL
      AND p.published_at <= now()
  )
);
