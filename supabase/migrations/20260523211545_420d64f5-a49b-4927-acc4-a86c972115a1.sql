
ALTER TYPE public.request_status ADD VALUE IF NOT EXISTS 'approved';
ALTER TYPE public.request_status ADD VALUE IF NOT EXISTS 'waiting_customer';
ALTER TYPE public.request_status ADD VALUE IF NOT EXISTS 'invoiced';
