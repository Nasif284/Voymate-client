import { SlidersHorizontal, Navigation, Video, ShieldCheck } from "lucide-react";

const VALUE_PILLARS = [
  {
    icon: SlidersHorizontal,
    title: "5-Factor Compatibility",
    description: "Evaluates destination, dates, travel style, budget, and personality.",
  },
  {
    icon: Navigation,
    title: "Live Proximity Radar",
    description: "Discover verified solo travelers currently in your local area.",
  },
  {
    icon: Video,
    title: "In-App Audio & Video",
    description: "Verify alignment over 1-on-1 calls before sharing phone numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Optional ID Verification",
    description: "Earn an authentic trust badge with voluntary government ID review.",
  },
];

export default function ValueMetricsBar() {
  return (
    <section className="py-12 bg-white border-y border-[#bec9c3]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {VALUE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#f7faf6] transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c9eadb]/60 flex items-center justify-center text-[#005440] shrink-0">
                  <Icon className="w-6 h-6 text-[#005440]" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-[#181d1a]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4944] mt-1 leading-snug">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
