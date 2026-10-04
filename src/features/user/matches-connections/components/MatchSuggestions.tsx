"use client";

import Link from "next/link";
import { useGetActiveTrip, useGetTripMatches } from "../hooks/matches.hooks";
import MatchSuggestionCard from "./MatchSuggestionCard";
import BuddiesOnTheRoadAlert from "./BuddiesOnTheRoadAlert";
import { TripMatchData } from "../interfaces/profile-listing.interface";
import { arrowForward, locationPin } from "@/src/assets/icons";
import { useState } from "react";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../../trips/components/CreateTrip";
import { Calendar, Sparkles } from "lucide-react";

const MatchSuggestions = () => {
  const { data: activeTrip, isLoading: loadingActive } = useGetActiveTrip();
  const [openModal, setOpenModal] = useState(false);
  const hasActiveTrip = !!activeTrip?.data;

  const { data: tripData, isLoading: loadingTripMatches } = useGetTripMatches(
    activeTrip?.data?.id,
    { page: 1, limit: 6 }
  );

  const isLoading = loadingActive || loadingTripMatches;
  const matches: TripMatchData[] = tripData?.data?.matches ?? [];
  const buddiesOnRoad: TripMatchData[] = tripData?.data?.buddiesOnRoad ?? [];

  const hasRightSidebar = hasActiveTrip;
  const gridClasses = hasRightSidebar
    ? "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6"
    : "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6";

  if (isLoading) {
    return (
      <div className={gridClasses}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-44 sm:h-72 bg-white/60 animate-pulse rounded-xl sm:rounded-2xl border border-[#bec9c3]/15" />
        ))}
      </div>
    );
  }

  if (!hasActiveTrip && matches.length === 0) {
    return (
      <>
        <div className="p-6 sm:p-12 text-center bg-white/50 rounded-2xl border border-[#bec9c3]/15">
          <div
            className="
            w-16 h-16 sm:w-20 sm:h-20
            mx-auto
            rounded-2xl
            bg-[#eef8f4]
            flex items-center justify-center
            text-[#0f6e56]
          "
          >
            {locationPin}
          </div>

          <h3 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-black text-[#181d1a]">Create a Trip to Find Matches</h3>

          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[#3f4944] max-w-xl mx-auto">Travel matches are based on your destination, travel dates, budget style and travel preferences. Create your first trip and we will suggest the most compatible travelers.</p>

          <button
            className="
            inline-flex
            items-center
            gap-2
            mt-6 sm:mt-8
            px-5 sm:px-6 py-2.5 sm:py-3
            rounded-xl
            bg-[#0f6e56]
            text-white
            font-bold
            text-sm sm:text-base
            hover:bg-[#005440]
            transition-all
            active:scale-95
            cursor-pointer
            shadow-sm
          "
            onClick={() => setOpenModal(true)}
          >
            Create a Trip
            {arrowForward}
          </button>
        </div>{" "}
        {openModal && (
          <ModalLayout isOpen={openModal} onClose={() => setOpenModal(false)} title="Create Trip">
            <CreateTrip onClose={() => setOpenModal(false)} />
          </ModalLayout>
        )}
      </>
    );
  }

  if (hasActiveTrip && matches.length === 0) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fbf9] to-[#edf6f2] rounded-2xl sm:rounded-3xl border border-[#bec9c3]/20 shadow-xs p-6 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#0f6e56]/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#c9eadb]/30 blur-2xl pointer-events-none" />

        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5">
          <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#0f6e56]/15 to-[#2ea982]/20 flex items-center justify-center text-[#0f6e56] shadow-inner ring-4 ring-[#eef8f4]">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <line x1="12" y1="12" x2="19" y2="5" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#0f6e56]/10 text-[#0f6e56] mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f6e56] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0f6e56]" />
          </span>
          Trip Radar Active
        </span>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#181d1a] tracking-tight font-headline">
          Scanning for Companions{activeTrip?.data?.name ? ` to ${activeTrip.data.name}` : ""}
        </h3>

        {activeTrip?.data?.dateFrom && activeTrip?.data?.dateTo && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-[#bec9c3]/25 text-xs font-semibold text-[#3f4944] mt-2 mb-2 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#0f6e56] shrink-0" />
            <span>
              {new Date(activeTrip.data.dateFrom).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(activeTrip.data.dateTo).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}

        <p className="mt-2 text-xs sm:text-sm md:text-base text-[#3f4944] max-w-lg mx-auto leading-relaxed">
          Your trip is live on our matching radar. We are actively scanning for travelers with compatible travel styles and dates. We will automatically suggest them as soon as they appear.
        </p>

        <div className="mt-6 sm:mt-8 flex items-center justify-center">
          <Link
            href="/trips/plans/active"
            className="
              inline-flex
              items-center
              gap-2
              px-6 py-3
              rounded-xl
              border border-[#0f6e56]
              text-[#0f6e56]
              font-bold
              text-xs sm:text-sm
              hover:bg-[#0f6e56]
              hover:text-white
              transition-all
              active:scale-95
              shadow-xs
              cursor-pointer
            "
          >
            <span>Manage Trips</span>
            {arrowForward}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {!hasActiveTrip && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#eef8f4] to-[#f4faf7] border border-[#c9eadb]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0f6e56] shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-[#181d1a]">
                Compatible Travelers For You
              </h3>
            </div>
            <p className="text-[#3f4944] text-[11px] sm:text-xs mt-0.5">
              Suggestions based on your interests, travel personality, style, and spoken languages.
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#0f6e56] text-white text-xs font-bold hover:bg-[#005440] transition-all cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
          >
            <span>Plan a Trip</span>
            {arrowForward}
          </button>
        </div>
      )}

      {hasActiveTrip && buddiesOnRoad.length > 0 && (
        <BuddiesOnTheRoadAlert buddies={buddiesOnRoad} />
      )}

      <div className={gridClasses}>
        {matches.map((match: TripMatchData) => (
          <MatchSuggestionCard
            match={match.tripMatch}
            mode={match.mode}
            key={match.user.id}
            traveler={match.user}
            isNearBy={false}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Link href={"/matches"}>
          <button
            className="
              px-3.5 sm:px-6 py-1.5 sm:py-3
              rounded-lg sm:rounded-xl
              border border-[#0f6e56]
              text-[#0f6e56]
              font-bold
              text-xs sm:text-base
              hover:bg-[#0f6e56]
              hover:text-white
              transition-all
              active:scale-95
              flex items-center gap-1.5 sm:gap-2
              cursor-pointer
              shadow-xs
            "
          >
            <span className="sm:hidden">More</span>
            <span className="hidden sm:inline">Find More Travel Matches</span>
            {arrowForward}
          </button>
        </Link>
      </div>

      {openModal && (
        <ModalLayout isOpen={openModal} onClose={() => setOpenModal(false)} title="Create Trip">
          <CreateTrip onClose={() => setOpenModal(false)} />
        </ModalLayout>
      )}
    </div>
  );
};

export default MatchSuggestions;

