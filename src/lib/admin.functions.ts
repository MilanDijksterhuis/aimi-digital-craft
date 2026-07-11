import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { computeMonitoringStats, measureResponseTime } from "./monitoring.shared";
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
        role: z.enum(["co_admin", "support_agent", "viewer", "sales"]),
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
        role: z.enum(["super_admin", "co_admin", "support_agent", "viewer", "sales", "customer"]),
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

// ---------- Projecten ----------
// Een project = 1 website (koppeling), gekoppeld aan 1 of meer klanten.
// De monitoring zelf blijft draaien op primary_user_id (profiles.id),
// zodat bestaande tracking snippets en site_pings ongewijzigd blijven werken.

export const adminListProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: projects, error } = await supabaseAdmin
      .from("projects" as any)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    const ids = (projects ?? []).map((p: any) => p.id);
    const [membersRes, profilesRes, pingsRes] = await Promise.all([
      supabaseAdmin.from("project_members" as any).select("project_id, user_id").in("project_id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]),
      supabase.from("profiles").select("id, full_name, email"),
      supabaseAdmin.from("site_pings").select("user_id"),
    ]);

    const profileMap: Record<string, any> = {};
    for (const p of (profilesRes.data ?? []) as any[]) profileMap[p.id] = p;
    const pingCounts: Record<string, number> = {};
    for (const p of (pingsRes.data ?? []) as any[]) pingCounts[p.user_id] = (pingCounts[p.user_id] ?? 0) + 1;

    const membersByProject: Record<string, any[]> = {};
    for (const m of (membersRes.data ?? []) as any[]) {
      (membersByProject[m.project_id] ??= []).push(profileMap[m.user_id] ?? { id: m.user_id });
    }

    return {
      items: (projects ?? []).map((p: any) => ({
        ...p,
        primary_customer: profileMap[p.primary_user_id] ?? null,
        members: membersByProject[p.id] ?? [],
        ping_count: pingCounts[p.primary_user_id] ?? 0,
      })),
    };
  });

export const adminCreateProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      name: z.string().trim().min(1).max(200),
      website_url: z.string().trim().max(500).nullable().optional(),
      snippet_active: z.boolean().optional(),
      primary_user_id: z.string().uuid(),
      member_ids: z.array(z.string().uuid()).optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { member_ids, ...rest } = data;
    const { data: project, error } = await supabaseAdmin
      .from("projects" as any)
      .insert(rest)
      .select()
      .single();
    if (error) throw new Error(error.message);

    // Zelfde website/snippet ook op het profiel zetten, zodat monitoring
    // (die op profiles.website_url draait) meteen werkt.
    await supabase.from("profiles").update({
      website_url: rest.website_url ?? null,
      snippet_active: rest.snippet_active ?? false,
    }).eq("id", rest.primary_user_id);

    const memberSet = new Set([rest.primary_user_id, ...(member_ids ?? [])]);
    const rows = Array.from(memberSet).map((uid) => ({ project_id: (project as any).id, user_id: uid }));
    if (rows.length) {
      const { error: memErr } = await supabaseAdmin.from("project_members" as any).insert(rows);
      if (memErr) throw new Error(memErr.message);
    }
    return { ok: true, project };
  });

export const adminUpdateProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      name: z.string().trim().min(1).max(200).optional(),
      website_url: z.string().trim().max(500).nullable().optional(),
      snippet_active: z.boolean().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { project_id, ...rest } = data;
    const { data: project, error } = await supabaseAdmin
      .from("projects" as any)
      .update(rest)
      .eq("id", project_id)
      .select()
      .single();
    if (error) throw new Error(error.message);

    if (rest.website_url !== undefined || rest.snippet_active !== undefined) {
      const updates: Record<string, any> = {};
      if (rest.website_url !== undefined) updates.website_url = rest.website_url;
      if (rest.snippet_active !== undefined) updates.snippet_active = rest.snippet_active;
      await supabase.from("profiles").update(updates as any).eq("id", (project as any).primary_user_id);
    }
    return { ok: true, project };
  });

export const adminDeleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("projects" as any).delete().eq("id", data.project_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSetProjectMembers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      member_ids: z.array(z.string().uuid()),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: project } = await supabaseAdmin.from("projects" as any).select("primary_user_id").eq("id", data.project_id).maybeSingle();
    if (!project) throw new Error("Project niet gevonden");
    const memberSet = new Set([(project as any).primary_user_id, ...data.member_ids]);

    await supabaseAdmin.from("project_members" as any).delete().eq("project_id", data.project_id);
    const rows = Array.from(memberSet).map((uid) => ({ project_id: data.project_id, user_id: uid }));
    const { error } = await supabaseAdmin.from("project_members" as any).insert(rows);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============================================================
// ==================== MONITORING ============================
// ============================================================

