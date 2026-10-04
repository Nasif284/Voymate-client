"use client";

import { useState, useEffect } from "react";
import { Pagination } from "@/src/components/Pagination";
import {
  useGetActiveTrip,
  useGetTripMatches,
  useSearchTripMatches,
} from "@/src/features/user/matches-connections/hooks/matches.hooks";
import MatchSuggestionCard from "@/src/features/user/matches-connections/components/MatchSuggestionCard";
import BuddiesOnTheRoadAlert from "../components/BuddiesOnTheRoadAlert";
import { TripMatchData } from "../interfaces/profile-listing.interface";
import SelectTripModal from "../components/SelectTripModal";
import Badge from "../components/Badge";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../../trips/components/CreateTrip";
import { arrowForward, locationPin, PersonIcon } from "@/src/assets/icons";
import Link from "next/link";
import {
  Luggage,
  Sparkles,
  Search,
  MapPin,
  Calendar,
  Compass,
  Wallet,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

const LIMIT = 16;
type MatchingMode = "TRIP" | "SEARCH";

export default function TripMatchesPage() {
  const [page, setPage] = useState(1);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [showTripModal, setShowTripModal] = useState(false);
  const [openCreateTripModal, setOpenCreateTripModal] = useState(false);

  const { data: activeTrip, isLoading: loadingActive } = useGetActiveTrip();
  const hasActiveTrip = !!activeTrip?.data;
  const tripId = selectedTripId || activeTrip?.data?.id;

  const [mode, setMode] = useState<MatchingMode>("TRIP");

  useEffect(() => {
    if (!loadingActive && !hasActiveTrip && mode === "TRIP") {
      setMode("SEARCH");
    }
  }, [loadingActive, hasActiveTrip, mode]);

  // 1. Trip matches query
  const { data: tripData, isLoading: loadingTrip } = useGetTripMatches(
    tripId!,
    { page, limit: LIMIT }
  );

  // 3. Search matches query
  const [searchParams, setSearchParams] = useState({
    destinationName: "",
    dateFrom: "",
    dateTo: "",
    travelStyle: "",
    budgetStyle: "",
  });
  const [appliedSearch, setAppliedSearch] = useState<typeof searchParams | null>(
    null
  );

  const { data: searchData, isLoading: loadingSearch } = useSearchTripMatches(
    {
      destinationName: appliedSearch?.destinationName || undefined,
      dateFrom: appliedSearch?.dateFrom || undefined,
      dateTo: appliedSearch?.dateTo || undefined,
      travelStyle: appliedSearch?.travelStyle || undefined,
      budgetStyle: appliedSearch?.budgetStyle || undefined,
      page,
      limit: LIMIT,
    },
    mode === "SEARCH"
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setAppliedSearch({ ...searchParams });
  };

  const handleResetSearch = () => {
    setSearchParams({
      destinationName: "",
      dateFrom: "",
      dateTo: "",
      travelStyle: "",
      budgetStyle: "",
    });
    setAppliedSearch(null);
    setPage(1);
  };

  // Determine current dataset and loading status based on active mode
  let matches: TripMatchData[] = [];
  let buddiesOnRoad: TripMatchData[] = [];
  let totalPages = 1;
  let total = 0;
  let isLoading = false;

  if (mode === "TRIP") {
    matches = tripData?.data?.matches ?? [];
    buddiesOnRoad = tripData?.data?.buddiesOnRoad ?? [];
    totalPages = tripData?.data?.totalPages ?? 1;
    total = tripData?.data?.total ?? 0;
    isLoading = loadingActive || loadingTrip;
  } else if (mode === "SEARCH") {
    matches = searchData?.data?.matches ?? [];
    buddiesOnRoad = searchData?.data?.buddiesOnRoad ?? [];
    totalPages = searchData?.data?.totalPages ?? 1;
    total = searchData?.data?.total ?? 0;
    isLoading = loadingSearch;
  }

  return (
    <div className="ml-0 lg:ml-64 px-3 sm:px-6 lg:px-12 pt-16 sm:pt-24 pb-12 space-y-6 sm:space-y-8">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#181d1a] font-headline tracking-tight">
            {mode === "TRIP" && "Trip Match Suggestions"}
            {mode === "SEARCH" && "Explore Travel Companions"}
          </h1>
          <p className="text-[#3f4944] mt-1 text-xs sm:text-sm">
            {mode === "TRIP" &&
              "Discover travelers whose destinations, dates, and travel style align with your trip."}
            {mode === "SEARCH" &&
              "Search any destination on the fly without having to schedule a trip."}
          </p>
        </div>

        {!hasActiveTrip && (
          <button
            onClick={() => setOpenCreateTripModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0f6e56] text-white text-xs sm:text-sm font-bold hover:bg-[#005440] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <span>Create a Trip</span>
            {arrowForward}
          </button>
        )}
      </section>

      {/* ── Mode Switcher Tabs ───────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-[#bec9c3]/20 pb-3 overflow-x-auto no-scrollbar">
        {hasActiveTrip && (
          <button
            onClick={() => {
              setMode("TRIP");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              mode === "TRIP"
                ? "bg-[#005440] text-white shadow-xs"
                : "bg-white text-[#3f4944] hover:bg-[#ebefeb] border border-[#bec9c3]/30"
            }`}
          >
            <Luggage className="w-3.5 h-3.5 shrink-0" />
            <span>Trip Matches</span>
          </button>
        )}

        <button
          onClick={() => {
            setMode("SEARCH");
            setPage(1);
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
            mode === "SEARCH"
              ? "bg-[#005440] text-white shadow-xs"
              : "bg-white text-[#3f4944] hover:bg-[#ebefeb] border border-[#bec9c3]/30"
          }`}
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span>Search by Destination</span>
        </button>
      </div>

      {/* ── Active Trip Banner (Shown in TRIP mode) ──────────────────── */}
      {mode === "TRIP" && activeTrip?.data && (
        <section className="bg-[#eef8f4] border border-[#c9eadb] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col gap-2.5 sm:gap-4 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0f6e56]">
                Active Trip
              </p>
              <h2 className="text-base sm:text-2xl font-black text-[#181d1a] mt-0.5">
                {activeTrip.data.name}
              </h2>
            </div>

            <button
              onClick={() => setShowTripModal(true)}
              className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl bg-white border border-[#d9dfdb] text-xs sm:text-sm font-bold text-[#0f6e56] hover:border-[#0f6e56] hover:bg-[#0f6e56] hover:text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              Change Trip
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Badge>{activeTrip.data.destination.name}</Badge>
            <Badge>
              {new Date(activeTrip.data.dateFrom).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(activeTrip.data.dateTo).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Badge>
            <Badge>{activeTrip.data.travelStyleCode}</Badge>
            <Badge>{activeTrip.data.budgetStyleCode}</Badge>
          </div>
        </section>
      )}

      {/* ── Search Bar Filter (Shown in SEARCH mode) ─────────────────── */}
      {mode === "SEARCH" && (
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/25 shadow-xs transition-all"
        >
          {/* Header strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#bec9c3]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440]">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#181d1a]">
                  Search Companions by Destination
                </h3>
                <p className="text-[11px] sm:text-xs text-[#707973]">
                  Find travelers and trips tailored to your destination, dates, and travel style
                </p>
              </div>
            </div>

            {appliedSearch && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#ba1a1a] hover:bg-[#ba1a1a]/10 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* 4 Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Destination */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#3f4944] uppercase tracking-wider mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#005440]" />
                Destination
              </label>
              <div className="relative">
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
                  className="w-full h-11 pl-9 pr-3.5 rounded-xl border border-[#bec9c3]/30 bg-[#fbfdfb] text-xs sm:text-sm text-[#181d1a] placeholder:text-[#88938d] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/15 focus:border-[#005440] transition-all"
                />
                <Search className="w-4 h-4 text-[#707973] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#3f4944] uppercase tracking-wider mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#005440]" />
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
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
                    className="w-full h-11 px-2.5 sm:px-3 rounded-xl border border-[#bec9c3]/30 bg-[#fbfdfb] text-xs text-[#181d1a] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/15 focus:border-[#005440] transition-all cursor-pointer"
                    title="From date"
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
                    className="w-full h-11 px-2.5 sm:px-3 rounded-xl border border-[#bec9c3]/30 bg-[#fbfdfb] text-xs text-[#181d1a] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/15 focus:border-[#005440] transition-all cursor-pointer"
                    title="To date"
                  />
                </div>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#3f4944] uppercase tracking-wider mb-1.5">
                <Compass className="w-3.5 h-3.5 text-[#005440]" />
                Travel Style
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
                  className="w-full h-11 px-3.5 pr-8 rounded-xl border border-[#bec9c3]/30 bg-[#fbfdfb] text-xs sm:text-sm text-[#181d1a] appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/15 focus:border-[#005440] transition-all cursor-pointer"
                >
                  <option value="">Any Travel Style</option>
                  <option value="ADVENTURE">Adventure</option>
                  <option value="CULTURAL">Cultural</option>
                  <option value="LEISURE">Leisure</option>
                  <option value="SOLO">Solo Explorer</option>
                  <option value="LUXURY">Luxury</option>
                  <option value="BUDGET">Budget / Backpacking</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#707973] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Budget Style */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#3f4944] uppercase tracking-wider mb-1.5">
                <Wallet className="w-3.5 h-3.5 text-[#005440]" />
                Budget Style
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
                  className="w-full h-11 px-3.5 pr-8 rounded-xl border border-[#bec9c3]/30 bg-[#fbfdfb] text-xs sm:text-sm text-[#181d1a] appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#005440]/15 focus:border-[#005440] transition-all cursor-pointer"
                >
                  <option value="">Any Budget</option>
                  <option value="BUDGET">Budget</option>
                  <option value="MID_RANGE">Mid Range</option>
                  <option value="LUXURY">Luxury</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#707973] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Footer Bar: Tip + Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#bec9c3]/15 mt-4">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#707973]">
              <Sparkles className="w-3.5 h-3.5 text-[#0f6e56] shrink-0" />
              <span>Tip: Enter a city or state name with overlapping dates to find exact companions.</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {appliedSearch && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="px-4 h-10 rounded-xl border border-[#bec9c3]/40 text-xs font-bold text-[#3f4944] hover:bg-[#ebefeb] transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 h-10 bg-[#005440] hover:bg-[#003e2f] text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Find Matches</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ── Buddies On The Road VIP Alert Section ───────────────────── */}
      {buddiesOnRoad.length > 0 && (
        <BuddiesOnTheRoadAlert buddies={buddiesOnRoad} />
      )}

      {/* ── Results Section ─────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-44 sm:h-72 bg-white/60 animate-pulse rounded-xl sm:rounded-2xl border border-[#bec9c3]/15"
            />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="space-y-8">
          {mode === "TRIP" ? (
            /* ── TRIP Mode Optimistic Empty State ────────────────────────── */
            <div className="space-y-8">
              <div className="py-10 sm:py-14 text-center px-4 bg-white/70 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/20 shadow-xs max-w-xl mx-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] mb-4">
                  <Compass className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-[#181d1a] font-headline">
                  No Exact Matches for {activeTrip?.data?.name || "Your Trip"} Yet
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#3f4944] leading-relaxed max-w-md mx-auto">
                  We haven&apos;t found other travelers heading to{" "}
                  <span className="font-semibold text-[#181d1a]">
                    {activeTrip?.data?.destination?.name?.split(",")[0] || "your destination"}
                  </span>{" "}
                  on your exact dates yet. But you don&apos;t have to wait — explore companions heading to other destinations or switch your active trip!
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setMode("SEARCH");
                      setPage(1);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#005440] text-white text-xs sm:text-sm font-bold hover:bg-[#003e2f] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Explore Other Destinations</span>
                  </button>

                  <button
                    onClick={() => setShowTripModal(true)}
                    className="px-4 py-2.5 rounded-xl border border-[#005440] text-[#005440] text-xs sm:text-sm font-bold hover:bg-[#eef8f4] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                  >
                    <Luggage className="w-4 h-4" />
                    <span>Switch Active Trip</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── SEARCH Mode Optimistic Empty State ──────────────────────── */
            <div className="py-10 sm:py-14 text-center px-4 bg-white/70 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/20 shadow-xs max-w-xl mx-auto">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] mb-4">
                <Search className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-[#181d1a] font-headline">
                {appliedSearch
                  ? "No Search Matches Found"
                  : "No Upcoming Trips Available Yet"}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-[#3f4944] leading-relaxed max-w-md mx-auto">
                {appliedSearch
                  ? `We couldn't find any trips matching "${
                      appliedSearch.destinationName || "your selected criteria"
                    }". Try searching for a broader location or relaxing your filters.`
                  : "No travelers have listed upcoming trips yet. Start an adventure by creating a trip and inviting travel buddies to join you!"}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {appliedSearch && (
                  <button
                    onClick={handleResetSearch}
                    className="px-4 py-2.5 rounded-xl border border-[#005440] text-[#005440] text-xs sm:text-sm font-bold hover:bg-[#eef8f4] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Search Filters</span>
                  </button>
                )}
                <button
                  onClick={() => setOpenCreateTripModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#0f6e56] text-white text-xs sm:text-sm font-bold hover:bg-[#005440] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                >
                  <span>Create a Trip</span>
                  {arrowForward}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <section className="flex flex-row items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-lg font-bold text-[#181d1a]">
                {mode === "TRIP" && "Compatible Trip Companions"}
                {mode === "SEARCH" &&
                  (appliedSearch
                    ? `Search Results for "${appliedSearch.destinationName || "Selected Filters"}"`
                    : "All Available Trips Looking for Companions")}
              </h3>
              <p className="text-[#3f4944] text-[11px] sm:text-xs mt-0.5 hidden sm:block">
                {mode === "TRIP" &&
                  "Ranked dynamically by destination alignment, dates overlap, and travel style."}
                {mode === "SEARCH" &&
                  (appliedSearch
                    ? "Ranked by search destination overlap, dates, and style compatibility."
                    : "Explore active travelers and upcoming journeys across destinations.")}
              </p>
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#0f6e56] shrink-0">
              {total} match{total !== 1 ? "es" : ""} found
            </span>
          </section>

          <section className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {matches.map((match: TripMatchData) => (
              <MatchSuggestionCard
                match={match.tripMatch}
                mode={match.mode || mode}
                key={`${match.user.id}-${match.tripMatch.id}`}
                traveler={match.user}
                isNearBy={false}
                showMatchScore={mode === "TRIP" || (mode === "SEARCH" && !!appliedSearch)}
              />
            ))}
          </section>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {/* Modals */}
      {showTripModal && (
        <SelectTripModal
          selected={tripId}
          onSubmit={(newTripId: string) => {
            setSelectedTripId(newTripId);
            setPage(1);
          }}
          onClose={() => setShowTripModal(false)}
        />
      )}

      {openCreateTripModal && (
        <ModalLayout
          isOpen={openCreateTripModal}
          onClose={() => setOpenCreateTripModal(false)}
          title="Create Trip"
        >
          <CreateTrip onClose={() => setOpenCreateTripModal(false)} />
        </ModalLayout>
      )}
    </div>
  );
}
