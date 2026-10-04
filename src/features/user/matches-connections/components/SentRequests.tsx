import { SentRequest } from "../../profile/interfaces/profile.interface";
import { useGetSentRequests, useWithdrawRequest } from "../hooks/connection.hooks";
import SentRequestCard from "./SentRequestCard";

const SentRequestsListing = () => {
  const { data, isLoading } = useGetSentRequests();
  const requests = data?.data?.requests ?? [];
  const withdraw = useWithdrawRequest();

  function handleWithdraw(id: string) {
    withdraw.mutate(id);
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

  if (requests.length > 0) {
    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        {requests.map((req: SentRequest) => (
          <SentRequestCard onWithdraw={handleWithdraw} request={req} key={req.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
        <p className="text-[#3f4944] font-bold text-base sm:text-lg mb-1">No sent requests yet.</p>
        <p className="text-[#6f7a74] text-xs sm:text-sm">Requests you send will appear here.</p>
      </div>
    );
  }
};

export default SentRequestsListing;

