-- =============================================
-- AIMI Monitoring Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================

-- Response times (vervangt site_pings voor timing data)
CREATE TABLE IF NOT EXISTS site_response_times (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  response_ms integer, -- nullable: uptime-pings schrijven alleen status_ok, geen response_ms
  status_ok boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- Voor bestaande installaties waar de kolom nog NOT NULL is:
ALTER TABLE site_response_times ALTER COLUMN response_ms DROP NOT NULL;
CREATE INDEX IF NOT EXISTS idx_srt_user_time ON site_response_times(user_id, created_at DESC);

-- SSL checks (1x per dag)
CREATE TABLE IF NOT EXISTS ssl_checks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  valid boolean NOT NULL,
  expires_at timestamptz,
  days_remaining integer,
  issuer text,
  error text,
  checked_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ssl_user ON ssl_checks(user_id, checked_at DESC);

-- DNS checks (1x per dag)
CREATE TABLE IF NOT EXISTS dns_checks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  healthy boolean NOT NULL,
  issues text[] DEFAULT '{}',
  checked_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_dns_user ON dns_checks(user_id, checked_at DESC);

-- Monitoring alerts
CREATE TABLE IF NOT EXISTS monitoring_alerts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type IN ('uptime','response_time','ssl','dns')),
  severity text NOT NULL DEFAULT 'warning' CHECK (severity IN ('warning','critical')),
  message text NOT NULL,
  snoozed_until timestamptz,
  seen_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON monitoring_alerts(created_at DESC) WHERE archived_at IS NULL;

-- Auto-archiveer alerts ouder dan 30 dagen (run als cron of handmatig)
-- DELETE FROM monitoring_alerts WHERE archived_at IS NOT NULL AND archived_at < now() - interval '30 days';

-- Role permissions
CREATE TABLE IF NOT EXISTS role_permissions (
  role text NOT NULL,
  permission text NOT NULL,
  allowed boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (role, permission)
);

-- Standaard permissies
INSERT INTO role_permissions (role, permission, allowed) VALUES
  ('co_admin','view_all_changes',true),
  ('co_admin','edit_change_status',true),
  ('co_admin','edit_change_fields',true),
  ('co_admin','delete_change_soft',true),
  ('co_admin','force_paid',true),
  ('co_admin','create_change_for_customer',true),
  ('co_admin','manage_customers',true),
  ('co_admin','generate_invoice',true),
  ('co_admin','export_csv',true),
  ('co_admin','chat_with_customers',true),
  ('co_admin','website_links_view',true),
  ('co_admin','website_links_manage',true),
  ('co_admin','appointments_manage',true),
  ('co_admin','alerts_view',true),
  ('support_agent','view_all_changes',true),
  ('support_agent','edit_change_status',true),
  ('support_agent','manage_customers',true),
  ('support_agent','chat_with_customers',true),
  ('support_agent','website_links_view',true),
  ('support_agent','alerts_view',true),
  ('viewer','view_all_changes',true),
  ('viewer','website_links_view',true),
  ('viewer','alerts_view',true)
ON CONFLICT (role, permission) DO NOTHING;

-- RLS
ALTER TABLE site_response_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE ssl_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dns_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitoring_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "svc_srt" ON site_response_times FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "svc_ssl" ON ssl_checks FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "svc_dns" ON dns_checks FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "svc_alerts" ON monitoring_alerts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "svc_perms" ON role_permissions FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Klanten mogen eigen response times lezen
CREATE POLICY "own_srt" ON site_response_times FOR SELECT TO authenticated USING (user_id = auth.uid());

-- site_pings RLS (fallback-bron voor uptime in portal/admin)
ALTER TABLE site_pings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "svc_pings" ON site_pings;
CREATE POLICY "svc_pings" ON site_pings FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "own_pings" ON site_pings;
CREATE POLICY "own_pings" ON site_pings FOR SELECT TO authenticated USING (user_id = auth.uid());

-- =============================================
-- Projecten (vervangt "website koppelingen" overzicht)
-- Een project = 1 website, gekoppeld aan een of meer klanten.
-- De monitoring (site_pings/site_response_times/ssl/dns) blijft
-- gekoppeld aan profiles.id via primary_user_id, zodat de bestaande
-- tracking snippets (track.js?u=<profile-id>) blijven werken.
-- =============================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  website_url text,
  snippet_active boolean NOT NULL DEFAULT false,
  primary_user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_projects_primary_user ON projects(primary_user_id);

CREATE TABLE IF NOT EXISTS project_members (
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (project_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_project_members_user ON project_members(user_id);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "svc_projects" ON projects FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "svc_project_members" ON project_members FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Klanten mogen de projecten zien waar ze lid van zijn
CREATE POLICY "own_projects" ON projects FOR SELECT TO authenticated
  USING (id IN (SELECT project_id FROM project_members WHERE user_id = auth.uid()));
CREATE POLICY "own_project_members" ON project_members FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Eenmalige backfill: bestaande "website koppeling" van Milantest (aimi-development.nl)
-- omzetten naar een project. Pas de WHERE-clause aan als de klant anders heet.
INSERT INTO projects (name, website_url, snippet_active, primary_user_id)
SELECT 'aimi-development.nl', p.website_url, p.snippet_active, p.id
FROM profiles p
WHERE (p.full_name ILIKE '%milantest%' OR p.website_url ILIKE '%aimi-development.nl%')
  AND p.website_url IS NOT NULL
LIMIT 1;

INSERT INTO project_members (project_id, user_id)
SELECT pr.id, pr.primary_user_id FROM projects pr
WHERE pr.name = 'aimi-development.nl'
ON CONFLICT DO NOTHING;
