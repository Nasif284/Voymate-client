"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Clock, ArrowRight } from "lucide-react";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";

export const CommunityVerificationBanner: React.FC = () => {
  const community = useCommunityAuthStore((state) => state.community);
  const status = community?.verificationStatus || "UNVERIFIED";

  if (status === "VERIFIED") {
    return null;
  }

  if (status === "PENDING") {
    return (
      <div className="bg-amber-50 border-b border-amber-200/80 px-4 sm:px-8 py-3 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Verification In Review:</strong> Our safety team is verifying your organizer credentials. You will be notified once approved.
          </span>
        </div>
        <Link
          href="/community/dashboard/verification"
          className="font-bold underline text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 shrink-0"
        >
          <span>View Status</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 sm:px-8 py-3 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
      <div className="flex items-center gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#0f6e56] shrink-0" />
        <span>
          <strong>Become a Verified Community Host:</strong> Submit your club/organizer registration or ID to earn the Verified badge and boost traveler registrations.
        </span>
      </div>
      <Link
        href="/community/dashboard/verification"
        className="px-3 py-1.5 rounded-lg bg-[#0f6e56] hover:bg-[#005440] text-white font-bold text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
      >
        <span>Submit Verification</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
