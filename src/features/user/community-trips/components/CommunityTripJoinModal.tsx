"use client";

import { useState } from "react";
import { CommunityTripItem } from "../data/dummyCommunityTrips";
import {
  CheckCircle2,
  X,
  CreditCard,
  Sparkles,
  Ticket,
  MessageSquare,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface CommunityTripJoinModalProps {
  trip: CommunityTripItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccessJoined?: () => void;
}

export default function CommunityTripJoinModal({
  trip,
  isOpen,
  onClose,
  onSuccessJoined,
}: CommunityTripJoinModalProps) {
  const [step, setStep] = useState<"FORM" | "PROCESSING" | "CONFIRMED">("FORM");
  const [name, setName] = useState("Alex Morgan");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [emergencyPhone, setEmergencyPhone] = useState("+91 98765 00000");
  const [note, setNote] = useState("Excited to meet everyone! Bringing good vibes.");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD">("UPI");

  if (!isOpen) return null;

  const isFree = trip.pricingType === "FREE";
  const bookingCode = `VM-${trip.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("PROCESSING");
    setTimeout(() => {
      setStep("CONFIRMED");
      onSuccessJoined?.();
      toast.success(
        isFree
          ? "🎉 You are in! Welcome to " + trip.title
          : "💳 Payment confirmed! Your spot is reserved."
      );
    }, 1200);
  };

  const handleEnterChat = () => {
    toast.success(`Connected to ${trip.community.name} Group Chat! 💬`, {
      description: "You've been added to the travelers channel.",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== "PROCESSING") onClose();
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#bec9c3]/30 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-[#bec9c3]/20 bg-[#f7faf6]">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                isFree
                  ? "bg-[#0F6E56]/15 text-[#005440]"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {isFree ? "Free Community Camp" : "Curated Expedition"}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#181d1a] font-headline mt-1 line-clamp-1">
              {step === "CONFIRMED" ? "Booking Confirmed! 🎟️" : `Join: ${trip.title}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={step === "PROCESSING"}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#e0e3e0] flex items-center justify-center hover:bg-[#d0d4d0] transition-colors text-[#3f4944] cursor-pointer shrink-0 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {step === "PROCESSING" && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#0F6E56]/20 border-t-[#0F6E56] animate-spin" />
              <p className="text-base font-bold text-[#181d1a]">
                {isFree ? "Securing your spot with the organizers..." : "Processing secure payment..."}
              </p>
              <p className="text-xs text-[#3f4944]">Issuing your Voymate traveler pass</p>
            </div>
          )}

          {step === "FORM" && (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="flex justify-between items-center text-xs text-[#0F6E56] font-semibold">
                    <span>Voymate Event Promo</span>
                    <span>-₹1,000</span>
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
                      ₹{(trip.price - 1000).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-[#3f4944] uppercase tracking-wider mb-1.5">
                      Demo Payment Method
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
                      : `Pay ₹${((trip.price ?? 0) - 1000).toLocaleString("en-IN")} & Confirm`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-[#6f7a74] mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F6E56]" />
                  <span>Verified Host • Safe Community • Free cancellation up to 48 hrs</span>
                </p>
              </div>
            </form>
          )}

          {step === "CONFIRMED" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Digital Boarding Pass */}
              <div className="relative bg-gradient-to-br from-[#005440] to-[#0F6E56] text-white rounded-3xl p-5 sm:p-6 shadow-xl overflow-hidden border border-emerald-700">
                {/* Decorative cutouts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-inner" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-inner" />

                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#a0f3d4]" />
                    <span className="font-black text-sm tracking-widest uppercase">Voymate Pass</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#a0f3d4] text-[#004736] font-extrabold text-[10px] uppercase tracking-wider">
                    Confirmed
                  </span>
                </div>

                <div className="py-4 space-y-3">
                  <div>
                    <p className="text-[10px] text-emerald-200 uppercase tracking-widest font-bold">
                      Expedition / Camp
                    </p>
                    <h3 className="text-base sm:text-lg font-black leading-tight mt-0.5">
                      {trip.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                        Traveler
                      </p>
                      <p className="font-bold text-sm">{name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                        Host Community
                      </p>
                      <p className="font-bold text-sm truncate">{trip.community.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                        Dates
                      </p>
                      <p className="font-semibold text-xs">{trip.durationText}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                        Booking Ref
                      </p>
                      <p className="font-mono font-bold text-xs text-[#a0f3d4]">{bookingCode}</p>
                    </div>
                  </div>
                </div>

                {/* Barcode representation */}
                <div className="pt-3 border-t border-dashed border-white/25 flex items-center justify-between">
                  <div className="flex gap-1 h-6 items-end opacity-70">
                    {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-xs"
                          style={{
                            width: `${(i % 3) + 1.5}px`,
                            height: `${(h / 9) * 22}px`,
                          }}
                        />
                      )
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-200">
                    SCAN AT BASE CAMP
                  </span>
                </div>
              </div>

              {/* Post Booking Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={handleEnterChat}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#005440] hover:bg-[#004736] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enter {trip.community.name} Group Chat</span>
                </button>

                <button
                  onClick={() => {
                    toast.success("Boarding pass sent to your WhatsApp & Email! 📲");
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#bec9c3]/50 text-xs sm:text-sm font-bold text-[#3f4944] hover:bg-[#f7faf6] transition-all cursor-pointer"
                >
                  Send Pass to WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
