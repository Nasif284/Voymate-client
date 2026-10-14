export function formatDateRange(
  from?: Date | string | null,
  to?: Date | string | null
): string {
  if (!from) return "";
  const dFrom = new Date(from);
  const dTo = to ? new Date(to) : null;
  if (isNaN(dFrom.getTime())) return "";

  const fromMonth = dFrom.toLocaleDateString("en-US", { month: "short" });
  const fromDay = dFrom.getDate();
  if (!dTo || isNaN(dTo.getTime())) return `${fromMonth} ${fromDay}`;

  const toMonth = dTo.toLocaleDateString("en-US", { month: "short" });
  const toDay = dTo.getDate();
  if (fromMonth === toMonth) {
    return `${fromMonth} ${fromDay} - ${toDay}`;
  }
  return `${fromMonth} ${fromDay} - ${toMonth} ${toDay}`;
}

export function formatDate(
  date?: Date | string | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(
    "en-US",
    options ?? {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}
