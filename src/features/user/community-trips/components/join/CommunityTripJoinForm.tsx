"use client";

import React from "react";
import {
  MapPin,
  Sparkles,
  CreditCard,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { CommunityTripItem } from "../../types";

interface CommunityTripJoinFormProps {
  trip: CommunityTripItem;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  emergencyPhone: string;
  setEmergencyPhone: (v: string) => void;
  note: string;
  setNote: (v: string) => void;
  paymentMethod: "UPI" | "CARD";
  setPaymentMethod: (v: "UPI" | "CARD") => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CommunityTripJoinForm: React.FC<CommunityTripJoinFormProps> = ({
  trip,
  name,
  setName,
  phone,
  setPhone,
  emergencyPhone,
  setEmergencyPhone,
  note,
  setNote,
  paymentMethod,
  setPaymentMethod,
  onSubmit,
}) => {
  const isFree = trip.pricingType === "FREE";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Trip Snapshot Box */}
      <div className="bg-[#f7faf6] rounded-2xl p-3.5 border border-[#bec9c3]/20 flex items-center gap-3">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-[#181d1a] truncate font-headline">
            {trip.title}
          </h4>
          <p className="text-[11px] text-[#3f4944] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-[#0F6E56] shrink-0" />
            <span className="truncate">
              {trip.destination.name}, {trip.destination.city}
            </span>
          </p>
          <p className="text-[11px] font-bold text-[#005440] mt-1">
            {isFree ? "Free Entry" : `₹${trip.price?.toLocaleString("en-IN")} per voyager`}
          </p>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1">
            Your Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#e0e3e0]/50 border border-transparent focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none transition-all font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1">
            WhatsApp Number
          </label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#e0e3e0]/50 border border-transparent focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none transition-all font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#3f4944] mb-1">
          Emergency Contact (Phone & Relation)
        </label>
        <input
          type="text"
          required
          value={emergencyPhone}
          onChange={(e) => setEmergencyPhone(e.target.value)}
          placeholder="e.g. +91 98765 00000 (Sibling/Parent)"
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#e0e3e0]/50 border border-transparent focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none transition-all font-medium"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#3f4944] mb-1">
          Note to Host (Skills, Dietary or Vibe)
        </label>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Vegetarian, carrying guitar, excited to hike!"
          className="w-full px-3.5 py-2 rounded-xl bg-[#e0e3e0]/50 border border-transparent focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none transition-all font-medium resize-none"
        />
      </div>

      {/* Paid pricing breakdown if paid */}
      {!isFree && trip.price && (
        <div className="bg-[#f0f9f5] rounded-2xl p-4 border border-[#0F6E56]/20 space-y-2.5">
          <div className="flex justify-between items-center text-xs text-[#3f4944]">
            <span>Trip Slot Fee</span>
            <span>₹{trip.price.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-[#3f4944]">
            <span>Platform Fee</span>
            <span className="text-[#0F6E56] font-bold">FREE (₹0)</span>
          </div>
          <div className="pt-2 border-t border-[#0F6E56]/15 flex justify-between items-center">
            <span className="text-xs sm:text-sm font-bold text-[#181d1a]">
              Total Payable Now
            </span>
            <span className="text-base sm:text-lg font-black text-[#005440]">
              ₹{trip.price.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Payment Method Selector */}
          <div className="pt-2">
            <label className="block text-[11px] font-bold text-[#3f4944] uppercase tracking-wider mb-1.5">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("UPI")}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === "UPI"
                    ? "border-[#005440] bg-white text-[#005440] shadow-xs"
                    : "border-[#bec9c3]/40 bg-white/50 text-[#3f4944]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0F6E56]" />
                <span>Instant UPI (GPay/PhonePe)</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("CARD")}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === "CARD"
                    ? "border-[#005440] bg-white text-[#005440] shadow-xs"
                    : "border-[#bec9c3]/40 bg-white/50 text-[#3f4944]"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-[#0F6E56]" />
                <span>Debit / Credit Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit CTA */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-[#005440] hover:bg-[#004736] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#005440]/25 active:scale-98 transition-all cursor-pointer"
        >
          <span>
            {isFree
              ? "Confirm Free Registration"
              : `Pay ₹${(trip.price ?? 0).toLocaleString("en-IN")} & Confirm`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-center text-[11px] text-[#6f7a74] mt-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0F6E56]" />
          <span>Verified Host • Safe Community • Free cancellation up to 48 hrs</span>
        </p>
      </div>
    </form>
  );
};
