"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BuddyRequestModal } from "../components/BuddyRequestModal";
import { useGetMatchProfile } from "@/src/features/user/matches-connections/hooks/matches.hooks";
import { useGetProfileUpcomingTrips } from "@/src/features/user/trips/hooks/trip.hooks";
import {
  useAcceptRequest,
  useGetAllRequests,
  useGetConnections,
  useSendConnectionRequest,
} from "@/src/features/user/matches-connections/hooks/connection.hooks";
import {
  Connection,
  TripCardData,
} from "../../matches-connections/interfaces/profile-listing.interface";
import InfoCard from "../components/InfoCard";
import { CalendarIcon, ChatIcon, CloseIcon, LocationIcon, MapIcon, PersonAddIcon, PersonIcon, SparkleIcon } from "@/src/assets/icons";
import { RequestData } from "../interfaces/profile.interface";

import MessageButton from "../../chat/components/MessageButton";
import { Users, Check } from "lucide-react";

export default function MatchProfile() {
  const [showBuddyRequestModal, setShowBuddyRequestModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetMatchProfile(params.matchId as string);
  const user = data?.data?.user;
  const match = data?.data?.match;
  const trip = data?.data?.matchedTrip;
  
  const { data: tripsData, isLoading: loadingTrips } = useGetProfileUpcomingTrips(user?.id);
  const sendRequest = useSendConnectionRequest();
  const acceptMutation = useAcceptRequest();
  const { data: requestsRes } = useGetAllRequests();
  const { data: connectionsRes } = useGetConnections();

  const isConnected =
    connectionsRes?.data?.connections?.some(
      (conn: Connection) => conn.userId === user?.id
    ) ?? false;

  const existingRequest = requestsRes?.data?.requests?.find(
    (e: RequestData) => e.senderId === user?.id || e.receiverId === user?.id
  );

  const isRequestSent = !isConnected && existingRequest?.receiverId === user?.id;
  const isRequestReceived = !isConnected && existingRequest?.senderId === user?.id;

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
  console.log("Trip:",trip);
  if (!user) {
    return (
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-screen items-center justify-center bg-[#f7faf6]">
        <div className="text-center p-6 bg-white rounded-2xl border border-[#bec9c3]/30 shadow-sm max-w-sm">
          <h2 className="text-lg font-bold text-[#181d1a]">Match Not Found</h2>
          <p className="text-xs text-[#404944] mt-1 mb-4">The match profile you are looking for does not exist or has expired.</p>
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

              {/* Action Buttons top right */}
              <div className="absolute top-4 right-4 flex items-center gap-2.5 z-10">
                {isConnected ? (
                  <>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/90 backdrop-blur-md text-[#005440] rounded-xl text-xs sm:text-sm font-bold shadow-md">
                      <Users className="w-3.5 h-3.5 text-[#005440] shrink-0" />
                      <span>Connected Mate</span>
                    </span>
                    <MessageButton
                      userId={user.id}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#005440] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-[#003e2f] active:scale-95 transition-all cursor-pointer"
                    >
                      <ChatIcon />
                      <span>Message</span>
                    </MessageButton>
                  </>
                ) : isRequestReceived ? (
                  <>
                    <MessageButton
                      userId={user.id}
                      className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-md text-[#005440] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
                    >
                      <ChatIcon />
                      <span>Message</span>
                    </MessageButton>
                    <button
                      onClick={() => {
                        if (existingRequest?.id) {
                          acceptMutation.mutate(existingRequest.id);
                        }
                      }}
                      disabled={acceptMutation.isPending}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#005440] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-[#003e2f] active:scale-95 transition-all cursor-pointer"
                    >
                      {acceptMutation.isPending ? (
                        <span>Accepting...</span>
                      ) : (
                        <>
                          <Check className="w-4 h-4 shrink-0" />
                          <span>Accept Request</span>
                        </>
                      )}
                    </button>
                  </>
                ) : isRequestSent ? (
                  <>
                    <MessageButton
                      userId={user.id}
                      className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-md text-[#005440] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
                    >
                      <ChatIcon />
                      <span>Message</span>
                    </MessageButton>
                    <button
                      disabled
                      className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#e0e3e0] text-[#a4a2a2] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md cursor-not-allowed"
                    >
                      <PersonAddIcon />
                      <span>Request Sent</span>
                    </button>
                  </>
                ) : (
                  <>
                    <MessageButton
                      userId={user.id}
                      className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-md text-[#005440] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
                    >
                      <ChatIcon />
                      <span>Message</span>
                    </MessageButton>
                    <button
                      onClick={() => setShowBuddyRequestModal(true)}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#005440] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-[#003e2f] active:scale-95 transition-all cursor-pointer"
                    >
                      <PersonAddIcon />
                      <span>Send Mate Request</span>
                    </button>
                  </>
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

                  {/* Name, Match Badge & Details */}
                  <div className="pb-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#181d1a] font-headline tracking-tight">
                        {user.fullName}{user.age ? `, ${user.age}` : ""}
                      </h1>
                      
                      {match?.totalPoints !== undefined && (
                        <span className="bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1 rounded-full tracking-wider flex items-center gap-1.5 shadow-xs">
                          <SparkleIcon /> {match.totalPoints}% Match
                        </span>
                      )}
                    </div>

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

          {/* ── Match Breakdown Section ───────────────────────────────────── */}
          {match && (
            <section className="bg-white rounded-3xl border border-[#bec9c3]/20 p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
                {/* Score Circle */}
                <div className="flex flex-col items-center justify-center flex-shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[6px] border-[#005440] flex flex-col items-center justify-center bg-[#c9eadb]/30 shadow-inner">
                    <span className="text-3xl sm:text-4xl font-black text-[#005440] font-headline">{match.totalPoints}%</span>
                    <span className="text-[10px] uppercase font-bold text-[#005440]/80 tracking-wider">Score</span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm font-bold text-[#181d1a]">Compatibility Score</p>
                </div>

                {/* Why You Match Reasons */}
                {match.explanation?.reasons && match.explanation.reasons.length > 0 && (
                  <div className="flex-1 w-full border-t md:border-t-0 md:border-l border-[#bec9c3]/20 pt-6 md:pt-0 md:pl-8">
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#181d1a] mb-4 font-headline flex items-center gap-2">
                      <span className="text-[#005440]"><SparkleIcon /></span>
                      Why You Match
                    </h2>

                    <div className="space-y-2.5">
                      {match.explanation.reasons.map((reason: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 bg-[#f7faf6] p-3 rounded-xl border border-[#bec9c3]/15">
                          <span className="w-5 h-5 rounded-full bg-[#005440]/10 text-[#005440] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#005440]" />
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-[#181d1a] leading-snug">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Matched Trip Section ─────────────────────────────────────── */}
          {trip && (
            <section className="bg-white rounded-3xl border border-[#bec9c3]/20 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <div className="p-6 sm:p-8 border-b border-[#bec9c3]/15">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#181d1a] font-headline flex items-center gap-2">
                  <span className="text-[#005440]"><MapIcon /></span>
                  Matched Trip Plan
                </h2>
              </div>

              <div className="relative h-48 sm:h-64 w-full bg-[#e0e3e0]">
                {trip.destination?.coverUrl ? (
                  <img src={trip.destination.coverUrl} alt={trip.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-[#005440]/20 to-[#005440]/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-black font-headline drop-shadow-md">{trip.name}</h3>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trip.destination?.name && <InfoCard title="Destination" value={trip.destination.name} />}
                  
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

                  {trip.travelStyle && <InfoCard title="Travel Style" value={trip.travelStyle} />}
                  {trip.budgetStyle && <InfoCard title="Budget Style" value={trip.budgetStyle} />}
                </div>
              </div>
            </section>
          )}

          {/* ── Main Content Grid: Bio & Sidebar ────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Left 2 Columns: Bio & Upcoming Plans */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              
              {/* Bio Card */}
              {user.bio && (
                <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#bec9c3]/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                  <h2 className="text-lg font-extrabold text-[#181d1a] mb-3 flex items-center gap-2 font-headline">
                    <span className="text-[#005440]">
                      <PersonIcon />
                    </span>
                    About {firstName}
                  </h2>
                  <p className="text-[#181d1a] leading-relaxed text-sm sm:text-base font-normal whitespace-pre-line">
                    {user.bio}
                  </p>
                </section>
              )}

              {/* Upcoming Travel Plans */}
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
                    {tripPlans.map((t: TripCardData) => (
                      <div
                        key={t.id}
                        className="bg-[#f7faf6] rounded-2xl overflow-hidden border border-[#bec9c3]/20 group cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="h-32 w-full overflow-hidden relative">
                          <img
                            src={t.destination?.coverUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"}
                            alt={t.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <span className="absolute bottom-2 left-3 text-xs font-bold text-white drop-shadow-sm">
                            {t.destination?.name || "Trip"}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold text-[#005440] text-sm group-hover:underline truncate">
                            {t.name}
                          </h3>
                          <p className="text-xs text-[#404944] mt-1 flex items-center gap-1 font-medium">
                            <CalendarIcon />
                            {new Date(t.dateFrom).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                            })}
                            {" - "}
                            {new Date(t.dateTo).toLocaleDateString("en-US", {
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

            {/* Right Column: Style, Personality, Skills, Interests & Languages */}
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

      {/* ── Responsive Floating Bottom CTA Banner ────────────────────────────── */}
      {!bannerDismissed && !isConnected && !isRequestSent && !isRequestReceived && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 lg:left-[calc(50%+128px)] -translate-x-1/2 w-[calc(100%-32px)] max-w-xl bg-[#005440] text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between z-40 border border-[#005440]/30 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden hidden sm:block flex-shrink-0">
              <img
                src={user.avatarUrl || "https://lh3.googleusercontent.com/aida-public/default-avatar"}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-xs sm:text-sm leading-tight truncate">
                Connect with {firstName}
              </p>
              <p className="text-[11px] text-[#c9eadb] truncate">
                {match?.totalPoints ? `${match.totalPoints}% Match compatibility` : "Start a travel mate request"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => setShowBuddyRequestModal(true)}
              className="bg-white text-[#005440] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#f1f4f1] active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              Send Request
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss banner"
              className="p-1.5 text-[#c9eadb] hover:text-white transition-colors cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}

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
              matchId: match?.id,
              receiverId: user.id,
              message,
            });
          }}
        />
      )}
    </>
  );
}
