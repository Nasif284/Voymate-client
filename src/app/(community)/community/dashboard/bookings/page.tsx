import { Metadata } from "next";
import { Suspense } from "react";
import { CommunityBookingsPage } from "@/src/features/community/pages/organizer/CommunityBookingsPage";

export const metadata: Metadata = {
  title: "Attendee Rosters | Voymate Host Portal",
  description: "View registrations, contact details, and emergency info for your expedition voyagers.",
};

export default function BookingsRoute() {
  return (
    <Suspense
      fallback={
        <div className="h-64 flex items-center justify-center text-xs text-[#6f7a74]">
          Loading attendee rosters...
        </div>
      }
    >
      <CommunityBookingsPage />
    </Suspense>
  );
}
