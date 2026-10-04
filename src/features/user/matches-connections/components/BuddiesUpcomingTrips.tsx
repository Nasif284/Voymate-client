"use client";

import Link from "next/link";
import { useGetBuddiesUpcomingTrips } from "../hooks/matches.hooks";
import { BuddyUpcomingTrip } from "../interfaces/profile-listing.interface";
import MessageButton from "../../chat/components/MessageButton";
import { LocationIcon } from "@/src/assets/icons";
import { Luggage, Calendar, MapPin, Plane } from "lucide-react";

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

export default function BuddiesUpcomingTrips() {
  const { data, isLoading } = useGetBuddiesUpcomingTrips();
  const trips: BuddyUpcomingTrip[] = data?.data?.trips || [];

  if (isLoading || trips.length === 0) {
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
              Where Your Mates Are Heading
            </h2>
          </div>
          <p className="text-[#3f4944] text-xs sm:text-sm md:text-base">
            Connected travel mates planning trips soon. See where they are going and coordinate plans together.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {trips.map((trip) => {
          const travelDateRange = formatDateRange(trip.dateFrom, trip.dateTo);
          const profileUrl = `/profile/${trip.buddy.id}?tripId=${trip.tripId}`;

          return (
            <article
              key={trip.tripId}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 shadow-xs hover:shadow-md border border-[#bec9c3]/20"
            >
              {/* Cover Image */}
              <div className="h-28 sm:h-36 relative overflow-hidden bg-gradient-to-tr from-[#005440]/30 to-[#0f6e56]/15">
                {trip.destination.coverUrl ? (
                  <img
                    src={trip.destination.coverUrl}
                    alt={trip.destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-white/50 text-2xl">
                    <Plane className="w-8 h-8 text-white/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Top-Left: Date Range Badge */}
                {travelDateRange && (
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                    <Calendar className="w-3 h-3 text-white shrink-0" />
                    <span className="truncate">{travelDateRange}</span>
                  </div>
                )}

                {/* Top-Right: Travel Style Badge */}
                {trip.travelStyle && (
                  <div className="absolute top-2 right-2 bg-[#005440]/90 text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs z-10">
                    <span className="capitalize">{trip.travelStyle.toLowerCase()}</span>
                  </div>
                )}

                {/* Avatar Overlay */}
                <div className="absolute bottom-0 left-3 sm:left-4 translate-y-1/2 z-10">
                  <Link href={profileUrl}>
                    <div className="h-11 w-11 sm:h-14 sm:w-14 rounded-full border-2 sm:border-3 border-white overflow-hidden shadow-md bg-white hover:scale-105 transition-transform cursor-pointer">
                      {trip.buddy.avatarUrl ? (
                        <img
                          src={trip.buddy.avatarUrl}
                          alt={trip.buddy.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-[#005440] bg-[#eef8f4] text-sm">
                          {trip.buddy.fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-7 sm:pt-9 px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col grow text-left">
                <div>
                  <Link href={profileUrl} className="hover:underline">
                    <h3
                      className="text-xs sm:text-base font-bold text-[#181d1a] truncate"
                      title={trip.buddy.fullName}
                    >
                      {trip.buddy.fullName}
                      {trip.buddy.age ? `, ${trip.buddy.age}` : ""}
                    </h3>
                  </Link>
                  <p className="text-[10px] sm:text-xs text-[#0f6e56] font-semibold flex items-center gap-1 mt-0.5 truncate">
                    <span className="w-3 h-3 flex-shrink-0 flex items-center justify-center scale-90">
                      <LocationIcon />
                    </span>
                    <span className="truncate">Heading to {trip.destination.name.split(",")[0]}</span>
                  </p>
                </div>

                {/* Destination & Location Details */}
                <div className="flex items-center gap-1 mt-2 mb-3 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#eef8f4] text-[#0f6e56] rounded-full text-[9px] sm:text-[10px] font-bold truncate max-w-full">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0f6e56] shrink-0" />
                    <span className="truncate">{trip.destination.city || trip.destination.name.split(",")[0]}, {trip.destination.country}</span>
                  </span>
                  {trip.budgetStyle && (
                    <span className="px-2 py-0.5 bg-[#ebefeb] text-[#3f4944] rounded-full text-[9px] sm:text-[10px] font-semibold capitalize">
                      {trip.budgetStyle.toLowerCase()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center gap-2 pt-2 border-t border-[#bec9c3]/15">
                  <Link
                    href={profileUrl}
                    className="flex-1 py-1.5 sm:py-2 px-2 text-center text-[10px] sm:text-xs font-bold text-[#005440] hover:bg-[#eef8f4] rounded-lg sm:rounded-xl transition-colors border border-[#bec9c3]/30"
                  >
                    View Trip
                  </Link>

                  <MessageButton
                    userId={trip.buddy.id}
                    className="flex-1 py-1.5 sm:py-2 px-2 text-center text-[10px] sm:text-xs font-bold text-white bg-[#0f6e56] hover:bg-[#005440] rounded-lg sm:rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
