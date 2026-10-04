import { useEffect, useState } from "react";
import { getSocket } from "@/src/socket/socket";

export interface UserPresence {
  isOnline: boolean;
  lastSeen?: string;
}

export function usePresenceSocket(userIds: string[]) {
  const [presenceMap, setPresenceMap] = useState<Record<string, UserPresence>>({});

  useEffect(() => {
    if (!userIds || userIds.length === 0) return;

    const socket = getSocket();

    const handleUserOnline = (data: { userId: string }) => {
      setPresenceMap((prev) => ({
        ...prev,
        [data.userId]: { isOnline: true },
      }));
    };

    const handleUserOffline = (data: { userId: string; lastSeen?: string }) => {
      setPresenceMap((prev) => ({
        ...prev,
        [data.userId]: { isOnline: false, lastSeen: data.lastSeen },
      }));
    };

    const handleStatusResponse = (data: { statuses: Record<string, UserPresence> }) => {
      setPresenceMap((prev) => ({
        ...prev,
        ...data.statuses,
      }));
    };

    socket.on("presence:user_online", handleUserOnline);
    socket.on("presence:user_offline", handleUserOffline);
    socket.on("presence:status", handleStatusResponse);

    socket.emit("presence:get_status", { userIds });

    return () => {
      socket.off("presence:user_online", handleUserOnline);
      socket.off("presence:user_offline", handleUserOffline);
      socket.off("presence:status", handleStatusResponse);
    };
  }, [JSON.stringify(userIds)]);

  return presenceMap;
}
