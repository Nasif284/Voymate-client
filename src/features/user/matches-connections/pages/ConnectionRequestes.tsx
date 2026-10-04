"use client";
import { useState } from "react";
import RequestsListing from "../components/RequestesListing";
import ConnectionsListing from "../components/ConnectionsListing";

type TabType = "Requests" | "Connections";

export default function ConnectionRequestsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Requests");
  return (
    <main className="ml-0 lg:ml-64 min-h-screen flex flex-col bg-[#f1f4f1]">
      <div className="pt-16 sm:pt-20 flex-1">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-12 py-4 sm:py-8">
          <div className="flex items-center justify-between mb-4 sm:mb-8 border-b border-[#bec9c3]/30 pb-2">
            <h1 className="text-lg sm:text-2xl font-extrabold text-[#005440] font-headline">
              Matches & Network
            </h1>

            <div className="flex gap-4 sm:gap-8">
              {(["Requests", "Connections"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === tab ? "text-[#0F6E56] border-b-2 border-[#0F6E56]" : "text-[#181d1a] opacity-60 hover:text-[#0F6E56] hover:opacity-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Requests" ? (
            <RequestsListing />
          ) : (
            <ConnectionsListing />
          )}
        </div>
      </div>
    </main>
  );
}

