export interface UserActiveTrip {
  id: string;
  name: string;
  destination: string;
  destinationCity?: string | null;
  destinationState?: string | null;
  destinationCountry?: string | null;
  dateFrom: Date | string;
  dateTo: Date | string;
  travelStyle?: string | null;
  budgetStyle?: string | null;
}

export interface UserWithDetails {
  id: string;
  fullName: string;
  bio: string | null;
  avatarUrl: string;
  state: string;
  coverUrl: string;
  age: number | null;
  city: string | null;
  country: string | null;
  travelType: string | null;
  travelPersonality: string | null;
  interests: string[];
  distanceKm?: number;
  isTraveling?: boolean;
  matchScore?: number;
  reasons?: string[];
  activeTrip?: UserActiveTrip | null;
  match?: {
    totalPoints: number;
    reasons: string[];
  } | null;
}

export interface NearbyUsersResponse {
  users: UserWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isFallback: boolean;
  fallbackScope?: 'state' | 'country' | 'global';
  fallbackRegion?: string | null;
  radiusKm?: number;
}

