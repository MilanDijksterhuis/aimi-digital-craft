import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { computeMonitoringStats, measureResponseTime, assertPublicHost } from "./monitoring.shared";
import { getEffectivePermissions, ensurePermission } from "./permissions.server";
import { getRoles, ensureRoles, ensureAdmin, ensureSuperAdmin, ensureStaff } from "./auth-guards.server";
import {
  adminCreateCustomer,
  adminListCustomers,
  adminGenerateRecoveryLink,
  adminSetUserPassword,
  adminUpdateUserEmail,
  adminGetGrowthMetrics,
  adminGetCustomerDetail,
} from "./admin.server";

// Team-rollen incl. sales (eligibility voor het toewijzen van custom rollen —
// géén auth-guard). Gelijk aan rbac.STAFF_ROLES.
const STAFF_BASE_ROLES = ["super_admin", "co_admin", "support_agent", "viewer", "sales", "admin"];

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
        contacts: z
          .object({
            financial: z.object({ name: z.string().max(200), email: z.string().max(200), phone: z.string().max(50) }).partial().optional(),
            technical: z.object({ name: z.string().max(200), email: z.string().max(200), phone: z.string().max(50) }).partial().optional(),
            general: z.object({ name: z.string().max(200), email: z.string().max(200), phone: z.string().max(50) }).partial().optional(),
          })
          .partial()
          .optional(),
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

export const adminSaveOnboardingStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        step: z.number().int().min(0).max(5),
        fields: z
          .object({
            full_name: z.string().trim().max(200).optional(),
            company: z.string().trim().max(200).optional(),
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
            contacts: z
              .object({
                financial: z.object({ name: z.string().max(200), email: z.string().max(200), phone: z.string().max(50) }).partial().optional(),
                technical: z.object({ name: z.string().max(200), email: z.string().max(200), phone: z.string().max(50) }).partial().optional(),
                general: z.object({ name: z.string().max(200), email: z.string().max(200), phone: z.string().max(50) }).partial().optional(),
              })
              .partial()
              .optional(),
          })
          .partial()
          .default({}),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    const { data: existing } = await supabase
      .from("profiles")
      .select("onboarding_started_at" as any)
      .eq("id", data.user_id)
      .single();

    const update: any = {
      ...data.fields,
      onboarding_status: "in_progress",
      onboarding_step: data.step,
    };
    if (!(existing as any)?.onboarding_started_at) {
      update.onboarding_started_at = new Date().toISOString();
    }

    const { error } = await supabase.from("profiles").update(update as any).eq("id", data.user_id);
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, "onboarding_step_saved", "customer_onboarding", data.user_id, { step: data.step });
    return { ok: true };
  });

export const adminCompleteOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    const { error } = await supabase
      .from("profiles")
      .update({ onboarding_status: "completed", onboarding_completed_at: new Date().toISOString() } as any)
      .eq("id", data.user_id);
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, "onboarding_completed", "customer_onboarding", data.user_id);
    return { ok: true };
  });

export const adminResetOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    const { error } = await supabase
      .from("profiles")
      .update({
        onboarding_status: "not_started",
        onboarding_step: 0,
        onboarding_started_at: null,
        onboarding_completed_at: null,
      } as any)
      .eq("id", data.user_id);
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, "onboarding_reset", "customer_onboarding", data.user_id);
    return { ok: true };
  });

export const adminSetSelfOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ user_id: z.string().uuid(), enabled: z.boolean() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    const { error } = await supabase
      .from("profiles")
      .update({ onboarding_self_enabled: data.enabled } as any)
      .eq("id", data.user_id);
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, data.enabled ? "self_onboarding_enabled" : "self_onboarding_disabled", "customer_onboarding", data.user_id);
    return { ok: true };
  });

export const adminSetTutorialEnabled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ user_id: z.string().uuid(), enabled: z.boolean() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    const { error } = await supabase
      .from("profiles")
      .update({ tutorial_enabled: data.enabled } as any)
      .eq("id", data.user_id);
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, data.enabled ? "tutorial_enabled" : "tutorial_disabled", "customer_tutorial", data.user_id);
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
    const { data: before } = await supabase
      .from("change_requests")
      .select("status")
      .eq("id", data.id)
      .single();
    const { data: req, error } = await supabase
      .from("change_requests")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("user_id, title")
      .single();
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, "change_status_changed", "change_request", data.id, {
      from: before?.status ?? null,
      to: data.status,
    });

    await supabase.from("notifications").insert({
      user_id: req.user_id,
      title: `Status update: ${req.title}`,
      message: `Je verzoek is nu: ${data.status}.`,
    });
    return { ok: true };
  });

export const adminGetChangeDetail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: request, error } = await supabase
      .from("change_requests")
      .select("*, change_attachments(*), change_comments(*)")
      .eq("id", data.id)
      .single();
    if (error) throw new Error(error.message);

    const [{ data: customer }, { data: project }, { data: audit }] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name, company").eq("id", request.user_id).maybeSingle(),
      request.project_id
        ? supabaseAdmin.from("projects").select("id, name, status").eq("id", request.project_id).maybeSingle()
        : Promise.resolve({ data: null }),
      supabase
        .from("audit_log")
        .select("*")
        .eq("target_type", "change_request")
        .eq("target_id", data.id)
        .order("created_at", { ascending: false }),
    ]);

    const actorIds = Array.from(new Set([...(audit ?? []).map((a: any) => a.user_id), request.user_id]));
    const { data: actors } = await supabase.from("profiles").select("id, email, full_name").in("id", actorIds);
    const actorMap = new Map((actors ?? []).map((a: any) => [a.id, a]));

    return {
      request,
      customer,
      project,
      auditLog: (audit ?? []).map((a: any) => ({ ...a, actor: actorMap.get(a.user_id) ?? null })),
      commentAuthors: actorMap,
    };
  });

