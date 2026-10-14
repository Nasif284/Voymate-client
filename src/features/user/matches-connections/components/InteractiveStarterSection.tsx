"use client";

import React, { useState } from "react";
import Link from "next/link";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../../trips/components/CreateTrip";
import { Luggage, MapPin, Sparkles, ArrowRight } from "lucide-react";

interface InteractiveStarterSectionProps {
  readonly activeSectionType?: "NEARBY" | "BUDDIES" | "TRIP_MATCHES";
}

export default function InteractiveStarterSection({
  activeSectionType = "NEARBY",
}: InteractiveStarterSectionProps) {
  const [openModal, setOpenModal] = useState(false);

  const config = {
    NEARBY: {
      badge: "Trip Radar",
      title: "Plan Your Next Getaway",
      description:
        "Ready to travel? Create your upcoming trip with your destination and travel dates. We'll automatically match you with companions heading your way.",
      buttonText: "Create a Trip Plan",
      action: () => setOpenModal(true),
      icon: Luggage,
    },
    TRIP_MATCHES: {
      badge: "Local Community",
      title: "Discover Travelers Near You",
      description:
        "Connect with active travelers and adventure enthusiasts in your city. Coordinate local meetups, gear sharing, and weekend road trips.",
      buttonText: "Find More Matches",
      href: "/matches",
      icon: MapPin,
    },
    BUDDIES: {
      badge: "Explore Beyond",
      title: "Find Companions for Your Next Trip",
      description:
        "Looking to travel somewhere new? Create your trip plan and meet like-minded explorers with compatible personalities and travel styles.",
      buttonText: "Plan a Trip",
      action: () => setOpenModal(true),
      icon: Sparkles,
    },
  }[activeSectionType];

  const IconComponent = config.icon;

  return (
    <>
      <section className="mb-10 sm:mb-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#eef8f4] via-[#f5faf7] to-[#e7f4ee] rounded-2xl sm:rounded-3xl border border-[#c9eadb] p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#0f6e56]/15 text-[#005440] mb-3">
              <IconComponent className="w-3.5 h-3.5 shrink-0" />
              <span>{config.badge}</span>
            </span>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#181d1a] tracking-tight font-headline">
              {config.title}
            </h3>

            <p className="mt-2 text-xs sm:text-sm md:text-base text-[#3f4944] leading-relaxed">
              {config.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {config.href ? (
                <Link
                  href={config.href}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#0f6e56] text-white font-bold text-xs sm:text-sm hover:bg-[#005440] transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  <span>{config.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={config.action}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#0f6e56] text-white font-bold text-xs sm:text-sm hover:bg-[#005440] transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  <span>{config.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {openModal && (
        <ModalLayout isOpen={openModal} onClose={() => setOpenModal(false)} title="Create Trip">
          <CreateTrip onClose={() => setOpenModal(false)} />
        </ModalLayout>
      )}
    </>
  );
}
