-- ============================================================
-- PERF-2: site_pings tellen via SQL-aggregatie i.p.v. full-scan in JS
-- ============================================================
-- adminListWebsiteLinks en adminListProjects haalden alle site_pings-rijen op
-- om ze in JS per user te tellen. site_pings groeit met ~1 rij/minuut/site en
-- is onbegrensd, dus die scan gaat de request domineren.
--
-- Deze functie telt server-side met een GROUP BY (gebruikt idx_site_pings_user
-- uit PERF-1). p_user_ids NULL => alle users; anders gefilterd op de array.
-- SECURITY DEFINER zodat de aggregatie over alle klanten telt (de RLS-policy
-- own_pings beperkt een gewone SELECT tot de eigen rijen); wordt alleen vanuit
-- server-fns achter ensureStaff aangeroepen via supabaseAdmin.

CREATE OR REPLACE FUNCTION public.site_ping_counts(p_user_ids uuid[] DEFAULT NULL)
RETURNS TABLE(user_id uuid, count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT sp.user_id, count(*)::bigint
  FROM public.site_pings sp
  WHERE p_user_ids IS NULL OR sp.user_id = ANY(p_user_ids)
  GROUP BY sp.user_id;
$$;