export const adminCreateChangeRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        user_id: z.string().uuid(),
        title: z.string().trim().min(3).max(200),
        description: z.string().trim().min(5).max(5000),
        priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
        category: z
          .enum(["text", "styling", "functionality", "media", "data", "seo", "accessibility", "other"])
          .default("other"),
        rush: z.boolean().default(false),
        is_paid: z.boolean().default(false),
        project_id: z.string().uuid().nullable().optional(),
        due_date: z.string().nullable().optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    if (data.project_id) {
      const { data: project } = await supabaseAdmin
        .from("projects")
        .select("id, primary_user_id")
        .eq("id", data.project_id)
        .maybeSingle();
      if (!project) throw new Error("Project niet gevonden.");
      const { data: member } = await supabaseAdmin
        .from("project_members")
        .select("user_id")
        .eq("project_id", data.project_id)
        .eq("user_id", data.user_id)
        .maybeSingle();
      if (project.primary_user_id !== data.user_id && !member) {
        throw new Error("Geselecteerde klant is niet gekoppeld aan dit project.");
      }
    }

    const { data: row, error } = await supabaseAdmin
      .from("change_requests")
      .insert({
        user_id: data.user_id,
        title: data.title,
        description: data.description,
        priority: data.priority,
        category: data.category,
        rush: data.rush,
        is_paid: data.is_paid,
        project_id: data.project_id ?? null,
        due_date: data.due_date ?? null,
        ticket_type: "feature",
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, "change_created_by_admin", "change_request", row.id, {
      title: data.title,
      project_id: data.project_id ?? null,
    });

    return { request: row };
  });

export const adminListChanges = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const [{ data: requests, error }, { data: customers }, { data: projects }, { data: members }] = await Promise.all([
      supabase
        .from("change_requests")
        .select("*, change_attachments(*), change_comments(*)")
        .is("deleted_at", null)
        .order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, email, full_name, company"),
      supabaseAdmin.from("projects").select("id, name, primary_user_id").is("deleted_at", null).order("name", { ascending: true }),
      supabaseAdmin.from("project_members").select("project_id, user_id"),
    ]);
    if (error) throw new Error(error.message);

    const memberIdsByProject = new Map<string, string[]>();
    for (const m of members ?? []) {
      const arr = memberIdsByProject.get(m.project_id) ?? [];
      arr.push(m.user_id);
      memberIdsByProject.set(m.project_id, arr);
    }
    const projectsWithMembers = (projects ?? []).map((p: any) => ({
      ...p,
      member_ids: Array.from(new Set([p.primary_user_id, ...(memberIdsByProject.get(p.id) ?? [])].filter(Boolean))),
    }));

    return { requests: requests ?? [], customers: customers ?? [], projects: projectsWithMembers };
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
const ALLOWED_REDIRECT_HOSTS = new Set(
  [
    process.env.VITE_APP_URL,
    "https://aimi-development.nl",
    "https://portal.aimi-development.nl",
  ]
    .filter((v): v is string => !!v)
    .map((v) => {
      try {
        return new URL(v).hostname;
      } catch {
        return null;
      }
    })
    .filter((v): v is string => !!v),
);

export const adminSendPasswordReset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        email: z.string().email(),
        redirectTo: z.string().url().refine(
          (u) => ALLOWED_REDIRECT_HOSTS.has(new URL(u).hostname),
          "redirectTo host niet toegestaan",
        ),
      })
      .parse(d),
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
    await ensurePermission(supabase, userId, "delete_change_soft");
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
    await ensurePermission(supabase, userId, "delete_change_soft");
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
    await ensurePermission(supabase, userId, "restore_change");
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
    await ensurePermission(supabase, userId, "delete_change_hard");
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
    // PERF-2: tel via SQL-aggregatie i.p.v. alle site_pings-rijen op te halen.
    const { data: pings } = await supabaseAdmin.rpc("site_ping_counts" as any, {
      p_user_ids: ids.length ? ids : [],
    });
    const pingCounts: Record<string, number> = {};
    for (const r of (pings ?? []) as any[]) pingCounts[r.user_id] = Number(r.count);
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
    const primaryIds = Array.from(new Set((projects ?? []).map((p: any) => p.primary_user_id).filter(Boolean)));
    const [membersRes, profilesRes, pingsRes] = await Promise.all([
      supabaseAdmin.from("project_members" as any).select("project_id, user_id").in("project_id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]),
      supabase.from("profiles").select("id, full_name, email"),
      // PERF-2: tel alleen de pings van de betrokken primary-users, via SQL-aggregatie.
      supabaseAdmin.rpc("site_ping_counts" as any, { p_user_ids: primaryIds.length ? primaryIds : [] }),
    ]);

    const profileMap: Record<string, any> = {};
    for (const p of (profilesRes.data ?? []) as any[]) profileMap[p.id] = p;
    const pingCounts: Record<string, number> = {};
    for (const r of (pingsRes.data ?? []) as any[]) pingCounts[r.user_id] = Number(r.count);

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

const PROJECT_STATUS_VALUES = ["concept", "in_uitvoering", "review", "afgerond", "on_hold", "geannuleerd"] as const;
const PROJECT_PRIORITY_VALUES = ["laag", "normaal", "hoog", "urgent"] as const;

export const adminCreateProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      name: z.string().trim().min(1).max(200),
      website_url: z.string().trim().max(500).nullable().optional(),
      snippet_active: z.boolean().optional(),
      primary_user_id: z.string().uuid(),
      member_ids: z.array(z.string().uuid()).optional(),
      status: z.enum(PROJECT_STATUS_VALUES).optional(),
      priority: z.enum(PROJECT_PRIORITY_VALUES).optional(),
      description: z.string().trim().max(5000).nullable().optional(),
      start_date: z.string().trim().max(30).nullable().optional(),
      deadline: z.string().trim().max(30).nullable().optional(),
      budget: z.number().nonnegative().nullable().optional(),
      hours_estimated: z.number().nonnegative().nullable().optional(),
      category: z.string().trim().max(100).nullable().optional(),
      tags: z.array(z.string().trim().max(50)).optional(),
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

    await logAudit(supabase, userId, "project_created", "project", (project as any).id, { name: rest.name });
    return { ok: true, project };
  });

