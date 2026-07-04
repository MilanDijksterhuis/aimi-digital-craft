import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  adminCreateCustomer,
  adminListCustomers,
  adminGenerateRecoveryLink,
  adminSetUserPassword,
  adminUpdateUserEmail,
  adminGetGrowthMetrics,
  adminGetCustomerDetail,
} from "./admin.server";

const ADMIN_LIKE_ROLES = ["super_admin", "co_admin", "admin"];
const STAFF_ROLES_SRV = ["super_admin", "co_admin", "support_agent", "viewer", "admin"];

async function getRoles(supabase: any, userId: string): Promise<string[]> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return (data ?? []).map((r: any) => r.role);
}

async function ensureRoles(supabase: any, userId: string, allowed: string[], label = "this action") {
  const roles = await getRoles(supabase, userId);
  if (!roles.some((r) => allowed.includes(r))) {
    throw new Error(`Forbidden: ${label}`);
  }
  return roles;
}

async function ensureAdmin(supabase: any, userId: string) {
  await ensureRoles(supabase, userId, ADMIN_LIKE_ROLES, "admin only");
}

async function ensureSuperAdmin(supabase: any, userId: string) {
  await ensureRoles(supabase, userId, ["super_admin", "admin"], "super admin only");
}

async function ensureStaff(supabase: any, userId: string) {
  await ensureRoles(supabase, userId, STAFF_ROLES_SRV, "staff only");
}

async function logAudit(
  supabase: any,
  userId: string,
  action: string,
  target_type: string,
  target_id: string | null,
  details: Record<string, any> = {},
) {
  await supabase.from("audit_log").insert({
    user_id: userId,
    action,
    target_type,
    target_id,
    details,
  });
}

export const adminGetOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    const customers = await adminListCustomers();
    const [requestsRes, purchasesRes, snippetsRes, metrics] = await Promise.all([
      supabase
        .from("change_requests")
        .select("*, change_attachments(*), change_comments(*)")
        .is("deleted_at", null)
        .order("created_at", { ascending: false }),
      supabase
        .from("purchase_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
      supabase.from("reply_snippets").select("*").order("created_at", { ascending: false }),
      adminGetGrowthMetrics(),
    ]);

    return {
      customers,
      requests: requestsRes.data ?? [],
      pendingPurchases: purchasesRes.data ?? [],
      snippets: snippetsRes.data ?? [],
      metrics,
    };
  });

export const adminGetCustomer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    return adminGetCustomerDetail(data.user_id);
  });

export const adminCreateCustomerFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        email: z.string().trim().email().max(255),
        full_name: z.string().trim().min(1).max(200),
        company: z.string().trim().max(200).optional().default(""),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    return adminCreateCustomer(data);
  });

export const adminUpdateCustomer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        full_name: z.string().trim().max(200).optional(),
        company: z.string().trim().max(200).optional(),
        email: z.string().trim().email().max(255).optional(),
        phone: z.string().trim().max(50).optional(),
        address: z.string().trim().max(500).optional(),
        kvk: z.string().trim().max(50).optional(),
        btw: z.string().trim().max(50).optional(),
        package: z.string().trim().max(100).optional(),
        monthly_price_cents: z.number().int().min(0).max(100000000).optional(),
        internal_notes: z.string().max(5000).optional(),
        tags: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
        website_url: z.string().trim().max(500).optional().nullable(),
        contact_person: z.string().trim().max(200).optional().nullable(),
        billing_address: z.string().trim().max(500).optional().nullable(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { user_id, email, ...rest } = data;

    if (email) await adminUpdateUserEmail(user_id, email);

    const update: any = { ...rest };
    if (email) update.email = email;

    const { error } = await supabase.from("profiles").update(update).eq("id", user_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUpdateRequestStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum([
          "pending",
          "in_review",
          "approved",
          "in_progress",
          "waiting_customer",
          "review",
          "done",
          "invoiced",
          "rejected",
        ]),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: req, error } = await supabase
      .from("change_requests")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("user_id, title")
      .single();
    if (error) throw new Error(error.message);

    await supabase.from("notifications").insert({
      user_id: req.user_id,
      title: `Status update: ${req.title}`,
      message: `Je verzoek is nu: ${data.status}.`,
    });
    return { ok: true };
  });

