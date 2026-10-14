import { CommunityTripItem } from "@/src/features/user/community-trips/types";

export interface OrganizerTripBookingAttendee {
  id: string;
  bookingCode: string;
  contactName: string;
  contactPhone: string;
  emergencyPhone: string | null;
  note: string | null;
  amount: number;
  currency: string;
  bookedAt: string | Date;
  user: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string | null;
    phone: string | null;
  };
}

export interface OrganizerTripsResponse {
  trips: CommunityTripItem[];
  total: number;
}

export interface CreateOrganizerTripFormValues {
  title: string;
  category: "CAMP" | "TREK_EXPEDITION" | "ROADTRIP" | "TRIP";
  pricingType: "FREE" | "PAID";
  price?: number;
  currency?: string;
  priceNote?: string;
  destinationName: string;
  city: string;
  state: string;
  country?: string;
  dateFrom: string;
  dateTo: string;
  durationText: string;
  maxCapacity: number;
  description: string;
  itinerary: string;
  inclusions?: string;
  exclusions?: string;
}