export const adminUpdateProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      primary_user_id: z.string().uuid().optional(),
      name: z.string().trim().min(1).max(200).optional(),
      website_url: z.string().trim().max(500).nullable().optional(),
      snippet_active: z.boolean().optional(),
      status: z.enum(PROJECT_STATUS_VALUES).optional(),
      priority: z.enum(PROJECT_PRIORITY_VALUES).optional(),
      description: z.string().trim().max(5000).nullable().optional(),
      start_date: z.string().trim().max(30).nullable().optional(),
      deadline: z.string().trim().max(30).nullable().optional(),
      budget: z.number().nonnegative().nullable().optional(),
      hours_estimated: z.number().nonnegative().nullable().optional(),
      hours_spent: z.number().nonnegative().optional(),
      progress_percentage: z.number().int().min(0).max(100).optional(),
      category: z.string().trim().max(100).nullable().optional(),
      tags: z.array(z.string().trim().max(50)).optional(),
      client_visible_notes: z.string().trim().max(5000).nullable().optional(),
      internal_notes: z.string().trim().max(5000).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { project_id, ...rest } = data;

    if (rest.primary_user_id) {
      // Nieuwe hoofdklant mag niet ook als losse "extra klant" gekoppeld blijven staan.
      await supabaseAdmin.from("project_members" as any).delete().eq("project_id", project_id).eq("user_id", rest.primary_user_id);
    }

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

    await logAudit(supabase, userId, "project_updated", "project", project_id, { fields: Object.keys(rest) });
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
    await logAudit(supabase, userId, "project_deleted", "project", data.project_id);
    return { ok: true };
  });

export const adminArchiveProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ project_id: z.string().uuid(), archived: z.boolean() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: project, error } = await supabaseAdmin
      .from("projects" as any)
      .update({
        archived: data.archived,
        archived_at: data.archived ? new Date().toISOString() : null,
      })
      .eq("id", data.project_id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(
      supabase,
      userId,
      data.archived ? "project_archived" : "project_unarchived",
      "project",
      data.project_id,
    );
    return { ok: true, project };
  });

export const adminGetProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);

    const { data: project, error } = await supabaseAdmin
      .from("projects" as any)
      .select("*")
      .eq("id", data.project_id)
      .single();
    if (error) throw new Error(error.message);

    const [membersRes, milestonesRes, notesRes, contactsRes, auditRes, changeRequestsRes] = await Promise.all([
      supabaseAdmin.from("project_members" as any).select("project_id, user_id").eq("project_id", data.project_id),
      supabaseAdmin
        .from("project_milestones" as any)
        .select("*")
        .eq("project_id", data.project_id)
        .order("order", { ascending: true }),
      supabaseAdmin
        .from("project_notes" as any)
        .select("*")
        .eq("project_id", data.project_id)
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("project_contacts" as any)
        .select("*")
        .eq("project_id", data.project_id)
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("audit_log" as any)
        .select("*")
        .eq("target_type", "project")
        .eq("target_id", data.project_id)
        .order("created_at", { ascending: false })
        .limit(100),
      supabaseAdmin
        .from("change_requests" as any)
        .select("id, title, status, priority, created_at, request_number")
        .eq("project_id", data.project_id)
        .is("deleted_at", null)
        .order("created_at", { ascending: false }),
    ]);

    const memberIds = (membersRes.data ?? []).map((m: any) => m.user_id);
    const idsToFetch = Array.from(new Set([...memberIds, (project as any).primary_user_id].filter(Boolean)));
    const { data: profiles } = idsToFetch.length
      ? await supabase.from("profiles").select("id, full_name, email, company").in("id", idsToFetch)
      : { data: [] as any[] };
    const profileMap: Record<string, any> = {};
    for (const p of (profiles ?? []) as any[]) profileMap[p.id] = p;

    return {
      project,
      primary_customer: profileMap[(project as any).primary_user_id] ?? null,
      members: memberIds.map((id: string) => profileMap[id] ?? { id }),
      milestones: milestonesRes.data ?? [],
      notes: notesRes.data ?? [],
      contacts: contactsRes.data ?? [],
      activity: auditRes.data ?? [],
      changeRequests: changeRequestsRes.data ?? [],
    };
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

// ---------- Project milestones ----------

export const adminListProjectMilestones = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: items, error } = await supabaseAdmin
      .from("project_milestones" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .order("order", { ascending: true });
    if (error) throw new Error(error.message);
    return { items: items ?? [] };
  });

export const adminCreateProjectMilestone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      title: z.string().trim().min(1).max(200),
      description: z.string().trim().max(2000).nullable().optional(),
      due_date: z.string().trim().max(30).nullable().optional(),
      order: z.number().int().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: milestone, error } = await supabaseAdmin
      .from("project_milestones" as any)
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "milestone_created", "project", data.project_id, {
      milestone_id: (milestone as any).id,
      title: data.title,
    });
    return { ok: true, milestone };
  });

