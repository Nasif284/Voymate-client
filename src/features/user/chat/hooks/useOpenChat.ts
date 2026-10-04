"use client";

import { useRouter } from "next/navigation";
import { useGetConversationId } from "./hooks";

export function useOpenChat() {
  const router = useRouter();
  const { mutateAsync: getConversationId, isPending } = useGetConversationId();

  const openChatWithUser = async (userId: string, onSuccess?: () => void) => {
    try {
      const response = await getConversationId(userId);
      const conversationId = response.data?.conversationId ?? response.data;

      onSuccess?.();

      if (conversationId && typeof conversationId === "string") {
        router.push(`/messages?conversationId=${conversationId}`);
      } else {
        router.push(`/messages?recipientId=${userId}`);
      }
    } catch (error) {
      console.error("Failed to open chat:", error);
    }
  };

  return { openChatWithUser, isOpeningChat: isPending };
}
