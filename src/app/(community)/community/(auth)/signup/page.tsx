import { Metadata } from "next";
import { CommunitySignUpPage } from "@/src/features/community/pages/CommunitySignUpPage";

export const metadata: Metadata = {
  title: "Register Club | Voymate Host Portal",
  description: "Register your travel club or adventure organization on Voymate.",
};

export default function SignUpPage() {
  return <CommunitySignUpPage />;
}
