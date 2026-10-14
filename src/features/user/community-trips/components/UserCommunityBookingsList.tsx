"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Ticket,
  ExternalLink,
  ShieldCheck,
  Compass,
  Loader2,
  X,
} from "lucide-react";
import { useUserCommunityBookings } from "../hooks/communityTrip.hooks";
import { UserCommunityBooking } from "../types";

export default function UserCommunityBookingsList() {
  const { data: bookings, isLoading, isError, refetch } = useUserCommunityBookings();
  const [selectedPass, setSelectedPass] = useState<UserCommunityBooking | null>(null);

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#005440] animate-spin" />
        <p className="text-xs font-bold text-[#3f4944] tracking-wider uppercase">
          Loading your community bookings...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-[#bec9c3]/20 space-y-3">
        <p className="text-sm font-bold text-red-700">
          Could not load your community bookings. Please make sure you are signed in.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded-xl bg-[#005440] text-white text-xs font-bold hover:bg-[#004736] transition-all cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-[#bec9c3]/20 space-y-3">
        <Compass className="w-12 h-12 text-[#0F6E56] mx-auto opacity-70" />
        <h3 className="text-lg font-bold text-[#181d1a] font-headline">
          No Community Bookings Yet
        </h3>
        <p className="text-xs sm:text-sm text-[#3f4944] max-w-md mx-auto">
          You haven't joined any community trips or stranger camps yet. Browse our curated expeditions and join with fellow voyagers!
        </p>
        <Link
          href="/community-trips"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#005440] text-white text-xs font-bold hover:bg-[#004736] transition-all cursor-pointer mt-2"
        >
          <span>Explore Upcoming Trips</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base sm:text-lg font-black text-[#181d1a] font-headline">
          My Booked Adventures ({bookings.length})
        </h2>
        <span className="text-xs text-[#0F6E56] font-bold">
          Active Traveler Passes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {bookings.map((booking) => {
          const trip = booking.trip;
          const coverImg =
            trip.gallery?.[0] ||
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800";
          const isFree = booking.amount === 0;

          return (
            <div
              key={booking.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-[#bec9c3]/25 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex gap-3.5 items-start">
                <img
                  src={coverImg}
                  alt={trip.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 shadow-xs"
                />

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#0F6E56]/15 text-[#005440] font-extrabold text-[10px] uppercase tracking-wider">
                      {isFree ? "Free Camp" : "Paid Trip"}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#6f7a74] bg-[#f7faf6] px-2 py-0.5 rounded-md border border-[#bec9c3]/25">
                      {booking.bookingCode}
                    </span>
                  </div>

                  <Link
                    href={`/community-trips/${trip.slug}`}
                    className="block group"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-[#181d1a] group-hover:text-[#005440] transition-colors line-clamp-1 font-headline">
                      {trip.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#3f4944] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                    <span className="truncate">
                      {trip.destinationName || trip.city}, {trip.state}
                    </span>
                  </p>

                  <p className="text-xs text-[#6f7a74] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                    <span>
                      {new Date(trip.dateFrom).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(trip.dateTo).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>

              {/* Host & Actions */}
              <div className="pt-3 border-t border-[#bec9c3]/20 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 min-w-0">
                  {trip.community?.avatarUrl && (
                    <img
                      src={trip.community.avatarUrl}
                      alt={trip.community.name}
                      className="w-5 h-5 rounded-full object-cover shrink-0"
                    />
                  )}
                  <span className="text-xs font-semibold text-[#0F6E56] truncate">
                    {trip.community?.name || "Community Host"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPass(booking)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#005440] text-white hover:bg-[#004736] text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>View Pass</span>
                  </button>

                  <Link
                    href={`/community-trips/${trip.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#bec9c3]/40 text-xs font-bold text-[#3f4944] hover:bg-[#f7faf6] transition-all"
                  >
                    <span>Trip Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Boarding Pass Dialog Modal */}
      {selectedPass && (
        <div
          className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPass(null);
          }}
        >
          <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#bec9c3]/30 animate-in zoom-in-95 duration-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#005440] uppercase tracking-wider">
                Confirmed Digital Pass
              </span>
              <button
                onClick={() => setSelectedPass(null)}
                className="w-7 h-7 rounded-full bg-[#e0e3e0] flex items-center justify-center text-[#3f4944] hover:bg-[#d0d4d0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pass Card */}
            <div className="relative bg-gradient-to-br from-[#005440] to-[#0F6E56] text-white rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="font-mono font-bold text-xs text-[#a0f3d4]">
                  {selectedPass.bookingCode}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#a0f3d4] text-[#004736] font-bold text-[10px] uppercase">
                  CONFIRMED
                </span>
              </div>

              <div>
                <p className="text-[10px] uppercase text-emerald-200 font-semibold">
                  Trip Adventure
                </p>
                <h4 className="text-sm font-bold text-white line-clamp-2">
                  {selectedPass.trip.title}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <p className="text-[10px] text-emerald-200">Traveler Name</p>
                  <p className="font-bold text-white">{selectedPass.contactName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-200">Host Club</p>
                  <p className="font-bold text-white truncate">
                    {selectedPass.trip.community?.name}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-200">Location</p>
                  <p className="font-medium text-white truncate">
                    {selectedPass.trip.destinationName || selectedPass.trip.city}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-200">Fee Paid</p>
                  <p className="font-bold text-[#a0f3d4]">
                    {selectedPass.amount === 0
                      ? "FREE"
                      : `₹${selectedPass.amount.toLocaleString("en-IN")}`}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-white/25 flex items-center justify-between text-[10px] text-emerald-200">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a0f3d4]" />
                  <span>Voymate Verified</span>
                </span>
                <span className="font-mono">
                  Booked on{" "}
                  {new Date(selectedPass.bookedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPass(null)}
              className="w-full py-2.5 rounded-xl bg-[#005440] text-white text-xs font-bold hover:bg-[#004736] transition-all cursor-pointer"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
