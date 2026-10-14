import { CommunityProfile } from "../../user/community-trips/types";

export interface RegisterCommunityInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  state?: string;
}

export interface LoginCommunityInput {
  email: string;
  password: string;
}

export interface VerifyCommunityEmailInput {
  email: string;
  code: string;
}

export interface ResendCommunityOtpInput {
  email: string;
}

export interface CommunityAuthResponse {
  success: boolean;
  message?: string;
  data:
    | CommunityProfile
    | {
        community: CommunityProfile;
        accessToken?: string;
      };
}

export interface VerifyCommunityEmailResponse {
  success: boolean;
  message?: string;
  data:
    | CommunityProfile
    | {
        community?: CommunityProfile;
        isEmailVerified: boolean;
        email?: string;
      };
}
