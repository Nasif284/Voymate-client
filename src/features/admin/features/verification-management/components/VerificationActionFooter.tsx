"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";

interface VerificationActionFooterProps {
  canManage: boolean;
  adminRole?: string;
  isActioning: boolean;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onRequestResubmit: (reason: string) => void;
}

export const VerificationActionFooter: React.FC<VerificationActionFooterProps> = ({
  canManage,
  adminRole,
  isActioning,
  onApprove,
  onReject,
  onRequestResubmit,
}) => {
  const [rejectNote, setRejectNote] = useState("");
  const [resubmitNote, setResubmitNote] = useState("");
  const [showReject, setShowReject] = useState(false);
  const [showResubmit, setShowResubmit] = useState(false);

  if (!canManage) {
    return (
      <div className="flex-shrink-0 border-t border-[#bec9c3]/15 p-4 bg-[#f6f3ef] text-center">
        <p className="text-xs font-semibold text-[#6f7a74]">
          Action buttons disabled &mdash; {adminRole || "Your role"} has read-only access to verification records.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 border-t border-[#bec9c3]/15 p-4 bg-white space-y-3">
      {showReject && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#3f4944]">
            Reject Reason (required)
          </label>
          <textarea
            rows={2}
            value={rejectNote}
            onChange={(e) => setRejectNote(e.target.value)}
            placeholder="Describe why this document is being rejected..."
            className="w-full px-3 py-2 bg-[#f6f3ef] rounded-lg border border-[#bec9c3]/30 text-xs resize-none outline-none focus:ring-2 focus:ring-[#005440]/20 text-[#1c1c1a]"
          />
        </div>
      )}

      {showResubmit && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#3f4944]">
            Resubmission Reason (required)
          </label>
          <textarea
            rows={2}
            value={resubmitNote}
            onChange={(e) => setResubmitNote(e.target.value)}
            placeholder="Describe why this document is being requested to resubmit..."
            className="w-full px-3 py-2 bg-[#f6f3ef] rounded-lg border border-[#bec9c3]/30 text-xs resize-none outline-none focus:ring-2 focus:ring-[#005440]/20 text-[#1c1c1a]"
          />
        </div>
      )}

      <div className="flex gap-2">
        {/* Resubmit button */}
        {showResubmit ? (
          <button
            type="button"
            onClick={() => {
              if (resubmitNote.trim()) {
                onRequestResubmit(resubmitNote);
                setShowResubmit(false);
              }
            }}
            disabled={isActioning || !resubmitNote.trim()}
            className="flex-1 h-10 bg-amber-100 text-amber-700 font-bold text-xs rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Confirm Resubmission
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowResubmit(true);
              setShowReject(false);
            }}
            disabled={isActioning}
            className="flex-1 h-10 bg-amber-100 text-amber-700 font-bold text-xs rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Request Resubmit
          </button>
        )}

        {/* Reject button */}
        {showReject ? (
          <button
            type="button"
            onClick={() => {
              if (rejectNote.trim()) {
                onReject(rejectNote);
                setShowReject(false);
              }
            }}
            disabled={isActioning || !rejectNote.trim()}
            className="flex-1 h-10 bg-[#ba1a1a] text-white font-bold text-xs rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Confirm Reject
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowReject(true);
              setShowResubmit(false);
            }}
            className="flex-1 h-10 border-2 border-[#ba1a1a]/30 text-[#ba1a1a] font-bold text-xs rounded-lg hover:bg-[#ffdad6]/30 transition-colors cursor-pointer"
          >
            Reject
          </button>
        )}

        {/* Approve button */}
        <button
          type="button"
          onClick={onApprove}
          disabled={isActioning}
          className="flex-1 h-10 bg-[#0f6e56] text-white font-bold text-xs rounded-lg hover:bg-[#005440] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {isActioning ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Check className="w-4 h-4" /> Approve
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VerificationActionFooter;
