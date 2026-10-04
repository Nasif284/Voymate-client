export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        px-2.5 py-1 sm:px-3.5 sm:py-1.5
        rounded-full
        bg-white
        border border-[#d9dfdb]/80
        text-[10px] sm:text-xs font-bold text-[#3f4944]
        inline-block max-w-full truncate capitalize
      "
    >
      {children}
    </span>
  );
}
