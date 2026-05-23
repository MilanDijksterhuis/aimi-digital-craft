
-- 1. Split staff update policy on change_requests
DROP POLICY IF EXISTS "staff update requests" ON public.change_requests;

CREATE POLICY "staff update requests non-billing"
ON public.change_requests
FOR UPDATE
USING (has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'co_admin'::app_role, 'support_agent'::app_role, 'admin'::app_role]))
WITH CHECK (
  has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'co_admin'::app_role, 'admin'::app_role])
  OR (
    has_role(auth.uid(), 'support_agent'::app_role)
    AND is_paid IS NOT DISTINCT FROM (SELECT is_paid FROM public.change_requests cr WHERE cr.id = change_requests.id)
  )
);

-- 2. Restrict user_presence reads
DROP POLICY IF EXISTS "presence read authenticated" ON public.user_presence;
CREATE POLICY "presence read self or staff"
ON public.user_presence
FOR SELECT
USING (user_id = auth.uid() OR is_staff(auth.uid()));

-- 3. Tighten chat attachments storage SELECT: require chat membership
DROP POLICY IF EXISTS "chat attachments read participants" ON storage.objects;
CREATE POLICY "chat attachments read participants"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'chat-attachments'
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR EXISTS (
      SELECT 1 FROM public.chats c
      WHERE c.client_id = auth.uid()
        AND (storage.foldername(name))[1] = auth.uid()::text
        AND (storage.foldername(name))[2] = c.id::text
    )
  )
);
