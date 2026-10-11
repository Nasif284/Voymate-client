"use client";

import { useState } from "react";
import { useGetUsersForCards } from "../hooks/users.hooks";
import { UserWithDetails } from "@/src/Interfaces/users.interface";
import TravelerCard from "./TravelerCard";
import { useGetActiveTrip } from "../hooks/matches.hooks";
import { Users, Compass, Luggage } from "lucide-react";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../../trips/components/CreateTrip";

interface DiscoverBuddiesSectionProps {
  readonly isOnlySection?: boolean;
}

export default function DiscoverBuddiesSection({
  isOnlySection = false,
}: DiscoverBuddiesSectionProps) {
  const [openModal, setOpenModal] = useState(false);
  const { data: activeTrip } = useGetActiveTrip();
  const { data: usersResponse, isLoading } = useGetUsersForCards({
    page: 1,
    limit: 8,
  });
  console.log("demo:", usersResponse);

  const users: UserWithDetails[] = usersResponse?.data?.users ?? [];
  const total = users.length;
  const hasRightSidebar = !!activeTrip?.data?.name;

  const gridClasses = hasRightSidebar
    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
    : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6";

  if (isLoading) {
    return (
      <section className="mb-10 sm:mb-16">
        <header className="mb-6 sm:mb-8">
          <div className="h-8 w-64 bg-white/60 animate-pulse rounded-xl mb-2" />
          <div className="h-4 w-96 bg-white/40 animate-pulse rounded-lg" />
        </header>
        <div className={gridClasses}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 sm:h-72 bg-white/60 animate-pulse rounded-xl sm:rounded-2xl border border-[#bec9c3]/15"
            />
          ))}
        </div>
      </section>
    );
  }

  if (users.length === 0) {
    return null;
  }

  return (
    <section className="mb-10 sm:mb-16">
      <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440]">
              {isOnlySection ? (
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#005440]" />
              ) : (
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#005440]" />
              )}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#181d1a] tracking-tight font-headline">
              {isOnlySection
                ? "Travelers Looking for Mates"
                : "Explore More Travel Companions"}
            </h2>
          </div>
          <p className="text-[#3f4944] text-xs sm:text-sm md:text-base">
            Discover travelers looking for companions to join them on their upcoming trips.
          </p>
        </div>

        {isOnlySection && (
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0f6e56] text-white text-xs sm:text-sm font-bold hover:bg-[#005440] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <Luggage className="w-4 h-4 shrink-0" />
            <span>Plan a Trip</span>
          </button>
        )}
      </header>

      <div className={gridClasses}>
        {users.map((traveler: UserWithDetails) => (
          <TravelerCard key={traveler.id} traveler={traveler} isNearBy={false} />
        ))}
      </div>

      {openModal && (
        <ModalLayout
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Create Trip"
        >
          <CreateTrip onClose={() => setOpenModal(false)} />
        </ModalLayout>
      )}
    </section>
  );
}
