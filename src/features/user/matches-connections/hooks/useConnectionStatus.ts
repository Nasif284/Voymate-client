"use client";

import { useMemo } from "react";
import {
  useAcceptRequest,
  useGetAllRequests,
  useGetConnections,
  useRejectRequest,
  useSendConnectionRequest,
  useWithdrawRequest,
} from "./connection.hooks";
import { Connection } from "../interfaces/profile-listing.interface";
import { RequestData } from "@/src/features/user/profile/interfaces/profile.interface";

export type ConnectionState =
  | "CONNECTED"
  | "REQUEST_RECEIVED"
  | "REQUEST_SENT"
  | "NONE";

export interface UseConnectionStatusOptions {
  initialStatus?: ConnectionState;
  initialRequestId?: string | null;
  initialConnectionId?: string | null;
}

export function useConnectionStatus(
  targetUserId?: string | null,
  options?: UseConnectionStatusOptions
) {
  const hasServerStatus = options?.initialStatus !== undefined;

  const { data: connectionsRes, isLoading: loadingConnections } =
    useGetConnections(!hasServerStatus && Boolean(targetUserId));
  const { data: requestsRes, isLoading: loadingRequests } =
    useGetAllRequests(!hasServerStatus && Boolean(targetUserId));

  const sendRequest = useSendConnectionRequest();
  const acceptRequest = useAcceptRequest();
  const rejectRequest = useRejectRequest();
  const withdrawRequest = useWithdrawRequest();

  const fallbackConnected = useMemo(() => {
    if (!targetUserId || !connectionsRes?.data?.connections) return false;
    return connectionsRes.data.connections.some(
      (conn: Connection) =>
        conn.userId === targetUserId || conn.id === targetUserId
    );
  }, [connectionsRes, targetUserId]);

  const fallbackRequest = useMemo(() => {
    if (!targetUserId || !requestsRes?.data?.requests) return undefined;
    return requestsRes.data.requests.find(
      (req: RequestData) =>
        req.senderId === targetUserId || req.receiverId === targetUserId
    );
  }, [requestsRes, targetUserId]);

  const status: ConnectionState = useMemo(() => {
    if (options?.initialStatus) {
      return options.initialStatus;
    }
    if (fallbackConnected) {
      return "CONNECTED";
    }
    if (fallbackRequest?.senderId === targetUserId) {
      return "REQUEST_RECEIVED";
    }
    if (fallbackRequest?.receiverId === targetUserId) {
      return "REQUEST_SENT";
    }
    return "NONE";
  }, [options?.initialStatus, fallbackConnected, fallbackRequest, targetUserId]);

  const isConnected = status === "CONNECTED";
  const isRequestReceived = status === "REQUEST_RECEIVED";
  const isRequestSent = status === "REQUEST_SENT";

  const existingRequest: RequestData | undefined = useMemo(() => {
    if (options?.initialRequestId && targetUserId) {
      return {
        id: options.initialRequestId,
        senderId: isRequestReceived ? targetUserId : "",
        receiverId: isRequestSent ? targetUserId : "",
      };
    }
    return fallbackRequest;
  }, [
    options?.initialRequestId,
    targetUserId,
    isRequestReceived,
    isRequestSent,
    fallbackRequest,
  ]);

  return {
    isConnected,
    isRequestSent,
    isRequestReceived,
    existingRequest,
    connectionId: options?.initialConnectionId ?? null,
    status,
    isLoading: !hasServerStatus && (loadingConnections || loadingRequests),
    sendRequest,
    acceptRequest,
    rejectRequest,
    withdrawRequest,
  };
}
