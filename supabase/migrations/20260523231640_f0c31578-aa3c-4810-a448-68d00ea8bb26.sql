
-- 1. Restrict profile updates
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
  )
);

-- 2. Realtime authorization
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated can receive own chat topics" ON realtime.messages;
CREATE POLICY "authenticated can receive own chat topics"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  public.is_staff(auth.uid())
  OR EXISTS (
    SELECT 1 FROM public.chats c
    WHERE c.client_id = auth.uid()
      AND realtime.topic() = 'chat-' || c.id::text
  )
);

-- 3. Chat attachments: admins can delete
CREATE POLICY "admins delete chat attachments"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'chat-attachments'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