async function checkSSLCert(url: string): Promise<{ valid: boolean; expires_at: string | null; days_remaining: number | null; issuer: string | null; error: string | null }> {
  const tls = await import("tls");
  const fail = (error: string) => ({ valid: false, expires_at: null as string | null, days_remaining: null as number | null, issuer: null as string | null, error });

  let hostname: string;
  try {
    hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
  } catch {
    return fail("Ongeldige URL");
  }

  return new Promise((resolve) => {
    let settled = false;
    const done = (result: Awaited<ReturnType<typeof checkSSLCert>>) => {
      if (settled) return;
      settled = true;
      try { socket.destroy(); } catch { /* noop */ }
      resolve(result);
    };

    // Directe TLS-handshake met expliciete SNI en zonder sessie-hergebruik,
    // zodat het volledige certificaat gegarandeerd over de lijn komt.
    const socket = (tls as any).connect(
      { host: hostname, port: 443, servername: hostname, rejectUnauthorized: false, session: undefined },
      () => {
        try {
          const cert = socket.getPeerCertificate?.();
          if (!cert || !cert.valid_to) {
            done(fail("Geen certificaat"));
            return;
          }
          const expiresAt = new Date(cert.valid_to);
          const daysRemaining = Math.floor((expiresAt.getTime() - Date.now()) / 86400000);
          done({
            valid: daysRemaining > 0,
            expires_at: expiresAt.toISOString(),
            days_remaining: daysRemaining,
            issuer: cert.issuer?.CN ?? cert.issuer?.O ?? null,
            error: null,
          });
        } catch (e: any) {
          done(fail(e?.message ?? "Certificaat-parsefout"));
        }
      },
    );

    socket.setTimeout(10000, () => done(fail("Timeout")));
    socket.on("error", (e: any) => done(fail(e?.message ?? "Verbindingsfout")));
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
    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    let rows: any[] = [];
    let ssl: any = null;
    let dns: any = null;
    let alerts: any[] = [];

    try {
      const [rtRes, sslRes, dnsRes, alertsRes] = await Promise.all([
        supabaseAdmin.from("site_response_times" as any).select("response_ms,status_ok,created_at").eq("user_id", data.user_id).gte("created_at", since7d).order("created_at", { ascending: false }).limit(2016),
        supabaseAdmin.from("ssl_checks" as any).select("*").eq("user_id", data.user_id).order("checked_at", { ascending: false }).limit(1).maybeSingle(),
        supabaseAdmin.from("dns_checks" as any).select("*").eq("user_id", data.user_id).order("checked_at", { ascending: false }).limit(1).maybeSingle(),
        supabaseAdmin.from("monitoring_alerts" as any).select("*").eq("user_id", data.user_id).is("archived_at", null).order("created_at", { ascending: false }).limit(20),
      ]);
      rows = (rtRes.data as any[]) ?? [];
      ssl = (sslRes.data as any) ?? null;
      dns = (dnsRes.data as any) ?? null;
      alerts = (alertsRes.data as any[]) ?? [];
    } catch { /* nieuwe tabellen bestaan nog niet */ }

    // Fallback naar site_pings als site_response_times leeg is
    if (rows.length === 0) {
      const { data: pings } = await supabaseAdmin
        .from("site_pings")
        .select("status_ok,response_ms,created_at")
        .eq("user_id", data.user_id)
        .gte("created_at", since7d)
        .order("created_at", { ascending: false })
        .limit(2016);
      rows = (pings as any[]) ?? [];
    }

    const stats = computeMonitoringStats(rows);
    return { ...stats, ssl, dns, alerts };
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

// ============================================================
// ====================== SALES / LEADS =======================
// ============================================================

const LEADS_ROLES = ["sales", "super_admin", "admin"];

async function ensureLeadsAccess(supabase: any, userId: string) {
  await ensureRoles(supabase, userId, LEADS_ROLES, "sales only");
}

export const LEAD_STATUSES = ["nieuw", "gebeld", "gemaild", "interesse", "geen_interesse", "klant"] as const;
const LeadStatus = z.enum(LEAD_STATUSES);

const normPhone = (v: string | null | undefined) => {
  const t = (v ?? "").trim();
  return t.length > 0 ? t : null;
};

export const adminListLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);

    const { data: leads, error } = await supabaseAdmin
      .from("leads" as any)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) throw new Error(error.message);

    // Laatste activiteit per lead meesturen voor de lijstweergave.
    const { data: acts } = await supabaseAdmin
      .from("lead_activities" as any)
      .select("lead_id,type,note,created_at")
      .order("created_at", { ascending: false })
      .limit(5000);

    const lastByLead = new Map<string, any>();
    for (const a of (acts as any[]) ?? []) {
      if (!lastByLead.has(a.lead_id)) lastByLead.set(a.lead_id, a);
    }

    return {
      items: ((leads as any[]) ?? []).map((l) => ({
        ...l,
        last_activity: lastByLead.get(l.id) ?? null,
      })),
    };
  });

export const adminGetLeadActivities = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ lead_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);
    const { data: items } = await supabaseAdmin
      .from("lead_activities" as any)
      .select("*")
      .eq("lead_id", data.lead_id)
      .order("created_at", { ascending: false });
    return { items: (items as any[]) ?? [] };
  });

