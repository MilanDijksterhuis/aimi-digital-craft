// CODE-2: gedeelde server-side auth-guards. Voorheen stond dit getRoles/ensureX
// -patroon gedupliceerd in admin/accounts/contact/monitoring.functions.ts met
// hardcoded rol-arrays die konden driften. Deze module is de enige bron; de
// rol-sets komen uit rbac.ts (ADMIN_LIKE_ROLES/SUPER_ADMIN_ROLES/STAFF_GUARD_ROLES).
//
// Gedrag is exact gelijk aan de oude per-bestand-kopieën (o.a. de server-staff
// -guard sluit sales bewust uit — dat is bestaand gedrag, geen wijziging).

import { ADMIN_LIKE_ROLES, SUPER_ADMIN_ROLES, STAFF_GUARD_ROLES } from "./rbac";

export async function getRoles(supabase: any, userId: string): Promise<string[]> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return (data ?? []).map((r: any) => r.role);
}

export async function ensureRoles(
  supabase: any,
  userId: string,
  allowed: readonly string[],
  label = "this action",
): Promise<string[]> {
  const roles = await getRoles(supabase, userId);
  if (!roles.some((r) => allowed.includes(r))) {
    throw new Error(`Forbidden: ${label}`);
  }
  return roles;
}

export async function ensureAdmin(supabase: any, userId: string): Promise<string[]> {
  return ensureRoles(supabase, userId, ADMIN_LIKE_ROLES, "admin only");
}

export async function ensureSuperAdmin(supabase: any, userId: string): Promise<string[]> {
  return ensureRoles(supabase, userId, SUPER_ADMIN_ROLES, "super admin only");
}

export async function ensureStaff(supabase: any, userId: string): Promise<string[]> {
  return ensureRoles(supabase, userId, STAFF_GUARD_ROLES, "staff only");
}
