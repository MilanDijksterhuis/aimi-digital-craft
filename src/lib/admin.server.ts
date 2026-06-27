import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendWelcomeEmail } from "./email.server";

function generateTempPassword(): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";
  const bytes = new Uint8Array(14);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => chars[b % chars.length]).join("");
}

export async function adminCreateCustomer(input: {
  email: string;
  full_name: string;
  company?: string;
}) {
  const tempPassword = generateTempPassword();
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: input.email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      full_name: input.full_name,
      company: input.company ?? "",
    },
  });
  if (error) throw new Error(error.message);

  // Stuur welkomstmail met inloggegevens
  try {
    await sendWelcomeEmail(input.email, input.full_name, tempPassword);
  } catch (mailErr) {
    console.error("[email] Welkomstmail mislukt:", mailErr);
    // Account is al aangemaakt — geen fatal error, log het alleen
  }

  return {
    user_id: data.user?.id,
    email: input.email,
    tempPassword,
  };
}

export async function adminListCustomers() {
  const [{ data: profiles }, { data: roles }, { data: creditsRows }] =
    await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin.from("user_roles").select("user_id, role"),
      supabaseAdmin.from("extra_credits").select("user_id, amount"),
    ]);

  const roleMap = new Map<string, string[]>();
  (roles ?? []).forEach((r: any) => {
    const arr = roleMap.get(r.user_id) ?? [];
    arr.push(r.role);
    roleMap.set(r.user_id, arr);
  });

  const creditMap = new Map<string, number>();
  (creditsRows ?? []).forEach((c: any) => {
    creditMap.set(c.user_id, (creditMap.get(c.user_id) ?? 0) + (c.amount ?? 0));
  });

  const since = new Date();
  since.setDate(1);
  since.setHours(0, 0, 0, 0);
  const { data: thisMonthReqs } = await supabaseAdmin
    .from("change_requests")
    .select("user_id")
    .gte("created_at", since.toISOString());
  const usedMap = new Map<string, number>();
  (thisMonthReqs ?? []).forEach((r: any) => {
    usedMap.set(r.user_id, (usedMap.get(r.user_id) ?? 0) + 1);
  });

  const STAFF_FILTER = ["super_admin", "co_admin", "support_agent", "viewer", "admin"];
  return (profiles ?? [])
    .filter((p: any) => !(roleMap.get(p.id) ?? []).some((r) => STAFF_FILTER.includes(r)))
    .map((p: any) => ({
      ...p,
      roles: roleMap.get(p.id) ?? [],
      extraCredits: creditMap.get(p.id) ?? 0,
      usedThisMonth: usedMap.get(p.id) ?? 0,
      available: Math.max(
        0,
        3 + (creditMap.get(p.id) ?? 0) - (usedMap.get(p.id) ?? 0),
      ),
    }));
}

export async function adminGenerateRecoveryLink(email: string, redirectTo: string) {
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo },
  });
  if (error) throw new Error(error.message);
  return { link: data?.properties?.action_link ?? null };
}

export async function adminSetUserPassword(userId: string, password: string) {
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password,
  });
  if (error) throw new Error(error.message);
}

export async function adminUpdateUserEmail(userId: string, email: string) {
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    email,
  });
  if (error) throw new Error(error.message);
}

export async function adminGetGrowthMetrics() {
  const [{ data: profiles }, { data: roles }, { data: reqs }, { data: comments }] =
    await Promise.all([
      supabaseAdmin.from("profiles").select("id, created_at, monthly_price_cents"),
      supabaseAdmin.from("user_roles").select("user_id, role"),
      supabaseAdmin
        .from("change_requests")
        .select("id, user_id, created_at"),
      supabaseAdmin
        .from("change_comments")
        .select("request_id, author_id, created_at")
        .order("created_at", { ascending: true }),
    ]);

  const STAFF_R = ["super_admin", "co_admin", "support_agent", "viewer", "admin"];
  const adminIds = new Set(
    (roles ?? []).filter((r: any) => STAFF_R.includes(r.role)).map((r: any) => r.user_id),
  );
  const customers = (profiles ?? []).filter((p: any) => !adminIds.has(p.id));

  const now = new Date();
  const monthLabel = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

  // New customers per month (last 6)
  const months: { label: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = monthLabel(d);
    const count = customers.filter((c: any) => monthLabel(new Date(c.created_at)) === label).length;
    months.push({ label, count });
  }

  // MRR
  const mrr = customers.reduce(
    (s: number, c: any) => s + (c.monthly_price_cents ?? 0),
    0,
  );

  // Active customers = had a request in last 30d
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const activeIds = new Set(
    (reqs ?? [])
      .filter((r: any) => new Date(r.created_at) >= cutoff)
      .map((r: any) => r.user_id),
  );
  const activeCount = customers.filter((c: any) => activeIds.has(c.id)).length;
  const inactiveCount = customers.length - activeCount;

  // Avg response time: first admin comment - request created
  const firstAdminCommentByRequest = new Map<string, string>();
  (comments ?? []).forEach((c: any) => {
    if (adminIds.has(c.author_id) && !firstAdminCommentByRequest.has(c.request_id)) {
      firstAdminCommentByRequest.set(c.request_id, c.created_at);
    }
  });
  const diffs: number[] = [];
  (reqs ?? []).forEach((r: any) => {
    const first = firstAdminCommentByRequest.get(r.id);
    if (first) {
      diffs.push(new Date(first).getTime() - new Date(r.created_at).getTime());
    }
  });
  const avgResponseMs = diffs.length
    ? diffs.reduce((a, b) => a + b, 0) / diffs.length
    : null;

  return {
    totalCustomers: customers.length,
    activeCount,
    inactiveCount,
    mrr_cents: mrr,
    months,
    avgResponseHours: avgResponseMs ? Math.round((avgResponseMs / 3600000) * 10) / 10 : null,
    totalRequests: reqs?.length ?? 0,
  };
}

