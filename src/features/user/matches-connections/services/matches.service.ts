import { userApi as api} from "../../../../lib/api-client";

export const matchesServices = {
  getActiveTrip: async () => {
    const res = await api.get("/trip/active");
    return res.data;
  },
  getTripMatches: async (tripId: string, query: { page: number; limit: number }) => {
    const res = await api.get(`/trip/matches/${tripId}`, { params: query });
    return res.data;
  },
  getMatchProfile: async (matchId:string) => {
    const res = await api.get(`/trip/matches/profile/${matchId}`);
    return res.data;
  },
  searchTripMatches: async (params: {
    destinationName?: string;
    city?: string;
    state?: string;
    countryCode?: string;
    dateFrom?: string;
    dateTo?: string;
    travelStyle?: string;
    budgetStyle?: string;
    page?: number;
    limit?: number;
  }) => {
    const res = await api.get('/trip/matches/search', { params });
    return res.data;
  },
  getBuddiesUpcomingTrips: async () => {
    const res = await api.get('/trip/buddies-upcoming');
    return res.data;
  },
  getAllTripMatches: async (params?: { page?: number; limit?: number }) => {
    const res = await api.get('/trip/all-matches', { params });
    return res.data;
  },
};