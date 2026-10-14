"use client";
import React from "react";

interface DangerZoneCardProps {
  onDeactivate: () => void;
  onDelete: () => void;
}

export const DangerZoneCard: React.FC<DangerZoneCardProps> = ({
  onDeactivate,
  onDelete,
}) => {
  return (
    <section className="bg-red-50/50 p-6 rounded-2xl border border-[#ba1a1a]/10">
      <h2 className="text-lg font-bold text-[#ba1a1a] mb-2 font-headline">Danger Zone</h2>
      <p className="text-xs text-stone-500 mb-6">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onDeactivate}
          className="px-6 py-3 rounded-xl text-sm font-bold text-[#ba1a1a] bg-transparent hover:bg-[#ba1a1a]/5 transition-all cursor-pointer"
        >
          Deactivate account
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#ba1a1a] hover:bg-red-700 transition-all shadow-lg shadow-[#ba1a1a]/20 cursor-pointer"
        >
          Delete account permanently
        </button>
      </div>
    </section>
  );
};

export default DangerZoneCard;
