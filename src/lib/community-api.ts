import axios from "axios";
import { HttpCodes } from "../utils/constants/HttpCodes.containts";

export const communityApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

communityApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === HttpCodes.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/community/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        const refreshed = refreshRes.data?.data;
        const community = refreshed?.community || refreshed;
        if (community && community.id) {
          const { useCommunityAuthStore } = await import("@/src/store/communityAuth.store");
          useCommunityAuthStore.getState().setCommunity(community);
        }

        return communityApi(originalRequest);
      } catch {
        const { useCommunityAuthStore } = await import("@/src/store/communityAuth.store");
        useCommunityAuthStore.getState().logout();
        if (typeof window !== "undefined") {
          window.location.href = "/community/login";
        }
      }
    }

    return Promise.reject(error);
  },
);
