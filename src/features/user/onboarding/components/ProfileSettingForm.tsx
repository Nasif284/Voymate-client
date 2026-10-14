"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { State, Country } from "country-state-city";
import { AvatarCoverUploader } from "./profile-setting/AvatarCoverUploader";
import { LocationCascader } from "./profile-setting/LocationCascader";
import { PersonalBioFields } from "./profile-setting/PersonalBioFields";
import { OnboardingProfileFormData, OnboardingProfileSchema } from "../validators/profile.validator";
import { useEditOnboardingProfile, useSetProfile } from "../hooks/onboarding.hooks";
import { useProfileLocationCascade } from "../hooks/useProfileLocationCascade";
import { useUpdateAvatar, useUpdateCover } from "../../profile/hooks/profile.hooks";
import { capitalizeFirstLetter } from "@/src/utils/capitalizseFirstLetter";
import { useGetMe } from "../../matches-connections/hooks/users.hooks";
import { useAuthStore } from "@/src/store/auth.store";

const ProfileSettingForm = () => {
  const { onboarding } = useAuthStore((state) => state);
  const enabled = onboarding.step > 2;
  const { data, isLoading } = useGetMe(enabled);
  const me = data?.data;
  const edit = useEditOnboardingProfile();
  const setProfile = useSetProfile();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(OnboardingProfileSchema),
    defaultValues: {
      about: "",
      dateOfBirth: undefined,
      nationality: "",
      state: "",
      city: "",
      gender: undefined,
      travelSkills: [],
      languages: [],
    },
  });

  const gender = watch("gender");
  const skills = watch("travelSkills") ?? [];
  const languages = watch("languages") ?? [];
  const nationality = watch("nationality");
  const state = watch("state");
  const city = watch("city");
  const today = new Date().toISOString().split("T")[0];

  const {
    isAutoFilling,
    regions,
    cities,
    setStateCode,
    handleAutoLocation,
    handleNationalityChange,
    handleStateChange,
    handleCityChange,
  } = useProfileLocationCascade({
    nationality,
    state,
    setValue,
  });

  useEffect(() => {
    if (!me) return;
    reset({
      about: me.bio ?? "",
      dateOfBirth: me.dob ? new Date(me.dob).toISOString().split("T")[0] : "",
      nationality: me.country ?? "",
      state: me.state ?? "",
      city: me.city ?? "",
      gender: me.gender
        ? (me.gender.toUpperCase() as "MALE" | "FEMALE" | "NON_BINARY")
        : undefined,
      travelSkills: me.skills?.map((s: string) => s.toLowerCase()) ?? [],
      languages: me.languages?.map((s: string) => s.toLowerCase()) ?? [],
    });
    setPhotoPreview(me.avatarUrl ?? null);
    setCoverPreview(me.coverUrl ?? null);

    const country = Country.getAllCountries().find((c) => c.name === me.country);
    if (!country) return;
    setValue("nationality", country.isoCode);

    const foundState = State.getStatesOfCountry(country.isoCode).find(
      (s) => s.name === me.state
    );
    if (foundState) {
      setStateCode(foundState.isoCode);
    }
  }, [me, reset, setValue, setStateCode]);

  const avatarUpdate = useUpdateAvatar();
  const coverUpdate = useUpdateCover();

  const initialProfile = useMemo(
    () =>
      me
        ? {
            about: me.bio ?? "",
            dateOfBirth: me.dob ?? "",
            nationality: me.country ?? "",
            state: me.state ?? "",
            city: me.city ?? "",
            gender: me.gender ? me.gender.toUpperCase() : "",
            travelSkills: me.skills ?? [],
            languages: me.languages ?? [],
          }
        : null,
    [me]
  );

  const profile = watch();
  const hasChanges = useMemo(() => {
    if (!profile || !initialProfile) return false;
    return JSON.stringify(profile) !== JSON.stringify(initialProfile);
  }, [profile, initialProfile]);

  const onSubmit = (formDataValues: OnboardingProfileFormData) => {
    if (me?.onboardingStep === 3) {
      if (formDataValues.image) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", formDataValues.image);
        avatarUpdate.mutate(avatarFormData);
      }

      if (formDataValues.coverImage) {
        const coverFormData = new FormData();
        coverFormData.append("cover", formDataValues.coverImage);
        coverUpdate.mutate(coverFormData);
      }

      if (hasChanges) {
        const payload = {
          about: formDataValues.about!,
          languages: formDataValues.languages.map((e) => capitalizeFirstLetter(e)),
          travelSkills: formDataValues.travelSkills.map((e) => capitalizeFirstLetter(e)),
          gender: formDataValues.gender,
          nationality: formDataValues.nationality,
          state: formDataValues.state,
          city: formDataValues.city,
          dateOfBirth: formDataValues.dateOfBirth,
        };
        edit.mutate(payload);
      }
    } else {
      const formData = new FormData();
      formData.append("about", formDataValues.about);
      formData.append("dateOfBirth", formDataValues.dateOfBirth.toISOString());
      formData.append("nationality", formDataValues.nationality);
      formData.append("state", formDataValues.state);
      formData.append("city", formDataValues.city);
      formData.append("gender", formDataValues.gender);
      formData.append("travelSkills", JSON.stringify(formDataValues.travelSkills));
      formData.append("languages", JSON.stringify(formDataValues.languages));

      if (formDataValues.image) {
        formData.append("image", formDataValues.image);
      }
      if (formDataValues.coverImage) {
        formData.append("coverImage", formDataValues.coverImage);
      }
      setProfile.mutate(formData);
    }
  };

  const handleCoverChange = (file: File) => {
    setValue("coverImage", file, { shouldValidate: true });
    setCoverPreview(URL.createObjectURL(file));
  };

  const handlePhotoChange = (file: File) => {
    setValue("image", file, { shouldValidate: true });
    setPhotoPreview(URL.createObjectURL(file));
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit(onSubmit as any)}>
      <AvatarCoverUploader
        coverPreview={coverPreview}
        photoPreview={photoPreview}
        onCoverChange={handleCoverChange}
        onPhotoChange={handlePhotoChange}
      />

      <div className="space-y-3">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">
          About you
        </label>
        <textarea
          rows={4}
          placeholder="I'm a budget backpacker..."
          {...register("about")}
          className="w-full bg-[#e0e3e0] border-none rounded-xl p-4 text-[#181d1a] placeholder:text-[#6f7a74]/60 focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all text-base outline-none resize-none"
        />
        {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">
            Date of Birth
          </label>
          <input
            max={today}
            type="date"
            {...register("dateOfBirth")}
            className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <LocationCascader
          nationality={nationality || ""}
          state={state || ""}
          city={city || ""}
          regions={regions}
          cities={cities}
          isAutoFilling={isAutoFilling}
          onNationalityChange={handleNationalityChange}
          onStateChange={handleStateChange}
          onCityChange={handleCityChange}
          onAutoLocation={handleAutoLocation}
          errors={{
            nationality: errors.nationality?.message,
            state: errors.state?.message,
            city: errors.city?.message,
          }}
        />
      </div>

      <PersonalBioFields
        register={register}
        errors={errors}
        setValue={setValue}
        gender={gender}
        skills={skills}
        languages={languages}
      />

      <div className="flex items-center justify-end pt-6 sm:pt-8 border-t border-[#bec9c3]/10">
        <button
          type="submit"
          disabled={setProfile.isPending}
          className={`w-full sm:w-44 h-12 ${
            setProfile.isPending
              ? "bg-[#0f6e56]/70 cursor-not-allowed"
              : "bg-[#0f6e56] hover:bg-[#005440]"
          } text-white font-bold rounded-xl active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-base`}
        >
          {setProfile.isPending ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileSettingForm;
