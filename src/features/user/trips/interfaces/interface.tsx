export type TripStatus = "active" | "past";

export interface Trip {
  id: string;
  name: string;
  destinationId: string;
  dateFrom: Date;
  dateTo: Date;
  budgetStyleCode: string;
  travelStyleCode: string;
  destination: {
    id: string;
    name: string;
    city: string | null;
    state: string | null;
    country: string;
    latitude: number;
    longitude: number;
    coverUrl: string | null;
  };
}

export interface Member {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface EditTripData {
  dateFrom: Date;
  dateTo: Date;
  budgetStyleCode: string;
  travelStyleCode: string;
}