"use client";

import { useState } from "react";
import Link from "next/link";
import { UserWithDetails } from "../../../../Interfaces/users.interface";
import MessageButton from "../../chat/components/MessageButton";
import { BuddyRequestModal } from "../../profile/components/BuddyRequestModal";
import { useConnectionStatus } from "../hooks/useConnectionStatus";
import { formatDateRange } from "@/src/utils/date";
import {
  Calendar,
  Luggage,
  UserCheck,
  UserPlus,
  Clock,
  MapPin,
  MessageSquare,
  Check,
} from "lucide-react";

export interface TravelerCardProps {
  readonly traveler: UserWithDetails;
  readonly isNearBy?: boolean;
  readonly destination?: string;
  readonly dateRange?: { from?: Date | string; to?: Date | string };
  readonly matchScore?: number | null;
  readonly profileUrl?: string;
  readonly mode?: "TRIP" | "SEARCH";
  readonly requestId?: string;
  readonly connectionStatus?: "CONNECTED" | "REQUEST_RECEIVED" | "REQUEST_SENT" | "NONE";
}

export default function TravelerCard({
  traveler,
  isNearBy = false,
  destination,
  dateRange,
  matchScore,
  profileUrl,
  requestId,
  connectionStatus: propConnectionStatus,
}: TravelerCardProps) {
  const [showBuddyRequestModal, setShowBuddyRequestModal] = useState(false);

  const {
    isConnected: hookConnected,
    isRequestReceived: hookReceived,
    isRequestSent: hookSent,
    existingRequest,
    acceptRequest,
    sendRequest,
  } = useConnectionStatus(traveler.id);

  const isConnected =
    propConnectionStatus === "CONNECTED" || hookConnected;

  const isRequestReceived =
    !isConnected &&
    (propConnectionStatus === "REQUEST_RECEIVED" || hookReceived);

  const isRequestSent =
    !isConnected &&
    (propConnectionStatus === "REQUEST_SENT" || hookSent);

  const targetRequestId = requestId || existingRequest?.id;

  const travelDateRange = dateRange?.from
    ? formatDateRange(dateRange.from, dateRange.to)
    : traveler.activeTrip
    ? formatDateRange(traveler.activeTrip.dateFrom, traveler.activeTrip.dateTo)
    : "";

  const effectiveDestination =
    destination ||
    traveler.activeTrip?.destination ||
    traveler.activeTrip?.name;

  const defaultProfileUrl = traveler.activeTrip?.id
    ? `/profile/${traveler.id}?tripId=${traveler.activeTrip.id}`
    : `/profile/${traveler.id}`;

  const effectiveProfileUrl = profileUrl || defaultProfileUrl;

  return (
    <>
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 shadow-sm border border-[#bec9c3]/15">
        <div className="h-20 sm:h-[160px] relative">
          <img
            src={traveler.coverUrl}
            alt={`${traveler.fullName}'s cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Left Top Corner - Travel Date Range / Distance Badge / Connection Status */}
          {travelDateRange ? (
            <div
              className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-black/60 text-white text-[8px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10 max-w-[60%] truncate"
              title={travelDateRange}
            >
              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white flex-shrink-0" />
              <span className="truncate">{travelDateRange}</span>
            </div>
          ) : isNearBy && traveler.distanceKm != null ? (
            <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-black/60 text-white text-[8px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10 max-w-[60%] truncate">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white flex-shrink-0" />
              <span className="truncate">{traveler.distanceKm} km away</span>
            </div>
          ) : isConnected ? (
            <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-[#005440]/90 text-white text-[8px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10">
              <UserCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0" />
              <span className="truncate">Connected Mate</span>
            </div>
          ) : isRequestReceived ? (
            <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-[#004736]/90 text-[#a0f3d4] text-[8px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10 border border-[#a0f3d4]/30">
              <UserPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#a0f3d4] shrink-0" />
              <span className="truncate">Sent You Request</span>
            </div>
          ) : isRequestSent ? (
            <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-black/60 text-white/90 text-[8px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/90 shrink-0" />
              <span className="truncate">Request Sent</span>
            </div>
          ) : null}

          {/* Top Right Corner - Match Badge OR Distance Badge OR Connection Status Badge */}
          {matchScore != null ? (
            <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-[#005440]/90 text-white text-[8px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs z-10">
              <span className="sm:hidden">{matchScore}%</span>
              <span className="hidden sm:inline">{matchScore}% match</span>
            </div>
          ) : isNearBy && travelDateRange && traveler.distanceKm != null ? (
            <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-black/60 text-white text-[8px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10">
              <span className="truncate">{traveler.distanceKm} km</span>
            </div>
          ) : isNearBy && isConnected ? (
            <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-[#005440]/90 text-white text-[8px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10">
              <UserCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0" />
              <span className="truncate">Connected</span>
            </div>
          ) : isNearBy && isRequestReceived ? (
            <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-[#004736]/90 text-[#a0f3d4] text-[8px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10 border border-[#a0f3d4]/30">
              <UserPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#a0f3d4] shrink-0" />
              <span className="truncate">Requested</span>
            </div>
          ) : isNearBy && isRequestSent ? (
            <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-black/60 text-white/90 text-[8px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md shadow-xs flex items-center gap-1 z-10">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/90 shrink-0" />
              <span className="truncate">Sent</span>
            </div>
          ) : null}

          {/* Avatar floating */}
          <div className="absolute bottom-0 left-2 sm:left-6 translate-y-1/2 z-10">
            <Link href={effectiveProfileUrl}>
              <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-full border-2 sm:border-4 border-white overflow-hidden shadow-md bg-white hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={traveler.avatarUrl}
                  alt={traveler.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="pt-6 sm:pt-9 px-2 sm:px-4 pb-2.5 sm:pb-5 flex flex-col flex-grow text-left">
          <div className="mb-0.5 sm:mb-2">
            <Link href={effectiveProfileUrl} className="hover:underline">
              <h2
                className="text-xs sm:text-lg font-bold text-[#181d1a] truncate leading-tight"
                title={`${traveler.fullName}, ${traveler.age}`}
              >
                {traveler.fullName}, {traveler.age}
              </h2>
            </Link>

            <p className="text-[9px] sm:text-xs text-[#3f4944] flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3f4944] shrink-0" />
              <span className="truncate">
                {traveler.state}, {traveler.country}
              </span>
            </p>
          </div>

          {/* Trip / Destination Badge */}
          {effectiveDestination && (
            <div className="flex items-center gap-1 sm:gap-1.5 my-1 sm:mt-2 sm:mb-2 flex-wrap w-full">
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-[#005440] text-white rounded-full text-[8px] sm:text-[10px] font-bold shrink-0 truncate max-w-full shadow-2xs"
                title={effectiveDestination}
              >
                <Luggage className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0" />
                <span className="truncate">{effectiveDestination}</span>
              </span>
            </div>
          )}

          {/* Interests Tags */}
          {traveler.interests && traveler.interests.length > 0 && (
            <div className="flex items-center gap-1 my-1 sm:mb-3 sm:mt-1 flex-nowrap overflow-hidden">
              {traveler.interests.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] sm:text-[9px] font-bold text-[#6f7a74] py-0.5 px-1.5 sm:py-1 sm:px-2 bg-[#ebefeb] rounded-md sm:rounded-lg truncate shrink-0 max-w-[65px] min-[380px]:max-w-[85px] sm:max-w-none"
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
                </span>
              ))}
              {traveler.interests.length > 2 && (
                <span className="text-[8px] sm:text-[9px] font-bold text-[#6f7a74] py-0.5 px-1 sm:py-1 sm:px-2 bg-[#ebefeb] rounded-md sm:rounded-lg shrink-0">
                  +{traveler.interests.length - 2}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex gap-2 pt-1 sm:pt-2">
            <Link
              href={effectiveProfileUrl}
              className="hidden sm:flex flex-1 items-center justify-center min-h-[40px] text-center text-xs font-bold text-[#005440] hover:bg-[#e5e9e5] rounded-xl transition-colors border border-[#bec9c3]/30 px-2"
            >
              View profile
            </Link>

            {/* Smart Action Button based on connection status */}
            {isConnected ? (
              <MessageButton
                userId={traveler.id}
                className="w-full sm:flex-1 h-7 sm:h-10 min-h-[26px] sm:min-h-[40px] text-[9px] sm:text-xs font-bold bg-[#0f6e56] text-white rounded-md sm:rounded-xl hover:bg-[#005440] transition-all active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-2"
              >
                <MessageSquare className="w-3 h-3 shrink-0" />
                <span>Message</span>
              </MessageButton>
            ) : isRequestReceived ? (
              <button
                onClick={() => {
                  if (targetRequestId) {
                    acceptRequest.mutate(targetRequestId);
                  }
                }}
                disabled={acceptRequest.isPending}
                className="w-full sm:flex-1 h-7 sm:h-10 min-h-[26px] sm:min-h-[40px] text-[9px] sm:text-xs font-bold bg-[#005440] text-white rounded-md sm:rounded-xl hover:bg-[#0f6e56] transition-all active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-2"
              >
                <Check className="w-3 h-3 text-white flex-shrink-0" />
                <span>{acceptRequest.isPending ? "Accepting..." : "Accept"}</span>
              </button>
            ) : isRequestSent ? (
              <button
                disabled
                className="w-full sm:flex-1 h-7 sm:h-10 min-h-[26px] sm:min-h-[40px] text-[9px] sm:text-xs font-bold bg-[#e0e3e0] text-[#a4a2a2] cursor-not-allowed rounded-md sm:rounded-xl flex items-center justify-center px-1.5 sm:px-2"
              >
                Request sent
              </button>
            ) : (
              <button
                onClick={() => setShowBuddyRequestModal(true)}
                disabled={sendRequest.isPending}
                className="w-full sm:flex-1 h-7 sm:h-10 min-h-[26px] sm:min-h-[40px] text-[9px] sm:text-xs font-bold bg-[#0f6e56] text-white rounded-md sm:rounded-xl hover:bg-[#005440] transition-all active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-3 h-3 text-white flex-shrink-0" />
                <span>{sendRequest.isPending ? "Sending..." : "Request"}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <BuddyRequestModal
        isOpen={showBuddyRequestModal}
        onClose={() => setShowBuddyRequestModal(false)}
        user={{
          name: traveler.fullName,
          avatarUrl: traveler.avatarUrl,
        }}
        onSend={(message: string) => {
          sendRequest.mutate({
            receiverId: traveler.id,
            message,
          });
        }}
      />
    </>
  );
}
