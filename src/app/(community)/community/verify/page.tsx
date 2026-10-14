import { Metadata } from "next";
import Link from "next/link";
import { CommunityVerifyEmailPage } from "@/src/features/community/pages/CommunityVerifyEmailPage";

export const metadata: Metadata = {
  title: "Verify Organizer Email | Voymate Host Portal",
  description: "Verify your email address to activate your community organizer account.",
};

export default function VerifyPage() {
  return (
    <div className="bg-[#f7faf6] min-h-screen flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full py-6 px-6 sm:px-12 flex justify-between items-center border-b border-[#bec9c3]/15">
        <Link href="/community/login" className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#0f6e56] font-headline tracking-tight">
            Voymate
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#0f6e56]/10 text-[#0f6e56] text-[10px] font-extrabold uppercase tracking-wider">
            Host Portal
          </span>
        </Link>
        <Link
          href="/community-trips"
          className="text-xs font-semibold text-[#6f7a74] hover:text-[#005440] transition-colors"
        >
          Traveler View
        </Link>
      </header>

      {/* Main Verification Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#bec9c3]/20">
          <CommunityVerifyEmailPage />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-xs text-[#6f7a74] border-t border-[#bec9c3]/15">
        <span>© 2026 Voymate Community Host Ecosystem. All rights reserved.</span>
      </footer>
    </div>
  );
}
