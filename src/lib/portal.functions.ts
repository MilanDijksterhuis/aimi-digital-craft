import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMyDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [profileRes, requestsRes, creditsRes, notifsRes, availRes, roleRes, onbRes, apptRes] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
        supabase
          .from("change_requests")
          .select("*, change_attachments(*), change_comments(*)")
          .eq("user_id", userId)
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
      ]);

    const usedThisMonth =
      requestsRes.data?.filter((r: any) => {
        const d = new Date(r.created_at);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length ?? 0;

    const extraTotal =
      creditsRes.data?.reduce((s: number, c: any) => s + (c.amount ?? 0), 0) ?? 0;

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
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("profiles").update(data).eq("id", userId);
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
    // Verify request belongs to user
    const { data: req } = await supabase
      .from("change_requests")
      .select("user_id")
      .eq("id", data.request_id)
      .single();
    if (!req || req.user_id !== userId) throw new Error("Niet gevonden.");

    const { error } = await supabase
      .from("change_comments")
      .insert({ request_id: data.request_id, author_id: userId, body: data.body });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getAttachmentUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ file_path: z.string().max(500) }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase } = context;
    const { data: url, error } = await supabase.storage
      .from("change-attachments")
      .createSignedUrl(data.file_path, 3600);
    if (error) throw new Error(error.message);
    return { url: url.signedUrl };
  });
