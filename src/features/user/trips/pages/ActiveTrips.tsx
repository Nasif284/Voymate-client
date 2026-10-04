"use client";

import { useState } from "react";
import TripCard from "../components/TripCard";
import { useGetUserUpcomingTrips } from "../hooks/trip.hooks";
import { Trip } from "../interfaces/interface";
import ModalLayout from "@/src/components/Modal";
import CreateTrip from "../components/CreateTrip";
import EditTrip from "../components/EditTrip";
import ConfirmDeleteTripModal from "../components/ConfirmDeleteModal";

export default function ActiveTrips() {
  const [editItem, setEditItem] = useState<Trip | null>(null);
  const [deleteItem, setDeleteItem] = useState<string | null>(null);
  const { data, isLoading } = useGetUserUpcomingTrips();
  const activeTrips = data?.data?.trips;
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl h-52 animate-pulse border border-[#bec9c3]/20 p-3">
            <div className="bg-gray-200 h-28 rounded-xl mb-3" />
            <div className="bg-gray-200 h-4 w-3/4 rounded mb-2" />
            <div className="bg-gray-200 h-3 w-1/2 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return activeTrips?.length > 0 ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {activeTrips.map((trip: Trip) => (
          <TripCard key={trip.id} trip={trip} isActive={true} onDelete={(id: string) => setDeleteItem(id)} onEdit={(trip: Trip) => setEditItem(trip)} />
        ))}
      </div>
      {editItem && (
        <ModalLayout isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Trip">
          <EditTrip trip={editItem} onClose={() => setEditItem(null)} />
        </ModalLayout>
      )}
      {deleteItem && <ConfirmDeleteTripModal tripId={deleteItem} onClose={() => setDeleteItem(null)} />}
    </>
  ) : (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center bg-white rounded-2xl border border-[#bec9c3]/20 p-6">
      <p className="text-[#3f4944] font-semibold text-base sm:text-lg mb-1">No active trip plans</p>
      <p className="text-[#6f7a74] text-xs sm:text-sm">Trips you create will show up here.</p>
    </div>
  );
}
