"use client";

import { TripCardData } from "@/src/features/user/matches-connections/interfaces/profile-listing.interface";
import { Calendar, Compass } from "lucide-react";

interface PublicProfileUpcomingTripsProps {
  trips: TripCardData[];
}

export default function PublicProfileUpcomingTrips({
  trips,
}: Readonly<PublicProfileUpcomingTripsProps>) {
  if (!trips.length) return null;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#bec9c3]/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <h2 className="text-lg font-extrabold text-[#181d1a] mb-5 flex items-center justify-between font-headline">
        <span className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#005440]" />
          <span>Upcoming Travel Plans</span>
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trips.map((t) => (
          <div
            key={t.id}
            className="bg-[#f7faf6] rounded-2xl overflow-hidden border border-[#bec9c3]/20 group cursor-pointer hover:shadow-md transition-all"
          >
            <div className="h-32 w-full overflow-hidden relative">
              <img
                src={
                  t.destination?.coverUrl ||
                  "https://images.unsplash.com/photo-1488646953014-85cb44e25828"
                }
                alt={t.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-xs font-bold text-white drop-shadow-sm">
                {t.destination?.name || "Trip"}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-[#005440] text-sm group-hover:underline truncate">
                {t.name}
              </h3>
              <p className="text-xs text-[#404944] mt-1 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#005440] shrink-0" />
                <span>
                  {new Date(t.dateFrom).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                  {" - "}
                  {new Date(t.dateTo).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
