"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Is Voymate free to use?",
    answer:
      "Yes. Creating your travel profile, searching destinations, matching with travel buddies, and using in-app messaging is completely free.",
  },
  {
    question: "Is government ID verification compulsory?",
    answer:
      "No, ID verification is completely optional. Any traveler can join, plan trips, and connect without submitting an ID. However, travelers who choose to verify their government ID receive an authentic Verified Badge on their profile, which significantly boosts peer trust and connection response rates.",
  },
  {
    question: "How does the compatibility algorithm score travelers?",
    answer:
      "Our matching engine evaluates 5 structured parameters: exact or regional destination alignment, overlapping travel dates, travel style (Adventure, Cultural, Leisure), budget tier (Budget, Moderate, Premium, Luxury), and personality traits (Introvert, Ambivert, Extrovert).",
  },
  {
    question: "Can strangers message me directly without my permission?",
    answer:
      "No. Voymate operates on a mutual connection model. Another traveler can send you a connection request with an introductory note, but direct messaging and calling are only unlocked after you explicitly accept the request.",
  },
  {
    question: "How do in-app audio and video calls work?",
    answer:
      "Once you are connected with a travel buddy, you can initiate a 1-on-1 audio or video call directly inside the platform using secure peer-to-peer WebRTC technology. You never have to share personal WhatsApp, phone numbers, or social media handles.",
  },
  {
    question: "What are Community Trips?",
    answer:
      "Community Trips are curated group expeditions and weekend treks organized and hosted by verified travel clubs and organizations. If you don't have a fixed companion yet, you can reserve a slot on an organized group trip and travel with a curated cohort of fellow explorers.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#f7faf6] border-t border-[#bec9c3]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#005440] bg-[#c9eadb]/50 px-3.5 py-1.5 rounded-full">
            Answers & Clarity
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#181d1a] tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3f4944]">
            Everything you need to know about how matching, verification, and privacy work.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="bg-white rounded-2xl border border-[#bec9c3]/30 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4 hover:bg-[#ebefeb]/30 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-headline font-bold text-base sm:text-lg text-[#181d1a]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#005440] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#3f4944] leading-relaxed border-t border-[#bec9c3]/15">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
