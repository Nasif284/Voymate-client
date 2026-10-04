"use client";

import { useState } from "react";
import TravelerCard from "@/src/features/user/matches-connections/components/TravelerCard";
import { useGetNearbyUsers } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { Pagination } from "@/src/components/Pagination";
import { UserWithDetails } from "@/src/Interfaces/users.interface";
import { useGetLocation } from "@/src/hooks/api/location.hooks";

const LIMIT = 16;

export default function NearbyTravelersPage() {
  const [page, setPage] = useState(1);
  const { data: location } = useGetLocation();
  const hasEnabled = !!location?.data?.state;
  const { data, isLoading } = useGetNearbyUsers(
    {
      page,
      limit: LIMIT,
    },
    hasEnabled,
  );
  if (isLoading) {
    return (
      <div className="ml-64 px-16 pt-24 pb-8 mt space-y-10">
        <div>Loading...</div>
      </div>
    );
  }

  const users: UserWithDetails[] = (data?.data?.users ?? []).filter(
    (u: UserWithDetails) => u.isTraveling !== false
  );
  const totalPages = data?.data?.totalPages ?? 1;
  const currentPage = data?.data?.page ?? 1;

  return (
    <div className="ml-0 lg:ml-64 px-4 sm:px-8 lg:px-16 pt-20 sm:pt-24 pb-8 space-y-8 sm:space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#181d1a] font-headline">
          Travelers Around You
        </h1>
        <p className="text-[#3f4944] mt-1.5 text-xs sm:text-sm">
          Discover travelers currently active and traveling near your location
        </p>
      </div>

      {users.length === 0 ? (
        <div className="p-8 sm:p-14 text-center bg-white/70 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/20 max-w-xl mx-auto shadow-xs">
          <p className="text-base sm:text-lg font-bold text-[#181d1a]">
            No Active Travelers Nearby
          </p>
          <p className="text-xs sm:text-sm text-[#3f4944] mt-2 max-w-md mx-auto">
            No travelers are currently marked as traveling in your immediate area. Toggle &quot;Currently Traveling&quot; in your profile to let nearby explorers connect with you!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {users.map((traveler: UserWithDetails) => (
              <TravelerCard key={traveler.id} traveler={traveler} isNearBy />
            ))}
          </div>

          <Pagination
            onPageChange={setPage}
            page={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
