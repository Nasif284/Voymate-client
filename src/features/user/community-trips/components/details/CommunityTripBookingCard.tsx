"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { CommunityTripItem } from "../../types";

interface CommunityTripBookingCardProps {
  trip: CommunityTripItem;
  joinedCount: number;
  onOpenJoinModal: () => void;
  isUserJoined?: boolean;
  bookingCode?: string;
  onOpenPass?: () => void;
}

export default function CommunityTripBookingCard({
  trip,
  joinedCount,
  onOpenJoinModal,
  isUserJoined = false,
  bookingCode,
  onOpenPass,
}: Readonly<CommunityTripBookingCardProps>) {
  const isFree = trip.pricingType === "FREE";
  const remainingSlots = Math.max(0, trip.maxCapacity - joinedCount);
  const progressPercent = Math.min(
    100,
    Math.round((joinedCount / trip.maxCapacity) * 100)
  );

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#bec9c3]/25 shadow-md space-y-5">
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
            {remainingSlots <= 0
              ? "All spots booked"
              : remainingSlots <= 4
              ? `Only ${remainingSlots} spots left!`
              : `${remainingSlots} spots available`}
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
      <div className="pt-2">
        {isUserJoined ? (
          <button
            onClick={onOpenPass}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 active:scale-98 transition-all cursor-pointer"
          >
            <Ticket className="w-4 h-4" />
            <span>You're Going! View Pass {bookingCode ? `(${bookingCode})` : ""}</span>
          </button>
        ) : remainingSlots <= 0 ? (
          <button
            disabled
            className="w-full py-4 px-6 rounded-2xl bg-[#e0e3e0] text-[#6f7a74] font-black text-sm sm:text-base flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <span>Trip Sold Out</span>
          </button>
        ) : (
          <button
            onClick={onOpenJoinModal}
            className="w-full py-4 px-6 rounded-2xl bg-[#005440] hover:bg-[#004736] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#005440]/25 active:scale-98 transition-all cursor-pointer"
          >
            <span>{isFree ? "Join Free Camp" : "Book Your Slot Now"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Security Guarantee Box */}
      <div className="pt-3 border-t border-[#bec9c3]/20 space-y-2 text-[11px] text-[#6f7a74]">
        <div className="flex items-center gap-2 text-[#005440] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#0F6E56]" />
          <span>Voymate Verified Community Guarantee</span>
        </div>
        <p className="leading-relaxed">
          Background-vetted community organizers. Instant digital boarding pass &amp; verified slot reservation upon confirmation.
        </p>
      </div>
    </div>
  );
}
