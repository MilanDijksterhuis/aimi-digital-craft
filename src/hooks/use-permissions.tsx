import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminGetMyRoles } from "@/lib/admin.functions";
import { can, type PermissionAction } from "@/lib/rbac";

export function usePermissions() {
  const fn = useServerFn(adminGetMyRoles);
  const { data } = useQuery({
    queryKey: ["my-roles"],
    queryFn: () => fn({}),
    staleTime: 60_000,
  });
  const roles = data?.roles ?? [];
  return {
    roles,
    can: (a: PermissionAction) => can(roles, a),
    isSuperAdmin: roles.includes("super_admin") || roles.includes("admin"),
    isCoAdmin: roles.includes("co_admin"),
    isLoading: !data,
  };
}
