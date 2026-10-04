"use client";

import { useGetMe } from "@/src/features/user/matches-connections/hooks/users.hooks";
import { useState, useRef,useMemo, useEffect } from "react";

import { UpdateProfileData, UserProfile } from "../interfaces/profile.interface";
import { useUpdateAvatar, useUpdateCover, useUpdateProfile } from "@/src/features/user/profile/hooks/profile.hooks";
import { capitalizeFirstLetter } from "@/src/utils/capitalizseFirstLetter";
import TagGroup from "../components/TagGroup";
import { CalendarIcon, CameraIcon, DescriptionIcon, EditIcon, ReviewsIcon, ShareIcon, StarEmpty, StarFull, TuneSmallIcon, VerifiedIcon, VerifiedUserIcon } from "@/src/assets/icons";

function Stars({ count }: { count: number }) {
  return <div className="flex text-[#005440]">{Array.from({ length: 5 }, (_, i) => (i < count ? <StarFull key={i} /> : <StarEmpty key={i} />))}</div>;
}
const personalityOptions = [
  {
    value: "introvert",
    label: "Introvert",
  },
  {
    value: "ambivert",
    label: "Ambivert",
  },
  {
    value: "extrovert",
    label: "Extrovert",
  },
];

export default function ProfileManagement() {
  const { data, isLoading } = useGetMe(true);
  const initialProfile = data?.data;
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    fullName: "",
    phone: "",
    isPhoneVerified:false,
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

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [editingBio, setEditingBio] = useState(false);

  const profileUpdate = useUpdateProfile();
  const avatarUpdate = useUpdateAvatar();
  const coverUpdate = useUpdateCover();

  const hasChanges = useMemo(() => {
    if (!profile || !initialProfile) return false;

    return JSON.stringify(profile) !== JSON.stringify(initialProfile) || avatarFile !== null || coverFile !== null;
  }, [profile, initialProfile, avatarFile, coverFile]);

  const hasProfileChanges = useMemo(() => {
    if (!profile || !initialProfile) return false;

    return JSON.stringify(profile) !== JSON.stringify(initialProfile);
  }, [profile, initialProfile]);
  const saving = profileUpdate.isPending || avatarUpdate.isPaused || coverUpdate.isPending
  const handleSave = async () => {
    const coverFormData = new FormData();
    const avatarFormData = new FormData();

    if (avatarFile) {
      avatarFormData.append("avatar", avatarFile);
      avatarUpdate.mutate(avatarFormData);
    }

    if (coverFile) {
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
        skills: profile.skills.map((e)=> capitalizeFirstLetter(e)),
      };

      profileUpdate.mutate(payload)
    }

    setAvatarFile(null);
    setCoverFile(null);
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
          <div className="bg-white rounded-2xl overflow-hidden border border-[#bec9c3]/15 shadow-xs">
            {/* Cover photo */}
            <div className="relative h-[180px] sm:h-[280px] group">
              <img src={profile.coverUrl!} alt="Cover" className="w-full h-full object-cover" />
              <button
                onClick={() => coverInputRef.current?.click()}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 backdrop-blur-md text-[#005440] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 hover:bg-white shadow-md transition-all cursor-pointer"
              >
                <CameraIcon />
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
                  setCoverFile(file);
                  setProfile((prev) => ({
                    ...prev,
                    coverUrl: URL.createObjectURL(file),
                  }));
                }}
              />
            </div>

            <div className="px-4 sm:px-8 pb-6 sm:pb-8 relative">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
                {/* Avatar */}
                <div className="relative -mt-12 sm:-mt-16 group flex-shrink-0">
                  <img src={profile.avatarUrl!} alt={profile.fullName} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-xl" />
                  <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer">
                    <CameraIcon />
                  </button>
                  <input
                    hidden
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setAvatarFile(file);
                      setProfile((prev) => ({
                        ...prev,
                        avatarUrl: URL.createObjectURL(file),
                      }));
                    }}
                  />
                </div>

                {/* Status + actions */}
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-6">
                  <div className="flex items-center gap-3 bg-[#f1f4f1] px-3.5 py-2 rounded-xl">
                    <div className="text-right">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#3f4944]/60">Profile Status</p>
                      <p className="text-xs font-bold text-[#005440]">{profile.isTraveling ? "Currently traveling" : "Not traveling"}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.isTraveling}
                        onChange={(e) =>
                          setProfile((prev) => ({
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
                    disabled={!hasChanges || saving}
                    onClick={handleSave}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                      hasChanges ? "bg-[#005440] text-white hover:bg-[#003e2f] active:scale-95" : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
                      setProfile((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    style={{ width: `${Math.max((profile.fullName || "").length + 1, 4)}ch` }}
                    className="text-2xl sm:text-3xl font-extrabold bg-transparent border-b-2 border-transparent focus:border-[#005440] outline-none text-center sm:text-left text-[#181d1a] transition-all"
                  />
                  <span className="text-[#005440] shrink-0">
                    <VerifiedIcon filled={true} />
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs sm:text-sm text-[#3f4944]/70 font-medium">
                  <CalendarIcon /> Member since{" "}
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

            </div>
          </div>


          {/* Stats */}
          {/* <div className="grid grid-cols-3 sm:grid-cols-3 items-center justify-center gap-5">
            {[
              { label: "Trips", value: "6" },
              { label: "Buddies", value: "9", star:false },
              { label: "Active Trips", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className={`bg-white p-5 rounded-2xl border border-[#bec9c3]/15 flex flex-col items-center text-center ${stat.star ? "border-b-4 border-b-[#005440]" : ""}`}>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-black text-[#005440]">{stat.value}</p>
                </div>
                <p className="text-[11px] text-[#3f4944]/70 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div> */}

          {/* Main Management Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left column: Bio */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Bio */}
              <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/15 shadow-xs">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 font-headline text-[#181d1a]">
                    <span className="text-[#005440]">
                      <DescriptionIcon />
                    </span>{" "}
                    About Me
                  </h3>
                  <button onClick={() => setEditingBio((v) => !v)} className="flex items-center gap-1.5 text-[#005440] font-bold text-xs sm:text-sm hover:underline cursor-pointer">
                    <EditIcon /> {editingBio ? "Done" : "Edit"}
                  </button>
                </div>
                <div className="bg-[#f1f4f1]/50 rounded-xl p-4 sm:p-6 border-2 border-dashed border-[#bec9c3]/30">
                  <textarea
                    value={profile.bio ?? ""}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    readOnly={!editingBio}
                    placeholder="Tell the world about your travel style, favorite destinations, and what makes you a great buddy..."
                    className={`w-full bg-transparent border-none focus:ring-0 outline-none leading-relaxed resize-none p-0 h-28 sm:h-32 text-xs sm:text-sm ${editingBio ? "text-[#181d1a]" : "text-[#3f4944] cursor-default"}`}
                  />
                </div>
              </div>
            </div>

            {/* Right column: Preferences */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#bec9c3]/15 shadow-xs">
                <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-6 sm:mb-8 font-headline text-[#181d1a]">
                  <span className="text-[#005440]">
                    <TuneSmallIcon />
                  </span>{" "}
                  Preferences
                </h3>

                <TagGroup
                  label="Languages"
                  tags={profile.languages}
                  onRemove={(tag: string) =>
                    setProfile((prev) => ({
                      ...prev,
                      languages: prev.languages.filter((item) => item !== tag),
                    }))
                  }
                  onAdd={(tag: string) =>
                    setProfile((prev) => ({
                      ...prev,
                      languages: [...prev.languages, tag],
                    }))
                  }
                />{" "}
                <TagGroup
                  label="Skills"
                  tags={profile.skills}
                  onRemove={(tag) =>
                    setProfile((prev) => ({
                      ...prev,
                      skills: prev.skills.filter((item) => item !== tag),
                    }))
                  }
                  onAdd={(tag) =>
                    setProfile((prev) => ({
                      ...prev,
                      skills: [...prev.skills, tag],
                    }))
                  }
                />{" "}
                <TagGroup
                  label="Interests"
                  tags={profile.interests}
                  onRemove={(tag) =>
                    setProfile((prev) => ({
                      ...prev,
                      interests: prev.interests.filter((item) => item !== tag),
                    }))
                  }
                  onAdd={(tag) =>
                    setProfile((prev) => ({
                      ...prev,
                      interests: [...prev.interests, tag],
                    }))
                  }
                />{" "}
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]/60 mb-4">Travel Personality</p>

                  <div className="grid grid-cols-3 gap-2">
                    {personalityOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setProfile((prev) => ({
                            ...prev,
                            travelPersonality: option.value,
                          }))
                        }
                        className={`
          py-3
          rounded-xl
          text-[12px]
          font-semibold
          text-[#3f4944]
          transition-all
          ${profile.travelPersonality === option.value ? "bg-[#c9eadb]" : "bg-[#f1f4f1] text-[#3f4944] hover:bg-[#e4ebe7]"}
        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust Card */}
              {/* <div className="bg-[#005440] p-8 rounded-3xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <VerifiedUserIcon />
                    </div>
                    <h4 className="font-black text-lg font-headline">Trust Level: Gold</h4>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">Your identity, phone, and email are fully verified. This badge helps you match with top-rated buddies.</p>
                  <button className="w-full py-2.5 rounded-xl bg-white text-[#005440] font-bold text-xs hover:bg-opacity-90 transition-all">Manage Verification</button>
                </div>
                <svg viewBox="0 0 24 24" className="absolute -bottom-10 -right-10 w-[200px] h-[200px] fill-current text-white/5 pointer-events-none rotate-12">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
