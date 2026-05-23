
ALTER TABLE public.change_requests
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'other',
  ADD COLUMN IF NOT EXISTS is_paid boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS rush boolean NOT NULL DEFAULT false;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS free_quota_override integer;

CREATE OR REPLACE FUNCTION public.available_credits(_user_id uuid)
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT GREATEST(
    0,
    COALESCE((SELECT free_quota_override FROM public.profiles WHERE id = _user_id), 3)
    + COALESCE((SELECT SUM(amount) FROM public.extra_credits WHERE user_id = _user_id), 0)
    - COALESCE((SELECT COUNT(*) FROM public.change_requests
                WHERE user_id = _user_id
                  AND is_paid = false
                  AND created_at >= date_trunc('month', now())), 0)
  )::INTEGER
$$;

DROP POLICY IF EXISTS "users create own requests" ON public.change_requests;

CREATE POLICY "users create own requests"
ON public.change_requests
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id)
  AND (is_paid = true OR public.available_credits(auth.uid()) > 0)
  AND ((SELECT COUNT(*) FROM public.change_requests
        WHERE user_id = auth.uid() AND status NOT IN ('done','rejected')) < 10)
);
