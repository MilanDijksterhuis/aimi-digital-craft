
-- 1. Fix privilege escalation: users cannot self-mark is_paid = true
DROP POLICY IF EXISTS "users create own requests" ON public.change_requests;
CREATE POLICY "users create own requests"
ON public.change_requests
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND is_paid = false
  AND available_credits(auth.uid()) > 0
  AND (
    SELECT count(*) FROM public.change_requests cr
    WHERE cr.user_id = auth.uid()
      AND cr.status <> ALL (ARRAY['done'::request_status, 'rejected'::request_status])
  ) < 10
);

-- 2. Storage: allow users to delete/update their own attachments
CREATE POLICY "users delete own change-attachments"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'change-attachments'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

CREATE POLICY "users update own change-attachments"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'change-attachments'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- 3. Lock down SECURITY DEFINER helpers from direct API exposure
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.available_credits(uuid) FROM anon, public;
-- available_credits is intentionally callable by authenticated users (used by client to show remaining credits)
GRANT EXECUTE ON FUNCTION public.available_credits(uuid) TO authenticated;
