
-- Migrate existing admin role → super_admin (keep both for safety)
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, 'super_admin'::public.app_role
FROM public.user_roles
WHERE role = 'admin'
ON CONFLICT (user_id, role) DO NOTHING;

-- Backwards-compatible has_role: treat super_admin and co_admin as fulfilling 'admin'
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND _user_id = auth.uid()
    AND (
      EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
      )
      OR (
        _role = 'admin'::public.app_role
        AND EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_id = _user_id
            AND role IN ('super_admin'::public.app_role, 'co_admin'::public.app_role)
        )
      )
    )
$$;

-- has_any_role helper
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id uuid, _roles app_role[])
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND _user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = _user_id AND role = ANY(_roles)
    )
$$;

-- Convenience: any admin-portal role (super, co, support, viewer)
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT public.has_any_role(_user_id, ARRAY['super_admin','co_admin','support_agent','viewer','admin']::public.app_role[])
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT public.has_any_role(_user_id, ARRAY['super_admin','admin']::public.app_role[])
$$;

-- Soft delete columns on change_requests
ALTER TABLE public.change_requests
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_by uuid,
  ADD COLUMN IF NOT EXISTS restored_at timestamptz,
  ADD COLUMN IF NOT EXISTS restored_by uuid;

CREATE INDEX IF NOT EXISTS idx_change_requests_deleted_at ON public.change_requests(deleted_at);

-- Audit log
CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "super_admin reads audit log" ON public.audit_log;
CREATE POLICY "super_admin reads audit log" ON public.audit_log
  FOR SELECT USING (public.is_super_admin(auth.uid()));

DROP POLICY IF EXISTS "staff inserts audit log" ON public.audit_log;
CREATE POLICY "staff inserts audit log" ON public.audit_log
  FOR INSERT WITH CHECK (user_id = auth.uid() AND public.is_staff(auth.uid()));

-- Update change_requests RLS: hide soft-deleted from customers
DROP POLICY IF EXISTS "users read own requests" ON public.change_requests;
CREATE POLICY "users read own requests" ON public.change_requests
  FOR SELECT USING (
    (auth.uid() = user_id AND deleted_at IS NULL)
    OR public.is_staff(auth.uid())
  );

-- Ensure admin update/delete policies still apply to super_admin/co_admin (has_role covers it)
-- Hard delete: only super_admin
DROP POLICY IF EXISTS "admins delete requests" ON public.change_requests;
CREATE POLICY "super_admin hard delete requests" ON public.change_requests
  FOR DELETE USING (public.is_super_admin(auth.uid()));

-- Update: super_admin + co_admin + support_agent (status only enforced in app layer)
DROP POLICY IF EXISTS "admins update requests" ON public.change_requests;
CREATE POLICY "staff update requests" ON public.change_requests
  FOR UPDATE USING (
    public.has_any_role(auth.uid(), ARRAY['super_admin','co_admin','support_agent','admin']::public.app_role[])
  );
