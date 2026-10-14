"use client";
import React from "react";
import { SquarePen, Search, X, Plus } from "lucide-react";
import { Conversation } from "../interfaces/interface";
import ConversationListItem from "./ConversationListItem";

interface ConversationListSidebarProps {
  conversations: Conversation[];
  visibleConversations: Conversation[];
  activeConversationId: string;
  activeRecipientId: string;
  search: string;
  onSearchChange: (value: string) => void;
  filter: "all" | "unread";
  onFilterChange: (filter: "all" | "unread") => void;
  totalUnreadCount: number;
  presenceMap: Record<string, { isOnline: boolean; lastSeen?: Date | string }>;
  onSelectConversation: (conversationId: string) => void;
  onOpenNewChat: () => void;
  onResetFilters: () => void;
}

export const ConversationListSidebar: React.FC<ConversationListSidebarProps> = ({
  conversations,
  visibleConversations,
  activeConversationId,
  activeRecipientId,
  search,
  onSearchChange,
  filter,
  onFilterChange,
  totalUnreadCount,
  presenceMap,
  onSelectConversation,
  onOpenNewChat,
  onResetFilters,
}) => {
  const isHiddenOnMobile = Boolean(activeConversationId || activeRecipientId);

  return (
    <aside
      className={`relative w-full lg:w-80 shrink-0 flex-col border-r border-[#bec9c3]/30 bg-white ${
        isHiddenOnMobile ? "hidden lg:flex" : "flex"
      }`}
    >
      <div className="p-4 sm:p-5 pb-3 border-b border-[#bec9c3]/15">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#181d1a]">Messages</h1>
            {conversations.length > 0 && (
              <span className="rounded-full bg-[#005440]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#005440]">
                {conversations.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onOpenNewChat}
            aria-label="Start a new conversation"
            title="Start a new conversation"
            className="rounded-full bg-[#f1f4f1] p-2 text-[#005440] transition-colors hover:bg-[#e1e4e0] active:scale-95 cursor-pointer"
          >
            <SquarePen className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707973] h-4 w-4" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-xl border border-[#e0e3e0] bg-[#f8faf8] py-2 pl-9 pr-8 text-xs sm:text-sm text-[#181d1a] outline-none focus:border-[#005440] focus:bg-white transition-all placeholder:text-[#707973]"
            placeholder="Search conversations..."
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#707973] hover:text-[#181d1a] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#005440] text-white shadow-xs"
                : "bg-[#f1f4f1] text-[#404944] hover:bg-[#e1e4e0]"
            }`}
          >
            All ({conversations.length})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("unread")}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
              filter === "unread"
                ? "bg-[#005440] text-white shadow-xs"
                : "bg-[#f1f4f1] text-[#404944] hover:bg-[#e1e4e0]"
            }`}
          >
            Unread ({totalUnreadCount})
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="hide-scrollbar flex-1 overflow-y-auto pb-20">
        {visibleConversations.length === 0 ? (
          <div className="p-8 text-center text-[#707973]">
            <p className="text-sm font-semibold text-[#181d1a]">No conversations found</p>
            <p className="text-xs mt-1">
              {search
                ? `No messages match "${search}"`
                : filter === "unread"
                ? "No unread messages."
                : "You don't have any direct messages yet."}
            </p>
            {search || filter === "unread" ? (
              <button
                type="button"
                onClick={onResetFilters}
                className="mt-3 text-xs font-semibold text-[#005440] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenNewChat}
                className="mt-4 rounded-xl bg-[#005440] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#003e2f] cursor-pointer"
              >
                Start a conversation
              </button>
            )}
          </div>
        ) : (
          visibleConversations.map((conversation: Conversation) => (
            <ConversationListItem
              key={conversation.conversationId}
              conversation={conversation}
              isSelected={conversation.conversationId === activeConversationId}
              isOnline={presenceMap[conversation.user.id]?.isOnline ?? false}
              onSelect={onSelectConversation}
            />
          ))
        )}
      </div>

      {/* Sticky Floating Action Button */}
      <div className="absolute bottom-4 right-4 z-30">
        <button
          type="button"
          onClick={onOpenNewChat}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#005440] text-white shadow-xl hover:bg-[#003e2f] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="Start a new conversation"
          aria-label="Start a new conversation"
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </aside>
  );
};

export default ConversationListSidebar;
