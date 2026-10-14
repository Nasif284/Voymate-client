"use client";

import React from "react";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";
import {
  useCommunityVerifyEmail,
  useCommunityResendOtp,
} from "../hooks/communityAuth.hooks";
import { CommunityOTPVerificationCard } from "../components/CommunityOTPVerificationCard";

export const CommunityVerifyEmailPage: React.FC = () => {
  const community = useCommunityAuthStore((state) => state.community);
  const pendingEmail = useCommunityAuthStore((state) => state.pendingEmail);
  const email = pendingEmail || community?.email || "";

  const verifyMutation = useCommunityVerifyEmail();
  const resendMutation = useCommunityResendOtp();

  const handleVerify = (code: string) => {
    verifyMutation.mutate({
      email,
      code,
    });
  };

  const handleResend = () => {
    resendMutation.mutate({
      email,
    });
  };

  return (
    <div className="w-full">
      <CommunityOTPVerificationCard
        email={email}
        isPending={verifyMutation.isPending}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </div>
  );
};

export default CommunityVerifyEmailPage;
