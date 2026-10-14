"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";
import Link from "next/link";
import { Mail, ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 48;

interface CommunityOTPVerificationCardProps {
  email: string;
  isPending: boolean;
  onVerify: (code: string) => void;
  onResend: () => void;
}

export const CommunityOTPVerificationCard: React.FC<
  CommunityOTPVerificationCardProps
> = ({ email, isPending, onVerify, onResend }) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const canResend = countdown <= 0;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      onVerify(otp.join(""));
    }
  };

  const handleResendClick = () => {
    if (!canResend) return;
    setCountdown(RESEND_SECONDS);
    onResend();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Icon & Heading */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[#0F6E56]/15 text-[#005440] flex items-center justify-center mx-auto mb-3">
          <Mail className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-[#181d1a] font-headline">
          Verify Community Email
        </h2>
        <p className="text-xs sm:text-sm text-[#3f4944] max-w-xs mx-auto leading-relaxed">
          We sent a 6-digit confirmation code to:
          <br />
          <span className="font-bold text-[#181d1a] mt-0.5 inline-block">
            {email || "your organizer email"}
          </span>
        </p>
      </div>

      {/* OTP Inputs Form */}
      <form onSubmit={handleVerifySubmit} className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-2.5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-11 h-13 sm:w-12 sm:h-14 rounded-xl border border-[#bec9c3]/50 bg-white text-center font-mono font-bold text-lg text-[#181d1a] focus:border-[#005440] focus:ring-2 focus:ring-[#005440]/20 outline-none transition-all shadow-xs"
            />
          ))}
        </div>

        {/* Resend Countdown */}
        <div className="text-center text-xs text-[#6f7a74]">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendClick}
              className="font-bold text-[#005440] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resend Verification Code</span>
            </button>
          ) : (
            <p>
              Resend code in{" "}
              <span className="font-mono font-bold text-[#181d1a]">
                00:{countdown < 10 ? `0${countdown}` : countdown}
              </span>
            </p>
          )}
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={!isComplete || isPending}
          className="w-full h-12 rounded-xl bg-[#005440] hover:bg-[#004736] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Verify &amp; Continue to Setup</span>
            </>
          )}
        </button>
      </form>

      {/* Back to login */}
      <div className="text-center pt-2">
        <Link
          href="/community/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6f7a74] hover:text-[#005440] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Use a different organizer email</span>
        </Link>
      </div>
    </div>
  );
};
