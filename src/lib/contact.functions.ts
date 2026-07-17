import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const STAFF_ROLES = ["super_admin", "co_admin", "support_agent", "viewer", "admin"];
const ADMIN_LIKE = ["super_admin", "co_admin", "admin"];

async function ensureStaff(supabase: any, userId: string) {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const roles = (data ?? []).map((r: any) => r.role);
  if (!roles.some((r: string) => STAFF_ROLES.includes(r))) throw new Error("Forbidden: staff only");
  return roles;
}

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
    return { ok: true };
  });

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
    const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const roles = (roleData ?? []).map((r: any) => r.role);
    if (!roles.some((r: string) => ADMIN_LIKE.includes(r))) {
      throw new Error("Forbidden: super admin only");
    }
    const { error } = await supabase.from("contact_submissions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