export const adminToggleRequestPaid = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ id: z.string().uuid(), is_paid: z.boolean() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("change_requests")
      .update({ is_paid: data.is_paid })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSetFreeQuota = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        free_quota_override: z.number().int().min(0).max(100).nullable(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("profiles")
      .update({ free_quota_override: data.free_quota_override })
      .eq("id", data.user_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSetRequestFields = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        id: z.string().uuid(),
        due_date: z.string().nullable().optional(),
        internal_note: z.string().max(5000).nullable().optional(),
        admin_notes: z.string().max(5000).nullable().optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { id, ...rest } = data;
    const { error } = await supabase.from("change_requests").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminPostComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ request_id: z.string().uuid(), body: z.string().trim().min(1).max(4000) }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: req } = await supabase
      .from("change_requests")
      .select("user_id, title")
      .eq("id", data.request_id)
      .single();
    const { error } = await supabase
      .from("change_comments")
      .insert({ request_id: data.request_id, author_id: userId, body: data.body });
    if (error) throw new Error(error.message);

    if (req) {
      await supabase.from("notifications").insert({
        user_id: req.user_id,
        title: `Nieuw bericht: ${req.title}`,
        message: data.body.slice(0, 140),
      });
    }
    return { ok: true };
  });

export const adminGrantCredits = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        amount: z.number().int().min(1).max(100),
        reason: z.string().max(500).optional(),
        purchase_id: z.string().uuid().optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("extra_credits").insert({
      user_id: data.user_id,
      amount: data.amount,
      reason: data.reason ?? "Granted by admin",
      granted_by: userId,
    });
    if (error) throw new Error(error.message);

    if (data.purchase_id) {
      await supabase
        .from("purchase_requests")
        .update({ status: "approved" })
        .eq("id", data.purchase_id);
    }

    await supabase.from("notifications").insert({
      user_id: data.user_id,
      title: "Extra changes toegevoegd",
      message: `Er zijn ${data.amount} extra change(s) aan je account toegevoegd.`,
    });
    return { ok: true };
  });

export const adminSendNotification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        title: z.string().trim().min(1).max(200),
        message: z.string().trim().min(1).max(2000),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("notifications").insert({
      user_id: data.user_id,
      title: data.title,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Password reset / set
export const adminSendPasswordReset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ email: z.string().email(), redirectTo: z.string().url() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    return adminGenerateRecoveryLink(data.email, data.redirectTo);
  });

export const adminSetPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({ user_id: z.string().uuid(), password: z.string().min(8).max(72) })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    await adminSetUserPassword(data.user_id, data.password);
    return { ok: true };
  });

// Costs
export const adminAddCost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        description: z.string().trim().min(1).max(500),
        amount_cents: z.number().int(),
        cost_date: z.string().optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("customer_costs").insert({
      user_id: data.user_id,
      description: data.description,
      amount_cents: data.amount_cents,
      cost_date: data.cost_date ?? new Date().toISOString().slice(0, 10),
      created_by: userId,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteCost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("customer_costs").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Onboarding
export const adminAddOnboardingItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        label: z.string().trim().min(1).max(200),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { count } = await supabase
      .from("onboarding_items")
      .select("*", { count: "exact", head: true })
      .eq("user_id", data.user_id);
    const { error } = await supabase
      .from("onboarding_items")
      .insert({ user_id: data.user_id, label: data.label, position: count ?? 0 });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminToggleOnboardingItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ id: z.string().uuid(), done: z.boolean() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("onboarding_items")
      .update({ done: data.done })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteOnboardingItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("onboarding_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Snippets
export const adminCreateSnippet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        title: z.string().trim().min(1).max(200),
        body: z.string().trim().min(1).max(4000),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("reply_snippets")
      .insert({ title: data.title, body: data.body, created_by: userId });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteSnippet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("reply_snippets").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Signed URL for attachments (admin)
export const adminAttachmentUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ file_path: z.string().max(500) }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    // Verify this file_path exists as a legitimate attachment
    const { data: attachment } = await supabase
      .from("change_attachments")
      .select("file_path")
      .eq("file_path", data.file_path)
      .maybeSingle();
    if (!attachment) throw new Error("Bestand niet gevonden.");
    const { data: url, error } = await supabase.storage
      .from("change-attachments")
      .createSignedUrl(data.file_path, 3600);
    if (error) throw new Error(error.message);
    return { url: url.signedUrl };
  });

