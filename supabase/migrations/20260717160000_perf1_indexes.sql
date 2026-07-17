-- ============================================================
-- PERF-1: ontbrekende indexen op kritieke query-paden
-- ============================================================
-- Veel hot-path queries deden seq-scans. Deze migratie voegt de indexen toe
-- (aflopend belang). Elk index staat in een eigen DO-block dat undefined_table
-- /undefined_column opvangt, zodat een afwijkende naam op een tabel die buiten
-- migraties om is aangemaakt nooit de hele migratie laat falen. Idempotent via
-- IF NOT EXISTS. Bestaande indexen (idx_projects_primary_user,
-- idx_project_members_user, project_members PK op (project_id,user_id)) worden
-- niet gedupliceerd.

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_user_roles_user ON public.user_roles (user_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_user_roles_user: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_change_requests_user_created ON public.change_requests (user_id, created_at DESC);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_change_requests_user_created: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications (user_id, created_at DESC);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_notifications_user_created: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_extra_credits_user ON public.extra_credits (user_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_extra_credits_user: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_projects_primary_user ON public.projects (primary_user_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_projects_primary_user: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_audit_log_target ON public.audit_log (target_type, target_id, created_at DESC);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_audit_log_target: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_login_events_user_created ON public.login_events (user_id, created_at DESC);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_login_events_user_created: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_onboarding_items_user ON public.onboarding_items (user_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_onboarding_items_user: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_project_milestones_project ON public.project_milestones (project_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_project_milestones_project: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_project_notes_project ON public.project_notes (project_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_project_notes_project: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_customer_costs_user ON public.customer_costs (user_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_customer_costs_user: %', SQLERRM; END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_client_contacts_user ON public.client_contacts (user_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_client_contacts_user: %', SQLERRM; END $$;

-- site_pings(user_id) — nodig voor de aggregatie-count uit PERF-2.
DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_site_pings_user ON public.site_pings (user_id);
EXCEPTION WHEN undefined_table OR undefined_column THEN RAISE NOTICE 'skip idx_site_pings_user: %', SQLERRM; END $$;
