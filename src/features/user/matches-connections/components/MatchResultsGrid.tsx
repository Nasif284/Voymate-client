"use client";

import React from "react";
import TravelerCard from "./TravelerCard";
import { TripMatchData } from "../interfaces/profile-listing.interface";
import { SearchFilterParams } from "./DestinationSearchFilter";

interface MatchResultsGridProps {
  matches: TripMatchData[];
  mode: "TRIP" | "SEARCH";
  appliedSearch: SearchFilterParams | null;
  total: number;
}

export const MatchResultsGrid: React.FC<MatchResultsGridProps> = ({
  matches,
  mode,
  appliedSearch,
  total,
}) => {
  return (
    <>
      <section className="flex flex-row items-center justify-between gap-3">
        <div>
          <h3 className="text-sm sm:text-lg font-bold text-[#181d1a]">
            {mode === "TRIP" && "Compatible Trip Companions"}
            {mode === "SEARCH" &&
              (appliedSearch
                ? `Search Results for "${appliedSearch.destinationName || "Selected Filters"}"`
                : "All Available Trips Looking for Companions")}
          </h3>
          <p className="text-[#3f4944] text-[11px] sm:text-xs mt-0.5 hidden sm:block">
            {mode === "TRIP" &&
              "Ranked dynamically by destination alignment, dates overlap, and travel style."}
            {mode === "SEARCH" &&
              (appliedSearch
                ? "Ranked by search destination overlap, dates, and style compatibility."
                : "Explore active travelers and upcoming journeys across destinations.")}
          </p>
        </div>
        <span className="text-xs sm:text-sm font-bold text-[#0f6e56] shrink-0">
          {total} match{total !== 1 ? "es" : ""} found
        </span>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {matches.map((match: TripMatchData) => {
          const isAllAvailable = mode === "SEARCH" && !appliedSearch;
          const effectiveProfileUrl = isAllAvailable
            ? `/profile/${match.user.id}?tripId=${match.tripMatch.id}`
            : `/matches/${match.tripMatch.id}`;

          return (
            <TravelerCard
              key={match.user.id + (match.tripMatch?.id || "")}
              traveler={match.user}
              destination={match.tripMatch.destination}
              dateRange={{
                from: match.tripMatch.dateFrom,
                to: match.tripMatch.dateTo,
              }}
              matchScore={
                isAllAvailable ? null : (match.tripMatch.totalPoints ?? null)
              }
              profileUrl={effectiveProfileUrl}
              mode={mode}
              requestId={match.tripMatch.requestId}
              connectionStatus={match.tripMatch.connectionStatus}
            />
          );
        })}
      </section>
    </>
  );
};

export default MatchResultsGrid;
