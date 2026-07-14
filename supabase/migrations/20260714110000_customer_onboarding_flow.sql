-- Onboarding-flow voor klantaccounts: houdt per profiel bij hoe ver een
-- klant is in de begeleide onboarding-wizard die een admin vanaf de
-- accountdetailpagina start. De daadwerkelijke ingevulde gegevens (bedrijf,
-- adres, kvk, contactpersoon, telefoon, website_url, contacts) worden
-- geschreven naar de al bestaande kolommen op profiles via adminUpdateCustomer
-- — hier komen alleen de voortgangsvelden bij.

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_status text NOT NULL DEFAULT 'not_started';

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_step integer NOT NULL DEFAULT 0;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_started_at timestamptz;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamptz;

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_onboarding_status_check;

ALTER TABLE public.profiles ADD CONSTRAINT profiles_onboarding_status_check CHECK (onboarding_status IN ('not_started', 'in_progress', 'completed'));
