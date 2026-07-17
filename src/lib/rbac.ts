// Client-safe RBAC constants & helpers
export type AppRole =
  | "super_admin"
  | "co_admin"
  | "support_agent"
  | "viewer"
  | "sales"
  | "admin" // legacy alias
  | "customer";

export const ROLE_LABEL: Record<AppRole, string> = {
  super_admin: "Super Admin",
  co_admin: "Co-Admin",
  support_agent: "Support Agent",
  viewer: "Viewer",
  sales: "Sales",
  admin: "Admin (legacy)",
  customer: "Klant",
};

export const STAFF_ROLES: AppRole[] = [
  "super_admin",
  "co_admin",
  "support_agent",
  "viewer",
  "sales",
  "admin",
];

export function isStaffRole(r: string) {
  return STAFF_ROLES.includes(r as AppRole);
}

// ---- Server-side guard rol-sets (single source of truth voor auth-guards.server.ts) ----
// Bewust gescheiden van STAFF_ROLES (client "is dit teamlid", incl. sales). De
// server-staff-guard sluit sales uit — dat is het bestaande gedrag; hier
// gecentraliseerd zodat de sets niet meer per bestand kunnen driften.
export const ADMIN_LIKE_ROLES: AppRole[] = ["super_admin", "co_admin", "admin"];
export const SUPER_ADMIN_ROLES: AppRole[] = ["super_admin", "admin"];
export const STAFF_GUARD_ROLES: AppRole[] = ["super_admin", "co_admin", "support_agent", "viewer", "admin"];

// Canonical list of every permission action. Single source of truth for both
// the client UI (usePermissions) and the server-side effective-permission
// computation (permissions.server.ts).
export const ALL_PERMISSION_ACTIONS: PermissionAction[] = [
  "view_admin",
  "view_all_changes",
  "edit_change_status",
  "edit_change_fields",
  "delete_change_soft",
  "delete_change_hard",
  "restore_change",
  "force_paid",
  "create_change_for_customer",
  "manage_customers",
  "generate_invoice",
  "export_csv",
  "view_audit_log",
  "manage_team",
  "chat_with_customers",
  "leads_view",
  "leads_manage",
  "website_links_view",
  "website_links_manage",
  "appointments_manage",
  "alerts_view",
];

// Permission helpers — single source of truth for UI gating
export function can(roles: string[], action: PermissionAction): boolean {
  const set = new Set(roles);
  const isSuper = set.has("super_admin") || set.has("admin");
  const isCo = set.has("co_admin");
  const isSupport = set.has("support_agent");
  const isViewer = set.has("viewer");
  const isSales = set.has("sales");
  const adminLike = isSuper || isCo;

  switch (action) {
    case "view_admin":
      return isSuper || isCo || isSupport || isViewer || isSales;
    case "leads_view":
      return isSuper || isSales;
    case "leads_manage":
      return isSuper || isSales;
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
    case "website_links_view":
      return isSuper || isCo || isSupport || isViewer;
    case "website_links_manage":
      return adminLike;
    case "appointments_manage":
      return isSuper || isCo || isSupport;
    case "alerts_view":
      return isSuper || isCo || isSupport || isViewer;
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
  | "chat_with_customers"
  | "leads_view"
  | "leads_manage"
  | "website_links_view"
  | "website_links_manage"
  | "appointments_manage"
  | "alerts_view";
