import { UserWithDetails } from "@/src/Interfaces/users.interface";

export type ConnectionStatus =
  | "CONNECTED"
  | "REQUEST_SENT"
  | "REQUEST_RECEIVED"
  | "NONE";

export interface MatchData {
  id: string;
  matchedTripId?: string;
  totalPoints?: number | null;
  dateFrom?: Date;
  dateTo?: Date;
  destination: string;
  mode?: "TRIP" | "SEARCH";
  connectionStatus?: ConnectionStatus;
  requestId?: string;
  forTrip?: {
    id: string;
    name: string;
  };
  forTripName?: string;
}
export interface TripMatchData {
  mode?: "TRIP" | "SEARCH";
  connectionStatus?: ConnectionStatus;
  requestId?: string;
  forTrip?: {
    id: string;
    name: string;
  };
  forTripName?: string;
  user: UserWithDetails;
  tripMatch: MatchData;
}
export interface TripCardData {
  id: string;
  name: string;
  destinationId: string;
  dateFrom: Date;
  dateTo: Date;
  budgetStyleCode: string;
  travelStyleCode: string;
  destination: MatchDestinationDTO;
}

export interface MatchDestinationDTO {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  country: string;
  latitude: number;
  longitude: number;
  coverUrl: string | null;
}

export interface Connection {
  fullName: string;
  id: string;
  userId: string;
  state: string;
  country: string;
  avatarUrl: string;
}

export interface BuddyUpcomingTrip {
  tripId: string;
  tripName: string;
  destination: {
    id: string;
    name: string;
    city: string | null;
    state: string | null;
    country: string | null;
    coverUrl: string | null;
  };
  dateFrom: Date | string;
  dateTo: Date | string;
  travelStyle: string;
  budgetStyle: string;
  buddy: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    coverUrl: string | null;
    age: number | null;
    city: string | null;
    state: string | null;
    country: string | null;
    travelPersonality: string | null;
  };
}
