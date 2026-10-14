"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChatMessageDTO, Conversation } from "../interfaces/interface";
import { useChatSocket } from "../hooks/socketHooks";
import { sendImageMessage, sendMessage } from "@/src/socket/chat/chat.socket";
import { useGetConversations, useGetMessages, useUploadImage } from "../hooks/hooks";
import { useAuthStore } from "@/src/store/auth.store";
import NewConversationModal from "../components/NewConversationModal";
import ChatSection from "../components/ChatSection";
import ConversationListSidebar from "../components/ConversationListSidebar";
import { useTravelerProfile } from "../../matches-connections/hooks/users.hooks";
import { usePresenceSocket } from "../hooks/usePresenceSocket";

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
      (activeRecipientId && conversation.user.id === activeRecipientId)
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
    [conversations]
  );

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

  return (
    <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-[calc(100vh-4rem)] lg:h-screen bg-[#f7faf6] overflow-hidden">
      <NewConversationModal isOpen={isNewChatOpen} onClose={() => setIsNewChatOpen(false)} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <ConversationListSidebar
          conversations={conversations}
          visibleConversations={visibleConversations}
          activeConversationId={activeConversationId}
          activeRecipientId={activeRecipientId}
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          totalUnreadCount={totalUnreadCount}
          presenceMap={presenceMap}
          onSelectConversation={(id) => router.push(`/messages?conversationId=${id}`)}
          onOpenNewChat={() => setIsNewChatOpen(true)}
          onResetFilters={() => {
            setSearch("");
            setFilter("all");
          }}
        />

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
