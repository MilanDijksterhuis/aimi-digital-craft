-- =============================================
-- AIMI Sales / Terugbel-agenda Migration
-- Run this in: Supabase Dashboard → SQL Editor
--
-- Vereist: supabase-leads-migration.sql is al uitgevoerd
-- (tabellen `leads` + `lead_activities` en de sales-rol bestaan).
-- =============================================

-- Terugbelafspraken: geplande belacties op een lead.
CREATE TABLE IF NOT EXISTS lead_callbacks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  reason text NOT NULL,
  note text,
  scheduled_at timestamptz NOT NULL,
  auto_scheduled boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'open'
    CHECK (status IN ('open','done','no_answer','appointment','cancelled')),
  outcome_note text,
  created_by uuid,
  completed_by uuid,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Agenda-queries lopen op datum; open acties eerst.
CREATE INDEX IF NOT EXISTS idx_lead_callbacks_scheduled
  ON lead_callbacks(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_lead_callbacks_lead
  ON lead_callbacks(lead_id, scheduled_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_callbacks_status
  ON lead_callbacks(status, scheduled_at);

-- RLS: net als leads loopt alle toegang via server functions (service_role).
ALTER TABLE lead_callbacks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "svc_lead_callbacks" ON lead_callbacks;
CREATE POLICY "svc_lead_callbacks" ON lead_callbacks
  FOR ALL TO service_role USING (true) WITH CHECK (true);
