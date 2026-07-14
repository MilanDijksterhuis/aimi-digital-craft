-- Schakelaar waarmee een admin de klant zelf laat onboarden in het
-- klantenportaal (i.p.v. de admin die de wizard voor de klant invult).
-- Hergebruikt dezelfde onboarding_status/onboarding_step/onboarding_started_at/
-- onboarding_completed_at kolommen uit de vorige migratie — die zijn agnostisch
-- over wie de stappen invult.

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_self_enabled boolean NOT NULL DEFAULT false;
