"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface VerificationDocumentViewerProps {
  documents: {
    front?: { imageUrl: string } | null;
    back?: { imageUrl: string } | null;
  };
}

export const VerificationDocumentViewer: React.FC<VerificationDocumentViewerProps> = ({
  documents,
}) => {
  const [activeImg, setActiveImg] = useState<string | null>(null);

  return (
    <>
      <section className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">
          Documents
        </h4>
        <div
          className={`grid gap-3 ${
            documents.front && documents.back ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {documents.front && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6f7a74]">
                Front
              </p>
              <div
                className="aspect-[3/2] rounded-xl overflow-hidden border border-[#bec9c3]/20 cursor-zoom-in"
                onClick={() => setActiveImg(documents.front!.imageUrl)}
              >
                <img
                  src={documents.front.imageUrl}
                  alt="Front Document"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
          {documents.back && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6f7a74]">
                Back
              </p>
              <div
                className="aspect-[3/2] rounded-xl overflow-hidden border border-[#bec9c3]/20 cursor-zoom-in"
                onClick={() => setActiveImg(documents.back!.imageUrl)}
              >
                <img
                  src={documents.back.imageUrl}
                  alt="Back Document"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
        </div>
        <p className="text-[10px] text-[#6f7a74] text-center">Click image to enlarge</p>
      </section>

      {/* Lightbox Modal */}
      {activeImg && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setActiveImg(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImg(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10"
            aria-label="Close enlarged preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImg}
            alt="Document enlarged"
            className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

export default VerificationDocumentViewer;
