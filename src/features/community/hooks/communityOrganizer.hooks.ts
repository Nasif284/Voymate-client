"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { communityOrganizerService } from "../services/communityOrganizer.service";
import { useCommunityAuthStore } from "@/src/store/communityAuth.store";

function extractErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      fallback
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export function useOrganizerTrips(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["organizer-trips", params?.page, params?.limit],
    queryFn: () => communityOrganizerService.getOrganizerTrips(params),
    staleTime: 1000 * 60 * 2,
  });
}

export function useTripBookings(tripId: string) {
  return useQuery({
    queryKey: ["trip-bookings", tripId],
    queryFn: () => communityOrganizerService.getTripBookings(tripId),
    enabled: Boolean(tripId),
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateOrganizerTrip() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      communityOrganizerService.createTrip(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["organizer-trips"] });
      queryClient.invalidateQueries({ queryKey: ["community-trips"] });
      toast.success(
        res.message || "Community expedition published successfully!"
      );
      router.push("/community/dashboard/trips");
    },
    onError: (
      error: AxiosError<{ message?: string; error?: { message?: string } }>
    ) => {
      toast.error(
        extractErrorMessage(error, "Failed to create community expedition")
      );
    },
  });
}

export function useSubmitCommunityVerification() {
  const queryClient = useQueryClient();
  const setCommunity = useCommunityAuthStore((state) => state.setCommunity);

  return useMutation({
    mutationFn: (formData: FormData) =>
      communityOrganizerService.submitVerification(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["community-me"] });
      if (res.data) {
        setCommunity(res.data);
      }
      toast.success(
        res.message ||
          "Verification documents submitted! Under review by Voymate team."
      );
    },
    onError: (
      error: AxiosError<{ message?: string; error?: { message?: string } }>
    ) => {
      toast.error(
        extractErrorMessage(error, "Failed to submit verification documents")
      );
    },
  });
}
