import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  adminCreateCustomer,
  adminListCustomers,
  adminGenerateRecoveryLink,
  adminSetUserPassword,
  adminUpdateUserEmail,
  adminGetGrowthMetrics,
  adminGetCustomerDetail,
} from "./admin.server";

async function ensureAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (!data) throw new Error("Forbidden: admin only");
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
