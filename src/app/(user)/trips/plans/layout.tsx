import AddTripButton from "@/src/features/user/trips/components/AddTripButton";
import PlansTabs from "@/src/features/user/trips/components/PlansTabs";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="ml-0 lg:ml-64 min-h-screen pb-20 sm:pb-32 bg-[#f7faf6]">
      <div className="mx-auto w-full pt-16 sm:pt-24 px-3 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-4 mb-6 sm:mb-10">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#181d1a] tracking-tight font-headline">My trips</h1>
              <p className="text-xs sm:text-base text-[#3f4944] mt-1 font-medium">Manage your wanderlust adventures</p>
            </div>
            <div className="shrink-0">
              <AddTripButton />
            </div>
          </div>
          <PlansTabs />
        </div>
        {children}
      </div>
    </main>
  );
}
