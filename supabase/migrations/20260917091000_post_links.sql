-- Interne-linking: post_links slaat elke interne link relationeel op die in
-- de markdown-content van een blogpost staat (in plaats van alleen platte
-- tekst), zodat we inkomende/uitgaande links en broken links kunnen opvragen.
--
-- Wordt volledig herberekend bij elke create/update van een post (de content
-- is de bron van waarheid; de link-picker in de editor voegt gewoon geldige
-- markdown-links toe). Zie adminSyncPostLinksImpl in blog.server.ts.

CREATE TABLE public.post_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  -- Voor links naar /blog/<slug>: to_post_id wordt opgelost via de slug en op
  -- NULL gezet als de doelpost hard verwijderd wordt (ipv de link-rij zelf te
  -- cascaden), zodat broken-link-detectie ook "post bestaat niet meer" kan
  -- signaleren, niet alleen "post is gedepubliceerd".
  to_post_id uuid REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  to_post_slug text,
  to_page_path text,
  anchor_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT post_links_target_check CHECK (
    (to_post_slug IS NOT NULL AND to_page_path IS NULL) OR
    (to_post_slug IS NULL AND to_page_path IS NOT NULL)
  )
);

CREATE INDEX post_links_from_post_idx ON public.post_links (from_post_id);
CREATE INDEX post_links_to_post_idx ON public.post_links (to_post_id);

ALTER TABLE public.post_links ENABLE ROW LEVEL SECURITY;

-- Puur een CMS-hulpmiddel (linkstructuur/broken-links-overzicht), niet
-- publiek nodig: zelfde rollen als de blogpost-beheerpolicies.
CREATE POLICY "staff read post_links"
ON public.post_links FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','support_agent','viewer','admin']::public.app_role[]));

CREATE POLICY "admins manage post_links"
ON public.post_links FOR ALL
TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]));
