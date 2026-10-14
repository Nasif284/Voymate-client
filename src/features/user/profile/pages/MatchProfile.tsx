"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BuddyRequestModal } from "../components/BuddyRequestModal";
import { useGetMatchProfile } from "@/src/features/user/matches-connections/hooks/matches.hooks";
import { useGetProfileUpcomingTrips } from "@/src/features/user/trips/hooks/trip.hooks";
import { useSendConnectionRequest } from "@/src/features/user/matches-connections/hooks/connection.hooks";
import InfoCard from "../components/InfoCard";
import PublicProfileHero from "../components/public/PublicProfileHero";
import PublicProfileBio from "../components/public/PublicProfileBio";
import PublicProfileAttributes from "../components/public/PublicProfileAttributes";
import PublicProfileUpcomingTrips from "../components/public/PublicProfileUpcomingTrips";
import { Sparkles, MapPin, Check } from "lucide-react";

export default function MatchProfile() {
  const [showBuddyRequestModal, setShowBuddyRequestModal] = useState(false);
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetMatchProfile(params.matchId as string);
  const user = data?.data?.user;
  const match = data?.data?.match;
  const trip = data?.data?.matchedTrip;

  const { data: tripsData, isLoading: loadingTrips } = useGetProfileUpcomingTrips(
    user?.id
  );
  const sendRequest = useSendConnectionRequest();

  const tripPlans = tripsData?.data?.trips || [];

  if (isLoading || loadingTrips) {
    return (
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-screen items-center justify-center bg-[#f7faf6]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#005440]/20 border-t-[#005440]" />
          <p className="text-xs font-medium text-[#404944]">Loading match profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-screen items-center justify-center bg-[#f7faf6]">
        <div className="text-center p-6 bg-white rounded-2xl border border-[#bec9c3]/30 shadow-sm max-w-sm">
          <h2 className="text-lg font-bold text-[#181d1a]">Match Not Found</h2>
          <p className="text-xs text-[#404944] mt-1 mb-4">
            The match profile you are looking for does not exist or has expired.
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
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 pb-32 lg:pb-16 min-h-screen bg-[#f7faf6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Public Profile Hero */}
          <PublicProfileHero
            user={user}
            matchScore={match?.totalPoints}
            onOpenBuddyRequest={() => setShowBuddyRequestModal(true)}
          />

          {/* Match Compatibility Breakdown */}
          {match && (
            <section className="bg-white rounded-3xl border border-[#bec9c3]/20 p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
                {/* Score Circle */}
                <div className="flex flex-col items-center justify-center shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[6px] border-[#005440] flex flex-col items-center justify-center bg-[#c9eadb]/30 shadow-inner">
                    <span className="text-3xl sm:text-4xl font-black text-[#005440] font-headline">
                      {match.totalPoints}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#005440]/80 tracking-wider">
                      Score
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm font-bold text-[#181d1a]">
                    Compatibility Score
                  </p>
                </div>

                {/* Match Reasons */}
                {match.explanation?.reasons && match.explanation.reasons.length > 0 && (
                  <div className="flex-1 w-full border-t md:border-t-0 md:border-l border-[#bec9c3]/20 pt-6 md:pt-0 md:pl-8">
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#181d1a] mb-4 font-headline flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#005440]" />
                      <span>Why You Match</span>
                    </h2>

                    <div className="space-y-2.5">
                      {match.explanation.reasons.map((reason: string) => (
                        <div
                          key={reason}
                          className="flex items-start gap-3 bg-[#f7faf6] p-3 rounded-xl border border-[#bec9c3]/15"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#005440]/10 text-[#005440] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#005440]" />
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-[#181d1a] leading-snug">
                            {reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Matched Trip Plan Section */}
          {trip && (
            <section className="bg-white rounded-3xl border border-[#bec9c3]/20 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <div className="p-6 sm:p-8 border-b border-[#bec9c3]/15">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#181d1a] font-headline flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#005440]" />
                  <span>Matched Trip Plan</span>
                </h2>
              </div>

              <div className="relative h-48 sm:h-64 w-full bg-[#e0e3e0]">
                {trip.destination?.coverUrl ? (
                  <img
                    src={trip.destination.coverUrl}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-[#005440]/20 to-[#005440]/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-black font-headline drop-shadow-md">
                    {trip.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trip.destination?.name && (
                    <InfoCard title="Destination" value={trip.destination.name} />
                  )}

                  {trip.dateFrom && trip.dateTo && (
                    <InfoCard
                      title="Travel Dates"
                      value={`${new Date(trip.dateFrom).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                      })} - ${new Date(trip.dateTo).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}`}
                    />
                  )}

                  {trip.travelStyle && (
                    <InfoCard title="Travel Style" value={trip.travelStyle} />
                  )}
                  {trip.budgetStyle && (
                    <InfoCard title="Budget Style" value={trip.budgetStyle} />
                  )}
                </div>
              </div>
            </section>
          )}

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
