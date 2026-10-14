"use client";

import { FileText } from "lucide-react";
import { UploadedFile } from "../../interfaces/profile.interface";

interface DocumentReviewStepProps {
  frontFile: UploadedFile | null;
  backFile: UploadedFile | null;
  hasTwoSides: boolean;
  docLabel: string;
}

export default function DocumentReviewStep({
  frontFile,
  backFile,
  hasTwoSides,
  docLabel,
}: Readonly<DocumentReviewStepProps>) {
  const totalSizeMB = (
    ((frontFile?.file.size ?? 0) + (backFile?.file.size ?? 0)) /
    1024 /
    1024
  ).toFixed(2);

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-4 ${
          hasTwoSides ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"
        }`}
      >
        {frontFile && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">
              Front
            </p>
            <div className="rounded-xl overflow-hidden aspect-[3/2] bg-[#e0e3e0]">
              {frontFile.file.type.startsWith("image/") ? (
                <img
                  src={frontFile.preview}
                  alt="Front preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#005440]">
                  <FileText className="w-8 h-8" />
                  <span className="text-xs font-semibold text-[#3f4944]">
                    {frontFile.file.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {backFile && hasTwoSides && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">
              Back
            </p>
            <div className="rounded-xl overflow-hidden aspect-[3/2] bg-[#e0e3e0]">
              {backFile.file.type.startsWith("image/") ? (
                <img
                  src={backFile.preview}
                  alt="Back preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#005440]">
                  <FileText className="w-8 h-8" />
                  <span className="text-xs font-semibold text-[#3f4944]">
                    {backFile.file.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Metadata summary */}
      <div className="bg-[#f1f4f1] rounded-2xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#3f4944] font-medium">Document type</span>
          <span className="font-bold text-[#181d1a]">{docLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#3f4944] font-medium">Files</span>
          <span className="font-bold text-[#181d1a]">
            {hasTwoSides ? "2 sides" : "1 file"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#3f4944] font-medium">Size</span>
          <span className="font-bold text-[#181d1a]">{totalSizeMB} MB</span>
        </div>
      </div>

      <p className="text-xs text-[#3f4944] text-center leading-relaxed">
        By submitting, you confirm these documents are genuine and belong to you. Verification typically takes 24–48 hours.
      </p>
    </div>
  );
}
