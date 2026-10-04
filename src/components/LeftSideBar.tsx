"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "../features/user/auth/hooks/auth.hooks";
import { AiAssistantIcon, ChatIcon, ConnectionsIcon, ExploreIcon, HeartIcon, HomeIcon, PersonIcon, SettingsIcon } from "../assets/icons";
import { useEffect } from "react";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    href: "/matches",
    label: "Matches",
    icon: <HeartIcon />,
  },
  {
    href: "/connections",
    label: "Connections",
    icon: <ConnectionsIcon />,
  },
  {
    href: "/trips/plans/active",
    label: "Trips",
    icon: <ExploreIcon />,
  },
  {
    href: "/ai-assistant",
    label: "AI Assistant",
    icon: <AiAssistantIcon />,
  },
  {
    href: "/messages",
    label: "Messages",
    icon: <ChatIcon />,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: <PersonIcon />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <SettingsIcon />,
  },
];

interface LeftSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function LeftSidebar({ mobileOpen = false, onMobileClose }: LeftSidebarProps) {
  const pathname = usePathname();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
    if (onMobileClose) onMobileClose();
  };

  // Close mobile drawer on route change
  useEffect(() => {
    if (onMobileClose) {
      onMobileClose();
    }
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navContent = (
    <div className="flex flex-col h-full py-5 px-5 sm:py-6 sm:px-6">
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="text-2xl font-black text-[#0F6E56] font-headline tracking-tight">Voymate</div>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            aria-label="Close menu"
            className="lg:hidden p-2 rounded-full hover:bg-black/5 text-[#3f4944] active:scale-95 transition-all cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation List Container with Hidden Scrollbar */}
      <div 
        className="mb-2 flex-grow overflow-y-auto hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <p className="font-headline font-bold text-xs text-[#0F6E56] opacity-60 uppercase tracking-widest mb-3 sm:mb-4">
          Main Menu
        </p>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-xl font-headline font-bold text-sm tracking-tight transition-all active:scale-[0.98] ${
                  active 
                    ? "text-[#0F6E56] border-r-4 border-[#0F6E56] bg-white/70 shadow-xs" 
                    : "text-[#181d1a] opacity-75 hover:bg-[#e0e3e0] hover:opacity-100"
                }`}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="mt-auto pt-3 sm:pt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-[#0f6e56] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-[#005440] shadow-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-[#f1f4f1] flex-col z-50 border-r border-[#bec9c3]/15">
        {navContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={onMobileClose}
          />
          <aside className="relative w-72 max-w-[80vw] h-full bg-[#f1f4f1] shadow-2xl z-50 animate-slide-in-left">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}


