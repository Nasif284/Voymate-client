"use client";

import CallModals from "@/src/components/call/CallModals";
import LeftSidebar from "@/src/components/LeftSideBar";
import MobileBottomNav from "@/src/components/MobileBottomNav";
import AuthProvider from "@/src/components/providers/AuthProvider";
import CallProvider from "@/src/components/providers/CallProvider";
import TopBar from "@/src/components/TopBar";
import React, { useState } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <CallProvider>
        <div className="bg-[#f7faf6] text-[#181d1a] min-h-screen relative flex flex-col">
          <LeftSidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />
          <TopBar onMenuClick={() => setMobileMenuOpen(true)} />
          <div className="flex-1 w-full pb-16 lg:pb-0">
            {children}
          </div>
          <MobileBottomNav />
        </div>
        <CallModals />
      </CallProvider>
    </AuthProvider>
  );
};

export default Layout;
