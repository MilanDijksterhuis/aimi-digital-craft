-- ============================================================
-- SEC-1: Voorkom dat een klant zijn eigen blokkade/verloop omzeilt
-- ============================================================
-- De profiles UPDATE-policy pinde alleen billing-/meta-kolommen vast in de
-- non-admin WITH CHECK. De later toegevoegde security-kolommen is_blocked en
-- access_expires_at (migratie 20260524104213) stonden niet in die pinlijst,
-- waardoor een klant met geldige JWT direct tegen de Supabase-API
--   update({ is_blocked:false, access_expires_at:'2999-01-01' })
-- kon draaien en zichzelf kon deblokkeren/verlengen.
--
-- Deze migratie herbouwt de policy identiek, met is_blocked en
-- access_expires_at toegevoegd aan de IS NOT DISTINCT FROM-pinlijst.
-- Admin-mutaties (has_role 'admin'-tak) en service-role writes (cron,
-- adminSetBlocked/adminSetAccessExpiry) blijven ongewijzigd. Kolommen die de
-- klant wél legitiem zelf zet (o.a. website_url, onboarding_*, contacts,
-- last_seen_at) blijven bewust ongepind zodat portal/onboarding blijft werken.

DROP POLICY IF EXISTS "users update own profile" ON public.profiles;

CREATE POLICY "users update own profile"
ON public.profiles
FOR UPDATE
USING ((auth.uid() = id) OR has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role)
  OR (
    auth.uid() = id
    AND monthly_price_cents IS NOT DISTINCT FROM (SELECT monthly_price_cents FROM public.profiles WHERE id = auth.uid())
    AND free_quota_override IS NOT DISTINCT FROM (SELECT free_quota_override FROM public.profiles WHERE id = auth.uid())
    AND package IS NOT DISTINCT FROM (SELECT package FROM public.profiles WHERE id = auth.uid())
    AND internal_notes IS NOT DISTINCT FROM (SELECT internal_notes FROM public.profiles WHERE id = auth.uid())
    AND tags IS NOT DISTINCT FROM (SELECT tags FROM public.profiles WHERE id = auth.uid())
    AND referral_code IS NOT DISTINCT FROM (SELECT referral_code FROM public.profiles WHERE id = auth.uid())
    AND is_blocked IS NOT DISTINCT FROM (SELECT is_blocked FROM public.profiles WHERE id = auth.uid())
    AND access_expires_at IS NOT DISTINCT FROM (SELECT access_expires_at FROM public.profiles WHERE id = auth.uid())
  )
);
