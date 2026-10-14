import Link from "next/link";
import { Compass, ArrowRight, ShieldCheck } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-[#bec9c3]/20">
      {/* High-Contrast Conversion Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 mb-16 relative z-10">
        <div className="bg-[#005440] rounded-3xl p-8 sm:p-14 text-white text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a0f3d4] bg-white/10 px-3 py-1 rounded-full inline-block">
              Start Exploring Today
            </span>
            <h2 className="font-headline text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Your next journey shouldn't wait for hesitant friends.
            </h2>
            <p className="text-sm sm:text-base text-[#a0f3d4]/90">
              Create your profile, publish your destinations, and find compatible companions across India.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-[#a0f3d4] hover:bg-[#84d6b9] text-[#005440] font-black text-sm sm:text-base px-8 py-4 rounded-full shadow-md transition-all active:scale-95"
            >
              <span>Find Your Travel Buddy</span>
              <ArrowRight className="w-5 h-5 text-[#005440]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#005440] text-white flex items-center justify-center shadow-xs">
                <Compass className="w-5 h-5 text-[#a0f3d4]" />
              </div>
              <span className="font-headline font-black text-xl tracking-tight text-[#181d1a]">
                Voymate
              </span>
            </Link>
            <p className="text-xs text-[#3f4944] leading-relaxed">
              The social travel companion platform for solo explorers, backpackers, and community expeditions.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-[#181d1a] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[#3f4944]">
              <li>
                <a href="#features" className="hover:text-[#005440] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#005440] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link href="/community-trips" className="hover:text-[#005440] transition-colors">
                  Community Trips
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#005440] transition-colors">
                  Traveler Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Trust */}
          <div>
            <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-[#181d1a] mb-4">
              Trust & Safety
            </h4>
            <ul className="space-y-2.5 text-xs text-[#3f4944]">
              <li>
                <a href="#safety" className="hover:text-[#005440] transition-colors">
                  Optional ID Verification
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-[#005440] transition-colors">
                  Privacy Settings
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-[#005440] transition-colors">
                  Safety Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-[#181d1a] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-[#3f4944]">
              <li>
                <span className="hover:text-[#005440] cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#005440] cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-[#005440] cursor-pointer transition-colors">
                  Community Guidelines
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#bec9c3]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6f7a74]">
          <p>© 2026 Voymate Technologies. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[#476459]">
            <ShieldCheck className="w-4 h-4 text-[#005440]" />
            <span>Built for authentic, secure travel companion discovery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
