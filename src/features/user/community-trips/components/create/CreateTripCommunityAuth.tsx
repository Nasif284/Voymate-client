"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import {
  useRegisterCommunity,
  useLoginCommunity,
} from "../../hooks/communityTrip.hooks";
import { CommunityProfile } from "../../types";

interface CreateTripCommunityAuthProps {
  onSuccess: (community: CommunityProfile) => void;
}

export const CreateTripCommunityAuth: React.FC<CreateTripCommunityAuthProps> = ({
  onSuccess,
}) => {
  const [mode, setMode] = useState<"REGISTER" | "LOGIN">("REGISTER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const registerMutation = useRegisterCommunity();
  const loginMutation = useLoginCommunity();
  const loading = registerMutation.isPending || loginMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "REGISTER") {
      registerMutation.mutate(
        {
          name,
          email,
          password,
          city: city || undefined,
          state: state || undefined,
        },
        {
          onSuccess: (res) => {
            onSuccess(res.data.community);
          },
        }
      );
    } else {
      loginMutation.mutate(
        {
          email,
          password,
        },
        {
          onSuccess: (res) => {
            onSuccess(res.data.community);
          },
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#f7faf6] rounded-2xl p-4 border border-[#bec9c3]/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
        <div className="text-xs text-[#3f4944] leading-relaxed">
          <p className="font-bold text-[#181d1a]">
            Organizer Credentials Required
          </p>
          <p className="mt-0.5">
            To publish community trips, please register your travel club or sign in with your organizer account.
          </p>
        </div>
      </div>

      <div className="flex border-b border-[#bec9c3]/20 text-xs font-bold gap-4">
        <button
          type="button"
          onClick={() => setMode("REGISTER")}
          className={`pb-2 border-b-2 cursor-pointer transition-colors ${
            mode === "REGISTER"
              ? "border-[#005440] text-[#005440]"
              : "border-transparent text-[#6f7a74]"
          }`}
        >
          Register Club / Community
        </button>
        <button
          type="button"
          onClick={() => setMode("LOGIN")}
          className={`pb-2 border-b-2 cursor-pointer transition-colors ${
            mode === "LOGIN"
              ? "border-[#005440] text-[#005440]"
              : "border-transparent text-[#6f7a74]"
          }`}
        >
          Sign In
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "REGISTER" && (
          <div>
            <label className="block text-xs font-bold text-[#3f4944] mb-1">
              Community / Club Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sahyadri Rangers Club"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-bold text-[#3f4944] mb-1">
              Organizer Email *
            </label>
            <input
              type="email"
              required
              placeholder="host@voymate.club"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3f4944] mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
            />
          </div>
        </div>

        {mode === "REGISTER" && (
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-[#3f4944] mb-1">
                City (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Kochi"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3f4944] mb-1">
                State (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Kerala"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#f7faf6] border border-[#bec9c3]/40 focus:border-[#005440] focus:bg-white text-xs text-[#181d1a] outline-none font-medium"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-[#005440] hover:bg-[#004736] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>{mode === "REGISTER" ? "Continue Registration" : "Sign In & Continue"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
