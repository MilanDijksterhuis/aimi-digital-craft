import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { ensureStaff, ensureAdmin } from "./auth-guards.server";

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        name: z.string().trim().min(1).max(200),
        email: z.string().trim().email().max(200),
        message: z.string().trim().min(1).max(5000),
        // SEC-6 honeypot: onzichtbaar veld dat mensen leeg laten en bots vaak
        // invullen. Optioneel zodat legitieme submits zonder het veld blijven
        // werken.
        company_website: z.string().max(200).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    // Honeypot ingevuld → vrijwel zeker een bot. Doe alsof het slaagt (geen
    // signaal terug dat de val bestaat), maar sla niets op. IP-rate-limiting
    // gebeurt daarnaast al in de globale middleware (SEC-5, duurzaam).
    if (data.company_website && data.company_website.trim() !== "") {
      return { ok: true };
    }
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    if (error) throw new Error(error.message);

    // Fire-and-forget Telegram-notificatie naar alle actieve, gekoppelde
    // ontvangers. Mag de response naar de bezoeker nooit vertragen of laten
    // falen als Telegram tijdelijk onbereikbaar is — vandaar eigen try/catch,
    // geen await op het eindresultaat van de flow.
    void notifyContactSubmission(data.name, data.email, data.message);

    return { ok: true };
  });

async function notifyContactSubmission(name: string, email: string, message: string): Promise<void> {
  try {
    const { data: recipients } = await supabaseAdmin
      .from("telegram_notification_recipients" as any)
      .select("telegram_chat_id")
      .eq("active", true)
      .eq("notify_contact_form", true)
      .not("telegram_chat_id", "is", null);
    const rows = (recipients ?? []) as unknown as Array<{ telegram_chat_id: string | null }>;
    if (rows.length === 0) return;

    const { sendTelegramMessage } = await import("./telegram.server");
    const text =
      `📬 *Nieuw contactformulier*\n\n` +
      `*Naam:* ${name}\n` +
      `*E-mail:* ${email}\n\n` +
      `${message}`;

    await Promise.allSettled(
      rows
        .filter((r) => r.telegram_chat_id)
        .map((r) => sendTelegramMessage(r.telegram_chat_id as string, text)),
    );
  } catch (err) {
    // Notificatie is best-effort; de inzending is al opgeslagen.
    console.error("[telegram] contact-notificatie mislukt:", err);
  }
}

export const adminListContactSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { submissions: data ?? [] };
  });

export const adminToggleContactHandled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), handled: z.boolean() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { error } = await supabase
      .from("contact_submissions")
      .update({ handled: data.handled })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteContactSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    // CODE-12: was gelabeld "super admin only" maar staat co_admin/admin toe.
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("contact_submissions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
