"use client";
import Link from "next/link";
import { NotificationsIcon, TuneIcon } from "../assets/icons";
import { useGetMe } from "../features/user/matches-connections/hooks/users.hooks";
import { useSyncLocation } from "../hooks/syncLocation.hook";
import LocationBadge from "./LocationBadge";
import Avatar from "./Avatar";

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  useSyncLocation();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-14 sm:h-20 bg-white/80 backdrop-blur-xl z-40 px-3 sm:px-8 md:px-12 flex justify-between items-center border-b border-[#bec9c3]/15">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="lg:hidden p-1.5 sm:p-2 rounded-xl text-[#0F6E56] hover:bg-[#f1f4f1] transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        )}
        <LocationBadge />
      </div>

      <div className="flex items-center gap-2 sm:gap-6 shrink-0">
        <Link href={"/settings"}>
          <button
            aria-label="Settings"
            className="hover:bg-[#f1f4f1] rounded-full p-1.5 sm:p-2 transition-all active:scale-95 text-[#0F6E56] cursor-pointer min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
          >
            <TuneIcon />
          </button>
        </Link>

        <Avatar />
      </div>
    </header>
  );
}

