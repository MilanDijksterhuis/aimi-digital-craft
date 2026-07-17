-- ============================================================
-- SEC-4: own_projects klant-leespolicy negeert primary_user_id
-- ============================================================
-- De own_projects SELECT-policy op public.projects gaf een klant alleen
-- zichtbaarheid via project_members, niet via primary_user_id. Dat werkt nu
-- omdat app-code de primary user altijd als member invoegt, maar bij een
-- verbroken invariant/legacy-project verliest de primary-klant zichtbaarheid
-- terwijl assertOwnProject server-side wel toegang geeft (inconsistentie).
--
-- Fix: voeg "OR primary_user_id = auth.uid()" toe. Puur verruimend voor de
-- legitieme eigenaar; geen enkele andere gebruiker krijgt hierdoor toegang.

DROP POLICY IF EXISTS "own_projects" ON public.projects;
CREATE POLICY "own_projects" ON public.projects
  FOR SELECT TO authenticated
  USING (
    primary_user_id = auth.uid()
    OR id IN (SELECT project_members.project_id FROM public.project_members WHERE project_members.user_id = auth.uid())
  );
