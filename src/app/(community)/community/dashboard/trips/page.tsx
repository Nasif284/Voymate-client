import { Metadata } from "next";
import { CommunityOrganizerTripsPage } from "@/src/features/community/pages/organizer/CommunityOrganizerTripsPage";

export const metadata: Metadata = {
  title: "My Hosted Expeditions | Voymate Host Portal",
  description: "View and manage all community expeditions you host.",
};

export default function TripsPage() {
  return <CommunityOrganizerTripsPage />;
}
