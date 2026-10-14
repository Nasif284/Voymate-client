"use client";

import { Check, Sparkles, Users } from "lucide-react";
import { CommunityTripItem } from "../../types";

interface CommunityTripMatesTabProps {
  trip: CommunityTripItem;
  joinedCount: number;
}

export default function CommunityTripMatesTab({
  trip,
  joinedCount,
}: Readonly<CommunityTripMatesTabProps>) {
  const attendees = trip.attendees || [];
  const remainingSlots = Math.max(0, trip.maxCapacity - joinedCount);
  const extraJoined = Math.max(0, joinedCount - attendees.length);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-[#bec9c3]/20 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-[#181d1a] font-headline">
            Confirmed Travelers ({joinedCount})
          </h3>
          <p className="text-xs text-[#3f4944] mt-0.5">
            Get to know who you will be traveling with.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#eef8f4] text-[#005440] text-xs font-bold">
          {remainingSlots} spots left
        </span>
      </div>

      {attendees.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {attendees.map((att) => (
            <div
              key={att.id}
              className="bg-[#f7faf6] p-3.5 rounded-2xl border border-[#bec9c3]/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={att.avatarUrl}
                  alt={att.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#bec9c3]/30"
                />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#181d1a]">
                    {att.name}
                  </p>
                  {att.badge && (
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-[#c9eadb] text-[10px] font-extrabold text-[#004736]">
                      {att.badge}
                    </span>
                  )}
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F6E56]">
                <Check className="w-3.5 h-3.5" />
                <span>Confirmed</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#f7faf6] p-6 rounded-2xl border border-[#bec9c3]/20 text-center space-y-2">
          <Users className="w-8 h-8 text-[#0F6E56] mx-auto opacity-70" />
          <p className="text-xs font-bold text-[#181d1a]">
            {joinedCount > 0 ? `${joinedCount} voyagers confirmed on this trip` : "Be the first voyager to join!"}
          </p>
          <p className="text-[11px] text-[#3f4944]">
            Confirmed travelers will receive verified digital boarding passes and updates.
          </p>
        </div>
      )}

      {extraJoined > 0 && attendees.length > 0 && (
        <div className="bg-[#f0f9f5] p-4 rounded-2xl border border-[#0F6E56]/20 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#005440] shrink-0" />
          <p className="text-xs sm:text-sm text-[#005440] font-semibold">
            {extraJoined} other voyagers have joined this community trip!
          </p>
        </div>
      )}
    </div>
  );
}
