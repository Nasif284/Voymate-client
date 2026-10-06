"use client"
import { TripStatus } from '../interfaces/interface';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetUserPastTrips, useGetUserUpcomingTrips } from '../hooks/trip.hooks';
const TABS: { key: TripStatus; label: string }[] = [
  { key: "active", label: "Active Plans" },
  { key: "past", label: "Past" },
];
const PlansTabs = () => {
    const pathName = usePathname();
    const activeTab = pathName.split("/")[3]

    const {data:pastTrips} = useGetUserPastTrips()
    const {data:activeTrips} = useGetUserUpcomingTrips()
    const counts: Record<TripStatus, number> = {
      active: activeTrips?.data?.trips?.length ?? 0,
      past: pastTrips?.data?.trips?.length ?? 0,
    };
  return (
    <div className="flex gap-4 sm:gap-8 border-b border-[#bec9c3]/20 pb-0.5 text-xs sm:text-base">
      {TABS.map((tab) => (
        <Link
          href={`/trips/plans/${tab.key}`}
          key={tab.key}
          className={`pb-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === tab.key
              ? "border-[#005440] text-[#005440] font-bold"
              : "border-transparent text-[#3f4944] hover:text-[#181d1a] font-medium"
          }`}
        >
          <span>{tab.label}</span>
          <span
            className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold ${
              activeTab === tab.key
                ? "bg-[#005440]/10 text-[#005440]"
                : "bg-black/5 text-[#3f4944]"
            }`}
          >
            {counts[tab.key] ?? 0}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default PlansTabs