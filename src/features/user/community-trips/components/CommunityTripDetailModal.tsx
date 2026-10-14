"use client";

import { useState } from "react";
import { CommunityTripItem } from "../types";
import {
  X,
  MapPin,
  Clock,
  Share2,
  Tent,
  Backpack,
} from "lucide-react";
import { toast } from "sonner";
import CommunityTripJoinModal from "./CommunityTripJoinModal";
import CommunityTripHostCard from "./details/CommunityTripHostCard";
import CommunityTripOverviewTab from "./details/CommunityTripOverviewTab";
import CommunityTripItineraryTab from "./details/CommunityTripItineraryTab";
import CommunityTripInclusionsTab from "./details/CommunityTripInclusionsTab";
import CommunityTripMatesTab from "./details/CommunityTripMatesTab";
import CommunityTripBookingCard from "./details/CommunityTripBookingCard";

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
}: Readonly<CommunityTripDetailModalProps>) {
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "ITINERARY" | "INCLUSIONS" | "MATES"
  >("OVERVIEW");
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!isOpen || !trip) return null;

  const isFree = trip.pricingType === "FREE";
  const displayImage = activeImage || trip.coverImage;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Trip link copied to clipboard");
    }
  };

  const handleJoined = () => {
    onJoinedSuccess?.(trip.id);
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
                    : "bg-[#a0f3d4] text-[#004736]"
                }`}
              >
                {isFree ? (
                  <>
                    <Tent className="w-3.5 h-3.5" />
                    <span>Free Community Camp</span>
                  </>
                ) : (
                  <>
                    <Backpack className="w-3.5 h-3.5" />
                    <span>Curated Expedition</span>
                  </>
                )}
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
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Gallery Thumbnail Strip */}
            {(() => {
              const allImages = Array.from(
                new Set([trip.coverImage, ...(trip.gallery || [])].filter(Boolean))
              );
              if (allImages.length <= 1) return null;

              return (
                <div className="p-2 bg-white rounded-2xl border border-[#bec9c3]/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
                  {allImages.map((img, i) => (
                    <button
                      key={`${img}-${i}`}
                      onClick={() => setActiveImage(img)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        displayImage === img
                          ? "border-[#005440] scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              );
            })()}

            {/* Host Banner */}
            <CommunityTripHostCard community={trip.community} />

            {/* Tab navigation */}
            <div className="bg-white rounded-2xl border border-[#bec9c3]/20 overflow-hidden">
              <div className="flex border-b border-[#bec9c3]/20 bg-[#f7faf6] px-4 pt-3 gap-3 overflow-x-auto scrollbar-none">
                {(
                  [
                    { id: "OVERVIEW", label: "Overview" },
                    { id: "ITINERARY", label: "Itinerary" },
                    { id: "INCLUSIONS", label: "Inclusions" },
                    { id: "MATES", label: `Voyagers (${trip.joinedCount})` },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
                      activeTab === tab.id
                        ? "border-[#005440] text-[#005440]"
                        : "border-transparent text-[#3f4944] hover:text-[#181d1a]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-4 sm:p-5">
                {activeTab === "OVERVIEW" && (
                  <CommunityTripOverviewTab trip={trip} isFree={isFree} />
                )}
                {activeTab === "ITINERARY" && (
                  <CommunityTripItineraryTab itinerary={trip.itinerary} />
                )}
                {activeTab === "INCLUSIONS" && (
                  <CommunityTripInclusionsTab
                    inclusions={trip.inclusions}
                    exclusions={trip.exclusions}
                    requirements={trip.requirements}
                  />
                )}
                {activeTab === "MATES" && (
                  <CommunityTripMatesTab
                    trip={trip}
                    joinedCount={trip.joinedCount}
                  />
                )}
              </div>
            </div>

            {/* Booking Card */}
            <CommunityTripBookingCard
              trip={trip}
              joinedCount={trip.joinedCount}
              onOpenJoinModal={() => setOpenJoinModal(true)}
            />
          </div>
        </div>
      </div>

      {openJoinModal && (
        <CommunityTripJoinModal
          trip={trip}
          isOpen={openJoinModal}
          onClose={() => setOpenJoinModal(false)}
          onSuccessJoined={handleJoined}
        />
      )}
    </>
  );
}
