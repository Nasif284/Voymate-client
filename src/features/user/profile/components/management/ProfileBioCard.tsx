"use client";
import React, { useState } from "react";
import { FileText, Pencil } from "lucide-react";

interface ProfileBioCardProps {
  bio: string;
  onBioChange: (bio: string) => void;
}

export const ProfileBioCard: React.FC<ProfileBioCardProps> = ({
  bio,
  onBioChange,
}) => {
  const [editingBio, setEditingBio] = useState(false);

  return (
    <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/15 shadow-xs">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 font-headline text-[#181d1a]">
          <span className="text-[#005440]">
            <FileText className="w-5 h-5" />
          </span>
          About Me
        </h3>
        <button
          type="button"
          onClick={() => setEditingBio((v) => !v)}
          className="flex items-center gap-1.5 text-[#005440] font-bold text-xs sm:text-sm hover:underline cursor-pointer"
        >
          <Pencil className="w-4 h-4" /> {editingBio ? "Done" : "Edit"}
        </button>
      </div>
      <div className="bg-[#f1f4f1]/50 rounded-xl p-4 sm:p-6 border-2 border-dashed border-[#bec9c3]/30">
        <textarea
          value={bio ?? ""}
          onChange={(e) => onBioChange(e.target.value)}
          readOnly={!editingBio}
          placeholder="Tell the world about your travel style, favorite destinations, and what makes you a great mate..."
          className={`w-full bg-transparent border-none focus:ring-0 outline-none leading-relaxed resize-none p-0 h-28 sm:h-32 text-xs sm:text-sm ${
            editingBio ? "text-[#181d1a]" : "text-[#3f4944] cursor-default"
          }`}
        />
      </div>
    </div>
  );
};

export default ProfileBioCard;
