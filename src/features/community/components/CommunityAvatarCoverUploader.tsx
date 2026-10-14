"use client";

import React, { useRef } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";

interface CommunityAvatarCoverUploaderProps {
  coverPreview: string | null;
  avatarPreview: string | null;
  onCoverChange: (file: File) => void;
  onAvatarChange: (file: File) => void;
}

export const CommunityAvatarCoverUploader: React.FC<
  CommunityAvatarCoverUploaderProps
> = ({ coverPreview, avatarPreview, onCoverChange, onAvatarChange }) => {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCoverChange(file);
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="relative mb-20 sm:mb-24">
      {/* Cover Banner */}
      <div className="mb-6">
        <input
          ref={coverInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleCoverSelect}
        />

        <button
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="group relative w-full h-36 sm:h-48 rounded-3xl overflow-hidden border-2 border-dashed border-[#bec9c3] hover:border-[#0f6e56] transition-all cursor-pointer"
        >
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Community cover preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#d8efe5] via-[#edf6f1] to-[#dfe8e3] flex flex-col items-center justify-center p-4">
              <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0f6e56]" />
              <span className="mt-2 text-xs sm:text-sm font-bold text-[#0f6e56]">
                Upload Club Cover Banner
              </span>
              <span className="text-[11px] sm:text-xs text-[#6f7a74] mt-0.5 font-medium">
                Recommended: 1500 x 500 (landscape photo of past trips)
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold text-[#181d1a] transition-all shadow-sm">
              Change Cover Banner
            </span>
          </div>
        </button>
      </div>

      {/* Community Avatar / Logo Emblem */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/3">
        <div className="flex flex-col items-center space-y-1.5">
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            aria-label="Upload community avatar"
            className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#e5e9e5] flex flex-col items-center justify-center overflow-hidden border-4 border-white hover:border-[#0f6e56] transition-all shadow-md cursor-pointer"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Community avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-2">
                <Camera className="w-7 h-7 text-[#6f7a74]" />
                <span className="text-[10px] font-bold text-[#6f7a74] mt-1">
                  Logo / Photo
                </span>
              </div>
            )}

            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-black text-[11px] uppercase tracking-wider">
                EDIT
              </span>
            </div>
          </button>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleAvatarSelect}
          />

          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="text-[#0f6e56] font-bold text-xs hover:underline cursor-pointer"
          >
            Upload club logo
          </button>
        </div>
      </div>
    </div>
  );
};
