import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { computeMonitoringStats, measureResponseTime } from "./monitoring.shared";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getMyDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [profileRes, requestsRes, creditsRes, notifsRes, availRes, roleRes, onbRes, apptRes, loginsRes, errorsRes] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
        supabase
          .from("change_requests")
          .select("*, change_attachments(*), change_comments(*)")
          .eq("user_id", userId)
          .is("deleted_at", null)
          .order("created_at", { ascending: false }),
        supabase.from("extra_credits").select("amount").eq("user_id", userId),
        supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(50),
        supabase.rpc("available_credits", { _user_id: userId }),
        supabase.from("user_roles").select("role").eq("user_id", userId),
        supabase.from("onboarding_items").select("*").eq("user_id", userId).order("position"),
        supabase
          .from("appointments")
          .select("*")
          .eq("user_id", userId)
          .order("scheduled_at", { ascending: true }),
        supabase
          .from("login_events")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("site_errors")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

    // Haal response times op (7 dagen) — probeer nieuwe tabel, fallback naar site_pings
    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    let pingRows: any[] = [];
    try {
      const rtResult = await supabase
        .from("site_response_times" as any)
        .select("status_ok, response_ms, created_at")
        .eq("user_id", userId)
        .gte("created_at", since7d)
        .order("created_at", { ascending: false })
        .limit(2016);
      if (!rtResult.error && rtResult.data && rtResult.data.length > 0) {
        pingRows = rtResult.data as any[];
      } else {
        throw new Error("leeg");
      }
    } catch {
      const fallback = await supabase
        .from("site_pings")
        .select("status_ok, response_ms, created_at")
        .eq("user_id", userId)
        .gte("created_at", since7d)
        .order("created_at", { ascending: false })
        .limit(2016);
      pingRows = (fallback.data ?? []) as any[];
    }

    const usedThisMonth =
      requestsRes.data?.filter((r: any) => {
        const d = new Date(r.created_at);
        const now = new Date();
        return (
          !r.is_paid &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length ?? 0;

    const extraTotal =
      creditsRes.data?.reduce((s: number, c: any) => s + (c.amount ?? 0), 0) ?? 0;

    const monStats = computeMonitoringStats(pingRows);

    return {
      profile: profileRes.data,
      requests: requestsRes.data ?? [],
      notifications: notifsRes.data ?? [],
      availableCredits: (availRes.data as number) ?? 0,
      usedThisMonth,
      extraTotal,
      roles: (roleRes.data ?? []).map((r: any) => r.role),
      onboarding: onbRes.data ?? [],
      appointments: apptRes.data ?? [],
      loginEvents: loginsRes.data ?? [],
      uptimePct: monStats.uptimePct,
      avg: monStats.avg,
      dailyUptime: monStats.dailyUptime,
      total24h: monStats.total24h,
      lastSync: monStats.lastSync,
      siteErrors: errorsRes.data ?? [],
    };
  });


export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        full_name: z.string().trim().max(200).optional(),
        company: z.string().trim().max(200).optional(),
        phone: z.string().trim().max(50).optional(),
        address: z.string().trim().max(500).optional(),
        billing_address: z.string().trim().max(500).optional(),
        contact_person: z.string().trim().max(200).optional(),
        kvk: z.string().trim().max(50).optional(),
        btw: z.string().trim().max(50).optional(),
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
    const { error } = await supabase.from("profiles").update(data).eq("id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const portalGetOnboardingState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "company, address, kvk, contact_person, phone, website_url, contacts, email, onboarding_status, onboarding_step, onboarding_self_enabled" as any,
      )
      .eq("id", userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { profile: data };
  });

