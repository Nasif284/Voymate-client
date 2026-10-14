"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CommunityTripItem } from "../types";
import { X, Lock } from "lucide-react";
import { useAuthStore } from "@/src/store/auth.store";
import { useCommunityTripCheckout } from "../hooks/communityTrip.hooks";
import { CommunityTripJoinForm } from "./join/CommunityTripJoinForm";
import { CommunityTripConfirmedView } from "./join/CommunityTripConfirmedView";

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
}: Readonly<CommunityTripJoinModalProps>) {
  const { user, isAuthenticated } = useAuthStore();

  const [step, setStep] = useState<"FORM" | "PROCESSING" | "CONFIRMED">("FORM");
  const [name, setName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD">("UPI");

  const { isProcessing, bookingCode, joinFree, joinPaid } = useCommunityTripCheckout({
    trip,
    onSuccessJoined: () => {
      setStep("CONFIRMED");
      onSuccessJoined?.();
    },
  });

  useEffect(() => {
    if (user?.fullName && !name) {
      setName(user.fullName);
    }
  }, [user?.fullName, name]);

  useEffect(() => {
    if (isProcessing) {
      setStep("PROCESSING");
    } else if (step === "PROCESSING" && !bookingCode) {
      setStep("FORM");
    }
  }, [isProcessing, step, bookingCode]);

  if (!isOpen) return null;

  if (!isAuthenticated) {
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/community-trips";
    return (
      <div
        className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#bec9c3]/30 p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#0F6E56]/15 text-[#005440] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#181d1a] font-headline">
            Sign In Required
          </h3>
          <p className="text-xs sm:text-sm text-[#3f4944]">
            Please sign in to your Voymate account to join {trip.title} and confirm your spot.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href={`/login?redirect=${encodeURIComponent(currentPath)}`}
              className="w-full py-3 px-4 rounded-xl bg-[#005440] text-white font-bold text-xs hover:bg-[#004736] transition-all flex items-center justify-center gap-1.5"
            >
              <span>Sign In to Continue</span>
            </Link>
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl border border-[#bec9c3]/30 text-xs font-semibold text-[#3f4944] hover:bg-[#f7faf6] transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isFree = trip.pricingType === "FREE";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFree) {
      joinFree({
        contactName: name,
        contactPhone: phone,
        emergencyPhone,
        note,
      });
    } else {
      joinPaid({
        contactName: name,
        contactPhone: phone,
        emergencyPhone,
        note,
        userEmail: user?.email,
      });
    }
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
              {step === "CONFIRMED" ? "Booking Confirmed" : `Join: ${trip.title}`}
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
                {isFree
                  ? "Securing your spot with the organizers..."
                  : "Processing secure payment..."}
              </p>
              <p className="text-xs text-[#3f4944]">
                Issuing your Voymate traveler pass
              </p>
            </div>
          )}

          {step === "FORM" && (
            <CommunityTripJoinForm
              trip={trip}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              emergencyPhone={emergencyPhone}
              setEmergencyPhone={setEmergencyPhone}
              note={note}
              setNote={setNote}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onSubmit={handleSubmit}
            />
          )}

          {step === "CONFIRMED" && (
            <CommunityTripConfirmedView
              trip={trip}
              name={name}
              bookingCode={bookingCode}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
