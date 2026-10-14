"use client";
import React, { useRef } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";

interface AvatarCoverUploaderProps {
  coverPreview: string | null;
  photoPreview: string | null;
  onCoverChange: (file: File) => void;
  onPhotoChange: (file: File) => void;
}

export const AvatarCoverUploader: React.FC<AvatarCoverUploaderProps> = ({
  coverPreview,
  photoPreview,
  onCoverChange,
  onPhotoChange,
}) => {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCoverChange(file);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoChange(file);
    }
  };

  return (
    <div className="relative mb-24 sm:mb-28">
      {/* Cover Photo */}
      <div className="mb-6">
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverSelect}
        />

        <button
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="group relative w-full h-36 sm:h-48 rounded-2xl overflow-hidden border-2 border-dashed border-[#bec9c3] hover:border-[#0f6e56] transition-all"
        >
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#d8efe5] via-[#edf6f1] to-[#dfe8e3] flex flex-col items-center justify-center p-4">
              <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0f6e56]" />
              <span className="mt-2 text-xs sm:text-sm font-bold text-[#0f6e56]">
                Upload Cover Photo
              </span>
              <span className="text-[11px] sm:text-xs text-[#6f7a74] mt-0.5">
                Recommended: 1500 x 500
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-[#181d1a] transition-all">
              Change Cover
            </span>
          </div>
        </button>
      </div>

      {/* Profile Photo */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/3">
        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload profile photo"
            className="relative group w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-[#e5e9e5] flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-[#bec9c3] hover:border-[#0f6e56] transition-colors shadow-sm"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-[#6f7a74]" />
            )}
            <div className="absolute inset-0 rounded-full bg-[#005440]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[#005440] font-bold text-xs">EDIT</span>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoSelect}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[#0f6e56] font-bold text-xs sm:text-sm hover:underline"
          >
            Upload photo
          </button>
        </div>
      </div>
    </div>
  );
};
