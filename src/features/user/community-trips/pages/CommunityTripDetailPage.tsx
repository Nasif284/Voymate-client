"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  useCommunityTripDetail,
  useUserCommunityBookings,
} from "../hooks/communityTrip.hooks";
import CommunityTripHeroBanner from "../components/details/CommunityTripHeroBanner";
import CommunityTripJoinModal from "../components/CommunityTripJoinModal";
import CommunityTripHostCard from "../components/details/CommunityTripHostCard";
import CommunityTripOverviewTab from "../components/details/CommunityTripOverviewTab";
import CommunityTripItineraryTab from "../components/details/CommunityTripItineraryTab";
import CommunityTripInclusionsTab from "../components/details/CommunityTripInclusionsTab";
import CommunityTripMatesTab from "../components/details/CommunityTripMatesTab";
import CommunityTripBookingCard from "../components/details/CommunityTripBookingCard";
import {
  ArrowLeft,
  Share2,
  Loader2,
  CheckCircle,
  Ticket,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface CommunityTripDetailPageProps {
  slug: string;
}

type DetailTab = "OVERVIEW" | "ITINERARY" | "INCLUSIONS" | "MATES";

export default function CommunityTripDetailPage({
  slug,
}: Readonly<CommunityTripDetailPageProps>) {
  const { data: apiTrip, isLoading } = useCommunityTripDetail(slug);
  const { data: userBookings } = useUserCommunityBookings();

  const trip = apiTrip;

  const [activeTab, setActiveTab] = useState<DetailTab>("OVERVIEW");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [joinedCount, setJoinedCount] = useState(trip?.joinedCount ?? 0);

  useEffect(() => {
    if (trip) {
      setJoinedCount(trip.joinedCount);
    }
  }, [trip?.joinedCount]);

  const userBooking = useMemo(() => {
    if (!trip || !userBookings) return null;
    return (
      userBookings.find(
        (b) => b.tripId === trip.id || (trip.slug && b.trip?.slug === trip.slug)
      ) || null
    );
  }, [trip, userBookings]);

  const isUserJoined = Boolean(userBooking);

  if (isLoading && !trip) {
    return (
      <div className="py-28 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#005440] animate-spin" />
        <p className="text-xs font-bold text-[#3f4944] tracking-wider uppercase">
          Loading Community Trip...
        </p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#181d1a]">Trip Not Found</h2>
        <p className="text-[#3f4944]">
          The community trip you are looking for does not exist.
        </p>
        <Link
          href="/community-trips"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005440] text-white font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Community Trips</span>
        </Link>
      </div>
    );
  }

  const isFree = trip.pricingType === "FREE";
  const displayImage = activeImage || trip.coverImage;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Trip link copied to clipboard");
    }
  };

  const handleJoinSuccess = () => {
    setJoinedCount((prev) => Math.min(trip.maxCapacity, prev + 1));
  };

  const tabs: { id: DetailTab; label: string }[] = [
    { id: "OVERVIEW", label: "Overview & Vibe" },
    { id: "ITINERARY", label: "Day-by-Day Plan" },
    { id: "INCLUSIONS", label: "Inclusions & Rules" },
    { id: "MATES", label: `Confirmed Voyagers (${joinedCount})` },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          href="/community-trips"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F6E56] hover:text-[#005440] transition-colors py-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Community Trips</span>
        </Link>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#bec9c3]/30 text-xs font-bold text-[#3f4944] hover:bg-[#e0e3e0]/50 transition-all cursor-pointer shadow-2xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Confirmed Booking Banner if User has Joined */}
      {isUserJoined && userBooking && (
        <div className="bg-[#0F6E56]/10 border border-[#0F6E56]/30 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#005440] text-white flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-[#a0f3d4]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#005440] font-headline">
                You are confirmed for this adventure!
              </p>
              <p className="text-xs text-[#3f4944] mt-0.5">
                Pass Code:{" "}
                <span className="font-mono font-bold text-[#181d1a] bg-white px-2 py-0.5 rounded-md border border-[#bec9c3]/30">
                  {userBooking.bookingCode}
                </span>
                {" • "}
                Booked for {userBooking.contactName}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPassModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005440] text-white text-xs font-bold hover:bg-[#004736] transition-all cursor-pointer shadow-xs"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>View Boarding Pass</span>
          </button>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Hero Cover Card */}
          <CommunityTripHeroBanner
            trip={trip}
            displayImage={displayImage}
            activeImage={activeImage}
            onSelectImage={setActiveImage}
            isFree={isFree}
          />

          {/* Community Host Banner */}
          <CommunityTripHostCard community={trip.community} />

          {/* Content Tabs Navigation */}
          <div className="bg-white rounded-3xl border border-[#bec9c3]/20 shadow-xs overflow-hidden">
            <div className="flex border-b border-[#bec9c3]/20 bg-[#f7faf6] px-4 sm:px-6 pt-3 gap-2 sm:gap-6 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
                    activeTab === tab.id
                      ? "border-[#005440] text-[#005440]"
                      : "border-transparent text-[#3f4944] hover:text-[#181d1a]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-5 sm:p-7 space-y-6">
              {activeTab === "OVERVIEW" && (
                <CommunityTripOverviewTab trip={trip} isFree={isFree} />
              )}
              {activeTab === "ITINERARY" && (
                <CommunityTripItineraryTab itinerary={trip.itinerary} />
              )}
              {activeTab === "INCLUSIONS" && (
                <CommunityTripInclusionsTab
                  inclusions={trip.inclusions}
                  exclusions={trip.exclusions}
                  requirements={trip.requirements}
                />
              )}
              {activeTab === "MATES" && (
                <CommunityTripMatesTab
                  trip={trip}
                  joinedCount={joinedCount}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Booking Card) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CommunityTripBookingCard
              trip={trip}
              joinedCount={joinedCount}
              onOpenJoinModal={() => setOpenJoinModal(true)}
              isUserJoined={isUserJoined}
              bookingCode={userBooking?.bookingCode}
              onOpenPass={() => setShowPassModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Join & Checkout Modal */}
      {openJoinModal && (
        <CommunityTripJoinModal
          trip={trip}
          isOpen={openJoinModal}
          onClose={() => setOpenJoinModal(false)}
          onSuccessJoined={handleJoinSuccess}
        />
      )}

      {/* Digital Pass Modal */}
      {showPassModal && userBooking && (
        <div
          className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPassModal(false);
          }}
        >
          <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#bec9c3]/30 animate-in zoom-in-95 duration-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#005440] uppercase tracking-wider">
                Confirmed Digital Pass
              </span>
              <button
                onClick={() => setShowPassModal(false)}
                className="w-7 h-7 rounded-full bg-[#e0e3e0] flex items-center justify-center text-[#3f4944] hover:bg-[#d0d4d0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative bg-gradient-to-br from-[#005440] to-[#0F6E56] text-white rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="font-mono font-bold text-xs text-[#a0f3d4]">
                  {userBooking.bookingCode}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#a0f3d4] text-[#004736] font-bold text-[10px] uppercase">
                  CONFIRMED
                </span>
              </div>

              <div>
                <p className="text-[10px] uppercase text-emerald-200 font-semibold">
                  Trip Adventure
                </p>
                <h4 className="text-sm font-bold text-white line-clamp-2">
                  {trip.title}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <p className="text-[10px] text-emerald-200">Traveler Name</p>
                  <p className="font-bold text-white">{userBooking.contactName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-200">Host Club</p>
                  <p className="font-bold text-white truncate">
                    {trip.community?.name}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-200">Location</p>
                  <p className="font-medium text-white truncate">
                    {trip.destination.city}, {trip.destination.state}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-200">Fee Paid</p>
                  <p className="font-bold text-[#a0f3d4]">
                    {userBooking.amount === 0
                      ? "FREE"
                      : `₹${userBooking.amount.toLocaleString("en-IN")}`}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-white/25 flex items-center justify-between text-[10px] text-emerald-200">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a0f3d4]" />
                  <span>Voymate Verified</span>
                </span>
                <span className="font-mono">
                  Booked on{" "}
                  {new Date(userBooking.bookedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowPassModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#005440] text-white text-xs font-bold hover:bg-[#004736] transition-all cursor-pointer"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
