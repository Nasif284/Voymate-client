"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTravelerProfile } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { useGetProfileUpcomingTrips } from "@/src/features/user/trips/hooks/trip.hooks";
import { useSendConnectionRequest } from "@/src/features/user/matches-connections/hooks/connection.hooks";
import { BuddyRequestModal } from "../components/BuddyRequestModal";
import PublicProfileHero from "../components/public/PublicProfileHero";
import PublicProfileBio from "../components/public/PublicProfileBio";
import PublicProfileAttributes from "../components/public/PublicProfileAttributes";
import PublicProfileUpcomingTrips from "../components/public/PublicProfileUpcomingTrips";
import MessageButton from "../../chat/components/MessageButton";
import { formatDateRange } from "@/src/utils/date";
import { TripCardData } from "../../matches-connections/interfaces/profile-listing.interface";
import { Luggage, MessageSquare } from "lucide-react";

export default function NearbyProfile() {
  const [showBuddyRequestModal, setShowBuddyRequestModal] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tripIdParam = searchParams.get("tripId");

  const { data, isLoading } = useTravelerProfile(params.id as string);
  const user = data?.data;
  const { data: tripsData, isLoading: loadingTrips } = useGetProfileUpcomingTrips(
    user?.id
  );
  const sendRequest = useSendConnectionRequest();

  const tripPlans: TripCardData[] = tripsData?.data?.trips || [];
  const featuredTrip =
    tripPlans.find((t: TripCardData) => t.id === tripIdParam) || tripPlans[0];

  if (isLoading || loadingTrips) {
    return (
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-screen items-center justify-center bg-[#f7faf6]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#005440]/20 border-t-[#005440]" />
          <p className="text-xs font-medium text-[#404944]">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-screen items-center justify-center bg-[#f7faf6]">
        <div className="text-center p-6 bg-white rounded-2xl border border-[#bec9c3]/30 shadow-sm max-w-sm">
          <h2 className="text-lg font-bold text-[#181d1a]">User Not Found</h2>
          <p className="text-xs text-[#404944] mt-1 mb-4">
            The profile you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#005440] text-white rounded-xl text-xs font-bold hover:bg-[#003e2f] transition-all cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const firstName = user.fullName ? user.fullName.split(" ")[0] : "Traveler";

  return (
    <>
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 pb-24 lg:pb-12 min-h-screen bg-[#f7faf6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Open Trip Invitation Banner */}
          {featuredTrip && (
            <div className="relative overflow-hidden bg-gradient-to-r from-[#004736] via-[#0b634d] to-[#0f6e56] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md border border-[#2ea982]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 text-[#a0f3d4]">
                  <Luggage className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#a0f3d4] text-[#004736]">
                      Trip Companion Request
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white/90">
                      {formatDateRange(featuredTrip.dateFrom, featuredTrip.dateTo)}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-black text-white mt-1">
                    {firstName} is looking for mates for an upcoming trip to{" "}
                    {featuredTrip.destination.name.split(",")[0]}!
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/80 mt-0.5">
                    Would you like to travel together? Reach out directly and coordinate your journey.
                  </p>
                </div>
              </div>

              <MessageButton
                userId={user.id}
                className="px-4 py-2.5 sm:px-5 sm:py-3 bg-[#a0f3d4] hover:bg-[#85eec5] text-[#004736] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Message {firstName} to Join</span>
              </MessageButton>
            </div>
          )}

          {/* Hero Section */}
          <PublicProfileHero
            user={user}
            onOpenBuddyRequest={() => setShowBuddyRequestModal(true)}
          />

          {/* Main Grid: Bio, Upcoming Plans, Style & Attributes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <PublicProfileBio bio={user.bio} name={firstName} />
              <PublicProfileUpcomingTrips trips={tripPlans} />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <PublicProfileAttributes
                travelType={user.travelType}
                travelPersonality={user.travelPersonality}
                skills={user.skills}
                interests={user.interests}
                languages={user.languages}
              />
            </div>
          </div>
        </div>
      </main>

      <BuddyRequestModal
        isOpen={showBuddyRequestModal}
        onClose={() => setShowBuddyRequestModal(false)}
        user={{
          name: user.fullName,
          avatarUrl: user.avatarUrl,
        }}
        onSend={(message: string) => {
          sendRequest.mutate({
            receiverId: user.id,
            message,
          });
        }}
      />
    </>
  );
}
