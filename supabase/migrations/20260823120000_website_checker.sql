-- ============================================================
-- Website Checker: opslag van scanresultaten + retentie (90 dagen)
-- ============================================================
-- ip_hash is een SHA-256 hash van IP + serverside salt (nooit het raw IP,
-- i.v.m. AVG). Alleen service_role (server-side) mag lezen/schrijven; er is
-- geen publieke SELECT-policy, dus RLS blokkeert alles behalve service_role.

CREATE TABLE IF NOT EXISTS public.website_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  score integer NOT NULL,
  resultaten jsonb NOT NULL,
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_website_checks_created_at ON public.website_checks (created_at);
CREATE INDEX IF NOT EXISTS idx_website_checks_ip_hash ON public.website_checks (ip_hash, created_at);

ALTER TABLE public.website_checks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "svc_website_checks" ON public.website_checks;
CREATE POLICY "svc_website_checks" ON public.website_checks
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ---------- Retentie: rows ouder dan 90 dagen opruimen ----------
CREATE OR REPLACE FUNCTION public.cleanup_old_website_checks()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.website_checks WHERE created_at < now() - interval '90 days';
$$;

-- ---------- pg_cron: dagelijks om 03:00 ----------
-- Vereist de pg_cron-extensie (in Supabase: Database > Extensions > pg_cron
-- inschakelen). Als pg_cron niet beschikbaar is op dit project, gebruik het
-- alternatieve cron-script (zie scripts/cleanup-website-checks.mjs) via
-- crontab/PM2 op de VPS in plaats van onderstaand blok.
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'cleanup-website-checks';

SELECT cron.schedule(
  'cleanup-website-checks',
  '0 3 * * *',
  $$SELECT public.cleanup_old_website_checks();$$
);
