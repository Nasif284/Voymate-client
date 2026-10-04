"use client";

import { useState } from "react";
import Link from "next/link";
import { arrowForward } from "@/src/assets/icons";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../../trips/components/CreateTrip";
import { Sparkles, MapPin, Luggage } from "lucide-react";

export default function DashboardStarterHub() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="py-6 sm:py-10">
        <header className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0f6e56]/10 text-[#0f6e56] mb-3">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Welcome to Voymate</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#181d1a] tracking-tight font-headline">
            Start Your Travel Journey
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-[#3f4944]">
            Connect with like-minded travelers, plan upcoming adventures, and explore the community.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Card 1: Nearby Travelers */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#bec9c3]/20 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eef8f4] flex items-center justify-center mb-4 text-[#0f6e56]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#181d1a] font-headline mb-2">
                Discover Travelers Near You
              </h3>
              <p className="text-xs sm:text-sm text-[#3f4944] leading-relaxed">
                Connect with local travelers and outdoor enthusiasts in your region for weekend getaways, gear swaps, and trip meetups.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/matches"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f6e56] text-white font-bold text-xs sm:text-sm hover:bg-[#005440] transition-all cursor-pointer shadow-xs"
              >
                <span>Explore Travelers</span>
                {arrowForward}
              </Link>
            </div>
          </div>

          {/* Card 2: Plan First Trip */}
          <div className="bg-gradient-to-br from-[#eef8f4] to-[#f4faf7] rounded-2xl sm:rounded-3xl border border-[#c9eadb] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#005440]/10 flex items-center justify-center mb-4 text-[#005440]">
                <Luggage className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#181d1a] font-headline mb-2">
                Plan Your First Adventure
              </h3>
              <p className="text-xs sm:text-sm text-[#3f4944] leading-relaxed">
                Tell us where and when you plan to travel. We will automatically activate matching radars and find companions heading your way.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005440] text-white font-bold text-xs sm:text-sm hover:bg-[#00382b] transition-all cursor-pointer shadow-xs"
              >
                <span>Create a Trip</span>
                {arrowForward}
              </button>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <ModalLayout isOpen={openModal} onClose={() => setOpenModal(false)} title="Create Trip">
          <CreateTrip onClose={() => setOpenModal(false)} />
        </ModalLayout>
      )}
    </>
  );
}
