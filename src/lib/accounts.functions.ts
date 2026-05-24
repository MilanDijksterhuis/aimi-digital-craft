import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_LIKE = ["super_admin", "co_admin", "admin"];
const SUPER = ["super_admin", "admin"];

async function getRoles(supabase: any, userId: string): Promise<string[]> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return (data ?? []).map((r: any) => r.role);
}
async function ensureAdmin(supabase: any, userId: string) {
  const roles = await getRoles(supabase, userId);
  if (!roles.some((r) => ADMIN_LIKE.includes(r))) throw new Error("Forbidden: admin only");
}
async function ensureSuper(supabase: any, userId: string) {
  const roles = await getRoles(supabase, userId);
  if (!roles.some((r) => SUPER.includes(r))) throw new Error("Forbidden: super admin only");
}

// ---------------- Account ping ----------------
export const pingLastSeen = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await supabase.from("profiles").update({ last_seen_at: new Date().toISOString() }).eq("id", userId);
    return { ok: true };
  });

export const checkMyAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("profiles")
      .select("is_blocked, access_expires_at")
      .eq("id", userId)
      .maybeSingle();
    const blocked = !!data?.is_blocked;
    const expired =
      data?.access_expires_at != null && new Date(data.access_expires_at).getTime() < Date.now();
    return { blocked, expired, access_expires_at: data?.access_expires_at ?? null };
  });

// ---------------- List all accounts (incl staff) ----------------
export const adminListAllAccounts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminListAllAccountsImpl } = await import("./accounts.server");
    return adminListAllAccountsImpl();
  });

export const adminChangeAccountRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        target_user_id: z.string().uuid(),
        role: z.enum(["super_admin", "co_admin", "support_agent", "viewer", "customer"]),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuper(supabase, userId);
    if (data.target_user_id === userId) throw new Error("Je kunt je eigen rol niet wijzigen.");
    const { adminReplaceRole } = await import("./admin.server");
    await adminReplaceRole(data.target_user_id, data.role);
    await supabase.from("audit_log").insert({
      user_id: userId,
      action: "role_changed",
      target_type: "user",
      target_id: data.target_user_id,
      details: { new_role: data.role },
    });
    return { ok: true };
  });

export const adminSetBlocked = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid(), is_blocked: z.boolean() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("profiles").update({ is_blocked: data.is_blocked }).eq("id", data.user_id);
    if (error) throw new Error(error.message);
    await supabase.from("audit_log").insert({
      user_id: userId,
      action: data.is_blocked ? "account_blocked" : "account_unblocked",
      target_type: "user",
      target_id: data.user_id,
      details: {},
    });
    return { ok: true };
  });

export const adminSetAccountTags = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        tags: z.array(z.string().trim().min(1).max(50)).max(30),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("profiles").update({ tags: data.tags }).eq("id", data.user_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSetAccessExpiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        access_expires_at: z.string().nullable(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("profiles")
      .update({ access_expires_at: data.access_expires_at })
      .eq("id", data.user_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminHardDeleteAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuper(supabase, userId);
    if (data.user_id === userId) throw new Error("Je kunt jezelf niet verwijderen.");
    const { adminHardDeleteUserImpl } = await import("./accounts.server");
    await adminHardDeleteUserImpl(data.user_id);
    await supabase.from("audit_log").insert({
      user_id: userId,
      action: "account_deleted",
      target_type: "user",
      target_id: data.user_id,
      details: {},
    });
    return { ok: true };
  });

export const adminCreateTempAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        email: z.string().trim().email().max(255),
        full_name: z.string().trim().min(1).max(200),
        company: z.string().trim().max(200).optional().default(""),
        days_valid: z.number().int().min(1).max(365).default(14),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { adminCreateCustomer } = await import("./admin.server");
    const result = await adminCreateCustomer({
      email: data.email,
      full_name: data.full_name,
      company: data.company,
    });
    const expiresAt = new Date(Date.now() + data.days_valid * 24 * 60 * 60 * 1000).toISOString();
    if (result.user_id) {
      await supabase
        .from("profiles")
        .update({ access_expires_at: expiresAt, tags: ["tijdelijk"] })
        .eq("id", result.user_id);
    }
    await supabase.from("audit_log").insert({
      user_id: userId,
      action: "temp_account_created",
      target_type: "user",
      target_id: result.user_id ?? null,
      details: { email: data.email, days_valid: data.days_valid, expires_at: expiresAt },
    });
    return { ...result, access_expires_at: expiresAt };
  });

// ---------------- Admin notifications ----------------
export const adminListNotifications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data, error } = await supabase
      .from("admin_notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return { items: data ?? [] };
  });

export const adminMarkNotificationRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    await supabase.from("admin_notifications").update({ is_read: true }).eq("id", data.id);
    return { ok: true };
  });

export const adminMarkAllNotificationsRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    await supabase.from("admin_notifications").update({ is_read: true }).eq("is_read", false);
    return { ok: true };
  });

// ---------------- Change requests: archive / assign ----------------
export const adminArchiveChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("change_requests")
      .update({ archived: true, archived_at: new Date().toISOString(), archived_by: userId })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUnarchiveChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("change_requests")
      .update({ archived: false, archived_at: null, archived_by: null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminBulkArchive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ ids: z.array(z.string().uuid()).min(1).max(200) }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("change_requests")
      .update({ archived: true, archived_at: new Date().toISOString(), archived_by: userId })
      .in("id", data.ids);
    if (error) throw new Error(error.message);
    return { ok: true, count: data.ids.length };
  });

export const adminAssignChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ id: z.string().uuid(), assigned_to: z.string().uuid().nullable() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: req, error } = await supabase
      .from("change_requests")
      .update({ assigned_to: data.assigned_to })
      .eq("id", data.id)
      .select("title")
      .single();
    if (error) throw new Error(error.message);
    if (data.assigned_to && data.assigned_to !== userId) {
      await supabase.from("admin_notifications").insert({
        type: "assignment",
        title: "Change toegewezen",
        message: `Je hebt een nieuwe change toegewezen gekregen: ${req?.title ?? ""}`,
        link: `/admin?change=${data.id}`,
        triggered_by_user_id: userId,
      });
    }
    return { ok: true };
  });

export const adminListArchivedChanges = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data, error } = await supabase
      .from("change_requests")
      .select("*")
      .eq("archived", true)
      .is("deleted_at", null)
      .order("archived_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return { items: data ?? [] };
  });
