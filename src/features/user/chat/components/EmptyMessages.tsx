"use client";

import React from "react";
import { SquarePen } from "lucide-react";

export default function EmptyConversations() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#005440]/10 text-[#005440]">
        <SquarePen className="w-8 h-8" />
      </div>

      <h2 className="text-lg font-bold text-[#181d1a]">No conversations yet</h2>

      <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#707973]">
        Start a conversation with a traveler and connect, share plans, and chat about your next adventure.
      </p>

      <button
        type="button"
        className="mt-6 rounded-xl bg-[#005440] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:opacity-90 active:scale-95 cursor-pointer shadow-xs"
      >
        Start a conversation
      </button>
    </div>
  );
}
