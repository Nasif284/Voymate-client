"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AddCircleIcon, ArrowLeftIcon, SendIcon, SmileIcon } from "../utils/icons";
import Avatar from "./Avatar";
import MessageBubble from "./MessageBubble";
import CallSections from "./CallSections";
import EmojiPicker from "./EmojiPicker";
import { ChatMessageDTO, Conversation } from "../interfaces/interface";
import { markConversationAsRead } from "@/src/socket/chat/chat.socket";
import { Sparkles } from "lucide-react";

function formatLastSeen(dateString?: string) {
  if (!dateString) return "recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "recently";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

interface ChatSectionProps {
  activeConversationId: string;
  activeRecipientId: string;
  activeConversation: Conversation | undefined;
  activeMessages: ChatMessageDTO[];
  messagesLoading: boolean;
  currentUserId: string;
  isOnline?: boolean;
  lastSeen?: string;
  onSend: (text: string) => void;
  onSendImage: (file: File) => void;
  isUploadingImage: boolean;
}

export default function ChatSection({
  activeConversationId,
  activeRecipientId,
  activeConversation,
  activeMessages,
  messagesLoading,
  currentUserId,
  isOnline = false,
  lastSeen,
  onSend,
  onSendImage,
  isUploadingImage,
}: ChatSectionProps) {
  const router = useRouter();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageText, setMessageText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevConversationIdRef = useRef<string>("");

  useEffect(() => {
    if (activeConversationId) {
      markConversationAsRead(activeConversationId);
    }
  }, [activeConversationId, activeMessages.length]);

  useEffect(() => {
    if (activeMessages.length > 0) {
      if (prevConversationIdRef.current !== activeConversationId) {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        prevConversationIdRef.current = activeConversationId;
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [activeConversationId, activeMessages.length]);

  const handleSend = () => {
    const content = messageText.trim();
    if (!content) return;
    onSend(content);
    setMessageText("");
    setShowEmojiPicker(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSendImage(file);
      event.target.value = "";
    }
  };

  const isPanelVisible = Boolean(activeConversationId || activeRecipientId);

  return (
    <section className={`relative flex min-w-0 flex-1 flex-col overflow-hidden bg-[#f7faf6] ${isPanelVisible ? "flex" : "hidden lg:flex"}`}>
      {!activeConversation ? (
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#005440]/10 text-[#005440]">
              <SendIcon />
            </div>
            <h2 className="text-xl font-bold text-[#181d1a]">Select a conversation</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#404944]">
              Choose a traveler from the list to view messages and continue planning your next adventure.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Active Header */}
          <header className="z-10 flex items-center justify-between border-b border-[#bec9c3]/30 bg-white/90 px-4 sm:px-8 py-3 backdrop-blur-xl shadow-xs">
            <div className="flex items-center gap-3">
              {/* Mobile Back Button */}
              <button
                type="button"
                onClick={() => router.push("/messages")}
                className="lg:hidden rounded-xl p-2 text-[#404944] hover:bg-[#f1f4f1] transition-colors"
                aria-label="Back to messages"
              >
                <ArrowLeftIcon />
              </button>

              <Avatar avatar={activeConversation.user.profileImage ?? ""} name={activeConversation.user.name} online={isOnline} size="md" />

              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#181d1a] leading-tight">{activeConversation.user.name}</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isOnline ? "text-[#005440]" : "text-[#707973]"}`}>
                    {isOnline ? "Online" : lastSeen ? `Last seen ${formatLastSeen(lastSeen)}` : "Offline"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CallSections userId={activeConversation.user.id} userName={activeConversation.user.name} userProfileImage={activeConversation.user.profileImage!} />
            </div>
          </header>

          {/* Messages Content area */}
          <div className="hide-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto px-4 sm:px-8 py-6">
            <div className="self-center rounded-full bg-white border border-[#bec9c3]/30 px-4 py-1 text-[11px] font-semibold text-[#404944] shadow-xs">
              Connected with {activeConversation.user.name}
            </div>

            {messagesLoading ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 gap-2.5 my-auto">
                <div className="h-7 w-7 animate-spin rounded-full border-3 border-[#005440]/20 border-t-[#005440]" />
                <span className="text-xs font-medium text-[#707973]">Loading messages...</span>
              </div>
            ) : activeMessages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center my-auto">
                <Avatar avatar={activeConversation.user.profileImage} name={activeConversation.user.name} online size="lg" />
                <h3 className="mt-4 text-lg font-bold text-[#181d1a] flex items-center justify-center gap-1.5">
                  Say hello to {activeConversation.user.name}!
                  <Sparkles className="w-4 h-4 text-[#005440]" />
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#707973] max-w-xs">
                  Send a message to start planning your next travel adventure together.
                </p>
              </div>
            ) : (
              activeMessages.map((message: ChatMessageDTO) => (
                <MessageBubble
                  key={message.id}
                  currentUserId={currentUserId}
                  message={message}
                  avatar={activeConversation.user.profileImage ?? ""}
                  senderName={activeConversation.user.name}
                />
              ))
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Hidden Image Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Input Footer */}
          <footer className="relative border-t border-[#bec9c3]/30 bg-white px-4 sm:px-8 py-4">
            {showEmojiPicker && (
              <EmojiPicker
                onSelect={(emoji) => setMessageText((prev) => prev + emoji)}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}

            <div className="flex items-end gap-2 sm:gap-3 rounded-2xl border border-[#bec9c3]/40 bg-[#f8faf8] p-2 pr-3 sm:pr-4 shadow-xs transition-all focus-within:border-[#005440] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#005440]/10">
              <button
                type="button"
                aria-label="Add emoji"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className={`p-2 transition-colors rounded-xl ${showEmojiPicker ? "text-[#005440] bg-[#005440]/10" : "text-[#707973] hover:text-[#005440]"}`}
              >
                <SmileIcon />
              </button>

              <button
                type="button"
                aria-label="Add attachment"
                disabled={isUploadingImage}
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-[#707973] hover:text-[#005440] transition-colors disabled:opacity-50 relative"
              >
                {isUploadingImage ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#005440]/20 border-t-[#005440]" />
                ) : (
                  <AddCircleIcon />
                )}
              </button>

              <textarea
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                placeholder="Type a message..."
                className="hide-scrollbar max-h-32 flex-1 resize-none border-0 bg-transparent py-2 text-xs sm:text-sm text-[#181d1a] outline-none focus:ring-0 placeholder:text-[#707973]"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!messageText.trim()}
                aria-label="Send message"
                className="rounded-xl bg-[#005440] p-2.5 text-white transition-all hover:bg-[#003e2f] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs shrink-0"
              >
                <SendIcon />
              </button>
            </div>
          </footer>
        </>
      )}
    </section>
  );
}
