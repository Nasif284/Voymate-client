"use client";

import { useState } from "react";

export default function Avatar({
  avatar,
  name,
  online = true,
  size = "md",
}: {
  avatar?: string | null;
  name: string;
  online?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [imgError, setImgError] = useState(false);

  const initial = name ? name.charAt(0).toUpperCase() : "?";

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-14 w-14 text-base",
  }[size];

  const dotClasses = {
    sm: "h-2.5 w-2.5 border-2",
    md: "h-3.5 w-3.5 border-2",
    lg: "h-4 w-4 border-2",
  }[size];

  return (
    <div className="relative shrink-0">
      {avatar && !imgError ? (
        <img
          src={avatar}
          alt={name}
          onError={() => setImgError(true)}
          className={`${sizeClasses} rounded-full object-cover shadow-xs border border-[#bec9c3]/20`}
        />
      ) : (
        <div
          className={`${sizeClasses} rounded-full bg-gradient-to-br from-[#005440] to-[#003e2f] text-white font-bold flex items-center justify-center shadow-xs`}
        >
          {initial}
        </div>
      )}

      {online && (
        <span
          className={`absolute bottom-0 right-0 ${dotClasses} rounded-full border-white bg-emerald-500 ring-1 ring-emerald-500/20 shadow-xs`}
          title="Online"
        />
      )}
    </div>
  );
}