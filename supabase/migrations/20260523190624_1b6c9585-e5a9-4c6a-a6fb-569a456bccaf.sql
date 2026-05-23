
-- 1. Extend status enum
ALTER TYPE public.request_status ADD VALUE IF NOT EXISTS 'in_review' BEFORE 'in_progress';
ALTER TYPE public.request_status ADD VALUE IF NOT EXISTS 'review' BEFORE 'done';

-- 2. change_requests: due_date + internal_note
ALTER TABLE public.change_requests
  ADD COLUMN IF NOT EXISTS due_date DATE,
  ADD COLUMN IF NOT EXISTS internal_note TEXT;

-- 3. profiles extra fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS kvk TEXT,
  ADD COLUMN IF NOT EXISTS btw TEXT,
  ADD COLUMN IF NOT EXISTS package TEXT,
  ADD COLUMN IF NOT EXISTS monthly_price_cents INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS tags TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- Populate referral_code for existing rows
UPDATE public.profiles
SET referral_code = upper(substr(md5(id::text || random()::text), 1, 8))
WHERE referral_code IS NULL;

-- 4. change_attachments
CREATE TABLE IF NOT EXISTS public.change_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.change_requests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT,
  size_bytes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.change_attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "view own or admin attachments" ON public.change_attachments
  FOR SELECT USING (
    user_id = auth.uid() OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "user creates own attachment" ON public.change_attachments
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND EXISTS (
      SELECT 1 FROM public.change_requests r
      WHERE r.id = request_id AND r.user_id = auth.uid()
    )
  );
CREATE POLICY "admins manage attachments" ON public.change_attachments
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. change_comments
CREATE TABLE IF NOT EXISTS public.change_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.change_requests(id) ON DELETE CASCADE,
  author_id UUID NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.change_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "view comments on own request or admin" ON public.change_comments
  FOR SELECT USING (
    public.has_role(auth.uid(), 'admin') OR EXISTS (
      SELECT 1 FROM public.change_requests r
      WHERE r.id = request_id AND r.user_id = auth.uid()
    )
  );
CREATE POLICY "post comment own request" ON public.change_comments
  FOR INSERT WITH CHECK (
    author_id = auth.uid() AND (
      public.has_role(auth.uid(), 'admin') OR EXISTS (
        SELECT 1 FROM public.change_requests r
        WHERE r.id = request_id AND r.user_id = auth.uid()
      )
    )
  );
CREATE POLICY "admins manage comments" ON public.change_comments
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. customer_costs
CREATE TABLE IF NOT EXISTS public.customer_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  description TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  cost_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID
);
ALTER TABLE public.customer_costs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "view own or admin costs" ON public.customer_costs
  FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage costs" ON public.customer_costs
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 7. onboarding_items
CREATE TABLE IF NOT EXISTS public.onboarding_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  label TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.onboarding_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "view own or admin onboarding" ON public.onboarding_items
  FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage onboarding" ON public.onboarding_items
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. reply_snippets (admin-only)
CREATE TABLE IF NOT EXISTS public.reply_snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID
);
ALTER TABLE public.reply_snippets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage snippets" ON public.reply_snippets
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 9. Update handle_new_user to also generate referral code
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, company, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'company', ''),
    upper(substr(md5(NEW.id::text || random()::text), 1, 8))
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer');
  RETURN NEW;
END;
$$;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Storage bucket for attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('change-attachments', 'change-attachments', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "users read own change attachments" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'change-attachments' AND (
      public.has_role(auth.uid(), 'admin')
      OR auth.uid()::text = (storage.foldername(name))[1]
    )
  );
CREATE POLICY "users upload own change attachments" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'change-attachments' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "admins delete change attachments" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'change-attachments' AND public.has_role(auth.uid(), 'admin')
  );
