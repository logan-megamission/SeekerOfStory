import { db } from "@/db";
import { founders } from "@/db/schema";
import Link from "next/link";
import { BtnPrimary } from "@/components/shared/BtnPrimary";
import { revalidatePath } from "next/cache";

async function togglePublish(id: number, currentStatus: string) {
  "use server";
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const { eq } = await import("drizzle-orm");
  await db
    .update(founders)
    .set({
      status: newStatus as "draft" | "published" | "pending_review",
      publishedAt: newStatus === "published" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(founders.id, id));
  revalidatePath("/admin/founders");
  revalidatePath("/founders");
}

export default async function AdminFoundersPage() {
  let allFounders: Array<{
    id: number;
    slug: string;
    storyNumber: number | null;
    name: string;
    businessName: string;
    sector: string;
    dfwCity: string;
    status: string;
    publishedAt: Date | null;
    updatedAt: Date;
  }> = [];

  try {
    allFounders = await db
      .select({
        id: founders.id,
        slug: founders.slug,
        storyNumber: founders.storyNumber,
        name: founders.name,
        businessName: founders.businessName,
        sector: founders.sector,
        dfwCity: founders.dfwCity,
        status: founders.status,
        publishedAt: founders.publishedAt,
        updatedAt: founders.updatedAt,
      })
      .from(founders)
      .orderBy(founders.storyNumber);
  } catch {
    // DB not connected
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      pending_review: "bg-blue-100 text-blue-800",
    };
    return map[status] ?? "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-[2rem] font-light text-charcoal"
          style={{ fontFamily: "var(--font-serif)" }}>
          Founders
        </h1>
        <BtnPrimary href="/admin/founders/new">+ New Founder</BtnPrimary>
      </div>

      <div className="bg-white border border-sos-border overflow-x-auto">
        <table className="w-full text-[0.78rem]" style={{ fontFamily: "var(--font-sans)" }}>
          <thead>
            <tr className="border-b border-sos-border bg-cream">
              {["#", "Name", "Business", "Sector", "City", "Status", "Updated", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-mid-gray">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFounders.map((f) => (
              <tr key={f.id} className="border-b border-sos-border hover:bg-cream/50 transition-colors">
                <td className="px-4 py-3 text-mid-gray">
                  {f.storyNumber ? `#${String(f.storyNumber).padStart(3, "0")}` : "—"}
                </td>
                <td className="px-4 py-3 font-medium text-charcoal">{f.name}</td>
                <td className="px-4 py-3 text-mid-gray">{f.businessName}</td>
                <td className="px-4 py-3 text-mid-gray">{f.sector}</td>
                <td className="px-4 py-3 text-mid-gray">{f.dfwCity}</td>
                <td className="px-4 py-3">
                  <span className={`text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm ${statusBadge(f.status)}`}>
                    {f.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-mid-gray text-[0.7rem]">
                  {new Date(f.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/founders/${f.id}`}
                      className="text-gold-dark hover:text-gold transition-colors font-medium">
                      Edit
                    </Link>
                    <Link href={`/founders/${f.slug}`} target="_blank"
                      className="text-mid-gray hover:text-charcoal transition-colors">
                      View
                    </Link>
                    <form action={async () => {
                      "use server";
                      await togglePublish(f.id, f.status);
                    }}>
                      <button type="submit"
                        className={`font-medium transition-colors ${f.status === "published" ? "text-red-500 hover:text-red-700" : "text-green-600 hover:text-green-800"}`}>
                        {f.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {allFounders.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-mid-gray italic">
                  No founders yet. Add one or send an invite.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
