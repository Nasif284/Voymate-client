import React from "react";
import { useGetLocation } from "../hooks/api/location.hooks";

const LocationBadge = () => {
  const { data, isLoading } = useGetLocation();
  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-3 bg-[#f1f4f1] rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-1 sm:py-2 border border-[#bec9c3]/20 animate-pulse">
        <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#0f6e56]/20"></div>
        <div className="h-3 w-16 sm:w-28 bg-black/10 rounded"></div>
      </div>
    );
  }

  const city = data?.data?.city;
  const district = data?.data?.district;
  const state = data?.data?.state;

  const mobileText = city ? `${city}${state ? `, ${state}` : ""}` : (district || state || "Location");
  const fullText = `${city}${district && district !== city ? `, ${district}` : ""}${state ? `, ${state}` : ""}`;

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 bg-[#f1f4f1] rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-1 sm:py-2 border border-[#bec9c3]/20 max-w-[140px] min-[400px]:max-w-[180px] sm:max-w-none">
      <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#0f6e56]/10 flex items-center justify-center text-[#0f6e56] shrink-0">
        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
        </svg>
      </div>

      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-[11px] sm:text-sm font-bold text-[#181d1a] truncate block sm:hidden" title={fullText}>
          {mobileText}
        </span>
        <span className="text-sm font-bold text-[#181d1a] hidden sm:block">
          {fullText}
        </span>
      </div>
    </div>
  );
};

export default LocationBadge;

