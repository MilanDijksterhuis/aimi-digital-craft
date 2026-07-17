-- ============================================================
-- SEC-5: duurzame, gedeelde rate limiting / IP-bans
-- ============================================================
-- De rate limiter (src/lib/rate-limit.ts) hield state in module-level Maps.
-- Op meerdere PM2-instances is die niet gedeeld en reset bij elke deploy,
-- waardoor per-user_id limieten en escalerende IP-bans te omzeilen zijn.
-- Deze migratie voegt een duurzame Postgres-store toe: twee tabellen +
-- atomaire functies. De app roept ze aan via supabaseAdmin (service_role),
-- die RLS bypasst; er zijn dus alleen service-role policies (default deny voor
-- iedereen anders). De functies zijn SECURITY DEFINER met vaste search_path.

-- ---------- Tabellen ----------
CREATE TABLE IF NOT EXISTS public.rate_limit_hits (
  key text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0,
  reset_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rate_limit_hits_reset ON public.rate_limit_hits (reset_at);

CREATE TABLE IF NOT EXISTS public.rate_limit_bans (
  ip text PRIMARY KEY,
  banned_until timestamptz NOT NULL,
  strikes integer NOT NULL DEFAULT 0
);

ALTER TABLE public.rate_limit_hits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limit_bans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "svc_rate_limit_hits" ON public.rate_limit_hits;
CREATE POLICY "svc_rate_limit_hits" ON public.rate_limit_hits
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "svc_rate_limit_bans" ON public.rate_limit_bans;
CREATE POLICY "svc_rate_limit_bans" ON public.rate_limit_bans
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ---------- Atomaire check + increment ----------
-- Eén upsert per aanroep; on-conflict-update is atomair per rij, dus geen
-- race condition tussen gelijktijdige requests. Retourneert of het request
-- toegestaan is en hoeveel seconden tot de window reset.
CREATE OR REPLACE FUNCTION public.check_rate_limit(p_key text, p_limit integer, p_window_seconds integer)
RETURNS TABLE(allowed boolean, retry_after integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now timestamptz := now();
  v_count integer;
  v_reset timestamptz;
BEGIN
  INSERT INTO public.rate_limit_hits AS h (key, count, reset_at)
    VALUES (p_key, 1, v_now + make_interval(secs => p_window_seconds))
  ON CONFLICT (key) DO UPDATE
    SET count = CASE WHEN h.reset_at <= v_now THEN 1 ELSE h.count + 1 END,
        reset_at = CASE WHEN h.reset_at <= v_now THEN v_now + make_interval(secs => p_window_seconds) ELSE h.reset_at END
  RETURNING h.count, h.reset_at INTO v_count, v_reset;

  IF v_count > p_limit THEN
    RETURN QUERY SELECT false, GREATEST(0, ceil(extract(epoch FROM (v_reset - v_now))))::integer;
  ELSE
    RETURN QUERY SELECT true, 0;
  END IF;
END;
$$;

-- ---------- IP-ban lookup ----------
CREATE OR REPLACE FUNCTION public.is_ip_banned(p_ip text)
RETURNS TABLE(banned boolean, retry_after integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (banned_until > now()) AS banned,
    CASE WHEN banned_until > now()
      THEN ceil(extract(epoch FROM (banned_until - now())))::integer
      ELSE 0 END AS retry_after
  FROM public.rate_limit_bans WHERE ip = p_ip
  UNION ALL
  SELECT false, 0
  WHERE NOT EXISTS (SELECT 1 FROM public.rate_limit_bans WHERE ip = p_ip)
  LIMIT 1;
$$;

-- ---------- Strike registreren (escalerende ban) ----------
-- Ban-duur per strike: 5min -> 1h -> 24h -> 7d (gelijk aan de oude
-- BAN_DURATIONS_MS in rate-limit.ts).
CREATE OR REPLACE FUNCTION public.record_strike(p_ip text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_strikes integer;
  v_dur interval;
BEGIN
  INSERT INTO public.rate_limit_bans AS b (ip, banned_until, strikes)
    VALUES (p_ip, now(), 1)
  ON CONFLICT (ip) DO UPDATE SET strikes = b.strikes + 1
  RETURNING b.strikes INTO v_strikes;

  v_dur := CASE
    WHEN v_strikes <= 1 THEN interval '5 minutes'
    WHEN v_strikes = 2 THEN interval '1 hour'
    WHEN v_strikes = 3 THEN interval '24 hours'
    ELSE interval '7 days'
  END;

  UPDATE public.rate_limit_bans SET banned_until = now() + v_dur WHERE ip = p_ip;
END;
$$;