export async function adminGetCustomerDetail(userId: string) {
  const [profileRes, requestsRes, costsRes, onbRes, creditsRes] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").eq("id", userId).single(),
    supabaseAdmin
      .from("change_requests")
      .select("*, change_attachments(*), change_comments(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("customer_costs")
      .select("*")
      .eq("user_id", userId)
      .order("cost_date", { ascending: false }),
    supabaseAdmin
      .from("onboarding_items")
      .select("*")
      .eq("user_id", userId)
      .order("position"),
    supabaseAdmin
      .from("extra_credits")
      .select("amount")
      .eq("user_id", userId),
  ]);

  const extraTotal =
    creditsRes.data?.reduce((s, c: any) => s + (c.amount ?? 0), 0) ?? 0;

  return {
    profile: profileRes.data,
    requests: requestsRes.data ?? [],
    costs: costsRes.data ?? [],
    onboarding: onbRes.data ?? [],
    extraCredits: extraTotal,
  };
}

// ============================================================
// =================== STAFF / TEAM MGMT ======================
// ============================================================

const STAFF = ["super_admin", "co_admin", "support_agent", "viewer", "admin"];

function genTempPw(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";
  const bytes = new Uint8Array(14);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => chars[b % chars.length]).join("");
}

export async function adminListStaffMembers() {
  const { data: roles } = await supabaseAdmin
    .from("user_roles")
    .select("user_id, role, created_at");
  const staffIds = Array.from(
    new Set((roles ?? []).filter((r: any) => STAFF.includes(r.role)).map((r: any) => r.user_id)),
  );
  if (staffIds.length === 0) return { members: [] };

  const { data: profiles } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .in("id", staffIds);

  const roleMap = new Map<string, string[]>();
  (roles ?? []).forEach((r: any) => {
    if (!staffIds.includes(r.user_id)) return;
    const arr = roleMap.get(r.user_id) ?? [];
    arr.push(r.role);
    roleMap.set(r.user_id, arr);
  });

  return {
    members: (profiles ?? []).map((p: any) => ({
      ...p,
      roles: roleMap.get(p.id) ?? [],
    })),
  };
}

export async function adminInviteStaffMember(input: {
  email: string;
  full_name: string;
  role: "co_admin" | "support_agent" | "viewer";
}) {
  // Check if user exists
  const { data: existing } = await supabaseAdmin
    .from("profiles")
    .select("id, email")
    .eq("email", input.email)
    .maybeSingle();

  let userId: string | null = existing?.id ?? null;
  let tempPassword: string | null = null;

  if (!userId) {
    tempPassword = genTempPw();
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: input.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { full_name: input.full_name },
    });
    if (error) throw new Error(error.message);
    userId = data.user?.id ?? null;
  }
  if (!userId) throw new Error("Kon gebruiker niet aanmaken.");

  // Remove default 'customer' role; add staff role
  await supabaseAdmin.from("user_roles").delete().eq("user_id", userId).eq("role", "customer");
  const { error: roleErr } = await supabaseAdmin
    .from("user_roles")
    .upsert({ user_id: userId, role: input.role }, { onConflict: "user_id,role" });
  if (roleErr) throw new Error(roleErr.message);

  return { user_id: userId, email: input.email, tempPassword };
}

export async function adminReplaceRole(
  targetUserId: string,
  role: "super_admin" | "co_admin" | "support_agent" | "viewer" | "customer",
) {
  // Remove ALL existing roles, then insert the new one
  await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId);
  const { error } = await supabaseAdmin
    .from("user_roles")
    .insert({ user_id: targetUserId, role });
  if (error) throw new Error(error.message);
}

export async function adminRemoveStaffRoles(targetUserId: string) {
  // Demote to plain customer
  await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId);
  await supabaseAdmin
    .from("user_roles")
    .insert({ user_id: targetUserId, role: "customer" });
}
