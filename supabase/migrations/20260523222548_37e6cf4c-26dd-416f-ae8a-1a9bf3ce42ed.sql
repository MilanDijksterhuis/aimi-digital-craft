CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND _user_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = _user_id
        AND role = _role
    )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;

DROP POLICY IF EXISTS "users read own roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins update roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins delete roles" ON public.user_roles;

CREATE POLICY "users read own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "admins insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admins update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admins delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));