-- =============================================
-- AIMI Telegram — melding bij nieuw wijzigingsverzoek
-- Run this in: Supabase Dashboard → SQL Editor
--
-- Voegt per notificatie-ontvanger een keuze toe voor welk type melding hij/zij
-- wil ontvangen. Bestaande ontvangers behouden de contactformulier-melding
-- (default true) zodat er niets breekt; nieuwe-change-meldingen staan standaard
-- uit en zet je per ontvanger aan (bv. alleen Milan).
-- =============================================

ALTER TABLE telegram_notification_recipients
  ADD COLUMN IF NOT EXISTS notify_contact_form boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS notify_new_changes boolean NOT NULL DEFAULT false;