// Milestone-status is een vrij tekstveld in de database (geen CHECK-
// constraint). De UI gebruikt alleen "open" en "done" als toggle-waarden.
export const adminUpdateProjectMilestone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      id: z.string().uuid(),
      project_id: z.string().uuid(),
      title: z.string().trim().min(1).max(200).optional(),
      description: z.string().trim().max(2000).nullable().optional(),
      due_date: z.string().trim().max(30).nullable().optional(),
      status: z.enum(["open", "done"]).optional(),
      order: z.number().int().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { id, project_id, ...rest } = data;

    // Server-side blokkade: een milestone mag pas op 'done' als alle
    // milestones waar hij van afhangt zelf al 'done' zijn.
    if (rest.status === "done") {
      const { data: deps, error: depErr } = await supabaseAdmin
        .from("project_milestone_dependencies" as any)
        .select("depends_on_milestone_id")
        .eq("milestone_id", id);
      if (depErr) throw new Error(depErr.message);
      const dependsOnIds = (deps ?? []).map((d: any) => d.depends_on_milestone_id);
      if (dependsOnIds.length) {
        const { data: blockers } = await supabaseAdmin
          .from("project_milestones" as any)
          .select("id, title, status")
          .in("id", dependsOnIds)
          .neq("status", "done");
        if (blockers && blockers.length) {
          throw new Error(`Kan niet afronden: wacht op milestone '${(blockers[0] as any).title}'`);
        }
      }
    }

    const updates: Record<string, any> = { ...rest, updated_at: new Date().toISOString() };
    if (rest.status !== undefined) {
      updates.completed_at = rest.status === "done" ? new Date().toISOString() : null;
    }
    const { data: milestone, error } = await supabaseAdmin
      .from("project_milestones" as any)
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "milestone_updated", "project", project_id, {
      milestone_id: id,
      fields: Object.keys(rest),
    });
    return { ok: true, milestone };
  });

export const adminDeleteProjectMilestone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_milestones" as any).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "milestone_deleted", "project", data.project_id, { milestone_id: data.id });
    return { ok: true };
  });

// ---------- Project notes ----------

export const adminListProjectNotes = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: items, error } = await supabaseAdmin
      .from("project_notes" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: items ?? [] };
  });

export const adminCreateProjectNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      content: z.string().trim().min(1).max(4000),
      is_client_visible: z.boolean().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: note, error } = await supabaseAdmin
      .from("project_notes" as any)
      .insert({ ...data, author_id: userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "note_created", "project", data.project_id, { note_id: (note as any).id });
    return { ok: true, note };
  });

// project_notes heeft geen updated_at-kolom — notities zijn niet bewerkbaar
// na aanmaken. Deze functie ondersteunt daarom alleen het omzetten van
// is_client_visible; de inhoud (content) kan niet worden gewijzigd.
export const adminUpdateProjectNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      id: z.string().uuid(),
      project_id: z.string().uuid(),
      is_client_visible: z.boolean().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { id, project_id, ...rest } = data;
    const { data: note, error } = await supabaseAdmin
      .from("project_notes" as any)
      .update(rest)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "note_updated", "project", project_id, { note_id: id, fields: Object.keys(rest) });
    return { ok: true, note };
  });

export const adminDeleteProjectNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_notes" as any).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "note_deleted", "project", data.project_id, { note_id: data.id });
    return { ok: true };
  });

// ---------- Project contacts ----------

export const adminListProjectContacts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: items, error } = await supabaseAdmin
      .from("project_contacts" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: items ?? [] };
  });

export const adminCreateProjectContact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      name: z.string().trim().min(1).max(200),
      role: z.string().trim().max(100).nullable().optional(),
      email: z.string().trim().max(200).nullable().optional(),
      phone: z.string().trim().max(50).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: contact, error } = await supabaseAdmin
      .from("project_contacts" as any)
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "contact_created", "project", data.project_id, { contact_id: (contact as any).id });
    return { ok: true, contact };
  });

export const adminUpdateProjectContact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      id: z.string().uuid(),
      project_id: z.string().uuid(),
      name: z.string().trim().min(1).max(200).optional(),
      role: z.string().trim().max(100).nullable().optional(),
      email: z.string().trim().max(200).nullable().optional(),
      phone: z.string().trim().max(50).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { id, project_id, ...rest } = data;
    const { data: contact, error } = await supabaseAdmin
      .from("project_contacts" as any)
      .update(rest)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "contact_updated", "project", project_id, { contact_id: id, fields: Object.keys(rest) });
    return { ok: true, contact };
  });

export const adminDeleteProjectContact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_contacts" as any).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "contact_deleted", "project", data.project_id, { contact_id: data.id });
    return { ok: true };
  });

// ---------- Project tasks (checklist, toewijzing, terugkerende taken) ----------

function nextRecurrenceDueDate(lastDueDate: string | null, recurrence: string): string {
  const base = lastDueDate ? new Date(lastDueDate) : new Date();
  if (recurrence === "weekly") base.setDate(base.getDate() + 7);
  else if (recurrence === "monthly") base.setMonth(base.getMonth() + 1);
  else if (recurrence === "quarterly") base.setMonth(base.getMonth() + 3);
  return base.toISOString().slice(0, 10);
}

