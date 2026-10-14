"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const CommunityAuthFooter = () => {
  const pathName = usePathname();
  const isLogin = pathName === "/community/login";

  return (
    <>
      <div className="mt-6 sm:mt-8 text-center space-y-3">
        <p className="text-[#3f4944] text-sm">
          {isLogin ? (
            <>
              Want to host trips with your club?{" "}
              <Link
                href="/community/signup"
                className="text-[#005440] font-bold hover:underline min-h-[44px] inline-flex items-center"
              >
                Register your community
              </Link>
            </>
          ) : (
            <>
              Already registered as an organizer?{" "}
              <Link
                href="/community/login"
                className="text-[#005440] font-bold hover:underline min-h-[44px] inline-flex items-center"
              >
                Log in to portal
              </Link>
            </>
          )}
        </p>

        <div>
          <Link
            href="/community-trips"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6f7a74] hover:text-[#005440] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Looking for trips as a traveler? Return to Voymate</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-[#6f7a74] text-xs leading-relaxed">
          By continuing, you agree to Voymate Community Host{" "}
          <Link href="/terms" className="underline hover:text-[#005440]">
            Terms &amp; Guidelines
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-[#005440]">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
};
