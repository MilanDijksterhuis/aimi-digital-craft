-- Fix 1: Add UPDATE policy for chat-attachments storage bucket (mirror INSERT)
CREATE POLICY "chat-attachments update own"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'chat-attachments' AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'chat-attachments' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Fix 2: Tighten is_super_admin so plain 'admin' role users do not get super-admin privileges
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
  SELECT public.has_any_role(_user_id, ARRAY['super_admin']::public.app_role[])
$function$;