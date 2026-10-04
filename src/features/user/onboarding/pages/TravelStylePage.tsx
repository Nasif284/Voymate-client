"use client";

import { useEffect, useState } from "react";
import { useEditTravelStyle, useSetTravelStyle } from "../hooks/onboarding.hooks";
import { capitalizeFirstLetter } from "@/src/utils/capitalizseFirstLetter";
import { useGetMe } from "../../matches-connections/hooks/users.hooks";
import Link from "next/link";
import { useAuthStore } from "@/src/store/auth.store";

type TravelStyle = "Budget" | "Backpacker" | "Luxury";
type Interest = "Beach" | "Mountains" | "Party" | "Culture" | "Foodie" | "Hiking";
type Personality = "Introvert" | "Ambivert" | "Extrovert";
type MatchPref = "Men" | "Women" | "Everyone";

export default function TravelStylePage() {
  const { onboarding } = useAuthStore((state) => state);
  const enabled = onboarding.step > 3;
  const { data, isLoading } = useGetMe(enabled);
  const me = data?.data;
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Backpacker");
  const [interests, setInterests] = useState<Set<Interest>>(new Set(["Mountains", "Culture"]));
  const [personality, setPersonality] = useState<Personality>("Extrovert");
  const [matchPref, setMatchPref] = useState<MatchPref>("Everyone");

  const setStyle = useSetTravelStyle();
  const editStyle = useEditTravelStyle();
  const allTravelStyles: TravelStyle[] = ["Budget", "Backpacker", "Luxury"];
  const allInterests: Interest[] = ["Beach", "Mountains", "Party", "Culture", "Foodie", "Hiking"];
  const allPersonalities: Personality[] = ["Introvert", "Ambivert", "Extrovert"];
  const allMatchPrefs: MatchPref[] = ["Men", "Women", "Everyone"];

  function toggleInterest(item: Interest) {
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  }
  useEffect(() => {
    if (!me) return;
    setTravelStyle(capitalizeFirstLetter(me.travelType) as TravelStyle);
    setInterests(new Set(me.interests.map((i:string) => capitalizeFirstLetter(i)) as Interest[]));
    setPersonality(capitalizeFirstLetter(me.travelPersonality) as Personality);
    setMatchPref(capitalizeFirstLetter(me.matchWith) as MatchPref);
  }, [me]);
  function handleContinue() {
    const data = {
      travelType: travelStyle.toUpperCase(),
      interests: [...interests],
      travelPersonality: personality.toUpperCase(),
      matchWith: matchPref.toUpperCase(),
    };
    if (me?.onboardingCompleted) {
      editStyle.mutate(data);
    } else {
      setStyle.mutate(data);
    }
    // router.push("/onboarding/travel-plan");
  }

  const activePill = "bg-[#0f6e56] text-white border-[#0f6e56] shadow-sm";
  const inactivePill = "border-[#bec9c3]/50 bg-[#f1f4f1] text-[#3f4944] hover:border-[#0f6e56] hover:text-[#0f6e56]";
  const isPending = setStyle.isPending || editStyle.isPending;

  if (isLoading) {
    return (
      <main className="flex-grow flex flex-col items-center justify-start py-6 px-3 sm:px-6 md:py-16">
        <div className="max-w-[640px] w-full bg-white p-6 sm:p-8 md:p-12 rounded-2xl border border-[#bec9c3]/10 shadow-sm flex justify-center items-center min-h-[200px]">
          <span className="inline-block w-8 h-8 border-3 border-[#0f6e56] border-t-transparent rounded-full animate-spin" />
        </div>

        <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 text-center">
          <p className="text-[#3f4944] font-bold text-xs sm:text-sm tracking-widest uppercase">Step 3 of 4</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-start py-6 px-3 sm:px-6 md:py-16">
      <div className="max-w-[640px] w-full bg-white p-4 sm:p-8 md:p-12 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#181d1a] tracking-tight mb-2 sm:mb-3">Define your travel style</h1>
          <p className="text-[#3f4944] leading-relaxed text-sm sm:text-base">Help us match you with the right companions and trips.</p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          <fieldset className="space-y-3 sm:space-y-4">
            <legend className="block text-sm font-bold text-[#181d1a] tracking-wide">How do you prefer to travel?</legend>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {allTravelStyles.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTravelStyle(s)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer
                      ${travelStyle === s ? activePill : inactivePill}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          {/* 2 · Interests */}
          <fieldset className="space-y-3 sm:space-y-4">
            <legend className="block text-sm font-bold text-[#181d1a] tracking-wide">What are you interested in?</legend>
            <div className="flex flex-wrap gap-2">
              {allInterests.map((item) => {
                const selected = interests.has(item);
                return (
                  <button
                    onClick={() => toggleInterest(item)}
                    key={item}
                    type="button"
                    className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold active:scale-95 transition-all cursor-pointer
                        ${selected ? "bg-[#0f6e56] text-white shadow-sm" : "bg-[#e0e3e0] text-[#181d1a] hover:bg-[#c9eadb]"}`}
                  >
                    {item}
                    {selected && (
                      <span>
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 3 · Personality */}
          <fieldset className="space-y-3 sm:space-y-4">
            <legend className="block text-sm font-bold text-[#181d1a] tracking-wide">Travel personality</legend>
            <div className="flex p-1.5 bg-[#e0e3e0] rounded-xl w-full">
              {allPersonalities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPersonality(p)}
                  className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95
                      ${personality === p ? "bg-white text-[#0F6E56] shadow-sm" : "text-[#3f4944] hover:text-[#181d1a]"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </fieldset>

          {/* 4 · Match Preferences */}
          <fieldset className="space-y-3 sm:space-y-4">
            <legend className="block text-sm font-bold text-[#181d1a] tracking-wide">Who would you like to match with?</legend>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {allMatchPrefs.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMatchPref(m)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer
                      ${matchPref === m ? activePill : inactivePill}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-[#bec9c3]/10 gap-3">
            <Link
              href="/onboarding/profile"
              className="
      inline-flex items-center justify-center gap-1.5
      text-[#3f4944]
      font-bold
      text-sm
      hover:text-[#0f6e56]
      transition-all
      active:scale-95
      px-3 py-2 min-h-[44px]
    "
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </Link>

            <button
              type="button"
              onClick={handleContinue}
              disabled={isPending}
              className={`
      inline-flex items-center justify-center gap-2
      w-36 sm:w-[160px] h-12
      rounded-xl
      font-bold
      text-white
      shadow-md
      transition-all
      active:scale-95
      cursor-pointer
      disabled:opacity-70 disabled:pointer-events-none
      ${isPending ? "bg-[#0f6e56]/70" : "bg-[#0f6e56] hover:bg-[#005440]"}
    `}
            >
              {isPending ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Continue
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 text-center">
        <p className="text-[#3f4944] font-bold text-xs sm:text-sm tracking-widest uppercase">Step 3 of 4</p>
      </div>
    </main>
  );
}
