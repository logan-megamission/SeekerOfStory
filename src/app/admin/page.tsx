import { db } from "@/db";
import { founders, seekers, bookings, founderInvites } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import Link from "next/link";

async function getStats() {
  try {
    const [
      [publishedCount],
      [draftCount],
      [newSeekersCount],
      [pendingInvitesCount],
    ] = await Promise.all([
      db.select({ count: count() }).from(founders).where(eq(founders.status, "published")),
      db.select({ count: count() }).from(founders).where(eq(founders.status, "draft")),
      db.select({ count: count() }).from(seekers).where(eq(seekers.status, "new")),
      db.select({ count: count() }).from(founderInvites).where(eq(founderInvites.status, "pending")),
    ]);
    return {
      published: publishedCount.count,
      drafts: draftCount.count,
      newSeekers: newSeekersCount.count,
      pendingInvites: pendingInvitesCount.count,
    };
  } catch {
    return { published: 0, drafts: 0, newSeekers: 0, pendingInvites: 0 };
  }
}

const STAT_CARDS = (stats: Awaited<ReturnType<typeof getStats>>) => [
  { label: "Published Founders", value: stats.published, href: "/admin/founders" },
  { label: "Draft Founders", value: stats.drafts, href: "/admin/founders" },
  { label: "New Seekers", value: stats.newSeekers, href: "/admin/seekers" },
  { label: "Pending Invites", value: stats.pendingInvites, href: "/admin/invites" },
];

const QUICK_LINKS = [
  { href: "/admin/invites", label: "Send Founder Invite →" },
  { href: "/admin/founders/new", label: "Add Founder Manually →" },
  { href: "/admin/blog/new", label: "New Blog Post →" },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="font-serif text-[2rem] font-light text-charcoal mb-1"
        style={{ fontFamily: "var(--font-serif)" }}>
        Dashboard
      </h1>
      <p className="text-[0.75rem] text-mid-gray mb-10" style={{ fontFamily: "var(--font-sans)" }}>
        Seeker of Story — Admin
      </p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10 max-md:grid-cols-2">
        {STAT_CARDS(stats).map(({ label, value, href }) => (
          <Link key={label} href={href}
            className="bg-white border border-sos-border p-6 hover:border-gold transition-colors no-underline block">
            <div className="font-serif text-[2.5rem] font-light text-charcoal leading-none mb-2"
              style={{ fontFamily: "var(--font-serif)" }}>
              {value}
            </div>
            <div className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-mid-gray"
              style={{ fontFamily: "var(--font-sans)" }}>
              {label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-sos-border p-6">
        <h2 className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-mid-gray mb-4"
          style={{ fontFamily: "var(--font-sans)" }}>
          Quick Actions
        </h2>
        <div className="flex flex-col gap-2">
          {QUICK_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              className="text-[0.78rem] font-medium text-gold-dark hover:text-gold transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
