
-- Add cancelled status to enum
ALTER TYPE public.request_status ADD VALUE IF NOT EXISTS 'cancelled';

-- Sequence for change request numbers
CREATE SEQUENCE IF NOT EXISTS public.change_request_number_seq START 1;

-- Add columns to change_requests
ALTER TABLE public.change_requests
  ADD COLUMN IF NOT EXISTS request_number INTEGER UNIQUE DEFAULT nextval('public.change_request_number_seq'),
  ADD COLUMN IF NOT EXISTS ticket_type TEXT NOT NULL DEFAULT 'question',
  ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- Backfill any null request_numbers (shouldn't happen but safety)
UPDATE public.change_requests SET request_number = nextval('public.change_request_number_seq') WHERE request_number IS NULL;

-- Contacts JSON on profile
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS contacts JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Contact moments table
CREATE TABLE IF NOT EXISTS public.client_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  created_by UUID,
  kind TEXT NOT NULL DEFAULT 'call', -- call, meeting, email
  summary TEXT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.client_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage client_contacts" ON public.client_contacts FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "users read own client_contacts" ON public.client_contacts FOR SELECT USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

-- Login events
CREATE TABLE IF NOT EXISTS public.login_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage login_events" ON public.login_events FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "users read own login_events" ON public.login_events FOR SELECT USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));
CREATE POLICY "users insert own login_events" ON public.login_events FOR INSERT WITH CHECK (user_id = auth.uid());

-- Site pings (heartbeats from customer websites)
CREATE TABLE IF NOT EXISTS public.site_pings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  status_ok BOOLEAN NOT NULL DEFAULT true,
  response_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_site_pings_user_time ON public.site_pings(user_id, created_at DESC);
ALTER TABLE public.site_pings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage site_pings" ON public.site_pings FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "users read own site_pings" ON public.site_pings FOR SELECT USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

-- Site errors
CREATE TABLE IF NOT EXISTS public.site_errors (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  url TEXT,
  resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_site_errors_user_time ON public.site_errors(user_id, created_at DESC);
ALTER TABLE public.site_errors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage site_errors" ON public.site_errors FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "users read own site_errors" ON public.site_errors FOR SELECT USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));
