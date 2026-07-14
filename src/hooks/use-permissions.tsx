import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminGetMyRoles, adminGetMyEffectivePermissions } from "@/lib/admin.functions";
import { can, type PermissionAction } from "@/lib/rbac";

export function usePermissions() {
  const fn = useServerFn(adminGetMyRoles);
  const { data } = useQuery({
    queryKey: ["my-roles"],
    queryFn: () => fn({}),
    staleTime: 60_000,
  });
  const roles = data?.roles ?? [];

  const effectiveFn = useServerFn(adminGetMyEffectivePermissions);
  const { data: effectiveData, isLoading: isEffectiveLoading } = useQuery({
    queryKey: ["my-effective-permissions"],
    queryFn: () => effectiveFn({}),
    staleTime: 60_000,
  });

  return {
    roles,
    can: (a: PermissionAction) => {
      // While the effective-permissions query is still loading, fall back to
      // the hardcoded can() so UI doesn't flicker/hide incorrectly.
      if (isEffectiveLoading || !effectiveData) return can(roles, a);
      return effectiveData.permissions[a] ?? can(roles, a);
    },
    isSuperAdmin: roles.includes("super_admin") || roles.includes("admin"),
    isCoAdmin: roles.includes("co_admin"),
    isLoading: !data,
  };
}
