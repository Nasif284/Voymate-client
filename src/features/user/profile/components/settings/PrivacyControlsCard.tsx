"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import Toggle from "../Toggle";
import { SettingsData } from "../../interfaces/profile.interface";

interface PrivacyControlsCardProps {
  settings: SettingsData;
  onChange: (updater: (prev: SettingsData) => SettingsData) => void;
}

export const PrivacyControlsCard: React.FC<PrivacyControlsCardProps> = ({
  settings,
  onChange,
}) => {
  return (
    <section className="bg-white p-6 rounded-2xl border border-[#bec9c3]/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <h2 className="text-lg font-bold mb-6 font-headline text-[#181d1a]">
        Privacy controls
      </h2>
      <div className="space-y-5">
        {/* Who can see profile */}
        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-2 px-1">
            Who can see my profile
          </label>
          <div className="relative">
            <select
              value={settings.profileVisibilityCode}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, profileVisibilityCode: e.target.value }))
              }
              className="w-full h-12 px-4 pr-10 rounded-xl border border-transparent bg-[#e0e3e0] text-sm font-semibold text-[#181d1a] focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all cursor-pointer outline-none appearance-none"
            >
              <option value="CONNECTED_ONLY">Connected Only</option>
              <option value="VERIFIED_ONLY">Verified Only</option>
              <option value="EVERYONE">Everyone</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#3f4944]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Allow requests from */}
        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-2 px-1">
            Allow mate requests from
          </label>
          <div className="relative">
            <select
              value={settings.requestsFromCode}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, requestsFromCode: e.target.value }))
              }
              className="w-full h-12 px-4 pr-10 rounded-xl border border-transparent bg-[#e0e3e0] text-sm font-semibold text-[#181d1a] focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all cursor-pointer outline-none appearance-none"
            >
              <option value="EVERYONE">Everyone</option>
              <option value="VERIFIED_ONLY">Verified Only</option>
              <option value="NOBODY">Nobody</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#3f4944]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Toggle: Online status */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-[#181d1a]">Show online status</span>
          <Toggle
            enabled={settings.showOnlineStatus}
            onChange={(status) =>
              onChange((prev) => ({ ...prev, showOnlineStatus: status }))
            }
          />
        </div>

        {/* Toggle: Currently traveling */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#181d1a]">Show currently traveling</span>
          <Toggle
            enabled={settings.showTravelingStatus}
            onChange={(status) =>
              onChange((prev) => ({ ...prev, showTravelingStatus: status }))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default PrivacyControlsCard;
