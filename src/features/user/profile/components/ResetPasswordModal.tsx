"use client";

import { useAuthStore } from "@/src/store/auth.store";
import { useState, useEffect } from "react";
import { useResetPassword } from "../hooks/profile.hooks";

const Icons = {
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  lock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
};

export default function ResetPasswordModal({ onClose }: { onClose: () => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const user = useAuthStore((state) => state.user);
  const reset = useResetPassword();

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passwordsMatch || !user) return;
    reset.mutate({ email: user.email!, password: newPassword });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-[#f7faf6] rounded-3xl overflow-hidden shadow-2xl border border-[#bec9c3]/30 animate-in zoom-in-95 duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#3f4944] hover:bg-[#e0e3e0] transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          {Icons.close}
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center gap-3 mb-6">
            <div className="w-14 h-14 bg-[#c9eadb] text-[#005440] rounded-2xl flex items-center justify-center">
              {Icons.lock}
            </div>
            <h2 className="text-2xl font-extrabold font-headline text-[#005440] tracking-tight">
              Reset Password
            </h2>
            <p className="text-xs sm:text-sm text-[#3f4944] max-w-xs">
              Choose a strong password to keep your account secure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3f4944] uppercase tracking-wider mb-1.5 ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl bg-[#e0e3e0] px-4 pr-11 text-sm font-medium text-[#181d1a] placeholder:text-[#6f7a74] focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] border border-transparent transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3f4944] hover:text-[#005440] transition-colors"
                >
                  {showNewPassword ? Icons.eyeOff : Icons.eye}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3f4944] uppercase tracking-wider mb-1.5 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl bg-[#e0e3e0] px-4 pr-11 text-sm font-medium text-[#181d1a] placeholder:text-[#6f7a74] focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] border border-transparent transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3f4944] hover:text-[#005440] transition-colors"
                >
                  {showConfirmPassword ? Icons.eyeOff : Icons.eye}
                </button>
              </div>
            </div>

            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-[#ba1a1a] font-medium ml-1">
                Passwords do not match.
              </p>
            )}

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#bec9c3]/50 text-xs sm:text-sm font-bold text-[#3f4944] hover:bg-[#e0e3e0] transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!newPassword || !passwordsMatch || reset.isPending}
                className="px-5 py-2.5 rounded-xl bg-[#005440] text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-[#003e2f] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {reset.isPending ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
