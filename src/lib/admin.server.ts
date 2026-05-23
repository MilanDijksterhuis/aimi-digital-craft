import { supabaseAdmin } from "@/integrations/supabase/client.server";

function generateTempPassword(): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";
  let out = "";
  for (let i = 0; i < 14; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
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
  return {
    user_id: data.user?.id,
    email: input.email,
    tempPassword,
  };
}

export async function adminListCustomers() {
  // Fetch profiles + roles
  const [{ data: profiles }, { data: roles }, { data: creditsRows }] =
    await Promise.all([
      supabaseAdmin.from("profiles").select("*").order("created_at", { ascending: false }),
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

  // Fetch usage this month for each profile
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

  return (profiles ?? [])
    .filter((p: any) => !(roleMap.get(p.id) ?? []).includes("admin"))
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