// ---------------- Appointments ----------------
export const adminListAppointments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("scheduled_at", { ascending: true });
    if (error) throw new Error(error.message);
    return { appointments: data ?? [] };
  });

export const adminCreateAppointment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        title: z.string().trim().min(1).max(200),
        scheduled_at: z.string().min(1),
        kind: z.enum(["phone", "teams", "in_person"]),
        location: z.string().trim().max(500).optional(),
        notes: z.string().trim().max(2000).optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("appointments").insert({
      user_id: data.user_id,
      title: data.title,
      scheduled_at: data.scheduled_at,
      kind: data.kind,
      location: data.location ?? null,
      notes: data.notes ?? null,
      created_by: userId,
    });
    if (error) throw new Error(error.message);
    await supabase.from("notifications").insert({
      user_id: data.user_id,
      title: "Nieuwe afspraak ingepland",
      message: `${data.title} — ${new Date(data.scheduled_at).toLocaleString("nl-NL")}`,
    });
    return { ok: true };
  });

export const adminDeleteAppointment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("appointments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- Bulk operations ----------------
export const adminBulkComplete = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        ids: z.array(z.string().uuid()).min(1).max(50),
        mark_paid: z.boolean().default(true),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const update: any = { status: "done" };
    if (data.mark_paid) update.status = "invoiced";
    const { error } = await supabase
      .from("change_requests")
      .update(update)
      .in("id", data.ids);
    if (error) throw new Error(error.message);
    return { ok: true, count: data.ids.length };
  });

// ---------------- Contact moments ----------------
export const adminListContactMoments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: rows, error } = await supabase
      .from("client_contacts")
      .select("*")
      .eq("user_id", data.user_id)
      .order("occurred_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: rows ?? [] };
  });

export const adminCreateContactMoment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        kind: z.enum(["call", "meeting", "email"]),
        summary: z.string().trim().min(1).max(2000),
        occurred_at: z.string().optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("client_contacts").insert({
      user_id: data.user_id,
      kind: data.kind,
      summary: data.summary,
      occurred_at: data.occurred_at ?? new Date().toISOString(),
      created_by: userId,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteContactMoment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase.from("client_contacts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- Login events (admin view per user) ----------------
export const adminListLoginEvents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: rows } = await supabase
      .from("login_events")
      .select("*")
      .eq("user_id", data.user_id)
      .order("created_at", { ascending: false })
      .limit(5);
    return { items: rows ?? [] };
  });

// ---------------- Site stats (admin view per user) ----------------
export const adminGetSiteStats = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const [pingsRes, errorsRes] = await Promise.all([
      supabase.from("site_pings").select("status_ok").eq("user_id", data.user_id).gte("created_at", since),
      supabase.from("site_errors").select("*").eq("user_id", data.user_id).order("created_at", { ascending: false }).limit(5),
    ]);
    const pings = pingsRes.data ?? [];
    const okPings = pings.filter((p: any) => p.status_ok).length;
    const uptimePct = pings.length > 0 ? (okPings / pings.length) * 100 : null;
    return { uptimePct, totalPings: pings.length, errors: errorsRes.data ?? [] };
  });

