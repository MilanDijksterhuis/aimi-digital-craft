
-- 1) Fix privilege escalation on user_roles
DROP POLICY IF EXISTS "admins insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins update roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins delete roles" ON public.user_roles;

CREATE POLICY "super admins insert roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.is_super_admin(auth.uid()));

CREATE POLICY "super admins update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.is_super_admin(auth.uid()))
WITH CHECK (public.is_super_admin(auth.uid()));

CREATE POLICY "super admins delete roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.is_super_admin(auth.uid()));

-- 2) Remove sensitive tables from realtime publication
ALTER PUBLICATION supabase_realtime DROP TABLE public.profiles;
ALTER PUBLICATION supabase_realtime DROP TABLE public.admin_notifications;
ALTER PUBLICATION supabase_realtime DROP TABLE public.user_presence;
