// Client-safe RBAC constants & helpers
export type AppRole =
  | "super_admin"
  | "co_admin"
  | "support_agent"
  | "viewer"
  | "admin" // legacy alias
  | "customer";

export const ROLE_LABEL: Record<AppRole, string> = {
  super_admin: "Super Admin",
  co_admin: "Co-Admin",
  support_agent: "Support Agent",
  viewer: "Viewer",
  admin: "Admin (legacy)",
  customer: "Klant",
};

export const STAFF_ROLES: AppRole[] = [
  "super_admin",
  "co_admin",
  "support_agent",
  "viewer",
  "admin",
];

export function isStaffRole(r: string) {
  return STAFF_ROLES.includes(r as AppRole);
}

// Permission helpers — single source of truth for UI gating
export function can(roles: string[], action: PermissionAction): boolean {
  const set = new Set(roles);
  const isSuper = set.has("super_admin") || set.has("admin");
  const isCo = set.has("co_admin");
  const isSupport = set.has("support_agent");
  const isViewer = set.has("viewer");
  const adminLike = isSuper || isCo;

  switch (action) {
    case "view_admin":
      return isSuper || isCo || isSupport || isViewer;
    case "view_all_changes":
      return isSuper || isCo || isSupport || isViewer;
    case "edit_change_status":
      return isSuper || isCo || isSupport;
    case "edit_change_fields":
      return adminLike;
    case "delete_change_soft":
      return adminLike;
    case "delete_change_hard":
      return isSuper;
    case "restore_change":
      return isSuper;
    case "force_paid":
      return adminLike;
    case "create_change_for_customer":
      return adminLike;
    case "manage_customers":
      return adminLike;
    case "generate_invoice":
      return adminLike;
    case "export_csv":
      return adminLike;
    case "view_audit_log":
      return isSuper;
    case "manage_team":
      return isSuper;
    case "chat_with_customers":
      return isSuper || isCo || isSupport;
    default:
      return false;
  }
}

export type PermissionAction =
  | "view_admin"
  | "view_all_changes"
  | "edit_change_status"
  | "edit_change_fields"
  | "delete_change_soft"
  | "delete_change_hard"
  | "restore_change"
  | "force_paid"
  | "create_change_for_customer"
  | "manage_customers"
  | "generate_invoice"
  | "export_csv"
  | "view_audit_log"
  | "manage_team"
  | "chat_with_customers";