export const portalSaveOnboardingStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        step: z.number().int().min(0).max(5),
        fields: z
          .object({
            company: z.string().trim().max(200).optional(),
            address: z.string().trim().max(500).optional(),
            kvk: z.string().trim().max(50).optional(),
            contact_person: z.string().trim().max(200).optional(),
            phone: z.string().trim().max(50).optional(),
            website_url: z.string().trim().max(500).optional().nullable(),
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

    const { data: existing } = await supabase
      .from("profiles")
      .select("onboarding_started_at" as any)
      .eq("id", userId)
      .single();

    const update: any = {
      ...data.fields,
      onboarding_status: "in_progress",
      onboarding_step: data.step,
    };
    if (!(existing as any)?.onboarding_started_at) {
      update.onboarding_started_at = new Date().toISOString();
    }

    const { error } = await supabase.from("profiles").update(update as any).eq("id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const portalCompleteOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("profiles")
      .update({ onboarding_status: "completed", onboarding_completed_at: new Date().toISOString() } as any)
      .eq("id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const portalGetTutorialState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("profiles")
      .select("tutorial_enabled, tutorial_completed_at" as any)
      .eq("id", userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { profile: data };
  });

export const portalCompleteTutorial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("profiles")
      .update({ tutorial_completed_at: new Date().toISOString() } as any)
      .eq("id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const logLogin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_agent: z.string().max(500).optional() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    // Best effort ip extraction
    let ip: string | null = null;
    try {
      const { getRequestHeader } = await import("@tanstack/react-start/server");
      ip = getRequestHeader("x-forwarded-for") ?? getRequestHeader("cf-connecting-ip") ?? null;
      if (ip && ip.includes(",")) ip = ip.split(",")[0].trim();
    } catch {}
    await supabase.from("login_events").insert({
      user_id: userId,
      ip,
      user_agent: data.user_agent ?? null,
    });

    // Responstijd meten bij inloggen — alleen als laatste meting > 1 uur geleden
    (async () => {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("website_url")
          .eq("id", userId)
          .maybeSingle();
        if (!profile?.website_url) return;

        const since1h = new Date(Date.now() - 3600000).toISOString();
        const { data: recentMeasure } = await supabaseAdmin
          .from("site_response_times" as any)
          .select("id")
          .eq("user_id", userId)
          .not("response_ms", "is", null)
          .gte("created_at", since1h)
          .limit(1)
          .maybeSingle();
        if (recentMeasure) return;

        const measured = await measureResponseTime(profile.website_url);
        await supabaseAdmin.from("site_response_times" as any).insert({
          user_id: userId,
          response_ms: measured.response_ms,
          status_ok: measured.status_ok,
        });

        if (measured.response_ms > 3000) {
          const { data: existingAlert } = await supabaseAdmin
            .from("monitoring_alerts" as any)
            .select("id").eq("user_id", userId).eq("type", "response_time")
            .is("archived_at", null).gte("created_at", since1h).limit(1).maybeSingle();
          if (!existingAlert) {
            await supabaseAdmin.from("monitoring_alerts" as any).insert({
              user_id: userId, type: "response_time", severity: "warning",
              message: `Hoge response time: ${measured.response_ms}ms (limiet: 3000ms)`,
            });
          }
        }
      } catch { /* niet kritiek */ }
    })();

    return { ok: true };
  });

export const cancelMyChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ id: z.string().uuid(), reason: z.string().trim().max(500).optional() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { data: req } = await supabase
      .from("change_requests")
      .select("user_id, status")
      .eq("id", data.id)
      .single();
    if (!req || req.user_id !== userId) throw new Error("Niet gevonden.");
    if (["in_progress", "review", "done", "invoiced"].includes(req.status)) {
      throw new Error("Deze change is al in uitvoering en kan niet meer geannuleerd worden.");
    }
    const { error } = await supabase
      .from("change_requests")
      .update({ status: "cancelled" as any, cancellation_reason: data.reason ?? null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });



const SIMPLE_CATEGORIES_SERVER = new Set(["text", "styling", "media", "accessibility"]);

export const submitChangeRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        title: z.string().trim().min(3).max(200),
        description: z.string().trim().min(5).max(5000),
        priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
        category: z
          .enum([
            "text",
            "styling",
            "functionality",
            "media",
            "data",
            "seo",
            "accessibility",
            "other",
          ])
          .default("other"),
        rush: z.boolean().default(false),
        ticket_type: z.enum(["question", "bug", "feature", "complaint"]).default("question"),
        project_id: z.string().uuid().optional(),
        attachments: z
          .array(
            z.object({
              file_path: z.string().min(1).max(500),
              file_name: z.string().min(1).max(200),
              mime_type: z.string().max(100).optional(),
              size_bytes: z.number().int().nonnegative().optional(),
            }),
          )
          .max(10)
          .optional()
          .default([]),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;

    // Bepaal of dit een gratis (simple) of betaalde (uitgebreide) change is.
    const isFreeCategory = SIMPLE_CATEGORIES_SERVER.has(data.category);
    const isPaid = !isFreeCategory;

    // Voor gratis changes: check credits.
    if (!isPaid) {
      const { data: avail } = await supabase.rpc("available_credits", { _user_id: userId });
      if (((avail as number) ?? 0) <= 0) {
        throw new Error(
          "Geen gratis changes meer beschikbaar deze maand. Kies een andere categorie of koop er bij.",
        );
      }
    }

    // Max 10 openstaande changes.
    const { count: openCount } = await supabase
      .from("change_requests")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .is("deleted_at", null)
      .not("status", "in", "(done,rejected)");
    if ((openCount ?? 0) >= 10) {
      throw new Error("Je hebt 10 openstaande changes. Wacht tot er een wordt afgerond.");
    }

    const { data: prof } = await supabase
      .from("profiles")
      .select("website_url")
      .eq("id", userId)
      .maybeSingle();
    const websitePrefix = prof?.website_url ? `🌐 Website: ${prof.website_url}\n\n` : "";

    // Als er een project_id is meegegeven, valideer dat de klant daadwerkelijk
    // aan dat project gekoppeld is (primary_user_id of project_members).
    if (data.project_id) {
      await assertOwnProject(supabase, userId, data.project_id);
    }

    const { data: row, error } = await supabase
      .from("change_requests")
      .insert({
        user_id: userId,
        title: data.title,
        description: websitePrefix + data.description,
        priority: data.priority,
        category: data.category,
        is_paid: isPaid,
        rush: data.rush,
        ticket_type: data.ticket_type,
        project_id: data.project_id ?? null,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);


    if (data.attachments.length > 0) {
      const rows = data.attachments.map((a) => ({
        request_id: row.id,
        user_id: userId,
        file_path: a.file_path,
        file_name: a.file_name,
        mime_type: a.mime_type ?? null,
        size_bytes: a.size_bytes ?? null,
      }));
      await supabase.from("change_attachments").insert(rows);
    }

    return { request: row };
  });

