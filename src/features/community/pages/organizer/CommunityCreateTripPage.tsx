"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Compass,
  MapPin,
  Calendar,
  IndianRupee,
  Users,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useCreateOrganizerTrip } from "../../hooks/communityOrganizer.hooks";
import { CommunityTripGalleryUploader } from "../../components/organizer/CommunityTripGalleryUploader";
import {
  CreateCommunityTripFormData,
  createCommunityTripSchema,
} from "../../validators/communityTrip.schema";

export const CommunityCreateTripPage: React.FC = () => {
  const createTripMutation = useCreateOrganizerTrip();
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateCommunityTripFormData>({
    resolver: zodResolver(createCommunityTripSchema),
    defaultValues: {
      title: "",
      category: "TREK_EXPEDITION",
      pricingType: "PAID",
      price: undefined,
      priceNote: "",
      destinationName: "",
      city: "",
      state: "",
      country: "India",
      dateFrom: "",
      dateTo: "",
      durationText: "",
      maxCapacity: 15,
      description: "",
      itinerary: "",
      inclusions: "",
      exclusions: "",
    },
  });

  const pricingType = watch("pricingType");

  const onSubmit = (data: CreateCommunityTripFormData) => {
    const formData = new FormData();

    // Append Gallery Files
    galleryFiles.forEach((file) => {
      formData.append("gallery", file);
    });

    // Append Form Fields
    formData.append("title", data.title.trim());
    formData.append("category", data.category);
    formData.append("pricingType", data.pricingType);
    if (data.pricingType === "PAID" && data.price) {
      formData.append("price", String(data.price));
      formData.append("currency", "INR");
    }
    if (data.priceNote?.trim()) {
      formData.append("priceNote", data.priceNote.trim());
    }
    formData.append("destinationName", data.destinationName.trim());
    formData.append("city", data.city.trim());
    formData.append("state", data.state.trim());
    formData.append("country", data.country?.trim() || "India");
    formData.append("dateFrom", data.dateFrom);
    formData.append("dateTo", data.dateTo);
    formData.append("durationText", data.durationText.trim());
    formData.append("maxCapacity", String(data.maxCapacity));
    formData.append("description", data.description.trim());
    formData.append("itinerary", data.itinerary.trim());

    if (data.inclusions?.trim()) {
      formData.append("inclusions", data.inclusions.trim());
    }
    if (data.exclusions?.trim()) {
      formData.append("exclusions", data.exclusions.trim());
    }

    createTripMutation.mutate(formData);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/community/dashboard/trips"
          className="p-2 rounded-xl text-[#3f4944] hover:bg-neutral-100 transition-colors"
          aria-label="Back to trips"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0f6e56]/10 text-[#0f6e56] text-[11px] font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Community Expedition Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#181d1a] font-headline tracking-tight">
            Host a New Expedition
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-[#bec9c3]/30 shadow-2xs space-y-8"
        noValidate
      >
        {/* Section 1: Gallery Images */}
        <section>
          <CommunityTripGalleryUploader
            files={galleryFiles}
            onFilesChange={setGalleryFiles}
            maxFiles={10}
          />
        </section>

        {/* Section 2: Basic Info */}
        <section className="space-y-4 pt-6 border-t border-[#bec9c3]/20">
          <h2 className="text-sm font-bold text-[#181d1a] uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0f6e56]" />
            <span>Expedition Details</span>
          </h2>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold mb-1.5 text-[#3f4944] ml-1"
            >
              Expedition Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Harishchandragad Monsoon Trek & Cliff Camp"
              {...register("title")}
              className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold mb-1.5 text-[#3f4944] ml-1"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none cursor-pointer"
              >
                <option value="TREK_EXPEDITION">Trek &amp; Expedition</option>
                <option value="CAMP">Camp &amp; Wilderness Retreat</option>
                <option value="ROADTRIP">Scenic Road Trip</option>
                <option value="TRIP">Weekend Group Trip</option>
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="maxCapacity"
                className="block text-sm font-semibold mb-1.5 text-[#3f4944] ml-1 flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-[#6f7a74]" />
                <span>Max Voyagers Capacity</span>
              </label>
              <input
                id="maxCapacity"
                type="number"
                min={1}
                max={500}
                placeholder="15"
                {...register("maxCapacity", { valueAsNumber: true })}
                className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
              {errors.maxCapacity && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.maxCapacity.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Destination & Location */}
        <section className="space-y-4 pt-6 border-t border-[#bec9c3]/20">
          <h2 className="text-sm font-bold text-[#181d1a] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0f6e56]" />
            <span>Destination Location</span>
          </h2>

          <div>
            <label
              htmlFor="destinationName"
              className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
            >
              Primary Landmark / Destination
            </label>
            <input
              id="destinationName"
              type="text"
              placeholder="e.g. Kokankada Cliff, Harishchandragad"
              {...register("destinationName")}
              className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
            />
            {errors.destinationName && (
              <p className="text-xs text-red-500 mt-1 ml-1">
                {errors.destinationName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
              >
                City / Region
              </label>
              <input
                id="city"
                type="text"
                placeholder="Ahmednagar"
                {...register("city")}
                className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
              {errors.city && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                placeholder="Maharashtra"
                {...register("state")}
                className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
              {errors.state && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                placeholder="India"
                {...register("country")}
                className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Dates & Duration */}
        <section className="space-y-4 pt-6 border-t border-[#bec9c3]/20">
          <h2 className="text-sm font-bold text-[#181d1a] uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0f6e56]" />
            <span>Schedule &amp; Dates</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="dateFrom"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
              >
                Start Date
              </label>
              <input
                id="dateFrom"
                type="date"
                {...register("dateFrom")}
                className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
              {errors.dateFrom && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.dateFrom.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dateTo"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
              >
                End Date
              </label>
              <input
                id="dateTo"
                type="date"
                {...register("dateTo")}
                className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
              {errors.dateTo && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.dateTo.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="durationText"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
              >
                Duration Badge
              </label>
              <input
                id="durationText"
                type="text"
                placeholder="2 Days / 1 Night"
                {...register("durationText")}
                className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
              {errors.durationText && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.durationText.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 5: Pricing */}
        <section className="space-y-4 pt-6 border-t border-[#bec9c3]/20">
          <h2 className="text-sm font-bold text-[#181d1a] uppercase tracking-wider flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#0f6e56]" />
            <span>Slot Pricing</span>
          </h2>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm font-bold text-[#181d1a] cursor-pointer">
              <input
                type="radio"
                value="PAID"
                {...register("pricingType")}
                className="w-4 h-4 text-[#0f6e56] focus:ring-[#0f6e56]"
              />
              <span>Paid Registration</span>
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#181d1a] cursor-pointer">
              <input
                type="radio"
                value="FREE"
                {...register("pricingType")}
                className="w-4 h-4 text-[#0f6e56] focus:ring-[#0f6e56]"
              />
              <span>Free Community Slot</span>
            </label>
          </div>

          {pricingType === "PAID" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label
                  htmlFor="price"
                  className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
                >
                  Price per Traveler (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#6f7a74]">
                    ₹
                  </span>
                  <input
                    id="price"
                    type="number"
                    min={1}
                    placeholder="2499"
                    {...register("price", { valueAsNumber: true })}
                    className="w-full h-11 pl-8 pr-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="priceNote"
                  className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
                >
                  Price Note / Cost Tagline
                </label>
                <input
                  id="priceNote"
                  type="text"
                  placeholder="Includes tent, meals & guide"
                  {...register("priceNote")}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
                />
              </div>
            </div>
          )}
        </section>

        {/* Section 6: Description & Itinerary */}
        <section className="space-y-4 pt-6 border-t border-[#bec9c3]/20">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold mb-1.5 text-[#3f4944] ml-1"
            >
              Expedition Overview &amp; Highlights
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe the journey, difficulty level, mountain views, camping vibes, and expectations..."
              {...register("description")}
              className="w-full p-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1 ml-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="itinerary"
              className="block text-sm font-semibold mb-1.5 text-[#3f4944] ml-1"
            >
              Detailed Itinerary &amp; Timeline
            </label>
            <textarea
              id="itinerary"
              rows={5}
              placeholder="Day 1: Base village arrival at 06:00 AM, safety briefing, ascent to Kokankada cliff. Sunset bonfire & dinner.&#10;Day 2: Sunrise summit, exploration of ancient caves, descent and departure."
              {...register("itinerary")}
              className="w-full p-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm font-mono transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none resize-none"
            />
            {errors.itinerary && (
              <p className="text-xs text-red-500 mt-1 ml-1">
                {errors.itinerary.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="inclusions"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1 flex items-center gap-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>What is Included (Optional)</span>
              </label>
              <textarea
                id="inclusions"
                rows={3}
                placeholder="Trek leaders, dome tents, campfire, breakfast, dinner, first aid"
                {...register("inclusions")}
                className="w-full p-3 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-xs transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="exclusions"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1 flex items-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5 text-red-500" />
                <span>What is Excluded (Optional)</span>
              </label>
              <textarea
                id="exclusions"
                rows={3}
                placeholder="Personal insurance, mineral water, travel till base village"
                {...register("exclusions")}
                className="w-full p-3 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-xs transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none resize-none"
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={createTripMutation.isPending}
            className="w-full h-12 sm:h-13 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-70 disabled:pointer-events-none text-base"
          >
            {createTripMutation.isPending ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Publish Expedition to Voymate</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
