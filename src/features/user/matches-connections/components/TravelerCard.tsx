"use client";

import { useState } from "react";
import { UserWithDetails } from "../../../../Interfaces/users.interface";
import Link from "next/link";
import { LocationIcon } from "@/src/assets/icons";
import MessageButton from "../../chat/components/MessageButton";
import {
  useAcceptRequest,
  useGetAllRequests,
  useGetConnections,
  useSendConnectionRequest,
} from "../hooks/connection.hooks";
import { BuddyRequestModal } from "../../profile/components/BuddyRequestModal";
import { RequestData } from "../../profile/interfaces/profile.interface";
import {
  Calendar,
  Luggage,
  UserCheck,
  UserPlus,
  Clock,
} from "lucide-react";

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
  mode = "TRIP",
  requestId,
  connectionStatus,
}: TravelerCardProps) {
  const [showBuddyRequestModal, setShowBuddyRequestModal] = useState(false);
  const requestMutation = useSendConnectionRequest();
  const acceptMutation = useAcceptRequest();
  const { data: requestsRes } = useGetAllRequests();
  const { data: connectionsRes } = useGetConnections();

  const isConnected =
    connectionStatus === "CONNECTED" ||
    Boolean(
      connectionsRes?.data?.connections?.some(
        (c: { id: string }) => c.id === traveler.id
      )
    );

  const existingReq = requestsRes?.data?.requests?.find(
    (e: RequestData) =>
      e.senderId === traveler?.id || e.receiverId === traveler?.id
  );

  let isRequestReceived = false;
  let isRequestSent = false;
  let targetRequestId: string | undefined = requestId;

  if (existingReq && !isConnected) {
    if (existingReq.senderId === traveler?.id) {
      isRequestReceived = true;
      targetRequestId = existingReq.id;
    } else {
      isRequestSent = true;
      targetRequestId = existingReq.id;
    }
  } else if (!isConnected) {
    if (connectionStatus === "REQUEST_RECEIVED") {
      isRequestReceived = true;
    } else if (connectionStatus === "REQUEST_SENT") {
      isRequestSent = true;
    }
  }

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
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
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

            <p className="text-[9px] sm:text-xs text-[#3f4944] flex items-center gap-0.5 mt-0.5 truncate">
              <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 flex items-center justify-center text-[#3f4944] scale-90 sm:scale-100">
                <LocationIcon />
              </span>
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

          {/* Interests Tags - Capitalized (Title Case) with +N Badge on Mobile & Desktop */}
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
            {/* Profile button - visible only on desktop / sm screens */}
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
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Message</span>
              </MessageButton>
            ) : isRequestReceived ? (
              <button
                onClick={() => {
                  if (targetRequestId) {
                    acceptMutation.mutate(targetRequestId);
                  }
                }}
                disabled={acceptMutation.isPending}
                className="w-full sm:flex-1 h-7 sm:h-10 min-h-[26px] sm:min-h-[40px] text-[9px] sm:text-xs font-bold bg-[#005440] text-white rounded-md sm:rounded-xl hover:bg-[#0f6e56] transition-all active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-2"
              >
                <svg
                  className="w-3 h-3 text-white flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{acceptMutation.isPending ? "Accepting..." : "Accept"}</span>
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
                onClick={() => {
                  setShowBuddyRequestModal(true);
                }}
                disabled={requestMutation.isPending}
                className="w-full sm:flex-1 h-7 sm:h-10 min-h-[26px] sm:min-h-[40px] text-[9px] sm:text-xs font-bold bg-[#0f6e56] text-white rounded-md sm:rounded-xl hover:bg-[#005440] transition-all active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current flex-shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8H4v2H2v2h2v2h2v-2h2v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>{requestMutation.isPending ? "Sending..." : "Request"}</span>
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
          requestMutation.mutate({
            receiverId: traveler.id,
            message,
          });
        }}
      />
    </>
  );
}
