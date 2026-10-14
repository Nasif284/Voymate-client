"use client";

import { useState, useMemo } from "react";
import { CommunityTripItem } from "../types";
import {
  useCommunityTrips,
  useUserCommunityBookings,
} from "../hooks/communityTrip.hooks";
import CommunityTripCard from "../components/CommunityTripCard";
import CreateCommunityTripModal from "../components/CreateCommunityTripModal";
import UserCommunityBookingsList from "../components/UserCommunityBookingsList";
import {
  Search,
  Sparkles,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Users,
  PlusCircle,
  Ticket,
  Loader2,
} from "lucide-react";

type CategoryFilter =
  | "ALL"
  | "CAMP"
  | "TREK_EXPEDITION"
  | "ROADTRIP"
  | "TRIP";

export default function CommunityTripsPage() {
  const [viewMode, setViewMode] = useState<"EXPLORE" | "MY_BOOKINGS">("EXPLORE");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL");
  const [priceFilter, setPriceFilter] = useState<"ALL" | "FREE" | "PAID">("ALL");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const queryParams = useMemo(() => {
    return {
      category: selectedCategory === "ALL" ? undefined : selectedCategory,
      pricingType: priceFilter === "ALL" ? undefined : priceFilter,
    };
  }, [selectedCategory, priceFilter]);

  const { data: apiData, isLoading } = useCommunityTrips(queryParams);
  const { data: userBookings } = useUserCommunityBookings();

  const tripsList: CommunityTripItem[] = useMemo(() => {
    return apiData?.trips || [];
  }, [apiData]);

  const filteredTrips = useMemo(() => {
    return tripsList.filter((trip) => {
      // Search matching
      const matchesSearch =
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (trip.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category filter
      if (selectedCategory !== "ALL") {
        const cat = trip.category.toUpperCase();
        if (selectedCategory === "CAMP" && !cat.includes("CAMP")) return false;
        if (
          selectedCategory === "TREK_EXPEDITION" &&
          !cat.includes("TREK") &&
          !cat.includes("EXPEDITION")
        )
          return false;
        if (selectedCategory === "ROADTRIP" && !cat.includes("ROAD")) return false;
        if (
          selectedCategory === "TRIP" &&
          cat !== "TRIP" &&
          !cat.includes("CURATED")
        )
          return false;
      }

      // Price filter
      if (priceFilter === "FREE" && trip.pricingType !== "FREE") return false;
      if (priceFilter === "PAID" && trip.pricingType !== "PAID") return false;

      return true;
    });
  }, [tripsList, searchQuery, selectedCategory, priceFilter]);

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
      {/* ── Compact Horizontal Hero Banner ──────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#005440] via-[#0F6E56] to-[#00382b] text-white rounded-3xl p-5 sm:p-6 md:p-7 shadow-md border border-emerald-800">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left: Pill & Title */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#a0f3d4] mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Community Trips &amp; Stranger Camps</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-headline tracking-tight leading-snug">
              Don't Travel Alone. Explore With Communities.
            </h1>
          </div>

          {/* Right: Description & Compact Badges */}
          <div className="lg:max-w-md lg:border-l lg:border-white/20 lg:pl-6 space-y-2.5">
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              Join stranger camps in Munnar, cave treks in Meghalaya, or Goa surf retreats. Vetted travel clubs, split costs &amp; lifelong mates.
            </p>

            <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
              <div className="flex items-center gap-3.5 flex-wrap text-[11px] sm:text-xs text-white/90 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a0f3d4]" />
                  <span>Verified Hosts</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#a0f3d4]" />
                  <span>Free &amp; Paid Trips</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a0f3d4]" />
                  <span>Digital Boarding Passes</span>
                </span>
              </div>

              <button
                onClick={() => setOpenCreateModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#005440] hover:bg-emerald-50 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#0F6E56]" />
                <span>Host an Adventure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ambient decorative glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-10 w-48 h-48 rounded-full bg-[#a0f3d4]/10 blur-xl pointer-events-none" />
      </div>

      {/* ── View Switcher: Explore Adventures vs My Booked Trips ─────────────── */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-[#bec9c3]/20 pb-2">
        <div className="flex items-center gap-2 p-1 bg-[#e0e3e0]/40 rounded-2xl border border-[#bec9c3]/30">
          <button
            onClick={() => setViewMode("EXPLORE")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === "EXPLORE"
                ? "bg-[#005440] text-white shadow-xs"
                : "text-[#3f4944] hover:text-[#181d1a]"
            }`}
          >
            Explore Adventures
          </button>
          <button
            onClick={() => setViewMode("MY_BOOKINGS")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === "MY_BOOKINGS"
                ? "bg-[#005440] text-white shadow-xs"
                : "text-[#3f4944] hover:text-[#181d1a]"
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>My Booked Adventures</span>
            {Boolean(userBookings && userBookings.length > 0) && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  viewMode === "MY_BOOKINGS"
                    ? "bg-white text-[#005440]"
                    : "bg-[#005440] text-white"
                }`}
              >
                {userBookings?.length}
              </span>
            )}
          </button>
        </div>

        {viewMode === "EXPLORE" && (
          <span className="text-xs font-semibold text-[#6f7a74]">
            Showing {filteredTrips.length} adventures
          </span>
        )}
      </div>

      {/* ── Conditional Content ────────────────────────────────────────────── */}
      {viewMode === "MY_BOOKINGS" ? (
        <UserCommunityBookingsList />
      ) : (
        <>
          {/* ── Search & Filter Controls ────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#bec9c3]/20 shadow-xs space-y-3.5">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#6f7a74] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by destination, trip title, or theme (e.g. Munnar, Meghalaya, Goa)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/30 focus:border-[#005440] focus:bg-white text-xs sm:text-sm outline-none transition-all placeholder:text-[#6f7a74]"
                />
              </div>

              {/* Price Selector Buttons */}
              <div className="flex items-center gap-1.5 p-1 bg-[#f7faf6] rounded-xl border border-[#bec9c3]/30 self-start md:self-auto">
                {(
                  [
                    { id: "ALL", label: "All Pricing" },
                    { id: "FREE", label: "Free Camps" },
                    { id: "PAID", label: "Curated Expeditions" },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceFilter(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      priceFilter === p.id
                        ? "bg-[#005440] text-white shadow-xs"
                        : "text-[#3f4944] hover:text-[#181d1a]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6f7a74] shrink-0 mr-1">
                Browse Theme:
              </span>
              {(
                [
                  { id: "ALL", label: "All Experiences" },
                  { id: "CAMP", label: "Stranger Camps" },
                  { id: "TREK_EXPEDITION", label: "Treks & Expeditions" },
                  { id: "ROADTRIP", label: "Road Trips" },
                  { id: "TRIP", label: "Curated Trips" },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-[#0F6E56]/15 text-[#005440] border border-[#0F6E56]/30 font-black"
                      : "bg-[#e0e3e0]/50 text-[#3f4944] hover:bg-[#e0e3e0]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Trips Grid ────────────────────────────────────────────────────── */}
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#005440] animate-spin" />
              <p className="text-xs font-bold text-[#3f4944] tracking-wider uppercase">
                Loading Community Trips...
              </p>
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredTrips.map((trip) => (
                <CommunityTripCard
                  key={trip.id}
                  trip={trip}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#bec9c3]/20 space-y-3">
              <Compass className="w-10 h-10 text-[#6f7a74] mx-auto opacity-60" />
              <h3 className="text-base sm:text-lg font-bold text-[#181d1a] font-headline">
                No community trips found
              </h3>
              <p className="text-xs sm:text-sm text-[#3f4944] max-w-sm mx-auto">
                {searchQuery || selectedCategory !== "ALL" || priceFilter !== "ALL"
                  ? "Try adjusting your search filters to find upcoming community adventures."
                  : "No trips have been published yet. Be the first organizer to host a trip!"}
              </p>
              {(searchQuery || selectedCategory !== "ALL" || priceFilter !== "ALL") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("ALL");
                    setPriceFilter("ALL");
                  }}
                  className="px-4 py-2 rounded-xl bg-[#005440] text-white text-xs font-bold hover:bg-[#004736] transition-all cursor-pointer mt-2"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Host Trip Modal */}
      {openCreateModal && (
        <CreateCommunityTripModal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      )}
    </div>
  );
}
