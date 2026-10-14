"use client";

export const TRIP_STYLES = [
  {
    code: "ADVENTURE",
    title: "Adventure",
  },
  {
    code: "LEISURE",
    title: "Leisure",
  },
  {
    code: "CULTURAL",
    title: "Cultural",
  },
] as const;

interface TripStyleSelectorProps {
  value: string;
  onChange: (code: string) => void;
}

export default function TripStyleSelector({
  value,
  onChange,
}: Readonly<TripStyleSelectorProps>) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="block text-xs sm:text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">
        Travel Style
      </label>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {TRIP_STYLES.map((item) => {
          const isSelected = value === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => onChange(item.code)}
              className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm ${
                isSelected
                  ? "border-[#005440] bg-[#005440] text-white shadow-xs"
                  : "border-[#bec9c3]/30 bg-[#f7faf6] text-[#181d1a] hover:bg-white"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
