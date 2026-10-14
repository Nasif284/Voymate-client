"use client";

import React from "react";
import { Compass, Users, ShieldCheck, Sparkles } from "lucide-react";

export const CommunityAuthHero = () => {
  return (
    <section className="hidden fixed lg:flex lg:w-[55%] h-screen flex-col justify-between p-12 overflow-hidden">
      {/* Background Image: High-res outdoor expedition & community gathering */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1600&auto=format&fit=crop')`,
        }}
        aria-label="Campfire gathering in the mountains under stars"
        role="img"
      />
      {/* Ambient green overlay to keep consistent Voymate branding */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00382b]/95 via-[#005440]/80 to-black/35 z-10" />

      {/* Top Header */}
      <div className="relative z-20 flex items-center gap-3">
        <span className="text-2xl font-black text-white drop-shadow-md font-headline tracking-tight">
          Voymate
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[#a0f3d4] text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md">
          Host Portal
        </span>
      </div>

      {/* Middle Content */}
      <div className="relative z-20 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#a0f3d4] text-xs font-bold mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curate Expeditions &amp; Stranger Camps</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight font-headline">
          Lead the Adventure. Build Your Community.
        </h2>
        <p className="text-base sm:text-lg text-emerald-100/90 mb-8 leading-relaxed font-medium">
          Voymate empowers travel clubs, certified trek leaders, and outdoor organizers to host unforgettable journeys with verified solo travelers.
        </p>

        <ul className="space-y-4">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Community Host Status",
              desc: "Gain trust with travelers through government and business verification.",
            },
            {
              icon: Users,
              title: "Automated Rosters & Digital Passes",
              desc: "Real-time attendee rosters and instant digital passes for every joined voyager.",
            },
            {
              icon: Compass,
              title: "Transparent Free & Paid Expeditions",
              desc: "Collect slot fees securely with automated Razorpay payouts & escrow.",
            },
          ].map((item) => (
            <li key={item.title} className="flex items-start gap-3.5">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-[#a0f3d4] shrink-0 mt-0.5">
                <item.icon className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs text-white/80 mt-0.5">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-20 flex items-center justify-between text-white/70 text-xs">
        <span className="uppercase tracking-widest font-mono">
          © 2026 Voymate Community Platform
        </span>
        <span className="font-medium">Organizer Ecosystem</span>
      </div>
    </section>
  );
};
