"use client";

import RightSidebar from "../../components/RightSide";
import NearbyTravelers from "../../features/user/matches-connections/components/NearbyTravelers";
import BuddiesUpcomingTrips from "../../features/user/matches-connections/components/BuddiesUpcomingTrips";
import TripMatchesSection from "../../features/user/matches-connections/components/TripMatchesSection";
import DiscoverBuddiesSection from "../../features/user/matches-connections/components/DiscoverBuddiesSection";
import {
  useGetActiveTrip,
  useGetBuddiesUpcomingTrips,
  useGetAllTripMatches,
} from "@/src/features/user/matches-connections/hooks/matches.hooks";
import { useGetNearbyUsers } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { useGetLocation } from "@/src/hooks/api/location.hooks";
import LoadingSpinner from "@/src/components/Loading";
import { MapPin } from "lucide-react";
import { UserWithDetails } from "@/src/Interfaces/users.interface";

export default function DashboardPage() {
  const { data: activeTrip, isLoading: loadingActiveTrip } = useGetActiveTrip();
  const { data: locationData, isLoading: loadingLocation } = useGetLocation();
  const hasLocation = !!locationData?.data?.state;

  const { data: nearbyResponse, isLoading: loadingNearby } = useGetNearbyUsers(
    { page: 1, limit: 6 },
    hasLocation
  );
  const { data: buddiesResponse, isLoading: loadingBuddies } =
    useGetBuddiesUpcomingTrips();
  const { data: allMatchesResponse, isLoading: loadingTripMatches } =
    useGetAllTripMatches({
      page: 1,
      limit: 6,
    });

  const trip = activeTrip?.data;
  const isInitialLoading =
    loadingActiveTrip ||
    (loadingNearby && loadingBuddies && loadingTripMatches);

  if (isInitialLoading) {
    return (
      <main className="ml-0 lg:ml-64 pt-20 sm:pt-24 pb-12 px-4 sm:px-8 md:px-12 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </main>
    );
  }

  const hasBuddies = (buddiesResponse?.data?.trips?.length ?? 0) > 0;
  const hasTripMatches = (allMatchesResponse?.data?.matches?.length ?? 0) > 0;
  const hasNearby =
    (nearbyResponse?.data?.users?.filter((u: UserWithDetails) => u.isTraveling !== false)?.length ?? 0) > 0;

  // Build list of populated sections in optimal priority order:
  // 1. Nearby travelers in the user's locality
  // 2. Buddies looking for companions (highest social intent)
  // 3. Trip matches aggregated across all user trips (destination + date overlap)
  const populatedSections: Array<{
    id: "NEARBY" | "BUDDIES" | "TRIP_MATCHES";
    render: () => React.ReactNode;
  }> = [];

  if (hasNearby) {
    populatedSections.push({
      id: "NEARBY",
      render: () => (
        <section key="nearby" className="mb-10 sm:mb-16">
          <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440]">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#005440]" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#181d1a] tracking-tight font-headline">
                  Find Who Is Traveling Near You
                </h2>
              </div>
              <p className="text-[#3f4944] text-xs sm:text-sm md:text-base">
                Discover your perfect travel companion near you.
              </p>
            </div>
          </header>
          <NearbyTravelers hideIfEmpty={true} />
        </section>
      ),
    });
  }

  if (hasBuddies) {
    populatedSections.push({
      id: "BUDDIES",
      render: () => <BuddiesUpcomingTrips key="buddies" />,
    });
  }

  if (hasTripMatches) {
    populatedSections.push({
      id: "TRIP_MATCHES",
      render: () => <TripMatchesSection key="trip_matches" />,
    });
  }

  return (
    <>
      {trip?.name && <RightSidebar />}
      <main
        className={`ml-0 lg:ml-64 ${
          trip?.name && "lg:mr-80"
        } pt-20 sm:pt-24 pb-12 px-4 sm:px-8 md:px-12 min-h-screen`}
      >
        {/* Render all valid populated sections (Buddies' upcoming trips, Trip matches, Nearby travelers) */}
        {populatedSections.map((section) => section.render())}

        {/* Profiles Actively Looking for Buddies: Always shown after all valid sections, or as primary if none exist */}
        <DiscoverBuddiesSection
          isOnlySection={populatedSections.length === 0}
        />
      </main>
    </>
  );
}