// ---------------- Health score helper for customer list ----------------
export const adminGetHealthScores = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const [reqsRes, commentsRes] = await Promise.all([
      supabase.from("change_requests").select("user_id, status, is_paid, created_at").gte("created_at", cutoff),
      supabase.from("change_comments").select("request_id, author_id, created_at").gte("created_at", cutoff),
    ]);
    const reqs = reqsRes.data ?? [];
    const scores: Record<string, "green" | "orange" | "red"> = {};
    const byUser = new Map<string, any[]>();
    reqs.forEach((r: any) => {
      const arr = byUser.get(r.user_id) ?? [];
      arr.push(r);
      byUser.set(r.user_id, arr);
    });
    byUser.forEach((items, uid) => {
      const paid = items.filter((i) => i.is_paid).length;
      const total = items.length;
      const cancelled = items.filter((i) => i.status === "cancelled" || i.status === "rejected").length;
      // simple scoring: many cancellations = red, very active = green, otherwise orange
      let score: "green" | "orange" | "red" = "orange";
      if (cancelled > 2) score = "red";
      else if (total >= 3 && paid >= 1) score = "green";
      else if (total >= 1) score = "orange";
      scores[uid] = score;
    });
    return { scores };
  });

// ---------------- All changes view (filterable) ----------------
export const adminListAllChanges = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid().optional(),
        status: z.string().optional(),
        category: z.string().optional(),
        ticket_type: z.string().optional(),
        from_date: z.string().optional(),
        to_date: z.string().optional(),
        search: z.string().max(100).optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    let q = supabase
      .from("change_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (data.user_id) q = q.eq("user_id", data.user_id);
    if (data.status) q = q.eq("status", data.status as any);
    if (data.category) q = q.eq("category", data.category);
    if (data.ticket_type) q = q.eq("ticket_type", data.ticket_type);
    if (data.from_date) q = q.gte("created_at", data.from_date);
    if (data.to_date) q = q.lte("created_at", data.to_date);
    if (data.search) {
      const n = parseInt(data.search.replace(/\D/g, ""), 10);
      if (!Number.isNaN(n)) q = q.eq("request_number", n);
      else q = q.ilike("title", `%${data.search}%`);
    }
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { items: rows ?? [] };
  });

// ============================================================
// ====================== RBAC & TEAM =========================
// ============================================================

export const adminGetMyRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const roles = await getRoles(supabase, userId);
    return { roles, userId };
  });

export const adminListStaff = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { adminListStaffMembers } = await import("./admin.server");
    return adminListStaffMembers();
  });

export const adminInviteStaff = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        email: z.string().trim().email().max(255),
        full_name: z.string().trim().min(1).max(200),
        role: z.enum(["co_admin", "support_agent", "viewer"]),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    const { adminInviteStaffMember } = await import("./admin.server");
    const result = await adminInviteStaffMember(data);
    await logAudit(supabase, userId, "staff_invited", "user", result.user_id ?? null, {
      email: data.email,
      role: data.role,
    });
    return result;
  });

export const adminChangeRole = createServerFn({ method: "POST" })
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
    await ensureSuperAdmin(supabase, userId);
    if (data.target_user_id === userId)
      throw new Error("Je kunt je eigen rol niet wijzigen.");

    const { adminReplaceRole } = await import("./admin.server");
    await adminReplaceRole(data.target_user_id, data.role);
    await logAudit(supabase, userId, "role_changed", "user", data.target_user_id, {
      new_role: data.role,
    });
    return { ok: true };
  });

export const adminRemoveStaff = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ target_user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    if (data.target_user_id === userId)
      throw new Error("Je kunt jezelf niet verwijderen.");
    const { adminRemoveStaffRoles } = await import("./admin.server");
    await adminRemoveStaffRoles(data.target_user_id);
    await logAudit(supabase, userId, "staff_removed", "user", data.target_user_id, {});
    return { ok: true };
  });

export const adminGetAuditLog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    const { data, error } = await supabase
      .from("audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    // enrich with email
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .in(
        "id",
        Array.from(new Set([...(data ?? []).map((e: any) => e.user_id)])),
      );
    const pmap = new Map((profiles ?? []).map((p: any) => [p.id, p]));
    return {
      items: (data ?? []).map((e: any) => ({
        ...e,
        actor: pmap.get(e.user_id) ?? null,
      })),
    };
  });

