import ConnectionCard from "./ConnectionsCard";
import AddBuddyCard from "./AddBuddyCard";
import { useGetConnections } from "../hooks/connection.hooks";
import { Connection } from "../interfaces/profile-listing.interface";

export default function ConnectionsListing() {
  const { data, isLoading } = useGetConnections();

  const connections = data?.data?.connections ?? [];
  function handleDisconnect(id: string) {}

  if (isLoading) {
    return (
      <div className="w-full space-y-4 py-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-white/60 animate-pulse rounded-xl border border-[#bec9c3]/15" />
        ))}
      </div>
    );
  }

  if (connections?.length > 0) {
    return (
      <div className="w-full py-2">
        <section className="mb-6">
          <div>
            <h2 className="text-lg sm:text-3xl font-bold text-[#181d1a] tracking-tight font-headline">My Connections</h2>
            <p className="text-xs sm:text-base text-[#3f4944] mt-1 max-w-xl leading-relaxed">
              Reconnect with fellow travelers you&apos;ve met along the way. Your trusted network for the next adventure.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2.5 sm:gap-6">
          {connections.map((connection: Connection) => (
            <ConnectionCard key={connection.id} connection={connection} onDisconnect={handleDisconnect} />
          ))}
          <AddBuddyCard />
        </section>
      </div>
    );
  } else {


    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-[#3f4944] text-center px-4">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-30">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22l-4-9-9-4 20-7z" />
        </svg>
        <p className="font-headline font-bold text-base sm:text-lg opacity-60">No connections yet</p>
        <p className="text-xs sm:text-sm opacity-40 mt-1">Your connections will be listed here.</p>
      </div>
    );
  }
}

