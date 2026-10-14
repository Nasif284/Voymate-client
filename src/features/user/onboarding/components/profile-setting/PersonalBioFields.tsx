"use client";
import React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { TagInput } from "../TagInput";
import LanguageSelect from "../LanguageSelect";
import { OnboardingProfileFormData } from "../../validators/profile.validator";

const GENDER_OPTIONS = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Non-binary", value: "NON_BINARY" },
] as const;

interface PersonalBioFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  gender?: "MALE" | "FEMALE" | "NON_BINARY";
  skills: string[];
  languages: string[];
}

export const PersonalBioFields: React.FC<PersonalBioFieldsProps> = ({
  register,
  errors,
  setValue,
  gender,
  skills,
  languages,
}) => {
  return (
    <>
      <div className="space-y-3">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">
          Gender
        </label>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {GENDER_OPTIONS.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => setValue("gender", g.value, { shouldValidate: true })}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer ${
                gender === g.value
                  ? "bg-[#0f6e56] text-white shadow-sm"
                  : "border border-[#bec9c3]/30 text-[#3f4944] hover:bg-[#e5e9e5]"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        {errors.gender?.message && (
          <p className="text-red-500 text-sm">{String(errors.gender.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">
          Travel Skills
        </label>
        <TagInput
          value={skills}
          placeholder="Add skill (e.g. Driving, Cooking)..."
          onChange={(value) => setValue("travelSkills", value, { shouldValidate: true })}
        />
        <p className="text-xs text-[#6f7a74]">Press Enter or comma to add a skill.</p>
        {errors.travelSkills?.message && (
          <p className="text-red-500 text-[12px]">{String(errors.travelSkills.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">
          Languages
        </label>
        <LanguageSelect
          value={languages}
          onChange={(value) => setValue("languages", value, { shouldValidate: true })}
          error={errors.languages?.message ? String(errors.languages.message) : undefined}
        />
      </div>
    </>
  );
};

export default PersonalBioFields;
