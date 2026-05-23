
CREATE OR REPLACE FUNCTION public.available_credits(_user_id uuid)
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN _user_id <> auth.uid() AND NOT public.has_role(auth.uid(), 'admin'::app_role) THEN 0
    ELSE GREATEST(
      0,
      COALESCE((SELECT free_quota_override FROM public.profiles WHERE id = _user_id), 3)
      + COALESCE((SELECT SUM(amount) FROM public.extra_credits WHERE user_id = _user_id), 0)
      - COALESCE((SELECT COUNT(*) FROM public.change_requests
                  WHERE user_id = _user_id
                    AND is_paid = false
                    AND created_at >= date_trunc('month', now())), 0)
    )::INTEGER
  END
$function$;
