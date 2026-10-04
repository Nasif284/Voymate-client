"use client";

import { useCancelCall } from "@/src/features/user/call/hooks/hooks";
import { useCallStore } from "@/src/store/call.store";
import { Video, Mic } from "lucide-react";

export default function OutgoingCallModal() {
  const status = useCallStore((state) => state.status);
  const activeCall = useCallStore((state) => state.activeCall);
  const clearCall = useCallStore((state) => state.clearCall);
  const setEnding = useCallStore((state) => state.setEnding);

  const cancelCallMutation = useCancelCall();

  if (status !== "OUTGOING" || !activeCall) {
    return null;
  }

  const handleCancel = async () => {
    try {
      setEnding();
      await cancelCallMutation.mutateAsync(activeCall.callId);
      clearCall();
    } catch {
      // Keep call state intact if cancellation failed
    }
  };

  const displayName = activeCall.recipientName ?? "Unknown User";
  const image = activeCall.recipientProfileImage ?? null;

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-sm rounded-3xl bg-[#181d1a] border border-white/10 p-6 sm:p-8 shadow-2xl text-white text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Status Header */}
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#005440]">
          Outgoing Call
        </p>
        <h2 className="mt-1.5 text-lg font-bold text-white/90">Waiting for answer...</h2>

        {/* Animated Avatar Circle */}
        <div className="my-6 sm:my-8 flex justify-center">
          <div className="relative">
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
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#181d1a] bg-[#005440]" />
          </div>
        </div>

        {/* Name and Media Info */}
        <h3 className="text-xl font-extrabold text-white truncate">{displayName}</h3>
        <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-white/60">
          {activeCall.mediaType === "VIDEO" ? (
            <>
              <Video className="w-3.5 h-3.5 text-white/80" />
              <span>Starting Video Call...</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 text-white/80" />
              <span>Starting Voice Call...</span>
            </>
          )}
        </div>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={handleCancel}
          disabled={cancelCallMutation.isPending}
          className="mt-8 w-full rounded-2xl bg-[#ba1a1a] hover:bg-[#961313] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cancelCallMutation.isPending ? "Cancelling..." : "End Call"}
        </button>
      </div>
    </div>
  );
}
