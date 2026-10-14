"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { communityTripService } from "../services/communityTrip.service";
import {
  JoinFreeCommunityTripPayload,
  CreateRazorpayOrderPayload,
  VerifyRazorpayBookingPayload,
  CreateCommunityTripPayload,
  CommunityTripItem,
  RazorpayOptions,
  RazorpayResponse,
} from "../types";

function extractErrorMessage(
  error: unknown,
  fallback: string
): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      fallback
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useCommunityTrips = (params?: {
  category?: string;
  pricingType?: string;
  destination?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["community-trips", params],
    queryFn: () => communityTripService.listCommunityTrips(params),
    staleTime: 1000 * 60 * 2,
  });
};

export const useCommunityTripDetail = (slugOrId: string) => {
  return useQuery({
    queryKey: ["community-trip-detail", slugOrId],
    queryFn: () => communityTripService.getCommunityTripDetail(slugOrId),
    enabled: Boolean(slugOrId),
  });
};

export const useUserCommunityBookings = () => {
  return useQuery({
    queryKey: ["my-community-bookings"],
    queryFn: () => communityTripService.getUserBookings(),
  });
};

export const useJoinFreeCommunityTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: JoinFreeCommunityTripPayload) =>
      communityTripService.joinFreeCommunityTrip(payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["community-trips"] });
      queryClient.invalidateQueries({
        queryKey: ["community-trip-detail", variables.tripId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-community-bookings"] });
      toast.success(res?.message || "Spot secured! Welcome to the adventure.");
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Failed to join community trip"));
    },
  });
};

export const useCreateRazorpayBookingOrder = () => {
  return useMutation({
    mutationFn: (payload: CreateRazorpayOrderPayload) =>
      communityTripService.createRazorpayOrder(payload),
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Payment failed to initiate"));
    },
  });
};

export const useVerifyRazorpayBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: VerifyRazorpayBookingPayload) =>
      communityTripService.verifyRazorpayBooking(payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["community-trips"] });
      queryClient.invalidateQueries({
        queryKey: ["community-trip-detail", variables.tripId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-community-bookings"] });
      toast.success(res?.message || "Payment confirmed! Your spot is reserved.");
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Payment verification failed"));
    },
  });
};

export const useCreateCommunityTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCommunityTripPayload) =>
      communityTripService.createCommunityTrip(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["community-trips"] });
      toast.success(res?.message || "Community Trip published successfully!");
    },
    onError: (error: AxiosError<{ message?: string; error?: { code?: string; message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Failed to publish trip"));
    },
  });
};

export const useRegisterCommunity = () => {
  return useMutation({
    mutationFn: communityTripService.registerCommunity,
    onSuccess: (res) => {
      toast.success(res?.message || "Community registered successfully!");
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Failed to register community"));
    },
  });
};

export const useLoginCommunity = () => {
  return useMutation({
    mutationFn: communityTripService.loginCommunity,
    onSuccess: (res) => {
      toast.success(res?.message || "Logged in as community organizer!");
    },
    onError: (error: AxiosError<{ message?: string; error?: { message?: string } }>) => {
      toast.error(extractErrorMessage(error, "Authentication failed"));
    },
  });
};

export function useCommunityTripCheckout({
  trip,
  onSuccessJoined,
}: {
  trip: CommunityTripItem;
  onSuccessJoined?: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingCode, setBookingCode] = useState<string>("");

  const joinFreeMutation = useJoinFreeCommunityTrip();
  const createOrderMutation = useCreateRazorpayBookingOrder();
  const verifyPaymentMutation = useVerifyRazorpayBooking();

  const handleFreeJoin = (payload: {
    contactName: string;
    contactPhone: string;
    emergencyPhone?: string;
    note?: string;
  }) => {
    setIsProcessing(true);
    joinFreeMutation.mutate(
      {
        tripId: trip.id,
        contactName: payload.contactName,
        contactPhone: payload.contactPhone,
        emergencyPhone: payload.emergencyPhone || undefined,
        note: payload.note || undefined,
      },
      {
        onSuccess: (res) => {
          setIsProcessing(false);
          const code =
            res?.data?.bookingCode ||
            `VM-${trip.id.slice(0, 8).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
          setBookingCode(code);
          onSuccessJoined?.();
        },
        onError: () => {
          setIsProcessing(false);
        },
      }
    );
  };

  const handlePaidJoin = (payload: {
    contactName: string;
    contactPhone: string;
    emergencyPhone?: string;
    note?: string;
    userEmail?: string;
  }) => {
    setIsProcessing(true);
    createOrderMutation.mutate(
      {
        tripId: trip.id,
        contactName: payload.contactName,
        contactPhone: payload.contactPhone,
      },
      {
        onSuccess: async (orderRes) => {
          const orderData = orderRes?.data;
          const isScriptLoaded = await loadRazorpayScript();

          if (
            isScriptLoaded &&
            window.Razorpay &&
            orderData?.orderId &&
            orderData?.keyId &&
            orderData.keyId !== "rzp_test_mockKeyId"
          ) {
            const options: RazorpayOptions = {
              key:
                orderData.keyId ||
                process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
                "rzp_test_mockKeyId",
              amount: Math.round((Number(trip.price) || 0) * 100),
              currency: trip.currency || "INR",
              name: "Voymate",
              description: trip.title,
              order_id: orderData.orderId,
              prefill: {
                name: payload.contactName,
                contact: payload.contactPhone,
                email: payload.userEmail,
              },
              theme: {
                color: "#005440",
              },
              handler: (response: RazorpayResponse) => {
                verifyPaymentMutation.mutate(
                  {
                    tripId: trip.id,
                    contactName: payload.contactName,
                    contactPhone: payload.contactPhone,
                    emergencyPhone: payload.emergencyPhone || undefined,
                    note: payload.note || undefined,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                  },
                  {
                    onSuccess: (verifyRes) => {
                      setIsProcessing(false);
                      const code =
                        verifyRes?.data?.bookingCode ||
                        `VM-${trip.id.slice(0, 8).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
                      setBookingCode(code);
                      onSuccessJoined?.();
                    },
                    onError: () => {
                      setIsProcessing(false);
                    },
                  }
                );
              },
              modal: {
                ondismiss: () => {
                  setIsProcessing(false);
                  toast.info("Payment was cancelled");
                },
              },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            // Simulated fallback for dev/demo testing
            verifyPaymentMutation.mutate(
              {
                tripId: trip.id,
                contactName: payload.contactName,
                contactPhone: payload.contactPhone,
                emergencyPhone: payload.emergencyPhone || undefined,
                note: payload.note || undefined,
                razorpayOrderId: orderData?.orderId || `order_${Date.now()}`,
                razorpayPaymentId: `pay_demo_${Date.now()}`,
                razorpaySignature: "demo_verified_signature",
              },
              {
                onSuccess: (verifyRes) => {
                  setIsProcessing(false);
                  const code =
                    verifyRes?.data?.bookingCode ||
                    `VM-${trip.id.slice(0, 8).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
                  setBookingCode(code);
                  onSuccessJoined?.();
                },
                onError: () => {
                  setIsProcessing(false);
                },
              }
            );
          }
        },
        onError: () => {
          setIsProcessing(false);
        },
      }
    );
  };

  return {
    isProcessing,
    bookingCode,
    joinFree: handleFreeJoin,
    joinPaid: handlePaidJoin,
  };
}
