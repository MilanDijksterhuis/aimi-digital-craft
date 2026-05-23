import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_type: "admin" | "client";
  body: string | null;
  is_read: boolean;
  created_at: string;
};

type ChatRow = {
  id: string;
  client_id: string;
  status: string;
  last_message_at: string;
  unread?: number;
  client_name?: string;
  client_email?: string;
};

export function AdminChatPanel() {
  const [chats, setChats] = useState<ChatRow[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [adminId, setAdminId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAdminId(data.user?.id ?? null));
  }, []);

  async function loadChats() {
    const { data: chatRows } = await supabase
      .from("chats")
      .select("*")
      .order("last_message_at", { ascending: false });
    if (!chatRows) return;
    const ids = chatRows.map((c) => c.client_id);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email, company")
      .in("id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
    const profMap = new Map((profiles || []).map((p) => [p.id, p]));
    // Unread counts (admin sees client messages unread)
    const unreadCounts = await Promise.all(
      chatRows.map(async (c) => {
        const { count } = await supabase
          .from("chat_messages")
          .select("id", { count: "exact", head: true })
          .eq("chat_id", c.id)
          .eq("sender_type", "client")
          .eq("is_read", false);
        return count || 0;
      }),
    );
    setChats(
      chatRows.map((c, i) => {
        const p = profMap.get(c.client_id);
        return {
          ...c,
          unread: unreadCounts[i],
          client_name: p?.full_name || p?.company || "—",
          client_email: p?.email,
        };
      }),
    );
    setLoading(false);
  }

  useEffect(() => {
    loadChats();
    const channel = supabase
      .channel("admin-chats")
      .on("postgres_changes", { event: "*", schema: "public", table: "chat_messages" }, () =>
        loadChats(),
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "chats" }, () => loadChats())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("chat_id", selected)
        .order("created_at", { ascending: true });
      setMessages((data as Message[]) || []);
      // mark client messages read
      await supabase
        .from("chat_messages")
        .update({ is_read: true })
        .eq("chat_id", selected)
        .eq("sender_type", "client")
        .eq("is_read", false);
    })();
    const ch = supabase
      .channel(`admin-chat-${selected}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `chat_id=eq.${selected}` },
        (payload) => {
          const m = payload.new as Message;
          setMessages((prev) => (prev.find((x) => x.id === m.id) ? prev : [...prev, m]));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [selected]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function send() {
    if (!selected || !adminId || !draft.trim()) return;
    const body = draft.trim();
    setDraft("");
    await supabase.from("chat_messages").insert({
      chat_id: selected,
      sender_id: adminId,
      sender_type: "admin",
      body,
      attachments: [],
    });
  }

  if (loading) return <p className="text-muted-foreground">Chats laden…</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 h-[70vh]">
      <aside className="border border-border rounded-lg overflow-y-auto">
        {chats.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">Nog geen chats.</p>
        )}
        {chats.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`w-full text-left px-3 py-3 border-b border-border hover:bg-muted/50 ${
              selected === c.id ? "bg-muted" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm truncate">{c.client_name}</span>
              {c.unread ? (
                <span className="bg-destructive text-destructive-foreground text-[10px] rounded-full px-1.5 py-0.5">
                  {c.unread}
                </span>
              ) : null}
            </div>
            <div className="text-xs text-muted-foreground truncate">{c.client_email}</div>
            <div className="text-[10px] text-muted-foreground mt-1">
              {new Date(c.last_message_at).toLocaleString("nl-NL")}
            </div>
          </button>
        ))}
      </aside>
      <section className="border border-border rounded-lg flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            Selecteer een chat
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender_type === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words ${
                      m.sender_type === "admin"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.body}
                    <div className="text-[10px] opacity-70 mt-1">
                      {new Date(m.created_at).toLocaleString("nl-NL")}
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
                placeholder="Antwoord…"
                aria-label="Antwoord"
                className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-sm"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
              >
                Stuur
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
