"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import TravelerCard from "./TravelerCard";
import { useGetNearbyUsers } from "../hooks/users.hooks";
import { UserWithDetails } from "../../../../Interfaces/users.interface";
import { useGetLocation } from "@/src/hooks/api/location.hooks";
import { useGetActiveTrip } from "../hooks/matches.hooks";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../../trips/components/CreateTrip";

const NearbyTravelers = ({ hideIfEmpty = true }: { hideIfEmpty?: boolean }) => {
  const [openModal, setOpenModal] = useState(false);
  const { data: locationData, isLoading: locationLoading } = useGetLocation();
  const hasEnabled = Boolean(locationData?.data?.state);
  const { data: activeTrip } = useGetActiveTrip();
  const { data: nearbyResponse, isLoading: nearbyLoading } = useGetNearbyUsers(
    { page: 1, limit: 6 },
    hasEnabled
  );

  const hasRightSidebar = Boolean(activeTrip?.data?.name);
  const gridClasses = hasRightSidebar
    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6"
    : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6";

  if (nearbyLoading || locationLoading) {
    return (
      <div className={gridClasses}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-44 sm:h-72 bg-white/60 animate-pulse rounded-xl sm:rounded-2xl border border-[#bec9c3]/15"
          />
        ))}
      </div>
    );
  }

  const users: UserWithDetails[] = (nearbyResponse?.data?.users ?? []).filter(
    (u: UserWithDetails) => u.isTraveling !== false
  );

  if (hideIfEmpty && users.length === 0) {
    return null;
  }

  // Empty State: 0 travelers found within 50 km
  if (users.length === 0) {
    return (
      <>
        <div className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fbf9] to-[#edf6f2] rounded-2xl sm:rounded-3xl border border-[#bec9c3]/20 shadow-sm p-6 sm:p-10 text-center max-w-2xl mx-auto">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#0f6e56]/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#c9eadb]/30 blur-2xl pointer-events-none" />

          {/* Compass Badge */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5">
            <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#0f6e56]/15 to-[#2ea982]/20 flex items-center justify-center text-[#0f6e56] shadow-inner ring-4 ring-[#eef8f4]">
              <Compass className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#0f6e56]/10 text-[#0f6e56] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f6e56] animate-ping" />
            Early Explorer
          </span>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#181d1a] tracking-tight font-headline">
            Be the First Traveler in Your Area!
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-[#3f4944] max-w-lg mx-auto leading-relaxed">
            No travelers have checked in within 50 km just yet. Put yourself on the map by creating a trip plan so other travelers heading your way can discover and connect with you.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="px-6 py-3 rounded-xl bg-[#0f6e56] hover:bg-[#005440] text-white font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>Create Your First Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <ModalLayout isOpen={openModal} onClose={() => setOpenModal(false)}>
          <CreateTrip onClose={() => setOpenModal(false)} />
        </ModalLayout>
      </>
    );
  }

  // Active Travelers Found within 50km
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className={gridClasses}>
        {users.map((traveler: UserWithDetails) => (
          <TravelerCard key={traveler.id} traveler={traveler} isNearBy={true} />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Link href="/nearby">
          <button
            type="button"
            className="
              px-4 sm:px-6 py-2 sm:py-3
              rounded-xl
              border border-[#0f6e56]
              text-[#0f6e56]
              font-bold
              text-xs sm:text-sm
              hover:bg-[#0f6e56]
              hover:text-white
              transition-all
              active:scale-95
              flex items-center gap-1.5 sm:gap-2
              cursor-pointer
              shadow-xs
            "
          >
            <span className="sm:hidden">More Travelers</span>
            <span className="hidden sm:inline">Explore All Community Travelers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NearbyTravelers;
