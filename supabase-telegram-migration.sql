-- =============================================
-- AIMI Telegram-integratie Migration
-- Run this in: Supabase Dashboard → SQL Editor
--
-- Twee features:
--  1. MFA via Telegram voor admin-accounts (kolommen op profiles + code-tabellen)
--  2. Notificaties bij contactformulier-inzendingen naar vaste ontvangers
--
-- Alle nieuwe tabellen zijn service_role-only (RLS aan, geen client-toegang):
-- de app benadert ze uitsluitend server-side via supabaseAdmin, exact zoals
-- de bestaande rate_limit_*/monitoring-tabellen. Bot-token en chat_id's mogen
-- nooit via RLS naar de client lekken.
-- =============================================

-- ---------------------------------------------
-- 1. Telegram/MFA-velden op de bestaande profiles-tabel
-- ---------------------------------------------
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS mfa_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS telegram_username text,
  ADD COLUMN IF NOT EXISTS telegram_chat_id text,
  ADD COLUMN IF NOT EXISTS telegram_linked_at timestamptz;

-- ---------------------------------------------
-- 2. Tijdelijke koppelcodes (eenmalig, verlopen na 15 min)
--    scope: 'profile'  -> profile_id verwijst naar profiles.id
--           'recipient'-> recipient_id verwijst naar telegram_notification_recipients.id
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS telegram_link_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope text NOT NULL DEFAULT 'profile' CHECK (scope IN ('profile', 'recipient')),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id uuid,
  token text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  used_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_tg_link_token ON telegram_link_tokens(token);

-- ---------------------------------------------
-- 3. OTP-codes voor MFA-login (eenmalig, verlopen na 5 min, max 5 pogingen)
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS telegram_mfa_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  code text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  attempts int NOT NULL DEFAULT 0,
  used_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_tg_mfa_profile ON telegram_mfa_codes(profile_id, created_at DESC);

-- ---------------------------------------------
-- 4. Pending logins: tussenstap tussen wachtwoord-check en MFA-code.
--    Bewaart de reeds-geverifieerde sessie-tokens server-side totdat de
--    MFA-code is ingevoerd. De client krijgt alleen een random pending-token;
--    de echte access/refresh-tokens gaan pas naar de client NA geslaagde MFA.
--    Kortlevend (5 min) en eenmalig. Nooit RLS-leesbaar voor de client.
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS telegram_pending_logins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pending_token text NOT NULL UNIQUE,
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  used_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_tg_pending_token ON telegram_pending_logins(pending_token);

-- ---------------------------------------------
-- 5. Vaste ontvangers voor contactformulier-notificaties
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS telegram_notification_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,               -- bv. "Milan" of "Aidan"
  telegram_username text,
  telegram_chat_id text,
  telegram_linked_at timestamptz,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Koppelcode-tokens met scope 'recipient' verwijzen naar deze tabel (soft FK):
ALTER TABLE telegram_link_tokens
  DROP CONSTRAINT IF EXISTS fk_tg_link_recipient;
ALTER TABLE telegram_link_tokens
  ADD CONSTRAINT fk_tg_link_recipient
  FOREIGN KEY (recipient_id) REFERENCES telegram_notification_recipients(id) ON DELETE CASCADE;

-- ---------------------------------------------
-- 6. RLS — service_role-only (net als rate_limit_*/monitoring-tabellen).
--    Geen policy voor 'authenticated': deze tabellen worden uitsluitend
--    server-side via de service-role-client benaderd.
-- ---------------------------------------------
ALTER TABLE telegram_link_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_mfa_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_pending_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_notification_recipients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "svc_tg_link_tokens" ON telegram_link_tokens;
CREATE POLICY "svc_tg_link_tokens" ON telegram_link_tokens FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "svc_tg_mfa_codes" ON telegram_mfa_codes;
CREATE POLICY "svc_tg_mfa_codes" ON telegram_mfa_codes FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "svc_tg_pending_logins" ON telegram_pending_logins;
CREATE POLICY "svc_tg_pending_logins" ON telegram_pending_logins FOR ALL TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "svc_tg_recipients" ON telegram_notification_recipients;
CREATE POLICY "svc_tg_recipients" ON telegram_notification_recipients FOR ALL TO service_role USING (true) WITH CHECK (true);
