"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "@/src/features/user/auth/components/PasswordField";
import { useCommunityLogin } from "../hooks/communityAuth.hooks";
import {
  CommunityLoginFormData,
  communityLoginSchema,
} from "../validators/communityAuth.schema";

export const CommunityLoginPage: React.FC = () => {
  const login = useCommunityLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityLoginFormData>({
    resolver: zodResolver(communityLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: CommunityLoginFormData) => {
    login.mutate(data);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold mb-2 text-[#3f4944] ml-1"
        >
          Organizer Email Address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="organizer@club.com"
          {...register("email")}
          className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74] text-sm sm:text-base transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none focus:shadow-sm"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1 ml-1">{errors.email.message}</p>
        )}
      </div>

      <PasswordField
        id="password"
        label="Password"
        placeholder="••••••••"
        register={register}
        error={errors.password?.message}
      />

      <div className="flex justify-between items-center text-xs pt-1">
        <span className="text-[#6f7a74]">Community Portal access</span>
        <Link
          href="/forgot-password"
          className="font-bold text-[#005440] hover:underline min-h-[36px] inline-flex items-center"
        >
          Forgot password?
        </Link>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={login.isPending}
          className="w-full h-12 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none cursor-pointer shadow-sm text-base"
        >
          {login.isPending ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Access Organizer Dashboard"
          )}
        </button>
      </div>
    </form>
  );
};

export default CommunityLoginPage;