// ============================================================
// ================ CHANGE SOFT/HARD DELETE ===================
// ============================================================

export const adminSoftDeleteChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("change_requests")
      .update({ deleted_at: new Date().toISOString(), deleted_by: userId })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "change_soft_deleted", "change_request", data.id);
    return { ok: true };
  });

export const adminBulkSoftDelete = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ ids: z.array(z.string().uuid()).min(1).max(100) }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("change_requests")
      .update({ deleted_at: new Date().toISOString(), deleted_by: userId })
      .in("id", data.ids);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "change_bulk_soft_deleted", "change_request", null, {
      ids: data.ids,
    });
    return { ok: true, count: data.ids.length };
  });

export const adminRestoreChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    const { error } = await supabase
      .from("change_requests")
      .update({
        deleted_at: null,
        deleted_by: null,
        restored_at: new Date().toISOString(),
        restored_by: userId,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "change_restored", "change_request", data.id);
    return { ok: true };
  });


export const adminHardDeleteChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    const { error } = await supabase.from("change_requests").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "change_hard_deleted", "change_request", data.id);
    return { ok: true };
  });

export const adminListDeletedChanges = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data, error } = await supabase
      .from("change_requests")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .in(
        "id",
        Array.from(new Set((data ?? []).map((r: any) => r.user_id))),
      );
    const pmap = new Map((profiles ?? []).map((p: any) => [p.id, p]));
    return {
      items: (data ?? []).map((r: any) => ({
        ...r,
        customer: pmap.get(r.user_id) ?? null,
      })),
    };
  });

// ============================================================
// =========== ADMIN-CREATES-CHANGE FOR CUSTOMER ==============
// ============================================================
export const adminCreateChangeForCustomer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        title: z.string().trim().min(3).max(200),
        description: z.string().trim().min(3).max(5000),
        priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
        category: z.string().min(1).max(50).default("other"),
        is_paid: z.boolean().default(false),
        rush: z.boolean().default(false),
        ticket_type: z.enum(["question", "bug", "feature", "complaint"]).default("question"),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: row, error } = await supabase
      .from("change_requests")
      .insert({
        user_id: data.user_id,
        title: data.title,
        description: `[Aangemaakt door admin]\n\n${data.description}`,
        priority: data.priority,
        category: data.category,
        is_paid: data.is_paid,
        rush: data.rush,
        ticket_type: data.ticket_type,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "change_created_for_customer", "change_request", row.id, {
      customer_id: data.user_id,
    });
    await supabase.from("notifications").insert({
      user_id: data.user_id,
      title: `Nieuwe change door admin: ${data.title}`,
      message: "Een admin heeft een change voor jou aangemaakt.",
    });
    return { ok: true, id: row.id };
  });

// ---------- Password reset requests ----------

export const adminListPasswordResets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data, error } = await supabase
      .from("password_reset_requests")
      .select("*")
      .order("requested_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: data ?? [] };
  });

export const adminMarkPasswordResetHandled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { error } = await supabase
      .from("password_reset_requests")
      .update({ status: "handled", handled_at: new Date().toISOString(), handled_by: userId })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Extra change requests ----------

export const adminListExtraChangeRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data, error } = await supabase
      .from("extra_change_requests")
      .select("*")
      .order("requested_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: data ?? [] };
  });

export const adminApproveExtraChangeRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: req, error: rErr } = await supabase
      .from("extra_change_requests")
      .select("user_id, amount, status")
      .eq("id", data.id)
      .single();
    if (rErr || !req) throw new Error(rErr?.message ?? "Niet gevonden");
    if (req.status !== "pending") throw new Error("Al verwerkt.");
    const { error: cErr } = await supabase
      .from("extra_credits")
      .insert({ user_id: req.user_id, amount: req.amount, granted_by: userId, reason: "Extra change aanvraag goedgekeurd" });
    if (cErr) throw new Error(cErr.message);
    const { error: uErr } = await supabase
      .from("extra_change_requests")
      .update({ status: "approved", handled_at: new Date().toISOString(), handled_by: userId })
      .eq("id", data.id);
    if (uErr) throw new Error(uErr.message);
    await supabase.from("notifications").insert({
      user_id: req.user_id,
      title: "Extra changes goedgekeurd",
      message: `Je aanvraag van ${req.amount} extra change(s) is goedgekeurd.`,
    });
    return { ok: true };
  });

