import React from "react";
import Link from "next/link";
import { HelpCircle, LogOut } from "lucide-react";

export default function CommunityOnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#f7faf6] min-h-screen flex flex-col font-body text-[#181d1a]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#f7faf6]/90 backdrop-blur-md border-b border-[#bec9c3]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/community/login" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-[#0f6e56] font-headline tracking-tight">
              Voymate
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#0f6e56]/10 text-[#0f6e56] text-[10px] font-extrabold uppercase tracking-wider">
              Host Portal
            </span>
          </Link>
          <span className="hidden sm:inline-block text-xs font-semibold text-[#6f7a74] border-l border-[#bec9c3]/30 pl-3">
            Organizer Onboarding
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/support"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6f7a74] hover:text-[#005440] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Organizer Support</span>
          </Link>
          <Link
            href="/community/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c8372d] hover:underline"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-xs text-[#6f7a74] border-t border-[#bec9c3]/15">
        <p>© 2026 Voymate Community Platform. Secure Organizer Onboarding.</p>
      </footer>
    </div>
  );
}
