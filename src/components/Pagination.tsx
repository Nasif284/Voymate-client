"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "../assets/icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 sm:py-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="
          flex items-center gap-0.5 sm:gap-1
          px-2.5 py-1 sm:px-3 sm:py-1.5
          rounded-lg sm:rounded-xl
          border border-[#d9dfdb]
          bg-white
          text-[#181d1a]
          font-bold
          hover:border-[#0f6e56]
          hover:text-[#0f6e56]
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition-all
          active:scale-95
          cursor-pointer
          text-[11px] sm:text-xs
          shadow-xs
        "
      >
        <span className="scale-75 sm:scale-100 flex-shrink-0">
          <ChevronLeftIcon />
        </span>
        <span>Previous</span>
      </button>

      <span className="text-[10px] sm:text-xs font-semibold text-[#6f7a74] min-w-[70px] sm:min-w-[90px] text-center">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
          flex items-center gap-0.5 sm:gap-1
          px-2.5 py-1 sm:px-3 sm:py-1.5
          rounded-lg sm:rounded-xl
          border border-[#d9dfdb]
          bg-white
          text-[#181d1a]
          font-bold
          hover:border-[#0f6e56]
          hover:text-[#0f6e56]
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition-all
          active:scale-95
          cursor-pointer
          text-[11px] sm:text-xs
          shadow-xs
        "
      >
        <span>Next</span>
        <span className="scale-75 sm:scale-100 flex-shrink-0">
          <ChevronRightIcon />
        </span>
      </button>
    </div>
  );
}

