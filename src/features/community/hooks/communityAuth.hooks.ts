"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { communityAuthService } from "../services/communityAuth.service";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";
import {
  RegisterCommunityInput,
  LoginCommunityInput,
  VerifyCommunityEmailInput,
  ResendCommunityOtpInput,
} from "../types/communityAuth.types";
import { CommunityProfile } from "../../user/community-trips/types";

function extractErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      fallback
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

function extractCommunity(
  data:
    | CommunityProfile
    | { community?: CommunityProfile }
    | unknown
): CommunityProfile | null {
  if (!data || typeof data !== "object") return null;
  if ("community" in data && (data as { community?: CommunityProfile }).community) {
    return (data as { community: CommunityProfile }).community;
  }
  if ("id" in data && "name" in data) {
    return data as CommunityProfile;
  }
  return null;
}

export function useCommunityLogin() {
  const router = useRouter();
  const setCommunity = useCommunityAuthStore((state) => state.setCommunity);
  const setPendingEmail = useCommunityAuthStore((state) => state.setPendingEmail);

  return useMutation({
    mutationFn: (data: LoginCommunityInput) => communityAuthService.login(data),
    onSuccess: (res) => {
      const community = extractCommunity(res.data);
      if (community) {
        setCommunity(community);
      }
      toast.success(res.message || "Logged in as community organizer!");

      if (community && !community.isOnboarded) {
        router.push("/community/onboarding");
      } else {
        router.push("/community/dashboard");
      }
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>, variables) => {
      const msg = extractErrorMessage(error, "Failed to login community");
      toast.error(msg);
      if (msg.toLowerCase().includes("verify your email") || msg.toLowerCase().includes("verification")) {
        setPendingEmail(variables.email);
        router.push("/community/verify");
      }
    },
  });
}

export function useCommunityRegister() {
  const router = useRouter();
  const setCommunity = useCommunityAuthStore((state) => state.setCommunity);
  const setPendingEmail = useCommunityAuthStore((state) => state.setPendingEmail);

  return useMutation({
    mutationFn: (data: RegisterCommunityInput) =>
      communityAuthService.register(data),
    onSuccess: (res, variables) => {
      const community = extractCommunity(res.data);
      if (community) {
        setCommunity(community);
      }
      setPendingEmail(variables.email);
      toast.success(
        res.message || "Community registered! Please verify your email with the OTP sent."
      );
      router.push("/community/verify");
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Failed to register community"));
    },
  });
}

export function useCommunityVerifyEmail() {
  const router = useRouter();
  const setCommunity = useCommunityAuthStore((state) => state.setCommunity);
  const existingCommunity = useCommunityAuthStore((state) => state.community);

  return useMutation({
    mutationFn: (data: VerifyCommunityEmailInput) =>
      communityAuthService.verifyEmail(data),
    onSuccess: (res) => {
      const community = extractCommunity(res.data);
      if (community) {
        setCommunity(community);
      } else if (existingCommunity) {
        setCommunity({ ...existingCommunity, isEmailVerified: true });
      }
      toast.success(res.message || "Email verified! Complete your community profile.");
      router.push("/community/onboarding");
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Verification failed"));
    },
  });
}

export function useCommunityResendOtp() {
  return useMutation({
    mutationFn: (data: ResendCommunityOtpInput) =>
      communityAuthService.resendOtp(data),
    onSuccess: (res) => {
      toast.success(res.message || "Verification OTP resent to your email!");
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Failed to resend OTP"));
    },
  });
}

export function useCommunityMe() {
  const setCommunity = useCommunityAuthStore((state) => state.setCommunity);

  return useQuery({
    queryKey: ["community-me"],
    queryFn: async () => {
      const res = await communityAuthService.getMe();
      if (res?.data) {
        setCommunity(res.data);
      }
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCommunityOnboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setCommunity = useCommunityAuthStore((state) => state.setCommunity);

  return useMutation({
    mutationFn: (formData: FormData) => communityAuthService.onboard(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["community-me"] });
      setCommunity(res.data);
      toast.success(res.message || "Community profile onboarded successfully!");
      router.push("/community/dashboard");
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Failed to complete onboarding"));
    },
  });
}

export function useCommunityLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useCommunityAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => communityAuthService.logout(),
    onSuccess: () => {
      queryClient.clear();
      logout();
      toast.success("Logged out successfully");
      router.replace("/community/login");
    },
    onError: () => {
      queryClient.clear();
      logout();
      router.replace("/community/login");
    },
  });
}
