const styles: Record<string, string> = {
  active: "bg-green-100 text-green-700 border border-green-200",
  suspended: "bg-orange-100 text-orange-700 border border-orange-200",
  banned: "bg-red-100 text-red-700 border border-red-200",
};

export function UserStatusBadge({ status }: { status: string }) {
  const normalizedKey = (status || "").toLowerCase();
  const badgeStyle = styles[normalizedKey] || "bg-gray-100 text-gray-700 border border-gray-200";
  const displayLabel =
    normalizedKey === "active"
      ? "Active"
      : normalizedKey === "suspended"
      ? "Suspended"
      : normalizedKey === "banned"
      ? "Banned"
      : status || "Active";

  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeStyle}`}>{displayLabel}</span>;
}
