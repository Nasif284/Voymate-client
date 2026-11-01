import { ConnectionRequestData } from "@/src/features/user/matches-connections/interfaces/connection.interface";
import { connectionServices } from "@/src/features/user/matches-connections/services/connection.service";
import { ApiError } from "@/src/types/types";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

function invalidateRelationshipQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ["all_requests"] });
  queryClient.invalidateQueries({ queryKey: ["incoming_requests"] });
  queryClient.invalidateQueries({ queryKey: ["sent_requests"] });
  queryClient.invalidateQueries({ queryKey: ["connections"] });
  queryClient.invalidateQueries({ queryKey: ["users_for_cards"] });
  queryClient.invalidateQueries({ queryKey: ["nearby_users"] });
  queryClient.invalidateQueries({ queryKey: ["user"] });
  queryClient.invalidateQueries({ queryKey: ["trip_match_profile"] });
  queryClient.invalidateQueries({ queryKey: ["trip_matches"] });
  queryClient.invalidateQueries({ queryKey: ["all_trip_matches"] });
  queryClient.invalidateQueries({ queryKey: ["search_trip_matches"] });
}

export function useSendConnectionRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ConnectionRequestData) => connectionServices.sendConnectionRequest(data),
    onSuccess: (res) => {
      invalidateRelationshipQueries(queryClient);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useAcceptRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => connectionServices.acceptRequest(id),
    onSuccess: (res) => {
      invalidateRelationshipQueries(queryClient);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useRejectRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => connectionServices.rejectRequest(id),
    onSuccess: (res) => {
      invalidateRelationshipQueries(queryClient);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useWithdrawRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => connectionServices.withdrawRequest(id),
    onSuccess: (res) => {
      invalidateRelationshipQueries(queryClient);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useGetIncomingRequests() {
  return useQuery({
    queryKey: ["incoming_requests"],
    queryFn: () => connectionServices.getIncomingRequests(),
  });
}

export function useGetSentRequests() {
  return useQuery({
    queryKey: ["sent_requests"],
    queryFn: () => connectionServices.getSentRequests(),
  });
}

export function useGetConnections(enabled: boolean = true) {
  return useQuery({
    queryKey: ["connections"],
    queryFn: () => connectionServices.getConnections(),
    enabled,
  });
}

export function useGetAllRequests(enabled: boolean = true) {
  return useQuery({
    queryKey: ["all_requests"],
    queryFn: () => connectionServices.getAllRequests(),
    enabled,
  });
}

export function useDisconnect() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => connectionServices.disconnect(id),
    onSuccess: (res) => {
      invalidateRelationshipQueries(queryClient);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
