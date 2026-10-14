export interface CommunityTripDestination {
  name: string;
  city: string;
  state: string;
  country: string;
}

export interface CommunityTripCommunity {
  id: string;
  name: string;
  slug?: string;
  avatarUrl: string;
  verified: boolean;
  memberCount?: string;
  rating: number;
  leader?: string;
  leaderRole?: string;
  city?: string | null;
  state?: string | null;
}

export interface CommunityTripItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface CommunityTripAttendee {
  id: string;
  name: string;
  avatarUrl: string;
  badge?: string;
  verified?: boolean;
}

export interface CommunityTripReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CommunityTripItem {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  coverImage: string;
  gallery: string[];
  destination: CommunityTripDestination;
  community: CommunityTripCommunity;
  pricingType: "FREE" | "PAID";
  price?: number;
  currency?: string;
  priceNote?: string;
  category: "Camp" | "Trek & Expedition" | "Workation & Surf" | "Road Trip" | "CAMP" | "TREK_EXPEDITION" | "ROADTRIP" | "TRIP";
  dateFrom: string;
  dateTo: string;
  durationText: string;
  maxCapacity: number;
  joinedCount: number;
  tags?: string[];
  vibe?: string;
  inclusions?: string[] | string;
  exclusions?: string[] | string;
  requirements?: string[];
  itinerary: string | CommunityTripItineraryDay[];
  attendees?: CommunityTripAttendee[];
  reviews?: CommunityTripReview[];
  status?: "DRAFT" | "PUBLISHED" | "COMPLETED" | "CANCELLED";
}

export interface JoinFreeCommunityTripPayload {
  tripId: string;
  contactName: string;
  contactPhone: string;
  emergencyPhone?: string;
  note?: string;
}

export interface CreateRazorpayOrderPayload {
  tripId: string;
  contactName: string;
  contactPhone: string;
}

export interface VerifyRazorpayBookingPayload {
  tripId: string;
  contactName: string;
  contactPhone: string;
  emergencyPhone?: string;
  note?: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface CreateCommunityTripPayload {
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
  gallery?: string[];
  inclusions?: string;
  exclusions?: string;
}

export interface CommunityProfile {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string | null;
  tagline: string | null;
  description: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  city: string | null;
  state: string | null;
  country: string;
  instagramHandle: string | null;
  websiteUrl: string | null;
  isOnboarded: boolean;
  isEmailVerified?: boolean;
  verificationStatus: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  isVerified: boolean;
  rating: number;
  totalTripsCount: number;
}

export interface UserCommunityBooking {
  id: string;
  bookingCode: string;
  tripId: string;
  contactName: string;
  contactPhone: string;
  emergencyPhone: string | null;
  note: string | null;
  amount: number;
  currency: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  bookedAt: string;
  trip: {
    id: string;
    title: string;
    slug: string;
    category: "CAMP" | "TREK_EXPEDITION" | "ROADTRIP" | "TRIP" | string;
    destinationName: string;
    city: string;
    state: string;
    dateFrom: string;
    dateTo: string;
    durationText: string;
    gallery: string[];
    pricingType: "FREE" | "PAID";
    price: number | null;
    currency: string;
    community: {
      id: string;
      name: string;
      slug: string;
      avatarUrl: string | null;
    };
  };
}

export interface BackendCommunityTripRaw {
  id: string;
  title: string;
  slug: string;
  category: "CAMP" | "TREK_EXPEDITION" | "ROADTRIP" | "TRIP" | string;
  pricingType: "FREE" | "PAID";
  price?: number | string | null;
  currency?: string;
  priceNote?: string | null;
  destinationName?: string;
  city?: string;
  state?: string;
  country?: string;
  dateFrom: string | Date;
  dateTo: string | Date;
  durationText: string;
  maxCapacity: number;
  joinedCount?: number;
  description: string;
  itinerary: string;
  gallery?: string[];
  coverImage?: string | null;
  inclusions?: string | string[] | null;
  exclusions?: string | string[] | null;
  requirements?: string[];
  tags?: string[];
  status?: "DRAFT" | "PUBLISHED" | "COMPLETED" | "CANCELLED";
  destination?: {
    name?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  community?: {
    id: string;
    name: string;
    slug?: string;
    avatarUrl?: string | null;
    isVerified?: boolean;
    verified?: boolean;
    rating?: number;
    memberCount?: string;
    city?: string | null;
    state?: string | null;
  };
  attendees?: CommunityTripAttendee[];
  reviews?: CommunityTripReview[];
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    contact?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayResponse) => void | Promise<void>;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

