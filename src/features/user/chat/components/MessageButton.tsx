"use client";

import { useOpenChat } from "../hooks/useOpenChat";

interface MessageButtonProps {
  userId: string;
  onSuccess?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function MessageButton({
  userId,
  onSuccess,
  className = "",
  children,
}: MessageButtonProps) {
  const { openChatWithUser, isOpeningChat } = useOpenChat();

  return (
    <button
      type="button"
      disabled={isOpeningChat}
      onClick={() => openChatWithUser(userId, onSuccess)}
      className={className}
    >
      {isOpeningChat ? "..." : children ?? "Message"}
    </button>
  );
}
