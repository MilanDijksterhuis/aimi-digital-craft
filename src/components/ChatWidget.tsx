import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_type: "admin" | "client";
  body: string | null;
  attachments: { path: string; name: string; mime?: string }[];
  is_read: boolean;
  created_at: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get user + ensure chat
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user || !mounted) return;
      setUserId(data.user.id);
      // Find or create chat
      const { data: existing } = await supabase
        .from("chats")
        .select("id")
        .eq("client_id", data.user.id)
        .maybeSingle();
      if (existing) {
        setChatId(existing.id);
      } else {
        const { data: created } = await supabase
          .from("chats")
          .insert({ client_id: data.user.id })
          .select("id")
          .single();
        if (created) setChatId(created.id);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Load messages + realtime
  useEffect(() => {
    if (!chatId) return;
    (async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });
      setMessages((data as Message[]) || []);
    })();
    const channel = supabase
      .channel(`chat-${chatId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `chat_id=eq.${chatId}` },
        (payload) => {
          const m = payload.new as Message;
          setMessages((prev) => (prev.find((x) => x.id === m.id) ? prev : [...prev, m]));
          if (m.sender_type === "admin" && !open) setUnread((u) => u + 1);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, open]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Mark admin messages read when open
  useEffect(() => {
    if (!open || !chatId) return;
    setUnread(0);
    supabase
      .from("chat_messages")
      .update({ is_read: true })
      .eq("chat_id", chatId)
      .eq("sender_type", "admin")
      .eq("is_read", false)
      .then(() => {});
  }, [open, chatId, messages.length]);

  // Initial unread count
  useEffect(() => {
    if (!chatId) return;
    supabase
      .from("chat_messages")
      .select("id", { count: "exact", head: true })
      .eq("chat_id", chatId)
      .eq("sender_type", "admin")
      .eq("is_read", false)
      .then(({ count }) => setUnread(count || 0));
  }, [chatId]);

  async function send() {
    if (!chatId || !userId || !draft.trim() || sending) return;
    setSending(true);
    const body = draft.trim();
    setDraft("");
    const { error } = await supabase.from("chat_messages").insert({
      chat_id: chatId,
      sender_id: userId,
      sender_type: "client",
      body,
      attachments: [],
    });
    if (error) setDraft(body);
    setSending(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Sluit chat" : "Open chat"}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90"
      >
        <span className="text-2xl" aria-hidden>💬</span>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Chat met support"
          className="fixed bottom-20 right-4 z-50 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-6rem))] bg-card border border-border rounded-xl shadow-2xl flex flex-col"
        >
          <header className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <div className="font-semibold">Support chat</div>
              <div className="text-xs text-muted-foreground">We reageren meestal binnen 1 uur</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Sluit chat"
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </header>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Stuur ons gerust een bericht. We helpen je graag.
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender_type === "client" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words ${
                    m.sender_type === "client"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.body}
                  <div className="text-[10px] opacity-70 mt-1">
                    {new Date(m.created_at).toLocaleTimeString("nl-NL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="p-3 border-t border-border flex gap-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Typ een bericht…"
              aria-label="Bericht"
              className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-sm"
            />
            <button
              type="submit"
              disabled={!draft.trim() || sending}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
            >
              Stuur
            </button>
          </form>
        </div>
      )}
    </>
  );
}
