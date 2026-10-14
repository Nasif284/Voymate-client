"use client";

interface PublicProfileAttributesProps {
  travelType?: string | null;
  travelPersonality?: string | null;
  skills?: string[];
  interests?: string[];
  languages?: string[];
}

export default function PublicProfileAttributes({
  travelType,
  travelPersonality,
  skills,
  interests,
  languages,
}: Readonly<PublicProfileAttributesProps>) {
  const hasAny =
    Boolean(travelType) ||
    Boolean(travelPersonality) ||
    Boolean(skills?.length) ||
    Boolean(interests?.length) ||
    Boolean(languages?.length);

  if (!hasAny) return null;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#bec9c3]/15 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-6">
      {/* Travel Style */}
      {travelType && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
            Travel Style
          </h3>
          <span className="inline-block bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1.5 rounded-full">
            {travelType}
          </span>
        </div>
      )}

      {/* Travel Personality */}
      {travelPersonality && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
            Travel Personality
          </h3>
          <span className="inline-block bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1.5 rounded-full">
            {travelPersonality}
          </span>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
            Languages
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="bg-[#ebefeb] text-[#181d1a] text-xs font-semibold px-3 py-1 rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
            Skills
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {interests && interests.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] mb-2.5">
            Interests
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="bg-[#c9eadb] text-[#005440] text-xs font-bold px-3 py-1.5 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
