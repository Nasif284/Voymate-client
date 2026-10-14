"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAdminAuthStore } from "@/src/store/adminAuth.store";

export default function AdminTopBar() {
  const admin = useAdminAuthStore((state) => state.admin);
  const pathname = usePathname();

  const pageTitle = pathname.startsWith("/admin/dashboard")
    ? "Dashboard"
    : pathname.startsWith("/admin/users")
    ? "User Directory"
    : pathname.startsWith("/admin/verifications")
    ? "Verifications"
    : pathname.startsWith("/admin/admins")
    ? "Administrators"
    : "Voymate Admin";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-14 fixed top-0 right-0 left-60 z-10 bg-white/90 backdrop-blur-xl border-b border-stone-200/50 flex items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-bold text-[#1c1c1a]">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-8 w-px bg-[#bec9c3]/30 mx-1" />

        <div className="flex items-center gap-3 pl-2 pr-1 py-1">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-[#1c1c1a] leading-tight">
              {mounted ? admin?.fullName : ""}
            </span>
            <span className="text-[10px] text-[#3f4944] leading-none">
              {mounted ? admin?.role : ""}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
