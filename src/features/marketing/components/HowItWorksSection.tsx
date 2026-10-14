import { MapPin, SlidersHorizontal, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    icon: MapPin,
    title: "Publish Destination & Dates",
    description:
      "Create your upcoming journey or set your current location. Define your travel style (Adventure, Cultural, Leisure) and preferred budget tier.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Inspect Compatibility Matches",
    description:
      "Our matching algorithm generates percentage compatibility scores with detailed explanations of shared destinations, dates, and habits.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Connect, Chat & Call Directly",
    description:
      "Send connection requests with personalized notes. Chat securely and start in-app video calls to align on details before ever meeting in person.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white border-y border-[#bec9c3]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-[#005440] bg-[#c9eadb]/50 px-3.5 py-1.5 rounded-full">
            Simple 3-Step Flow
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#181d1a] tracking-tight mt-3">
            How Voymate Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3f4944]">
            From solo traveler to verified companion in three seamless steps.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-[#f7faf6] rounded-3xl p-8 sm:p-10 border border-[#bec9c3]/30 text-left flex flex-col justify-between hover:border-[#005440]/30 transition-all hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-headline font-black text-3xl text-[#005440]/30">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#bec9c3]/30 flex items-center justify-center text-[#005440]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-headline text-xl font-bold text-[#181d1a] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#3f4944] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#bec9c3]/20">
                  <span className="text-xs font-bold text-[#005440] tracking-wider uppercase">
                    Step {idx + 1} of 3
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#005440] hover:bg-[#0f6e56] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-xs transition-all active:scale-95"
          >
            <span>Start Matching Now</span>
            <ArrowRight className="w-4 h-4 text-[#a0f3d4]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
