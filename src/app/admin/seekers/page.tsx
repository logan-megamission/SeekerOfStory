import { db } from "@/db";
import { seekers } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

async function updateStatus(id: number, status: "new" | "reviewed" | "matched" | "closed") {
  "use server";
  await db.update(seekers).set({ status }).where(eq(seekers.id, id));
  revalidatePath("/admin/seekers");
}

export default async function AdminSeekersPage() {
  let allSeekers: Array<{
    id: number;
    name: string;
    email: string;
    currentSituation: string;
    desiredDirection: string;
    status: string;
    adminNotes: string | null;
    submittedAt: Date;
  }> = [];

  try {
    allSeekers = await db
      .select({
        id: seekers.id,
        name: seekers.name,
        email: seekers.email,
        currentSituation: seekers.currentSituation,
        desiredDirection: seekers.desiredDirection,
        status: seekers.status,
        adminNotes: seekers.adminNotes,
        submittedAt: seekers.submittedAt,
      })
      .from(seekers)
      .orderBy(seekers.submittedAt);
  } catch {
    // DB not connected
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      reviewed: "bg-yellow-100 text-yellow-800",
      matched: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-500",
    };
    return map[status] ?? "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <h1 className="font-serif text-[2rem] font-light text-charcoal mb-8"
        style={{ fontFamily: "var(--font-serif)" }}>
        Seeker Submissions
      </h1>

      <div className="flex flex-col gap-4">
        {allSeekers.map((s) => (
          <div key={s.id} className="bg-white border border-sos-border p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-semibold text-charcoal text-[0.9rem]"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  {s.name}
                </p>
                <a href={`mailto:${s.email}`}
                  className="text-[0.72rem] text-teal hover:text-gold-dark transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  {s.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-1 ${statusBadge(s.status)}`}>
                  {s.status}
                </span>
                <span className="text-[0.65rem] text-mid-gray" style={{ fontFamily: "var(--font-sans)" }}>
                  {new Date(s.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
              <div>
                <p className="text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-mid-gray mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  Current Situation
                </p>
                <p className="text-[0.78rem] text-charcoal font-light leading-[1.7]"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  {s.currentSituation || "—"}
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-mid-gray mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  Desired Direction
                </p>
                <p className="text-[0.78rem] text-charcoal font-light leading-[1.7]"
                  style={{ fontFamily: "var(--font-sans)" }}>
                  {s.desiredDirection}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {(["reviewed", "matched", "closed"] as const).map((status) => (
                <form key={status} action={async () => {
                  "use server";
                  await updateStatus(s.id, status);
                }}>
                  <button type="submit"
                    className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 border border-sos-border text-mid-gray hover:border-gold hover:text-gold-dark transition-colors"
                    style={{ fontFamily: "var(--font-sans)" }}>
                    Mark {status}
                  </button>
                </form>
              ))}
            </div>
          </div>
        ))}

        {allSeekers.length === 0 && (
          <p className="text-center text-mid-gray py-20 italic" style={{ fontFamily: "var(--font-sans)" }}>
            No seeker submissions yet.
          </p>
        )}
      </div>
    </div>
  );
}