export const requestExtraCredits = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ amount: z.number().int().min(1).max(50) }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("purchase_requests")
      .insert({ user_id: userId, amount: data.amount });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", data.id)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const markAllNotificationsRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);
    return { ok: true };
  });

export const postCustomerComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        request_id: z.string().uuid(),
        body: z.string().trim().min(1).max(4000),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    // PERF-10: ownership-check én titel (voor de notificatie) in één query, en
    // de admin-rollen-lookup parallel met de comment-insert.
    // SEC-9: rollen staan in user_roles, niet op profiles; notificeer via
    // supabaseAdmin (klant-JWT mag onder RLS de admin-rollen niet lezen en geen
    // notifications voor anderen inserten).
    const [reqRes, adminRolesRes] = await Promise.all([
      supabase.from("change_requests").select("user_id, title").eq("id", data.request_id).single(),
      supabaseAdmin.from("user_roles").select("user_id").in("role", ["super_admin", "co_admin", "admin"]),
    ]);
    const req = reqRes.data as any;
    if (!req || req.user_id !== userId) throw new Error("Niet gevonden.");

    const { error } = await supabase
      .from("change_comments")
      .insert({ request_id: data.request_id, author_id: userId, body: data.body });
    if (error) throw new Error(error.message);

    // Notify all admins
    const adminIds = Array.from(new Set((adminRolesRes.data ?? []).map((r: any) => r.user_id)));
    if (adminIds.length > 0) {
      await supabaseAdmin.from("notifications").insert(
        adminIds.map((id) => ({
          user_id: id,
          title: `Klant reageerde: ${req.title}`,
          message: data.body.slice(0, 140),
        })),
      );
    }

    return { ok: true };
  });

export const getAttachmentUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ file_path: z.string().max(500) }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    // Verify this file belongs to the authenticated user
    const { data: attachment } = await supabase
      .from("change_attachments")
      .select("user_id")
      .eq("file_path", data.file_path)
      .eq("user_id", userId)
      .maybeSingle();
    if (!attachment) throw new Error("Bestand niet gevonden of geen toegang.");
    const { data: url, error } = await supabase.storage
      .from("change-attachments")
      .createSignedUrl(data.file_path, 3600);
    if (error) throw new Error(error.message);
    return { url: url.signedUrl };
  });

