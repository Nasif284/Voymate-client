"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, X } from "lucide-react";
import { useGetUserUpcomingTrips } from "@/src/features/user/trips/hooks/trip.hooks";
import { TripCardData } from "../interfaces/profile-listing.interface";
import { formatDateRange } from "@/src/utils/date";

export default function SelectTripModal({
  onClose,
  onSubmit,
  selected,
}: {
  selected: string;
  onClose: () => void;
  onSubmit: (tripId: string) => void;
}) {
  const [selectedTrip, setSelectedTrip] = useState(selected);
  const { data, isLoading } = useGetUserUpcomingTrips();
  const trips = data?.data?.trips ?? [];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="w-full max-w-md bg-white rounded-2xl p-6 text-center animate-pulse space-y-4">
          <div className="h-6 w-32 bg-black/10 rounded mx-auto" />
          <div className="h-20 bg-black/5 rounded-xl" />
        </div>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-2xl p-6 text-center shadow-xl"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-[#eef8f4] flex items-center justify-center text-[#0f6e56]">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-[#181d1a]">
            No Active Trips Found!
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#3f4944] max-w-sm mx-auto">
            Travel matches are based on your destination and trip dates. Create another trip to discover matches.
          </p>

          <Link
            href="/onboarding/travel-plan"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-[#0f6e56] text-white font-bold text-xs sm:text-sm hover:bg-[#005440] transition-all"
          >
            Create a Trip
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md sm:max-w-lg max-h-[85vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in"
      >
        <div className="flex-1 overflow-y-auto hide-scrollbar p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-xl font-extrabold text-[#181d1a]">
              Select Another Trip
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#3f4944] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 sm:mt-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#3f4944] mb-2.5">
              Your Upcoming Trips
            </p>

            <div className="space-y-2.5">
              {trips.map((trip: TripCardData) => (
                <button
                  key={trip.id}
                  type="button"
                  onClick={() => setSelectedTrip(trip.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all active:scale-[0.99] cursor-pointer ${
                    selectedTrip === trip.id
                      ? "border-[#0f6e56] bg-[#eef8f4] shadow-xs"
                      : "border-[#d9dfdb] hover:border-[#0f6e56]/40"
                  }`}
                >
                  <h3 className="font-bold text-sm sm:text-base text-[#181d1a]">{trip.name}</h3>
                  <p className="text-xs text-[#6f7a74] mt-1">
                    {formatDateRange(trip.dateFrom, trip.dateTo)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t bg-[#f5f7f6] p-3.5 sm:p-4 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-[#d9dfdb] text-[#3f4944] font-semibold text-xs sm:text-sm hover:bg-gray-100 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-[#0f6e56] text-white font-bold text-xs sm:text-sm hover:bg-[#005440] transition-all cursor-pointer active:scale-95 shadow-xs"
            onClick={() => {
              onSubmit(selectedTrip);
              onClose();
            }}
          >
            Find Matches
          </button>
        </div>
      </div>
    </div>
  );
}
