"use client";

import { useCreateOnboardingTripPlan } from "../hooks/onboarding.hooks";
import { CreateTripFormData } from "../validators/tripPlan.validator";
import TripPlanForm from "../../trips/components/TripPlanForm";
import { arrowForward } from "@/src/assets/icons";

export default function TravelPlanPage() {
  const tripPlan = useCreateOnboardingTripPlan();

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
      budgetStyle: data.budgetStyle as any,
    };

    tripPlan.mutate(payload);
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-start py-6 px-3 sm:px-6 md:py-16">
      <div className="max-w-[640px] w-full bg-white p-4 sm:p-8 md:p-12 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#181d1a] tracking-tight mb-2 sm:mb-3 font-headline">
            Where are you headed?
          </h1>
          <p className="text-[#3f4944] leading-relaxed text-sm sm:text-base">
            Your travel plan is shown to potential travel mates.
          </p>
        </div>

        <TripPlanForm
          showDestination={true}
          showNavigation={true}
          onSubmit={onSubmit}
          isPending={tripPlan.isPending}
          submitButtonText={
            <>
              Create my plan
              {arrowForward}
            </>
          }
        />
      </div>

      <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 text-center">
        <p className="text-[#3f4944] font-headline font-bold text-xs sm:text-sm tracking-widest uppercase">
          Step 4 of 4
        </p>
      </div>
    </main>
  );
}
