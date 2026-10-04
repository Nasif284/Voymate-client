import { useState } from "react";
import IncomingRequestsListing from "./IncomingRequests";
import SentRequestsListing from "./SentRequests";

export default function BuddyRequestsPage() {
  const [activeTab, setActiveTab] = useState<"incoming" | "sent">("incoming");
  const pendingCount = 2;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
        <h2 className="text-base sm:text-2xl font-extrabold text-[#005440] font-headline flex items-center gap-2">
          Mate requests
        </h2>

        {/* Sub Tabs */}
        <div className="flex gap-4 sm:gap-6 border-b border-[#bec9c3]/30">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`pb-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "incoming" ? "text-[#0F6E56] font-bold border-b-2 border-[#0F6E56]" : "text-[#3f4944] hover:text-[#0F6E56]"
            }`}
          >
            Incoming
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`pb-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "sent" ? "text-[#0F6E56] font-bold border-b-2 border-[#0F6E56]" : "text-[#3f4944] hover:text-[#0F6E56]"
            }`}
          >
            Sent
          </button>
        </div>
      </div>

      {/* Request cards */}
      {activeTab === "incoming" ? <IncomingRequestsListing /> : <SentRequestsListing />}
    </div>
  );
}