// Lazy-generatie van terugkerende taken: voor elke template-taak
// (recurrence IS NOT NULL AND recurrence_parent_id IS NULL) wordt gekeken
// of er een nieuwe instantie moet worden aangemaakt. Dit gebeurt synchroon
// bij het ophalen van de takenlijst omdat er geen cron beschikbaar is.
async function generateDueRecurringTaskInstances(projectId: string) {
  const { data: templates } = await supabaseAdmin
    .from("project_tasks" as any)
    .select("*")
    .eq("project_id", projectId)
    .not("recurrence", "is", null)
    .is("recurrence_parent_id", null);

  const tmpls = (templates ?? []) as any[];
  if (tmpls.length === 0) return;

  // PERF-4: haal alle laatste instances in één query op i.p.v. per template.
  const templateIds = tmpls.map((t) => t.id);
  const { data: instances } = await supabaseAdmin
    .from("project_tasks" as any)
    .select("recurrence_parent_id, due_date, status")
    .in("recurrence_parent_id", templateIds);

  // Laatste instance per parent bepalen (hoogste due_date, nulls achteraan —
  // gelijk aan de oude order(due_date desc, nullsFirst:false).limit(1)).
  const latestByParent = new Map<string, any>();
  for (const inst of (instances ?? []) as any[]) {
    const cur = latestByParent.get(inst.recurrence_parent_id);
    if (!cur || (inst.due_date ?? "") > (cur.due_date ?? "")) {
      latestByParent.set(inst.recurrence_parent_id, inst);
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const isPastDue = (d: string | null) => !!d && d < today;

  const toInsert: any[] = [];
  for (const template of tmpls) {
    const lastInstance = latestByParent.get(template.id) ?? null;
    const shouldGenerate =
      !lastInstance ||
      (lastInstance.status === "done" && isPastDue(lastInstance.due_date));
    if (!shouldGenerate) continue;

    const newDueDate = lastInstance
      ? nextRecurrenceDueDate(lastInstance.due_date, template.recurrence)
      : (template.due_date ?? today);

    toInsert.push({
      project_id: projectId,
      title: template.title,
      description: template.description,
      assigned_to: template.assigned_to,
      status: "open",
      due_date: newDueDate,
      recurrence: null,
      recurrence_parent_id: template.id,
      created_by: template.created_by,
    });
  }

  // PERF-4: bulk-insert i.p.v. per template.
  if (toInsert.length > 0) {
    await supabaseAdmin.from("project_tasks" as any).insert(toInsert);
  }
}

export const adminListProjectTasks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);

    await generateDueRecurringTaskInstances(data.project_id);

    const { data: items, error } = await supabaseAdmin
      .from("project_tasks" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: items ?? [] };
  });

export const adminCreateProjectTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      title: z.string().trim().min(1).max(200),
      description: z.string().trim().max(2000).nullable().optional(),
      assigned_to: z.string().uuid().nullable().optional(),
      due_date: z.string().trim().max(30).nullable().optional(),
      recurrence: z.enum(["weekly", "monthly", "quarterly"]).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: task, error } = await supabaseAdmin
      .from("project_tasks" as any)
      .insert({ ...data, created_by: userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "task_created", "project", data.project_id, {
      task_id: (task as any).id,
      title: data.title,
    });
    return { ok: true, task };
  });

export const adminUpdateProjectTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      id: z.string().uuid(),
      project_id: z.string().uuid(),
      title: z.string().trim().min(1).max(200).optional(),
      description: z.string().trim().max(2000).nullable().optional(),
      assigned_to: z.string().uuid().nullable().optional(),
      status: z.enum(["open", "done"]).optional(),
      due_date: z.string().trim().max(30).nullable().optional(),
      recurrence: z.enum(["weekly", "monthly", "quarterly"]).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { id, project_id, ...rest } = data;
    const updates: Record<string, any> = { ...rest, updated_at: new Date().toISOString() };
    if (rest.status !== undefined) {
      updates.completed_at = rest.status === "done" ? new Date().toISOString() : null;
    }
    const { data: task, error } = await supabaseAdmin
      .from("project_tasks" as any)
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "task_updated", "project", project_id, {
      task_id: id,
      fields: Object.keys(rest),
    });
    return { ok: true, task };
  });

export const adminDeleteProjectTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_tasks" as any).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "task_deleted", "project", data.project_id, { task_id: data.id });
    return { ok: true };
  });

// ---------- Project time entries (tijdregistratie + CSV-export) ----------

export const adminListProjectTimeEntries = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: items, error } = await supabaseAdmin
      .from("project_task_time_entries" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .order("entry_date", { ascending: false });
    if (error) throw new Error(error.message);

    const userIds = Array.from(new Set((items ?? []).map((i: any) => i.user_id)));
    const { data: profiles } = userIds.length
      ? await supabase.from("profiles").select("id, full_name, email").in("id", userIds)
      : { data: [] as any[] };
    const profileMap: Record<string, any> = {};
    for (const p of (profiles ?? []) as any[]) profileMap[p.id] = p;

    const taskIds = Array.from(new Set((items ?? []).map((i: any) => i.task_id).filter(Boolean)));
    const { data: tasks } = taskIds.length
      ? await supabaseAdmin.from("project_tasks" as any).select("id, title").in("id", taskIds)
      : { data: [] as any[] };
    const taskMap: Record<string, any> = {};
    for (const t of (tasks ?? []) as any[]) taskMap[t.id] = t;

    return {
      items: (items ?? []).map((i: any) => ({
        ...i,
        user: profileMap[i.user_id] ?? null,
        task: i.task_id ? (taskMap[i.task_id] ?? null) : null,
      })),
    };
  });

