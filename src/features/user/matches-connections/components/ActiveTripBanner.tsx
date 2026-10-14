"use client";

import Badge from "./Badge";

interface ActiveTripData {
  id: string;
  name: string;
  dateFrom: Date | string;
  dateTo: Date | string;
  travelStyleCode: string;
  budgetStyleCode: string;
  destination: {
    name: string;
  };
}

interface ActiveTripBannerProps {
  trip: ActiveTripData;
  onChangeTrip: () => void;
}

export default function ActiveTripBanner({
  trip,
  onChangeTrip,
}: Readonly<ActiveTripBannerProps>) {
  return (
    <section className="bg-[#eef8f4] border border-[#c9eadb] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col gap-2.5 sm:gap-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0f6e56]">
            Active Trip
          </p>
          <h2 className="text-base sm:text-2xl font-black text-[#181d1a] mt-0.5">
            {trip.name}
          </h2>
        </div>

        <button
          onClick={onChangeTrip}
          className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl bg-white border border-[#d9dfdb] text-xs sm:text-sm font-bold text-[#0f6e56] hover:border-[#0f6e56] hover:bg-[#0f6e56] hover:text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
        >
          Change Trip
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        <Badge>{trip.destination.name}</Badge>
        <Badge>
          {new Date(trip.dateFrom).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}{" "}
          -{" "}
          {new Date(trip.dateTo).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Badge>
        <Badge>{trip.travelStyleCode}</Badge>
        <Badge>{trip.budgetStyleCode}</Badge>
      </div>
    </section>
  );
}
