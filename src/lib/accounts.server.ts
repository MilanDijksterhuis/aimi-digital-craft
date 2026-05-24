import { supabaseAdmin } from "@/integrations/supabase/client.server";

export async function adminListAllAccountsImpl() {
  const [{ data: profiles }, { data: roles }] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("user_roles").select("user_id, role"),
  ]);

  const roleMap = new Map<string, string[]>();
  (roles ?? []).forEach((r: any) => {
    const arr = roleMap.get(r.user_id) ?? [];
    arr.push(r.role);
    roleMap.set(r.user_id, arr);
  });

  return {
    accounts: (profiles ?? []).map((p: any) => ({
      ...p,
      roles: roleMap.get(p.id) ?? [],
    })),
  };
}

export async function adminHardDeleteUserImpl(userId: string) {
  // Cascade-style cleanup of related rows (avoid FK orphans)
  await supabaseAdmin.from("change_comments").delete().eq("author_id", userId);
  await supabaseAdmin.from("change_attachments").delete().eq("user_id", userId);
  await supabaseAdmin.from("change_requests").delete().eq("user_id", userId);
  await supabaseAdmin.from("notifications").delete().eq("user_id", userId);
  await supabaseAdmin.from("appointments").delete().eq("user_id", userId);
  await supabaseAdmin.from("customer_costs").delete().eq("user_id", userId);
  await supabaseAdmin.from("onboarding_items").delete().eq("user_id", userId);
  await supabaseAdmin.from("extra_credits").delete().eq("user_id", userId);
  await supabaseAdmin.from("login_events").delete().eq("user_id", userId);
  await supabaseAdmin.from("site_pings").delete().eq("user_id", userId);
  await supabaseAdmin.from("site_errors").delete().eq("user_id", userId);
  await supabaseAdmin.from("client_contacts").delete().eq("user_id", userId);
  await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);
  await supabaseAdmin.from("profiles").delete().eq("id", userId);

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);
}

export async function expireBlockedAccountsImpl() {
  const now = new Date().toISOString();
  const { data: profilesToBlock } = await supabaseAdmin
    .from("profiles")
    .select("id, email, access_expires_at")
    .lt("access_expires_at", now)
    .eq("is_blocked", false);

  const ids = (profilesToBlock ?? []).map((p: any) => p.id);
  if (ids.length === 0) return { blocked: 0 };

  await supabaseAdmin.from("profiles").update({ is_blocked: true }).in("id", ids);

  for (const p of profilesToBlock ?? []) {
    await supabaseAdmin.from("admin_notifications").insert({
      type: "account_expired",
      title: "Tijdelijk account verlopen",
      message: `Account ${p.email} is verlopen en automatisch geblokkeerd.`,
      link: `/admin`,
    });
  }
  return { blocked: ids.length };
}
