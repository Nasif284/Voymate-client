import Link from "next/link";
import React from "react";
import { useGetMe } from "../features/user/matches-connections/hooks/users.hooks";

const Avatar = () => {
  const { data, isLoading } = useGetMe();

  if (isLoading) {
    return <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#0f6e56]/20 animate-pulse shrink-0" />;
  }

  return (
    <Link href={"/profile"} className="shrink-0">
      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#0f6e56] flex items-center justify-center text-white font-bold text-xs sm:text-sm overflow-hidden border border-emerald-200 shadow-sm">
        {data?.data?.avatarUrl ? (
          <img className="w-full h-full object-cover" src={data?.data?.avatarUrl} alt={data?.data?.name || "User Avatar"} />
        ) : (
          <span>{data?.data?.name ? data.data.name.charAt(0).toUpperCase() : "U"}</span>
        )}
      </div>
    </Link>
  );
};

export default Avatar;

