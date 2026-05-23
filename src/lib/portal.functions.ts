import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMyDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [profileRes, requestsRes, creditsRes, notifsRes, availRes, roleRes] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
        supabase
          .from("change_requests")
          .select("*")
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
      ]);

    const usedThisMonth =
      requestsRes.data?.filter((r) => {
        const d = new Date(r.created_at);
        const now = new Date();
        return (
          d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        );
      }).length ?? 0;

    const extraTotal =
      creditsRes.data?.reduce((s, c) => s + (c.amount ?? 0), 0) ?? 0;

    return {
      profile: profileRes.data,
      requests: requestsRes.data ?? [],
      notifications: notifsRes.data ?? [],
      availableCredits: (availRes.data as number) ?? 0,
      usedThisMonth,
      extraTotal,
      roles: (roleRes.data ?? []).map((r) => r.role),
    };
  });

export const submitChangeRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        title: z.string().trim().min(3).max(200),
        description: z.string().trim().min(5).max(5000),
        priority: z.enum(["low", "normal", "high"]).default("normal"),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { data: avail } = await supabase.rpc("available_credits", {
      _user_id: userId,
    });
    if (((avail as number) ?? 0) <= 0) {
      throw new Error("Geen changes meer beschikbaar deze maand. Koop er bij.");
    }
    const { data: row, error } = await supabase
      .from("change_requests")
      .insert({
        user_id: userId,
        title: data.title,
        description: data.description,
        priority: data.priority,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { request: row };
  });

export const requestExtraCredits = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ amount: z.number().int().min(1).max(50) }).parse(d),
  )
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
