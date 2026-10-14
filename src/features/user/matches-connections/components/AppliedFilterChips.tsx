"use client";

import React from "react";
import { MapPin, Calendar, Compass, Wallet, X } from "lucide-react";
import { SearchFilterParams } from "./DestinationSearchFilter";

interface AppliedFilterChipsProps {
  appliedSearch: SearchFilterParams | null;
  searchParams: SearchFilterParams;
  setSearchParams: (params: SearchFilterParams) => void;
  setAppliedSearch: (params: SearchFilterParams | null) => void;
}

export const AppliedFilterChips: React.FC<AppliedFilterChipsProps> = ({
  appliedSearch,
  searchParams,
  setSearchParams,
  setAppliedSearch,
}) => {
  if (
    !appliedSearch ||
    (!appliedSearch.destinationName &&
      !appliedSearch.dateFrom &&
      !appliedSearch.travelStyle &&
      !appliedSearch.budgetStyle)
  ) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-2.5 sm:mb-4 px-0.5">
      <span className="text-[10px] sm:text-[11px] font-semibold text-[#707973] mr-0.5">
        Filters:
      </span>
      {appliedSearch.destinationName && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-[#c9eadb]/60 text-[#005440] text-[10px] sm:text-xs font-semibold">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
          <span>{appliedSearch.destinationName}</span>
          <button
            type="button"
            onClick={() => {
              const updated = { ...searchParams, destinationName: "" };
              setSearchParams(updated);
              setAppliedSearch({ ...appliedSearch, destinationName: "" });
            }}
            className="hover:text-black cursor-pointer ml-0.5"
            title="Remove destination filter"
          >
            <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </span>
      )}
      {appliedSearch.dateFrom && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-[#c9eadb]/60 text-[#005440] text-[10px] sm:text-xs font-semibold">
          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
          <span>
            {appliedSearch.dateFrom}{" "}
            {appliedSearch.dateTo ? `→ ${appliedSearch.dateTo}` : ""}
          </span>
          <button
            type="button"
            onClick={() => {
              const updated = { ...searchParams, dateFrom: "", dateTo: "" };
              setSearchParams(updated);
              setAppliedSearch({ ...appliedSearch, dateFrom: "", dateTo: "" });
            }}
            className="hover:text-black cursor-pointer ml-0.5"
            title="Remove dates filter"
          >
            <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </span>
      )}
      {appliedSearch.travelStyle && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-[#c9eadb]/60 text-[#005440] text-[10px] sm:text-xs font-semibold capitalize">
          <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
          <span>{appliedSearch.travelStyle.toLowerCase()}</span>
          <button
            type="button"
            onClick={() => {
              const updated = { ...searchParams, travelStyle: "" };
              setSearchParams(updated);
              setAppliedSearch({ ...appliedSearch, travelStyle: "" });
            }}
            className="hover:text-black cursor-pointer ml-0.5"
            title="Remove travel style filter"
          >
            <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </span>
      )}
      {appliedSearch.budgetStyle && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-[#c9eadb]/60 text-[#005440] text-[10px] sm:text-xs font-semibold capitalize">
          <Wallet className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
          <span>{appliedSearch.budgetStyle.toLowerCase().replace("_", " ")}</span>
          <button
            type="button"
            onClick={() => {
              const updated = { ...searchParams, budgetStyle: "" };
              setSearchParams(updated);
              setAppliedSearch({ ...appliedSearch, budgetStyle: "" });
            }}
            className="hover:text-black cursor-pointer ml-0.5"
            title="Remove budget filter"
          >
            <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </span>
      )}
    </div>
  );
};
