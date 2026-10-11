export type AdminRole = "Super Admin" | "Moderator" | "Analyst";

export function normalizeAdminRole(role?: string | null): AdminRole {
  if (!role) return "Super Admin";
  const cleaned = role.trim().toUpperCase().replace(/[\s-]+/g, "_");
  if (cleaned === "SUPER_ADMIN" || cleaned === "SUPERADMIN" || cleaned === "ADMIN") {
    return "Super Admin";
  }
  if (cleaned === "MODERATOR") {
    return "Moderator";
  }
  return "Analyst";
}

export function isSuperAdmin(role?: string | null): boolean {
  return normalizeAdminRole(role) === "Super Admin";
}

export function canManageAdmins(role?: string | null): boolean {
  return isSuperAdmin(role);
}

export function canModerateUsers(role?: string | null): boolean {
  const normalized = normalizeAdminRole(role);
  return normalized === "Super Admin" || normalized === "Moderator";
}

export function canManageVerifications(role?: string | null): boolean {
  const normalized = normalizeAdminRole(role);
  return normalized === "Super Admin" || normalized === "Moderator";
}
