"use client";
import React from "react";
import Avatar from "./Avatar";
import { Conversation } from "../interfaces/interface";

function formatConversationTime(dateString?: Date | string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  isOnline: boolean;
  onSelect: (conversationId: string) => void;
}

export const ConversationListItem: React.FC<ConversationListItemProps> = ({
  conversation,
  isSelected,
  isOnline,
  onSelect,
}) => {
  const lastMsgText = conversation.lastMessage?.content || "Tap to chat";
  const formattedTime = formatConversationTime(conversation.updatedAt);
  const unreadCount = conversation.unreadCount || 0;
  const hasUnread = unreadCount > 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.conversationId)}
      className={`flex h-[76px] w-full items-center gap-3 border-l-4 px-4 sm:px-5 text-left transition-all cursor-pointer ${
        isSelected
          ? "border-[#005440] bg-[#005440]/10 text-[#181d1a]"
          : "border-transparent hover:bg-[#f1f4f1]/80"
      }`}
    >
      <Avatar
        avatar={conversation.user.profileImage!}
        name={conversation.user.name}
        online={isOnline}
        size="md"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-1 mb-0.5">
          <h2
            className={`truncate text-sm ${
              isSelected
                ? "font-bold text-[#005440]"
                : hasUnread
                ? "font-bold text-[#181d1a]"
                : "font-semibold text-[#181d1a]"
            }`}
          >
            {conversation.user.name}
          </h2>
          {formattedTime && (
            <span
              className={`shrink-0 text-[10px] ${
                hasUnread ? "font-bold text-[#005440]" : "font-medium text-[#707973]"
              }`}
            >
              {formattedTime}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-1">
          <p
            className={`truncate text-xs leading-tight ${
              hasUnread ? "font-bold text-[#181d1a]" : "text-[#707973]"
            }`}
          >
            {lastMsgText}
          </p>
          {hasUnread && (
            <span className="flex h-4 min-w-[16px] shrink-0 items-center justify-center rounded-full bg-[#005440] px-1 text-[10px] font-bold text-white shadow-xs">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationListItem;
