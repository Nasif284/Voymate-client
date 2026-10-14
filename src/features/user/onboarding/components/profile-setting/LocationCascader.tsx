"use client";
import React from "react";
import CountriesList from "../CountriesList";
import { MapPin, Loader2 } from "lucide-react";

interface LocationRegion {
  isoCode: string;
  name: string;
}

interface LocationCity {
  name: string;
}

interface LocationCascaderProps {
  nationality: string;
  state: string;
  city: string;
  regions: LocationRegion[];
  cities: LocationCity[];
  isAutoFilling: boolean;
  onNationalityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onAutoLocation: () => void;
  errors?: {
    nationality?: string;
    state?: string;
    city?: string;
  };
}

export const LocationCascader: React.FC<LocationCascaderProps> = ({
  nationality,
  state,
  city,
  regions,
  cities,
  isAutoFilling,
  onNationalityChange,
  onStateChange,
  onCityChange,
  errors,
  onAutoLocation,
}) => {
  return (
    <>
      <div className="space-y-3">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">
          Nationality
        </label>
        <select
          value={nationality || ""}
          onChange={(e) => onNationalityChange(e.target.value)}
          className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none appearance-none"
        >
          <option value="">Select nationality</option>
          <CountriesList />
        </select>
        {errors?.nationality && (
          <p className="text-red-500 text-sm">{errors.nationality}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">
          State
        </label>
        <select
          value={state || ""}
          onChange={(e) => onStateChange(e.target.value)}
          className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none appearance-none"
        >
          <option value="">Select region</option>
          {regions.map((region) => (
            <option key={region.isoCode} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
        {errors?.state && (
          <p className="text-red-500 text-sm">{errors.state}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">
          City
        </label>
        <select
          value={city || ""}
          onChange={(e) => onCityChange(e.target.value)}
          className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none appearance-none"
        >
          <option value="">Select city</option>
          {cities.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {errors?.city && (
          <p className="text-red-500 text-sm">{errors.city}</p>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center">
        <button
          type="button"
          onClick={onAutoLocation}
          disabled={isAutoFilling}
          className={`
            relative inline-flex items-center gap-2.5 px-5 py-2.5
            rounded-full text-[13px] font-semibold tracking-wide
            transition-all duration-200 active:scale-[0.97]
            ${
              isAutoFilling
                ? "bg-[#0f6e56]/12 text-[#0f6e56] cursor-not-allowed"
                : "bg-gradient-to-br from-[#0f6e56] to-[#1a8a6e] text-white shadow-[0_2px_12px_rgba(15,110,86,0.30)] hover:shadow-[0_4px_20px_rgba(15,110,86,0.40)] hover:scale-[1.03]"
            }
          `}
        >
          {!isAutoFilling && (
            <span className="absolute left-3 w-5 h-5 rounded-full bg-white/20 animate-ping pointer-events-none" />
          )}

          {isAutoFilling ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#0f6e56]" />
          ) : (
            <MapPin className="w-4 h-4 relative z-10" />
          )}

          <span className="relative z-10">
            {isAutoFilling ? "Detecting..." : "Use my current location"}
          </span>
        </button>
      </div>
    </>
  );
};
