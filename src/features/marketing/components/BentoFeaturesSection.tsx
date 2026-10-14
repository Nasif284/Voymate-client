import {
  SlidersHorizontal,
  Navigation,
  Video,
  Bot,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

export default function BentoFeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-[#f7faf6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebefeb] border border-[#bec9c3]/30 text-[#005440] text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#005440]" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#181d1a] tracking-tight">
            Designed for How Travelers Actually Connect
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#3f4944] leading-relaxed">
            Eliminate awkward travel dynamics. Voymate pairs travelers using structured
            itinerary data, travel habits, and private communication tools.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Card 1: 5-Factor Compatibility Algorithm (Large - 7 cols) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#bec9c3]/25 shadow-xs text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] mb-6">
                <SlidersHorizontal className="w-6 h-6 text-[#005440]" />
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#181d1a]">
                Multi-Factor Compatibility Matching
              </h3>
              <p className="text-sm sm:text-base text-[#3f4944] mt-2.5 leading-relaxed">
                Our algorithm scores candidates across 5 core dimensions to ensure
                mutual expectations align before you take off.
              </p>
            </div>

            {/* Visual Breakdown UI */}
            <div className="mt-8 pt-6 border-t border-[#bec9c3]/20 space-y-3.5 bg-[#f7faf6] p-5 rounded-2xl">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#181d1a]">Destination Alignment</span>
                  <span className="text-[#005440]">30 / 30 Pts</span>
                </div>
                <div className="w-full h-2 bg-[#e0e3e0] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#005440] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#181d1a]">Travel Date Overlap</span>
                  <span className="text-[#005440]">20 / 20 Pts</span>
                </div>
                <div className="w-full h-2 bg-[#e0e3e0] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#005440] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#181d1a]">Personality Synergy (Introvert / Ambivert)</span>
                  <span className="text-[#005440]">15 / 15 Pts</span>
                </div>
                <div className="w-full h-2 bg-[#e0e3e0] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#005440] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#181d1a]">Style (Adventure) & Budget Tier (Moderate)</span>
                  <span className="text-[#005440]">18 / 20 Pts</span>
                </div>
                <div className="w-full h-2 bg-[#e0e3e0] rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-[#005440] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Proximity Radar (Medium - 5 cols) */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-10 border border-[#bec9c3]/25 shadow-xs text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] mb-6">
                <Navigation className="w-6 h-6 text-[#005440]" />
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#181d1a]">
                Live Proximity Radar
              </h3>
              <p className="text-sm sm:text-base text-[#3f4944] mt-2.5 leading-relaxed">
                Traveling right now? Enable your traveling status to surface
                other solo adventurers currently in the same town, beach, or hostel hub.
              </p>
            </div>

            {/* Radar Simulation Card */}
            <div className="mt-8 pt-4">
              <div className="p-4 rounded-2xl bg-[#f1f4f1] border border-[#bec9c3]/20 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#005440] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  <MapPin className="w-5 h-5 text-[#a0f3d4]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-[#181d1a] truncate">Alex M., 26</p>
                    <span className="text-xs font-bold text-[#005440] bg-[#c9eadb]/60 px-2 py-0.5 rounded-full">
                      1.8 km away
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4944] truncate mt-0.5">
                    Currently in Old Manali · Looking for hiking mates
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: In-App WebRTC Calling (5 cols) */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-10 border border-[#bec9c3]/25 shadow-xs text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] mb-6">
                <Video className="w-6 h-6 text-[#005440]" />
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#181d1a]">
                In-App Audio & Video Calling
              </h3>
              <p className="text-sm sm:text-base text-[#3f4944] mt-2.5 leading-relaxed">
                Connect over 1-on-1 audio and video calls before confirming your trip.
                No phone numbers, WhatsApp, or Instagram handles required.
              </p>
            </div>

            <div className="mt-8 pt-4">
              <div className="p-4 rounded-2xl bg-[#005440] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#a0f3d4] animate-pulse" />
                  <span className="text-xs font-semibold">1-on-1 Peer WebRTC Ready</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#a0f3d4]">
                  Private & Direct
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Vector AI Itinerary Assistant (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#bec9c3]/25 shadow-xs text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] mb-6">
                <Bot className="w-6 h-6 text-[#005440]" />
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#181d1a]">
                Contextual AI Travel Concierge
              </h3>
              <p className="text-sm sm:text-base text-[#3f4944] mt-2.5 leading-relaxed">
                Powered by semantic vector memory, Voymate's AI assistant creates
                day-by-day itineraries, packing checklists, and local recommendations
                tailored to your budget and travel pace.
              </p>
            </div>

            {/* AI Prompt Snippet UI */}
            <div className="mt-8 pt-4 space-y-2.5">
              <div className="p-3.5 rounded-xl bg-[#ebefeb] text-xs text-[#181d1a] font-medium text-left">
                "Suggest a 4-day budget backpacking itinerary for Munnar with trekking and local tea trails."
              </div>
              <div className="p-3.5 rounded-xl bg-[#c9eadb]/40 border border-[#005440]/15 text-xs text-[#005440] font-semibold text-left flex items-start gap-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Day 1: Chokramudi sunrise trek · Day 2: Meesapulimala high ridge ·
                  Estimated budget: ₹3,200 total per person.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
