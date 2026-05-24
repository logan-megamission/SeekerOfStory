import Link from "next/link";
import { cn } from "@/lib/utils";
import { AdminUserMenu } from "@/components/admin/AdminUserMenu";

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/founders", label: "Founders" },
  { href: "/admin/invites", label: "Invites" },
  { href: "/admin/seekers", label: "Seekers" },
  { href: "/admin/blog", label: "Blog" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F3EF] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-charcoal text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <span className="font-serif text-[1rem] font-semibold tracking-[0.1em] text-gold"
            style={{ fontFamily: "var(--font-serif)" }}>
            SOS Admin
          </span>
          <p className="text-[0.6rem] text-white/40 mt-1 tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-sans)" }}>
            Seeker of Story
          </p>
        </div>

        <nav className="flex-1 py-4">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "block px-6 py-3 text-[0.7rem] tracking-[0.1em] uppercase font-medium transition-colors",
                "text-white/60 hover:text-white hover:bg-white/5"
              )}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 space-y-4">
          {clerkEnabled && <AdminUserMenu />}
          <Link
            href="/"
            target="_blank"
            className="block text-[0.6rem] tracking-[0.1em] uppercase text-white/30 hover:text-white/60 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            ← View Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