export const adminCreateProjectTimeEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      task_id: z.string().uuid().nullable().optional(),
      user_id: z.string().uuid().optional(),
      minutes: z.number().int().min(1).max(1440),
      description: z.string().trim().max(2000).nullable().optional(),
      entry_date: z.string().trim().max(30).optional(),
      billable: z.boolean().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { user_id, ...rest } = data;
    const { data: entry, error } = await supabaseAdmin
      .from("project_task_time_entries" as any)
      .insert({ ...rest, user_id: user_id ?? userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "time_entry_created", "project", data.project_id, {
      entry_id: (entry as any).id,
      minutes: data.minutes,
    });
    return { ok: true, entry };
  });

export const adminDeleteProjectTimeEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_task_time_entries" as any).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "time_entry_deleted", "project", data.project_id, { entry_id: data.id });
    return { ok: true };
  });

function csvEscape(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export const adminExportProjectTimeEntriesCsv = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: items, error } = await supabaseAdmin
      .from("project_task_time_entries" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .order("entry_date", { ascending: true });
    if (error) throw new Error(error.message);

    const userIds = Array.from(new Set((items ?? []).map((i: any) => i.user_id)));
    const { data: profiles } = userIds.length
      ? await supabase.from("profiles").select("id, full_name, email").in("id", userIds)
      : { data: [] as any[] };
    const profileMap: Record<string, any> = {};
    for (const p of (profiles ?? []) as any[]) profileMap[p.id] = p;

    const taskIds = Array.from(new Set((items ?? []).map((i: any) => i.task_id).filter(Boolean)));
    const { data: tasks } = taskIds.length
      ? await supabaseAdmin.from("project_tasks" as any).select("id, title").in("id", taskIds)
      : { data: [] as any[] };
    const taskMap: Record<string, any> = {};
    for (const t of (tasks ?? []) as any[]) taskMap[t.id] = t;

    const header = ["datum", "teamlid", "taak", "omschrijving", "minuten", "facturabel"];
    const rows = (items ?? []).map((i: any) => [
      i.entry_date,
      profileMap[i.user_id]?.full_name ?? profileMap[i.user_id]?.email ?? i.user_id,
      i.task_id ? (taskMap[i.task_id]?.title ?? "") : "",
      i.description ?? "",
      i.minutes,
      i.billable ? "ja" : "nee",
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    return { csv };
  });

// ---------- Milestone dependencies ----------

export const adminListMilestoneDependencies = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: milestones, error: mErr } = await supabaseAdmin
      .from("project_milestones" as any)
      .select("id")
      .eq("project_id", data.project_id);
    if (mErr) throw new Error(mErr.message);
    const milestoneIds = (milestones ?? []).map((m: any) => m.id);
    if (milestoneIds.length === 0) return { items: [] };
    const { data: items, error } = await supabaseAdmin
      .from("project_milestone_dependencies" as any)
      .select("*")
      .in("milestone_id", milestoneIds);
    if (error) throw new Error(error.message);
    return { items: items ?? [] };
  });

export const adminAddMilestoneDependency = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      milestone_id: z.string().uuid(),
      depends_on_milestone_id: z.string().uuid(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: dep, error } = await supabaseAdmin
      .from("project_milestone_dependencies" as any)
      .insert({ milestone_id: data.milestone_id, depends_on_milestone_id: data.depends_on_milestone_id })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "milestone_dependency_added", "project", data.project_id, {
      milestone_id: data.milestone_id,
      depends_on_milestone_id: data.depends_on_milestone_id,
    });
    return { ok: true, dependency: dep };
  });

export const adminDeleteMilestoneDependency = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_milestone_dependencies" as any).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "milestone_dependency_removed", "project", data.project_id, { dependency_id: data.id });
    return { ok: true };
  });

// ---------- Project templates ----------

export const adminListProjectTemplates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: templates, error } = await supabaseAdmin
      .from("project_templates" as any)
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    const templateIds = (templates ?? []).map((t: any) => t.id);
    const { data: milestones } = templateIds.length
      ? await supabaseAdmin
          .from("project_template_milestones" as any)
          .select("*")
          .in("template_id", templateIds)
          .order("sort_order", { ascending: true })
      : { data: [] as any[] };
    const milestonesByTemplate: Record<string, any[]> = {};
    for (const m of (milestones ?? []) as any[]) {
      (milestonesByTemplate[m.template_id] ??= []).push(m);
    }
    return {
      items: (templates ?? []).map((t: any) => ({
        ...t,
        milestones: milestonesByTemplate[t.id] ?? [],
      })),
    };
  });

export const adminCreateProjectTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      name: z.string().trim().min(1).max(200),
      description: z.string().trim().max(2000).nullable().optional(),
      default_category: z.string().trim().max(100).nullable().optional(),
      default_hours_estimated: z.number().nonnegative().nullable().optional(),
      milestones: z.array(
        z.object({
          title: z.string().trim().min(1).max(200),
          description: z.string().trim().max(2000).nullable().optional(),
          days_offset: z.number().int().default(0),
        }),
      ).max(50).optional().default([]),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { milestones, ...rest } = data;
    const { data: template, error } = await supabaseAdmin
      .from("project_templates" as any)
      .insert(rest)
      .select()
      .single();
    if (error) throw new Error(error.message);

    if (milestones.length) {
      const rows = milestones.map((m, idx) => ({
        template_id: (template as any).id,
        title: m.title,
        description: m.description ?? null,
        days_offset: m.days_offset ?? 0,
        sort_order: idx,
      }));
      const { error: mErr } = await supabaseAdmin.from("project_template_milestones" as any).insert(rows);
      if (mErr) throw new Error(mErr.message);
    }

    await logAudit(supabase, userId, "project_template_created", "project", null, {
      template_id: (template as any).id,
      name: data.name,
    });
    return { ok: true, template };
  });

