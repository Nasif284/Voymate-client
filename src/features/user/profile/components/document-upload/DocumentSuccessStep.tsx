"use client";

import { Check } from "lucide-react";

interface DocumentSuccessStepProps {
  docLabel: string;
  onDone: () => void;
}

export default function DocumentSuccessStep({
  docLabel,
  onDone,
}: Readonly<DocumentSuccessStepProps>) {
  return (
    <div className="flex flex-col items-center text-center py-8 gap-5">
      <div className="w-20 h-20 bg-[#c9eadb] rounded-full flex items-center justify-center text-[#005440]">
        <Check className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-extrabold font-headline text-[#181d1a]">
          Documents Submitted
        </h3>
        <p className="text-[#3f4944] leading-relaxed max-w-xs">
          We have received your <span className="font-bold text-[#005440]">{docLabel}</span>. Our team will review it within <span className="font-bold">24–48 hours</span>.
        </p>
      </div>

      <div className="bg-[#e5f2ee] rounded-2xl p-5 w-full text-left space-y-3">
        {[
          { step: "1", label: "Document submitted", done: true, active: false },
          { step: "2", label: "Under review by our team", done: false, active: true },
          { step: "3", label: "Verification complete", done: false, active: false },
        ].map((item) => (
          <div key={item.step} className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                item.done
                  ? "bg-[#0f6e56] text-white"
                  : item.active
                  ? "bg-[#0f6e56]/20 text-[#0f6e56] ring-2 ring-[#0f6e56]/30"
                  : "bg-[#e0e3e0] text-[#6f7a74]"
              }`}
            >
              {item.done ? <Check className="w-3.5 h-3.5" /> : item.step}
            </div>
            <span
              className={`text-sm font-medium ${
                item.done || item.active
                  ? "text-[#005440] font-semibold"
                  : "text-[#6f7a74]"
              }`}
            >
              {item.label}
            </span>
            {item.active && (
              <span className="ml-auto flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-[#0f6e56]/60 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onDone}
        className="w-full h-12 bg-[#0f6e56] text-white font-bold rounded-xl hover:bg-[#005440] transition-colors cursor-pointer"
      >
        Done
      </button>
    </div>
  );
}
