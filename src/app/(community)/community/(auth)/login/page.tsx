import { Metadata } from "next";
import { CommunityLoginPage } from "@/src/features/community/pages/CommunityLoginPage";

export const metadata: Metadata = {
  title: "Organizer Login | Voymate Host Portal",
  description: "Log in to your Voymate community host dashboard to manage expeditions and members.",
};

export default function LoginPage() {
  return <CommunityLoginPage />;
}
