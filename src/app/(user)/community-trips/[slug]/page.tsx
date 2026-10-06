import CommunityTripDetailPage from "@/src/features/user/community-trips/pages/CommunityTripDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = {
  title: "Community Trip Details | Voymate",
  description: "Explore the full itinerary, inclusions, community host, and confirmed voyagers.",
};

export default async function CommunityTripDetailRoute({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <main className="ml-0 lg:ml-64 min-h-screen pt-16 sm:pt-20 pb-20 px-3 sm:px-6 lg:px-12 bg-[#f7faf6]">
      <div className="mx-auto w-full pt-4 sm:pt-6">
        <CommunityTripDetailPage slug={resolvedParams.slug} />
      </div>
    </main>
  );
}
