"use client";

import { useState, useMemo } from "react";
import {
  DUMMY_COMMUNITY_TRIPS,
  CommunityTripItem,
} from "../data/dummyCommunityTrips";
import CommunityTripCard from "../components/CommunityTripCard";
import {
  Search,
  Sparkles,
  Tent,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Users,
} from "lucide-react";

export default function CommunityTripsPage() {
  const [tripsList] = useState<CommunityTripItem[]>(DUMMY_COMMUNITY_TRIPS);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "CAMP" | "EXPEDITION">("ALL");
  const [priceFilter, setPriceFilter] = useState<"ALL" | "FREE" | "PAID">("ALL");

  const filteredTrips = useMemo(() => {
    return tripsList.filter((trip) => {
      // Search matching
      const matchesSearch =
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category filter
      if (selectedCategory === "CAMP" && trip.category !== "Camp") {
        return false;
      }
      if (selectedCategory === "EXPEDITION" && trip.category !== "Trek & Expedition" && trip.category !== "Workation & Surf") {
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

            <div className="flex items-center gap-4 flex-wrap text-[11px] sm:text-xs text-white/90 font-bold">
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
                <span>Auto Group Chat</span>
              </span>
            </div>
          </div>
        </div>

        {/* Ambient decorative glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-10 w-48 h-48 rounded-full bg-[#a0f3d4]/10 blur-xl pointer-events-none" />
      </div>

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
                { id: "FREE", label: "Free Camp 🏕️" },
                { id: "PAID", label: "Curated (Paid) 🎒" },
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
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedCategory === "ALL"
                ? "bg-[#0F6E56]/15 text-[#005440] border border-[#0F6E56]/30 font-black"
                : "bg-[#e0e3e0]/50 text-[#3f4944] hover:bg-[#e0e3e0]"
            }`}
          >
            All Experiences ({tripsList.length})
          </button>
          <button
            onClick={() => setSelectedCategory("CAMP")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedCategory === "CAMP"
                ? "bg-[#0F6E56]/15 text-[#005440] border border-[#0F6E56]/30 font-black"
                : "bg-[#e0e3e0]/50 text-[#3f4944] hover:bg-[#e0e3e0]"
            }`}
          >
            🏕️ Stranger Camps (Munnar)
          </button>
          <button
            onClick={() => setSelectedCategory("EXPEDITION")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedCategory === "EXPEDITION"
                ? "bg-[#0F6E56]/15 text-[#005440] border border-[#0F6E56]/30 font-black"
                : "bg-[#e0e3e0]/50 text-[#3f4944] hover:bg-[#e0e3e0]"
            }`}
          >
            🎒 Expeditions &amp; Retreats (Meghalaya &amp; Goa)
          </button>
        </div>
      </div>

      {/* ── Trips Grid (3 Cards) ────────────────────────────────────────────── */}
      {filteredTrips.length > 0 ? (
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
            No community trips match your filters
          </h3>
          <p className="text-xs sm:text-sm text-[#3f4944] max-w-sm mx-auto">
            Try adjusting your search keyword or clearing the pricing filter to see all available community adventures.
          </p>
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
        </div>
      )}
    </div>
  );
}
