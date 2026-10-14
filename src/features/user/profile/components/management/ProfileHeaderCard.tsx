"use client";
import React, { useRef } from "react";
import { Camera, Calendar, BadgeCheck } from "lucide-react";
import { UserProfile } from "../../interfaces/profile.interface";

interface ProfileHeaderCardProps {
  profile: UserProfile;
  onProfileChange: (updater: (prev: UserProfile) => UserProfile) => void;
  onAvatarSelect: (file: File) => void;
  onCoverSelect: (file: File) => void;
  hasChanges: boolean;
  saving: boolean;
  onSave: () => void;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  profile,
  onProfileChange,
  onAvatarSelect,
  onCoverSelect,
  hasChanges,
  saving,
  onSave,
}) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#bec9c3]/15 shadow-xs">
      {/* Cover photo */}
      <div className="relative h-[180px] sm:h-[280px] group">
        <img
          src={profile.coverUrl!}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 backdrop-blur-md text-[#005440] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 hover:bg-white shadow-md transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Change cover</span>
        </button>
        <input
          hidden
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            onCoverSelect(file);
          }}
        />
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8 relative">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
          {/* Avatar */}
          <div className="relative -mt-12 sm:-mt-16 group flex-shrink-0">
            <img
              src={profile.avatarUrl!}
              alt={profile.fullName}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-xl"
            />
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
            >
              <Camera className="w-6 h-6" />
            </button>
            <input
              hidden
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                onAvatarSelect(file);
              }}
            />
          </div>

          {/* Status + actions */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-6">
            <div className="flex items-center gap-3 bg-[#f1f4f1] px-3.5 py-2 rounded-xl">
              <div className="text-right">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#3f4944]/60">
                  Profile Status
                </p>
                <p className="text-xs font-bold text-[#005440]">
                  {profile.isTraveling ? "Currently traveling" : "Not traveling"}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.isTraveling}
                  onChange={(e) =>
                    onProfileChange((prev) => ({
                      ...prev,
                      isTraveling: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#e0e3e0] rounded-full peer peer-checked:bg-[#005440] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>

            <button
              type="button"
              disabled={!hasChanges || saving}
              onClick={onSave}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                hasChanges
                  ? "bg-[#005440] text-white hover:bg-[#003e2f] active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Name + handle */}
        <div className="mt-4 text-center sm:text-left">
          <div className="inline-flex items-center justify-center sm:justify-start gap-2 max-w-full">
            <input
              value={profile.fullName}
              onChange={(e) =>
                onProfileChange((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              style={{ width: `${Math.max((profile.fullName || "").length + 1, 4)}ch` }}
              className="text-2xl sm:text-3xl font-extrabold bg-transparent border-b-2 border-transparent focus:border-[#005440] outline-none text-center sm:text-left text-[#181d1a] transition-all"
            />
            <span className="text-[#005440] shrink-0">
              <BadgeCheck className="w-6 h-6" />
            </span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs sm:text-sm text-[#3f4944]/70 font-medium">
            <Calendar className="w-4 h-4" /> Member since{" "}
            {new Date(profile.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
