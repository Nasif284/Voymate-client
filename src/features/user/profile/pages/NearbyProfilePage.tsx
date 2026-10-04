"use client";

import { useState } from "react";
import Link from "next/link";
import { useTravelerProfile } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetProfileUpcomingTrips } from "@/src/features/user/trips/hooks/trip.hooks";
import {
  Connection,
  TripCardData,
} from "../../matches-connections/interfaces/profile-listing.interface";
import { CalendarIcon, ChatIcon, LocationIcon, MapIcon, PersonAddIcon, PersonIcon } from "@/src/assets/icons";
import { BuddyRequestModal } from "../components/BuddyRequestModal";
import {
  useGetAllRequests,
  useGetConnections,
  useSendConnectionRequest,
} from "@/src/features/user/matches-connections/hooks/connection.hooks";
import { RequestData } from "../interfaces/profile.interface";

import MessageButton from "../../chat/components/MessageButton";
import { Luggage, Users, Sparkles, Check } from "lucide-react";

const formatDateRange = (from?: Date | string, to?: Date | string) => {
  if (!from) return "";
  const dFrom = new Date(from);
  const dTo = to ? new Date(to) : null;
  if (isNaN(dFrom.getTime())) return "";

  const fromMonth = dFrom.toLocaleDateString("en-US", { month: "short" });
  const fromDay = dFrom.getDate();
  if (!dTo || isNaN(dTo.getTime())) return `${fromMonth} ${fromDay}`;

  const toMonth = dTo.toLocaleDateString("en-US", { month: "short" });
  const toDay = dTo.getDate();
  if (fromMonth === toMonth) {
    return `${fromMonth} ${fromDay} - ${toDay}`;
  }
  return `${fromMonth} ${fromDay} - ${toMonth} ${toDay}`;
};

