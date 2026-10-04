import { ChatImageAttachment } from "@/src/features/user/chat/interfaces/interface";
import { getSocket } from "../socket";

export function joinConversation(conversationId: string) {
  getSocket().emit("chat:join", conversationId);
}

export function leaveConversation(conversationId: string) {
  getSocket().emit("chat:leave", conversationId);
}

export function sendMessage(target: { conversationId?: string; recipientId?: string }, content: string) {
  getSocket().emit("chat:send", {
    ...(target.conversationId ? { conversationId: target.conversationId } : {}),
    ...(target.recipientId ? { recipientId: target.recipientId } : {}),
    type: "TEXT",
    content,
  });
}
export function sendImageMessage(target: { conversationId?: string; recipientId?: string }, attachment: ChatImageAttachment) {
  getSocket().emit("chat:send", {
    ...(target.conversationId ? { conversationId: target.conversationId } : {}),
    ...(target.recipientId ? { recipientId: target.recipientId } : {}),
    type: "IMAGE",
    attachment,
  });
}

export function markConversationAsRead(conversationId: string) {
  if (conversationId) {
    getSocket().emit("chat:read", { conversationId });
  }
}