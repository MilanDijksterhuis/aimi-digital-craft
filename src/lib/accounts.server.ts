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

export async function adminGetAccountDetailImpl(userId: string) {
  const [
    { data: profile },
    { data: roles },
    { data: projectsPrimary },
    { data: memberRows },
    { data: loginEvents },
    { data: auditLog },
    { data: contactMoments },
    { data: siteErrors },
  ] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabaseAdmin.from("user_roles").select("role").eq("user_id", userId),
    supabaseAdmin.from("projects").select("*").eq("primary_user_id", userId).is("deleted_at", null),
    supabaseAdmin.from("project_members").select("project_id, projects(*)").eq("user_id", userId),
    supabaseAdmin.from("login_events").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(50),
    supabaseAdmin.from("audit_log").select("*").eq("target_id", userId).order("created_at", { ascending: false }).limit(100),
    supabaseAdmin.from("client_contacts").select("*").eq("user_id", userId).order("occurred_at", { ascending: false }),
    supabaseAdmin.from("site_errors").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20),
  ]);

  if (!profile) throw new Error("Account niet gevonden.");

  const projectMap = new Map<string, any>();
  for (const p of projectsPrimary ?? []) projectMap.set(p.id, p);
  for (const m of memberRows ?? []) {
    const p = (m as any).projects;
    if (p && !p.deleted_at) projectMap.set(p.id, p);
  }

  return {
    profile,
    roles: (roles ?? []).map((r: any) => r.role),
    projects: Array.from(projectMap.values()),
    loginEvents: loginEvents ?? [],
    auditLog: auditLog ?? [],
    contactMoments: contactMoments ?? [],
    siteErrors: siteErrors ?? [],
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
