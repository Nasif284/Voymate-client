"use client";

import React, { useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface CommunityTripGalleryUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export const CommunityTripGalleryUploader: React.FC<
  CommunityTripGalleryUploaderProps
> = ({ files, onFilesChange, maxFiles = 10 }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    const combined = [...files, ...selected].slice(0, maxFiles);
    onFilesChange(combined);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-bold text-[#181d1a]">
            Expedition Gallery &amp; Photos
          </label>
          <p className="text-xs text-[#6f7a74] mt-0.5">
            Add up to {maxFiles} high-res pictures of trails, campsites, or landscapes. The first image will be your main cover banner.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#6f7a74]">
          {files.length} / {maxFiles} photos
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Grid of Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {files.map((file, idx) => {
          const previewUrl = URL.createObjectURL(file);
          return (
            <div
              key={`${file.name}-${idx}`}
              className="relative aspect-video rounded-xl overflow-hidden border border-[#bec9c3]/30 bg-neutral-100 group shadow-2xs"
            >
              <img
                src={previewUrl}
                alt={`Trip gallery preview ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#002f23]/90 text-white text-[10px] font-bold backdrop-blur-xs">
                  Cover Photo
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label={`Remove photo ${idx + 1}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}

        {/* Upload Button Card */}
        {files.length < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video rounded-xl border-2 border-dashed border-[#bec9c3] hover:border-[#0f6e56] hover:bg-[#0f6e56]/5 transition-all flex flex-col items-center justify-center p-3 text-center cursor-pointer group"
          >
            <Upload className="w-5 h-5 text-[#6f7a74] group-hover:text-[#0f6e56] transition-colors mb-1" />
            <span className="text-xs font-bold text-[#181d1a] group-hover:text-[#0f6e56]">
              Add Images
            </span>
            <span className="text-[10px] text-[#6f7a74] mt-0.5">
              JPG, PNG, WEBP (Max 5MB)
            </span>
          </button>
        )}
      </div>

      {files.length === 0 && (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/50 flex items-start gap-2.5 text-xs text-amber-900">
          <ImageIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            If no images are provided, Voymate will automatically assign a scenic destination landscape photo.
          </span>
        </div>
      )}
    </div>
  );
};