export const adminDeleteProjectTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_templates" as any).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit(supabase, userId, "project_template_deleted", "project", null, { template_id: data.id });
    return { ok: true };
  });

export const adminCreateProjectFromTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      template_id: z.string().uuid(),
      name: z.string().trim().min(1).max(200),
      website_url: z.string().trim().max(500).nullable().optional(),
      snippet_active: z.boolean().optional(),
      primary_user_id: z.string().uuid(),
      member_ids: z.array(z.string().uuid()).optional(),
      start_date: z.string().trim().max(30).nullable().optional(),
      category: z.string().trim().max(100).nullable().optional(),
      hours_estimated: z.number().nonnegative().nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    const { data: template, error: tErr } = await supabaseAdmin
      .from("project_templates" as any)
      .select("*")
      .eq("id", data.template_id)
      .single();
    if (tErr) throw new Error(tErr.message);

    const { data: templateMilestones, error: tmErr } = await supabaseAdmin
      .from("project_template_milestones" as any)
      .select("*")
      .eq("template_id", data.template_id)
      .order("sort_order", { ascending: true });
    if (tmErr) throw new Error(tmErr.message);

    const { template_id, member_ids, category, hours_estimated, ...rest } = data;
    const projectInsert: Record<string, any> = {
      ...rest,
      category: category ?? (template as any).default_category ?? null,
      hours_estimated: hours_estimated ?? (template as any).default_hours_estimated ?? null,
    };

    const { data: project, error } = await supabaseAdmin
      .from("projects" as any)
      .insert(projectInsert)
      .select()
      .single();
    if (error) throw new Error(error.message);

    await supabase.from("profiles").update({
      website_url: projectInsert.website_url ?? null,
      snippet_active: projectInsert.snippet_active ?? false,
    }).eq("id", projectInsert.primary_user_id);

    const memberSet = new Set([projectInsert.primary_user_id, ...(member_ids ?? [])]);
    const memberRows = Array.from(memberSet).map((uid) => ({ project_id: (project as any).id, user_id: uid }));
    if (memberRows.length) {
      const { error: memErr } = await supabaseAdmin.from("project_members" as any).insert(memberRows);
      if (memErr) throw new Error(memErr.message);
    }

    const baseDate = data.start_date ? new Date(data.start_date) : new Date();
    const milestoneRows = (templateMilestones ?? []).map((tm: any) => {
      const due = new Date(baseDate);
      due.setDate(due.getDate() + (tm.days_offset ?? 0));
      return {
        project_id: (project as any).id,
        title: tm.title,
        description: tm.description,
        due_date: due.toISOString().slice(0, 10),
        order: tm.sort_order,
      };
    });
    if (milestoneRows.length) {
      const { error: mErr } = await supabaseAdmin.from("project_milestones" as any).insert(milestoneRows);
      if (mErr) throw new Error(mErr.message);
    }

    await logAudit(supabase, userId, "project_created_from_template", "project", (project as any).id, {
      template_id: data.template_id,
      name: data.name,
    });
    return { ok: true, project };
  });

// ---------- Dashboard widgets ----------

export const adminGetProjectsDashboardWidgets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);

    const { data: projects, error } = await supabaseAdmin
      .from("projects" as any)
      .select("*")
      .eq("archived", false)
      .is("deleted_at", null)
      .not("status", "in", "(afgerond,geannuleerd)");
    if (error) throw new Error(error.message);

    const now = new Date();
    const in14Days = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const upcomingDeadlines = (projects ?? [])
      .filter((p: any) => p.deadline && new Date(p.deadline) <= in14Days)
      .sort((a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

    const projectIds = (projects ?? []).map((p: any) => p.id);
    // PERF-3: één rij per project via DISTINCT ON i.p.v. alle audit_log-rijen ophalen.
    const { data: activity } = projectIds.length
      ? await supabaseAdmin.rpc("project_last_activity" as any, { p_project_ids: projectIds })
      : { data: [] as any[] };

    const lastActivityByProject: Record<string, string> = {};
    for (const a of (activity ?? []) as any[]) {
      if (!lastActivityByProject[a.project_id]) lastActivityByProject[a.project_id] = a.last_activity;
    }

    const cutoff = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const stale = (projects ?? []).filter((p: any) => {
      const lastActivity = lastActivityByProject[p.id] ?? p.created_at;
      return new Date(lastActivity) < cutoff;
    });

    return { upcomingDeadlines, stale };
  });

// ---------- Change requests gekoppeld aan een project ----------

export const adminListProjectChangeRequests = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);
    const { data: items, error } = await supabaseAdmin
      .from("change_requests" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: items ?? [] };
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

  try {
    await assertPublicHost(hostname);
  } catch (e: any) {
    return fail(e?.message ?? "Interne/private IP-adressen zijn niet toegestaan.");
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
    await assertPublicHost(hostname);
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
    await logAudit(supabase, userId, "set_role_permission", "role", data.role, { permission: data.permission, allowed: data.allowed });
    return { ok: true };
  });

export const adminGetMyEffectivePermissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    // Shared with server-side enforcement (ensurePermission) so the UI and the
    // server agree on the effective permission set — single source of truth.
    const permissions = await getEffectivePermissions(supabase, userId);
    return { permissions };
  });

