import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { adminCreateCustomer, adminListCustomers } from "./admin.server";

async function ensureAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (!data) throw new Error("Forbidden: admin only");
}

export const adminGetOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);

    const customers = await adminListCustomers();
    const [requestsRes, purchasesRes] = await Promise.all([
      supabase
        .from("change_requests")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("purchase_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
    ]);

    return {
      customers,
      requests: requestsRes.data ?? [],
      pendingPurchases: purchasesRes.data ?? [],
    };
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
    const result = await adminCreateCustomer(data);
    return result;
  });

export const adminUpdateRequestStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["pending", "in_progress", "done", "rejected"]),
        admin_notes: z.string().max(2000).optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: req, error } = await supabase
      .from("change_requests")
      .update({ status: data.status, admin_notes: data.admin_notes ?? null })
      .eq("id", data.id)
      .select("user_id, title")
      .single();
    if (error) throw new Error(error.message);

    // Auto-notify customer
    await supabase.from("notifications").insert({
      user_id: req.user_id,
      title: `Status update: ${req.title}`,
      message: `Je verzoek is nu: ${data.status}.`,
    });

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
