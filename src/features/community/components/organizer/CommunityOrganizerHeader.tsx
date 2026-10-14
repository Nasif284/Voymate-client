"use client";

import React from "react";
import Link from "next/link";
import { Menu, Plus, ShieldCheck } from "lucide-react";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";

interface CommunityOrganizerHeaderProps {
  onOpenMobileMenu: () => void;
}

export const CommunityOrganizerHeader: React.FC<
  CommunityOrganizerHeaderProps
> = ({ onOpenMobileMenu }) => {
  const community = useCommunityAuthStore((state) => state.community);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-[#bec9c3]/25 px-4 sm:px-8 flex items-center justify-between">
      {/* Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#3f4944] hover:bg-neutral-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <span className="text-xs font-bold text-[#6f7a74] uppercase tracking-wider">
            Community Organizer Console
          </span>
          <h2 className="text-base font-black text-[#181d1a] leading-tight">
            {community?.name || "Organizer Portal"}
          </h2>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {community?.verificationStatus === "VERIFIED" && (
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Organizer</span>
          </span>
        )}

        <Link
          href="/community/dashboard/trips/create"
          className="h-10 px-4 rounded-xl bg-[#0f6e56] hover:bg-[#005440] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Host Expedition</span>
        </Link>
      </div>
    </header>
  );
};
