"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "@/src/features/user/auth/components/PasswordField";
import { useCommunityRegister } from "../hooks/communityAuth.hooks";
import {
  CommunityRegisterFormData,
  communityRegisterSchema,
} from "../validators/communityAuth.schema";

export const CommunitySignUpPage: React.FC = () => {
  const registerMutation = useCommunityRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityRegisterFormData>({
    resolver: zodResolver(communityRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = (data: CommunityRegisterFormData) => {
    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      city: data.city || undefined,
      state: data.state || undefined,
    });
  };

  return (
    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold mb-2 text-[#3f4944] ml-1"
        >
          Community / Club Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="organization"
          placeholder="e.g. Sahyadri Trekking Club, Roam Wanderers"
          {...register("name")}
          className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none focus:shadow-sm"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1 ml-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold mb-2 text-[#3f4944] ml-1"
        >
          Organizer Contact Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="contact@yourclub.com"
          {...register("email")}
          className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none focus:shadow-sm"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1 ml-1">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-semibold mb-2 text-[#3f4944] ml-1"
          >
            Base City <span className="text-xs text-[#6f7a74] font-normal">(Optional)</span>
          </label>
          <input
            id="city"
            type="text"
            placeholder="e.g. Pune, Manali"
            {...register("city")}
            className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none focus:shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-semibold mb-2 text-[#3f4944] ml-1"
          >
            State <span className="text-xs text-[#6f7a74] font-normal">(Optional)</span>
          </label>
          <input
            id="state"
            type="text"
            placeholder="e.g. Maharashtra"
            {...register("state")}
            className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none focus:shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <PasswordField<CommunityRegisterFormData>
          id="password"
          label="Password"
          placeholder="••••••••"
          register={register}
          error={errors.password?.message}
        />

        <PasswordField<CommunityRegisterFormData>
          id="confirmPassword"
          label="Confirm password"
          placeholder="••••••••"
          register={register}
          error={errors.confirmPassword?.message}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full h-12 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none cursor-pointer shadow-sm text-base sm:text-lg"
        >
          {registerMutation.isPending ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Create Community Account"
          )}
        </button>
      </div>
    </form>
  );
};

export default CommunitySignUpPage;
