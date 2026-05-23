CREATE OR REPLACE FUNCTION public.available_credits(_user_id uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT CASE
    WHEN _user_id <> auth.uid() AND NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN 0
    ELSE GREATEST(
      0,
      COALESCE((SELECT free_quota_override FROM public.profiles WHERE id = _user_id), 3)
      + COALESCE((SELECT SUM(amount) FROM public.extra_credits WHERE user_id = _user_id), 0)
      - COALESCE((SELECT COUNT(*) FROM public.change_requests
                  WHERE user_id = _user_id
                    AND is_paid = false
                    AND created_at >= date_trunc('month', now())), 0)
    )::integer
  END
$$;

REVOKE EXECUTE ON FUNCTION public.available_credits(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.available_credits(uuid) TO authenticated;