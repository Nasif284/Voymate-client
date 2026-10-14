"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Plus,
  MapPin,
  Clock,
  Users,
  Search,
  ExternalLink,
} from "lucide-react";
import { useOrganizerTrips } from "../../hooks/communityOrganizer.hooks";

export const CommunityOrganizerTripsPage: React.FC = () => {
  const { data, isLoading } = useOrganizerTrips();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const trips = data?.trips || [];

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || trip.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#181d1a] font-headline tracking-tight">
            My Hosted Expeditions
          </h1>
          <p className="text-xs sm:text-sm text-[#6f7a74] mt-1">
            Manage your scheduled trips, track capacity, and review traveler rosters.
          </p>
        </div>

        <Link
          href="/community/dashboard/trips/create"
          className="h-11 px-5 rounded-xl bg-[#0f6e56] hover:bg-[#005440] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Host New Expedition</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#6f7a74] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by trip title, destination, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-[#bec9c3]/30 text-sm text-[#181d1a] placeholder:text-[#6f7a74]/70 outline-none focus:border-[#0f6e56] focus:ring-2 focus:ring-[#0f6e56]/15 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "CAMP", "TREK_EXPEDITION", "ROADTRIP", "TRIP"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                categoryFilter === cat
                  ? "bg-[#0f6e56] text-white shadow-2xs"
                  : "bg-white text-[#3f4944] border border-[#bec9c3]/30 hover:bg-neutral-50"
              }`}
            >
              {cat === "ALL"
                ? "All Categories"
                : cat === "TREK_EXPEDITION"
                ? "Trek & Expedition"
                : cat === "ROADTRIP"
                ? "Road Trip"
                : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trips Content */}
      {isLoading ? (
        <div className="h-64 rounded-2xl bg-neutral-100 animate-pulse flex items-center justify-center text-[#6f7a74] text-xs">
          Loading expeditions...
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#bec9c3]/30 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0f6e56]/10 text-[#0f6e56] flex items-center justify-center mx-auto">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#181d1a]">
              {trips.length === 0
                ? "No expeditions hosted yet"
                : "No matching expeditions found"}
            </h3>
            <p className="text-xs text-[#6f7a74] max-w-sm mx-auto mt-1">
              {trips.length === 0
                ? "Host your first trek, camp, or expedition to invite solo travelers."
                : "Try adjusting your search keywords or category filters."}
            </p>
          </div>
          {trips.length === 0 && (
            <Link
              href="/community/dashboard/trips/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f6e56] hover:bg-[#005440] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Host New Trip</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => {
            const percentage = Math.min(
              100,
              Math.round(((trip.joinedCount || 0) / trip.maxCapacity) * 100)
            );

            return (
              <div
                key={trip.id}
                className="rounded-2xl bg-white border border-[#bec9c3]/25 overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-sm transition-all"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                      {trip.category}
                    </span>
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        trip.pricingType === "FREE"
                          ? "bg-emerald-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {trip.pricingType === "FREE"
                        ? "FREE"
                        : `₹${trip.price?.toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-[#181d1a] line-clamp-1">
                      {trip.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#6f7a74]">
                      <MapPin className="w-3.5 h-3.5 text-[#0f6e56] shrink-0" />
                      <span className="truncate">
                        {trip.destination.name}, {trip.destination.city},{" "}
                        {trip.destination.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#6f7a74]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{trip.durationText}</span>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#6f7a74] flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#0f6e56]" />
                          <span>Voyagers</span>
                        </span>
                        <span className="font-bold text-[#181d1a]">
                          {trip.joinedCount || 0} / {trip.maxCapacity} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                          className="h-full bg-[#0f6e56] rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50/70 border-t border-[#bec9c3]/20 flex items-center justify-between text-xs">
                  <Link
                    href={`/community/dashboard/bookings?tripId=${trip.id}`}
                    className="font-bold text-[#0f6e56] hover:underline inline-flex items-center gap-1"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>View Roster ({trip.joinedCount || 0})</span>
                  </Link>

                  <Link
                    href={`/community-trips/${trip.slug || trip.id}`}
                    target="_blank"
                    className="text-[#6f7a74] hover:text-[#181d1a] inline-flex items-center gap-1 font-semibold"
                  >
                    <span>Public Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
