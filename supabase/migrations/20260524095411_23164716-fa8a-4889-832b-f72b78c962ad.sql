
-- Profile: snippet_active flag
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snippet_active boolean NOT NULL DEFAULT false;

-- Password reset requests
CREATE TABLE IF NOT EXISTS public.password_reset_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  user_name text,
  requested_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  handled_at timestamptz,
  handled_by uuid
);

ALTER TABLE public.password_reset_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users insert own reset request"
  ON public.password_reset_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users read own reset request"
  ON public.password_reset_requests FOR SELECT
  USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

CREATE POLICY "staff update reset request"
  ON public.password_reset_requests FOR UPDATE
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "super admin delete reset request"
  ON public.password_reset_requests FOR DELETE
  USING (public.is_super_admin(auth.uid()));

-- Extra change requests
CREATE TABLE IF NOT EXISTS public.extra_change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  user_name text,
  amount integer NOT NULL CHECK (amount > 0 AND amount <= 50),
  total_eur integer NOT NULL,
  requested_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  handled_at timestamptz,
  handled_by uuid
);

ALTER TABLE public.extra_change_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users insert own extra change request"
  ON public.extra_change_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users read own extra change request"
  ON public.extra_change_requests FOR SELECT
  USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

CREATE POLICY "staff update extra change request"
  ON public.extra_change_requests FOR UPDATE
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "super admin delete extra change request"
  ON public.extra_change_requests FOR DELETE
  USING (public.is_super_admin(auth.uid()));
