"use client";

import React from "react";
import ChatActionButton from "./ChatActionButton";
import { Phone, Video } from "lucide-react";
import { useCallStore } from "@/src/store/call.store";
import { useCreateDirectCall } from "../../call/hooks/hooks";

interface CallSectionsProps {
  userId: string;
  userName: string;
  userProfileImage: string | null;
}

const CallSections: React.FC<CallSectionsProps> = ({ userId, userName, userProfileImage }) => {
  const createDirectCall = useCreateDirectCall();
  const setOutgoingCall = useCallStore((state) => state.setOutgoingCall);

  const handleCall = (mediaType: "AUDIO" | "VIDEO") => {
    if (createDirectCall.isPending) {
      return;
    }

    createDirectCall.mutate(
      {
        recipientId: userId,
        mediaType,
      },
      {
        onSuccess: (response) => {
          const call = response.data.call;
          setOutgoingCall({
            callId: call.id,
            scope: "DIRECT",
            mediaType: call.mediaType,
            callerId: call.callerId,
            recipientId: call.recipientId,
            recipientName: userName,
            recipientProfileImage: userProfileImage,
          });
        },
      }
    );
  };

  return (
    <>
      <ChatActionButton label="Call" onClick={() => handleCall("AUDIO")}>
        <Phone className="w-5 h-5" />
      </ChatActionButton>

      <ChatActionButton label="Start video call" onClick={() => handleCall("VIDEO")}>
        <Video className="w-5 h-5" />
      </ChatActionButton>
    </>
  );
};

export default CallSections;
