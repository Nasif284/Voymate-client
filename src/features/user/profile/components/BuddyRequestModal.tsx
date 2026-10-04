
"use client";

import { useState, useEffect } from "react";
import { BuddyRequestModalProps } from "../interfaces/profile.interface";
import { X } from "lucide-react";

export function BuddyRequestModal({ isOpen, onClose, onSend, user }: BuddyRequestModalProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-[#f7faf6] rounded-3xl overflow-hidden shadow-2xl border border-[#bec9c3]/30 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 pb-4">
          <h2 className="text-2xl font-extrabold text-[#005440] font-headline tracking-tight">Send Mate Request</h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#e0e3e0] flex items-center justify-center hover:bg-[#d0d4d0] transition-colors text-[#3f4944] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Card */}
        <div className="px-6 sm:px-8">
          <div className="bg-[#e0e3e0]/60 rounded-2xl p-4 flex items-center gap-4 border border-[#bec9c3]/20">
            <img src={user.avatarUrl} alt={user.name} className="w-14 h-14 rounded-full object-cover shadow-xs border border-white" />

            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#404944] font-bold">Request To</p>

              <h3 className="text-xl font-bold text-[#005440]">{user.name}</h3>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="p-6 sm:p-8">
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#3f4944] ml-1">Personalized note</label>

          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Hi ${user.name.split(" ")[0]}! I came across your profile and would love to connect as a travel mate...`}
            className="w-full rounded-2xl bg-[#e0e3e0]/60 p-4 text-sm font-medium text-[#181d1a] placeholder:text-[#6f7a74] resize-none outline-none border border-transparent focus:border-[#005440] focus:bg-white focus:ring-2 focus:ring-[#005440]/20 transition-all"
          />
        </div>

        {/* Footer */}
        <div className="bg-[#ebefeb] px-6 sm:px-8 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#bec9c3]/50 text-xs sm:text-sm font-bold text-[#3f4944] hover:bg-[#e0e3e0] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSend(message);
              onClose();
            }}
            className="px-6 py-2.5 bg-[#005440] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:bg-[#003e2f] active:scale-95 transition-all cursor-pointer"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
