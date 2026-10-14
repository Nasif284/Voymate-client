import { Metadata } from "next";
import { CommunityCreateTripPage } from "@/src/features/community/pages/organizer/CommunityCreateTripPage";

export const metadata: Metadata = {
  title: "Host New Expedition | Voymate Host Portal",
  description: "Create and publish a new community trek, camp, or expedition.",
};

export default function CreateTripPage() {
  return <CommunityCreateTripPage />;
}
