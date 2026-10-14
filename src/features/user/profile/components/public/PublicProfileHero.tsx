"use client";

import { useConnectionStatus } from "@/src/features/user/matches-connections/hooks/useConnectionStatus";
import MessageButton from "@/src/features/user/chat/components/MessageButton";
import {
  Users,
  Check,
  UserPlus,
  MapPin,
  Calendar,
  Sparkles,
  MessageSquare,
} from "lucide-react";

interface PublicProfileHeroUser {
  id: string;
  fullName: string;
  age?: number | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  state?: string | null;
  country?: string | null;
  createdAt?: Date | string | null;
}

interface PublicProfileHeroProps {
  user: PublicProfileHeroUser;
  matchScore?: number | null;
  onOpenBuddyRequest: () => void;
}

export default function PublicProfileHero({
  user,
  matchScore,
  onOpenBuddyRequest,
}: Readonly<PublicProfileHeroProps>) {
  const {
    isConnected,
    isRequestReceived,
    isRequestSent,
    existingRequest,
    acceptRequest,
  } = useConnectionStatus(user.id);

  return (
    <section className="bg-white rounded-3xl border border-[#bec9c3]/20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Cover image */}
      <div className="relative w-full h-44 sm:h-60 md:h-72 bg-[#e0e3e0]">
        {user.coverUrl ? (
          <img
            src={user.coverUrl}
            alt={`${user.fullName}'s cover`}
            className="w-full h-full object-cover"
          />
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
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Message</span>
              </MessageButton>
            </>
          ) : isRequestReceived ? (
            <>
              <MessageButton
                userId={user.id}
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-md text-[#005440] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Message</span>
              </MessageButton>
              <button
                onClick={() => {
                  if (existingRequest?.id) {
                    acceptRequest.mutate(existingRequest.id);
                  }
                }}
                disabled={acceptRequest.isPending}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#005440] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-[#003e2f] active:scale-95 transition-all cursor-pointer"
              >
                {acceptRequest.isPending ? (
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
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Message</span>
              </MessageButton>
              <button
                disabled
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#e0e3e0] text-[#a4a2a2] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md cursor-not-allowed"
              >
                <UserPlus className="w-4 h-4 shrink-0" />
                <span>Request Sent</span>
              </button>
            </>
          ) : (
            <>
              <MessageButton
                userId={user.id}
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-md text-[#005440] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Message</span>
              </MessageButton>
              <button
                onClick={onOpenBuddyRequest}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#005440] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:bg-[#003e2f] active:scale-95 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 shrink-0" />
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
                src={
                  user.avatarUrl ||
                  "https://lh3.googleusercontent.com/aida-public/default-avatar"
                }
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name, Match Badge & Details */}
            <div className="pb-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#181d1a] font-headline tracking-tight">
                  {user.fullName}
                  {user.age ? `, ${user.age}` : ""}
                </h1>

                {matchScore !== undefined && matchScore !== null && (
                  <span className="bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1 rounded-full tracking-wider flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#005440]" />
                    <span>{matchScore}% Match</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 sm:gap-4 mt-1.5 text-xs sm:text-sm text-[#404944] font-medium flex-wrap">
                {(user.state || user.country) && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#005440] shrink-0" />
                    <span>{[user.state, user.country].filter(Boolean).join(", ")}</span>
                  </span>
                )}

                {user.createdAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#005440] shrink-0" />
                    <span>
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
