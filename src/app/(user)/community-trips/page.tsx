import CommunityTripsPage from "@/src/features/user/community-trips/pages/CommunityTripsPage";

export const metadata = {
  title: "Community Trips | Voymate",
  description: "Join stranger camps, expeditions, and weekend trips organized by verified travel communities.",
};

export default function CommunityTripsRoute() {
  return (
    <main className="ml-0 lg:ml-64 min-h-screen pt-16 sm:pt-20 pb-20 px-3 sm:px-6 lg:px-12 bg-[#f7faf6]">
      <div className="mx-auto w-full pt-4 sm:pt-6">
        <CommunityTripsPage />
      </div>
    </main>
  );
}
