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

export function useConnectionStatus(targetUserId?: string | null) {
  const { data: connectionsRes, isLoading: loadingConnections } = useGetConnections();
  const { data: requestsRes, isLoading: loadingRequests } = useGetAllRequests();

  const sendRequest = useSendConnectionRequest();
  const acceptRequest = useAcceptRequest();
  const rejectRequest = useRejectRequest();
  const withdrawRequest = useWithdrawRequest();

  const isConnected = useMemo(() => {
    if (!targetUserId || !connectionsRes?.data?.connections) return false;
    return connectionsRes.data.connections.some(
      (conn: Connection) => conn.userId === targetUserId || conn.id === targetUserId
    );
  }, [connectionsRes, targetUserId]);

  const existingRequest = useMemo(() => {
    if (!targetUserId || !requestsRes?.data?.requests) return undefined;
    return requestsRes.data.requests.find(
      (req: RequestData) => req.senderId === targetUserId || req.receiverId === targetUserId
    );
  }, [requestsRes, targetUserId]);

  const isRequestReceived = !isConnected && existingRequest?.senderId === targetUserId;
  const isRequestSent = !isConnected && existingRequest?.receiverId === targetUserId;

  let status: ConnectionState = "NONE";
  if (isConnected) {
    status = "CONNECTED";
  } else if (isRequestReceived) {
    status = "REQUEST_RECEIVED";
  } else if (isRequestSent) {
    status = "REQUEST_SENT";
  }

  return {
    isConnected,
    isRequestSent,
    isRequestReceived,
    existingRequest,
    status,
    isLoading: loadingConnections || loadingRequests,
    sendRequest,
    acceptRequest,
    rejectRequest,
    withdrawRequest,
  };
}
