"use client";

import Link from "next/link";
import { useGetTripMatches, useGetActiveTrip } from "../hooks/matches.hooks";
import TravelerCard from "./TravelerCard";
import BuddiesOnTheRoadAlert from "./BuddiesOnTheRoadAlert";
import { TripMatchData } from "../interfaces/profile-listing.interface";
import { Luggage, ArrowRight } from "lucide-react";

interface TripMatchesSectionProps {
  readonly tripId?: string;
}

export default function TripMatchesSection({ tripId }: TripMatchesSectionProps) {
  const { data: activeTrip } = useGetActiveTrip();
  const effectiveTripId = tripId || activeTrip?.data?.id;

  const { data: tripMatchesData, isLoading } = useGetTripMatches(
    effectiveTripId!,
    { page: 1, limit: 6 }
  );

  const matches: TripMatchData[] = tripMatchesData?.data?.matches ?? [];
  const buddiesOnRoad: TripMatchData[] = tripMatchesData?.data?.buddiesOnRoad ?? [];

  const hasRightSidebar = !!activeTrip?.data?.name;
  const gridClasses = hasRightSidebar
    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6"
    : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6";

  if (isLoading) {
    return (
      <section className="mb-10 sm:mb-16">
        <header className="mb-6 sm:mb-10">
          <div className="h-8 w-64 bg-white/60 animate-pulse rounded-lg mb-2" />
          <div className="h-4 w-96 bg-white/40 animate-pulse rounded-lg" />
        </header>
        <div className={gridClasses}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-44 sm:h-72 bg-white/60 animate-pulse rounded-xl sm:rounded-2xl border border-[#bec9c3]/15"
            />
          ))}
        </div>
      </section>
    );
  }

  if (matches.length === 0) {
    return null;
  }

  return (
    <section className="mb-10 sm:mb-16">
      <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440]">
              <Luggage className="w-4 h-4 sm:w-5 sm:h-5 text-[#005440]" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#181d1a] tracking-tight font-headline">
              Companions for Your Upcoming Trip
            </h2>
          </div>
          <p className="text-[#3f4944] text-xs sm:text-sm md:text-base">
            Travelers heading to your destination on overlapping dates, matched to your travel style.
          </p>
        </div>
      </header>

      <div className="space-y-6 sm:space-y-8">
        {buddiesOnRoad.length > 0 && (
          <BuddiesOnTheRoadAlert buddies={buddiesOnRoad} />
        )}

        <div className={gridClasses}>
          {matches.map((match: TripMatchData) => (
            <TravelerCard
              key={`${match.user.id}-${match.tripMatch.id}`}
              traveler={match.user}
              isNearBy={false}
              destination={match.tripMatch.destination}
              dateRange={{ from: match.tripMatch.dateFrom, to: match.tripMatch.dateTo }}
              matchScore={match.tripMatch.totalPoints}
              profileUrl={`/matches/${match.tripMatch.id}`}
              mode={match.mode}
              requestId={match.tripMatch.requestId}
              connectionStatus={match.tripMatch.connectionStatus}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/matches">
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
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
