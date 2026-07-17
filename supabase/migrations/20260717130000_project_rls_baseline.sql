-- ============================================================
-- SEC-3: project_* RLS-baseline in versiebeheer
-- ============================================================
-- De tabellen projects/project_members/project_milestones/project_notes/
-- project_contacts/project_tasks/project_task_time_entries/
-- project_milestone_dependencies/project_templates/project_template_milestones/
-- project_activity_log en hun RLS-policies zijn ooit buiten migraties om in de
-- live database aangemaakt. Ze stonden daardoor in geen enkel getrackt bestand
-- en waren niet vanuit de repo te verifieren (SEC-3).
--
-- Deze migratie legt de WERKELIJKE live-policies vast, exact zoals ze op
-- 2026-07-17 uit pg_policies/pg_get_functiondef zijn gedumpt. Idempotent
-- (ENABLE RLS + DROP POLICY IF EXISTS + CREATE), dus toepassen op de bestaande
-- database is een no-op qua gedrag; op een verse rebuild reproduceert het de
-- huidige beveiliging.
--
-- Geverifieerd: project_notes klant-SELECT vereist zowel project-membership
-- als is_client_visible = true (geen IDOR op interne notities).
--
-- NB: is_project_member() checkt alleen project_members (niet primary_user_id);
-- de own_projects-policy idem. Die inconsistentie t.o.v. assertOwnProject is
-- SEC-4 en wordt in een aparte migratie behandeld, niet hier.

-- ---------- Helper-functies (SECURITY DEFINER) ----------
-- Exact zoals live. has_role / is_staff worden elders al gedefinieerd en hier
-- bewust niet aangeraakt.
CREATE OR REPLACE FUNCTION public.is_staff_user()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  select exists (
    select 1 from user_roles
    where user_id = auth.uid()
      and role in ('super_admin', 'co_admin', 'admin', 'support_agent', 'viewer')
  );
$function$;

CREATE OR REPLACE FUNCTION public.is_project_member(p_project_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  select exists (
    select 1 from project_members
    where project_id = p_project_id
      and user_id = auth.uid()
  );
$function$;

-- ---------- RLS inschakelen (idempotent) ----------
ALTER TABLE public.projects                       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_notes                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_contacts               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_task_time_entries      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestone_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_templates              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_template_milestones    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_activity_log           ENABLE ROW LEVEL SECURITY;

-- ---------- projects ----------
DROP POLICY IF EXISTS "svc_projects" ON public.projects;
CREATE POLICY "svc_projects" ON public.projects
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "own_projects" ON public.projects;
CREATE POLICY "own_projects" ON public.projects
  FOR SELECT TO authenticated
  USING (id IN (SELECT project_members.project_id FROM public.project_members WHERE project_members.user_id = auth.uid()));

-- ---------- project_members ----------
DROP POLICY IF EXISTS "svc_project_members" ON public.project_members;
CREATE POLICY "svc_project_members" ON public.project_members
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "own_project_members" ON public.project_members;
CREATE POLICY "own_project_members" ON public.project_members
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ---------- project_milestones ----------
DROP POLICY IF EXISTS "project_milestones_admin_write" ON public.project_milestones;
CREATE POLICY "project_milestones_admin_write" ON public.project_milestones
  FOR ALL TO public USING (is_staff_user()) WITH CHECK (is_staff_user());

DROP POLICY IF EXISTS "project_milestones_select" ON public.project_milestones;
CREATE POLICY "project_milestones_select" ON public.project_milestones
  FOR SELECT TO public
  USING (is_staff_user() OR is_project_member(project_id));

-- ---------- project_notes ----------
DROP POLICY IF EXISTS "project_notes_admin_write" ON public.project_notes;
CREATE POLICY "project_notes_admin_write" ON public.project_notes
  FOR ALL TO public USING (is_staff_user()) WITH CHECK (is_staff_user());

DROP POLICY IF EXISTS "project_notes_select" ON public.project_notes;
CREATE POLICY "project_notes_select" ON public.project_notes
  FOR SELECT TO public
  USING (is_staff_user() OR (is_project_member(project_id) AND (is_client_visible = true)));

-- ---------- project_contacts ----------
DROP POLICY IF EXISTS "project_contacts_admin_write" ON public.project_contacts;
CREATE POLICY "project_contacts_admin_write" ON public.project_contacts
  FOR ALL TO public USING (is_staff_user()) WITH CHECK (is_staff_user());

DROP POLICY IF EXISTS "project_contacts_select" ON public.project_contacts;
CREATE POLICY "project_contacts_select" ON public.project_contacts
  FOR SELECT TO public
  USING (is_staff_user() OR is_project_member(project_id));

-- ---------- project_activity_log ----------
DROP POLICY IF EXISTS "project_activity_log_admin_write" ON public.project_activity_log;
CREATE POLICY "project_activity_log_admin_write" ON public.project_activity_log
  FOR ALL TO public USING (is_staff_user()) WITH CHECK (is_staff_user());

DROP POLICY IF EXISTS "project_activity_log_select" ON public.project_activity_log;
CREATE POLICY "project_activity_log_select" ON public.project_activity_log
  FOR SELECT TO public
  USING (is_staff_user() OR is_project_member(project_id));

-- ---------- project_milestone_dependencies ----------
DROP POLICY IF EXISTS "customers read own project milestone dependencies" ON public.project_milestone_dependencies;
CREATE POLICY "customers read own project milestone dependencies" ON public.project_milestone_dependencies
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1
    FROM public.project_milestones m
      JOIN public.projects p ON (p.id = m.project_id)
    WHERE m.id = project_milestone_dependencies.milestone_id
      AND (
        p.primary_user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.project_members pm
          WHERE pm.project_id = p.id AND pm.user_id = auth.uid()
        )
      )
  ));

DROP POLICY IF EXISTS "staff manage project_milestone_dependencies" ON public.project_milestone_dependencies;
CREATE POLICY "staff manage project_milestone_dependencies" ON public.project_milestone_dependencies
  FOR ALL TO public
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  );

-- ---------- project_tasks ----------
DROP POLICY IF EXISTS "staff manage project_tasks" ON public.project_tasks;
CREATE POLICY "staff manage project_tasks" ON public.project_tasks
  FOR ALL TO public
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  );

-- ---------- project_task_time_entries ----------
DROP POLICY IF EXISTS "staff manage project_task_time_entries" ON public.project_task_time_entries;
CREATE POLICY "staff manage project_task_time_entries" ON public.project_task_time_entries
  FOR ALL TO public
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  );

-- ---------- project_templates ----------
DROP POLICY IF EXISTS "staff manage project_templates" ON public.project_templates;
CREATE POLICY "staff manage project_templates" ON public.project_templates
  FOR ALL TO public
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  );

-- ---------- project_template_milestones ----------
DROP POLICY IF EXISTS "staff manage project_template_milestones" ON public.project_template_milestones;
CREATE POLICY "staff manage project_template_milestones" ON public.project_template_milestones
  FOR ALL TO public
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)
    OR has_role(auth.uid(), 'co_admin'::app_role) OR has_role(auth.uid(), 'support_agent'::app_role)
    OR has_role(auth.uid(), 'viewer'::app_role) OR has_role(auth.uid(), 'sales'::app_role)
  );
