import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SentRequest } from "../../profile/interfaces/profile.interface";

interface RequestCardProps {
  request: SentRequest;
  onWithdraw: (id: string) => void;
}

export default function RequestCard({ request, onWithdraw }: RequestCardProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#bec9c3]/20 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Profile Header */}
      <div className="w-full sm:w-44 flex-shrink-0 flex flex-row sm:flex-col items-center sm:text-center gap-3 border-b sm:border-b-0 border-[#bec9c3]/20 pb-3 sm:pb-0">
        <img
          src={request.receiver.avatarUrl!}
          alt={request.receiver.fullName}
          className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover shadow-sm shrink-0"
        />
        <div className="flex-1 sm:flex-initial text-left sm:text-center min-w-0">
          <h3 className="font-bold text-[#181d1a] font-headline text-xs sm:text-sm truncate">
            {request.receiver.fullName}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#3f4944] flex items-center justify-start sm:justify-center gap-0.5 mt-0.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#3f4944] shrink-0" />
            <span className="truncate">{request.receiver.state}, {request.receiver.country}</span>
          </p>
        </div>
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
            href={request.matchId ? `/matches/${request.matchId}` : `/profile/${request.receiver.id}`}
            className="flex-1 h-9 sm:h-11 flex items-center justify-center bg-transparent border border-[#0F6E56] text-[#0F6E56] font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl hover:bg-[#f1f4f1] transition-all active:scale-[0.98]"
          >
            View Profile
          </Link>

          <button
            type="button"
            onClick={() => onWithdraw(request.id)}
            className="flex-1 h-9 sm:h-11 font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all border border-[#c82b1a] active:scale-[0.98] text-[#c82b1a] hover:bg-[#ffe9e9] cursor-pointer"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
