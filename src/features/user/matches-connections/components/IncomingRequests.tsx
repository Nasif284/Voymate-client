import React from "react";
import RequestCard from "./RequestCard";
import { ConnectionRequest } from "../../profile/interfaces/profile.interface";
import { useAcceptRequest, useGetIncomingRequests, useRejectRequest } from "../hooks/connection.hooks";

const IncomingRequestsListing = () => {
  const { data, isLoading } = useGetIncomingRequests();
  const requests = data?.data?.requests ?? [];
  const accept = useAcceptRequest();
  const decline = useRejectRequest();

  function handleAccept(id: string) {
    accept.mutate(id);
  }

  function handleDecline(id: string) {
    decline.mutate(id);
  }

  if (isLoading) {
    return (
      <div className="w-full space-y-4 py-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-white/60 animate-pulse rounded-xl border border-[#bec9c3]/15" />
        ))}
      </div>
    );
  }

  if (requests?.length > 0) {
    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        {requests.map((request: ConnectionRequest) => (
          <RequestCard key={request.id} request={request} onAccept={handleAccept} onDecline={handleDecline} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-[#3f4944] text-center px-4">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-30">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22l-4-9-9-4 20-7z" />
        </svg>
        <p className="font-headline font-bold text-base sm:text-lg opacity-60">No connection requests</p>
        <p className="text-xs sm:text-sm opacity-40 mt-1">Your incoming buddy requests will appear here.</p>
      </div>
    );
  }
};

export default IncomingRequestsListing;