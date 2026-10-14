"use client";

import { useState, useEffect } from "react";
import { Pagination } from "@/src/components/Pagination";
import {
  useGetActiveTrip,
  useGetTripMatches,
  useSearchTripMatches,
} from "@/src/features/user/matches-connections/hooks/matches.hooks";
import BuddiesOnTheRoadAlert from "../components/BuddiesOnTheRoadAlert";
import { TripMatchData } from "../interfaces/profile-listing.interface";
import SelectTripModal from "../components/SelectTripModal";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../../trips/components/CreateTrip";
import ActiveTripBanner from "../components/ActiveTripBanner";
import DestinationSearchFilter, {
  SearchFilterParams,
} from "../components/DestinationSearchFilter";
import MatchEmptyState from "../components/MatchEmptyState";
import MatchResultsGrid from "../components/MatchResultsGrid";
import { Luggage, Search, ArrowRight } from "lucide-react";

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

  // Trip matches query
  const { data: tripData, isLoading: loadingTrip } = useGetTripMatches(
    tripId!,
    { page, limit: LIMIT }
  );

  // Search matches query
  const [searchParams, setSearchParams] = useState<SearchFilterParams>({
    destinationName: "",
    dateFrom: "",
    dateTo: "",
    travelStyle: "",
    budgetStyle: "",
  });
  const [appliedSearch, setAppliedSearch] = useState<SearchFilterParams | null>(
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

  const hasAnyFilter = Boolean(
    searchParams.destinationName ||
    searchParams.dateFrom ||
    searchParams.dateTo ||
    searchParams.travelStyle ||
    searchParams.budgetStyle ||
    appliedSearch
  );

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
      {/* Page Header */}
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
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </section>

      {/* Mode Switcher Tabs */}
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

      {/* Active Trip Banner */}
      {mode === "TRIP" && activeTrip?.data && (
        <ActiveTripBanner
          trip={activeTrip.data}
          onChangeTrip={() => setShowTripModal(true)}
        />
      )}

      {/* Destination Search Form */}
      {mode === "SEARCH" && (
        <DestinationSearchFilter
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          appliedSearch={appliedSearch}
          setAppliedSearch={setAppliedSearch}
          onSubmit={handleSearchSubmit}
          onReset={handleResetSearch}
          hasAnyFilter={hasAnyFilter}
        />
      )}

      {/* Buddies on the road alert */}
      {buddiesOnRoad.length > 0 && (
        <BuddiesOnTheRoadAlert buddies={buddiesOnRoad} />
      )}

      {/* Results Section */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-44 sm:h-72 bg-white/60 animate-pulse rounded-xl sm:rounded-2xl border border-[#bec9c3]/15"
            />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <MatchEmptyState
          mode={mode}
          activeTripDestination={activeTrip?.data?.destination?.name?.split(",")[0]}
          appliedSearch={appliedSearch}
          onExploreOther={() => {
            setMode("SEARCH");
            setPage(1);
          }}
          onSwitchTrip={() => setShowTripModal(true)}
          onResetSearch={handleResetSearch}
          onCreateTrip={() => setOpenCreateTripModal(true)}
        />
      ) : (
        <>
          <MatchResultsGrid
            matches={matches}
            mode={mode}
            appliedSearch={appliedSearch}
            total={total}
          />

          {totalPages > 1 && (
            <div className="pt-4 flex justify-center">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          )}
        </>
      )}

      {/* Select active trip modal */}
      {showTripModal && (
        <SelectTripModal
          selected={tripId || ""}
          onClose={() => setShowTripModal(false)}
          onSubmit={(id: string) => {
            setSelectedTripId(id);
            setPage(1);
          }}
        />
      )}

      {/* Create trip modal */}
      {openCreateTripModal && (
        <ModalLayout
          isOpen={openCreateTripModal}
          onClose={() => setOpenCreateTripModal(false)}
          title="Create a New Trip"
        >
          <CreateTrip onClose={() => setOpenCreateTripModal(false)} />
        </ModalLayout>
      )}
    </div>
  );
}
