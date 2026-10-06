"use client";

import { useState } from "react";
import { CommunityTripItem } from "../data/dummyCommunityTrips";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronRight,
  Flame,
  Tent,
  ArrowRight,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import CommunityTripJoinModal from "./CommunityTripJoinModal";

interface CommunityTripDetailModalProps {
  trip: CommunityTripItem | null;
  isOpen: boolean;
  onClose: () => void;
  onJoinedSuccess?: (tripId: string) => void;
}

export default function CommunityTripDetailModal({
  trip,
  isOpen,
  onClose,
  onJoinedSuccess,
}: CommunityTripDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "ITINERARY" | "INCLUSIONS" | "MATES">("OVERVIEW");
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!isOpen || !trip) return null;

  const isFree = trip.pricingType === "FREE";
  const displayImage = activeImage || trip.coverImage;
  const remainingSlots = trip.maxCapacity - trip.joinedCount;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Trip link copied to clipboard! 📋");
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="w-full max-w-3xl bg-[#f7faf6] rounded-3xl overflow-hidden shadow-2xl border border-[#bec9c3]/30 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
          {/* Top Sticky Bar */}
          <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-gray-900 shrink-0">
            <img
              src={displayImage}
              alt={trip.title}
              className="w-full h-full object-cover opacity-90 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            {/* Top action pills */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 ${
                  isFree
                    ? "bg-[#0F6E56] text-white"
                    : "bg-emerald-400 text-[#004736]"
                }`}
              >
                {isFree ? "🏕️ Free Community Camp" : "🎒 Curated Expedition"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  aria-label="Share trip"
                  className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 flex items-center justify-center transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close details"
                  className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title & Metadata inside hero */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-bold">
                  {trip.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-white/90">
                  <MapPin className="w-3.5 h-3.5 text-[#a0f3d4]" />
                  <span>
                    {trip.destination.name}, {trip.destination.city}
                  </span>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-white/90">
                  <Clock className="w-3.5 h-3.5 text-[#a0f3d4]" />
                  <span>{trip.durationText}</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-headline leading-tight">
                {trip.title}
              </h1>
            </div>

            {/* Gallery thumbnails */}
            {trip.gallery.length > 0 && (
              <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-1.5 z-20">
                <button
                  onClick={() => setActiveImage(trip.coverImage)}
                  className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    displayImage === trip.coverImage ? "border-[#a0f3d4] scale-105" : "border-white/50 opacity-70"
                  }`}
                >
                  <img src={trip.coverImage} alt="Thumb" className="w-full h-full object-cover" />
                </button>
                {trip.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      displayImage === img ? "border-[#a0f3d4] scale-105" : "border-white/50 opacity-70"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Host Community Card */}
          <div className="bg-white px-5 sm:px-6 py-3 border-b border-[#bec9c3]/20 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <img
                src={trip.community.avatarUrl}
                alt={trip.community.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#0F6E56]/20"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-[#181d1a]">{trip.community.name}</h3>
                  {trip.community.verified && (
                    <ShieldCheck className="w-4 h-4 text-[#0F6E56] shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-[#3f4944]">
                  Hosted by {trip.community.leader} • {trip.community.memberCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f1f4f1] text-[#005440] font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span>{trip.community.rating}</span>
              </span>
              <span className="text-xs font-semibold text-[#005440] bg-[#c9eadb]/40 px-2.5 py-1 rounded-full">
                {remainingSlots > 0 ? `${remainingSlots} spots left` : "Waitlist only"}
              </span>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex gap-2 sm:gap-4 px-5 sm:px-6 pt-3 border-b border-[#bec9c3]/20 bg-white">
            {[
              { id: "OVERVIEW", label: "Overview" },
              { id: "ITINERARY", label: "Day-by-Day" },
              { id: "INCLUSIONS", label: "Inclusions & Gear" },
              { id: "MATES", label: `Mates (${trip.joinedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#005440] text-[#005440]"
                    : "border-transparent text-[#3f4944] hover:text-[#181d1a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Modal Tab Content Area */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === "OVERVIEW" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* Vibe Pill */}
                <div className="bg-[#eef8f4] p-3.5 rounded-2xl border border-[#c9eadb] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#005440] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#a0f3d4]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#005440]">
                      The Community Vibe
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#181d1a]">{trip.vibe}</p>
                  </div>
                </div>

                {/* About the experience */}
                <div>
                  <h3 className="text-sm font-extrabold text-[#181d1a] font-headline mb-2">
                    About this experience
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4944] leading-relaxed">
                    {trip.description}
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-[#bec9c3]/20">
                    <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Category</p>
                    <p className="text-xs sm:text-sm font-bold text-[#181d1a] mt-0.5">
                      {trip.category}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#bec9c3]/20">
                    <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Group Size</p>
                    <p className="text-xs sm:text-sm font-bold text-[#181d1a] mt-0.5">
                      Max {trip.maxCapacity} Voyagers
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#bec9c3]/20 col-span-2 sm:col-span-1">
                    <p className="text-[10px] uppercase font-bold text-[#6f7a74]">Pricing Policy</p>
                    <p className="text-xs sm:text-sm font-bold text-[#005440] mt-0.5">
                      {isFree ? "Free Entry" : `₹${trip.price?.toLocaleString("en-IN")}`}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-[11px] uppercase font-extrabold text-[#3f4944] tracking-wider mb-2">
                    Community Themes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {trip.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-[#e0e3e0]/60 text-xs font-semibold text-[#181d1a]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ITINERARY" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="mb-2">
                  <h3 className="text-sm font-extrabold text-[#181d1a] font-headline">
                    Detailed Day-by-Day Plan
                  </h3>
                  <p className="text-xs text-[#3f4944]">
                    Crafted and led by verified community leaders.
                  </p>
                </div>

                <div className="space-y-3">
                  {trip.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="bg-white p-4 rounded-2xl border border-[#bec9c3]/25 shadow-xs"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="w-7 h-7 rounded-lg bg-[#005440] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                          D{day.day}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#181d1a] font-headline">
                          {day.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#3f4944] leading-relaxed mb-3">
                        {day.description}
                      </p>

                      <div className="space-y-1.5 bg-[#f7faf6] p-3 rounded-xl border border-[#bec9c3]/15">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#005440]">
                          Key Highlights:
                        </p>
                        {day.activities.map((act, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-[#181d1a] font-medium"
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
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* Inclusions */}
                <div>
                  <h3 className="text-sm font-extrabold text-[#181d1a] font-headline mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F6E56]" />
                    <span>What's Included</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trip.inclusions.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-emerald-50/60 border border-emerald-200/60 p-3 rounded-xl flex items-start gap-2 text-xs text-emerald-950 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exclusions */}
                <div>
                  <h3 className="text-sm font-extrabold text-[#181d1a] font-headline mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>Not Included (Self-Arranged)</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trip.exclusions.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-red-50/60 border border-red-200/60 p-3 rounded-xl flex items-start gap-2 text-xs text-red-950 font-medium"
                      >
                        <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-sm font-extrabold text-[#181d1a] font-headline mb-2">
                    Guidelines & Requirements
                  </h3>
                  <div className="bg-white p-4 rounded-xl border border-[#bec9c3]/20 space-y-2">
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
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#181d1a] font-headline">
                      Confirmed Voyagers ({trip.joinedCount})
                    </h3>
                    <p className="text-xs text-[#3f4944]">
                      Connect and break the ice before the journey begins!
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
                      className="bg-white p-3.5 rounded-2xl border border-[#bec9c3]/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={att.avatarUrl}
                          alt={att.name}
                          className="w-11 h-11 rounded-full object-cover border border-[#bec9c3]/30"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#181d1a]">
                            {att.name}
                          </p>
                          {att.badge && (
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-[#e0e3e0]/60 text-[10px] font-bold text-[#005440]">
                              {att.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-[#0F6E56]">Joined ✓</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f0f9f5] p-3.5 rounded-2xl border border-[#0F6E56]/20 text-center">
                  <p className="text-xs text-[#005440] font-medium">
                    + {trip.joinedCount - trip.attendees.length} other voyagers have confirmed their spots!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="bg-white p-4 sm:p-5 border-t border-[#bec9c3]/25 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-[10px] text-[#6f7a74] uppercase font-bold tracking-wider">
                {isFree ? "Registration" : "Price per voyager"}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-[#005440] font-headline">
                  {isFree ? "FREE" : `₹${trip.price?.toLocaleString("en-IN")}`}
                </span>
                <span className="text-[11px] text-[#6f7a74] font-medium">
                  {isFree ? "No booking fee" : "All taxes & permits incl."}
                </span>
              </div>
            </div>

            <button
              onClick={() => setOpenJoinModal(true)}
              className="py-3 px-6 sm:px-8 rounded-2xl bg-[#005440] hover:bg-[#004736] text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#005440]/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isFree ? "Join Free Camp" : "Book Your Slot"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Join & Checkout Modal */}
      {openJoinModal && (
        <CommunityTripJoinModal
          trip={trip}
          isOpen={openJoinModal}
          onClose={() => setOpenJoinModal(false)}
          onSuccessJoined={() => {
            onJoinedSuccess?.(trip.id);
            setOpenJoinModal(false);
          }}
        />
      )}
    </>
  );
}