export const requestPasswordReset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: prof } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", userId)
      .maybeSingle();
    if (!prof) throw new Error("Profiel niet gevonden.");
    const { error } = await supabase.from("password_reset_requests").insert({
      user_id: userId,
      user_email: prof.email,
      user_name: prof.full_name ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Klant: project detail (alleen eigen project) ----------

async function assertOwnProject(supabase: any, userId: string, projectId: string) {
  const { data: project, error } = await supabase
    .from("projects" as any)
    .select("*")
    .eq("id", projectId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!project) throw new Error("Project niet gevonden of geen toegang.");

  if ((project as any).primary_user_id === userId) return project;

  const { data: membership } = await supabase
    .from("project_members" as any)
    .select("project_id")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!membership) throw new Error("Geen toegang tot dit project.");
  return project;
}

export const portalListMyProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    // RLS ("customers read own projects") beperkt dit al tot eigen project(en).
    const { data, error } = await supabase
      .from("projects" as any)
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: data ?? [] };
  });

// Alias van portalListMyProjects, specifiek voor het change-aanvraagformulier:
// 0 projecten -> geen veld nodig, 1 project -> vast gekoppeld (niet
// selecteerbaar), >1 project -> dropdown. De data is identiek aan
// portalListMyProjects, alleen de naam maakt het intent in de UI duidelijk.
export const portalListMyProjectsForChangeForm = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data, error } = await supabase
      .from("projects" as any)
      .select("id, name")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: data ?? [] };
  });

export const portalGetProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const project = await assertOwnProject(supabase, userId, data.project_id);
    const { data: changeRequests } = await supabase
      .from("change_requests")
      .select("*")
      .eq("project_id", data.project_id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    return { project, changeRequests: changeRequests ?? [] };
  });

export const portalGetProjectMonitoring = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const project = await assertOwnProject(supabase, userId, data.project_id);
    const targetUserId = (project as any).primary_user_id as string;

    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    let pingRows: any[] = [];
    try {
      const rtResult = await supabaseAdmin
        .from("site_response_times" as any)
        .select("status_ok, response_ms, created_at")
        .eq("user_id", targetUserId)
        .gte("created_at", since7d)
        .order("created_at", { ascending: false })
        .limit(2016);
      if (!rtResult.error && rtResult.data && rtResult.data.length > 0) {
        pingRows = rtResult.data as any[];
      } else {
        throw new Error("leeg");
      }
    } catch {
      const fallback = await supabaseAdmin
        .from("site_pings")
        .select("status_ok, response_ms, created_at")
        .eq("user_id", targetUserId)
        .gte("created_at", since7d)
        .order("created_at", { ascending: false })
        .limit(2016);
      pingRows = (fallback.data ?? []) as any[];
    }

    const { data: siteErrors } = await supabaseAdmin
      .from("site_errors")
      .select("*")
      .eq("user_id", targetUserId)
      .order("created_at", { ascending: false })
      .limit(5);

    const monStats = computeMonitoringStats(pingRows);

    return {
      uptimePct: monStats.uptimePct,
      avg: monStats.avg,
      dailyUptime: monStats.dailyUptime,
      total24h: monStats.total24h,
      lastSync: monStats.lastSync,
      siteErrors: siteErrors ?? [],
    };
  });

export const portalListProjectMilestones = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await assertOwnProject(supabase, userId, data.project_id);
    const { data: items, error } = await supabase
      .from("project_milestones" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .order("order", { ascending: true });
    if (error) throw new Error(error.message);
    return { items: items ?? [] };
  });

export const portalListMilestoneDependencies = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await assertOwnProject(supabase, userId, data.project_id);
    const { data: milestones, error: mErr } = await supabase
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

export const portalListProjectNotes = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await assertOwnProject(supabase, userId, data.project_id);
    // RLS beperkt dit voor de klant sowieso al tot is_client_visible = true,
    // maar we filteren hier ook expliciet zodat het contract duidelijk is
    // ongeacht welke client wordt gebruikt.
    const { data: items, error } = await supabase
      .from("project_notes" as any)
      .select("*")
      .eq("project_id", data.project_id)
      .eq("is_client_visible", true)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: items ?? [] };
  });

