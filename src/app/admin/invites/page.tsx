import { db } from "@/db";
import { founderInvites } from "@/db/schema";
import { desc } from "drizzle-orm";
import { createFounderInvite } from "./actions";

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://seekerofstory.com";

function inviteUrl(token: string) {
  return `${SITE_URL}/invite/${token}`;
}

export default async function AdminInvitesPage() {
  let invites: Array<{
    id: number;
    token: string;
    name: string;
    email: string;
    status: string;
    createdAt: Date;
    submittedAt: Date | null;
  }> = [];

  try {
    invites = await db
      .select({
        id: founderInvites.id,
        token: founderInvites.token,
        name: founderInvites.name,
        email: founderInvites.email,
        status: founderInvites.status,
        createdAt: founderInvites.createdAt,
        submittedAt: founderInvites.submittedAt,
      })
      .from(founderInvites)
      .orderBy(desc(founderInvites.createdAt));
  } catch {
    // DB not connected
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      submitted: "bg-blue-100 text-blue-800",
      published: "bg-green-100 text-green-800",
    };
    return map[status] ?? "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <h1
        className="font-serif text-[2rem] font-light text-charcoal mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Founder Invites
      </h1>
      <p
        className="text-[0.8rem] text-mid-gray font-light mb-8 max-w-[560px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Create a private link for a founding story candidate. Share the invite URL with them by
        email — they can open it without a site account.
      </p>

      <form
        action={createFounderInvite}
        className="bg-white border border-sos-border p-6 mb-10 grid grid-cols-2 gap-4 max-md:grid-cols-1"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="invite-name"
            className="text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-mid-gray"
          >
            Founder name
          </label>
          <input
            id="invite-name"
            name="name"
            required
            className="bg-warm-white border border-sos-border px-3 py-2.5 text-[0.82rem] outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="invite-email"
            className="text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-mid-gray"
          >
            Email
          </label>
          <input
            id="invite-email"
            name="email"
            type="email"
            required
            className="bg-warm-white border border-sos-border px-3 py-2.5 text-[0.82rem] outline-none focus:border-gold"
          />
        </div>
        <div className="col-span-2 max-md:col-span-1">
          <button
            type="submit"
            className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase bg-charcoal text-white px-6 py-3 hover:bg-charcoal/90 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Create invite link →
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {invites.map((invite) => (
          <div key={invite.id} className="bg-white border border-sos-border p-6">
            <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
              <div>
                <p
                  className="font-semibold text-charcoal text-[0.9rem]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {invite.name}
                </p>
                <a
                  href={`mailto:${invite.email}`}
                  className="text-[0.72rem] text-teal hover:text-gold-dark transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {invite.email}
                </a>
              </div>
              <span
                className={`text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-1 ${statusBadge(invite.status)}`}
              >
                {invite.status}
              </span>
            </div>
            <p
              className="text-[0.65rem] text-mid-gray mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Created {new Date(invite.createdAt).toLocaleDateString()}
              {invite.submittedAt &&
                ` · Submitted ${new Date(invite.submittedAt).toLocaleDateString()}`}
            </p>
            <p
              className="text-[0.58rem] font-semibold tracking-[0.15em] uppercase text-mid-gray mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Invite link
            </p>
            <code className="block text-[0.72rem] text-charcoal bg-cream border border-sos-border px-3 py-2 break-all">
              {inviteUrl(invite.token)}
            </code>
          </div>
        ))}

        {invites.length === 0 && (
          <p
            className="text-center text-mid-gray py-16 italic"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No invites yet. Create one above.
          </p>
        )}
      </div>
    </div>
  );
}
