import React from "react";
import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import { ConnectionRequest } from "../../profile/interfaces/profile.interface";

interface RequestCardProps {
  request: ConnectionRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export default function RequestCard({ request, onAccept, onDecline }: RequestCardProps) {
  const isAccepted = request.status === "accepted";
  const isDeclined = request.status === "declined";
  const isActioned = isAccepted || isDeclined;

  return (
    <div
      className={`bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 transition-opacity
        ${isActioned ? "opacity-60" : "opacity-100"}
        ${isAccepted ? "border-[#0f6e56]/30" : isDeclined ? "border-[#bec9c3]/30" : "border-[#bec9c3]/20"}`}
    >
      {/* Profile Header */}
      <div className="w-full sm:w-44 flex-shrink-0 flex flex-row sm:flex-col items-center sm:text-center gap-3 border-b sm:border-b-0 border-[#bec9c3]/20 pb-3 sm:pb-0">
        <img
          src={request.sender.avatarUrl!}
          alt={request.sender.fullName}
          className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover shadow-sm shrink-0"
        />
        <div className="flex-1 sm:flex-initial text-left sm:text-center min-w-0">
          <h3 className="font-bold text-[#181d1a] font-headline text-xs sm:text-sm truncate">
            {request.sender.fullName}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#3f4944] flex items-center justify-start sm:justify-center gap-0.5 mt-0.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#3f4944] shrink-0" />
            <span className="truncate">{request.sender.state}, {request.sender.country}</span>
          </p>
        </div>
        {isAccepted && (
          <span className="text-[9px] sm:text-[10px] font-bold uppercase bg-[#c9eadb] text-[#005440] px-2 py-0.5 sm:py-1 rounded-full shrink-0">
            Accepted
          </span>
        )}
        {isDeclined && (
          <span className="text-[9px] sm:text-[10px] font-bold uppercase bg-[#e0e3e0] text-[#6f7a74] px-2 py-0.5 sm:py-1 rounded-full shrink-0">
            Declined
          </span>
        )}
      </div>

      {/* Message & Actions */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1.5">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#3f4944]/60 tracking-wider">
              Message
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#3f4944]/40">
              {new Date(request.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
          <p className="text-[#181d1a] leading-relaxed italic text-xs sm:text-sm">
            &ldquo;{request.message}&rdquo;
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
          <Link
            href={request.matchId ? `/matches/${request.matchId}` : `/profile/${request.sender.id}`}
            className="flex-1 h-9 sm:h-11 flex items-center justify-center bg-transparent border border-[#0F6E56] text-[#0F6E56] font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl hover:bg-[#f1f4f1] transition-all active:scale-[0.98]"
          >
            View Profile
          </Link>
          <button
            type="button"
            onClick={() => onAccept(request.id)}
            disabled={isActioned}
            className={`flex-1 h-9 sm:h-11 font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all active:scale-[0.98] cursor-pointer
              ${
                isAccepted
                  ? "bg-[#c9eadb] text-[#005440] cursor-default"
                  : "bg-[#005440] text-white hover:bg-[#0f6e56] disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
          >
            {isAccepted ? (
              <span className="inline-flex items-center justify-center gap-1">
                <span>Accepted</span>
                <Check className="w-3.5 h-3.5 shrink-0" />
              </span>
            ) : (
              "Accept"
            )}
          </button>
          <button
            type="button"
            onClick={() => onDecline(request.id)}
            disabled={isActioned}
            className={`flex-1 h-9 sm:h-11 font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all active:scale-[0.98] cursor-pointer
              ${
                isDeclined
                  ? "bg-[#e0e3e0] text-[#6f7a74] cursor-default"
                  : "bg-[#ebefeb] text-[#005440] hover:bg-[#e0e3e0] disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
          >
            {isDeclined ? "Declined" : "Decline"}
          </button>
        </div>
      </div>
    </div>
  );
}
