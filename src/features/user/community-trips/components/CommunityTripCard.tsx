"use client";

import Link from "next/link";
import { CommunityTripItem } from "../data/dummyCommunityTrips";
import {
  Calendar,
  MapPin,
  ShieldCheck,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface CommunityTripCardProps {
  trip: CommunityTripItem;
  onJoinClick?: (trip: CommunityTripItem) => void;
}

export default function CommunityTripCard({
  trip,
  onJoinClick,
}: CommunityTripCardProps) {
  const isFree = trip.pricingType === "FREE";
  const remainingSpots = trip.maxCapacity - trip.joinedCount;
  const progressPercent = Math.min(100, Math.round((trip.joinedCount / trip.maxCapacity) * 100));
  const detailHref = `/community-trips/${trip.slug}`;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_-6px_rgba(0,84,64,0.12)] border border-[#bec9c3]/25 flex flex-col h-full">
      {/* Cover Image & Badges */}
      <Link href={detailHref} className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 block">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Pricing Badge Top Left */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1 ${
              isFree
                ? "bg-[#005440] text-white"
                : "bg-white/95 text-[#005440] backdrop-blur-md"
            }`}
          >
            {isFree ? (
              <>
                <Sparkles className="w-3 h-3 text-[#a0f3d4]" />
                <span>FREE TRIP</span>
              </>
            ) : (
              <>
                <span className="text-[10px] text-[#6f7a74] font-bold">FROM</span>
                <span>₹{trip.price?.toLocaleString("en-IN")}</span>
              </>
            )}
          </span>
        </div>

        {/* Category Pill Top Right */}
        <div className="absolute top-3.5 right-3.5">
          <span className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
            {trip.category}
          </span>
        </div>

        {/* Bottom Bar inside Image: Location & Duration */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 font-semibold truncate text-white/95 drop-shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#a0f3d4] shrink-0" />
            <span className="truncate">
              {trip.destination.name}, {trip.destination.city}
            </span>
          </span>

          <span className="flex items-center gap-1 text-[11px] font-medium bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full shrink-0">
            <Clock className="w-3 h-3 text-[#a0f3d4]" />
            <span>{trip.durationText}</span>
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Host Community Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src={trip.community.avatarUrl}
                alt={trip.community.name}
                className="w-6 h-6 rounded-full object-cover border border-[#0F6E56]/30"
              />
              <span className="text-xs font-bold text-[#0F6E56] truncate">
                {trip.community.name}
              </span>
              {trip.community.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
              )}
            </div>

            <span className="text-[11px] text-[#6f7a74] font-medium">
              ★ {trip.community.rating}
            </span>
          </div>

          {/* Title */}
          <Link href={detailHref} className="block group-hover:text-[#005440] transition-colors">
            <h3 className="text-base sm:text-lg font-black text-[#181d1a] leading-snug font-headline line-clamp-2">
              {trip.title}
            </h3>
          </Link>

          <p className="text-xs text-[#3f4944] mt-1.5 line-clamp-2 leading-relaxed">
            {trip.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {trip.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[#eef8f4] text-[#005440] text-[10px] font-bold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Slot Progress & Attendees */}
        <div className="pt-3 border-t border-[#bec9c3]/20 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#3f4944] font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#0F6E56]" />
              <strong className="text-[#181d1a]">{trip.joinedCount}</strong> / {trip.maxCapacity} joined
            </span>

            <span
              className={`text-[11px] font-bold ${
                remainingSpots <= 4 ? "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full" : "text-[#0F6E56]"
              }`}
            >
              {remainingSpots <= 4 ? `Only ${remainingSpots} spots left!` : `${remainingSpots} available`}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#e0e3e0] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0F6E56] to-[#005440] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Attendee Avatar Stack & Actions */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center -space-x-1.5">
              {trip.attendees.map((att) => (
                <img
                  key={att.id}
                  src={att.avatarUrl}
                  alt={att.name}
                  title={att.name}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              ))}
              {trip.joinedCount > trip.attendees.length && (
                <div className="w-6 h-6 rounded-full bg-[#c9eadb] text-[#005440] font-bold text-[9px] flex items-center justify-center border-2 border-white">
                  +{trip.joinedCount - trip.attendees.length}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <Link
                href={detailHref}
                className="px-3 py-1.5 rounded-xl border border-[#bec9c3]/50 text-xs font-bold text-[#3f4944] hover:bg-[#e0e3e0]/50 transition-all cursor-pointer"
              >
                Details
              </Link>
              <Link
                href={detailHref}
                className="px-3.5 py-1.5 rounded-xl bg-[#005440] hover:bg-[#004736] text-white text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
              >
                <span>{isFree ? "Join" : "Book"}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
