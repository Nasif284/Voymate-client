import { Metadata } from "next";
import { CommunityOrganizerDashboardPage } from "@/src/features/community/pages/organizer/CommunityOrganizerDashboardPage";

export const metadata: Metadata = {
  title: "Organizer Overview | Voymate Host Portal",
  description: "Manage your hosted community expeditions and registrations.",
};

export default function DashboardPage() {
  return <CommunityOrganizerDashboardPage />;
}
