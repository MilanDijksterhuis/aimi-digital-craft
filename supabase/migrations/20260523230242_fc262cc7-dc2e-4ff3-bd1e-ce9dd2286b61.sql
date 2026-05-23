
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  handled boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 200
  AND length(message) BETWEEN 1 AND 5000
);

CREATE POLICY "staff reads contact submissions"
ON public.contact_submissions
FOR SELECT
USING (public.is_staff(auth.uid()));

CREATE POLICY "staff updates contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (public.is_staff(auth.uid()))
WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "super admin deletes contact submissions"
ON public.contact_submissions
FOR DELETE
USING (public.is_super_admin(auth.uid()));

CREATE INDEX idx_contact_submissions_created ON public.contact_submissions(created_at DESC);
