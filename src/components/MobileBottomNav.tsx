"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Compass, MessageSquare, User } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const BOTTOM_NAV_ITEMS: NavItem[] = [
  {
    href: "/home",
    label: "Home",
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: "/matches",
    label: "Matches",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    href: "/trips/plans/active",
    label: "Trips",
    icon: <Compass className="w-5 h-5" />,
  },
  {
    href: "/messages",
    label: "Messages",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: <User className="w-5 h-5" />,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#bec9c3]/20 flex items-center justify-around z-40 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      {BOTTOM_NAV_ITEMS.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full gap-1 transition-all active:scale-95 ${
              active ? "text-[#0F6E56] font-bold" : "text-[#3f4944] opacity-70 hover:opacity-100"
            }`}
          >
            <div className={`p-1 rounded-full transition-colors ${active ? "bg-[#c9eadb]/40" : ""}`}>
              {item.icon}
            </div>
            <span className="text-[10px] tracking-tight font-headline">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
