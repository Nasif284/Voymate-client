"use client";

import { CommunityTripItem } from "../../types";

interface CommunityTripItineraryTabProps {
  itinerary: CommunityTripItem["itinerary"];
}

export default function CommunityTripItineraryTab({
  itinerary,
}: Readonly<CommunityTripItineraryTabProps>) {
  const isPlainString = typeof itinerary === "string";

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="border-b border-[#bec9c3]/20 pb-3">
        <h3 className="text-base font-extrabold text-[#181d1a] font-headline">
          Trip Itinerary &amp; Flow
        </h3>
        <p className="text-xs text-[#3f4944] mt-0.5">
          Carefully scheduled for the optimal balance of exploration, relaxation, and bonding.
        </p>
      </div>

      {isPlainString ? (
        <div className="bg-[#f7faf6] p-5 sm:p-6 rounded-2xl border border-[#bec9c3]/25 shadow-xs">
          <p className="whitespace-pre-line text-xs sm:text-sm text-[#181d1a] leading-relaxed font-medium font-body">
            {itinerary}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {Array.isArray(itinerary) &&
            itinerary.map((day) => (
              <div
                key={day.day}
                className="bg-[#f7faf6] p-4 sm:p-5 rounded-2xl border border-[#bec9c3]/25 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#005440] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    Day {day.day}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#181d1a] font-headline">
                    {day.title}
                  </h4>
                </div>
                <p className="text-xs text-[#3f4944] leading-relaxed mb-3.5">
                  {day.description}
                </p>

                {day.activities && day.activities.length > 0 && (
                  <div className="space-y-2 bg-white p-3.5 rounded-xl border border-[#bec9c3]/20">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#005440]">
                      Schedule &amp; Milestones:
                    </p>
                    {day.activities.map((act, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-[#181d1a] font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56] mt-1.5 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
