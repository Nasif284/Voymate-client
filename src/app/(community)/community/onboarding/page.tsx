import { Metadata } from "next";
import { CommunityOnboardingPage } from "@/src/features/community/pages/CommunityOnboardingPage";

export const metadata: Metadata = {
  title: "Community Profile Setup | Voymate Host Portal",
  description: "Complete your community profile, upload your logo and banner, and showcase your club on Voymate.",
};

export default function OnboardingPage() {
  return <CommunityOnboardingPage />;
}
