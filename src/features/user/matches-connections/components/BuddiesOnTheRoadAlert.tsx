"use client";

import Link from "next/link";
import { TripMatchData } from "../interfaces/profile-listing.interface";
import MessageButton from "../../chat/components/MessageButton";
import { LocationIcon } from "@/src/assets/icons";
import { Luggage, Calendar } from "lucide-react";

const formatDateRange = (from?: Date | string, to?: Date | string) => {
  if (!from) return "";
  const dFrom = new Date(from);
  const dTo = to ? new Date(to) : null;
  if (isNaN(dFrom.getTime())) return "";

  const fromMonth = dFrom.toLocaleDateString("en-US", { month: "short" });
  const fromDay = dFrom.getDate();
  if (!dTo || isNaN(dTo.getTime())) return `${fromMonth} ${fromDay}`;

  const toMonth = dTo.toLocaleDateString("en-US", { month: "short" });
  const toDay = dTo.getDate();
  if (fromMonth === toMonth) {
    return `${fromMonth} ${fromDay} - ${toDay}`;
  }
  return `${fromMonth} ${fromDay} - ${toMonth} ${toDay}`;
};

export default function BuddiesOnTheRoadAlert({
  buddies,
}: {
  readonly buddies?: TripMatchData[];
}) {
  if (!buddies || buddies.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#004736] via-[#0b634d] to-[#0f6e56] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md border border-[#2ea982]/30">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#a0f3d4]/15 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 text-[#a0f3d4]">
            <Luggage className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-black font-headline tracking-tight text-white">
                Mates On The Road
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#a0f3d4] text-[#004736]">
                {buddies.length} {buddies.length === 1 ? "Mate" : "Mates"}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/80 mt-0.5">
              Connected friends traveling to this destination around your dates. Reach out and coordinate!
            </p>
          </div>
        </div>
      </div>

      {/* Mates Cards Grid / Horizontal Scroll */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {buddies.map((buddy) => {
          const traveler = buddy.user;
          const match = buddy.tripMatch;
          const travelDateRange = formatDateRange(match.dateFrom, match.dateTo);
          const profileUrl =
            match.totalPoints != null
              ? `/matches/${match.id}`
              : `/profile/${traveler.id}?tripId=${match.id}`;

          return (
            <div
              key={`${traveler.id}-${match.id}`}
              className="bg-white/10 hover:bg-white/15 transition-all duration-200 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20 flex flex-col justify-between gap-3 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <Link href={profileUrl} className="shrink-0 group">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#a0f3d4] shadow-xs group-hover:scale-105 transition-transform bg-white/20">
                    {traveler.avatarUrl ? (
                      <img
                        src={traveler.avatarUrl}
                        alt={traveler.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-white text-base">
                        {traveler.fullName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <Link
                      href={profileUrl}
                      className="font-bold text-xs sm:text-sm text-white hover:underline truncate"
                      title={traveler.fullName}
                    >
                      {traveler.fullName}
                      {traveler.age ? `, ${traveler.age}` : ""}
                    </Link>
                    {match.totalPoints != null && (
                      <span className="shrink-0 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#a0f3d4] text-[#004736]">
                        {match.totalPoints}% match
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] sm:text-xs text-white/75 flex items-center gap-1 mt-0.5 truncate">
                    <span className="w-3 h-3 flex-shrink-0 flex items-center justify-center">
                      <LocationIcon />
                    </span>
                    <span className="truncate">
                      {match.destination || `${traveler.state}, ${traveler.country}`}
                    </span>
                  </p>

                  {travelDateRange && (
                    <div className="inline-flex items-center gap-1 mt-1 text-[9px] sm:text-[10px] font-semibold text-white/90 bg-black/20 px-2 py-0.5 rounded-full">
                      <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#a0f3d4] shrink-0" />
                      <span className="truncate">{travelDateRange}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <Link
                  href={profileUrl}
                  className="flex-1 py-1.5 sm:py-2 px-2 text-center text-[10px] sm:text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl transition-colors border border-white/15"
                >
                  View Details
                </Link>

                <MessageButton
                  userId={traveler.id}
                  className="flex-1 py-1.5 sm:py-2 px-2 text-center text-[10px] sm:text-xs font-bold text-[#004736] bg-[#a0f3d4] hover:bg-[#85eec5] rounded-lg sm:rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Message</span>
                </MessageButton>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
