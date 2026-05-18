import type { BlueprintItem } from "@/db/schema";

export function BlueprintGrid({ items }: { items: BlueprintItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="bg-cream px-5 py-4 border-l-2 border-gold-light">
          <span
            className="block text-[0.56rem] font-bold tracking-[0.15em] uppercase text-mid-gray mb-1"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {item.category}
          </span>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8rem] text-teal font-normal hover:text-gold-dark transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {item.value}
            </a>
          ) : (
            <span
              className="text-[0.8rem] text-charcoal font-normal"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
