"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Compass, MapPin, Globe, Phone, ArrowRight } from "lucide-react";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";
import { useCommunityOnboard } from "../hooks/communityAuth.hooks";
import { CommunityAvatarCoverUploader } from "../components/CommunityAvatarCoverUploader";
import {
  CommunityOnboardingFormData,
  communityOnboardingSchema,
} from "../validators/communityAuth.schema";

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const CommunityOnboardingPage: React.FC = () => {
  const community = useCommunityAuthStore((state) => state.community);
  const onboardMutation = useCommunityOnboard();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    community?.avatarUrl || null
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    community?.coverUrl || null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityOnboardingFormData>({
    resolver: zodResolver(communityOnboardingSchema),
    defaultValues: {
      tagline: community?.tagline || "",
      description: community?.description || "",
      city: community?.city || "",
      state: community?.state || "",
      country: community?.country || "India",
      instagramHandle: community?.instagramHandle || "",
      websiteUrl: community?.websiteUrl || "",
      phone: community?.phone || "",
    },
  });

  const handleAvatarChange = (file: File) => {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleCoverChange = (file: File) => {
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: CommunityOnboardingFormData) => {
    const formData = new FormData();

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    if (coverFile) {
      formData.append("cover", coverFile);
    }

    if (data.tagline?.trim()) {
      formData.append("tagline", data.tagline.trim());
    }
    if (data.description?.trim()) {
      formData.append("description", data.description.trim());
    }
    if (data.city?.trim()) {
      formData.append("city", data.city.trim());
    }
    if (data.state?.trim()) {
      formData.append("state", data.state.trim());
    }
    if (data.country?.trim()) {
      formData.append("country", data.country.trim());
    }
    if (data.instagramHandle?.trim()) {
      // Normalize handle
      const cleaned = data.instagramHandle.trim().replace(/^@/, "");
      formData.append("instagramHandle", cleaned);
    }
    if (data.websiteUrl?.trim()) {
      formData.append("websiteUrl", data.websiteUrl.trim());
    }
    if (data.phone?.trim()) {
      formData.append("phone", data.phone.trim());
    }

    onboardMutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F6E56]/10 text-[#005440] text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Organizer Onboarding</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#181d1a] font-headline tracking-tight">
          Set Up Your Community Profile
        </h1>
        <p className="text-sm sm:text-base text-[#3f4944] mt-2 max-w-lg mx-auto leading-relaxed">
          Showcase your club to thousands of voyagers. Add your visuals, community bio,
          and social presence.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-[#bec9c3]/30"
        noValidate
      >
        {/* Visuals: Avatar & Cover Banner */}
        <section className="mb-8">
          <label className="block text-sm font-bold text-[#181d1a] mb-3 ml-1">
            Club Visual Identity
          </label>
          <CommunityAvatarCoverUploader
            avatarPreview={avatarPreview}
            coverPreview={coverPreview}
            onAvatarChange={handleAvatarChange}
            onCoverChange={handleCoverChange}
          />
        </section>

        {/* Basic Info */}
        <section className="space-y-5 mb-8">
          <div>
            <label
              htmlFor="tagline"
              className="block text-sm font-semibold mb-2 text-[#3f4944] ml-1"
            >
              Tagline / Catchphrase
            </label>
            <input
              id="tagline"
              type="text"
              placeholder="e.g. Exploring uncharted trails across the Western Ghats"
              {...register("tagline")}
              className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none focus:shadow-sm"
            />
            {errors.tagline && (
              <p className="text-sm text-red-500 mt-1 ml-1">{errors.tagline.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold mb-2 text-[#3f4944] ml-1"
            >
              About the Community
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Tell travelers about your club, the types of expeditions you organize, safety protocols, and what makes your trips unique..."
              {...register("description")}
              className="w-full p-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none focus:shadow-sm resize-none"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1 ml-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </section>

        {/* Location & Contact Grid */}
        <section className="space-y-5 mb-8 pt-6 border-t border-[#bec9c3]/20">
          <h3 className="text-sm font-bold text-[#181d1a] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0f6e56]" />
            <span>Headquarters &amp; Contact</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
              >
                Base City
              </label>
              <input
                id="city"
                type="text"
                placeholder="e.g. Pune"
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
                placeholder="e.g. Maharashtra"
                {...register("state")}
                className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
              {errors.state && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.state.message}</p>
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

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1 flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#6f7a74]" />
              <span>Organizer Contact Number</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 9876543210"
              {...register("phone")}
              className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone.message}</p>
            )}
          </div>
        </section>

        {/* Social Presence */}
        <section className="space-y-4 mb-8 pt-6 border-t border-[#bec9c3]/20">
          <h3 className="text-sm font-bold text-[#181d1a] uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0f6e56]" />
            <span>Online Presence &amp; Verification</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="instagramHandle"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1 flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#6f7a74]" />
                <span>Instagram Handle</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#6f7a74] font-medium">
                  @
                </span>
                <input
                  id="instagramHandle"
                  type="text"
                  placeholder="sahyadri_trekkers"
                  {...register("instagramHandle")}
                  className="w-full h-11 pl-8 pr-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
                />
              </div>
              {errors.instagramHandle && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.instagramHandle.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="websiteUrl"
                className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1 flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-[#6f7a74]" />
                <span>Website (Optional)</span>
              </label>
              <input
                id="websiteUrl"
                type="url"
                placeholder="https://yourclub.com"
                {...register("websiteUrl")}
                className="w-full h-11 px-3.5 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none"
              />
              {errors.websiteUrl && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.websiteUrl.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Submit Action */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={onboardMutation.isPending}
            className="w-full h-13 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none cursor-pointer shadow-md text-base sm:text-lg"
          >
            {onboardMutation.isPending ? (
              <span className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Complete Profile &amp; Go to Portal</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunityOnboardingPage;
