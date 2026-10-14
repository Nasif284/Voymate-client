"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Users,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";
import { useCommunityLogout } from "../../hooks/communityAuth.hooks";

interface CommunityOrganizerSidebarProps {
  onCloseMobile?: () => void;
}

export const CommunityOrganizerSidebar: React.FC<
  CommunityOrganizerSidebarProps
> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const community = useCommunityAuthStore((state) => state.community);
  const logoutMutation = useCommunityLogout();

  const navItems = [
    {
      label: "Overview",
      href: "/community/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "My Expeditions",
      href: "/community/dashboard/trips",
      icon: CalendarDays,
      exact: false,
    },
    {
      label: "Host New Trip",
      href: "/community/dashboard/trips/create",
      icon: PlusCircle,
      exact: true,
    },
    {
      label: "Attendees & Rosters",
      href: "/community/dashboard/bookings",
      icon: Users,
      exact: false,
    },
    {
      label: "Host Verification",
      href: "/community/dashboard/verification",
      icon: ShieldCheck,
      exact: true,
    },
  ];

  const getVerificationBadge = () => {
    const status = community?.verificationStatus || "UNVERIFIED";
    if (status === "VERIFIED") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Verified Host</span>
        </span>
      );
    }
    if (status === "PENDING") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>Under Review</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-bold">
        <AlertCircle className="w-3 h-3 text-neutral-500" />
        <span>Unverified</span>
      </span>
    );
  };

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 sm:w-72 h-full bg-[#002f23] text-white flex flex-col justify-between p-5 select-none border-r border-white/10">
      {/* Brand & Club Header */}
      <div>
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link href="/community/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-black text-white font-headline tracking-tight">
              Voymate
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#a0f3d4] text-[10px] font-extrabold uppercase tracking-wider">
              Host Portal
            </span>
          </Link>
        </div>

        {/* Community Identity Card */}
        <div className="my-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-900/60 overflow-hidden border border-white/20 shrink-0 flex items-center justify-center">
            {community?.avatarUrl ? (
              <img
                src={community.avatarUrl}
                alt={community.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Compass className="w-6 h-6 text-[#a0f3d4]" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white truncate">
              {community?.name || "Community Host"}
            </h3>
            <div className="mt-1">{getVerificationBadge()}</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 mt-2" aria-label="Organizer navigation">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#0f6e56] text-white shadow-sm font-bold"
                    : "text-emerald-100/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link
          href="/community-trips"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-200/80 hover:bg-white/10 hover:text-white transition-all"
        >
          <span>Traveler Marketplace</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Organizer</span>
        </button>
      </div>
    </aside>
  );
};
