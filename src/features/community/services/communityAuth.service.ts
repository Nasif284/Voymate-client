import { communityApi as api } from "@/src/lib/community-api";
import { CommunityProfile } from "../../user/community-trips/types";
import {
  RegisterCommunityInput,
  LoginCommunityInput,
  VerifyCommunityEmailInput,
  ResendCommunityOtpInput,
  CommunityAuthResponse,
  VerifyCommunityEmailResponse,
} from "../types/communityAuth.types";

export const communityAuthService = {
  register: async (payload: RegisterCommunityInput): Promise<CommunityAuthResponse> => {
    const res = await api.post<CommunityAuthResponse>(
      "/community/auth/register",
      payload
    );
    return res.data;
  },

  login: async (payload: LoginCommunityInput): Promise<CommunityAuthResponse> => {
    const res = await api.post<CommunityAuthResponse>(
      "/community/auth/login",
      payload
    );
    return res.data;
  },

  verifyEmail: async (
    payload: VerifyCommunityEmailInput
  ): Promise<VerifyCommunityEmailResponse> => {
    const res = await api.post<VerifyCommunityEmailResponse>(
      "/community/auth/verify-email",
      payload
    );
    return res.data;
  },

  resendOtp: async (
    payload: ResendCommunityOtpInput
  ): Promise<{ success: boolean; message: string }> => {
    const res = await api.post<{ success: boolean; message: string }>(
      "/community/auth/resend-otp",
      payload
    );
    return res.data;
  },

  getMe: async (): Promise<{ success: boolean; data: CommunityProfile }> => {
    const res = await api.get<{ success: boolean; data: CommunityProfile }>(
      "/community/auth/me"
    );
    return res.data;
  },

  onboard: async (
    formData: FormData
  ): Promise<{ success: boolean; message?: string; data: CommunityProfile }> => {
    const res = await api.patch<{
      success: boolean;
      message?: string;
      data: CommunityProfile;
    }>("/community/auth/onboard", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  submitVerification: async (
    formData: FormData
  ): Promise<{ success: boolean; message?: string; data: CommunityProfile }> => {
    const res = await api.post<{
      success: boolean;
      message?: string;
      data: CommunityProfile;
    }>("/community/auth/verify", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  logout: async (): Promise<{ success: boolean; message?: string }> => {
    const res = await api.post<{ success: boolean; message?: string }>(
      "/community/auth/logout"
    );
    return res.data;
  },
};
