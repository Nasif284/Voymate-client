"use client";

import { Search, Luggage, RotateCcw, ArrowRight } from "lucide-react";
import { SearchFilterParams } from "./DestinationSearchFilter";

interface MatchEmptyStateProps {
  mode: "TRIP" | "SEARCH";
  activeTripDestination?: string;
  appliedSearch: SearchFilterParams | null;
  onExploreOther: () => void;
  onSwitchTrip: () => void;
  onResetSearch: () => void;
  onCreateTrip: () => void;
}

export default function MatchEmptyState({
  mode,
  activeTripDestination,
  appliedSearch,
  onExploreOther,
  onSwitchTrip,
  onResetSearch,
  onCreateTrip,
}: Readonly<MatchEmptyStateProps>) {
  if (mode === "TRIP") {
    return (
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fbf9] to-[#edf6f2] rounded-2xl sm:rounded-3xl border border-[#bec9c3]/20 shadow-xs p-6 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl sm:rounded-3xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] mb-4 sm:mb-6 shadow-xs">
          <Luggage className="w-8 h-8 sm:w-10 sm:h-10 text-[#005440]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-[#181d1a] font-headline">
          No Direct Matches for This Trip Yet
        </h3>

        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#3f4944] leading-relaxed max-w-md mx-auto">
          We haven&apos;t found other travelers heading to{" "}
          <span className="font-semibold text-[#181d1a]">
            {activeTripDestination || "your destination"}
          </span>{" "}
          on your exact dates yet. Explore companions heading to other destinations or switch your active trip.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExploreOther}
            className="px-5 py-2.5 rounded-xl bg-[#005440] text-white text-xs sm:text-sm font-bold hover:bg-[#003e2f] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Explore Other Destinations</span>
          </button>

          <button
            onClick={onSwitchTrip}
            className="px-4 py-2.5 rounded-xl border border-[#005440] text-[#005440] text-xs sm:text-sm font-bold hover:bg-[#eef8f4] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
          >
            <Luggage className="w-4 h-4" />
            <span>Switch Active Trip</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 text-center px-4 bg-white/70 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/20 shadow-xs max-w-xl mx-auto">
      <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] mb-4">
        <Search className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>

      <h3 className="text-lg sm:text-2xl font-black text-[#181d1a] font-headline">
        {appliedSearch
          ? "No Search Matches Found"
          : "No Upcoming Trips Available Yet"}
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-[#3f4944] leading-relaxed max-w-md mx-auto">
        {appliedSearch
          ? `We couldn't find any trips matching "${
              appliedSearch.destinationName || "your selected criteria"
            }". Try searching for a broader location or relaxing your filters.`
          : "No travelers have listed upcoming trips yet. Start an adventure by creating a trip and inviting travel mates to join you!"}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {appliedSearch && (
          <button
            onClick={onResetSearch}
            className="px-4 py-2.5 rounded-xl border border-[#005440] text-[#005440] text-xs sm:text-sm font-bold hover:bg-[#eef8f4] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Search Filters</span>
          </button>
        )}
        <button
          onClick={onCreateTrip}
          className="px-5 py-2.5 rounded-xl bg-[#0f6e56] text-white text-xs sm:text-sm font-bold hover:bg-[#005440] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
        >
          <span>Create a Trip</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
