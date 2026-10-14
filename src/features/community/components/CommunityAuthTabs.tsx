"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const CommunityAuthTabs = () => {
  const pathName = usePathname();
  const isLogin = pathName === "/community/login";
  const isSignup = pathName === "/community/signup";

  return (
    <nav className="flex justify-center gap-8 mb-6 sm:mb-8" aria-label="Community auth tabs">
      <Link
        href="/community/login"
        className={`font-headline font-bold text-base sm:text-lg pb-2 border-b-2 transition-all min-h-[44px] flex items-center ${
          isLogin
            ? "border-[#0f6e56] text-[#0f6e56]"
            : "border-transparent text-[#3f4944] hover:text-[#005440]"
        }`}
        aria-current={isLogin ? "page" : undefined}
      >
        Organizer Log in
      </Link>
      <Link
        href="/community/signup"
        className={`font-headline font-bold text-base sm:text-lg pb-2 border-b-2 transition-all min-h-[44px] flex items-center ${
          isSignup
            ? "border-[#0f6e56] text-[#0f6e56]"
            : "border-transparent text-[#3f4944] hover:text-[#005440]"
        }`}
        aria-current={isSignup ? "page" : undefined}
      >
        Register Club
      </Link>
    </nav>
  );
};
