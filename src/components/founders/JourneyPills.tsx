export function JourneyPills({
  from,
  to,
}: {
  from?: string | null;
  to?: string | null;
}) {
  if (!from && !to) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {from && (
        <span
          className="bg-light-gray px-3 py-1 text-charcoal text-[0.7rem] font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {from}
        </span>
      )}
      {from && to && <span className="text-gold text-base">→</span>}
      {to && (
        <span
          className="bg-gold-light text-gold-dark px-3 py-1 text-[0.7rem] font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {to}
        </span>
      )}
    </div>
  );
}
