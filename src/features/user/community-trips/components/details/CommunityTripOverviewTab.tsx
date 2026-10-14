"use client";

import { Sparkles } from "lucide-react";
import { CommunityTripItem } from "../../types";

interface CommunityTripOverviewTabProps {
  trip: CommunityTripItem;
  isFree: boolean;
}

export default function CommunityTripOverviewTab({
  trip,
  isFree,
}: Readonly<CommunityTripOverviewTabProps>) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Vibe Pill */}
      <div className="bg-[#eef8f4] p-4 rounded-2xl border border-[#c9eadb] flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#005440] text-white flex items-center justify-center shrink-0 shadow-xs">
          <Sparkles className="w-5 h-5 text-[#a0f3d4]" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#005440]">
            The Community Vibe
          </p>
          <p className="text-xs sm:text-sm font-bold text-[#181d1a]">
            {trip.vibe}
          </p>
        </div>
      </div>

      {/* Story */}
      <div>
        <h3 className="text-base font-extrabold text-[#181d1a] font-headline mb-2.5">
          About This Experience
        </h3>
        <p className="text-xs sm:text-sm text-[#3f4944] leading-relaxed">
          {trip.description}
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className="bg-[#f7faf6] p-3.5 rounded-2xl border border-[#bec9c3]/20">
          <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Experience Type</p>
          <p className="text-xs sm:text-sm font-bold text-[#181d1a] mt-0.5">
            {trip.category}
          </p>
        </div>
        <div className="bg-[#f7faf6] p-3.5 rounded-2xl border border-[#bec9c3]/20">
          <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Group Limit</p>
          <p className="text-xs sm:text-sm font-bold text-[#181d1a] mt-0.5">
            Max {trip.maxCapacity} Voyagers
          </p>
        </div>
        <div className="bg-[#f7faf6] p-3.5 rounded-2xl border border-[#bec9c3]/20 col-span-2 sm:col-span-1">
          <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Pricing Policy</p>
          <p className="text-xs sm:text-sm font-bold text-[#005440] mt-0.5">
            {isFree ? "Free Entry" : `₹${trip.price?.toLocaleString("en-IN")}`}
          </p>
        </div>
      </div>

      {/* Themes */}
      <div>
        <p className="text-[11px] uppercase font-extrabold text-[#3f4944] tracking-wider mb-2">
          Community Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {(trip.tags || []).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-xl bg-[#e0e3e0]/60 text-xs font-semibold text-[#181d1a]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
