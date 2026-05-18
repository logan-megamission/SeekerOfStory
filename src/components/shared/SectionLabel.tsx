import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "block text-[0.62rem] font-semibold tracking-[0.3em] uppercase mb-4",
        light ? "text-gold-light" : "text-gold",
        className
      )}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </span>
  );
}
