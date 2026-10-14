"use client";

export const BUDGET_OPTIONS = [
  {
    code: "BUDGET",
    title: "Budget",
    description: "For saving money",
  },
  {
    code: "MODERATE",
    title: "Moderate",
    description: "Balanced spending",
  },
  {
    code: "PREMIUM",
    title: "Premium",
    description: "Comfort-focused",
  },
  {
    code: "LUXURY",
    title: "Luxury",
    description: "High-end experiences",
  },
] as const;

interface BudgetStyleSelectorProps {
  value: string;
  onChange: (code: string) => void;
}

export default function BudgetStyleSelector({
  value,
  onChange,
}: Readonly<BudgetStyleSelectorProps>) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="block text-xs sm:text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">
        Budget Style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {BUDGET_OPTIONS.map((item) => {
          const isSelected = value === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => onChange(item.code)}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-[#005440] bg-[#eef8f4] ring-1 ring-[#005440]"
                  : "border-[#bec9c3]/30 bg-[#f7faf6] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-xs sm:text-sm text-[#181d1a]">
                  {item.title}
                </span>
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "border-[#005440] bg-[#005440]"
                      : "border-[#bec9c3]"
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </span>
              </div>
              <span className="text-[10px] text-[#3f4944] mt-1 leading-tight">
                {item.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
