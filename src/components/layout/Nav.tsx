"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About SOS" },
  { href: "/founders", label: "Founding Stories" },
  { href: "/listen", label: "Listen" },
  { href: "/blog", label: "Blog" },
  { href: "/seek", label: "Make an Impact" },
  { href: "/fund", label: "Fund the Mission" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-between px-6 md:px-12 bg-cream/97 backdrop-blur-sm border-b border-sos-border">

        {/* Brand */}
        <Link href="/" className="flex flex-col leading-[1.1] no-underline">
          <span
            className="font-serif text-[1.1rem] md:text-[1.25rem] font-semibold tracking-[0.12em] uppercase text-charcoal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Seeker <em className="italic text-gold not-italic">of</em> Story
          </span>
          <span
            className="text-[0.45rem] md:text-[0.5rem] font-medium tracking-[0.25em] uppercase text-mid-gray"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Powered by Mega Mission Media
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
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

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1 focus:outline-none"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={cn(
            "block h-px bg-charcoal transition-all duration-300 origin-center",
            open ? "rotate-45 translate-y-[6px]" : ""
          )} />
          <span className={cn(
            "block h-px bg-charcoal transition-all duration-300",
            open ? "opacity-0 scale-x-0" : ""
          )} />
          <span className={cn(
            "block h-px bg-charcoal transition-all duration-300 origin-center",
            open ? "-rotate-45 -translate-y-[6px]" : ""
          )} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-charcoal/60"
          onClick={() => setOpen(false)}
        />

        {/* Drawer panel */}
        <div className={cn(
          "absolute top-[70px] left-0 right-0 bg-cream border-b border-sos-border transition-transform duration-300",
          open ? "translate-y-0" : "-translate-y-full"
        )}>
          <ul className="list-none flex flex-col">
            {links.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href} className="border-b border-sos-border last:border-b-0">
                  <Link
                    href={href}
                    className={cn(
                      "block px-6 py-4 text-[0.72rem] font-medium tracking-[0.18em] uppercase no-underline transition-colors duration-200",
                      active
                        ? "text-gold-dark bg-gold/5"
                        : "text-mid-gray hover:text-charcoal hover:bg-light-gray/50"
                    )}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {label}
                    {active && (
                      <span className="ml-2 inline-block w-1 h-1 rounded-full bg-gold align-middle" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer tagline inside drawer */}
          <div className="px-6 py-4 border-t border-sos-border">
            <p className="text-[0.55rem] tracking-[0.2em] uppercase text-mid-gray"
              style={{ fontFamily: "var(--font-sans)" }}>
              Matthew 7:7 — Seek and you shall find
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
