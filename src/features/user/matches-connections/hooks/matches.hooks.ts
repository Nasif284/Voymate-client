import { matchesServices } from "@/src/features/user/matches-connections/services/matches.service";
import { useQuery } from "@tanstack/react-query";

export function useGetActiveTrip() {
  return useQuery({
    queryKey: ["active_trip"],
    queryFn: () => matchesServices.getActiveTrip(),
  });
}

export function useGetTripMatches(tripId: string, query: { page: number; limit: number }) {
  return useQuery({
    queryKey: ["trip_matches", tripId, query],
    queryFn: () => matchesServices.getTripMatches(tripId, query),
    enabled: !!tripId,
  });
}

export function useGetMatchProfile(matchId: string) {
  return useQuery({
    queryKey: ["trip_match_profile", matchId],
    queryFn: () => matchesServices.getMatchProfile(matchId),
    enabled: !!matchId,
  });
}

export function useSearchTripMatches(
  params: {
    destinationName?: string;
    city?: string;
    state?: string;
    countryCode?: string;
    dateFrom?: string;
    dateTo?: string;
    travelStyle?: string;
    budgetStyle?: string;
    page: number;
    limit: number;
  },
  enabled: boolean = false
) {
  return useQuery({
    queryKey: ["search_trip_matches", params],
    queryFn: () => matchesServices.searchTripMatches(params),
    enabled,
  });
}

export function useGetBuddiesUpcomingTrips() {
  return useQuery({
    queryKey: ["buddies_upcoming_trips"],
    queryFn: () => matchesServices.getBuddiesUpcomingTrips(),
  });
}

export function useGetAllTripMatches(query?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["all_trip_matches", query],
    queryFn: () => matchesServices.getAllTripMatches(query),
  });
}


