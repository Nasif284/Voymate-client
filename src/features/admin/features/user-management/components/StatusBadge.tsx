export default function StatusBadge({ status }: { status: string }) {
  const normalizedKey = (status || "").toLowerCase();
  const map: Record<string, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-[#005440]/10 text-[#005440] border border-[#005440]/20" },
    suspended: { label: "Suspended", className: "bg-orange-100 text-orange-700 border border-orange-200" },
    banned: { label: "Banned", className: "bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/20" },
  };
  const cfg = map[normalizedKey] ?? map.active;
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${cfg.className}`}>{cfg.label}</span>;
}
