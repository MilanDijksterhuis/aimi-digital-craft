-- =============================================
-- AIMI Sales / Leads Migration
-- Run this in: Supabase Dashboard → SQL Editor
--
-- BELANGRIJK: voer STAP 1 apart uit (los "Run"), daarna pas STAP 2.
-- Postgres staat niet toe dat een nieuwe enum-waarde in dezelfde
-- transactie wordt toegevoegd én gebruikt.
-- =============================================

-- ---------- STAP 1: nieuwe rol toevoegen ----------
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'sales';


-- ---------- STAP 2: tabellen, RLS en permissies ----------

-- Leads (gedeelde pool: alle sales-gebruikers + super admin zien alles)
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  has_website boolean NOT NULL DEFAULT false,
  phone text,
  email text,
  status text NOT NULL DEFAULT 'nieuw'
    CHECK (status IN ('nieuw','gebeld','gemaild','interesse','geen_interesse','klant')),
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company_name);

-- Voorkom dubbele imports van hetzelfde bedrijf+telefoon
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_unique
  ON leads(lower(company_name), coalesce(phone, ''));

-- Contactlog: elke belactie / mail / notitie op een lead
CREATE TABLE IF NOT EXISTS lead_activities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id uuid,
  type text NOT NULL CHECK (type IN ('call','email','note')),
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON lead_activities(lead_id, created_at DESC);

-- RLS: alleen de server (service_role) mag erbij; toegang loopt via
-- server functions die de rol controleren.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "svc_leads" ON leads;
CREATE POLICY "svc_leads" ON leads FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "svc_lead_activities" ON lead_activities;
CREATE POLICY "svc_lead_activities" ON lead_activities FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Permissies voor de sales-rol
INSERT INTO role_permissions (role, permission, allowed) VALUES
  ('sales','leads_view',true),
  ('sales','leads_manage',true)
ON CONFLICT (role, permission) DO NOTHING;
