import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, RotateCcw } from "lucide-react";

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

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export function AdminChatPanel() {
  const [chats, setChats] = useState<ChatRow[]>([]);
  const [deletedChats, setDeletedChats] = useState<ChatRow[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [adminId, setAdminId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleted, setShowDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
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

    const mapped = chatRows.map((c, i) => {
      const p = profMap.get(c.client_id);
      return {
        ...c,
        unread: unreadCounts[i],
        client_name: p?.full_name || p?.company || "—",
        client_email: p?.email,
      };
    });

    const cutoff = new Date(Date.now() - THIRTY_DAYS).toISOString();
    setChats(mapped.filter((c) => c.status !== "deleted"));
    setDeletedChats(
      mapped.filter(
        (c) => c.status === "deleted" && c.last_message_at > cutoff,
      ),
    );
    setLoading(false);
  }

  useEffect(() => {
    loadChats();
    // .subscribe() opent direct een WebSocket, wat op sommige mobiele
    // browsers synchroon een SecurityError kan gooien ipv netjes te falen —
    // zonder try/catch crasht dat de hele pagina. Realtime is hier alleen
    // een live-refresh, dus bij falen degraderen we stil.
    let channel: ReturnType<typeof supabase.channel> | null = null;
    try {
      channel = supabase
        .channel("admin-chats")
        .on("postgres_changes", { event: "*", schema: "public", table: "chat_messages" }, () => loadChats())
        .on("postgres_changes", { event: "*", schema: "public", table: "chats" }, () => loadChats())
        .subscribe();
    } catch (e) {
      console.warn("Chat realtime niet beschikbaar:", e);
    }
    return () => { if (channel) supabase.removeChannel(channel); };
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
      await supabase
        .from("chat_messages")
        .update({ is_read: true })
        .eq("chat_id", selected)
        .eq("sender_type", "client")
        .eq("is_read", false);
    })();
    let ch: ReturnType<typeof supabase.channel> | null = null;
    try {
      ch = supabase
        .channel(`admin-chat-${selected}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `chat_id=eq.${selected}` },
          (payload) => {
            const m = payload.new as Message;
            setMessages((prev) => (prev.find((x) => x.id === m.id) ? prev : [...prev, m]));
          })
        .subscribe();
    } catch (e) {
      console.warn("Chat realtime niet beschikbaar:", e);
    }
    return () => { if (ch) supabase.removeChannel(ch); };
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

  async function deleteChat(id: string) {
    await supabase.from("chats").update({ status: "deleted" }).eq("id", id);
    if (selected === id) setSelected(null);
    setConfirmDelete(null);
    loadChats();
  }

  async function restoreChat(id: string) {
    await supabase.from("chats").update({ status: "active" }).eq("id", id);
    loadChats();
  }

  if (loading) return <p className="text-muted-foreground">Chats laden…</p>;

  const visibleChats = showDeleted ? deletedChats : chats;

  return (
    <div className="space-y-4">
      {/* Header met tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => { setShowDeleted(false); setSelected(null); }}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${!showDeleted ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            Actief ({chats.length})
          </button>
          <button
            onClick={() => { setShowDeleted(true); setSelected(null); }}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${showDeleted ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            Verwijderd ({deletedChats.length})
          </button>
        </div>
        {showDeleted && (
          <p className="text-xs text-muted-foreground">Herstelbaar binnen 30 dagen</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 h-[65vh]">
        {/* Chat lijst */}
        <aside className="border border-border rounded-lg overflow-y-auto">
          {visibleChats.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">
              {showDeleted ? "Geen verwijderde chats." : "Nog geen chats."}
            </p>
          )}
          {visibleChats.map((c) => (
            <div key={c.id} className={`group border-b border-border ${selected === c.id ? "bg-muted" : ""}`}>
              <button
                onClick={() => setSelected(c.id)}
                className="w-full text-left px-3 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm truncate">{c.client_name}</span>
                  <div className="flex items-center gap-1.5">
                    {c.unread ? (
                      <span className="bg-destructive text-destructive-foreground text-[10px] rounded-full px-1.5 py-0.5">
                        {c.unread}
                      </span>
                    ) : null}
                    {!showDeleted && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmDelete(c.id); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:text-destructive"
                        title="Verwijder gesprek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {showDeleted && (
                      <button
                        onClick={(e) => { e.stopPropagation(); restoreChat(c.id); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:text-primary"
                        title="Herstel gesprek"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground truncate">{c.client_email}</div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  {new Date(c.last_message_at).toLocaleString("nl-NL")}
                </div>
              </button>
            </div>
          ))}
        </aside>

        {/* Chat venster */}
        <section className="border border-border rounded-lg flex flex-col">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Selecteer een chat
            </div>
          ) : showDeleted ? (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender_type === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words ${m.sender_type === "admin" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                      {m.body}
                      <div className="text-[10px] opacity-70 mt-1">{new Date(m.created_at).toLocaleString("nl-NL")}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Dit gesprek is verwijderd.</p>
                <button
                  onClick={() => restoreChat(selected)}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Herstel gesprek
                </button>
              </div>
            </>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender_type === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words ${m.sender_type === "admin" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                      {m.body}
                      <div className="text-[10px] opacity-70 mt-1">{new Date(m.created_at).toLocaleString("nl-NL")}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-border flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Antwoord…"
                  aria-label="Antwoord"
                  className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-sm"
                />
                <button type="submit" disabled={!draft.trim()} className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
                  Stuur
                </button>
              </form>
            </>
          )}
        </section>
      </div>

      {/* Verwijder bevestiging */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="rounded-xl border border-border bg-card p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="font-semibold text-foreground">Gesprek verwijderen?</h3>
            <p className="text-sm text-muted-foreground">
              Dit gesprek wordt verplaatst naar "Verwijderd" en is 30 dagen herstelbaar.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 rounded-md border border-border text-sm hover:bg-muted transition-colors">
                Annuleer
              </button>
              <button onClick={() => deleteChat(confirmDelete)} className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90">
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
