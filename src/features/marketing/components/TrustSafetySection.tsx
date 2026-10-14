import { ShieldCheck, Lock, Eye, Users } from "lucide-react";

const SAFETY_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Optional ID Verification",
    badge: "100% Voluntary",
    description:
      "Travelers can voluntarily verify their government ID or passport to earn an authentic Verified Badge. Verification is never forced, but gives peers immediate peace of mind.",
  },
  {
    icon: Eye,
    title: "Granular Profile Visibility",
    badge: "Privacy First",
    description:
      "Control who discovers your profile: open to Everyone, restricted to Verified Travelers Only, or visible only to your accepted Mutual Connections.",
  },
  {
    icon: Lock,
    title: "Mutual Consent Handshake",
    badge: "Zero Spam",
    description:
      "Direct chat and video calling are only unlocked after both travelers mutually accept a connection request. No unsolicited messages.",
  },
  {
    icon: Users,
    title: "Community Guidelines & Reporting",
    badge: "Moderated",
    description:
      "Active moderation, report triggers, and user blocking ensure a respectful and safe travel community for solo explorers of all genders.",
  },
];

export default function TrustSafetySection() {
  return (
    <section id="safety" className="py-20 md:py-32 bg-white border-t border-[#bec9c3]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-[#005440] bg-[#c9eadb]/50 px-3.5 py-1.5 rounded-full">
            Security & Controls
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#181d1a] tracking-tight mt-3">
            Safety Built Directly into the Platform
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3f4944]">
            Voymate gives you complete sovereignty over your privacy, who can reach you,
            and how you verify travel companions.
          </p>
        </div>

        {/* Safety Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {SAFETY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#f7faf6] rounded-3xl p-8 sm:p-10 border border-[#bec9c3]/30 flex flex-col justify-between hover:border-[#005440]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#bec9c3]/30 flex items-center justify-center text-[#005440]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#005440] bg-[#c9eadb]/60 px-3 py-1 rounded-full">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-headline text-xl font-bold text-[#181d1a] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#3f4944] leading-relaxed">
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