export const adminCreateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      company_name: z.string().trim().min(1).max(200),
      has_website: z.boolean().default(false),
      phone: z.string().trim().max(50).nullable().optional(),
      email: z.string().trim().max(200).nullable().optional(),
      notes: z.string().trim().max(2000).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);
    const { error } = await supabaseAdmin.from("leads" as any).insert({
      company_name: data.company_name,
      has_website: data.has_website,
      phone: normPhone(data.phone),
      email: normPhone(data.email),
      notes: data.notes ?? null,
      created_by: userId,
    });
    if (error) {
      if (error.code === "23505") throw new Error("Deze lead bestaat al (zelfde bedrijfsnaam + telefoonnummer).");
      throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminImportLeads = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      rows: z.array(
        z.object({
          company_name: z.string().trim().min(1).max(200),
          has_website: z.boolean(),
          phone: z.string().trim().max(50).nullable(),
          email: z.string().trim().max(200).nullable(),
        }),
      ).min(1).max(5000),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);

    // Dedupe binnen het bestand zelf (bedrijfsnaam + telefoon).
    const key = (c: string, p: string | null) => `${c.trim().toLowerCase()}|${p ?? ""}`;
    const seen = new Set<string>();
    const cleaned = data.rows
      .map((r) => ({ ...r, phone: normPhone(r.phone), email: normPhone(r.email) }))
      .filter((r) => {
        const k = key(r.company_name, r.phone);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });

    // Dedupe tegen wat al in de database staat.
    const { data: existing } = await supabaseAdmin
      .from("leads" as any)
      .select("company_name,phone")
      .limit(5000);
    const existingKeys = new Set(
      ((existing as any[]) ?? []).map((e) => key(e.company_name, normPhone(e.phone))),
    );

    const toInsert = cleaned.filter((r) => !existingKeys.has(key(r.company_name, r.phone)));
    const skipped = data.rows.length - toInsert.length;

    if (toInsert.length === 0) return { ok: true, imported: 0, skipped };

    const { error } = await supabaseAdmin.from("leads" as any).insert(
      toInsert.map((r) => ({
        company_name: r.company_name,
        has_website: r.has_website,
        phone: r.phone,
        email: r.email,
        created_by: userId,
      })),
    );
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, "leads_imported", "lead", null, { imported: toInsert.length, skipped });
    return { ok: true, imported: toInsert.length, skipped };
  });

export const adminUpdateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      id: z.string().uuid(),
      company_name: z.string().trim().min(1).max(200).optional(),
      has_website: z.boolean().optional(),
      phone: z.string().trim().max(50).nullable().optional(),
      email: z.string().trim().max(200).nullable().optional(),
      status: LeadStatus.optional(),
      notes: z.string().trim().max(2000).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);
    const { id, ...rest } = data;
    const patch: Record<string, any> = { ...rest, updated_at: new Date().toISOString() };
    if ("phone" in rest) patch.phone = normPhone(rest.phone);
    if ("email" in rest) patch.email = normPhone(rest.email);

    const { error } = await supabaseAdmin.from("leads" as any).update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminAddLeadActivity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      lead_id: z.string().uuid(),
      type: z.enum(["call", "email", "note"]),
      note: z.string().trim().max(2000).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);

    const { error } = await supabaseAdmin.from("lead_activities" as any).insert({
      lead_id: data.lead_id,
      user_id: userId,
      type: data.type,
      note: data.note ?? null,
    });
    if (error) throw new Error(error.message);

    // Bel/mail-actie zet meteen de status door (tenzij de lead al verder is).
    if (data.type === "call" || data.type === "email") {
      const { data: lead } = await supabaseAdmin
        .from("leads" as any)
        .select("status")
        .eq("id", data.lead_id)
        .maybeSingle();
      const current = (lead as any)?.status;
      if (current === "nieuw") {
        await supabaseAdmin
          .from("leads" as any)
          .update({ status: data.type === "call" ? "gebeld" : "gemaild", updated_at: new Date().toISOString() })
          .eq("id", data.lead_id);
      }
    }
    return { ok: true };
  });

export const adminDeleteLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);
    const { error } = await supabaseAdmin.from("leads" as any).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "lead_deleted", "lead", data.id);
    return { ok: true };
  });

export const adminBulkUpdateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ ids: z.array(z.string().uuid()).min(1).max(1000), status: LeadStatus }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);
    const { error } = await supabaseAdmin
      .from("leads" as any)
      .update({ status: data.status, updated_at: new Date().toISOString() })
      .in("id", data.ids);
    if (error) throw new Error(error.message);
    return { ok: true, updated: data.ids.length };
  });

export const adminBulkDeleteLeads = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ ids: z.array(z.string().uuid()).min(1).max(1000) }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureLeadsAccess(supabase, userId);
    const { error } = await supabaseAdmin.from("leads" as any).delete().in("id", data.ids);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "leads_bulk_deleted", "lead", null, { count: data.ids.length });
    return { ok: true, deleted: data.ids.length };
  });
