"use client";

import React from "react";
import { FileText, Sparkles, CheckCircle2, XCircle, Image as ImageIcon } from "lucide-react";

interface CreateTripItineraryFieldsProps {
  description: string;
  setDescription: (v: string) => void;
  itinerary: string;
  setItinerary: (v: string) => void;
  inclusions: string;
  setInclusions: (v: string) => void;
  exclusions: string;
  setExclusions: (v: string) => void;
  coverImageUrl: string;
  setCoverImageUrl: (v: string) => void;
}

export const CreateTripItineraryFields: React.FC<CreateTripItineraryFieldsProps> = ({
  description,
  setDescription,
  itinerary,
  setItinerary,
  inclusions,
  setInclusions,
  exclusions,
  setExclusions,
  coverImageUrl,
  setCoverImageUrl,
}) => {
  return (
    <div className="space-y-4">
      {/* Trip Description */}
      <div>
        <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center gap-1">
          <FileText className="w-3.5 h-3.5 text-[#0F6E56]" />
          <span>Description & Experience Vibe *</span>
        </label>
        <textarea
          rows={3}
          required
          placeholder="Describe the adventure, terrain, campfire vibe, and who this trip is designed for..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none font-medium resize-none transition-all"
        />
      </div>

      {/* Itinerary (Plain Text with Day markers) */}
      <div>
        <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>Itinerary & Schedule *</span>
          </span>
          <span className="text-[11px] text-[#6f7a74] font-normal">
            Plain-text, day-by-day
          </span>
        </label>
        <textarea
          rows={4}
          required
          placeholder="Day 1: Arrive at basecamp, tent setup, sunset chai, night bonfire & acoustics&#10;Day 2: Early morning ridge trek, cave exploration, stargazing&#10;Day 3: Sunrise summit, breakfast, and departure"
          value={itinerary}
          onChange={(e) => setItinerary(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none font-medium font-mono text-[11px] sm:text-xs leading-relaxed resize-none transition-all"
        />
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Inclusions (1 per line)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Dome tents & sleeping bags&#10;All meals at camp&#10;Local guide & safety permits"
            value={inclusions}
            onChange={(e) => setInclusions(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium resize-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>Exclusions (1 per line)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Personal travel to basecamp&#10;Personal gear & heavy baggage&#10;Bottled beverages"
            value={exclusions}
            onChange={(e) => setExclusions(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium resize-none transition-all"
          />
        </div>
      </div>

      {/* Custom Cover Photo URL */}
      <div>
        <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>Cover Photo URL (Optional)</span>
          </span>
          <span className="text-[11px] text-[#0F6E56] font-semibold">
            Unsplash Auto-Cover if blank
          </span>
        </label>
        <input
          type="url"
          placeholder="https://images.unsplash.com/... (optional)"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium transition-all"
        />
      </div>
    </div>
  );
};