export const adminRejectExtraChangeRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabase
      .from("extra_change_requests")
      .update({ status: "rejected", handled_at: new Date().toISOString(), handled_by: userId })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Website links ----------

export const adminListWebsiteLinks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, company, website_url, snippet_active");
    if (error) throw new Error(error.message);
    const ids = (profiles ?? []).map((p: any) => p.id);
    const { data: pings } = await supabase
      .from("site_pings")
      .select("user_id")
      .in("user_id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
    const pingCounts: Record<string, number> = {};
    for (const p of pings ?? []) pingCounts[(p as any).user_id] = (pingCounts[(p as any).user_id] ?? 0) + 1;
    return {
      items: (profiles ?? []).map((p: any) => ({ ...p, ping_count: pingCounts[p.id] ?? 0 })),
    };
  });

export const adminUpdateWebsiteLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      user_id: z.string().uuid(),
      website_url: z.string().trim().max(500).nullable().optional(),
      snippet_active: z.boolean().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { user_id, ...rest } = data;
    const { error } = await supabase.from("profiles").update(rest).eq("id", user_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============================================================
// ==================== MONITORING ============================
// ============================================================

async function checkSSLCert(url: string): Promise<{ valid: boolean; expires_at: string | null; days_remaining: number | null; issuer: string | null; error: string | null }> {
  const https = await import("https");
  return new Promise((resolve) => {
    try {
      const hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
      const req = (https as any).request({ hostname, port: 443, method: "HEAD", rejectUnauthorized: false }, (res: any) => {
        try {
          const cert = res.socket?.getPeerCertificate?.();
          if (!cert?.valid_to) { resolve({ valid: false, expires_at: null, days_remaining: null, issuer: null, error: "Geen certificaat" }); return; }
          const expiresAt = new Date(cert.valid_to);
          const daysRemaining = Math.floor((expiresAt.getTime() - Date.now()) / 86400000);
          resolve({ valid: daysRemaining > 0, expires_at: expiresAt.toISOString(), days_remaining: daysRemaining, issuer: cert.issuer?.CN ?? cert.issuer?.O ?? null, error: null });
        } catch (e: any) { resolve({ valid: false, expires_at: null, days_remaining: null, issuer: null, error: e.message }); }
      });
      req.on("error", (e: any) => resolve({ valid: false, expires_at: null, days_remaining: null, issuer: null, error: e.message }));
      req.setTimeout(10000, () => { req.destroy(); resolve({ valid: false, expires_at: null, days_remaining: null, issuer: null, error: "Timeout" }); });
      req.end();
    } catch (e: any) { resolve({ valid: false, expires_at: null, days_remaining: null, issuer: null, error: e.message }); }
  });
}

async function checkDNSHealth(url: string): Promise<{ healthy: boolean; issues: string[] }> {
  try {
    const dns = await import("dns");
    const { promisify } = await import("util");
    const resolve4 = promisify((dns as any).resolve4);
    const hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
    const issues: string[] = [];
    try { await resolve4(hostname); } catch { issues.push(`Geen A-record voor ${hostname}`); }
    return { healthy: issues.length === 0, issues };
  } catch (e: any) {
    return { healthy: false, issues: [`DNS check mislukt: ${e.message}`] };
  }
}

async function measureResponseTime(url: string): Promise<{ response_ms: number; status_ok: boolean }> {
  try {
    const http = await import(url.startsWith("https") ? "https" : "http");
    return new Promise((resolve) => {
      const start = Date.now();
      const req = (http as any).get(url, { timeout: 10000 }, (res: any) => {
        const ms = Date.now() - start;
        res.resume();
        resolve({ response_ms: ms, status_ok: res.statusCode >= 200 && res.statusCode < 400 });
      });
      req.on("error", () => resolve({ response_ms: Date.now() - start, status_ok: false }));
      req.on("timeout", () => { req.destroy(); resolve({ response_ms: 10000, status_ok: false }); });
    });
  } catch {
    return { response_ms: 10000, status_ok: false };
  }
}

export const adminSyncCustomerMonitoring = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: profile } = await supabase.from("profiles").select("website_url").eq("id", data.user_id).maybeSingle();
    if (!profile?.website_url) throw new Error("Geen website URL ingesteld voor deze klant.");

    const measured = await measureResponseTime(profile.website_url);

    // Schrijf naar site_response_times (nieuwe tabel, alleen als die bestaat)
    try {
      await supabaseAdmin.from("site_response_times" as any).insert({
        user_id: data.user_id,
        response_ms: measured.response_ms,
        status_ok: measured.status_ok,
      });
    } catch { /* tabel bestaat nog niet */ }

    // Altijd ook site_pings (backward compat)
    await supabaseAdmin.from("site_pings").insert({
      user_id: data.user_id,
      status_ok: measured.status_ok,
      response_ms: measured.response_ms,
    });

    // Alert als response time > 3000ms
    if (measured.response_ms > 3000) {
      const since1h = new Date(Date.now() - 3600000).toISOString();
      try {
        const { data: existing } = await supabaseAdmin.from("monitoring_alerts" as any).select("id").eq("user_id", data.user_id).eq("type", "response_time").is("archived_at", null).gte("created_at", since1h).limit(1).maybeSingle();
        if (!existing) {
          await supabaseAdmin.from("monitoring_alerts" as any).insert({ user_id: data.user_id, type: "response_time", severity: "warning", message: `Hoge response time: ${measured.response_ms}ms (limiet: 3000ms)` });
        }
      } catch { /* tabel bestaat nog niet */ }
    }

    return { ok: true, ...measured };
  });

