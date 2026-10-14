"use client";

import React from "react";
import {
  Search,
  MapPin,
  Calendar,
  Compass,
  Wallet,
  RotateCcw,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";
import { AppliedFilterChips } from "./AppliedFilterChips";

export interface SearchFilterParams {
  destinationName: string;
  dateFrom: string;
  dateTo: string;
  travelStyle: string;
  budgetStyle: string;
}

interface DestinationSearchFilterProps {
  searchParams: SearchFilterParams;
  setSearchParams: (params: SearchFilterParams) => void;
  appliedSearch: SearchFilterParams | null;
  setAppliedSearch: (params: SearchFilterParams | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  hasAnyFilter: boolean;
}

export default function DestinationSearchFilter({
  searchParams,
  setSearchParams,
  appliedSearch,
  setAppliedSearch,
  onSubmit,
  onReset,
  hasAnyFilter,
}: Readonly<DestinationSearchFilterProps>) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-3xl border border-[#bec9c3]/30 shadow-xs hover:shadow-sm transition-all"
    >
      {/* Header strip */}
      <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-4 mb-2.5 sm:mb-5 border-b border-[#bec9c3]/20">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#c9eadb]/70 text-[#005440] flex items-center justify-center shrink-0 shadow-xs">
            <Search className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-base font-bold text-[#181d1a] leading-tight truncate">
              Search Companions by Destination
            </h3>
            <p className="text-[10px] sm:text-xs text-[#707973] mt-0.5 truncate hidden sm:block">
              Find travelers and trips tailored to your destination, dates, and travel style
            </p>
          </div>
        </div>

        {hasAnyFilter && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold text-[#ba1a1a] bg-[#ba1a1a]/5 hover:bg-[#ba1a1a]/10 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      <AppliedFilterChips
        appliedSearch={appliedSearch}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setAppliedSearch={setAppliedSearch}
      />

      {/* 4 Inputs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3.5">
        {/* Destination */}
        <div className="col-span-2 lg:col-span-4 flex flex-col justify-between">
          <label className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold text-[#5c6861] uppercase tracking-wider mb-1">
            <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#005440] shrink-0" />
            <span>Destination</span>
          </label>
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#707973] absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none shrink-0" />
            <input
              type="text"
              placeholder="e.g. Manali, Tokyo, Paris"
              value={searchParams.destinationName}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  destinationName: e.target.value,
                })
              }
              className="w-full h-9 sm:h-10 pl-8 sm:pl-9 pr-7 sm:pr-8 rounded-lg sm:rounded-xl border border-[#bec9c3]/40 bg-[#fbfdfb] compact-input text-xs sm:text-sm text-[#181d1a] placeholder:text-[#88938d] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all"
            />
            {searchParams.destinationName && (
              <button
                type="button"
                onClick={() =>
                  setSearchParams({ ...searchParams, destinationName: "" })
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[#707973] hover:text-[#181d1a] hover:bg-black/5 transition-colors cursor-pointer"
                title="Clear destination"
              >
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Date Range */}
        <div className="col-span-2 lg:col-span-4 flex flex-col justify-between">
          <label className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold text-[#5c6861] uppercase tracking-wider mb-1">
            <Calendar className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#005440] shrink-0" />
            <span>Date Range</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <div className="relative">
              <input
                type="date"
                value={searchParams.dateFrom}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    dateFrom: e.target.value,
                  })
                }
                className="w-full h-9 sm:h-10 px-2 sm:px-3 rounded-lg sm:rounded-xl border border-[#bec9c3]/40 bg-[#fbfdfb] compact-input text-xs text-[#181d1a] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all cursor-pointer min-w-0"
                title="Start date"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={searchParams.dateTo}
                min={searchParams.dateFrom || undefined}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, dateTo: e.target.value })
                }
                className="w-full h-9 sm:h-10 px-2 sm:px-3 rounded-lg sm:rounded-xl border border-[#bec9c3]/40 bg-[#fbfdfb] compact-input text-xs text-[#181d1a] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all cursor-pointer min-w-0"
                title="End date"
              />
            </div>
          </div>
        </div>

        {/* Travel Style */}
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-between">
          <label className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold text-[#5c6861] uppercase tracking-wider mb-1">
            <Compass className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#005440] shrink-0" />
            <span className="truncate">Travel Style</span>
          </label>
          <div className="relative">
            <select
              value={searchParams.travelStyle}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  travelStyle: e.target.value,
                })
              }
              className="w-full h-9 sm:h-10 pl-2.5 sm:pl-3.5 pr-6 sm:pr-8 rounded-lg sm:rounded-xl border border-[#bec9c3]/40 bg-[#fbfdfb] compact-input text-xs sm:text-sm text-[#181d1a] appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all cursor-pointer truncate"
            >
              <option value="">Any Style</option>
              <option value="ADVENTURE">Adventure</option>
              <option value="CULTURAL">Cultural</option>
              <option value="LEISURE">Leisure</option>
              <option value="SOLO">Solo Explorer</option>
              <option value="LUXURY">Luxury</option>
              <option value="BUDGET">Budget</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#707973] absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Budget Style */}
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-between">
          <label className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold text-[#5c6861] uppercase tracking-wider mb-1">
            <Wallet className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#005440] shrink-0" />
            <span className="truncate">Budget Style</span>
          </label>
          <div className="relative">
            <select
              value={searchParams.budgetStyle}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  budgetStyle: e.target.value,
                })
              }
              className="w-full h-9 sm:h-10 pl-2.5 sm:pl-3.5 pr-6 sm:pr-8 rounded-lg sm:rounded-xl border border-[#bec9c3]/40 bg-[#fbfdfb] compact-input text-xs sm:text-sm text-[#181d1a] appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all cursor-pointer truncate"
            >
              <option value="">Any Budget</option>
              <option value="BUDGET">Budget</option>
              <option value="MID_RANGE">Mid Range</option>
              <option value="LUXURY">Luxury</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#707973] absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Footer Bar: Tip + Submit Action */}
      <div className="flex items-center justify-between gap-2 pt-2.5 sm:pt-4 border-t border-[#bec9c3]/20 mt-2.5 sm:mt-4">
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#707973] leading-relaxed">
          <Sparkles className="w-3.5 h-3.5 text-[#0f6e56] shrink-0" />
          <span>
            Tip: Enter a city or state name with overlapping dates to find exact companions.
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
          {hasAnyFilter && (
            <button
              type="button"
              onClick={onReset}
              className="px-3 sm:px-4 h-9 sm:h-10 rounded-lg sm:rounded-xl border border-[#bec9c3]/40 text-[11px] sm:text-xs font-bold text-[#3f4944] hover:bg-[#ebefeb] active:scale-95 transition-all cursor-pointer text-center"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="flex-1 sm:flex-initial px-4 sm:px-6 h-9 sm:h-10 bg-[#005440] hover:bg-[#003e2f] text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2 shrink-0"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Find Matches</span>
          </button>
        </div>
      </div>
    </form>
  );
}
