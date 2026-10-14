"use client";
import React from "react";
import { SlidersHorizontal } from "lucide-react";
import TagGroup from "../TagGroup";
import { UserProfile } from "../../interfaces/profile.interface";

const personalityOptions = [
  { value: "introvert", label: "Introvert" },
  { value: "ambivert", label: "Ambivert" },
  { value: "extrovert", label: "Extrovert" },
];

interface ProfilePreferencesCardProps {
  profile: UserProfile;
  onProfileChange: (updater: (prev: UserProfile) => UserProfile) => void;
}

export const ProfilePreferencesCard: React.FC<ProfilePreferencesCardProps> = ({
  profile,
  onProfileChange,
}) => {
  return (
    <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/15 shadow-xs">
      <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-6 sm:mb-8 font-headline text-[#181d1a]">
        <span className="text-[#005440]">
          <SlidersHorizontal className="w-5 h-5" />
        </span>
        Preferences
      </h3>

      <TagGroup
        label="Languages"
        tags={profile.languages}
        onRemove={(tag: string) =>
          onProfileChange((prev) => ({
            ...prev,
            languages: prev.languages.filter((item) => item !== tag),
          }))
        }
        onAdd={(tag: string) =>
          onProfileChange((prev) => ({
            ...prev,
            languages: [...prev.languages, tag],
          }))
        }
      />

      <TagGroup
        label="Skills"
        tags={profile.skills}
        onRemove={(tag) =>
          onProfileChange((prev) => ({
            ...prev,
            skills: prev.skills.filter((item) => item !== tag),
          }))
        }
        onAdd={(tag) =>
          onProfileChange((prev) => ({
            ...prev,
            skills: [...prev.skills, tag],
          }))
        }
      />

      <TagGroup
        label="Interests"
        tags={profile.interests}
        onRemove={(tag) =>
          onProfileChange((prev) => ({
            ...prev,
            interests: prev.interests.filter((item) => item !== tag),
          }))
        }
        onAdd={(tag) =>
          onProfileChange((prev) => ({
            ...prev,
            interests: [...prev.interests, tag],
          }))
        }
      />

      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]/60 mb-4">
          Travel Personality
        </p>

        <div className="grid grid-cols-3 gap-2">
          {personalityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onProfileChange((prev) => ({
                  ...prev,
                  travelPersonality: option.value,
                }))
              }
              className={`py-3 rounded-xl text-[12px] font-semibold text-[#3f4944] transition-all cursor-pointer ${
                profile.travelPersonality === option.value
                  ? "bg-[#c9eadb] text-[#005440]"
                  : "bg-[#f1f4f1] text-[#3f4944] hover:bg-[#e4ebe7]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePreferencesCard;
