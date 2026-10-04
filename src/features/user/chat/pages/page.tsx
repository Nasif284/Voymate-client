"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { EditSquareIcon, SearchIcon } from "../utils/icons";
import { X } from "lucide-react";
import Avatar from "../components/Avatar";
import { ChatMessageDTO, Conversation } from "../interfaces/interface";
import { useChatSocket } from "../hooks/socketHooks";
import { sendImageMessage, sendMessage } from "@/src/socket/chat/chat.socket";
import { useGetConversations, useGetMessages, useUploadImage } from "../hooks/hooks";
import { useAuthStore } from "@/src/store/auth.store";
import NewConversationModal from "../components/NewConversationModal";
import ChatSection from "../components/ChatSection";
import { useTravelerProfile } from "../../matches-connections/hooks/users.hooks";
import { usePresenceSocket } from "../hooks/usePresenceSocket";

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

export default function MessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL is the source of truth
  const activeConversationId = searchParams.get("conversationId") ?? "";
  const activeRecipientId = searchParams.get("recipientId") ?? searchParams.get("userId") ?? "";
  const paramName = searchParams.get("name") ?? "";
  const paramAvatar = searchParams.get("avatar") ?? "";
  const currentUserId = useAuthStore((state) => state.user?.id);

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [search, setSearch] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  // All custom/data hooks called unconditionally at top level
  const { data: conversationsData, isLoading: convsLoading } = useGetConversations();
  const { data: recipientProfileData } = useTravelerProfile(activeRecipientId);
  const { data: messagesData, isLoading: messagesLoading } = useGetMessages(activeConversationId);
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const conversations = conversationsData?.data?.conversations ?? [];
  const recipientProfile = recipientProfileData?.data;
  const messages = messagesData?.data?.messages ?? [];

  let activeConversation = conversations.find(
    (conversation: Conversation) =>
      (activeConversationId && conversation.conversationId === activeConversationId) ||
      (activeRecipientId && conversation.user.id === activeRecipientId),
  ) as Conversation | undefined;

  if (!activeConversation && activeRecipientId) {
    activeConversation = {
      conversationId: "",
      user: {
        id: activeRecipientId,
        name: recipientProfile?.fullName ?? recipientProfile?.name ?? (paramName || "Traveler"),
        profileImage: recipientProfile?.avatarUrl ?? recipientProfile?.profileImage ?? (paramAvatar || undefined),
      },
      updatedAt: new Date(),
    };
  }

  const recipientUserId = activeConversation?.user?.id || activeRecipientId;

  // Collect all user IDs in conversations plus active recipient for bulk presence tracking
  const allUserIds = useMemo(() => {
    const ids = conversations.map((c: Conversation) => c.user.id).filter(Boolean);
    if (activeRecipientId && !ids.includes(activeRecipientId)) {
      ids.push(activeRecipientId);
    }
    return ids;
  }, [conversations, activeRecipientId]);

  const presenceMap = usePresenceSocket(allUserIds);
  const recipientPresence = recipientUserId ? presenceMap[recipientUserId] : undefined;

  useChatSocket({
    conversationId: activeConversationId,
    onMessage: (message) => {
      if (!activeConversationId && activeRecipientId && message.conversationId) {
        router.replace(`/messages?conversationId=${message.conversationId}`);
      }
    },
  });

  const totalUnreadCount = useMemo(
    () => conversations.reduce((acc: number, c: Conversation) => acc + (c.unreadCount || 0), 0),
    [conversations],
  );

  if (convsLoading) {
    return (
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-[calc(100vh-4rem)] lg:h-screen items-center justify-center bg-[#f7faf6]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#005440]/20 border-t-[#005440]" />
          <p className="text-xs font-medium text-[#404944]">Loading conversations...</p>
        </div>
      </main>
    );
  }

  const handleSend = (text: string) => {
    if (activeConversationId) {
      sendMessage({ conversationId: activeConversationId }, text);
    } else if (activeRecipientId) {
      sendMessage({ recipientId: activeRecipientId }, text);
    }
  };

  const handleSendImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      if (activeConversationId) {
        formData.append("conversationId", activeConversationId);
      } else if (activeRecipientId) {
        formData.append("recipientId", activeRecipientId);
      }

      const response = await uploadImage(formData);
      const attachment = response.data;

      if (activeConversationId) {
        sendImageMessage({ conversationId: activeConversationId }, attachment);
      } else if (activeRecipientId) {
        sendImageMessage({ recipientId: activeRecipientId }, attachment);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  const visibleConversations = conversations.filter((conversation: Conversation) => {
    const name = conversation.user.name.toLowerCase();
    const lastMsg = conversation.lastMessage?.content?.toLowerCase() ?? "";
    const searchNormalized = search.trim().toLowerCase();
    const matchesSearch = !searchNormalized || name.includes(searchNormalized) || lastMsg.includes(searchNormalized);
    const matchesFilter = filter === "all" || (conversation.unreadCount || 0) > 0;
    return matchesSearch && matchesFilter;
  });

  const activeMessages = activeConversationId
    ? messages.filter((message: ChatMessageDTO) => message.conversationId === activeConversationId)
    : [];

  return (
    <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-[calc(100vh-4rem)] lg:h-screen bg-[#f7faf6] overflow-hidden">
      {/* New Conversation Modal */}
      <NewConversationModal isOpen={isNewChatOpen} onClose={() => setIsNewChatOpen(false)} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Conversations Sidebar */}
        <aside className={`relative w-full lg:w-80 shrink-0 flex-col border-r border-[#bec9c3]/30 bg-white ${activeConversationId || activeRecipientId ? "hidden lg:flex" : "flex"}`}>
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
                onClick={() => setIsNewChatOpen(true)}
                aria-label="Start a new conversation"
                title="Start a new conversation"
                className="rounded-full bg-[#f1f4f1] p-2 text-[#005440] transition-colors hover:bg-[#e1e4e0] active:scale-95"
              >
                <EditSquareIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-2">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707973] h-4 w-4" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-[#e0e3e0] bg-[#f8faf8] py-2 pl-9 pr-8 text-xs sm:text-sm text-[#181d1a] outline-none focus:border-[#005440] focus:bg-white transition-all placeholder:text-[#707973]"
                placeholder="Search conversations..."
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#707973] hover:text-[#181d1a]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Pills */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                  filter === "all" ? "bg-[#005440] text-white shadow-xs" : "bg-[#f1f4f1] text-[#404944] hover:bg-[#e1e4e0]"
                }`}
              >
                All ({conversations.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                  filter === "unread" ? "bg-[#005440] text-white shadow-xs" : "bg-[#f1f4f1] text-[#404944] hover:bg-[#e1e4e0]"
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
                  {search ? `No messages match "${search}"` : filter === "unread" ? "No unread messages." : "You don't have any direct messages yet."}
                </p>
                {search || filter === "unread" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setFilter("all");
                    }}
                    className="mt-3 text-xs font-semibold text-[#005440] hover:underline"
                  >
                    Reset filters
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsNewChatOpen(true)}
                    className="mt-4 rounded-xl bg-[#005440] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#003e2f]"
                  >
                    Start a conversation
                  </button>
                )}
              </div>
            ) : (
              visibleConversations.map((conversation: Conversation) => {
                const isSelected = conversation.conversationId === activeConversationId;
                const lastMsgText = conversation.lastMessage?.content || "Tap to chat";
                const formattedTime = formatConversationTime(conversation.updatedAt);
                const isUserOnline = presenceMap[conversation.user.id]?.isOnline ?? false;
                const unreadCount = conversation.unreadCount || 0;
                const hasUnread = unreadCount > 0;

                return (
                  <button
                    key={conversation.conversationId}
                    type="button"
                    onClick={() => router.push(`/messages?conversationId=${conversation.conversationId}`)}
                    className={`flex h-[76px] w-full items-center gap-3 border-l-4 px-4 sm:px-5 text-left transition-all ${
                      isSelected
                        ? "border-[#005440] bg-[#005440]/10 text-[#181d1a]"
                        : "border-transparent hover:bg-[#f1f4f1]/80"
                    }`}
                  >
                    <Avatar avatar={conversation.user.profileImage!} name={conversation.user.name} online={isUserOnline} size="md" />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-1 mb-0.5">
                        <h2 className={`truncate text-sm ${isSelected ? "font-bold text-[#005440]" : hasUnread ? "font-bold text-[#181d1a]" : "font-semibold text-[#181d1a]"}`}>
                          {conversation.user.name}
                        </h2>
                        {formattedTime && (
                          <span className={`shrink-0 text-[10px] ${hasUnread ? "font-bold text-[#005440]" : "font-medium text-[#707973]"}`}>
                            {formattedTime}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <p className={`truncate text-xs leading-tight ${hasUnread ? "font-bold text-[#181d1a]" : "text-[#707973]"}`}>
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
              })
            )}
          </div>

          {/* Sticky Floating Action Button */}
          <div className="absolute bottom-4 right-4 z-30">
            <button
              type="button"
              onClick={() => setIsNewChatOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#005440] text-white shadow-xl hover:bg-[#003e2f] hover:scale-110 active:scale-95 transition-all cursor-pointer"
              title="Start a new conversation"
              aria-label="Start a new conversation"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </aside>

        {/* Active Direct Messaging Section Component */}
        <ChatSection
          activeConversationId={activeConversationId}
          activeRecipientId={activeRecipientId}
          activeConversation={activeConversation}
          activeMessages={activeMessages}
          messagesLoading={messagesLoading}
          currentUserId={currentUserId!}
          isOnline={recipientPresence?.isOnline}
          lastSeen={recipientPresence?.lastSeen}
          onSend={handleSend}
          onSendImage={handleSendImage}
          isUploadingImage={isUploading}
        />
      </div>
    </main>
  );
}


