-- Chats (één per klant)
CREATE TABLE public.chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  last_message_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_chats_last_message ON public.chats(last_message_at DESC);

-- Chat berichten
CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('admin','client')),
  body text,
  attachments jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_chat_messages_chat ON public.chat_messages(chat_id, created_at);

-- Presence
CREATE TABLE public.user_presence (
  user_id uuid PRIMARY KEY,
  status text NOT NULL DEFAULT 'online' CHECK (status IN ('online','away','dnd','offline')),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_presence ENABLE ROW LEVEL SECURITY;

-- chats policies
CREATE POLICY "chats read participants" ON public.chats
  FOR SELECT USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "chats insert own" ON public.chats
  FOR INSERT WITH CHECK (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "chats admin update" ON public.chats
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "chats admin delete" ON public.chats
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- chat_messages policies
CREATE POLICY "messages read participants" ON public.chat_messages
  FOR SELECT USING (
    public.has_role(auth.uid(), 'admin') OR
    EXISTS (SELECT 1 FROM public.chats c WHERE c.id = chat_id AND c.client_id = auth.uid())
  );
CREATE POLICY "messages insert participants" ON public.chat_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND (
      (sender_type = 'admin' AND public.has_role(auth.uid(), 'admin')) OR
      (sender_type = 'client' AND EXISTS (SELECT 1 FROM public.chats c WHERE c.id = chat_id AND c.client_id = auth.uid()))
    )
  );
CREATE POLICY "messages update participants" ON public.chat_messages
  FOR UPDATE USING (
    public.has_role(auth.uid(), 'admin') OR
    EXISTS (SELECT 1 FROM public.chats c WHERE c.id = chat_id AND c.client_id = auth.uid())
  );

-- user_presence policies
CREATE POLICY "presence read authenticated" ON public.user_presence
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "presence upsert own" ON public.user_presence
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "presence update own" ON public.user_presence
  FOR UPDATE USING (user_id = auth.uid());

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
  VALUES ('chat-attachments', 'chat-attachments', false)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "chat attachments read participants" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'chat-attachments' AND (
      public.has_role(auth.uid(), 'admin') OR
      (storage.foldername(name))[1] = auth.uid()::text
    )
  );
CREATE POLICY "chat attachments insert own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'chat-attachments' AND (
      public.has_role(auth.uid(), 'admin') OR
      (storage.foldername(name))[1] = auth.uid()::text
    )
  );

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_presence;

-- Touch last_message_at on new messages
CREATE OR REPLACE FUNCTION public.touch_chat_last_message()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  UPDATE public.chats SET last_message_at = NEW.created_at WHERE id = NEW.chat_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_touch_chat_last_message
AFTER INSERT ON public.chat_messages
FOR EACH ROW EXECUTE FUNCTION public.touch_chat_last_message();