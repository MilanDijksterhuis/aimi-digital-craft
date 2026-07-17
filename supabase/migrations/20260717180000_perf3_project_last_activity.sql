-- ============================================================
-- PERF-3: laatste project-activiteit via DISTINCT ON i.p.v. full-scan in JS
-- ============================================================
-- adminGetProjectsDashboardWidgets haalde ALLE audit_log-rijen voor de projecten
-- op (geen limit) en nam in JS de eerste (nieuwste) per project. Deze functie
-- doet exact hetzelfde met DISTINCT ON, zodat er per project maar één rij
-- terugkomt. Resultaat-identiek; gebruikt idx_audit_log_target uit PERF-1.

CREATE OR REPLACE FUNCTION public.project_last_activity(p_project_ids uuid[])
RETURNS TABLE(project_id uuid, last_activity timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT ON (target_id) target_id, created_at
  FROM public.audit_log
  WHERE target_type = 'project' AND target_id = ANY(p_project_ids)
  ORDER BY target_id, created_at DESC;
$$;
