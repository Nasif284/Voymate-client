"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";
import { CommunityOrganizerSidebar } from "@/src/features/community/components/organizer/CommunityOrganizerSidebar";
import { CommunityOrganizerHeader } from "@/src/features/community/components/organizer/CommunityOrganizerHeader";
import { CommunityVerificationBanner } from "@/src/features/community/components/organizer/CommunityVerificationBanner";
import { useCommunityMe } from "@/src/features/community/hooks/communityAuth.hooks";

export default function CommunityDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const community = useCommunityAuthStore((state) => state.community);
  const isAuthenticated = useCommunityAuthStore(
    (state) => state.isAuthenticated
  );
  const loading = useCommunityAuthStore((state) => state.loading);

  // Sync latest community profile, signed avatar URL, and verification status from server
  useCommunityMe();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !community) {
        router.replace("/community/login");
      } else if (!community.isOnboarded) {
        router.replace("/community/onboarding");
      }
    }
  }, [isAuthenticated, community, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7faf6] flex items-center justify-center text-[#0f6e56]">
        <div className="w-8 h-8 border-3 border-[#0f6e56] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !community) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f7faf6] flex font-body text-[#181d1a]">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0 shrink-0">
        <CommunityOrganizerSidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10">
            <CommunityOrganizerSidebar
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <CommunityOrganizerHeader
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <CommunityVerificationBanner />
        <main className="flex-1 pb-12">{children}</main>
      </div>
    </div>
  );
}
