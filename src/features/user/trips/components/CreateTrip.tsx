"use client";

import { useCreateTripPlan } from "../hooks/trip.hooks";
import { CreateTripFormData } from "../../onboarding/validators/tripPlan.validator";
import TripPlanForm from "./TripPlanForm";
import { arrowForward } from "@/src/assets/icons";

export default function CreateTrip({ onClose }: Readonly<{ onClose: () => void }>) {
  const tripPlan = useCreateTripPlan();

  const onSubmit = (data: CreateTripFormData) => {
    const payload = {
      name: `${data.destination.displayName.split(",")[0]} Trip`,
      placeId: data.destination.placeId,
      destinationName: data.destination.displayName,
      city: data.destination.city,
      state: data.destination.state,
      countryCode: data.destination.countryCode,
      latitude: data.destination.latitude,
      longitude: data.destination.longitude,
      dateFrom: new Date(data.dateFrom),
      dateTo: new Date(data.dateTo),
      travelStyleCode: data.travelStyleCode.toLowerCase(),
      budgetStyle: data.budgetStyle,
    };

    tripPlan.mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <TripPlanForm
      showDestination={true}
      onSubmit={onSubmit}
      isPending={tripPlan.isPending}
      submitButtonText={
        <>
          Create my plan &amp; find mates
          {arrowForward}
        </>
      }
      submitPendingText="Creating trip plan..."
    />
  );
}
