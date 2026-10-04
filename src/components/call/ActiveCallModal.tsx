"use client";

import { useEffect, useRef, useState } from "react";
import { useCallStore } from "@/src/store/call.store";
import { useLeaveCall } from "@/src/features/user/call/hooks/hooks";
import { useAuthStore } from "@/src/store/auth.store";

export default function ActiveCallModal() {
  const currentUserId = useAuthStore((state) => state.user?.id);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const status = useCallStore((state) => state.status);
  const activeCall = useCallStore((state) => state.activeCall);
  const localStream = useCallStore((state) => state.localStream);
  const remoteStream = useCallStore((state) => state.remoteStream);

  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted(!isMuted);
  };

  const [isCameraOff, setIsCameraOff] = useState(false);
  const toggleCamera = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsCameraOff(!isCameraOff);
  };

  const leaveCall = useLeaveCall();

  const handleLeave = async () => {
    if (!activeCall) return;
    try {
      await leaveCall.mutateAsync(activeCall.callId);
      useCallStore.getState().clearCall();
    } catch (error) {
      console.error("[Call] Failed to leave:", error);
    }
  };

  useEffect(() => {
    if (!localVideoRef.current) return;
    localVideoRef.current.srcObject = localStream;
  }, [localStream]);

  useEffect(() => {
    if (!remoteVideoRef.current) return;
    remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  useEffect(() => {
    if (!remoteAudioRef.current) return;
    remoteAudioRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  if (!activeCall || (status !== "CONNECTING" && status !== "ACTIVE")) {
    return null;
  }

  const isVideo = activeCall.mediaType === "VIDEO";
  const isCaller = activeCall.callerId === currentUserId;
  const remoteName = isCaller ? activeCall.recipientName : activeCall.callerName;
  const remoteImage = isCaller ? activeCall.recipientProfileImage : activeCall.callerProfileImage;

  const hasRemoteVideo = remoteStream?.getVideoTracks().some((t) => t.readyState === "live" && t.enabled) ?? false;

  return (
    <div className="fixed inset-0 z-[1500] bg-[#0c100e] text-white flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#24302a] border border-white/20 flex items-center justify-center font-bold text-sm overflow-hidden shrink-0 shadow-lg">
            {remoteImage ? <img src={remoteImage} alt={remoteName ?? "User"} className="h-full w-full object-cover" /> : (remoteName?.charAt(0).toUpperCase() ?? "U")}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-white font-headline leading-tight truncate">{remoteName ?? "Unknown User"}</h2>
            <p className="text-[11px] text-white/60 font-medium">Direct {isVideo ? "Video" : "Voice"} Call</p>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-[#005440]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/15 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{status === "CONNECTING" ? "Connecting..." : "Connected"}</span>
        </div>
      </div>

      {/* Main Call Viewport */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center bg-gradient-to-b from-[#18231e] via-[#0d1310] to-[#070908]">
        {/* Remote Video Stream */}
        {isVideo && hasRemoteVideo ? (
          <video ref={remoteVideoRef} autoPlay playsInline className="h-full w-full object-cover" />
        ) : (
          /* Avatar View when Remote Video is Off or Audio Call */
          <div className="flex flex-col items-center justify-center text-center p-6 z-10">
            <div className="relative mb-6">
              <div className="absolute -inset-4 rounded-full bg-[#005440]/30 animate-pulse" />
              <div className="relative flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center overflow-hidden rounded-full bg-[#24302a] border-4 border-[#005440] text-4xl sm:text-5xl font-extrabold text-white shadow-2xl">
                {remoteImage ? <img src={remoteImage} alt={remoteName ?? "User"} className="h-full w-full object-cover" /> : (remoteName?.charAt(0).toUpperCase() ?? "U")}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-headline">{remoteName ?? "Unknown User"}</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-white/60 font-medium">
              {status === "CONNECTING" ? "Connecting voice stream..." : "Voice call active"}
            </p>
          </div>
        )}

        {/* Floating Local Picture-in-Picture Video */}
        {isVideo && localStream && (
          <div className="absolute top-20 right-4 sm:top-20 sm:right-6 w-28 sm:w-48 aspect-[3/4] sm:aspect-video rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden z-30 bg-black backdrop-blur-md transition-all hover:scale-105">
            <video ref={localVideoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
            <div className="absolute bottom-1.5 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white">
              You
            </div>
          </div>
        )}
      </div>

      {/* Hidden Audio Element for Voice Stream */}
      {activeCall.mediaType === "AUDIO" && <audio ref={remoteAudioRef} autoPlay />}

      {/* Floating Bottom Control Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-6 bg-black/75 backdrop-blur-2xl px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/15 shadow-2xl z-40">
        {/* Mute Button */}
        <button
          type="button"
          onClick={toggleMute}
          className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white transition-all active:scale-95 shadow-lg border border-white/10 ${
            isMuted ? "bg-[#ba1a1a] hover:bg-[#961313]" : "bg-white/15 hover:bg-white/25"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          )}
        </button>

        {/* Camera Toggle Button */}
        {isVideo && (
          <button
            type="button"
            onClick={toggleCamera}
            className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white transition-all active:scale-95 shadow-lg border border-white/10 ${
              isCameraOff ? "bg-[#ba1a1a] hover:bg-[#961313]" : "bg-white/15 hover:bg-white/25"
            }`}
            title={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
          >
            {isCameraOff ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M21 21l-4.35-4.35M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" fill="none" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            )}
          </button>
        )}

        {/* End Call Button */}
        <button
          type="button"
          onClick={handleLeave}
          disabled={leaveCall.isPending}
          className="flex h-13 w-13 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-2xl transition-transform active:scale-90 disabled:opacity-50"
          title="End Call"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="rotate-[135deg]">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.8 2.8a2 2 0 0 1-.4 2.1L8.2 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.4 1.8.7 2.8.8a2 2 0 0 1 1.8 1.9Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