export const adminGetCustomerMonitoring = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Haal data op — graceful fallback als nieuwe tabellen nog niet bestaan
    let responseTimes: any[] = [];
    let ssl: any = null;
    let dns: any = null;
    let alerts: any[] = [];

    try {
      const [rtRes, sslRes, dnsRes, alertsRes] = await Promise.all([
        supabaseAdmin.from("site_response_times" as any).select("response_ms,status_ok,created_at").eq("user_id", data.user_id).gte("created_at", since24h).order("created_at", { ascending: false }).limit(500),
        supabaseAdmin.from("ssl_checks" as any).select("*").eq("user_id", data.user_id).order("checked_at", { ascending: false }).limit(1).maybeSingle(),
        supabaseAdmin.from("dns_checks" as any).select("*").eq("user_id", data.user_id).order("checked_at", { ascending: false }).limit(1).maybeSingle(),
        supabaseAdmin.from("monitoring_alerts" as any).select("*").eq("user_id", data.user_id).is("archived_at", null).order("created_at", { ascending: false }).limit(20),
      ]);
      responseTimes = (rtRes.data as any[]) ?? [];
      ssl = (sslRes.data as any) ?? null;
      dns = (dnsRes.data as any) ?? null;
      alerts = (alertsRes.data as any[]) ?? [];
    } catch {
      // Nieuwe tabellen bestaan nog niet — val terug op site_pings
    }

    // Fallback: als site_response_times leeg is, laad uit site_pings
    if (responseTimes.length === 0) {
      const { data: pings } = await supabaseAdmin
        .from("site_pings")
        .select("status_ok,response_ms,created_at")
        .eq("user_id", data.user_id)
        .gte("created_at", since24h)
        .order("created_at", { ascending: false })
        .limit(500);
      responseTimes = (pings as any[]) ?? [];
    }

    const total = responseTimes.length;
    const ok = responseTimes.filter((r) => r.status_ok).length;
    const uptimePct = total > 0 ? (ok / total) * 100 : null;
    const msList = responseTimes.filter((r) => r.response_ms != null).map((r) => r.response_ms as number);
    const avg = msList.length > 0 ? Math.round(msList.reduce((a, b) => a + b, 0) / msList.length) : null;
    const sorted = [...msList].sort((a, b) => a - b);
    const p95 = sorted.length > 0 ? (sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] ?? null) : null;
    return { responseTimes: responseTimes.slice(0, 100), avg, p95, uptimePct, total, lastSync: responseTimes[0]?.created_at ?? null, ssl, dns, alerts };
  });