export default function NearbyProfile() {
  const [showBuddyRequestModal, setShowBuddyRequestModal] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tripIdParam = searchParams.get("tripId");

  const { data, isLoading } = useTravelerProfile(params.id as string);
  const user = data?.data;
  const { data: tripsData, isLoading: loadingTrips } = useGetProfileUpcomingTrips(user?.id);

  const sendRequest = useSendConnectionRequest();
  const { data: requestsRes } = useGetAllRequests();
  const { data: connectionsRes } = useGetConnections();

  const isConnected =
    connectionsRes?.data?.connections?.some(
      (conn: Connection) => conn.userId === user?.id
    ) ?? false;

  const requestSent = requestsRes?.data?.requests?.some(
    (e: RequestData) => e.senderId === user?.id || e.receiverId === user?.id
  ) ?? false;

  const tripPlans: TripCardData[] = tripsData?.data?.trips || [];
  const featuredTrip = tripPlans.find((t: TripCardData) => t.id === tripIdParam) || tripPlans[0];

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
          <p className="text-xs text-[#404944] mt-1 mb-4">The profile you are looking for does not exist or has been removed.</p>
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

  return (
    <>
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 pb-24 lg:pb-12 min-h-screen bg-[#f7faf6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* ── Open Trip Invitation Banner (Shown when user has an upcoming trip) ── */}
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
                    {user.fullName.split(" ")[0]} is looking for buddies for an upcoming trip to {featuredTrip.destination.name.split(",")[0]}!
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
                <ChatIcon />
                <span>Message {user.fullName.split(" ")[0]} to Join</span>
              </MessageButton>
            </div>
          )}

          {/* ── Hero & Cover Section ───────────────────────────────────────── */}
          <section className="bg-white rounded-3xl border border-[#bec9c3]/20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* Cover image */}
            <div className="relative w-full h-44 sm:h-60 md:h-72 bg-[#e0e3e0]">
              {user.coverUrl ? (
                <img src={user.coverUrl} alt={`${user.fullName}'s cover`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-[#005440]/30 to-[#005440]/10" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 flex items-center gap-2.5 z-10">
                {isConnected && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/90 backdrop-blur-md text-[#005440] rounded-xl text-xs sm:text-sm font-bold shadow-md">
                    <Users className="w-3.5 h-3.5 text-[#005440] shrink-0" />
                    <span>Connected Buddy</span>
                  </span>
                )}

                <MessageButton
                  userId={user.id}
                  className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-md text-[#005440] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
                >
                  <ChatIcon />
                  <span>Message</span>
                </MessageButton>

                {!isConnected && (
                  <button
                    onClick={() => setShowBuddyRequestModal(true)}
                    disabled={requestSent}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#005440] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-[#003e2f] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <PersonAddIcon />
                    <span>{requestSent ? "Request Sent" : "Connect"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Avatar & Info Row */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={user.avatarUrl || "https://lh3.googleusercontent.com/aida-public/default-avatar"}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Details */}
                  <div className="pb-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#181d1a] font-headline tracking-tight">
                      {user.fullName}{user.age ? `, ${user.age}` : ""}
                    </h1>
                    
                    <div className="flex items-center gap-3 sm:gap-4 mt-1.5 text-xs sm:text-sm text-[#404944] font-medium flex-wrap">
                      {(user.state || user.country) && (
                        <span className="flex items-center gap-1.5">
                          <span className="text-[#005440]"><LocationIcon /></span>
                          {[user.state, user.country].filter(Boolean).join(", ")}
                        </span>
                      )}
                      
                      {user.createdAt && (
                        <span className="flex items-center gap-1.5">
                          <span className="text-[#005440]"><CalendarIcon /></span>
                          Member since{" "}
                          {new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Main Content Grid ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Left 2 Columns: Bio & Travel Plans */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">

              {/* Bio Card */}
              {user.bio && (
                <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#bec9c3]/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                  <h2 className="text-lg font-extrabold text-[#181d1a] mb-3 flex items-center gap-2 font-headline">
                    <span className="text-[#005440]">
                      <PersonIcon />
                    </span>
                    About Me
                  </h2>
                  <p className="text-[#181d1a] leading-relaxed text-sm sm:text-base font-normal whitespace-pre-line">
                    {user.bio}
                  </p>
                </section>
              )}

              {/* Upcoming Travel Plans Card */}
              {tripPlans.length > 0 && (
                <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#bec9c3]/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                  <h2 className="text-lg font-extrabold text-[#181d1a] mb-5 flex items-center justify-between font-headline">
                    <span className="flex items-center gap-2">
                      <span className="text-[#005440]">
                        <MapIcon />
                      </span>
                      Upcoming Travel Plans
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tripPlans.map((trip: TripCardData) => (
                      <div
                        key={trip.id}
                        className="bg-[#f7faf6] rounded-2xl overflow-hidden border border-[#bec9c3]/20 group cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="h-32 w-full overflow-hidden relative">
                          <img
                            src={trip.destination?.coverUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"}
                            alt={trip.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <span className="absolute bottom-2 left-3 text-xs font-bold text-white drop-shadow-sm">
                            {trip.destination?.name || "Trip"}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold text-[#005440] text-sm group-hover:underline truncate">
                            {trip.name}
                          </h3>
                          <p className="text-xs text-[#404944] mt-1 flex items-center gap-1 font-medium">
                            <CalendarIcon />
                            {new Date(trip.dateFrom).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                            })}
                            {" - "}
                            {new Date(trip.dateTo).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column: Travel Style, Personality, Skills, Interests & Languages */}
            <div className="space-y-6 sm:space-y-8">
              
              <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#bec9c3]/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-6">
                
                {/* Travel Style */}
                {user.travelType && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
                      Travel Style
                    </h3>
                    <span className="inline-block bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1.5 rounded-full">
                      {user.travelType}
                    </span>
                  </div>
                )}

                {/* Travel Personality */}
                {user.travelPersonality && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
                      Travel Personality
                    </h3>
                    <span className="inline-block bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1.5 rounded-full">
                      {user.travelPersonality}
                    </span>
                  </div>
                )}

                {/* Skills */}
                {user.skills && user.skills.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {user.skills.map((skill: string) => (
                        <span key={skill} className="bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interests */}
                {user.interests && user.interests.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
                      Interests
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {user.interests.map((interest: string) => (
                        <span key={interest} className="bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1.5 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {user.languages && user.languages.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {user.languages.map((lang: string) => (
                        <span key={lang} className="bg-[#e0e3e0] text-[#181d1a] text-xs font-semibold px-3 py-1 rounded-lg">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </section>

            </div>

          </div>

        </div>
      </main>

      {/* Buddy Request Modal */}
      {user && (
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
      )}
    </>
  );
}
