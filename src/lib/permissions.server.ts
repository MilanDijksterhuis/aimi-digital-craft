// Server-side effective-permission computation & enforcement.
//
// SEC-2: the role-permission matrix (role_permissions) and custom roles
// (user_custom_roles) were previously only read to feed the client UI
// (usePermissions), so toggling a permission off in the matrix had no effect on
// what the server actually allowed. This module is the single server-side
// source of truth: it combines the base can()-matrix with role_permissions
// overrides and custom roles, identical to what the UI sees, and exposes
// ensurePermission() so high-risk server functions enforce the matrix.
//
// The overall guard pattern for high-risk mutations is: keep the existing
// hardcoded role check (ensureAdmin/ensureSuperAdmin) as a floor AND add
// ensurePermission on top. That means a matrix override can *restrict* a
// permission (fail-safe) but cannot silently *grant* a dangerous action to a
// role that the floor would reject.

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { can, ALL_PERMISSION_ACTIONS, type PermissionAction } from "./rbac";

/**
 * Compute the effective permission set for a user, mirroring the logic in
 * adminGetMyEffectivePermissions (which drives the client UI). Base rights come
 * from can(systemRoles). role_permissions rows for any held system- or custom
 * role then override per permission: an explicit "allowed: true" from any held
 * role wins; if overrides exist for a permission but none are true, it is
 * disabled.
 *
 * @param supabase authed Supabase client (used to read the caller's own roles)
 * @param userId   the caller's user id
 */
export async function getEffectivePermissions(
  supabase: any,
  userId: string,
): Promise<Record<PermissionAction, boolean>> {
  const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const systemRoles: string[] = (roleRows ?? []).map((r: any) => r.role);

  const { data: customRoleRows } = await supabaseAdmin
    .from("user_custom_roles" as any)
    .select("role_id, roles:role_id(key)")
    .eq("user_id", userId);
  const customRoleKeys: string[] = ((customRoleRows as any) ?? [])
    .map((r: any) => r.roles?.key)
    .filter((k: any): k is string => !!k);

  const allRoleKeys = Array.from(new Set([...systemRoles, ...customRoleKeys]));

  const { data: overrideRows } = await supabaseAdmin
    .from("role_permissions" as any)
    .select("role, permission, allowed")
    .in("role", allRoleKeys.length > 0 ? allRoleKeys : ["__none__"]);

  const permissions = {} as Record<PermissionAction, boolean>;
  for (const action of ALL_PERMISSION_ACTIONS) {
    permissions[action] = can(systemRoles, action);
  }

  const overridesByAction = new Map<string, boolean[]>();
  for (const row of (overrideRows as any) ?? []) {
    const list = overridesByAction.get(row.permission) ?? [];
    list.push(row.allowed);
    overridesByAction.set(row.permission, list);
  }
  for (const [permission, values] of overridesByAction) {
    const action = permission as PermissionAction;
    if (!ALL_PERMISSION_ACTIONS.includes(action)) continue;
    permissions[action] = values.some((v) => v === true);
  }

  return permissions;
}

/**
 * Throw unless the caller's effective permission set grants `action`. Intended
 * as an additional layer on top of the hardcoded role guards for high-risk
 * mutations, so the role-permission matrix is actually enforced server-side.
 */
export async function ensurePermission(
  supabase: any,
  userId: string,
  action: PermissionAction,
  label?: string,
) {
  const permissions = await getEffectivePermissions(supabase, userId);
  if (!permissions[action]) {
    throw new Error(`Forbidden: ${label ?? action}`);
  }
}
