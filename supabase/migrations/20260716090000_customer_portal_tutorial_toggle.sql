-- Aparte schakelaar voor een korte rondleiding die uitlegt HOE het
-- klantenportaal werkt (los van de onboarding-flow die gegevens verzamelt).
-- Een admin kan dit per account aan/uit zetten; de klant ziet dan bij het
-- volgende bezoek een uitlegtour totdat hij deze afrondt of overslaat.

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tutorial_enabled boolean NOT NULL DEFAULT false;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tutorial_completed_at timestamptz;
