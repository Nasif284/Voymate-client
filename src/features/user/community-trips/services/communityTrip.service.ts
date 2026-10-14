import { userApi as api } from "@/src/lib/api-client";
import {
  CommunityTripItem,
  JoinFreeCommunityTripPayload,
  CreateRazorpayOrderPayload,
  VerifyRazorpayBookingPayload,
  CreateCommunityTripPayload,
  CommunityProfile,
  UserCommunityBooking,
  BackendCommunityTripRaw,
} from "../types";

export function mapBackendTripToItem(t: BackendCommunityTripRaw): CommunityTripItem {
  const fallbackImg =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800";
  const coverImage = t.gallery?.[0] || t.coverImage || fallbackImg;
  const gallery =
    t.gallery && t.gallery.length > 0 ? t.gallery : [coverImage];

  return {
    id: t.id,
    title: t.title,
    slug: t.slug,
    tagline: t.priceNote || t.destinationName || t.title,
    description: t.description,
    coverImage,
    gallery,
    destination: {
      name: t.destinationName || t.destination?.name || t.city || "",
      city: t.city || t.destination?.city || "",
      state: t.state || t.destination?.state || "",
      country: t.country || t.destination?.country || "India",
    },
    community: {
      id: t.community?.id || "",
      name: t.community?.name || "Voymate Community",
      slug: t.community?.slug,
      avatarUrl:
        t.community?.avatarUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      verified: t.community?.isVerified ?? t.community?.verified ?? true,
      rating: Number(t.community?.rating) || 5.0,
      memberCount: t.community?.memberCount || "1.2k+ travelers",
      city: t.community?.city,
      state: t.community?.state,
    },
    pricingType: t.pricingType,
    price: t.price ? Number(t.price) : undefined,
    currency: t.currency || "INR",
    priceNote: t.priceNote || undefined,
    category: (t.category || "TRIP") as CommunityTripItem["category"],
    dateFrom:
      typeof t.dateFrom === "string"
        ? t.dateFrom
        : new Date(t.dateFrom).toISOString(),
    dateTo:
      typeof t.dateTo === "string"
        ? t.dateTo
        : new Date(t.dateTo).toISOString(),
    durationText: t.durationText,
    maxCapacity: t.maxCapacity,
    joinedCount: t.joinedCount || 0,
    tags: t.tags || [t.city, t.category].filter((val): val is string => Boolean(val)),
    itinerary: t.itinerary,
    inclusions: t.inclusions
      ? Array.isArray(t.inclusions)
        ? t.inclusions
        : t.inclusions.split("\n").filter(Boolean)
      : [],
    exclusions: t.exclusions
      ? Array.isArray(t.exclusions)
        ? t.exclusions
        : t.exclusions.split("\n").filter(Boolean)
      : [],
    attendees: t.attendees || [],
    reviews: t.reviews || [],
    status: t.status,
  };
}

export const communityTripService = {
  listCommunityTrips: async (params?: {
    category?: string;
    pricingType?: string;
    destination?: string;
    page?: number;
    limit?: number;
  }) => {
    const res = await api.get<{
      success: boolean;
      data: { trips: BackendCommunityTripRaw[]; total: number };
    }>("/community/trips", { params });

    const trips = (res.data.data?.trips || []).map(mapBackendTripToItem);
    return {
      trips,
      total: res.data.data?.total || 0,
    };
  },

  getCommunityTripDetail: async (slugOrId: string) => {
    const res = await api.get<{ success: boolean; data: BackendCommunityTripRaw }>(
      `/community/trips/${slugOrId}`,
    );
    return res.data.data ? mapBackendTripToItem(res.data.data) : null;
  },

  joinFreeCommunityTrip: async (payload: JoinFreeCommunityTripPayload) => {
    const res = await api.post("/community/bookings/join-free", payload);
    return res.data;
  },

  createRazorpayOrder: async (payload: CreateRazorpayOrderPayload) => {
    const res = await api.post(
      "/community/bookings/create-razorpay-order",
      payload,
    );
    return res.data;
  },

  verifyRazorpayBooking: async (payload: VerifyRazorpayBookingPayload) => {
    const res = await api.post("/community/bookings/verify-payment", payload);
    return res.data;
  },

  getUserBookings: async (): Promise<UserCommunityBooking[]> => {
    const res = await api.get<{
      success: boolean;
      data: UserCommunityBooking[];
    }>("/community/bookings/my-bookings");
    return res.data.data || [];
  },

  createCommunityTrip: async (payload: CreateCommunityTripPayload) => {
    const res = await api.post("/community/trips", payload);
    return res.data;
  },

  getCommunityMe: async () => {
    const res = await api.get<{ success: boolean; data: CommunityProfile }>(
      "/community/auth/me",
    );
    return res.data;
  },

  registerCommunity: async (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    city?: string;
    state?: string;
  }) => {
    const res = await api.post<{ success: boolean; message?: string; data: { community: CommunityProfile; accessToken: string } }>(
      "/community/auth/register",
      payload,
    );
    return res.data;
  },

  verifyCommunityEmail: async (payload: { email: string; code: string }) => {
    const res = await api.post<{ success: boolean; message?: string; data: { community: CommunityProfile; isEmailVerified: boolean } }>(
      "/community/auth/verify-email",
      payload,
    );
    return res.data;
  },

  resendCommunityOtp: async (payload: { email: string }) => {
    const res = await api.post<{ success: boolean; message: string }>(
      "/community/auth/resend-otp",
      payload,
    );
    return res.data;
  },

  loginCommunity: async (payload: { email: string; password: string }) => {
    const res = await api.post<{ success: boolean; message?: string; data: { community: CommunityProfile; accessToken: string } }>(
      "/community/auth/login",
      payload,
    );
    return res.data;
  },

  onboardCommunity: async (formData: FormData) => {
    const res = await api.patch<{ success: boolean; data: CommunityProfile }>(
      "/community/auth/onboard",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data;
  },

  submitCommunityVerification: async (formData: FormData) => {
    const res = await api.post<{ success: boolean; data: CommunityProfile }>(
      "/community/auth/verify",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data;
  },

  getOrganizerTrips: async (params?: { page?: number; limit?: number }) => {
    const res = await api.get<{ success: boolean; data: { trips: BackendCommunityTripRaw[]; total: number } }>(
      "/community/trips/organizer/my-trips",
      { params },
    );
    const trips = (res.data.data?.trips || []).map(mapBackendTripToItem);
    return { trips, total: res.data.data?.total || 0 };
  },
};

