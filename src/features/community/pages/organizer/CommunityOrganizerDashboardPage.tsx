"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  ShieldCheck,
  Plus,
  Compass,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";
import { useOrganizerTrips } from "../../hooks/communityOrganizer.hooks";

export const CommunityOrganizerDashboardPage: React.FC = () => {
  const community = useCommunityAuthStore((state) => state.community);
  const { data, isLoading } = useOrganizerTrips();

  const trips = data?.trips || [];
  const totalTrips = data?.total || trips.length;

  const totalJoined = trips.reduce(
    (acc, t) => acc + (t.joinedCount || 0),
    0
  );

  const activeTripsCount = trips.filter(
    (t) => t.status === "PUBLISHED" || !t.status
  ).length;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00382b] to-[#0f6e56] text-white p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#a0f3d4] text-xs font-bold mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Console</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-headline tracking-tight">
            Welcome back, {community?.name || "Organizer"}!
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 mt-2 leading-relaxed">
            {community?.tagline ||
              "Manage your expeditions, track joined travelers, and curate unforgettable group adventures."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/community/dashboard/trips/create"
              className="h-11 px-5 rounded-xl bg-white text-[#00382b] hover:bg-neutral-100 text-sm font-bold inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Host New Expedition</span>
            </Link>
            <Link
              href="/community/dashboard/bookings"
              className="h-11 px-5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-sm font-semibold inline-flex items-center gap-2 backdrop-blur-md transition-all"
            >
              <Users className="w-4 h-4" />
              <span>View Attendee Rosters</span>
            </Link>
          </div>
        </div>

        {/* Ambient Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
          <Compass className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Stats Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Expeditions",
            value: isLoading ? "..." : totalTrips,
            icon: CalendarDays,
            note: `${activeTripsCount} active right now`,
            color: "text-[#0f6e56]",
            bg: "bg-emerald-50",
          },
          {
            title: "Voyagers Joined",
            value: isLoading ? "..." : totalJoined,
            icon: Users,
            note: "Across all organized trips",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            title: "Host Status",
            value:
              community?.verificationStatus === "VERIFIED"
                ? "Verified Host"
                : community?.verificationStatus === "PENDING"
                ? "Under Review"
                : "Unverified",
            icon: ShieldCheck,
            note:
              community?.verificationStatus === "VERIFIED"
                ? "Full privileges enabled"
                : "Verification recommended",
            color:
              community?.verificationStatus === "VERIFIED"
                ? "text-emerald-700"
                : "text-amber-700",
            bg:
              community?.verificationStatus === "VERIFIED"
                ? "bg-emerald-50"
                : "bg-amber-50",
          },
          {
            title: "Community Base",
            value: community?.city || "India",
            icon: MapPin,
            note: community?.state || "Nationwide reach",
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="p-5 rounded-2xl bg-white border border-[#bec9c3]/25 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6f7a74] uppercase tracking-wider">
                {stat.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-[#181d1a]">
                {stat.value}
              </span>
              <p className="text-xs text-[#6f7a74] mt-1">{stat.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Expeditions Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#181d1a] font-headline">
              Recent Expeditions
            </h2>
            <p className="text-xs text-[#6f7a74]">
              Your hosted trips and traveler registration counts
            </p>
          </div>

          <Link
            href="/community/dashboard/trips"
            className="text-xs font-bold text-[#0f6e56] hover:underline inline-flex items-center gap-1"
          >
            <span>View All Trips</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="h-44 rounded-2xl bg-neutral-100 animate-pulse flex items-center justify-center text-[#6f7a74] text-xs">
            Loading your expeditions...
          </div>
        ) : trips.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl bg-white border border-[#bec9c3]/30 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0f6e56]/10 text-[#0f6e56] flex items-center justify-center mx-auto">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#181d1a]">
                No expeditions hosted yet
              </h3>
              <p className="text-xs text-[#6f7a74] max-w-sm mx-auto mt-1">
                Start hosting your first trek, camp, or group road trip on Voymate to invite solo travelers.
              </p>
            </div>
            <Link
              href="/community/dashboard/trips/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f6e56] hover:bg-[#005440] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Host Your First Trip</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trips.slice(0, 3).map((trip) => (
              <div
                key={trip.id}
                className="rounded-2xl bg-white border border-[#bec9c3]/25 overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-sm transition-all"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                      {trip.category}
                    </span>
                    <span
                      className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        trip.pricingType === "FREE"
                          ? "bg-emerald-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {trip.pricingType === "FREE"
                        ? "FREE"
                        : `₹${trip.price?.toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-[#181d1a] line-clamp-1">
                      {trip.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#6f7a74]">
                      <MapPin className="w-3.5 h-3.5 text-[#0f6e56]" />
                      <span className="truncate">
                        {trip.destination.city}, {trip.destination.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#6f7a74]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{trip.durationText}</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-[#bec9c3]/15 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#181d1a]">
                      {trip.joinedCount || 0}
                    </span>
                    <span className="text-[#6f7a74]">
                      {" "}
                      / {trip.maxCapacity} joined
                    </span>
                  </div>

                  <Link
                    href={`/community/dashboard/bookings?tripId=${trip.id}`}
                    className="font-bold text-[#0f6e56] hover:underline"
                  >
                    View Roster
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
