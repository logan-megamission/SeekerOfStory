import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function BtnPrimary({
  href,
  onClick,
  children,
  className,
  external,
  type = "button",
  disabled,
}: Props) {
  const base = cn(
    "inline-block bg-gold text-white px-9 py-[0.9rem]",
    "text-[0.68rem] font-semibold tracking-[0.2em] uppercase",
    "border-none cursor-pointer no-underline transition-all duration-200",
    "hover:bg-gold-dark hover:-translate-y-0.5",
    "disabled:bg-light-gray disabled:text-mid-gray disabled:cursor-not-allowed disabled:translate-y-0",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </button>
  );
}