export const adminListRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);

    const { data: roles } = await supabaseAdmin.from("roles" as any).select("*").order("is_system", { ascending: false }).order("name");
    const { data: userRoleCounts } = await supabaseAdmin.from("user_roles").select("role");
    const { data: customRoleCounts } = await supabaseAdmin.from("user_custom_roles" as any).select("role_id");

    const systemCounts = new Map<string, number>();
    for (const r of (userRoleCounts as any) ?? []) {
      systemCounts.set(r.role, (systemCounts.get(r.role) ?? 0) + 1);
    }
    const customCounts = new Map<string, number>();
    for (const r of (customRoleCounts as any) ?? []) {
      customCounts.set(r.role_id, (customCounts.get(r.role_id) ?? 0) + 1);
    }

    const items = ((roles as any) ?? []).map((r: any) => ({
      ...r,
      account_count: r.is_system ? (systemCounts.get(r.key) ?? 0) : (customCounts.get(r.id) ?? 0),
    }));

    return { items };
  });

export const adminGetRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ role_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);

    const { data: role } = await supabaseAdmin.from("roles" as any).select("*").eq("id", data.role_id).maybeSingle();
    if (!role) throw new Error("Rol niet gevonden");
    const roleRow = role as any;

    let accountUserIds: string[] = [];
    if (roleRow.is_system) {
      const { data: rows } = await supabaseAdmin.from("user_roles").select("user_id").eq("role", roleRow.key);
      accountUserIds = ((rows as any) ?? []).map((r: any) => r.user_id);
    } else {
      const { data: rows } = await supabaseAdmin.from("user_custom_roles" as any).select("user_id").eq("role_id", roleRow.id);
      accountUserIds = ((rows as any) ?? []).map((r: any) => r.user_id);
    }

    let accounts: any[] = [];
    if (accountUserIds.length > 0) {
      const { data: profileRows } = await supabaseAdmin.from("profiles").select("id, full_name, email").in("id", accountUserIds);
      accounts = (profileRows as any) ?? [];
    }

    const { data: permissionRows } = await supabaseAdmin.from("role_permissions" as any).select("*").eq("role", roleRow.key);

    const { data: activityRows } = await supabaseAdmin
      .from("audit_log")
      .select("*")
      .eq("target_type", "role")
      .eq("target_id", roleRow.key)
      .order("created_at", { ascending: false })
      .limit(100);

    return {
      role: roleRow,
      accounts,
      permissions: (permissionRows as any) ?? [],
      activity: (activityRows as any) ?? [],
    };
  });

export const adminCreateCustomRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        name: z.string().min(1),
        description: z.string().optional().nullable(),
        base_role: z.string(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);

    if (!STAFF_BASE_ROLES.includes(data.base_role)) {
      throw new Error("Ongeldige basisrol");
    }

    const slugBase = data.name
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "rol";

    let key = slugBase;
    let suffix = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data: existing } = await supabaseAdmin.from("roles" as any).select("id").eq("key", key).maybeSingle();
      if (!existing) break;
      suffix += 1;
      key = `${slugBase}_${suffix}`;
    }

    const { data: created, error } = await supabaseAdmin
      .from("roles" as any)
      .insert({
        key,
        name: data.name,
        description: data.description ?? null,
        is_system: false,
        base_role: data.base_role,
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    await logAudit(supabase, userId, "create_custom_role", "role", key, { name: data.name, base_role: data.base_role });

    return { role: created };
  });

export const adminDeleteRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ role_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);

    const { data: role } = await supabaseAdmin.from("roles" as any).select("*").eq("id", data.role_id).maybeSingle();
    if (!role) throw new Error("Rol niet gevonden");
    const roleRow = role as any;

    if (roleRow.is_system) {
      throw new Error("Systeemrollen kunnen niet verwijderd worden");
    }

    const { count } = await supabaseAdmin
      .from("user_custom_roles" as any)
      .select("id", { count: "exact", head: true })
      .eq("role_id", roleRow.id);

    await supabaseAdmin.from("role_permissions" as any).delete().eq("role", roleRow.key);
    await supabaseAdmin.from("roles" as any).delete().eq("id", roleRow.id);

    await logAudit(supabase, userId, "delete_custom_role", "role", roleRow.key, { name: roleRow.name });

    return { ok: true, account_count: count ?? 0 };
  });

export const adminAssignCustomRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid(), role_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    await ensurePermission(supabase, userId, "manage_team");

    const { data: existingStaffRole } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user_id)
      .in("role", STAFF_BASE_ROLES as any)
      .maybeSingle();
    if (!existingStaffRole) {
      throw new Error("Gebruiker moet eerst een teamrol hebben voor je een custom rol kunt toewijzen");
    }

    await supabaseAdmin
      .from("user_custom_roles" as any)
      .upsert({ user_id: data.user_id, role_id: data.role_id, assigned_by: userId }, { onConflict: "user_id,role_id", ignoreDuplicates: true });

    await logAudit(supabase, userId, "assign_custom_role", "role", data.role_id, { user_id: data.user_id });

    return { ok: true };
  });

export const adminRemoveCustomRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid(), role_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureSuperAdmin(supabase, userId);
    await ensurePermission(supabase, userId, "manage_team");

    await supabaseAdmin.from("user_custom_roles" as any).delete().eq("user_id", data.user_id).eq("role_id", data.role_id);

    await logAudit(supabase, userId, "remove_custom_role", "role", data.role_id, { user_id: data.user_id });

    return { ok: true };
  });

export const adminListUserCustomRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureStaff(supabase, userId);

    const { data: rows } = await supabaseAdmin
      .from("user_custom_roles" as any)
      .select("*, roles:role_id(*)")
      .eq("user_id", data.user_id);

    return { items: (rows as any) ?? [] };
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
