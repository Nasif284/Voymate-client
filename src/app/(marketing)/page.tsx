import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LandingNavbar from "@/src/features/marketing/components/LandingNavbar";
import HeroSection from "@/src/features/marketing/components/HeroSection";
import ValueMetricsBar from "@/src/features/marketing/components/ValueMetricsBar";
import BentoFeaturesSection from "@/src/features/marketing/components/BentoFeaturesSection";
import HowItWorksSection from "@/src/features/marketing/components/HowItWorksSection";
import CommunityTripsPreview from "@/src/features/marketing/components/CommunityTripsPreview";
import TrustSafetySection from "@/src/features/marketing/components/TrustSafetySection";
import FAQSection from "@/src/features/marketing/components/FAQSection";
import LandingFooter from "@/src/features/marketing/components/LandingFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voymate | Find Like-Minded Solo Travel Buddies & Community Trips",
  description:
    "Match with verified solo travel companions based on destination overlap, travel style, budget, and personality synergy. Join curated community expeditions across India.",
  keywords: [
    "travel buddy India",
    "find solo travel companion",
    "backpacking buddies",
    "community trips India",
    "solo travel companions",
    "travel partner finder",
    "women solo travel buddy",
  ],
  openGraph: {
    title: "Voymate | Find Solo Travel Buddies & Community Trips",
    description:
      "Match with verified travel buddies based on destination overlap, travel style, budget, and personality synergy.",
    url: "https://www.voymate.nasifhub.online",
    siteName: "Voymate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voymate | Find Solo Travel Buddies & Community Trips",
    description:
      "Match with verified travel buddies based on destination overlap, travel style, budget, and personality synergy.",
  },
  alternates: {
    canonical: "https://www.voymate.nasifhub.online",
  },
};

export default async function LandingPage() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // If user is already authenticated, fast-forward directly to their feed
  if (refreshToken) {
    redirect("/home");
  }

  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Voymate",
    url: "https://www.voymate.nasifhub.online",
    applicationCategory: "TravelApplication",
    description:
      "A social travel companion platform pairing solo travelers using multi-factor compatibility matching, proximity radar, and community trips.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#f7faf6] text-[#181d1a] flex flex-col selection:bg-[#a0f3d4] selection:text-[#005440]">
        <LandingNavbar />
        <main className="flex-1">
          <HeroSection />
          <ValueMetricsBar />
          <BentoFeaturesSection />
          <HowItWorksSection />
          <CommunityTripsPreview />
          <TrustSafetySection />
          <FAQSection />
        </main>
        <LandingFooter />
      </div>
    </>
  );
}
