-- Fase 2 van de projectuitbreiding: taken, tijdregistratie, milestone-
-- dependencies, projectsjablonen, en het koppelen van change_requests aan
-- projecten. Alle tabellen hieronder bestaan nog niet en krijgen daarom wel
-- eigen RLS-policies (in tegenstelling tot de vorige migratie, die alleen
-- kolommen toevoegde aan reeds bestaande tabellen met reeds bestaande RLS).

-- ============================================================
-- 1. Taken/checklist per project + toewijzing + terugkerende taken
-- ============================================================

CREATE TABLE public.project_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  assigned_to uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'open',
  due_date date,
  recurrence text,
  recurrence_parent_id uuid REFERENCES public.project_tasks(id) ON DELETE SET NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE public.project_tasks ADD CONSTRAINT project_tasks_recurrence_check CHECK (recurrence IN ('weekly', 'monthly', 'quarterly') OR recurrence IS NULL);

CREATE INDEX project_tasks_project_id_idx ON public.project_tasks (project_id);

CREATE INDEX project_tasks_recurrence_parent_id_idx ON public.project_tasks (recurrence_parent_id);

ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;

-- Interne data, net als project_contacts: geen klanttoegang, alleen staff.
CREATE POLICY "staff manage project_tasks" ON public.project_tasks FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales'));

-- ============================================================
-- 2. Tijdregistratie per teamlid met CSV-export voor facturatie
-- ============================================================

CREATE TABLE public.project_task_time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  task_id uuid REFERENCES public.project_tasks(id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  minutes integer NOT NULL,
  description text,
  entry_date date NOT NULL DEFAULT current_date,
  billable boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_task_time_entries ADD CONSTRAINT project_task_time_entries_minutes_check CHECK (minutes > 0);

CREATE INDEX project_task_time_entries_project_id_idx ON public.project_task_time_entries (project_id);

ALTER TABLE public.project_task_time_entries ENABLE ROW LEVEL SECURITY;

-- Interne data, net als project_contacts: geen klanttoegang, alleen staff.
CREATE POLICY "staff manage project_task_time_entries" ON public.project_task_time_entries FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales'));

-- ============================================================
-- 3. Dependencies tussen milestones
-- ============================================================

CREATE TABLE public.project_milestone_dependencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id uuid NOT NULL REFERENCES public.project_milestones(id) ON DELETE CASCADE,
  depends_on_milestone_id uuid NOT NULL REFERENCES public.project_milestones(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT project_milestone_dependencies_no_self CHECK (milestone_id <> depends_on_milestone_id),
  CONSTRAINT project_milestone_dependencies_unique UNIQUE (milestone_id, depends_on_milestone_id)
);

CREATE INDEX project_milestone_dependencies_milestone_id_idx ON public.project_milestone_dependencies (milestone_id);

CREATE INDEX project_milestone_dependencies_depends_on_idx ON public.project_milestone_dependencies (depends_on_milestone_id);

ALTER TABLE public.project_milestone_dependencies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "staff manage project_milestone_dependencies" ON public.project_milestone_dependencies FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales'));

-- Klant-SELECT: mirror van de bestaande project_milestones customer-read-
-- policy, zodat de klant-tijdlijn kan tonen waarom een milestone geblokkeerd is.
CREATE POLICY "customers read own project milestone dependencies" ON public.project_milestone_dependencies FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.project_milestones m
    JOIN public.projects p ON p.id = m.project_id
    WHERE m.id = project_milestone_dependencies.milestone_id
    AND (
      p.primary_user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.project_members pm
        WHERE pm.project_id = p.id AND pm.user_id = auth.uid()
      )
    )
  )
);

-- ============================================================
-- 4. Sjablonen: nieuw project starten vanuit een projecttype
-- ============================================================

CREATE TABLE public.project_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  default_category text,
  default_hours_estimated numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.project_template_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES public.project_templates(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  days_offset integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE INDEX project_template_milestones_template_id_idx ON public.project_template_milestones (template_id);

ALTER TABLE public.project_templates ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.project_template_milestones ENABLE ROW LEVEL SECURITY;

-- Staff-only, intern hulpmiddel bij het aanmaken van projecten, geen klanttoegang.
CREATE POLICY "staff manage project_templates" ON public.project_templates FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales'));

CREATE POLICY "staff manage project_template_milestones" ON public.project_template_milestones FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'co_admin') OR public.has_role(auth.uid(), 'support_agent') OR public.has_role(auth.uid(), 'viewer') OR public.has_role(auth.uid(), 'sales'));

-- Standaard voorbeeldsjablonen, zodat er meteen iets te kiezen valt.

INSERT INTO public.project_templates (id, name, description, default_category, default_hours_estimated) VALUES ('a1b2c3d4-0001-4000-8000-000000000001', 'Website + hosting', 'Standaard traject voor een nieuwe bedrijfswebsite inclusief hosting en onderhoud.', 'website', 40);

INSERT INTO public.project_templates (id, name, description, default_category, default_hours_estimated) VALUES ('a1b2c3d4-0002-4000-8000-000000000002', 'Kleine wijziging', 'Kort traject voor een kleine aanpassing aan een bestaande website.', 'wijziging', 4);

INSERT INTO public.project_template_milestones (template_id, title, description, days_offset, sort_order) VALUES ('a1b2c3d4-0001-4000-8000-000000000001', 'Kickoff', 'Intakegesprek en wensen in kaart brengen.', 0, 0);

INSERT INTO public.project_template_milestones (template_id, title, description, days_offset, sort_order) VALUES ('a1b2c3d4-0001-4000-8000-000000000001', 'Design goedgekeurd', 'Ontwerp is gepresenteerd en akkoord bevonden door de klant.', 10, 1);

INSERT INTO public.project_template_milestones (template_id, title, description, days_offset, sort_order) VALUES ('a1b2c3d4-0001-4000-8000-000000000001', 'Development', 'Bouwfase van de website.', 24, 2);

INSERT INTO public.project_template_milestones (template_id, title, description, days_offset, sort_order) VALUES ('a1b2c3d4-0001-4000-8000-000000000001', 'Content ingevoerd', 'Alle content is aangeleverd en verwerkt.', 31, 3);

INSERT INTO public.project_template_milestones (template_id, title, description, days_offset, sort_order) VALUES ('a1b2c3d4-0001-4000-8000-000000000001', 'Live gang', 'Website staat live en hosting/monitoring is actief.', 38, 4);

INSERT INTO public.project_template_milestones (template_id, title, description, days_offset, sort_order) VALUES ('a1b2c3d4-0002-4000-8000-000000000002', 'Wijziging doorgevoerd', 'De gevraagde aanpassing is doorgevoerd.', 3, 0);

INSERT INTO public.project_template_milestones (template_id, title, description, days_offset, sort_order) VALUES ('a1b2c3d4-0002-4000-8000-000000000002', 'Akkoord klant', 'Klant heeft de wijziging gecontroleerd en akkoord gegeven.', 5, 1);

-- ============================================================
-- 5. Kanban-status: geen schema-wijziging nodig (hergebruikt projects.status)
-- ============================================================

-- ============================================================
-- 6. Dashboard-widgets: geen schema-wijziging nodig (hergebruikt audit_log)
-- ============================================================

-- ============================================================
-- 7. Changes koppelen aan projecten
-- ============================================================

ALTER TABLE public.change_requests ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS change_requests_project_id_idx ON public.change_requests (project_id);
