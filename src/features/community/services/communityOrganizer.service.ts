import { communityApi as api } from "@/src/lib/community-api";
import {
  CommunityTripItem,
  BackendCommunityTripRaw,
  CommunityProfile,
} from "@/src/features/user/community-trips/types";
import { mapBackendTripToItem } from "@/src/features/user/community-trips/services/communityTrip.service";
import {
  OrganizerTripBookingAttendee,
  OrganizerTripsResponse,
} from "../types/communityOrganizer.types";

export const communityOrganizerService = {
  getOrganizerTrips: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<OrganizerTripsResponse> => {
    const res = await api.get<{
      success: boolean;
      data: { trips: BackendCommunityTripRaw[]; total: number };
    }>("/community/trips/organizer/my-trips", { params });

    const rawList = res.data.data?.trips || [];
    const trips: CommunityTripItem[] = rawList.map(mapBackendTripToItem);
    return {
      trips,
      total: res.data.data?.total || trips.length,
    };
  },

  createTrip: async (
    formData: FormData
  ): Promise<{ success: boolean; message?: string; data: CommunityTripItem }> => {
    const res = await api.post<{
      success: boolean;
      message?: string;
      data: BackendCommunityTripRaw;
    }>("/community/trips", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      success: res.data.success,
      message: res.data.message,
      data: mapBackendTripToItem(res.data.data),
    };
  },

  getTripBookings: async (
    tripId: string
  ): Promise<OrganizerTripBookingAttendee[]> => {
    const res = await api.get<{
      success: boolean;
      data: OrganizerTripBookingAttendee[];
    }>(`/community/bookings/trip/${tripId}`);
    return res.data.data || [];
  },

  getTripDetail: async (slugOrId: string): Promise<CommunityTripItem | null> => {
    const res = await api.get<{
      success: boolean;
      data: BackendCommunityTripRaw;
    }>(`/community/trips/${slugOrId}`);
    return res.data.data ? mapBackendTripToItem(res.data.data) : null;
  },

  submitVerification: async (
    formData: FormData
  ): Promise<{ success: boolean; message?: string; data: CommunityProfile }> => {
    const res = await api.post<{
      success: boolean;
      message?: string;
      data: CommunityProfile;
    }>("/community/auth/verify", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getMe: async (): Promise<CommunityProfile> => {
    const res = await api.get<{ success: boolean; data: CommunityProfile }>(
      "/community/auth/me"
    );
    return res.data.data;
  },
};
