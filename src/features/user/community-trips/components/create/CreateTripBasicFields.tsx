"use client";

import React from "react";
import { MapPin, Calendar, Users, DollarSign, Tag } from "lucide-react";

interface CreateTripBasicFieldsProps {
  title: string;
  setTitle: (v: string) => void;
  category: "CAMP" | "TREK_EXPEDITION" | "ROADTRIP" | "TRIP";
  setCategory: (v: "CAMP" | "TREK_EXPEDITION" | "ROADTRIP" | "TRIP") => void;
  destinationName: string;
  setDestinationName: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  state: string;
  setState: (v: string) => void;
  dateFrom: string;
  setDateFrom: (v: string) => void;
  dateTo: string;
  setDateTo: (v: string) => void;
  durationText: string;
  setDurationText: (v: string) => void;
  maxCapacity: number;
  setMaxCapacity: (v: number) => void;
  pricingType: "FREE" | "PAID";
  setPricingType: (v: "FREE" | "PAID") => void;
  price: number;
  setPrice: (v: number) => void;
}

export const CreateTripBasicFields: React.FC<CreateTripBasicFieldsProps> = ({
  title,
  setTitle,
  category,
  setCategory,
  destinationName,
  setDestinationName,
  city,
  setCity,
  state,
  setState,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  durationText,
  setDurationText,
  maxCapacity,
  setMaxCapacity,
  pricingType,
  setPricingType,
  price,
  setPrice,
}) => {
  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs font-bold text-[#3f4944] mb-1">
          Trip Title *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Munnar Cloud Camp & Astronomy Night"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none transition-all font-medium"
        />
      </div>

      {/* Category & Pricing Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>Category</span>
          </label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as "CAMP" | "TREK_EXPEDITION" | "ROADTRIP" | "TRIP"
              )
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none transition-all font-medium cursor-pointer"
          >
            <option value="CAMP">Camp & Nature Stay</option>
            <option value="TREK_EXPEDITION">Trek & Expedition</option>
            <option value="ROADTRIP">Road Trip & Trail</option>
            <option value="TRIP">General Community Trip</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>Pricing Type</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPricingType("FREE")}
              className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                pricingType === "FREE"
                  ? "bg-[#005440] text-white border-[#005440]"
                  : "bg-white text-[#3f4944] border-[#bec9c3]/40"
              }`}
            >
              Free Camp
            </button>
            <button
              type="button"
              onClick={() => setPricingType("PAID")}
              className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                pricingType === "PAID"
                  ? "bg-[#005440] text-white border-[#005440]"
                  : "bg-white text-[#3f4944] border-[#bec9c3]/40"
              }`}
            >
              Paid Trip
            </button>
          </div>
        </div>
      </div>

      {/* Price & Max Capacity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pricingType === "PAID" ? (
          <div>
            <label className="block text-xs font-bold text-[#3f4944] mb-1">
              Ticket Price (₹ INR) *
            </label>
            <input
              type="number"
              min={0}
              required
              placeholder="e.g. 2499"
              value={price || ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none transition-all font-medium"
            />
          </div>
        ) : (
          <div>
            <label className="block text-xs font-bold text-[#3f4944] mb-1">
              Admission Cost
            </label>
            <div className="px-3.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold">
              Free Community Camp (₹0)
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>Max Capacity (Slots) *</span>
          </label>
          <input
            type="number"
            min={1}
            max={200}
            required
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(Math.max(1, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs sm:text-sm text-[#181d1a] outline-none transition-all font-medium"
          />
        </div>
      </div>

      {/* Destination Name, City, State */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#3f4944] flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#0F6E56]" />
          <span>Destination Details *</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <input
            type="text"
            required
            placeholder="Spot Name (e.g. Kolukkumalai)"
            value={destinationName}
            onChange={(e) => setDestinationName(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
          />
          <input
            type="text"
            required
            placeholder="City (e.g. Munnar)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
          />
          <input
            type="text"
            required
            placeholder="State (e.g. Kerala)"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
          />
        </div>
      </div>

      {/* Dates & Duration Text */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>Date From *</span>
          </label>
          <input
            type="date"
            required
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>Date To *</span>
          </label>
          <input
            type="date"
            required
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#3f4944] mb-1">
            Duration Label *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 3 Days, 2 Nights"
            value={durationText}
            onChange={(e) => setDurationText(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
          />
        </div>
      </div>
    </div>
  );
};
