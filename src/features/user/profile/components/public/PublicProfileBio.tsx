"use client";

import { User } from "lucide-react";

interface PublicProfileBioProps {
  bio?: string | null;
  name: string;
}

export default function PublicProfileBio({
  bio,
  name,
}: Readonly<PublicProfileBioProps>) {
  if (!bio) return null;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#bec9c3]/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <h2 className="text-lg font-extrabold text-[#181d1a] mb-3 flex items-center gap-2 font-headline">
        <User className="w-5 h-5 text-[#005440]" />
        <span>About {name}</span>
      </h2>
      <p className="text-[#181d1a] leading-relaxed text-sm sm:text-base font-normal whitespace-pre-line">
        {bio}
      </p>
    </section>
  );
}
