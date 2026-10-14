"use client";

import React, { useState } from "react";
import { X, ArrowRight, ArrowLeft, Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useCreateCommunityTrip } from "../hooks/communityTrip.hooks";
import { CreateTripBasicFields } from "./create/CreateTripBasicFields";
import { CreateTripItineraryFields } from "./create/CreateTripItineraryFields";
import { CreateTripCommunityAuth } from "./create/CreateTripCommunityAuth";

interface CreateCommunityTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessCreated?: () => void;
}

export default function CreateCommunityTripModal({
  isOpen,
  onClose,
  onSuccessCreated,
}: CreateCommunityTripModalProps) {
  const [step, setStep] = useState<"DETAILS" | "PLAN" | "AUTH">("DETAILS");

  // Basic Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<
    "CAMP" | "TREK_EXPEDITION" | "ROADTRIP" | "TRIP"
  >("CAMP");
  const [destinationName, setDestinationName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [durationText, setDurationText] = useState("3 Days, 2 Nights");
  const [maxCapacity, setMaxCapacity] = useState(15);
  const [pricingType, setPricingType] = useState<"FREE" | "PAID">("FREE");
  const [price, setPrice] = useState(0);

  // Itinerary & Media
  const [description, setDescription] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const createTripMutation = useCreateCommunityTrip();

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "DETAILS") {
      if (new Date(dateFrom) >= new Date(dateTo)) {
        toast.error("Date To must be strictly after Date From");
        return;
      }
      setStep("PLAN");
    } else if (step === "PLAN") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    createTripMutation.mutate(
      {
        title,
        category,
        pricingType,
        price: pricingType === "PAID" ? price : undefined,
        destinationName,
        city,
        state,
        country: "India",
        dateFrom: new Date(dateFrom).toISOString(),
        dateTo: new Date(dateTo).toISOString(),
        durationText,
        maxCapacity,
        description,
        itinerary,
        inclusions: inclusions || undefined,
        exclusions: exclusions || undefined,
        gallery: coverImageUrl ? [coverImageUrl] : undefined,
      },
      {
        onSuccess: () => {
          onSuccessCreated?.();
          onClose();
        },
        onError: (err) => {
          const code = err.response?.data?.error?.code || err.response?.status;
          const msg = err.response?.data?.message || err.response?.data?.error?.message;
          if (
            code === 401 ||
            code === "UNAUTHORIZED" ||
            (typeof msg === "string" && msg.includes("Community not found"))
          ) {
            setStep("AUTH");
          }
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !createTripMutation.isPending) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#bec9c3]/30 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-4 border-b border-[#bec9c3]/20 bg-[#f7faf6]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#0F6E56]/15 text-[#005440]">
              Community Host Portal
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#181d1a] font-headline mt-1">
              {step === "AUTH"
                ? "Organizer Verification"
                : "Publish New Community Adventure"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#e0e3e0] flex items-center justify-center hover:bg-[#d0d4d0] transition-colors text-[#3f4944] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Tabs */}
        {step !== "AUTH" && (
          <div className="flex border-b border-[#bec9c3]/20 px-6 pt-2 bg-white text-xs font-bold gap-6">
            <button
              type="button"
              onClick={() => setStep("DETAILS")}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                step === "DETAILS"
                  ? "border-[#005440] text-[#005440]"
                  : "border-transparent text-[#6f7a74]"
              }`}
            >
              1. Basics &amp; Pricing
            </button>
            <button
              type="button"
              onClick={() => setStep("PLAN")}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                step === "PLAN"
                  ? "border-[#005440] text-[#005440]"
                  : "border-transparent text-[#6f7a74]"
              }`}
            >
              2. Plan &amp; Itinerary
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {step === "AUTH" && (
            <CreateTripCommunityAuth
              onSuccess={() => {
                setStep("PLAN");
                handleSubmit();
              }}
            />
          )}

          {step !== "AUTH" && (
            <form onSubmit={handleNext} className="space-y-4">
              {step === "DETAILS" && (
                <CreateTripBasicFields
                  title={title}
                  setTitle={setTitle}
                  category={category}
                  setCategory={setCategory}
                  destinationName={destinationName}
                  setDestinationName={setDestinationName}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  dateFrom={dateFrom}
                  setDateFrom={setDateFrom}
                  dateTo={dateTo}
                  setDateTo={setDateTo}
                  durationText={durationText}
                  setDurationText={setDurationText}
                  maxCapacity={maxCapacity}
                  setMaxCapacity={setMaxCapacity}
                  pricingType={pricingType}
                  setPricingType={setPricingType}
                  price={price}
                  setPrice={setPrice}
                />
              )}

              {step === "PLAN" && (
                <CreateTripItineraryFields
                  description={description}
                  setDescription={setDescription}
                  itinerary={itinerary}
                  setItinerary={setItinerary}
                  inclusions={inclusions}
                  setInclusions={setInclusions}
                  exclusions={exclusions}
                  setExclusions={setExclusions}
                  coverImageUrl={coverImageUrl}
                  setCoverImageUrl={setCoverImageUrl}
                />
              )}

              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#bec9c3]/20">
                {step === "PLAN" ? (
                  <button
                    type="button"
                    onClick={() => setStep("DETAILS")}
                    className="px-4 py-2.5 rounded-xl border border-[#bec9c3]/40 text-xs font-bold text-[#3f4944] hover:bg-[#f7faf6] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  disabled={createTripMutation.isPending}
                  className="px-5 py-2.5 rounded-xl bg-[#005440] hover:bg-[#004736] text-white text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {createTripMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : step === "DETAILS" ? (
                    <>
                      <span>Next: Itinerary &amp; Vibe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Publish Community Trip</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
