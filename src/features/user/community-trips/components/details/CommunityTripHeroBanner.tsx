"use client";

import React from "react";
import { MapPin, Calendar, Clock, Tent, Backpack } from "lucide-react";
import { CommunityTripItem } from "../../types";

interface CommunityTripHeroBannerProps {
  trip: CommunityTripItem;
  displayImage: string;
  activeImage: string | null;
  onSelectImage: (img: string) => void;
  isFree: boolean;
}

export default function CommunityTripHeroBanner({
  trip,
  displayImage,
  onSelectImage,
  isFree,
}: CommunityTripHeroBannerProps) {
  return (
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
      {(() => {
        const allImages = Array.from(
          new Set([trip.coverImage, ...(trip.gallery || [])].filter(Boolean))
        );
        if (allImages.length <= 1) return null;

        return (
          <div className="p-3 bg-[#f7faf6] border-t border-[#bec9c3]/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {allImages.map((img, i) => (
              <button
                key={`${img}-${i}`}
                onClick={() => onSelectImage(img)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  displayImage === img
                    ? "border-[#005440] scale-105 shadow-sm"
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
    </div>
  );
}
