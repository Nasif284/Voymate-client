import Link from "next/link";
import { useDisconnect } from "../hooks/connection.hooks";
import { Connection } from "../interfaces/profile-listing.interface";
import MessageButton from "../../chat/components/MessageButton";

interface ConnectionCardProps {
  connection: Connection;
  onDisconnect: (id: string) => void;
}

export default function ConnectionCard({ connection, onDisconnect }: ConnectionCardProps) {
  const disconnect = useDisconnect();

  function handleDisconnect() {
    disconnect.mutate(connection.id);
  }

  return (
    <article className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 flex flex-col justify-between gap-2.5 sm:gap-4 border border-[#bec9c3]/20 shadow-xs hover:shadow-sm transition-all duration-200">
      {/* Top Profile Info (Clicking navigates to Profile) */}
      <Link href={`/profile/${connection.userId}`} className="group flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center min-w-0">
        <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#a0f3d4] shrink-0 group-hover:scale-105 transition-transform">
          <img src={connection.avatarUrl} alt={connection.fullName} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-base font-bold text-[#181d1a] font-headline truncate group-hover:text-[#0f6e56] transition-colors">{connection.fullName}</h3>
          <div className="flex items-center gap-0.5 sm:gap-1 text-[#3f4944] text-[9px] sm:text-xs mt-0.5 truncate">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 sm:w-3.5 sm:h-3.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">
              {connection.state}, {connection.country}
            </span>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-[#bec9c3]/15 mt-auto">
        <MessageButton
          userId={connection.userId}
          className="flex-1 bg-[#0f6e56] text-white font-bold py-1 px-1.5 sm:px-3 rounded-md sm:rounded-xl hover:bg-[#005440] transition-all text-[10px] sm:text-xs flex items-center justify-center gap-1 h-7 sm:h-9 shadow-xs disabled:opacity-50 cursor-pointer"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 sm:w-3.5 sm:h-3.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Message</span>
        </MessageButton>

        <button 
          onClick={handleDisconnect} 
          className="text-[#6f7a74] hover:text-[#ba1a1a] py-1 px-1 rounded-md transition-colors text-[9px] sm:text-xs font-medium cursor-pointer shrink-0"
          title="Disconnect"
        >
          Disconnect
        </button>
      </div>
    </article>
  );
}


