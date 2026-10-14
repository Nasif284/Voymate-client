"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Calendar,
  Phone,
  AlertTriangle,
  Receipt,
  Search,
  UserCheck,
} from "lucide-react";
import {
  useOrganizerTrips,
  useTripBookings,
} from "../../hooks/communityOrganizer.hooks";

export const CommunityBookingsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialTripId = searchParams.get("tripId") || "";

  const { data: tripsData, isLoading: tripsLoading } = useOrganizerTrips();
  const trips = tripsData?.trips || [];

  const [selectedTripId, setSelectedTripId] = useState<string>(
    initialTripId || (trips[0]?.id ?? "")
  );
  const [searchTerm, setSearchTerm] = useState("");

  const activeTripId = selectedTripId || trips[0]?.id || "";

  const { data: bookings = [], isLoading: bookingsLoading } =
    useTripBookings(activeTripId);

  const activeTrip = trips.find((t) => t.id === activeTripId);

  const filteredBookings = bookings.filter((b) => {
    const q = searchTerm.toLowerCase();
    return (
      b.contactName.toLowerCase().includes(q) ||
      b.bookingCode.toLowerCase().includes(q) ||
      b.contactPhone.toLowerCase().includes(q) ||
      (b.user?.email && b.user.email.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Title & Expedition Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#181d1a] font-headline tracking-tight">
            Attendee Rosters &amp; Bookings
          </h1>
          <p className="text-xs sm:text-sm text-[#6f7a74] mt-1">
            Review registered voyagers, contact numbers, and emergency information.
          </p>
        </div>

        {/* Trip Switcher Dropdown */}
        {trips.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6f7a74] shrink-0">
              Expedition:
            </span>
            <select
              value={activeTripId}
              onChange={(e) => setSelectedTripId(e.target.value)}
              className="h-11 px-3.5 rounded-xl bg-white border border-[#bec9c3]/30 text-xs sm:text-sm font-semibold text-[#181d1a] focus:border-[#0f6e56] focus:ring-2 focus:ring-[#0f6e56]/15 outline-none cursor-pointer max-w-xs truncate"
            >
              {trips.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.joinedCount || 0} joined)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Trip Snapshot Banner */}
      {activeTrip && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#bec9c3]/25 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
              <img
                src={activeTrip.coverImage}
                alt={activeTrip.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#181d1a]">
                {activeTrip.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#6f7a74] mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#0f6e56]" />
                  <span>{activeTrip.durationText}</span>
                </span>
                <span>•</span>
                <span className="font-semibold text-[#181d1a]">
                  {activeTrip.pricingType === "FREE"
                    ? "Free Slot"
                    : `₹${activeTrip.price?.toLocaleString("en-IN")}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs border-t sm:border-t-0 sm:border-l border-[#bec9c3]/20 pt-3 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-[#6f7a74]">Registered Voyagers</span>
              <p className="text-base font-black text-[#181d1a] mt-0.5">
                {bookings.length} / {activeTrip.maxCapacity}
              </p>
            </div>
            <div>
              <span className="text-[#6f7a74]">Slots Available</span>
              <p className="text-base font-black text-[#0f6e56] mt-0.5">
                {Math.max(0, activeTrip.maxCapacity - bookings.length)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6f7a74] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search attendees by name, phone, or booking code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-[#bec9c3]/30 text-sm text-[#181d1a] placeholder:text-[#6f7a74]/70 outline-none focus:border-[#0f6e56] focus:ring-2 focus:ring-[#0f6e56]/15 transition-all"
        />
      </div>

      {/* Attendees Table / Cards */}
      {tripsLoading || bookingsLoading ? (
        <div className="h-64 rounded-2xl bg-neutral-100 animate-pulse flex items-center justify-center text-[#6f7a74] text-xs">
          Loading attendees...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#bec9c3]/30 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0f6e56]/10 text-[#0f6e56] flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#181d1a]">
            {bookings.length === 0
              ? "No registered travelers yet"
              : "No attendees match your search"}
          </h3>
          <p className="text-xs text-[#6f7a74] max-w-sm mx-auto">
            {bookings.length === 0
              ? "When voyagers join this trip through Voymate, their contact details will appear here."
              : "Try searching with a different name or booking code."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#bec9c3]/30 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f7faf6] border-b border-[#bec9c3]/20 text-[#6f7a74] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Voyager</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Emergency Phone</th>
                  <th className="py-3 px-4">Booking Code</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Booked On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bec9c3]/15">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 overflow-hidden flex items-center justify-center shrink-0">
                          {b.user?.avatarUrl ? (
                            <img
                              src={b.user.avatarUrl}
                              alt={b.contactName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserCheck className="w-4 h-4 text-[#0f6e56]" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[#181d1a]">
                            {b.contactName}
                          </p>
                          <p className="text-[11px] text-[#6f7a74]">
                            {b.user?.email || "Voyager"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs">
                      <div className="flex items-center gap-1.5 text-[#181d1a]">
                        <Phone className="w-3.5 h-3.5 text-[#6f7a74]" />
                        <span>{b.contactPhone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs text-[#6f7a74]">
                      {b.emergencyPhone ? (
                        <div className="flex items-center gap-1.5 text-amber-700">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{b.emergencyPhone}</span>
                        </div>
                      ) : (
                        <span>—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#0f6e56]">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                        {b.bookingCode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#181d1a]">
                      <div className="flex items-center gap-1">
                        <Receipt className="w-3.5 h-3.5 text-[#6f7a74]" />
                        <span>
                          {b.amount === 0 ? "FREE" : `₹${b.amount.toLocaleString("en-IN")}`}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-[#6f7a74]">
                      {new Date(b.bookedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
