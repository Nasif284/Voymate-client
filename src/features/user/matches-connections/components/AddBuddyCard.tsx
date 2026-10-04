
import Link from "next/link";

export default function AddBuddyCard() {
  return (
    <Link href={"/matches"} className="h-full block">
      <article className="h-full min-h-[120px] sm:min-h-[160px] bg-[#f1f4f1] border-2 border-dashed border-[#bec9c3]/40 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#005440]/60 transition-colors group">
        <div className="w-9 h-9 sm:w-14 sm:h-14 bg-[#e0e3e0] rounded-full flex items-center justify-center mb-1.5 sm:mb-3 group-hover:scale-105 transition-transform text-[#005440] shrink-0">
          <svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>
        <h3 className="text-xs sm:text-base font-bold text-[#181d1a] font-headline">Add New Buddy</h3>
        <p className="text-[9px] sm:text-xs text-[#3f4944] mt-0.5 sm:mt-1 max-w-[120px] sm:max-w-[180px]">
          Find new travel partners.
        </p>
      </article>
    </Link>
  );
}

