import React from "react";
import { CommunityAuthHero } from "@/src/features/community/components/CommunityAuthHero";
import { CommunityAuthTabs } from "@/src/features/community/components/CommunityAuthTabs";
import { CommunityAuthFooter } from "@/src/features/community/components/CommunityAuthFooter";

export default function CommunityAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen bg-[#f7faf6] flex flex-col lg:flex-row relative">
      {/* Desktop Left Hero Panel */}
      <CommunityAuthHero />

      {/* Right Content Area */}
      <section className="w-full min-h-screen lg:w-[45%] lg:ml-[55%] flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:px-12 lg:px-16 overflow-y-auto">
        <div className="w-full max-w-md my-auto py-6">
          {/* Mobile Header Branding */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-black text-[#0f6e56] font-headline tracking-tight">
                Voymate
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#0f6e56]/10 text-[#0f6e56] text-[10px] font-extrabold uppercase tracking-wider">
                Host Portal
              </span>
            </div>
            <p className="text-sm text-[#3f4944] font-medium">
              Lead community expeditions &amp; group adventures
            </p>
          </div>

          {/* Organizer Tabs (Login / Register Club) */}
          <CommunityAuthTabs />

          {/* Form Content */}
          {children}

          {/* Footer (Back to Voyager site, Terms, etc.) */}
          <CommunityAuthFooter />
        </div>
      </section>
    </main>
  );
}
