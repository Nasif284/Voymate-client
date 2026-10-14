"use client";
import React from "react";
import { Check, X, AlertTriangle } from "lucide-react";
import { VerificationAiCheckDTO } from "../interfaces/interfaces";

export default function AiCheckIcon({ status }: { status: VerificationAiCheckDTO["status"] }) {
  if (status === "PASSED") {
    return (
      <span className="w-6 h-6 rounded-full bg-[#c9eadb] text-[#005440] flex items-center justify-center flex-shrink-0">
        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (status === "FAILED") {
    return (
      <span className="w-6 h-6 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center flex-shrink-0">
        <X className="w-3.5 h-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
      <AlertTriangle className="w-3.5 h-3.5" />
    </span>
  );
}