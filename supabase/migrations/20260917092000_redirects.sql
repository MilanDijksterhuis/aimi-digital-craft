-- Redirect-beheer: eenvoudige van-URL -> naar-URL tabel voor 301-redirects.
-- Gelezen door de globale request-handler in src/server.ts (vóór routing),
-- en beheerd via /admin/blog (redirects-tab). Wordt ook automatisch gevuld
-- wanneer de slug van een gepubliceerde post wijzigt.

CREATE TABLE public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text NOT NULL UNIQUE,
  to_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT redirects_from_path_format CHECK (from_path LIKE '/%'),
  CONSTRAINT redirects_to_path_format CHECK (to_path LIKE '/%'),
  CONSTRAINT redirects_no_self_loop CHECK (from_path <> to_path)
);

CREATE INDEX redirects_from_path_idx ON public.redirects (from_path);

ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "staff read redirects"
ON public.redirects FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','support_agent','viewer','admin']::public.app_role[]));

CREATE POLICY "admins manage redirects"
ON public.redirects FOR ALL
TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','admin']::public.app_role[]));
