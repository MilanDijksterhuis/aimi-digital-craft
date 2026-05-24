
-- ============================================================
-- Profiles: blocking, temporary access, online presence
-- ============================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_blocked boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS access_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_seen_at timestamptz;

-- Allow users to update their own last_seen_at (presence ping).
-- The existing profiles UPDATE policy blocks changes to several fields for
-- non-admins; last_seen_at is not in that list, so it works. Same for tags
-- (admin path uses has_role check at top of policy). No policy change needed.

-- ============================================================
-- Change requests: archive, assignment
-- ============================================================
ALTER TABLE public.change_requests
  ADD COLUMN IF NOT EXISTS archived boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz,
  ADD COLUMN IF NOT EXISTS archived_by uuid,
  ADD COLUMN IF NOT EXISTS assigned_to uuid;

-- Hide archived changes from clients (staff still see everything)
DROP POLICY IF EXISTS "users read own requests" ON public.change_requests;
CREATE POLICY "users read own requests"
  ON public.change_requests
  FOR SELECT
  USING (
    (
      (auth.uid() = user_id)
      AND (deleted_at IS NULL)
      AND (archived = false)
    )
    OR is_staff(auth.uid())
  );

-- ============================================================
-- Admin notifications
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  link text,
  is_read boolean NOT NULL DEFAULT false,
  triggered_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_notifications_created_at_idx
  ON public.admin_notifications (created_at DESC);
CREATE INDEX IF NOT EXISTS admin_notifications_is_read_idx
  ON public.admin_notifications (is_read);

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "staff read admin_notifications"
  ON public.admin_notifications
  FOR SELECT
  USING (is_staff(auth.uid()));

CREATE POLICY "staff update admin_notifications"
  ON public.admin_notifications
  FOR UPDATE
  USING (is_staff(auth.uid()))
  WITH CHECK (is_staff(auth.uid()));

CREATE POLICY "super_admin delete admin_notifications"
  ON public.admin_notifications
  FOR DELETE
  USING (is_super_admin(auth.uid()));

-- No INSERT policy: all inserts go through supabaseAdmin (service role) from server fns.

-- ============================================================
-- Realtime
-- ============================================================
ALTER TABLE public.admin_notifications REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;

DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;
