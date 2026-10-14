"use client";

import { FileText, CreditCard, Car, Check, Info } from "lucide-react";
import { DocType } from "../../interfaces/profile.interface";

export const DOC_CONFIG: {
  id: DocType;
  label: string;
  description: string;
  icon: typeof FileText;
  hasTwoSides: boolean;
}[] = [
  {
    id: "PASSPORT",
    label: "Passport",
    description: "Photo page of your valid passport",
    icon: FileText,
    hasTwoSides: false,
  },
  {
    id: "NATIONAL_ID",
    label: "National ID",
    description: "Front and back of your national identity card",
    icon: CreditCard,
    hasTwoSides: true,
  },
  {
    id: "DRIVING_LICENSE",
    label: "Driver's License",
    description: "Front and back of your driving licence",
    icon: Car,
    hasTwoSides: true,
  },
];

interface DocumentTypeStepProps {
  docType: DocType | null;
  onSelect: (type: DocType) => void;
}

export default function DocumentTypeStep({
  docType,
  onSelect,
}: Readonly<DocumentTypeStepProps>) {
  return (
    <div className="space-y-3">
      {DOC_CONFIG.map((doc) => {
        const IconComponent = doc.icon;
        const isSelected = docType === doc.id;
        return (
          <button
            key={doc.id}
            type="button"
            onClick={() => onSelect(doc.id)}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${
              isSelected
                ? "border-[#0f6e56] bg-[#c9eadb]/20"
                : "border-[#bec9c3]/30 bg-white hover:border-[#0f6e56]/40"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isSelected
                  ? "bg-[#0f6e56] text-white"
                  : "bg-[#e0e3e0] text-[#3f4944]"
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#181d1a] text-sm">{doc.label}</p>
              <p className="text-xs text-[#3f4944] mt-0.5">{doc.description}</p>
              {doc.hasTwoSides && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f6e56] mt-1 block">
                  Requires front &amp; back
                </span>
              )}
            </div>

            <div
              className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                isSelected ? "bg-[#0f6e56] border-[#0f6e56]" : "border-[#bec9c3]"
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>
          </button>
        );
      })}

      {/* Verification Tips */}
      <div className="bg-[#e5f2ee] rounded-2xl p-4 mt-4 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-[#005440] flex items-center gap-1.5">
          <Info className="w-4 h-4 text-[#005440] shrink-0" />
          <span>Tips for a successful verification</span>
        </p>
        <ul className="text-xs text-[#3f4944] space-y-1.5 ml-1">
          {[
            "Ensure the document is valid and not expired",
            "All four corners of the document must be visible",
            "Take the photo in good lighting with no glare",
            "Make sure all text is sharp and legible",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#0f6e56] mt-0.5 shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
