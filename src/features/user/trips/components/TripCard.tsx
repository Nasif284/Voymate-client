import Link from "next/link";
import { Trip } from "../interfaces/interface";
import { useState } from "react";

const CalendarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);interface TripCardProps {
  trip: Trip;
  onEdit?: (trip: Trip) => void;
  onDelete?: (tripId: string) => void;
  isActive:boolean
}

export default function TripCard({ trip, onEdit, onDelete, isActive }: Readonly<TripCardProps>) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm border border-[#bec9c3]/20">
      <div className="relative h-32 sm:h-40 overflow-hidden bg-gray-100">
        <img
          src={trip.destination.coverUrl!}
          alt={trip.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isActive && (
          <div className="absolute top-2.5 right-2.5">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md shadow-sm flex items-center justify-center text-gray-700 hover:bg-white active:scale-95 transition-all text-base font-bold"
              aria-label="Trip actions"
            >
              ⋮
            </button>

            {openMenu && (
              <div
                className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-100"
              >
                <button
                  onClick={() => {
                    onEdit?.(trip);
                    setOpenMenu(false);
                  }}
                  className="w-full text-xs sm:text-sm px-3 py-2 text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Edit Trip
                </button>

                <button
                  onClick={() => {
                    onDelete?.(trip.id);
                    setOpenMenu(false);
                  }}
                  className="w-full text-xs sm:text-sm px-3 py-2 text-left font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete Trip
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold text-[#181d1a] leading-tight mb-1.5 font-headline line-clamp-1">{trip.name}</h3>
        <p className="text-xs sm:text-sm text-[#3f4944] flex items-center gap-1.5 font-medium">
          <CalendarIcon />
          <span>
            {new Date(trip.dateFrom).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
            })}{" "}
            -{" "}
            {new Date(trip.dateTo).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </p>
      </div>
    </div>
  );
}
