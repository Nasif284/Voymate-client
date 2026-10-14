import Link from "next/link";
import {
  Compass,
  MapPin,
  Luggage,
  ShieldCheck,
  Video,
  Calendar,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c9eadb]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 text-left space-y-6 md:space-y-8">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebefeb] border border-[#bec9c3]/30 text-[#005440] text-xs sm:text-sm font-semibold tracking-tight">
              <Sparkles className="w-4 h-4 text-[#005440]" />
              <span>Next-Generation Travel Companion Platform</span>
            </div>

            {/* Headline */}
            <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-[#181d1a] tracking-tight leading-[1.12]">
              Find like-minded travel companions.{" "}
              <span className="text-[#005440]">Explore on your own terms.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3f4944] max-w-2xl leading-relaxed">
              Match with solo travelers based on destination overlap, travel style,
              budget, and personality synergy. Discover nearby travelers on the road
              and join curated community expeditions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2.5 bg-[#005440] hover:bg-[#0f6e56] text-white font-semibold text-base px-7 py-3.5 rounded-full shadow-sm transition-all active:scale-95"
              >
                <span>Find Travel Buddies</span>
                <ArrowRight className="w-5 h-5 text-[#a0f3d4]" />
              </Link>
              <a
                href="#community-trips"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#ebefeb] text-[#181d1a] border border-[#bec9c3]/40 font-semibold text-base px-6 py-3.5 rounded-full transition-all active:scale-95"
              >
                <Luggage className="w-5 h-5 text-[#005440]" />
                <span>Explore Community Trips</span>
              </a>
            </div>

            {/* Under-CTA Feature Points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#476459]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#005440]" />
                <span>5-Factor Compatibility Algorithm</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#005440]" />
                <span>Optional ID Verification Badge</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#005440]" />
                <span>In-App Audio & Video Calling</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity UI Card Simulation */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Background Accent Card Backing */}
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-[#bec9c3]/30 relative transition-transform hover:-translate-y-1 duration-300">
              
              {/* Card Cover Header with Real Tags */}
              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#005440] to-[#2f4c42]">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Varkala Destination"
                  className="w-full h-full object-cover opacity-85"
                />

                {/* Optional Verification Badge */}
                <div className="absolute top-3 left-3 bg-[#005440]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1.5 border border-[#a0f3d4]/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a0f3d4]" />
                  <span>Optional ID Verified</span>
                </div>

                {/* Compatibility Score Pill */}
                <div className="absolute top-3 right-3 bg-white/95 text-[#005440] text-xs font-black px-3 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1">
                  <span>94% Compatibility</span>
                </div>

                {/* Proximity / Distance Tag */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#a0f3d4]" />
                  <span>4.2 km away</span>
                </div>
              </div>

              {/* Avatar Overlap */}
              <div className="relative -mt-9 sm:-mt-12 ml-4 flex items-end justify-between pr-2">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-4 border-white shadow-md overflow-hidden bg-[#ebefeb]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Traveler Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-1.5 pb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c9eadb]/60 text-[#005440] text-xs font-bold">
                    <Video className="w-3 h-3 text-[#005440]" />
                    <span>Call Enabled</span>
                  </span>
                </div>
              </div>

              {/* Profile Bio Details */}
              <div className="pt-3 px-1 text-left space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-headline text-[#181d1a]">
                    Sarah Joseph, 24
                  </h3>
                  <p className="text-xs text-[#3f4944] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#005440]" />
                    <span>Varkala, Kerala · India</span>
                  </p>
                </div>

                {/* Active Trip Overlap */}
                <div className="p-2.5 rounded-xl bg-[#f1f4f1] border border-[#bec9c3]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Luggage className="w-4 h-4 text-[#005440] shrink-0" />
                    <span className="text-xs font-semibold text-[#181d1a] truncate">
                      Gokarna Beach Trail
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#476459] font-medium shrink-0">
                    <Calendar className="w-3 h-3 text-[#005440]" />
                    <span>Oct 24 - 28</span>
                  </div>
                </div>

                {/* Personality & Travel Style Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#ebefeb] text-[#181d1a] text-[11px] font-medium">
                    Backpacker
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#ebefeb] text-[#181d1a] text-[11px] font-medium">
                    Introvert
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#ebefeb] text-[#181d1a] text-[11px] font-medium">
                    Budget Tier
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#c9eadb]/50 text-[#005440] text-[11px] font-semibold">
                    Trekking
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#c9eadb]/50 text-[#005440] text-[11px] font-semibold">
                    Photography
                  </span>
                </div>

                {/* Mock Action Row */}
                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href="/signup"
                    className="flex-1 py-2.5 bg-[#005440] text-white rounded-xl text-xs font-bold text-center hover:bg-[#0f6e56] transition-colors shadow-2xs"
                  >
                    Connect Mate
                  </Link>
                  <Link
                    href="/signup"
                    className="px-3.5 py-2.5 bg-[#ebefeb] text-[#181d1a] rounded-xl text-xs font-semibold hover:bg-[#e0e3e0] transition-colors"
                  >
                    View Plan
                  </Link>
                </div>
              </div>

              {/* Floating Pill: Compatibility Breakdown */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#bec9c3]/30 items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c9eadb] flex items-center justify-center text-[#005440]">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-[#181d1a]">Matched Itinerary</p>
                  <p className="text-[#3f4944] text-[11px]">Destination & Dates Aligned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
