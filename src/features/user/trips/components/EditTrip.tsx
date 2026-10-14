"use client";

import React from "react";
import { useUpdateTripPlan } from "../hooks/trip.hooks";
import { Trip } from "../interfaces/interface";
import { EditTripFormData } from "../../onboarding/validators/editTrip.validator";
import TripPlanForm from "./TripPlanForm";
import { ArrowRight } from "lucide-react";

export default function EditTrip({ onClose, trip }: Readonly<{ onClose: () => void; trip: Trip }>) {
  const updateTrip = useUpdateTripPlan();

  const onSubmit = (data: EditTripFormData) => {
    updateTrip.mutate({
      id: trip.id,
      data: {
        dateFrom: new Date(data.dateFrom),
        dateTo: new Date(data.dateTo),
        budgetStyleCode: data.budgetStyle,
        travelStyleCode: data.travelStyleCode,
      },
    });

    onClose();
  };

  return (
    <TripPlanForm
      showDestination={false}
      initialValues={{
        budgetStyle: trip.budgetStyleCode,
        travelStyleCode: trip.travelStyleCode,
        dateFrom: new Date(trip.dateFrom).toISOString().split("T")[0],
        dateTo: new Date(trip.dateTo).toISOString().split("T")[0],
      }}
      onSubmit={onSubmit}
      isPending={updateTrip.isPending}
      requireDirty={true}
      submitButtonText={
        <>
          Save Changes
          <ArrowRight className="w-4 h-4" />
        </>
      }
      submitPendingText="Updating trip..."
    />
  );
}