export const adminRunSSLCheck = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: profile } = await supabase.from("profiles").select("website_url").eq("id", data.user_id).maybeSingle();
    if (!profile?.website_url) throw new Error("Geen website URL ingesteld voor deze klant.");
    const result = await checkSSLCert(profile.website_url);
    await supabaseAdmin.from("ssl_checks" as any).insert({ user_id: data.user_id, ...result, checked_at: new Date().toISOString() });
    if (!result.valid || (result.days_remaining !== null && result.days_remaining < 30)) {
      const severity = !result.valid || result.days_remaining! < 7 ? "critical" : "warning";
      const message = !result.valid ? `SSL certificaat ongeldig: ${result.error}` : `SSL verloopt over ${result.days_remaining} dagen`;
      await supabaseAdmin.from("monitoring_alerts" as any).insert({ user_id: data.user_id, type: "ssl", severity, message });
    }
    return { ok: true, result };
  });

export const adminRunDNSCheck = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: profile } = await supabase.from("profiles").select("website_url").eq("id", data.user_id).maybeSingle();
    if (!profile?.website_url) throw new Error("Geen website URL ingesteld voor deze klant.");
    const result = await checkDNSHealth(profile.website_url);
    await supabaseAdmin.from("dns_checks" as any).insert({ user_id: data.user_id, healthy: result.healthy, issues: result.issues, checked_at: new Date().toISOString() });
    if (!result.healthy) {
      await supabaseAdmin.from("monitoring_alerts" as any).insert({ user_id: data.user_id, type: "dns", severity: "critical", message: result.issues.join("; ") });
    }
    return { ok: true, result };
  });

export const adminGetAllAlerts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const [activeRes, archivedRes, profilesRes] = await Promise.all([
      supabaseAdmin.from("monitoring_alerts" as any).select("*").is("archived_at", null).order("created_at", { ascending: false }),
      supabaseAdmin.from("monitoring_alerts" as any).select("*").not("archived_at", "is", null).gte("archived_at", new Date(Date.now() - 30 * 86400000).toISOString()).order("archived_at", { ascending: false }),
      supabaseAdmin.from("profiles").select("id,full_name,email"),
    ]);
    const profileMap: Record<string, any> = {};
    for (const p of (profilesRes.data ?? []) as any[]) profileMap[p.id] = p;
    const enrich = (a: any) => ({ ...a, customer: profileMap[a.user_id] ?? null });
    return { active: ((activeRes.data as any) ?? []).map(enrich), archived: ((archivedRes.data as any) ?? []).map(enrich) };
  });

export const adminSnoozeAlert = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), hours: z.number().int().min(1).max(168) }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const snoozedUntil = new Date(Date.now() + data.hours * 3600000).toISOString();
    await supabaseAdmin.from("monitoring_alerts" as any).update({ snoozed_until: snoozedUntil }).eq("id", data.id);
    return { ok: true };
  });

export const adminMarkAlertSeen = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const now = new Date().toISOString();
    await supabaseAdmin.from("monitoring_alerts" as any).update({ seen_at: now, archived_at: now }).eq("id", data.id);
    return { ok: true };
  });

export const adminGetRolePermissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    const { data } = await supabaseAdmin.from("role_permissions" as any).select("*");
    return { items: (data as any) ?? [] };
  });

export const adminSetRolePermission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ role: z.string(), permission: z.string(), allowed: z.boolean() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    await supabaseAdmin.from("role_permissions" as any).upsert({ role: data.role, permission: data.permission, allowed: data.allowed, updated_at: new Date().toISOString() }, { onConflict: "role,permission" });
    return { ok: true };
  });
