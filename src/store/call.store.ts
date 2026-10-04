import { create } from "zustand";

export type CallStatus = "IDLE" | "OUTGOING" | "INCOMING" | "CONNECTING" | "ACTIVE" | "ENDING";

export type CallScope = "DIRECT";
export type CallMediaType = "AUDIO" | "VIDEO";

export interface IncomingCall {
  callId: string;
  callerId: string;
  callerName: string;
  callerProfileImage: string | null;
  mediaType: CallMediaType;
  scope: "DIRECT";
}

export type IncomingCallData = IncomingCall;

export interface ActiveCall {
  callId: string;
  scope: CallScope;
  mediaType: CallMediaType;

  callerId: string;
  callerName?: string;
  callerProfileImage?: string | null;

  recipientId?: string;
  recipientName?: string;
  recipientProfileImage?: string | null;
}

interface CallState {
  status: CallStatus;

  activeCall: ActiveCall | null;
  incomingCall: IncomingCallData | null;

  localStream: MediaStream | null;
  remoteStream: MediaStream | null;

  isMuted: boolean;
  isCameraOn: boolean;

  setOutgoingCall: (call: ActiveCall) => void;
  setIncomingCall: (call: IncomingCallData) => void;
  clearIncomingCall: () => void;

  setConnecting: () => void;
  setActive: () => void;
  setEnding: () => void;

  setLocalStream: (stream: MediaStream | null) => void;
  setRemoteStream: (stream: MediaStream | null) => void;

  setMuted: (muted: boolean) => void;
  setCameraOn: (enabled: boolean) => void;

  clearCall: () => void;
}

export const useCallStore = create<CallState>((set) => ({
  status: "IDLE",
  activeCall: null,
  incomingCall: null,
  localStream: null,
  remoteStream: null,
  isMuted: false,
  isCameraOn: false,

  setOutgoingCall: (call) =>
    set({
      status: "OUTGOING",
      activeCall: call,
      incomingCall: null,
      isMuted: false,
      isCameraOn: call.mediaType === "VIDEO",
    }),

  setIncomingCall: (call) =>
    set({
      status: "INCOMING",
      incomingCall: call,
      isMuted: false,
      isCameraOn: call.mediaType === "VIDEO",
      activeCall: {
        callId: call.callId,
        scope: call.scope,
        mediaType: call.mediaType,
        callerId: call.callerId,
        callerName: call.callerName,
        callerProfileImage: call.callerProfileImage,
        recipientId: undefined,
      },
    }),

  clearIncomingCall: () =>
    set({
      incomingCall: null,
    }),

  setConnecting: () =>
    set({
      status: "CONNECTING",
    }),

  setActive: () =>
    set({
      status: "ACTIVE",
    }),

  setEnding: () =>
    set({
      status: "ENDING",
    }),

  setLocalStream: (stream) =>
    set({
      localStream: stream,
    }),

  setRemoteStream: (stream) =>
    set({
      remoteStream: stream,
    }),

  setMuted: (muted) =>
    set({
      isMuted: muted,
    }),

  setCameraOn: (enabled) =>
    set({
      isCameraOn: enabled,
    }),

  clearCall: () =>
    set((state) => {
      if (state.localStream) {
        state.localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (state.remoteStream) {
        state.remoteStream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      return {
        status: "IDLE",
        activeCall: null,
        incomingCall: null,
        localStream: null,
        remoteStream: null,
        isMuted: false,
        isCameraOn: false,
      };
    }),
}));
