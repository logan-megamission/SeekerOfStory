"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About SOS" },
  { href: "/founders", label: "Founding Stories" },
  { href: "/listen", label: "Listen" },
  { href: "/blog", label: "Blog" },
  { href: "/seek", label: "Find My Mentor" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-between px-12 bg-cream/97 backdrop-blur-sm border-b border-sos-border">
      <Link href="/" className="flex flex-col leading-[1.1] no-underline">
        <span
          className="font-serif text-[1.25rem] font-semibold tracking-[0.12em] uppercase text-charcoal"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Seeker <em className="italic text-gold not-italic">of</em> Story
        </span>
        <span
          className="text-[0.5rem] font-sans font-medium tracking-[0.25em] uppercase text-mid-gray"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Powered by Mega Mission Media
        </span>
      </Link>

      <ul className="flex gap-10 list-none">
        {links.map(({ href, label }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "relative text-[0.68rem] font-medium tracking-[0.15em] uppercase no-underline transition-colors duration-200",
                  "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-gold after:transition-transform after:duration-300",
                  active
                    ? "text-gold-dark after:scale-x-100"
                    : "text-mid-gray hover:text-charcoal after:scale-x-0 hover:after:scale-x-100"
                )}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
