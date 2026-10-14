"use client";

import { useMemo } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { CommunityTripItem } from "../../types";

interface CommunityTripInclusionsTabProps {
  inclusions?: CommunityTripItem["inclusions"];
  exclusions?: CommunityTripItem["exclusions"];
  requirements?: CommunityTripItem["requirements"];
}

export default function CommunityTripInclusionsTab({
  inclusions,
  exclusions,
  requirements,
}: Readonly<CommunityTripInclusionsTabProps>) {
  const inclusionsList = useMemo(() => {
    if (!inclusions) return [];
    if (Array.isArray(inclusions)) return inclusions;
    return inclusions.split("\n").map((s) => s.trim()).filter(Boolean);
  }, [inclusions]);

  const exclusionsList = useMemo(() => {
    if (!exclusions) return [];
    if (Array.isArray(exclusions)) return exclusions;
    return exclusions.split("\n").map((s) => s.trim()).filter(Boolean);
  }, [exclusions]);

  const requirementsList = requirements || [
    "Valid Government Photo ID (Aadhaar / Passport / Driving License)",
    "Personal medication and reusable water bottle",
    "Open mind for community activities, stories, and zero littering",
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Inclusions */}
      <div>
        <h3 className="text-base font-extrabold text-[#181d1a] font-headline mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#0F6E56]" />
          <span>What's Covered</span>
        </h3>
        {inclusionsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {inclusionsList.map((item, idx) => (
              <div
                key={idx}
                className="bg-emerald-50/70 border border-emerald-200/70 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-[#0F6E56] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#6f7a74]">All basic camp facilities covered by host.</p>
        )}
      </div>

      {/* Exclusions */}
      <div>
        <h3 className="text-base font-extrabold text-[#181d1a] font-headline mb-3 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" />
          <span>Not Covered (Self-Arranged)</span>
        </h3>
        {exclusionsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {exclusionsList.map((item, idx) => (
              <div
                key={idx}
                className="bg-red-50/70 border border-red-200/70 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-red-950 font-medium"
              >
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#6f7a74]">Personal travel to basecamp not included.</p>
        )}
      </div>

      {/* Guidelines */}
      <div>
        <h3 className="text-base font-extrabold text-[#181d1a] font-headline mb-2.5">
          Mandatory Guidelines &amp; Gear
        </h3>
        <div className="bg-[#f7faf6] p-4 rounded-xl border border-[#bec9c3]/20 space-y-2">
          {requirementsList.map((req, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs text-[#3f4944] font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#005440] shrink-0" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
