"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuthStore } from "@/src/store/adminAuth.store";
import { canManageAdmins } from "../utils/admin-rbac.utils";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { admin, isAuthenticated } = useAdminAuthStore();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // 1. Must be authenticated
    if (!isAuthenticated || !admin) {
      router.replace("/admin/login");
      return;
    }

    // 2. Admins management is strictly restricted to Super Admin
    if (pathname.startsWith("/admin/admins") && !canManageAdmins(admin.role)) {
      router.replace("/admin/dashboard");
      return;
    }

    setAuthorized(true);
  }, [admin, isAuthenticated, pathname, router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcf9f5]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0f6e56] border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
