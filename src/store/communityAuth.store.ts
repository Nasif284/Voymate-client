import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CommunityProfile } from "../features/user/community-trips/types";

interface CommunityAuthStore {
  community: CommunityProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  pendingEmail: string | null;

  setCommunity: (community: CommunityProfile | null) => void;
  setPendingEmail: (email: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useCommunityAuthStore = create<CommunityAuthStore>()(
  persist(
    (set) => ({
      community: null,
      isAuthenticated: false,
      loading: true,
      pendingEmail: null,

      setCommunity: (community) =>
        set({
          community,
          isAuthenticated: Boolean(community),
          loading: false,
        }),

      setPendingEmail: (pendingEmail) =>
        set({ pendingEmail }),

      setLoading: (loading) =>
        set({ loading }),

      logout: () =>
        set({
          community: null,
          isAuthenticated: false,
          loading: false,
          pendingEmail: null,
        }),
    }),
    {
      name: "community-auth-storage",
    }
  )
);
