"use client";

import { useDeclineCall, useJoinCall } from "@/src/features/user/call/hooks/hooks";
import { Phone, Video } from "lucide-react";
import { useCallStore } from "@/src/store/call.store";

export default function IncomingCallModal() {
  const incomingCall = useCallStore((state) => state.incomingCall);
  const setConnecting = useCallStore((state) => state.setConnecting);
  const clearCall = useCallStore((state) => state.clearCall);

  const { mutateAsync: joinCall, isPending: isJoining } = useJoinCall();
  const { mutate: declineCall, isPending: isDeclining } = useDeclineCall();

  if (!incomingCall) {
    return null;
  }

  const image = incomingCall.callerProfileImage;
  const displayName = incomingCall.callerName;

  const handleAccept = async () => {
    try {
      await joinCall(incomingCall.callId);
      setConnecting();
    } catch (error) {
      console.error("[IncomingCallModal] Failed to join call:", error);
      clearCall();
    }
  };

  const handleDecline = () => {
    declineCall(incomingCall.callId, {
      onSuccess: () => {
        clearCall();
      },
    });
  };

  const isBusy = isJoining || isDeclining;

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-sm rounded-3xl bg-[#181d1a] border border-white/10 p-6 sm:p-8 shadow-2xl text-white text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center">
          {/* Avatar with pulse effect */}
          <div className="relative mb-5">
            <div className="absolute -inset-2 rounded-full bg-[#005440]/30 animate-ping opacity-75" />
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full bg-[#2d312f] border-2 border-[#005440]">
              {image ? (
                <img src={image} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white/80">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#005440] text-white border-2 border-[#181d1a]">
              {incomingCall.mediaType === "VIDEO" ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
            </span>
          </div>

          {/* Call type badge */}
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#005440]">
            Incoming {incomingCall.mediaType.toLowerCase()} Call
          </p>

          {/* Name & subtitle */}
          <h2 className="mt-1.5 text-2xl font-extrabold text-white truncate max-w-full">{displayName}</h2>
          <p className="mt-1 text-xs text-white/60">is calling you...</p>

          {/* Actions */}
          <div className="mt-8 flex w-full gap-3">
            <button
              type="button"
              disabled={isBusy}
              onClick={handleDecline}
              className="flex-1 rounded-2xl bg-[#ba1a1a] hover:bg-[#961313] px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {isDeclining ? "Declining..." : "Decline"}
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={handleAccept}
              className="flex-1 rounded-2xl bg-[#005440] hover:bg-[#004030] px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {isJoining ? "Joining..." : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
