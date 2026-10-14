"use client";

import React, { useState, useRef } from "react";
import {
  ShieldCheck,
  Upload,
  FileText,
  Clock,
  AlertCircle,
  X,
  FileCheck2,
} from "lucide-react";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";
import { useSubmitCommunityVerification } from "../../hooks/communityOrganizer.hooks";

export const CommunityVerificationPage: React.FC = () => {
  const community = useCommunityAuthStore((state) => state.community);
  const status = community?.verificationStatus || "UNVERIFIED";

  const submitMutation = useSubmitCommunityVerification();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [docFile, setDocFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile) return;

    const formData = new FormData();
    formData.append("document", docFile);
    if (notes.trim()) {
      formData.append("notes", notes.trim());
    }

    submitMutation.mutate(formData);
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f6e56]/10 text-[#0f6e56] text-xs font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Trust &amp; Safety</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#181d1a] font-headline tracking-tight">
          Community Host Verification
        </h1>
        <p className="text-xs sm:text-sm text-[#6f7a74] mt-1 max-w-xl">
          Voymate verifies trek organizers and travel clubs to ensure voyager safety, prevent fraud, and build trust in the outdoor community.
        </p>
      </div>

      {/* Status Card */}
      {status === "VERIFIED" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-emerald-900 font-headline">
              You are a Verified Community Host!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800/90 mt-1 leading-relaxed">
              Your credentials have been authenticated. All your expeditions feature the Verified Host trust badge on the traveler marketplace.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold text-emerald-800">
            <span className="px-3 py-1 rounded-full bg-emerald-200/70">
              Paid Expeditions Enabled
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-200/70">
              Verified Host Badge
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-200/70">
              Priority Discoverability
            </span>
          </div>
        </div>
      )}

      {status === "PENDING" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-amber-900 font-headline">
              Verification Documents Under Review
            </h2>
            <p className="text-xs sm:text-sm text-amber-800/90 mt-1 leading-relaxed">
              We received your verification submission. Our safety team reviews documents within 24 to 48 hours. Once approved, your badge will automatically activate across the platform.
            </p>
          </div>
        </div>
      )}

      {(status === "UNVERIFIED" || status === "REJECTED") && (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-[#bec9c3]/30 shadow-2xs space-y-6"
        >
          {status === "REJECTED" && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>Previous verification was not approved:</strong> Please upload a clearer copy of your government ID, trek leader certification, or society/club registration certificate.
              </div>
            </div>
          )}

          <div>
            <h2 className="text-base font-bold text-[#181d1a]">
              Upload Verification Document
            </h2>
            <p className="text-xs text-[#6f7a74] mt-1">
              Accepted documents: Government Photo ID (Aadhaar/PAN/Passport), Trek Leader / BMC Certificate, or Club Registration Document (PDF, JPG, PNG up to 10MB).
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf, image/jpeg, image/png"
            className="hidden"
            onChange={handleFileChange}
          />

          {docFile ? (
            <div className="p-4 rounded-2xl bg-neutral-50 border border-[#bec9c3]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0f6e56] flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#181d1a]">{docFile.name}</p>
                  <p className="text-xs text-[#6f7a74]">
                    {(docFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDocFile(null)}
                className="p-1.5 rounded-lg text-[#6f7a74] hover:bg-neutral-200 transition-colors"
                aria-label="Remove document"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 border-2 border-dashed border-[#bec9c3] hover:border-[#0f6e56] rounded-2xl flex flex-col items-center justify-center gap-2 group transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0f6e56]/10 text-[#0f6e56] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-[#181d1a]">
                Choose document or certificate to upload
              </span>
              <span className="text-xs text-[#6f7a74]">
                PDF, JPG or PNG (Maximum 10MB)
              </span>
            </button>
          )}

          <div>
            <label
              htmlFor="notes"
              className="block text-xs font-semibold mb-1.5 text-[#3f4944] ml-1"
            >
              Additional Information or Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Registered with Indian Mountaineering Foundation (IMF), Club license number #12345..."
              className="w-full p-3 rounded-xl bg-[#e0e3e0] text-[#181d1a] placeholder:text-[#6f7a74]/60 text-xs transition-all focus:bg-white focus:ring-2 focus:ring-[#0f6e56] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!docFile || submitMutation.isPending}
            className="w-full h-12 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none text-sm"
          >
            {submitMutation.isPending ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Submit for Verification</span>
            )}
          </button>
        </form>
      )}

      {/* Guidelines Box */}
      <div className="p-5 rounded-2xl bg-neutral-50 border border-[#bec9c3]/20 space-y-2 text-xs text-[#6f7a74]">
        <h4 className="font-bold text-[#181d1a] flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-[#0f6e56]" />
          <span>Verification Requirements</span>
        </h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Documents must clearly show the organizer or entity name matching the community account.</li>
          <li>Ensure all text and stamps are crisp and legible.</li>
          <li>Verification details are stored encrypted and protected by Voymate security protocols.</li>
        </ul>
      </div>
    </div>
  );
};
