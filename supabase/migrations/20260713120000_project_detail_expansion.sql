-- Correctie: het echte schema voor projects/project_milestones/project_notes/
-- project_contacts/project_members bleek al te bestaan in de live database
-- (buiten migraties om aangemaakt), met RLS-policies die al volledig correct
-- staan. Deze migratie voegt alleen de kolommen toe die daadwerkelijk nog
-- ontbraken op public.projects. Geen nieuwe tabellen, geen nieuwe policies.

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS archived boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
