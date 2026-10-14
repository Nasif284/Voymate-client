"use client";
import React from "react";
import { Lock } from "lucide-react";

interface SecuritySettingsCardProps {
  onResetPasswordClick: () => void;
}

export const SecuritySettingsCard: React.FC<SecuritySettingsCardProps> = ({
  onResetPasswordClick,
}) => {
  return (
    <section className="bg-white p-6 rounded-2xl border border-[#bec9c3]/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="mb-6">
        <h2 className="text-lg font-bold font-headline text-[#181d1a]">Security</h2>
        <p className="text-xs text-[#3f4944] mt-1">
          Manage your account security and password.
        </p>
      </div>
      <div className="flex items-center justify-between py-4 border-t border-[#bec9c3]/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0f6e56]/10 flex items-center justify-center text-[#005440]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#181d1a]">Password</p>
            <p className="text-[10px] text-[#3f4944]">Last changed 3 months ago</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onResetPasswordClick}
          className="px-4 py-2 text-xs font-bold text-[#005440] border border-[#005440]/30 hover:bg-[#0f6e56]/5 rounded-lg transition-colors cursor-pointer"
        >
          Reset Password
        </button>
      </div>
    </section>
  );
};

export default SecuritySettingsCard;
