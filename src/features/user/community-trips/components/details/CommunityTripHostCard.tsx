"use client";

import { ShieldCheck, Star } from "lucide-react";
import { toast } from "sonner";
import { CommunityTripCommunity } from "../../types";

interface CommunityTripHostCardProps {
  community: CommunityTripCommunity;
}

export default function CommunityTripHostCard({ community }: Readonly<CommunityTripHostCardProps>) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#bec9c3]/20 shadow-xs flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3.5">
        <img
          src={community.avatarUrl}
          alt={community.name}
          className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0F6E56]/30 shadow-xs"
        />
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base sm:text-lg font-black text-[#181d1a] font-headline">
              {community.name}
            </h3>
            {community.verified && (
              <ShieldCheck className="w-4 h-4 text-[#0F6E56] shrink-0" />
            )}
          </div>
          <p className="text-xs text-[#3f4944] mt-0.5">
            Organized by <strong className="text-[#181d1a]">{community.leader}</strong> ({community.leaderRole})
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-[#6f7a74]">
            <span className="flex items-center gap-1 font-semibold text-[#005440]">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>{community.rating} Rating</span>
            </span>
            <span>•</span>
            <span>{community.memberCount} members</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => toast.success(`Following ${community.name}!`)}
          className="px-4 py-2 rounded-xl border border-[#005440] text-[#005440] hover:bg-[#eef8f4] text-xs font-bold transition-all cursor-pointer"
        >
          Follow Community
        </button>
      </div>
    </div>
  );
}
