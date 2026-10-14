import { Metadata } from "next";
import { CommunityVerificationPage } from "@/src/features/community/pages/organizer/CommunityVerificationPage";

export const metadata: Metadata = {
  title: "Host Verification | Voymate Host Portal",
  description: "Verify your travel club or organizer credentials to gain trust and host paid expeditions.",
};

export default function VerificationPage() {
  return <CommunityVerificationPage />;
}
