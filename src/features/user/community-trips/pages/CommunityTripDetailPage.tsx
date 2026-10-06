"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  DUMMY_COMMUNITY_TRIPS,
  CommunityTripItem,
} from "../data/dummyCommunityTrips";
import CommunityTripJoinModal from "../components/CommunityTripJoinModal";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  Share2,
  ArrowRight,
  Ticket,
  Heart,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

interface CommunityTripDetailPageProps {
  slug: string;
}

export default function CommunityTripDetailPage({ slug }: CommunityTripDetailPageProps) {
  const router = useRouter();
  const trip = DUMMY_COMMUNITY_TRIPS.find((t) => t.slug === slug);

  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "ITINERARY" | "INCLUSIONS" | "MATES">("OVERVIEW");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [joinedCount, setJoinedCount] = useState(trip?.joinedCount ?? 0);

  if (!trip) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#181d1a]">Trip Not Found</h2>
        <p className="text-[#3f4944]">The community trip you are looking for does not exist.</p>
        <Link
          href="/community-trips"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005440] text-white font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Community Trips</span>
        </Link>
      </div>
    );
  }

  const isFree = trip.pricingType === "FREE";
  const displayImage = activeImage || trip.coverImage;
  const remainingSlots = trip.maxCapacity - joinedCount;
  const progressPercent = Math.min(100, Math.round((joinedCount / trip.maxCapacity) * 100));

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Trip link copied to clipboard! 📋");
    }
  };

  const handleJoinSuccess = () => {
    setJoinedCount((prev) => Math.min(trip.maxCapacity, prev + 1));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16">
      {/* ── Breadcrumb & Back ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <Link
          href="/community-trips"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F6E56] hover:text-[#005440] transition-colors py-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Community Trips</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#bec9c3]/30 text-xs font-bold text-[#3f4944] hover:bg-[#e0e3e0]/50 transition-all cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* ── Main Layout Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* ── Left Column (Main Content) ────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Hero Cover Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#bec9c3]/20 shadow-xs">
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-gray-900">
              <img
                src={displayImage}
                alt={trip.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

              {/* Cover Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 ${
                    isFree
                      ? "bg-[#0F6E56] text-white"
                      : "bg-[#a0f3d4] text-[#004736]"
                  }`}
                >
                  {isFree ? "🏕️ Free Community Camp" : "🎒 Curated Expedition"}
                </span>

                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                  {trip.category}
                </span>
              </div>

              {/* Cover Bottom Info */}
              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="flex items-center gap-3 mb-2 flex-wrap text-xs text-white/95">
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-[#a0f3d4]" />
                    <span>
                      {trip.destination.name}, {trip.destination.city}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-[#a0f3d4]" />
                    <span>{trip.durationText}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-[#a0f3d4]" />
                    <span>
                      {new Date(trip.dateFrom).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(trip.dateTo).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-headline leading-tight">
                  {trip.title}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 font-medium line-clamp-2">
                  {trip.tagline}
                </p>
              </div>
            </div>

            {/* Gallery Thumbnail Strip */}
            {trip.gallery.length > 0 && (
              <div className="p-3 bg-[#f7faf6] border-t border-[#bec9c3]/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveImage(trip.coverImage)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    displayImage === trip.coverImage
                      ? "border-[#005440] scale-105 shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={trip.coverImage} alt="Cover" className="w-full h-full object-cover" />
                </button>
                {trip.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      displayImage === img
                        ? "border-[#005440] scale-105 shadow-sm"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Community Host Banner */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#bec9c3]/20 shadow-xs flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={trip.community.avatarUrl}
                alt={trip.community.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0F6E56]/30 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base sm:text-lg font-black text-[#181d1a] font-headline">
                    {trip.community.name}
                  </h3>
                  {trip.community.verified && (
                    <ShieldCheck className="w-4 h-4 text-[#0F6E56] shrink-0" />
                  )}
                </div>
                <p className="text-xs text-[#3f4944] mt-0.5">
                  Organized by <strong className="text-[#181d1a]">{trip.community.leader}</strong> ({trip.community.leaderRole})
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#6f7a74]">
                  <span className="flex items-center gap-1 font-semibold text-[#005440]">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>{trip.community.rating} Rating</span>
                  </span>
                  <span>•</span>
                  <span>{trip.community.memberCount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.success(`Following ${trip.community.name}! 🌟`)}
                className="px-4 py-2 rounded-xl border border-[#005440] text-[#005440] hover:bg-[#eef8f4] text-xs font-bold transition-all cursor-pointer"
              >
                Follow Community
              </button>
            </div>
          </div>

          {/* Content Tabs Navigation */}
          <div className="bg-white rounded-3xl border border-[#bec9c3]/20 shadow-xs overflow-hidden">
            <div className="flex border-b border-[#bec9c3]/20 bg-[#f7faf6] px-4 sm:px-6 pt-3 gap-2 sm:gap-6 overflow-x-auto scrollbar-none">
              {[
                { id: "OVERVIEW", label: "Overview & Vibe" },
                { id: "ITINERARY", label: "Day-by-Day Plan" },
                { id: "INCLUSIONS", label: "Inclusions & Rules" },
                { id: "MATES", label: `Confirmed Voyagers (${joinedCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
                    activeTab === tab.id
                      ? "border-[#005440] text-[#005440]"
                      : "border-transparent text-[#3f4944] hover:text-[#181d1a]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-5 sm:p-7 space-y-6">
              {activeTab === "OVERVIEW" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Vibe Pill */}
                  <div className="bg-[#eef8f4] p-4 rounded-2xl border border-[#c9eadb] flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#005440] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Sparkles className="w-5 h-5 text-[#a0f3d4]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#005440]">
                        The Community Vibe
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-[#181d1a]">
                        {trip.vibe}
                      </p>
                    </div>
                  </div>

                  {/* Story */}
                  <div>
                    <h3 className="text-base font-extrabold text-[#181d1a] font-headline mb-2.5">
                      About This Experience
                    </h3>
                    <p className="text-xs sm:text-sm text-[#3f4944] leading-relaxed">
                      {trip.description}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-[#f7faf6] p-3.5 rounded-2xl border border-[#bec9c3]/20">
                      <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Experience Type</p>
                      <p className="text-xs sm:text-sm font-bold text-[#181d1a] mt-0.5">
                        {trip.category}
                      </p>
                    </div>
                    <div className="bg-[#f7faf6] p-3.5 rounded-2xl border border-[#bec9c3]/20">
                      <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Group Limit</p>
                      <p className="text-xs sm:text-sm font-bold text-[#181d1a] mt-0.5">
                        Max {trip.maxCapacity} Voyagers
                      </p>
                    </div>
                    <div className="bg-[#f7faf6] p-3.5 rounded-2xl border border-[#bec9c3]/20 col-span-2 sm:col-span-1">
                      <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Pricing Policy</p>
                      <p className="text-xs sm:text-sm font-bold text-[#005440] mt-0.5">
                        {isFree ? "Free Entry" : `₹${trip.price?.toLocaleString("en-IN")}`}
                      </p>
                    </div>
                  </div>

                  {/* Themes */}
                  <div>
                    <p className="text-[11px] uppercase font-extrabold text-[#3f4944] tracking-wider mb-2">
                      Community Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trip.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-xl bg-[#e0e3e0]/60 text-xs font-semibold text-[#181d1a]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ITINERARY" && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-[#bec9c3]/20 pb-3">
                    <h3 className="text-base font-extrabold text-[#181d1a] font-headline">
                      Day-by-Day Flow
                    </h3>
                    <p className="text-xs text-[#3f4944] mt-0.5">
                      Carefully scheduled for the optimal balance of exploration, relaxation, and bonding.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {trip.itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="bg-[#f7faf6] p-4 sm:p-5 rounded-2xl border border-[#bec9c3]/25 shadow-xs"
                      >
                        <div className="flex items-center gap-3 mb-2.5">
                          <span className="w-8 h-8 rounded-xl bg-[#005440] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                            Day {day.day}
                          </span>
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#181d1a] font-headline">
                            {day.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#3f4944] leading-relaxed mb-3.5">
                          {day.description}
                        </p>

                        <div className="space-y-2 bg-white p-3.5 rounded-xl border border-[#bec9c3]/20">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#005440]">
                            Schedule &amp; Milestones:
                          </p>
                          {day.activities.map((act, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 text-xs text-[#181d1a] font-medium"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56] mt-1.5 shrink-0" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "INCLUSIONS" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Inclusions */}
                  <div>
                    <h3 className="text-base font-extrabold text-[#181d1a] font-headline mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#0F6E56]" />
                      <span>What's Covered</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {trip.inclusions.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-emerald-50/70 border border-emerald-200/70 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0F6E56] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exclusions */}
                  <div>
                    <h3 className="text-base font-extrabold text-[#181d1a] font-headline mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span>Not Covered (Self-Arranged)</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {trip.exclusions.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-red-50/70 border border-red-200/70 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-red-950 font-medium"
                        >
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guidelines */}
                  <div>
                    <h3 className="text-base font-extrabold text-[#181d1a] font-headline mb-2.5">
                      Mandatory Guidelines &amp; Gear
                    </h3>
                    <div className="bg-[#f7faf6] p-4 rounded-xl border border-[#bec9c3]/20 space-y-2">
                      {trip.requirements.map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-[#3f4944] font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#005440] shrink-0" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "MATES" && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-[#bec9c3]/20 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-[#181d1a] font-headline">
                        Confirmed Travelers ({joinedCount})
                      </h3>
                      <p className="text-xs text-[#3f4944] mt-0.5">
                        Get to know who you will be camping or trekking with!
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#eef8f4] text-[#005440] text-xs font-bold">
                      {remainingSlots} spots left
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {trip.attendees.map((att) => (
                      <div
                        key={att.id}
                        className="bg-[#f7faf6] p-3.5 rounded-2xl border border-[#bec9c3]/20 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={att.avatarUrl}
                            alt={att.name}
                            className="w-12 h-12 rounded-full object-cover border border-[#bec9c3]/30"
                          />
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-[#181d1a]">
                              {att.name}
                            </p>
                            {att.badge && (
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-[#c9eadb] text-[10px] font-extrabold text-[#004736]">
                                {att.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-[#0F6E56]">Confirmed ✓</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#f0f9f5] p-4 rounded-2xl border border-[#0F6E56]/20 text-center">
                    <p className="text-xs sm:text-sm text-[#005440] font-semibold">
                      🎉 + {joinedCount - trip.attendees.length} other voyagers have joined this community trip!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right Column (Sticky Booking Card) ────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl p-6 border border-[#bec9c3]/25 shadow-md space-y-5">
            {/* Price Box */}
            <div className="border-b border-[#bec9c3]/20 pb-4">
              <span className="text-[10px] uppercase font-bold text-[#6f7a74] tracking-wider">
                {isFree ? "Registration Fee" : "Expedition Price"}
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-[#005440] font-headline">
                  {isFree ? "FREE" : `₹${trip.price?.toLocaleString("en-IN")}`}
                </span>
                <span className="text-xs text-[#6f7a74] font-medium">
                  {isFree ? "No platform charges" : "per voyager • all incl."}
                </span>
              </div>
              {trip.priceNote && (
                <p className="text-[11px] text-[#0F6E56] font-medium mt-1">
                  {trip.priceNote}
                </p>
              )}
            </div>

            {/* Quick Trip Details Summary */}
            <div className="space-y-2.5 text-xs text-[#3f4944]">
              <div className="flex items-center justify-between py-1 border-b border-[#bec9c3]/15">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#0F6E56]" />
                  <span>Dates:</span>
                </span>
                <span className="font-bold text-[#181d1a]">
                  {new Date(trip.dateFrom).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(trip.dateTo).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#bec9c3]/15">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#0F6E56]" />
                  <span>Duration:</span>
                </span>
                <span className="font-bold text-[#181d1a]">{trip.durationText}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#bec9c3]/15">
                <span className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#0F6E56]" />
                  <span>Location:</span>
                </span>
                <span className="font-bold text-[#181d1a] truncate max-w-[150px]">
                  {trip.destination.city}, {trip.destination.state}
                </span>
              </div>
            </div>

            {/* Slot Fill Capacity Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1 text-[#3f4944]">
                  <Users className="w-3.5 h-3.5 text-[#0F6E56]" />
                  <span>
                    <strong className="text-[#181d1a]">{joinedCount}</strong> of {trip.maxCapacity} joined
                  </span>
                </span>
                <span
                  className={`text-[11px] font-extrabold ${
                    remainingSlots <= 4 ? "text-amber-700" : "text-[#0F6E56]"
                  }`}
                >
                  {remainingSlots <= 4 ? `Only ${remainingSlots} spots left!` : `${remainingSlots} spots available`}
                </span>
              </div>

              <div className="w-full bg-[#e0e3e0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0F6E56] to-[#005440] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => setOpenJoinModal(true)}
                className="w-full py-4 px-6 rounded-2xl bg-[#005440] hover:bg-[#004736] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#005440]/25 active:scale-98 transition-all cursor-pointer"
              >
                <span>{isFree ? "Join Free Camp" : "Book Your Slot Now"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => toast.success(`Organized by ${trip.community.name}. Inquiry chat opened! 💬`)}
                className="w-full py-2.5 px-4 rounded-xl border border-[#bec9c3]/50 text-xs font-bold text-[#3f4944] hover:bg-[#f7faf6] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Message Host Organizer</span>
              </button>
            </div>

            {/* Security Guarantee Box */}
            <div className="pt-3 border-t border-[#bec9c3]/20 space-y-2 text-[11px] text-[#6f7a74]">
              <div className="flex items-center gap-2 text-[#005440] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#0F6E56]" />
                <span>Voymate Verified Community Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Background-vetted community organizers. Instant digital boarding pass &amp; group chat access upon confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join & Checkout Modal */}
      {openJoinModal && (
        <CommunityTripJoinModal
          trip={trip}
          isOpen={openJoinModal}
          onClose={() => setOpenJoinModal(false)}
          onSuccessJoined={handleJoinSuccess}
        />
      )}
    </div>
  );
}
