"use client";

import React from "react";
import { Ticket, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { CommunityTripItem } from "../../types";

interface CommunityTripConfirmedViewProps {
  trip: CommunityTripItem;
  name: string;
  bookingCode: string;
  onClose: () => void;
}

export const CommunityTripConfirmedView: React.FC<CommunityTripConfirmedViewProps> = ({
  trip,
  name,
  bookingCode,
  onClose,
}) => {
  return (
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
          onClick={onClose}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#005440] hover:bg-[#004736] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Done &amp; View Pass Details</span>
        </button>

        <button
          onClick={() => {
            toast.success("Boarding pass sent to your WhatsApp and Email");
            onClose();
          }}
          className="w-full py-2.5 px-4 rounded-xl border border-[#bec9c3]/50 text-xs sm:text-sm font-bold text-[#3f4944] hover:bg-[#f7faf6] transition-all cursor-pointer"
        >
          Send Pass to WhatsApp
        </button>
      </div>
    </div>
  );
};
