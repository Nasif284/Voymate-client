"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Compass,
  Tent,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { useCommunityTrips } from "@/src/features/user/community-trips/hooks/communityTrip.hooks";

export default function CommunityTripsPreview() {
  const { data, isLoading } = useCommunityTrips({ limit: 3 });
  const trips = data?.trips || [];

  return (
    <section id="community-trips" className="py-20 md:py-32 bg-[#f7faf6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#005440] bg-[#c9eadb]/50 px-3.5 py-1.5 rounded-full inline-block">
              Curated Group Journeys
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#181d1a] tracking-tight mt-3">
              Upcoming Community Expeditions
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#3f4944]">
              Don&apos;t want to travel alone? Join group expeditions, stranger camps, and weekend getaways
              hosted by verified travel clubs and outdoor organizers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/community/signup"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005440] bg-[#a0f3d4]/40 hover:bg-[#a0f3d4]/70 px-4 py-2.5 rounded-xl transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Host a Trip</span>
            </Link>

            <Link
              href="/community-trips"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#005440] hover:text-[#0f6e56] transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Loading State: Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden border border-[#bec9c3]/30 shadow-xs flex flex-col justify-between animate-pulse"
              >
                <div className="h-56 bg-neutral-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-neutral-200 rounded-md w-3/4" />
                  <div className="h-5 bg-neutral-200 rounded-md w-5/6" />
                  <div className="h-3 bg-neutral-200 rounded-md w-1/2" />
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-[#bec9c3]/20 flex justify-between items-center">
                  <div className="h-6 bg-neutral-200 rounded-md w-20" />
                  <div className="h-9 bg-neutral-200 rounded-xl w-28" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Real Dynamic Trips Grid */}
        {!isLoading && trips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {trips.map((trip) => {
              const slotsRemaining = Math.max(
                0,
                trip.maxCapacity - (trip.joinedCount || 0)
              );

              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#bec9c3]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Cover */}
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-neutral-100">
                      <img
                        src={trip.coverImage}
                        alt={trip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#005440]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#a0f3d4]" />
                        <span>
                          {trip.community?.verified
                            ? "Verified Organizer"
                            : "Community Host"}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full backdrop-blur-md">
                        {trip.category}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#a0f3d4]" />
                        <span>{slotsRemaining} slots remaining</span>
                      </div>
                    </div>

                    {/* Body Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-[#3f4944] mb-2 font-medium">
                        <span className="flex items-center gap-1 truncate max-w-[60%]">
                          <MapPin className="w-3.5 h-3.5 text-[#005440] shrink-0" />
                          <span className="truncate">
                            {trip.destination?.city || trip.destination?.name}
                            {trip.destination?.state
                              ? `, ${trip.destination.state}`
                              : ""}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-[#005440]" />
                          <span>
                            {new Date(trip.dateFrom).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </span>
                      </div>

                      <h3 className="font-headline font-bold text-lg text-[#181d1a] leading-snug group-hover:text-[#005440] transition-colors line-clamp-2">
                        {trip.title}
                      </h3>

                      <p className="text-xs text-[#476459] mt-2 font-medium flex items-center gap-1.5">
                        <span>Hosted by</span>
                        <strong className="text-[#181d1a]">
                          {trip.community?.name || "Voymate Club"}
                        </strong>
                      </p>
                    </div>
                  </div>

                  {/* Price & Join Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-[#bec9c3]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#3f4944] block">
                        Registration
                      </span>
                      <span className="text-lg font-black text-[#005440] font-headline">
                        {trip.pricingType === "FREE"
                          ? "FREE"
                          : `₹${trip.price?.toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    <Link
                      href={`/community-trips/${trip.slug || trip.id}`}
                      className="inline-flex items-center gap-1.5 bg-[#005440] hover:bg-[#0f6e56] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs cursor-pointer"
                    >
                      <span>Explore Trip</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#a0f3d4]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State: High-Converting Community Hub Showcase */}
        {!isLoading && trips.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Spotlight 1: For Voyagers */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#edf6f1] p-8 sm:p-10 border border-[#bec9c3]/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0f6e56]/15 text-[#005440] flex items-center justify-center mb-5">
                  <Tent className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0f6e56]">
                  For Solo Voyagers
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#181d1a] font-headline mt-1 mb-3">
                  Seasonal Expeditions Coming Soon
                </h3>
                <p className="text-sm text-[#3f4944] leading-relaxed">
                  Certified trek leaders and travel clubs are finalizing their upcoming seasonal stranger camps and treks. While new group dates drop, find verified travel companions who share your destination and travel style!
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-[#3f4944] font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0f6e56]" />
                    <span>Multi-factor personality &amp; travel style compatibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0f6e56]" />
                    <span>Real-time traveler radar &amp; route overlap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0f6e56]" />
                    <span>Zero spam, 100% government ID verified voyagers</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/community-trips"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#005440] hover:bg-[#0f6e56] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#a0f3d4]" />
                  <span>Browse Travel Marketplace</span>
                </Link>
              </div>
            </div>

            {/* Spotlight 2: For Organizers */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00382b] to-[#0a4d3c] text-white p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/15 text-[#a0f3d4] flex items-center justify-center mb-5 backdrop-blur-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#a0f3d4]">
                  For Travel Clubs &amp; Trek Leaders
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-headline mt-1 mb-3">
                  Lead Expeditions on Voymate
                </h3>
                <p className="text-sm text-emerald-100/90 leading-relaxed">
                  Are you an outdoor organizer, certified mountain leader, or adventure club? List your treks, manage automated attendee rosters, and collect slot payments with zero upfront fees.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-emerald-100 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#a0f3d4]" />
                    <span>Instant Verified Community Host status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#a0f3d4]" />
                    <span>Automated traveler rosters &amp; emergency info collection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#a0f3d4]" />
                    <span>Integrated Razorpay escrow &amp; slot fee processing</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/community/signup"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#00382b] text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Club &amp; Host First Trip</span>
                </Link>
                <Link
                  href="/community/login"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md transition-all"
                >
                  <span>Organizer Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
