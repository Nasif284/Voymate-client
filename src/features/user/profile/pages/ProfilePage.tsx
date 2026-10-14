"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useGetMe } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { UpdateProfileData, UserProfile } from "../interfaces/profile.interface";
import {
  useUpdateAvatar,
  useUpdateCover,
  useUpdateProfile,
} from "@/src/features/user/profile/hooks/profile.hooks";
import { capitalizeFirstLetter } from "@/src/utils/capitalizseFirstLetter";
import ProfileHeaderCard from "../components/management/ProfileHeaderCard";
import ProfileBioCard from "../components/management/ProfileBioCard";
import ProfilePreferencesCard from "../components/management/ProfilePreferencesCard";

export default function ProfileManagement() {
  const { data, isLoading } = useGetMe(true);
  const initialProfile = data?.data;

  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    fullName: "",
    phone: "",
    isPhoneVerified: false,
    bio: "",
    avatarUrl: "",
    coverUrl: "",
    age: 0,
    city: "",
    state: "",
    country: "",
    travelType: "",
    travelPersonality: "",
    isTraveling: false,
    interests: [],
    skills: [],
    languages: [],
    createdAt: new Date(),
  });

  useEffect(() => {
    if (data?.data) {
      setProfile(data.data);
    }
  }, [data]);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const profileUpdate = useUpdateProfile();
  const avatarUpdate = useUpdateAvatar();
  const coverUpdate = useUpdateCover();

  const hasChanges = useMemo(() => {
    if (!profile || !initialProfile) return false;
    return (
      JSON.stringify(profile) !== JSON.stringify(initialProfile) ||
      avatarFile !== null ||
      coverFile !== null
    );
  }, [profile, initialProfile, avatarFile, coverFile]);

  const hasProfileChanges = useMemo(() => {
    if (!profile || !initialProfile) return false;
    return JSON.stringify(profile) !== JSON.stringify(initialProfile);
  }, [profile, initialProfile]);

  const saving =
    profileUpdate.isPending || avatarUpdate.isPaused || coverUpdate.isPending;

  const handleSave = async () => {
    if (avatarFile) {
      const avatarFormData = new FormData();
      avatarFormData.append("avatar", avatarFile);
      avatarUpdate.mutate(avatarFormData);
    }

    if (coverFile) {
      const coverFormData = new FormData();
      coverFormData.append("cover", coverFile);
      coverUpdate.mutate(coverFormData);
    }

    if (hasProfileChanges) {
      const payload: UpdateProfileData = {
        fullName: profile.fullName,
        bio: profile.bio!,
        isTraveling: profile.isTraveling,
        travelPersonalityCode: profile.travelPersonality!,
        interests: profile.interests.map((e) => capitalizeFirstLetter(e)),
        languages: profile.languages.map((e) => capitalizeFirstLetter(e)),
        skills: profile.skills.map((e) => capitalizeFirstLetter(e)),
      };
      profileUpdate.mutate(payload);
    }

    setAvatarFile(null);
    setCoverFile(null);
  };

  const handleAvatarSelect = (file: File) => {
    setAvatarFile(file);
    setProfile((prev) => ({
      ...prev,
      avatarUrl: URL.createObjectURL(file),
    }));
  };

  const handleCoverSelect = (file: File) => {
    setCoverFile(file);
    setProfile((prev) => ({
      ...prev,
      coverUrl: URL.createObjectURL(file),
    }));
  };

  const handleBioChange = (bio: string) => {
    setProfile((prev) => ({ ...prev, bio }));
  };

  if (isLoading) {
    return (
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-screen items-center justify-center bg-[#f7faf6]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#005440]/20 border-t-[#005440]" />
          <p className="text-xs font-medium text-[#404944]">Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 pb-20 lg:pb-12 min-h-screen bg-[#f7faf6]">
      <div className="p-4 sm:p-8 flex justify-center">
        <div className="max-w-[1000px] w-full space-y-6 sm:space-y-8">
          <ProfileHeaderCard
            profile={profile}
            onProfileChange={setProfile}
            onAvatarSelect={handleAvatarSelect}
            onCoverSelect={handleCoverSelect}
            hasChanges={hasChanges}
            saving={saving}
            onSave={handleSave}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <ProfileBioCard bio={profile.bio ?? ""} onBioChange={handleBioChange} />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <ProfilePreferencesCard
                profile={profile}
                onProfileChange={setProfile}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
