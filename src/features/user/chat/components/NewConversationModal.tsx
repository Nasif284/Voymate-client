"use client";

import { useEffect, useState } from "react";
import { useGetConnections } from "../../matches-connections/hooks/connection.hooks";
import { Connection } from "../../matches-connections/interfaces/profile-listing.interface";
import Avatar from "./Avatar";
import MessageButton from "./MessageButton";
import { Search, X } from "lucide-react";

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewConversationModal({ isOpen, onClose }: NewConversationModalProps) {
  const [search, setSearch] = useState("");

  const { data: connectionsData, isLoading } = useGetConnections();
  const connections: Connection[] = connectionsData?.data?.connections ?? [];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredConnections = connections.filter((conn: Connection) =>
    conn.fullName.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-[#bec9c3]/30 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#bec9c3]/20 px-6 py-4 bg-[#f8faf8]">
          <div>
            <h3 className="text-lg font-bold text-[#181d1a]">New Message</h3>
            <p className="text-xs text-[#707973]">Select a traveler from your connections</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#707973] hover:bg-[#e1e4e0] hover:text-[#181d1a] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#bec9c3]/15 bg-white">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#707973]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search connections..."
              className="w-full rounded-xl border border-[#e0e3e0] bg-[#f8faf8] py-2 pl-10 pr-4 text-xs sm:text-sm text-[#181d1a] outline-none focus:border-[#005440] focus:bg-white transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#707973] hover:text-[#181d1a]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Connection List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-[#707973]">
              <div className="h-7 w-7 animate-spin rounded-full border-3 border-[#005440]/20 border-t-[#005440]" />
              <span className="text-xs font-medium">Loading connections...</span>
            </div>
          ) : filteredConnections.length === 0 ? (
            <div className="py-12 text-center text-[#707973]">
              <p className="text-sm font-semibold">No connections found</p>
              <p className="text-xs mt-1">Connect with travelers on Voymate to start direct messaging.</p>
            </div>
          ) : (
            filteredConnections.map((conn: Connection) => (
              <div
                key={conn.id}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-[#f1f4f1]"
              >
                <Avatar avatar={conn.avatarUrl} name={conn.fullName} online={false} size="md" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#181d1a] truncate">{conn.fullName}</h4>
                  <p className="text-xs text-[#707973] truncate">
                    {conn.state ? `${conn.state}, ${conn.country}` : "Connected traveler"}
                  </p>
                </div>
                <MessageButton
                  userId={conn.userId}
                  onSuccess={onClose}
                  className="rounded-xl bg-[#005440]/10 px-3 py-1 text-xs font-semibold text-[#005440] hover:bg-[#005440]/20 transition-colors cursor-pointer"
                >
                  Message
                </MessageButton>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
